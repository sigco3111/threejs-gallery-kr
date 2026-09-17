import { Color, Vector2, Vector3 } from "three";
import { Ellipsoid } from "../geospatial/index.js";
import { AtmosphereParameters } from "./AtmosphereParameters";
import {
  TRANSMITTANCE_TEXTURE_HEIGHT,
  TRANSMITTANCE_TEXTURE_WIDTH
} from "./constants";
import {
  distanceToTopAtmosphereBoundary,
  getTextureCoordFromUnitRange,
  rayIntersectsGround,
  safeSqrt
} from "./helpers/functions";
import { sampleTexture } from "./helpers/sampleTexture";
function getUvFromRMu(atmosphere, r, mu, result) {
  const { topRadius, bottomRadius } = atmosphere;
  const H = Math.sqrt(topRadius ** 2 - bottomRadius ** 2);
  const rho = safeSqrt(r ** 2 - bottomRadius ** 2);
  const d = distanceToTopAtmosphereBoundary(atmosphere, r, mu);
  const dMin = topRadius - r;
  const dMax = rho + H;
  const xmu = (d - dMin) / (dMax - dMin);
  const xr = rho / H;
  return result.set(
    getTextureCoordFromUnitRange(xmu, TRANSMITTANCE_TEXTURE_WIDTH),
    getTextureCoordFromUnitRange(xr, TRANSMITTANCE_TEXTURE_HEIGHT)
  );
}
const vectorScratch1 = /* @__PURE__ */ new Vector3();
const vectorScratch2 = /* @__PURE__ */ new Vector3();
const uvScratch = /* @__PURE__ */ new Vector2();
function getSunLightColor(transmittanceTexture, worldPosition, sunDirection, result = new Color(), {
  ellipsoid = Ellipsoid.WGS84,
  correctAltitude = true,
  photometric = true
} = {}, atmosphere = AtmosphereParameters.DEFAULT) {
  const camera = vectorScratch1.copy(worldPosition);
  if (correctAltitude) {
    const surfacePosition = ellipsoid.projectOnSurface(
      worldPosition,
      vectorScratch2
    );
    if (surfacePosition != null) {
      camera.sub(
        ellipsoid.getOsculatingSphereCenter(
          surfacePosition,
          atmosphere.bottomRadius,
          vectorScratch2
        )
      );
    }
  }
  const transmittance = vectorScratch2;
  let r = camera.length();
  let rmu = camera.dot(sunDirection);
  const { topRadius } = atmosphere;
  const distanceToTopAtmosphereBoundary2 = -rmu - Math.sqrt(rmu ** 2 - r ** 2 + topRadius ** 2);
  if (distanceToTopAtmosphereBoundary2 > 0) {
    r = topRadius;
    rmu += distanceToTopAtmosphereBoundary2;
  }
  if (r > topRadius) {
    transmittance.set(1, 1, 1);
  } else {
    const mu = rmu / r;
    const rayRMuIntersectsGround = rayIntersectsGround(atmosphere, r, mu);
    if (rayRMuIntersectsGround) {
      transmittance.setScalar(0);
    } else {
      const uv = getUvFromRMu(atmosphere, r, mu, uvScratch);
      sampleTexture(transmittanceTexture, uv, transmittance);
    }
  }
  const radiance = transmittance.multiply(atmosphere.solarIrradiance);
  if (photometric) {
    radiance.multiply(atmosphere.sunRadianceToRelativeLuminance);
  }
  return result.setFromVector3(radiance);
}
export {
  getSunLightColor
};
