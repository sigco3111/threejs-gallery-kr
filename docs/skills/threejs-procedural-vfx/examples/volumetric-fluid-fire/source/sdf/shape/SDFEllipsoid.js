import { SDFShape } from "./SDFShape";
import { length } from "three/tsl";
class SDFEllipsoid extends SDFShape {
  sdf(position, radii) {
    const k0 = length(position.div(radii));
    const k1 = length(position.div(radii.mul(radii)));
    return k0.mul(k0.sub(1)).div(k1);
  }
}
export {
  SDFEllipsoid
};
