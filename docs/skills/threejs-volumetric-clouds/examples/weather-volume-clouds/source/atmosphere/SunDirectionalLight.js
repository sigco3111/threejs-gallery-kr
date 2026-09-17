var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { DirectionalLight, Matrix4, Vector3 } from "three";
import { Ellipsoid } from "../geospatial/index.js";
import { AtmosphereParameters } from "./AtmosphereParameters";
import { getSunLightColor } from "./getSunLightColor";
const vectorScratch = /* @__PURE__ */ new Vector3();
const matrixScratch = /* @__PURE__ */ new Matrix4();
const sunDirectionalLightParametersDefaults = {
  ellipsoid: Ellipsoid.WGS84,
  correctAltitude: true,
  photometric: true,
  distance: 1
};
class SunDirectionalLight extends DirectionalLight {
  constructor(params, atmosphere = AtmosphereParameters.DEFAULT) {
    super();
    this.atmosphere = atmosphere;
    __publicField(this, "transmittanceTexture");
    __publicField(this, "ellipsoid");
    __publicField(this, "ellipsoidCenter", new Vector3());
    __publicField(this, "ellipsoidMatrix", new Matrix4());
    __publicField(this, "correctAltitude");
    __publicField(this, "photometric");
    __publicField(this, "sunDirection");
    __publicField(this, "distance");
    const {
      irradianceTexture = null,
      ellipsoid,
      correctAltitude,
      photometric,
      sunDirection,
      distance
    } = { ...sunDirectionalLightParametersDefaults, ...params };
    this.transmittanceTexture = irradianceTexture;
    this.ellipsoid = ellipsoid;
    this.correctAltitude = correctAltitude;
    this.photometric = photometric;
    this.sunDirection = sunDirection?.clone() ?? new Vector3();
    this.distance = distance;
  }
  update() {
    this.position.copy(this.sunDirection).applyMatrix4(this.ellipsoidMatrix).normalize().multiplyScalar(this.distance).add(this.target.position);
    if (this.transmittanceTexture == null) {
      return;
    }
    const inverseEllipsoidMatrix = matrixScratch.copy(this.ellipsoidMatrix).invert();
    const cameraPositionECEF = this.target.getWorldPosition(vectorScratch).applyMatrix4(inverseEllipsoidMatrix).sub(this.ellipsoidCenter);
    getSunLightColor(
      this.transmittanceTexture,
      cameraPositionECEF,
      this.sunDirection,
      this.color,
      {
        ellipsoid: this.ellipsoid,
        correctAltitude: this.correctAltitude,
        photometric: this.photometric
      },
      this.atmosphere
    );
  }
}
export {
  SunDirectionalLight,
  sunDirectionalLightParametersDefaults
};
