var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/PassBase.ts
import { Pass } from "https://esm.sh/postprocessing@6.37.4?deps=three@0.185.1&external=three";
import { Camera } from "https://esm.sh/three@0.185.1?external";
var PassBase = class extends Pass {
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
};
export {
  PassBase
};
