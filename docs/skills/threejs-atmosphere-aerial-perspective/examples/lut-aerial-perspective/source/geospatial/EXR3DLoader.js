var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { Data3DTexture, Loader } from "three";
import { EXRLoader } from "three-stdlib";
class EXR3DLoader extends Loader {
  constructor() {
    super(...arguments);
    __publicField(this, "depth");
  }
  setDepth(value) {
    this.depth = value;
    return this;
  }
  load(url, onLoad, onProgress, onError) {
    const loader = new EXRLoader(this.manager);
    loader.setRequestHeader(this.requestHeader);
    loader.setPath(this.path);
    loader.setWithCredentials(this.withCredentials);
    loader.load(
      url,
      (exr) => {
        const { data, width, height } = exr.image;
        const depth = this.depth ?? Math.sqrt(height);
        const texture = new Data3DTexture(data, width, height / depth, depth);
        texture.type = exr.type;
        texture.format = exr.format;
        texture.colorSpace = exr.colorSpace;
        texture.needsUpdate = true;
        try {
          onLoad(texture);
        } catch (error) {
          if (onError != null) {
            onError(error);
          } else {
            console.error(error);
          }
          this.manager.itemError(url);
        }
      },
      onProgress,
      onError
    );
  }
}
export {
  EXR3DLoader
};
