var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { Matrix4, Quaternion, Vector3 } from "three/webgpu";
import { cross, dot, float, If, Loop, mat4, uint, uniform, uniformArray, vec3, vec4, normalize, mix } from "three/tsl";
import { sdfSampler } from "./sdfSampler";
import { SDFBox } from "./shape/SDFBox";
import { SDFEllipsoid } from "./shape/SDFEllipsoid";
const v = new Vector3();
const q = new Quaternion();
const deltaQ = new Quaternion();
const invertedQ = new Quaternion();
const UNIFORM_SCALE = new Vector3(1, 1, 1);
const tempScale = new Vector3();
class CollisionHandler {
  // [ vec3(vx,vy,vz), --- ]
  constructor(config = {}) {
    /**
     * Uniforms used to store data relative to the colliders such as their position, velocity, inverse matrix, etc...
     */
    __publicField(this, "context");
    __publicField(this, "uCollisionMargin");
    // private uBoxes: UniformArrayNode<"uint">; // [ dataIndex]
    // private uBoxCount: UniformNode<"uint", number>;
    /**
     * Base Surface friction coefficient of surfaces
     */
    __publicField(this, "uFriction", uniform(0.8, "float"));
    /**
     * Inverse matrices
     */
    __publicField(this, "dataBindings", []);
    __publicField(this, "config");
    __publicField(this, "obj2Collider", /* @__PURE__ */ new WeakMap());
    __publicField(this, "removeCollider", /* @__PURE__ */ new Map());
    /**
     * scans all the colliding sdf shapes and returns the distance
     */
    __publicField(this, "mapSDF");
    __publicField(this, "bakeTexture");
    // [ vec3(normal), distance(float) ]
    __publicField(this, "bakeVelocityTexture");
    const customShapes = config.sdfShapes ?? [];
    delete config.sdfShapes;
    const cfg = {
      friction: 0.8,
      collisionMargin: 0,
      angularVelocityMultiplier: 1,
      maxCollisionShapes: {
        total: 64,
        boxes: 12,
        ellipsoids: 12
      },
      sdfShapes: [],
      ...config
    };
    cfg.sdfShapes = [
      new SDFBox(cfg.maxCollisionShapes.boxes, "box"),
      new SDFEllipsoid(cfg.maxCollisionShapes.boxes, "ellipsoid")
    ];
    customShapes.forEach((custom) => {
      const existingIndex = cfg.sdfShapes.findIndex((shape) => shape.name == custom.name);
      if (existingIndex > -1) {
        cfg.sdfShapes[existingIndex] = custom;
      } else {
        cfg.sdfShapes.push(custom);
      }
    });
    this.config = cfg;
    this.uCollisionMargin = uniform(cfg.collisionMargin);
    this.uFriction.value = cfg.friction;
    const totalObjects = cfg.sdfShapes.reduce((total, shape) => total + shape.maxCount, 0);
    if (totalObjects > cfg.maxCollisionShapes.total) {
      throw new Error(
        `Too many collision shapes, max is set at ${cfg.maxCollisionShapes.total} but ${totalObjects} shapes are defined.`
      );
    }
    this.context = {
      //
      // create buffer data for all colliders...
      //
      uHalfExtents: uniformArray(
        Array.from({ length: totalObjects }, () => new Vector3()),
        "vec3"
      ),
      uInverseMatrices: uniformArray(
        Array.from({ length: totalObjects }, () => new Matrix4()),
        "mat4"
      ),
      uWorldPositions: uniformArray(
        Array.from({ length: totalObjects }, () => new Vector3()),
        "vec3"
      ),
      uVelocities: uniformArray(
        Array.from({ length: totalObjects }, () => new Vector3()),
        "vec3"
      ),
      uAngularVelocities: uniformArray(
        Array.from({ length: totalObjects }, () => new Vector3()),
        "vec3"
      ),
      uIsActive: uniformArray(
        Array.from({ length: totalObjects }, () => false),
        "uint"
      )
    };
    this.dataBindings = Array.from({ length: totalObjects }, (_, i) => ({
      index: i,
      object: void 0,
      previousRotation: new Quaternion(),
      initialized: false
    }));
    this.mapSDF = sdfSampler((worldPos, outVelocity, outNormal) => {
      const closestVelocity = vec3(0).toVar();
      const closestNormal = vec3(0).toVar();
      const winningInvMatrix = mat4().toVar();
      const winningHalfExtents = vec3().toVar();
      const foundCollider = float(0).toVar();
      const shapeType = uint(0).toVar();
      const margin = this.uCollisionMargin;
      const minDistance = float(999.9).toVar();
      this.config.sdfShapes.forEach((shape) => {
        Loop({ start: 0, end: shape.maxCount }, ({ i }) => {
          const shapeDataIndex = shape.uDataIndex.element(i);
          const realDataIndex = shapeDataIndex.sub(1).setName("realIndex");
          const isActive = this.context.uIsActive.element(realDataIndex).greaterThan(0);
          If(shapeDataIndex.greaterThan(0).and(isActive), () => {
            const invMatrix = this.context.uInverseMatrices.element(realDataIndex);
            const hExtents = this.context.uHalfExtents.element(realDataIndex);
            const sdf = shape.sdf(invMatrix.mul(vec4(worldPos, 1)).xyz, hExtents).mul(margin.oneMinus());
            If(sdf.lessThan(minDistance), () => {
              minDistance.assign(sdf);
              winningInvMatrix.assign(invMatrix);
              winningHalfExtents.assign(hExtents);
              foundCollider.assign(1);
              const center = this.context.uWorldPositions.element(realDataIndex);
              const linVel = this.context.uVelocities.element(realDataIndex);
              const angVel = this.context.uAngularVelocities.element(realDataIndex);
              const rotVel = cross(angVel, worldPos.sub(center));
              closestVelocity.assign(linVel.add(rotVel));
              shapeType.assign(uint(shape.shapeTypeIndex));
            });
          });
        });
      });
      If(foundCollider.greaterThan(0).and(minDistance.lessThan(margin)), () => {
        const e = float(0.1);
        const eX = vec3(e, 0, 0);
        const eY = vec3(0, e, 0);
        const eZ = vec3(0, 0, e);
        const pRight = winningInvMatrix.mul(vec4(worldPos.add(eX), 1)).xyz;
        const pLeft = winningInvMatrix.mul(vec4(worldPos.sub(eX), 1)).xyz;
        const pUp = winningInvMatrix.mul(vec4(worldPos.add(eY), 1)).xyz;
        const pDown = winningInvMatrix.mul(vec4(worldPos.sub(eY), 1)).xyz;
        const pForward = winningInvMatrix.mul(vec4(worldPos.add(eZ), 1)).xyz;
        const pBack = winningInvMatrix.mul(vec4(worldPos.sub(eZ), 1)).xyz;
        const dx = float(0).toVar();
        const dy = float(0).toVar();
        const dz = float(0).toVar();
        const extents = winningHalfExtents;
        this.config.sdfShapes.forEach((shape) => {
          If(shapeType.equal(uint(shape.shapeTypeIndex)), () => {
            dx.assign(shape.sdf(pRight, extents).sub(shape.sdf(pLeft, extents)));
            dy.assign(shape.sdf(pUp, extents).sub(shape.sdf(pDown, extents)));
            dz.assign(shape.sdf(pForward, extents).sub(shape.sdf(pBack, extents)));
          });
        });
        closestNormal.assign(normalize(vec3(dx, dy, dz)));
      });
      outVelocity.assign(closestVelocity);
      outNormal.assign(closestNormal);
      return minDistance;
    });
  }
  get collisionMargin() {
    return this.uCollisionMargin.value;
  }
  set collisionMargin(v2) {
    this.uCollisionMargin.value = v2;
  }
  /**
   * Use the object as a proxy to control a collider in the simulation.
   *
   * @param obj This object will be used to position and transform the collider in the simulation. You can movie it around and the simulation will sync.
   * @param colliderType
   */
  makeObjectCollidable(obj, type, colliderConfig = {}) {
    const shape = this.config.sdfShapes.find((shapeDef) => shapeDef.name == type);
    if (!shape) {
      throw new Error(
        `Collider type "${type}" not found on: ${this.config.sdfShapes.map((shape2) => shape2.name)}`
      );
    }
    const dataIndex = this.bindMatrix(obj) + 1;
    shape.createColliderOn(obj, dataIndex, colliderConfig);
    const removeFn = () => {
      shape.destroyColliderFrom(obj, dataIndex, colliderConfig);
      this.unbindMatrix(obj);
      this.removeCollider.delete(obj);
      this.obj2Collider.delete(obj);
    };
    this.obj2Collider.set(obj, shape);
    this.removeCollider.set(obj, removeFn);
  }
  /**
   * Finds an "empty data slot" to assotiate that index with the data that this collider will use.
   * @param target
   * @returns
   */
  bindMatrix(target) {
    const freeBinding = this.dataBindings.find((b) => !b.object);
    if (!freeBinding) {
      throw new RangeError(`Too many colliders, only ${this.config.maxCollisionShapes} supported.`);
    }
    freeBinding.object = target;
    freeBinding.initialized = false;
    this.context.uIsActive.array[freeBinding.index] = 1;
    return freeBinding.index;
  }
  unbindMatrix(from) {
    for (const binding of this.dataBindings) {
      if (binding.object === from) {
        binding.object = void 0;
        this.context.uIsActive.array[binding.index] = 0;
      }
    }
  }
  // private createBoxCollider(obj: Object3D, halfExtents: Vector3Like = { x: 0.5, y: 0.5, z: 0.5 }) {
  // 	const boxes = this.uBoxes.array as Vector2[];
  // 	const freeBoxIndex = boxes.findIndex((slot) => slot.x === 0);
  // 	if (freeBoxIndex === -1) {
  // 		throw new RangeError(`Too many colliders of type box, only ${this.config.maxBoxes} supported`);
  // 	}
  // 	const matrixIndex = this.bindMatrix(obj);
  // 	boxes[freeBoxIndex].set(1, matrixIndex);
  // 	const removeFn = () => {
  // 		boxes[freeBoxIndex].set(0, 0);
  // 		this.unbindMatrix(obj);
  // 		this.removeCollider.delete(obj);
  // 	};
  // 	this.removeCollider.set(obj, removeFn);
  // }
  clearObjectAsCollidable(obj) {
    const removeFn = this.removeCollider.get(obj);
    if (removeFn) {
      this.removeCollider.delete(obj);
      removeFn();
    }
  }
  update(delta) {
    if (this.config.disabled) return;
    for (const binding of this.dataBindings) {
      if (binding.object) {
        const dataIndex = binding.index;
        binding.object.updateWorldMatrix(true, false);
        binding.object.getWorldPosition(v);
        binding.object.getWorldQuaternion(q);
        binding.object.getWorldScale(tempScale);
        const matrix = this.context.uInverseMatrices.array[dataIndex];
        matrix.compose(v, q, UNIFORM_SCALE).invert();
        const worldPos = this.context.uWorldPositions.array[dataIndex];
        const velocity = this.context.uVelocities.array[dataIndex];
        const angularVel = this.context.uAngularVelocities.array[dataIndex];
        const halfExtents = this.context.uHalfExtents.array[dataIndex];
        if (binding.initialized) {
          velocity.subVectors(v, worldPos).divideScalar(delta);
          if (q.dot(binding.previousRotation) < 0) {
            q.set(-q.x, -q.y, -q.z, -q.w);
          }
          invertedQ.copy(binding.previousRotation).invert();
          deltaQ.copy(q).multiply(invertedQ);
          const angle = 2 * Math.acos(Math.max(-1, Math.min(1, deltaQ.w)));
          const s = Math.sqrt(1 - deltaQ.w * deltaQ.w);
          if (s > 1e-3) {
            angularVel.set(deltaQ.x, deltaQ.y, deltaQ.z).divideScalar(s).multiplyScalar(angle / delta).multiplyScalar(this.config.angularVelocityMultiplier);
          } else {
            angularVel.set(0, 0, 0);
          }
        } else {
          velocity.set(0, 0, 0);
          angularVel.set(0, 0, 0);
          binding.initialized = true;
        }
        worldPos.copy(v);
        halfExtents.copy(tempScale);
        binding.previousRotation.copy(q);
        this.obj2Collider.get(binding.object)?.update(binding.object, dataIndex, delta);
      }
    }
  }
  drawDebugShapes(out, uvw) {
    const d = this.distanceAtPoint(uvw);
    If(d.lessThan(0), () => {
      out.assign(vec3(111, 0, 0));
    });
  }
  distanceAtPoint(uvw) {
    return this.bakeTexture.sample(uvw).w;
  }
  normalAtPoint(uvw) {
    return this.bakeTexture.sample(uvw).xyz;
  }
  /**
   * use this texture to store baked colliders
   */
  setBakeTexture(sdfTexture, sdfVelocityTexture) {
    this.bakeTexture = sdfTexture;
    this.bakeVelocityTexture = sdfVelocityTexture;
  }
  /**
   * This is the compute that will bake the colliders into the `sdfTexture` you set on `setBakeTexture`.
   */
  bakeCollidersPass(context) {
    return () => {
      const coord = context.grid.phy.coord;
      const uvw = context.grid.phy.uvw;
      const localPos = uvw.sub(0.5).mul(context.uVolumeWorldSize);
      const worldPos = context.worldMatrix.mul(vec4(localPos, 1)).xyz;
      const closestNormal = vec3(0).toVar();
      const closestVelocity = vec3(0).toVar();
      const minDistance = this.mapSDF(worldPos, closestVelocity, closestNormal);
      this.bakeTexture.write(coord, vec4(closestNormal, minDistance));
      this.bakeVelocityTexture.write(coord, vec4(closestVelocity, 0));
    };
  }
  makeVelocityAvoidColliders(vel, uvw) {
    if (this.config.disabled) return;
    const sdfData = this.bakeTexture.sample(uvw);
    const minDistance = sdfData.w;
    const normal = sdfData.xyz;
    const objVel = this.bakeVelocityTexture.sample(uvw).xyz;
    const margin = float(0.1);
    If(minDistance.lessThanEqual(margin), () => {
      If(minDistance.lessThan(0), () => {
        const ejectionSpeed = minDistance.abs().mul(20);
        vel.assign(objVel.add(normal.mul(ejectionSpeed)));
      }).Else(() => {
        const proximity = margin.sub(minDistance).div(margin);
        const friction = this.uFriction;
        const dragFactor = proximity.mul(friction);
        vel.assign(mix(vel, objVel, dragFactor));
        const relativeVel = vel.sub(objVel);
        const relDotN = dot(relativeVel, normal);
        If(relDotN.lessThan(0), () => {
          vel.subAssign(normal.mul(relDotN));
        });
      });
    });
  }
  /**
   * Call this when you want to sample a voxel from the perspective of `uvw` to know if that sampled point landed on a solid object and if so what normal direction does it have
   * relative to us...
   *
   * @param grid the size of the 3d texture we are sampling
   * @param worldSize the size of the simulation space in world units
   * @param worldMatrix the world matrix to use to convert world units to the local space of the simulation box
   * @param fromWorldPos world position from where we are sampling
   * @param uvw uvw coordinate of the voxel doing the sampling
   * @param texelOffset offset relative to uvw from which to do the actual sampling
   * @param calculateNormal if you want to get the normal vector of the SDF surface
   * @param onHit called if there's a hit
   * @param onMiss called if nothing was hit
   */
  checkCollisionAt(grid, worldSize, worldMatrix, voxelLocalPos, uvw, texelOffset, calculateNormal, onHit, onMiss) {
    const offset = vec3(grid.texel.x, grid.texel.y, grid.texel.z).mul(texelOffset);
    const otherUVW = uvw.add(offset);
    const sdfData = this.bakeTexture.sample(otherUVW);
    const hitDistance = sdfData.w;
    const normal = sdfData.xyz;
    If(hitDistance.lessThanEqual(0), () => {
      onHit(otherUVW, hitDistance, normal);
    }).Else(() => {
      onMiss(otherUVW);
    });
  }
}
export {
  CollisionHandler
};
