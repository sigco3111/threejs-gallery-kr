// docs/skills/threejs-procedural-vfx/examples/volumetric-fluid-fire/source/util/createStorage3D.ts
import * as THREE from "https://esm.sh/three@0.185.1/webgpu?deps=three@0.185.1";
function createStorage3D(name, sizeX, sizeY, sizeZ, format = THREE.RGBAFormat, dataType = THREE.HalfFloatType) {
  const texture = new THREE.Storage3DTexture(sizeX, sizeY, sizeZ);
  texture.name = name;
  texture.format = format;
  texture.type = format === THREE.RedFormat ? THREE.FloatType : dataType;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.wrapR = THREE.ClampToEdgeWrapping;
  texture.generateMipmaps = false;
  return texture;
}
export {
  createStorage3D
};
