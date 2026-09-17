import { Fn, vec3 } from "three/tsl";
const sdfSampler = (fn) => {
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
