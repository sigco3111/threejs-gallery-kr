var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { RenderPass } from "postprocessing";
import {
  HalfFloatType
} from "three";
import { setupMaterialsForGeometryPass } from "./setupMaterialsForGeometryPass";
class GeometryPass extends RenderPass {
  constructor(inputBuffer, scene, camera, overrideMaterial) {
    super(scene, camera, overrideMaterial);
    __publicField(this, "geometryTexture");
    this.geometryTexture = inputBuffer.texture.clone();
    this.geometryTexture.isRenderTargetTexture = true;
    this.geometryTexture.type = HalfFloatType;
    setupMaterialsForGeometryPass();
  }
  render(renderer, inputBuffer, outputBuffer, deltaTime, stencilTest) {
    if (inputBuffer != null) {
      inputBuffer.textures[1] = this.geometryTexture;
    }
    super.render(renderer, inputBuffer, null);
    if (inputBuffer != null) {
      inputBuffer.textures.length = 1;
    }
  }
  setSize(width, height) {
    this.geometryTexture.image.width = width;
    this.geometryTexture.image.height = height;
  }
}
export {
  GeometryPass
};
