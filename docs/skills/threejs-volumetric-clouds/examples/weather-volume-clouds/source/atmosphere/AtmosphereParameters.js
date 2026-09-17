var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { Vector3 } from "three";
import { radians } from "../geospatial/index.js";
const paramKeys = [
  "solarIrradiance",
  "sunAngularRadius",
  "bottomRadius",
  "topRadius",
  "rayleighScattering",
  "mieScattering",
  "miePhaseFunctionG",
  "muSMin",
  "skyRadianceToLuminance",
  "sunRadianceToLuminance",
  "luminousEfficiency"
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
    if (target[key] instanceof Vector3) {
      target[key].copy(value);
    } else {
      ;
      target[key] = value;
    }
  }
}
const _AtmosphereParameters = class _AtmosphereParameters {
  constructor(options) {
    __publicField(this, "solarIrradiance", new Vector3(1.474, 1.8504, 1.91198));
    __publicField(this, "sunAngularRadius", 4675e-6);
    __publicField(this, "bottomRadius", 636e4);
    __publicField(this, "topRadius", 642e4);
    __publicField(this, "rayleighScattering", new Vector3(5802e-6, 0.013558, 0.0331));
    __publicField(this, "mieScattering", new Vector3(3996e-6, 3996e-6, 3996e-6));
    __publicField(this, "miePhaseFunctionG", 0.8);
    __publicField(this, "muSMin", Math.cos(radians(120)));
    // Radiance to luminance conversion
    // prettier-ignore
    __publicField(this, "skyRadianceToLuminance", new Vector3(114974.916437, 71305.954816, 65310.548555));
    __publicField(this, "sunRadianceToLuminance", new Vector3(98242.786222, 69954.398112, 66475.012354));
    __publicField(this, "luminousEfficiency", new Vector3(0.2126, 0.7152, 0.0722));
    __publicField(this, "skyRadianceToRelativeLuminance", new Vector3());
    __publicField(this, "sunRadianceToRelativeLuminance", new Vector3());
    applyOptions(this, options);
    const luminance = this.luminousEfficiency.dot(this.skyRadianceToLuminance);
    this.skyRadianceToRelativeLuminance.copy(this.skyRadianceToLuminance).divideScalar(luminance);
    this.sunRadianceToRelativeLuminance.copy(this.sunRadianceToLuminance).divideScalar(luminance);
  }
};
__publicField(_AtmosphereParameters, "DEFAULT", /* @__PURE__ */ new _AtmosphereParameters());
let AtmosphereParameters = _AtmosphereParameters;
export {
  AtmosphereParameters
};
