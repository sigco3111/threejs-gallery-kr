import { MeshStandardNodeMaterial } from "three/webgpu";
import {
  Fn,
  float,
  mix,
  normalGeometry,
  normalize,
  positionWorld,
  transformNormalToView,
  vec3
} from "three/tsl";
import { fbm2 } from "./noise";
import { seabedRippleBakeFlat, seabedRippleSlope } from "./seabed-surface";
function createSandMaterial(applyCaustics) {
  const material = new MeshStandardNodeMaterial();
  material.roughness = 1;
  material.metalness = 0;
  const xz = positionWorld.xz;
  const tone = fbm2(xz.mul(0.02));
  const patchTone = fbm2(xz.mul(45e-4));
  const base = mix(vec3(0.48, 0.43, 0.33), vec3(0.58, 0.54, 0.43), tone);
  material.colorNode = mix(base, vec3(0.33, 0.4, 0.3), patchTone.smoothstep(0.62, 0.85).mul(0.5));
  material.normalNode = Fn(() => {
    const slope = seabedRippleSlope(xz).mul(float(1).sub(seabedRippleBakeFlat));
    const localNormal = normalize(normalGeometry.add(vec3(slope.x, 0, slope.y)));
    return transformNormalToView(localNormal);
  })();
  applyCaustics(material, 1.15);
  return material;
}
export {
  createSandMaterial
};
