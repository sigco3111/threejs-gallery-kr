// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/ocean-material.ts
import { DoubleSide } from "https://esm.sh/three@0.185.1?external";
import { MeshBasicNodeMaterial } from "https://esm.sh/three@0.185.1/webgpu?deps=three@0.185.1";
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
} from "https://esm.sh/three@0.185.1/tsl?deps=three@0.185.1";

// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/noise.ts
import { Fn, Loop, float, fract, dot, floor, mix, sin, vec2, vec3 } from "https://esm.sh/three@0.185.1/tsl?deps=three@0.185.1";
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
import { Fn as Fn2, dot as dot2, float as float2, max, mix as mix2, normalize, pow, smoothstep, vec3 as vec32 } from "https://esm.sh/three@0.185.1/tsl?deps=three@0.185.1";

// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/sun.ts
import { Color, Vector3 } from "https://esm.sh/three@0.185.1?external";
import { uniform } from "https://esm.sh/three@0.185.1/tsl?deps=three@0.185.1";
var SUN_ELEVATION = 42 * Math.PI / 180;
var SUN_AZIMUTH = 215 * Math.PI / 180;
var sunDirection = new Vector3(
  Math.cos(SUN_ELEVATION) * Math.sin(SUN_AZIMUTH),
  Math.sin(SUN_ELEVATION),
  Math.cos(SUN_ELEVATION) * Math.cos(SUN_AZIMUTH)
).normalize();
var sunColor = new Color(1, 0.925, 0.79);
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
import { float as float3, sin as sin2, smoothstep as smoothstep2, uniform as uniform2, vec2 as vec22 } from "https://esm.sh/three@0.185.1/tsl?deps=three@0.185.1";
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
import { dot as dot3, float as float5, max as max2, mix as mix4, normalize as normalize2, pow as pow2, smoothstep as smoothstep3, vec2 as vec23, vec3 as vec33 } from "https://esm.sh/three@0.185.1/tsl?deps=three@0.185.1";

// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/wake-foam-map.ts
import { HalfFloatType, LinearFilter, Vector4 } from "https://esm.sh/three@0.185.1?external";
import { StorageTexture } from "https://esm.sh/three@0.185.1/webgpu?deps=three@0.185.1";
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
} from "https://esm.sh/three@0.185.1/tsl?deps=three@0.185.1";
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
export {
  createOceanSurfaceMaterial,
  oceanOpticsDebugMode
};
