// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/interface-structure-layer.ts
import {
  BufferGeometry,
  Box3,
  Color as Color2,
  DepthTexture,
  DirectionalLight,
  DoubleSide,
  Float32BufferAttribute,
  HalfFloatType,
  LinearFilter,
  LinearSRGBColorSpace,
  Matrix4,
  Mesh,
  NearestFilter,
  RenderTarget,
  Scene,
  Sphere,
  Vector2
} from "https://esm.sh/three@0.185.1?external";
import { MeshStandardNodeMaterial } from "https://esm.sh/three@0.185.1/webgpu?external=three";
import {
  cameraPosition,
  cameraProjectionMatrix,
  cameraViewMatrix,
  dot,
  float,
  Fn,
  If,
  max,
  mix,
  modelWorldMatrix,
  normalize,
  positionLocal,
  positionWorld,
  select,
  smoothstep,
  step,
  texture,
  uniform as uniform2,
  vec2,
  vec3,
  vec4
} from "https://esm.sh/three@0.185.1/tsl?external=three";
import { mergeGeometries } from "https://esm.sh/three@0.185.1/examples/jsm/utils/BufferGeometryUtils.js?external=three";
import { TessellateModifier } from "https://esm.sh/three@0.185.1/examples/jsm/modifiers/TessellateModifier.js?external=three";

// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/sun.ts
import { Color, Vector3 } from "https://esm.sh/three@0.185.1?external";
import { uniform } from "https://esm.sh/three@0.185.1/tsl?external=three";
var SUN_ELEVATION = 42 * Math.PI / 180;
var SUN_AZIMUTH = 215 * Math.PI / 180;
var sunDirection = new Vector3(
  Math.cos(SUN_ELEVATION) * Math.sin(SUN_AZIMUTH),
  Math.sin(SUN_ELEVATION),
  Math.cos(SUN_ELEVATION) * Math.cos(SUN_AZIMUTH)
).normalize();
var sunColor = new Color(1, 0.925, 0.79);
var SUN_LIGHT_INTENSITY = 3.4;
var sunDirectionUniform = uniform(sunDirection);
var sunColorUniform = uniform(sunColor);

// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/optical-constants.ts
var AIR_IOR = 1;
var WATER_IOR = 1.333;

// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/interface-structure-layer.ts
var TARGET_SCALE = 0.5;
var TARGET_MAX_EDGE = 1024;
var ACTIVE_SURFACE_MARGIN = 1;
var ACTIVE_CAMERA_DISTANCE = 90;
var CRITICAL_TANGENT = Math.tan(Math.asin(AIR_IOR / WATER_IOR));
var INTERFACE_SOLVE_STEPS = 14;
function clipGeometryAboveY(source, minimumY) {
  const geometry = source.index ? source.toNonIndexed() : source;
  const attributes = Object.entries(geometry.attributes).filter(
    ([, attribute]) => attribute.itemSize >= 1 && attribute.itemSize <= 4
  );
  const output = new Map(attributes.map(([name]) => [name, []]));
  const position = geometry.getAttribute("position");
  if (!position) return new BufferGeometry();
  const componentAt = (attribute, index, component) => {
    switch (component) {
      case 0:
        return attribute.getX(index);
      case 1:
        return attribute.getY(index);
      case 2:
        return attribute.getZ(index);
      default:
        return attribute.getW(index);
    }
  };
  const readVertex = (index) => Object.fromEntries(
    attributes.map(([name, attribute]) => [
      name,
      Array.from(
        { length: attribute.itemSize },
        (_, component) => componentAt(attribute, index, component)
      )
    ])
  );
  const interpolate = (a, b) => {
    const ay = a.position[1];
    const by = b.position[1];
    const heightDelta = by - ay;
    const t = (minimumY - ay) / (Math.abs(heightDelta) > 1e-8 ? heightDelta : 1e-8);
    return Object.fromEntries(
      attributes.map(([name]) => [
        name,
        a[name].map((value, component) => value + (b[name][component] - value) * t)
      ])
    );
  };
  const emit = (vertex) => {
    for (const [name] of attributes) output.get(name)?.push(...vertex[name]);
  };
  for (let triangle = 0; triangle < position.count; triangle += 3) {
    let polygon = [
      readVertex(triangle),
      readVertex(triangle + 1),
      readVertex(triangle + 2)
    ];
    const clipped = [];
    for (let i = 0; i < polygon.length; i++) {
      const previous = polygon[(i + polygon.length - 1) % polygon.length];
      const current = polygon[i];
      const previousInside = previous.position[1] >= minimumY;
      const currentInside = current.position[1] >= minimumY;
      if (currentInside) {
        if (!previousInside) clipped.push(interpolate(previous, current));
        clipped.push(current);
      } else if (previousInside) {
        clipped.push(interpolate(previous, current));
      }
    }
    polygon = clipped;
    for (let i = 1; i + 1 < polygon.length; i++) {
      emit(polygon[0]);
      emit(polygon[i]);
      emit(polygon[i + 1]);
    }
  }
  const result = new BufferGeometry();
  for (const [name, attribute] of attributes) {
    result.setAttribute(
      name,
      new Float32BufferAttribute(output.get(name) ?? [], attribute.itemSize)
    );
  }
  result.computeBoundingBox();
  result.computeBoundingSphere();
  if (geometry !== source) geometry.dispose();
  return result;
}
var InterfaceStructureLayer = class {
  constructor(sim, submerged) {
    this.scene = new Scene();
    this.activeUniform = uniform2(0);
    this.structures = [];
    this.size = new Vector2();
    this.clearColor = new Color2();
    this.rootInverse = new Matrix4();
    this.relativeMatrix = new Matrix4();
    this.warmed = false;
    this.active = false;
    this.sim = sim;
    this.submerged = submerged;
    const depthTexture = new DepthTexture(1, 1);
    depthTexture.minFilter = NearestFilter;
    depthTexture.magFilter = NearestFilter;
    this.target = new RenderTarget(1, 1, {
      type: HalfFloatType,
      depthBuffer: true,
      depthTexture
    });
    this.target.texture.colorSpace = LinearSRGBColorSpace;
    this.target.texture.minFilter = LinearFilter;
    this.target.texture.magFilter = LinearFilter;
    this.target.texture.generateMipmaps = false;
    this.nodes = {
      color: texture(this.target.texture),
      depth: texture(depthTexture),
      active: this.activeUniform
    };
    const sun = new DirectionalLight(sunColor, SUN_LIGHT_INTENSITY);
    sun.position.copy(sunDirection).multiplyScalar(100);
    sun.target.position.set(0, 0, 0);
    sun.castShadow = false;
    this.scene.add(sun, sun.target);
  }
  register({
    name = "Interface structure",
    root,
    meshes,
    maxEdgeLength,
    minimumLocalY,
    stableMeanSurface = false,
    liveInterfaceMotion = false,
    underwaterOnly = false,
    maxCameraDistance = ACTIVE_CAMERA_DISTANCE
  }) {
    if (meshes.length === 0) throw new Error("Interface structure requires at least one mesh");
    if (maxEdgeLength !== void 0 && !(maxEdgeLength > 0)) {
      throw new Error("Interface structure max edge length must be positive");
    }
    if (liveInterfaceMotion && !stableMeanSurface) {
      throw new Error("Live interface motion applies only to a stable mean surface");
    }
    if (liveInterfaceMotion && maxEdgeLength === void 0) {
      throw new Error("Live interface motion requires a source tessellation edge");
    }
    if (!(maxCameraDistance > 0)) {
      throw new Error("Interface structure camera distance must be positive");
    }
    root.updateWorldMatrix(true, true);
    this.rootInverse.copy(root.matrixWorld).invert();
    const materialGroups = /* @__PURE__ */ new Map();
    for (const source of meshes) {
      if (Array.isArray(source.material)) {
        throw new Error("Interface structure meshes must use one material");
      }
      if (!(source.material instanceof MeshStandardNodeMaterial)) {
        throw new Error("Interface structure requires MeshStandardNodeMaterial meshes");
      }
      const group = materialGroups.get(source.material);
      if (group) group.push(source);
      else materialGroups.set(source.material, [source]);
    }
    const mergedGroups = [];
    const localBounds = new Box3().makeEmpty();
    const tessellator = maxEdgeLength ? new TessellateModifier(maxEdgeLength, 8) : null;
    for (const [sourceMaterial, sources] of materialGroups) {
      const geometries = [];
      for (const source of sources) {
        this.relativeMatrix.multiplyMatrices(this.rootInverse, source.matrixWorld);
        let prepared = source.geometry.clone().applyMatrix4(this.relativeMatrix);
        if (minimumLocalY !== void 0) {
          const clipped = clipGeometryAboveY(prepared, minimumLocalY);
          prepared.dispose();
          prepared = clipped;
        }
        if ((prepared.getAttribute("position")?.count ?? 0) === 0) {
          prepared.dispose();
          continue;
        }
        if (tessellator) {
          const tessellated = tessellator.modify(prepared);
          prepared.dispose();
          prepared = tessellated;
        }
        geometries.push(prepared);
      }
      if (geometries.length === 0) continue;
      const merged = mergeGeometries(geometries, false);
      for (const geometry of geometries) geometry.dispose();
      if (!merged) {
        for (const group of mergedGroups) group.geometry.dispose();
        throw new Error("Unable to merge interface structure geometry");
      }
      merged.computeBoundingBox();
      merged.computeBoundingSphere();
      if (!merged.boundingBox) {
        merged.dispose();
        for (const group of mergedGroups) group.geometry.dispose();
        throw new Error("Interface structure geometry has no bounds");
      }
      localBounds.union(merged.boundingBox);
      mergedGroups.push({ geometry: merged, sourceMaterial });
    }
    const cascadeKeepsAt = (worldXZ) => {
      const baseWorld = vec3(worldXZ.x, 0, worldXZ.y);
      const distance = cameraPosition.sub(baseWorld).length();
      const heightGap = cameraPosition.y.abs().max(0.5);
      const pixelFootprint = distance.mul(distance).mul(1e-3).div(heightGap);
      return [
        float(1).sub(smoothstep(2.5, 5.5, pixelFootprint)),
        float(1).sub(smoothstep(0.35, 1.2, pixelFootprint)),
        float(1).sub(smoothstep(0.1, 0.4, pixelFootprint))
      ];
    };
    const surfaceHeightAt = (worldXZ) => {
      const keeps = cascadeKeepsAt(worldXZ);
      let height = this.sim.displacementNodes[0].sample(worldXZ.div(this.sim.patchLengths[0])).y.mul(keeps[0]);
      for (let i = 1; i < this.sim.displacementNodes.length; i++) {
        height = height.add(
          this.sim.displacementNodes[i].sample(worldXZ.div(this.sim.patchLengths[i])).y.mul(keeps[i])
        );
      }
      return height;
    };
    const surfaceNormalAt = (worldXZ) => {
      const baseWorld = vec3(worldXZ.x, 0, worldXZ.y);
      const distance = cameraPosition.sub(baseWorld).length();
      const heightGap = cameraPosition.y.abs().max(0.5);
      const pixelFootprint = distance.mul(distance).mul(1e-3).div(heightGap);
      const keeps = cascadeKeepsAt(worldXZ);
      const derivative0 = this.sim.derivativeNodes[0].sample(
        worldXZ.div(this.sim.patchLengths[0])
      );
      let belowDerivatives = derivative0;
      for (let i = 1; i < this.sim.derivativeNodes.length; i++) {
        belowDerivatives = belowDerivatives.add(
          this.sim.derivativeNodes[i].sample(
            worldXZ.div(this.sim.patchLengths[i])
          ).mul(keeps[i])
        );
      }
      const aboveDerivatives = belowDerivatives.sub(
        derivative0.mul(float(1).sub(keeps[0]))
      );
      const derivatives = mix(aboveDerivatives, belowDerivatives, this.submerged);
      const slopeX = derivatives.x.div(max(0.18, derivatives.z.add(1)));
      const slopeZ = derivatives.y.div(max(0.18, derivatives.w.add(1)));
      const resolved = normalize(vec3(slopeX.negate(), 1, slopeZ.negate()));
      const belowDistanceFade = smoothstep(5, 16, pixelFootprint).mul(
        this.submerged
      );
      return normalize(mix(resolved, vec3(0, 1, 0), belowDistanceFade));
    };
    const solveTangentInterface = (sourceWorld, planePoint, orientedNormal) => {
      const cameraPlaneDistance = max(
        dot(planePoint.sub(cameraPosition), orientedNormal),
        1e-3
      );
      const sourcePlaneDistance = max(
        dot(sourceWorld.sub(planePoint), orientedNormal),
        1e-3
      );
      const cameraProjection = cameraPosition.add(
        orientedNormal.mul(cameraPlaneDistance)
      );
      const sourceProjection = sourceWorld.sub(
        orientedNormal.mul(sourcePlaneDistance)
      );
      const tangentOffset = sourceProjection.sub(cameraProjection);
      const tangentLength = tangentOffset.length();
      const tangent = tangentOffset.div(max(tangentLength, 1e-3));
      const cameraIor = mix(AIR_IOR, WATER_IOR, this.submerged);
      const sourceIor = mix(WATER_IOR, AIR_IOR, this.submerged);
      const inWater = this.submerged.greaterThan(0.5);
      const cameraReach = cameraPlaneDistance.mul(CRITICAL_TANGENT);
      const sourceReach = sourcePlaneDistance.mul(CRITICAL_TANGENT);
      const low = select(
        inWater,
        float(0),
        tangentLength.sub(sourceReach).max(0)
      ).toVar();
      const high = select(
        inWater,
        tangentLength.min(cameraReach),
        tangentLength
      ).toVar();
      for (let i = 0; i < INTERFACE_SOLVE_STEPS; i++) {
        const middle = low.add(high).mul(0.5);
        const sourceTangentDistance = tangentLength.sub(middle);
        const cameraSine = middle.div(
          cameraPlaneDistance.mul(cameraPlaneDistance).add(middle.mul(middle)).sqrt()
        );
        const sourceSine = sourceTangentDistance.div(
          sourcePlaneDistance.mul(sourcePlaneDistance).add(sourceTangentDistance.mul(sourceTangentDistance)).sqrt()
        );
        const moveTowardSource = cameraIor.mul(cameraSine).lessThan(sourceIor.mul(sourceSine));
        low.assign(select(moveTowardSource, middle, low));
        high.assign(select(moveTowardSource, high, middle));
      }
      return cameraProjection.add(tangent.mul(low.add(high).mul(0.5)));
    };
    const applyInterfaceMotion = (direction, tilt, sourceDistance) => {
      const cameraIor = mix(AIR_IOR, WATER_IOR, this.submerged);
      const sourceIor = mix(WATER_IOR, AIR_IOR, this.submerged);
      const eta = cameraIor.div(sourceIor);
      const cosIncident = direction.y.abs().max(0.02);
      const sinTransmitted2 = eta.mul(eta).mul(float(1).sub(cosIncident.mul(cosIncident)));
      const cosTransmitted = float(1).sub(sinTransmitted2).max(0).sqrt().max(0.04);
      const stretch = eta.mul(cosIncident).div(cosTransmitted).max(0.04);
      const shift = tilt.sub(direction.mul(dot(tilt, direction))).mul(float(1).sub(float(1).div(stretch)).clamp(-1, 1));
      const foldLimit = float(maxEdgeLength ?? 1).mul(0.5).div(sourceDistance.max(1).mul(stretch));
      const bounded = shift.mul(
        float(1).min(foldLimit.div(shift.length().max(1e-5)))
      );
      return normalize(direction.add(bounded));
    };
    const projectedPosition = Fn(() => {
      const sourceWorld = modelWorldMatrix.mul(vec4(positionLocal, 1)).xyz;
      const directProjection = cameraProjectionMatrix.mul(cameraViewMatrix).mul(vec4(sourceWorld, 1));
      const result = directProjection.toVar();
      const sourceSurfaceHeight = stableMeanSurface ? float(0) : surfaceHeightAt(sourceWorld.xz);
      const signedHeight = sourceWorld.y.sub(sourceSurfaceHeight);
      const aboveMask = step(0, signedHeight);
      const belowMask = step(signedHeight, 0);
      const oppositeMediumMask = mix(belowMask, aboveMask, this.submerged);
      If(oppositeMediumMask.greaterThan(0.5), () => {
        const normalOrientation = this.submerged.mul(2).sub(1);
        const heightDelta = sourceWorld.y.sub(cameraPosition.y);
        const safeHeightDelta = mix(
          heightDelta.min(-1e-3),
          heightDelta.max(1e-3),
          this.submerged
        );
        const crossingFraction = cameraPosition.y.negate().div(safeHeightDelta).clamp(0, 1).toVar();
        let apparentInterface;
        let interfaceTilt = null;
        if (stableMeanSurface) {
          const crossingXZ = mix(
            cameraPosition.xz,
            sourceWorld.xz,
            crossingFraction
          );
          apparentInterface = solveTangentInterface(
            sourceWorld,
            vec3(crossingXZ.x, 0, crossingXZ.y),
            vec3(0, normalOrientation, 0)
          );
          if (liveInterfaceMotion) {
            const spacing = float(maxEdgeLength);
            const point = apparentInterface.xz;
            const slope = vec2(
              surfaceHeightAt(point.add(vec2(maxEdgeLength, 0))).sub(
                surfaceHeightAt(point.sub(vec2(maxEdgeLength, 0)))
              ),
              surfaceHeightAt(point.add(vec2(0, maxEdgeLength))).sub(
                surfaceHeightAt(point.sub(vec2(0, maxEdgeLength)))
              )
            ).div(spacing.mul(2));
            interfaceTilt = vec3(slope.x.negate(), 0, slope.y.negate()).mul(
              normalOrientation
            );
          }
        } else {
          for (let i = 0; i < 3; i++) {
            const crossingXZ2 = mix(
              cameraPosition.xz,
              sourceWorld.xz,
              crossingFraction
            );
            crossingFraction.assign(
              surfaceHeightAt(crossingXZ2).sub(cameraPosition.y).div(safeHeightDelta).clamp(0, 1)
            );
          }
          const crossingXZ = mix(
            cameraPosition.xz,
            sourceWorld.xz,
            crossingFraction
          );
          const crossingPoint = vec3(
            crossingXZ.x,
            surfaceHeightAt(crossingXZ),
            crossingXZ.y
          );
          const firstNormal = surfaceNormalAt(crossingXZ).mul(normalOrientation);
          const firstInterface = solveTangentInterface(
            sourceWorld,
            crossingPoint,
            firstNormal
          );
          const refinedXZ = firstInterface.xz;
          const refinedPoint = vec3(
            refinedXZ.x,
            surfaceHeightAt(refinedXZ),
            refinedXZ.y
          );
          const refinedNormal = surfaceNormalAt(refinedXZ).mul(normalOrientation);
          apparentInterface = solveTangentInterface(
            sourceWorld,
            refinedPoint,
            refinedNormal
          );
        }
        const sourceDistance = sourceWorld.sub(cameraPosition).length();
        const meanDirection = normalize(apparentInterface.sub(cameraPosition));
        const apparentDirection = interfaceTilt ? applyInterfaceMotion(meanDirection, interfaceTilt, sourceDistance) : meanDirection;
        const apparentWorld = cameraPosition.add(
          apparentDirection.mul(sourceDistance)
        );
        result.assign(
          cameraProjectionMatrix.mul(cameraViewMatrix).mul(vec4(apparentWorld, 1))
        );
      });
      return result;
    })();
    const fragmentSurfaceHeight = stableMeanSurface ? float(0) : surfaceHeightAt(positionWorld.xz);
    const fragmentSignedHeight = positionWorld.y.sub(fragmentSurfaceHeight);
    const fragmentTransition = fragmentSignedHeight.fwidth().max(5e-3);
    const fragmentAboveMask = smoothstep(
      fragmentTransition.negate(),
      fragmentTransition,
      fragmentSignedHeight
    );
    const fragmentBelowMask = float(1).sub(fragmentAboveMask);
    const oppositeMediumOpacity = mix(
      fragmentBelowMask,
      fragmentAboveMask,
      this.submerged
    );
    const distanceFade = float(1).sub(
      smoothstep(
        maxCameraDistance * 0.85,
        maxCameraDistance,
        cameraPosition.sub(positionWorld).length()
      )
    );
    const proxies = mergedGroups.map(({ geometry, sourceMaterial }, index) => {
      const material = sourceMaterial.clone();
      material.transparent = false;
      material.depthWrite = true;
      material.fog = false;
      material.side = DoubleSide;
      material.vertexNode = projectedPosition;
      material.opacityNode = oppositeMediumOpacity.mul(distanceFade);
      material.alphaTestNode = float(1e-3);
      const proxy = new Mesh(geometry, material);
      proxy.name = `${name} water-interface proxy ${index + 1}`;
      proxy.matrixAutoUpdate = false;
      proxy.frustumCulled = false;
      this.scene.add(proxy);
      return proxy;
    });
    if (proxies.length === 0) {
      throw new Error("Interface structure produced no optical proxy draws");
    }
    const structure = {
      root,
      proxies,
      localBounds,
      worldBounds: new Box3(),
      worldSphere: new Sphere(),
      maxCameraDistance,
      underwaterOnly,
      disposed: false
    };
    this.structures.push(structure);
    return () => this.removeStructure(structure);
  }
  update(ctx) {
    let active = false;
    for (const structure of this.structures) {
      structure.root.updateWorldMatrix(true, false);
      structure.worldBounds.copy(structure.localBounds).applyMatrix4(structure.root.matrixWorld);
      structure.worldBounds.getBoundingSphere(structure.worldSphere);
      const crossesSurface = structure.worldBounds.min.y <= ACTIVE_SURFACE_MARGIN && structure.worldBounds.max.y >= -ACTIVE_SURFACE_MARGIN;
      const nearCamera = ctx.camera.position.distanceTo(structure.worldSphere.center) <= structure.maxCameraDistance + structure.worldSphere.radius;
      const visible = structure.root.visible && crossesSurface && nearCamera && (!structure.underwaterOnly || ctx.camera.position.y < 1);
      for (const proxy of structure.proxies) {
        proxy.matrix.copy(structure.root.matrixWorld);
        proxy.matrixWorldNeedsUpdate = true;
        proxy.visible = visible || !this.warmed;
      }
      active ||= visible;
    }
    this.active = active;
    this.activeUniform.value = active ? 1 : 0;
    if (!active && this.warmed) return;
    this.syncSize(ctx.renderer);
    this.scene.environment = ctx.scene.environment;
    this.scene.environmentIntensity = ctx.scene.environmentIntensity;
    this.scene.environmentRotation.copy(ctx.scene.environmentRotation);
    const renderer = ctx.renderer;
    const previousTarget = renderer.getRenderTarget();
    const previousMrt = renderer.getMRT();
    const previousAlpha = renderer.getClearAlpha();
    renderer.getClearColor(this.clearColor);
    renderer.setRenderTarget(this.target);
    renderer.setMRT(null);
    renderer.setClearColor(0, 0);
    renderer.clear();
    void renderer.render(this.scene, ctx.camera);
    renderer.setRenderTarget(previousTarget);
    renderer.setMRT(previousMrt);
    renderer.setClearColor(this.clearColor, previousAlpha);
    this.warmed = true;
  }
  debugSnapshot() {
    const visibleProxies = this.active ? this.structures.flatMap(
      (structure) => structure.proxies.filter((proxy) => proxy.visible)
    ) : [];
    return {
      active: this.active,
      draws: visibleProxies.length,
      vertices: visibleProxies.reduce(
        (vertices, proxy) => vertices + (proxy.geometry.getAttribute("position")?.count ?? 0),
        0
      ),
      triangles: visibleProxies.reduce((triangles, proxy) => {
        const positionCount = proxy.geometry.getAttribute("position")?.count ?? 0;
        return triangles + (proxy.geometry.index?.count ?? positionCount) / 3;
      }, 0),
      width: this.target.width,
      height: this.target.height,
      maxEdge: TARGET_MAX_EDGE
    };
  }
  dispose() {
    for (const structure of [...this.structures]) this.removeStructure(structure);
    this.target.dispose();
  }
  removeStructure(structure) {
    if (structure.disposed) return;
    structure.disposed = true;
    const index = this.structures.indexOf(structure);
    if (index >= 0) this.structures.splice(index, 1);
    for (const proxy of structure.proxies) {
      this.scene.remove(proxy);
      proxy.geometry.dispose();
      proxy.material.dispose();
    }
  }
  syncSize(renderer) {
    renderer.getSize(this.size);
    const scale = Math.min(
      TARGET_SCALE,
      TARGET_MAX_EDGE / Math.max(1, this.size.x, this.size.y)
    );
    const width = Math.max(1, Math.round(this.size.x * scale));
    const height = Math.max(1, Math.round(this.size.y * scale));
    if (this.target.width !== width || this.target.height !== height) {
      this.target.setSize(width, height);
    }
  }
};
export {
  InterfaceStructureLayer
};
