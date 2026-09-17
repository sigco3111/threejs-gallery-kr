// docs/skills/threejs-procedural-vfx/examples/volumetric-fluid-fire/source/sdf/sdfSampler.ts
import { Fn, vec3 } from "https://esm.sh/three@0.185.1?external/tsl";
var sdfSampler = (fn) => {
  const sampler = Fn((params) => fn.apply(null, params));
  return (worldPos, outVel, outNormal) => {
    const tempOutVel = outVel ?? vec3(0);
    const tempOutNormal = outNormal ?? vec3(0);
    return sampler(worldPos, tempOutVel, tempOutNormal);
  };
};
export {
  sdfSampler
};
