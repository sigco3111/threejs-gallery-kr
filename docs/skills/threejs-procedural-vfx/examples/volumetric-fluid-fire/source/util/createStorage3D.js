import * as THREE from "three/webgpu";
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
