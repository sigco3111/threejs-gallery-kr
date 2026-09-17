import { dot, float, max, mix, normalize, pow, smoothstep, vec2, vec3 } from "three/tsl";
import { fbm2, valueNoise2 } from "./noise";
import { skyRadiance } from "./sky-radiance";
import { sunColorUniform, sunDirectionUniform } from "./sun";
import {
  WAKE_FOAM_CENTER_X,
  WAKE_FOAM_CENTER_Z,
  WAKE_FOAM_SIZE
} from "./wake-foam-map";
const WINDROW_SPACING = 12.5;
const WINDROW_LENGTH = 95;
const WINDROW_BREAKUP_SPACING = 3.8;
const WINDROW_BREAKUP_LENGTH = 24;
const DRIFT_FRACTION = 0.03;
const GUST_SCALE = 165;
const GUST_DETAIL_SCALE = 58;
const RELIEF_FREQUENCY = 3.1;
const RELIEF_STRENGTH = 0.35;
const WINDROW_LINE_THRESHOLD = [0.6, 0.88];
const GUST_THRESHOLD = [0.44, 0.8];
const WINDROW_COVERAGE = 0.85;
const RAFT_TAIL_BAND = [0.26, 0.66];
const RAFT_BASE_COVERAGE = 0.45;
const RAFT_LINE_COVERAGE = 0.55;
const CREST_TEAR_BAND = [0.55, 1.35];
const CREST_COVERAGE = 0.55;
function createOceanFoam(inputs) {
  const { sea, time, worldXZ, pixelFootprint, edgeKeep } = inputs;
  const sunDir = sunDirectionUniform;
  const alongAxis = vec2(Math.cos(sea.windAzimuth), Math.sin(sea.windAzimuth));
  const acrossAxis = vec2(-Math.sin(sea.windAzimuth), Math.cos(sea.windAzimuth));
  const drift = time.mul(sea.windSpeed * DRIFT_FRACTION);
  const along = dot(worldXZ, alongAxis).sub(drift);
  const across = dot(worldXZ, acrossAxis);
  const bandCoarse = valueNoise2(
    vec2(across.div(WINDROW_SPACING), along.div(WINDROW_LENGTH))
  );
  const bandFine = valueNoise2(
    vec2(
      across.div(WINDROW_BREAKUP_SPACING),
      along.div(WINDROW_BREAKUP_LENGTH)
    ).add(vec2(19.7, 4.3))
  );
  const bandKeep = float(1).sub(smoothstep(3, 7, pixelFootprint));
  const breakupKeep = float(1).sub(smoothstep(0.9, 2.2, pixelFootprint));
  const bandField = mix(float(0.5), bandCoarse, bandKeep).add(
    bandFine.sub(0.5).mul(0.5).mul(breakupKeep)
  );
  const convergenceLines = smoothstep(
    WINDROW_LINE_THRESHOLD[0],
    WINDROW_LINE_THRESHOLD[1],
    bandField
  );
  const gustCoarse = valueNoise2(
    vec2(across.div(GUST_SCALE), along.div(GUST_SCALE * 1.7)).add(vec2(7.1, 2.9))
  );
  const gustFine = valueNoise2(
    vec2(across.div(GUST_DETAIL_SCALE), along.div(GUST_DETAIL_SCALE * 1.5)).add(
      vec2(31.4, 12.8)
    )
  );
  const gustKeep = float(1).sub(smoothstep(9, 20, pixelFootprint));
  const gustField = gustCoarse.add(gustFine.sub(0.5).mul(0.6).mul(gustKeep));
  const gustPatch = smoothstep(GUST_THRESHOLD[0], GUST_THRESHOLD[1], gustField);
  const gather = smoothstep(-0.25, 0.25, inputs.convergence).mul(0.7).add(0.35);
  const windrow = convergenceLines.mul(gustPatch).mul(gather).mul(WINDROW_COVERAGE);
  const raftTail = float(1).sub(
    smoothstep(RAFT_TAIL_BAND[0], RAFT_TAIL_BAND[1], inputs.jacobianHistory)
  );
  const raft = raftTail.mul(
    convergenceLines.mul(RAFT_LINE_COVERAGE).add(RAFT_BASE_COVERAGE)
  );
  const crestTear = smoothstep(
    CREST_TEAR_BAND[0],
    CREST_TEAR_BAND[1],
    inputs.crestHeight
  ).mul(smoothstep(0.1, 0.42, inputs.steepness).mul(0.65).add(0.35)).mul(gustPatch).mul(CREST_COVERAGE);
  let dense = float(1).sub(
    smoothstep(-0.05, 0.26, inputs.jacobianHistory)
  );
  let churn = float(0);
  if (inputs.wakeFoam) {
    const wakeUv = worldXZ.sub(vec2(WAKE_FOAM_CENTER_X, WAKE_FOAM_CENTER_Z)).div(WAKE_FOAM_SIZE).add(0.5);
    const wake = inputs.wakeFoam.foamNode.sample(wakeUv);
    dense = max(dense, smoothstep(0.02, 0.6, wake.g));
    churn = smoothstep(0.1, 0.75, wake.r);
  }
  const thin = max(max(windrow, raft), crestTear).mul(edgeKeep).clamp(0, 1);
  const bubbleA = fbm2(worldXZ.mul(0.9).add(vec2(0.13, 0.07).mul(time)));
  const bubbleB = fbm2(worldXZ.mul(1.7).sub(vec2(0.11, 0.05).mul(time)));
  const foamKeep = float(1).sub(smoothstep(0.25, 0.8, pixelFootprint));
  const thinLace = mix(
    float(0.46),
    smoothstep(0.26, 0.7, bubbleA.mul(0.65).add(bubbleB.mul(0.35))),
    foamKeep
  );
  const denseMask = dense.mul(bubbleA.mul(bubbleB).mul(1.7).add(0.06)).add(churn.mul(bubbleA.mul(0.45).add(0.62))).mul(foamKeep).clamp(0, 1);
  const thinMask = thin.mul(thinLace);
  const mask = denseMask.add(thinMask).clamp(0, 1);
  const thickShare = denseMask.div(denseMask.add(thinMask).max(1e-4)).clamp(0, 1);
  const reliefUv = worldXZ.mul(RELIEF_FREQUENCY).add(vec2(0.05, -0.09).mul(time));
  const reliefCenter = valueNoise2(reliefUv);
  const reliefSlope = vec2(
    valueNoise2(reliefUv.add(vec2(0.14, 0))).sub(reliefCenter),
    valueNoise2(reliefUv.add(vec2(0, 0.14))).sub(reliefCenter)
  ).div(0.14);
  const reliefKeep = float(1).sub(smoothstep(0.06, 0.2, pixelFootprint));
  const foamNormal = normalize(
    inputs.normal.add(
      vec3(reliefSlope.x, 0, reliefSlope.y).mul(reliefKeep.mul(RELIEF_STRENGTH))
    )
  );
  const foamNoL = max(dot(foamNormal, sunDir), 0);
  const foamAmbient = skyRadiance(foamNormal, float(0)).mul(0.22);
  const denseShade = foamAmbient.add(
    sunColorUniform.mul(foamNoL.mul(0.9).add(0.3)).mul(0.9).mul(inputs.sunShadow)
  );
  const thinOpacity = thin.mul(0.45).add(0.42);
  const throughScatter = pow(max(dot(inputs.viewDir, sunDir.negate()), 0), 3).mul(float(1).sub(thinOpacity)).mul(0.4);
  const thinShade = mix(inputs.waterRadiance, denseShade, thinOpacity).add(
    sunColorUniform.mul(throughScatter).mul(inputs.sunShadow)
  );
  return {
    mask,
    color: mix(thinShade, denseShade, thickShare),
    debug: vec3(
      denseMask,
      max(windrow, raft).mul(edgeKeep),
      crestTear.mul(edgeKeep)
    )
  };
}
export {
  createOceanFoam
};
