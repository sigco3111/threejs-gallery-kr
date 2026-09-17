// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/ocean-system.ts
import { Mesh as Mesh2, PlaneGeometry } from "https://esm.sh/three@0.185.1?external";
import { uniform as uniform6 } from "https://esm.sh/three@0.185.1?external/tsl";

// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/ocean-material.ts
import { DoubleSide } from "https://esm.sh/three@0.185.1?external";
import { MeshBasicNodeMaterial } from "https://esm.sh/three@0.185.1?external/webgpu";
import {
  Fn as Fn4,
  If,
  cameraProjectionMatrix,
  cameraProjectionMatrixInverse,
  cameraPosition,
  cameraViewMatrix,
  cameraWorldMatrix,
  dot as dot4,
  exp as exp2,
  float as float6,
  getViewPosition,
  log2,
  max as max3,
  min,
  mix as mix5,
  modelWorldMatrix,
  mrt,
  normalize as normalize3,
  normalView,
  positionLocal,
  pow as pow3,
  reflect,
  refract,
  screenUV,
  smoothstep as smoothstep4,
  step,
  varying,
  vec2 as vec24,
  vec3 as vec34,
  vec4 as vec42
} from "https://esm.sh/three@0.185.1?external/tsl";

// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/noise.ts
import { Fn, Loop, float, fract, dot, floor, mix, sin, vec2, vec3 } from "https://esm.sh/three@0.185.1?external/tsl";
var hash21 = /* @__PURE__ */ Fn(([p]) => {
  const p3 = fract(vec3(p.x, p.y, p.x).mul(0.1031)).toVar();
  p3.addAssign(dot(p3, vec3(p3.y, p3.z, p3.x).add(33.33)));
  return fract(p3.x.add(p3.y).mul(p3.z));
});
var valueNoise2 = /* @__PURE__ */ Fn(([p]) => {
  const i = floor(p).toVar();
  const f = fract(p).toVar();
  const u = f.mul(f).mul(f.mul(-2).add(3)).toVar();
  const a = hash21(i);
  const b = hash21(i.add(vec2(1, 0)));
  const c = hash21(i.add(vec2(0, 1)));
  const d = hash21(i.add(vec2(1, 1)));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
});
var fbm2 = /* @__PURE__ */ Fn(([p]) => {
  const value = float(0).toVar();
  const amplitude = float(0.5).toVar();
  const q = p.toVar();
  Loop({ start: 0, end: 5 }, () => {
    value.addAssign(valueNoise2(q).mul(amplitude));
    const rotated = vec2(
      q.x.mul(0.8).sub(q.y.mul(0.6)),
      q.x.mul(0.6).add(q.y.mul(0.8))
    );
    q.assign(rotated.mul(2.04));
    amplitude.mulAssign(0.5);
  });
  return value;
});

// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/sky-radiance.ts
import { Fn as Fn2, dot as dot2, float as float2, max, mix as mix2, normalize, pow, smoothstep, vec3 as vec32 } from "https://esm.sh/three@0.185.1?external/tsl";

// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/sun.ts
import { Color, Vector3 } from "https://esm.sh/three@0.185.1?external";
import { uniform } from "https://esm.sh/three@0.185.1?external/tsl";
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

// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/sky-radiance.ts
var SUN_COS_RADIUS = Math.cos(0.266 * Math.PI / 180);
var marineHazeTint = /* @__PURE__ */ vec32(0.65, 0.59, 0.69);
var skyRadiance = /* @__PURE__ */ Fn2(
  ([direction, discStrength]) => {
    const dir = normalize(direction).toVar();
    const up = max(dir.y, 0);
    const zenith = vec32(0.05, 0.2, 0.5);
    const horizon = vec32(0.4, 0.54, 0.68);
    const seaMist = vec32(0.32, 0.43, 0.52);
    const gradient = mix2(horizon, zenith, pow(up, 0.48));
    const sky = mix2(seaMist, gradient, smoothstep(-0.08, 0.02, dir.y)).toVar();
    const marineHazeAmount = smoothstep(-0.18, 0, dir.y).mul(float2(1).sub(smoothstep(0, 0.3, dir.y))).mul(0.16);
    sky.assign(mix2(sky, marineHazeTint, marineHazeAmount));
    const sunAmount = max(dot2(dir, sunDirectionUniform), 0).toVar();
    const x2 = float2(1).sub(sunAmount).div(1 - SUN_COS_RADIUS).toVar();
    const inDisc = smoothstep(1, 0.96, x2);
    const mu = float2(1).sub(x2).max(0).sqrt();
    const limb = float2(0.3).add(mu.mul(0.93)).sub(mu.mul(mu).mul(0.23));
    const disc = inDisc.mul(limb).mul(discStrength).mul(1500);
    const aureole = pow(sunAmount, 3e3).mul(20).add(pow(sunAmount, 260).mul(1.7)).add(pow(sunAmount, 18).mul(0.16));
    return sky.mul(1.25).add(sunColorUniform.mul(aureole.add(disc)));
  }
);

// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/seabed-surface.ts
import { float as float3, sin as sin2, smoothstep as smoothstep2, uniform as uniform2, vec2 as vec22 } from "https://esm.sh/three@0.185.1?external/tsl";
var seabedRippleBakeFlat = uniform2(0);
function seabedRippleSlope(worldXZ, footprint) {
  const warp = fbm2(worldXZ.mul(0.09)).mul(7);
  const band = sin2(worldXZ.x.mul(1.9).add(worldXZ.y.mul(0.9)).add(warp));
  const band2 = sin2(worldXZ.x.mul(-1).add(worldXZ.y.mul(2.3)).add(warp.mul(1.4)));
  const micro = valueNoise2(worldXZ.mul(7)).sub(0.5).mul(0.24);
  const bandKeep = footprint ? float3(1).sub(smoothstep2(0.6, 2.2, footprint)) : float3(1);
  const microKeep = footprint ? float3(1).sub(smoothstep2(0.03, 0.12, footprint)) : float3(1);
  return vec22(band.mul(0.08), band2.mul(0.06)).mul(bandKeep).add(micro.mul(microKeep));
}

// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/optical-constants.ts
var AIR_IOR = 1;
var WATER_IOR = 1.333;
var AQUATIC_EXTINCTION = [0.026, 85e-4, 5e-3];
var AQUATIC_AMBIENT_DOWN = [0.01, 0.075, 0.14];
var AQUATIC_AMBIENT_UP = [0.1, 0.32, 0.37];

// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/ocean-foam.ts
import { dot as dot3, float as float5, max as max2, mix as mix4, normalize as normalize2, pow as pow2, smoothstep as smoothstep3, vec2 as vec23, vec3 as vec33 } from "https://esm.sh/three@0.185.1?external/tsl";

// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/wake-foam-map.ts
import { HalfFloatType, LinearFilter, Vector4 } from "https://esm.sh/three@0.185.1?external";
import { StorageTexture } from "https://esm.sh/three@0.185.1?external/webgpu";
import {
  Fn as Fn3,
  exp,
  float as float4,
  instanceIndex,
  int,
  ivec2,
  mix as mix3,
  texture,
  textureLoad,
  textureStore,
  uint,
  uniform as uniform3,
  uniformArray,
  vec4
} from "https://esm.sh/three@0.185.1?external/tsl";
var WAKE_FOAM_CENTER_X = 0;
var WAKE_FOAM_CENTER_Z = 10;
var WAKE_FOAM_SIZE = 820;

// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/ocean-foam.ts
var WINDROW_SPACING = 12.5;
var WINDROW_LENGTH = 95;
var WINDROW_BREAKUP_SPACING = 3.8;
var WINDROW_BREAKUP_LENGTH = 24;
var DRIFT_FRACTION = 0.03;
var GUST_SCALE = 165;
var GUST_DETAIL_SCALE = 58;
var RELIEF_FREQUENCY = 3.1;
var RELIEF_STRENGTH = 0.35;
var WINDROW_LINE_THRESHOLD = [0.6, 0.88];
var GUST_THRESHOLD = [0.44, 0.8];
var WINDROW_COVERAGE = 0.85;
var RAFT_TAIL_BAND = [0.26, 0.66];
var RAFT_BASE_COVERAGE = 0.45;
var RAFT_LINE_COVERAGE = 0.55;
var CREST_TEAR_BAND = [0.55, 1.35];
var CREST_COVERAGE = 0.55;
function createOceanFoam(inputs) {
  const { sea, time, worldXZ, pixelFootprint, edgeKeep } = inputs;
  const sunDir = sunDirectionUniform;
  const alongAxis = vec23(Math.cos(sea.windAzimuth), Math.sin(sea.windAzimuth));
  const acrossAxis = vec23(-Math.sin(sea.windAzimuth), Math.cos(sea.windAzimuth));
  const drift = time.mul(sea.windSpeed * DRIFT_FRACTION);
  const along = dot3(worldXZ, alongAxis).sub(drift);
  const across = dot3(worldXZ, acrossAxis);
  const bandCoarse = valueNoise2(
    vec23(across.div(WINDROW_SPACING), along.div(WINDROW_LENGTH))
  );
  const bandFine = valueNoise2(
    vec23(
      across.div(WINDROW_BREAKUP_SPACING),
      along.div(WINDROW_BREAKUP_LENGTH)
    ).add(vec23(19.7, 4.3))
  );
  const bandKeep = float5(1).sub(smoothstep3(3, 7, pixelFootprint));
  const breakupKeep = float5(1).sub(smoothstep3(0.9, 2.2, pixelFootprint));
  const bandField = mix4(float5(0.5), bandCoarse, bandKeep).add(
    bandFine.sub(0.5).mul(0.5).mul(breakupKeep)
  );
  const convergenceLines = smoothstep3(
    WINDROW_LINE_THRESHOLD[0],
    WINDROW_LINE_THRESHOLD[1],
    bandField
  );
  const gustCoarse = valueNoise2(
    vec23(across.div(GUST_SCALE), along.div(GUST_SCALE * 1.7)).add(vec23(7.1, 2.9))
  );
  const gustFine = valueNoise2(
    vec23(across.div(GUST_DETAIL_SCALE), along.div(GUST_DETAIL_SCALE * 1.5)).add(
      vec23(31.4, 12.8)
    )
  );
  const gustKeep = float5(1).sub(smoothstep3(9, 20, pixelFootprint));
  const gustField = gustCoarse.add(gustFine.sub(0.5).mul(0.6).mul(gustKeep));
  const gustPatch = smoothstep3(GUST_THRESHOLD[0], GUST_THRESHOLD[1], gustField);
  const gather = smoothstep3(-0.25, 0.25, inputs.convergence).mul(0.7).add(0.35);
  const windrow = convergenceLines.mul(gustPatch).mul(gather).mul(WINDROW_COVERAGE);
  const raftTail = float5(1).sub(
    smoothstep3(RAFT_TAIL_BAND[0], RAFT_TAIL_BAND[1], inputs.jacobianHistory)
  );
  const raft = raftTail.mul(
    convergenceLines.mul(RAFT_LINE_COVERAGE).add(RAFT_BASE_COVERAGE)
  );
  const crestTear = smoothstep3(
    CREST_TEAR_BAND[0],
    CREST_TEAR_BAND[1],
    inputs.crestHeight
  ).mul(smoothstep3(0.1, 0.42, inputs.steepness).mul(0.65).add(0.35)).mul(gustPatch).mul(CREST_COVERAGE);
  let dense = float5(1).sub(
    smoothstep3(-0.05, 0.26, inputs.jacobianHistory)
  );
  let churn = float5(0);
  if (inputs.wakeFoam) {
    const wakeUv = worldXZ.sub(vec23(WAKE_FOAM_CENTER_X, WAKE_FOAM_CENTER_Z)).div(WAKE_FOAM_SIZE).add(0.5);
    const wake = inputs.wakeFoam.foamNode.sample(wakeUv);
    dense = max2(dense, smoothstep3(0.02, 0.6, wake.g));
    churn = smoothstep3(0.1, 0.75, wake.r);
  }
  const thin = max2(max2(windrow, raft), crestTear).mul(edgeKeep).clamp(0, 1);
  const bubbleA = fbm2(worldXZ.mul(0.9).add(vec23(0.13, 0.07).mul(time)));
  const bubbleB = fbm2(worldXZ.mul(1.7).sub(vec23(0.11, 0.05).mul(time)));
  const foamKeep = float5(1).sub(smoothstep3(0.25, 0.8, pixelFootprint));
  const thinLace = mix4(
    float5(0.46),
    smoothstep3(0.26, 0.7, bubbleA.mul(0.65).add(bubbleB.mul(0.35))),
    foamKeep
  );
  const denseMask = dense.mul(bubbleA.mul(bubbleB).mul(1.7).add(0.06)).add(churn.mul(bubbleA.mul(0.45).add(0.62))).mul(foamKeep).clamp(0, 1);
  const thinMask = thin.mul(thinLace);
  const mask = denseMask.add(thinMask).clamp(0, 1);
  const thickShare = denseMask.div(denseMask.add(thinMask).max(1e-4)).clamp(0, 1);
  const reliefUv = worldXZ.mul(RELIEF_FREQUENCY).add(vec23(0.05, -0.09).mul(time));
  const reliefCenter = valueNoise2(reliefUv);
  const reliefSlope = vec23(
    valueNoise2(reliefUv.add(vec23(0.14, 0))).sub(reliefCenter),
    valueNoise2(reliefUv.add(vec23(0, 0.14))).sub(reliefCenter)
  ).div(0.14);
  const reliefKeep = float5(1).sub(smoothstep3(0.06, 0.2, pixelFootprint));
  const foamNormal = normalize2(
    inputs.normal.add(
      vec33(reliefSlope.x, 0, reliefSlope.y).mul(reliefKeep.mul(RELIEF_STRENGTH))
    )
  );
  const foamNoL = max2(dot3(foamNormal, sunDir), 0);
  const foamAmbient = skyRadiance(foamNormal, float5(0)).mul(0.22);
  const denseShade = foamAmbient.add(
    sunColorUniform.mul(foamNoL.mul(0.9).add(0.3)).mul(0.9).mul(inputs.sunShadow)
  );
  const thinOpacity = thin.mul(0.45).add(0.42);
  const throughScatter = pow2(max2(dot3(inputs.viewDir, sunDir.negate()), 0), 3).mul(float5(1).sub(thinOpacity)).mul(0.4);
  const thinShade = mix4(inputs.waterRadiance, denseShade, thinOpacity).add(
    sunColorUniform.mul(throughScatter).mul(inputs.sunShadow)
  );
  return {
    mask,
    color: mix4(thinShade, denseShade, thickShare),
    debug: vec33(
      denseMask,
      max2(windrow, raft).mul(edgeKeep),
      crestTear.mul(edgeKeep)
    )
  };
}

// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/ocean-skirt-geometry.ts
import { BufferAttribute, BufferGeometry } from "https://esm.sh/three@0.185.1?external";
var OCEAN_INNER_HALF_SIZE = 350;
var OCEAN_FLAT_EDGE_MARGIN = 15;
var OCEAN_SKIRT_HOLE_HALF_SIZE = OCEAN_INNER_HALF_SIZE - OCEAN_FLAT_EDGE_MARGIN;
var OCEAN_SKIRT_OUTER_HALF_SIZE = 3200;
function squareBoundaryPoint(halfSize, sample, segments) {
  const side = Math.floor(sample / segments);
  const offset = sample - side * segments;
  const segmentSize = halfSize * 2 / segments;
  const coordinate = offset * segmentSize - halfSize;
  switch (side) {
    case 0:
      return { x: -halfSize, z: coordinate };
    case 1:
      return { x: coordinate, z: halfSize };
    case 2:
      return { x: halfSize, z: -coordinate };
    default:
      return { x: -coordinate, z: -halfSize };
  }
}
function createOceanSkirtGeometry(segments = 384) {
  if (!Number.isInteger(segments) || segments < 1) {
    throw new Error(`Ocean skirt segments must be a positive integer: ${segments}`);
  }
  const boundarySamples = segments * 4;
  const positions = new Float32Array(boundarySamples * 2 * 3);
  const indices = [];
  for (let sample = 0; sample < boundarySamples; sample++) {
    const outer = squareBoundaryPoint(OCEAN_SKIRT_OUTER_HALF_SIZE, sample, segments);
    const inner = squareBoundaryPoint(OCEAN_SKIRT_HOLE_HALF_SIZE, sample, segments);
    const offset = sample * 6;
    positions[offset] = outer.x;
    positions[offset + 1] = 0;
    positions[offset + 2] = outer.z;
    positions[offset + 3] = inner.x;
    positions[offset + 4] = 0;
    positions[offset + 5] = inner.z;
  }
  for (let sample = 0; sample < boundarySamples; sample++) {
    const next = (sample + 1) % boundarySamples;
    const outer = sample * 2;
    const inner = outer + 1;
    const outerNext = next * 2;
    const innerNext = outerNext + 1;
    indices.push(outer, outerNext, innerNext, outer, innerNext, inner);
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  return geometry;
}

// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/seabed-radiance.ts
var AMBIENT_AND_CAUSTIC_BOOST = 1.45;
var SEABED_DIRECT_SHARE = 1 / AMBIENT_AND_CAUSTIC_BOOST;

// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/ocean-material.ts
var PIXEL_ANGLE = 1e-3;
var DEEP = vec34(5e-3, 0.045, 0.09);
var SHALLOW = vec34(0.014, 0.13, 0.17);
var SSS_TINT = vec34(0.035, 0.2, 0.22);
function oceanOpticsDebugMode(pass) {
  switch (pass) {
    case "water-foam":
      return "foam";
    case "water-fresnel":
      return "fresnel";
    case "water-reflection":
      return "reflection";
    case "water-transmission":
      return "transmission";
    case "water-interface":
      return "interface";
    case "water-validity":
      return "validity";
    default:
      return "final";
  }
}
function createOceanSurfaceMaterial(sim, timeUniform, options) {
  const material = new MeshBasicNodeMaterial();
  material.side = DoubleSide;
  material.fog = false;
  material.transparent = true;
  material.depthWrite = true;
  material.forceSinglePass = true;
  material.mrtNode = mrt({ normal: vec42(normalView, 0) });
  const patch = sim.patchLengths;
  const cascadeCount = options.detailed ? 3 : 1;
  const baseWorld = modelWorldMatrix.mul(vec42(positionLocal, 1)).xyz;
  const xz = baseWorld.xz;
  const edgeHalf = options.edgeFadeHalfSize ?? 0;
  const edgeKeep = edgeHalf > 0 ? float6(1).sub(
    smoothstep4(
      edgeHalf - 170,
      edgeHalf - OCEAN_FLAT_EDGE_MARGIN,
      max3(positionLocal.x.abs(), positionLocal.z.abs())
    )
  ) : float6(0);
  const vertexDistance = cameraPosition.sub(baseWorld).length();
  const vertexGap = cameraPosition.y.abs().max(0.5);
  const vertexFootprint = vertexDistance.mul(vertexDistance).mul(PIXEL_ANGLE).div(vertexGap);
  const vertexKeeps = [
    // Match the above-water cascade-0 normal cutoff. Keeping coarse vertex
    // displacement to 18 m/pixel left sub-pixel triangle rows even after the
    // fragment normal and height response had flattened, producing both the
    // dark comb and the faint gray band at the inner-mesh transition.
    float6(1).sub(smoothstep4(2.5, 5.5, vertexFootprint)),
    float6(1).sub(smoothstep4(0.35, 1.2, vertexFootprint)),
    float6(1).sub(smoothstep4(0.1, 0.4, vertexFootprint))
  ];
  let displacement = sim.displacementNodes[0].sample(xz.div(patch[0])).xyz.mul(edgeKeep).mul(vertexKeeps[0]);
  for (let i = 1; i < cascadeCount; i++) {
    displacement = displacement.add(
      sim.displacementNodes[i].sample(xz.div(patch[i])).xyz.mul(edgeKeep).mul(vertexKeeps[i])
    );
  }
  const foamHistory = options.detailed ? sim.displacementNodes[0].sample(xz.div(patch[0])).w.min(
    sim.displacementNodes[1].sample(xz.div(patch[1])).w
  ) : float6(1);
  material.positionNode = positionLocal.add(displacement);
  const vWorldXZ = varying(xz);
  const vHeight = varying(displacement.y);
  const vFoam = varying(foamHistory);
  const vWorld = varying(baseWorld.add(displacement));
  const vEdgeKeep = varying(edgeKeep);
  const vDistance = varying(
    cameraPosition.sub(baseWorld.add(displacement)).length()
  );
  const heightGap = cameraPosition.y.sub(vWorld.y).abs().max(0.5);
  const pixelFootprint = vDistance.mul(vDistance).mul(PIXEL_ANGLE).div(heightGap);
  const keepCascade0Above = float6(1).sub(smoothstep4(2.5, 5.5, pixelFootprint));
  const keepCascade1 = float6(1).sub(smoothstep4(0.35, 1.2, pixelFootprint));
  const keepCascade2 = float6(1).sub(smoothstep4(0.1, 0.4, pixelFootprint));
  const cascadeKeeps = [float6(1), keepCascade1, keepCascade2];
  const derivativeSamples = [];
  for (let i = 0; i < cascadeCount; i++) {
    derivativeSamples.push(
      sim.derivativeNodes[i].sample(vWorldXZ.div(patch[i])).mul(vEdgeKeep).toVar()
    );
  }
  const derivative0 = derivativeSamples[0];
  let derivatives = derivative0;
  for (let i = 1; i < cascadeCount; i++) {
    derivatives = derivatives.add(
      derivativeSamples[i].mul(cascadeKeeps[i])
    );
  }
  const aboveDerivatives = derivatives.sub(
    derivative0.mul(float6(1).sub(keepCascade0Above))
  );
  const slopeX = derivatives.x.div(max3(0.18, derivatives.z.add(1)));
  const slopeZ = derivatives.y.div(max3(0.18, derivatives.w.add(1)));
  const upNormal = normalize3(vec34(slopeX.negate(), 1, slopeZ.negate()));
  const isAbove = float6(1).sub(options.submerged);
  const sideSign = isAbove.mul(2).sub(1);
  const rawNormal = upNormal.mul(sideSign);
  const toCamera = cameraPosition.sub(vWorld);
  const viewDistance = toCamera.length();
  const viewDir = toCamera.div(viewDistance);
  const distanceFade = smoothstep4(5, 16, pixelFootprint);
  const normal = normalize3(mix5(rawNormal, vec34(0, sideSign, 0), distanceFade));
  const sunDir = sunDirectionUniform;
  const aboveSlopeX = aboveDerivatives.x.div(max3(0.18, aboveDerivatives.z.add(1)));
  const aboveSlopeZ = aboveDerivatives.y.div(max3(0.18, aboveDerivatives.w.add(1)));
  let aboveNormal = normalize3(
    vec34(aboveSlopeX.negate(), 1, aboveSlopeZ.negate())
  );
  if (options.detailed) {
    const detailUvA = vWorldXZ.mul(1.7).add(vec24(0.11, -0.07).mul(timeUniform));
    const detailUvB = vWorldXZ.mul(4.7).add(vec24(-0.19, 0.13).mul(timeUniform));
    const heightA = valueNoise2(detailUvA);
    const detailA = vec24(
      valueNoise2(detailUvA.add(vec24(0.12, 0))).sub(heightA),
      valueNoise2(detailUvA.add(vec24(0, 0.12))).sub(heightA)
    ).div(0.12);
    const heightB = valueNoise2(detailUvB);
    const detailB = vec24(
      valueNoise2(detailUvB.add(vec24(0.08, 0))).sub(heightB),
      valueNoise2(detailUvB.add(vec24(0, 0.08))).sub(heightB)
    ).div(0.08);
    const detailKeepA = float6(1).sub(smoothstep4(0.025, 0.12, pixelFootprint)).mul(vEdgeKeep);
    const detailKeepB = float6(1).sub(smoothstep4(8e-3, 0.035, pixelFootprint)).mul(vEdgeKeep);
    const capillarySlope = detailA.mul(detailKeepA).add(detailB.mul(detailKeepB).mul(0.35));
    aboveNormal = normalize3(
      normal.add(vec34(capillarySlope.x, 0, capillarySlope.y).mul(0.045))
    );
  }
  const dielectricFresnel = (cosIncident, incidentIor, transmittedIor) => {
    const etaI = float6(incidentIor);
    const etaT = float6(transmittedIor);
    const etaRatio = etaI.div(etaT);
    const sinTransmitted2 = etaRatio.mul(etaRatio).mul(float6(1).sub(cosIncident.mul(cosIncident)));
    const criticalWidth = sinTransmitted2.fwidth().mul(1.5).max(1e-3).min(0.05);
    const canTransmit = float6(1).sub(
      smoothstep4(
        float6(1).sub(criticalWidth),
        float6(1).add(criticalWidth),
        sinTransmitted2
      )
    );
    const cosTransmitted = float6(1).sub(sinTransmitted2).max(0).sqrt();
    const rs = etaI.mul(cosIncident).sub(etaT.mul(cosTransmitted)).div(etaI.mul(cosIncident).add(etaT.mul(cosTransmitted)).max(1e-4));
    const rp = etaT.mul(cosIncident).sub(etaI.mul(cosTransmitted)).div(etaT.mul(cosIncident).add(etaI.mul(cosTransmitted)).max(1e-4));
    return vec34(
      rs.mul(rs).add(rp.mul(rp)).mul(0.5),
      canTransmit,
      cosTransmitted
    );
  };
  const incident = viewDir.negate();
  const aboveNoV = max3(dot4(viewDir, aboveNormal), 1e-3);
  const aboveFresnelResult = dielectricFresnel(aboveNoV, AIR_IOR, WATER_IOR);
  const aboveFresnel = aboveFresnelResult.x;
  const belowNoV = max3(dot4(viewDir, normal), 1e-3);
  const belowFresnelResult = dielectricFresnel(belowNoV, WATER_IOR, AIR_IOR);
  const interfaceFresnel = belowFresnelResult.x;
  const insideWindow = belowFresnelResult.y;
  const projectDirection = (direction) => {
    const view = cameraViewMatrix.mul(vec42(direction, 0)).xyz;
    const clip = cameraProjectionMatrix.mul(vec42(view, 1));
    const ndc = clip.xy.div(max3(clip.w, 0.05));
    return vec24(ndc.x.mul(0.5).add(0.5), float6(0.5).sub(ndc.y.mul(0.5)));
  };
  const sampleInterfaceStructure = (enabled, reconstructPath = false) => {
    const structures = options.interfaceStructures;
    if (!structures) return { sample: vec42(0), path: float6(0) };
    const sample = Fn4(() => {
      const result = vec42(0).toVar();
      If(enabled.greaterThan(1e-3), () => {
        const rawColor = structures.color.sample(screenUV);
        const geometryValidity = rawColor.a.mul(structures.active);
        If(geometryValidity.greaterThan(1e-3), () => {
          const sourceColor = rawColor.rgb.div(max3(rawColor.a, 1e-3));
          result.assign(vec42(sourceColor, geometryValidity));
        });
      });
      return result;
    })();
    const path = reconstructPath ? Fn4(() => {
      const result = float6(0).toVar();
      If(enabled.greaterThan(1e-3), () => {
        const sourceDepth = structures.depth.sample(screenUV).r;
        const sourceView = getViewPosition(
          screenUV,
          sourceDepth,
          cameraProjectionMatrixInverse
        );
        const sourceWorld = cameraWorldMatrix.mul(vec42(sourceView, 1)).xyz;
        result.assign(sourceWorld.sub(vWorld).length().max(0.02));
      });
      return result;
    })() : float6(0);
    return {
      sample,
      path
    };
  };
  const belowRefracted = refract(incident, normal, WATER_IOR / AIR_IOR);
  const belowSceneSample = vec42(0);
  const belowSceneValid = float6(0);
  const belowStructure = options.interfaceStructures ? sampleInterfaceStructure(
    options.interfaceStructures.active.mul(options.submerged).mul(insideWindow)
  ) : { sample: vec42(0), path: float6(0) };
  const belowStructureSample = belowStructure.sample;
  const belowStructureValid = max3(belowStructureSample.a, 0);
  const aboveRefracted = refract(incident, aboveNormal, AIR_IOR / WATER_IOR);
  const aboveStructureEnabled = options.detailed ? isAbove.mul(step(0.03, float6(1).sub(aboveFresnel))) : float6(0);
  const aboveStructure = options.interfaceStructures ? sampleInterfaceStructure(
    options.interfaceStructures.active.mul(aboveStructureEnabled),
    true
  ) : { sample: vec42(0), path: float6(0) };
  const aboveStructureSample = aboveStructure.sample;
  const aboveStructureContribution = max3(aboveStructureSample.a, 0).clamp(0, 1);
  const reflectedDirection = reflect(incident, aboveNormal);
  const aboveHeight = vHeight.mul(keepCascade0Above);
  const heightMask = smoothstep4(-1.7, 1.5, aboveHeight);
  const bodyBase = mix5(DEEP, SHALLOW, heightMask);
  const crestLight = normalize3(sunDir.negate().add(normal.mul(0.4)));
  const crestScatter = pow3(max3(dot4(viewDir, crestLight), 0), 4.5).mul(1).mul(smoothstep4(-0.1, 1.1, vHeight));
  const sunShadow = (options.sunShadow ? options.sunShadow(vWorld) : float6(1)).clamp(0, 1);
  const noL = max3(dot4(aboveNormal, sunDir), 0);
  const fresnelF0 = float6(((AIR_IOR - WATER_IOR) / (AIR_IOR + WATER_IOR)) ** 2);
  const aboveCrestLight = normalize3(sunDir.negate().add(aboveNormal.mul(0.4)));
  const aboveCrestScatter = pow3(max3(dot4(viewDir, aboveCrestLight), 0), 4.5).mul(smoothstep4(-0.1, 1.1, aboveHeight));
  const forwardScatter = pow3(max3(dot4(viewDir, sunDir.negate()), 0), 4).mul(smoothstep4(-0.15, 0.9, aboveHeight)).mul(float6(1).sub(aboveFresnel)).mul(0.32);
  const scatterLight = noL.mul(0.5).add(0.5);
  const surfaceScatter = SSS_TINT.mul(aboveCrestScatter.add(forwardScatter)).mul(scatterLight).mul(sunShadow);
  const body = bodyBase.add(surfaceScatter);
  const skyReflection = skyRadiance(reflectedDirection, float6(0));
  const reflection = options.reflection;
  const reflectedRadiance = reflection ? Fn4(() => {
    const result = skyReflection.toVar();
    If(isAbove.mul(reflection.active).greaterThan(1e-3), () => {
      const flatReflected = reflect(incident, vec34(0, 1, 0));
      const waveOffset = projectDirection(reflectedDirection).sub(
        projectDirection(flatReflected)
      );
      const boundedOffset = waveOffset.mul(
        min(float6(1), float6(0.05).div(waveOffset.length().max(1e-5)))
      );
      const mirroredUv = vec24(
        screenUV.x.oneMinus().sub(boundedOffset.x),
        screenUV.y.add(boundedOffset.y)
      ).clamp(vec24(1e-3), vec24(0.999));
      const raw = reflection.color.sample(mirroredUv);
      const coverage = raw.a.clamp(0, 1);
      If(coverage.greaterThan(1e-3), () => {
        result.assign(
          mix5(skyReflection, raw.rgb.div(max3(raw.a, 1e-3)), coverage)
        );
      });
    });
    return result;
  })() : skyReflection;
  const undersea = options.undersea;
  const seabedHeight = options.seabedHeight;
  const transmittedRadiance = undersea && seabedHeight ? Fn4(() => {
    const result = body.toVar();
    If(isAbove.greaterThan(1e-3), () => {
      const downSlope = aboveRefracted.y.min(-0.3);
      const firstPath = undersea.canopyHeight(vWorldXZ).sub(vWorld.y).div(downSlope).clamp(0.5, 300);
      const midLandingXZ = vWorldXZ.add(aboveRefracted.xz.mul(firstPath));
      const canopyPath = undersea.canopyHeight(midLandingXZ).sub(vWorld.y).div(downSlope).clamp(0.5, 320).toVar();
      const landingXZ = vWorldXZ.add(aboveRefracted.xz.mul(canopyPath));
      const canopyY = undersea.canopyHeight(landingXZ).toVar();
      const landingFootprint = float6(PIXEL_ANGLE).mul(vDistance.add(canopyPath.mul(AIR_IOR / WATER_IOR))).div(downSlope.negate());
      const landingLod = log2(
        max3(landingFootprint.div(undersea.texelSize), 1)
      ).clamp(0, 11);
      const isSand = float6(1).sub(
        smoothstep4(0.4, 1.4, canopyY.sub(seabedHeight(landingXZ)))
      );
      const rippleSlope = seabedRippleSlope(landingXZ, landingFootprint);
      const rippleNormal = normalize3(vec34(rippleSlope.x, 1, rippleSlope.y));
      const rippleRatio = mix5(
        float6(1),
        max3(dot4(rippleNormal, sunDir), 0).div(max3(sunDir.y, 0.05)),
        isSand
      );
      const restoredDetail = mix5(float6(1), rippleRatio, SEABED_DIRECT_SHARE);
      const structureShare = aboveStructureContribution;
      const bottomColor = mix5(
        undersea.radiance(landingXZ, landingLod).mul(restoredDetail),
        aboveStructureSample.rgb,
        structureShare
      );
      const waterPath = mix5(
        canopyPath,
        aboveStructure.path.clamp(0.05, 3500),
        structureShare
      );
      const aquaticTransmittance = exp2(
        vec34(...AQUATIC_EXTINCTION).mul(waterPath).negate()
      );
      const sourceVerticalDepth = waterPath.mul(aboveRefracted.y.negate().max(0));
      const downwellingPath = sourceVerticalDepth.div(max3(sunDir.y, 0.15));
      const downwellingTransmittance = exp2(
        vec34(...AQUATIC_EXTINCTION).mul(downwellingPath).negate()
      );
      const sourceLightingFilter = mix5(vec34(1), downwellingTransmittance, 0.82);
      const transmittedMidpointY = vWorld.y.add(
        aboveRefracted.y.mul(waterPath.mul(0.5))
      );
      const transmittedDepthDim = exp2(transmittedMidpointY.min(0).mul(0.03));
      const transmittedUpness = smoothstep4(-0.5, 0.75, aboveRefracted.y);
      const transmittedSunward = pow3(
        max3(dot4(aboveRefracted, sunDir), 0),
        6
      ).mul(0.06).mul(sunShadow);
      const aquaticInscatter = mix5(
        vec34(...AQUATIC_AMBIENT_DOWN),
        vec34(...AQUATIC_AMBIENT_UP),
        transmittedUpness
      ).mul(transmittedDepthDim).mul(heightMask.mul(0.55).add(1)).add(sunColorUniform.mul(transmittedSunward));
      const foggedTransmission = bottomColor.mul(sourceLightingFilter).mul(aquaticTransmittance).add(aquaticInscatter.mul(float6(1).sub(aquaticTransmittance.g)));
      const transportKeep = float6(1).sub(distanceFade).mul(vEdgeKeep);
      result.assign(
        mix5(
          body,
          foggedTransmission.add(surfaceScatter.mul(0.45)),
          transportKeep
        )
      );
    });
    return result;
  })() : body;
  const halfVector = normalize3(sunDir.add(viewDir));
  const noH = max3(dot4(aboveNormal, halfVector), 0);
  const voH = max3(dot4(viewDir, halfVector), 0);
  const roughness = float6(0.075);
  const alpha2 = roughness.mul(roughness);
  const distributionDenominator = noH.mul(noH).mul(alpha2.sub(1)).add(1);
  const distribution = alpha2.div(
    distributionDenominator.mul(distributionDenominator).mul(Math.PI)
  );
  const smithK = roughness.add(1).mul(roughness.add(1)).div(8);
  const geometryV = aboveNoV.div(aboveNoV.mul(float6(1).sub(smithK)).add(smithK));
  const geometryL = noL.div(noL.mul(float6(1).sub(smithK)).add(smithK).max(1e-4));
  const microFresnel = fresnelF0.add(
    float6(1).sub(fresnelF0).mul(pow3(float6(1).sub(voH), 5))
  );
  const directSpecular = distribution.mul(geometryV).mul(geometryL).mul(microFresnel).mul(noL).div(max3(aboveNoV.mul(noL).mul(4), 0.02));
  const sunGlint = sunColorUniform.mul(directSpecular).mul(3.4).mul(sunShadow);
  let above = mix5(transmittedRadiance, reflectedRadiance, aboveFresnel).add(sunGlint);
  let foamDebug = vec34(0);
  if (options.detailed) {
    const foam = createOceanFoam({
      sea: sim.sea,
      time: timeUniform,
      worldXZ: vWorldXZ,
      jacobianHistory: vFoam,
      crestHeight: aboveHeight,
      steepness: vec24(aboveSlopeX, aboveSlopeZ).length(),
      convergence: aboveDerivatives.z.add(aboveDerivatives.w).negate(),
      pixelFootprint,
      edgeKeep: vEdgeKeep,
      normal: aboveNormal,
      viewDir,
      waterRadiance: above,
      sunShadow,
      wakeFoam: options.wakeFoam
    });
    foamDebug = foam.debug;
    above = mix5(above, foam.color, foam.mask);
  }
  const skyThrough = skyRadiance(belowRefracted, float6(0)).mul(0.9);
  const snellAngularStretch = float6(WATER_IOR / AIR_IOR).mul(belowNoV).div(belowFresnelResult.z.max(0.04)).max(1);
  const normalTiltPerPixel = max3(normal.dFdx().length(), normal.dFdy().length());
  const transmittedSpread = snellAngularStretch.sub(1).mul(normalTiltPerPixel).mul(0.5);
  const glintExponent = float6(1).div(
    float6(1 / 700).add(transmittedSpread.mul(transmittedSpread))
  );
  const windowGlint = pow3(max3(dot4(belowRefracted, sunDir), 0), glintExponent).mul(glintExponent.mul(24 / 700)).mul(sunColorUniform);
  const belowStructureContribution = belowStructureValid.clamp(0, 1);
  const aboveWaterStructure = max3(
    belowSceneValid,
    belowStructureContribution
  ).clamp(0, 1);
  const belowTransmissionSource = mix5(
    belowSceneSample.rgb,
    belowStructureSample.rgb,
    belowStructureContribution
  );
  const transmittedScene = mix5(
    skyThrough.add(windowGlint),
    belowTransmissionSource,
    aboveWaterStructure
  );
  const interfaceTransmission = insideWindow.mul(float6(1).sub(interfaceFresnel));
  const tirBody = vec34(0.035, 0.14, 0.19).add(SSS_TINT.mul(crestScatter).mul(0.5));
  const below = mix5(tirBody, transmittedScene, interfaceTransmission);
  const debugMode = options.debugMode ?? "final";
  let finalColor = mix5(below, above, isAbove);
  if (debugMode === "fresnel") {
    finalColor = vec34(mix5(interfaceFresnel, aboveFresnel, isAbove));
  } else if (debugMode === "reflection") {
    finalColor = mix5(tirBody, reflectedRadiance, isAbove);
  } else if (debugMode === "transmission") {
    finalColor = mix5(transmittedScene, transmittedRadiance, isAbove);
  } else if (debugMode === "interface") {
    const aboveInterface = aboveStructureSample.rgb.mul(aboveStructureContribution);
    const belowInterface = belowStructureSample.rgb.mul(belowStructureContribution);
    finalColor = mix5(belowInterface, aboveInterface, isAbove);
  } else if (debugMode === "foam") {
    finalColor = foamDebug.mul(isAbove);
  } else if (debugMode === "validity") {
    const aboveValidity = vec34(
      reflection ? reflection.active : float6(0),
      undersea ? float6(1) : float6(0),
      aboveStructureContribution
    );
    const belowValidity = vec34(
      belowSceneValid,
      belowStructureContribution,
      insideWindow
    );
    finalColor = mix5(belowValidity, aboveValidity, isAbove);
  }
  material.colorNode = vec42(finalColor, 1);
  return material;
}

// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/interface-structure-layer.ts
import {
  BufferGeometry as BufferGeometry2,
  Box3,
  Color as Color2,
  DepthTexture,
  DirectionalLight,
  DoubleSide as DoubleSide2,
  Float32BufferAttribute,
  HalfFloatType as HalfFloatType2,
  LinearFilter as LinearFilter2,
  LinearSRGBColorSpace,
  Matrix4,
  Mesh,
  NearestFilter,
  RenderTarget,
  Scene,
  Sphere,
  Vector2
} from "https://esm.sh/three@0.185.1?external";
import { MeshStandardNodeMaterial } from "https://esm.sh/three@0.185.1?external/webgpu";
import {
  cameraPosition as cameraPosition2,
  cameraProjectionMatrix as cameraProjectionMatrix2,
  cameraViewMatrix as cameraViewMatrix2,
  dot as dot5,
  float as float7,
  Fn as Fn5,
  If as If2,
  max as max4,
  mix as mix6,
  modelWorldMatrix as modelWorldMatrix2,
  normalize as normalize4,
  positionLocal as positionLocal2,
  positionWorld,
  select,
  smoothstep as smoothstep5,
  step as step2,
  texture as texture3,
  uniform as uniform4,
  vec2 as vec25,
  vec3 as vec35,
  vec4 as vec43
} from "https://esm.sh/three@0.185.1?external/tsl";
import { mergeGeometries } from "https://esm.sh/three@0.185.1?external/addons/utils/BufferGeometryUtils.js";
import { TessellateModifier } from "https://esm.sh/three@0.185.1?external/addons/modifiers/TessellateModifier.js";
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
  if (!position) return new BufferGeometry2();
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
  const result = new BufferGeometry2();
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
  nodes;
  target;
  scene = new Scene();
  activeUniform = uniform4(0);
  structures = [];
  size = new Vector2();
  clearColor = new Color2();
  rootInverse = new Matrix4();
  relativeMatrix = new Matrix4();
  sim;
  submerged;
  warmed = false;
  active = false;
  constructor(sim, submerged) {
    this.sim = sim;
    this.submerged = submerged;
    const depthTexture = new DepthTexture(1, 1);
    depthTexture.minFilter = NearestFilter;
    depthTexture.magFilter = NearestFilter;
    this.target = new RenderTarget(1, 1, {
      type: HalfFloatType2,
      depthBuffer: true,
      depthTexture
    });
    this.target.texture.colorSpace = LinearSRGBColorSpace;
    this.target.texture.minFilter = LinearFilter2;
    this.target.texture.magFilter = LinearFilter2;
    this.target.texture.generateMipmaps = false;
    this.nodes = {
      color: texture3(this.target.texture),
      depth: texture3(depthTexture),
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
      const baseWorld = vec35(worldXZ.x, 0, worldXZ.y);
      const distance = cameraPosition2.sub(baseWorld).length();
      const heightGap = cameraPosition2.y.abs().max(0.5);
      const pixelFootprint = distance.mul(distance).mul(1e-3).div(heightGap);
      return [
        float7(1).sub(smoothstep5(2.5, 5.5, pixelFootprint)),
        float7(1).sub(smoothstep5(0.35, 1.2, pixelFootprint)),
        float7(1).sub(smoothstep5(0.1, 0.4, pixelFootprint))
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
      const baseWorld = vec35(worldXZ.x, 0, worldXZ.y);
      const distance = cameraPosition2.sub(baseWorld).length();
      const heightGap = cameraPosition2.y.abs().max(0.5);
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
        derivative0.mul(float7(1).sub(keeps[0]))
      );
      const derivatives = mix6(aboveDerivatives, belowDerivatives, this.submerged);
      const slopeX = derivatives.x.div(max4(0.18, derivatives.z.add(1)));
      const slopeZ = derivatives.y.div(max4(0.18, derivatives.w.add(1)));
      const resolved = normalize4(vec35(slopeX.negate(), 1, slopeZ.negate()));
      const belowDistanceFade = smoothstep5(5, 16, pixelFootprint).mul(
        this.submerged
      );
      return normalize4(mix6(resolved, vec35(0, 1, 0), belowDistanceFade));
    };
    const solveTangentInterface = (sourceWorld, planePoint, orientedNormal) => {
      const cameraPlaneDistance = max4(
        dot5(planePoint.sub(cameraPosition2), orientedNormal),
        1e-3
      );
      const sourcePlaneDistance = max4(
        dot5(sourceWorld.sub(planePoint), orientedNormal),
        1e-3
      );
      const cameraProjection = cameraPosition2.add(
        orientedNormal.mul(cameraPlaneDistance)
      );
      const sourceProjection = sourceWorld.sub(
        orientedNormal.mul(sourcePlaneDistance)
      );
      const tangentOffset = sourceProjection.sub(cameraProjection);
      const tangentLength = tangentOffset.length();
      const tangent = tangentOffset.div(max4(tangentLength, 1e-3));
      const cameraIor = mix6(AIR_IOR, WATER_IOR, this.submerged);
      const sourceIor = mix6(WATER_IOR, AIR_IOR, this.submerged);
      const inWater = this.submerged.greaterThan(0.5);
      const cameraReach = cameraPlaneDistance.mul(CRITICAL_TANGENT);
      const sourceReach = sourcePlaneDistance.mul(CRITICAL_TANGENT);
      const low = select(
        inWater,
        float7(0),
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
      const cameraIor = mix6(AIR_IOR, WATER_IOR, this.submerged);
      const sourceIor = mix6(WATER_IOR, AIR_IOR, this.submerged);
      const eta = cameraIor.div(sourceIor);
      const cosIncident = direction.y.abs().max(0.02);
      const sinTransmitted2 = eta.mul(eta).mul(float7(1).sub(cosIncident.mul(cosIncident)));
      const cosTransmitted = float7(1).sub(sinTransmitted2).max(0).sqrt().max(0.04);
      const stretch = eta.mul(cosIncident).div(cosTransmitted).max(0.04);
      const shift = tilt.sub(direction.mul(dot5(tilt, direction))).mul(float7(1).sub(float7(1).div(stretch)).clamp(-1, 1));
      const foldLimit = float7(maxEdgeLength ?? 1).mul(0.5).div(sourceDistance.max(1).mul(stretch));
      const bounded = shift.mul(
        float7(1).min(foldLimit.div(shift.length().max(1e-5)))
      );
      return normalize4(direction.add(bounded));
    };
    const projectedPosition = Fn5(() => {
      const sourceWorld = modelWorldMatrix2.mul(vec43(positionLocal2, 1)).xyz;
      const directProjection = cameraProjectionMatrix2.mul(cameraViewMatrix2).mul(vec43(sourceWorld, 1));
      const result = directProjection.toVar();
      const sourceSurfaceHeight = stableMeanSurface ? float7(0) : surfaceHeightAt(sourceWorld.xz);
      const signedHeight = sourceWorld.y.sub(sourceSurfaceHeight);
      const aboveMask = step2(0, signedHeight);
      const belowMask = step2(signedHeight, 0);
      const oppositeMediumMask = mix6(belowMask, aboveMask, this.submerged);
      If2(oppositeMediumMask.greaterThan(0.5), () => {
        const normalOrientation = this.submerged.mul(2).sub(1);
        const heightDelta = sourceWorld.y.sub(cameraPosition2.y);
        const safeHeightDelta = mix6(
          heightDelta.min(-1e-3),
          heightDelta.max(1e-3),
          this.submerged
        );
        const crossingFraction = cameraPosition2.y.negate().div(safeHeightDelta).clamp(0, 1).toVar();
        let apparentInterface;
        let interfaceTilt = null;
        if (stableMeanSurface) {
          const crossingXZ = mix6(
            cameraPosition2.xz,
            sourceWorld.xz,
            crossingFraction
          );
          apparentInterface = solveTangentInterface(
            sourceWorld,
            vec35(crossingXZ.x, 0, crossingXZ.y),
            vec35(0, normalOrientation, 0)
          );
          if (liveInterfaceMotion) {
            const spacing = float7(maxEdgeLength);
            const point = apparentInterface.xz;
            const slope = vec25(
              surfaceHeightAt(point.add(vec25(maxEdgeLength, 0))).sub(
                surfaceHeightAt(point.sub(vec25(maxEdgeLength, 0)))
              ),
              surfaceHeightAt(point.add(vec25(0, maxEdgeLength))).sub(
                surfaceHeightAt(point.sub(vec25(0, maxEdgeLength)))
              )
            ).div(spacing.mul(2));
            interfaceTilt = vec35(slope.x.negate(), 0, slope.y.negate()).mul(
              normalOrientation
            );
          }
        } else {
          for (let i = 0; i < 3; i++) {
            const crossingXZ2 = mix6(
              cameraPosition2.xz,
              sourceWorld.xz,
              crossingFraction
            );
            crossingFraction.assign(
              surfaceHeightAt(crossingXZ2).sub(cameraPosition2.y).div(safeHeightDelta).clamp(0, 1)
            );
          }
          const crossingXZ = mix6(
            cameraPosition2.xz,
            sourceWorld.xz,
            crossingFraction
          );
          const crossingPoint = vec35(
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
          const refinedPoint = vec35(
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
        const sourceDistance = sourceWorld.sub(cameraPosition2).length();
        const meanDirection = normalize4(apparentInterface.sub(cameraPosition2));
        const apparentDirection = interfaceTilt ? applyInterfaceMotion(meanDirection, interfaceTilt, sourceDistance) : meanDirection;
        const apparentWorld = cameraPosition2.add(
          apparentDirection.mul(sourceDistance)
        );
        result.assign(
          cameraProjectionMatrix2.mul(cameraViewMatrix2).mul(vec43(apparentWorld, 1))
        );
      });
      return result;
    })();
    const fragmentSurfaceHeight = stableMeanSurface ? float7(0) : surfaceHeightAt(positionWorld.xz);
    const fragmentSignedHeight = positionWorld.y.sub(fragmentSurfaceHeight);
    const fragmentTransition = fragmentSignedHeight.fwidth().max(5e-3);
    const fragmentAboveMask = smoothstep5(
      fragmentTransition.negate(),
      fragmentTransition,
      fragmentSignedHeight
    );
    const fragmentBelowMask = float7(1).sub(fragmentAboveMask);
    const oppositeMediumOpacity = mix6(
      fragmentBelowMask,
      fragmentAboveMask,
      this.submerged
    );
    const distanceFade = float7(1).sub(
      smoothstep5(
        maxCameraDistance * 0.85,
        maxCameraDistance,
        cameraPosition2.sub(positionWorld).length()
      )
    );
    const proxies = mergedGroups.map(({ geometry, sourceMaterial }, index) => {
      const material = sourceMaterial.clone();
      material.transparent = false;
      material.depthWrite = true;
      material.fog = false;
      material.side = DoubleSide2;
      material.vertexNode = projectedPosition;
      material.opacityNode = oppositeMediumOpacity.mul(distanceFade);
      material.alphaTestNode = float7(1e-3);
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

// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/wave-sim.ts
import { HalfFloatType as HalfFloatType3, LinearFilter as LinearFilter3, RepeatWrapping } from "https://esm.sh/three@0.185.1?external";
import { StorageTexture as StorageTexture3 } from "https://esm.sh/three@0.185.1?external/webgpu";
import {
  Fn as Fn7,
  float as float9,
  instanceIndex as instanceIndex3,
  int as int3,
  ivec2 as ivec23,
  max as max5,
  min as min2,
  texture as texture5,
  textureLoad as textureLoad3,
  textureStore as textureStore3,
  uint as uint3,
  uniform as uniform5,
  vec2 as vec27,
  vec4 as vec45
} from "https://esm.sh/three@0.185.1?external/tsl";

// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/fft-compute.ts
import { DataTexture, FloatType, NearestFilter as NearestFilter2, RGBAFormat } from "https://esm.sh/three@0.185.1?external";
import { StorageBufferAttribute, StorageTexture as StorageTexture2 } from "https://esm.sh/three@0.185.1?external/webgpu";
import {
  Fn as Fn6,
  float as float8,
  instanceIndex as instanceIndex2,
  int as int2,
  ivec2 as ivec22,
  localId,
  select as select2,
  storage,
  texture as texture4,
  textureLoad as textureLoad2,
  textureStore as textureStore2,
  uint as uint2,
  vec2 as vec26,
  vec4 as vec44,
  workgroupArray,
  workgroupBarrier,
  workgroupId
} from "https://esm.sh/three@0.185.1?external/tsl";
function createFrequencyTexture(n) {
  const tex = new StorageTexture2(n, n);
  tex.type = FloatType;
  tex.minFilter = NearestFilter2;
  tex.magFilter = NearestFilter2;
  tex.generateMipmaps = false;
  return tex;
}
var PackedIFFT = class {
  stages = [];
  /** Where the spatial result lives after horizontal + vertical passes. */
  output;
  constructor(ping, pong, n) {
    const logN = Math.log2(n);
    if (!Number.isInteger(logN) || n > 256) {
      throw new Error(`PackedIFFT requires a power-of-two workgroup size up to 256; received ${n}`);
    }
    const makeAxis = (source, dest, horizontal) => {
      const shared = workgroupArray("vec4", n);
      return Fn6(() => {
        const lane = localId.x.toVar();
        const line = int2(workgroupId.x);
        const reversed = uint2(0).toVar();
        const remaining = lane.toVar();
        for (let bit = 0; bit < logN; bit++) {
          reversed.assign(reversed.shiftLeft(1).bitOr(remaining.bitAnd(1)));
          remaining.assign(remaining.shiftRight(1));
        }
        const input = horizontal ? ivec22(int2(reversed), line) : ivec22(line, int2(reversed));
        shared.element(lane).assign(textureLoad2(texture4(source), input));
        workgroupBarrier();
        for (let stage = 0; stage < logN; stage++) {
          const groupSize = uint2(1 << stage + 1);
          const halfSize = uint2(1 << stage);
          const local = lane.mod(groupSize);
          const top = local.lessThan(halfSize);
          const offset = local.mod(halfSize);
          const indexA = select2(top, lane, lane.sub(halfSize));
          const indexB = indexA.add(halfSize);
          const a = shared.element(indexA).toVar();
          const b = shared.element(indexB).toVar();
          const angle = float8(offset).mul(Math.PI * 2 / (1 << stage + 1));
          const sign = select2(top, float8(1), float8(-1));
          const w = vec26(angle.cos(), angle.sin()).mul(sign);
          const field1 = a.xy.add(
            vec26(b.x.mul(w.x).sub(b.y.mul(w.y)), b.x.mul(w.y).add(b.y.mul(w.x)))
          );
          const field2 = a.zw.add(
            vec26(b.z.mul(w.x).sub(b.w.mul(w.y)), b.z.mul(w.y).add(b.w.mul(w.x)))
          );
          workgroupBarrier();
          shared.element(lane).assign(vec44(field1, field2));
          workgroupBarrier();
        }
        const output = horizontal ? ivec22(int2(lane), line) : ivec22(line, int2(lane));
        textureStore2(dest, output, shared.element(lane));
      })().compute(n * n, [n]);
    };
    this.stages.push(makeAxis(ping, pong, true));
    this.stages.push(makeAxis(pong, ping, false));
    this.output = ping;
  }
};

// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/ocean-spectrum.ts
import { DataTexture as DataTexture2, FloatType as FloatType2, NearestFilter as NearestFilter3, RGBAFormat as RGBAFormat2 } from "https://esm.sh/three@0.185.1?external";
var DEFAULT_SEA_STATE = {
  gravity: 9.81,
  depth: 500,
  windSpeed: 8.5,
  windAzimuth: 205 * Math.PI / 180,
  fetch: 3e5,
  localScale: 1,
  swellScale: 0.45,
  swellAzimuth: 188 * Math.PI / 180,
  swellOmega: 0.62,
  shortWaveFade: 3e-3
};
function jonswapTma(omega, sea) {
  const { gravity: g, windSpeed, fetch, depth } = sea;
  if (omega <= 0) return 0;
  const alpha = 0.076 * Math.pow(g * fetch / (windSpeed * windSpeed), -0.22);
  const peakOmega = 22 * Math.pow(windSpeed * fetch / (g * g), -0.33);
  const sigma = omega <= peakOmega ? 0.07 : 0.09;
  const r = Math.exp(-((omega - peakOmega) ** 2) / (2 * sigma * sigma * peakOmega * peakOmega));
  const jonswap = alpha * g * g / omega ** 5 * Math.exp(-1.25 * Math.pow(peakOmega / omega, 4)) * Math.pow(3.3, r);
  const omegaH = omega * Math.sqrt(depth / g);
  let phi;
  if (omegaH <= 1) phi = 0.5 * omegaH * omegaH;
  else if (omegaH < 2) phi = 1 - 0.5 * (2 - omegaH) ** 2;
  else phi = 1;
  return jonswap * phi;
}
function wrapAngle(a) {
  while (a > Math.PI) a -= Math.PI * 2;
  while (a < -Math.PI) a += Math.PI * 2;
  return a;
}
function spreading(delta, omegaOverPeak) {
  const cosHalf = Math.max(Math.cos(delta * 0.5), 0);
  const broad = cosHalf * cosHalf;
  const power = 4 + 24 * Math.min(1, Math.max(0, omegaOverPeak - 0.4));
  const lobe = Math.pow(cosHalf, power);
  return (broad * 0.35 + lobe * 0.65) * (1 / Math.PI);
}
function createSpectrumTexture(rng, band, sea, resolution) {
  const n = resolution;
  const deltaK = Math.PI * 2 / band.patchLength;
  const { gravity: g, depth } = sea;
  const peakOmega = 22 * Math.pow(sea.windSpeed * sea.fetch / (g * g), -0.33);
  const h0 = new Float32Array(n * n * 2);
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      const kx = (i - n / 2) * deltaK;
      const kz = (j - n / 2) * deltaK;
      const kLength = Math.hypot(kx, kz);
      const index = (j * n + i) * 2;
      const inBand = kLength >= band.cutoffLow && kLength <= band.cutoffHigh;
      if (!inBand || kLength < 1e-6) {
        h0[index] = 0;
        h0[index + 1] = 0;
        rng.next();
        rng.next();
        continue;
      }
      const kSafe = Math.max(kLength, band.cutoffLow > 0 ? band.cutoffLow : 1e-4);
      const tanhArg = Math.min(kSafe * depth, 20);
      const tanhKd = Math.tanh(tanhArg);
      const omega = Math.sqrt(g * kSafe * tanhKd);
      const sech2 = tanhArg >= 20 ? 0 : 1 / Math.cosh(tanhArg) ** 2;
      const dOmegaDk = Math.max((g * tanhKd + g * kSafe * depth * sech2) / (2 * omega), 1e-6);
      const theta = Math.atan2(kz, kx);
      const local = jonswapTma(omega, sea) * spreading(wrapAngle(theta - sea.windAzimuth), omega / peakOmega) * sea.localScale;
      const swellSigma = 0.12;
      const swell = sea.swellScale * Math.exp(-(((omega - sea.swellOmega) / swellSigma) ** 2)) * Math.pow(Math.max(Math.cos(wrapAngle(theta - sea.swellAzimuth) * 0.5), 0), 48) * 0.9;
      const energy = (local + swell) * Math.exp(-(sea.shortWaveFade * sea.shortWaveFade) * kLength * kLength);
      const amplitude = Math.sqrt(energy * 2 * dOmegaDk / kSafe * deltaK * deltaK);
      const u1 = Math.max(rng.next(), 1e-9);
      const u2 = rng.next();
      const mag = Math.sqrt(-2 * Math.log(u1));
      const g1 = mag * Math.cos(Math.PI * 2 * u2);
      const g2 = mag * Math.sin(Math.PI * 2 * u2);
      h0[index] = g1 * amplitude / Math.SQRT2;
      h0[index + 1] = g2 * amplitude / Math.SQRT2;
    }
  }
  const packed = new Float32Array(n * n * 4);
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      const im = (n - i) % n;
      const jm = (n - j) % n;
      const src = (j * n + i) * 2;
      const mirror = (jm * n + im) * 2;
      const dst = (j * n + i) * 4;
      packed[dst] = h0[src];
      packed[dst + 1] = h0[src + 1];
      packed[dst + 2] = h0[mirror];
      packed[dst + 3] = -h0[mirror + 1];
    }
  }
  const texture6 = new DataTexture2(packed, n, n, RGBAFormat2, FloatType2);
  texture6.minFilter = NearestFilter3;
  texture6.magFilter = NearestFilter3;
  texture6.generateMipmaps = false;
  texture6.needsUpdate = true;
  return texture6;
}
function cascadeBands(patchLengths, boundaryFactor) {
  const handoff = (index) => Math.PI * 2 / patchLengths[index] * boundaryFactor;
  return patchLengths.map((patchLength, index) => ({
    patchLength,
    cutoffLow: index === 0 ? 1e-4 : handoff(index),
    cutoffHigh: index === patchLengths.length - 1 ? 1e4 : handoff(index + 1)
  }));
}

// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/wave-sim.ts
var OCEAN_PRESET = {
  resolution: 256,
  patchLengths: [250, 17, 5],
  boundaryFactor: 6,
  choppiness: 1.3,
  foamRecovery: 0.35,
  /** Global art-direction scale on displacement (dream lever). 0.35 keeps a
   * living glassy swell (~0.5 m crests). A 0.9 sea reads as a storm: it dunks
   * sightlines at deck height and makes a surface crossing chaotic. */
  amplitude: 0.35
};
function createMapTexture(n) {
  const tex = new StorageTexture3(n, n);
  tex.type = HalfFloatType3;
  tex.wrapS = RepeatWrapping;
  tex.wrapT = RepeatWrapping;
  tex.minFilter = LinearFilter3;
  tex.magFilter = LinearFilter3;
  tex.generateMipmaps = false;
  return tex;
}
var WaveSim = class {
  patchLengths;
  /** The sea state these cascades were built from — consumers that need the
   * wind axis (foam windrows) must read it here, never re-import a default. */
  sea;
  /** TSL texture nodes — .value is repointed after each ping-pong swap. */
  displacementNodes;
  derivativeNodes;
  cascades;
  timeUniform = uniform5(0);
  dtUniform = uniform5(1 / 60);
  current = 0;
  initialized = false;
  constructor(rng, sea = DEFAULT_SEA_STATE) {
    const { resolution: n, patchLengths, boundaryFactor, choppiness, foamRecovery, amplitude } = OCEAN_PRESET;
    this.patchLengths = patchLengths;
    this.sea = sea;
    const logN = Math.log2(n);
    const mask = uint3(n - 1);
    const shift = uint3(logN);
    const bands = cascadeBands(patchLengths, boundaryFactor);
    const cellOf = () => {
      const x = int3(instanceIndex3.bitAnd(mask));
      const y = int3(instanceIndex3.shiftRight(shift));
      return { x, y, cell: ivec23(x, y) };
    };
    this.cascades = bands.map((band, index) => {
      const spectrum = createSpectrumTexture(
        rng.fork(`ocean-cascade-${index}`),
        band,
        sea,
        n
      );
      const freqPing = createFrequencyTexture(n);
      const freqPong = createFrequencyTexture(n);
      const ifft = new PackedIFFT(freqPing, freqPong, n);
      const displacementMaps = [
        createMapTexture(n),
        createMapTexture(n)
      ];
      const derivativesMap = createMapTexture(n);
      const twoPiOverPatch = Math.PI * 2 / band.patchLength;
      const evolve = Fn7(() => {
        const { x, y, cell } = cellOf();
        const initial = textureLoad3(texture5(spectrum), cell);
        const centered = vec27(float9(x).sub(n / 2), float9(y).sub(n / 2));
        const k = centered.mul(twoPiOverPatch);
        const kLength = max5(k.length(), 1e-4);
        const omega = k.length().mul(float9(sea.gravity)).mul(min2(kLength.mul(sea.depth), 20).tanh()).sqrt();
        const phase = omega.mul(this.timeUniform);
        const pc = phase.cos();
        const ps = phase.sin();
        const h = vec27(
          initial.x.mul(pc).sub(initial.y.mul(ps)).add(initial.z.mul(pc).sub(initial.w.mul(ps.negate()))),
          initial.x.mul(ps).add(initial.y.mul(pc)).add(initial.z.mul(ps.negate()).add(initial.w.mul(pc)))
        ).mul(amplitude);
        const ih = vec27(h.y.negate(), h.x);
        const dx = ih.mul(k.x.div(kLength));
        const dz = ih.mul(k.y.div(kLength));
        const horizontal = vec27(dx.x.sub(dz.y), dx.y.add(dz.x));
        textureStore3(freqPing, cell, vec45(h, horizontal));
      })().compute(n * n);
      const spatial = ifft.output;
      const inverseSpacing = n / (2 * band.patchLength);
      const makeAssemble = (previous, next) => Fn7(() => {
        const { x, y, cell } = cellOf();
        const parity = float9(int3(instanceIndex3.bitAnd(mask)).add(int3(instanceIndex3.shiftRight(shift))).bitAnd(int3(1)));
        const sign = float9(1).sub(parity.mul(2));
        const nSign = sign.negate();
        const xp = int3(uint3(x.add(1)).bitAnd(mask));
        const xm = int3(uint3(x.add(n - 1)).bitAnd(mask));
        const yp = int3(uint3(y.add(1)).bitAnd(mask));
        const ym = int3(uint3(y.add(n - 1)).bitAnd(mask));
        const center = textureLoad3(texture5(spatial), cell);
        const right = textureLoad3(texture5(spatial), ivec23(xp, y)).mul(nSign);
        const left = textureLoad3(texture5(spatial), ivec23(xm, y)).mul(nSign);
        const up = textureLoad3(texture5(spatial), ivec23(x, yp)).mul(nSign);
        const down = textureLoad3(texture5(spatial), ivec23(x, ym)).mul(nSign);
        const height = center.x.mul(sign);
        const horizontal = center.zw.mul(sign);
        const slopeX = right.x.sub(left.x).mul(inverseSpacing);
        const slopeZ = up.x.sub(down.x).mul(inverseSpacing);
        const dDxDx = right.z.sub(left.z).mul(inverseSpacing);
        const dDzDz = up.w.sub(down.w).mul(inverseSpacing);
        const dDxDz = up.z.sub(down.z).mul(inverseSpacing);
        const dDzDx = right.w.sub(left.w).mul(inverseSpacing);
        const jxx = float9(1).add(dDxDx.mul(choppiness));
        const jzz = float9(1).add(dDzDz.mul(choppiness));
        const jxz = dDxDz.add(dDzDx).mul(0.5).mul(choppiness);
        const jacobian = jxx.mul(jzz).sub(jxz.mul(jxz));
        const previousHistory = textureLoad3(texture5(previous), cell).w;
        const recovered = previousHistory.add(
          this.dtUniform.mul(foamRecovery).div(max5(jacobian, 0.5))
        );
        const history = min2(min2(jacobian, recovered), 2);
        textureStore3(
          next,
          cell,
          vec45(horizontal.x.mul(choppiness), height, horizontal.y.mul(choppiness), history)
        );
        textureStore3(
          derivativesMap,
          cell,
          vec45(slopeX, slopeZ, dDxDx.mul(choppiness), dDzDz.mul(choppiness))
        );
      })().compute(n * n);
      const makeClear = (target) => Fn7(() => {
        const { cell } = cellOf();
        textureStore3(target, cell, vec45(0, 0, 0, 1));
      })().compute(n * n);
      return {
        patchLength: band.patchLength,
        ifft,
        evolve,
        assemble: [
          makeAssemble(displacementMaps[0], displacementMaps[1]),
          makeAssemble(displacementMaps[1], displacementMaps[0])
        ],
        clear: [makeClear(displacementMaps[0]), makeClear(displacementMaps[1])],
        displacementMaps,
        derivativesMap
      };
    });
    this.displacementNodes = this.cascades.map((c) => texture5(c.displacementMaps[0]));
    this.derivativeNodes = this.cascades.map((c) => texture5(c.derivativesMap));
  }
  /** Foam-history maps start at 1 (no foam). */
  ensureInitialized(renderer) {
    if (this.initialized) return;
    this.initialized = true;
    for (const cascade of this.cascades) {
      renderer.compute(cascade.clear[0]);
      renderer.compute(cascade.clear[1]);
    }
  }
  update(renderer, elapsed, dt) {
    this.ensureInitialized(renderer);
    this.timeUniform.value = elapsed;
    this.dtUniform.value = Math.min(dt, 0.1);
    renderer.compute(this.cascades.map((c) => c.evolve));
    const stageCount = this.cascades[0].ifft.stages.length;
    for (let stage = 0; stage < stageCount; stage++) {
      renderer.compute(this.cascades.map((c) => c.ifft.stages[stage]));
    }
    const parity = this.current;
    renderer.compute(this.cascades.map((c) => c.assemble[parity]));
    this.current = 1 - this.current;
    for (let i = 0; i < this.cascades.length; i++) {
      this.displacementNodes[i].value = this.cascades[i].displacementMaps[this.current === 0 ? 0 : 1];
    }
  }
};

// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/ocean-system.ts
var INNER_SIZE = OCEAN_INNER_HALF_SIZE * 2;
var SubmergedOcean = class {
  simulation;
  interfaceStructures;
  /** Camera-medium authority shared by the surface, medium, and particulates. */
  submerged;
  inner;
  outer;
  timeUniform = uniform6(0);
  followStep;
  constructor(scene, rng, options = {}) {
    const segments = options.segments ?? 384;
    this.followStep = INNER_SIZE / segments;
    this.simulation = new WaveSim(rng);
    this.submerged = uniform6(1);
    this.interfaceStructures = new InterfaceStructureLayer(this.simulation, this.submerged);
    const timeNode = this.timeUniform;
    const debugMode = oceanOpticsDebugMode(options.debugPass ?? "");
    const innerGeometry = new PlaneGeometry(INNER_SIZE, INNER_SIZE, segments, segments);
    innerGeometry.rotateX(-Math.PI / 2);
    this.inner = new Mesh2(
      innerGeometry,
      createOceanSurfaceMaterial(this.simulation, timeNode, {
        detailed: true,
        edgeFadeHalfSize: INNER_SIZE / 2,
        interfaceStructures: this.interfaceStructures.nodes,
        submerged: this.submerged,
        wakeFoam: null,
        debugMode
      })
    );
    this.inner.frustumCulled = false;
    this.inner.renderOrder = -100;
    scene.add(this.inner);
    this.outer = new Mesh2(
      createOceanSkirtGeometry(segments),
      createOceanSurfaceMaterial(this.simulation, timeNode, {
        detailed: false,
        interfaceStructures: this.interfaceStructures.nodes,
        submerged: this.submerged,
        debugMode
      })
    );
    this.outer.frustumCulled = false;
    this.outer.renderOrder = -101;
    scene.add(this.outer);
  }
  /**
   * Register a bounded opaque assembly that straddles the interface, so its
   * forward-refracted image can be transported through the Snell window.
   */
  register(registration) {
    return this.interfaceStructures.register(registration);
  }
  update(renderer, camera, scene, elapsed, delta) {
    this.timeUniform.value = elapsed;
    this.simulation.update(renderer, elapsed, delta);
    const step3 = this.followStep;
    const qx = Math.round(camera.position.x / step3) * step3;
    const qz = Math.round(camera.position.z / step3) * step3;
    this.inner.position.set(qx, 0, qz);
    this.outer.position.set(qx, 0, qz);
    this.interfaceStructures.update({ camera, renderer, scene });
  }
  dispose(scene) {
    scene.remove(this.inner);
    scene.remove(this.outer);
    this.inner.geometry.dispose();
    this.outer.geometry.dispose();
    this.inner.material.dispose();
    this.outer.material.dispose();
    this.interfaceStructures.dispose();
    this.simulation.dispose();
  }
};
export {
  SubmergedOcean
};
