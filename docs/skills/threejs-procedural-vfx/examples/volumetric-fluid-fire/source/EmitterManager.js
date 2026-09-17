// docs/skills/threejs-procedural-vfx/examples/volumetric-fluid-fire/source/EmitterManager.ts
import { Fn, If, instanceIndex, Return, storage, vec4 } from "https://esm.sh/three@0.185.1/tsl?external=three";
import * as THREE from "https://esm.sh/three@0.185.1/webgpu?external=three";
var EmitterManager = class {
  constructor(emitterBuffer) {
    this.emitters = [];
    this.defPools = /* @__PURE__ */ new Map();
    this.maxObjects = emitterBuffer.reduce((acc, obj) => acc + obj.maxCount, 0);
    this.emitters = [];
    this.objectMap = /* @__PURE__ */ new WeakMap();
    this.matrixData = new Float32Array(this.maxObjects * 16);
    this.propData = new Float32Array(this.maxObjects * 4);
    this.velData = new Float32Array(this.maxObjects * 4);
    const vertexInstanceData = [];
    this.matrixAttr = new THREE.StorageBufferAttribute(this.matrixData, 16);
    this.propAttr = new THREE.StorageBufferAttribute(this.propData, 4);
    this.velAttr = new THREE.StorageBufferAttribute(this.velData, 4);
    this.matricesStorageNode = storage(this.matrixAttr, "mat4", this.maxObjects);
    this.propsStorageNode = storage(this.propAttr, "vec4", this.maxObjects);
    this.velocitiesStorageNode = storage(this.velAttr, "vec4", this.maxObjects).toReadOnly();
    let globalId = 0;
    let vertexOffset = 0;
    const allVertices = [];
    for (const def of emitterBuffer) {
      const pool = { instances: [] };
      this.defPools.set(def.id, pool);
      def.geometriesInsideOf.updateWorldMatrix(true, true);
      const rootInverse = new THREE.Matrix4().copy(def.geometriesInsideOf.matrixWorld).invert();
      const localMatrix = new THREE.Matrix4();
      const basePositions = [];
      const vec32 = new THREE.Vector3();
      def.geometriesInsideOf.traverse((child) => {
        if (child.isMesh) {
          const mesh = child;
          const geometry = mesh.geometry;
          if (!geometry || !geometry.attributes.position) return;
          localMatrix.multiplyMatrices(rootInverse, mesh.matrixWorld);
          const posAttr = geometry.attributes.position;
          for (let i = 0; i < posAttr.count; i++) {
            vec32.fromBufferAttribute(posAttr, i);
            vec32.applyMatrix4(localMatrix);
            basePositions.push(vec32.x, vec32.y, vec32.z);
          }
        }
      });
      const defVertexCount = basePositions.length / 3;
      for (let v = 0; v < basePositions.length; v += 3) {
        allVertices.push(basePositions[v], basePositions[v + 1], basePositions[v + 2], 0);
      }
      for (let i = 0; i < def.maxCount; i++) {
        const id = globalId++;
        const proxyObj = new THREE.Object3D();
        proxyObj.name = `${def.id}_proxy_${i}`;
        for (let j = 0; j < defVertexCount; j++) {
          vertexInstanceData.push(vertexOffset + j, id, 0, 0);
        }
        const emitterData = {
          object: proxyObj,
          options: {
            tintFactor: 0,
            emitMultiplier: 0
          },
          id,
          prevPosition: new THREE.Vector3(),
          currentPosition: new THREE.Vector3(),
          velocity: new THREE.Vector3(),
          active: false
        };
        pool.instances.push(emitterData);
        this.emitters.push(emitterData);
        this.objectMap.set(proxyObj, emitterData);
      }
      vertexOffset += defVertexCount * def.maxCount;
    }
    this.instanceInfoData = new Uint32Array(vertexInstanceData);
    this.totalUniqueVertexCount = allVertices.length / 4;
    this.instanceInfoAttr = new THREE.StorageBufferAttribute(this.instanceInfoData, 4);
    this.totalInstancesVertices = vertexOffset;
    this.instanceInfoStorageNode = storage(
      this.instanceInfoAttr,
      "uvec4",
      this.totalInstancesVertices
    ).toReadOnly();
    const vertexData = new Float32Array(allVertices);
    this.combinedVertexAttr = new THREE.StorageBufferAttribute(vertexData, 4);
    this.verticesStorageNode = storage(this.combinedVertexAttr, "vec4", this.totalUniqueVertexCount).toReadOnly();
    this.uploadAllThreshold = Math.floor(this.maxObjects * 0.25);
  }
  getFireFor(defId, options = {}) {
    const pool = this.defPools.get(defId);
    if (!pool) {
      console.warn(`EmitterManager: Definition ID '${defId}' not found.`);
      return null;
    }
    const inactiveInstance = pool.instances.find((inst) => !inst.active);
    if (!inactiveInstance) {
      console.warn(`EmitterManager: Max emitters reached for definition '${defId}'.`);
      return null;
    }
    inactiveInstance.active = true;
    inactiveInstance.options.tintFactor = options.tintFactor ?? 0;
    inactiveInstance.options.emitMultiplier = options.emitMultiplier ?? 1;
    inactiveInstance.object.getWorldPosition(inactiveInstance.prevPosition);
    return inactiveInstance.object;
  }
  releaseFire(proxy) {
    const emitterData = this.objectMap.get(proxy);
    if (!emitterData) {
      console.warn("EmitterManager: Object not found in registry.");
      return;
    }
    emitterData.active = false;
    emitterData.options.emitMultiplier = 0;
    const { id } = emitterData;
    this.matrixData.fill(0, id * 16, id * 16 + 16);
    this.propData.fill(0, id * 4, id * 4 + 4);
    this.velData.fill(0, id * 4, id * 4 + 4);
    this.matrixAttr.addUpdateRange(id * 16, 16);
    this.propAttr.addUpdateRange(id * 4, 4);
    this.velAttr.addUpdateRange(id * 4, 4);
    this.matrixAttr.needsUpdate = true;
    this.propAttr.needsUpdate = true;
    this.velAttr.needsUpdate = true;
  }
  /**
   * extract the data from the proxy object and pass it to the GPU
   * @param deltaTime
   */
  update(deltaTime) {
    const dt = Math.max(deltaTime, 1e-3);
    this.matrixAttr.clearUpdateRanges();
    this.propAttr.clearUpdateRanges();
    this.velAttr.clearUpdateRanges();
    let matrixBufferChanged = 0;
    let propBufferChanged = 0;
    let velBufferChanged = 0;
    for (const emitter of this.emitters) {
      const { object, options, id, prevPosition, currentPosition, velocity, active } = emitter;
      const propOffset = id * 4;
      const currentActive = this.propData[propOffset];
      const activeChanged = Number(active) !== currentActive;
      if (activeChanged) {
        if (!active) {
          this.propData[propOffset] = 0;
          this.propAttr.addUpdateRange(propOffset, 1);
          propBufferChanged++;
          continue;
        }
      }
      object.updateMatrixWorld();
      let matrixChanged = false;
      const matrixOffset = id * 16;
      const elements = object.matrixWorld.elements;
      for (let i = 0; i < 16; i++) {
        if (this.matrixData[matrixOffset + i] !== elements[i]) {
          this.matrixData[matrixOffset + i] = elements[i];
          matrixChanged = true;
        }
      }
      if (matrixChanged) {
        this.matrixAttr.addUpdateRange(matrixOffset, 16);
        matrixBufferChanged++;
      }
      object.getWorldPosition(currentPosition);
      velocity.subVectors(currentPosition, prevPosition).divideScalar(dt);
      const speed = velocity.length();
      prevPosition.copy(currentPosition);
      if (activeChanged || this.propData[propOffset + 1] !== options.emitMultiplier || this.propData[propOffset + 2] !== options.tintFactor) {
        this.propData[propOffset] = Number(active);
        this.propData[propOffset + 1] = options.emitMultiplier;
        this.propData[propOffset + 2] = options.tintFactor;
        this.propAttr.addUpdateRange(propOffset, 4);
        propBufferChanged++;
      }
      const velOffset = id * 4;
      if (this.velData[velOffset + 0] !== velocity.x || this.velData[velOffset + 1] !== velocity.y || this.velData[velOffset + 2] !== velocity.z || this.velData[velOffset + 3] !== speed) {
        this.velData[velOffset + 0] = velocity.x;
        this.velData[velOffset + 1] = velocity.y;
        this.velData[velOffset + 2] = velocity.z;
        this.velData[velOffset + 3] = speed;
        this.velAttr.addUpdateRange(velOffset, 4);
        velBufferChanged++;
      }
    }
    if (matrixBufferChanged > this.uploadAllThreshold) {
      this.matrixAttr.clearUpdateRanges();
    }
    if (propBufferChanged > this.uploadAllThreshold) {
      this.propAttr.clearUpdateRanges();
    }
    if (velBufferChanged > this.uploadAllThreshold) {
      this.velAttr.clearUpdateRanges();
    }
    if (matrixBufferChanged) this.matrixAttr.needsUpdate = true;
    if (propBufferChanged) this.propAttr.needsUpdate = true;
    if (velBufferChanged) this.velAttr.needsUpdate = true;
  }
  /**
   * Returns a node that will dispatch a compute shader for each vertex of each active emitter.
   * @param forEachInstanceVertex A function that will be called for each vertex of each active emitter.
   * @returns A node that will dispatch a compute shader for each vertex of each active emitter.
   */
  computeNodePerVertex(forEachInstanceVertex) {
    return Fn(() => {
      If(instanceIndex.greaterThanEqual(this.totalInstancesVertices), () => {
        Return();
      });
      const pointer = this.instanceInfoStorageNode.element(instanceIndex);
      const vertexOffset = pointer.x;
      const instanceId = pointer.y;
      const localPos = this.verticesStorageNode.element(vertexOffset).xyz;
      const props = this.propsStorageNode.element(instanceId);
      const active = props.r.greaterThan(0);
      const emitMultiplier = props.g;
      const tintFactor = props.b;
      If(active.and(emitMultiplier.greaterThan(0)), () => {
        const transformMat = this.matricesStorageNode.element(instanceId);
        const worldPos = transformMat.mul(vec4(localPos, 1)).xyz;
        forEachInstanceVertex(
          localPos,
          worldPos,
          emitMultiplier,
          transformMat,
          this.velocitiesStorageNode.element(instanceId),
          tintFactor
        );
      });
    })().compute(this.totalInstancesVertices);
  }
};
export {
  EmitterManager
};
