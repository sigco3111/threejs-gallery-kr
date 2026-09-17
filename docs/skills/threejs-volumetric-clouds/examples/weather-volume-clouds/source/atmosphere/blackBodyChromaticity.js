import { Color, Matrix3, Vector3 } from "three";
import { clamp, saturate } from "../geospatial/index.js";
const vectorScratch = /* @__PURE__ */ new Vector3();
const XYZToLinearRGB = /* @__PURE__ */ new Matrix3(
  3.2404542,
  -1.5371385,
  -0.4985314,
  -0.969266,
  1.8760108,
  0.041556,
  0.0556434,
  -0.2040259,
  1.0572252
);
function convertTemperatureToLinearSRGBChromaticity(temperature, result = new Color()) {
  const T = temperature;
  const T2 = T ** 2;
  const u = (0.860117757 + 154118254e-12 * T + 128641212e-15 * T2) / (1 + 842420235e-12 * T + 708145163e-15 * T2);
  const v = (0.317398726 + 422806245e-13 * T + 420481691e-16 * T2) / (1 - 289741816e-13 * T + 161456053e-15 * T2);
  const x = 3 * u / (2 * u - 8 * v + 4);
  const y = 2 * v / (2 * u - 8 * v + 4);
  const Y = 1;
  const X = y > 0 ? x * Y / y : 0;
  const Z = y > 0 ? (1 - x - y) * Y / y : 0;
  const color = vectorScratch.set(X, Y, Z).applyMatrix3(XYZToLinearRGB);
  color.x = saturate(color.x);
  color.y = saturate(color.y);
  color.z = saturate(color.z);
  return result.setFromVector3(color.normalize());
}
function convertBVIndexToTemperature(bvIndex) {
  const bv = clamp(bvIndex, -0.4, 2);
  return 4600 * (1 / (0.92 * bv + 1.7) + 1 / (0.92 * bvIndex + 0.62));
}
function convertBVIndexToLinearSRGBChromaticity(bvIndex, result = new Color()) {
  return convertTemperatureToLinearSRGBChromaticity(
    convertBVIndexToTemperature(bvIndex),
    result
  );
}
export {
  convertBVIndexToLinearSRGBChromaticity,
  convertTemperatureToLinearSRGBChromaticity
};
