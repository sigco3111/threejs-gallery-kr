var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { Pass } from "postprocessing";
import { Camera } from "three";
class PassBase extends Pass {
  constructor(name, options) {
    super(name);
    __publicField(this, "shadow");
    __publicField(this, "_mainCamera", new Camera());
    const { shadow } = options;
    this.shadow = shadow;
  }
  get mainCamera() {
    return this._mainCamera;
  }
  set mainCamera(value) {
    this._mainCamera = value;
  }
}
export {
  PassBase
};
