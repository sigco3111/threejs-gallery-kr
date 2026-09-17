import { SDFShape } from "./SDFShape";
import { abs, length, max, min } from "three/tsl";
class SDFBox extends SDFShape {
  sdf(localPos, halfExtents) {
    const q = abs(localPos).sub(halfExtents);
    return length(max(q, 0)).add(min(max(q.x, max(q.y, q.z)), 0));
  }
}
export {
  SDFBox
};
