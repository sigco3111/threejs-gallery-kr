// docs/skills/threejs-procedural-vegetation/examples/procedural-surface-ivy/source/bvh.ts
import * as THREE from "https://esm.sh/three@0.185.1?external";
import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree } from "https://esm.sh/three-mesh-bvh@0.9.10?deps=three@0.185.1&external=three";
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
