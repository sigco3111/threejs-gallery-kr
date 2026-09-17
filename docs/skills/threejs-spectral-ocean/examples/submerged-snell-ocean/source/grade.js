// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/grade.ts
import {
  ClampToEdgeWrapping,
  Data3DTexture,
  LinearFilter,
  RGBAFormat,
  UnsignedByteType
} from "https://esm.sh/three@0.185.1?external";
import { lut3D } from "https://esm.sh/three@0.185.1/examples/jsm/tsl/display/Lut3DNode.js?external=three";
import {
  clamp,
  float,
  screenUV,
  smoothstep,
  texture3D,
  uniform,
  vec4
} from "https://esm.sh/three@0.185.1/tsl?external=three";
var asColor = (node) => node;
var LUT_SIZE = 32;
var gradeParams = {
  exposureEV: uniform(0),
  lutIntensity: uniform(1),
  vignette: uniform(0.115)
};
var dreamLutTexture = createDreamLutTexture();
function dreamGrade(inputColor) {
  const input = clamp(asColor(inputColor), 0, 1);
  const graded = lut3D(
    input,
    texture3D(dreamLutTexture),
    LUT_SIZE,
    gradeParams.lutIntensity
  );
  const centered = screenUV.sub(0.5);
  const falloff = smoothstep(0.38, 0.94, centered.length().mul(1.34));
  const vignetted = graded.rgb.mul(float(1).sub(falloff.mul(gradeParams.vignette)));
  return vec4(vignetted.clamp(0, 1), float(1));
}
function createDreamLutTexture() {
  const data = new Uint8Array(LUT_SIZE ** 3 * 4);
  let offset = 0;
  for (let b = 0; b < LUT_SIZE; b++) {
    for (let g = 0; g < LUT_SIZE; g++) {
      for (let r = 0; r < LUT_SIZE; r++) {
        const source = [
          r / (LUT_SIZE - 1),
          g / (LUT_SIZE - 1),
          b / (LUT_SIZE - 1)
        ];
        const graded = gradeSample(source);
        data[offset++] = Math.round(graded[0] * 255);
        data[offset++] = Math.round(graded[1] * 255);
        data[offset++] = Math.round(graded[2] * 255);
        data[offset++] = 255;
      }
    }
  }
  const texture3D2 = new Data3DTexture(data, LUT_SIZE, LUT_SIZE, LUT_SIZE);
  texture3D2.format = RGBAFormat;
  texture3D2.type = UnsignedByteType;
  texture3D2.minFilter = LinearFilter;
  texture3D2.magFilter = LinearFilter;
  texture3D2.wrapS = ClampToEdgeWrapping;
  texture3D2.wrapT = ClampToEdgeWrapping;
  texture3D2.wrapR = ClampToEdgeWrapping;
  texture3D2.generateMipmaps = false;
  texture3D2.needsUpdate = true;
  texture3D2.name = "dreamGrade32";
  return texture3D2;
}
function gradeSample(color) {
  const lift = [0.011, 0.026, 0.033];
  const gain = [1.042, 1.008, 0.972];
  const balanced = color.map((channel, index) => channel * gain[index] + lift[index] * (1 - channel));
  const luminance = balanced[0] * 0.2126 + balanced[1] * 0.7152 + balanced[2] * 0.0722;
  const saturation = Math.max(...balanced) - Math.min(...balanced);
  const vibrance = 1 + 0.17 * (1 - saturation);
  return balanced.map((channel) => clampCpu(luminance + (channel - luminance) * vibrance));
}
function clampCpu(value) {
  return Math.max(0, Math.min(1, value));
}
export {
  dreamGrade,
  dreamLutTexture,
  gradeParams
};
