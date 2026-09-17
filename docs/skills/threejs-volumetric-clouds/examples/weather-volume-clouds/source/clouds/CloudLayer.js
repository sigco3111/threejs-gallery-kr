var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { DensityProfile } from "./DensityProfile";
const paramKeys = [
  "channel",
  "altitude",
  "height",
  "densityScale",
  "shapeAmount",
  "shapeDetailAmount",
  "weatherExponent",
  "shapeAlteringBias",
  "coverageFilterWidth",
  "shadow",
  "densityProfile"
];
function applyOptions(target, params) {
  if (params == null) {
    return;
  }
  for (const key of paramKeys) {
    const value = params[key];
    if (value == null) {
      continue;
    }
    if (target[key] instanceof DensityProfile) {
      target[key].copy(value);
    } else {
      ;
      target[key] = value;
    }
  }
}
const _CloudLayer = class _CloudLayer {
  constructor(options) {
    __publicField(this, "channel", "r");
    __publicField(this, "altitude", 0);
    __publicField(this, "height", 0);
    __publicField(this, "densityScale", 0.2);
    __publicField(this, "shapeAmount", 1);
    __publicField(this, "shapeDetailAmount", 1);
    __publicField(this, "weatherExponent", 1);
    __publicField(this, "shapeAlteringBias", 0.35);
    __publicField(this, "coverageFilterWidth", 0.6);
    __publicField(this, "densityProfile", new DensityProfile(0, 0, 0.75, 0.25));
    __publicField(this, "shadow", false);
    this.set(options);
  }
  set(options) {
    applyOptions(this, options);
    return this;
  }
  clone() {
    return new _CloudLayer(this);
  }
  copy(other) {
    this.channel = other.channel;
    this.altitude = other.altitude;
    this.height = other.height;
    this.densityScale = other.densityScale;
    this.shapeAmount = other.shapeAmount;
    this.shapeDetailAmount = other.shapeDetailAmount;
    this.weatherExponent = other.weatherExponent;
    this.shapeAlteringBias = other.shapeAlteringBias;
    this.coverageFilterWidth = other.coverageFilterWidth;
    this.densityProfile.copy(other.densityProfile);
    this.shadow = other.shadow;
    return this;
  }
};
__publicField(_CloudLayer, "DEFAULT", /* @__PURE__ */ new _CloudLayer());
let CloudLayer = _CloudLayer;
export {
  CloudLayer
};
