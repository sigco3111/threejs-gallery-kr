var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { LightProbe, Matrix4, Vector2, Vector3 } from "three";
import { Ellipsoid } from "../geospatial/index.js";
import { AtmosphereParameters } from "./AtmosphereParameters";
import {
  IRRADIANCE_TEXTURE_HEIGHT,
  IRRADIANCE_TEXTURE_WIDTH
} from "./constants";
import { getAltitudeCorrectionOffset } from "./getAltitudeCorrectionOffset";
import { getTextureCoordFromUnitRange } from "./helpers/functions";
import { sampleTexture } from "./helpers/sampleTexture";
function getUvFromRMuS({ topRadius, bottomRadius }, r, muS, result) {
  const xR = (r - bottomRadius) / (topRadius - bottomRadius);
  const xMuS = muS * 0.5 + 0.5;
  return result.set(
    getTextureCoordFromUnitRange(xMuS, IRRADIANCE_TEXTURE_WIDTH),
    getTextureCoordFromUnitRange(xR, IRRADIANCE_TEXTURE_HEIGHT)
  );
}
const L0_COEFF = 1 / Math.sqrt(Math.PI);
const L1_COEFF = Math.sqrt(3) / (2 * Math.sqrt(Math.PI));
const vectorScratch1 = /* @__PURE__ */ new Vector3();
const vectorScratch2 = /* @__PURE__ */ new Vector3();
const uvScratch = /* @__PURE__ */ new Vector2();
const matrixScratch = /* @__PURE__ */ new Matrix4();
const skyLightProbeParametersDefaults = {
  ellipsoid: Ellipsoid.WGS84,
  correctAltitude: true,
  photometric: true
};
class SkyLightProbe extends LightProbe {
  constructor(params, atmosphere = AtmosphereParameters.DEFAULT) {
    super();
    this.atmosphere = atmosphere;
    __publicField(this, "irradianceTexture");
    __publicField(this, "ellipsoid");
    __publicField(this, "ellipsoidCenter", new Vector3());
    __publicField(this, "ellipsoidMatrix", new Matrix4());
    __publicField(this, "correctAltitude");
    __publicField(this, "photometric");
    __publicField(this, "sunDirection");
    const {
      irradianceTexture = null,
      ellipsoid,
      correctAltitude,
      photometric,
      sunDirection
    } = { ...skyLightProbeParametersDefaults, ...params };
    this.irradianceTexture = irradianceTexture;
    this.ellipsoid = ellipsoid;
    this.correctAltitude = correctAltitude;
    this.photometric = photometric;
    this.sunDirection = sunDirection?.clone() ?? new Vector3();
  }
  update() {
    if (this.irradianceTexture == null) {
      return;
    }
    const inverseEllipsoidMatrix = matrixScratch.copy(this.ellipsoidMatrix).invert();
    const cameraPosition = this.getWorldPosition(vectorScratch1);
    const cameraPositionECEF = cameraPosition.applyMatrix4(inverseEllipsoidMatrix).sub(this.ellipsoidCenter);
    if (this.correctAltitude) {
      const surfacePosition = this.ellipsoid.projectOnSurface(
        cameraPositionECEF,
        vectorScratch2
      );
      if (surfacePosition != null) {
        cameraPositionECEF.sub(
          getAltitudeCorrectionOffset(
            surfacePosition,
            this.atmosphere.bottomRadius,
            this.ellipsoid,
            vectorScratch2
          )
        );
      }
    }
    const r = cameraPositionECEF.length();
    const muS = cameraPositionECEF.dot(this.sunDirection) / r;
    const uv = getUvFromRMuS(this.atmosphere, r, muS, uvScratch);
    const irradiance = sampleTexture(this.irradianceTexture, uv, vectorScratch2);
    if (this.photometric) {
      irradiance.multiply(this.atmosphere.skyRadianceToRelativeLuminance);
    }
    const normal = this.ellipsoid.getSurfaceNormal(cameraPositionECEF).applyMatrix4(this.ellipsoidMatrix);
    const coefficients = this.sh.coefficients;
    coefficients[0].copy(irradiance).multiplyScalar(L0_COEFF);
    coefficients[1].copy(irradiance).multiplyScalar(L1_COEFF * normal.y);
    coefficients[2].copy(irradiance).multiplyScalar(L1_COEFF * normal.z);
    coefficients[3].copy(irradiance).multiplyScalar(L1_COEFF * normal.x);
  }
}
export {
  SkyLightProbe,
  skyLightProbeParametersDefaults
};
