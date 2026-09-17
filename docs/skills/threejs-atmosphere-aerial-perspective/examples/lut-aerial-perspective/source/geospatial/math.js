import { MathUtils } from "three";
const clamp = MathUtils.clamp;
const euclideanModulo = MathUtils.euclideanModulo;
const inverseLerp = MathUtils.inverseLerp;
const lerp = MathUtils.lerp;
const radians = MathUtils.degToRad;
const degrees = MathUtils.radToDeg;
const isPowerOfTwo = MathUtils.isPowerOfTwo;
const ceilPowerOfTwo = MathUtils.ceilPowerOfTwo;
const floorPowerOfTwo = MathUtils.floorPowerOfTwo;
const normalize = MathUtils.normalize;
function remap(x, min1, max1, min2 = 0, max2 = 1) {
  return MathUtils.mapLinear(x, min1, max1, min2, max2);
}
function remapClamped(x, min1, max1, min2 = 0, max2 = 1) {
  return clamp(MathUtils.mapLinear(x, min1, max1, min2, max2), min2, max2);
}
function smoothstep(min, max, x) {
  if (x <= min) {
    return 0;
  }
  if (x >= max) {
    return 1;
  }
  x = (x - min) / (max - min);
  return x * x * (3 - 2 * x);
}
function saturate(x) {
  return Math.min(Math.max(x, 0), 1);
}
function closeTo(a, b, relativeEpsilon, absoluteEpsilon = relativeEpsilon) {
  const diff = Math.abs(a - b);
  return diff <= absoluteEpsilon || diff <= relativeEpsilon * Math.max(Math.abs(a), Math.abs(b));
}
export {
  ceilPowerOfTwo,
  clamp,
  closeTo,
  degrees,
  euclideanModulo,
  floorPowerOfTwo,
  inverseLerp,
  isPowerOfTwo,
  lerp,
  normalize,
  radians,
  remap,
  remapClamped,
  saturate,
  smoothstep
};
