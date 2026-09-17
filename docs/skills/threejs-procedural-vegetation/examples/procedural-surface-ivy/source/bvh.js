import * as THREE from "three";
import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree } from "three-mesh-bvh";
THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
THREE.Mesh.prototype.raycast = acceleratedRaycast;
function indexForRaycasts(root) {
  root.traverse((o) => {
    const mesh = o;
    if (mesh.isMesh && !mesh.geometry.boundsTree) {
      mesh.geometry.computeBoundsTree();
    }
  });
}
function disposeRaycastIndex(geometry) {
  geometry.disposeBoundsTree?.();
}
function firstHitOnly(raycaster) {
  raycaster.firstHitOnly = true;
  return raycaster;
}
export {
  disposeRaycastIndex,
  firstHitOnly,
  indexForRaycasts
};
