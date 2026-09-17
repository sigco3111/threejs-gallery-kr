import { float, sin, smoothstep, uniform, vec2 } from "three/tsl";
import { fbm2, valueNoise2 } from "./noise";
const seabedRippleBakeFlat = uniform(0);
function seabedRippleSlope(worldXZ, footprint) {
  const warp = fbm2(worldXZ.mul(0.09)).mul(7);
  const band = sin(worldXZ.x.mul(1.9).add(worldXZ.y.mul(0.9)).add(warp));
  const band2 = sin(worldXZ.x.mul(-1).add(worldXZ.y.mul(2.3)).add(warp.mul(1.4)));
  const micro = valueNoise2(worldXZ.mul(7)).sub(0.5).mul(0.24);
  const bandKeep = footprint ? float(1).sub(smoothstep(0.6, 2.2, footprint)) : float(1);
  const microKeep = footprint ? float(1).sub(smoothstep(0.03, 0.12, footprint)) : float(1);
  return vec2(band.mul(0.08), band2.mul(0.06)).mul(bandKeep).add(micro.mul(microKeep));
}
export {
  seabedRippleBakeFlat,
  seabedRippleSlope
};
