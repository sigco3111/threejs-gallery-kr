// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/ocean-foam.ts
import { dot as dot3, float as float4, max as max2, mix as mix4, normalize as normalize2, pow as pow2, smoothstep as smoothstep2, vec2 as vec22, vec3 as vec33 } from "https://esm.sh/three@0.185.1/tsl?deps=three@0.185.1";

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

// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/wake-foam-map.ts
import { HalfFloatType, LinearFilter, Vector4 } from "https://esm.sh/three@0.185.1?external";
import { StorageTexture } from "https://esm.sh/three@0.185.1/webgpu?deps=three@0.185.1";
import {
  Fn as Fn3,
  exp,
  float as float3,
  instanceIndex,
  int,
  ivec2,
  mix as mix3,
  texture,
  textureLoad,
  textureStore,
  uint,
  uniform as uniform2,
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
  const alongAxis = vec22(Math.cos(sea.windAzimuth), Math.sin(sea.windAzimuth));
  const acrossAxis = vec22(-Math.sin(sea.windAzimuth), Math.cos(sea.windAzimuth));
  const drift = time.mul(sea.windSpeed * DRIFT_FRACTION);
  const along = dot3(worldXZ, alongAxis).sub(drift);
  const across = dot3(worldXZ, acrossAxis);
  const bandCoarse = valueNoise2(
    vec22(across.div(WINDROW_SPACING), along.div(WINDROW_LENGTH))
  );
  const bandFine = valueNoise2(
    vec22(
      across.div(WINDROW_BREAKUP_SPACING),
      along.div(WINDROW_BREAKUP_LENGTH)
    ).add(vec22(19.7, 4.3))
  );
  const bandKeep = float4(1).sub(smoothstep2(3, 7, pixelFootprint));
  const breakupKeep = float4(1).sub(smoothstep2(0.9, 2.2, pixelFootprint));
  const bandField = mix4(float4(0.5), bandCoarse, bandKeep).add(
    bandFine.sub(0.5).mul(0.5).mul(breakupKeep)
  );
  const convergenceLines = smoothstep2(
    WINDROW_LINE_THRESHOLD[0],
    WINDROW_LINE_THRESHOLD[1],
    bandField
  );
  const gustCoarse = valueNoise2(
    vec22(across.div(GUST_SCALE), along.div(GUST_SCALE * 1.7)).add(vec22(7.1, 2.9))
  );
  const gustFine = valueNoise2(
    vec22(across.div(GUST_DETAIL_SCALE), along.div(GUST_DETAIL_SCALE * 1.5)).add(
      vec22(31.4, 12.8)
    )
  );
  const gustKeep = float4(1).sub(smoothstep2(9, 20, pixelFootprint));
  const gustField = gustCoarse.add(gustFine.sub(0.5).mul(0.6).mul(gustKeep));
  const gustPatch = smoothstep2(GUST_THRESHOLD[0], GUST_THRESHOLD[1], gustField);
  const gather = smoothstep2(-0.25, 0.25, inputs.convergence).mul(0.7).add(0.35);
  const windrow = convergenceLines.mul(gustPatch).mul(gather).mul(WINDROW_COVERAGE);
  const raftTail = float4(1).sub(
    smoothstep2(RAFT_TAIL_BAND[0], RAFT_TAIL_BAND[1], inputs.jacobianHistory)
  );
  const raft = raftTail.mul(
    convergenceLines.mul(RAFT_LINE_COVERAGE).add(RAFT_BASE_COVERAGE)
  );
  const crestTear = smoothstep2(
    CREST_TEAR_BAND[0],
    CREST_TEAR_BAND[1],
    inputs.crestHeight
  ).mul(smoothstep2(0.1, 0.42, inputs.steepness).mul(0.65).add(0.35)).mul(gustPatch).mul(CREST_COVERAGE);
  let dense = float4(1).sub(
    smoothstep2(-0.05, 0.26, inputs.jacobianHistory)
  );
  let churn = float4(0);
  if (inputs.wakeFoam) {
    const wakeUv = worldXZ.sub(vec22(WAKE_FOAM_CENTER_X, WAKE_FOAM_CENTER_Z)).div(WAKE_FOAM_SIZE).add(0.5);
    const wake = inputs.wakeFoam.foamNode.sample(wakeUv);
    dense = max2(dense, smoothstep2(0.02, 0.6, wake.g));
    churn = smoothstep2(0.1, 0.75, wake.r);
  }
  const thin = max2(max2(windrow, raft), crestTear).mul(edgeKeep).clamp(0, 1);
  const bubbleA = fbm2(worldXZ.mul(0.9).add(vec22(0.13, 0.07).mul(time)));
  const bubbleB = fbm2(worldXZ.mul(1.7).sub(vec22(0.11, 0.05).mul(time)));
  const foamKeep = float4(1).sub(smoothstep2(0.25, 0.8, pixelFootprint));
  const thinLace = mix4(
    float4(0.46),
    smoothstep2(0.26, 0.7, bubbleA.mul(0.65).add(bubbleB.mul(0.35))),
    foamKeep
  );
  const denseMask = dense.mul(bubbleA.mul(bubbleB).mul(1.7).add(0.06)).add(churn.mul(bubbleA.mul(0.45).add(0.62))).mul(foamKeep).clamp(0, 1);
  const thinMask = thin.mul(thinLace);
  const mask = denseMask.add(thinMask).clamp(0, 1);
  const thickShare = denseMask.div(denseMask.add(thinMask).max(1e-4)).clamp(0, 1);
  const reliefUv = worldXZ.mul(RELIEF_FREQUENCY).add(vec22(0.05, -0.09).mul(time));
  const reliefCenter = valueNoise2(reliefUv);
  const reliefSlope = vec22(
    valueNoise2(reliefUv.add(vec22(0.14, 0))).sub(reliefCenter),
    valueNoise2(reliefUv.add(vec22(0, 0.14))).sub(reliefCenter)
  ).div(0.14);
  const reliefKeep = float4(1).sub(smoothstep2(0.06, 0.2, pixelFootprint));
  const foamNormal = normalize2(
    inputs.normal.add(
      vec33(reliefSlope.x, 0, reliefSlope.y).mul(reliefKeep.mul(RELIEF_STRENGTH))
    )
  );
  const foamNoL = max2(dot3(foamNormal, sunDir), 0);
  const foamAmbient = skyRadiance(foamNormal, float4(0)).mul(0.22);
  const denseShade = foamAmbient.add(
    sunColorUniform.mul(foamNoL.mul(0.9).add(0.3)).mul(0.9).mul(inputs.sunShadow)
  );
  const thinOpacity = thin.mul(0.45).add(0.42);
  const throughScatter = pow2(max2(dot3(inputs.viewDir, sunDir.negate()), 0), 3).mul(float4(1).sub(thinOpacity)).mul(0.4);
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
export {
  createOceanFoam
};
