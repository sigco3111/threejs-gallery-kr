// node_modules/three/build/three.core.js
var REVISION = "185";
var FrontSide = 0;
var BackSide = 1;
var DoubleSide = 2;
var NeverDepth = 0;
var AlwaysDepth = 1;
var LessDepth = 2;
var LessEqualDepth = 3;
var EqualDepth = 4;
var GreaterEqualDepth = 5;
var GreaterDepth = 6;
var NotEqualDepth = 7;
var NoToneMapping = 0;
var UVMapping = 300;
var CubeReflectionMapping = 301;
var CubeRefractionMapping = 302;
var RepeatWrapping = 1e3;
var ClampToEdgeWrapping = 1001;
var MirroredRepeatWrapping = 1002;
var NearestFilter = 1003;
var LinearFilter = 1006;
var LinearMipmapLinearFilter = 1008;
var UnsignedByteType = 1009;
var IntType = 1013;
var UnsignedIntType = 1014;
var FloatType = 1015;
var HalfFloatType = 1016;
var RGBAFormat = 1023;
var DepthFormat = 1026;
var DepthStencilFormat = 1027;
var RedFormat = 1028;
var RGFormat = 1030;
var RG11_EAC_Format = 37490;
var RED_GREEN_RGTC2_Format = 36285;
var InterpolateDiscrete = 2300;
var InterpolateLinear = 2301;
var InterpolateSmooth = 2302;
var InterpolateBezier = 2303;
var ZeroCurvatureEnding = 2400;
var ZeroSlopeEnding = 2401;
var WrapAroundEnding = 2402;
var TangentSpaceNormalMap = 0;
var ObjectSpaceNormalMap = 1;
var NoColorSpace = "";
var SRGBColorSpace = "srgb";
var LinearSRGBColorSpace = "srgb-linear";
var LinearTransfer = "linear";
var SRGBTransfer = "srgb";
var NoNormalPacking = "";
var NormalRGPacking = "rg";
var NormalGAPacking = "ga";
var NeverCompare = 512;
var LessCompare = 513;
var EqualCompare = 514;
var LessEqualCompare = 515;
var GreaterCompare = 516;
var NotEqualCompare = 517;
var GreaterEqualCompare = 518;
var AlwaysCompare = 519;
var StaticDrawUsage = 35044;
var WebGLCoordinateSystem = 2e3;
var WebGPUCoordinateSystem = 2001;
var Compatibility = {
  TEXTURE_COMPARE: "depthTextureCompare"
};
function isTypedArray(array2) {
  return ArrayBuffer.isView(array2) && !(array2 instanceof DataView);
}
function createElementNS(name) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", name);
}
var _cache = {};
var _setConsoleFunction = null;
function log(...params) {
  const message = "THREE." + params.shift();
  if (_setConsoleFunction) {
    _setConsoleFunction("log", message, ...params);
  } else {
    console.log(message, ...params);
  }
}
function enhanceLogMessage(params) {
  const message = params[0];
  if (typeof message === "string" && message.startsWith("TSL:")) {
    const stackTrace = params[1];
    if (stackTrace && stackTrace.isStackTrace) {
      params[0] += " " + stackTrace.getLocation();
    } else {
      params[1] = 'Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.';
    }
  }
  return params;
}
function warn(...params) {
  params = enhanceLogMessage(params);
  const message = "THREE." + params.shift();
  if (_setConsoleFunction) {
    _setConsoleFunction("warn", message, ...params);
  } else {
    const stackTrace = params[0];
    if (stackTrace && stackTrace.isStackTrace) {
      console.warn(stackTrace.getError(message));
    } else {
      console.warn(message, ...params);
    }
  }
}
function error(...params) {
  params = enhanceLogMessage(params);
  const message = "THREE." + params.shift();
  if (_setConsoleFunction) {
    _setConsoleFunction("error", message, ...params);
  } else {
    const stackTrace = params[0];
    if (stackTrace && stackTrace.isStackTrace) {
      console.error(stackTrace.getError(message));
    } else {
      console.error(message, ...params);
    }
  }
}
function warnOnce(...params) {
  const message = params.join(" ");
  if (message in _cache) return;
  _cache[message] = true;
  warn(...params);
}
var ReversedDepthFuncs = {
  [NeverDepth]: AlwaysDepth,
  [LessDepth]: GreaterDepth,
  [EqualDepth]: NotEqualDepth,
  [LessEqualDepth]: GreaterEqualDepth,
  [AlwaysDepth]: NeverDepth,
  [GreaterDepth]: LessDepth,
  [NotEqualDepth]: EqualDepth,
  [GreaterEqualDepth]: LessEqualDepth
};
var EventDispatcher = class {
  /**
   * Adds the given event listener to the given event type.
   *
   * @param {string} type - The type of event to listen to.
   * @param {Function} listener - The function that gets called when the event is fired.
   */
  addEventListener(type, listener) {
    if (this._listeners === void 0) this._listeners = {};
    const listeners = this._listeners;
    if (listeners[type] === void 0) {
      listeners[type] = [];
    }
    if (listeners[type].indexOf(listener) === -1) {
      listeners[type].push(listener);
    }
  }
  /**
   * Returns `true` if the given event listener has been added to the given event type.
   *
   * @param {string} type - The type of event.
   * @param {Function} listener - The listener to check.
   * @return {boolean} Whether the given event listener has been added to the given event type.
   */
  hasEventListener(type, listener) {
    const listeners = this._listeners;
    if (listeners === void 0) return false;
    return listeners[type] !== void 0 && listeners[type].indexOf(listener) !== -1;
  }
  /**
   * Removes the given event listener from the given event type.
   *
   * @param {string} type - The type of event.
   * @param {Function} listener - The listener to remove.
   */
  removeEventListener(type, listener) {
    const listeners = this._listeners;
    if (listeners === void 0) return;
    const listenerArray = listeners[type];
    if (listenerArray !== void 0) {
      const index = listenerArray.indexOf(listener);
      if (index !== -1) {
        listenerArray.splice(index, 1);
      }
    }
  }
  /**
   * Dispatches an event object.
   *
   * @param {Object} event - The event that gets fired.
   */
  dispatchEvent(event) {
    const listeners = this._listeners;
    if (listeners === void 0) return;
    const listenerArray = listeners[event.type];
    if (listenerArray !== void 0) {
      event.target = this;
      const array2 = listenerArray.slice(0);
      for (let i = 0, l = array2.length; i < l; i++) {
        array2[i].call(this, event);
      }
      event.target = null;
    }
  }
};
var _lut = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"];
var _seed = 1234567;
var DEG2RAD = Math.PI / 180;
var RAD2DEG = 180 / Math.PI;
function generateUUID() {
  const d0 = Math.random() * 4294967295 | 0;
  const d1 = Math.random() * 4294967295 | 0;
  const d2 = Math.random() * 4294967295 | 0;
  const d3 = Math.random() * 4294967295 | 0;
  const uuid = _lut[d0 & 255] + _lut[d0 >> 8 & 255] + _lut[d0 >> 16 & 255] + _lut[d0 >> 24 & 255] + "-" + _lut[d1 & 255] + _lut[d1 >> 8 & 255] + "-" + _lut[d1 >> 16 & 15 | 64] + _lut[d1 >> 24 & 255] + "-" + _lut[d2 & 63 | 128] + _lut[d2 >> 8 & 255] + "-" + _lut[d2 >> 16 & 255] + _lut[d2 >> 24 & 255] + _lut[d3 & 255] + _lut[d3 >> 8 & 255] + _lut[d3 >> 16 & 255] + _lut[d3 >> 24 & 255];
  return uuid.toLowerCase();
}
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
function euclideanModulo(n, m) {
  return (n % m + m) % m;
}
function mapLinear(x, a1, a2, b1, b2) {
  return b1 + (x - a1) * (b2 - b1) / (a2 - a1);
}
function inverseLerp(x, y, value) {
  if (x !== y) {
    return (value - x) / (y - x);
  } else {
    return 0;
  }
}
function lerp(x, y, t) {
  return (1 - t) * x + t * y;
}
function damp(x, y, lambda, dt) {
  return lerp(x, y, 1 - Math.exp(-lambda * dt));
}
function pingpong(x, length2 = 1) {
  return length2 - Math.abs(euclideanModulo(x, length2 * 2) - length2);
}
function smoothstep(x, min, max) {
  if (x <= min) return 0;
  if (x >= max) return 1;
  x = (x - min) / (max - min);
  return x * x * (3 - 2 * x);
}
function smootherstep(x, min, max) {
  if (x <= min) return 0;
  if (x >= max) return 1;
  x = (x - min) / (max - min);
  return x * x * x * (x * (x * 6 - 15) + 10);
}
function randInt(low, high) {
  return low + Math.floor(Math.random() * (high - low + 1));
}
function randFloat(low, high) {
  return low + Math.random() * (high - low);
}
function randFloatSpread(range) {
  return range * (0.5 - Math.random());
}
function seededRandom(s) {
  if (s !== void 0) _seed = s;
  let t = _seed += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  return ((t ^ t >>> 14) >>> 0) / 4294967296;
}
function degToRad(degrees2) {
  return degrees2 * DEG2RAD;
}
function radToDeg(radians2) {
  return radians2 * RAD2DEG;
}
function isPowerOfTwo(value) {
  return (value & value - 1) === 0 && value !== 0;
}
function ceilPowerOfTwo(value) {
  return Math.pow(2, Math.ceil(Math.log(value) / Math.LN2));
}
function floorPowerOfTwo(value) {
  return Math.pow(2, Math.floor(Math.log(value) / Math.LN2));
}
function setQuaternionFromProperEuler(q, a, b, c, order) {
  const cos2 = Math.cos;
  const sin2 = Math.sin;
  const c2 = cos2(b / 2);
  const s2 = sin2(b / 2);
  const c13 = cos2((a + c) / 2);
  const s13 = sin2((a + c) / 2);
  const c1_3 = cos2((a - c) / 2);
  const s1_3 = sin2((a - c) / 2);
  const c3_1 = cos2((c - a) / 2);
  const s3_1 = sin2((c - a) / 2);
  switch (order) {
    case "XYX":
      q.set(c2 * s13, s2 * c1_3, s2 * s1_3, c2 * c13);
      break;
    case "YZY":
      q.set(s2 * s1_3, c2 * s13, s2 * c1_3, c2 * c13);
      break;
    case "ZXZ":
      q.set(s2 * c1_3, s2 * s1_3, c2 * s13, c2 * c13);
      break;
    case "XZX":
      q.set(c2 * s13, s2 * s3_1, s2 * c3_1, c2 * c13);
      break;
    case "YXY":
      q.set(s2 * c3_1, c2 * s13, s2 * s3_1, c2 * c13);
      break;
    case "ZYZ":
      q.set(s2 * s3_1, s2 * c3_1, c2 * s13, c2 * c13);
      break;
    default:
      warn("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + order);
  }
}
function denormalize(value, array2) {
  switch (array2.constructor) {
    case Float32Array:
      return value;
    case Uint32Array:
      return value / 4294967295;
    case Uint16Array:
      return value / 65535;
    case Uint8Array:
      return value / 255;
    case Int32Array:
      return Math.max(value / 2147483647, -1);
    case Int16Array:
      return Math.max(value / 32767, -1);
    case Int8Array:
      return Math.max(value / 127, -1);
    default:
      throw new Error("THREE.MathUtils: Invalid component type.");
  }
}
function normalize(value, array2) {
  switch (array2.constructor) {
    case Float32Array:
      return value;
    case Uint32Array:
      return Math.round(value * 4294967295);
    case Uint16Array:
      return Math.round(value * 65535);
    case Uint8Array:
      return Math.round(value * 255);
    case Int32Array:
      return Math.round(value * 2147483647);
    case Int16Array:
      return Math.round(value * 32767);
    case Int8Array:
      return Math.round(value * 127);
    default:
      throw new Error("THREE.MathUtils: Invalid component type.");
  }
}
var MathUtils = {
  DEG2RAD,
  RAD2DEG,
  /**
   * Generate a [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier)
   * (universally unique identifier).
   *
   * @static
   * @method
   * @return {string} The UUID.
   */
  generateUUID,
  /**
   * Clamps the given value between min and max.
   *
   * @static
   * @method
   * @param {number} value - The value to clamp.
   * @param {number} min - The min value.
   * @param {number} max - The max value.
   * @return {number} The clamped value.
   */
  clamp,
  /**
   * Computes the Euclidean modulo of the given parameters that
   * is `( ( n % m ) + m ) % m`.
   *
   * @static
   * @method
   * @param {number} n - The first parameter.
   * @param {number} m - The second parameter.
   * @return {number} The Euclidean modulo.
   */
  euclideanModulo,
  /**
   * Performs a linear mapping from range `<a1, a2>` to range `<b1, b2>`
   * for the given value.
   *
   * @static
   * @method
   * @param {number} x - The value to be mapped.
   * @param {number} a1 - Minimum value for range A.
   * @param {number} a2 - Maximum value for range A.
   * @param {number} b1 - Minimum value for range B.
   * @param {number} b2 - Maximum value for range B.
   * @return {number} The mapped value.
   */
  mapLinear,
  /**
   * Returns the percentage in the closed interval `[0, 1]` of the given value
   * between the start and end point.
   *
   * @static
   * @method
   * @param {number} x - The start point
   * @param {number} y - The end point.
   * @param {number} value - A value between start and end.
   * @return {number} The interpolation factor.
   */
  inverseLerp,
  /**
   * Returns a value linearly interpolated from two known points based on the given interval -
   * `t = 0` will return `x` and `t = 1` will return `y`.
   *
   * @static
   * @method
   * @param {number} x - The start point
   * @param {number} y - The end point.
   * @param {number} t - The interpolation factor in the closed interval `[0, 1]`.
   * @return {number} The interpolated value.
   */
  lerp,
  /**
   * Smoothly interpolate a number from `x` to `y` in  a spring-like manner using a delta
   * time to maintain frame rate independent movement. For details, see
   * [Frame rate independent damping using lerp](http://www.rorydriscoll.com/2016/03/07/frame-rate-independent-damping-using-lerp/).
   *
   * @static
   * @method
   * @param {number} x - The current point.
   * @param {number} y - The target point.
   * @param {number} lambda - A higher lambda value will make the movement more sudden,
   * and a lower value will make the movement more gradual.
   * @param {number} dt - Delta time in seconds.
   * @return {number} The interpolated value.
   */
  damp,
  /**
   * Returns a value that alternates between `0` and the given `length` parameter.
   *
   * @static
   * @method
   * @param {number} x - The value to pingpong.
   * @param {number} [length=1] - The positive value the function will pingpong to.
   * @return {number} The alternated value.
   */
  pingpong,
  /**
   * Returns a value in the range `[0,1]` that represents the percentage that `x` has
   * moved between `min` and `max`, but smoothed or slowed down the closer `x` is to
   * the `min` and `max`.
   *
   * See [Smoothstep](http://en.wikipedia.org/wiki/Smoothstep) for more details.
   *
   * @static
   * @method
   * @param {number} x - The value to evaluate based on its position between min and max.
   * @param {number} min - The min value. Any x value below min will be `0`.
   * @param {number} max - The max value. Any x value above max will be `1`.
   * @return {number} The alternated value.
   */
  smoothstep,
  /**
   * A [variation on smoothstep](https://en.wikipedia.org/wiki/Smoothstep#Variations)
   * that has zero 1st and 2nd order derivatives at x=0 and x=1.
   *
   * @static
   * @method
   * @param {number} x - The value to evaluate based on its position between min and max.
   * @param {number} min - The min value. Any x value below min will be `0`.
   * @param {number} max - The max value. Any x value above max will be `1`.
   * @return {number} The alternated value.
   */
  smootherstep,
  /**
   * Returns a random integer from `<low, high>` interval.
   *
   * @static
   * @method
   * @param {number} low - The lower value boundary.
   * @param {number} high - The upper value boundary
   * @return {number} A random integer.
   */
  randInt,
  /**
   * Returns a random float from `<low, high>` interval.
   *
   * @static
   * @method
   * @param {number} low - The lower value boundary.
   * @param {number} high - The upper value boundary
   * @return {number} A random float.
   */
  randFloat,
  /**
   * Returns a random integer from `<-range/2, range/2>` interval.
   *
   * @static
   * @method
   * @param {number} range - Defines the value range.
   * @return {number} A random float.
   */
  randFloatSpread,
  /**
   * Returns a deterministic pseudo-random float in the interval `[0, 1]`.
   *
   * @static
   * @method
   * @param {number} [s] - The integer seed.
   * @return {number} A random float.
   */
  seededRandom,
  /**
   * Converts degrees to radians.
   *
   * @static
   * @method
   * @param {number} degrees - A value in degrees.
   * @return {number} The converted value in radians.
   */
  degToRad,
  /**
   * Converts radians to degrees.
   *
   * @static
   * @method
   * @param {number} radians - A value in radians.
   * @return {number} The converted value in degrees.
   */
  radToDeg,
  /**
   * Returns `true` if the given number is a power of two.
   *
   * @static
   * @method
   * @param {number} value - The value to check.
   * @return {boolean} Whether the given number is a power of two or not.
   */
  isPowerOfTwo,
  /**
   * Returns the smallest power of two that is greater than or equal to the given number.
   *
   * @static
   * @method
   * @param {number} value - The value to find a POT for.
   * @return {number} The smallest power of two that is greater than or equal to the given number.
   */
  ceilPowerOfTwo,
  /**
   * Returns the largest power of two that is less than or equal to the given number.
   *
   * @static
   * @method
   * @param {number} value - The value to find a POT for.
   * @return {number} The largest power of two that is less than or equal to the given number.
   */
  floorPowerOfTwo,
  /**
   * Sets the given quaternion from the [Intrinsic Proper Euler Angles](https://en.wikipedia.org/wiki/Euler_angles)
   * defined by the given angles and order.
   *
   * Rotations are applied to the axes in the order specified by order:
   * rotation by angle `a` is applied first, then by angle `b`, then by angle `c`.
   *
   * @static
   * @method
   * @param {Quaternion} q - The quaternion to set.
   * @param {number} a - The rotation applied to the first axis, in radians.
   * @param {number} b - The rotation applied to the second axis, in radians.
   * @param {number} c - The rotation applied to the third axis, in radians.
   * @param {('XYX'|'XZX'|'YXY'|'YZY'|'ZXZ'|'ZYZ')} order - A string specifying the axes order.
   */
  setQuaternionFromProperEuler,
  /**
   * Normalizes the given value according to the given typed array.
   *
   * @static
   * @method
   * @param {number} value - The float value in the range `[0,1]` to normalize.
   * @param {TypedArray} array - The typed array that defines the data type of the value.
   * @return {number} The normalize value.
   */
  normalize,
  /**
   * Denormalizes the given value according to the given typed array.
   *
   * @static
   * @method
   * @param {number} value - The value to denormalize.
   * @param {TypedArray} array - The typed array that defines the data type of the value.
   * @return {number} The denormalize (float) value in the range `[0,1]`.
   */
  denormalize
};
var _Vector2 = class _Vector2 {
  /**
   * Constructs a new 2D vector.
   *
   * @param {number} [x=0] - The x value of this vector.
   * @param {number} [y=0] - The y value of this vector.
   */
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  /**
   * Alias for {@link Vector2#x}.
   *
   * @type {number}
   */
  get width() {
    return this.x;
  }
  set width(value) {
    this.x = value;
  }
  /**
   * Alias for {@link Vector2#y}.
   *
   * @type {number}
   */
  get height() {
    return this.y;
  }
  set height(value) {
    this.y = value;
  }
  /**
   * Sets the vector components.
   *
   * @param {number} x - The value of the x component.
   * @param {number} y - The value of the y component.
   * @return {Vector2} A reference to this vector.
   */
  set(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }
  /**
   * Sets the vector components to the same value.
   *
   * @param {number} scalar - The value to set for all vector components.
   * @return {Vector2} A reference to this vector.
   */
  setScalar(scalar) {
    this.x = scalar;
    this.y = scalar;
    return this;
  }
  /**
   * Sets the vector's x component to the given value
   *
   * @param {number} x - The value to set.
   * @return {Vector2} A reference to this vector.
   */
  setX(x) {
    this.x = x;
    return this;
  }
  /**
   * Sets the vector's y component to the given value
   *
   * @param {number} y - The value to set.
   * @return {Vector2} A reference to this vector.
   */
  setY(y) {
    this.y = y;
    return this;
  }
  /**
   * Allows to set a vector component with an index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y.
   * @param {number} value - The value to set.
   * @return {Vector2} A reference to this vector.
   */
  setComponent(index, value) {
    switch (index) {
      case 0:
        this.x = value;
        break;
      case 1:
        this.y = value;
        break;
      default:
        throw new Error("THREE.Vector2: index is out of range: " + index);
    }
    return this;
  }
  /**
   * Returns the value of the vector component which matches the given index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y.
   * @return {number} A vector component value.
   */
  getComponent(index) {
    switch (index) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("THREE.Vector2: index is out of range: " + index);
    }
  }
  /**
   * Returns a new vector with copied values from this instance.
   *
   * @return {Vector2} A clone of this instance.
   */
  clone() {
    return new this.constructor(this.x, this.y);
  }
  /**
   * Copies the values of the given vector to this instance.
   *
   * @param {Vector2} v - The vector to copy.
   * @return {Vector2} A reference to this vector.
   */
  copy(v) {
    this.x = v.x;
    this.y = v.y;
    return this;
  }
  /**
   * Adds the given vector to this instance.
   *
   * @param {Vector2} v - The vector to add.
   * @return {Vector2} A reference to this vector.
   */
  add(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }
  /**
   * Adds the given scalar value to all components of this instance.
   *
   * @param {number} s - The scalar to add.
   * @return {Vector2} A reference to this vector.
   */
  addScalar(s) {
    this.x += s;
    this.y += s;
    return this;
  }
  /**
   * Adds the given vectors and stores the result in this instance.
   *
   * @param {Vector2} a - The first vector.
   * @param {Vector2} b - The second vector.
   * @return {Vector2} A reference to this vector.
   */
  addVectors(a, b) {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    return this;
  }
  /**
   * Adds the given vector scaled by the given factor to this instance.
   *
   * @param {Vector2} v - The vector.
   * @param {number} s - The factor that scales `v`.
   * @return {Vector2} A reference to this vector.
   */
  addScaledVector(v, s) {
    this.x += v.x * s;
    this.y += v.y * s;
    return this;
  }
  /**
   * Subtracts the given vector from this instance.
   *
   * @param {Vector2} v - The vector to subtract.
   * @return {Vector2} A reference to this vector.
   */
  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }
  /**
   * Subtracts the given scalar value from all components of this instance.
   *
   * @param {number} s - The scalar to subtract.
   * @return {Vector2} A reference to this vector.
   */
  subScalar(s) {
    this.x -= s;
    this.y -= s;
    return this;
  }
  /**
   * Subtracts the given vectors and stores the result in this instance.
   *
   * @param {Vector2} a - The first vector.
   * @param {Vector2} b - The second vector.
   * @return {Vector2} A reference to this vector.
   */
  subVectors(a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    return this;
  }
  /**
   * Multiplies the given vector with this instance.
   *
   * @param {Vector2} v - The vector to multiply.
   * @return {Vector2} A reference to this vector.
   */
  multiply(v) {
    this.x *= v.x;
    this.y *= v.y;
    return this;
  }
  /**
   * Multiplies the given scalar value with all components of this instance.
   *
   * @param {number} scalar - The scalar to multiply.
   * @return {Vector2} A reference to this vector.
   */
  multiplyScalar(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }
  /**
   * Divides this instance by the given vector.
   *
   * @param {Vector2} v - The vector to divide.
   * @return {Vector2} A reference to this vector.
   */
  divide(v) {
    this.x /= v.x;
    this.y /= v.y;
    return this;
  }
  /**
   * Divides this vector by the given scalar.
   *
   * @param {number} scalar - The scalar to divide.
   * @return {Vector2} A reference to this vector.
   */
  divideScalar(scalar) {
    return this.multiplyScalar(1 / scalar);
  }
  /**
   * Multiplies this vector (with an implicit 1 as the 3rd component) by
   * the given 3x3 matrix.
   *
   * @param {Matrix3} m - The matrix to apply.
   * @return {Vector2} A reference to this vector.
   */
  applyMatrix3(m) {
    const x = this.x, y = this.y;
    const e = m.elements;
    this.x = e[0] * x + e[3] * y + e[6];
    this.y = e[1] * x + e[4] * y + e[7];
    return this;
  }
  /**
   * If this vector's x or y value is greater than the given vector's x or y
   * value, replace that value with the corresponding min value.
   *
   * @param {Vector2} v - The vector.
   * @return {Vector2} A reference to this vector.
   */
  min(v) {
    this.x = Math.min(this.x, v.x);
    this.y = Math.min(this.y, v.y);
    return this;
  }
  /**
   * If this vector's x or y value is less than the given vector's x or y
   * value, replace that value with the corresponding max value.
   *
   * @param {Vector2} v - The vector.
   * @return {Vector2} A reference to this vector.
   */
  max(v) {
    this.x = Math.max(this.x, v.x);
    this.y = Math.max(this.y, v.y);
    return this;
  }
  /**
   * If this vector's x or y value is greater than the max vector's x or y
   * value, it is replaced by the corresponding value.
   * If this vector's x or y value is less than the min vector's x or y value,
   * it is replaced by the corresponding value.
   *
   * @param {Vector2} min - The minimum x and y values.
   * @param {Vector2} max - The maximum x and y values in the desired range.
   * @return {Vector2} A reference to this vector.
   */
  clamp(min, max) {
    this.x = clamp(this.x, min.x, max.x);
    this.y = clamp(this.y, min.y, max.y);
    return this;
  }
  /**
   * If this vector's x or y values are greater than the max value, they are
   * replaced by the max value.
   * If this vector's x or y values are less than the min value, they are
   * replaced by the min value.
   *
   * @param {number} minVal - The minimum value the components will be clamped to.
   * @param {number} maxVal - The maximum value the components will be clamped to.
   * @return {Vector2} A reference to this vector.
   */
  clampScalar(minVal, maxVal) {
    this.x = clamp(this.x, minVal, maxVal);
    this.y = clamp(this.y, minVal, maxVal);
    return this;
  }
  /**
   * If this vector's length is greater than the max value, it is replaced by
   * the max value.
   * If this vector's length is less than the min value, it is replaced by the
   * min value.
   *
   * @param {number} min - The minimum value the vector length will be clamped to.
   * @param {number} max - The maximum value the vector length will be clamped to.
   * @return {Vector2} A reference to this vector.
   */
  clampLength(min, max) {
    const length2 = this.length();
    return this.divideScalar(length2 || 1).multiplyScalar(clamp(length2, min, max));
  }
  /**
   * The components of this vector are rounded down to the nearest integer value.
   *
   * @return {Vector2} A reference to this vector.
   */
  floor() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this;
  }
  /**
   * The components of this vector are rounded up to the nearest integer value.
   *
   * @return {Vector2} A reference to this vector.
   */
  ceil() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    return this;
  }
  /**
   * The components of this vector are rounded to the nearest integer value
   *
   * @return {Vector2} A reference to this vector.
   */
  round() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
  }
  /**
   * The components of this vector are rounded towards zero (up if negative,
   * down if positive) to an integer value.
   *
   * @return {Vector2} A reference to this vector.
   */
  roundToZero() {
    this.x = Math.trunc(this.x);
    this.y = Math.trunc(this.y);
    return this;
  }
  /**
   * Inverts this vector - i.e. sets x = -x and y = -y.
   *
   * @return {Vector2} A reference to this vector.
   */
  negate() {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  }
  /**
   * Calculates the dot product of the given vector with this instance.
   *
   * @param {Vector2} v - The vector to compute the dot product with.
   * @return {number} The result of the dot product.
   */
  dot(v) {
    return this.x * v.x + this.y * v.y;
  }
  /**
   * Calculates the cross product of the given vector with this instance.
   *
   * @param {Vector2} v - The vector to compute the cross product with.
   * @return {number} The result of the cross product.
   */
  cross(v) {
    return this.x * v.y - this.y * v.x;
  }
  /**
   * Computes the square of the Euclidean length (straight-line length) from
   * (0, 0) to (x, y). If you are comparing the lengths of vectors, you should
   * compare the length squared instead as it is slightly more efficient to calculate.
   *
   * @return {number} The square length of this vector.
   */
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  /**
   * Computes the  Euclidean length (straight-line length) from (0, 0) to (x, y).
   *
   * @return {number} The length of this vector.
   */
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  /**
   * Computes the Manhattan length of this vector.
   *
   * @return {number} The length of this vector.
   */
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  /**
   * Converts this vector to a unit vector - that is, sets it equal to a vector
   * with the same direction as this one, but with a vector length of `1`.
   *
   * @return {Vector2} A reference to this vector.
   */
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  /**
   * Computes the angle in radians of this vector with respect to the positive x-axis.
   *
   * @return {number} The angle in radians.
   */
  angle() {
    const angle = Math.atan2(-this.y, -this.x) + Math.PI;
    return angle;
  }
  /**
   * Returns the angle between the given vector and this instance in radians.
   *
   * @param {Vector2} v - The vector to compute the angle with.
   * @return {number} The angle in radians.
   */
  angleTo(v) {
    const denominator = Math.sqrt(this.lengthSq() * v.lengthSq());
    if (denominator === 0) return Math.PI / 2;
    const theta = this.dot(v) / denominator;
    return Math.acos(clamp(theta, -1, 1));
  }
  /**
   * Computes the distance from the given vector to this instance.
   *
   * @param {Vector2} v - The vector to compute the distance to.
   * @return {number} The distance.
   */
  distanceTo(v) {
    return Math.sqrt(this.distanceToSquared(v));
  }
  /**
   * Computes the squared distance from the given vector to this instance.
   * If you are just comparing the distance with another distance, you should compare
   * the distance squared instead as it is slightly more efficient to calculate.
   *
   * @param {Vector2} v - The vector to compute the squared distance to.
   * @return {number} The squared distance.
   */
  distanceToSquared(v) {
    const dx = this.x - v.x, dy = this.y - v.y;
    return dx * dx + dy * dy;
  }
  /**
   * Computes the Manhattan distance from the given vector to this instance.
   *
   * @param {Vector2} v - The vector to compute the Manhattan distance to.
   * @return {number} The Manhattan distance.
   */
  manhattanDistanceTo(v) {
    return Math.abs(this.x - v.x) + Math.abs(this.y - v.y);
  }
  /**
   * Sets this vector to a vector with the same direction as this one, but
   * with the specified length.
   *
   * @param {number} length - The new length of this vector.
   * @return {Vector2} A reference to this vector.
   */
  setLength(length2) {
    return this.normalize().multiplyScalar(length2);
  }
  /**
   * Linearly interpolates between the given vector and this instance, where
   * alpha is the percent distance along the line - alpha = 0 will be this
   * vector, and alpha = 1 will be the given one.
   *
   * @param {Vector2} v - The vector to interpolate towards.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector2} A reference to this vector.
   */
  lerp(v, alpha) {
    this.x += (v.x - this.x) * alpha;
    this.y += (v.y - this.y) * alpha;
    return this;
  }
  /**
   * Linearly interpolates between the given vectors, where alpha is the percent
   * distance along the line - alpha = 0 will be first vector, and alpha = 1 will
   * be the second one. The result is stored in this instance.
   *
   * @param {Vector2} v1 - The first vector.
   * @param {Vector2} v2 - The second vector.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector2} A reference to this vector.
   */
  lerpVectors(v1, v2, alpha) {
    this.x = v1.x + (v2.x - v1.x) * alpha;
    this.y = v1.y + (v2.y - v1.y) * alpha;
    return this;
  }
  /**
   * Returns `true` if this vector is equal with the given one.
   *
   * @param {Vector2} v - The vector to test for equality.
   * @return {boolean} Whether this vector is equal with the given one.
   */
  equals(v) {
    return v.x === this.x && v.y === this.y;
  }
  /**
   * Sets this vector's x value to be `array[ offset ]` and y
   * value to be `array[ offset + 1 ]`.
   *
   * @param {Array<number>} array - An array holding the vector component values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Vector2} A reference to this vector.
   */
  fromArray(array2, offset = 0) {
    this.x = array2[offset];
    this.y = array2[offset + 1];
    return this;
  }
  /**
   * Writes the components of this vector to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the vector components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The vector components.
   */
  toArray(array2 = [], offset = 0) {
    array2[offset] = this.x;
    array2[offset + 1] = this.y;
    return array2;
  }
  /**
   * Sets the components of this vector from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding vector data.
   * @param {number} index - The index into the attribute.
   * @return {Vector2} A reference to this vector.
   */
  fromBufferAttribute(attribute2, index) {
    this.x = attribute2.getX(index);
    this.y = attribute2.getY(index);
    return this;
  }
  /**
   * Rotates this vector around the given center by the given angle.
   *
   * @param {Vector2} center - The point around which to rotate.
   * @param {number} angle - The angle to rotate, in radians.
   * @return {Vector2} A reference to this vector.
   */
  rotateAround(center, angle) {
    const c = Math.cos(angle), s = Math.sin(angle);
    const x = this.x - center.x;
    const y = this.y - center.y;
    this.x = x * c - y * s + center.x;
    this.y = x * s + y * c + center.y;
    return this;
  }
  /**
   * Sets each component of this vector to a pseudo-random value between `0` and
   * `1`, excluding `1`.
   *
   * @return {Vector2} A reference to this vector.
   */
  random() {
    this.x = Math.random();
    this.y = Math.random();
    return this;
  }
  *[Symbol.iterator]() {
    yield this.x;
    yield this.y;
  }
};
_Vector2.prototype.isVector2 = true;
var Vector2 = _Vector2;
var Quaternion = class {
  /**
   * Constructs a new quaternion.
   *
   * @param {number} [x=0] - The x value of this quaternion.
   * @param {number} [y=0] - The y value of this quaternion.
   * @param {number} [z=0] - The z value of this quaternion.
   * @param {number} [w=1] - The w value of this quaternion.
   */
  constructor(x = 0, y = 0, z = 0, w = 1) {
    this.isQuaternion = true;
    this._x = x;
    this._y = y;
    this._z = z;
    this._w = w;
  }
  /**
   * Interpolates between two quaternions via SLERP. This implementation assumes the
   * quaternion data are managed in flat arrays.
   *
   * @param {Array<number>} dst - The destination array.
   * @param {number} dstOffset - An offset into the destination array.
   * @param {Array<number>} src0 - The source array of the first quaternion.
   * @param {number} srcOffset0 - An offset into the first source array.
   * @param {Array<number>} src1 -  The source array of the second quaternion.
   * @param {number} srcOffset1 - An offset into the second source array.
   * @param {number} t - The interpolation factor. A value in the range `[0,1]` will interpolate. A value outside the range `[0,1]` will extrapolate.
   * @see {@link Quaternion#slerp}
   */
  static slerpFlat(dst, dstOffset, src0, srcOffset0, src1, srcOffset1, t) {
    let x0 = src0[srcOffset0 + 0], y0 = src0[srcOffset0 + 1], z0 = src0[srcOffset0 + 2], w0 = src0[srcOffset0 + 3];
    let x1 = src1[srcOffset1 + 0], y1 = src1[srcOffset1 + 1], z1 = src1[srcOffset1 + 2], w1 = src1[srcOffset1 + 3];
    if (w0 !== w1 || x0 !== x1 || y0 !== y1 || z0 !== z1) {
      let dot2 = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1;
      if (dot2 < 0) {
        x1 = -x1;
        y1 = -y1;
        z1 = -z1;
        w1 = -w1;
        dot2 = -dot2;
      }
      let s = 1 - t;
      if (dot2 < 0.9995) {
        const theta = Math.acos(dot2);
        const sin2 = Math.sin(theta);
        s = Math.sin(s * theta) / sin2;
        t = Math.sin(t * theta) / sin2;
        x0 = x0 * s + x1 * t;
        y0 = y0 * s + y1 * t;
        z0 = z0 * s + z1 * t;
        w0 = w0 * s + w1 * t;
      } else {
        x0 = x0 * s + x1 * t;
        y0 = y0 * s + y1 * t;
        z0 = z0 * s + z1 * t;
        w0 = w0 * s + w1 * t;
        const f = 1 / Math.sqrt(x0 * x0 + y0 * y0 + z0 * z0 + w0 * w0);
        x0 *= f;
        y0 *= f;
        z0 *= f;
        w0 *= f;
      }
    }
    dst[dstOffset] = x0;
    dst[dstOffset + 1] = y0;
    dst[dstOffset + 2] = z0;
    dst[dstOffset + 3] = w0;
  }
  /**
   * Multiplies two quaternions. This implementation assumes the quaternion data are managed
   * in flat arrays.
   *
   * @param {Array<number>} dst - The destination array.
   * @param {number} dstOffset - An offset into the destination array.
   * @param {Array<number>} src0 - The source array of the first quaternion.
   * @param {number} srcOffset0 - An offset into the first source array.
   * @param {Array<number>} src1 -  The source array of the second quaternion.
   * @param {number} srcOffset1 - An offset into the second source array.
   * @return {Array<number>} The destination array.
   * @see {@link Quaternion#multiplyQuaternions}.
   */
  static multiplyQuaternionsFlat(dst, dstOffset, src0, srcOffset0, src1, srcOffset1) {
    const x0 = src0[srcOffset0];
    const y0 = src0[srcOffset0 + 1];
    const z0 = src0[srcOffset0 + 2];
    const w0 = src0[srcOffset0 + 3];
    const x1 = src1[srcOffset1];
    const y1 = src1[srcOffset1 + 1];
    const z1 = src1[srcOffset1 + 2];
    const w1 = src1[srcOffset1 + 3];
    dst[dstOffset] = x0 * w1 + w0 * x1 + y0 * z1 - z0 * y1;
    dst[dstOffset + 1] = y0 * w1 + w0 * y1 + z0 * x1 - x0 * z1;
    dst[dstOffset + 2] = z0 * w1 + w0 * z1 + x0 * y1 - y0 * x1;
    dst[dstOffset + 3] = w0 * w1 - x0 * x1 - y0 * y1 - z0 * z1;
    return dst;
  }
  /**
   * The x value of this quaternion.
   *
   * @type {number}
   * @default 0
   */
  get x() {
    return this._x;
  }
  set x(value) {
    this._x = value;
    this._onChangeCallback();
  }
  /**
   * The y value of this quaternion.
   *
   * @type {number}
   * @default 0
   */
  get y() {
    return this._y;
  }
  set y(value) {
    this._y = value;
    this._onChangeCallback();
  }
  /**
   * The z value of this quaternion.
   *
   * @type {number}
   * @default 0
   */
  get z() {
    return this._z;
  }
  set z(value) {
    this._z = value;
    this._onChangeCallback();
  }
  /**
   * The w value of this quaternion.
   *
   * @type {number}
   * @default 1
   */
  get w() {
    return this._w;
  }
  set w(value) {
    this._w = value;
    this._onChangeCallback();
  }
  /**
   * Sets the quaternion components.
   *
   * @param {number} x - The x value of this quaternion.
   * @param {number} y - The y value of this quaternion.
   * @param {number} z - The z value of this quaternion.
   * @param {number} w - The w value of this quaternion.
   * @return {Quaternion} A reference to this quaternion.
   */
  set(x, y, z, w) {
    this._x = x;
    this._y = y;
    this._z = z;
    this._w = w;
    this._onChangeCallback();
    return this;
  }
  /**
   * Returns a new quaternion with copied values from this instance.
   *
   * @return {Quaternion} A clone of this instance.
   */
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  /**
   * Copies the values of the given quaternion to this instance.
   *
   * @param {Quaternion} quaternion - The quaternion to copy.
   * @return {Quaternion} A reference to this quaternion.
   */
  copy(quaternion) {
    this._x = quaternion.x;
    this._y = quaternion.y;
    this._z = quaternion.z;
    this._w = quaternion.w;
    this._onChangeCallback();
    return this;
  }
  /**
   * Sets this quaternion from the rotation specified by the given
   * Euler angles.
   *
   * @param {Euler} euler - The Euler angles.
   * @param {boolean} [update=true] - Whether the internal `onChange` callback should be executed or not.
   * @return {Quaternion} A reference to this quaternion.
   */
  setFromEuler(euler, update = true) {
    const x = euler._x, y = euler._y, z = euler._z, order = euler._order;
    const cos2 = Math.cos;
    const sin2 = Math.sin;
    const c1 = cos2(x / 2);
    const c2 = cos2(y / 2);
    const c3 = cos2(z / 2);
    const s1 = sin2(x / 2);
    const s2 = sin2(y / 2);
    const s3 = sin2(z / 2);
    switch (order) {
      case "XYZ":
        this._x = s1 * c2 * c3 + c1 * s2 * s3;
        this._y = c1 * s2 * c3 - s1 * c2 * s3;
        this._z = c1 * c2 * s3 + s1 * s2 * c3;
        this._w = c1 * c2 * c3 - s1 * s2 * s3;
        break;
      case "YXZ":
        this._x = s1 * c2 * c3 + c1 * s2 * s3;
        this._y = c1 * s2 * c3 - s1 * c2 * s3;
        this._z = c1 * c2 * s3 - s1 * s2 * c3;
        this._w = c1 * c2 * c3 + s1 * s2 * s3;
        break;
      case "ZXY":
        this._x = s1 * c2 * c3 - c1 * s2 * s3;
        this._y = c1 * s2 * c3 + s1 * c2 * s3;
        this._z = c1 * c2 * s3 + s1 * s2 * c3;
        this._w = c1 * c2 * c3 - s1 * s2 * s3;
        break;
      case "ZYX":
        this._x = s1 * c2 * c3 - c1 * s2 * s3;
        this._y = c1 * s2 * c3 + s1 * c2 * s3;
        this._z = c1 * c2 * s3 - s1 * s2 * c3;
        this._w = c1 * c2 * c3 + s1 * s2 * s3;
        break;
      case "YZX":
        this._x = s1 * c2 * c3 + c1 * s2 * s3;
        this._y = c1 * s2 * c3 + s1 * c2 * s3;
        this._z = c1 * c2 * s3 - s1 * s2 * c3;
        this._w = c1 * c2 * c3 - s1 * s2 * s3;
        break;
      case "XZY":
        this._x = s1 * c2 * c3 - c1 * s2 * s3;
        this._y = c1 * s2 * c3 - s1 * c2 * s3;
        this._z = c1 * c2 * s3 + s1 * s2 * c3;
        this._w = c1 * c2 * c3 + s1 * s2 * s3;
        break;
      default:
        warn("Quaternion: .setFromEuler() encountered an unknown order: " + order);
    }
    if (update === true) this._onChangeCallback();
    return this;
  }
  /**
   * Sets this quaternion from the given axis and angle.
   *
   * @param {Vector3} axis - The normalized axis.
   * @param {number} angle - The angle in radians.
   * @return {Quaternion} A reference to this quaternion.
   */
  setFromAxisAngle(axis, angle) {
    const halfAngle = angle / 2, s = Math.sin(halfAngle);
    this._x = axis.x * s;
    this._y = axis.y * s;
    this._z = axis.z * s;
    this._w = Math.cos(halfAngle);
    this._onChangeCallback();
    return this;
  }
  /**
   * Sets this quaternion from the given rotation matrix.
   *
   * @param {Matrix4} m - A 4x4 matrix of which the upper 3x3 of matrix is a pure rotation matrix (i.e. unscaled).
   * @return {Quaternion} A reference to this quaternion.
   */
  setFromRotationMatrix(m) {
    const te = m.elements, m11 = te[0], m12 = te[4], m13 = te[8], m21 = te[1], m22 = te[5], m23 = te[9], m31 = te[2], m32 = te[6], m33 = te[10], trace = m11 + m22 + m33;
    if (trace > 0) {
      const s = 0.5 / Math.sqrt(trace + 1);
      this._w = 0.25 / s;
      this._x = (m32 - m23) * s;
      this._y = (m13 - m31) * s;
      this._z = (m21 - m12) * s;
    } else if (m11 > m22 && m11 > m33) {
      const s = 2 * Math.sqrt(1 + m11 - m22 - m33);
      this._w = (m32 - m23) / s;
      this._x = 0.25 * s;
      this._y = (m12 + m21) / s;
      this._z = (m13 + m31) / s;
    } else if (m22 > m33) {
      const s = 2 * Math.sqrt(1 + m22 - m11 - m33);
      this._w = (m13 - m31) / s;
      this._x = (m12 + m21) / s;
      this._y = 0.25 * s;
      this._z = (m23 + m32) / s;
    } else {
      const s = 2 * Math.sqrt(1 + m33 - m11 - m22);
      this._w = (m21 - m12) / s;
      this._x = (m13 + m31) / s;
      this._y = (m23 + m32) / s;
      this._z = 0.25 * s;
    }
    this._onChangeCallback();
    return this;
  }
  /**
   * Sets this quaternion to the rotation required to rotate the direction vector
   * `vFrom` to the direction vector `vTo`.
   *
   * @param {Vector3} vFrom - The first (normalized) direction vector.
   * @param {Vector3} vTo - The second (normalized) direction vector.
   * @return {Quaternion} A reference to this quaternion.
   */
  setFromUnitVectors(vFrom, vTo) {
    let r = vFrom.dot(vTo) + 1;
    if (r < 1e-8) {
      r = 0;
      if (Math.abs(vFrom.x) > Math.abs(vFrom.z)) {
        this._x = -vFrom.y;
        this._y = vFrom.x;
        this._z = 0;
        this._w = r;
      } else {
        this._x = 0;
        this._y = -vFrom.z;
        this._z = vFrom.y;
        this._w = r;
      }
    } else {
      this._x = vFrom.y * vTo.z - vFrom.z * vTo.y;
      this._y = vFrom.z * vTo.x - vFrom.x * vTo.z;
      this._z = vFrom.x * vTo.y - vFrom.y * vTo.x;
      this._w = r;
    }
    return this.normalize();
  }
  /**
   * Returns the angle between this quaternion and the given one in radians.
   *
   * @param {Quaternion} q - The quaternion to compute the angle with.
   * @return {number} The angle in radians.
   */
  angleTo(q) {
    return 2 * Math.acos(Math.abs(clamp(this.dot(q), -1, 1)));
  }
  /**
   * Rotates this quaternion by a given angular step to the given quaternion.
   * The method ensures that the final quaternion will not overshoot `q`.
   *
   * @param {Quaternion} q - The target quaternion.
   * @param {number} step - The angular step in radians.
   * @return {Quaternion} A reference to this quaternion.
   */
  rotateTowards(q, step2) {
    const angle = this.angleTo(q);
    if (angle === 0) return this;
    const t = Math.min(1, step2 / angle);
    this.slerp(q, t);
    return this;
  }
  /**
   * Sets this quaternion to the identity quaternion; that is, to the
   * quaternion that represents "no rotation".
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  identity() {
    return this.set(0, 0, 0, 1);
  }
  /**
   * Inverts this quaternion via {@link Quaternion#conjugate}. The
   * quaternion is assumed to have unit length.
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  invert() {
    return this.conjugate();
  }
  /**
   * Returns the rotational conjugate of this quaternion. The conjugate of a
   * quaternion represents the same rotation in the opposite direction about
   * the rotational axis.
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  conjugate() {
    this._x *= -1;
    this._y *= -1;
    this._z *= -1;
    this._onChangeCallback();
    return this;
  }
  /**
   * Calculates the dot product of this quaternion and the given one.
   *
   * @param {Quaternion} v - The quaternion to compute the dot product with.
   * @return {number} The result of the dot product.
   */
  dot(v) {
    return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;
  }
  /**
   * Computes the squared Euclidean length (straight-line length) of this quaternion,
   * considered as a 4 dimensional vector. This can be useful if you are comparing the
   * lengths of two quaternions, as this is a slightly more efficient calculation than
   * {@link Quaternion#length}.
   *
   * @return {number} The squared Euclidean length.
   */
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  /**
   * Computes the Euclidean length (straight-line length) of this quaternion,
   * considered as a 4 dimensional vector.
   *
   * @return {number} The Euclidean length.
   */
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  /**
   * Normalizes this quaternion - that is, calculated the quaternion that performs
   * the same rotation as this one, but has a length equal to `1`.
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  normalize() {
    let l = this.length();
    if (l === 0) {
      this._x = 0;
      this._y = 0;
      this._z = 0;
      this._w = 1;
    } else {
      l = 1 / l;
      this._x = this._x * l;
      this._y = this._y * l;
      this._z = this._z * l;
      this._w = this._w * l;
    }
    this._onChangeCallback();
    return this;
  }
  /**
   * Multiplies this quaternion by the given one.
   *
   * @param {Quaternion} q - The quaternion.
   * @return {Quaternion} A reference to this quaternion.
   */
  multiply(q) {
    return this.multiplyQuaternions(this, q);
  }
  /**
   * Pre-multiplies this quaternion by the given one.
   *
   * @param {Quaternion} q - The quaternion.
   * @return {Quaternion} A reference to this quaternion.
   */
  premultiply(q) {
    return this.multiplyQuaternions(q, this);
  }
  /**
   * Multiplies the given quaternions and stores the result in this instance.
   *
   * @param {Quaternion} a - The first quaternion.
   * @param {Quaternion} b - The second quaternion.
   * @return {Quaternion} A reference to this quaternion.
   */
  multiplyQuaternions(a, b) {
    const qax = a._x, qay = a._y, qaz = a._z, qaw = a._w;
    const qbx = b._x, qby = b._y, qbz = b._z, qbw = b._w;
    this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
    this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
    this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
    this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;
    this._onChangeCallback();
    return this;
  }
  /**
   * Performs a spherical linear interpolation between this quaternion and the target quaternion.
   *
   * @param {Quaternion} qb - The target quaternion.
   * @param {number} t - The interpolation factor. A value in the range `[0,1]` will interpolate. A value outside the range `[0,1]` will extrapolate.
   * @return {Quaternion} A reference to this quaternion.
   */
  slerp(qb, t) {
    let x = qb._x, y = qb._y, z = qb._z, w = qb._w;
    let dot2 = this.dot(qb);
    if (dot2 < 0) {
      x = -x;
      y = -y;
      z = -z;
      w = -w;
      dot2 = -dot2;
    }
    let s = 1 - t;
    if (dot2 < 0.9995) {
      const theta = Math.acos(dot2);
      const sin2 = Math.sin(theta);
      s = Math.sin(s * theta) / sin2;
      t = Math.sin(t * theta) / sin2;
      this._x = this._x * s + x * t;
      this._y = this._y * s + y * t;
      this._z = this._z * s + z * t;
      this._w = this._w * s + w * t;
      this._onChangeCallback();
    } else {
      this._x = this._x * s + x * t;
      this._y = this._y * s + y * t;
      this._z = this._z * s + z * t;
      this._w = this._w * s + w * t;
      this.normalize();
    }
    return this;
  }
  /**
   * Performs a spherical linear interpolation between the given quaternions
   * and stores the result in this quaternion.
   *
   * @param {Quaternion} qa - The source quaternion.
   * @param {Quaternion} qb - The target quaternion.
   * @param {number} t - The interpolation factor in the closed interval `[0, 1]`.
   * @return {Quaternion} A reference to this quaternion.
   */
  slerpQuaternions(qa, qb, t) {
    return this.copy(qa).slerp(qb, t);
  }
  /**
   * Sets this quaternion to a uniformly random, normalized quaternion.
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  random() {
    const theta1 = 2 * Math.PI * Math.random();
    const theta2 = 2 * Math.PI * Math.random();
    const x0 = Math.random();
    const r1 = Math.sqrt(1 - x0);
    const r2 = Math.sqrt(x0);
    return this.set(
      r1 * Math.sin(theta1),
      r1 * Math.cos(theta1),
      r2 * Math.sin(theta2),
      r2 * Math.cos(theta2)
    );
  }
  /**
   * Returns `true` if this quaternion is equal with the given one.
   *
   * @param {Quaternion} quaternion - The quaternion to test for equality.
   * @return {boolean} Whether this quaternion is equal with the given one.
   */
  equals(quaternion) {
    return quaternion._x === this._x && quaternion._y === this._y && quaternion._z === this._z && quaternion._w === this._w;
  }
  /**
   * Sets this quaternion's components from the given array.
   *
   * @param {Array<number>} array - An array holding the quaternion component values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Quaternion} A reference to this quaternion.
   */
  fromArray(array2, offset = 0) {
    this._x = array2[offset];
    this._y = array2[offset + 1];
    this._z = array2[offset + 2];
    this._w = array2[offset + 3];
    this._onChangeCallback();
    return this;
  }
  /**
   * Writes the components of this quaternion to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the quaternion components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The quaternion components.
   */
  toArray(array2 = [], offset = 0) {
    array2[offset] = this._x;
    array2[offset + 1] = this._y;
    array2[offset + 2] = this._z;
    array2[offset + 3] = this._w;
    return array2;
  }
  /**
   * Sets the components of this quaternion from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding quaternion data.
   * @param {number} index - The index into the attribute.
   * @return {Quaternion} A reference to this quaternion.
   */
  fromBufferAttribute(attribute2, index) {
    this._x = attribute2.getX(index);
    this._y = attribute2.getY(index);
    this._z = attribute2.getZ(index);
    this._w = attribute2.getW(index);
    this._onChangeCallback();
    return this;
  }
  /**
   * This methods defines the serialization result of this class. Returns the
   * numerical elements of this quaternion in an array of format `[x, y, z, w]`.
   *
   * @return {Array<number>} The serialized quaternion.
   */
  toJSON() {
    return this.toArray();
  }
  _onChange(callback) {
    this._onChangeCallback = callback;
    return this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x;
    yield this._y;
    yield this._z;
    yield this._w;
  }
};
var _Vector3 = class _Vector3 {
  /**
   * Constructs a new 3D vector.
   *
   * @param {number} [x=0] - The x value of this vector.
   * @param {number} [y=0] - The y value of this vector.
   * @param {number} [z=0] - The z value of this vector.
   */
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  /**
   * Sets the vector components.
   *
   * @param {number} x - The value of the x component.
   * @param {number} y - The value of the y component.
   * @param {number} z - The value of the z component.
   * @return {Vector3} A reference to this vector.
   */
  set(x, y, z) {
    if (z === void 0) z = this.z;
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }
  /**
   * Sets the vector components to the same value.
   *
   * @param {number} scalar - The value to set for all vector components.
   * @return {Vector3} A reference to this vector.
   */
  setScalar(scalar) {
    this.x = scalar;
    this.y = scalar;
    this.z = scalar;
    return this;
  }
  /**
   * Sets the vector's x component to the given value.
   *
   * @param {number} x - The value to set.
   * @return {Vector3} A reference to this vector.
   */
  setX(x) {
    this.x = x;
    return this;
  }
  /**
   * Sets the vector's y component to the given value.
   *
   * @param {number} y - The value to set.
   * @return {Vector3} A reference to this vector.
   */
  setY(y) {
    this.y = y;
    return this;
  }
  /**
   * Sets the vector's z component to the given value.
   *
   * @param {number} z - The value to set.
   * @return {Vector3} A reference to this vector.
   */
  setZ(z) {
    this.z = z;
    return this;
  }
  /**
   * Allows to set a vector component with an index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y, `2` equals to z.
   * @param {number} value - The value to set.
   * @return {Vector3} A reference to this vector.
   */
  setComponent(index, value) {
    switch (index) {
      case 0:
        this.x = value;
        break;
      case 1:
        this.y = value;
        break;
      case 2:
        this.z = value;
        break;
      default:
        throw new Error("THREE.Vector3: index is out of range: " + index);
    }
    return this;
  }
  /**
   * Returns the value of the vector component which matches the given index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y, `2` equals to z.
   * @return {number} A vector component value.
   */
  getComponent(index) {
    switch (index) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("THREE.Vector3: index is out of range: " + index);
    }
  }
  /**
   * Returns a new vector with copied values from this instance.
   *
   * @return {Vector3} A clone of this instance.
   */
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  /**
   * Copies the values of the given vector to this instance.
   *
   * @param {Vector3} v - The vector to copy.
   * @return {Vector3} A reference to this vector.
   */
  copy(v) {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    return this;
  }
  /**
   * Adds the given vector to this instance.
   *
   * @param {Vector3} v - The vector to add.
   * @return {Vector3} A reference to this vector.
   */
  add(v) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
  }
  /**
   * Adds the given scalar value to all components of this instance.
   *
   * @param {number} s - The scalar to add.
   * @return {Vector3} A reference to this vector.
   */
  addScalar(s) {
    this.x += s;
    this.y += s;
    this.z += s;
    return this;
  }
  /**
   * Adds the given vectors and stores the result in this instance.
   *
   * @param {Vector3} a - The first vector.
   * @param {Vector3} b - The second vector.
   * @return {Vector3} A reference to this vector.
   */
  addVectors(a, b) {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    this.z = a.z + b.z;
    return this;
  }
  /**
   * Adds the given vector scaled by the given factor to this instance.
   *
   * @param {Vector3|Vector4} v - The vector.
   * @param {number} s - The factor that scales `v`.
   * @return {Vector3} A reference to this vector.
   */
  addScaledVector(v, s) {
    this.x += v.x * s;
    this.y += v.y * s;
    this.z += v.z * s;
    return this;
  }
  /**
   * Subtracts the given vector from this instance.
   *
   * @param {Vector3} v - The vector to subtract.
   * @return {Vector3} A reference to this vector.
   */
  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    return this;
  }
  /**
   * Subtracts the given scalar value from all components of this instance.
   *
   * @param {number} s - The scalar to subtract.
   * @return {Vector3} A reference to this vector.
   */
  subScalar(s) {
    this.x -= s;
    this.y -= s;
    this.z -= s;
    return this;
  }
  /**
   * Subtracts the given vectors and stores the result in this instance.
   *
   * @param {Vector3} a - The first vector.
   * @param {Vector3} b - The second vector.
   * @return {Vector3} A reference to this vector.
   */
  subVectors(a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    this.z = a.z - b.z;
    return this;
  }
  /**
   * Multiplies the given vector with this instance.
   *
   * @param {Vector3} v - The vector to multiply.
   * @return {Vector3} A reference to this vector.
   */
  multiply(v) {
    this.x *= v.x;
    this.y *= v.y;
    this.z *= v.z;
    return this;
  }
  /**
   * Multiplies the given scalar value with all components of this instance.
   *
   * @param {number} scalar - The scalar to multiply.
   * @return {Vector3} A reference to this vector.
   */
  multiplyScalar(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    return this;
  }
  /**
   * Multiplies the given vectors and stores the result in this instance.
   *
   * @param {Vector3} a - The first vector.
   * @param {Vector3} b - The second vector.
   * @return {Vector3} A reference to this vector.
   */
  multiplyVectors(a, b) {
    this.x = a.x * b.x;
    this.y = a.y * b.y;
    this.z = a.z * b.z;
    return this;
  }
  /**
   * Applies the given Euler rotation to this vector.
   *
   * @param {Euler} euler - The Euler angles.
   * @return {Vector3} A reference to this vector.
   */
  applyEuler(euler) {
    return this.applyQuaternion(_quaternion$5.setFromEuler(euler));
  }
  /**
   * Applies a rotation specified by an axis and an angle to this vector.
   *
   * @param {Vector3} axis - A normalized vector representing the rotation axis.
   * @param {number} angle - The angle in radians.
   * @return {Vector3} A reference to this vector.
   */
  applyAxisAngle(axis, angle) {
    return this.applyQuaternion(_quaternion$5.setFromAxisAngle(axis, angle));
  }
  /**
   * Multiplies this vector with the given 3x3 matrix.
   *
   * @param {Matrix3} m - The 3x3 matrix.
   * @return {Vector3} A reference to this vector.
   */
  applyMatrix3(m) {
    const x = this.x, y = this.y, z = this.z;
    const e = m.elements;
    this.x = e[0] * x + e[3] * y + e[6] * z;
    this.y = e[1] * x + e[4] * y + e[7] * z;
    this.z = e[2] * x + e[5] * y + e[8] * z;
    return this;
  }
  /**
   * Multiplies this vector by the given normal matrix and normalizes
   * the result.
   *
   * @param {Matrix3} m - The normal matrix.
   * @return {Vector3} A reference to this vector.
   */
  applyNormalMatrix(m) {
    return this.applyMatrix3(m).normalize();
  }
  /**
   * Multiplies this vector (with an implicit 1 in the 4th dimension) by m, and
   * divides by perspective.
   *
   * @param {Matrix4} m - The matrix to apply.
   * @return {Vector3} A reference to this vector.
   */
  applyMatrix4(m) {
    const x = this.x, y = this.y, z = this.z;
    const e = m.elements;
    const w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);
    this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
    this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
    this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;
    return this;
  }
  /**
   * Applies the given Quaternion to this vector.
   *
   * @param {Quaternion} q - The Quaternion.
   * @return {Vector3} A reference to this vector.
   */
  applyQuaternion(q) {
    const vx = this.x, vy = this.y, vz = this.z;
    const qx = q.x, qy = q.y, qz = q.z, qw = q.w;
    const tx = 2 * (qy * vz - qz * vy);
    const ty = 2 * (qz * vx - qx * vz);
    const tz = 2 * (qx * vy - qy * vx);
    this.x = vx + qw * tx + qy * tz - qz * ty;
    this.y = vy + qw * ty + qz * tx - qx * tz;
    this.z = vz + qw * tz + qx * ty - qy * tx;
    return this;
  }
  /**
   * Projects this vector from world space into the camera's normalized
   * device coordinate (NDC) space.
   *
   * @param {Camera} camera - The camera.
   * @return {Vector3} A reference to this vector.
   */
  project(camera) {
    return this.applyMatrix4(camera.matrixWorldInverse).applyMatrix4(camera.projectionMatrix);
  }
  /**
   * Unprojects this vector from the camera's normalized device coordinate (NDC)
   * space into world space.
   *
   * @param {Camera} camera - The camera.
   * @return {Vector3} A reference to this vector.
   */
  unproject(camera) {
    return this.applyMatrix4(camera.projectionMatrixInverse).applyMatrix4(camera.matrixWorld);
  }
  /**
   * Transforms the direction of this vector by a matrix (the upper left 3 x 3
   * subset of the given 4x4 matrix and then normalizes the result.
   *
   * @param {Matrix4} m - The matrix.
   * @return {Vector3} A reference to this vector.
   */
  transformDirection(m) {
    const x = this.x, y = this.y, z = this.z;
    const e = m.elements;
    this.x = e[0] * x + e[4] * y + e[8] * z;
    this.y = e[1] * x + e[5] * y + e[9] * z;
    this.z = e[2] * x + e[6] * y + e[10] * z;
    return this.normalize();
  }
  /**
   * Divides this instance by the given vector.
   *
   * @param {Vector3} v - The vector to divide.
   * @return {Vector3} A reference to this vector.
   */
  divide(v) {
    this.x /= v.x;
    this.y /= v.y;
    this.z /= v.z;
    return this;
  }
  /**
   * Divides this vector by the given scalar.
   *
   * @param {number} scalar - The scalar to divide.
   * @return {Vector3} A reference to this vector.
   */
  divideScalar(scalar) {
    return this.multiplyScalar(1 / scalar);
  }
  /**
   * If this vector's x, y or z value is greater than the given vector's x, y or z
   * value, replace that value with the corresponding min value.
   *
   * @param {Vector3} v - The vector.
   * @return {Vector3} A reference to this vector.
   */
  min(v) {
    this.x = Math.min(this.x, v.x);
    this.y = Math.min(this.y, v.y);
    this.z = Math.min(this.z, v.z);
    return this;
  }
  /**
   * If this vector's x, y or z value is less than the given vector's x, y or z
   * value, replace that value with the corresponding max value.
   *
   * @param {Vector3} v - The vector.
   * @return {Vector3} A reference to this vector.
   */
  max(v) {
    this.x = Math.max(this.x, v.x);
    this.y = Math.max(this.y, v.y);
    this.z = Math.max(this.z, v.z);
    return this;
  }
  /**
   * If this vector's x, y or z value is greater than the max vector's x, y or z
   * value, it is replaced by the corresponding value.
   * If this vector's x, y or z value is less than the min vector's x, y or z value,
   * it is replaced by the corresponding value.
   *
   * @param {Vector3} min - The minimum x, y and z values.
   * @param {Vector3} max - The maximum x, y and z values in the desired range.
   * @return {Vector3} A reference to this vector.
   */
  clamp(min, max) {
    this.x = clamp(this.x, min.x, max.x);
    this.y = clamp(this.y, min.y, max.y);
    this.z = clamp(this.z, min.z, max.z);
    return this;
  }
  /**
   * If this vector's x, y or z values are greater than the max value, they are
   * replaced by the max value.
   * If this vector's x, y or z values are less than the min value, they are
   * replaced by the min value.
   *
   * @param {number} minVal - The minimum value the components will be clamped to.
   * @param {number} maxVal - The maximum value the components will be clamped to.
   * @return {Vector3} A reference to this vector.
   */
  clampScalar(minVal, maxVal) {
    this.x = clamp(this.x, minVal, maxVal);
    this.y = clamp(this.y, minVal, maxVal);
    this.z = clamp(this.z, minVal, maxVal);
    return this;
  }
  /**
   * If this vector's length is greater than the max value, it is replaced by
   * the max value.
   * If this vector's length is less than the min value, it is replaced by the
   * min value.
   *
   * @param {number} min - The minimum value the vector length will be clamped to.
   * @param {number} max - The maximum value the vector length will be clamped to.
   * @return {Vector3} A reference to this vector.
   */
  clampLength(min, max) {
    const length2 = this.length();
    return this.divideScalar(length2 || 1).multiplyScalar(clamp(length2, min, max));
  }
  /**
   * The components of this vector are rounded down to the nearest integer value.
   *
   * @return {Vector3} A reference to this vector.
   */
  floor() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    this.z = Math.floor(this.z);
    return this;
  }
  /**
   * The components of this vector are rounded up to the nearest integer value.
   *
   * @return {Vector3} A reference to this vector.
   */
  ceil() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    this.z = Math.ceil(this.z);
    return this;
  }
  /**
   * The components of this vector are rounded to the nearest integer value
   *
   * @return {Vector3} A reference to this vector.
   */
  round() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    this.z = Math.round(this.z);
    return this;
  }
  /**
   * The components of this vector are rounded towards zero (up if negative,
   * down if positive) to an integer value.
   *
   * @return {Vector3} A reference to this vector.
   */
  roundToZero() {
    this.x = Math.trunc(this.x);
    this.y = Math.trunc(this.y);
    this.z = Math.trunc(this.z);
    return this;
  }
  /**
   * Inverts this vector - i.e. sets x = -x, y = -y and z = -z.
   *
   * @return {Vector3} A reference to this vector.
   */
  negate() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    return this;
  }
  /**
   * Calculates the dot product of the given vector with this instance.
   *
   * @param {Vector3} v - The vector to compute the dot product with.
   * @return {number} The result of the dot product.
   */
  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }
  /**
   * Computes the square of the Euclidean length (straight-line length) from
   * (0, 0, 0) to (x, y, z). If you are comparing the lengths of vectors, you should
   * compare the length squared instead as it is slightly more efficient to calculate.
   *
   * @return {number} The square length of this vector.
   */
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  /**
   * Computes the  Euclidean length (straight-line length) from (0, 0, 0) to (x, y, z).
   *
   * @return {number} The length of this vector.
   */
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  /**
   * Computes the Manhattan length of this vector.
   *
   * @return {number} The length of this vector.
   */
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  /**
   * Converts this vector to a unit vector - that is, sets it equal to a vector
   * with the same direction as this one, but with a vector length of `1`.
   *
   * @return {Vector3} A reference to this vector.
   */
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  /**
   * Sets this vector to a vector with the same direction as this one, but
   * with the specified length.
   *
   * @param {number} length - The new length of this vector.
   * @return {Vector3} A reference to this vector.
   */
  setLength(length2) {
    return this.normalize().multiplyScalar(length2);
  }
  /**
   * Linearly interpolates between the given vector and this instance, where
   * alpha is the percent distance along the line - alpha = 0 will be this
   * vector, and alpha = 1 will be the given one.
   *
   * @param {Vector3} v - The vector to interpolate towards.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector3} A reference to this vector.
   */
  lerp(v, alpha) {
    this.x += (v.x - this.x) * alpha;
    this.y += (v.y - this.y) * alpha;
    this.z += (v.z - this.z) * alpha;
    return this;
  }
  /**
   * Linearly interpolates between the given vectors, where alpha is the percent
   * distance along the line - alpha = 0 will be first vector, and alpha = 1 will
   * be the second one. The result is stored in this instance.
   *
   * @param {Vector3} v1 - The first vector.
   * @param {Vector3} v2 - The second vector.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector3} A reference to this vector.
   */
  lerpVectors(v1, v2, alpha) {
    this.x = v1.x + (v2.x - v1.x) * alpha;
    this.y = v1.y + (v2.y - v1.y) * alpha;
    this.z = v1.z + (v2.z - v1.z) * alpha;
    return this;
  }
  /**
   * Calculates the cross product of the given vector with this instance.
   *
   * @param {Vector3} v - The vector to compute the cross product with.
   * @return {Vector3} The result of the cross product.
   */
  cross(v) {
    return this.crossVectors(this, v);
  }
  /**
   * Calculates the cross product of the given vectors and stores the result
   * in this instance.
   *
   * @param {Vector3} a - The first vector.
   * @param {Vector3} b - The second vector.
   * @return {Vector3} A reference to this vector.
   */
  crossVectors(a, b) {
    const ax = a.x, ay = a.y, az = a.z;
    const bx = b.x, by = b.y, bz = b.z;
    this.x = ay * bz - az * by;
    this.y = az * bx - ax * bz;
    this.z = ax * by - ay * bx;
    return this;
  }
  /**
   * Projects this vector onto the given one.
   *
   * @param {Vector3} v - The vector to project to.
   * @return {Vector3} A reference to this vector.
   */
  projectOnVector(v) {
    const denominator = v.lengthSq();
    if (denominator === 0) return this.set(0, 0, 0);
    const scalar = v.dot(this) / denominator;
    return this.copy(v).multiplyScalar(scalar);
  }
  /**
   * Projects this vector onto a plane by subtracting this
   * vector projected onto the plane's normal from this vector.
   *
   * @param {Vector3} planeNormal - The plane normal.
   * @return {Vector3} A reference to this vector.
   */
  projectOnPlane(planeNormal) {
    _vector$c.copy(this).projectOnVector(planeNormal);
    return this.sub(_vector$c);
  }
  /**
   * Reflects this vector off a plane orthogonal to the given normal vector.
   *
   * @param {Vector3} normal - The (normalized) normal vector.
   * @return {Vector3} A reference to this vector.
   */
  reflect(normal2) {
    return this.sub(_vector$c.copy(normal2).multiplyScalar(2 * this.dot(normal2)));
  }
  /**
   * Returns the angle between the given vector and this instance in radians.
   *
   * @param {Vector3} v - The vector to compute the angle with.
   * @return {number} The angle in radians.
   */
  angleTo(v) {
    const denominator = Math.sqrt(this.lengthSq() * v.lengthSq());
    if (denominator === 0) return Math.PI / 2;
    const theta = this.dot(v) / denominator;
    return Math.acos(clamp(theta, -1, 1));
  }
  /**
   * Computes the distance from the given vector to this instance.
   *
   * @param {Vector3} v - The vector to compute the distance to.
   * @return {number} The distance.
   */
  distanceTo(v) {
    return Math.sqrt(this.distanceToSquared(v));
  }
  /**
   * Computes the squared distance from the given vector to this instance.
   * If you are just comparing the distance with another distance, you should compare
   * the distance squared instead as it is slightly more efficient to calculate.
   *
   * @param {Vector3} v - The vector to compute the squared distance to.
   * @return {number} The squared distance.
   */
  distanceToSquared(v) {
    const dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;
    return dx * dx + dy * dy + dz * dz;
  }
  /**
   * Computes the Manhattan distance from the given vector to this instance.
   *
   * @param {Vector3} v - The vector to compute the Manhattan distance to.
   * @return {number} The Manhattan distance.
   */
  manhattanDistanceTo(v) {
    return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z);
  }
  /**
   * Sets the vector components from the given spherical coordinates.
   *
   * @param {Spherical} s - The spherical coordinates.
   * @return {Vector3} A reference to this vector.
   */
  setFromSpherical(s) {
    return this.setFromSphericalCoords(s.radius, s.phi, s.theta);
  }
  /**
   * Sets the vector components from the given spherical coordinates.
   *
   * @param {number} radius - The radius.
   * @param {number} phi - The phi angle in radians.
   * @param {number} theta - The theta angle in radians.
   * @return {Vector3} A reference to this vector.
   */
  setFromSphericalCoords(radius, phi, theta) {
    const sinPhiRadius = Math.sin(phi) * radius;
    this.x = sinPhiRadius * Math.sin(theta);
    this.y = Math.cos(phi) * radius;
    this.z = sinPhiRadius * Math.cos(theta);
    return this;
  }
  /**
   * Sets the vector components from the given cylindrical coordinates.
   *
   * @param {Cylindrical} c - The cylindrical coordinates.
   * @return {Vector3} A reference to this vector.
   */
  setFromCylindrical(c) {
    return this.setFromCylindricalCoords(c.radius, c.theta, c.y);
  }
  /**
   * Sets the vector components from the given cylindrical coordinates.
   *
   * @param {number} radius - The radius.
   * @param {number} theta - The theta angle in radians.
   * @param {number} y - The y value.
   * @return {Vector3} A reference to this vector.
   */
  setFromCylindricalCoords(radius, theta, y) {
    this.x = radius * Math.sin(theta);
    this.y = y;
    this.z = radius * Math.cos(theta);
    return this;
  }
  /**
   * Sets the vector components to the position elements of the
   * given transformation matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Vector3} A reference to this vector.
   */
  setFromMatrixPosition(m) {
    const e = m.elements;
    this.x = e[12];
    this.y = e[13];
    this.z = e[14];
    return this;
  }
  /**
   * Sets the vector components to the scale elements of the
   * given transformation matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Vector3} A reference to this vector.
   */
  setFromMatrixScale(m) {
    const sx = this.setFromMatrixColumn(m, 0).length();
    const sy = this.setFromMatrixColumn(m, 1).length();
    const sz = this.setFromMatrixColumn(m, 2).length();
    this.x = sx;
    this.y = sy;
    this.z = sz;
    return this;
  }
  /**
   * Sets the vector components from the specified matrix column.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @param {number} index - The column index.
   * @return {Vector3} A reference to this vector.
   */
  setFromMatrixColumn(m, index) {
    return this.fromArray(m.elements, index * 4);
  }
  /**
   * Sets the vector components from the specified matrix column.
   *
   * @param {Matrix3} m - The 3x3 matrix.
   * @param {number} index - The column index.
   * @return {Vector3} A reference to this vector.
   */
  setFromMatrix3Column(m, index) {
    return this.fromArray(m.elements, index * 3);
  }
  /**
   * Sets the vector components from the given Euler angles.
   *
   * @param {Euler} e - The Euler angles to set.
   * @return {Vector3} A reference to this vector.
   */
  setFromEuler(e) {
    this.x = e._x;
    this.y = e._y;
    this.z = e._z;
    return this;
  }
  /**
   * Sets the vector components from the RGB components of the
   * given color.
   *
   * @param {Color} c - The color to set.
   * @return {Vector3} A reference to this vector.
   */
  setFromColor(c) {
    this.x = c.r;
    this.y = c.g;
    this.z = c.b;
    return this;
  }
  /**
   * Returns `true` if this vector is equal with the given one.
   *
   * @param {Vector3} v - The vector to test for equality.
   * @return {boolean} Whether this vector is equal with the given one.
   */
  equals(v) {
    return v.x === this.x && v.y === this.y && v.z === this.z;
  }
  /**
   * Sets this vector's x value to be `array[ offset ]`, y value to be `array[ offset + 1 ]`
   * and z value to be `array[ offset + 2 ]`.
   *
   * @param {Array<number>} array - An array holding the vector component values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Vector3} A reference to this vector.
   */
  fromArray(array2, offset = 0) {
    this.x = array2[offset];
    this.y = array2[offset + 1];
    this.z = array2[offset + 2];
    return this;
  }
  /**
   * Writes the components of this vector to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the vector components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The vector components.
   */
  toArray(array2 = [], offset = 0) {
    array2[offset] = this.x;
    array2[offset + 1] = this.y;
    array2[offset + 2] = this.z;
    return array2;
  }
  /**
   * Sets the components of this vector from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding vector data.
   * @param {number} index - The index into the attribute.
   * @return {Vector3} A reference to this vector.
   */
  fromBufferAttribute(attribute2, index) {
    this.x = attribute2.getX(index);
    this.y = attribute2.getY(index);
    this.z = attribute2.getZ(index);
    return this;
  }
  /**
   * Sets each component of this vector to a pseudo-random value between `0` and
   * `1`, excluding `1`.
   *
   * @return {Vector3} A reference to this vector.
   */
  random() {
    this.x = Math.random();
    this.y = Math.random();
    this.z = Math.random();
    return this;
  }
  /**
   * Sets this vector to a uniformly random point on a unit sphere.
   *
   * @return {Vector3} A reference to this vector.
   */
  randomDirection() {
    const theta = Math.random() * Math.PI * 2;
    const u = Math.random() * 2 - 1;
    const c = Math.sqrt(1 - u * u);
    this.x = c * Math.cos(theta);
    this.y = u;
    this.z = c * Math.sin(theta);
    return this;
  }
  *[Symbol.iterator]() {
    yield this.x;
    yield this.y;
    yield this.z;
  }
};
_Vector3.prototype.isVector3 = true;
var Vector3 = _Vector3;
var _vector$c = /* @__PURE__ */ new Vector3();
var _quaternion$5 = /* @__PURE__ */ new Quaternion();
var _Matrix3 = class _Matrix3 {
  /**
   * Constructs a new 3x3 matrix. The arguments are supposed to be
   * in row-major order. If no arguments are provided, the constructor
   * initializes the matrix as an identity matrix.
   *
   * @param {number} [n11] - 1-1 matrix element.
   * @param {number} [n12] - 1-2 matrix element.
   * @param {number} [n13] - 1-3 matrix element.
   * @param {number} [n21] - 2-1 matrix element.
   * @param {number} [n22] - 2-2 matrix element.
   * @param {number} [n23] - 2-3 matrix element.
   * @param {number} [n31] - 3-1 matrix element.
   * @param {number} [n32] - 3-2 matrix element.
   * @param {number} [n33] - 3-3 matrix element.
   */
  constructor(n11, n12, n13, n21, n22, n23, n31, n32, n33) {
    this.elements = [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ];
    if (n11 !== void 0) {
      this.set(n11, n12, n13, n21, n22, n23, n31, n32, n33);
    }
  }
  /**
   * Sets the elements of the matrix.The arguments are supposed to be
   * in row-major order.
   *
   * @param {number} [n11] - 1-1 matrix element.
   * @param {number} [n12] - 1-2 matrix element.
   * @param {number} [n13] - 1-3 matrix element.
   * @param {number} [n21] - 2-1 matrix element.
   * @param {number} [n22] - 2-2 matrix element.
   * @param {number} [n23] - 2-3 matrix element.
   * @param {number} [n31] - 3-1 matrix element.
   * @param {number} [n32] - 3-2 matrix element.
   * @param {number} [n33] - 3-3 matrix element.
   * @return {Matrix3} A reference to this matrix.
   */
  set(n11, n12, n13, n21, n22, n23, n31, n32, n33) {
    const te = this.elements;
    te[0] = n11;
    te[1] = n21;
    te[2] = n31;
    te[3] = n12;
    te[4] = n22;
    te[5] = n32;
    te[6] = n13;
    te[7] = n23;
    te[8] = n33;
    return this;
  }
  /**
   * Sets this matrix to the 3x3 identity matrix.
   *
   * @return {Matrix3} A reference to this matrix.
   */
  identity() {
    this.set(
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    );
    return this;
  }
  /**
   * Copies the values of the given matrix to this instance.
   *
   * @param {Matrix3} m - The matrix to copy.
   * @return {Matrix3} A reference to this matrix.
   */
  copy(m) {
    const te = this.elements;
    const me = m.elements;
    te[0] = me[0];
    te[1] = me[1];
    te[2] = me[2];
    te[3] = me[3];
    te[4] = me[4];
    te[5] = me[5];
    te[6] = me[6];
    te[7] = me[7];
    te[8] = me[8];
    return this;
  }
  /**
   * Extracts the basis of this matrix into the three axis vectors provided.
   *
   * @param {Vector3} xAxis - The basis's x axis.
   * @param {Vector3} yAxis - The basis's y axis.
   * @param {Vector3} zAxis - The basis's z axis.
   * @return {Matrix3} A reference to this matrix.
   */
  extractBasis(xAxis, yAxis, zAxis) {
    xAxis.setFromMatrix3Column(this, 0);
    yAxis.setFromMatrix3Column(this, 1);
    zAxis.setFromMatrix3Column(this, 2);
    return this;
  }
  /**
   * Set this matrix to the upper 3x3 matrix of the given 4x4 matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Matrix3} A reference to this matrix.
   */
  setFromMatrix4(m) {
    const me = m.elements;
    this.set(
      me[0],
      me[4],
      me[8],
      me[1],
      me[5],
      me[9],
      me[2],
      me[6],
      me[10]
    );
    return this;
  }
  /**
   * Post-multiplies this matrix by the given 3x3 matrix.
   *
   * @param {Matrix3} m - The matrix to multiply with.
   * @return {Matrix3} A reference to this matrix.
   */
  multiply(m) {
    return this.multiplyMatrices(this, m);
  }
  /**
   * Pre-multiplies this matrix by the given 3x3 matrix.
   *
   * @param {Matrix3} m - The matrix to multiply with.
   * @return {Matrix3} A reference to this matrix.
   */
  premultiply(m) {
    return this.multiplyMatrices(m, this);
  }
  /**
   * Multiples the given 3x3 matrices and stores the result
   * in this matrix.
   *
   * @param {Matrix3} a - The first matrix.
   * @param {Matrix3} b - The second matrix.
   * @return {Matrix3} A reference to this matrix.
   */
  multiplyMatrices(a, b) {
    const ae = a.elements;
    const be = b.elements;
    const te = this.elements;
    const a11 = ae[0], a12 = ae[3], a13 = ae[6];
    const a21 = ae[1], a22 = ae[4], a23 = ae[7];
    const a31 = ae[2], a32 = ae[5], a33 = ae[8];
    const b11 = be[0], b12 = be[3], b13 = be[6];
    const b21 = be[1], b22 = be[4], b23 = be[7];
    const b31 = be[2], b32 = be[5], b33 = be[8];
    te[0] = a11 * b11 + a12 * b21 + a13 * b31;
    te[3] = a11 * b12 + a12 * b22 + a13 * b32;
    te[6] = a11 * b13 + a12 * b23 + a13 * b33;
    te[1] = a21 * b11 + a22 * b21 + a23 * b31;
    te[4] = a21 * b12 + a22 * b22 + a23 * b32;
    te[7] = a21 * b13 + a22 * b23 + a23 * b33;
    te[2] = a31 * b11 + a32 * b21 + a33 * b31;
    te[5] = a31 * b12 + a32 * b22 + a33 * b32;
    te[8] = a31 * b13 + a32 * b23 + a33 * b33;
    return this;
  }
  /**
   * Multiplies every component of the matrix by the given scalar.
   *
   * @param {number} s - The scalar.
   * @return {Matrix3} A reference to this matrix.
   */
  multiplyScalar(s) {
    const te = this.elements;
    te[0] *= s;
    te[3] *= s;
    te[6] *= s;
    te[1] *= s;
    te[4] *= s;
    te[7] *= s;
    te[2] *= s;
    te[5] *= s;
    te[8] *= s;
    return this;
  }
  /**
   * Computes and returns the determinant of this matrix.
   *
   * @return {number} The determinant.
   */
  determinant() {
    const te = this.elements;
    const a = te[0], b = te[1], c = te[2], d = te[3], e = te[4], f = te[5], g = te[6], h = te[7], i = te[8];
    return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;
  }
  /**
   * Inverts this matrix, using the [analytic method](https://en.wikipedia.org/wiki/Invertible_matrix#Analytic_solution).
   * You can not invert with a determinant of zero. If you attempt this, the method produces
   * a zero matrix instead.
   *
   * @return {Matrix3} A reference to this matrix.
   */
  invert() {
    const te = this.elements, n11 = te[0], n21 = te[1], n31 = te[2], n12 = te[3], n22 = te[4], n32 = te[5], n13 = te[6], n23 = te[7], n33 = te[8], t11 = n33 * n22 - n32 * n23, t12 = n32 * n13 - n33 * n12, t13 = n23 * n12 - n22 * n13, det2 = n11 * t11 + n21 * t12 + n31 * t13;
    if (det2 === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const detInv = 1 / det2;
    te[0] = t11 * detInv;
    te[1] = (n31 * n23 - n33 * n21) * detInv;
    te[2] = (n32 * n21 - n31 * n22) * detInv;
    te[3] = t12 * detInv;
    te[4] = (n33 * n11 - n31 * n13) * detInv;
    te[5] = (n31 * n12 - n32 * n11) * detInv;
    te[6] = t13 * detInv;
    te[7] = (n21 * n13 - n23 * n11) * detInv;
    te[8] = (n22 * n11 - n21 * n12) * detInv;
    return this;
  }
  /**
   * Transposes this matrix in place.
   *
   * @return {Matrix3} A reference to this matrix.
   */
  transpose() {
    let tmp;
    const m = this.elements;
    tmp = m[1];
    m[1] = m[3];
    m[3] = tmp;
    tmp = m[2];
    m[2] = m[6];
    m[6] = tmp;
    tmp = m[5];
    m[5] = m[7];
    m[7] = tmp;
    return this;
  }
  /**
   * Computes the normal matrix which is the inverse transpose of the upper
   * left 3x3 portion of the given 4x4 matrix.
   *
   * @param {Matrix4} matrix4 - The 4x4 matrix.
   * @return {Matrix3} A reference to this matrix.
   */
  getNormalMatrix(matrix4) {
    return this.setFromMatrix4(matrix4).invert().transpose();
  }
  /**
   * Transposes this matrix into the supplied array, and returns itself unchanged.
   *
   * @param {Array<number>} r - An array to store the transposed matrix elements.
   * @return {Matrix3} A reference to this matrix.
   */
  transposeIntoArray(r) {
    const m = this.elements;
    r[0] = m[0];
    r[1] = m[3];
    r[2] = m[6];
    r[3] = m[1];
    r[4] = m[4];
    r[5] = m[7];
    r[6] = m[2];
    r[7] = m[5];
    r[8] = m[8];
    return this;
  }
  /**
   * Sets the UV transform matrix from offset, repeat, rotation, and center.
   *
   * @param {number} tx - Offset x.
   * @param {number} ty - Offset y.
   * @param {number} sx - Repeat x.
   * @param {number} sy - Repeat y.
   * @param {number} rotation - Rotation, in radians. Positive values rotate counterclockwise.
   * @param {number} cx - Center x of rotation.
   * @param {number} cy - Center y of rotation
   * @return {Matrix3} A reference to this matrix.
   */
  setUvTransform(tx, ty, sx, sy, rotation, cx, cy) {
    const c = Math.cos(rotation);
    const s = Math.sin(rotation);
    this.set(
      sx * c,
      sx * s,
      -sx * (c * cx + s * cy) + cx + tx,
      -sy * s,
      sy * c,
      -sy * (-s * cx + c * cy) + cy + ty,
      0,
      0,
      1
    );
    return this;
  }
  /**
   * Scales this matrix with the given scalar values.
   *
   * @deprecated
   * @param {number} sx - The amount to scale in the X axis.
   * @param {number} sy - The amount to scale in the Y axis.
   * @return {Matrix3} A reference to this matrix.
   */
  scale(sx, sy) {
    warnOnce("Matrix3: .scale() is deprecated. Use .makeScale() instead.");
    this.premultiply(_m3.makeScale(sx, sy));
    return this;
  }
  /**
   * Rotates this matrix by the given angle.
   *
   * @deprecated
   * @param {number} theta - The rotation in radians.
   * @return {Matrix3} A reference to this matrix.
   */
  rotate(theta) {
    warnOnce("Matrix3: .rotate() is deprecated. Use .makeRotation() instead.");
    this.premultiply(_m3.makeRotation(-theta));
    return this;
  }
  /**
   * Translates this matrix by the given scalar values.
   *
   * @deprecated
   * @param {number} tx - The amount to translate in the X axis.
   * @param {number} ty - The amount to translate in the Y axis.
   * @return {Matrix3} A reference to this matrix.
   */
  translate(tx, ty) {
    warnOnce("Matrix3: .translate() is deprecated. Use .makeTranslation() instead.");
    this.premultiply(_m3.makeTranslation(tx, ty));
    return this;
  }
  // for 2D Transforms
  /**
   * Sets this matrix as a 2D translation transform.
   *
   * @param {number|Vector2} x - The amount to translate in the X axis or alternatively a translation vector.
   * @param {number} y - The amount to translate in the Y axis.
   * @return {Matrix3} A reference to this matrix.
   */
  makeTranslation(x, y) {
    if (x.isVector2) {
      this.set(
        1,
        0,
        x.x,
        0,
        1,
        x.y,
        0,
        0,
        1
      );
    } else {
      this.set(
        1,
        0,
        x,
        0,
        1,
        y,
        0,
        0,
        1
      );
    }
    return this;
  }
  /**
   * Sets this matrix as a 2D rotational transformation.
   *
   * @param {number} theta - The rotation in radians.
   * @return {Matrix3} A reference to this matrix.
   */
  makeRotation(theta) {
    const c = Math.cos(theta);
    const s = Math.sin(theta);
    this.set(
      c,
      -s,
      0,
      s,
      c,
      0,
      0,
      0,
      1
    );
    return this;
  }
  /**
   * Sets this matrix as a 2D scale transform.
   *
   * @param {number} x - The amount to scale in the X axis.
   * @param {number} y - The amount to scale in the Y axis.
   * @return {Matrix3} A reference to this matrix.
   */
  makeScale(x, y) {
    this.set(
      x,
      0,
      0,
      0,
      y,
      0,
      0,
      0,
      1
    );
    return this;
  }
  /**
   * Returns `true` if this matrix is equal with the given one.
   *
   * @param {Matrix3} matrix - The matrix to test for equality.
   * @return {boolean} Whether this matrix is equal with the given one.
   */
  equals(matrix) {
    const te = this.elements;
    const me = matrix.elements;
    for (let i = 0; i < 9; i++) {
      if (te[i] !== me[i]) return false;
    }
    return true;
  }
  /**
   * Sets the elements of the matrix from the given array.
   *
   * @param {Array<number>} array - The matrix elements in column-major order.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Matrix3} A reference to this matrix.
   */
  fromArray(array2, offset = 0) {
    for (let i = 0; i < 9; i++) {
      this.elements[i] = array2[i + offset];
    }
    return this;
  }
  /**
   * Writes the elements of this matrix to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the matrix elements in column-major order.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The matrix elements in column-major order.
   */
  toArray(array2 = [], offset = 0) {
    const te = this.elements;
    array2[offset] = te[0];
    array2[offset + 1] = te[1];
    array2[offset + 2] = te[2];
    array2[offset + 3] = te[3];
    array2[offset + 4] = te[4];
    array2[offset + 5] = te[5];
    array2[offset + 6] = te[6];
    array2[offset + 7] = te[7];
    array2[offset + 8] = te[8];
    return array2;
  }
  /**
   * Returns a matrix with copied values from this instance.
   *
   * @return {Matrix3} A clone of this instance.
   */
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
};
_Matrix3.prototype.isMatrix3 = true;
var Matrix3 = _Matrix3;
var _m3 = /* @__PURE__ */ new Matrix3();
var LINEAR_REC709_TO_XYZ = /* @__PURE__ */ new Matrix3().set(
  0.4123908,
  0.3575843,
  0.1804808,
  0.212639,
  0.7151687,
  0.0721923,
  0.0193308,
  0.1191948,
  0.9505322
);
var XYZ_TO_LINEAR_REC709 = /* @__PURE__ */ new Matrix3().set(
  3.2409699,
  -1.5373832,
  -0.4986108,
  -0.9692436,
  1.8759675,
  0.0415551,
  0.0556301,
  -0.203977,
  1.0569715
);
function createColorManagement() {
  const ColorManagement2 = {
    enabled: true,
    workingColorSpace: LinearSRGBColorSpace,
    /**
     * Implementations of supported color spaces.
     *
     * Required:
     *	- primaries: chromaticity coordinates [ rx ry gx gy bx by ]
     *	- whitePoint: reference white [ x y ]
     *	- transfer: transfer function (pre-defined)
     *	- toXYZ: Matrix3 RGB to XYZ transform
     *	- fromXYZ: Matrix3 XYZ to RGB transform
     *	- luminanceCoefficients: RGB luminance coefficients
     *
     * Optional:
     *  - outputColorSpaceConfig: { drawingBufferColorSpace: ColorSpace, toneMappingMode: 'extended' | 'standard' }
     *  - workingColorSpaceConfig: { unpackColorSpace: ColorSpace }
     *
     * Reference:
     * - https://www.russellcottrell.com/photo/matrixCalculator.htm
     */
    spaces: {},
    convert: function(color2, sourceColorSpace, targetColorSpace) {
      if (this.enabled === false || sourceColorSpace === targetColorSpace || !sourceColorSpace || !targetColorSpace) {
        return color2;
      }
      if (this.spaces[sourceColorSpace].transfer === SRGBTransfer) {
        color2.r = SRGBToLinear(color2.r);
        color2.g = SRGBToLinear(color2.g);
        color2.b = SRGBToLinear(color2.b);
      }
      if (this.spaces[sourceColorSpace].primaries !== this.spaces[targetColorSpace].primaries) {
        color2.applyMatrix3(this.spaces[sourceColorSpace].toXYZ);
        color2.applyMatrix3(this.spaces[targetColorSpace].fromXYZ);
      }
      if (this.spaces[targetColorSpace].transfer === SRGBTransfer) {
        color2.r = LinearToSRGB(color2.r);
        color2.g = LinearToSRGB(color2.g);
        color2.b = LinearToSRGB(color2.b);
      }
      return color2;
    },
    workingToColorSpace: function(color2, targetColorSpace) {
      return this.convert(color2, this.workingColorSpace, targetColorSpace);
    },
    colorSpaceToWorking: function(color2, sourceColorSpace) {
      return this.convert(color2, sourceColorSpace, this.workingColorSpace);
    },
    getPrimaries: function(colorSpace) {
      return this.spaces[colorSpace].primaries;
    },
    getTransfer: function(colorSpace) {
      if (colorSpace === NoColorSpace) return LinearTransfer;
      return this.spaces[colorSpace].transfer;
    },
    getToneMappingMode: function(colorSpace) {
      return this.spaces[colorSpace].outputColorSpaceConfig.toneMappingMode || "standard";
    },
    getLuminanceCoefficients: function(target, colorSpace = this.workingColorSpace) {
      return target.fromArray(this.spaces[colorSpace].luminanceCoefficients);
    },
    define: function(colorSpaces) {
      Object.assign(this.spaces, colorSpaces);
    },
    // Internal APIs
    _getMatrix: function(targetMatrix, sourceColorSpace, targetColorSpace) {
      return targetMatrix.copy(this.spaces[sourceColorSpace].toXYZ).multiply(this.spaces[targetColorSpace].fromXYZ);
    },
    _getDrawingBufferColorSpace: function(colorSpace) {
      return this.spaces[colorSpace].outputColorSpaceConfig.drawingBufferColorSpace;
    },
    _getUnpackColorSpace: function(colorSpace = this.workingColorSpace) {
      return this.spaces[colorSpace].workingColorSpaceConfig.unpackColorSpace;
    },
    // Deprecated
    fromWorkingColorSpace: function(color2, targetColorSpace) {
      warnOnce("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().");
      return ColorManagement2.workingToColorSpace(color2, targetColorSpace);
    },
    toWorkingColorSpace: function(color2, sourceColorSpace) {
      warnOnce("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().");
      return ColorManagement2.colorSpaceToWorking(color2, sourceColorSpace);
    }
  };
  const REC709_PRIMARIES = [0.64, 0.33, 0.3, 0.6, 0.15, 0.06];
  const REC709_LUMINANCE_COEFFICIENTS = [0.2126, 0.7152, 0.0722];
  const D65 = [0.3127, 0.329];
  ColorManagement2.define({
    [LinearSRGBColorSpace]: {
      primaries: REC709_PRIMARIES,
      whitePoint: D65,
      transfer: LinearTransfer,
      toXYZ: LINEAR_REC709_TO_XYZ,
      fromXYZ: XYZ_TO_LINEAR_REC709,
      luminanceCoefficients: REC709_LUMINANCE_COEFFICIENTS,
      workingColorSpaceConfig: { unpackColorSpace: SRGBColorSpace },
      outputColorSpaceConfig: { drawingBufferColorSpace: SRGBColorSpace }
    },
    [SRGBColorSpace]: {
      primaries: REC709_PRIMARIES,
      whitePoint: D65,
      transfer: SRGBTransfer,
      toXYZ: LINEAR_REC709_TO_XYZ,
      fromXYZ: XYZ_TO_LINEAR_REC709,
      luminanceCoefficients: REC709_LUMINANCE_COEFFICIENTS,
      outputColorSpaceConfig: { drawingBufferColorSpace: SRGBColorSpace }
    }
  });
  return ColorManagement2;
}
var ColorManagement = /* @__PURE__ */ createColorManagement();
function SRGBToLinear(c) {
  return c < 0.04045 ? c * 0.0773993808 : Math.pow(c * 0.9478672986 + 0.0521327014, 2.4);
}
function LinearToSRGB(c) {
  return c < 31308e-7 ? c * 12.92 : 1.055 * Math.pow(c, 0.41666) - 0.055;
}
var _canvas;
var ImageUtils = class {
  /**
   * Returns a data URI containing a representation of the given image.
   *
   * @param {(HTMLImageElement|HTMLCanvasElement)} image - The image object.
   * @param {string} [type='image/png'] - Indicates the image format.
   * @return {string} The data URI.
   */
  static getDataURL(image, type = "image/png") {
    if (/^data:/i.test(image.src)) {
      return image.src;
    }
    if (typeof HTMLCanvasElement === "undefined") {
      return image.src;
    }
    let canvas;
    if (image instanceof HTMLCanvasElement) {
      canvas = image;
    } else {
      if (_canvas === void 0) _canvas = createElementNS("canvas");
      _canvas.width = image.width;
      _canvas.height = image.height;
      const context2 = _canvas.getContext("2d");
      if (image instanceof ImageData) {
        context2.putImageData(image, 0, 0);
      } else {
        context2.drawImage(image, 0, 0, image.width, image.height);
      }
      canvas = _canvas;
    }
    return canvas.toDataURL(type);
  }
  /**
   * Converts the given sRGB image data to linear color space.
   *
   * @param {(HTMLImageElement|HTMLCanvasElement|ImageBitmap|Object)} image - The image object.
   * @return {HTMLCanvasElement|Object} The converted image.
   */
  static sRGBToLinear(image) {
    if (typeof HTMLImageElement !== "undefined" && image instanceof HTMLImageElement || typeof HTMLCanvasElement !== "undefined" && image instanceof HTMLCanvasElement || typeof ImageBitmap !== "undefined" && image instanceof ImageBitmap) {
      const canvas = createElementNS("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const context2 = canvas.getContext("2d");
      context2.drawImage(image, 0, 0, image.width, image.height);
      const imageData = context2.getImageData(0, 0, image.width, image.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i++) {
        data[i] = SRGBToLinear(data[i] / 255) * 255;
      }
      context2.putImageData(imageData, 0, 0);
      return canvas;
    } else if (image.data) {
      const data = image.data.slice(0);
      for (let i = 0; i < data.length; i++) {
        if (data instanceof Uint8Array || data instanceof Uint8ClampedArray) {
          data[i] = Math.floor(SRGBToLinear(data[i] / 255) * 255);
        } else {
          data[i] = SRGBToLinear(data[i]);
        }
      }
      return {
        data,
        width: image.width,
        height: image.height
      };
    } else {
      warn("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.");
      return image;
    }
  }
};
var _sourceId = 0;
var Source = class {
  /**
   * Constructs a new video texture.
   *
   * @param {any} [data=null] - The data definition of a texture.
   */
  constructor(data = null) {
    this.isSource = true;
    Object.defineProperty(this, "id", { value: _sourceId++ });
    this.uuid = generateUUID();
    this.data = data;
    this.dataReady = true;
    this.version = 0;
  }
  /**
   * Returns the dimensions of the source into the given target vector.
   *
   * @param {(Vector2|Vector3)} target - The target object the result is written into.
   * @return {(Vector2|Vector3)} The dimensions of the source.
   */
  getSize(target) {
    const data = this.data;
    if (typeof HTMLVideoElement !== "undefined" && data instanceof HTMLVideoElement) {
      target.set(data.videoWidth, data.videoHeight, 0);
    } else if (typeof VideoFrame !== "undefined" && data instanceof VideoFrame) {
      target.set(data.displayWidth, data.displayHeight, 0);
    } else if (data !== null) {
      target.set(data.width, data.height, data.depth || 0);
    } else {
      target.set(0, 0, 0);
    }
    return target;
  }
  /**
   * When the property is set to `true`, the engine allocates the memory
   * for the texture (if necessary) and triggers the actual texture upload
   * to the GPU next time the source is used.
   *
   * @type {boolean}
   * @default false
   * @param {boolean} value
   */
  set needsUpdate(value) {
    if (value === true) this.version++;
  }
  /**
   * Serializes the source into JSON.
   *
   * @param {?(Object|string)} meta - An optional value holding meta information about the serialization.
   * @return {Object} A JSON object representing the serialized source.
   * @see {@link ObjectLoader#parse}
   */
  toJSON(meta) {
    const isRootObject = meta === void 0 || typeof meta === "string";
    if (!isRootObject && meta.images[this.uuid] !== void 0) {
      return meta.images[this.uuid];
    }
    const output2 = {
      uuid: this.uuid,
      url: ""
    };
    const data = this.data;
    if (data !== null) {
      let url;
      if (Array.isArray(data)) {
        url = [];
        for (let i = 0, l = data.length; i < l; i++) {
          if (data[i].isDataTexture) {
            url.push(serializeImage(data[i].image));
          } else {
            url.push(serializeImage(data[i]));
          }
        }
      } else {
        url = serializeImage(data);
      }
      output2.url = url;
    }
    if (!isRootObject) {
      meta.images[this.uuid] = output2;
    }
    return output2;
  }
};
function serializeImage(image) {
  if (typeof HTMLImageElement !== "undefined" && image instanceof HTMLImageElement || typeof HTMLCanvasElement !== "undefined" && image instanceof HTMLCanvasElement || typeof ImageBitmap !== "undefined" && image instanceof ImageBitmap) {
    return ImageUtils.getDataURL(image);
  } else {
    if (image.data) {
      return {
        data: Array.from(image.data),
        width: image.width,
        height: image.height,
        type: image.data.constructor.name
      };
    } else {
      warn("Texture: Unable to serialize Texture.");
      return {};
    }
  }
}
var _textureId = 0;
var _tempVec3 = /* @__PURE__ */ new Vector3();
var Texture = class _Texture extends EventDispatcher {
  /**
   * Constructs a new texture.
   *
   * @param {?Object} [image=Texture.DEFAULT_IMAGE] - The image holding the texture data.
   * @param {number} [mapping=Texture.DEFAULT_MAPPING] - The texture mapping.
   * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
   * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
   * @param {number} [magFilter=LinearFilter] - The mag filter value.
   * @param {number} [minFilter=LinearMipmapLinearFilter] - The min filter value.
   * @param {number} [format=RGBAFormat] - The texture format.
   * @param {number} [type=UnsignedByteType] - The texture type.
   * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
   * @param {string} [colorSpace=NoColorSpace] - The color space.
   */
  constructor(image = _Texture.DEFAULT_IMAGE, mapping = _Texture.DEFAULT_MAPPING, wrapS = ClampToEdgeWrapping, wrapT = ClampToEdgeWrapping, magFilter = LinearFilter, minFilter = LinearMipmapLinearFilter, format = RGBAFormat, type = UnsignedByteType, anisotropy = _Texture.DEFAULT_ANISOTROPY, colorSpace = NoColorSpace) {
    super();
    this.isTexture = true;
    Object.defineProperty(this, "id", { value: _textureId++ });
    this.uuid = generateUUID();
    this.name = "";
    this.source = new Source(image);
    this.mipmaps = [];
    this.mapping = mapping;
    this.channel = 0;
    this.wrapS = wrapS;
    this.wrapT = wrapT;
    this.magFilter = magFilter;
    this.minFilter = minFilter;
    this.anisotropy = anisotropy;
    this.format = format;
    this.internalFormat = null;
    this.type = type;
    this.offset = new Vector2(0, 0);
    this.repeat = new Vector2(1, 1);
    this.center = new Vector2(0, 0);
    this.rotation = 0;
    this.matrixAutoUpdate = true;
    this.matrix = new Matrix3();
    this.generateMipmaps = true;
    this.premultiplyAlpha = false;
    this.flipY = true;
    this.unpackAlignment = 4;
    this.colorSpace = colorSpace;
    this.userData = {};
    this.updateRanges = [];
    this.version = 0;
    this.onUpdate = null;
    this.renderTarget = null;
    this.isRenderTargetTexture = false;
    this.isArrayTexture = image && image.depth && image.depth > 1 ? true : false;
    this.pmremVersion = 0;
    this.normalized = false;
  }
  /**
   * The width of the texture in pixels.
   */
  get width() {
    return this.source.getSize(_tempVec3).x;
  }
  /**
   * The height of the texture in pixels.
   */
  get height() {
    return this.source.getSize(_tempVec3).y;
  }
  /**
   * The depth of the texture in pixels.
   */
  get depth() {
    return this.source.getSize(_tempVec3).z;
  }
  /**
   * The image object holding the texture data.
   *
   * @type {?Object}
   */
  get image() {
    return this.source.data;
  }
  set image(value) {
    this.source.data = value;
  }
  /**
   * Updates the texture transformation matrix from the properties {@link Texture#offset},
   * {@link Texture#repeat}, {@link Texture#rotation}, and {@link Texture#center}.
   */
  updateMatrix() {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
  }
  /**
   * Adds a range of data in the data texture to be updated on the GPU.
   *
   * @param {number} start - Position at which to start update.
   * @param {number} count - The number of components to update.
   */
  addUpdateRange(start, count) {
    this.updateRanges.push({ start, count });
  }
  /**
   * Clears the update ranges.
   */
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  /**
   * Returns a new texture with copied values from this instance.
   *
   * @return {Texture} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the values of the given texture to this instance.
   *
   * @param {Texture} source - The texture to copy.
   * @return {Texture} A reference to this instance.
   */
  copy(source) {
    this.name = source.name;
    this.source = source.source;
    this.mipmaps = source.mipmaps.slice(0);
    this.mapping = source.mapping;
    this.channel = source.channel;
    this.wrapS = source.wrapS;
    this.wrapT = source.wrapT;
    this.magFilter = source.magFilter;
    this.minFilter = source.minFilter;
    this.anisotropy = source.anisotropy;
    this.format = source.format;
    this.internalFormat = source.internalFormat;
    this.type = source.type;
    this.normalized = source.normalized;
    this.offset.copy(source.offset);
    this.repeat.copy(source.repeat);
    this.center.copy(source.center);
    this.rotation = source.rotation;
    this.matrixAutoUpdate = source.matrixAutoUpdate;
    this.matrix.copy(source.matrix);
    this.generateMipmaps = source.generateMipmaps;
    this.premultiplyAlpha = source.premultiplyAlpha;
    this.flipY = source.flipY;
    this.unpackAlignment = source.unpackAlignment;
    this.colorSpace = source.colorSpace;
    this.renderTarget = source.renderTarget;
    this.isRenderTargetTexture = source.isRenderTargetTexture;
    this.isArrayTexture = source.isArrayTexture;
    this.userData = JSON.parse(JSON.stringify(source.userData));
    this.needsUpdate = true;
    return this;
  }
  /**
   * Sets this texture's properties based on `values`.
   * @param {Object} values - A container with texture parameters.
   */
  setValues(values) {
    for (const key in values) {
      const newValue = values[key];
      if (newValue === void 0) {
        warn(`Texture.setValues(): parameter '${key}' has value of undefined.`);
        continue;
      }
      const currentValue = this[key];
      if (currentValue === void 0) {
        warn(`Texture.setValues(): property '${key}' does not exist.`);
        continue;
      }
      if (currentValue && newValue && (currentValue.isVector2 && newValue.isVector2)) {
        currentValue.copy(newValue);
      } else if (currentValue && newValue && (currentValue.isVector3 && newValue.isVector3)) {
        currentValue.copy(newValue);
      } else if (currentValue && newValue && (currentValue.isMatrix3 && newValue.isMatrix3)) {
        currentValue.copy(newValue);
      } else {
        this[key] = newValue;
      }
    }
  }
  /**
   * Serializes the texture into JSON.
   *
   * @param {?(Object|string)} meta - An optional value holding meta information about the serialization.
   * @return {Object} A JSON object representing the serialized texture.
   * @see {@link ObjectLoader#parse}
   */
  toJSON(meta) {
    const isRootObject = meta === void 0 || typeof meta === "string";
    if (!isRootObject && meta.textures[this.uuid] !== void 0) {
      return meta.textures[this.uuid];
    }
    const output2 = {
      metadata: {
        version: 4.7,
        type: "Texture",
        generator: "Texture.toJSON"
      },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(meta).uuid,
      mapping: this.mapping,
      channel: this.channel,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      internalFormat: this.internalFormat,
      type: this.type,
      normalized: this.normalized,
      colorSpace: this.colorSpace,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      generateMipmaps: this.generateMipmaps,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment
    };
    if (Object.keys(this.userData).length > 0) output2.userData = this.userData;
    if (!isRootObject) {
      meta.textures[this.uuid] = output2;
    }
    return output2;
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever this instance is no longer used in your app.
   *
   * @fires Texture#dispose
   */
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  /**
   * Transforms the given uv vector with the textures uv transformation matrix.
   *
   * @param {Vector2} uv - The uv vector.
   * @return {Vector2} The transformed uv vector.
   */
  transformUv(uv2) {
    if (this.mapping !== UVMapping) return uv2;
    uv2.applyMatrix3(this.matrix);
    if (uv2.x < 0 || uv2.x > 1) {
      switch (this.wrapS) {
        case RepeatWrapping:
          uv2.x = uv2.x - Math.floor(uv2.x);
          break;
        case ClampToEdgeWrapping:
          uv2.x = uv2.x < 0 ? 0 : 1;
          break;
        case MirroredRepeatWrapping:
          if (Math.abs(Math.floor(uv2.x) % 2) === 1) {
            uv2.x = Math.ceil(uv2.x) - uv2.x;
          } else {
            uv2.x = uv2.x - Math.floor(uv2.x);
          }
          break;
      }
    }
    if (uv2.y < 0 || uv2.y > 1) {
      switch (this.wrapT) {
        case RepeatWrapping:
          uv2.y = uv2.y - Math.floor(uv2.y);
          break;
        case ClampToEdgeWrapping:
          uv2.y = uv2.y < 0 ? 0 : 1;
          break;
        case MirroredRepeatWrapping:
          if (Math.abs(Math.floor(uv2.y) % 2) === 1) {
            uv2.y = Math.ceil(uv2.y) - uv2.y;
          } else {
            uv2.y = uv2.y - Math.floor(uv2.y);
          }
          break;
      }
    }
    if (this.flipY) {
      uv2.y = 1 - uv2.y;
    }
    return uv2;
  }
  /**
   * Setting this property to `true` indicates the engine the texture
   * must be updated in the next render. This triggers a texture upload
   * to the GPU and ensures correct texture parameter configuration.
   *
   * @type {boolean}
   * @default false
   * @param {boolean} value
   */
  set needsUpdate(value) {
    if (value === true) {
      this.version++;
      this.source.needsUpdate = true;
    }
  }
  /**
   * Setting this property to `true` indicates the engine the PMREM
   * must be regenerated.
   *
   * @type {boolean}
   * @default false
   * @param {boolean} value
   */
  set needsPMREMUpdate(value) {
    if (value === true) {
      this.pmremVersion++;
    }
  }
};
Texture.DEFAULT_IMAGE = null;
Texture.DEFAULT_MAPPING = UVMapping;
Texture.DEFAULT_ANISOTROPY = 1;
var _Vector4 = class _Vector4 {
  /**
   * Constructs a new 4D vector.
   *
   * @param {number} [x=0] - The x value of this vector.
   * @param {number} [y=0] - The y value of this vector.
   * @param {number} [z=0] - The z value of this vector.
   * @param {number} [w=1] - The w value of this vector.
   */
  constructor(x = 0, y = 0, z = 0, w = 1) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }
  /**
   * Alias for {@link Vector4#z}.
   *
   * @type {number}
   */
  get width() {
    return this.z;
  }
  set width(value) {
    this.z = value;
  }
  /**
   * Alias for {@link Vector4#w}.
   *
   * @type {number}
   */
  get height() {
    return this.w;
  }
  set height(value) {
    this.w = value;
  }
  /**
   * Sets the vector components.
   *
   * @param {number} x - The value of the x component.
   * @param {number} y - The value of the y component.
   * @param {number} z - The value of the z component.
   * @param {number} w - The value of the w component.
   * @return {Vector4} A reference to this vector.
   */
  set(x, y, z, w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    return this;
  }
  /**
   * Sets the vector components to the same value.
   *
   * @param {number} scalar - The value to set for all vector components.
   * @return {Vector4} A reference to this vector.
   */
  setScalar(scalar) {
    this.x = scalar;
    this.y = scalar;
    this.z = scalar;
    this.w = scalar;
    return this;
  }
  /**
   * Sets the vector's x component to the given value
   *
   * @param {number} x - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setX(x) {
    this.x = x;
    return this;
  }
  /**
   * Sets the vector's y component to the given value
   *
   * @param {number} y - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setY(y) {
    this.y = y;
    return this;
  }
  /**
   * Sets the vector's z component to the given value
   *
   * @param {number} z - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setZ(z) {
    this.z = z;
    return this;
  }
  /**
   * Sets the vector's w component to the given value
   *
   * @param {number} w - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setW(w) {
    this.w = w;
    return this;
  }
  /**
   * Allows to set a vector component with an index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y,
   * `2` equals to z, `3` equals to w.
   * @param {number} value - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setComponent(index, value) {
    switch (index) {
      case 0:
        this.x = value;
        break;
      case 1:
        this.y = value;
        break;
      case 2:
        this.z = value;
        break;
      case 3:
        this.w = value;
        break;
      default:
        throw new Error("THREE.Vector4: index is out of range: " + index);
    }
    return this;
  }
  /**
   * Returns the value of the vector component which matches the given index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y,
   * `2` equals to z, `3` equals to w.
   * @return {number} A vector component value.
   */
  getComponent(index) {
    switch (index) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("THREE.Vector4: index is out of range: " + index);
    }
  }
  /**
   * Returns a new vector with copied values from this instance.
   *
   * @return {Vector4} A clone of this instance.
   */
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  /**
   * Copies the values of the given vector to this instance.
   *
   * @param {Vector3|Vector4} v - The vector to copy.
   * @return {Vector4} A reference to this vector.
   */
  copy(v) {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    this.w = v.w !== void 0 ? v.w : 1;
    return this;
  }
  /**
   * Adds the given vector to this instance.
   *
   * @param {Vector4} v - The vector to add.
   * @return {Vector4} A reference to this vector.
   */
  add(v) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    this.w += v.w;
    return this;
  }
  /**
   * Adds the given scalar value to all components of this instance.
   *
   * @param {number} s - The scalar to add.
   * @return {Vector4} A reference to this vector.
   */
  addScalar(s) {
    this.x += s;
    this.y += s;
    this.z += s;
    this.w += s;
    return this;
  }
  /**
   * Adds the given vectors and stores the result in this instance.
   *
   * @param {Vector4} a - The first vector.
   * @param {Vector4} b - The second vector.
   * @return {Vector4} A reference to this vector.
   */
  addVectors(a, b) {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    this.z = a.z + b.z;
    this.w = a.w + b.w;
    return this;
  }
  /**
   * Adds the given vector scaled by the given factor to this instance.
   *
   * @param {Vector4} v - The vector.
   * @param {number} s - The factor that scales `v`.
   * @return {Vector4} A reference to this vector.
   */
  addScaledVector(v, s) {
    this.x += v.x * s;
    this.y += v.y * s;
    this.z += v.z * s;
    this.w += v.w * s;
    return this;
  }
  /**
   * Subtracts the given vector from this instance.
   *
   * @param {Vector4} v - The vector to subtract.
   * @return {Vector4} A reference to this vector.
   */
  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    this.w -= v.w;
    return this;
  }
  /**
   * Subtracts the given scalar value from all components of this instance.
   *
   * @param {number} s - The scalar to subtract.
   * @return {Vector4} A reference to this vector.
   */
  subScalar(s) {
    this.x -= s;
    this.y -= s;
    this.z -= s;
    this.w -= s;
    return this;
  }
  /**
   * Subtracts the given vectors and stores the result in this instance.
   *
   * @param {Vector4} a - The first vector.
   * @param {Vector4} b - The second vector.
   * @return {Vector4} A reference to this vector.
   */
  subVectors(a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    this.z = a.z - b.z;
    this.w = a.w - b.w;
    return this;
  }
  /**
   * Multiplies the given vector with this instance.
   *
   * @param {Vector4} v - The vector to multiply.
   * @return {Vector4} A reference to this vector.
   */
  multiply(v) {
    this.x *= v.x;
    this.y *= v.y;
    this.z *= v.z;
    this.w *= v.w;
    return this;
  }
  /**
   * Multiplies the given scalar value with all components of this instance.
   *
   * @param {number} scalar - The scalar to multiply.
   * @return {Vector4} A reference to this vector.
   */
  multiplyScalar(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    this.w *= scalar;
    return this;
  }
  /**
   * Multiplies this vector with the given 4x4 matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Vector4} A reference to this vector.
   */
  applyMatrix4(m) {
    const x = this.x, y = this.y, z = this.z, w = this.w;
    const e = m.elements;
    this.x = e[0] * x + e[4] * y + e[8] * z + e[12] * w;
    this.y = e[1] * x + e[5] * y + e[9] * z + e[13] * w;
    this.z = e[2] * x + e[6] * y + e[10] * z + e[14] * w;
    this.w = e[3] * x + e[7] * y + e[11] * z + e[15] * w;
    return this;
  }
  /**
   * Divides this instance by the given vector.
   *
   * @param {Vector4} v - The vector to divide.
   * @return {Vector4} A reference to this vector.
   */
  divide(v) {
    this.x /= v.x;
    this.y /= v.y;
    this.z /= v.z;
    this.w /= v.w;
    return this;
  }
  /**
   * Divides this vector by the given scalar.
   *
   * @param {number} scalar - The scalar to divide.
   * @return {Vector4} A reference to this vector.
   */
  divideScalar(scalar) {
    return this.multiplyScalar(1 / scalar);
  }
  /**
   * Sets the x, y and z components of this
   * vector to the quaternion's axis and w to the angle.
   *
   * @param {Quaternion} q - The Quaternion to set.
   * @return {Vector4} A reference to this vector.
   */
  setAxisAngleFromQuaternion(q) {
    this.w = 2 * Math.acos(q.w);
    const s = Math.sqrt(1 - q.w * q.w);
    if (s < 1e-4) {
      this.x = 1;
      this.y = 0;
      this.z = 0;
    } else {
      this.x = q.x / s;
      this.y = q.y / s;
      this.z = q.z / s;
    }
    return this;
  }
  /**
   * Sets the x, y and z components of this
   * vector to the axis of rotation and w to the angle.
   *
   * @param {Matrix4} m - A 4x4 matrix of which the upper left 3x3 matrix is a pure rotation matrix.
   * @return {Vector4} A reference to this vector.
   */
  setAxisAngleFromRotationMatrix(m) {
    let angle, x, y, z;
    const epsilon = 0.01, epsilon2 = 0.1, te = m.elements, m11 = te[0], m12 = te[4], m13 = te[8], m21 = te[1], m22 = te[5], m23 = te[9], m31 = te[2], m32 = te[6], m33 = te[10];
    if (Math.abs(m12 - m21) < epsilon && Math.abs(m13 - m31) < epsilon && Math.abs(m23 - m32) < epsilon) {
      if (Math.abs(m12 + m21) < epsilon2 && Math.abs(m13 + m31) < epsilon2 && Math.abs(m23 + m32) < epsilon2 && Math.abs(m11 + m22 + m33 - 3) < epsilon2) {
        this.set(1, 0, 0, 0);
        return this;
      }
      angle = Math.PI;
      const xx = (m11 + 1) / 2;
      const yy = (m22 + 1) / 2;
      const zz = (m33 + 1) / 2;
      const xy = (m12 + m21) / 4;
      const xz = (m13 + m31) / 4;
      const yz = (m23 + m32) / 4;
      if (xx > yy && xx > zz) {
        if (xx < epsilon) {
          x = 0;
          y = 0.707106781;
          z = 0.707106781;
        } else {
          x = Math.sqrt(xx);
          y = xy / x;
          z = xz / x;
        }
      } else if (yy > zz) {
        if (yy < epsilon) {
          x = 0.707106781;
          y = 0;
          z = 0.707106781;
        } else {
          y = Math.sqrt(yy);
          x = xy / y;
          z = yz / y;
        }
      } else {
        if (zz < epsilon) {
          x = 0.707106781;
          y = 0.707106781;
          z = 0;
        } else {
          z = Math.sqrt(zz);
          x = xz / z;
          y = yz / z;
        }
      }
      this.set(x, y, z, angle);
      return this;
    }
    let s = Math.sqrt((m32 - m23) * (m32 - m23) + (m13 - m31) * (m13 - m31) + (m21 - m12) * (m21 - m12));
    if (Math.abs(s) < 1e-3) s = 1;
    this.x = (m32 - m23) / s;
    this.y = (m13 - m31) / s;
    this.z = (m21 - m12) / s;
    this.w = Math.acos((m11 + m22 + m33 - 1) / 2);
    return this;
  }
  /**
   * Sets the vector components to the position elements of the
   * given transformation matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Vector4} A reference to this vector.
   */
  setFromMatrixPosition(m) {
    const e = m.elements;
    this.x = e[12];
    this.y = e[13];
    this.z = e[14];
    this.w = e[15];
    return this;
  }
  /**
   * If this vector's x, y, z or w value is greater than the given vector's x, y, z or w
   * value, replace that value with the corresponding min value.
   *
   * @param {Vector4} v - The vector.
   * @return {Vector4} A reference to this vector.
   */
  min(v) {
    this.x = Math.min(this.x, v.x);
    this.y = Math.min(this.y, v.y);
    this.z = Math.min(this.z, v.z);
    this.w = Math.min(this.w, v.w);
    return this;
  }
  /**
   * If this vector's x, y, z or w value is less than the given vector's x, y, z or w
   * value, replace that value with the corresponding max value.
   *
   * @param {Vector4} v - The vector.
   * @return {Vector4} A reference to this vector.
   */
  max(v) {
    this.x = Math.max(this.x, v.x);
    this.y = Math.max(this.y, v.y);
    this.z = Math.max(this.z, v.z);
    this.w = Math.max(this.w, v.w);
    return this;
  }
  /**
   * If this vector's x, y, z or w value is greater than the max vector's x, y, z or w
   * value, it is replaced by the corresponding value.
   * If this vector's x, y, z or w value is less than the min vector's x, y, z or w value,
   * it is replaced by the corresponding value.
   *
   * @param {Vector4} min - The minimum x, y and z values.
   * @param {Vector4} max - The maximum x, y and z values in the desired range.
   * @return {Vector4} A reference to this vector.
   */
  clamp(min, max) {
    this.x = clamp(this.x, min.x, max.x);
    this.y = clamp(this.y, min.y, max.y);
    this.z = clamp(this.z, min.z, max.z);
    this.w = clamp(this.w, min.w, max.w);
    return this;
  }
  /**
   * If this vector's x, y, z or w values are greater than the max value, they are
   * replaced by the max value.
   * If this vector's x, y, z or w values are less than the min value, they are
   * replaced by the min value.
   *
   * @param {number} minVal - The minimum value the components will be clamped to.
   * @param {number} maxVal - The maximum value the components will be clamped to.
   * @return {Vector4} A reference to this vector.
   */
  clampScalar(minVal, maxVal) {
    this.x = clamp(this.x, minVal, maxVal);
    this.y = clamp(this.y, minVal, maxVal);
    this.z = clamp(this.z, minVal, maxVal);
    this.w = clamp(this.w, minVal, maxVal);
    return this;
  }
  /**
   * If this vector's length is greater than the max value, it is replaced by
   * the max value.
   * If this vector's length is less than the min value, it is replaced by the
   * min value.
   *
   * @param {number} min - The minimum value the vector length will be clamped to.
   * @param {number} max - The maximum value the vector length will be clamped to.
   * @return {Vector4} A reference to this vector.
   */
  clampLength(min, max) {
    const length2 = this.length();
    return this.divideScalar(length2 || 1).multiplyScalar(clamp(length2, min, max));
  }
  /**
   * The components of this vector are rounded down to the nearest integer value.
   *
   * @return {Vector4} A reference to this vector.
   */
  floor() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    this.z = Math.floor(this.z);
    this.w = Math.floor(this.w);
    return this;
  }
  /**
   * The components of this vector are rounded up to the nearest integer value.
   *
   * @return {Vector4} A reference to this vector.
   */
  ceil() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    this.z = Math.ceil(this.z);
    this.w = Math.ceil(this.w);
    return this;
  }
  /**
   * The components of this vector are rounded to the nearest integer value
   *
   * @return {Vector4} A reference to this vector.
   */
  round() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    this.z = Math.round(this.z);
    this.w = Math.round(this.w);
    return this;
  }
  /**
   * The components of this vector are rounded towards zero (up if negative,
   * down if positive) to an integer value.
   *
   * @return {Vector4} A reference to this vector.
   */
  roundToZero() {
    this.x = Math.trunc(this.x);
    this.y = Math.trunc(this.y);
    this.z = Math.trunc(this.z);
    this.w = Math.trunc(this.w);
    return this;
  }
  /**
   * Inverts this vector - i.e. sets x = -x, y = -y, z = -z, w = -w.
   *
   * @return {Vector4} A reference to this vector.
   */
  negate() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    this.w = -this.w;
    return this;
  }
  /**
   * Calculates the dot product of the given vector with this instance.
   *
   * @param {Vector4} v - The vector to compute the dot product with.
   * @return {number} The result of the dot product.
   */
  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
  }
  /**
   * Computes the square of the Euclidean length (straight-line length) from
   * (0, 0, 0, 0) to (x, y, z, w). If you are comparing the lengths of vectors, you should
   * compare the length squared instead as it is slightly more efficient to calculate.
   *
   * @return {number} The square length of this vector.
   */
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  /**
   * Computes the  Euclidean length (straight-line length) from (0, 0, 0, 0) to (x, y, z, w).
   *
   * @return {number} The length of this vector.
   */
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  /**
   * Computes the Manhattan length of this vector.
   *
   * @return {number} The length of this vector.
   */
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  }
  /**
   * Converts this vector to a unit vector - that is, sets it equal to a vector
   * with the same direction as this one, but with a vector length of `1`.
   *
   * @return {Vector4} A reference to this vector.
   */
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  /**
   * Sets this vector to a vector with the same direction as this one, but
   * with the specified length.
   *
   * @param {number} length - The new length of this vector.
   * @return {Vector4} A reference to this vector.
   */
  setLength(length2) {
    return this.normalize().multiplyScalar(length2);
  }
  /**
   * Linearly interpolates between the given vector and this instance, where
   * alpha is the percent distance along the line - alpha = 0 will be this
   * vector, and alpha = 1 will be the given one.
   *
   * @param {Vector4} v - The vector to interpolate towards.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector4} A reference to this vector.
   */
  lerp(v, alpha) {
    this.x += (v.x - this.x) * alpha;
    this.y += (v.y - this.y) * alpha;
    this.z += (v.z - this.z) * alpha;
    this.w += (v.w - this.w) * alpha;
    return this;
  }
  /**
   * Linearly interpolates between the given vectors, where alpha is the percent
   * distance along the line - alpha = 0 will be first vector, and alpha = 1 will
   * be the second one. The result is stored in this instance.
   *
   * @param {Vector4} v1 - The first vector.
   * @param {Vector4} v2 - The second vector.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector4} A reference to this vector.
   */
  lerpVectors(v1, v2, alpha) {
    this.x = v1.x + (v2.x - v1.x) * alpha;
    this.y = v1.y + (v2.y - v1.y) * alpha;
    this.z = v1.z + (v2.z - v1.z) * alpha;
    this.w = v1.w + (v2.w - v1.w) * alpha;
    return this;
  }
  /**
   * Returns `true` if this vector is equal with the given one.
   *
   * @param {Vector4} v - The vector to test for equality.
   * @return {boolean} Whether this vector is equal with the given one.
   */
  equals(v) {
    return v.x === this.x && v.y === this.y && v.z === this.z && v.w === this.w;
  }
  /**
   * Sets this vector's x value to be `array[ offset ]`, y value to be `array[ offset + 1 ]`,
   * z value to be `array[ offset + 2 ]`, w value to be `array[ offset + 3 ]`.
   *
   * @param {Array<number>} array - An array holding the vector component values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Vector4} A reference to this vector.
   */
  fromArray(array2, offset = 0) {
    this.x = array2[offset];
    this.y = array2[offset + 1];
    this.z = array2[offset + 2];
    this.w = array2[offset + 3];
    return this;
  }
  /**
   * Writes the components of this vector to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the vector components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The vector components.
   */
  toArray(array2 = [], offset = 0) {
    array2[offset] = this.x;
    array2[offset + 1] = this.y;
    array2[offset + 2] = this.z;
    array2[offset + 3] = this.w;
    return array2;
  }
  /**
   * Sets the components of this vector from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding vector data.
   * @param {number} index - The index into the attribute.
   * @return {Vector4} A reference to this vector.
   */
  fromBufferAttribute(attribute2, index) {
    this.x = attribute2.getX(index);
    this.y = attribute2.getY(index);
    this.z = attribute2.getZ(index);
    this.w = attribute2.getW(index);
    return this;
  }
  /**
   * Sets each component of this vector to a pseudo-random value between `0` and
   * `1`, excluding `1`.
   *
   * @return {Vector4} A reference to this vector.
   */
  random() {
    this.x = Math.random();
    this.y = Math.random();
    this.z = Math.random();
    this.w = Math.random();
    return this;
  }
  *[Symbol.iterator]() {
    yield this.x;
    yield this.y;
    yield this.z;
    yield this.w;
  }
};
_Vector4.prototype.isVector4 = true;
var Vector4 = _Vector4;
var RenderTarget = class extends EventDispatcher {
  /**
   * Render target options.
   *
   * @typedef {Object} RenderTarget~Options
   * @property {boolean} [generateMipmaps=false] - Whether to generate mipmaps or not.
   * @property {number} [magFilter=LinearFilter] - The mag filter.
   * @property {number} [minFilter=LinearFilter] - The min filter.
   * @property {number} [format=RGBAFormat] - The texture format.
   * @property {number} [type=UnsignedByteType] - The texture type.
   * @property {?string} [internalFormat=null] - The texture's internal format.
   * @property {number} [wrapS=ClampToEdgeWrapping] - The texture's uv wrapping mode.
   * @property {number} [wrapT=ClampToEdgeWrapping] - The texture's uv wrapping mode.
   * @property {number} [anisotropy=1] - The texture's anisotropy value.
   * @property {string} [colorSpace=NoColorSpace] - The texture's color space.
   * @property {boolean} [depthBuffer=true] - Whether to allocate a depth buffer or not.
   * @property {boolean} [stencilBuffer=false] - Whether to allocate a stencil buffer or not.
   * @property {boolean} [resolveDepthBuffer=true] - Whether to resolve the depth buffer or not.
   * @property {boolean} [resolveStencilBuffer=true] - Whether  to resolve the stencil buffer or not.
   * @property {?Texture} [depthTexture=null] - Reference to a depth texture.
   * @property {number} [samples=0] - The MSAA samples count.
   * @property {number} [count=1] - Defines the number of color attachments . Must be at least `1`.
   * @property {number} [depth=1] - The texture depth.
   * @property {boolean} [multiview=false] - Whether this target is used for multiview rendering (WebGL OVR_multiview2 extension).
   * @property {boolean} [useArrayDepthTexture=false] - Whether to create the depth texture as an array texture for per-layer depth testing. This is separate from multiview so layered render targets can use array depth without the multiview extension.
   */
  /**
   * Constructs a new render target.
   *
   * @param {number} [width=1] - The width of the render target.
   * @param {number} [height=1] - The height of the render target.
   * @param {RenderTarget~Options} [options] - The configuration object.
   */
  constructor(width = 1, height = 1, options = {}) {
    super();
    options = Object.assign({
      generateMipmaps: false,
      internalFormat: null,
      minFilter: LinearFilter,
      depthBuffer: true,
      stencilBuffer: false,
      resolveDepthBuffer: true,
      resolveStencilBuffer: true,
      depthTexture: null,
      samples: 0,
      count: 1,
      depth: 1,
      multiview: false,
      useArrayDepthTexture: false
    }, options);
    this.isRenderTarget = true;
    this.width = width;
    this.height = height;
    this.depth = options.depth;
    this.scissor = new Vector4(0, 0, width, height);
    this.scissorTest = false;
    this.viewport = new Vector4(0, 0, width, height);
    this.textures = [];
    const image = { width, height, depth: options.depth };
    const texture2 = new Texture(image);
    const count = options.count;
    for (let i = 0; i < count; i++) {
      this.textures[i] = texture2.clone();
      this.textures[i].isRenderTargetTexture = true;
      this.textures[i].renderTarget = this;
    }
    this._setTextureOptions(options);
    this.depthBuffer = options.depthBuffer;
    this.stencilBuffer = options.stencilBuffer;
    this.resolveDepthBuffer = options.resolveDepthBuffer;
    this.resolveStencilBuffer = options.resolveStencilBuffer;
    this._depthTexture = null;
    this.depthTexture = options.depthTexture;
    this.samples = options.samples;
    this.multiview = options.multiview;
    this.useArrayDepthTexture = options.useArrayDepthTexture;
  }
  _setTextureOptions(options = {}) {
    const values = {
      minFilter: LinearFilter,
      generateMipmaps: false,
      flipY: false,
      internalFormat: null
    };
    if (options.mapping !== void 0) values.mapping = options.mapping;
    if (options.wrapS !== void 0) values.wrapS = options.wrapS;
    if (options.wrapT !== void 0) values.wrapT = options.wrapT;
    if (options.wrapR !== void 0) values.wrapR = options.wrapR;
    if (options.magFilter !== void 0) values.magFilter = options.magFilter;
    if (options.minFilter !== void 0) values.minFilter = options.minFilter;
    if (options.format !== void 0) values.format = options.format;
    if (options.type !== void 0) values.type = options.type;
    if (options.anisotropy !== void 0) values.anisotropy = options.anisotropy;
    if (options.colorSpace !== void 0) values.colorSpace = options.colorSpace;
    if (options.flipY !== void 0) values.flipY = options.flipY;
    if (options.generateMipmaps !== void 0) values.generateMipmaps = options.generateMipmaps;
    if (options.internalFormat !== void 0) values.internalFormat = options.internalFormat;
    for (let i = 0; i < this.textures.length; i++) {
      const texture2 = this.textures[i];
      texture2.setValues(values);
    }
  }
  /**
   * The texture representing the default color attachment.
   *
   * @type {Texture}
   */
  get texture() {
    return this.textures[0];
  }
  set texture(value) {
    this.textures[0] = value;
  }
  set depthTexture(current) {
    if (this._depthTexture !== null) this._depthTexture.renderTarget = null;
    if (current !== null) current.renderTarget = this;
    this._depthTexture = current;
  }
  /**
   * Instead of saving the depth in a renderbuffer, a texture
   * can be used instead which is useful for further processing
   * e.g. in context of post-processing.
   *
   * @type {?DepthTexture}
   * @default null
   */
  get depthTexture() {
    return this._depthTexture;
  }
  /**
   * Sets the size of this render target.
   *
   * @param {number} width - The width.
   * @param {number} height - The height.
   * @param {number} [depth=1] - The depth.
   */
  setSize(width, height, depth2 = 1) {
    if (this.width !== width || this.height !== height || this.depth !== depth2) {
      this.width = width;
      this.height = height;
      this.depth = depth2;
      for (let i = 0, il = this.textures.length; i < il; i++) {
        this.textures[i].image.width = width;
        this.textures[i].image.height = height;
        this.textures[i].image.depth = depth2;
        if (this.textures[i].isData3DTexture !== true) {
          this.textures[i].isArrayTexture = this.textures[i].image.depth > 1;
        }
      }
      this.dispose();
    }
    this.viewport.set(0, 0, width, height);
    this.scissor.set(0, 0, width, height);
  }
  /**
   * Returns a new render target with copied values from this instance.
   *
   * @return {RenderTarget} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the settings of the given render target. This is a structural copy so
   * no resources are shared between render targets after the copy. That includes
   * all MRT textures and the depth texture.
   *
   * @param {RenderTarget} source - The render target to copy.
   * @return {RenderTarget} A reference to this instance.
   */
  copy(source) {
    this.width = source.width;
    this.height = source.height;
    this.depth = source.depth;
    this.scissor.copy(source.scissor);
    this.scissorTest = source.scissorTest;
    this.viewport.copy(source.viewport);
    this.textures.length = 0;
    for (let i = 0, il = source.textures.length; i < il; i++) {
      this.textures[i] = source.textures[i].clone();
      this.textures[i].isRenderTargetTexture = true;
      this.textures[i].renderTarget = this;
      const image = Object.assign({}, source.textures[i].image);
      this.textures[i].source = new Source(image);
    }
    this.depthBuffer = source.depthBuffer;
    this.stencilBuffer = source.stencilBuffer;
    this.resolveDepthBuffer = source.resolveDepthBuffer;
    this.resolveStencilBuffer = source.resolveStencilBuffer;
    if (source.depthTexture !== null) this.depthTexture = source.depthTexture.clone();
    this.samples = source.samples;
    this.multiview = source.multiview;
    this.useArrayDepthTexture = source.useArrayDepthTexture;
    return this;
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever this instance is no longer used in your app.
   *
   * @fires RenderTarget#dispose
   */
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
};
var _Matrix4 = class _Matrix4 {
  /**
   * Constructs a new 4x4 matrix. The arguments are supposed to be
   * in row-major order. If no arguments are provided, the constructor
   * initializes the matrix as an identity matrix.
   *
   * @param {number} [n11] - 1-1 matrix element.
   * @param {number} [n12] - 1-2 matrix element.
   * @param {number} [n13] - 1-3 matrix element.
   * @param {number} [n14] - 1-4 matrix element.
   * @param {number} [n21] - 2-1 matrix element.
   * @param {number} [n22] - 2-2 matrix element.
   * @param {number} [n23] - 2-3 matrix element.
   * @param {number} [n24] - 2-4 matrix element.
   * @param {number} [n31] - 3-1 matrix element.
   * @param {number} [n32] - 3-2 matrix element.
   * @param {number} [n33] - 3-3 matrix element.
   * @param {number} [n34] - 3-4 matrix element.
   * @param {number} [n41] - 4-1 matrix element.
   * @param {number} [n42] - 4-2 matrix element.
   * @param {number} [n43] - 4-3 matrix element.
   * @param {number} [n44] - 4-4 matrix element.
   */
  constructor(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
    this.elements = [
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ];
    if (n11 !== void 0) {
      this.set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44);
    }
  }
  /**
   * Sets the elements of the matrix.The arguments are supposed to be
   * in row-major order.
   *
   * @param {number} [n11] - 1-1 matrix element.
   * @param {number} [n12] - 1-2 matrix element.
   * @param {number} [n13] - 1-3 matrix element.
   * @param {number} [n14] - 1-4 matrix element.
   * @param {number} [n21] - 2-1 matrix element.
   * @param {number} [n22] - 2-2 matrix element.
   * @param {number} [n23] - 2-3 matrix element.
   * @param {number} [n24] - 2-4 matrix element.
   * @param {number} [n31] - 3-1 matrix element.
   * @param {number} [n32] - 3-2 matrix element.
   * @param {number} [n33] - 3-3 matrix element.
   * @param {number} [n34] - 3-4 matrix element.
   * @param {number} [n41] - 4-1 matrix element.
   * @param {number} [n42] - 4-2 matrix element.
   * @param {number} [n43] - 4-3 matrix element.
   * @param {number} [n44] - 4-4 matrix element.
   * @return {Matrix4} A reference to this matrix.
   */
  set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
    const te = this.elements;
    te[0] = n11;
    te[4] = n12;
    te[8] = n13;
    te[12] = n14;
    te[1] = n21;
    te[5] = n22;
    te[9] = n23;
    te[13] = n24;
    te[2] = n31;
    te[6] = n32;
    te[10] = n33;
    te[14] = n34;
    te[3] = n41;
    te[7] = n42;
    te[11] = n43;
    te[15] = n44;
    return this;
  }
  /**
   * Sets this matrix to the 4x4 identity matrix.
   *
   * @return {Matrix4} A reference to this matrix.
   */
  identity() {
    this.set(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    );
    return this;
  }
  /**
   * Returns a matrix with copied values from this instance.
   *
   * @return {Matrix4} A clone of this instance.
   */
  clone() {
    return new _Matrix4().fromArray(this.elements);
  }
  /**
   * Copies the values of the given matrix to this instance.
   *
   * @param {Matrix4} m - The matrix to copy.
   * @return {Matrix4} A reference to this matrix.
   */
  copy(m) {
    const te = this.elements;
    const me = m.elements;
    te[0] = me[0];
    te[1] = me[1];
    te[2] = me[2];
    te[3] = me[3];
    te[4] = me[4];
    te[5] = me[5];
    te[6] = me[6];
    te[7] = me[7];
    te[8] = me[8];
    te[9] = me[9];
    te[10] = me[10];
    te[11] = me[11];
    te[12] = me[12];
    te[13] = me[13];
    te[14] = me[14];
    te[15] = me[15];
    return this;
  }
  /**
   * Copies the translation component of the given matrix
   * into this matrix's translation component.
   *
   * @param {Matrix4} m - The matrix to copy the translation component.
   * @return {Matrix4} A reference to this matrix.
   */
  copyPosition(m) {
    const te = this.elements, me = m.elements;
    te[12] = me[12];
    te[13] = me[13];
    te[14] = me[14];
    return this;
  }
  /**
   * Set the upper 3x3 elements of this matrix to the values of given 3x3 matrix.
   *
   * @param {Matrix3} m - The 3x3 matrix.
   * @return {Matrix4} A reference to this matrix.
   */
  setFromMatrix3(m) {
    const me = m.elements;
    this.set(
      me[0],
      me[3],
      me[6],
      0,
      me[1],
      me[4],
      me[7],
      0,
      me[2],
      me[5],
      me[8],
      0,
      0,
      0,
      0,
      1
    );
    return this;
  }
  /**
   * Extracts the basis of this matrix into the three axis vectors provided.
   *
   * @param {Vector3} xAxis - The basis's x axis.
   * @param {Vector3} yAxis - The basis's y axis.
   * @param {Vector3} zAxis - The basis's z axis.
   * @return {Matrix4} A reference to this matrix.
   */
  extractBasis(xAxis, yAxis, zAxis) {
    if (this.determinantAffine() === 0) {
      xAxis.set(1, 0, 0);
      yAxis.set(0, 1, 0);
      zAxis.set(0, 0, 1);
      return this;
    }
    xAxis.setFromMatrixColumn(this, 0);
    yAxis.setFromMatrixColumn(this, 1);
    zAxis.setFromMatrixColumn(this, 2);
    return this;
  }
  /**
   * Sets the given basis vectors to this matrix.
   *
   * @param {Vector3} xAxis - The basis's x axis.
   * @param {Vector3} yAxis - The basis's y axis.
   * @param {Vector3} zAxis - The basis's z axis.
   * @return {Matrix4} A reference to this matrix.
   */
  makeBasis(xAxis, yAxis, zAxis) {
    this.set(
      xAxis.x,
      yAxis.x,
      zAxis.x,
      0,
      xAxis.y,
      yAxis.y,
      zAxis.y,
      0,
      xAxis.z,
      yAxis.z,
      zAxis.z,
      0,
      0,
      0,
      0,
      1
    );
    return this;
  }
  /**
   * Extracts the rotation component of the given matrix
   * into this matrix's rotation component.
   *
   * Note: This method does not support reflection matrices.
   *
   * @param {Matrix4} m - The matrix.
   * @return {Matrix4} A reference to this matrix.
   */
  extractRotation(m) {
    if (m.determinantAffine() === 0) {
      return this.identity();
    }
    const te = this.elements;
    const me = m.elements;
    const scaleX = 1 / _v1$7.setFromMatrixColumn(m, 0).length();
    const scaleY = 1 / _v1$7.setFromMatrixColumn(m, 1).length();
    const scaleZ = 1 / _v1$7.setFromMatrixColumn(m, 2).length();
    te[0] = me[0] * scaleX;
    te[1] = me[1] * scaleX;
    te[2] = me[2] * scaleX;
    te[3] = 0;
    te[4] = me[4] * scaleY;
    te[5] = me[5] * scaleY;
    te[6] = me[6] * scaleY;
    te[7] = 0;
    te[8] = me[8] * scaleZ;
    te[9] = me[9] * scaleZ;
    te[10] = me[10] * scaleZ;
    te[11] = 0;
    te[12] = 0;
    te[13] = 0;
    te[14] = 0;
    te[15] = 1;
    return this;
  }
  /**
   * Sets the rotation component (the upper left 3x3 matrix) of this matrix to
   * the rotation specified by the given Euler angles. The rest of
   * the matrix is set to the identity. Depending on the {@link Euler#order},
   * there are six possible outcomes. See [this page](https://en.wikipedia.org/wiki/Euler_angles#Rotation_matrix)
   * for a complete list.
   *
   * @param {Euler} euler - The Euler angles.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationFromEuler(euler) {
    const te = this.elements;
    const x = euler.x, y = euler.y, z = euler.z;
    const a = Math.cos(x), b = Math.sin(x);
    const c = Math.cos(y), d = Math.sin(y);
    const e = Math.cos(z), f = Math.sin(z);
    if (euler.order === "XYZ") {
      const ae = a * e, af = a * f, be = b * e, bf = b * f;
      te[0] = c * e;
      te[4] = -c * f;
      te[8] = d;
      te[1] = af + be * d;
      te[5] = ae - bf * d;
      te[9] = -b * c;
      te[2] = bf - ae * d;
      te[6] = be + af * d;
      te[10] = a * c;
    } else if (euler.order === "YXZ") {
      const ce = c * e, cf = c * f, de = d * e, df = d * f;
      te[0] = ce + df * b;
      te[4] = de * b - cf;
      te[8] = a * d;
      te[1] = a * f;
      te[5] = a * e;
      te[9] = -b;
      te[2] = cf * b - de;
      te[6] = df + ce * b;
      te[10] = a * c;
    } else if (euler.order === "ZXY") {
      const ce = c * e, cf = c * f, de = d * e, df = d * f;
      te[0] = ce - df * b;
      te[4] = -a * f;
      te[8] = de + cf * b;
      te[1] = cf + de * b;
      te[5] = a * e;
      te[9] = df - ce * b;
      te[2] = -a * d;
      te[6] = b;
      te[10] = a * c;
    } else if (euler.order === "ZYX") {
      const ae = a * e, af = a * f, be = b * e, bf = b * f;
      te[0] = c * e;
      te[4] = be * d - af;
      te[8] = ae * d + bf;
      te[1] = c * f;
      te[5] = bf * d + ae;
      te[9] = af * d - be;
      te[2] = -d;
      te[6] = b * c;
      te[10] = a * c;
    } else if (euler.order === "YZX") {
      const ac = a * c, ad = a * d, bc = b * c, bd = b * d;
      te[0] = c * e;
      te[4] = bd - ac * f;
      te[8] = bc * f + ad;
      te[1] = f;
      te[5] = a * e;
      te[9] = -b * e;
      te[2] = -d * e;
      te[6] = ad * f + bc;
      te[10] = ac - bd * f;
    } else if (euler.order === "XZY") {
      const ac = a * c, ad = a * d, bc = b * c, bd = b * d;
      te[0] = c * e;
      te[4] = -f;
      te[8] = d * e;
      te[1] = ac * f + bd;
      te[5] = a * e;
      te[9] = ad * f - bc;
      te[2] = bc * f - ad;
      te[6] = b * e;
      te[10] = bd * f + ac;
    }
    te[3] = 0;
    te[7] = 0;
    te[11] = 0;
    te[12] = 0;
    te[13] = 0;
    te[14] = 0;
    te[15] = 1;
    return this;
  }
  /**
   * Sets the rotation component of this matrix to the rotation specified by
   * the given Quaternion as outlined [here](https://en.wikipedia.org/wiki/Rotation_matrix#Quaternion)
   * The rest of the matrix is set to the identity.
   *
   * @param {Quaternion} q - The Quaternion.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationFromQuaternion(q) {
    return this.compose(_zero, q, _one);
  }
  /**
   * Sets the rotation component of the transformation matrix, looking from `eye` towards
   * `target`, and oriented by the up-direction.
   *
   * @param {Vector3} eye - The eye vector.
   * @param {Vector3} target - The target vector.
   * @param {Vector3} up - The up vector.
   * @return {Matrix4} A reference to this matrix.
   */
  lookAt(eye, target, up) {
    const te = this.elements;
    _z.subVectors(eye, target);
    if (_z.lengthSq() === 0) {
      _z.z = 1;
    }
    _z.normalize();
    _x.crossVectors(up, _z);
    if (_x.lengthSq() === 0) {
      if (Math.abs(up.z) === 1) {
        _z.x += 1e-4;
      } else {
        _z.z += 1e-4;
      }
      _z.normalize();
      _x.crossVectors(up, _z);
    }
    _x.normalize();
    _y.crossVectors(_z, _x);
    te[0] = _x.x;
    te[4] = _y.x;
    te[8] = _z.x;
    te[1] = _x.y;
    te[5] = _y.y;
    te[9] = _z.y;
    te[2] = _x.z;
    te[6] = _y.z;
    te[10] = _z.z;
    return this;
  }
  /**
   * Post-multiplies this matrix by the given 4x4 matrix.
   *
   * @param {Matrix4} m - The matrix to multiply with.
   * @return {Matrix4} A reference to this matrix.
   */
  multiply(m) {
    return this.multiplyMatrices(this, m);
  }
  /**
   * Pre-multiplies this matrix by the given 4x4 matrix.
   *
   * @param {Matrix4} m - The matrix to multiply with.
   * @return {Matrix4} A reference to this matrix.
   */
  premultiply(m) {
    return this.multiplyMatrices(m, this);
  }
  /**
   * Multiples the given 4x4 matrices and stores the result
   * in this matrix.
   *
   * @param {Matrix4} a - The first matrix.
   * @param {Matrix4} b - The second matrix.
   * @return {Matrix4} A reference to this matrix.
   */
  multiplyMatrices(a, b) {
    const ae = a.elements;
    const be = b.elements;
    const te = this.elements;
    const a11 = ae[0], a12 = ae[4], a13 = ae[8], a14 = ae[12];
    const a21 = ae[1], a22 = ae[5], a23 = ae[9], a24 = ae[13];
    const a31 = ae[2], a32 = ae[6], a33 = ae[10], a34 = ae[14];
    const a41 = ae[3], a42 = ae[7], a43 = ae[11], a44 = ae[15];
    const b11 = be[0], b12 = be[4], b13 = be[8], b14 = be[12];
    const b21 = be[1], b22 = be[5], b23 = be[9], b24 = be[13];
    const b31 = be[2], b32 = be[6], b33 = be[10], b34 = be[14];
    const b41 = be[3], b42 = be[7], b43 = be[11], b44 = be[15];
    te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
    te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
    te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
    te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
    te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
    te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
    te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
    te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
    te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
    te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
    te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
    te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
    te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
    te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
    te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
    te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
    return this;
  }
  /**
   * Multiplies every component of the matrix by the given scalar.
   *
   * @param {number} s - The scalar.
   * @return {Matrix4} A reference to this matrix.
   */
  multiplyScalar(s) {
    const te = this.elements;
    te[0] *= s;
    te[4] *= s;
    te[8] *= s;
    te[12] *= s;
    te[1] *= s;
    te[5] *= s;
    te[9] *= s;
    te[13] *= s;
    te[2] *= s;
    te[6] *= s;
    te[10] *= s;
    te[14] *= s;
    te[3] *= s;
    te[7] *= s;
    te[11] *= s;
    te[15] *= s;
    return this;
  }
  /**
   * Computes and returns the determinant of this matrix.
   *
   * Based on the method outlined [here](http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.html).
   *
   * @return {number} The determinant.
   */
  determinant() {
    const te = this.elements;
    const n11 = te[0], n12 = te[4], n13 = te[8], n14 = te[12];
    const n21 = te[1], n22 = te[5], n23 = te[9], n24 = te[13];
    const n31 = te[2], n32 = te[6], n33 = te[10], n34 = te[14];
    const n41 = te[3], n42 = te[7], n43 = te[11], n44 = te[15];
    const t11 = n23 * n34 - n24 * n33;
    const t12 = n22 * n34 - n24 * n32;
    const t13 = n22 * n33 - n23 * n32;
    const t21 = n21 * n34 - n24 * n31;
    const t22 = n21 * n33 - n23 * n31;
    const t23 = n21 * n32 - n22 * n31;
    return n11 * (n42 * t11 - n43 * t12 + n44 * t13) - n12 * (n41 * t11 - n43 * t21 + n44 * t22) + n13 * (n41 * t12 - n42 * t21 + n44 * t23) - n14 * (n41 * t13 - n42 * t22 + n43 * t23);
  }
  /**
   * Computes and returns the determinant of the 4x4 matrix, but assumes the
   * matrix is affine, saving some computations.
   *
   * For affine matrices (like an object's world matrix), this value equals the
   * full 4x4 {@link Matrix4#determinant} but is cheaper to compute.
   *
   * Assumes the bottom row is [0, 0, 0, 1].
   *
   * @return {number} The determinant of the matrix.
   */
  determinantAffine() {
    const te = this.elements;
    const n11 = te[0], n12 = te[4], n13 = te[8];
    const n21 = te[1], n22 = te[5], n23 = te[9];
    const n31 = te[2], n32 = te[6], n33 = te[10];
    return n11 * (n22 * n33 - n23 * n32) - n12 * (n21 * n33 - n23 * n31) + n13 * (n21 * n32 - n22 * n31);
  }
  /**
   * Transposes this matrix in place.
   *
   * @return {Matrix4} A reference to this matrix.
   */
  transpose() {
    const te = this.elements;
    let tmp;
    tmp = te[1];
    te[1] = te[4];
    te[4] = tmp;
    tmp = te[2];
    te[2] = te[8];
    te[8] = tmp;
    tmp = te[6];
    te[6] = te[9];
    te[9] = tmp;
    tmp = te[3];
    te[3] = te[12];
    te[12] = tmp;
    tmp = te[7];
    te[7] = te[13];
    te[13] = tmp;
    tmp = te[11];
    te[11] = te[14];
    te[14] = tmp;
    return this;
  }
  /**
   * Sets the position component for this matrix from the given vector,
   * without affecting the rest of the matrix.
   *
   * @param {number|Vector3} x - The x component of the vector or alternatively the vector object.
   * @param {number} y - The y component of the vector.
   * @param {number} z - The z component of the vector.
   * @return {Matrix4} A reference to this matrix.
   */
  setPosition(x, y, z) {
    const te = this.elements;
    if (x.isVector3) {
      te[12] = x.x;
      te[13] = x.y;
      te[14] = x.z;
    } else {
      te[12] = x;
      te[13] = y;
      te[14] = z;
    }
    return this;
  }
  /**
   * Inverts this matrix, using the [analytic method](https://en.wikipedia.org/wiki/Invertible_matrix#Analytic_solution).
   * You can not invert with a determinant of zero. If you attempt this, the method produces
   * a zero matrix instead.
   *
   * @return {Matrix4} A reference to this matrix.
   */
  invert() {
    const te = this.elements, n11 = te[0], n21 = te[1], n31 = te[2], n41 = te[3], n12 = te[4], n22 = te[5], n32 = te[6], n42 = te[7], n13 = te[8], n23 = te[9], n33 = te[10], n43 = te[11], n14 = te[12], n24 = te[13], n34 = te[14], n44 = te[15], t1 = n11 * n22 - n21 * n12, t2 = n11 * n32 - n31 * n12, t3 = n11 * n42 - n41 * n12, t4 = n21 * n32 - n31 * n22, t5 = n21 * n42 - n41 * n22, t6 = n31 * n42 - n41 * n32, t7 = n13 * n24 - n23 * n14, t8 = n13 * n34 - n33 * n14, t9 = n13 * n44 - n43 * n14, t10 = n23 * n34 - n33 * n24, t11 = n23 * n44 - n43 * n24, t12 = n33 * n44 - n43 * n34;
    const det2 = t1 * t12 - t2 * t11 + t3 * t10 + t4 * t9 - t5 * t8 + t6 * t7;
    if (det2 === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const detInv = 1 / det2;
    te[0] = (n22 * t12 - n32 * t11 + n42 * t10) * detInv;
    te[1] = (n31 * t11 - n21 * t12 - n41 * t10) * detInv;
    te[2] = (n24 * t6 - n34 * t5 + n44 * t4) * detInv;
    te[3] = (n33 * t5 - n23 * t6 - n43 * t4) * detInv;
    te[4] = (n32 * t9 - n12 * t12 - n42 * t8) * detInv;
    te[5] = (n11 * t12 - n31 * t9 + n41 * t8) * detInv;
    te[6] = (n34 * t3 - n14 * t6 - n44 * t2) * detInv;
    te[7] = (n13 * t6 - n33 * t3 + n43 * t2) * detInv;
    te[8] = (n12 * t11 - n22 * t9 + n42 * t7) * detInv;
    te[9] = (n21 * t9 - n11 * t11 - n41 * t7) * detInv;
    te[10] = (n14 * t5 - n24 * t3 + n44 * t1) * detInv;
    te[11] = (n23 * t3 - n13 * t5 - n43 * t1) * detInv;
    te[12] = (n22 * t8 - n12 * t10 - n32 * t7) * detInv;
    te[13] = (n11 * t10 - n21 * t8 + n31 * t7) * detInv;
    te[14] = (n24 * t2 - n14 * t4 - n34 * t1) * detInv;
    te[15] = (n13 * t4 - n23 * t2 + n33 * t1) * detInv;
    return this;
  }
  /**
   * Multiplies the columns of this matrix by the given vector.
   *
   * @param {Vector3} v - The scale vector.
   * @return {Matrix4} A reference to this matrix.
   */
  scale(v) {
    const te = this.elements;
    const x = v.x, y = v.y, z = v.z;
    te[0] *= x;
    te[4] *= y;
    te[8] *= z;
    te[1] *= x;
    te[5] *= y;
    te[9] *= z;
    te[2] *= x;
    te[6] *= y;
    te[10] *= z;
    te[3] *= x;
    te[7] *= y;
    te[11] *= z;
    return this;
  }
  /**
   * Gets the maximum scale value of the three axes.
   *
   * @return {number} The maximum scale.
   */
  getMaxScaleOnAxis() {
    const te = this.elements;
    const scaleXSq = te[0] * te[0] + te[1] * te[1] + te[2] * te[2];
    const scaleYSq = te[4] * te[4] + te[5] * te[5] + te[6] * te[6];
    const scaleZSq = te[8] * te[8] + te[9] * te[9] + te[10] * te[10];
    return Math.sqrt(Math.max(scaleXSq, scaleYSq, scaleZSq));
  }
  /**
   * Sets this matrix as a translation transform from the given vector.
   *
   * @param {number|Vector3} x - The amount to translate in the X axis or alternatively a translation vector.
   * @param {number} y - The amount to translate in the Y axis.
   * @param {number} z - The amount to translate in the z axis.
   * @return {Matrix4} A reference to this matrix.
   */
  makeTranslation(x, y, z) {
    if (x.isVector3) {
      this.set(
        1,
        0,
        0,
        x.x,
        0,
        1,
        0,
        x.y,
        0,
        0,
        1,
        x.z,
        0,
        0,
        0,
        1
      );
    } else {
      this.set(
        1,
        0,
        0,
        x,
        0,
        1,
        0,
        y,
        0,
        0,
        1,
        z,
        0,
        0,
        0,
        1
      );
    }
    return this;
  }
  /**
   * Sets this matrix as a rotational transformation around the X axis by
   * the given angle.
   *
   * @param {number} theta - The rotation in radians.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationX(theta) {
    const c = Math.cos(theta), s = Math.sin(theta);
    this.set(
      1,
      0,
      0,
      0,
      0,
      c,
      -s,
      0,
      0,
      s,
      c,
      0,
      0,
      0,
      0,
      1
    );
    return this;
  }
  /**
   * Sets this matrix as a rotational transformation around the Y axis by
   * the given angle.
   *
   * @param {number} theta - The rotation in radians.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationY(theta) {
    const c = Math.cos(theta), s = Math.sin(theta);
    this.set(
      c,
      0,
      s,
      0,
      0,
      1,
      0,
      0,
      -s,
      0,
      c,
      0,
      0,
      0,
      0,
      1
    );
    return this;
  }
  /**
   * Sets this matrix as a rotational transformation around the Z axis by
   * the given angle.
   *
   * @param {number} theta - The rotation in radians.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationZ(theta) {
    const c = Math.cos(theta), s = Math.sin(theta);
    this.set(
      c,
      -s,
      0,
      0,
      s,
      c,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    );
    return this;
  }
  /**
   * Sets this matrix as a rotational transformation around the given axis by
   * the given angle.
   *
   * This is a somewhat controversial but mathematically sound alternative to
   * rotating via Quaternions. See the discussion [here](https://www.gamedev.net/articles/programming/math-and-physics/do-we-really-need-quaternions-r1199).
   *
   * @param {Vector3} axis - The normalized rotation axis.
   * @param {number} angle - The rotation in radians.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationAxis(axis, angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const t = 1 - c;
    const x = axis.x, y = axis.y, z = axis.z;
    const tx = t * x, ty = t * y;
    this.set(
      tx * x + c,
      tx * y - s * z,
      tx * z + s * y,
      0,
      tx * y + s * z,
      ty * y + c,
      ty * z - s * x,
      0,
      tx * z - s * y,
      ty * z + s * x,
      t * z * z + c,
      0,
      0,
      0,
      0,
      1
    );
    return this;
  }
  /**
   * Sets this matrix as a scale transformation.
   *
   * @param {number} x - The amount to scale in the X axis.
   * @param {number} y - The amount to scale in the Y axis.
   * @param {number} z - The amount to scale in the Z axis.
   * @return {Matrix4} A reference to this matrix.
   */
  makeScale(x, y, z) {
    this.set(
      x,
      0,
      0,
      0,
      0,
      y,
      0,
      0,
      0,
      0,
      z,
      0,
      0,
      0,
      0,
      1
    );
    return this;
  }
  /**
   * Sets this matrix as a shear transformation.
   *
   * @param {number} xy - The amount to shear X by Y.
   * @param {number} xz - The amount to shear X by Z.
   * @param {number} yx - The amount to shear Y by X.
   * @param {number} yz - The amount to shear Y by Z.
   * @param {number} zx - The amount to shear Z by X.
   * @param {number} zy - The amount to shear Z by Y.
   * @return {Matrix4} A reference to this matrix.
   */
  makeShear(xy, xz, yx, yz, zx, zy) {
    this.set(
      1,
      yx,
      zx,
      0,
      xy,
      1,
      zy,
      0,
      xz,
      yz,
      1,
      0,
      0,
      0,
      0,
      1
    );
    return this;
  }
  /**
   * Sets this matrix to the transformation composed of the given position,
   * rotation (Quaternion) and scale.
   *
   * @param {Vector3} position - The position vector.
   * @param {Quaternion} quaternion - The rotation as a Quaternion.
   * @param {Vector3} scale - The scale vector.
   * @return {Matrix4} A reference to this matrix.
   */
  compose(position, quaternion, scale) {
    const te = this.elements;
    const x = quaternion._x, y = quaternion._y, z = quaternion._z, w = quaternion._w;
    const x2 = x + x, y2 = y + y, z2 = z + z;
    const xx = x * x2, xy = x * y2, xz = x * z2;
    const yy = y * y2, yz = y * z2, zz = z * z2;
    const wx = w * x2, wy = w * y2, wz = w * z2;
    const sx = scale.x, sy = scale.y, sz = scale.z;
    te[0] = (1 - (yy + zz)) * sx;
    te[1] = (xy + wz) * sx;
    te[2] = (xz - wy) * sx;
    te[3] = 0;
    te[4] = (xy - wz) * sy;
    te[5] = (1 - (xx + zz)) * sy;
    te[6] = (yz + wx) * sy;
    te[7] = 0;
    te[8] = (xz + wy) * sz;
    te[9] = (yz - wx) * sz;
    te[10] = (1 - (xx + yy)) * sz;
    te[11] = 0;
    te[12] = position.x;
    te[13] = position.y;
    te[14] = position.z;
    te[15] = 1;
    return this;
  }
  /**
   * Decomposes this matrix into its position, rotation and scale components
   * and provides the result in the given objects.
   *
   * Note: Not all matrices are decomposable in this way. For example, if an
   * object has a non-uniformly scaled parent, then the object's world matrix
   * may not be decomposable, and this method may not be appropriate.
   *
   * @param {Vector3} position - The position vector.
   * @param {Quaternion} quaternion - The rotation as a Quaternion.
   * @param {Vector3} scale - The scale vector.
   * @return {Matrix4} A reference to this matrix.
   */
  decompose(position, quaternion, scale) {
    const te = this.elements;
    position.x = te[12];
    position.y = te[13];
    position.z = te[14];
    const det2 = this.determinantAffine();
    if (det2 === 0) {
      scale.set(1, 1, 1);
      quaternion.identity();
      return this;
    }
    let sx = _v1$7.set(te[0], te[1], te[2]).length();
    const sy = _v1$7.set(te[4], te[5], te[6]).length();
    const sz = _v1$7.set(te[8], te[9], te[10]).length();
    if (det2 < 0) sx = -sx;
    _m1$2.copy(this);
    const invSX = 1 / sx;
    const invSY = 1 / sy;
    const invSZ = 1 / sz;
    _m1$2.elements[0] *= invSX;
    _m1$2.elements[1] *= invSX;
    _m1$2.elements[2] *= invSX;
    _m1$2.elements[4] *= invSY;
    _m1$2.elements[5] *= invSY;
    _m1$2.elements[6] *= invSY;
    _m1$2.elements[8] *= invSZ;
    _m1$2.elements[9] *= invSZ;
    _m1$2.elements[10] *= invSZ;
    quaternion.setFromRotationMatrix(_m1$2);
    scale.x = sx;
    scale.y = sy;
    scale.z = sz;
    return this;
  }
  /**
  	 * Creates a perspective projection matrix. This is used internally by
  	 * {@link PerspectiveCamera#updateProjectionMatrix}.
  
  	 * @param {number} left - Left boundary of the viewing frustum at the near plane.
  	 * @param {number} right - Right boundary of the viewing frustum at the near plane.
  	 * @param {number} top - Top boundary of the viewing frustum at the near plane.
  	 * @param {number} bottom - Bottom boundary of the viewing frustum at the near plane.
  	 * @param {number} near - The distance from the camera to the near plane.
  	 * @param {number} far - The distance from the camera to the far plane.
  	 * @param {(WebGLCoordinateSystem|WebGPUCoordinateSystem)} [coordinateSystem=WebGLCoordinateSystem] - The coordinate system.
  	 * @param {boolean} [reversedDepth=false] - Whether to use a reversed depth.
  	 * @return {Matrix4} A reference to this matrix.
  	 */
  makePerspective(left, right, top, bottom, near, far, coordinateSystem = WebGLCoordinateSystem, reversedDepth = false) {
    const te = this.elements;
    const x = 2 * near / (right - left);
    const y = 2 * near / (top - bottom);
    const a = (right + left) / (right - left);
    const b = (top + bottom) / (top - bottom);
    let c, d;
    if (reversedDepth) {
      c = near / (far - near);
      d = far * near / (far - near);
    } else {
      if (coordinateSystem === WebGLCoordinateSystem) {
        c = -(far + near) / (far - near);
        d = -2 * far * near / (far - near);
      } else if (coordinateSystem === WebGPUCoordinateSystem) {
        c = -far / (far - near);
        d = -far * near / (far - near);
      } else {
        throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + coordinateSystem);
      }
    }
    te[0] = x;
    te[4] = 0;
    te[8] = a;
    te[12] = 0;
    te[1] = 0;
    te[5] = y;
    te[9] = b;
    te[13] = 0;
    te[2] = 0;
    te[6] = 0;
    te[10] = c;
    te[14] = d;
    te[3] = 0;
    te[7] = 0;
    te[11] = -1;
    te[15] = 0;
    return this;
  }
  /**
  	 * Creates a orthographic projection matrix. This is used internally by
  	 * {@link OrthographicCamera#updateProjectionMatrix}.
  
  	 * @param {number} left - Left boundary of the viewing frustum at the near plane.
  	 * @param {number} right - Right boundary of the viewing frustum at the near plane.
  	 * @param {number} top - Top boundary of the viewing frustum at the near plane.
  	 * @param {number} bottom - Bottom boundary of the viewing frustum at the near plane.
  	 * @param {number} near - The distance from the camera to the near plane.
  	 * @param {number} far - The distance from the camera to the far plane.
  	 * @param {(WebGLCoordinateSystem|WebGPUCoordinateSystem)} [coordinateSystem=WebGLCoordinateSystem] - The coordinate system.
  	 * @param {boolean} [reversedDepth=false] - Whether to use a reversed depth.
  	 * @return {Matrix4} A reference to this matrix.
  	 */
  makeOrthographic(left, right, top, bottom, near, far, coordinateSystem = WebGLCoordinateSystem, reversedDepth = false) {
    const te = this.elements;
    const x = 2 / (right - left);
    const y = 2 / (top - bottom);
    const a = -(right + left) / (right - left);
    const b = -(top + bottom) / (top - bottom);
    let c, d;
    if (reversedDepth) {
      c = 1 / (far - near);
      d = far / (far - near);
    } else {
      if (coordinateSystem === WebGLCoordinateSystem) {
        c = -2 / (far - near);
        d = -(far + near) / (far - near);
      } else if (coordinateSystem === WebGPUCoordinateSystem) {
        c = -1 / (far - near);
        d = -near / (far - near);
      } else {
        throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + coordinateSystem);
      }
    }
    te[0] = x;
    te[4] = 0;
    te[8] = 0;
    te[12] = a;
    te[1] = 0;
    te[5] = y;
    te[9] = 0;
    te[13] = b;
    te[2] = 0;
    te[6] = 0;
    te[10] = c;
    te[14] = d;
    te[3] = 0;
    te[7] = 0;
    te[11] = 0;
    te[15] = 1;
    return this;
  }
  /**
   * Returns `true` if this matrix is equal with the given one.
   *
   * @param {Matrix4} matrix - The matrix to test for equality.
   * @return {boolean} Whether this matrix is equal with the given one.
   */
  equals(matrix) {
    const te = this.elements;
    const me = matrix.elements;
    for (let i = 0; i < 16; i++) {
      if (te[i] !== me[i]) return false;
    }
    return true;
  }
  /**
   * Sets the elements of the matrix from the given array.
   *
   * @param {Array<number>} array - The matrix elements in column-major order.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Matrix4} A reference to this matrix.
   */
  fromArray(array2, offset = 0) {
    for (let i = 0; i < 16; i++) {
      this.elements[i] = array2[i + offset];
    }
    return this;
  }
  /**
   * Writes the elements of this matrix to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the matrix elements in column-major order.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The matrix elements in column-major order.
   */
  toArray(array2 = [], offset = 0) {
    const te = this.elements;
    array2[offset] = te[0];
    array2[offset + 1] = te[1];
    array2[offset + 2] = te[2];
    array2[offset + 3] = te[3];
    array2[offset + 4] = te[4];
    array2[offset + 5] = te[5];
    array2[offset + 6] = te[6];
    array2[offset + 7] = te[7];
    array2[offset + 8] = te[8];
    array2[offset + 9] = te[9];
    array2[offset + 10] = te[10];
    array2[offset + 11] = te[11];
    array2[offset + 12] = te[12];
    array2[offset + 13] = te[13];
    array2[offset + 14] = te[14];
    array2[offset + 15] = te[15];
    return array2;
  }
};
_Matrix4.prototype.isMatrix4 = true;
var Matrix4 = _Matrix4;
var _v1$7 = /* @__PURE__ */ new Vector3();
var _m1$2 = /* @__PURE__ */ new Matrix4();
var _zero = /* @__PURE__ */ new Vector3(0, 0, 0);
var _one = /* @__PURE__ */ new Vector3(1, 1, 1);
var _x = /* @__PURE__ */ new Vector3();
var _y = /* @__PURE__ */ new Vector3();
var _z = /* @__PURE__ */ new Vector3();
var _matrix$2 = /* @__PURE__ */ new Matrix4();
var _quaternion$4 = /* @__PURE__ */ new Quaternion();
var Euler = class _Euler {
  /**
   * Constructs a new euler instance.
   *
   * @param {number} [x=0] - The angle of the x axis in radians.
   * @param {number} [y=0] - The angle of the y axis in radians.
   * @param {number} [z=0] - The angle of the z axis in radians.
   * @param {string} [order=Euler.DEFAULT_ORDER] - A string representing the order that the rotations are applied.
   */
  constructor(x = 0, y = 0, z = 0, order = _Euler.DEFAULT_ORDER) {
    this.isEuler = true;
    this._x = x;
    this._y = y;
    this._z = z;
    this._order = order;
  }
  /**
   * The angle of the x axis in radians.
   *
   * @type {number}
   * @default 0
   */
  get x() {
    return this._x;
  }
  set x(value) {
    this._x = value;
    this._onChangeCallback();
  }
  /**
   * The angle of the y axis in radians.
   *
   * @type {number}
   * @default 0
   */
  get y() {
    return this._y;
  }
  set y(value) {
    this._y = value;
    this._onChangeCallback();
  }
  /**
   * The angle of the z axis in radians.
   *
   * @type {number}
   * @default 0
   */
  get z() {
    return this._z;
  }
  set z(value) {
    this._z = value;
    this._onChangeCallback();
  }
  /**
   * A string representing the order that the rotations are applied.
   *
   * @type {string}
   * @default 'XYZ'
   */
  get order() {
    return this._order;
  }
  set order(value) {
    this._order = value;
    this._onChangeCallback();
  }
  /**
   * Sets the Euler components.
   *
   * @param {number} x - The angle of the x axis in radians.
   * @param {number} y - The angle of the y axis in radians.
   * @param {number} z - The angle of the z axis in radians.
   * @param {string} [order] - A string representing the order that the rotations are applied.
   * @return {Euler} A reference to this Euler instance.
   */
  set(x, y, z, order = this._order) {
    this._x = x;
    this._y = y;
    this._z = z;
    this._order = order;
    this._onChangeCallback();
    return this;
  }
  /**
   * Returns a new Euler instance with copied values from this instance.
   *
   * @return {Euler} A clone of this instance.
   */
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  /**
   * Copies the values of the given Euler instance to this instance.
   *
   * @param {Euler} euler - The Euler instance to copy.
   * @return {Euler} A reference to this Euler instance.
   */
  copy(euler) {
    this._x = euler._x;
    this._y = euler._y;
    this._z = euler._z;
    this._order = euler._order;
    this._onChangeCallback();
    return this;
  }
  /**
   * Sets the angles of this Euler instance from a pure rotation matrix.
   *
   * @param {Matrix4} m - A 4x4 matrix of which the upper 3x3 of matrix is a pure rotation matrix (i.e. unscaled).
   * @param {string} [order] - A string representing the order that the rotations are applied.
   * @param {boolean} [update=true] - Whether the internal `onChange` callback should be executed or not.
   * @return {Euler} A reference to this Euler instance.
   */
  setFromRotationMatrix(m, order = this._order, update = true) {
    const te = m.elements;
    const m11 = te[0], m12 = te[4], m13 = te[8];
    const m21 = te[1], m22 = te[5], m23 = te[9];
    const m31 = te[2], m32 = te[6], m33 = te[10];
    switch (order) {
      case "XYZ":
        this._y = Math.asin(clamp(m13, -1, 1));
        if (Math.abs(m13) < 0.9999999) {
          this._x = Math.atan2(-m23, m33);
          this._z = Math.atan2(-m12, m11);
        } else {
          this._x = Math.atan2(m32, m22);
          this._z = 0;
        }
        break;
      case "YXZ":
        this._x = Math.asin(-clamp(m23, -1, 1));
        if (Math.abs(m23) < 0.9999999) {
          this._y = Math.atan2(m13, m33);
          this._z = Math.atan2(m21, m22);
        } else {
          this._y = Math.atan2(-m31, m11);
          this._z = 0;
        }
        break;
      case "ZXY":
        this._x = Math.asin(clamp(m32, -1, 1));
        if (Math.abs(m32) < 0.9999999) {
          this._y = Math.atan2(-m31, m33);
          this._z = Math.atan2(-m12, m22);
        } else {
          this._y = 0;
          this._z = Math.atan2(m21, m11);
        }
        break;
      case "ZYX":
        this._y = Math.asin(-clamp(m31, -1, 1));
        if (Math.abs(m31) < 0.9999999) {
          this._x = Math.atan2(m32, m33);
          this._z = Math.atan2(m21, m11);
        } else {
          this._x = 0;
          this._z = Math.atan2(-m12, m22);
        }
        break;
      case "YZX":
        this._z = Math.asin(clamp(m21, -1, 1));
        if (Math.abs(m21) < 0.9999999) {
          this._x = Math.atan2(-m23, m22);
          this._y = Math.atan2(-m31, m11);
        } else {
          this._x = 0;
          this._y = Math.atan2(m13, m33);
        }
        break;
      case "XZY":
        this._z = Math.asin(-clamp(m12, -1, 1));
        if (Math.abs(m12) < 0.9999999) {
          this._x = Math.atan2(m32, m22);
          this._y = Math.atan2(m13, m11);
        } else {
          this._x = Math.atan2(-m23, m33);
          this._y = 0;
        }
        break;
      default:
        warn("Euler: .setFromRotationMatrix() encountered an unknown order: " + order);
    }
    this._order = order;
    if (update === true) this._onChangeCallback();
    return this;
  }
  /**
   * Sets the angles of this Euler instance from a normalized quaternion.
   *
   * @param {Quaternion} q - A normalized Quaternion.
   * @param {string} [order] - A string representing the order that the rotations are applied.
   * @param {boolean} [update=true] - Whether the internal `onChange` callback should be executed or not.
   * @return {Euler} A reference to this Euler instance.
   */
  setFromQuaternion(q, order, update) {
    _matrix$2.makeRotationFromQuaternion(q);
    return this.setFromRotationMatrix(_matrix$2, order, update);
  }
  /**
   * Sets the angles of this Euler instance from the given vector.
   *
   * @param {Vector3} v - The vector.
   * @param {string} [order] - A string representing the order that the rotations are applied.
   * @return {Euler} A reference to this Euler instance.
   */
  setFromVector3(v, order = this._order) {
    return this.set(v.x, v.y, v.z, order);
  }
  /**
   * Resets the euler angle with a new order by creating a quaternion from this
   * euler angle and then setting this euler angle with the quaternion and the
   * new order.
   *
   * Warning: This discards revolution information.
   *
   * @param {string} [newOrder] - A string representing the new order that the rotations are applied.
   * @return {Euler} A reference to this Euler instance.
   */
  reorder(newOrder) {
    _quaternion$4.setFromEuler(this);
    return this.setFromQuaternion(_quaternion$4, newOrder);
  }
  /**
   * Returns `true` if this Euler instance is equal with the given one.
   *
   * @param {Euler} euler - The Euler instance to test for equality.
   * @return {boolean} Whether this Euler instance is equal with the given one.
   */
  equals(euler) {
    return euler._x === this._x && euler._y === this._y && euler._z === this._z && euler._order === this._order;
  }
  /**
   * Sets this Euler instance's components to values from the given array. The first three
   * entries of the array are assign to the x,y and z components. An optional fourth entry
   * defines the Euler order.
   *
   * @param {Array<number,number,number,?string>} array - An array holding the Euler component values.
   * @return {Euler} A reference to this Euler instance.
   */
  fromArray(array2) {
    this._x = array2[0];
    this._y = array2[1];
    this._z = array2[2];
    if (array2[3] !== void 0) this._order = array2[3];
    this._onChangeCallback();
    return this;
  }
  /**
   * Writes the components of this Euler instance to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number,number,number,string>} [array=[]] - The target array holding the Euler components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number,number,number,string>} The Euler components.
   */
  toArray(array2 = [], offset = 0) {
    array2[offset] = this._x;
    array2[offset + 1] = this._y;
    array2[offset + 2] = this._z;
    array2[offset + 3] = this._order;
    return array2;
  }
  _onChange(callback) {
    this._onChangeCallback = callback;
    return this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x;
    yield this._y;
    yield this._z;
    yield this._order;
  }
};
Euler.DEFAULT_ORDER = "XYZ";
var Layers = class {
  /**
   * Constructs a new layers instance, with membership
   * initially set to layer `0`.
   */
  constructor() {
    this.mask = 1 | 0;
  }
  /**
   * Sets membership to the given layer, and remove membership all other layers.
   *
   * @param {number} layer - The layer to set.
   */
  set(layer) {
    this.mask = (1 << layer | 0) >>> 0;
  }
  /**
   * Adds membership of the given layer.
   *
   * @param {number} layer - The layer to enable.
   */
  enable(layer) {
    this.mask |= 1 << layer | 0;
  }
  /**
   * Adds membership to all layers.
   */
  enableAll() {
    this.mask = 4294967295 | 0;
  }
  /**
   * Toggles the membership of the given layer.
   *
   * @param {number} layer - The layer to toggle.
   */
  toggle(layer) {
    this.mask ^= 1 << layer | 0;
  }
  /**
   * Removes membership of the given layer.
   *
   * @param {number} layer - The layer to enable.
   */
  disable(layer) {
    this.mask &= ~(1 << layer | 0);
  }
  /**
   * Removes the membership from all layers.
   */
  disableAll() {
    this.mask = 0;
  }
  /**
   * Returns `true` if this and the given layers object have at least one
   * layer in common.
   *
   * @param {Layers} layers - The layers to test.
   * @return {boolean } Whether this and the given layers object have at least one layer in common or not.
   */
  test(layers) {
    return (this.mask & layers.mask) !== 0;
  }
  /**
   * Returns `true` if the given layer is enabled.
   *
   * @param {number} layer - The layer to test.
   * @return {boolean } Whether the given layer is enabled or not.
   */
  isEnabled(layer) {
    return (this.mask & (1 << layer | 0)) !== 0;
  }
};
var _object3DId = 0;
var _v1$6 = /* @__PURE__ */ new Vector3();
var _q1 = /* @__PURE__ */ new Quaternion();
var _m1$1 = /* @__PURE__ */ new Matrix4();
var _target = /* @__PURE__ */ new Vector3();
var _position$4 = /* @__PURE__ */ new Vector3();
var _scale$3 = /* @__PURE__ */ new Vector3();
var _quaternion$3 = /* @__PURE__ */ new Quaternion();
var _xAxis = /* @__PURE__ */ new Vector3(1, 0, 0);
var _yAxis = /* @__PURE__ */ new Vector3(0, 1, 0);
var _zAxis = /* @__PURE__ */ new Vector3(0, 0, 1);
var _addedEvent = { type: "added" };
var _removedEvent = { type: "removed" };
var _childaddedEvent = { type: "childadded", child: null };
var _childremovedEvent = { type: "childremoved", child: null };
var Object3D = class _Object3D extends EventDispatcher {
  /**
   * Constructs a new 3D object.
   */
  constructor() {
    super();
    this.isObject3D = true;
    Object.defineProperty(this, "id", { value: _object3DId++ });
    this.uuid = generateUUID();
    this.name = "";
    this.type = "Object3D";
    this.parent = null;
    this.children = [];
    this.up = _Object3D.DEFAULT_UP.clone();
    const position = new Vector3();
    const rotation = new Euler();
    const quaternion = new Quaternion();
    const scale = new Vector3(1, 1, 1);
    function onRotationChange() {
      quaternion.setFromEuler(rotation, false);
    }
    function onQuaternionChange() {
      rotation.setFromQuaternion(quaternion, void 0, false);
    }
    rotation._onChange(onRotationChange);
    quaternion._onChange(onQuaternionChange);
    Object.defineProperties(this, {
      /**
       * Represents the object's local position.
       *
       * @name Object3D#position
       * @type {Vector3}
       * @default (0,0,0)
       */
      position: {
        configurable: true,
        enumerable: true,
        value: position
      },
      /**
       * Represents the object's local rotation as Euler angles, in radians.
       *
       * @name Object3D#rotation
       * @type {Euler}
       * @default (0,0,0)
       */
      rotation: {
        configurable: true,
        enumerable: true,
        value: rotation
      },
      /**
       * Represents the object's local rotation as Quaternions.
       *
       * @name Object3D#quaternion
       * @type {Quaternion}
       */
      quaternion: {
        configurable: true,
        enumerable: true,
        value: quaternion
      },
      /**
       * Represents the object's local scale.
       *
       * @name Object3D#scale
       * @type {Vector3}
       * @default (1,1,1)
       */
      scale: {
        configurable: true,
        enumerable: true,
        value: scale
      },
      /**
       * Represents the object's model-view matrix.
       *
       * @name Object3D#modelViewMatrix
       * @type {Matrix4}
       */
      modelViewMatrix: {
        value: new Matrix4()
      },
      /**
       * Represents the object's normal matrix.
       *
       * @name Object3D#normalMatrix
       * @type {Matrix3}
       */
      normalMatrix: {
        value: new Matrix3()
      }
    });
    this.matrix = new Matrix4();
    this.matrixWorld = new Matrix4();
    this.matrixAutoUpdate = _Object3D.DEFAULT_MATRIX_AUTO_UPDATE;
    this.matrixWorldAutoUpdate = _Object3D.DEFAULT_MATRIX_WORLD_AUTO_UPDATE;
    this.matrixWorldNeedsUpdate = false;
    this.layers = new Layers();
    this.visible = true;
    this.castShadow = false;
    this.receiveShadow = false;
    this.frustumCulled = true;
    this.renderOrder = 0;
    this.animations = [];
    this.customDepthMaterial = void 0;
    this.customDistanceMaterial = void 0;
    this.static = false;
    this.userData = {};
    this.pivot = null;
  }
  /**
   * A callback that is executed immediately before a 3D object is rendered to a shadow map.
   *
   * @param {Renderer|WebGLRenderer} renderer - The renderer.
   * @param {Object3D} object - The 3D object.
   * @param {Camera} camera - The camera that is used to render the scene.
   * @param {Camera} shadowCamera - The shadow camera.
   * @param {BufferGeometry} geometry - The 3D object's geometry.
   * @param {Material} depthMaterial - The depth material.
   * @param {Object} group - The geometry group data.
   */
  onBeforeShadow() {
  }
  /**
   * A callback that is executed immediately after a 3D object is rendered to a shadow map.
   *
   * @param {Renderer|WebGLRenderer} renderer - The renderer.
   * @param {Object3D} object - The 3D object.
   * @param {Camera} camera - The camera that is used to render the scene.
   * @param {Camera} shadowCamera - The shadow camera.
   * @param {BufferGeometry} geometry - The 3D object's geometry.
   * @param {Material} depthMaterial - The depth material.
   * @param {Object} group - The geometry group data.
   */
  onAfterShadow() {
  }
  /**
   * A callback that is executed immediately before a 3D object is rendered.
   *
   * @param {Renderer|WebGLRenderer} renderer - The renderer.
   * @param {Object3D} object - The 3D object.
   * @param {Camera} camera - The camera that is used to render the scene.
   * @param {BufferGeometry} geometry - The 3D object's geometry.
   * @param {Material} material - The 3D object's material.
   * @param {Object} group - The geometry group data.
   */
  onBeforeRender() {
  }
  /**
   * A callback that is executed immediately after a 3D object is rendered.
   *
   * @param {Renderer|WebGLRenderer} renderer - The renderer.
   * @param {Object3D} object - The 3D object.
   * @param {Camera} camera - The camera that is used to render the scene.
   * @param {BufferGeometry} geometry - The 3D object's geometry.
   * @param {Material} material - The 3D object's material.
   * @param {Object} group - The geometry group data.
   */
  onAfterRender() {
  }
  /**
   * Applies the given transformation matrix to the object and updates the object's position,
   * rotation and scale.
   *
   * @param {Matrix4} matrix - The transformation matrix.
   */
  applyMatrix4(matrix) {
    if (this.matrixAutoUpdate) this.updateMatrix();
    this.matrix.premultiply(matrix);
    this.matrix.decompose(this.position, this.quaternion, this.scale);
  }
  /**
   * Applies a rotation represented by given the quaternion to the 3D object.
   *
   * @param {Quaternion} q - The quaternion.
   * @return {Object3D} A reference to this instance.
   */
  applyQuaternion(q) {
    this.quaternion.premultiply(q);
    return this;
  }
  /**
   * Sets the given rotation represented as an axis/angle couple to the 3D object.
   *
   * @param {Vector3} axis - The (normalized) axis vector.
   * @param {number} angle - The angle in radians.
   */
  setRotationFromAxisAngle(axis, angle) {
    this.quaternion.setFromAxisAngle(axis, angle);
  }
  /**
   * Sets the given rotation represented as Euler angles to the 3D object.
   *
   * @param {Euler} euler - The Euler angles.
   */
  setRotationFromEuler(euler) {
    this.quaternion.setFromEuler(euler, true);
  }
  /**
   * Sets the given rotation represented as rotation matrix to the 3D object.
   *
   * @param {Matrix4} m - Although a 4x4 matrix is expected, the upper 3x3 portion must be
   * a pure rotation matrix (i.e, unscaled).
   */
  setRotationFromMatrix(m) {
    this.quaternion.setFromRotationMatrix(m);
  }
  /**
   * Sets the given rotation represented as a Quaternion to the 3D object.
   *
   * @param {Quaternion} q - The Quaternion
   */
  setRotationFromQuaternion(q) {
    this.quaternion.copy(q);
  }
  /**
   * Rotates the 3D object along an axis in local space.
   *
   * @param {Vector3} axis - The (normalized) axis vector.
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateOnAxis(axis, angle) {
    _q1.setFromAxisAngle(axis, angle);
    this.quaternion.multiply(_q1);
    return this;
  }
  /**
   * Rotates the 3D object along an axis in world space.
   *
   * @param {Vector3} axis - The (normalized) axis vector.
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateOnWorldAxis(axis, angle) {
    _q1.setFromAxisAngle(axis, angle);
    this.quaternion.premultiply(_q1);
    return this;
  }
  /**
   * Rotates the 3D object around its X axis in local space.
   *
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateX(angle) {
    return this.rotateOnAxis(_xAxis, angle);
  }
  /**
   * Rotates the 3D object around its Y axis in local space.
   *
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateY(angle) {
    return this.rotateOnAxis(_yAxis, angle);
  }
  /**
   * Rotates the 3D object around its Z axis in local space.
   *
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateZ(angle) {
    return this.rotateOnAxis(_zAxis, angle);
  }
  /**
   * Translate the 3D object by a distance along the given axis in local space.
   *
   * @param {Vector3} axis - The (normalized) axis vector.
   * @param {number} distance - The distance in world units.
   * @return {Object3D} A reference to this instance.
   */
  translateOnAxis(axis, distance2) {
    _v1$6.copy(axis).applyQuaternion(this.quaternion);
    this.position.add(_v1$6.multiplyScalar(distance2));
    return this;
  }
  /**
   * Translate the 3D object by a distance along its X-axis in local space.
   *
   * @param {number} distance - The distance in world units.
   * @return {Object3D} A reference to this instance.
   */
  translateX(distance2) {
    return this.translateOnAxis(_xAxis, distance2);
  }
  /**
   * Translate the 3D object by a distance along its Y-axis in local space.
   *
   * @param {number} distance - The distance in world units.
   * @return {Object3D} A reference to this instance.
   */
  translateY(distance2) {
    return this.translateOnAxis(_yAxis, distance2);
  }
  /**
   * Translate the 3D object by a distance along its Z-axis in local space.
   *
   * @param {number} distance - The distance in world units.
   * @return {Object3D} A reference to this instance.
   */
  translateZ(distance2) {
    return this.translateOnAxis(_zAxis, distance2);
  }
  /**
   * Converts the given vector from this 3D object's local space to world space.
   *
   * @param {Vector3} vector - The vector to convert.
   * @return {Vector3} The converted vector.
   */
  localToWorld(vector) {
    this.updateWorldMatrix(true, false);
    return vector.applyMatrix4(this.matrixWorld);
  }
  /**
   * Converts the given vector from this 3D object's world space to local space.
   *
   * @param {Vector3} vector - The vector to convert.
   * @return {Vector3} The converted vector.
   */
  worldToLocal(vector) {
    this.updateWorldMatrix(true, false);
    return vector.applyMatrix4(_m1$1.copy(this.matrixWorld).invert());
  }
  /**
   * Rotates the object to face a point in world space.
   *
   * This method does not support objects having non-uniformly-scaled parent(s).
   *
   * @param {number|Vector3} x - The x coordinate in world space. Alternatively, a vector representing a position in world space
   * @param {number} [y] - The y coordinate in world space.
   * @param {number} [z] - The z coordinate in world space.
   */
  lookAt(x, y, z) {
    if (x.isVector3) {
      _target.copy(x);
    } else {
      _target.set(x, y, z);
    }
    const parent = this.parent;
    this.updateWorldMatrix(true, false);
    _position$4.setFromMatrixPosition(this.matrixWorld);
    if (this.isCamera || this.isLight) {
      _m1$1.lookAt(_position$4, _target, this.up);
    } else {
      _m1$1.lookAt(_target, _position$4, this.up);
    }
    this.quaternion.setFromRotationMatrix(_m1$1);
    if (parent) {
      _m1$1.extractRotation(parent.matrixWorld);
      _q1.setFromRotationMatrix(_m1$1);
      this.quaternion.premultiply(_q1.invert());
    }
  }
  /**
   * Adds the given 3D object as a child to this 3D object. An arbitrary number of
   * objects may be added. Any current parent on an object passed in here will be
   * removed, since an object can have at most one parent.
   *
   * @fires Object3D#added
   * @fires Object3D#childadded
   * @param {Object3D} object - The 3D object to add.
   * @return {Object3D} A reference to this instance.
   */
  add(object) {
    if (arguments.length > 1) {
      for (let i = 0; i < arguments.length; i++) {
        this.add(arguments[i]);
      }
      return this;
    }
    if (object === this) {
      error("Object3D.add: object can't be added as a child of itself.", object);
      return this;
    }
    if (object && object.isObject3D) {
      object.removeFromParent();
      object.parent = this;
      this.children.push(object);
      object.dispatchEvent(_addedEvent);
      _childaddedEvent.child = object;
      this.dispatchEvent(_childaddedEvent);
      _childaddedEvent.child = null;
    } else {
      error("Object3D.add: object not an instance of THREE.Object3D.", object);
    }
    return this;
  }
  /**
   * Removes the given 3D object as child from this 3D object.
   * An arbitrary number of objects may be removed.
   *
   * @fires Object3D#removed
   * @fires Object3D#childremoved
   * @param {Object3D} object - The 3D object to remove.
   * @return {Object3D} A reference to this instance.
   */
  remove(object) {
    if (arguments.length > 1) {
      for (let i = 0; i < arguments.length; i++) {
        this.remove(arguments[i]);
      }
      return this;
    }
    const index = this.children.indexOf(object);
    if (index !== -1) {
      object.parent = null;
      this.children.splice(index, 1);
      object.dispatchEvent(_removedEvent);
      _childremovedEvent.child = object;
      this.dispatchEvent(_childremovedEvent);
      _childremovedEvent.child = null;
    }
    return this;
  }
  /**
   * Removes this 3D object from its current parent.
   *
   * @fires Object3D#removed
   * @fires Object3D#childremoved
   * @return {Object3D} A reference to this instance.
   */
  removeFromParent() {
    const parent = this.parent;
    if (parent !== null) {
      parent.remove(this);
    }
    return this;
  }
  /**
   * Removes all child objects.
   *
   * @fires Object3D#removed
   * @fires Object3D#childremoved
   * @return {Object3D} A reference to this instance.
   */
  clear() {
    return this.remove(...this.children);
  }
  /**
   * Adds the given 3D object as a child of this 3D object, while maintaining the object's world
   * transform. This method does not support scene graphs having non-uniformly-scaled nodes(s).
   *
   * @fires Object3D#added
   * @fires Object3D#childadded
   * @param {Object3D} object - The 3D object to attach.
   * @return {Object3D} A reference to this instance.
   */
  attach(object) {
    this.updateWorldMatrix(true, false);
    _m1$1.copy(this.matrixWorld).invert();
    if (object.parent !== null) {
      object.parent.updateWorldMatrix(true, false);
      _m1$1.multiply(object.parent.matrixWorld);
    }
    object.applyMatrix4(_m1$1);
    object.removeFromParent();
    object.parent = this;
    this.children.push(object);
    object.updateWorldMatrix(false, true);
    object.dispatchEvent(_addedEvent);
    _childaddedEvent.child = object;
    this.dispatchEvent(_childaddedEvent);
    _childaddedEvent.child = null;
    return this;
  }
  /**
   * Searches through the 3D object and its children, starting with the 3D object
   * itself, and returns the first with a matching ID.
   *
   * @param {number} id - The id.
   * @return {Object3D|undefined} The found 3D object. Returns `undefined` if no 3D object has been found.
   */
  getObjectById(id) {
    return this.getObjectByProperty("id", id);
  }
  /**
   * Searches through the 3D object and its children, starting with the 3D object
   * itself, and returns the first with a matching name.
   *
   * @param {string} name - The name.
   * @return {Object3D|undefined} The found 3D object. Returns `undefined` if no 3D object has been found.
   */
  getObjectByName(name) {
    return this.getObjectByProperty("name", name);
  }
  /**
   * Searches through the 3D object and its children, starting with the 3D object
   * itself, and returns the first with a matching property value.
   *
   * @param {string} name - The name of the property.
   * @param {any} value - The value.
   * @return {Object3D|undefined} The found 3D object. Returns `undefined` if no 3D object has been found.
   */
  getObjectByProperty(name, value) {
    if (this[name] === value) return this;
    for (let i = 0, l = this.children.length; i < l; i++) {
      const child = this.children[i];
      const object = child.getObjectByProperty(name, value);
      if (object !== void 0) {
        return object;
      }
    }
    return void 0;
  }
  /**
   * Searches through the 3D object and its children, starting with the 3D object
   * itself, and returns all 3D objects with a matching property value.
   *
   * @param {string} name - The name of the property.
   * @param {any} value - The value.
   * @param {Array<Object3D>} result - The method stores the result in this array.
   * @return {Array<Object3D>} The found 3D objects.
   */
  getObjectsByProperty(name, value, result = []) {
    if (this[name] === value) result.push(this);
    const children = this.children;
    for (let i = 0, l = children.length; i < l; i++) {
      children[i].getObjectsByProperty(name, value, result);
    }
    return result;
  }
  /**
   * Returns a vector representing the position of the 3D object in world space.
   *
   * @param {Vector3} target - The target vector the result is stored to.
   * @return {Vector3} The 3D object's position in world space.
   */
  getWorldPosition(target) {
    this.updateWorldMatrix(true, false);
    return target.setFromMatrixPosition(this.matrixWorld);
  }
  /**
   * Returns a Quaternion representing the position of the 3D object in world space.
   *
   * @param {Quaternion} target - The target Quaternion the result is stored to.
   * @return {Quaternion} The 3D object's rotation in world space.
   */
  getWorldQuaternion(target) {
    this.updateWorldMatrix(true, false);
    this.matrixWorld.decompose(_position$4, target, _scale$3);
    return target;
  }
  /**
   * Returns a vector representing the scale of the 3D object in world space.
   *
   * @param {Vector3} target - The target vector the result is stored to.
   * @return {Vector3} The 3D object's scale in world space.
   */
  getWorldScale(target) {
    this.updateWorldMatrix(true, false);
    this.matrixWorld.decompose(_position$4, _quaternion$3, target);
    return target;
  }
  /**
   * Returns a vector representing the ("look") direction of the 3D object in world space.
   *
   * @param {Vector3} target - The target vector the result is stored to.
   * @return {Vector3} The 3D object's direction in world space.
   */
  getWorldDirection(target) {
    this.updateWorldMatrix(true, false);
    const e = this.matrixWorld.elements;
    return target.set(e[8], e[9], e[10]).normalize();
  }
  /**
   * Abstract method to get intersections between a casted ray and this
   * 3D object. Renderable 3D objects such as {@link Mesh}, {@link Line} or {@link Points}
   * implement this method in order to use raycasting.
   *
   * @abstract
   * @param {Raycaster} raycaster - The raycaster.
   * @param {Array<Object>} intersects - An array holding the result of the method.
   */
  raycast() {
  }
  /**
   * Executes the callback on this 3D object and all descendants.
   *
   * Note: Modifying the scene graph inside the callback is discouraged.
   *
   * @param {Function} callback - A callback function that allows to process the current 3D object.
   */
  traverse(callback) {
    callback(this);
    const children = this.children;
    for (let i = 0, l = children.length; i < l; i++) {
      children[i].traverse(callback);
    }
  }
  /**
   * Like {@link Object3D#traverse}, but the callback will only be executed for visible 3D objects.
   * Descendants of invisible 3D objects are not traversed.
   *
   * Note: Modifying the scene graph inside the callback is discouraged.
   *
   * @param {Function} callback - A callback function that allows to process the current 3D object.
   */
  traverseVisible(callback) {
    if (this.visible === false) return;
    callback(this);
    const children = this.children;
    for (let i = 0, l = children.length; i < l; i++) {
      children[i].traverseVisible(callback);
    }
  }
  /**
   * Like {@link Object3D#traverse}, but the callback will only be executed for all ancestors.
   *
   * Note: Modifying the scene graph inside the callback is discouraged.
   *
   * @param {Function} callback - A callback function that allows to process the current 3D object.
   */
  traverseAncestors(callback) {
    const parent = this.parent;
    if (parent !== null) {
      callback(parent);
      parent.traverseAncestors(callback);
    }
  }
  /**
   * Updates the transformation matrix in local space by computing it from the current
   * position, rotation and scale values.
   */
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale);
    const pivot = this.pivot;
    if (pivot !== null) {
      const px = pivot.x, py = pivot.y, pz = pivot.z;
      const te = this.matrix.elements;
      te[12] += px - te[0] * px - te[4] * py - te[8] * pz;
      te[13] += py - te[1] * px - te[5] * py - te[9] * pz;
      te[14] += pz - te[2] * px - te[6] * py - te[10] * pz;
    }
    this.matrixWorldNeedsUpdate = true;
  }
  /**
   * Updates the transformation matrix in world space of this 3D objects and its descendants.
   *
   * To ensure correct results, this method also recomputes the 3D object's transformation matrix in
   * local space. The computation of the local and world matrix can be controlled with the
   * {@link Object3D#matrixAutoUpdate} and {@link Object3D#matrixWorldAutoUpdate} flags which are both
   * `true` by default.  Set these flags to `false` if you need more control over the update matrix process.
   *
   * @param {boolean} [force=false] - When set to `true`, a recomputation of world matrices is forced even
   * when {@link Object3D#matrixWorldNeedsUpdate} is `false`.
   */
  updateMatrixWorld(force) {
    if (this.matrixAutoUpdate) this.updateMatrix();
    if (this.matrixWorldNeedsUpdate || force) {
      if (this.matrixWorldAutoUpdate === true) {
        if (this.parent === null) {
          this.matrixWorld.copy(this.matrix);
        } else {
          this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);
        }
      }
      this.matrixWorldNeedsUpdate = false;
      force = true;
    }
    const children = this.children;
    for (let i = 0, l = children.length; i < l; i++) {
      const child = children[i];
      child.updateMatrixWorld(force);
    }
  }
  /**
   * An alternative version of {@link Object3D#updateMatrixWorld} with more control over the
   * update of ancestor and descendant nodes.
   *
   * @param {boolean} [updateParents=false] Whether ancestor nodes should be updated or not.
   * @param {boolean} [updateChildren=false] Whether descendant nodes should be updated or not.
   * @param {boolean} [force=false] - When set to `true`, a recomputation of world matrices is forced even
   * when {@link Object3D#matrixWorldNeedsUpdate} is `false`.
   */
  updateWorldMatrix(updateParents, updateChildren, force = false) {
    const parent = this.parent;
    if (updateParents === true && parent !== null) {
      parent.updateWorldMatrix(true, false);
    }
    if (this.matrixAutoUpdate) this.updateMatrix();
    if (this.matrixWorldNeedsUpdate || force) {
      if (this.matrixWorldAutoUpdate === true) {
        if (this.parent === null) {
          this.matrixWorld.copy(this.matrix);
        } else {
          this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);
        }
      }
      this.matrixWorldNeedsUpdate = false;
      force = true;
    }
    if (updateChildren === true) {
      const children = this.children;
      for (let i = 0, l = children.length; i < l; i++) {
        const child = children[i];
        child.updateWorldMatrix(false, true, force);
      }
    }
  }
  /**
   * Serializes the 3D object into JSON.
   *
   * @param {?(Object|string)} meta - An optional value holding meta information about the serialization.
   * @return {Object} A JSON object representing the serialized 3D object.
   * @see {@link ObjectLoader#parse}
   */
  toJSON(meta) {
    const isRootObject = meta === void 0 || typeof meta === "string";
    const output2 = {};
    if (isRootObject) {
      meta = {
        geometries: {},
        materials: {},
        textures: {},
        images: {},
        shapes: {},
        skeletons: {},
        animations: {},
        nodes: {}
      };
      output2.metadata = {
        version: 4.7,
        type: "Object",
        generator: "Object3D.toJSON"
      };
    }
    const object = {};
    object.uuid = this.uuid;
    object.type = this.type;
    if (this.name !== "") object.name = this.name;
    if (this.castShadow === true) object.castShadow = true;
    if (this.receiveShadow === true) object.receiveShadow = true;
    if (this.visible === false) object.visible = false;
    if (this.frustumCulled === false) object.frustumCulled = false;
    if (this.renderOrder !== 0) object.renderOrder = this.renderOrder;
    if (this.static !== false) object.static = this.static;
    if (Object.keys(this.userData).length > 0) object.userData = this.userData;
    object.layers = this.layers.mask;
    object.matrix = this.matrix.toArray();
    object.up = this.up.toArray();
    if (this.pivot !== null) object.pivot = this.pivot.toArray();
    if (this.matrixAutoUpdate === false) object.matrixAutoUpdate = false;
    if (this.morphTargetDictionary !== void 0) object.morphTargetDictionary = Object.assign({}, this.morphTargetDictionary);
    if (this.morphTargetInfluences !== void 0) object.morphTargetInfluences = this.morphTargetInfluences.slice();
    if (this.isInstancedMesh) {
      object.type = "InstancedMesh";
      object.count = this.count;
      object.instanceMatrix = this.instanceMatrix.toJSON();
      if (this.instanceColor !== null) object.instanceColor = this.instanceColor.toJSON();
    }
    if (this.isBatchedMesh) {
      object.type = "BatchedMesh";
      object.perObjectFrustumCulled = this.perObjectFrustumCulled;
      object.sortObjects = this.sortObjects;
      object.drawRanges = this._drawRanges;
      object.reservedRanges = this._reservedRanges;
      object.geometryInfo = this._geometryInfo.map((info) => ({
        ...info,
        boundingBox: info.boundingBox ? info.boundingBox.toJSON() : void 0,
        boundingSphere: info.boundingSphere ? info.boundingSphere.toJSON() : void 0
      }));
      object.instanceInfo = this._instanceInfo.map((info) => ({ ...info }));
      object.availableInstanceIds = this._availableInstanceIds.slice();
      object.availableGeometryIds = this._availableGeometryIds.slice();
      object.nextIndexStart = this._nextIndexStart;
      object.nextVertexStart = this._nextVertexStart;
      object.geometryCount = this._geometryCount;
      object.maxInstanceCount = this._maxInstanceCount;
      object.maxVertexCount = this._maxVertexCount;
      object.maxIndexCount = this._maxIndexCount;
      object.geometryInitialized = this._geometryInitialized;
      object.matricesTexture = this._matricesTexture.toJSON(meta);
      object.indirectTexture = this._indirectTexture.toJSON(meta);
      if (this._colorsTexture !== null) {
        object.colorsTexture = this._colorsTexture.toJSON(meta);
      }
      if (this.boundingSphere !== null) {
        object.boundingSphere = this.boundingSphere.toJSON();
      }
      if (this.boundingBox !== null) {
        object.boundingBox = this.boundingBox.toJSON();
      }
    }
    function serialize(library, element2) {
      if (library[element2.uuid] === void 0) {
        library[element2.uuid] = element2.toJSON(meta);
      }
      return element2.uuid;
    }
    if (this.isScene) {
      if (this.background) {
        if (this.background.isColor) {
          object.background = this.background.toJSON();
        } else if (this.background.isTexture) {
          object.background = this.background.toJSON(meta).uuid;
        }
      }
      if (this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== true) {
        object.environment = this.environment.toJSON(meta).uuid;
      }
    } else if (this.isMesh || this.isLine || this.isPoints) {
      object.geometry = serialize(meta.geometries, this.geometry);
      const parameters = this.geometry.parameters;
      if (parameters !== void 0 && parameters.shapes !== void 0) {
        const shapes = parameters.shapes;
        if (Array.isArray(shapes)) {
          for (let i = 0, l = shapes.length; i < l; i++) {
            const shape = shapes[i];
            serialize(meta.shapes, shape);
          }
        } else {
          serialize(meta.shapes, shapes);
        }
      }
    }
    if (this.isSkinnedMesh) {
      object.bindMode = this.bindMode;
      object.bindMatrix = this.bindMatrix.toArray();
      if (this.skeleton !== void 0) {
        serialize(meta.skeletons, this.skeleton);
        object.skeleton = this.skeleton.uuid;
      }
    }
    if (this.material !== void 0) {
      if (Array.isArray(this.material)) {
        const uuids = [];
        for (let i = 0, l = this.material.length; i < l; i++) {
          uuids.push(serialize(meta.materials, this.material[i]));
        }
        object.material = uuids;
      } else {
        object.material = serialize(meta.materials, this.material);
      }
    }
    if (this.children.length > 0) {
      object.children = [];
      for (let i = 0; i < this.children.length; i++) {
        object.children.push(this.children[i].toJSON(meta).object);
      }
    }
    if (this.animations.length > 0) {
      object.animations = [];
      for (let i = 0; i < this.animations.length; i++) {
        const animation = this.animations[i];
        object.animations.push(serialize(meta.animations, animation));
      }
    }
    if (isRootObject) {
      const geometries = extractFromCache(meta.geometries);
      const materials = extractFromCache(meta.materials);
      const textures = extractFromCache(meta.textures);
      const images = extractFromCache(meta.images);
      const shapes = extractFromCache(meta.shapes);
      const skeletons = extractFromCache(meta.skeletons);
      const animations = extractFromCache(meta.animations);
      const nodes = extractFromCache(meta.nodes);
      if (geometries.length > 0) output2.geometries = geometries;
      if (materials.length > 0) output2.materials = materials;
      if (textures.length > 0) output2.textures = textures;
      if (images.length > 0) output2.images = images;
      if (shapes.length > 0) output2.shapes = shapes;
      if (skeletons.length > 0) output2.skeletons = skeletons;
      if (animations.length > 0) output2.animations = animations;
      if (nodes.length > 0) output2.nodes = nodes;
    }
    output2.object = object;
    return output2;
    function extractFromCache(cache2) {
      const values = [];
      for (const key in cache2) {
        const data = cache2[key];
        delete data.metadata;
        values.push(data);
      }
      return values;
    }
  }
  /**
   * Returns a new 3D object with copied values from this instance.
   *
   * @param {boolean} [recursive=true] - When set to `true`, descendants of the 3D object are also cloned.
   * @return {Object3D} A clone of this instance.
   */
  clone(recursive) {
    return new this.constructor().copy(this, recursive);
  }
  /**
   * Copies the values of the given 3D object to this instance.
   *
   * @param {Object3D} source - The 3D object to copy.
   * @param {boolean} [recursive=true] - When set to `true`, descendants of the 3D object are cloned.
   * @return {Object3D} A reference to this instance.
   */
  copy(source, recursive = true) {
    this.name = source.name;
    this.up.copy(source.up);
    this.position.copy(source.position);
    this.rotation.order = source.rotation.order;
    this.quaternion.copy(source.quaternion);
    this.scale.copy(source.scale);
    this.pivot = source.pivot !== null ? source.pivot.clone() : null;
    this.matrix.copy(source.matrix);
    this.matrixWorld.copy(source.matrixWorld);
    this.matrixAutoUpdate = source.matrixAutoUpdate;
    this.matrixWorldAutoUpdate = source.matrixWorldAutoUpdate;
    this.matrixWorldNeedsUpdate = source.matrixWorldNeedsUpdate;
    this.layers.mask = source.layers.mask;
    this.visible = source.visible;
    this.castShadow = source.castShadow;
    this.receiveShadow = source.receiveShadow;
    this.frustumCulled = source.frustumCulled;
    this.renderOrder = source.renderOrder;
    this.static = source.static;
    this.animations = source.animations.slice();
    this.userData = JSON.parse(JSON.stringify(source.userData));
    if (recursive === true) {
      for (let i = 0; i < source.children.length; i++) {
        const child = source.children[i];
        this.add(child.clone());
      }
    }
    return this;
  }
};
Object3D.DEFAULT_UP = /* @__PURE__ */ new Vector3(0, 1, 0);
Object3D.DEFAULT_MATRIX_AUTO_UPDATE = true;
Object3D.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = true;
var _colorKeywords = {
  "aliceblue": 15792383,
  "antiquewhite": 16444375,
  "aqua": 65535,
  "aquamarine": 8388564,
  "azure": 15794175,
  "beige": 16119260,
  "bisque": 16770244,
  "black": 0,
  "blanchedalmond": 16772045,
  "blue": 255,
  "blueviolet": 9055202,
  "brown": 10824234,
  "burlywood": 14596231,
  "cadetblue": 6266528,
  "chartreuse": 8388352,
  "chocolate": 13789470,
  "coral": 16744272,
  "cornflowerblue": 6591981,
  "cornsilk": 16775388,
  "crimson": 14423100,
  "cyan": 65535,
  "darkblue": 139,
  "darkcyan": 35723,
  "darkgoldenrod": 12092939,
  "darkgray": 11119017,
  "darkgreen": 25600,
  "darkgrey": 11119017,
  "darkkhaki": 12433259,
  "darkmagenta": 9109643,
  "darkolivegreen": 5597999,
  "darkorange": 16747520,
  "darkorchid": 10040012,
  "darkred": 9109504,
  "darksalmon": 15308410,
  "darkseagreen": 9419919,
  "darkslateblue": 4734347,
  "darkslategray": 3100495,
  "darkslategrey": 3100495,
  "darkturquoise": 52945,
  "darkviolet": 9699539,
  "deeppink": 16716947,
  "deepskyblue": 49151,
  "dimgray": 6908265,
  "dimgrey": 6908265,
  "dodgerblue": 2003199,
  "firebrick": 11674146,
  "floralwhite": 16775920,
  "forestgreen": 2263842,
  "fuchsia": 16711935,
  "gainsboro": 14474460,
  "ghostwhite": 16316671,
  "gold": 16766720,
  "goldenrod": 14329120,
  "gray": 8421504,
  "green": 32768,
  "greenyellow": 11403055,
  "grey": 8421504,
  "honeydew": 15794160,
  "hotpink": 16738740,
  "indianred": 13458524,
  "indigo": 4915330,
  "ivory": 16777200,
  "khaki": 15787660,
  "lavender": 15132410,
  "lavenderblush": 16773365,
  "lawngreen": 8190976,
  "lemonchiffon": 16775885,
  "lightblue": 11393254,
  "lightcoral": 15761536,
  "lightcyan": 14745599,
  "lightgoldenrodyellow": 16448210,
  "lightgray": 13882323,
  "lightgreen": 9498256,
  "lightgrey": 13882323,
  "lightpink": 16758465,
  "lightsalmon": 16752762,
  "lightseagreen": 2142890,
  "lightskyblue": 8900346,
  "lightslategray": 7833753,
  "lightslategrey": 7833753,
  "lightsteelblue": 11584734,
  "lightyellow": 16777184,
  "lime": 65280,
  "limegreen": 3329330,
  "linen": 16445670,
  "magenta": 16711935,
  "maroon": 8388608,
  "mediumaquamarine": 6737322,
  "mediumblue": 205,
  "mediumorchid": 12211667,
  "mediumpurple": 9662683,
  "mediumseagreen": 3978097,
  "mediumslateblue": 8087790,
  "mediumspringgreen": 64154,
  "mediumturquoise": 4772300,
  "mediumvioletred": 13047173,
  "midnightblue": 1644912,
  "mintcream": 16121850,
  "mistyrose": 16770273,
  "moccasin": 16770229,
  "navajowhite": 16768685,
  "navy": 128,
  "oldlace": 16643558,
  "olive": 8421376,
  "olivedrab": 7048739,
  "orange": 16753920,
  "orangered": 16729344,
  "orchid": 14315734,
  "palegoldenrod": 15657130,
  "palegreen": 10025880,
  "paleturquoise": 11529966,
  "palevioletred": 14381203,
  "papayawhip": 16773077,
  "peachpuff": 16767673,
  "peru": 13468991,
  "pink": 16761035,
  "plum": 14524637,
  "powderblue": 11591910,
  "purple": 8388736,
  "rebeccapurple": 6697881,
  "red": 16711680,
  "rosybrown": 12357519,
  "royalblue": 4286945,
  "saddlebrown": 9127187,
  "salmon": 16416882,
  "sandybrown": 16032864,
  "seagreen": 3050327,
  "seashell": 16774638,
  "sienna": 10506797,
  "silver": 12632256,
  "skyblue": 8900331,
  "slateblue": 6970061,
  "slategray": 7372944,
  "slategrey": 7372944,
  "snow": 16775930,
  "springgreen": 65407,
  "steelblue": 4620980,
  "tan": 13808780,
  "teal": 32896,
  "thistle": 14204888,
  "tomato": 16737095,
  "turquoise": 4251856,
  "violet": 15631086,
  "wheat": 16113331,
  "white": 16777215,
  "whitesmoke": 16119285,
  "yellow": 16776960,
  "yellowgreen": 10145074
};
var _hslA = { h: 0, s: 0, l: 0 };
var _hslB = { h: 0, s: 0, l: 0 };
function hue2rgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * 6 * (2 / 3 - t);
  return p;
}
var Color = class {
  /**
   * Constructs a new color.
   *
   * Note that standard method of specifying color in three.js is with a hexadecimal triplet,
   * and that method is used throughout the rest of the documentation.
   *
   * @param {(number|string|Color)} [r] - The red component of the color. If `g` and `b` are
   * not provided, it can be hexadecimal triplet, a CSS-style string or another `Color` instance.
   * @param {number} [g] - The green component.
   * @param {number} [b] - The blue component.
   */
  constructor(r, g, b) {
    this.isColor = true;
    this.r = 1;
    this.g = 1;
    this.b = 1;
    return this.set(r, g, b);
  }
  /**
   * Sets the colors's components from the given values.
   *
   * @param {(number|string|Color)} [r] - The red component of the color. If `g` and `b` are
   * not provided, it can be hexadecimal triplet, a CSS-style string or another `Color` instance.
   * @param {number} [g] - The green component.
   * @param {number} [b] - The blue component.
   * @return {Color} A reference to this color.
   */
  set(r, g, b) {
    if (g === void 0 && b === void 0) {
      const value = r;
      if (value && value.isColor) {
        this.copy(value);
      } else if (typeof value === "number") {
        this.setHex(value);
      } else if (typeof value === "string") {
        this.setStyle(value);
      }
    } else {
      this.setRGB(r, g, b);
    }
    return this;
  }
  /**
   * Sets the colors's components to the given scalar value.
   *
   * @param {number} scalar - The scalar value.
   * @return {Color} A reference to this color.
   */
  setScalar(scalar) {
    this.r = scalar;
    this.g = scalar;
    this.b = scalar;
    return this;
  }
  /**
   * Sets this color from a hexadecimal value.
   *
   * @param {number} hex - The hexadecimal value.
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {Color} A reference to this color.
   */
  setHex(hex, colorSpace = SRGBColorSpace) {
    hex = Math.floor(hex);
    this.r = (hex >> 16 & 255) / 255;
    this.g = (hex >> 8 & 255) / 255;
    this.b = (hex & 255) / 255;
    ColorManagement.colorSpaceToWorking(this, colorSpace);
    return this;
  }
  /**
   * Sets this color from RGB values.
   *
   * @param {number} r - Red channel value between `0.0` and `1.0`.
   * @param {number} g - Green channel value between `0.0` and `1.0`.
   * @param {number} b - Blue channel value between `0.0` and `1.0`.
   * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
   * @return {Color} A reference to this color.
   */
  setRGB(r, g, b, colorSpace = ColorManagement.workingColorSpace) {
    this.r = r;
    this.g = g;
    this.b = b;
    ColorManagement.colorSpaceToWorking(this, colorSpace);
    return this;
  }
  /**
   * Sets this color from RGB values.
   *
   * @param {number} h - Hue value between `0.0` and `1.0`.
   * @param {number} s - Saturation value between `0.0` and `1.0`.
   * @param {number} l - Lightness value between `0.0` and `1.0`.
   * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
   * @return {Color} A reference to this color.
   */
  setHSL(h, s, l, colorSpace = ColorManagement.workingColorSpace) {
    h = euclideanModulo(h, 1);
    s = clamp(s, 0, 1);
    l = clamp(l, 0, 1);
    if (s === 0) {
      this.r = this.g = this.b = l;
    } else {
      const p = l <= 0.5 ? l * (1 + s) : l + s - l * s;
      const q = 2 * l - p;
      this.r = hue2rgb(q, p, h + 1 / 3);
      this.g = hue2rgb(q, p, h);
      this.b = hue2rgb(q, p, h - 1 / 3);
    }
    ColorManagement.colorSpaceToWorking(this, colorSpace);
    return this;
  }
  /**
   * Sets this color from a CSS-style string. For example, `rgb(250, 0,0)`,
   * `rgb(100%, 0%, 0%)`, `hsl(0, 100%, 50%)`, `#ff0000`, `#f00`, or `red` ( or
   * any [X11 color name](https://en.wikipedia.org/wiki/X11_color_names#Color_name_chart) -
   * all 140 color names are supported).
   *
   * @param {string} style - Color as a CSS-style string.
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {Color} A reference to this color.
   */
  setStyle(style, colorSpace = SRGBColorSpace) {
    function handleAlpha(string) {
      if (string === void 0) return;
      if (parseFloat(string) < 1) {
        warn("Color: Alpha component of " + style + " will be ignored.");
      }
    }
    let m;
    if (m = /^(\w+)\(([^\)]*)\)/.exec(style)) {
      let color2;
      const name = m[1];
      const components = m[2];
      switch (name) {
        case "rgb":
        case "rgba":
          if (color2 = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components)) {
            handleAlpha(color2[4]);
            return this.setRGB(
              Math.min(255, parseInt(color2[1], 10)) / 255,
              Math.min(255, parseInt(color2[2], 10)) / 255,
              Math.min(255, parseInt(color2[3], 10)) / 255,
              colorSpace
            );
          }
          if (color2 = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components)) {
            handleAlpha(color2[4]);
            return this.setRGB(
              Math.min(100, parseInt(color2[1], 10)) / 100,
              Math.min(100, parseInt(color2[2], 10)) / 100,
              Math.min(100, parseInt(color2[3], 10)) / 100,
              colorSpace
            );
          }
          break;
        case "hsl":
        case "hsla":
          if (color2 = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components)) {
            handleAlpha(color2[4]);
            return this.setHSL(
              parseFloat(color2[1]) / 360,
              parseFloat(color2[2]) / 100,
              parseFloat(color2[3]) / 100,
              colorSpace
            );
          }
          break;
        default:
          warn("Color: Unknown color model " + style);
      }
    } else if (m = /^\#([A-Fa-f\d]+)$/.exec(style)) {
      const hex = m[1];
      const size = hex.length;
      if (size === 3) {
        return this.setRGB(
          parseInt(hex.charAt(0), 16) / 15,
          parseInt(hex.charAt(1), 16) / 15,
          parseInt(hex.charAt(2), 16) / 15,
          colorSpace
        );
      } else if (size === 6) {
        return this.setHex(parseInt(hex, 16), colorSpace);
      } else {
        warn("Color: Invalid hex color " + style);
      }
    } else if (style && style.length > 0) {
      return this.setColorName(style, colorSpace);
    }
    return this;
  }
  /**
   * Sets this color from a color name. Faster than {@link Color#setStyle} if
   * you don't need the other CSS-style formats.
   *
   * For convenience, the list of names is exposed in `Color.NAMES` as a hash.
   * ```js
   * Color.NAMES.aliceblue // returns 0xF0F8FF
   * ```
   *
   * @param {string} style - The color name.
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {Color} A reference to this color.
   */
  setColorName(style, colorSpace = SRGBColorSpace) {
    const hex = _colorKeywords[style.toLowerCase()];
    if (hex !== void 0) {
      this.setHex(hex, colorSpace);
    } else {
      warn("Color: Unknown color " + style);
    }
    return this;
  }
  /**
   * Returns a new color with copied values from this instance.
   *
   * @return {Color} A clone of this instance.
   */
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  /**
   * Copies the values of the given color to this instance.
   *
   * @param {Color} color - The color to copy.
   * @return {Color} A reference to this color.
   */
  copy(color2) {
    this.r = color2.r;
    this.g = color2.g;
    this.b = color2.b;
    return this;
  }
  /**
   * Copies the given color into this color, and then converts this color from
   * `SRGBColorSpace` to `LinearSRGBColorSpace`.
   *
   * @param {Color} color - The color to copy/convert.
   * @return {Color} A reference to this color.
   */
  copySRGBToLinear(color2) {
    this.r = SRGBToLinear(color2.r);
    this.g = SRGBToLinear(color2.g);
    this.b = SRGBToLinear(color2.b);
    return this;
  }
  /**
   * Copies the given color into this color, and then converts this color from
   * `LinearSRGBColorSpace` to `SRGBColorSpace`.
   *
   * @param {Color} color - The color to copy/convert.
   * @return {Color} A reference to this color.
   */
  copyLinearToSRGB(color2) {
    this.r = LinearToSRGB(color2.r);
    this.g = LinearToSRGB(color2.g);
    this.b = LinearToSRGB(color2.b);
    return this;
  }
  /**
   * Converts this color from `SRGBColorSpace` to `LinearSRGBColorSpace`.
   *
   * @return {Color} A reference to this color.
   */
  convertSRGBToLinear() {
    this.copySRGBToLinear(this);
    return this;
  }
  /**
   * Converts this color from `LinearSRGBColorSpace` to `SRGBColorSpace`.
   *
   * @return {Color} A reference to this color.
   */
  convertLinearToSRGB() {
    this.copyLinearToSRGB(this);
    return this;
  }
  /**
   * Returns the hexadecimal value of this color.
   *
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {number} The hexadecimal value.
   */
  getHex(colorSpace = SRGBColorSpace) {
    ColorManagement.workingToColorSpace(_color.copy(this), colorSpace);
    return Math.round(clamp(_color.r * 255, 0, 255)) * 65536 + Math.round(clamp(_color.g * 255, 0, 255)) * 256 + Math.round(clamp(_color.b * 255, 0, 255));
  }
  /**
   * Returns the hexadecimal value of this color as a string (for example, 'FFFFFF').
   *
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {string} The hexadecimal value as a string.
   */
  getHexString(colorSpace = SRGBColorSpace) {
    return ("000000" + this.getHex(colorSpace).toString(16)).slice(-6);
  }
  /**
   * Converts the colors RGB values into the HSL format and stores them into the
   * given target object.
   *
   * @param {{h:number,s:number,l:number}} target - The target object that is used to store the method's result.
   * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
   * @return {{h:number,s:number,l:number}} The HSL representation of this color.
   */
  getHSL(target, colorSpace = ColorManagement.workingColorSpace) {
    ColorManagement.workingToColorSpace(_color.copy(this), colorSpace);
    const r = _color.r, g = _color.g, b = _color.b;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let hue, saturation;
    const lightness = (min + max) / 2;
    if (min === max) {
      hue = 0;
      saturation = 0;
    } else {
      const delta = max - min;
      saturation = lightness <= 0.5 ? delta / (max + min) : delta / (2 - max - min);
      switch (max) {
        case r:
          hue = (g - b) / delta + (g < b ? 6 : 0);
          break;
        case g:
          hue = (b - r) / delta + 2;
          break;
        case b:
          hue = (r - g) / delta + 4;
          break;
      }
      hue /= 6;
    }
    target.h = hue;
    target.s = saturation;
    target.l = lightness;
    return target;
  }
  /**
   * Returns the RGB values of this color and stores them into the given target object.
   *
   * @param {Color} target - The target color that is used to store the method's result.
   * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
   * @return {Color} The RGB representation of this color.
   */
  getRGB(target, colorSpace = ColorManagement.workingColorSpace) {
    ColorManagement.workingToColorSpace(_color.copy(this), colorSpace);
    target.r = _color.r;
    target.g = _color.g;
    target.b = _color.b;
    return target;
  }
  /**
   * Returns the value of this color as a CSS style string. Example: `rgb(255,0,0)`.
   *
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {string} The CSS representation of this color.
   */
  getStyle(colorSpace = SRGBColorSpace) {
    ColorManagement.workingToColorSpace(_color.copy(this), colorSpace);
    const r = _color.r, g = _color.g, b = _color.b;
    if (colorSpace !== SRGBColorSpace) {
      return `color(${colorSpace} ${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)})`;
    }
    return `rgb(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)})`;
  }
  /**
   * Adds the given HSL values to this color's values.
   * Internally, this converts the color's RGB values to HSL, adds HSL
   * and then converts the color back to RGB.
   *
   * @param {number} h - Hue value between `0.0` and `1.0`.
   * @param {number} s - Saturation value between `0.0` and `1.0`.
   * @param {number} l - Lightness value between `0.0` and `1.0`.
   * @return {Color} A reference to this color.
   */
  offsetHSL(h, s, l) {
    this.getHSL(_hslA);
    return this.setHSL(_hslA.h + h, _hslA.s + s, _hslA.l + l);
  }
  /**
   * Adds the RGB values of the given color to the RGB values of this color.
   *
   * @param {Color} color - The color to add.
   * @return {Color} A reference to this color.
   */
  add(color2) {
    this.r += color2.r;
    this.g += color2.g;
    this.b += color2.b;
    return this;
  }
  /**
   * Adds the RGB values of the given colors and stores the result in this instance.
   *
   * @param {Color} color1 - The first color.
   * @param {Color} color2 - The second color.
   * @return {Color} A reference to this color.
   */
  addColors(color1, color2) {
    this.r = color1.r + color2.r;
    this.g = color1.g + color2.g;
    this.b = color1.b + color2.b;
    return this;
  }
  /**
   * Adds the given scalar value to the RGB values of this color.
   *
   * @param {number} s - The scalar to add.
   * @return {Color} A reference to this color.
   */
  addScalar(s) {
    this.r += s;
    this.g += s;
    this.b += s;
    return this;
  }
  /**
   * Subtracts the RGB values of the given color from the RGB values of this color.
   *
   * @param {Color} color - The color to subtract.
   * @return {Color} A reference to this color.
   */
  sub(color2) {
    this.r = Math.max(0, this.r - color2.r);
    this.g = Math.max(0, this.g - color2.g);
    this.b = Math.max(0, this.b - color2.b);
    return this;
  }
  /**
   * Multiplies the RGB values of the given color with the RGB values of this color.
   *
   * @param {Color} color - The color to multiply.
   * @return {Color} A reference to this color.
   */
  multiply(color2) {
    this.r *= color2.r;
    this.g *= color2.g;
    this.b *= color2.b;
    return this;
  }
  /**
   * Multiplies the given scalar value with the RGB values of this color.
   *
   * @param {number} s - The scalar to multiply.
   * @return {Color} A reference to this color.
   */
  multiplyScalar(s) {
    this.r *= s;
    this.g *= s;
    this.b *= s;
    return this;
  }
  /**
   * Linearly interpolates this color's RGB values toward the RGB values of the
   * given color. The alpha argument can be thought of as the ratio between
   * the two colors, where `0.0` is this color and `1.0` is the first argument.
   *
   * @param {Color} color - The color to converge on.
   * @param {number} alpha - The interpolation factor in the closed interval `[0,1]`.
   * @return {Color} A reference to this color.
   */
  lerp(color2, alpha) {
    this.r += (color2.r - this.r) * alpha;
    this.g += (color2.g - this.g) * alpha;
    this.b += (color2.b - this.b) * alpha;
    return this;
  }
  /**
   * Linearly interpolates between the given colors and stores the result in this instance.
   * The alpha argument can be thought of as the ratio between the two colors, where `0.0`
   * is the first and `1.0` is the second color.
   *
   * @param {Color} color1 - The first color.
   * @param {Color} color2 - The second color.
   * @param {number} alpha - The interpolation factor in the closed interval `[0,1]`.
   * @return {Color} A reference to this color.
   */
  lerpColors(color1, color2, alpha) {
    this.r = color1.r + (color2.r - color1.r) * alpha;
    this.g = color1.g + (color2.g - color1.g) * alpha;
    this.b = color1.b + (color2.b - color1.b) * alpha;
    return this;
  }
  /**
   * Linearly interpolates this color's HSL values toward the HSL values of the
   * given color. It differs from {@link Color#lerp} by not interpolating straight
   * from one color to the other, but instead going through all the hues in between
   * those two colors. The alpha argument can be thought of as the ratio between
   * the two colors, where 0.0 is this color and 1.0 is the first argument.
   *
   * @param {Color} color - The color to converge on.
   * @param {number} alpha - The interpolation factor in the closed interval `[0,1]`.
   * @return {Color} A reference to this color.
   */
  lerpHSL(color2, alpha) {
    this.getHSL(_hslA);
    color2.getHSL(_hslB);
    const h = lerp(_hslA.h, _hslB.h, alpha);
    const s = lerp(_hslA.s, _hslB.s, alpha);
    const l = lerp(_hslA.l, _hslB.l, alpha);
    this.setHSL(h, s, l);
    return this;
  }
  /**
   * Sets the color's RGB components from the given 3D vector.
   *
   * @param {Vector3} v - The vector to set.
   * @return {Color} A reference to this color.
   */
  setFromVector3(v) {
    this.r = v.x;
    this.g = v.y;
    this.b = v.z;
    return this;
  }
  /**
   * Transforms this color with the given 3x3 matrix.
   *
   * @param {Matrix3} m - The matrix.
   * @return {Color} A reference to this color.
   */
  applyMatrix3(m) {
    const r = this.r, g = this.g, b = this.b;
    const e = m.elements;
    this.r = e[0] * r + e[3] * g + e[6] * b;
    this.g = e[1] * r + e[4] * g + e[7] * b;
    this.b = e[2] * r + e[5] * g + e[8] * b;
    return this;
  }
  /**
   * Returns `true` if this color is equal with the given one.
   *
   * @param {Color} c - The color to test for equality.
   * @return {boolean} Whether this bounding color is equal with the given one.
   */
  equals(c) {
    return c.r === this.r && c.g === this.g && c.b === this.b;
  }
  /**
   * Sets this color's RGB components from the given array.
   *
   * @param {Array<number>} array - An array holding the RGB values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Color} A reference to this color.
   */
  fromArray(array2, offset = 0) {
    this.r = array2[offset];
    this.g = array2[offset + 1];
    this.b = array2[offset + 2];
    return this;
  }
  /**
   * Writes the RGB components of this color to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the color components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The color components.
   */
  toArray(array2 = [], offset = 0) {
    array2[offset] = this.r;
    array2[offset + 1] = this.g;
    array2[offset + 2] = this.b;
    return array2;
  }
  /**
   * Sets the components of this color from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding color data.
   * @param {number} index - The index into the attribute.
   * @return {Color} A reference to this color.
   */
  fromBufferAttribute(attribute2, index) {
    this.r = attribute2.getX(index);
    this.g = attribute2.getY(index);
    this.b = attribute2.getZ(index);
    return this;
  }
  /**
   * This methods defines the serialization result of this class. Returns the color
   * as a hexadecimal value.
   *
   * @return {number} The hexadecimal value.
   */
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    yield this.r;
    yield this.g;
    yield this.b;
  }
};
var _color = /* @__PURE__ */ new Color();
Color.NAMES = _colorKeywords;
var Box3 = class {
  /**
   * Constructs a new bounding box.
   *
   * @param {Vector3} [min=(Infinity,Infinity,Infinity)] - A vector representing the lower boundary of the box.
   * @param {Vector3} [max=(-Infinity,-Infinity,-Infinity)] - A vector representing the upper boundary of the box.
   */
  constructor(min = new Vector3(Infinity, Infinity, Infinity), max = new Vector3(-Infinity, -Infinity, -Infinity)) {
    this.isBox3 = true;
    this.min = min;
    this.max = max;
  }
  /**
   * Sets the lower and upper boundaries of this box.
   * Please note that this method only copies the values from the given objects.
   *
   * @param {Vector3} min - The lower boundary of the box.
   * @param {Vector3} max - The upper boundary of the box.
   * @return {Box3} A reference to this bounding box.
   */
  set(min, max) {
    this.min.copy(min);
    this.max.copy(max);
    return this;
  }
  /**
   * Sets the upper and lower bounds of this box so it encloses the position data
   * in the given array.
   *
   * @param {Array<number>} array - An array holding 3D position data.
   * @return {Box3} A reference to this bounding box.
   */
  setFromArray(array2) {
    this.makeEmpty();
    for (let i = 0, il = array2.length; i < il; i += 3) {
      this.expandByPoint(_vector$b.fromArray(array2, i));
    }
    return this;
  }
  /**
   * Sets the upper and lower bounds of this box so it encloses the position data
   * in the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - A buffer attribute holding 3D position data.
   * @return {Box3} A reference to this bounding box.
   */
  setFromBufferAttribute(attribute2) {
    this.makeEmpty();
    for (let i = 0, il = attribute2.count; i < il; i++) {
      this.expandByPoint(_vector$b.fromBufferAttribute(attribute2, i));
    }
    return this;
  }
  /**
   * Sets the upper and lower bounds of this box so it encloses the position data
   * in the given array.
   *
   * @param {Array<Vector3>} points - An array holding 3D position data as instances of {@link Vector3}.
   * @return {Box3} A reference to this bounding box.
   */
  setFromPoints(points) {
    this.makeEmpty();
    for (let i = 0, il = points.length; i < il; i++) {
      this.expandByPoint(points[i]);
    }
    return this;
  }
  /**
   * Centers this box on the given center vector and sets this box's width, height and
   * depth to the given size values.
   *
   * @param {Vector3} center - The center of the box.
   * @param {Vector3} size - The x, y and z dimensions of the box.
   * @return {Box3} A reference to this bounding box.
   */
  setFromCenterAndSize(center, size) {
    const halfSize = _vector$b.copy(size).multiplyScalar(0.5);
    this.min.copy(center).sub(halfSize);
    this.max.copy(center).add(halfSize);
    return this;
  }
  /**
   * Computes the world-axis-aligned bounding box for the given 3D object
   * (including its children), accounting for the object's, and children's,
   * world transforms. The function may result in a larger box than strictly necessary.
   *
   * Note: To compute the correct bounding box, make sure the given 3D object
   * has an up-to-date world matrix that reflects the current transformation of its
   * ancestor nodes. Call `object.updateWorldMatrix( true, false )` beforehand if
   * you're unsure.
   *
   * @param {Object3D} object - The 3D object to compute the bounding box for.
   * @param {boolean} [precise=false] - If set to `true`, the method computes the smallest
   * world-axis-aligned bounding box at the expense of more computation.
   * @return {Box3} A reference to this bounding box.
   */
  setFromObject(object, precise = false) {
    this.makeEmpty();
    return this.expandByObject(object, precise);
  }
  /**
   * Returns a new box with copied values from this instance.
   *
   * @return {Box3} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the values of the given box to this instance.
   *
   * @param {Box3} box - The box to copy.
   * @return {Box3} A reference to this bounding box.
   */
  copy(box) {
    this.min.copy(box.min);
    this.max.copy(box.max);
    return this;
  }
  /**
   * Makes this box empty which means in encloses a zero space in 3D.
   *
   * @return {Box3} A reference to this bounding box.
   */
  makeEmpty() {
    this.min.x = this.min.y = this.min.z = Infinity;
    this.max.x = this.max.y = this.max.z = -Infinity;
    return this;
  }
  /**
   * Returns true if this box includes zero points within its bounds.
   * Note that a box with equal lower and upper bounds still includes one
   * point, the one both bounds share.
   *
   * @return {boolean} Whether this box is empty or not.
   */
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  /**
   * Returns the center point of this box.
   *
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The center point.
   */
  getCenter(target) {
    return this.isEmpty() ? target.set(0, 0, 0) : target.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  /**
   * Returns the dimensions of this box.
   *
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The size.
   */
  getSize(target) {
    return this.isEmpty() ? target.set(0, 0, 0) : target.subVectors(this.max, this.min);
  }
  /**
   * Expands the boundaries of this box to include the given point.
   *
   * @param {Vector3} point - The point that should be included by the bounding box.
   * @return {Box3} A reference to this bounding box.
   */
  expandByPoint(point) {
    this.min.min(point);
    this.max.max(point);
    return this;
  }
  /**
   * Expands this box equilaterally by the given vector. The width of this
   * box will be expanded by the x component of the vector in both
   * directions. The height of this box will be expanded by the y component of
   * the vector in both directions. The depth of this box will be
   * expanded by the z component of the vector in both directions.
   *
   * @param {Vector3} vector - The vector that should expand the bounding box.
   * @return {Box3} A reference to this bounding box.
   */
  expandByVector(vector) {
    this.min.sub(vector);
    this.max.add(vector);
    return this;
  }
  /**
   * Expands each dimension of the box by the given scalar. If negative, the
   * dimensions of the box will be contracted.
   *
   * @param {number} scalar - The scalar value that should expand the bounding box.
   * @return {Box3} A reference to this bounding box.
   */
  expandByScalar(scalar) {
    this.min.addScalar(-scalar);
    this.max.addScalar(scalar);
    return this;
  }
  /**
   * Expands the boundaries of this box to include the given 3D object and
   * its children, accounting for the object's, and children's, world
   * transforms. The function may result in a larger box than strictly
   * necessary (unless the precise parameter is set to true).
   *
   * @param {Object3D} object - The 3D object that should expand the bounding box.
   * @param {boolean} precise - If set to `true`, the method expands the bounding box
   * as little as necessary at the expense of more computation.
   * @return {Box3} A reference to this bounding box.
   */
  expandByObject(object, precise = false) {
    object.updateWorldMatrix(false, false);
    const geometry = object.geometry;
    if (geometry !== void 0) {
      const positionAttribute = geometry.getAttribute("position");
      if (precise === true && positionAttribute !== void 0 && object.isInstancedMesh !== true) {
        for (let i = 0, l = positionAttribute.count; i < l; i++) {
          if (object.isMesh === true) {
            object.getVertexPosition(i, _vector$b);
          } else {
            _vector$b.fromBufferAttribute(positionAttribute, i);
          }
          _vector$b.applyMatrix4(object.matrixWorld);
          this.expandByPoint(_vector$b);
        }
      } else {
        if (object.boundingBox !== void 0) {
          if (object.boundingBox === null) {
            object.computeBoundingBox();
          }
          _box$4.copy(object.boundingBox);
        } else {
          if (geometry.boundingBox === null) {
            geometry.computeBoundingBox();
          }
          _box$4.copy(geometry.boundingBox);
        }
        _box$4.applyMatrix4(object.matrixWorld);
        this.union(_box$4);
      }
    }
    const children = object.children;
    for (let i = 0, l = children.length; i < l; i++) {
      this.expandByObject(children[i], precise);
    }
    return this;
  }
  /**
   * Returns `true` if the given point lies within or on the boundaries of this box.
   *
   * @param {Vector3} point - The point to test.
   * @return {boolean} Whether the bounding box contains the given point or not.
   */
  containsPoint(point) {
    return point.x >= this.min.x && point.x <= this.max.x && point.y >= this.min.y && point.y <= this.max.y && point.z >= this.min.z && point.z <= this.max.z;
  }
  /**
   * Returns `true` if this bounding box includes the entirety of the given bounding box.
   * If this box and the given one are identical, this function also returns `true`.
   *
   * @param {Box3} box - The bounding box to test.
   * @return {boolean} Whether the bounding box contains the given bounding box or not.
   */
  containsBox(box) {
    return this.min.x <= box.min.x && box.max.x <= this.max.x && this.min.y <= box.min.y && box.max.y <= this.max.y && this.min.z <= box.min.z && box.max.z <= this.max.z;
  }
  /**
   * Returns a point as a proportion of this box's width, height and depth.
   *
   * @param {Vector3} point - A point in 3D space.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} A point as a proportion of this box's width, height and depth.
   */
  getParameter(point, target) {
    return target.set(
      (point.x - this.min.x) / (this.max.x - this.min.x),
      (point.y - this.min.y) / (this.max.y - this.min.y),
      (point.z - this.min.z) / (this.max.z - this.min.z)
    );
  }
  /**
   * Returns `true` if the given bounding box intersects with this bounding box.
   *
   * @param {Box3} box - The bounding box to test.
   * @return {boolean} Whether the given bounding box intersects with this bounding box.
   */
  intersectsBox(box) {
    return box.max.x >= this.min.x && box.min.x <= this.max.x && box.max.y >= this.min.y && box.min.y <= this.max.y && box.max.z >= this.min.z && box.min.z <= this.max.z;
  }
  /**
   * Returns `true` if the given bounding sphere intersects with this bounding box.
   *
   * @param {Sphere} sphere - The bounding sphere to test.
   * @return {boolean} Whether the given bounding sphere intersects with this bounding box.
   */
  intersectsSphere(sphere) {
    this.clampPoint(sphere.center, _vector$b);
    return _vector$b.distanceToSquared(sphere.center) <= sphere.radius * sphere.radius;
  }
  /**
   * Returns `true` if the given plane intersects with this bounding box.
   *
   * @param {Plane} plane - The plane to test.
   * @return {boolean} Whether the given plane intersects with this bounding box.
   */
  intersectsPlane(plane) {
    let min, max;
    if (plane.normal.x > 0) {
      min = plane.normal.x * this.min.x;
      max = plane.normal.x * this.max.x;
    } else {
      min = plane.normal.x * this.max.x;
      max = plane.normal.x * this.min.x;
    }
    if (plane.normal.y > 0) {
      min += plane.normal.y * this.min.y;
      max += plane.normal.y * this.max.y;
    } else {
      min += plane.normal.y * this.max.y;
      max += plane.normal.y * this.min.y;
    }
    if (plane.normal.z > 0) {
      min += plane.normal.z * this.min.z;
      max += plane.normal.z * this.max.z;
    } else {
      min += plane.normal.z * this.max.z;
      max += plane.normal.z * this.min.z;
    }
    return min <= -plane.constant && max >= -plane.constant;
  }
  /**
   * Returns `true` if the given triangle intersects with this bounding box.
   *
   * @param {Triangle} triangle - The triangle to test.
   * @return {boolean} Whether the given triangle intersects with this bounding box.
   */
  intersectsTriangle(triangle) {
    if (this.isEmpty()) {
      return false;
    }
    this.getCenter(_center);
    _extents.subVectors(this.max, _center);
    _v0$1.subVectors(triangle.a, _center);
    _v1$4.subVectors(triangle.b, _center);
    _v2$3.subVectors(triangle.c, _center);
    _f0.subVectors(_v1$4, _v0$1);
    _f1.subVectors(_v2$3, _v1$4);
    _f2.subVectors(_v0$1, _v2$3);
    let axes = [
      0,
      -_f0.z,
      _f0.y,
      0,
      -_f1.z,
      _f1.y,
      0,
      -_f2.z,
      _f2.y,
      _f0.z,
      0,
      -_f0.x,
      _f1.z,
      0,
      -_f1.x,
      _f2.z,
      0,
      -_f2.x,
      -_f0.y,
      _f0.x,
      0,
      -_f1.y,
      _f1.x,
      0,
      -_f2.y,
      _f2.x,
      0
    ];
    if (!satForAxes(axes, _v0$1, _v1$4, _v2$3, _extents)) {
      return false;
    }
    axes = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    if (!satForAxes(axes, _v0$1, _v1$4, _v2$3, _extents)) {
      return false;
    }
    _triangleNormal.crossVectors(_f0, _f1);
    axes = [_triangleNormal.x, _triangleNormal.y, _triangleNormal.z];
    return satForAxes(axes, _v0$1, _v1$4, _v2$3, _extents);
  }
  /**
   * Clamps the given point within the bounds of this box.
   *
   * @param {Vector3} point - The point to clamp.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The clamped point.
   */
  clampPoint(point, target) {
    return target.copy(point).clamp(this.min, this.max);
  }
  /**
   * Returns the euclidean distance from any edge of this box to the specified point. If
   * the given point lies inside of this box, the distance will be `0`.
   *
   * @param {Vector3} point - The point to compute the distance to.
   * @return {number} The euclidean distance.
   */
  distanceToPoint(point) {
    return this.clampPoint(point, _vector$b).distanceTo(point);
  }
  /**
   * Returns a bounding sphere that encloses this bounding box.
   *
   * @param {Sphere} target - The target sphere that is used to store the method's result.
   * @return {Sphere} The bounding sphere that encloses this bounding box.
   */
  getBoundingSphere(target) {
    if (this.isEmpty()) {
      target.makeEmpty();
    } else {
      this.getCenter(target.center);
      target.radius = this.getSize(_vector$b).length() * 0.5;
    }
    return target;
  }
  /**
   * Computes the intersection of this bounding box and the given one, setting the upper
   * bound of this box to the lesser of the two boxes' upper bounds and the
   * lower bound of this box to the greater of the two boxes' lower bounds. If
   * there's no overlap, makes this box empty.
   *
   * @param {Box3} box - The bounding box to intersect with.
   * @return {Box3} A reference to this bounding box.
   */
  intersect(box) {
    this.min.max(box.min);
    this.max.min(box.max);
    if (this.isEmpty()) this.makeEmpty();
    return this;
  }
  /**
   * Computes the union of this box and another and the given one, setting the upper
   * bound of this box to the greater of the two boxes' upper bounds and the
   * lower bound of this box to the lesser of the two boxes' lower bounds.
   *
   * @param {Box3} box - The bounding box that will be unioned with this instance.
   * @return {Box3} A reference to this bounding box.
   */
  union(box) {
    this.min.min(box.min);
    this.max.max(box.max);
    return this;
  }
  /**
   * Transforms this bounding box by the given 4x4 transformation matrix.
   *
   * @param {Matrix4} matrix - The transformation matrix.
   * @return {Box3} A reference to this bounding box.
   */
  applyMatrix4(matrix) {
    if (this.isEmpty()) return this;
    _points[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(matrix);
    _points[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(matrix);
    _points[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(matrix);
    _points[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(matrix);
    _points[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(matrix);
    _points[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(matrix);
    _points[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(matrix);
    _points[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(matrix);
    this.setFromPoints(_points);
    return this;
  }
  /**
   * Adds the given offset to both the upper and lower bounds of this bounding box,
   * effectively moving it in 3D space.
   *
   * @param {Vector3} offset - The offset that should be used to translate the bounding box.
   * @return {Box3} A reference to this bounding box.
   */
  translate(offset) {
    this.min.add(offset);
    this.max.add(offset);
    return this;
  }
  /**
   * Returns `true` if this bounding box is equal with the given one.
   *
   * @param {Box3} box - The box to test for equality.
   * @return {boolean} Whether this bounding box is equal with the given one.
   */
  equals(box) {
    return box.min.equals(this.min) && box.max.equals(this.max);
  }
  /**
   * Returns a serialized structure of the bounding box.
   *
   * @return {Object} Serialized structure with fields representing the object state.
   */
  toJSON() {
    return {
      min: this.min.toArray(),
      max: this.max.toArray()
    };
  }
  /**
   * Returns a serialized structure of the bounding box.
   *
   * @param {Object} json - The serialized json to set the box from.
   * @return {Box3} A reference to this bounding box.
   */
  fromJSON(json) {
    this.min.fromArray(json.min);
    this.max.fromArray(json.max);
    return this;
  }
};
var _points = [
  /* @__PURE__ */ new Vector3(),
  /* @__PURE__ */ new Vector3(),
  /* @__PURE__ */ new Vector3(),
  /* @__PURE__ */ new Vector3(),
  /* @__PURE__ */ new Vector3(),
  /* @__PURE__ */ new Vector3(),
  /* @__PURE__ */ new Vector3(),
  /* @__PURE__ */ new Vector3()
];
var _vector$b = /* @__PURE__ */ new Vector3();
var _box$4 = /* @__PURE__ */ new Box3();
var _v0$1 = /* @__PURE__ */ new Vector3();
var _v1$4 = /* @__PURE__ */ new Vector3();
var _v2$3 = /* @__PURE__ */ new Vector3();
var _f0 = /* @__PURE__ */ new Vector3();
var _f1 = /* @__PURE__ */ new Vector3();
var _f2 = /* @__PURE__ */ new Vector3();
var _center = /* @__PURE__ */ new Vector3();
var _extents = /* @__PURE__ */ new Vector3();
var _triangleNormal = /* @__PURE__ */ new Vector3();
var _testAxis = /* @__PURE__ */ new Vector3();
function satForAxes(axes, v0, v1, v2, extents) {
  for (let i = 0, j = axes.length - 3; i <= j; i += 3) {
    _testAxis.fromArray(axes, i);
    const r = extents.x * Math.abs(_testAxis.x) + extents.y * Math.abs(_testAxis.y) + extents.z * Math.abs(_testAxis.z);
    const p0 = v0.dot(_testAxis);
    const p1 = v1.dot(_testAxis);
    const p2 = v2.dot(_testAxis);
    if (Math.max(-Math.max(p0, p1, p2), Math.min(p0, p1, p2)) > r) {
      return false;
    }
  }
  return true;
}
var _vector$a = /* @__PURE__ */ new Vector3();
var _vector2$1 = /* @__PURE__ */ new Vector2();
var _id$2 = 0;
var BufferAttribute = class extends EventDispatcher {
  /**
   * Constructs a new buffer attribute.
   *
   * @param {TypedArray} array - The array holding the attribute data.
   * @param {number} itemSize - The item size.
   * @param {boolean} [normalized=false] - Whether the data are normalized or not.
   */
  constructor(array2, itemSize, normalized = false) {
    super();
    if (Array.isArray(array2)) {
      throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    }
    this.isBufferAttribute = true;
    Object.defineProperty(this, "id", { value: _id$2++ });
    this.name = "";
    this.array = array2;
    this.itemSize = itemSize;
    this.count = array2 !== void 0 ? array2.length / itemSize : 0;
    this.normalized = normalized;
    this.usage = StaticDrawUsage;
    this.updateRanges = [];
    this.gpuType = FloatType;
    this.version = 0;
  }
  /**
   * A callback function that is executed after the renderer has transferred the attribute
   * array data to the GPU.
   */
  onUploadCallback() {
  }
  /**
   * Flag to indicate that this attribute has changed and should be re-sent to
   * the GPU. Set this to `true` when you modify the value of the array.
   *
   * @type {number}
   * @default false
   * @param {boolean} value
   */
  set needsUpdate(value) {
    if (value === true) this.version++;
  }
  /**
   * Sets the usage of this buffer attribute.
   *
   * @param {(StaticDrawUsage|DynamicDrawUsage|StreamDrawUsage|StaticReadUsage|DynamicReadUsage|StreamReadUsage|StaticCopyUsage|DynamicCopyUsage|StreamCopyUsage)} value - The usage to set.
   * @return {BufferAttribute} A reference to this buffer attribute.
   */
  setUsage(value) {
    this.usage = value;
    return this;
  }
  /**
   * Adds a range of data in the data array to be updated on the GPU.
   *
   * @param {number} start - Position at which to start update.
   * @param {number} count - The number of components to update.
   */
  addUpdateRange(start, count) {
    this.updateRanges.push({ start, count });
  }
  /**
   * Clears the update ranges.
   */
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  /**
   * Copies the values of the given buffer attribute to this instance.
   *
   * @param {BufferAttribute} source - The buffer attribute to copy.
   * @return {BufferAttribute} A reference to this instance.
   */
  copy(source) {
    this.name = source.name;
    this.array = new source.array.constructor(source.array);
    this.itemSize = source.itemSize;
    this.count = source.count;
    this.normalized = source.normalized;
    this.usage = source.usage;
    this.gpuType = source.gpuType;
    return this;
  }
  /**
   * Copies a vector from the given buffer attribute to this one. The start
   * and destination position in the attribute buffers are represented by the
   * given indices.
   *
   * @param {number} index1 - The destination index into this buffer attribute.
   * @param {BufferAttribute} attribute - The buffer attribute to copy from.
   * @param {number} index2 - The source index into the given buffer attribute.
   * @return {BufferAttribute} A reference to this instance.
   */
  copyAt(index1, attribute2, index2) {
    index1 *= this.itemSize;
    index2 *= attribute2.itemSize;
    for (let i = 0, l = this.itemSize; i < l; i++) {
      this.array[index1 + i] = attribute2.array[index2 + i];
    }
    return this;
  }
  /**
   * Copies the given array data into this buffer attribute.
   *
   * @param {(TypedArray|Array)} array - The array to copy.
   * @return {BufferAttribute} A reference to this instance.
   */
  copyArray(array2) {
    this.array.set(array2);
    return this;
  }
  /**
   * Applies the given 3x3 matrix to the given attribute. Works with
   * item size `2` and `3`.
   *
   * @param {Matrix3} m - The matrix to apply.
   * @return {BufferAttribute} A reference to this instance.
   */
  applyMatrix3(m) {
    if (this.itemSize === 2) {
      for (let i = 0, l = this.count; i < l; i++) {
        _vector2$1.fromBufferAttribute(this, i);
        _vector2$1.applyMatrix3(m);
        this.setXY(i, _vector2$1.x, _vector2$1.y);
      }
    } else if (this.itemSize === 3) {
      for (let i = 0, l = this.count; i < l; i++) {
        _vector$a.fromBufferAttribute(this, i);
        _vector$a.applyMatrix3(m);
        this.setXYZ(i, _vector$a.x, _vector$a.y, _vector$a.z);
      }
    }
    return this;
  }
  /**
   * Applies the given 4x4 matrix to the given attribute. Only works with
   * item size `3`.
   *
   * @param {Matrix4} m - The matrix to apply.
   * @return {BufferAttribute} A reference to this instance.
   */
  applyMatrix4(m) {
    for (let i = 0, l = this.count; i < l; i++) {
      _vector$a.fromBufferAttribute(this, i);
      _vector$a.applyMatrix4(m);
      this.setXYZ(i, _vector$a.x, _vector$a.y, _vector$a.z);
    }
    return this;
  }
  /**
   * Applies the given 3x3 normal matrix to the given attribute. Only works with
   * item size `3`.
   *
   * @param {Matrix3} m - The normal matrix to apply.
   * @return {BufferAttribute} A reference to this instance.
   */
  applyNormalMatrix(m) {
    for (let i = 0, l = this.count; i < l; i++) {
      _vector$a.fromBufferAttribute(this, i);
      _vector$a.applyNormalMatrix(m);
      this.setXYZ(i, _vector$a.x, _vector$a.y, _vector$a.z);
    }
    return this;
  }
  /**
   * Applies the given 4x4 matrix to the given attribute. Only works with
   * item size `3` and with direction vectors.
   *
   * @param {Matrix4} m - The matrix to apply.
   * @return {BufferAttribute} A reference to this instance.
   */
  transformDirection(m) {
    for (let i = 0, l = this.count; i < l; i++) {
      _vector$a.fromBufferAttribute(this, i);
      _vector$a.transformDirection(m);
      this.setXYZ(i, _vector$a.x, _vector$a.y, _vector$a.z);
    }
    return this;
  }
  /**
   * Sets the given array data in the buffer attribute.
   *
   * @param {(TypedArray|Array)} value - The array data to set.
   * @param {number} [offset=0] - The offset in this buffer attribute's array.
   * @return {BufferAttribute} A reference to this instance.
   */
  set(value, offset = 0) {
    this.array.set(value, offset);
    return this;
  }
  /**
   * Returns the given component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} component - The component index.
   * @return {number} The returned value.
   */
  getComponent(index, component) {
    let value = this.array[index * this.itemSize + component];
    if (this.normalized) value = denormalize(value, this.array);
    return value;
  }
  /**
   * Sets the given value to the given component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} component - The component index.
   * @param {number} value - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setComponent(index, component, value) {
    if (this.normalized) value = normalize(value, this.array);
    this.array[index * this.itemSize + component] = value;
    return this;
  }
  /**
   * Returns the x component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @return {number} The x component.
   */
  getX(index) {
    let x = this.array[index * this.itemSize];
    if (this.normalized) x = denormalize(x, this.array);
    return x;
  }
  /**
   * Sets the x component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} x - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setX(index, x) {
    if (this.normalized) x = normalize(x, this.array);
    this.array[index * this.itemSize] = x;
    return this;
  }
  /**
   * Returns the y component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @return {number} The y component.
   */
  getY(index) {
    let y = this.array[index * this.itemSize + 1];
    if (this.normalized) y = denormalize(y, this.array);
    return y;
  }
  /**
   * Sets the y component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} y - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setY(index, y) {
    if (this.normalized) y = normalize(y, this.array);
    this.array[index * this.itemSize + 1] = y;
    return this;
  }
  /**
   * Returns the z component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @return {number} The z component.
   */
  getZ(index) {
    let z = this.array[index * this.itemSize + 2];
    if (this.normalized) z = denormalize(z, this.array);
    return z;
  }
  /**
   * Sets the z component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} z - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setZ(index, z) {
    if (this.normalized) z = normalize(z, this.array);
    this.array[index * this.itemSize + 2] = z;
    return this;
  }
  /**
   * Returns the w component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @return {number} The w component.
   */
  getW(index) {
    let w = this.array[index * this.itemSize + 3];
    if (this.normalized) w = denormalize(w, this.array);
    return w;
  }
  /**
   * Sets the w component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} w - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setW(index, w) {
    if (this.normalized) w = normalize(w, this.array);
    this.array[index * this.itemSize + 3] = w;
    return this;
  }
  /**
   * Sets the x and y component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} x - The value for the x component to set.
   * @param {number} y - The value for the y component to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setXY(index, x, y) {
    index *= this.itemSize;
    if (this.normalized) {
      x = normalize(x, this.array);
      y = normalize(y, this.array);
    }
    this.array[index + 0] = x;
    this.array[index + 1] = y;
    return this;
  }
  /**
   * Sets the x, y and z component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} x - The value for the x component to set.
   * @param {number} y - The value for the y component to set.
   * @param {number} z - The value for the z component to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setXYZ(index, x, y, z) {
    index *= this.itemSize;
    if (this.normalized) {
      x = normalize(x, this.array);
      y = normalize(y, this.array);
      z = normalize(z, this.array);
    }
    this.array[index + 0] = x;
    this.array[index + 1] = y;
    this.array[index + 2] = z;
    return this;
  }
  /**
   * Sets the x, y, z and w component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} x - The value for the x component to set.
   * @param {number} y - The value for the y component to set.
   * @param {number} z - The value for the z component to set.
   * @param {number} w - The value for the w component to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setXYZW(index, x, y, z, w) {
    index *= this.itemSize;
    if (this.normalized) {
      x = normalize(x, this.array);
      y = normalize(y, this.array);
      z = normalize(z, this.array);
      w = normalize(w, this.array);
    }
    this.array[index + 0] = x;
    this.array[index + 1] = y;
    this.array[index + 2] = z;
    this.array[index + 3] = w;
    return this;
  }
  /**
   * Sets the given callback function that is executed after the Renderer has transferred
   * the attribute array data to the GPU. Can be used to perform clean-up operations after
   * the upload when attribute data are not needed anymore on the CPU side.
   *
   * @param {Function} callback - The `onUpload()` callback.
   * @return {BufferAttribute} A reference to this instance.
   */
  onUpload(callback) {
    this.onUploadCallback = callback;
    return this;
  }
  /**
   * Returns a new buffer attribute with copied values from this instance.
   *
   * @return {BufferAttribute} A clone of this instance.
   */
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  /**
   * Serializes the buffer attribute into JSON.
   *
   * @return {Object} A JSON object representing the serialized buffer attribute.
   */
  toJSON() {
    const data = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized
    };
    if (this.name !== "") data.name = this.name;
    if (this.usage !== StaticDrawUsage) data.usage = this.usage;
    return data;
  }
  /**
   * Disposes of the buffer attribute. Available only in {@link WebGPURenderer}.
   */
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
};
var _box$3 = /* @__PURE__ */ new Box3();
var _v1$3 = /* @__PURE__ */ new Vector3();
var _v2$2 = /* @__PURE__ */ new Vector3();
var Sphere = class {
  /**
   * Constructs a new sphere.
   *
   * @param {Vector3} [center=(0,0,0)] - The center of the sphere
   * @param {number} [radius=-1] - The radius of the sphere.
   */
  constructor(center = new Vector3(), radius = -1) {
    this.isSphere = true;
    this.center = center;
    this.radius = radius;
  }
  /**
   * Sets the sphere's components by copying the given values.
   *
   * @param {Vector3} center - The center.
   * @param {number} radius - The radius.
   * @return {Sphere} A reference to this sphere.
   */
  set(center, radius) {
    this.center.copy(center);
    this.radius = radius;
    return this;
  }
  /**
   * Computes the minimum bounding sphere for list of points.
   * If the optional center point is given, it is used as the sphere's
   * center. Otherwise, the center of the axis-aligned bounding box
   * encompassing the points is calculated.
   *
   * @param {Array<Vector3>} points - A list of points in 3D space.
   * @param {Vector3} [optionalCenter] - The center of the sphere.
   * @return {Sphere} A reference to this sphere.
   */
  setFromPoints(points, optionalCenter) {
    const center = this.center;
    if (optionalCenter !== void 0) {
      center.copy(optionalCenter);
    } else {
      _box$3.setFromPoints(points).getCenter(center);
    }
    let maxRadiusSq = 0;
    for (let i = 0, il = points.length; i < il; i++) {
      maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(points[i]));
    }
    this.radius = Math.sqrt(maxRadiusSq);
    return this;
  }
  /**
   * Copies the values of the given sphere to this instance.
   *
   * @param {Sphere} sphere - The sphere to copy.
   * @return {Sphere} A reference to this sphere.
   */
  copy(sphere) {
    this.center.copy(sphere.center);
    this.radius = sphere.radius;
    return this;
  }
  /**
   * Returns `true` if the sphere is empty (the radius set to a negative number).
   *
   * Spheres with a radius of `0` contain only their center point and are not
   * considered to be empty.
   *
   * @return {boolean} Whether this sphere is empty or not.
   */
  isEmpty() {
    return this.radius < 0;
  }
  /**
   * Makes this sphere empty which means in encloses a zero space in 3D.
   *
   * @return {Sphere} A reference to this sphere.
   */
  makeEmpty() {
    this.center.set(0, 0, 0);
    this.radius = -1;
    return this;
  }
  /**
   * Returns `true` if this sphere contains the given point inclusive of
   * the surface of the sphere.
   *
   * @param {Vector3} point - The point to check.
   * @return {boolean} Whether this sphere contains the given point or not.
   */
  containsPoint(point) {
    return point.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  /**
   * Returns the closest distance from the boundary of the sphere to the
   * given point. If the sphere contains the point, the distance will
   * be negative.
   *
   * @param {Vector3} point - The point to compute the distance to.
   * @return {number} The distance to the point.
   */
  distanceToPoint(point) {
    return point.distanceTo(this.center) - this.radius;
  }
  /**
   * Returns `true` if this sphere intersects with the given one.
   *
   * @param {Sphere} sphere - The sphere to test.
   * @return {boolean} Whether this sphere intersects with the given one or not.
   */
  intersectsSphere(sphere) {
    const radiusSum = this.radius + sphere.radius;
    return sphere.center.distanceToSquared(this.center) <= radiusSum * radiusSum;
  }
  /**
   * Returns `true` if this sphere intersects with the given box.
   *
   * @param {Box3} box - The box to test.
   * @return {boolean} Whether this sphere intersects with the given box or not.
   */
  intersectsBox(box) {
    return box.intersectsSphere(this);
  }
  /**
   * Returns `true` if this sphere intersects with the given plane.
   *
   * @param {Plane} plane - The plane to test.
   * @return {boolean} Whether this sphere intersects with the given plane or not.
   */
  intersectsPlane(plane) {
    return Math.abs(plane.distanceToPoint(this.center)) <= this.radius;
  }
  /**
   * Clamps a point within the sphere. If the point is outside the sphere, it
   * will clamp it to the closest point on the edge of the sphere. Points
   * already inside the sphere will not be affected.
   *
   * @param {Vector3} point - The plane to clamp.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The clamped point.
   */
  clampPoint(point, target) {
    const deltaLengthSq = this.center.distanceToSquared(point);
    target.copy(point);
    if (deltaLengthSq > this.radius * this.radius) {
      target.sub(this.center).normalize();
      target.multiplyScalar(this.radius).add(this.center);
    }
    return target;
  }
  /**
   * Returns a bounding box that encloses this sphere.
   *
   * @param {Box3} target - The target box that is used to store the method's result.
   * @return {Box3} The bounding box that encloses this sphere.
   */
  getBoundingBox(target) {
    if (this.isEmpty()) {
      target.makeEmpty();
      return target;
    }
    target.set(this.center, this.center);
    target.expandByScalar(this.radius);
    return target;
  }
  /**
   * Transforms this sphere with the given 4x4 transformation matrix.
   *
   * @param {Matrix4} matrix - The transformation matrix.
   * @return {Sphere} A reference to this sphere.
   */
  applyMatrix4(matrix) {
    this.center.applyMatrix4(matrix);
    this.radius = this.radius * matrix.getMaxScaleOnAxis();
    return this;
  }
  /**
   * Translates the sphere's center by the given offset.
   *
   * @param {Vector3} offset - The offset.
   * @return {Sphere} A reference to this sphere.
   */
  translate(offset) {
    this.center.add(offset);
    return this;
  }
  /**
   * Expands the boundaries of this sphere to include the given point.
   *
   * @param {Vector3} point - The point to include.
   * @return {Sphere} A reference to this sphere.
   */
  expandByPoint(point) {
    if (this.isEmpty()) {
      this.center.copy(point);
      this.radius = 0;
      return this;
    }
    _v1$3.subVectors(point, this.center);
    const lengthSq2 = _v1$3.lengthSq();
    if (lengthSq2 > this.radius * this.radius) {
      const length2 = Math.sqrt(lengthSq2);
      const delta = (length2 - this.radius) * 0.5;
      this.center.addScaledVector(_v1$3, delta / length2);
      this.radius += delta;
    }
    return this;
  }
  /**
   * Expands this sphere to enclose both the original sphere and the given sphere.
   *
   * @param {Sphere} sphere - The sphere to include.
   * @return {Sphere} A reference to this sphere.
   */
  union(sphere) {
    if (sphere.isEmpty()) {
      return this;
    }
    if (this.isEmpty()) {
      this.copy(sphere);
      return this;
    }
    if (this.center.equals(sphere.center) === true) {
      this.radius = Math.max(this.radius, sphere.radius);
    } else {
      _v2$2.subVectors(sphere.center, this.center).setLength(sphere.radius);
      this.expandByPoint(_v1$3.copy(sphere.center).add(_v2$2));
      this.expandByPoint(_v1$3.copy(sphere.center).sub(_v2$2));
    }
    return this;
  }
  /**
   * Returns `true` if this sphere is equal with the given one.
   *
   * @param {Sphere} sphere - The sphere to test for equality.
   * @return {boolean} Whether this bounding sphere is equal with the given one.
   */
  equals(sphere) {
    return sphere.center.equals(this.center) && sphere.radius === this.radius;
  }
  /**
   * Returns a new sphere with copied values from this instance.
   *
   * @return {Sphere} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Returns a serialized structure of the bounding sphere.
   *
   * @return {Object} Serialized structure with fields representing the object state.
   */
  toJSON() {
    return {
      radius: this.radius,
      center: this.center.toArray()
    };
  }
  /**
   * Returns a serialized structure of the bounding sphere.
   *
   * @param {Object} json - The serialized json to set the sphere from.
   * @return {Sphere} A reference to this bounding sphere.
   */
  fromJSON(json) {
    this.radius = json.radius;
    this.center.fromArray(json.center);
    return this;
  }
};
var InterleavedBuffer = class {
  /**
   * Constructs a new interleaved buffer.
   *
   * @param {TypedArray} array - A typed array with a shared buffer storing attribute data.
   * @param {number} stride - The number of typed-array elements per vertex.
   */
  constructor(array2, stride) {
    this.isInterleavedBuffer = true;
    this.array = array2;
    this.stride = stride;
    this.count = array2 !== void 0 ? array2.length / stride : 0;
    this.usage = StaticDrawUsage;
    this.updateRanges = [];
    this.version = 0;
    this.uuid = generateUUID();
  }
  /**
   * A callback function that is executed after the renderer has transferred the attribute array
   * data to the GPU.
   */
  onUploadCallback() {
  }
  /**
   * Flag to indicate that this attribute has changed and should be re-sent to
   * the GPU. Set this to `true` when you modify the value of the array.
   *
   * @type {number}
   * @default false
   * @param {boolean} value
   */
  set needsUpdate(value) {
    if (value === true) this.version++;
  }
  /**
   * Sets the usage of this interleaved buffer.
   *
   * @param {(StaticDrawUsage|DynamicDrawUsage|StreamDrawUsage|StaticReadUsage|DynamicReadUsage|StreamReadUsage|StaticCopyUsage|DynamicCopyUsage|StreamCopyUsage)} value - The usage to set.
   * @return {InterleavedBuffer} A reference to this interleaved buffer.
   */
  setUsage(value) {
    this.usage = value;
    return this;
  }
  /**
   * Adds a range of data in the data array to be updated on the GPU.
   *
   * @param {number} start - Position at which to start update.
   * @param {number} count - The number of components to update.
   */
  addUpdateRange(start, count) {
    this.updateRanges.push({ start, count });
  }
  /**
   * Clears the update ranges.
   */
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  /**
   * Copies the values of the given interleaved buffer to this instance.
   *
   * @param {InterleavedBuffer} source - The interleaved buffer to copy.
   * @return {InterleavedBuffer} A reference to this instance.
   */
  copy(source) {
    this.array = new source.array.constructor(source.array);
    this.count = source.count;
    this.stride = source.stride;
    this.usage = source.usage;
    return this;
  }
  /**
   * Copies a vector from the given interleaved buffer to this one. The start
   * and destination position in the attribute buffers are represented by the
   * given indices.
   *
   * @param {number} index1 - The destination index into this interleaved buffer.
   * @param {InterleavedBuffer} interleavedBuffer - The interleaved buffer to copy from.
   * @param {number} index2 - The source index into the given interleaved buffer.
   * @return {InterleavedBuffer} A reference to this instance.
   */
  copyAt(index1, interleavedBuffer, index2) {
    index1 *= this.stride;
    index2 *= interleavedBuffer.stride;
    for (let i = 0, l = this.stride; i < l; i++) {
      this.array[index1 + i] = interleavedBuffer.array[index2 + i];
    }
    return this;
  }
  /**
   * Sets the given array data in the interleaved buffer.
   *
   * @param {(TypedArray|Array)} value - The array data to set.
   * @param {number} [offset=0] - The offset in this interleaved buffer's array.
   * @return {InterleavedBuffer} A reference to this instance.
   */
  set(value, offset = 0) {
    this.array.set(value, offset);
    return this;
  }
  /**
   * Returns a new interleaved buffer with copied values from this instance.
   *
   * @param {Object} [data] - An object with shared array buffers that allows to retain shared structures.
   * @return {InterleavedBuffer} A clone of this instance.
   */
  clone(data) {
    if (data.arrayBuffers === void 0) {
      data.arrayBuffers = {};
    }
    if (this.array.buffer._uuid === void 0) {
      this.array.buffer._uuid = generateUUID();
    }
    if (data.arrayBuffers[this.array.buffer._uuid] === void 0) {
      data.arrayBuffers[this.array.buffer._uuid] = this.array.slice(0).buffer;
    }
    const array2 = new this.array.constructor(data.arrayBuffers[this.array.buffer._uuid]);
    const ib = new this.constructor(array2, this.stride);
    ib.setUsage(this.usage);
    return ib;
  }
  /**
   * Sets the given callback function that is executed after the Renderer has transferred
   * the array data to the GPU. Can be used to perform clean-up operations after
   * the upload when data are not needed anymore on the CPU side.
   *
   * @param {Function} callback - The `onUpload()` callback.
   * @return {InterleavedBuffer} A reference to this instance.
   */
  onUpload(callback) {
    this.onUploadCallback = callback;
    return this;
  }
  /**
   * Serializes the interleaved buffer into JSON.
   *
   * @param {Object} [data] - An optional value holding meta information about the serialization.
   * @return {Object} A JSON object representing the serialized interleaved buffer.
   */
  toJSON(data) {
    if (data.arrayBuffers === void 0) {
      data.arrayBuffers = {};
    }
    if (this.array.buffer._uuid === void 0) {
      this.array.buffer._uuid = generateUUID();
    }
    if (data.arrayBuffers[this.array.buffer._uuid] === void 0) {
      data.arrayBuffers[this.array.buffer._uuid] = Array.from(new Uint32Array(this.array.buffer));
    }
    return {
      uuid: this.uuid,
      buffer: this.array.buffer._uuid,
      type: this.array.constructor.name,
      stride: this.stride
    };
  }
};
var _vector$8 = /* @__PURE__ */ new Vector3();
var InterleavedBufferAttribute = class _InterleavedBufferAttribute {
  /**
   * Constructs a new interleaved buffer attribute.
   *
   * @param {InterleavedBuffer} interleavedBuffer - The buffer holding the interleaved data.
   * @param {number} itemSize - The item size.
   * @param {number} offset - The attribute offset into the buffer.
   * @param {boolean} [normalized=false] - Whether the data are normalized or not.
   */
  constructor(interleavedBuffer, itemSize, offset, normalized = false) {
    this.isInterleavedBufferAttribute = true;
    this.name = "";
    this.data = interleavedBuffer;
    this.itemSize = itemSize;
    this.offset = offset;
    this.normalized = normalized;
  }
  /**
   * The item count of this buffer attribute.
   *
   * @type {number}
   * @readonly
   */
  get count() {
    return this.data.count;
  }
  /**
   * The array holding the interleaved buffer attribute data.
   *
   * @type {TypedArray}
   */
  get array() {
    return this.data.array;
  }
  /**
   * Flag to indicate that this attribute has changed and should be re-sent to
   * the GPU. Set this to `true` when you modify the value of the array.
   *
   * @type {number}
   * @default false
   * @param {boolean} value
   */
  set needsUpdate(value) {
    this.data.needsUpdate = value;
  }
  /**
   * Applies the given 4x4 matrix to the given attribute. Only works with
   * item size `3`.
   *
   * @param {Matrix4} m - The matrix to apply.
   * @return {InterleavedBufferAttribute} A reference to this instance.
   */
  applyMatrix4(m) {
    for (let i = 0, l = this.data.count; i < l; i++) {
      _vector$8.fromBufferAttribute(this, i);
      _vector$8.applyMatrix4(m);
      this.setXYZ(i, _vector$8.x, _vector$8.y, _vector$8.z);
    }
    return this;
  }
  /**
   * Applies the given 3x3 normal matrix to the given attribute. Only works with
   * item size `3`.
   *
   * @param {Matrix3} m - The normal matrix to apply.
   * @return {InterleavedBufferAttribute} A reference to this instance.
   */
  applyNormalMatrix(m) {
    for (let i = 0, l = this.count; i < l; i++) {
      _vector$8.fromBufferAttribute(this, i);
      _vector$8.applyNormalMatrix(m);
      this.setXYZ(i, _vector$8.x, _vector$8.y, _vector$8.z);
    }
    return this;
  }
  /**
   * Applies the given 4x4 matrix to the given attribute. Only works with
   * item size `3` and with direction vectors.
   *
   * @param {Matrix4} m - The matrix to apply.
   * @return {InterleavedBufferAttribute} A reference to this instance.
   */
  transformDirection(m) {
    for (let i = 0, l = this.count; i < l; i++) {
      _vector$8.fromBufferAttribute(this, i);
      _vector$8.transformDirection(m);
      this.setXYZ(i, _vector$8.x, _vector$8.y, _vector$8.z);
    }
    return this;
  }
  /**
   * Returns the given component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} component - The component index.
   * @return {number} The returned value.
   */
  getComponent(index, component) {
    let value = this.array[index * this.data.stride + this.offset + component];
    if (this.normalized) value = denormalize(value, this.array);
    return value;
  }
  /**
   * Sets the given value to the given component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} component - The component index.
   * @param {number} value - The value to set.
   * @return {InterleavedBufferAttribute} A reference to this instance.
   */
  setComponent(index, component, value) {
    if (this.normalized) value = normalize(value, this.array);
    this.data.array[index * this.data.stride + this.offset + component] = value;
    return this;
  }
  /**
   * Sets the x component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} x - The value to set.
   * @return {InterleavedBufferAttribute} A reference to this instance.
   */
  setX(index, x) {
    if (this.normalized) x = normalize(x, this.array);
    this.data.array[index * this.data.stride + this.offset] = x;
    return this;
  }
  /**
   * Sets the y component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} y - The value to set.
   * @return {InterleavedBufferAttribute} A reference to this instance.
   */
  setY(index, y) {
    if (this.normalized) y = normalize(y, this.array);
    this.data.array[index * this.data.stride + this.offset + 1] = y;
    return this;
  }
  /**
   * Sets the z component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} z - The value to set.
   * @return {InterleavedBufferAttribute} A reference to this instance.
   */
  setZ(index, z) {
    if (this.normalized) z = normalize(z, this.array);
    this.data.array[index * this.data.stride + this.offset + 2] = z;
    return this;
  }
  /**
   * Sets the w component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} w - The value to set.
   * @return {InterleavedBufferAttribute} A reference to this instance.
   */
  setW(index, w) {
    if (this.normalized) w = normalize(w, this.array);
    this.data.array[index * this.data.stride + this.offset + 3] = w;
    return this;
  }
  /**
   * Returns the x component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @return {number} The x component.
   */
  getX(index) {
    let x = this.data.array[index * this.data.stride + this.offset];
    if (this.normalized) x = denormalize(x, this.array);
    return x;
  }
  /**
   * Returns the y component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @return {number} The y component.
   */
  getY(index) {
    let y = this.data.array[index * this.data.stride + this.offset + 1];
    if (this.normalized) y = denormalize(y, this.array);
    return y;
  }
  /**
   * Returns the z component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @return {number} The z component.
   */
  getZ(index) {
    let z = this.data.array[index * this.data.stride + this.offset + 2];
    if (this.normalized) z = denormalize(z, this.array);
    return z;
  }
  /**
   * Returns the w component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @return {number} The w component.
   */
  getW(index) {
    let w = this.data.array[index * this.data.stride + this.offset + 3];
    if (this.normalized) w = denormalize(w, this.array);
    return w;
  }
  /**
   * Sets the x and y component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} x - The value for the x component to set.
   * @param {number} y - The value for the y component to set.
   * @return {InterleavedBufferAttribute} A reference to this instance.
   */
  setXY(index, x, y) {
    index = index * this.data.stride + this.offset;
    if (this.normalized) {
      x = normalize(x, this.array);
      y = normalize(y, this.array);
    }
    this.data.array[index + 0] = x;
    this.data.array[index + 1] = y;
    return this;
  }
  /**
   * Sets the x, y and z component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} x - The value for the x component to set.
   * @param {number} y - The value for the y component to set.
   * @param {number} z - The value for the z component to set.
   * @return {InterleavedBufferAttribute} A reference to this instance.
   */
  setXYZ(index, x, y, z) {
    index = index * this.data.stride + this.offset;
    if (this.normalized) {
      x = normalize(x, this.array);
      y = normalize(y, this.array);
      z = normalize(z, this.array);
    }
    this.data.array[index + 0] = x;
    this.data.array[index + 1] = y;
    this.data.array[index + 2] = z;
    return this;
  }
  /**
   * Sets the x, y, z and w component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} x - The value for the x component to set.
   * @param {number} y - The value for the y component to set.
   * @param {number} z - The value for the z component to set.
   * @param {number} w - The value for the w component to set.
   * @return {InterleavedBufferAttribute} A reference to this instance.
   */
  setXYZW(index, x, y, z, w) {
    index = index * this.data.stride + this.offset;
    if (this.normalized) {
      x = normalize(x, this.array);
      y = normalize(y, this.array);
      z = normalize(z, this.array);
      w = normalize(w, this.array);
    }
    this.data.array[index + 0] = x;
    this.data.array[index + 1] = y;
    this.data.array[index + 2] = z;
    this.data.array[index + 3] = w;
    return this;
  }
  /**
   * Returns a new buffer attribute with copied values from this instance.
   *
   * If no parameter is provided, cloning an interleaved buffer attribute will de-interleave buffer data.
   *
   * @param {Object} [data] - An object with interleaved buffers that allows to retain the interleaved property.
   * @return {BufferAttribute|InterleavedBufferAttribute} A clone of this instance.
   */
  clone(data) {
    if (data === void 0) {
      log("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");
      const array2 = [];
      for (let i = 0; i < this.count; i++) {
        const index = i * this.data.stride + this.offset;
        for (let j = 0; j < this.itemSize; j++) {
          array2.push(this.data.array[index + j]);
        }
      }
      return new BufferAttribute(new this.array.constructor(array2), this.itemSize, this.normalized);
    } else {
      if (data.interleavedBuffers === void 0) {
        data.interleavedBuffers = {};
      }
      if (data.interleavedBuffers[this.data.uuid] === void 0) {
        data.interleavedBuffers[this.data.uuid] = this.data.clone(data);
      }
      return new _InterleavedBufferAttribute(data.interleavedBuffers[this.data.uuid], this.itemSize, this.offset, this.normalized);
    }
  }
  /**
   * Serializes the buffer attribute into JSON.
   *
   * If no parameter is provided, cloning an interleaved buffer attribute will de-interleave buffer data.
   *
   * @param {Object} [data] - An optional value holding meta information about the serialization.
   * @return {Object} A JSON object representing the serialized buffer attribute.
   */
  toJSON(data) {
    if (data === void 0) {
      log("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");
      const array2 = [];
      for (let i = 0; i < this.count; i++) {
        const index = i * this.data.stride + this.offset;
        for (let j = 0; j < this.itemSize; j++) {
          array2.push(this.data.array[index + j]);
        }
      }
      return {
        itemSize: this.itemSize,
        type: this.array.constructor.name,
        array: array2,
        normalized: this.normalized
      };
    } else {
      if (data.interleavedBuffers === void 0) {
        data.interleavedBuffers = {};
      }
      if (data.interleavedBuffers[this.data.uuid] === void 0) {
        data.interleavedBuffers[this.data.uuid] = this.data.toJSON(data);
      }
      return {
        isInterleavedBufferAttribute: true,
        itemSize: this.itemSize,
        data: this.data.uuid,
        offset: this.offset,
        normalized: this.normalized
      };
    }
  }
};
var _vector1 = /* @__PURE__ */ new Vector3();
var _vector2 = /* @__PURE__ */ new Vector3();
var _normalMatrix = /* @__PURE__ */ new Matrix3();
var Plane = class {
  /**
   * Constructs a new plane.
   *
   * @param {Vector3} [normal=(1,0,0)] - A unit length vector defining the normal of the plane.
   * @param {number} [constant=0] - The signed distance from the origin to the plane.
   */
  constructor(normal2 = new Vector3(1, 0, 0), constant = 0) {
    this.isPlane = true;
    this.normal = normal2;
    this.constant = constant;
  }
  /**
   * Sets the plane components by copying the given values.
   *
   * @param {Vector3} normal - The normal.
   * @param {number} constant - The constant.
   * @return {Plane} A reference to this plane.
   */
  set(normal2, constant) {
    this.normal.copy(normal2);
    this.constant = constant;
    return this;
  }
  /**
   * Sets the plane components by defining `x`, `y`, `z` as the
   * plane normal and `w` as the constant.
   *
   * @param {number} x - The value for the normal's x component.
   * @param {number} y - The value for the normal's y component.
   * @param {number} z - The value for the normal's z component.
   * @param {number} w - The constant value.
   * @return {Plane} A reference to this plane.
   */
  setComponents(x, y, z, w) {
    this.normal.set(x, y, z);
    this.constant = w;
    return this;
  }
  /**
   * Sets the plane from the given normal and coplanar point (that is a point
   * that lies onto the plane).
   *
   * @param {Vector3} normal - The normal.
   * @param {Vector3} point - A coplanar point.
   * @return {Plane} A reference to this plane.
   */
  setFromNormalAndCoplanarPoint(normal2, point) {
    this.normal.copy(normal2);
    this.constant = -point.dot(this.normal);
    return this;
  }
  /**
   * Sets the plane from three coplanar points. The winding order is
   * assumed to be counter-clockwise, and determines the direction of
   * the plane normal.
   *
   * @param {Vector3} a - The first coplanar point.
   * @param {Vector3} b - The second coplanar point.
   * @param {Vector3} c - The third coplanar point.
   * @return {Plane} A reference to this plane.
   */
  setFromCoplanarPoints(a, b, c) {
    const normal2 = _vector1.subVectors(c, b).cross(_vector2.subVectors(a, b)).normalize();
    this.setFromNormalAndCoplanarPoint(normal2, a);
    return this;
  }
  /**
   * Copies the values of the given plane to this instance.
   *
   * @param {Plane} plane - The plane to copy.
   * @return {Plane} A reference to this plane.
   */
  copy(plane) {
    this.normal.copy(plane.normal);
    this.constant = plane.constant;
    return this;
  }
  /**
   * Normalizes the plane normal and adjusts the constant accordingly.
   *
   * @return {Plane} A reference to this plane.
   */
  normalize() {
    const inverseNormalLength = 1 / this.normal.length();
    this.normal.multiplyScalar(inverseNormalLength);
    this.constant *= inverseNormalLength;
    return this;
  }
  /**
   * Negates both the plane normal and the constant.
   *
   * @return {Plane} A reference to this plane.
   */
  negate() {
    this.constant *= -1;
    this.normal.negate();
    return this;
  }
  /**
   * Returns the signed distance from the given point to this plane.
   *
   * @param {Vector3} point - The point to compute the distance for.
   * @return {number} The signed distance.
   */
  distanceToPoint(point) {
    return this.normal.dot(point) + this.constant;
  }
  /**
   * Returns the signed distance from the given sphere to this plane.
   *
   * @param {Sphere} sphere - The sphere to compute the distance for.
   * @return {number} The signed distance.
   */
  distanceToSphere(sphere) {
    return this.distanceToPoint(sphere.center) - sphere.radius;
  }
  /**
   * Projects a the given point onto the plane.
   *
   * @param {Vector3} point - The point to project.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The projected point on the plane.
   */
  projectPoint(point, target) {
    return target.copy(point).addScaledVector(this.normal, -this.distanceToPoint(point));
  }
  /**
   * Returns the intersection point of the passed line and the plane. Returns
   * `null` if the line does not intersect. Returns the line's starting point if
   * the line is coplanar with the plane.
   *
   * @param {Line3} line - The line to compute the intersection for.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @param {boolean} [clampToLine=true] - Whether to clamp the intersection to the line segment.
   * @return {?Vector3} The intersection point. Returns `null` if no intersection is detected.
   */
  intersectLine(line, target, clampToLine = true) {
    const direction = line.delta(_vector1);
    const denominator = this.normal.dot(direction);
    if (denominator === 0) {
      if (this.distanceToPoint(line.start) === 0) {
        return target.copy(line.start);
      }
      return null;
    }
    const t = -(line.start.dot(this.normal) + this.constant) / denominator;
    if (clampToLine === true && (t < 0 || t > 1)) {
      return null;
    }
    return target.copy(line.start).addScaledVector(direction, t);
  }
  /**
   * Returns `true` if the given line segment intersects with (passes through) the plane.
   *
   * @param {Line3} line - The line to test.
   * @return {boolean} Whether the given line segment intersects with the plane or not.
   */
  intersectsLine(line) {
    const startSign = this.distanceToPoint(line.start);
    const endSign = this.distanceToPoint(line.end);
    return startSign < 0 && endSign > 0 || endSign < 0 && startSign > 0;
  }
  /**
   * Returns `true` if the given bounding box intersects with the plane.
   *
   * @param {Box3} box - The bounding box to test.
   * @return {boolean} Whether the given bounding box intersects with the plane or not.
   */
  intersectsBox(box) {
    return box.intersectsPlane(this);
  }
  /**
   * Returns `true` if the given bounding sphere intersects with the plane.
   *
   * @param {Sphere} sphere - The bounding sphere to test.
   * @return {boolean} Whether the given bounding sphere intersects with the plane or not.
   */
  intersectsSphere(sphere) {
    return sphere.intersectsPlane(this);
  }
  /**
   * Returns a coplanar vector to the plane, by calculating the
   * projection of the normal at the origin onto the plane.
   *
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The coplanar point.
   */
  coplanarPoint(target) {
    return target.copy(this.normal).multiplyScalar(-this.constant);
  }
  /**
   * Apply a 4x4 matrix to the plane. The matrix must be an affine, homogeneous transform.
   *
   * The optional normal matrix can be pre-computed like so:
   * ```js
   * const optionalNormalMatrix = new THREE.Matrix3().getNormalMatrix( matrix );
   * ```
   *
   * @param {Matrix4} matrix - The transformation matrix.
   * @param {Matrix4} [optionalNormalMatrix] - A pre-computed normal matrix.
   * @return {Plane} A reference to this plane.
   */
  applyMatrix4(matrix, optionalNormalMatrix) {
    const normalMatrix = optionalNormalMatrix || _normalMatrix.getNormalMatrix(matrix);
    const referencePoint = this.coplanarPoint(_vector1).applyMatrix4(matrix);
    const normal2 = this.normal.applyMatrix3(normalMatrix).normalize();
    this.constant = -referencePoint.dot(normal2);
    return this;
  }
  /**
   * Translates the plane by the distance defined by the given offset vector.
   * Note that this only affects the plane constant and will not affect the normal vector.
   *
   * @param {Vector3} offset - The offset vector.
   * @return {Plane} A reference to this plane.
   */
  translate(offset) {
    this.constant -= offset.dot(this.normal);
    return this;
  }
  /**
   * Returns `true` if this plane is equal with the given one.
   *
   * @param {Plane} plane - The plane to test for equality.
   * @return {boolean} Whether this plane is equal with the given one.
   */
  equals(plane) {
    return plane.normal.equals(this.normal) && plane.constant === this.constant;
  }
  /**
   * Returns a new plane with copied values from this instance.
   *
   * @return {Plane} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
};
var FramebufferTexture = class extends Texture {
  /**
   * Constructs a new framebuffer texture.
   *
   * @param {number} [width] - The width of the texture.
   * @param {number} [height] - The height of the texture.
   */
  constructor(width, height) {
    super({ width, height });
    this.isFramebufferTexture = true;
    this.magFilter = NearestFilter;
    this.minFilter = NearestFilter;
    this.generateMipmaps = false;
    this.needsUpdate = true;
  }
};
var CubeTexture = class extends Texture {
  /**
   * Constructs a new cube texture.
   *
   * @param {Array<Image>} [images=[]] - An array holding a image for each side of a cube.
   * @param {number} [mapping=CubeReflectionMapping] - The texture mapping.
   * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
   * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
   * @param {number} [magFilter=LinearFilter] - The mag filter value.
   * @param {number} [minFilter=LinearMipmapLinearFilter] - The min filter value.
   * @param {number} [format=RGBAFormat] - The texture format.
   * @param {number} [type=UnsignedByteType] - The texture type.
   * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
   * @param {string} [colorSpace=NoColorSpace] - The color space value.
   */
  constructor(images = [], mapping = CubeReflectionMapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, colorSpace) {
    super(images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, colorSpace);
    this.isCubeTexture = true;
    this.flipY = false;
  }
  /**
   * Alias for {@link CubeTexture#image}.
   *
   * @type {Array<Image>}
   */
  get images() {
    return this.image;
  }
  set images(value) {
    this.image = value;
  }
};
var DepthTexture = class extends Texture {
  /**
   * Constructs a new depth texture.
   *
   * @param {number} width - The width of the texture.
   * @param {number} height - The height of the texture.
   * @param {number} [type=UnsignedIntType] - The texture type.
   * @param {number} [mapping=Texture.DEFAULT_MAPPING] - The texture mapping.
   * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
   * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
   * @param {number} [magFilter=LinearFilter] - The mag filter value.
   * @param {number} [minFilter=LinearFilter] - The min filter value.
   * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
   * @param {number} [format=DepthFormat] - The texture format.
   * @param {number} [depth=1] - The depth of the texture.
   */
  constructor(width, height, type = UnsignedIntType, mapping, wrapS, wrapT, magFilter = NearestFilter, minFilter = NearestFilter, anisotropy, format = DepthFormat, depth2 = 1) {
    if (format !== DepthFormat && format !== DepthStencilFormat) {
      throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    }
    const image = { width, height, depth: depth2 };
    super(image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy);
    this.isDepthTexture = true;
    this.flipY = false;
    this.generateMipmaps = false;
    this.compareFunction = null;
  }
  copy(source) {
    super.copy(source);
    this.source = new Source(Object.assign({}, source.image));
    this.compareFunction = source.compareFunction;
    return this;
  }
  toJSON(meta) {
    const data = super.toJSON(meta);
    if (this.compareFunction !== null) data.compareFunction = this.compareFunction;
    return data;
  }
};
function convertArray(array2, type) {
  if (!array2 || array2.constructor === type) return array2;
  if (typeof type.BYTES_PER_ELEMENT === "number") {
    return new type(array2);
  }
  return Array.prototype.slice.call(array2);
}
var Interpolant = class {
  /**
   * Constructs a new interpolant.
   *
   * @param {TypedArray} parameterPositions - The parameter positions hold the interpolation factors.
   * @param {TypedArray} sampleValues - The sample values.
   * @param {number} sampleSize - The sample size
   * @param {TypedArray} [resultBuffer] - The result buffer.
   */
  constructor(parameterPositions, sampleValues, sampleSize, resultBuffer) {
    this.parameterPositions = parameterPositions;
    this._cachedIndex = 0;
    this.resultBuffer = resultBuffer !== void 0 ? resultBuffer : new sampleValues.constructor(sampleSize);
    this.sampleValues = sampleValues;
    this.valueSize = sampleSize;
    this.settings = null;
    this.DefaultSettings_ = {};
  }
  /**
   * Evaluate the interpolant at position `t`.
   *
   * @param {number} t - The interpolation factor.
   * @return {TypedArray} The result buffer.
   */
  evaluate(t) {
    const pp = this.parameterPositions;
    let i1 = this._cachedIndex, t1 = pp[i1], t0 = pp[i1 - 1];
    validate_interval: {
      seek: {
        let right;
        linear_scan: {
          forward_scan: if (!(t < t1)) {
            for (let giveUpAt = i1 + 2; ; ) {
              if (t1 === void 0) {
                if (t < t0) break forward_scan;
                i1 = pp.length;
                this._cachedIndex = i1;
                return this.copySampleValue_(i1 - 1);
              }
              if (i1 === giveUpAt) break;
              t0 = t1;
              t1 = pp[++i1];
              if (t < t1) {
                break seek;
              }
            }
            right = pp.length;
            break linear_scan;
          }
          if (!(t >= t0)) {
            const t1global = pp[1];
            if (t < t1global) {
              i1 = 2;
              t0 = t1global;
            }
            for (let giveUpAt = i1 - 2; ; ) {
              if (t0 === void 0) {
                this._cachedIndex = 0;
                return this.copySampleValue_(0);
              }
              if (i1 === giveUpAt) break;
              t1 = t0;
              t0 = pp[--i1 - 1];
              if (t >= t0) {
                break seek;
              }
            }
            right = i1;
            i1 = 0;
            break linear_scan;
          }
          break validate_interval;
        }
        while (i1 < right) {
          const mid = i1 + right >>> 1;
          if (t < pp[mid]) {
            right = mid;
          } else {
            i1 = mid + 1;
          }
        }
        t1 = pp[i1];
        t0 = pp[i1 - 1];
        if (t0 === void 0) {
          this._cachedIndex = 0;
          return this.copySampleValue_(0);
        }
        if (t1 === void 0) {
          i1 = pp.length;
          this._cachedIndex = i1;
          return this.copySampleValue_(i1 - 1);
        }
      }
      this._cachedIndex = i1;
      this.intervalChanged_(i1, t0, t1);
    }
    return this.interpolate_(i1, t0, t, t1);
  }
  /**
   * Returns the interpolation settings.
   *
   * @return {Object} The interpolation settings.
   */
  getSettings_() {
    return this.settings || this.DefaultSettings_;
  }
  /**
   * Copies a sample value to the result buffer.
   *
   * @param {number} index - An index into the sample value buffer.
   * @return {TypedArray} The result buffer.
   */
  copySampleValue_(index) {
    const result = this.resultBuffer, values = this.sampleValues, stride = this.valueSize, offset = index * stride;
    for (let i = 0; i !== stride; ++i) {
      result[i] = values[offset + i];
    }
    return result;
  }
  /**
   * Copies a sample value to the result buffer.
   *
   * @abstract
   * @param {number} i1 - An index into the sample value buffer.
   * @param {number} t0 - The previous interpolation factor.
   * @param {number} t - The current interpolation factor.
   * @param {number} t1 - The next interpolation factor.
   * @return {TypedArray} The result buffer.
   */
  interpolate_() {
    throw new Error("THREE.Interpolant: Call to abstract method.");
  }
  /**
   * Optional method that is executed when the interval has changed.
   *
   * @param {number} i1 - An index into the sample value buffer.
   * @param {number} t0 - The previous interpolation factor.
   * @param {number} t - The current interpolation factor.
   */
  intervalChanged_() {
  }
};
var CubicInterpolant = class extends Interpolant {
  /**
   * Constructs a new cubic interpolant.
   *
   * @param {TypedArray} parameterPositions - The parameter positions hold the interpolation factors.
   * @param {TypedArray} sampleValues - The sample values.
   * @param {number} sampleSize - The sample size
   * @param {TypedArray} [resultBuffer] - The result buffer.
   */
  constructor(parameterPositions, sampleValues, sampleSize, resultBuffer) {
    super(parameterPositions, sampleValues, sampleSize, resultBuffer);
    this._weightPrev = -0;
    this._offsetPrev = -0;
    this._weightNext = -0;
    this._offsetNext = -0;
    this.DefaultSettings_ = {
      endingStart: ZeroCurvatureEnding,
      endingEnd: ZeroCurvatureEnding
    };
  }
  intervalChanged_(i1, t0, t1) {
    const pp = this.parameterPositions;
    let iPrev = i1 - 2, iNext = i1 + 1, tPrev = pp[iPrev], tNext = pp[iNext];
    if (tPrev === void 0) {
      switch (this.getSettings_().endingStart) {
        case ZeroSlopeEnding:
          iPrev = i1;
          tPrev = 2 * t0 - t1;
          break;
        case WrapAroundEnding:
          iPrev = pp.length - 2;
          tPrev = t0 + pp[iPrev] - pp[iPrev + 1];
          break;
        default:
          iPrev = i1;
          tPrev = t1;
      }
    }
    if (tNext === void 0) {
      switch (this.getSettings_().endingEnd) {
        case ZeroSlopeEnding:
          iNext = i1;
          tNext = 2 * t1 - t0;
          break;
        case WrapAroundEnding:
          iNext = 1;
          tNext = t1 + pp[1] - pp[0];
          break;
        default:
          iNext = i1 - 1;
          tNext = t0;
      }
    }
    const halfDt = (t1 - t0) * 0.5, stride = this.valueSize;
    this._weightPrev = halfDt / (t0 - tPrev);
    this._weightNext = halfDt / (tNext - t1);
    this._offsetPrev = iPrev * stride;
    this._offsetNext = iNext * stride;
  }
  interpolate_(i1, t0, t, t1) {
    const result = this.resultBuffer, values = this.sampleValues, stride = this.valueSize, o1 = i1 * stride, o0 = o1 - stride, oP = this._offsetPrev, oN = this._offsetNext, wP = this._weightPrev, wN = this._weightNext, p = (t - t0) / (t1 - t0), pp = p * p, ppp = pp * p;
    const sP = -wP * ppp + 2 * wP * pp - wP * p;
    const s0 = (1 + wP) * ppp + (-1.5 - 2 * wP) * pp + (-0.5 + wP) * p + 1;
    const s1 = (-1 - wN) * ppp + (1.5 + wN) * pp + 0.5 * p;
    const sN = wN * ppp - wN * pp;
    for (let i = 0; i !== stride; ++i) {
      result[i] = sP * values[oP + i] + s0 * values[o0 + i] + s1 * values[o1 + i] + sN * values[oN + i];
    }
    return result;
  }
};
var LinearInterpolant = class extends Interpolant {
  /**
   * Constructs a new linear interpolant.
   *
   * @param {TypedArray} parameterPositions - The parameter positions hold the interpolation factors.
   * @param {TypedArray} sampleValues - The sample values.
   * @param {number} sampleSize - The sample size
   * @param {TypedArray} [resultBuffer] - The result buffer.
   */
  constructor(parameterPositions, sampleValues, sampleSize, resultBuffer) {
    super(parameterPositions, sampleValues, sampleSize, resultBuffer);
  }
  interpolate_(i1, t0, t, t1) {
    const result = this.resultBuffer, values = this.sampleValues, stride = this.valueSize, offset1 = i1 * stride, offset0 = offset1 - stride, weight1 = (t - t0) / (t1 - t0), weight0 = 1 - weight1;
    for (let i = 0; i !== stride; ++i) {
      result[i] = values[offset0 + i] * weight0 + values[offset1 + i] * weight1;
    }
    return result;
  }
};
var DiscreteInterpolant = class extends Interpolant {
  /**
   * Constructs a new discrete interpolant.
   *
   * @param {TypedArray} parameterPositions - The parameter positions hold the interpolation factors.
   * @param {TypedArray} sampleValues - The sample values.
   * @param {number} sampleSize - The sample size
   * @param {TypedArray} [resultBuffer] - The result buffer.
   */
  constructor(parameterPositions, sampleValues, sampleSize, resultBuffer) {
    super(parameterPositions, sampleValues, sampleSize, resultBuffer);
  }
  interpolate_(i1) {
    return this.copySampleValue_(i1 - 1);
  }
};
var BezierInterpolant = class extends Interpolant {
  interpolate_(i1, t0, t, t1) {
    const result = this.resultBuffer;
    const values = this.sampleValues;
    const stride = this.valueSize;
    const offset1 = i1 * stride;
    const offset0 = offset1 - stride;
    const inTangents = this.inTangents;
    const outTangents = this.outTangents;
    if (!inTangents || !outTangents) {
      const weight1 = (t - t0) / (t1 - t0);
      const weight0 = 1 - weight1;
      for (let i = 0; i !== stride; ++i) {
        result[i] = values[offset0 + i] * weight0 + values[offset1 + i] * weight1;
      }
      return result;
    }
    const tangentStride = stride * 2;
    const i0 = i1 - 1;
    for (let i = 0; i !== stride; ++i) {
      const v0 = values[offset0 + i];
      const v1 = values[offset1 + i];
      const outTangentOffset = i0 * tangentStride + i * 2;
      const c0x = outTangents[outTangentOffset];
      const c0y = outTangents[outTangentOffset + 1];
      const inTangentOffset = i1 * tangentStride + i * 2;
      const c1x = inTangents[inTangentOffset];
      const c1y = inTangents[inTangentOffset + 1];
      let s = (t - t0) / (t1 - t0);
      let s2, s3, oneMinusS, oneMinusS2, oneMinusS3;
      for (let iter = 0; iter < 8; iter++) {
        s2 = s * s;
        s3 = s2 * s;
        oneMinusS = 1 - s;
        oneMinusS2 = oneMinusS * oneMinusS;
        oneMinusS3 = oneMinusS2 * oneMinusS;
        const bx = oneMinusS3 * t0 + 3 * oneMinusS2 * s * c0x + 3 * oneMinusS * s2 * c1x + s3 * t1;
        const error2 = bx - t;
        if (Math.abs(error2) < 1e-10) break;
        const dbx = 3 * oneMinusS2 * (c0x - t0) + 6 * oneMinusS * s * (c1x - c0x) + 3 * s2 * (t1 - c1x);
        if (Math.abs(dbx) < 1e-10) break;
        s = s - error2 / dbx;
        s = Math.max(0, Math.min(1, s));
      }
      result[i] = oneMinusS3 * v0 + 3 * oneMinusS2 * s * c0y + 3 * oneMinusS * s2 * c1y + s3 * v1;
    }
    return result;
  }
};
var KeyframeTrack = class {
  /**
   * Constructs a new keyframe track.
   *
   * @param {string} name - The keyframe track's name.
   * @param {Array<number>} times - A list of keyframe times.
   * @param {Array<number|string|boolean>} values - A list of keyframe values.
   * @param {(InterpolateLinear|InterpolateDiscrete|InterpolateSmooth|InterpolateBezier)} [interpolation] - The interpolation type.
   */
  constructor(name, times, values, interpolation) {
    if (name === void 0) throw new Error("THREE.KeyframeTrack: track name is undefined");
    if (times === void 0 || times.length === 0) throw new Error("THREE.KeyframeTrack: no keyframes in track named " + name);
    this.name = name;
    this.times = convertArray(times, this.TimeBufferType);
    this.values = convertArray(values, this.ValueBufferType);
    this.setInterpolation(interpolation || this.DefaultInterpolation);
  }
  /**
   * Converts the keyframe track to JSON.
   *
   * @static
   * @param {KeyframeTrack} track - The keyframe track to serialize.
   * @return {Object} The serialized keyframe track as JSON.
   */
  static toJSON(track) {
    const trackType = track.constructor;
    let json;
    if (trackType.toJSON !== this.toJSON) {
      json = trackType.toJSON(track);
    } else {
      json = {
        "name": track.name,
        "times": convertArray(track.times, Array),
        "values": convertArray(track.values, Array)
      };
      const interpolation = track.getInterpolation();
      if (interpolation !== track.DefaultInterpolation) {
        json.interpolation = interpolation;
      }
    }
    json.type = track.ValueTypeName;
    return json;
  }
  /**
   * Factory method for creating a new discrete interpolant.
   *
   * @static
   * @param {TypedArray} [result] - The result buffer.
   * @return {DiscreteInterpolant} The new interpolant.
   */
  InterpolantFactoryMethodDiscrete(result) {
    return new DiscreteInterpolant(this.times, this.values, this.getValueSize(), result);
  }
  /**
   * Factory method for creating a new linear interpolant.
   *
   * @static
   * @param {TypedArray} [result] - The result buffer.
   * @return {LinearInterpolant} The new interpolant.
   */
  InterpolantFactoryMethodLinear(result) {
    return new LinearInterpolant(this.times, this.values, this.getValueSize(), result);
  }
  /**
   * Factory method for creating a new smooth interpolant.
   *
   * @static
   * @param {TypedArray} [result] - The result buffer.
   * @return {CubicInterpolant} The new interpolant.
   */
  InterpolantFactoryMethodSmooth(result) {
    return new CubicInterpolant(this.times, this.values, this.getValueSize(), result);
  }
  /**
   * Factory method for creating a new Bezier interpolant.
   *
   * The Bezier interpolant requires tangent data to be set via the `settings` property
   * on the track before creating the interpolant. The settings should contain:
   * - `inTangents`: Float32Array with [time, value] pairs per keyframe per component
   * - `outTangents`: Float32Array with [time, value] pairs per keyframe per component
   *
   * @static
   * @param {TypedArray} [result] - The result buffer.
   * @return {BezierInterpolant} The new interpolant.
   */
  InterpolantFactoryMethodBezier(result) {
    const interpolant = new BezierInterpolant(this.times, this.values, this.getValueSize(), result);
    if (this.settings) {
      interpolant.inTangents = this.settings.inTangents;
      interpolant.outTangents = this.settings.outTangents;
    }
    return interpolant;
  }
  /**
   * Defines the interpolation factor method for this keyframe track.
   *
   * @param {(InterpolateLinear|InterpolateDiscrete|InterpolateSmooth|InterpolateBezier)} interpolation - The interpolation type.
   * @return {KeyframeTrack} A reference to this keyframe track.
   */
  setInterpolation(interpolation) {
    let factoryMethod;
    switch (interpolation) {
      case InterpolateDiscrete:
        factoryMethod = this.InterpolantFactoryMethodDiscrete;
        break;
      case InterpolateLinear:
        factoryMethod = this.InterpolantFactoryMethodLinear;
        break;
      case InterpolateSmooth:
        factoryMethod = this.InterpolantFactoryMethodSmooth;
        break;
      case InterpolateBezier:
        factoryMethod = this.InterpolantFactoryMethodBezier;
        break;
    }
    if (factoryMethod === void 0) {
      const message = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
      if (this.createInterpolant === void 0) {
        if (interpolation !== this.DefaultInterpolation) {
          this.setInterpolation(this.DefaultInterpolation);
        } else {
          throw new Error(message);
        }
      }
      warn("KeyframeTrack:", message);
      return this;
    }
    this.createInterpolant = factoryMethod;
    return this;
  }
  /**
   * Returns the current interpolation type.
   *
   * @return {(InterpolateLinear|InterpolateDiscrete|InterpolateSmooth|InterpolateBezier)} The interpolation type.
   */
  getInterpolation() {
    switch (this.createInterpolant) {
      case this.InterpolantFactoryMethodDiscrete:
        return InterpolateDiscrete;
      case this.InterpolantFactoryMethodLinear:
        return InterpolateLinear;
      case this.InterpolantFactoryMethodSmooth:
        return InterpolateSmooth;
      case this.InterpolantFactoryMethodBezier:
        return InterpolateBezier;
    }
  }
  /**
   * Returns the value size.
   *
   * @return {number} The value size.
   */
  getValueSize() {
    return this.values.length / this.times.length;
  }
  /**
   * Moves all keyframes either forward or backward in time.
   *
   * @param {number} timeOffset - The offset to move the time values.
   * @return {KeyframeTrack} A reference to this keyframe track.
   */
  shift(timeOffset) {
    if (timeOffset !== 0) {
      const times = this.times;
      for (let i = 0, n = times.length; i !== n; ++i) {
        times[i] += timeOffset;
      }
    }
    return this;
  }
  /**
   * Scale all keyframe times by a factor (useful for frame - seconds conversions).
   *
   * @param {number} timeScale - The time scale.
   * @return {KeyframeTrack} A reference to this keyframe track.
   */
  scale(timeScale) {
    if (timeScale !== 1) {
      const times = this.times;
      for (let i = 0, n = times.length; i !== n; ++i) {
        times[i] *= timeScale;
      }
    }
    return this;
  }
  /**
   * Removes keyframes before and after animation without changing any values within the defined time range.
   *
   * Note: The method does not shift around keys to the start of the track time, because for interpolated
   * keys this will change their values
   *
   * @param {number} startTime - The start time.
   * @param {number} endTime - The end time.
   * @return {KeyframeTrack} A reference to this keyframe track.
   */
  trim(startTime, endTime) {
    const times = this.times, nKeys = times.length;
    let from = 0, to = nKeys - 1;
    while (from !== nKeys && times[from] < startTime) {
      ++from;
    }
    while (to !== -1 && times[to] > endTime) {
      --to;
    }
    ++to;
    if (from !== 0 || to !== nKeys) {
      if (from >= to) {
        to = Math.max(to, 1);
        from = to - 1;
      }
      const stride = this.getValueSize();
      this.times = times.slice(from, to);
      this.values = this.values.slice(from * stride, to * stride);
    }
    return this;
  }
  /**
   * Performs minimal validation on the keyframe track. Returns `true` if the values
   * are valid.
   *
   * @return {boolean} Whether the keyframes are valid or not.
   */
  validate() {
    let valid = true;
    const valueSize = this.getValueSize();
    if (valueSize - Math.floor(valueSize) !== 0) {
      error("KeyframeTrack: Invalid value size in track.", this);
      valid = false;
    }
    const times = this.times, values = this.values, nKeys = times.length;
    if (nKeys === 0) {
      error("KeyframeTrack: Track is empty.", this);
      valid = false;
    }
    let prevTime = null;
    for (let i = 0; i !== nKeys; i++) {
      const currTime = times[i];
      if (typeof currTime === "number" && isNaN(currTime)) {
        error("KeyframeTrack: Time is not a valid number.", this, i, currTime);
        valid = false;
        break;
      }
      if (prevTime !== null && prevTime > currTime) {
        error("KeyframeTrack: Out of order keys.", this, i, currTime, prevTime);
        valid = false;
        break;
      }
      prevTime = currTime;
    }
    if (values !== void 0) {
      if (isTypedArray(values)) {
        for (let i = 0, n = values.length; i !== n; ++i) {
          const value = values[i];
          if (isNaN(value)) {
            error("KeyframeTrack: Value is not a valid number.", this, i, value);
            valid = false;
            break;
          }
        }
      }
    }
    return valid;
  }
  /**
   * Optimizes this keyframe track by removing equivalent sequential keys (which are
   * common in morph target sequences).
   *
   * @return {KeyframeTrack} A reference to this keyframe track.
   */
  optimize() {
    const times = this.times.slice(), values = this.values.slice(), stride = this.getValueSize(), smoothInterpolation = this.getInterpolation() === InterpolateSmooth, lastIndex = times.length - 1;
    let writeIndex = 1;
    for (let i = 1; i < lastIndex; ++i) {
      let keep = false;
      const time = times[i];
      const timeNext = times[i + 1];
      if (time !== timeNext && (i !== 1 || time !== times[0])) {
        if (!smoothInterpolation) {
          const offset = i * stride, offsetP = offset - stride, offsetN = offset + stride;
          for (let j = 0; j !== stride; ++j) {
            const value = values[offset + j];
            if (value !== values[offsetP + j] || value !== values[offsetN + j]) {
              keep = true;
              break;
            }
          }
        } else {
          keep = true;
        }
      }
      if (keep) {
        if (i !== writeIndex) {
          times[writeIndex] = times[i];
          const readOffset = i * stride, writeOffset = writeIndex * stride;
          for (let j = 0; j !== stride; ++j) {
            values[writeOffset + j] = values[readOffset + j];
          }
        }
        ++writeIndex;
      }
    }
    if (lastIndex > 0) {
      times[writeIndex] = times[lastIndex];
      for (let readOffset = lastIndex * stride, writeOffset = writeIndex * stride, j = 0; j !== stride; ++j) {
        values[writeOffset + j] = values[readOffset + j];
      }
      ++writeIndex;
    }
    if (writeIndex !== times.length) {
      this.times = times.slice(0, writeIndex);
      this.values = values.slice(0, writeIndex * stride);
    } else {
      this.times = times;
      this.values = values;
    }
    return this;
  }
  /**
   * Returns a new keyframe track with copied values from this instance.
   *
   * @return {KeyframeTrack} A clone of this instance.
   */
  clone() {
    const times = this.times.slice();
    const values = this.values.slice();
    const TypedKeyframeTrack = this.constructor;
    const track = new TypedKeyframeTrack(this.name, times, values);
    track.createInterpolant = this.createInterpolant;
    return track;
  }
};
KeyframeTrack.prototype.ValueTypeName = "";
KeyframeTrack.prototype.TimeBufferType = Float32Array;
KeyframeTrack.prototype.ValueBufferType = Float32Array;
KeyframeTrack.prototype.DefaultInterpolation = InterpolateLinear;
var BooleanKeyframeTrack = class extends KeyframeTrack {
  /**
   * Constructs a new boolean keyframe track.
   *
   * This keyframe track type has no `interpolation` parameter because the
   * interpolation is always discrete.
   *
   * @param {string} name - The keyframe track's name.
   * @param {Array<number>} times - A list of keyframe times.
   * @param {Array<boolean>} values - A list of keyframe values.
   */
  constructor(name, times, values) {
    super(name, times, values);
  }
};
BooleanKeyframeTrack.prototype.ValueTypeName = "bool";
BooleanKeyframeTrack.prototype.ValueBufferType = Array;
BooleanKeyframeTrack.prototype.DefaultInterpolation = InterpolateDiscrete;
BooleanKeyframeTrack.prototype.InterpolantFactoryMethodLinear = void 0;
BooleanKeyframeTrack.prototype.InterpolantFactoryMethodSmooth = void 0;
var ColorKeyframeTrack = class extends KeyframeTrack {
  /**
   * Constructs a new color keyframe track.
   *
   * @param {string} name - The keyframe track's name.
   * @param {Array<number>} times - A list of keyframe times.
   * @param {Array<number>} values - A list of keyframe values.
   * @param {(InterpolateLinear|InterpolateDiscrete|InterpolateSmooth)} [interpolation] - The interpolation type.
   */
  constructor(name, times, values, interpolation) {
    super(name, times, values, interpolation);
  }
};
ColorKeyframeTrack.prototype.ValueTypeName = "color";
var NumberKeyframeTrack = class extends KeyframeTrack {
  /**
   * Constructs a new number keyframe track.
   *
   * @param {string} name - The keyframe track's name.
   * @param {Array<number>} times - A list of keyframe times.
   * @param {Array<number>} values - A list of keyframe values.
   * @param {(InterpolateLinear|InterpolateDiscrete|InterpolateSmooth)} [interpolation] - The interpolation type.
   */
  constructor(name, times, values, interpolation) {
    super(name, times, values, interpolation);
  }
};
NumberKeyframeTrack.prototype.ValueTypeName = "number";
var QuaternionLinearInterpolant = class extends Interpolant {
  /**
   * Constructs a new SLERP interpolant.
   *
   * @param {TypedArray} parameterPositions - The parameter positions hold the interpolation factors.
   * @param {TypedArray} sampleValues - The sample values.
   * @param {number} sampleSize - The sample size
   * @param {TypedArray} [resultBuffer] - The result buffer.
   */
  constructor(parameterPositions, sampleValues, sampleSize, resultBuffer) {
    super(parameterPositions, sampleValues, sampleSize, resultBuffer);
  }
  interpolate_(i1, t0, t, t1) {
    const result = this.resultBuffer, values = this.sampleValues, stride = this.valueSize, alpha = (t - t0) / (t1 - t0);
    let offset = i1 * stride;
    for (let end = offset + stride; offset !== end; offset += 4) {
      Quaternion.slerpFlat(result, 0, values, offset - stride, values, offset, alpha);
    }
    return result;
  }
};
var QuaternionKeyframeTrack = class extends KeyframeTrack {
  /**
   * Constructs a new Quaternion keyframe track.
   *
   * @param {string} name - The keyframe track's name.
   * @param {Array<number>} times - A list of keyframe times.
   * @param {Array<number>} values - A list of keyframe values.
   * @param {(InterpolateLinear|InterpolateDiscrete|InterpolateSmooth)} [interpolation] - The interpolation type.
   */
  constructor(name, times, values, interpolation) {
    super(name, times, values, interpolation);
  }
  /**
   * Overwritten so the method returns Quaternion based interpolant.
   *
   * @static
   * @param {TypedArray} [result] - The result buffer.
   * @return {QuaternionLinearInterpolant} The new interpolant.
   */
  InterpolantFactoryMethodLinear(result) {
    return new QuaternionLinearInterpolant(this.times, this.values, this.getValueSize(), result);
  }
};
QuaternionKeyframeTrack.prototype.ValueTypeName = "quaternion";
QuaternionKeyframeTrack.prototype.InterpolantFactoryMethodSmooth = void 0;
var StringKeyframeTrack = class extends KeyframeTrack {
  /**
   * Constructs a new string keyframe track.
   *
   * This keyframe track type has no `interpolation` parameter because the
   * interpolation is always discrete.
   *
   * @param {string} name - The keyframe track's name.
   * @param {Array<number>} times - A list of keyframe times.
   * @param {Array<string>} values - A list of keyframe values.
   */
  constructor(name, times, values) {
    super(name, times, values);
  }
};
StringKeyframeTrack.prototype.ValueTypeName = "string";
StringKeyframeTrack.prototype.ValueBufferType = Array;
StringKeyframeTrack.prototype.DefaultInterpolation = InterpolateDiscrete;
StringKeyframeTrack.prototype.InterpolantFactoryMethodLinear = void 0;
StringKeyframeTrack.prototype.InterpolantFactoryMethodSmooth = void 0;
var VectorKeyframeTrack = class extends KeyframeTrack {
  /**
   * Constructs a new vector keyframe track.
   *
   * @param {string} name - The keyframe track's name.
   * @param {Array<number>} times - A list of keyframe times.
   * @param {Array<number>} values - A list of keyframe values.
   * @param {(InterpolateLinear|InterpolateDiscrete|InterpolateSmooth)} [interpolation] - The interpolation type.
   */
  constructor(name, times, values, interpolation) {
    super(name, times, values, interpolation);
  }
};
VectorKeyframeTrack.prototype.ValueTypeName = "vector";
var LoadingManager = class {
  /**
   * Constructs a new loading manager.
   *
   * @param {Function} [onLoad] - Executes when all items have been loaded.
   * @param {Function} [onProgress] - Executes when single items have been loaded.
   * @param {Function} [onError] - Executes when an error occurs.
   */
  constructor(onLoad, onProgress, onError) {
    const scope = this;
    let isLoading = false;
    let itemsLoaded = 0;
    let itemsTotal = 0;
    let urlModifier = void 0;
    const handlers = [];
    this.onStart = void 0;
    this.onLoad = onLoad;
    this.onProgress = onProgress;
    this.onError = onError;
    this._abortController = null;
    this.itemStart = function(url) {
      itemsTotal++;
      if (isLoading === false) {
        if (scope.onStart !== void 0) {
          scope.onStart(url, itemsLoaded, itemsTotal);
        }
      }
      isLoading = true;
    };
    this.itemEnd = function(url) {
      itemsLoaded++;
      if (scope.onProgress !== void 0) {
        scope.onProgress(url, itemsLoaded, itemsTotal);
      }
      if (itemsLoaded === itemsTotal) {
        isLoading = false;
        if (scope.onLoad !== void 0) {
          scope.onLoad();
        }
      }
    };
    this.itemError = function(url) {
      if (scope.onError !== void 0) {
        scope.onError(url);
      }
    };
    this.resolveURL = function(url) {
      url = url.normalize("NFC");
      if (urlModifier) {
        return urlModifier(url);
      }
      return url;
    };
    this.setURLModifier = function(transform) {
      urlModifier = transform;
      return this;
    };
    this.addHandler = function(regex, loader) {
      handlers.push(regex, loader);
      return this;
    };
    this.removeHandler = function(regex) {
      const index = handlers.indexOf(regex);
      if (index !== -1) {
        handlers.splice(index, 2);
      }
      return this;
    };
    this.getHandler = function(file) {
      for (let i = 0, l = handlers.length; i < l; i += 2) {
        const regex = handlers[i];
        const loader = handlers[i + 1];
        if (regex.global) regex.lastIndex = 0;
        if (regex.test(file)) {
          return loader;
        }
      }
      return null;
    };
    this.abort = function() {
      this.abortController.abort();
      this._abortController = null;
      return this;
    };
  }
  // TODO: Revert this back to a single member variable once this issue has been fixed
  // https://github.com/cloudflare/workerd/issues/3657
  /**
   * Used for aborting ongoing requests in loaders using this manager.
   *
   * @type {AbortController}
   */
  get abortController() {
    if (!this._abortController) {
      this._abortController = new AbortController();
    }
    return this._abortController;
  }
};
var DefaultLoadingManager = /* @__PURE__ */ new LoadingManager();
var Loader = class {
  /**
   * Constructs a new loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(manager) {
    this.manager = manager !== void 0 ? manager : DefaultLoadingManager;
    this.crossOrigin = "anonymous";
    this.withCredentials = false;
    this.path = "";
    this.resourcePath = "";
    this.requestHeader = {};
    if (typeof __THREE_DEVTOOLS__ !== "undefined") {
      __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
    }
  }
  /**
   * This method needs to be implemented by all concrete loaders. It holds the
   * logic for loading assets from the backend.
   *
   * @abstract
   * @param {string} url - The path/URL of the file to be loaded.
   * @param {Function} onLoad - Executed when the loading process has been finished.
   * @param {onProgressCallback} [onProgress] - Executed while the loading is in progress.
   * @param {onErrorCallback} [onError] - Executed when errors occur.
   */
  load() {
  }
  /**
   * A async version of {@link Loader#load}.
   *
   * @param {string} url - The path/URL of the file to be loaded.
   * @param {onProgressCallback} [onProgress] - Executed while the loading is in progress.
   * @return {Promise} A Promise that resolves when the asset has been loaded.
   */
  loadAsync(url, onProgress) {
    const scope = this;
    return new Promise(function(resolve, reject) {
      scope.load(url, resolve, onProgress, reject);
    });
  }
  /**
   * This method needs to be implemented by all concrete loaders. It holds the
   * logic for parsing the asset into three.js entities.
   *
   * @abstract
   * @param {any} data - The data to parse.
   */
  parse() {
  }
  /**
   * Sets the `crossOrigin` String to implement CORS for loading the URL
   * from a different domain that allows CORS.
   *
   * @param {string} crossOrigin - The `crossOrigin` value.
   * @return {Loader} A reference to this instance.
   */
  setCrossOrigin(crossOrigin) {
    this.crossOrigin = crossOrigin;
    return this;
  }
  /**
   * Whether the XMLHttpRequest uses credentials such as cookies, authorization
   * headers or TLS client certificates, see [XMLHttpRequest.withCredentials](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials).
   *
   * Note: This setting has no effect if you are loading files locally or from the same domain.
   *
   * @param {boolean} value - The `withCredentials` value.
   * @return {Loader} A reference to this instance.
   */
  setWithCredentials(value) {
    this.withCredentials = value;
    return this;
  }
  /**
   * Sets the base path for the asset.
   *
   * @param {string} path - The base path.
   * @return {Loader} A reference to this instance.
   */
  setPath(path) {
    this.path = path;
    return this;
  }
  /**
   * Sets the base path for dependent resources like textures.
   *
   * @param {string} resourcePath - The resource path.
   * @return {Loader} A reference to this instance.
   */
  setResourcePath(resourcePath) {
    this.resourcePath = resourcePath;
    return this;
  }
  /**
   * Sets the given request header.
   *
   * @param {Object} requestHeader - A [request header](https://developer.mozilla.org/en-US/docs/Glossary/Request_header)
   * for configuring the HTTP request.
   * @return {Loader} A reference to this instance.
   */
  setRequestHeader(requestHeader) {
    this.requestHeader = requestHeader;
    return this;
  }
  /**
   * This method can be implemented in loaders for aborting ongoing requests.
   *
   * @abstract
   * @return {Loader} A reference to this instance.
   */
  abort() {
    return this;
  }
};
Loader.DEFAULT_MATERIAL_NAME = "__DEFAULT";
var _RESERVED_CHARS_RE = "\\[\\]\\.:\\/";
var _reservedRe = new RegExp("[" + _RESERVED_CHARS_RE + "]", "g");
var _wordChar = "[^" + _RESERVED_CHARS_RE + "]";
var _wordCharOrDot = "[^" + _RESERVED_CHARS_RE.replace("\\.", "") + "]";
var _directoryRe = /* @__PURE__ */ /((?:WC+[\/:])*)/.source.replace("WC", _wordChar);
var _nodeRe = /* @__PURE__ */ /(WCOD+)?/.source.replace("WCOD", _wordCharOrDot);
var _objectRe = /* @__PURE__ */ /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", _wordChar);
var _propertyRe = /* @__PURE__ */ /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", _wordChar);
var _trackRe = new RegExp(
  "^" + _directoryRe + _nodeRe + _objectRe + _propertyRe + "$"
);
var _supportedObjectNames = ["material", "materials", "bones", "map"];
var Composite = class {
  constructor(targetGroup, path, optionalParsedPath) {
    const parsedPath = optionalParsedPath || PropertyBinding.parseTrackName(path);
    this._targetGroup = targetGroup;
    this._bindings = targetGroup.subscribe_(path, parsedPath);
  }
  getValue(array2, offset) {
    this.bind();
    const firstValidIndex = this._targetGroup.nCachedObjects_, binding = this._bindings[firstValidIndex];
    if (binding !== void 0) binding.getValue(array2, offset);
  }
  setValue(array2, offset) {
    const bindings = this._bindings;
    for (let i = this._targetGroup.nCachedObjects_, n = bindings.length; i !== n; ++i) {
      bindings[i].setValue(array2, offset);
    }
  }
  bind() {
    const bindings = this._bindings;
    for (let i = this._targetGroup.nCachedObjects_, n = bindings.length; i !== n; ++i) {
      bindings[i].bind();
    }
  }
  unbind() {
    const bindings = this._bindings;
    for (let i = this._targetGroup.nCachedObjects_, n = bindings.length; i !== n; ++i) {
      bindings[i].unbind();
    }
  }
};
var PropertyBinding = class _PropertyBinding {
  /**
   * Constructs a new property binding.
   *
   * @param {Object} rootNode - The root node.
   * @param {string} path - The path.
   * @param {?Object} [parsedPath] - The parsed path.
   */
  constructor(rootNode, path, parsedPath) {
    this.path = path;
    this.parsedPath = parsedPath || _PropertyBinding.parseTrackName(path);
    this.node = _PropertyBinding.findNode(rootNode, this.parsedPath.nodeName);
    this.rootNode = rootNode;
    this.getValue = this._getValue_unbound;
    this.setValue = this._setValue_unbound;
  }
  /**
   * Factory method for creating a property binding from the given parameters.
   *
   * @static
   * @param {Object} root - The root node.
   * @param {string} path - The path.
   * @param {?Object} [parsedPath] - The parsed path.
   * @return {PropertyBinding|Composite} The created property binding or composite.
   */
  static create(root, path, parsedPath) {
    if (!(root && root.isAnimationObjectGroup)) {
      return new _PropertyBinding(root, path, parsedPath);
    } else {
      return new _PropertyBinding.Composite(root, path, parsedPath);
    }
  }
  /**
   * Replaces spaces with underscores and removes unsupported characters from
   * node names, to ensure compatibility with parseTrackName().
   *
   * @param {string} name - Node name to be sanitized.
   * @return {string} The sanitized node name.
   */
  static sanitizeNodeName(name) {
    return name.replace(/\s/g, "_").replace(_reservedRe, "");
  }
  /**
   * Parses the given track name (an object path to an animated property) and
   * returns an object with information about the path. Matches strings in the following forms:
   *
   * - nodeName.property
   * - nodeName.property[accessor]
   * - nodeName.material.property[accessor]
   * - uuid.property[accessor]
   * - uuid.objectName[objectIndex].propertyName[propertyIndex]
   * - parentName/nodeName.property
   * - parentName/parentName/nodeName.property[index]
   * - .bone[Armature.DEF_cog].position
   * - scene:helium_balloon_model:helium_balloon_model.position
   *
   * @static
   * @param {string} trackName - The track name to parse.
   * @return {Object} The parsed track name as an object.
   */
  static parseTrackName(trackName) {
    const matches = _trackRe.exec(trackName);
    if (matches === null) {
      throw new Error("THREE.PropertyBinding: Cannot parse trackName: " + trackName);
    }
    const results = {
      // directoryName: matches[ 1 ], // (tschw) currently unused
      nodeName: matches[2],
      objectName: matches[3],
      objectIndex: matches[4],
      propertyName: matches[5],
      // required
      propertyIndex: matches[6]
    };
    const lastDot = results.nodeName && results.nodeName.lastIndexOf(".");
    if (lastDot !== void 0 && lastDot !== -1) {
      const objectName = results.nodeName.substring(lastDot + 1);
      if (_supportedObjectNames.indexOf(objectName) !== -1) {
        results.nodeName = results.nodeName.substring(0, lastDot);
        results.objectName = objectName;
      }
    }
    if (results.propertyName === null || results.propertyName.length === 0) {
      throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: " + trackName);
    }
    return results;
  }
  /**
   * Searches for a node in the hierarchy of the given root object by the given
   * node name.
   *
   * @static
   * @param {Object} root - The root object.
   * @param {string|number} nodeName - The name of the node.
   * @return {?Object} The found node. Returns `null` if no object was found.
   */
  static findNode(root, nodeName) {
    if (nodeName === void 0 || nodeName === "" || nodeName === "." || nodeName === -1 || nodeName === root.name || nodeName === root.uuid) {
      return root;
    }
    if (root.skeleton) {
      const bone = root.skeleton.getBoneByName(nodeName);
      if (bone !== void 0) {
        return bone;
      }
    }
    if (root.children) {
      const searchNodeSubtree = function(children) {
        for (let i = 0; i < children.length; i++) {
          const childNode = children[i];
          if (childNode.name === nodeName || childNode.uuid === nodeName) {
            return childNode;
          }
          const result = searchNodeSubtree(childNode.children);
          if (result) return result;
        }
        return null;
      };
      const subTreeNode = searchNodeSubtree(root.children);
      if (subTreeNode) {
        return subTreeNode;
      }
    }
    return null;
  }
  // these are used to "bind" a nonexistent property
  _getValue_unavailable() {
  }
  _setValue_unavailable() {
  }
  // Getters
  _getValue_direct(buffer2, offset) {
    buffer2[offset] = this.targetObject[this.propertyName];
  }
  _getValue_array(buffer2, offset) {
    const source = this.resolvedProperty;
    for (let i = 0, n = source.length; i !== n; ++i) {
      buffer2[offset++] = source[i];
    }
  }
  _getValue_arrayElement(buffer2, offset) {
    buffer2[offset] = this.resolvedProperty[this.propertyIndex];
  }
  _getValue_toArray(buffer2, offset) {
    this.resolvedProperty.toArray(buffer2, offset);
  }
  // Direct
  _setValue_direct(buffer2, offset) {
    this.targetObject[this.propertyName] = buffer2[offset];
  }
  _setValue_direct_setNeedsUpdate(buffer2, offset) {
    this.targetObject[this.propertyName] = buffer2[offset];
    this.targetObject.needsUpdate = true;
  }
  _setValue_direct_setMatrixWorldNeedsUpdate(buffer2, offset) {
    this.targetObject[this.propertyName] = buffer2[offset];
    this.targetObject.matrixWorldNeedsUpdate = true;
  }
  // EntireArray
  _setValue_array(buffer2, offset) {
    const dest = this.resolvedProperty;
    for (let i = 0, n = dest.length; i !== n; ++i) {
      dest[i] = buffer2[offset++];
    }
  }
  _setValue_array_setNeedsUpdate(buffer2, offset) {
    const dest = this.resolvedProperty;
    for (let i = 0, n = dest.length; i !== n; ++i) {
      dest[i] = buffer2[offset++];
    }
    this.targetObject.needsUpdate = true;
  }
  _setValue_array_setMatrixWorldNeedsUpdate(buffer2, offset) {
    const dest = this.resolvedProperty;
    for (let i = 0, n = dest.length; i !== n; ++i) {
      dest[i] = buffer2[offset++];
    }
    this.targetObject.matrixWorldNeedsUpdate = true;
  }
  // ArrayElement
  _setValue_arrayElement(buffer2, offset) {
    this.resolvedProperty[this.propertyIndex] = buffer2[offset];
  }
  _setValue_arrayElement_setNeedsUpdate(buffer2, offset) {
    this.resolvedProperty[this.propertyIndex] = buffer2[offset];
    this.targetObject.needsUpdate = true;
  }
  _setValue_arrayElement_setMatrixWorldNeedsUpdate(buffer2, offset) {
    this.resolvedProperty[this.propertyIndex] = buffer2[offset];
    this.targetObject.matrixWorldNeedsUpdate = true;
  }
  // HasToFromArray
  _setValue_fromArray(buffer2, offset) {
    this.resolvedProperty.fromArray(buffer2, offset);
  }
  _setValue_fromArray_setNeedsUpdate(buffer2, offset) {
    this.resolvedProperty.fromArray(buffer2, offset);
    this.targetObject.needsUpdate = true;
  }
  _setValue_fromArray_setMatrixWorldNeedsUpdate(buffer2, offset) {
    this.resolvedProperty.fromArray(buffer2, offset);
    this.targetObject.matrixWorldNeedsUpdate = true;
  }
  _getValue_unbound(targetArray, offset) {
    this.bind();
    this.getValue(targetArray, offset);
  }
  _setValue_unbound(sourceArray, offset) {
    this.bind();
    this.setValue(sourceArray, offset);
  }
  /**
   * Creates a getter / setter pair for the property tracked by this binding.
   */
  bind() {
    let targetObject = this.node;
    const parsedPath = this.parsedPath;
    const objectName = parsedPath.objectName;
    const propertyName = parsedPath.propertyName;
    let propertyIndex = parsedPath.propertyIndex;
    if (!targetObject) {
      targetObject = _PropertyBinding.findNode(this.rootNode, parsedPath.nodeName);
      this.node = targetObject;
    }
    this.getValue = this._getValue_unavailable;
    this.setValue = this._setValue_unavailable;
    if (!targetObject) {
      warn("PropertyBinding: No target node found for track: " + this.path + ".");
      return;
    }
    if (objectName) {
      let objectIndex = parsedPath.objectIndex;
      switch (objectName) {
        case "materials":
          if (!targetObject.material) {
            error("PropertyBinding: Can not bind to material as node does not have a material.", this);
            return;
          }
          if (!targetObject.material.materials) {
            error("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.", this);
            return;
          }
          targetObject = targetObject.material.materials;
          break;
        case "bones":
          if (!targetObject.skeleton) {
            error("PropertyBinding: Can not bind to bones as node does not have a skeleton.", this);
            return;
          }
          targetObject = targetObject.skeleton.bones;
          for (let i = 0; i < targetObject.length; i++) {
            if (targetObject[i].name === objectIndex) {
              objectIndex = i;
              break;
            }
          }
          break;
        case "map":
          if ("map" in targetObject) {
            targetObject = targetObject.map;
            break;
          }
          if (!targetObject.material) {
            error("PropertyBinding: Can not bind to material as node does not have a material.", this);
            return;
          }
          if (!targetObject.material.map) {
            error("PropertyBinding: Can not bind to material.map as node.material does not have a map.", this);
            return;
          }
          targetObject = targetObject.material.map;
          break;
        default:
          if (targetObject[objectName] === void 0) {
            error("PropertyBinding: Can not bind to objectName of node undefined.", this);
            return;
          }
          targetObject = targetObject[objectName];
      }
      if (objectIndex !== void 0) {
        if (targetObject[objectIndex] === void 0) {
          error("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, targetObject);
          return;
        }
        targetObject = targetObject[objectIndex];
      }
    }
    const nodeProperty = targetObject[propertyName];
    if (nodeProperty === void 0) {
      const nodeName = parsedPath.nodeName;
      error("PropertyBinding: Trying to update property for track: " + nodeName + "." + propertyName + " but it wasn't found.", targetObject);
      return;
    }
    let versioning = this.Versioning.None;
    this.targetObject = targetObject;
    if (targetObject.isMaterial === true) {
      versioning = this.Versioning.NeedsUpdate;
    } else if (targetObject.isObject3D === true) {
      versioning = this.Versioning.MatrixWorldNeedsUpdate;
    }
    let bindingType = this.BindingType.Direct;
    if (propertyIndex !== void 0) {
      if (propertyName === "morphTargetInfluences") {
        if (!targetObject.geometry) {
          error("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this);
          return;
        }
        if (!targetObject.geometry.morphAttributes) {
          error("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this);
          return;
        }
        if (targetObject.morphTargetDictionary[propertyIndex] !== void 0) {
          propertyIndex = targetObject.morphTargetDictionary[propertyIndex];
        }
      }
      bindingType = this.BindingType.ArrayElement;
      this.resolvedProperty = nodeProperty;
      this.propertyIndex = propertyIndex;
    } else if (nodeProperty.fromArray !== void 0 && nodeProperty.toArray !== void 0) {
      bindingType = this.BindingType.HasFromToArray;
      this.resolvedProperty = nodeProperty;
    } else if (Array.isArray(nodeProperty)) {
      bindingType = this.BindingType.EntireArray;
      this.resolvedProperty = nodeProperty;
    } else {
      this.propertyName = propertyName;
    }
    this.getValue = this.GetterByBindingType[bindingType];
    this.setValue = this.SetterByBindingTypeAndVersioning[bindingType][versioning];
  }
  /**
   * Unbinds the property.
   */
  unbind() {
    this.node = null;
    this.getValue = this._getValue_unbound;
    this.setValue = this._setValue_unbound;
  }
};
PropertyBinding.Composite = Composite;
PropertyBinding.prototype.BindingType = {
  Direct: 0,
  EntireArray: 1,
  ArrayElement: 2,
  HasFromToArray: 3
};
PropertyBinding.prototype.Versioning = {
  None: 0,
  NeedsUpdate: 1,
  MatrixWorldNeedsUpdate: 2
};
PropertyBinding.prototype.GetterByBindingType = [
  PropertyBinding.prototype._getValue_direct,
  PropertyBinding.prototype._getValue_array,
  PropertyBinding.prototype._getValue_arrayElement,
  PropertyBinding.prototype._getValue_toArray
];
PropertyBinding.prototype.SetterByBindingTypeAndVersioning = [
  [
    // Direct
    PropertyBinding.prototype._setValue_direct,
    PropertyBinding.prototype._setValue_direct_setNeedsUpdate,
    PropertyBinding.prototype._setValue_direct_setMatrixWorldNeedsUpdate
  ],
  [
    // EntireArray
    PropertyBinding.prototype._setValue_array,
    PropertyBinding.prototype._setValue_array_setNeedsUpdate,
    PropertyBinding.prototype._setValue_array_setMatrixWorldNeedsUpdate
  ],
  [
    // ArrayElement
    PropertyBinding.prototype._setValue_arrayElement,
    PropertyBinding.prototype._setValue_arrayElement_setNeedsUpdate,
    PropertyBinding.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate
  ],
  [
    // HasToFromArray
    PropertyBinding.prototype._setValue_fromArray,
    PropertyBinding.prototype._setValue_fromArray_setNeedsUpdate,
    PropertyBinding.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate
  ]
];
var _controlInterpolantsResultBuffer = new Float32Array(1);
var _Matrix2 = class _Matrix2 {
  /**
   * Constructs a new 2x2 matrix. The arguments are supposed to be
   * in row-major order. If no arguments are provided, the constructor
   * initializes the matrix as an identity matrix.
   *
   * @param {number} [n11] - 1-1 matrix element.
   * @param {number} [n12] - 1-2 matrix element.
   * @param {number} [n21] - 2-1 matrix element.
   * @param {number} [n22] - 2-2 matrix element.
   */
  constructor(n11, n12, n21, n22) {
    this.elements = [
      1,
      0,
      0,
      1
    ];
    if (n11 !== void 0) {
      this.set(n11, n12, n21, n22);
    }
  }
  /**
   * Sets this matrix to the 2x2 identity matrix.
   *
   * @return {Matrix2} A reference to this matrix.
   */
  identity() {
    this.set(
      1,
      0,
      0,
      1
    );
    return this;
  }
  /**
   * Sets the elements of the matrix from the given array.
   *
   * @param {Array<number>} array - The matrix elements in column-major order.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Matrix2} A reference to this matrix.
   */
  fromArray(array2, offset = 0) {
    for (let i = 0; i < 4; i++) {
      this.elements[i] = array2[i + offset];
    }
    return this;
  }
  /**
   * Sets the elements of the matrix.The arguments are supposed to be
   * in row-major order.
   *
   * @param {number} n11 - 1-1 matrix element.
   * @param {number} n12 - 1-2 matrix element.
   * @param {number} n21 - 2-1 matrix element.
   * @param {number} n22 - 2-2 matrix element.
   * @return {Matrix2} A reference to this matrix.
   */
  set(n11, n12, n21, n22) {
    const te = this.elements;
    te[0] = n11;
    te[2] = n12;
    te[1] = n21;
    te[3] = n22;
    return this;
  }
};
_Matrix2.prototype.isMatrix2 = true;
var Matrix2 = _Matrix2;
if (typeof __THREE_DEVTOOLS__ !== "undefined") {
  __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: {
    revision: REVISION
  } }));
}
if (typeof window !== "undefined") {
  if (window.__THREE__) {
    warn("WARNING: Multiple instances of Three.js being imported.");
  } else {
    window.__THREE__ = REVISION;
  }
}

// node_modules/three/build/three.webgpu.js
var IGNORED_FILES = [
  /^StackTrace\.js$/,
  /^TSLCore\.js$/,
  /^.*Node\.js$/,
  /^three\.webgpu.*\.js$/
];
function getFilteredStack(stack) {
  const regex = /(?:at\s+(.+?)\s+\()?(?:(.+?)@)?([^@\s()]+):(\d+):(\d+)/;
  return stack.split("\n").map((line) => {
    const match = line.match(regex);
    if (!match) return null;
    const fn = match[1] || match[2] || "";
    const file = match[3].split("?")[0];
    const lineNum = parseInt(match[4], 10);
    const column = parseInt(match[5], 10);
    const fileName = file.split("/").pop();
    return {
      fn,
      file: fileName,
      line: lineNum,
      column
    };
  }).filter((frame) => {
    return frame && !IGNORED_FILES.some((regex2) => regex2.test(frame.file));
  });
}
var StackTrace = class {
  /**
   * Creates a StackTrace instance by capturing and filtering the current stack trace.
   *
   * @param {Error|string|null} stackMessage - An optional stack trace to use instead of capturing a new one.
   */
  constructor(stackMessage = null) {
    this.isStackTrace = true;
    this.stack = getFilteredStack(stackMessage ? stackMessage : new Error().stack);
  }
  /**
   * Returns a formatted location string of the top stack frame.
   *
   * @returns {string} The formatted stack trace message.
   */
  getLocation() {
    if (this.stack.length === 0) {
      return "[Unknown location]";
    }
    const mainStack = this.stack[0];
    const fn = mainStack.fn;
    const fnName = fn ? `"${fn}()" at ` : "";
    return `${fnName}"${mainStack.file}:${mainStack.line}"`;
  }
  /**
   * Returns the full error message including the stack trace.
   *
   * @param {string} message - The error message.
   * @returns {string} The full error message with stack trace.
   */
  getError(message) {
    if (this.stack.length === 0) {
      return message;
    }
    const stackString = this.stack.map((frame) => {
      const location = `${frame.file}:${frame.line}:${frame.column}`;
      if (frame.fn) {
        return `    at ${frame.fn} (${location})`;
      }
      return `    at ${location}`;
    }).join("\n");
    return `${message}
${stackString}`;
  }
};
function cyrb53(value, seed = 0) {
  let h1 = 3735928559 ^ seed, h2 = 1103547991 ^ seed;
  if (Array.isArray(value)) {
    for (let i = 0, val; i < value.length; i++) {
      val = value[i];
      h1 = Math.imul(h1 ^ val, 2654435761);
      h2 = Math.imul(h2 ^ val, 1597334677);
    }
  } else {
    for (let i = 0, ch; i < value.length; i++) {
      ch = value.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
  }
  h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507);
  h1 ^= Math.imul(h2 ^ h2 >>> 13, 3266489909);
  h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507);
  h2 ^= Math.imul(h1 ^ h1 >>> 13, 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}
var hashString = (str) => cyrb53(str);
var hashArray = (array2) => cyrb53(array2);
var hash$1 = (...params) => cyrb53(params);
function getValueType(value) {
  if (value === void 0 || value === null) return null;
  const typeOf = typeof value;
  if (value.isNode === true) {
    return "node";
  } else if (typeOf === "number") {
    return "float";
  } else if (typeOf === "boolean") {
    return "bool";
  } else if (typeOf === "string") {
    return "string";
  } else if (typeOf === "function") {
    return "shader";
  } else if (value.isVector2 === true) {
    return "vec2";
  } else if (value.isVector3 === true) {
    return "vec3";
  } else if (value.isVector4 === true) {
    return "vec4";
  } else if (value.isMatrix2 === true) {
    return "mat2";
  } else if (value.isMatrix3 === true) {
    return "mat3";
  } else if (value.isMatrix4 === true) {
    return "mat4";
  } else if (value.isColor === true) {
    return "color";
  } else if (value instanceof ArrayBuffer) {
    return "ArrayBuffer";
  }
  return null;
}
function getValueFromType(type, ...params) {
  const last4 = type ? type.slice(-4) : void 0;
  if (params.length === 1) {
    if (last4 === "vec2") params = [params[0], params[0]];
    else if (last4 === "vec3") params = [params[0], params[0], params[0]];
    else if (last4 === "vec4") params = [params[0], params[0], params[0], params[0]];
  }
  if (type === "color") {
    return new Color(...params);
  } else if (last4 === "vec2") {
    return new Vector2(...params);
  } else if (last4 === "vec3") {
    return new Vector3(...params);
  } else if (last4 === "vec4") {
    return new Vector4(...params);
  } else if (last4 === "mat2") {
    return new Matrix2(...params);
  } else if (last4 === "mat3") {
    return new Matrix3(...params);
  } else if (last4 === "mat4") {
    return new Matrix4(...params);
  } else if (type === "bool") {
    return params[0] || false;
  } else if (type === "float" || type === "int" || type === "uint") {
    return params[0] || 0;
  } else if (type === "string") {
    return params[0] || "";
  } else if (type === "ArrayBuffer") {
    return base64ToArrayBuffer(params[0]);
  }
  return null;
}
function arrayBufferToBase64(arrayBuffer) {
  let chars = "";
  const array2 = new Uint8Array(arrayBuffer);
  for (let i = 0; i < array2.length; i++) {
    chars += String.fromCharCode(array2[i]);
  }
  return btoa(chars);
}
function base64ToArrayBuffer(base64) {
  return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0)).buffer;
}
var NodeShaderStage = {
  VERTEX: "vertex",
  FRAGMENT: "fragment"
};
var NodeUpdateType = {
  NONE: "none",
  FRAME: "frame",
  RENDER: "render",
  OBJECT: "object"
};
var NodeAccess = {
  READ_ONLY: "readOnly",
  WRITE_ONLY: "writeOnly",
  READ_WRITE: "readWrite"
};
var defaultShaderStages = ["fragment", "vertex"];
var shaderStages = [...defaultShaderStages, "compute"];
var vectorComponents = ["x", "y", "z", "w"];
var _parentBuildStage = {
  analyze: "setup",
  generate: "analyze"
};
var _nodeId = 0;
var Node = class _Node extends EventDispatcher {
  static get type() {
    return "Node";
  }
  /**
   * Constructs a new node.
   *
   * @param {?string} nodeType - The node type.
   */
  constructor(nodeType = null) {
    super();
    this.nodeType = nodeType;
    this.updateType = NodeUpdateType.NONE;
    this.updateBeforeType = NodeUpdateType.NONE;
    this.updateAfterType = NodeUpdateType.NONE;
    this.version = 0;
    this.name = "";
    this.global = false;
    this.parents = false;
    this.isNode = true;
    this._beforeNodes = null;
    this._cacheKey = null;
    this._uuid = null;
    this._cacheKeyVersion = 0;
    this.id = _nodeId++;
    this.stackTrace = null;
    if (_Node.captureStackTrace === true) {
      this.stackTrace = new StackTrace();
    }
  }
  /**
   * Set this property to `true` when the node should be regenerated.
   *
   * @type {boolean}
   * @default false
   * @param {boolean} value
   */
  set needsUpdate(value) {
    if (value === true) {
      this.version++;
    }
  }
  /**
   * The UUID of the node.
   *
   * @type {string}
   * @readonly
   */
  get uuid() {
    if (this._uuid === null) {
      this._uuid = MathUtils.generateUUID();
    }
    return this._uuid;
  }
  /**
   * The type of the class. The value is usually the constructor name.
   *
   * @type {string}
  	 * @readonly
   */
  get type() {
    return this.constructor.type;
  }
  /**
   * Convenient method for defining {@link Node#update}.
   *
   * @param {Function} callback - The update method.
   * @param {string} updateType - The update type.
   * @return {Node} A reference to this node.
   */
  onUpdate(callback, updateType) {
    this.updateType = updateType;
    this.update = callback.bind(this);
    return this;
  }
  /**
   * Convenient method for defining {@link Node#update}. Similar to {@link Node#onUpdate}, but
   * this method automatically sets the update type to `FRAME`.
   *
   * @param {Function} callback - The update method.
   * @return {Node} A reference to this node.
   */
  onFrameUpdate(callback) {
    return this.onUpdate(callback, NodeUpdateType.FRAME);
  }
  /**
   * Convenient method for defining {@link Node#update}. Similar to {@link Node#onUpdate}, but
   * this method automatically sets the update type to `RENDER`.
   *
   * @param {Function} callback - The update method.
   * @return {Node} A reference to this node.
   */
  onRenderUpdate(callback) {
    return this.onUpdate(callback, NodeUpdateType.RENDER);
  }
  /**
   * Convenient method for defining {@link Node#update}. Similar to {@link Node#onUpdate}, but
   * this method automatically sets the update type to `OBJECT`.
   *
   * @param {Function} callback - The update method.
   * @return {Node} A reference to this node.
   */
  onObjectUpdate(callback) {
    return this.onUpdate(callback, NodeUpdateType.OBJECT);
  }
  /**
   * Convenient method for defining {@link Node#updateReference}.
   *
   * @param {Function} callback - The update method.
   * @return {Node} A reference to this node.
   */
  onReference(callback) {
    this.updateReference = callback.bind(this);
    return this;
  }
  /**
   * Nodes might refer to other objects like materials. This method allows to dynamically update the reference
   * to such objects based on a given state (e.g. the current node frame or builder).
   *
   * @param {any} state - This method can be invocated in different contexts so `state` can refer to any object type.
   * @return {any} The updated reference.
   */
  updateReference() {
    return this;
  }
  /**
   * By default this method returns the value of the {@link Node#global} flag. This method
   * can be overwritten in derived classes if an analytical way is required to determine the
   * global cache referring to the current shader-stage.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {boolean} Whether this node is global or not.
   */
  isGlobal() {
    return this.global;
  }
  /**
   * Generator function that can be used to iterate over the child nodes.
   *
   * @generator
   * @yields {Node} A child node.
   */
  *getChildren() {
    for (const { childNode } of this._getChildren()) {
      yield childNode;
    }
  }
  /**
   * Calling this method dispatches the `dispose` event. This event can be used
   * to register event listeners for clean up tasks.
   */
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  /**
   * Callback for {@link Node#traverse}.
   *
   * @callback traverseCallback
   * @param {Node} node - The current node.
   */
  /**
   * Can be used to traverse through the node's hierarchy.
   *
   * @param {traverseCallback} callback - A callback that is executed per node.
   */
  traverse(callback) {
    callback(this);
    for (const childNode of this.getChildren()) {
      childNode.traverse(callback);
    }
  }
  /**
   * Returns the child nodes of this node.
   *
   * @private
   * @param {Set<Node>} [ignores=new Set()] - A set of nodes to ignore during the search to avoid circular references.
   * @returns {Array<Object>} An array of objects describing the child nodes.
   */
  _getChildren(ignores = /* @__PURE__ */ new Set()) {
    const children = [];
    ignores.add(this);
    for (const property2 of Object.getOwnPropertyNames(this)) {
      const object = this[property2];
      if (property2.startsWith("_") === true || ignores.has(object)) continue;
      if (Array.isArray(object) === true) {
        for (let i = 0; i < object.length; i++) {
          const child = object[i];
          if (child && child.isNode === true) {
            children.push({ property: property2, index: i, childNode: child });
          }
        }
      } else if (object && object.isNode === true) {
        children.push({ property: property2, childNode: object });
      } else if (object && Object.getPrototypeOf(object) === Object.prototype) {
        for (const subProperty in object) {
          if (subProperty.startsWith("_") === true) continue;
          const child = object[subProperty];
          if (child && child.isNode === true) {
            children.push({ property: property2, index: subProperty, childNode: child });
          }
        }
      }
    }
    return children;
  }
  /**
   * Returns the cache key for this node.
   *
   * @param {boolean} [force=false] - When set to `true`, a recomputation of the cache key is forced.
   * @param {Set<Node>} [ignores=null] - A set of nodes to ignore during the computation of the cache key.
   * @return {number} The cache key of the node.
   */
  getCacheKey(force = false, ignores = null) {
    force = force || this.version !== this._cacheKeyVersion;
    if (force === true || this._cacheKey === null) {
      if (ignores === null) ignores = /* @__PURE__ */ new Set();
      const values = [];
      for (const { property: property2, childNode } of this._getChildren(ignores)) {
        values.push(hashString(property2.slice(0, -4)), childNode.getCacheKey(force, ignores));
      }
      this._cacheKey = hash$1(hashArray(values), this.customCacheKey());
      this._cacheKeyVersion = this.version;
    }
    return this._cacheKey;
  }
  /**
   * Generate a custom cache key for this node.
   *
   * @return {number} The cache key of the node.
   */
  customCacheKey() {
    return this.id;
  }
  /**
   * Returns the references to this node which is by default `this`.
   *
   * @return {Node} A reference to this node.
   */
  getScope() {
    return this;
  }
  /**
   * Returns the hash of the node which is used to identify the node. By default it's
   * the {@link Node#uuid} however derived node classes might have to overwrite this method
   * depending on their implementation.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {string} The hash.
   */
  getHash() {
    return String(this.id);
  }
  /**
   * Returns the update type of {@link Node#update}.
   *
   * @return {NodeUpdateType} The update type.
   */
  getUpdateType() {
    return this.updateType;
  }
  /**
   * Returns the update type of {@link Node#updateBefore}.
   *
   * @return {NodeUpdateType} The update type.
   */
  getUpdateBeforeType() {
    return this.updateBeforeType;
  }
  /**
   * Returns the update type of {@link Node#updateAfter}.
   *
   * @return {NodeUpdateType} The update type.
   */
  getUpdateAfterType() {
    return this.updateAfterType;
  }
  /**
   * Certain types are composed of multiple elements. For example a `vec3`
   * is composed of three `float` values. This method returns the type of
   * these elements.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {string} The type of the node.
   */
  getElementType(builder) {
    const type = this.getNodeType(builder);
    const elementType = builder.getElementType(type);
    return elementType;
  }
  /**
   * Returns the node member type for the given name.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @param {string} name - The name of the member.
   * @return {string} The type of the node.
   */
  getMemberType() {
    return "void";
  }
  /**
   * Returns the node's type.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @param {string} [output=null] - The output of the node.
   * @return {string} The type of the node.
   */
  getNodeType(builder, output2 = null) {
    const nodeData = builder.getDataFromNode(this);
    let type;
    if (output2 !== null) {
      nodeData.typeFromOutput = nodeData.typeFromOutput || {};
      type = nodeData.typeFromOutput[output2];
      if (type === void 0) {
        type = this.generateNodeType(builder, output2);
        nodeData.typeFromOutput[output2] = type;
      }
    } else {
      type = nodeData.type;
      if (type === void 0) {
        type = this.generateNodeType(builder);
        nodeData.type = type;
      }
    }
    return type;
  }
  /**
   * Returns the node's type.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @param {string} [output=null] - The output of the node.
   * @return {string} The type of the node.
   */
  generateNodeType(builder, output2 = null) {
    const nodeProperties = builder.getNodeProperties(this);
    if (nodeProperties.outputNode) {
      return nodeProperties.outputNode.getNodeType(builder, output2);
    }
    return this.nodeType;
  }
  /**
   * This method is used during the build process of a node and ensures
   * equal nodes are not built multiple times but just once. For example if
   * `attribute( 'uv' )` is used multiple times by the user, the build
   * process makes sure to process just the first node. It also handles
   * node overrides if an override context is set.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {Node} The shared node if possible. Otherwise `this` is returned.
   */
  getShared(builder) {
    const hash = this.getHash(builder);
    const nodeFromHash = builder.getNodeFromHash(hash);
    let sharedNode = null;
    if (nodeFromHash && nodeFromHash !== this) {
      sharedNode = nodeFromHash;
    } else if (builder.context.overrideNodes) {
      const callback = builder.context.overrideNodes.get(this);
      if (callback) {
        const nodeData = builder.getDataFromNode(this);
        if (nodeData.isOverwritten !== true) {
          nodeData.isOverwritten = true;
          sharedNode = callback(builder).overrideNode(this, null);
          nodeData.sharedNode = sharedNode;
        } else {
          sharedNode = nodeData.sharedNode;
        }
      }
    }
    return sharedNode || this;
  }
  /**
   * Returns the number of elements in the node array.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {?number} The number of elements in the node array.
   */
  getArrayCount() {
    return null;
  }
  /**
   * Represents the setup stage which is the first step of the build process, see {@link Node#build} method.
   * This method is often overwritten in derived modules to prepare the node which is used as a node's output/result.
   * If an output node is prepared, then it must be returned in the `return` statement of the derived module's setup function.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {?Node} The output node.
   */
  setup(builder) {
    const nodeProperties = builder.getNodeProperties(this);
    let index = 0;
    for (const childNode of this.getChildren()) {
      nodeProperties["node" + index++] = childNode;
    }
    return nodeProperties.outputNode || null;
  }
  /**
   * Represents the analyze stage which is the second step of the build process, see {@link Node#build} method.
   * This stage analyzes the node hierarchy and ensures descendent nodes are built.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @param {?Node} output - The target output node.
   */
  analyze(builder, output2 = null) {
    const usageCount = builder.increaseUsage(this);
    if (this.parents === true) {
      const nodeData = builder.getDataFromNode(this, "any");
      nodeData.stages = nodeData.stages || {};
      nodeData.stages[builder.shaderStage] = nodeData.stages[builder.shaderStage] || [];
      nodeData.stages[builder.shaderStage].push(output2);
    }
    if (usageCount === 1) {
      const nodeProperties = builder.getNodeProperties(this);
      for (const childNode of Object.values(nodeProperties)) {
        if (childNode && childNode.isNode === true) {
          childNode.build(builder, this);
        }
      }
    }
  }
  /**
   * Represents the generate stage which is the third step of the build process, see {@link Node#build} method.
   * This state builds the output node and returns the resulting shader string.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @param {?string} [output] - Can be used to define the output type.
   * @return {?string} The generated shader string.
   */
  generate(builder, output2) {
    const { outputNode } = builder.getNodeProperties(this);
    if (outputNode && outputNode.isNode === true) {
      return outputNode.build(builder, output2);
    }
  }
  /**
   * The method can be implemented to update the node's internal state before it is used to render an object.
   * The {@link Node#updateBeforeType} property defines how often the update is executed.
   *
   * @abstract
   * @param {NodeFrame} frame - A reference to the current node frame.
   * @return {?boolean} An optional bool that indicates whether the implementation actually performed an update or not (e.g. due to caching).
   */
  updateBefore() {
    warn("Abstract function.");
  }
  /**
   * The method can be implemented to update the node's internal state after it was used to render an object.
   * The {@link Node#updateAfterType} property defines how often the update is executed.
   *
   * @abstract
   * @param {NodeFrame} frame - A reference to the current node frame.
   * @return {?boolean} An optional bool that indicates whether the implementation actually performed an update or not (e.g. due to caching).
   */
  updateAfter() {
    warn("Abstract function.");
  }
  /**
   * The method can be implemented to update the node's internal state when it is used to render an object.
   * The {@link Node#updateType} property defines how often the update is executed.
   *
   * @abstract
   * @param {NodeFrame} frame - A reference to the current node frame.
   * @return {?boolean} An optional bool that indicates whether the implementation actually performed an update or not (e.g. due to caching).
   */
  update() {
    warn("Abstract function.");
  }
  before(node) {
    if (this._beforeNodes === null) this._beforeNodes = [];
    this._beforeNodes.push(node);
    return this;
  }
  /**
   * This method performs the build of a node. The behavior and return value depend on the current build stage:
   * - **setup**: Prepares the node and its children for the build process. This process can also create new nodes. Returns the node itself or a variant.
   * - **analyze**: Analyzes the node hierarchy for optimizations in the code generation stage. Returns `null`.
   * - **generate**: Generates the shader code for the node. Returns the generated shader string.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @param {?(string|Node)} [output=null] - Can be used to define the output type.
   * @return {?(Node|string)} The result of the build process, depending on the build stage.
   */
  build(builder, output2 = null) {
    const refNode = this.getShared(builder);
    if (this !== refNode) {
      return refNode.build(builder, output2);
    }
    if (this._beforeNodes !== null) {
      const currentBeforeNodes = this._beforeNodes;
      this._beforeNodes = null;
      for (const beforeNode of currentBeforeNodes) {
        beforeNode.build(builder, output2);
      }
      this._beforeNodes = currentBeforeNodes;
    }
    const nodeData = builder.getDataFromNode(this);
    nodeData.buildStages = nodeData.buildStages || {};
    nodeData.buildStages[builder.buildStage] = true;
    const parentBuildStage = _parentBuildStage[builder.buildStage];
    if (parentBuildStage && nodeData.buildStages[parentBuildStage] !== true) {
      const previousBuildStage = builder.getBuildStage();
      builder.setBuildStage(parentBuildStage);
      this.build(builder);
      builder.setBuildStage(previousBuildStage);
    }
    builder.addChain(this);
    let result = null;
    const buildStage = builder.getBuildStage();
    if (buildStage === "setup") {
      builder.addNode(this);
      this.updateReference(builder);
      const properties = builder.getNodeProperties(this);
      if (properties.initialized !== true) {
        properties.initialized = true;
        properties.outputNode = this.setup(builder) || properties.outputNode || null;
        for (const childNode of Object.values(properties)) {
          if (childNode && childNode.isNode === true) {
            if (childNode.parents === true) {
              const childProperties = builder.getNodeProperties(childNode);
              childProperties.parents = childProperties.parents || [];
              childProperties.parents.push(this);
            }
            childNode.build(builder);
          }
        }
        builder.addSequentialNode(this);
      }
      result = properties.outputNode;
    } else if (buildStage === "analyze") {
      this.analyze(builder, output2);
    } else if (buildStage === "generate") {
      const isGenerateOnce = this.generate.length < 2;
      if (isGenerateOnce) {
        const type = this.getNodeType(builder);
        const nodeData2 = builder.getDataFromNode(this);
        result = nodeData2.snippet;
        if (result === void 0) {
          if (nodeData2.generated === void 0) {
            nodeData2.generated = true;
            result = this.generate(builder) || "";
            nodeData2.snippet = result;
          } else {
            warn("Node: Recursion detected.", this);
            result = "/* Recursion detected. */";
          }
        } else if (nodeData2.flowCodes !== void 0 && builder.context.nodeBlock !== void 0) {
          builder.addFlowCodeHierarchy(this, builder.context.nodeBlock);
        }
        result = builder.format(result, type, output2);
      } else {
        result = this.generate(builder, output2) || "";
      }
      if (result === "" && output2 !== null && output2 !== "void" && output2 !== "OutputType") {
        error(`TSL: Invalid generated code, expected a "${output2}".`);
        result = builder.generateConst(output2);
      }
    }
    builder.removeChain(this);
    return result;
  }
  /**
   * Returns the child nodes as a JSON object.
   *
   * @return {Generator<Object>} An iterable list of serialized child objects as JSON.
   */
  getSerializeChildren() {
    return this._getChildren();
  }
  /**
   * Serializes the node to JSON.
   *
   * @param {Object} json - The output JSON object.
   */
  serialize(json) {
    const nodeChildren = this.getSerializeChildren();
    const inputNodes = {};
    for (const { property: property2, index, childNode } of nodeChildren) {
      if (index !== void 0) {
        if (inputNodes[property2] === void 0) {
          inputNodes[property2] = Number.isInteger(index) ? [] : {};
        }
        inputNodes[property2][index] = childNode.toJSON(json.meta).uuid;
      } else {
        inputNodes[property2] = childNode.toJSON(json.meta).uuid;
      }
    }
    if (Object.keys(inputNodes).length > 0) {
      json.inputNodes = inputNodes;
    }
  }
  /**
   * Deserializes the node from the given JSON.
   *
   * @param {Object} json - The JSON object.
   */
  deserialize(json) {
    if (json.inputNodes !== void 0) {
      const nodes = json.meta.nodes;
      for (const property2 in json.inputNodes) {
        if (Array.isArray(json.inputNodes[property2])) {
          const inputArray = [];
          for (const uuid of json.inputNodes[property2]) {
            inputArray.push(nodes[uuid]);
          }
          this[property2] = inputArray;
        } else if (typeof json.inputNodes[property2] === "object") {
          const inputObject = {};
          for (const subProperty in json.inputNodes[property2]) {
            const uuid = json.inputNodes[property2][subProperty];
            inputObject[subProperty] = nodes[uuid];
          }
          this[property2] = inputObject;
        } else {
          const uuid = json.inputNodes[property2];
          this[property2] = nodes[uuid];
        }
      }
    }
  }
  /**
   * Serializes the node into the three.js JSON Object/Scene format.
   *
   * @param {?Object} meta - An optional JSON object that already holds serialized data from other scene objects.
   * @return {Object} The serialized node.
   */
  toJSON(meta) {
    const { uuid, type } = this;
    const isRoot = meta === void 0 || typeof meta === "string";
    if (isRoot) {
      meta = {
        textures: {},
        images: {},
        nodes: {}
      };
    }
    let data = meta.nodes[uuid];
    if (data === void 0) {
      data = {
        uuid,
        type,
        meta,
        metadata: {
          version: 4.7,
          type: "Node",
          generator: "Node.toJSON"
        }
      };
      if (isRoot !== true) meta.nodes[data.uuid] = data;
      this.serialize(data);
      delete data.meta;
    }
    function extractFromCache(cache2) {
      const values = [];
      for (const key in cache2) {
        const data2 = cache2[key];
        delete data2.metadata;
        values.push(data2);
      }
      return values;
    }
    if (isRoot) {
      const textures = extractFromCache(meta.textures);
      const images = extractFromCache(meta.images);
      const nodes = extractFromCache(meta.nodes);
      if (textures.length > 0) data.textures = textures;
      if (images.length > 0) data.images = images;
      if (nodes.length > 0) data.nodes = nodes;
    }
    return data;
  }
};
Node.captureStackTrace = false;
var ArrayElementNode = class extends Node {
  // @TODO: If extending from TempNode it breaks webgpu_compute
  static get type() {
    return "ArrayElementNode";
  }
  /**
   * Constructs an array element node.
   *
   * @param {Node} node - The array-like node.
   * @param {Node} indexNode - The index node that defines the element access.
   */
  constructor(node, indexNode) {
    super();
    this.node = node;
    this.indexNode = indexNode;
    this.isArrayElementNode = true;
  }
  /**
   * This method is overwritten since the node type is inferred from the array-like node.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {string} The node type.
   */
  generateNodeType(builder) {
    return this.node.getElementType(builder);
  }
  /**
   * This method is overwritten since the member type is inferred from the array-like node.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @param {string} name - The member name.
   * @return {string} The member type.
   */
  getMemberType(builder, name) {
    return this.node.getMemberType(builder, name);
  }
  generate(builder) {
    const indexType = this.indexNode.getNodeType(builder);
    const nodeSnippet = this.node.build(builder);
    const indexSnippet = this.indexNode.build(builder, !builder.isVector(indexType) && builder.isInteger(indexType) ? indexType : "uint");
    return `${nodeSnippet}[ ${indexSnippet} ]`;
  }
};
var ConvertNode = class extends Node {
  static get type() {
    return "ConvertNode";
  }
  /**
   * Constructs a new convert node.
   *
   * @param {Node} node - The node which type should be converted.
   * @param {string} convertTo - The target node type. Multiple types can be defined by separating them with a `|` sign.
   */
  constructor(node, convertTo) {
    super();
    this.node = node;
    this.convertTo = convertTo;
  }
  /**
   * This method is overwritten since the implementation tries to infer the best
   * matching type from the {@link ConvertNode#convertTo} property.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {string} The node type.
   */
  generateNodeType(builder) {
    const requestType = this.node.getNodeType(builder);
    let convertTo = null;
    for (const overloadingType of this.convertTo.split("|")) {
      if (convertTo === null || builder.getTypeLength(requestType) === builder.getTypeLength(overloadingType)) {
        convertTo = overloadingType;
      }
    }
    return convertTo;
  }
  serialize(data) {
    super.serialize(data);
    data.convertTo = this.convertTo;
  }
  deserialize(data) {
    super.deserialize(data);
    this.convertTo = data.convertTo;
  }
  generate(builder, output2) {
    const node = this.node;
    const type = this.getNodeType(builder);
    const snippet = node.build(builder, type);
    return builder.format(snippet, type, output2);
  }
};
var TempNode = class extends Node {
  static get type() {
    return "TempNode";
  }
  /**
   * Constructs a temp node.
   *
   * @param {?string} nodeType - The node type.
   */
  constructor(nodeType = null) {
    super(nodeType);
    this.isTempNode = true;
  }
  /**
   * Whether this node is used more than once in context of other nodes.
   *
   * @param {NodeBuilder} builder - The node builder.
   * @return {boolean} A flag that indicates if there is more than one dependency to other nodes.
   */
  hasDependencies(builder) {
    return builder.getDataFromNode(this).usageCount > 1;
  }
  build(builder, output2) {
    const buildStage = builder.getBuildStage();
    if (buildStage === "generate") {
      const type = builder.getVectorType(this.getNodeType(builder, output2));
      const nodeData = builder.getDataFromNode(this);
      if (nodeData.propertyName !== void 0) {
        return builder.format(nodeData.propertyName, type, output2);
      } else if (type !== "void" && output2 !== "void" && this.hasDependencies(builder)) {
        const snippet = super.build(builder, type);
        const nodeVar = builder.getVarFromNode(this, null, type);
        const propertyName = builder.getPropertyName(nodeVar);
        builder.addLineFlowCode(`${propertyName} = ${snippet}`, this);
        nodeData.snippet = snippet;
        nodeData.propertyName = propertyName;
        return builder.format(nodeData.propertyName, type, output2);
      }
    }
    return super.build(builder, output2);
  }
};
var JoinNode = class extends TempNode {
  static get type() {
    return "JoinNode";
  }
  /**
   * Constructs a new join node.
   *
   * @param {Array<Node>} nodes - An array of nodes that should be joined.
   * @param {?string} [nodeType=null] - The node type.
   */
  constructor(nodes = [], nodeType = null) {
    super(nodeType);
    this.nodes = nodes;
  }
  /**
   * This method is overwritten since the node type must be inferred from the
   * joined data length if not explicitly defined.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {string} The node type.
   */
  generateNodeType(builder) {
    if (this.nodeType !== null) {
      return builder.getVectorType(this.nodeType);
    }
    return builder.getTypeFromLength(this.nodes.reduce((count, cur) => count + builder.getTypeLength(cur.getNodeType(builder)), 0));
  }
  generate(builder, output2) {
    const type = this.getNodeType(builder);
    const maxLength = builder.getTypeLength(type);
    const nodes = this.nodes;
    const primitiveType = builder.getComponentType(type);
    const snippetValues = [];
    let length2 = 0;
    for (const input of nodes) {
      if (length2 >= maxLength) {
        error(`TSL: Length of parameters exceeds maximum length of function '${type}()' type.`, this.stackTrace);
        break;
      }
      let inputType = input.getNodeType(builder);
      let inputTypeLength = builder.getTypeLength(inputType);
      let inputSnippet;
      if (length2 + inputTypeLength > maxLength) {
        error(`TSL: Length of '${type}()' data exceeds maximum length of output type.`, this.stackTrace);
        inputTypeLength = maxLength - length2;
        inputType = builder.getTypeFromLength(inputTypeLength);
      }
      length2 += inputTypeLength;
      inputSnippet = input.build(builder, inputType);
      const inputPrimitiveType = builder.getComponentType(inputType);
      if (inputPrimitiveType !== primitiveType) {
        const targetType = builder.getTypeFromLength(inputTypeLength, primitiveType);
        inputSnippet = builder.format(inputSnippet, inputType, targetType);
      }
      snippetValues.push(inputSnippet);
    }
    const snippet = `${builder.getType(type)}( ${snippetValues.join(", ")} )`;
    return builder.format(snippet, type, output2);
  }
};
var _stringVectorComponents = vectorComponents.join("");
var SplitNode = class extends Node {
  static get type() {
    return "SplitNode";
  }
  /**
   * Constructs a new split node.
   *
   * @param {Node} node - The node that should be accessed.
   * @param {string} [components='x'] - The components that should be accessed.
   */
  constructor(node, components = "x") {
    super();
    this.node = node;
    this.components = components;
    this.isSplitNode = true;
  }
  /**
   * Returns the vector length which is computed based on the requested components.
   *
   * @return {number} The vector length.
   */
  getVectorLength() {
    let vectorLength = this.components.length;
    for (const c of this.components) {
      vectorLength = Math.max(vectorComponents.indexOf(c) + 1, vectorLength);
    }
    return vectorLength;
  }
  /**
   * Returns the component type of the node's type.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {string} The component type.
   */
  getComponentType(builder) {
    return builder.getComponentType(this.node.getNodeType(builder));
  }
  /**
   * This method is overwritten since the node type is inferred from requested components.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {string} The node type.
   */
  generateNodeType(builder) {
    return builder.getTypeFromLength(this.components.length, this.getComponentType(builder));
  }
  /**
   * Returns the scope of the node.
   *
   * @return {Node} The scope of the node.
   */
  getScope() {
    return this.node.getScope();
  }
  generate(builder, output2) {
    const node = this.node;
    const nodeTypeLength = builder.getTypeLength(node.getNodeType(builder));
    let snippet = null;
    if (nodeTypeLength > 1) {
      let type = null;
      const componentsLength = this.getVectorLength();
      if (componentsLength >= nodeTypeLength) {
        type = builder.getTypeFromLength(this.getVectorLength(), this.getComponentType(builder));
      }
      const nodeSnippet = node.build(builder, type);
      if (this.components.length === nodeTypeLength && this.components === _stringVectorComponents.slice(0, this.components.length)) {
        snippet = builder.format(nodeSnippet, type, output2);
      } else {
        snippet = builder.format(`${nodeSnippet}.${this.components}`, this.getNodeType(builder), output2);
      }
    } else {
      snippet = node.build(builder, output2);
    }
    return snippet;
  }
  serialize(data) {
    super.serialize(data);
    data.components = this.components;
  }
  deserialize(data) {
    super.deserialize(data);
    this.components = data.components;
  }
};
var SetNode = class extends TempNode {
  static get type() {
    return "SetNode";
  }
  /**
   * Constructs a new set node.
   *
   * @param {Node} sourceNode - The node that should be updated.
   * @param {string} components - The components that should be updated.
   * @param {Node} targetNode - The value node.
   */
  constructor(sourceNode, components, targetNode) {
    super();
    this.sourceNode = sourceNode;
    this.components = components;
    this.targetNode = targetNode;
  }
  /**
   * This method is overwritten since the node type is inferred from {@link SetNode#sourceNode}.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {string} The node type.
   */
  generateNodeType(builder) {
    return this.sourceNode.getNodeType(builder);
  }
  generate(builder) {
    const { sourceNode, components, targetNode } = this;
    const sourceType = this.getNodeType(builder);
    const componentType = builder.getComponentType(targetNode.getNodeType(builder));
    const targetType = builder.getTypeFromLength(components.length, componentType);
    const targetSnippet = targetNode.build(builder, targetType);
    const sourceSnippet = sourceNode.build(builder, sourceType);
    const length2 = builder.getTypeLength(sourceType);
    const snippetValues = [];
    for (let i = 0; i < length2; i++) {
      const component = vectorComponents[i];
      if (component === components[0]) {
        snippetValues.push(targetSnippet);
        i += components.length - 1;
      } else {
        snippetValues.push(sourceSnippet + "." + component);
      }
    }
    return `${builder.getType(sourceType)}( ${snippetValues.join(", ")} )`;
  }
};
var FlipNode = class extends TempNode {
  static get type() {
    return "FlipNode";
  }
  /**
   * Constructs a new flip node.
   *
   * @param {Node} sourceNode - The node which component(s) should be flipped.
   * @param {string} components - The components that should be flipped e.g. `'x'` or `'xy'`.
   */
  constructor(sourceNode, components) {
    super();
    this.sourceNode = sourceNode;
    this.components = components;
  }
  /**
   * This method is overwritten since the node type is inferred from the source node.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {string} The node type.
   */
  generateNodeType(builder) {
    return this.sourceNode.getNodeType(builder);
  }
  generate(builder) {
    const { components, sourceNode } = this;
    const sourceType = this.getNodeType(builder);
    const sourceSnippet = sourceNode.build(builder);
    const sourceCache = builder.getVarFromNode(this);
    const sourceProperty = builder.getPropertyName(sourceCache);
    builder.addLineFlowCode(sourceProperty + " = " + sourceSnippet, this);
    const length2 = builder.getTypeLength(sourceType);
    const snippetValues = [];
    let componentIndex = 0;
    for (let i = 0; i < length2; i++) {
      const component = vectorComponents[i];
      if (component === components[componentIndex]) {
        snippetValues.push("1.0 - " + (sourceProperty + "." + component));
        componentIndex++;
      } else {
        snippetValues.push(sourceProperty + "." + component);
      }
    }
    return `${builder.getType(sourceType)}( ${snippetValues.join(", ")} )`;
  }
};
var InputNode = class extends Node {
  static get type() {
    return "InputNode";
  }
  /**
   * Constructs a new input node.
   *
   * @param {any} value - The value of this node. This can be any JS primitive, functions, array buffers or even three.js objects (vector, matrices, colors).
   * @param {?string} nodeType - The node type. If no explicit type is defined, the node tries to derive the type from its value.
   */
  constructor(value, nodeType = null) {
    super(nodeType);
    this.isInputNode = true;
    this.value = value;
    this.precision = null;
  }
  generateNodeType() {
    if (this.nodeType === null) {
      return getValueType(this.value);
    }
    return this.nodeType;
  }
  /**
   * Returns the input type of the node which is by default the node type. Derived modules
   * might overwrite this method and use a fixed type or compute one analytically.
   *
   * A typical example for different input and node types are textures. The input type of a
   * normal RGBA texture is `texture` whereas its node type is `vec4`.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {string} The input type.
   */
  getInputType(builder) {
    return this.getNodeType(builder);
  }
  /**
   * Sets the precision to the given value. The method can be
   * overwritten in derived classes if the final precision must be computed
   * analytically.
   *
   * @param {('low'|'medium'|'high')} precision - The precision of the input value in the shader.
   * @return {InputNode} A reference to this node.
   */
  setPrecision(precision) {
    this.precision = precision;
    return this;
  }
  serialize(data) {
    super.serialize(data);
    data.value = this.value;
    if (this.value && this.value.toArray) data.value = this.value.toArray();
    data.valueType = getValueType(this.value);
    data.nodeType = this.nodeType;
    if (data.valueType === "ArrayBuffer") data.value = arrayBufferToBase64(data.value);
    data.precision = this.precision;
  }
  deserialize(data) {
    super.deserialize(data);
    this.nodeType = data.nodeType;
    this.value = Array.isArray(data.value) ? getValueFromType(data.valueType, ...data.value) : data.value;
    this.precision = data.precision || null;
    if (this.value && this.value.fromArray) this.value = this.value.fromArray(data.value);
  }
  generate() {
    warn("Abstract function.");
  }
};
var _regNum = /float|u?int/;
var ConstNode = class extends InputNode {
  static get type() {
    return "ConstNode";
  }
  /**
   * Constructs a new input node.
   *
   * @param {any} value - The value of this node. Usually a JS primitive or three.js object (vector, matrix, color).
   * @param {?string} nodeType - The node type. If no explicit type is defined, the node tries to derive the type from its value.
   */
  constructor(value, nodeType = null) {
    super(value, nodeType);
    this.isConstNode = true;
  }
  /**
   * Generates the shader string of the value with the current node builder.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {string} The generated value as a shader string.
   */
  generateConst(builder) {
    return builder.generateConst(this.getNodeType(builder), this.value);
  }
  generate(builder, output2) {
    const type = this.getNodeType(builder);
    if (_regNum.test(type) && _regNum.test(output2)) {
      return builder.generateConst(output2, this.value);
    }
    return builder.format(this.generateConst(builder), type, output2);
  }
};
var MemberNode = class extends Node {
  static get type() {
    return "MemberNode";
  }
  /**
   * Constructs a member node.
   *
   * @param {Node} structNode - The struct node.
   * @param {string} property - The property name.
   */
  constructor(structNode, property2) {
    super();
    this.structNode = structNode;
    this.property = property2;
    this.isMemberNode = true;
  }
  hasMember(builder) {
    if (this.structNode.isMemberNode) {
      if (this.structNode.hasMember(builder) === false) {
        return false;
      }
    }
    return this.structNode.getMemberType(builder, this.property) !== "void";
  }
  generateNodeType(builder) {
    if (this.hasMember(builder) === false) {
      return "float";
    }
    return this.structNode.getMemberType(builder, this.property);
  }
  getMemberType(builder, name) {
    if (this.hasMember(builder) === false) {
      return "float";
    }
    const type = this.getNodeType(builder);
    const struct = builder.getStructTypeNode(type);
    return struct.getMemberType(builder, name);
  }
  generate(builder) {
    if (this.hasMember(builder) === false) {
      warn(`TSL: Member "${this.property}" does not exist in struct.`, this.stackTrace);
      const type = this.getNodeType(builder);
      return builder.generateConst(type);
    }
    const propertyName = this.structNode.build(builder);
    return propertyName + "." + this.property;
  }
};
var currentStack = null;
var NodeElements = /* @__PURE__ */ new Map();
function addMethodChaining(name, nodeElement) {
  if (NodeElements.has(name)) {
    warn(`TSL: Redefinition of method chaining '${name}'.`);
    return;
  }
  if (typeof nodeElement !== "function") throw new Error(`THREE.TSL: Node element ${name} is not a function`);
  NodeElements.set(name, nodeElement);
  if (name !== "assign") {
    Node.prototype[name] = function(...params) {
      return this.isStackNode ? this.addToStack(nodeElement(...params)) : nodeElement(this, ...params);
    };
    Node.prototype[name + "Assign"] = function(...params) {
      return this.isStackNode ? this.assign(params[0], nodeElement(...params)) : this.assign(nodeElement(this, ...params));
    };
  }
}
var parseSwizzle = (props) => props.replace(/r|s/g, "x").replace(/g|t/g, "y").replace(/b|p/g, "z").replace(/a|q/g, "w");
var parseSwizzleAndSort = (props) => parseSwizzle(props).split("").sort().join("");
Node.prototype.assign = function(...params) {
  if (this.isStackNode !== true) {
    if (currentStack !== null) {
      currentStack.assign(this, ...params);
    } else {
      error("TSL: No stack defined for assign operation. Make sure the assign is inside a Fn().", new StackTrace());
    }
    return this;
  } else {
    const nodeElement = NodeElements.get("assign");
    return this.addToStack(nodeElement(...params));
  }
};
Node.prototype.toVarIntent = function() {
  return this;
};
Node.prototype.get = function(value) {
  return new MemberNode(this, value);
};
var proto = {};
function setProtoSwizzle(property2, altA, altB) {
  proto[property2] = proto[altA] = proto[altB] = {
    get() {
      this._cache = this._cache || {};
      let split = this._cache[property2];
      if (split === void 0) {
        split = new SplitNode(this, property2);
        this._cache[property2] = split;
      }
      return split;
    },
    set(value) {
      this[property2].assign(nodeObject(value));
    }
  };
  const propUpper = property2.toUpperCase();
  const altAUpper = altA.toUpperCase();
  const altBUpper = altB.toUpperCase();
  Node.prototype["set" + propUpper] = Node.prototype["set" + altAUpper] = Node.prototype["set" + altBUpper] = function(value) {
    const swizzle = parseSwizzleAndSort(property2);
    return new SetNode(this, swizzle, nodeObject(value));
  };
  Node.prototype["flip" + propUpper] = Node.prototype["flip" + altAUpper] = Node.prototype["flip" + altBUpper] = function() {
    const swizzle = parseSwizzleAndSort(property2);
    return new FlipNode(this, swizzle);
  };
}
var swizzleA = ["x", "y", "z", "w"];
var swizzleB = ["r", "g", "b", "a"];
var swizzleC = ["s", "t", "p", "q"];
for (let a = 0; a < 4; a++) {
  let prop = swizzleA[a];
  let altA = swizzleB[a];
  let altB = swizzleC[a];
  setProtoSwizzle(prop, altA, altB);
  for (let b = 0; b < 4; b++) {
    prop = swizzleA[a] + swizzleA[b];
    altA = swizzleB[a] + swizzleB[b];
    altB = swizzleC[a] + swizzleC[b];
    setProtoSwizzle(prop, altA, altB);
    for (let c = 0; c < 4; c++) {
      prop = swizzleA[a] + swizzleA[b] + swizzleA[c];
      altA = swizzleB[a] + swizzleB[b] + swizzleB[c];
      altB = swizzleC[a] + swizzleC[b] + swizzleC[c];
      setProtoSwizzle(prop, altA, altB);
      for (let d = 0; d < 4; d++) {
        prop = swizzleA[a] + swizzleA[b] + swizzleA[c] + swizzleA[d];
        altA = swizzleB[a] + swizzleB[b] + swizzleB[c] + swizzleB[d];
        altB = swizzleC[a] + swizzleC[b] + swizzleC[c] + swizzleC[d];
        setProtoSwizzle(prop, altA, altB);
      }
    }
  }
}
for (let i = 0; i < 32; i++) {
  proto[i] = {
    get() {
      this._cache = this._cache || {};
      let element2 = this._cache[i];
      if (element2 === void 0) {
        element2 = new ArrayElementNode(this, new ConstNode(i, "uint"));
        this._cache[i] = element2;
      }
      return element2;
    },
    set(value) {
      this[i].assign(nodeObject(value));
    }
  };
}
Object.defineProperties(Node.prototype, proto);
var ShaderNodeObject = function(obj, altType = null) {
  const type = getValueType(obj);
  if (type === "node") {
    return obj;
  } else if (altType === null && (type === "float" || type === "boolean") || type && type !== "shader" && type !== "string") {
    return nodeObject(getConstNode(obj, altType));
  } else if (type === "shader") {
    return obj.isFn ? obj : Fn(obj);
  }
  return obj;
};
var ShaderNodeObjects = function(objects, altType = null) {
  for (const name in objects) {
    objects[name] = nodeObject(objects[name], altType);
  }
  return objects;
};
var ShaderNodeArray = function(array2, altType = null) {
  const len = array2.length;
  for (let i = 0; i < len; i++) {
    array2[i] = nodeObject(array2[i], altType);
  }
  return array2;
};
var ShaderNodeProxy = function(NodeClass, scope = null, factor = null, settings = null) {
  function assignNode(node) {
    if (settings !== null) {
      node = nodeObject(Object.assign(node, settings));
      if (settings.intent === true) {
        node = node.toVarIntent();
      }
    } else {
      node = nodeObject(node);
    }
    return node;
  }
  let fn, name = scope, minParams, maxParams;
  function verifyParamsLimit(params) {
    let tslName;
    if (name) tslName = /[a-z]/i.test(name) ? name + "()" : name;
    else tslName = NodeClass.type;
    if (minParams !== void 0 && params.length < minParams) {
      error(`TSL: "${tslName}" parameter length is less than minimum required.`, new StackTrace());
      return params.concat(new Array(minParams - params.length).fill(0));
    } else if (maxParams !== void 0 && params.length > maxParams) {
      error(`TSL: "${tslName}" parameter length exceeds limit.`, new StackTrace());
      return params.slice(0, maxParams);
    }
    return params;
  }
  if (scope === null) {
    fn = (...params) => {
      return assignNode(new NodeClass(...nodeArray(verifyParamsLimit(params))));
    };
  } else if (factor !== null) {
    factor = nodeObject(factor);
    fn = (...params) => {
      return assignNode(new NodeClass(scope, ...nodeArray(verifyParamsLimit(params)), factor));
    };
  } else {
    fn = (...params) => {
      return assignNode(new NodeClass(scope, ...nodeArray(verifyParamsLimit(params))));
    };
  }
  fn.setParameterLength = (...params) => {
    if (params.length === 1) minParams = maxParams = params[0];
    else if (params.length === 2) [minParams, maxParams] = params;
    return fn;
  };
  fn.setName = (value) => {
    name = value;
    return fn;
  };
  return fn;
};
var ShaderNodeImmutable = function(NodeClass, ...params) {
  return new NodeClass(...nodeArray(params));
};
var ShaderCallNodeInternal = class extends Node {
  constructor(shaderNode, rawInputs) {
    super();
    this.shaderNode = shaderNode;
    this.rawInputs = rawInputs;
    this.isShaderCallNodeInternal = true;
  }
  generateNodeType(builder) {
    return this.shaderNode.nodeType || this.getOutputNode(builder).getNodeType(builder);
  }
  getElementType(builder) {
    return this.getOutputNode(builder).getElementType(builder);
  }
  getMemberType(builder, name) {
    return this.getOutputNode(builder).getMemberType(builder, name);
  }
  call(builder) {
    const { shaderNode, rawInputs } = this;
    const properties = builder.getNodeProperties(shaderNode);
    const subBuild2 = builder.getClosestSubBuild(shaderNode.subBuilds) || "";
    const subBuildProperty = subBuild2 || "default";
    if (properties[subBuildProperty]) {
      return properties[subBuildProperty];
    }
    const previousSubBuildFn = builder.subBuildFn;
    const previousFnCall = builder.fnCall;
    builder.subBuildFn = subBuild2;
    builder.fnCall = this;
    let result = null;
    if (shaderNode.layout) {
      if (rawInputs) {
        const inputs2 = shaderNode.layout.inputs;
        if (isArrayAsParameter(rawInputs)) {
          const rawArrayParameters = rawInputs;
          for (let i = 0; i < inputs2.length; i++) {
            const rawParameter = rawArrayParameters[i];
            if (rawParameter && rawParameter.isNode) {
              rawParameter.build(builder);
            }
          }
        } else {
          const rawObjectParameters = rawInputs[0];
          for (const param of inputs2) {
            const rawParameter = rawObjectParameters[param.name];
            if (rawParameter && rawParameter.isNode) {
              rawParameter.build(builder);
            }
          }
        }
      }
      const functionNode = builder.buildFunctionNode(shaderNode);
      builder.addInclude(functionNode);
      const inputs = rawInputs ? getLayoutParameters(rawInputs) : null;
      result = functionNode.call(inputs);
    } else {
      const secureNodeBuilder = new Proxy(builder, {
        get: (target, property2, receiver) => {
          let value;
          if (Symbol.iterator === property2) {
            value = function* () {
              yield void 0;
            };
          } else {
            value = Reflect.get(target, property2, receiver);
          }
          return value;
        }
      });
      const inputs = rawInputs ? getProxyParameters(rawInputs) : null;
      const hasParameters = Array.isArray(rawInputs) ? rawInputs.length > 0 : rawInputs !== null;
      const jsFunc = shaderNode.jsFunc;
      const outputNode = hasParameters || jsFunc.length > 1 ? jsFunc(inputs, secureNodeBuilder) : jsFunc(secureNodeBuilder);
      result = nodeObject(outputNode);
    }
    builder.subBuildFn = previousSubBuildFn;
    builder.fnCall = previousFnCall;
    if (shaderNode.once) {
      properties[subBuildProperty] = result;
    }
    return result;
  }
  setupOutput(builder) {
    builder.addStack();
    builder.stack.outputNode = this.call(builder);
    return builder.removeStack();
  }
  getOutputNode(builder) {
    const properties = builder.getNodeProperties(this);
    const subBuildOutput = builder.getSubBuildOutput(this);
    properties[subBuildOutput] = properties[subBuildOutput] || this.setupOutput(builder);
    properties[subBuildOutput].subBuild = builder.getClosestSubBuild(this);
    return properties[subBuildOutput];
  }
  build(builder, output2 = null) {
    let result = null;
    const buildStage = builder.getBuildStage();
    const properties = builder.getNodeProperties(this);
    const subBuildOutput = builder.getSubBuildOutput(this);
    const outputNode = this.getOutputNode(builder);
    const previousFnCall = builder.fnCall;
    builder.fnCall = this;
    if (buildStage === "setup") {
      const subBuildInitialized = builder.getSubBuildProperty("initialized", this);
      if (properties[subBuildInitialized] !== true) {
        properties[subBuildInitialized] = true;
        properties[subBuildOutput] = this.getOutputNode(builder);
        properties[subBuildOutput].build(builder);
        if (this.shaderNode.subBuilds) {
          for (const node of builder.chaining) {
            const nodeData = builder.getDataFromNode(node, "any");
            nodeData.subBuilds = nodeData.subBuilds || /* @__PURE__ */ new Set();
            for (const subBuild2 of this.shaderNode.subBuilds) {
              nodeData.subBuilds.add(subBuild2);
            }
          }
        }
      }
      result = properties[subBuildOutput];
    } else if (buildStage === "analyze") {
      outputNode.build(builder, output2);
    } else if (buildStage === "generate") {
      result = outputNode.build(builder, output2) || "";
    }
    builder.fnCall = previousFnCall;
    return result;
  }
};
function isArrayAsParameter(params) {
  return params[0] && (params[0].isNode || Object.getPrototypeOf(params[0]) !== Object.prototype);
}
function getLayoutParameters(params) {
  let output2;
  nodeObjects(params);
  if (isArrayAsParameter(params)) {
    output2 = [...params];
  } else {
    output2 = params[0];
  }
  return output2;
}
function getProxyParameters(params) {
  let index = 0;
  nodeObjects(params);
  return new Proxy(params, {
    get: (target, property2, receiver) => {
      let value;
      if (property2 === "length") {
        value = params.length;
        return value;
      }
      if (Symbol.iterator === property2) {
        value = function* () {
          for (const inputNode of params) {
            yield nodeObject(inputNode);
          }
        };
      } else {
        if (params.length > 0) {
          if (Object.getPrototypeOf(params[0]) === Object.prototype) {
            const objectTarget = params[0];
            if (objectTarget[property2] === void 0) {
              value = objectTarget[index++];
            } else {
              value = Reflect.get(objectTarget, property2, receiver);
            }
          } else if (params[0] instanceof Node) {
            if (params[property2] === void 0) {
              value = params[index++];
            } else {
              value = Reflect.get(params, property2, receiver);
            }
          }
        } else {
          value = Reflect.get(target, property2, receiver);
        }
        value = nodeObject(value);
      }
      return value;
    }
  });
}
var ShaderNodeInternal = class extends Node {
  constructor(jsFunc, nodeType) {
    super(nodeType);
    this.jsFunc = jsFunc;
    this.layout = null;
    this.global = true;
    this.once = false;
  }
  setLayout(layout) {
    this.layout = layout;
    return this;
  }
  getLayout() {
    return this.layout;
  }
  call(rawInputs = null) {
    return new ShaderCallNodeInternal(this, rawInputs);
  }
  setup() {
    return this.call();
  }
};
var bools = [false, true];
var uints = [0, 1, 2, 3];
var ints = [-1, -2];
var floats = [0.5, 1.5, 1 / 3, 1e-6, 1e6, Math.PI, Math.PI * 2, 1 / Math.PI, 2 / Math.PI, 1 / (Math.PI * 2), Math.PI / 2];
var boolsCacheMap = /* @__PURE__ */ new Map();
for (const bool2 of bools) boolsCacheMap.set(bool2, new ConstNode(bool2));
var uintsCacheMap = /* @__PURE__ */ new Map();
for (const uint2 of uints) uintsCacheMap.set(uint2, new ConstNode(uint2, "uint"));
var intsCacheMap = new Map([...uintsCacheMap].map((el) => new ConstNode(el.value, "int")));
for (const int2 of ints) intsCacheMap.set(int2, new ConstNode(int2, "int"));
var floatsCacheMap = new Map([...intsCacheMap].map((el) => new ConstNode(el.value)));
for (const float2 of floats) floatsCacheMap.set(float2, new ConstNode(float2));
for (const float2 of floats) floatsCacheMap.set(-float2, new ConstNode(-float2));
var cacheMaps = { bool: boolsCacheMap, uint: uintsCacheMap, ints: intsCacheMap, float: floatsCacheMap };
var constNodesCacheMap = new Map([...boolsCacheMap, ...floatsCacheMap]);
var getConstNode = (value, type) => {
  if (constNodesCacheMap.has(value)) {
    return constNodesCacheMap.get(value);
  } else if (value.isNode === true) {
    return value;
  } else {
    return new ConstNode(value, type);
  }
};
var ConvertType = function(type, cacheMap = null) {
  return (...params) => {
    for (const param of params) {
      if (param === void 0) {
        error(`TSL: Invalid parameter for the type "${type}".`, new StackTrace());
        return new ConstNode(0, type);
      }
    }
    if (params.length === 0 || !["bool", "float", "int", "uint"].includes(type) && params.every((param) => {
      const paramType = typeof param;
      return paramType !== "object" && paramType !== "function";
    })) {
      params = [getValueFromType(type, ...params)];
    }
    if (params.length === 1 && cacheMap !== null && cacheMap.has(params[0])) {
      return nodeObjectIntent(cacheMap.get(params[0]));
    }
    if (params.length === 1) {
      const node = getConstNode(params[0], type);
      if (node.nodeType === type) return nodeObjectIntent(node);
      return nodeObjectIntent(new ConvertNode(node, type));
    }
    const nodes = params.map((param) => getConstNode(param));
    return nodeObjectIntent(new JoinNode(nodes, type));
  };
};
function defined(value) {
  if (value && value.isNode) {
    value.traverse((node) => {
      if (node.isConstNode) {
        value = node.value;
      }
    });
  }
  return Boolean(value);
}
var getConstNodeType = (value) => value !== void 0 && value !== null ? value.nodeType || value.convertTo || (typeof value === "string" ? value : null) : null;
function ShaderNode(jsFunc, nodeType) {
  return new ShaderNodeInternal(jsFunc, nodeType);
}
var nodeObject = (val, altType = null) => (
  /* new */
  ShaderNodeObject(val, altType)
);
var nodeObjectIntent = (val, altType = null) => (
  /* new */
  nodeObject(val, altType).toVarIntent()
);
var nodeObjects = (val, altType = null) => new ShaderNodeObjects(val, altType);
var nodeArray = (val, altType = null) => new ShaderNodeArray(val, altType);
var nodeProxy = (NodeClass, scope = null, factor = null, settings = null) => new ShaderNodeProxy(NodeClass, scope, factor, settings);
var nodeImmutable = (NodeClass, ...params) => new ShaderNodeImmutable(NodeClass, ...params);
var nodeProxyIntent = (NodeClass, scope = null, factor = null, settings = {}) => new ShaderNodeProxy(NodeClass, scope, factor, { ...settings, intent: true });
var fnId = 0;
var FnNode = class extends Node {
  constructor(jsFunc, layout = null) {
    super();
    let nodeType = null;
    if (layout !== null) {
      if (typeof layout === "object") {
        nodeType = layout.return;
      } else {
        if (typeof layout === "string") {
          nodeType = layout;
        } else {
          error("TSL: Invalid layout type.", new StackTrace());
        }
        layout = null;
      }
    }
    this.shaderNode = new ShaderNode(jsFunc, nodeType);
    if (layout !== null) {
      this.setLayout(layout);
    }
    this.isFn = true;
  }
  setLayout(layout) {
    const nodeType = this.shaderNode.nodeType;
    if (typeof layout.inputs !== "object") {
      const fullLayout = {
        name: "fn" + fnId++,
        type: nodeType,
        inputs: []
      };
      for (const name in layout) {
        if (name === "return") continue;
        fullLayout.inputs.push({
          name,
          type: layout[name]
        });
      }
      layout = fullLayout;
    }
    this.shaderNode.setLayout(layout);
    return this;
  }
  generateNodeType(builder) {
    return this.shaderNode.getNodeType(builder) || "float";
  }
  call(...params) {
    const fnCall = this.shaderNode.call(params);
    if (this.shaderNode.nodeType === "void") fnCall.toStack();
    return fnCall.toVarIntent();
  }
  once(subBuilds = null) {
    this.shaderNode.once = true;
    this.shaderNode.subBuilds = subBuilds;
    return this;
  }
  generate(builder) {
    const type = this.getNodeType(builder);
    error('TSL: "Fn()" was declared but not invoked. Try calling it like "Fn()( ...params )".', this.stackTrace);
    return builder.generateConst(type);
  }
};
function Fn(jsFunc, layout = null) {
  const instance = new FnNode(jsFunc, layout);
  return new Proxy(() => {
  }, {
    apply(target, thisArg, params) {
      return instance.call(...params);
    },
    get(target, prop, receiver) {
      return Reflect.get(instance, prop, receiver);
    },
    set(target, prop, value, receiver) {
      return Reflect.set(instance, prop, value, receiver);
    }
  });
}
var If = (...params) => currentStack.If(...params);
function Stack(node) {
  if (currentStack) currentStack.addToStack(node);
  return node;
}
addMethodChaining("toStack", Stack);
var color = new ConvertType("color");
var float = new ConvertType("float", cacheMaps.float);
var int = new ConvertType("int", cacheMaps.ints);
var uint = new ConvertType("uint", cacheMaps.uint);
var bool = new ConvertType("bool", cacheMaps.bool);
var vec2 = new ConvertType("vec2");
var ivec2 = new ConvertType("ivec2");
var uvec2 = new ConvertType("uvec2");
var bvec2 = new ConvertType("bvec2");
var vec3 = new ConvertType("vec3");
var ivec3 = new ConvertType("ivec3");
var uvec3 = new ConvertType("uvec3");
var bvec3 = new ConvertType("bvec3");
var vec4 = new ConvertType("vec4");
var ivec4 = new ConvertType("ivec4");
var uvec4 = new ConvertType("uvec4");
var bvec4 = new ConvertType("bvec4");
var mat2 = new ConvertType("mat2");
var mat3 = new ConvertType("mat3");
var mat4 = new ConvertType("mat4");
addMethodChaining("toColor", color);
addMethodChaining("toFloat", float);
addMethodChaining("toInt", int);
addMethodChaining("toUint", uint);
addMethodChaining("toBool", bool);
addMethodChaining("toVec2", vec2);
addMethodChaining("toIVec2", ivec2);
addMethodChaining("toUVec2", uvec2);
addMethodChaining("toBVec2", bvec2);
addMethodChaining("toVec3", vec3);
addMethodChaining("toIVec3", ivec3);
addMethodChaining("toUVec3", uvec3);
addMethodChaining("toBVec3", bvec3);
addMethodChaining("toVec4", vec4);
addMethodChaining("toIVec4", ivec4);
addMethodChaining("toUVec4", uvec4);
addMethodChaining("toBVec4", bvec4);
addMethodChaining("toMat2", mat2);
addMethodChaining("toMat3", mat3);
addMethodChaining("toMat4", mat4);
var element = /* @__PURE__ */ nodeProxy(ArrayElementNode).setParameterLength(2);
var convert = (node, types) => new ConvertNode(nodeObject(node), types);
addMethodChaining("element", element);
addMethodChaining("convert", convert);
addMethodChaining("append", (node) => {
  warn("TSL: .append() has been renamed to .toStack().", new StackTrace());
  return Stack(node);
});
var PropertyNode = class extends Node {
  static get type() {
    return "PropertyNode";
  }
  /**
   * Constructs a new property node.
   *
   * @param {string} nodeType - The type of the node.
   * @param {?string} [name=null] - The name of the property in the shader.
   * @param {boolean} [varying=false] - Whether this property is a varying or not.
   * @param {?Node} [placeholderNode=null] - The placeholder node if not assigned.
   */
  constructor(nodeType, name = null, varying2 = false, placeholderNode = null) {
    super(nodeType);
    this.name = name;
    this.varying = varying2;
    this.placeholderNode = nodeObject(placeholderNode);
    this.isPropertyNode = true;
    this.global = true;
  }
  getNodeType(builder) {
    const nodeType = super.getNodeType(builder);
    if (nodeType === "output") {
      return builder.getOutputType();
    }
    return nodeType;
  }
  customCacheKey() {
    return hashString(this.type + ":" + (this.name || "") + ":" + (this.varying ? "1" : "0"));
  }
  getHash(builder) {
    return this.name || super.getHash(builder);
  }
  generate(builder) {
    let nodeVar;
    if (this.varying === true) {
      nodeVar = builder.getVaryingFromNode(this, this.name);
      nodeVar.needsInterpolation = true;
    } else {
      nodeVar = builder.getVarFromNode(this, this.name);
      if (this.placeholderNode !== null) {
        if (builder.hasWriteUsage(this) === false) {
          const snippet = this.placeholderNode.build(builder, this.getNodeType(builder));
          builder.addLineFlowCode(`${builder.getPropertyName(nodeVar)} = ${snippet}`, this);
        }
      }
    }
    return builder.getPropertyName(nodeVar);
  }
};
var property = (type, name, placeholderNode = null) => new PropertyNode(type, name, false, placeholderNode);
var varyingProperty = (type, name, placeholderNode = null) => new PropertyNode(type, name, true, placeholderNode);
var diffuseColor = /* @__PURE__ */ nodeImmutable(PropertyNode, "vec4", "DiffuseColor");
var output = /* @__PURE__ */ nodeImmutable(PropertyNode, "output", "Output");
var dashSize = /* @__PURE__ */ nodeImmutable(PropertyNode, "float", "dashSize");
var gapSize = /* @__PURE__ */ nodeImmutable(PropertyNode, "float", "gapSize");
var UniformGroupNode = class extends Node {
  static get type() {
    return "UniformGroupNode";
  }
  /**
   * Constructs a new uniform group node.
   *
   * @param {string} name - The name of the uniform group node.
   * @param {boolean} [shared=false] - Whether this uniform group node is shared or not.
   * @param {number} [order=1] - Influences the internal sorting.
   * @param {string|null} [updateType=null] - The update type of the uniform group node.
   */
  constructor(name, shared = false, order = 1, updateType = null) {
    super("string");
    this.name = name;
    this.shared = shared;
    this.order = order;
    this.updateType = updateType;
    this.isUniformGroup = true;
  }
  /**
   * Marks the uniform group node as needing an update.
   * This will trigger the necessary updates in the rendering process.
   */
  update() {
    this.needsUpdate = true;
  }
  /**
   * Serializes the uniform group node to a JSON object.
   *
   * @param {Object} data - The object to store the serialized data.
   */
  serialize(data) {
    super.serialize(data);
    data.name = this.name;
    data.version = this.version;
    data.shared = this.shared;
  }
  /**
   * Deserializes the uniform group node from a JSON object.
   *
   * @param {Object} data - The object containing the serialized data.
   */
  deserialize(data) {
    super.deserialize(data);
    this.name = data.name;
    this.version = data.version;
    this.shared = data.shared;
  }
};
var uniformGroup = (name, order = 1, updateType = null) => new UniformGroupNode(name, false, order, updateType);
var sharedUniformGroup = (name, order = 0, updateType = null) => new UniformGroupNode(name, true, order, updateType);
var frameGroup = /* @__PURE__ */ sharedUniformGroup("frame", 0, NodeUpdateType.FRAME);
var renderGroup = /* @__PURE__ */ sharedUniformGroup("render", 0, NodeUpdateType.RENDER);
var objectGroup = /* @__PURE__ */ uniformGroup("object", 1, NodeUpdateType.OBJECT);
var UniformNode = class extends InputNode {
  static get type() {
    return "UniformNode";
  }
  /**
   * Constructs a new uniform node.
   *
   * @param {any} value - The value of this node. Usually a JS primitive or three.js object (vector, matrix, color, texture).
   * @param {?string} nodeType - The node type. If no explicit type is defined, the node tries to derive the type from its value.
   */
  constructor(value, nodeType = null) {
    super(value, nodeType);
    this.isUniformNode = true;
    this.name = "";
    this.groupNode = objectGroup;
  }
  /**
   * Sets the {@link UniformNode#name} property.
   *
   * @param {string} name - The name of the uniform.
   * @return {UniformNode} A reference to this node.
   */
  setName(name) {
    this.name = name;
    return this;
  }
  /**
   * Sets the {@link UniformNode#name} property.
   *
   * @deprecated
   * @param {string} name - The name of the uniform.
   * @return {UniformNode} A reference to this node.
   */
  label(name) {
    warn('TSL: "label()" has been deprecated. Use "setName()" instead.', new StackTrace());
    return this.setName(name);
  }
  /**
   * Sets the {@link UniformNode#groupNode} property.
   *
   * @param {UniformGroupNode} group - The uniform group.
   * @return {UniformNode} A reference to this node.
   */
  setGroup(group) {
    this.groupNode = group;
    return this;
  }
  /**
   * Returns the {@link UniformNode#groupNode}.
   *
   * @return {UniformGroupNode} The uniform group.
   */
  getGroup() {
    return this.groupNode;
  }
  /**
   * By default, this method returns the result of {@link Node#getHash} but derived
   * classes might overwrite this method with a different implementation.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {string} The uniform hash.
   */
  getUniformHash(builder) {
    return this.getHash(builder);
  }
  onUpdate(callback, updateType) {
    callback = callback.bind(this);
    return super.onUpdate((frame) => {
      const value = callback(frame, this);
      if (value !== void 0) {
        this.value = value;
      }
    }, updateType);
  }
  getInputType(builder) {
    let type = super.getInputType(builder);
    if (type === "bool") {
      type = "uint";
    }
    return type;
  }
  generate(builder, output2) {
    const type = this.getNodeType(builder);
    const hash = this.getUniformHash(builder);
    let sharedNode = builder.getNodeFromHash(hash);
    if (sharedNode === void 0) {
      builder.setHashNode(this, hash);
      sharedNode = this;
    }
    const sharedNodeType = sharedNode.getInputType(builder);
    const nodeUniform = builder.getUniformFromNode(sharedNode, sharedNodeType, builder.shaderStage, this.name || builder.context.nodeName);
    const uniformName = builder.getPropertyName(nodeUniform);
    if (builder.context.nodeName !== void 0) delete builder.context.nodeName;
    let snippet = uniformName;
    if (type === "bool") {
      const nodeData = builder.getDataFromNode(this);
      let propertyName = nodeData.propertyName;
      if (propertyName === void 0) {
        const nodeVar = builder.getVarFromNode(this, null, "bool");
        propertyName = builder.getPropertyName(nodeVar);
        nodeData.propertyName = propertyName;
        snippet = builder.format(uniformName, sharedNodeType, type);
        builder.addLineFlowCode(`${propertyName} = ${snippet}`, this);
      }
      snippet = propertyName;
    }
    return builder.format(snippet, type, output2);
  }
};
var uniform = (value, type) => {
  const nodeType = getConstNodeType(type || value);
  if (nodeType === value) {
    value = getValueFromType(nodeType);
  }
  if (value && value.isNode === true) {
    let v = value.value;
    value.traverse((n) => {
      if (n.isConstNode === true) {
        v = n.value;
      }
    });
    value = v;
  }
  return new UniformNode(value, nodeType);
};
var ArrayNode = class extends TempNode {
  static get type() {
    return "ArrayNode";
  }
  /**
   * Constructs a new array node.
   *
   * @param {?string} nodeType - The data type of the elements.
   * @param {number} count - Size of the array.
   * @param {?Array<Node>} [values=null] - Array default values.
   */
  constructor(nodeType, count, values = null) {
    super(nodeType);
    this.count = count;
    this.values = values;
    this.isArrayNode = true;
  }
  /**
   * Returns the number of elements in the node array.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {number} The number of elements in the node array.
   */
  getArrayCount() {
    return this.count;
  }
  /**
   * Returns the node's type.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {string} The type of the node.
   */
  generateNodeType(builder) {
    if (this.nodeType === null) {
      return this.values[0].getNodeType(builder);
    }
    return this.nodeType;
  }
  /**
   * Returns the node's type.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {string} The type of the node.
   */
  getElementType(builder) {
    return this.getNodeType(builder);
  }
  /**
   * Returns the type of a member variable.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @param {string} name - The name of the member variable.
   * @return {string} The type of the member variable.
   */
  getMemberType(builder, name) {
    if (this.nodeType === null) {
      return this.values[0].getMemberType(builder, name);
    }
    return super.getMemberType(builder, name);
  }
  /**
   * This method builds the output node and returns the resulting array as a shader string.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {string} The generated shader string.
   */
  generate(builder) {
    const type = this.getNodeType(builder);
    return builder.generateArray(type, this.count, this.values);
  }
};
var array = (...params) => {
  let node;
  if (params.length === 1) {
    const values = params[0];
    node = new ArrayNode(null, values.length, values);
  } else {
    const nodeType = params[0];
    const count = params[1];
    node = new ArrayNode(nodeType, count);
  }
  return nodeObject(node);
};
addMethodChaining("toArray", (node, count) => array(Array(count).fill(node)));
var AssignNode = class extends TempNode {
  static get type() {
    return "AssignNode";
  }
  /**
   * Constructs a new assign node.
   *
   * @param {Node} targetNode - The target node.
   * @param {Node} sourceNode - The source type.
   */
  constructor(targetNode, sourceNode) {
    super();
    this.targetNode = targetNode;
    this.sourceNode = sourceNode;
    this.isAssignNode = true;
  }
  /**
   * Whether this node is used more than once in context of other nodes. This method
   * is overwritten since it always returns `false` (assigns are unique).
   *
   * @return {boolean} A flag that indicates if there is more than one dependency to other nodes. Always `false`.
   */
  hasDependencies() {
    return false;
  }
  generateNodeType(builder, output2) {
    return output2 !== "void" ? this.targetNode.getNodeType(builder) : "void";
  }
  /**
   * Whether a split is required when assigning source to target. This can happen when the component length of
   * target and source data type does not match.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {boolean} Whether a split is required when assigning source to target.
   */
  needsSplitAssign(builder) {
    const { targetNode } = this;
    if (builder.isAvailable("swizzleAssign") === false && targetNode.isSplitNode && targetNode.components.length > 1) {
      const targetLength = builder.getTypeLength(targetNode.node.getNodeType(builder));
      const assignDifferentVector = vectorComponents.join("").slice(0, targetLength) !== targetNode.components;
      return assignDifferentVector;
    }
    return false;
  }
  setup(builder) {
    const { targetNode, sourceNode } = this;
    const scope = targetNode.getScope();
    const scopeData = builder.getDataFromNode(scope);
    scopeData.assign = true;
    const properties = builder.getNodeProperties(this);
    properties.sourceNode = sourceNode;
    properties.targetNode = targetNode.context({ assign: true });
  }
  generate(builder, output2) {
    const { targetNode, sourceNode } = builder.getNodeProperties(this);
    const needsSplitAssign = this.needsSplitAssign(builder);
    const target = targetNode.build(builder);
    const targetType = targetNode.getNodeType(builder);
    const source = sourceNode.build(builder, targetType);
    const sourceType = sourceNode.getNodeType(builder);
    const nodeData = builder.getDataFromNode(this);
    let snippet;
    if (nodeData.initialized === true) {
      if (output2 !== "void") {
        snippet = target;
      }
    } else if (needsSplitAssign) {
      const sourceVar = builder.getVarFromNode(this, null, targetType);
      const sourceProperty = builder.getPropertyName(sourceVar);
      builder.addLineFlowCode(`${sourceProperty} = ${source}`, this);
      const splitNode = targetNode.node;
      const splitTargetNode = splitNode.node.context({ assign: true });
      const targetRoot = splitTargetNode.build(builder);
      for (let i = 0; i < splitNode.components.length; i++) {
        const component = splitNode.components[i];
        builder.addLineFlowCode(`${targetRoot}.${component} = ${sourceProperty}[ ${i} ]`, this);
      }
      if (output2 !== "void") {
        snippet = target;
      }
    } else {
      snippet = `${target} = ${source}`;
      if (output2 === "void" || sourceType === "void") {
        builder.addLineFlowCode(snippet, this);
        if (output2 !== "void") {
          snippet = target;
        }
      }
    }
    nodeData.initialized = true;
    return builder.format(snippet, targetType, output2);
  }
};
var assign = /* @__PURE__ */ nodeProxy(AssignNode).setParameterLength(2);
addMethodChaining("assign", assign);
var FunctionCallNode = class extends TempNode {
  static get type() {
    return "FunctionCallNode";
  }
  /**
   * Constructs a new function call node.
   *
   * @param {?FunctionNode} functionNode - The function node.
   * @param {Object<string, Node>} [parameters={}] - The parameters for the function call.
   */
  constructor(functionNode = null, parameters = {}) {
    super();
    this.functionNode = functionNode;
    this.parameters = parameters;
  }
  /**
   * Sets the parameters of the function call node.
   *
   * @param {Object<string, Node>} parameters - The parameters to set.
   * @return {FunctionCallNode} A reference to this node.
   */
  setParameters(parameters) {
    this.parameters = parameters;
    return this;
  }
  /**
   * Returns the parameters of the function call node.
   *
   * @return {Object<string, Node>} The parameters of this node.
   */
  getParameters() {
    return this.parameters;
  }
  /**
   * Returns the type of this function call node.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @returns {string} The type of this node.
   */
  generateNodeType(builder) {
    return this.functionNode.getNodeType(builder);
  }
  /**
   * Returns the function node of this function call node.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @param {string} [name] - The name of the member.
   * @returns {string} The type of the member.
   */
  getMemberType(builder, name) {
    return this.functionNode.getMemberType(builder, name);
  }
  generate(builder) {
    const params = [];
    const functionNode = this.functionNode;
    const inputs = functionNode.getInputs(builder);
    const parameters = this.parameters;
    const generateInput = (node, inputNode) => {
      const type = inputNode.type;
      const pointer = type === "pointer";
      let output2;
      if (pointer) output2 = "&" + node.build(builder);
      else output2 = node.build(builder, type);
      return output2;
    };
    if (Array.isArray(parameters)) {
      if (parameters.length > inputs.length) {
        error("TSL: The number of provided parameters exceeds the expected number of inputs in 'Fn()'.");
        parameters.length = inputs.length;
      } else if (parameters.length < inputs.length) {
        error("TSL: The number of provided parameters is less than the expected number of inputs in 'Fn()'.");
        while (parameters.length < inputs.length) {
          parameters.push(float(0));
        }
      }
      for (let i = 0; i < parameters.length; i++) {
        params.push(generateInput(parameters[i], inputs[i]));
      }
    } else {
      for (const inputNode of inputs) {
        const node = parameters[inputNode.name];
        if (node !== void 0) {
          params.push(generateInput(node, inputNode));
        } else {
          error(`TSL: Input '${inputNode.name}' not found in 'Fn()'.`);
          params.push(generateInput(float(0), inputNode));
        }
      }
    }
    const functionName = functionNode.build(builder, "property");
    return `${functionName}( ${params.join(", ")} )`;
  }
};
var call = (func, ...params) => {
  params = params.length > 1 || params[0] && params[0].isNode === true ? nodeArray(params) : nodeObjects(params[0]);
  return new FunctionCallNode(nodeObject(func), params);
};
addMethodChaining("call", call);
var _vectorOperators = {
  "==": "equal",
  "!=": "notEqual",
  "<": "lessThan",
  ">": "greaterThan",
  "<=": "lessThanEqual",
  ">=": "greaterThanEqual",
  "%": "mod"
};
var OperatorNode = class _OperatorNode extends TempNode {
  static get type() {
    return "OperatorNode";
  }
  /**
   * Constructs a new operator node.
   *
   * @param {string} op - The operator.
   * @param {Node} aNode - The first input.
   * @param {Node} bNode - The second input.
   * @param {...Node} params - Additional input parameters.
   */
  constructor(op, aNode, bNode, ...params) {
    super();
    if (params.length > 0) {
      let finalOp = new _OperatorNode(op, aNode, bNode);
      for (let i = 0; i < params.length - 1; i++) {
        finalOp = new _OperatorNode(op, finalOp, params[i]);
      }
      aNode = finalOp;
      bNode = params[params.length - 1];
    }
    this.op = op;
    this.aNode = aNode;
    this.bNode = bNode;
    this.isOperatorNode = true;
  }
  /**
   * Returns the operator method name.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @param {string} output - The output type.
   * @returns {string} The operator method name.
   */
  getOperatorMethod(builder, output2) {
    return builder.getMethod(_vectorOperators[this.op], output2);
  }
  /**
   * This method is overwritten since the node type is inferred from the operator
   * and the input node types.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @param {?string} [output=null] - The output type.
   * @return {string} The node type.
   */
  generateNodeType(builder, output2 = null) {
    const op = this.op;
    const aNode = this.aNode;
    const bNode = this.bNode;
    const typeA = aNode.getNodeType(builder);
    const typeB = bNode ? bNode.getNodeType(builder) : null;
    if (typeA === "void" || typeB === "void") {
      return output2 || "void";
    } else if (op === "%") {
      return typeA;
    } else if (op === "~" || op === "&" || op === "|" || op === "^" || op === ">>" || op === "<<") {
      return builder.getIntegerType(typeA);
    } else if (op === "&&" || op === "||" || op === "^^") {
      return "bool";
    } else if (op === "!") {
      const typeLength = builder.getTypeLength(typeA);
      return typeLength > 1 ? `bvec${typeLength}` : "bool";
    } else if (op === "==" || op === "!=" || op === "<" || op === ">" || op === "<=" || op === ">=") {
      const typeLength = Math.max(builder.getTypeLength(typeA), builder.getTypeLength(typeB));
      return typeLength > 1 ? `bvec${typeLength}` : "bool";
    } else {
      if (builder.isMatrix(typeA)) {
        if (typeB === "float") {
          return typeA;
        } else if (builder.isVector(typeB)) {
          return builder.getVectorFromMatrix(typeA);
        } else if (builder.isMatrix(typeB)) {
          return typeA;
        }
      } else if (builder.isMatrix(typeB)) {
        if (typeA === "float") {
          return typeB;
        } else if (builder.isVector(typeA)) {
          return builder.getVectorFromMatrix(typeB);
        }
      }
      if (builder.getTypeLength(typeB) > builder.getTypeLength(typeA)) {
        return typeB;
      }
      return typeA;
    }
  }
  generate(builder, output2) {
    const op = this.op;
    const { aNode, bNode } = this;
    const type = this.getNodeType(builder, output2);
    let typeA = null;
    let typeB = null;
    if (type !== "void") {
      typeA = aNode.getNodeType(builder);
      typeB = bNode ? bNode.getNodeType(builder) : null;
      if (op === "<" || op === ">" || op === "<=" || op === ">=" || op === "==" || op === "!=") {
        if (builder.isVector(typeA)) {
          typeB = typeA;
        } else if (builder.isVector(typeB)) {
          typeA = typeB;
        } else if (typeA !== typeB) {
          typeA = typeB = "float";
        }
      } else if (op === ">>" || op === "<<") {
        typeA = type;
        typeB = builder.changeComponentType(typeB, "uint");
      } else if (op === "%") {
        typeA = type;
        typeB = builder.isInteger(typeA) && builder.isInteger(typeB) ? typeB : typeA;
      } else if (builder.isMatrix(typeA)) {
        if (typeB === "float") {
          typeB = "float";
        } else if (builder.isVector(typeB)) {
          typeB = builder.getVectorFromMatrix(typeA);
        } else if (builder.isMatrix(typeB)) ;
        else {
          typeA = typeB = type;
        }
      } else if (builder.isMatrix(typeB)) {
        if (typeA === "float") {
          typeA = "float";
        } else if (builder.isVector(typeA)) {
          typeA = builder.getVectorFromMatrix(typeB);
        } else {
          typeA = typeB = type;
        }
      } else {
        typeA = typeB = type;
      }
    } else {
      typeA = typeB = type;
    }
    const a = aNode.build(builder, typeA);
    const b = bNode ? bNode.build(builder, typeB) : null;
    const fnOpSnippet = builder.getFunctionOperator(op);
    if (output2 !== "void") {
      const isGLSL = builder.renderer.coordinateSystem === WebGLCoordinateSystem;
      if (op === "==" || op === "!=" || op === "<" || op === ">" || op === "<=" || op === ">=") {
        if (isGLSL) {
          if (builder.isVector(typeA)) {
            return builder.format(`${this.getOperatorMethod(builder, output2)}( ${a}, ${b} )`, type, output2);
          } else {
            return builder.format(`( ${a} ${op} ${b} )`, type, output2);
          }
        } else {
          return builder.format(`( ${a} ${op} ${b} )`, type, output2);
        }
      } else if (op === "%") {
        if (builder.isInteger(typeB)) {
          return builder.format(`( ${a} % ${b} )`, type, output2);
        } else {
          return builder.format(`${this.getOperatorMethod(builder, type)}( ${a}, ${b} )`, type, output2);
        }
      } else if (op === "!") {
        if (isGLSL && builder.isVector(typeA)) {
          return builder.format(`not( ${a} )`, output2);
        } else {
          return builder.format(`( ${op} ${a} )`, typeA, output2);
        }
      } else if (op === "~") {
        return builder.format(`( ${op} ${a} )`, typeA, output2);
      } else if (fnOpSnippet) {
        return builder.format(`${fnOpSnippet}( ${a}, ${b} )`, type, output2);
      } else {
        if (builder.isMatrix(typeA) && typeB === "float") {
          return builder.format(`( ${b} ${op} ${a} )`, type, output2);
        } else if (typeA === "float" && builder.isMatrix(typeB)) {
          return builder.format(`${a} ${op} ${b}`, type, output2);
        } else {
          let snippet = `( ${a} ${op} ${b} )`;
          if (!isGLSL && type === "bool" && builder.isVector(typeA) && builder.isVector(typeB)) {
            snippet = `all${snippet}`;
          }
          return builder.format(snippet, type, output2);
        }
      }
    } else if (typeA !== "void") {
      if (fnOpSnippet) {
        return builder.format(`${fnOpSnippet}( ${a}, ${b} )`, type, output2);
      } else {
        if (builder.isMatrix(typeA) && typeB === "float") {
          return builder.format(`${b} ${op} ${a}`, type, output2);
        } else {
          return builder.format(`${a} ${op} ${b}`, type, output2);
        }
      }
    }
  }
  serialize(data) {
    super.serialize(data);
    data.op = this.op;
  }
  deserialize(data) {
    super.deserialize(data);
    this.op = data.op;
  }
};
var add = /* @__PURE__ */ nodeProxyIntent(OperatorNode, "+").setParameterLength(2, Infinity).setName("add");
var sub = /* @__PURE__ */ nodeProxyIntent(OperatorNode, "-").setParameterLength(2, Infinity).setName("sub");
var mul = /* @__PURE__ */ nodeProxyIntent(OperatorNode, "*").setParameterLength(2, Infinity).setName("mul");
var div = /* @__PURE__ */ nodeProxyIntent(OperatorNode, "/").setParameterLength(2, Infinity).setName("div");
var mod = /* @__PURE__ */ nodeProxyIntent(OperatorNode, "%").setParameterLength(2).setName("mod");
var equal = /* @__PURE__ */ nodeProxyIntent(OperatorNode, "==").setParameterLength(2).setName("equal");
var notEqual = /* @__PURE__ */ nodeProxyIntent(OperatorNode, "!=").setParameterLength(2).setName("notEqual");
var lessThan = /* @__PURE__ */ nodeProxyIntent(OperatorNode, "<").setParameterLength(2).setName("lessThan");
var greaterThan = /* @__PURE__ */ nodeProxyIntent(OperatorNode, ">").setParameterLength(2).setName("greaterThan");
var lessThanEqual = /* @__PURE__ */ nodeProxyIntent(OperatorNode, "<=").setParameterLength(2).setName("lessThanEqual");
var greaterThanEqual = /* @__PURE__ */ nodeProxyIntent(OperatorNode, ">=").setParameterLength(2).setName("greaterThanEqual");
var and = /* @__PURE__ */ nodeProxyIntent(OperatorNode, "&&").setParameterLength(2, Infinity).setName("and");
var or = /* @__PURE__ */ nodeProxyIntent(OperatorNode, "||").setParameterLength(2, Infinity).setName("or");
var not = /* @__PURE__ */ nodeProxyIntent(OperatorNode, "!").setParameterLength(1).setName("not");
var xor = /* @__PURE__ */ nodeProxyIntent(OperatorNode, "^^").setParameterLength(2).setName("xor");
var bitAnd = /* @__PURE__ */ nodeProxyIntent(OperatorNode, "&").setParameterLength(2).setName("bitAnd");
var bitNot = /* @__PURE__ */ nodeProxyIntent(OperatorNode, "~").setParameterLength(1).setName("bitNot");
var bitOr = /* @__PURE__ */ nodeProxyIntent(OperatorNode, "|").setParameterLength(2).setName("bitOr");
var bitXor = /* @__PURE__ */ nodeProxyIntent(OperatorNode, "^").setParameterLength(2).setName("bitXor");
var shiftLeft = /* @__PURE__ */ nodeProxyIntent(OperatorNode, "<<").setParameterLength(2).setName("shiftLeft");
var shiftRight = /* @__PURE__ */ nodeProxyIntent(OperatorNode, ">>").setParameterLength(2).setName("shiftRight");
var incrementBefore = Fn(([a]) => {
  a.addAssign(1);
  return a;
});
var decrementBefore = Fn(([a]) => {
  a.subAssign(1);
  return a;
});
var increment = /* @__PURE__ */ Fn(([a]) => {
  const temp = int(a).toConst();
  a.addAssign(1);
  return temp;
});
var decrement = /* @__PURE__ */ Fn(([a]) => {
  const temp = int(a).toConst();
  a.subAssign(1);
  return temp;
});
addMethodChaining("add", add);
addMethodChaining("sub", sub);
addMethodChaining("mul", mul);
addMethodChaining("div", div);
addMethodChaining("mod", mod);
addMethodChaining("equal", equal);
addMethodChaining("notEqual", notEqual);
addMethodChaining("lessThan", lessThan);
addMethodChaining("greaterThan", greaterThan);
addMethodChaining("lessThanEqual", lessThanEqual);
addMethodChaining("greaterThanEqual", greaterThanEqual);
addMethodChaining("and", and);
addMethodChaining("or", or);
addMethodChaining("not", not);
addMethodChaining("xor", xor);
addMethodChaining("bitAnd", bitAnd);
addMethodChaining("bitNot", bitNot);
addMethodChaining("bitOr", bitOr);
addMethodChaining("bitXor", bitXor);
addMethodChaining("shiftLeft", shiftLeft);
addMethodChaining("shiftRight", shiftRight);
addMethodChaining("incrementBefore", incrementBefore);
addMethodChaining("decrementBefore", decrementBefore);
addMethodChaining("increment", increment);
addMethodChaining("decrement", decrement);
var MathNode = class _MathNode extends TempNode {
  static get type() {
    return "MathNode";
  }
  /**
   * Constructs a new math node.
   *
   * @param {string} method - The method name.
   * @param {Node} aNode - The first input.
   * @param {?Node} [bNode=null] - The second input.
   * @param {?Node} [cNode=null] - The third input.
   */
  constructor(method, aNode, bNode = null, cNode = null) {
    super();
    if ((method === _MathNode.MAX || method === _MathNode.MIN) && arguments.length > 3) {
      let finalOp = new _MathNode(method, aNode, bNode);
      for (let i = 3; i < arguments.length - 1; i++) {
        finalOp = new _MathNode(method, finalOp, arguments[i]);
      }
      aNode = finalOp;
      bNode = arguments[arguments.length - 1];
      cNode = null;
    }
    this.method = method;
    this.aNode = aNode;
    this.bNode = bNode;
    this.cNode = cNode;
    this.isMathNode = true;
  }
  /**
   * The input type is inferred from the node types of the input nodes.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {string} The input type.
   */
  getInputType(builder) {
    const aType = this.aNode.getNodeType(builder);
    const bType = this.bNode ? this.bNode.getNodeType(builder) : null;
    const cType = this.cNode ? this.cNode.getNodeType(builder) : null;
    const aLen = builder.isMatrix(aType) ? 0 : builder.getTypeLength(aType);
    const bLen = builder.isMatrix(bType) ? 0 : builder.getTypeLength(bType);
    const cLen = builder.isMatrix(cType) ? 0 : builder.getTypeLength(cType);
    if (aLen > bLen && aLen > cLen) {
      return aType;
    } else if (bLen > cLen) {
      return bType;
    } else if (cLen > aLen) {
      return cType;
    }
    return aType;
  }
  /**
   * The selected method as well as the input type determine the node type of this node.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {string} The node type.
   */
  generateNodeType(builder) {
    const method = this.method;
    if (method === _MathNode.LENGTH || method === _MathNode.DISTANCE || method === _MathNode.DOT) {
      return "float";
    } else if (method === _MathNode.CROSS) {
      return "vec3";
    } else if (method === _MathNode.ALL || method === _MathNode.ANY) {
      return "bool";
    } else if (method === _MathNode.EQUALS) {
      return builder.changeComponentType(this.aNode.getNodeType(builder), "bool");
    } else {
      return this.getInputType(builder);
    }
  }
  setup(builder) {
    const { aNode, bNode, method } = this;
    let outputNode = null;
    if (method === _MathNode.ONE_MINUS) {
      outputNode = sub(1, aNode);
    } else if (method === _MathNode.RECIPROCAL) {
      outputNode = div(1, aNode);
    } else if (method === _MathNode.DIFFERENCE) {
      outputNode = abs(sub(aNode, bNode));
    } else if (method === _MathNode.TRANSFORM_DIRECTION) {
      let matrixNode, directionNode;
      if (builder.isMatrix(aNode.getNodeType(builder))) {
        matrixNode = aNode;
        directionNode = bNode;
      } else {
        matrixNode = bNode;
        directionNode = aNode;
      }
      outputNode = normalize2(mul(matrixNode, vec4(vec3(directionNode), 0)).xyz);
    }
    if (outputNode !== null) {
      return outputNode;
    } else {
      return super.setup(builder);
    }
  }
  generate(builder, output2) {
    const properties = builder.getNodeProperties(this);
    if (properties.outputNode) {
      return super.generate(builder, output2);
    }
    let method = this.method;
    const type = this.getNodeType(builder);
    const inputType = this.getInputType(builder);
    const a = this.aNode;
    const b = this.bNode;
    const c = this.cNode;
    const coordinateSystem = builder.renderer.coordinateSystem;
    if (method === _MathNode.NEGATE) {
      return builder.format("( - " + a.build(builder, inputType) + " )", type, output2);
    } else {
      const params = [];
      if (method === _MathNode.CROSS) {
        params.push(
          a.build(builder, type),
          b.build(builder, type)
        );
      } else if (coordinateSystem === WebGLCoordinateSystem && method === _MathNode.STEP) {
        params.push(
          a.build(builder, builder.getTypeLength(a.getNodeType(builder)) === 1 ? "float" : inputType),
          b.build(builder, inputType)
        );
      } else if (coordinateSystem === WebGLCoordinateSystem && (method === _MathNode.MIN || method === _MathNode.MAX)) {
        params.push(
          a.build(builder, inputType),
          b.build(builder, builder.getTypeLength(b.getNodeType(builder)) === 1 ? "float" : inputType)
        );
      } else if (method === _MathNode.REFRACT) {
        params.push(
          a.build(builder, inputType),
          b.build(builder, inputType),
          c.build(builder, "float")
        );
      } else if (method === _MathNode.MIX) {
        params.push(
          a.build(builder, inputType),
          b.build(builder, inputType),
          c.build(builder, builder.getTypeLength(c.getNodeType(builder)) === 1 ? "float" : inputType)
        );
      } else {
        if (coordinateSystem === WebGPUCoordinateSystem && method === _MathNode.ATAN && b !== null) {
          method = "atan2";
        }
        if (builder.shaderStage !== "fragment" && (method === _MathNode.DFDX || method === _MathNode.DFDY)) {
          warn(`TSL: '${method}' is not supported in the ${builder.shaderStage} stage.`, this.stackTrace);
          method = "/*" + method + "*/";
        }
        params.push(a.build(builder, inputType));
        if (b !== null) params.push(b.build(builder, inputType));
        if (c !== null) params.push(c.build(builder, inputType));
      }
      return builder.format(`${builder.getMethod(method, type)}( ${params.join(", ")} )`, type, output2);
    }
  }
  serialize(data) {
    super.serialize(data);
    data.method = this.method;
  }
  deserialize(data) {
    super.deserialize(data);
    this.method = data.method;
  }
};
MathNode.ALL = "all";
MathNode.ANY = "any";
MathNode.RADIANS = "radians";
MathNode.DEGREES = "degrees";
MathNode.EXP = "exp";
MathNode.EXP2 = "exp2";
MathNode.LOG = "log";
MathNode.LOG2 = "log2";
MathNode.SQRT = "sqrt";
MathNode.INVERSE_SQRT = "inversesqrt";
MathNode.FLOOR = "floor";
MathNode.CEIL = "ceil";
MathNode.NORMALIZE = "normalize";
MathNode.FRACT = "fract";
MathNode.SIN = "sin";
MathNode.SINH = "sinh";
MathNode.COS = "cos";
MathNode.COSH = "cosh";
MathNode.TAN = "tan";
MathNode.TANH = "tanh";
MathNode.ASIN = "asin";
MathNode.ASINH = "asinh";
MathNode.ACOS = "acos";
MathNode.ACOSH = "acosh";
MathNode.ATAN = "atan";
MathNode.ATANH = "atanh";
MathNode.ABS = "abs";
MathNode.SIGN = "sign";
MathNode.LENGTH = "length";
MathNode.NEGATE = "negate";
MathNode.ONE_MINUS = "oneMinus";
MathNode.DFDX = "dFdx";
MathNode.DFDY = "dFdy";
MathNode.ROUND = "round";
MathNode.RECIPROCAL = "reciprocal";
MathNode.TRUNC = "trunc";
MathNode.FWIDTH = "fwidth";
MathNode.TRANSPOSE = "transpose";
MathNode.DETERMINANT = "determinant";
MathNode.INVERSE = "inverse";
MathNode.EQUALS = "equals";
MathNode.MIN = "min";
MathNode.MAX = "max";
MathNode.STEP = "step";
MathNode.REFLECT = "reflect";
MathNode.DISTANCE = "distance";
MathNode.DIFFERENCE = "difference";
MathNode.DOT = "dot";
MathNode.CROSS = "cross";
MathNode.POW = "pow";
MathNode.TRANSFORM_DIRECTION = "transformDirection";
MathNode.MIX = "mix";
MathNode.CLAMP = "clamp";
MathNode.REFRACT = "refract";
MathNode.SMOOTHSTEP = "smoothstep";
MathNode.FACEFORWARD = "faceforward";
var PI = /* @__PURE__ */ float(Math.PI);
var PI2 = /* @__PURE__ */ float(Math.PI * 2);
var TWO_PI = /* @__PURE__ */ float(Math.PI * 2);
var HALF_PI = /* @__PURE__ */ float(Math.PI * 0.5);
var all = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.ALL).setParameterLength(1);
var any = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.ANY).setParameterLength(1);
var radians = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.RADIANS).setParameterLength(1);
var degrees = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.DEGREES).setParameterLength(1);
var exp = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.EXP).setParameterLength(1);
var exp2 = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.EXP2).setParameterLength(1);
var log2 = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.LOG).setParameterLength(1);
var log22 = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.LOG2).setParameterLength(1);
var sqrt = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.SQRT).setParameterLength(1);
var inverseSqrt = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.INVERSE_SQRT).setParameterLength(1);
var floor = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.FLOOR).setParameterLength(1);
var ceil = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.CEIL).setParameterLength(1);
var normalize2 = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.NORMALIZE).setParameterLength(1);
var fract = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.FRACT).setParameterLength(1);
var sin = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.SIN).setParameterLength(1);
var sinh = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.SINH).setParameterLength(1);
var cos = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.COS).setParameterLength(1);
var cosh = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.COSH).setParameterLength(1);
var tan = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.TAN).setParameterLength(1);
var tanh = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.TANH).setParameterLength(1);
var asin = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.ASIN).setParameterLength(1);
var asinh = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.ASINH).setParameterLength(1);
var acos = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.ACOS).setParameterLength(1);
var acosh = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.ACOSH).setParameterLength(1);
var atan = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.ATAN).setParameterLength(1, 2);
var atanh = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.ATANH).setParameterLength(1);
var abs = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.ABS).setParameterLength(1);
var sign = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.SIGN).setParameterLength(1);
var length = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.LENGTH).setParameterLength(1);
var negate = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.NEGATE).setParameterLength(1);
var oneMinus = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.ONE_MINUS).setParameterLength(1);
var dFdx = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.DFDX).setParameterLength(1);
var dFdy = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.DFDY).setParameterLength(1);
var round = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.ROUND).setParameterLength(1);
var reciprocal = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.RECIPROCAL).setParameterLength(1);
var trunc = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.TRUNC).setParameterLength(1);
var fwidth = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.FWIDTH).setParameterLength(1);
var transpose = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.TRANSPOSE).setParameterLength(1);
var determinant = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.DETERMINANT).setParameterLength(1);
var inverse = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.INVERSE).setParameterLength(1);
var min$1 = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.MIN).setParameterLength(2, Infinity);
var max$1 = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.MAX).setParameterLength(2, Infinity);
var step = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.STEP).setParameterLength(2);
var reflect = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.REFLECT).setParameterLength(2);
var distance = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.DISTANCE).setParameterLength(2);
var difference = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.DIFFERENCE).setParameterLength(2);
var dot = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.DOT).setParameterLength(2);
var cross = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.CROSS).setParameterLength(2);
var pow = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.POW).setParameterLength(2);
var pow2 = (x) => mul(x, x);
var pow3 = (x) => mul(x, x, x);
var pow4 = (x) => mul(x, x, x, x);
var transformDirection = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.TRANSFORM_DIRECTION).setParameterLength(2);
var transformNormalByViewMatrix = (normal2, viewMatrix) => normalize2(mul(viewMatrix, vec4(vec3(normal2), 0)).xyz);
var transformNormalByInverseViewMatrix = (normal2, viewMatrix) => normalize2(vec4(vec3(normal2), 0).mul(viewMatrix).xyz);
var cbrt = (a) => mul(sign(a), pow(abs(a), 1 / 3));
var lengthSq = (a) => dot(a, a);
var mix = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.MIX).setParameterLength(3);
var clamp2 = (value, low = 0, high = 1) => new MathNode(MathNode.CLAMP, nodeObject(value), nodeObject(low), nodeObject(high));
var saturate = (value) => clamp2(value);
var refract = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.REFRACT).setParameterLength(3);
var smoothstep2 = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.SMOOTHSTEP).setParameterLength(3);
var faceForward = /* @__PURE__ */ nodeProxyIntent(MathNode, MathNode.FACEFORWARD).setParameterLength(3);
var rand = /* @__PURE__ */ Fn(([uv2]) => {
  const a = 12.9898, b = 78.233, c = 43758.5453;
  const dt = dot(uv2.xy, vec2(a, b)), sn = mod(dt, PI);
  return fract(sin(sn).mul(c));
});
var mixElement = (t, e1, e2) => mix(e1, e2, t);
var smoothstepElement = (x, low, high) => smoothstep2(low, high, x);
var stepElement = (x, edge) => step(edge, x);
addMethodChaining("all", all);
addMethodChaining("any", any);
addMethodChaining("radians", radians);
addMethodChaining("degrees", degrees);
addMethodChaining("exp", exp);
addMethodChaining("exp2", exp2);
addMethodChaining("log", log2);
addMethodChaining("log2", log22);
addMethodChaining("sqrt", sqrt);
addMethodChaining("inverseSqrt", inverseSqrt);
addMethodChaining("floor", floor);
addMethodChaining("ceil", ceil);
addMethodChaining("normalize", normalize2);
addMethodChaining("fract", fract);
addMethodChaining("sin", sin);
addMethodChaining("sinh", sinh);
addMethodChaining("cos", cos);
addMethodChaining("cosh", cosh);
addMethodChaining("tan", tan);
addMethodChaining("tanh", tanh);
addMethodChaining("asin", asin);
addMethodChaining("asinh", asinh);
addMethodChaining("acos", acos);
addMethodChaining("acosh", acosh);
addMethodChaining("atan", atan);
addMethodChaining("atanh", atanh);
addMethodChaining("abs", abs);
addMethodChaining("sign", sign);
addMethodChaining("length", length);
addMethodChaining("lengthSq", lengthSq);
addMethodChaining("negate", negate);
addMethodChaining("oneMinus", oneMinus);
addMethodChaining("dFdx", dFdx);
addMethodChaining("dFdy", dFdy);
addMethodChaining("round", round);
addMethodChaining("reciprocal", reciprocal);
addMethodChaining("trunc", trunc);
addMethodChaining("fwidth", fwidth);
addMethodChaining("min", min$1);
addMethodChaining("max", max$1);
addMethodChaining("step", stepElement);
addMethodChaining("reflect", reflect);
addMethodChaining("distance", distance);
addMethodChaining("dot", dot);
addMethodChaining("cross", cross);
addMethodChaining("pow", pow);
addMethodChaining("pow2", pow2);
addMethodChaining("pow3", pow3);
addMethodChaining("pow4", pow4);
addMethodChaining("transformDirection", transformDirection);
addMethodChaining("transformNormalByViewMatrix", transformNormalByViewMatrix);
addMethodChaining("transformNormalByInverseViewMatrix", transformNormalByInverseViewMatrix);
addMethodChaining("mix", mixElement);
addMethodChaining("clamp", clamp2);
addMethodChaining("refract", refract);
addMethodChaining("smoothstep", smoothstepElement);
addMethodChaining("faceForward", faceForward);
addMethodChaining("difference", difference);
addMethodChaining("saturate", saturate);
addMethodChaining("cbrt", cbrt);
addMethodChaining("transpose", transpose);
addMethodChaining("determinant", determinant);
addMethodChaining("inverse", inverse);
addMethodChaining("rand", rand);
var ConditionalNode = class extends Node {
  static get type() {
    return "ConditionalNode";
  }
  /**
   * Constructs a new conditional node.
   *
   * @param {Node} condNode - The node that defines the condition.
   * @param {Node} ifNode - The node that is evaluate when the condition ends up `true`.
   * @param {?Node} [elseNode=null] - The node that is evaluate when the condition ends up `false`.
   */
  constructor(condNode, ifNode, elseNode = null) {
    super();
    this.condNode = condNode;
    this.ifNode = ifNode;
    this.elseNode = elseNode;
  }
  /**
   * This method is overwritten since the node type is inferred from the if/else
   * nodes.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {string} The node type.
   */
  generateNodeType(builder) {
    const { ifNode, elseNode } = builder.getNodeProperties(this);
    if (ifNode === void 0) {
      builder.flowBuildStage(this, "setup");
      return this.getNodeType(builder);
    }
    const ifType = ifNode.getNodeType(builder);
    if (elseNode !== null) {
      const elseType = elseNode.getNodeType(builder);
      if (builder.getTypeLength(elseType) > builder.getTypeLength(ifType)) {
        return elseType;
      }
    }
    return ifType;
  }
  setup(builder) {
    const condNode = this.condNode;
    const ifNode = this.ifNode.isolate();
    const elseNode = this.elseNode ? this.elseNode.isolate() : null;
    const currentNodeBlock = builder.context.nodeBlock;
    builder.getDataFromNode(ifNode).parentNodeBlock = currentNodeBlock;
    if (elseNode !== null) builder.getDataFromNode(elseNode).parentNodeBlock = currentNodeBlock;
    const isUniformFlow = builder.context.uniformFlow;
    const properties = builder.getNodeProperties(this);
    properties.condNode = condNode;
    properties.ifNode = isUniformFlow ? ifNode : ifNode.context({ nodeBlock: ifNode });
    properties.elseNode = elseNode ? isUniformFlow ? elseNode : elseNode.context({ nodeBlock: elseNode }) : null;
  }
  generate(builder, output2) {
    const type = this.getNodeType(builder);
    const nodeData = builder.getDataFromNode(this);
    if (nodeData.nodeProperty !== void 0) {
      return nodeData.nodeProperty;
    }
    const { condNode, ifNode, elseNode } = builder.getNodeProperties(this);
    const functionNode = builder.currentFunctionNode;
    const needsOutput = output2 !== "void";
    const nodeProperty = needsOutput ? property(type).build(builder) : "";
    nodeData.nodeProperty = nodeProperty;
    const nodeSnippet = condNode.build(builder, "bool");
    const isUniformFlow = builder.context.uniformFlow;
    if (isUniformFlow && elseNode !== null) {
      const ifSnippet2 = ifNode.build(builder, type);
      const elseSnippet = elseNode.build(builder, type);
      const mathSnippet = builder.getTernary(nodeSnippet, ifSnippet2, elseSnippet);
      return builder.format(mathSnippet, type, output2);
    }
    builder.addFlowCode(`
${builder.tab}if ( ${nodeSnippet} ) {

`).addFlowTab();
    let ifSnippet = ifNode.build(builder, type);
    if (ifSnippet) {
      if (needsOutput) {
        ifSnippet = nodeProperty + " = " + ifSnippet + ";";
      } else {
        ifSnippet = "return " + ifSnippet + ";";
        if (functionNode === null) {
          warn("TSL: Return statement used in an inline 'Fn()'. Define a layout struct to allow return values.", this.stackTrace);
          ifSnippet = "// " + ifSnippet;
        }
      }
    }
    builder.removeFlowTab().addFlowCode(builder.tab + "	" + ifSnippet + "\n\n" + builder.tab + "}");
    if (elseNode !== null) {
      builder.addFlowCode(" else {\n\n").addFlowTab();
      let elseSnippet = elseNode.build(builder, type);
      if (elseSnippet) {
        if (needsOutput) {
          elseSnippet = nodeProperty + " = " + elseSnippet + ";";
        } else {
          elseSnippet = "return " + elseSnippet + ";";
          if (functionNode === null) {
            warn("TSL: Return statement used in an inline 'Fn()'. Define a layout struct to allow return values.", this.stackTrace);
            elseSnippet = "// " + elseSnippet;
          }
        }
      }
      builder.removeFlowTab().addFlowCode(builder.tab + "	" + elseSnippet + "\n\n" + builder.tab + "}\n\n");
    } else {
      builder.addFlowCode("\n\n");
    }
    return builder.format(nodeProperty, type, output2);
  }
};
var select = /* @__PURE__ */ nodeProxy(ConditionalNode).setParameterLength(2, 3);
addMethodChaining("select", select);
var ContextNode = class extends Node {
  static get type() {
    return "ContextNode";
  }
  /**
   * Constructs a new context node.
   *
   * @param {Node} node - The node whose context should be modified.
   * @param {Object} [value={}] - The modified context data.
   */
  constructor(node = null, value = {}) {
    super();
    this.isContextNode = true;
    this.node = node;
    this.value = value;
  }
  /**
   * This method is overwritten to ensure it returns the reference to {@link ContextNode#node}.
   *
   * @return {Node} A reference to {@link ContextNode#node}.
   */
  getScope() {
    return this.node.getScope();
  }
  /**
   * This method is overwritten to ensure it returns the type of {@link ContextNode#node}.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {string} The node type.
   */
  generateNodeType(builder) {
    return this.node.getNodeType(builder);
  }
  /**
   * Gathers the context data from all parent context nodes.
   *
   * @return {Object} The gathered context data.
   */
  getFlowContextData() {
    const children = [];
    this.traverse((node) => {
      if (node.isContextNode === true) {
        children.push(node.value);
      }
    });
    return Object.assign({}, ...children);
  }
  /**
   * This method is overwritten to ensure it returns the member type of {@link ContextNode#node}.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @param {string} name - The member name.
   * @returns {string} The member type.
   */
  getMemberType(builder, name) {
    return this.node.getMemberType(builder, name);
  }
  analyze(builder) {
    const previousContext = builder.addContext(this.value);
    this.node.build(builder);
    builder.setContext(previousContext);
  }
  setup(builder) {
    const previousContext = builder.addContext(this.value);
    this.node.build(builder);
    builder.setContext(previousContext);
  }
  generate(builder, output2) {
    const previousContext = builder.addContext(this.value);
    const snippet = this.node.build(builder, output2);
    builder.setContext(previousContext);
    return snippet;
  }
};
var context = (nodeOrValue = null, value = {}) => {
  let node = nodeOrValue;
  if (node === null || node.isNode !== true) {
    value = node || value;
    node = null;
  }
  return new ContextNode(node, value);
};
var uniformFlow = (node) => context(node, { uniformFlow: true });
var setName = (node, name) => context(node, { nodeName: name });
function builtinShadowContext(shadowNode, light, node = null) {
  return context(node, {
    getShadow: ({ light: shadowLight, shadowColorNode }) => {
      if (light === shadowLight) {
        return shadowColorNode.mul(shadowNode);
      }
      return shadowColorNode;
    }
  });
}
function builtinAOContext(aoNode, node = null) {
  return context(node, {
    getAO: (inputNode, { material }) => {
      if (material.transparent === true) return inputNode;
      return inputNode !== null ? inputNode.mul(aoNode) : aoNode;
    }
  });
}
function label(node, name) {
  warn('TSL: "label()" has been deprecated. Use "setName()" instead.');
  return setName(node, name);
}
addMethodChaining("context", context);
addMethodChaining("label", label);
addMethodChaining("uniformFlow", uniformFlow);
addMethodChaining("setName", setName);
addMethodChaining("builtinShadowContext", (node, shadowNode, light) => builtinShadowContext(shadowNode, light, node));
addMethodChaining("builtinAOContext", (node, aoValue) => builtinAOContext(aoValue, node));
var VarNode = class extends Node {
  static get type() {
    return "VarNode";
  }
  /**
   * Constructs a new variable node.
   *
   * @param {Node} node - The node for which a variable should be created.
   * @param {?string} [name=null] - The name of the variable in the shader.
   * @param {boolean} [readOnly=false] - The read-only flag.
   */
  constructor(node, name = null, readOnly = false) {
    super();
    this.node = node;
    this.name = name;
    this.global = true;
    this.isVarNode = true;
    this.readOnly = readOnly;
    this.parents = true;
    this.intent = false;
  }
  /**
   * Sets the intent flag for this node.
   *
   * This flag is used to indicate that this node is used for intent
   * and should not be built directly. Instead, it is used to indicate that
   * the node should be treated as a variable intent.
   *
   * It's useful for assigning variables without needing creating a new variable node.
   *
   * @param {boolean} value - The value to set for the intent flag.
   * @returns {VarNode} This node.
   */
  setIntent(value) {
    this.intent = value;
    return this;
  }
  /**
   * Checks if this node is used for intent.
   *
   * @param {NodeBuilder} builder - The node builder.
   * @returns {boolean} Whether this node is used for intent.
   */
  isIntent(builder) {
    const data = builder.getDataFromNode(this);
    if (data.forceDeclaration === true) return false;
    return this.intent;
  }
  /**
   * Returns the intent flag of this node.
   *
   * @return {boolean} The intent flag.
   */
  getIntent() {
    return this.intent;
  }
  getMemberType(builder, name) {
    return this.node.getMemberType(builder, name);
  }
  getElementType(builder) {
    return this.node.getElementType(builder);
  }
  generateNodeType(builder) {
    return this.node.getNodeType(builder);
  }
  getArrayCount(builder) {
    return this.node.getArrayCount(builder);
  }
  isAssign(builder) {
    const data = builder.getDataFromNode(this);
    return data.assign;
  }
  build(...params) {
    const builder = params[0];
    const refNode = this.getShared(builder);
    if (this !== refNode) {
      return refNode.build(...params);
    }
    if (this._hasStack(builder) === false && builder.buildStage === "setup") {
      if (builder.context.nodeLoop || builder.context.nodeBlock) {
        let addBefore = false;
        if (this.node.isShaderCallNodeInternal && this.node.shaderNode.getLayout() === null) {
          if (builder.fnCall && builder.fnCall.shaderNode) {
            const shaderNodeData = builder.getDataFromNode(this.node.shaderNode);
            if (shaderNodeData.hasLoop) {
              const data = builder.getDataFromNode(this);
              data.forceDeclaration = true;
              addBefore = true;
            }
          }
        }
        const baseStack = builder.getBaseStack();
        if (addBefore) {
          baseStack.addToStackBefore(this);
        } else {
          baseStack.addToStack(this);
        }
      }
    }
    if (this.isIntent(builder)) {
      if (this.isAssign(builder) !== true) {
        return this.node.build(...params);
      }
    }
    return super.build(...params);
  }
  generate(builder) {
    const { node, name, readOnly } = this;
    const { renderer } = builder;
    const isWebGPUBackend = renderer.backend.isWebGPUBackend === true;
    let isDeterministic = false;
    let shouldTreatAsReadOnly = false;
    if (readOnly) {
      isDeterministic = builder.isDeterministic(node);
      shouldTreatAsReadOnly = isWebGPUBackend ? readOnly : isDeterministic;
    }
    const nodeType = this.getNodeType(builder);
    if (nodeType == "void") {
      if (this.isIntent(builder) !== true) {
        error('TSL: ".toVar()" can not be used with void type.', this.stackTrace);
      }
      const snippet2 = node.build(builder);
      return snippet2;
    }
    const vectorType = builder.getVectorType(nodeType);
    const snippet = node.build(builder, vectorType);
    const nodeVar = builder.getVarFromNode(this, name, vectorType, void 0, shouldTreatAsReadOnly);
    const propertyName = builder.getPropertyName(nodeVar);
    let declarationPrefix = propertyName;
    if (shouldTreatAsReadOnly) {
      if (isWebGPUBackend) {
        declarationPrefix = isDeterministic ? `const ${propertyName}` : `let ${propertyName}`;
      } else {
        const count = node.getArrayCount(builder);
        declarationPrefix = `const ${builder.getVar(nodeVar.type, propertyName, count)}`;
      }
    }
    builder.addLineFlowCode(`${declarationPrefix} = ${snippet}`, this);
    return propertyName;
  }
  _hasStack(builder) {
    const nodeData = builder.getDataFromNode(this);
    return nodeData.stack !== void 0;
  }
};
var createVar = /* @__PURE__ */ nodeProxy(VarNode);
var Var = (node, name = null) => createVar(node, name).toStack();
var Const = (node, name = null) => createVar(node, name, true).toStack();
var VarIntent = (node) => {
  return createVar(node).setIntent(true).toStack();
};
addMethodChaining("toVar", Var);
addMethodChaining("toConst", Const);
addMethodChaining("toVarIntent", VarIntent);
var SubBuildNode = class extends Node {
  static get type() {
    return "SubBuild";
  }
  constructor(node, name, nodeType = null) {
    super(nodeType);
    this.node = node;
    this.name = name;
    this.isSubBuildNode = true;
  }
  generateNodeType(builder) {
    if (this.nodeType !== null) return this.nodeType;
    builder.addSubBuild(this.name);
    const nodeType = this.node.getNodeType(builder);
    builder.removeSubBuild();
    return nodeType;
  }
  build(builder, ...params) {
    builder.addSubBuild(this.name);
    const data = this.node.build(builder, ...params);
    builder.removeSubBuild();
    return data;
  }
};
var subBuild = (node, name, type = null) => new SubBuildNode(nodeObject(node), name, type);
var VaryingNode = class extends Node {
  static get type() {
    return "VaryingNode";
  }
  /**
   * Constructs a new varying node.
   *
   * @param {Node} node - The node for which a varying should be created.
   * @param {?string} name - The name of the varying in the shader.
   */
  constructor(node, name = null) {
    super();
    this.node = subBuild(node, "VERTEX");
    this.name = name;
    this.isVaryingNode = true;
    this.interpolationType = null;
    this.interpolationSampling = null;
    this.global = true;
  }
  /**
   * Defines the interpolation type of the varying.
   *
   * @param {string} type - The interpolation type.
   * @param {?string} sampling - The interpolation sampling type
   * @return {VaryingNode} A reference to this node.
   */
  setInterpolation(type, sampling = null) {
    this.interpolationType = type;
    this.interpolationSampling = sampling;
    return this;
  }
  getHash(builder) {
    return this.name || super.getHash(builder);
  }
  generateNodeType(builder) {
    return this.node.getNodeType(builder);
  }
  /**
   * This method performs the setup of a varying node with the current node builder.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {NodeVarying} The node varying from the node builder.
   */
  setupVarying(builder) {
    const properties = builder.getNodeProperties(this);
    let varying2 = properties.varying;
    if (varying2 === void 0) {
      const name = this.name;
      const type = this.getNodeType(builder);
      const interpolationType = this.interpolationType;
      const interpolationSampling = this.interpolationSampling;
      properties.varying = varying2 = builder.getVaryingFromNode(this, name, type, interpolationType, interpolationSampling);
      properties.node = subBuild(this.node, "VERTEX");
    }
    varying2.needsInterpolation || (varying2.needsInterpolation = builder.shaderStage === "fragment");
    return varying2;
  }
  setup(builder) {
    this.setupVarying(builder);
    builder.flowNodeFromShaderStage(NodeShaderStage.VERTEX, this.node);
  }
  analyze(builder) {
    this.setupVarying(builder);
    builder.flowNodeFromShaderStage(NodeShaderStage.VERTEX, this.node);
  }
  generate(builder) {
    const propertyKey = builder.getSubBuildProperty("property", builder.currentStack);
    const properties = builder.getNodeProperties(this);
    const varying2 = this.setupVarying(builder);
    if (properties[propertyKey] === void 0) {
      const type = this.getNodeType(builder);
      const propertyName = builder.getPropertyName(varying2, NodeShaderStage.VERTEX);
      if (builder.shaderStage === NodeShaderStage.VERTEX) {
        const snippet = properties.node.build(builder, type);
        builder.addLineFlowCode(`${propertyName} = ${snippet}`, this);
      } else {
        builder.flowNodeFromShaderStage(NodeShaderStage.VERTEX, properties.node, type, propertyName);
      }
      properties[propertyKey] = propertyName;
    }
    return builder.getPropertyName(varying2);
  }
};
var varying = /* @__PURE__ */ nodeProxy(VaryingNode).setParameterLength(1, 2);
var vertexStage = (node) => varying(node);
addMethodChaining("toVarying", varying);
addMethodChaining("toVertexStage", vertexStage);
var sRGBTransferEOTF = /* @__PURE__ */ Fn(([color2]) => {
  const a = color2.mul(0.9478672986).add(0.0521327014).pow(2.4);
  const b = color2.mul(0.0773993808);
  const factor = color2.lessThanEqual(0.04045);
  const rgbResult = mix(a, b, factor);
  return rgbResult;
}).setLayout({
  name: "sRGBTransferEOTF",
  type: "vec3",
  inputs: [
    { name: "color", type: "vec3" }
  ]
});
var sRGBTransferOETF = /* @__PURE__ */ Fn(([color2]) => {
  const a = color2.pow(0.41666).mul(1.055).sub(0.055);
  const b = color2.mul(12.92);
  const factor = color2.lessThanEqual(31308e-7);
  const rgbResult = mix(a, b, factor);
  return rgbResult;
}).setLayout({
  name: "sRGBTransferOETF",
  type: "vec3",
  inputs: [
    { name: "color", type: "vec3" }
  ]
});
var WORKING_COLOR_SPACE = "WorkingColorSpace";
var OUTPUT_COLOR_SPACE = "OutputColorSpace";
var ColorSpaceNode = class extends TempNode {
  static get type() {
    return "ColorSpaceNode";
  }
  /**
   * Constructs a new color space node.
   *
   * @param {Node} colorNode - Represents the color to convert.
   * @param {string} source - The source color space.
   * @param {string} target - The target color space.
   */
  constructor(colorNode, source, target) {
    super("vec4");
    this.colorNode = colorNode;
    this.source = source;
    this.target = target;
  }
  /**
   * This method resolves the constants `WORKING_COLOR_SPACE` and
   * `OUTPUT_COLOR_SPACE` based on the current configuration of the
   * color management and renderer.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @param {string} colorSpace - The color space to resolve.
   * @return {string} The resolved color space.
   */
  resolveColorSpace(builder, colorSpace) {
    if (colorSpace === WORKING_COLOR_SPACE) {
      return ColorManagement.workingColorSpace;
    } else if (colorSpace === OUTPUT_COLOR_SPACE) {
      return builder.context.outputColorSpace || builder.renderer.outputColorSpace;
    }
    return colorSpace;
  }
  setup(builder) {
    const { colorNode } = this;
    const source = this.resolveColorSpace(builder, this.source);
    const target = this.resolveColorSpace(builder, this.target);
    let outputNode = colorNode;
    if (ColorManagement.enabled === false || source === target || !source || !target) {
      return outputNode;
    }
    if (ColorManagement.getTransfer(source) === SRGBTransfer) {
      outputNode = vec4(sRGBTransferEOTF(outputNode.rgb), outputNode.a);
    }
    if (ColorManagement.getPrimaries(source) !== ColorManagement.getPrimaries(target)) {
      outputNode = vec4(
        mat3(ColorManagement._getMatrix(new Matrix3(), source, target)).mul(outputNode.rgb),
        outputNode.a
      );
    }
    if (ColorManagement.getTransfer(target) === SRGBTransfer) {
      outputNode = vec4(sRGBTransferOETF(outputNode.rgb), outputNode.a);
    }
    return outputNode;
  }
};
var workingToColorSpace = (node, targetColorSpace) => new ColorSpaceNode(nodeObject(node), WORKING_COLOR_SPACE, targetColorSpace);
var colorSpaceToWorking = (node, sourceColorSpace) => new ColorSpaceNode(nodeObject(node), sourceColorSpace, WORKING_COLOR_SPACE);
addMethodChaining("workingToColorSpace", workingToColorSpace);
addMethodChaining("colorSpaceToWorking", colorSpaceToWorking);
var ReferenceElementNode$1 = class ReferenceElementNode extends ArrayElementNode {
  static get type() {
    return "ReferenceElementNode";
  }
  /**
   * Constructs a new reference element node.
   *
   * @param {ReferenceBaseNode} referenceNode - The reference node.
   * @param {Node} indexNode - The index node that defines the element access.
   */
  constructor(referenceNode, indexNode) {
    super(referenceNode, indexNode);
    this.referenceNode = referenceNode;
    this.isReferenceElementNode = true;
  }
  /**
   * This method is overwritten since the node type is inferred from
   * the uniform type of the reference node.
   *
   * @return {string} The node type.
   */
  generateNodeType() {
    return this.referenceNode.uniformType;
  }
  generate(builder) {
    const snippet = super.generate(builder);
    const arrayType = this.referenceNode.getNodeType();
    const elementType = this.getNodeType();
    return builder.format(snippet, arrayType, elementType);
  }
};
var ReferenceBaseNode = class extends Node {
  static get type() {
    return "ReferenceBaseNode";
  }
  /**
   * Constructs a new reference base node.
   *
   * @param {string} property - The name of the property the node refers to.
   * @param {string} uniformType - The uniform type that should be used to represent the property value.
   * @param {?Object} [object=null] - The object the property belongs to.
   * @param {?number} [count=null] - When the linked property is an array-like, this parameter defines its length.
   */
  constructor(property2, uniformType, object = null, count = null) {
    super();
    this.property = property2;
    this.uniformType = uniformType;
    this.object = object;
    this.count = count;
    this.properties = property2.split(".");
    this.reference = object;
    this.node = null;
    this.group = null;
    this.updateType = NodeUpdateType.OBJECT;
  }
  /**
   * Sets the uniform group for this reference node.
   *
   * @param {UniformGroupNode} group - The uniform group to set.
   * @return {ReferenceBaseNode} A reference to this node.
   */
  setGroup(group) {
    this.group = group;
    return this;
  }
  /**
   * When the referred property is array-like, this method can be used
   * to access elements via an index node.
   *
   * @param {IndexNode} indexNode - indexNode.
   * @return {ReferenceElementNode} A reference to an element.
   */
  element(indexNode) {
    return new ReferenceElementNode$1(this, nodeObject(indexNode));
  }
  /**
   * Sets the node type which automatically defines the internal
   * uniform type.
   *
   * @param {string} uniformType - The type to set.
   */
  setNodeType(uniformType) {
    const node = uniform(null, uniformType);
    if (this.group !== null) {
      node.setGroup(this.group);
    }
    this.node = node;
  }
  /**
   * This method is overwritten since the node type is inferred from
   * the type of the reference node.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {string} The node type.
   */
  generateNodeType(builder) {
    if (this.node === null) {
      this.updateReference(builder);
      this.updateValue();
    }
    return this.node.getNodeType(builder);
  }
  /**
   * Returns the property value from the given referred object.
   *
   * @param {Object} [object=this.reference] - The object to retrieve the property value from.
   * @return {any} The value.
   */
  getValueFromReference(object = this.reference) {
    const { properties } = this;
    let value = object[properties[0]];
    for (let i = 1; i < properties.length; i++) {
      value = value[properties[i]];
    }
    return value;
  }
  /**
   * Allows to update the reference based on the given state. The state is only
   * evaluated {@link ReferenceBaseNode#object} is not set.
   *
   * @param {(NodeFrame|NodeBuilder)} state - The current state.
   * @return {Object} The updated reference.
   */
  updateReference(state) {
    this.reference = this.object !== null ? this.object : state.object;
    return this.reference;
  }
  /**
   * The output of the reference node is the internal uniform node.
   *
   * @return {UniformNode} The output node.
   */
  setup() {
    this.updateValue();
    return this.node;
  }
  /**
   * Overwritten to update the internal uniform value.
   *
   * @param {NodeFrame} frame - A reference to the current node frame.
   */
  update() {
    this.updateValue();
  }
  /**
   * Retrieves the value from the referred object property and uses it
   * to updated the internal uniform.
   */
  updateValue() {
    if (this.node === null) this.setNodeType(this.uniformType);
    const value = this.getValueFromReference();
    if (Array.isArray(value)) {
      this.node.array = value;
    } else {
      this.node.value = value;
    }
  }
};
var RendererReferenceNode = class extends ReferenceBaseNode {
  static get type() {
    return "RendererReferenceNode";
  }
  /**
   * Constructs a new renderer reference node.
   *
   * @param {string} property - The name of the property the node refers to.
   * @param {string} inputType - The uniform type that should be used to represent the property value.
   * @param {?Renderer} [renderer=null] - The renderer the property belongs to. When no renderer is set,
   * the node refers to the renderer of the current state.
   */
  constructor(property2, inputType, renderer = null) {
    super(property2, inputType, renderer);
    this.renderer = renderer;
    this.setGroup(renderGroup);
  }
  /**
   * Updates the reference based on the given state. The state is only evaluated
   * {@link RendererReferenceNode#renderer} is not set.
   *
   * @param {(NodeFrame|NodeBuilder)} state - The current state.
   * @return {Object} The updated reference.
   */
  updateReference(state) {
    this.reference = this.renderer !== null ? this.renderer : state.renderer;
    return this.reference;
  }
};
var rendererReference = (name, type, renderer = null) => new RendererReferenceNode(name, type, renderer);
var ToneMappingNode = class extends TempNode {
  static get type() {
    return "ToneMappingNode";
  }
  /**
   * Constructs a new tone mapping node.
   *
   * @param {number} toneMapping - The tone mapping type.
   * @param {Node} exposureNode - The tone mapping exposure.
   * @param {Node} [colorNode=null] - The color node to process.
   */
  constructor(toneMapping2, exposureNode = toneMappingExposure, colorNode = null) {
    super("vec3");
    this._toneMapping = toneMapping2;
    this.exposureNode = exposureNode;
    this.colorNode = colorNode;
  }
  /**
   * Overwrites the default `customCacheKey()` implementation by including the tone
   * mapping type into the cache key.
   *
   * @return {number} The hash.
   */
  customCacheKey() {
    return hash$1(this._toneMapping);
  }
  /**
   * Sets the tone mapping type.
   *
   * @param {number} value - The tone mapping type.
   * @return {ToneMappingNode} A reference to this node.
   */
  setToneMapping(value) {
    this._toneMapping = value;
    return this;
  }
  /**
   * Gets the tone mapping type.
   *
   * @returns {number} The tone mapping type.
   */
  getToneMapping() {
    return this._toneMapping;
  }
  setup(builder) {
    const colorNode = this.colorNode || builder.context.color;
    const toneMapping2 = this._toneMapping;
    if (toneMapping2 === NoToneMapping) return colorNode;
    let outputNode = null;
    const toneMappingFn = builder.renderer.library.getToneMappingFunction(toneMapping2);
    if (toneMappingFn !== null) {
      outputNode = vec4(toneMappingFn(colorNode.rgb, this.exposureNode), colorNode.a);
    } else {
      error("ToneMappingNode: Unsupported Tone Mapping configuration.", toneMapping2);
      outputNode = colorNode;
    }
    return outputNode;
  }
};
var toneMapping = (mapping, exposure, color2) => new ToneMappingNode(mapping, nodeObject(exposure), nodeObject(color2));
var toneMappingExposure = /* @__PURE__ */ rendererReference("toneMappingExposure", "float");
addMethodChaining("toneMapping", (color2, mapping, exposure) => toneMapping(mapping, exposure, color2));
var _bufferLib = /* @__PURE__ */ new WeakMap();
function _getBufferAttribute(value, itemSize) {
  let buffer2 = _bufferLib.get(value);
  if (buffer2 === void 0) {
    buffer2 = new InterleavedBuffer(value, itemSize);
    _bufferLib.set(value, buffer2);
  }
  return buffer2;
}
var BufferAttributeNode = class extends InputNode {
  static get type() {
    return "BufferAttributeNode";
  }
  /**
   * Constructs a new buffer attribute node.
   *
   * @param {BufferAttribute|InterleavedBuffer|TypedArray} value - The attribute data.
   * @param {?string} [bufferType=null] - The buffer type (e.g. `'vec3'`).
   * @param {number} [bufferStride=0] - The buffer stride.
   * @param {number} [bufferOffset=0] - The buffer offset.
   */
  constructor(value, bufferType = null, bufferStride = 0, bufferOffset = 0) {
    super(value, bufferType);
    this.isBufferNode = true;
    this.bufferType = bufferType;
    this.bufferStride = bufferStride;
    this.bufferOffset = bufferOffset;
    this.usage = StaticDrawUsage;
    this.instanced = false;
    this.attribute = null;
    this.global = true;
    if (value && value.isBufferAttribute === true && value.itemSize <= 4) {
      this.attribute = value;
      this.usage = value.usage;
      this.instanced = value.isInstancedBufferAttribute;
    }
  }
  /**
   * This method is overwritten since the attribute data might be shared
   * and thus the hash should be shared as well.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {string} The hash.
   */
  getHash(builder) {
    let id;
    if (this.bufferStride === 0 && this.bufferOffset === 0) {
      let bufferData = builder.globalCache.getData(this.value);
      if (bufferData === void 0) {
        bufferData = {
          node: this
        };
        builder.globalCache.setData(this.value, bufferData);
      }
      id = bufferData.node.id;
    } else {
      id = this.id;
    }
    return String(id);
  }
  /**
   * This method is overwritten since the node type is inferred from
   * the buffer attribute.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {string} The node type.
   */
  generateNodeType(builder) {
    if (this.bufferType === null) {
      this.bufferType = builder.getTypeFromAttribute(this.attribute);
    }
    return this.bufferType;
  }
  /**
   * Depending on which value was passed to the node, `setup()` behaves
   * differently. If no instance of `BufferAttribute` was passed, the method
   * creates an internal attribute and configures it respectively.
   *
   * @param {NodeBuilder} builder - The current node builder.
   */
  setup(builder) {
    if (this.attribute !== null) return;
    const type = this.getNodeType(builder);
    const itemSize = builder.getTypeLength(type);
    const value = this.value;
    const stride = this.bufferStride || itemSize;
    const offset = this.bufferOffset;
    let buffer2;
    if (value.isInterleavedBuffer === true) {
      buffer2 = value;
    } else if (value.isBufferAttribute === true) {
      buffer2 = _getBufferAttribute(value.array, stride);
    } else {
      buffer2 = _getBufferAttribute(value, stride);
    }
    const bufferAttribute2 = new InterleavedBufferAttribute(buffer2, itemSize, offset);
    buffer2.setUsage(this.usage);
    this.attribute = bufferAttribute2;
    this.attribute.isInstancedBufferAttribute = this.instanced;
  }
  /**
   * Generates the code snippet of the buffer attribute node.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {string} The generated code snippet.
   */
  generate(builder) {
    const nodeType = this.getNodeType(builder);
    const nodeName = builder.context.nodeName;
    if (nodeName !== void 0) delete builder.context.nodeName;
    const nodeAttribute = builder.getBufferAttributeFromNode(this, nodeType, nodeName);
    const propertyName = builder.getPropertyName(nodeAttribute);
    let output2 = null;
    if (builder.shaderStage === "vertex" || builder.shaderStage === "compute") {
      this.name = propertyName;
      output2 = propertyName;
    } else {
      let varyingName;
      if (nodeName) {
        varyingName = nodeName + "Varying";
      }
      const nodeVarying = varying(this, varyingName);
      output2 = nodeVarying.build(builder, nodeType);
    }
    return output2;
  }
  /**
   * Overwrites the default implementation to return a fixed value `'bufferAttribute'`.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {string} The input type.
   */
  getInputType() {
    return "bufferAttribute";
  }
  /**
   * Sets the `usage` property to the given value.
   *
   * @param {number} value - The usage to set.
   * @return {BufferAttributeNode} A reference to this node.
   */
  setUsage(value) {
    this.usage = value;
    if (this.attribute && this.attribute.isBufferAttribute === true) {
      this.attribute.usage = value;
    }
    return this;
  }
  /**
   * Sets the `instanced` property to the given value.
   *
   * @param {boolean} value - The value to set.
   * @return {BufferAttributeNode} A reference to this node.
   */
  setInstanced(value) {
    this.instanced = value;
    return this;
  }
};
function createBufferAttribute(array2, type = null, stride = 0, offset = 0, usage = StaticDrawUsage, instanced = false) {
  if (type === "mat3" || type === null && array2.itemSize === 9) {
    return mat3(
      new BufferAttributeNode(array2, "vec3", 9, 0).setUsage(usage).setInstanced(instanced),
      new BufferAttributeNode(array2, "vec3", 9, 3).setUsage(usage).setInstanced(instanced),
      new BufferAttributeNode(array2, "vec3", 9, 6).setUsage(usage).setInstanced(instanced)
    );
  } else if (type === "mat4" || type === null && array2.itemSize === 16) {
    return mat4(
      new BufferAttributeNode(array2, "vec4", 16, 0).setUsage(usage).setInstanced(instanced),
      new BufferAttributeNode(array2, "vec4", 16, 4).setUsage(usage).setInstanced(instanced),
      new BufferAttributeNode(array2, "vec4", 16, 8).setUsage(usage).setInstanced(instanced),
      new BufferAttributeNode(array2, "vec4", 16, 12).setUsage(usage).setInstanced(instanced)
    );
  }
  return new BufferAttributeNode(array2, type, stride, offset).setUsage(usage);
}
var bufferAttribute = (array2, type = null, stride = 0, offset = 0) => createBufferAttribute(array2, type, stride, offset);
addMethodChaining("toAttribute", (bufferNode) => bufferAttribute(bufferNode.value));
var IndexNode = class _IndexNode extends Node {
  static get type() {
    return "IndexNode";
  }
  /**
   * Constructs a new index node.
   *
   * @param {('vertex'|'instance'|'subgroup'|'invocationLocal'|'invocationGlobal'|'invocationSubgroup'|'draw')} scope - The scope of the index node.
   */
  constructor(scope) {
    super("uint");
    this.scope = scope;
    this.isIndexNode = true;
  }
  generate(builder) {
    const nodeType = this.getNodeType(builder);
    const scope = this.scope;
    let propertyName;
    if (scope === _IndexNode.VERTEX) {
      propertyName = builder.getVertexIndex();
    } else if (scope === _IndexNode.INSTANCE) {
      propertyName = builder.getInstanceIndex();
    } else if (scope === _IndexNode.DRAW) {
      propertyName = builder.getDrawIndex();
    } else if (scope === _IndexNode.INVOCATION_LOCAL) {
      propertyName = builder.getInvocationLocalIndex();
    } else if (scope === _IndexNode.INVOCATION_SUBGROUP) {
      propertyName = builder.getInvocationSubgroupIndex();
    } else if (scope === _IndexNode.SUBGROUP) {
      propertyName = builder.getSubgroupIndex();
    } else {
      throw new Error("THREE.IndexNode: Unknown scope: " + scope);
    }
    let output2;
    if (builder.shaderStage === "vertex" || builder.shaderStage === "compute") {
      output2 = propertyName;
    } else {
      const nodeVarying = varying(this);
      output2 = nodeVarying.build(builder, nodeType);
    }
    return output2;
  }
};
IndexNode.VERTEX = "vertex";
IndexNode.INSTANCE = "instance";
IndexNode.SUBGROUP = "subgroup";
IndexNode.INVOCATION_LOCAL = "invocationLocal";
IndexNode.INVOCATION_SUBGROUP = "invocationSubgroup";
IndexNode.DRAW = "draw";
var vertexIndex = /* @__PURE__ */ nodeImmutable(IndexNode, IndexNode.VERTEX);
var instanceIndex = /* @__PURE__ */ nodeImmutable(IndexNode, IndexNode.INSTANCE);
var subgroupIndex = /* @__PURE__ */ nodeImmutable(IndexNode, IndexNode.SUBGROUP);
var invocationSubgroupIndex = /* @__PURE__ */ nodeImmutable(IndexNode, IndexNode.INVOCATION_SUBGROUP);
var invocationLocalIndex = /* @__PURE__ */ nodeImmutable(IndexNode, IndexNode.INVOCATION_LOCAL);
var drawIndex = /* @__PURE__ */ nodeImmutable(IndexNode, IndexNode.DRAW);
var ComputeNode = class extends Node {
  static get type() {
    return "ComputeNode";
  }
  /**
   * Constructs a new compute node.
   *
   * @param {Node} computeNode - The node that defines the compute shader logic.
   * @param {Array<number>} workgroupSize - An array defining the X, Y, and Z dimensions of the workgroup for compute shader execution.
   */
  constructor(computeNode, workgroupSize) {
    super("void");
    this.isComputeNode = true;
    this.computeNode = computeNode;
    this.workgroupSize = workgroupSize;
    this.count = null;
    this.dispatchSize = null;
    this.version = 1;
    this.name = "";
    this.updateBeforeType = NodeUpdateType.OBJECT;
    this.onInitFunction = null;
    this.countNode = null;
  }
  /**
   * Executes the `dispose` event for this node.
   */
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  /**
   * Sets the {@link ComputeNode#name} property.
   *
   * @param {string} name - The name of the uniform.
   * @return {ComputeNode} A reference to this node.
   */
  setName(name) {
    this.name = name;
    return this;
  }
  /**
   * Sets the {@link ComputeNode#name} property.
   *
   * @deprecated
   * @param {string} name - The name of the uniform.
   * @return {ComputeNode} A reference to this node.
   */
  label(name) {
    warn('TSL: "label()" has been deprecated. Use "setName()" instead.', new StackTrace());
    return this.setName(name);
  }
  /**
   * Sets the callback to run during initialization.
   *
   * @param {Function} callback - The callback function.
   * @return {ComputeNode} A reference to this node.
   */
  onInit(callback) {
    this.onInitFunction = callback;
    return this;
  }
  /**
   * The method execute the compute for this node.
   *
   * @param {NodeFrame} frame - A reference to the current node frame.
   */
  updateBefore({ renderer }) {
    renderer.compute(this);
  }
  setup(builder) {
    if (this.count !== null && this.countNode === null) {
      this.countNode = uniform(this.count, "uint").onObjectUpdate(() => this.count);
    }
    const result = this.computeNode.build(builder);
    if (result) {
      const properties = builder.getNodeProperties(this);
      properties.outputComputeNode = result.outputNode;
      result.outputNode = null;
    }
    return result;
  }
  generate(builder, output2) {
    const { shaderStage } = builder;
    if (shaderStage === "compute") {
      const snippet = this.computeNode.build(builder, "void");
      if (snippet !== "") {
        builder.addLineFlowCode(snippet, this);
      }
      if (this.count !== null && builder.allowEarlyReturns === true) {
        const countSnippet = this.countNode.build(builder, "uint");
        const indexSnippet = instanceIndex.build(builder, "uint");
        builder.flow.code = `${builder.tab}if ( ${indexSnippet} >= ${countSnippet} ) { return; }

${builder.flow.code}`;
      }
    } else {
      const properties = builder.getNodeProperties(this);
      const outputComputeNode = properties.outputComputeNode;
      if (outputComputeNode) {
        return outputComputeNode.build(builder, output2);
      }
    }
  }
};
var computeKernel = (node, workgroupSize = [64]) => {
  if (workgroupSize.length === 0 || workgroupSize.length > 3) {
    error("TSL: compute() workgroupSize must have 1, 2, or 3 elements", new StackTrace());
  }
  for (let i = 0; i < workgroupSize.length; i++) {
    const val = workgroupSize[i];
    if (typeof val !== "number" || val <= 0 || !Number.isInteger(val)) {
      error(`TSL: compute() workgroupSize element at index [ ${i} ] must be a positive integer`, new StackTrace());
    }
  }
  while (workgroupSize.length < 3) workgroupSize.push(1);
  return new ComputeNode(nodeObject(node), workgroupSize);
};
var compute = (node, count, workgroupSize) => {
  const computeNode = computeKernel(node, workgroupSize);
  if (typeof count === "number") {
    computeNode.count = count;
  } else {
    computeNode.dispatchSize = count;
  }
  return computeNode;
};
addMethodChaining("compute", compute);
addMethodChaining("computeKernel", computeKernel);
var IsolateNode = class extends Node {
  static get type() {
    return "IsolateNode";
  }
  /**
   * Constructs a new cache node.
   *
   * @param {Node} node - The node that should be cached.
   * @param {boolean} [parent=true] - Whether this node refers to a shared parent cache or not.
   */
  constructor(node, parent = true) {
    super();
    this.node = node;
    this.parent = parent;
    this.isIsolateNode = true;
  }
  generateNodeType(builder) {
    const previousCache = builder.getCache();
    const cache2 = builder.getCacheFromNode(this, this.parent);
    builder.setCache(cache2);
    const nodeType = this.node.getNodeType(builder);
    builder.setCache(previousCache);
    return nodeType;
  }
  build(builder, ...params) {
    const previousCache = builder.getCache();
    const cache2 = builder.getCacheFromNode(this, this.parent);
    builder.setCache(cache2);
    const data = this.node.build(builder, ...params);
    builder.setCache(previousCache);
    return data;
  }
  setParent(parent) {
    this.parent = parent;
    return this;
  }
  getParent() {
    return this.parent;
  }
};
var isolate = (node) => new IsolateNode(nodeObject(node));
function cache(node, parent = true) {
  warn('TSL: "cache()" has been deprecated. Use "isolate()" instead.');
  return isolate(node).setParent(parent);
}
addMethodChaining("cache", cache);
addMethodChaining("isolate", isolate);
var BypassNode = class extends Node {
  static get type() {
    return "BypassNode";
  }
  /**
   * Constructs a new bypass node.
   *
   * @param {Node} outputNode - The output node.
   * @param {Node} callNode - The call node.
   */
  constructor(outputNode, callNode) {
    super();
    this.isBypassNode = true;
    this.outputNode = outputNode;
    this.callNode = callNode;
  }
  generateNodeType(builder) {
    return this.outputNode.getNodeType(builder);
  }
  generate(builder) {
    const snippet = this.callNode.build(builder, "void");
    if (snippet !== "") {
      builder.addLineFlowCode(snippet, this);
    }
    return this.outputNode.build(builder);
  }
};
var bypass = /* @__PURE__ */ nodeProxy(BypassNode).setParameterLength(2);
addMethodChaining("bypass", bypass);
var remap = /* @__PURE__ */ Fn(([node, inLowNode, inHighNode, outLowNode = float(0), outHighNode = float(1), doClamp = bool(false)]) => {
  let t = node.sub(inLowNode).div(inHighNode.sub(inLowNode));
  if (defined(doClamp)) t = t.clamp();
  return t.mul(outHighNode.sub(outLowNode)).add(outLowNode);
});
function remapClamp(node, inLowNode, inHighNode, outLowNode = float(0), outHighNode = float(1)) {
  return remap(node, inLowNode, inHighNode, outLowNode, outHighNode, true);
}
addMethodChaining("remap", remap);
addMethodChaining("remapClamp", remapClamp);
var ExpressionNode = class extends Node {
  static get type() {
    return "ExpressionNode";
  }
  /**
   * Constructs a new expression node.
   *
   * @param {string} [snippet=''] - The native code snippet.
   * @param {string} [nodeType='void'] - The node type.
   */
  constructor(snippet = "", nodeType = "void") {
    super(nodeType);
    this.snippet = snippet;
  }
  generate(builder, output2) {
    const type = this.getNodeType(builder);
    const snippet = this.snippet;
    if (type === "void") {
      builder.addLineFlowCode(snippet, this);
    } else {
      return builder.format(snippet, type, output2);
    }
  }
};
var expression = /* @__PURE__ */ nodeProxy(ExpressionNode).setParameterLength(1, 2);
var Discard = (conditional) => (conditional ? select(conditional, expression("discard")) : expression("discard")).toStack();
addMethodChaining("discard", Discard);
var premultiplyAlpha = /* @__PURE__ */ Fn(([color2]) => {
  return vec4(color2.rgb.mul(color2.a), color2.a);
}, { color: "vec4", return: "vec4" });
var unpremultiplyAlpha = /* @__PURE__ */ Fn(([color2]) => {
  return color2.a.equal(0).select(vec4(0), vec4(color2.rgb.div(color2.a), color2.a));
}, { color: "vec4", return: "vec4" });
var RenderOutputNode = class extends TempNode {
  static get type() {
    return "RenderOutputNode";
  }
  /**
   * Constructs a new render output node.
   *
   * @param {Node} colorNode - The color node to process.
   * @param {?number} toneMapping - The tone mapping type.
   * @param {?string} outputColorSpace - The output color space.
   */
  constructor(colorNode, toneMapping2, outputColorSpace) {
    super("vec4");
    this.colorNode = colorNode;
    this._toneMapping = toneMapping2;
    this.outputColorSpace = outputColorSpace;
    this.isRenderOutputNode = true;
  }
  /**
   * Sets the tone mapping type.
   *
   * @param {number} value - The tone mapping type.
   * @return {ToneMappingNode} A reference to this node.
   */
  setToneMapping(value) {
    this._toneMapping = value;
    return this;
  }
  /**
   * Gets the tone mapping type.
   *
   * @returns {number} The tone mapping type.
   */
  getToneMapping() {
    return this._toneMapping;
  }
  setup({ context: context2 }) {
    let outputNode = this.colorNode || context2.color;
    outputNode = vec4(outputNode.rgb, outputNode.a.clamp(0, 1));
    outputNode = unpremultiplyAlpha(outputNode);
    const toneMapping2 = (this._toneMapping !== null ? this._toneMapping : context2.toneMapping) || NoToneMapping;
    const outputColorSpace = (this.outputColorSpace !== null ? this.outputColorSpace : context2.outputColorSpace) || NoColorSpace;
    if (toneMapping2 !== NoToneMapping) {
      outputNode = outputNode.toneMapping(toneMapping2);
    }
    if (outputColorSpace !== NoColorSpace && outputColorSpace !== ColorManagement.workingColorSpace) {
      outputNode = outputNode.workingToColorSpace(outputColorSpace);
    }
    outputNode = premultiplyAlpha(outputNode);
    return outputNode;
  }
};
var renderOutput = (color2, toneMapping2 = null, outputColorSpace = null) => new RenderOutputNode(nodeObject(color2), toneMapping2, outputColorSpace);
addMethodChaining("renderOutput", renderOutput);
var DebugNode = class extends TempNode {
  static get type() {
    return "DebugNode";
  }
  constructor(node, callback = null) {
    super();
    this.node = node;
    this.callback = callback;
  }
  generateNodeType(builder) {
    return this.node.getNodeType(builder);
  }
  setup(builder) {
    return this.node.build(builder);
  }
  analyze(builder) {
    return this.node.build(builder);
  }
  generate(builder) {
    const callback = this.callback;
    const snippet = this.node.build(builder);
    if (callback !== null) {
      callback(builder, snippet);
    } else {
      const title = "--- TSL debug - " + builder.shaderStage + " shader ---";
      const border = "-".repeat(title.length);
      let code = "";
      code += "// #" + title + "#\n";
      code += builder.flow.code.replace(/^\t/mg, "") + "\n";
      code += "/* ... */ " + snippet + " /* ... */\n";
      code += "// #" + border + "#\n";
      log(code);
    }
    return snippet;
  }
};
var debug = (node, callback = null) => new DebugNode(nodeObject(node), callback).toStack();
addMethodChaining("debug", debug);
var InspectorBase = class extends EventDispatcher {
  /**
   * Creates a new InspectorBase.
   */
  constructor() {
    super();
    this._renderer = null;
    this.currentFrame = null;
  }
  /**
   * Returns the node frame for the current renderer.
   *
   * @return {Object} The node frame.
   */
  get nodeFrame() {
    return this._renderer._nodes.nodeFrame;
  }
  /**
   * Sets the renderer for this inspector.
   *
   * @param {WebGLRenderer} renderer - The renderer to associate with this inspector.
   * @return {InspectorBase} This inspector instance.
   */
  setRenderer(renderer) {
    this._renderer = renderer;
    return this;
  }
  /**
   * Returns the renderer associated with this inspector.
   *
   * @return {WebGLRenderer} The associated renderer.
   */
  getRenderer() {
    return this._renderer;
  }
  /**
   * Initializes the inspector.
   */
  init() {
  }
  /**
   * Called when a frame begins.
   */
  begin() {
  }
  /**
   * Called when a frame ends.
   */
  finish() {
  }
  /**
   * Inspects a node.
   *
   * @param {Node} node - The node to inspect.
   */
  inspect() {
  }
  /**
   * When a compute operation is performed.
   *
   * @param {ComputeNode} computeNode - The compute node being executed.
   * @param {number|Array<number>} dispatchSizeOrCount - The dispatch size or count.
   */
  computeAsync() {
  }
  /**
   * Called when a compute operation begins.
   *
   * @param {string} uid - A unique identifier for the render context.
   * @param {ComputeNode} computeNode - The compute node being executed.
   */
  beginCompute() {
  }
  /**
   * Called when a compute operation ends.
   *
   * @param {string} uid - A unique identifier for the render context.
   * @param {ComputeNode} computeNode - The compute node being executed.
   */
  finishCompute() {
  }
  /**
   * Called when a render operation begins.
   *
   * @param {string} uid - A unique identifier for the render context.
   * @param {Scene} scene - The scene being rendered.
   * @param {Camera} camera - The camera being used for rendering.
   * @param {?WebGLRenderTarget} renderTarget - The render target, if any.
   */
  beginRender() {
  }
  /**
   * Called when an animation loop ends.
   *
   * @param {string} uid - A unique identifier for the render context.
   */
  finishRender() {
  }
  /**
   * Called when a texture copy operation is performed.
   *
   * @param {Texture} srcTexture - The source texture.
   * @param {Texture} dstTexture - The destination texture.
   */
  copyTextureToTexture() {
  }
  /**
   * Called when a framebuffer copy operation is performed.
   *
   * @param {Texture} framebufferTexture - The texture associated with the framebuffer.
   */
  copyFramebufferToTexture() {
  }
};
var InspectorNode = class extends Node {
  /**
   * Returns the type of the node.
   *
   * @returns {string}
   */
  static get type() {
    return "InspectorNode";
  }
  /**
   * Creates an InspectorNode.
   *
   * @param {Node} node - The node to inspect.
   * @param {string} [name=''] - Optional name for the inspector node.
   * @param {Function|null} [callback=null] - Optional callback to modify the node during setup.
   */
  constructor(node, name = "", callback = null) {
    super();
    this.node = node;
    this.name = name;
    this.callback = callback;
    this.updateType = NodeUpdateType.FRAME;
    this.isInspectorNode = true;
  }
  /**
   * Returns the name of the inspector node.
   *
   * @returns {string}
   */
  getName() {
    return this.name || this.node.name;
  }
  /**
   * Updates the inspector node, allowing inspection of the wrapped node.
   *
   * @param {NodeFrame} frame - A reference to the current node frame.
   */
  update(frame) {
    frame.renderer.inspector.inspect(this);
  }
  /**
   * Returns the type of the wrapped node.
   *
   * @param {NodeBuilder} builder - The node builder.
   * @returns {string}
   */
  generateNodeType(builder) {
    return this.node.getNodeType(builder);
  }
  /**
   * Sets up the inspector node.
   *
   * @param {NodeBuilder} builder - The node builder.
   * @returns {Node} The setup node.
   */
  setup(builder) {
    let node = this.node;
    if (builder.context.inspector === true && this.callback !== null) {
      node = this.callback(node);
    }
    if (builder.renderer.backend.isWebGPUBackend !== true && builder.renderer.inspector.constructor !== InspectorBase) {
      warnOnce('TSL: ".toInspector()" is only available with WebGPU.');
    }
    return node;
  }
};
function inspector(node, name = "", callback = null) {
  node = nodeObject(node);
  return node.before(new InspectorNode(node, name, callback));
}
addMethodChaining("toInspector", inspector);
var AttributeNode = class extends Node {
  static get type() {
    return "AttributeNode";
  }
  /**
   * Constructs a new attribute node.
   *
   * @param {string} attributeName - The name of the attribute.
   * @param {?string} nodeType - The node type.
   */
  constructor(attributeName, nodeType = null) {
    super(nodeType);
    this.global = true;
    this._attributeName = attributeName;
  }
  getHash(builder) {
    return this.getAttributeName(builder);
  }
  generateNodeType(builder) {
    let nodeType = this.nodeType;
    if (nodeType === null) {
      const attributeName = this.getAttributeName(builder);
      if (builder.hasGeometryAttribute(attributeName)) {
        const attribute2 = builder.geometry.getAttribute(attributeName);
        nodeType = builder.getTypeFromAttribute(attribute2);
      } else {
        nodeType = "float";
      }
    }
    return nodeType;
  }
  /**
   * Sets the attribute name to the given value. The method can be
   * overwritten in derived classes if the final name must be computed
   * analytically.
   *
   * @param {string} attributeName - The name of the attribute.
   * @return {AttributeNode} A reference to this node.
   */
  setAttributeName(attributeName) {
    this._attributeName = attributeName;
    return this;
  }
  /**
   * Returns the attribute name of this node. The method can be
   * overwritten in derived classes if the final name must be computed
   * analytically.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {string} The attribute name.
   */
  getAttributeName() {
    return this._attributeName;
  }
  generate(builder) {
    const attributeName = this.getAttributeName(builder);
    const nodeType = this.getNodeType(builder);
    const geometryAttribute = builder.hasGeometryAttribute(attributeName);
    if (geometryAttribute === true) {
      const attribute2 = builder.geometry.getAttribute(attributeName);
      const attributeType = builder.getTypeFromAttribute(attribute2);
      const nodeAttribute = builder.getAttribute(attributeName, attributeType);
      if (builder.shaderStage === "vertex") {
        return builder.format(nodeAttribute.name, attributeType, nodeType);
      } else {
        const nodeVarying = varying(this);
        return nodeVarying.build(builder, nodeType);
      }
    } else {
      warn(`AttributeNode: Vertex attribute "${attributeName}" not found on geometry.`);
      return builder.generateConst(nodeType);
    }
  }
  serialize(data) {
    super.serialize(data);
    data.global = this.global;
    data._attributeName = this._attributeName;
  }
  deserialize(data) {
    super.deserialize(data);
    this.global = data.global;
    this._attributeName = data._attributeName;
  }
};
var attribute = (name, nodeType = null) => new AttributeNode(name, nodeType);
var uv$1 = (index = 0) => attribute("uv" + (index > 0 ? index : ""), "vec2");
var TextureSizeNode = class extends Node {
  static get type() {
    return "TextureSizeNode";
  }
  /**
   * Constructs a new texture size node.
   *
   * @param {TextureNode} textureNode - A texture node which size should be retrieved.
   * @param {?Node<int>} [levelNode=null] - A level node which defines the requested mip.
   */
  constructor(textureNode, levelNode = null) {
    super("uvec2");
    this.isTextureSizeNode = true;
    this.textureNode = textureNode;
    this.levelNode = levelNode;
  }
  generate(builder, output2) {
    const textureProperty = this.textureNode.build(builder, "property");
    const level = this.levelNode === null ? "0" : this.levelNode.build(builder, "int");
    return builder.format(`${builder.getMethod("textureDimensions")}( ${textureProperty}, ${level} )`, this.getNodeType(builder), output2);
  }
};
var textureSize = /* @__PURE__ */ nodeProxy(TextureSizeNode).setParameterLength(1, 2);
var MaxMipLevelNode = class extends UniformNode {
  static get type() {
    return "MaxMipLevelNode";
  }
  /**
   * Constructs a new max mip level node.
   *
   * @param {TextureNode} textureNode - The texture node to compute the max mip level for.
   */
  constructor(textureNode) {
    super(0);
    this._textureNode = textureNode;
    this.updateType = NodeUpdateType.FRAME;
  }
  /**
   * The texture node to compute the max mip level for.
   *
   * @readonly
   * @type {TextureNode}
   */
  get textureNode() {
    return this._textureNode;
  }
  /**
   * The texture.
   *
   * @readonly
   * @type {Texture}
   */
  get texture() {
    return this._textureNode.value;
  }
  update() {
    const texture2 = this.texture;
    const images = texture2.images;
    const image = images && images.length > 0 ? images[0] && images[0].image || images[0] : texture2.image;
    if (image && image.width !== void 0) {
      const { width, height } = image;
      this.value = Math.log2(Math.max(width, height));
    }
  }
};
var maxMipLevel = /* @__PURE__ */ nodeProxy(MaxMipLevelNode).setParameterLength(1);
var NodeError = class extends Error {
  constructor(message, stackTrace = null) {
    super(message);
    this.name = "NodeError";
    this.stackTrace = stackTrace;
  }
};
var EmptyTexture$1 = /* @__PURE__ */ new Texture();
var TextureNode = class extends UniformNode {
  static get type() {
    return "TextureNode";
  }
  /**
   * Constructs a new texture node.
   *
   * @param {Texture} [value=EmptyTexture] - The texture.
   * @param {?Node<vec2|vec3>} [uvNode=null] - The uv node.
   * @param {?Node<int>} [levelNode=null] - The level node.
   * @param {?Node<float>} [biasNode=null] - The bias node.
   */
  constructor(value = EmptyTexture$1, uvNode = null, levelNode = null, biasNode = null) {
    super(value);
    this.isTextureNode = true;
    this.uvNode = uvNode;
    this.levelNode = levelNode;
    this.biasNode = biasNode;
    this.compareNode = null;
    this.depthNode = null;
    this.gradNode = null;
    this.gatherNode = null;
    this.offsetNode = null;
    this.sampler = true;
    this.updateMatrix = false;
    this.updateType = NodeUpdateType.NONE;
    this.referenceNode = null;
    this._value = value;
    this._matrixUniform = null;
    this._flipYUniform = null;
    this.setUpdateMatrix(uvNode === null);
  }
  set value(value) {
    if (this.referenceNode) {
      this.referenceNode.value = value;
    } else {
      this._value = value;
    }
  }
  /**
   * The texture value.
   *
   * @type {Texture}
   */
  get value() {
    return this.referenceNode ? this.referenceNode.value : this._value;
  }
  /**
   * Overwritten since the uniform hash is defined by the texture's UUID.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {string} The uniform hash.
   */
  getUniformHash() {
    return this.value.uuid;
  }
  /**
   * Overwritten since the node type is inferred from the texture type.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {string} The node type.
   */
  generateNodeType() {
    if (this.value.isDepthTexture === true) {
      if (this.gatherNode === null) return "float";
      return "vec4";
    }
    if (this.value.type === UnsignedIntType) {
      return "uvec4";
    } else if (this.value.type === IntType) {
      return "ivec4";
    }
    return "vec4";
  }
  /**
   * Overwrites the default implementation to return a fixed value `'texture'`.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {string} The input type.
   */
  getInputType() {
    return "texture";
  }
  /**
   * Returns a default uvs based on the current texture's channel.
   *
   * @return {AttributeNode<vec2>} The default uvs.
   */
  getDefaultUV() {
    return uv$1(this.value.channel);
  }
  /**
   * Overwritten to always return the texture reference of the node.
   *
   * @param {any} state - This method can be invocated in different contexts so `state` can refer to any object type.
   * @return {Texture} The texture reference.
   */
  updateReference() {
    return this.value;
  }
  /**
   * Transforms the given uv node with the texture transformation matrix.
   *
   * @param {Node} uvNode - The uv node to transform.
   * @return {Node} The transformed uv node.
   */
  getTransformedUV(uvNode) {
    if (this._matrixUniform === null) this._matrixUniform = uniform(this.value.matrix);
    return this._matrixUniform.mul(vec3(uvNode, 1)).xy;
  }
  /**
   * Defines whether the uv transformation matrix should automatically be updated or not.
   *
   * @param {boolean} value - The update toggle.
   * @return {TextureNode} A reference to this node.
   */
  setUpdateMatrix(value) {
    this.updateMatrix = value;
    return this;
  }
  /**
   * Setups the uv node. Depending on the backend as well as texture's image and type, it might be necessary
   * to modify the uv node for correct sampling.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @param {Node} uvNode - The uv node to setup.
   * @return {Node} The updated uv node.
   */
  setupUV(builder, uvNode) {
    if (builder.isFlipY()) {
      if (this._flipYUniform === null) this._flipYUniform = uniform(false);
      uvNode = uvNode.toVar();
      if (this.sampler) {
        uvNode = this._flipYUniform.select(uvNode.flipY(), uvNode);
      } else {
        uvNode = this._flipYUniform.select(uvNode.setY(int(textureSize(this, this.levelNode).y).sub(uvNode.y).sub(1)), uvNode);
      }
    }
    return uvNode;
  }
  /**
   * Setups texture node by preparing the internal nodes for code generation.
   *
   * @param {NodeBuilder} builder - The current node builder.
   */
  setup(builder) {
    const properties = builder.getNodeProperties(this);
    properties.referenceNode = this.referenceNode;
    const texture2 = this.value;
    if (!texture2 || texture2.isTexture !== true) {
      throw new NodeError("THREE.TSL: `texture( value )` function expects a valid instance of THREE.Texture().", this.stackTrace);
    }
    const uvNode = Fn(() => {
      let uvNode2 = this.uvNode;
      if ((uvNode2 === null || builder.context.forceUVContext === true) && builder.context.getUV) {
        uvNode2 = builder.context.getUV(this, builder);
      }
      if (!uvNode2) uvNode2 = this.getDefaultUV();
      if (this.updateMatrix === true) {
        uvNode2 = this.getTransformedUV(uvNode2);
      }
      uvNode2 = this.setupUV(builder, uvNode2);
      this.updateType = this._matrixUniform !== null || this._flipYUniform !== null ? NodeUpdateType.OBJECT : NodeUpdateType.NONE;
      return uvNode2;
    })();
    let levelNode = this.levelNode;
    if (levelNode === null && builder.context.getTextureLevel) {
      levelNode = builder.context.getTextureLevel(this);
    }
    let compareNode = null;
    let compareStepNode = null;
    if (this.compareNode !== null) {
      if (builder.renderer.hasCompatibility(Compatibility.TEXTURE_COMPARE)) {
        compareNode = this.compareNode;
      } else {
        const compareFunction = texture2.compareFunction;
        if (compareFunction === null || compareFunction === LessCompare || compareFunction === LessEqualCompare || compareFunction === GreaterCompare || compareFunction === GreaterEqualCompare) {
          compareStepNode = this.compareNode;
        } else {
          compareNode = this.compareNode;
          warnOnce('TSL: Only "LessCompare", "LessEqualCompare", "GreaterCompare" and "GreaterEqualCompare" are supported for depth texture comparison fallback.');
        }
      }
    }
    properties.uvNode = uvNode;
    properties.levelNode = levelNode;
    properties.biasNode = this.biasNode;
    properties.compareNode = compareNode;
    properties.compareStepNode = compareStepNode;
    properties.gradNode = this.gradNode;
    properties.gatherNode = this.gatherNode;
    properties.depthNode = this.depthNode;
    properties.offsetNode = this.offsetNode;
  }
  /**
   * Generates the uv code snippet.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @param {Node} uvNode - The uv node to generate code for.
   * @return {string} The generated code snippet.
   */
  generateUV(builder, uvNode) {
    return uvNode.build(builder, this.sampler === true ? "vec2" : "ivec2");
  }
  /**
   * Generates the offset code snippet.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @param {Node} offsetNode - The offset node to generate code for.
   * @return {string} The generated code snippet.
   */
  generateOffset(builder, offsetNode) {
    return offsetNode.build(builder, "ivec2");
  }
  /**
   * Generates the snippet for the texture sampling.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @param {string} textureProperty - The texture property.
   * @param {string} uvSnippet - The uv snippet.
   * @param {?string} levelSnippet - The level snippet.
   * @param {?string} biasSnippet - The bias snippet.
   * @param {?string} depthSnippet - The depth snippet.
   * @param {?string} compareSnippet - The compare snippet.
   * @param {?Array<string>} gradSnippet - The grad snippet.
   * @param {?string} gatherSnippet - The gather snippet.
   * @param {?string} offsetSnippet - The offset snippet.
   * @param {?string} flipYSnippet - The y-flip snippet. Only used for WebGL.
   * @return {string} The generated code snippet.
   */
  generateSnippet(builder, textureProperty, uvSnippet, levelSnippet, biasSnippet, depthSnippet, compareSnippet, gradSnippet, gatherSnippet, offsetSnippet, flipYSnippet) {
    const texture2 = this.value;
    let snippet;
    if (biasSnippet) {
      snippet = builder.generateTextureBias(texture2, textureProperty, uvSnippet, biasSnippet, depthSnippet, offsetSnippet);
    } else if (gradSnippet) {
      snippet = builder.generateTextureGrad(texture2, textureProperty, uvSnippet, gradSnippet, depthSnippet, offsetSnippet);
    } else if (gatherSnippet) {
      if (compareSnippet) {
        snippet = builder.generateTextureGatherCompare(texture2, textureProperty, uvSnippet, compareSnippet, depthSnippet, offsetSnippet, flipYSnippet);
      } else {
        snippet = builder.generateTextureGather(texture2, textureProperty, uvSnippet, gatherSnippet, depthSnippet, offsetSnippet, flipYSnippet);
      }
    } else if (compareSnippet) {
      snippet = builder.generateTextureCompare(texture2, textureProperty, uvSnippet, compareSnippet, depthSnippet, offsetSnippet);
    } else if (this.sampler === false) {
      snippet = builder.generateTextureLoad(texture2, textureProperty, uvSnippet, levelSnippet, depthSnippet, offsetSnippet);
    } else if (levelSnippet) {
      snippet = builder.generateTextureLevel(texture2, textureProperty, uvSnippet, levelSnippet, depthSnippet, offsetSnippet);
    } else {
      snippet = builder.generateTexture(texture2, textureProperty, uvSnippet, depthSnippet, offsetSnippet);
    }
    return snippet;
  }
  /**
   * Generates the code snippet of the texture node.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @param {string} output - The current output.
   * @return {string} The generated code snippet.
   */
  generate(builder, output2) {
    const texture2 = this.value;
    const properties = builder.getNodeProperties(this);
    const textureProperty = super.generate(builder, "property");
    if (/^sampler/.test(output2)) {
      return textureProperty + "_sampler";
    } else if (builder.isReference(output2)) {
      return textureProperty;
    } else {
      const nodeData = builder.getDataFromNode(this);
      let nodeType = this.getNodeType(builder);
      let propertyName = nodeData.propertyName;
      if (propertyName === void 0) {
        const { uvNode, levelNode, biasNode, compareNode, compareStepNode, depthNode, gradNode, gatherNode, offsetNode } = properties;
        const uvSnippet = this.generateUV(builder, uvNode);
        const levelSnippet = levelNode ? levelNode.build(builder, "float") : null;
        const biasSnippet = biasNode ? biasNode.build(builder, "float") : null;
        const depthSnippet = depthNode ? depthNode.build(builder, "int") : null;
        const compareSnippet = compareNode ? compareNode.build(builder, "float") : null;
        const compareStepSnippet = compareStepNode ? compareStepNode.build(builder, "float") : null;
        const gradSnippet = gradNode ? [gradNode[0].build(builder, "vec2"), gradNode[1].build(builder, "vec2")] : null;
        const gatherSnippet = gatherNode ? gatherNode.build(builder, "int") : null;
        const offsetSnippet = offsetNode ? this.generateOffset(builder, offsetNode) : null;
        const flipYSnippet = this._flipYUniform ? this._flipYUniform.build(builder, "bool") : null;
        if (gatherSnippet) {
          nodeType = "vec4";
        }
        let finalDepthSnippet = depthSnippet;
        if (finalDepthSnippet === null && texture2.isArrayTexture && this.isTexture3DNode !== true) {
          finalDepthSnippet = "0";
        }
        const nodeVar = builder.getVarFromNode(this);
        propertyName = builder.getPropertyName(nodeVar);
        let snippet2 = this.generateSnippet(builder, textureProperty, uvSnippet, levelSnippet, biasSnippet, finalDepthSnippet, compareSnippet, gradSnippet, gatherSnippet, offsetSnippet, flipYSnippet);
        if (compareStepSnippet !== null) {
          const compareFunction = texture2.compareFunction;
          if (compareFunction === GreaterCompare || compareFunction === GreaterEqualCompare) {
            snippet2 = step(expression(snippet2, nodeType), expression(compareStepSnippet, "float")).build(builder, nodeType);
          } else {
            snippet2 = step(expression(compareStepSnippet, "float"), expression(snippet2, nodeType)).build(builder, nodeType);
          }
        }
        builder.addLineFlowCode(`${propertyName} = ${snippet2}`, this);
        nodeData.snippet = snippet2;
        nodeData.propertyName = propertyName;
      }
      let snippet = propertyName;
      if (builder.needsToWorkingColorSpace(texture2)) {
        snippet = colorSpaceToWorking(expression(snippet, nodeType), texture2.colorSpace).setup(builder).build(builder, nodeType);
      }
      return builder.format(snippet, nodeType, output2);
    }
  }
  /**
   * Sets the sampler value.
   *
   * @param {boolean} value - The sampler value to set.
   * @return {TextureNode} A reference to this texture node.
   */
  setSampler(value) {
    this.sampler = value;
    return this;
  }
  /**
   * Returns the sampler value.
   *
   * @return {boolean} The sampler value.
   */
  getSampler() {
    return this.sampler;
  }
  // @TODO: Move to TSL
  /**
   * Samples the texture with the given uv node.
   *
   * @param {Node} uvNode - The uv node.
   * @return {TextureNode} A texture node representing the texture sample.
   */
  sample(uvNode) {
    const textureNode = this.clone();
    textureNode.uvNode = nodeObject(uvNode);
    textureNode.referenceNode = this.getBase();
    return nodeObject(textureNode);
  }
  /**
   * TSL function for creating a texture node that fetches/loads texels without interpolation.
   *
   * @param {Node<uvec2>} uvNode - The uv node.
   * @returns {TextureNode} A texture node representing the texture load.
   */
  load(uvNode) {
    return this.sample(uvNode).setSampler(false);
  }
  /**
   * Samples a blurred version of the texture by defining an internal bias.
   *
   * @param {Node<float>} amountNode - How blurred the texture should be.
   * @return {TextureNode} A texture node representing the texture sample.
   */
  blur(amountNode) {
    const textureNode = this.clone();
    textureNode.biasNode = nodeObject(amountNode).mul(maxMipLevel(textureNode));
    textureNode.referenceNode = this.getBase();
    const map = textureNode.value;
    if (textureNode.generateMipmaps === false && (map && map.generateMipmaps === false || map.minFilter === NearestFilter || map.magFilter === NearestFilter)) {
      warn("TSL: texture().blur() requires mipmaps and sampling. Use .generateMipmaps=true and .minFilter/.magFilter=THREE.LinearFilter in the Texture.");
      textureNode.biasNode = null;
    }
    return nodeObject(textureNode);
  }
  /**
   * Samples a specific mip of the texture.
   *
   * @param {Node<int>} levelNode - The mip level to sample.
   * @return {TextureNode} A texture node representing the texture sample.
   */
  level(levelNode) {
    const textureNode = this.clone();
    textureNode.levelNode = nodeObject(levelNode);
    textureNode.referenceNode = this.getBase();
    return nodeObject(textureNode);
  }
  /**
   * Returns the texture size of the requested level.
   *
   * @param {Node<int>} levelNode - The level to compute the size for.
   * @return {TextureSizeNode} The texture size.
   */
  size(levelNode) {
    return textureSize(this, levelNode);
  }
  /**
   * Samples the texture with the given bias.
   *
   * @param {Node<float>} biasNode - The bias node.
   * @return {TextureNode} A texture node representing the texture sample.
   */
  bias(biasNode) {
    const textureNode = this.clone();
    textureNode.biasNode = nodeObject(biasNode);
    textureNode.referenceNode = this.getBase();
    return nodeObject(textureNode);
  }
  /**
   * Returns the base texture of this node.
   * @return {TextureNode} The base texture node.
   */
  getBase() {
    return this.referenceNode ? this.referenceNode.getBase() : this;
  }
  /**
   * Samples the texture by executing a compare operation.
   *
   * @param {Node<float>} compareNode - The node that defines the compare value.
   * @return {TextureNode} A texture node representing the texture sample.
   */
  compare(compareNode) {
    const textureNode = this.clone();
    textureNode.compareNode = nodeObject(compareNode);
    textureNode.referenceNode = this.getBase();
    return nodeObject(textureNode);
  }
  /**
   * Samples the texture using an explicit gradient.
   *
   * @param {Node<vec2>} gradNodeX - The gradX node.
   * @param {Node<vec2>} gradNodeY - The gradY node.
   * @return {TextureNode} A texture node representing the texture sample.
   */
  grad(gradNodeX, gradNodeY) {
    const textureNode = this.clone();
    textureNode.gradNode = [nodeObject(gradNodeX), nodeObject(gradNodeY)];
    textureNode.referenceNode = this.getBase();
    return nodeObject(textureNode);
  }
  /**
   * Gathers four texels from the texture.
   *
   * @param {Node<int>} gatherNode - The index of the channel to read. This must be in range [0, 3] and a compile-time constant.
   * @return {TextureNode} A texture node representing the texture sample.
   */
  gather(gatherNode = 0) {
    const textureNode = this.clone();
    textureNode.gatherNode = nodeObject(gatherNode);
    textureNode.referenceNode = this.getBase();
    return nodeObject(textureNode);
  }
  /**
   * Samples the texture by defining a depth node.
   *
   * @param {Node<int>} depthNode - The depth node.
   * @return {TextureNode} A texture node representing the texture sample.
   */
  depth(depthNode) {
    const textureNode = this.clone();
    textureNode.depthNode = nodeObject(depthNode);
    textureNode.referenceNode = this.getBase();
    return nodeObject(textureNode);
  }
  /**
   * Samples the texture by defining an offset node.
   *
   * @param {Node<ivec2>} offsetNode - The offset node.
   * @return {TextureNode} A texture node representing the texture sample.
   */
  offset(offsetNode) {
    const textureNode = this.clone();
    textureNode.offsetNode = nodeObject(offsetNode);
    textureNode.referenceNode = this.getBase();
    return nodeObject(textureNode);
  }
  // --
  serialize(data) {
    super.serialize(data);
    data.value = this.value.toJSON(data.meta).uuid;
    data.sampler = this.sampler;
    data.updateMatrix = this.updateMatrix;
    data.updateType = this.updateType;
  }
  deserialize(data) {
    super.deserialize(data);
    this.value = data.meta.textures[data.value];
    this.sampler = data.sampler;
    this.updateMatrix = data.updateMatrix;
    this.updateType = data.updateType;
  }
  /**
   * The update is used to implement the update of the uv transformation matrix.
   */
  update() {
    const texture2 = this.value;
    const matrixUniform = this._matrixUniform;
    if (matrixUniform !== null) matrixUniform.value = texture2.matrix;
    if (texture2.matrixAutoUpdate === true) {
      texture2.updateMatrix();
    }
    const flipYUniform = this._flipYUniform;
    if (flipYUniform !== null) {
      flipYUniform.value = texture2.image instanceof ImageBitmap && texture2.flipY === true || texture2.isRenderTargetTexture === true || texture2.isFramebufferTexture === true || texture2.isDepthTexture === true;
    }
  }
  /**
   * Clones the texture node.
   *
   * @return {TextureNode} The cloned texture node.
   */
  clone() {
    const newNode = new this.constructor(this.value, this.uvNode, this.levelNode, this.biasNode);
    newNode.sampler = this.sampler;
    newNode.depthNode = this.depthNode;
    newNode.compareNode = this.compareNode;
    newNode.gradNode = this.gradNode;
    newNode.gatherNode = this.gatherNode;
    newNode.offsetNode = this.offsetNode;
    return newNode;
  }
};
var textureBase = /* @__PURE__ */ nodeProxy(TextureNode).setParameterLength(1, 4).setName("texture");
var texture = (value = EmptyTexture$1, uvNode = null, levelNode = null, biasNode = null) => {
  let textureNode;
  if (value && value.isTextureNode === true) {
    textureNode = nodeObject(value.clone());
    textureNode.referenceNode = value.getBase();
    if (uvNode !== null) textureNode.uvNode = nodeObject(uvNode);
    if (levelNode !== null) textureNode.levelNode = nodeObject(levelNode);
    if (biasNode !== null) textureNode.biasNode = nodeObject(biasNode);
  } else {
    textureNode = textureBase(value, uvNode, levelNode, biasNode);
  }
  return textureNode;
};
var BufferNode = class extends UniformNode {
  static get type() {
    return "BufferNode";
  }
  /**
   * Constructs a new buffer node.
   *
   * @param {Array<number>} value - Array-like buffer data.
   * @param {string} bufferType - The data type of the buffer.
   * @param {number} [bufferCount=0] - The count of buffer elements.
   */
  constructor(value, bufferType, bufferCount = 0) {
    super(value, bufferType);
    this.isBufferNode = true;
    this.bufferType = bufferType;
    this.bufferCount = bufferCount;
    this.updateRanges = [];
  }
  /**
   * Adds a range of data in the data array to be updated on the GPU.
   *
   * @param {number} start - Position at which to start update.
   * @param {number} count - The number of components to update.
   */
  addUpdateRange(start, count) {
    this.updateRanges.push({ start, count });
  }
  /**
   * Clears the update ranges.
   */
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  /**
   * The data type of the buffer elements.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {string} The element type.
   */
  getElementType(builder) {
    return this.getNodeType(builder);
  }
  /**
   * Overwrites the default implementation to return a fixed value `'buffer'`.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {string} The input type.
   */
  getInputType() {
    return "buffer";
  }
};
var buffer = (value, type, count) => new BufferNode(value, type, count);
var UniformArrayElementNode = class extends ArrayElementNode {
  static get type() {
    return "UniformArrayElementNode";
  }
  /**
   * Constructs a new buffer node.
   *
   * @param {UniformArrayNode} uniformArrayNode - The uniform array node to access.
   * @param {IndexNode} indexNode - The index data that define the position of the accessed element in the array.
   */
  constructor(uniformArrayNode, indexNode) {
    super(uniformArrayNode, indexNode);
    this.isArrayBufferElementNode = true;
  }
  generate(builder) {
    const snippet = super.generate(builder);
    const type = this.getNodeType(builder);
    const paddedType = this.node.getPaddedType();
    return builder.format(snippet, paddedType, type);
  }
};
var UniformArrayNode = class extends BufferNode {
  static get type() {
    return "UniformArrayNode";
  }
  /**
   * Constructs a new uniform array node.
   *
   * @param {Array<any>} value - Array holding the buffer data.
   * @param {?string} [elementType=null] - The data type of a buffer element.
   */
  constructor(value, elementType = null) {
    super(null);
    this.array = value;
    this.elementType = elementType === null ? getValueType(value[0]) : elementType;
    this.paddedType = this.getPaddedType();
    this.updateType = NodeUpdateType.RENDER;
    this.isArrayBufferNode = true;
  }
  /**
   * This method is overwritten since the node type is inferred from the
   * {@link UniformArrayNode#paddedType}.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {string} The node type.
   */
  generateNodeType() {
    return this.paddedType;
  }
  /**
   * The data type of the array elements.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {string} The element type.
   */
  getElementType() {
    return this.elementType;
  }
  /**
   * Returns the padded type based on the element type.
   *
   * @return {string} The padded type.
   */
  getPaddedType() {
    const elementType = this.elementType;
    let paddedType = "vec4";
    if (elementType === "mat2") {
      paddedType = "mat2";
    } else if (/mat/.test(elementType) === true) {
      paddedType = "mat4";
    } else if (elementType.charAt(0) === "i") {
      paddedType = "ivec4";
    } else if (elementType.charAt(0) === "u") {
      paddedType = "uvec4";
    }
    return paddedType;
  }
  /**
   * The update makes sure to correctly transfer the data from the (complex) objects
   * in the array to the internal, correctly padded value buffer.
   *
   * @param {NodeFrame} frame - A reference to the current node frame.
   */
  update() {
    const { array: array2, value } = this;
    const elementType = this.elementType;
    if (elementType === "float" || elementType === "int" || elementType === "uint") {
      for (let i = 0; i < array2.length; i++) {
        const index = i * 4;
        value[index] = array2[i];
      }
    } else if (elementType === "color") {
      for (let i = 0; i < array2.length; i++) {
        const index = i * 4;
        const vector = array2[i];
        value[index] = vector.r;
        value[index + 1] = vector.g;
        value[index + 2] = vector.b || 0;
      }
    } else if (elementType === "mat2") {
      for (let i = 0; i < array2.length; i++) {
        const index = i * 4;
        const matrix = array2[i];
        value[index] = matrix.elements[0];
        value[index + 1] = matrix.elements[1];
        value[index + 2] = matrix.elements[2];
        value[index + 3] = matrix.elements[3];
      }
    } else if (elementType === "mat3") {
      for (let i = 0; i < array2.length; i++) {
        const index = i * 16;
        const matrix = array2[i];
        value[index] = matrix.elements[0];
        value[index + 1] = matrix.elements[1];
        value[index + 2] = matrix.elements[2];
        value[index + 4] = matrix.elements[3];
        value[index + 5] = matrix.elements[4];
        value[index + 6] = matrix.elements[5];
        value[index + 8] = matrix.elements[6];
        value[index + 9] = matrix.elements[7];
        value[index + 10] = matrix.elements[8];
        value[index + 15] = 1;
      }
    } else if (elementType === "mat4") {
      for (let i = 0; i < array2.length; i++) {
        const index = i * 16;
        const matrix = array2[i];
        for (let i2 = 0; i2 < matrix.elements.length; i2++) {
          value[index + i2] = matrix.elements[i2];
        }
      }
    } else {
      for (let i = 0; i < array2.length; i++) {
        const index = i * 4;
        const vector = array2[i];
        value[index] = vector.x;
        value[index + 1] = vector.y;
        value[index + 2] = vector.z || 0;
        value[index + 3] = vector.w || 0;
      }
    }
  }
  /**
   * Implement the value buffer creation based on the array data.
   *
   * @param {NodeBuilder} builder - A reference to the current node builder.
   * @return {null}
   */
  setup(builder) {
    const length2 = this.array.length;
    const elementType = this.elementType;
    let arrayType = Float32Array;
    const paddedType = this.paddedType;
    const paddedElementLength = builder.getTypeLength(paddedType);
    if (elementType.charAt(0) === "i") arrayType = Int32Array;
    if (elementType.charAt(0) === "u") arrayType = Uint32Array;
    this.value = new arrayType(length2 * paddedElementLength);
    this.bufferCount = length2;
    this.bufferType = paddedType;
    this.update();
    return super.setup(builder);
  }
  /**
   * Overwrites the default `element()` method to provide element access
   * based on {@link UniformArrayNode}.
   *
   * @param {IndexNode} indexNode - The index node.
   * @return {UniformArrayElementNode}
   */
  element(indexNode) {
    return new UniformArrayElementNode(this, nodeObject(indexNode));
  }
};
var uniformArray = (values, nodeType) => new UniformArrayNode(values, nodeType);
var BuiltinNode = class extends Node {
  /**
   * Constructs a new builtin node.
   *
   * @param {string} name - The name of the built-in shader variable.
   */
  constructor(name) {
    super("float");
    this.name = name;
    this.isBuiltinNode = true;
  }
  /**
   * Generates the code snippet of the builtin node.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {string} The generated code snippet.
   */
  generate() {
    return this.name;
  }
};
var builtin = nodeProxy(BuiltinNode).setParameterLength(1);
var _screenSizeVec;
var _viewportVec;
var ScreenNode = class _ScreenNode extends Node {
  static get type() {
    return "ScreenNode";
  }
  /**
   * Constructs a new screen node.
   *
   * @param {('coordinate'|'viewport'|'size'|'uv'|'dpr')} scope - The node's scope.
   */
  constructor(scope) {
    super();
    this.scope = scope;
    this._output = null;
    this.isViewportNode = true;
  }
  /**
   * This method is overwritten since the node type depends on the selected scope.
   *
   * @return {('float'|'vec2'|'vec4')} The node type.
   */
  generateNodeType() {
    if (this.scope === _ScreenNode.DPR) return "float";
    if (this.scope === _ScreenNode.VIEWPORT) return "vec4";
    else return "vec2";
  }
  /**
   * This method is overwritten since the node's update type depends on the selected scope.
   *
   * @return {NodeUpdateType} The update type.
   */
  getUpdateType() {
    let updateType = NodeUpdateType.NONE;
    if (this.scope === _ScreenNode.SIZE || this.scope === _ScreenNode.VIEWPORT || this.scope === _ScreenNode.DPR) {
      updateType = NodeUpdateType.RENDER;
    }
    this.updateType = updateType;
    return updateType;
  }
  /**
   * `ScreenNode` implements {@link Node#update} to retrieve viewport and size information
   * from the current renderer.
   *
   * @param {NodeFrame} frame - A reference to the current node frame.
   */
  update({ renderer }) {
    const renderTarget = renderer.getRenderTarget();
    if (this.scope === _ScreenNode.VIEWPORT) {
      if (renderTarget !== null) {
        _viewportVec.copy(renderTarget.viewport);
      } else {
        renderer.getViewport(_viewportVec);
        _viewportVec.multiplyScalar(renderer.getPixelRatio());
      }
    } else if (this.scope === _ScreenNode.DPR) {
      this._output.value = renderer.getPixelRatio();
    } else {
      if (renderTarget !== null) {
        _screenSizeVec.width = renderTarget.width;
        _screenSizeVec.height = renderTarget.height;
      } else {
        renderer.getDrawingBufferSize(_screenSizeVec);
      }
    }
  }
  setup() {
    const scope = this.scope;
    let output2 = null;
    if (scope === _ScreenNode.SIZE) {
      output2 = uniform(_screenSizeVec || (_screenSizeVec = new Vector2()));
    } else if (scope === _ScreenNode.VIEWPORT) {
      output2 = uniform(_viewportVec || (_viewportVec = new Vector4()));
    } else if (scope === _ScreenNode.DPR) {
      output2 = uniform(1);
    } else {
      output2 = vec2(screenCoordinate.div(screenSize));
    }
    this._output = output2;
    return output2;
  }
  generate(builder) {
    if (this.scope === _ScreenNode.COORDINATE) {
      let coord = builder.getFragCoord();
      if (builder.isFlipY()) {
        const size = builder.getNodeProperties(screenSize).outputNode.build(builder);
        coord = `${builder.getType("vec2")}( ${coord}.x, ${size}.y - ${coord}.y )`;
      }
      return coord;
    }
    return super.generate(builder);
  }
};
ScreenNode.COORDINATE = "coordinate";
ScreenNode.VIEWPORT = "viewport";
ScreenNode.SIZE = "size";
ScreenNode.UV = "uv";
ScreenNode.DPR = "dpr";
var screenDPR = /* @__PURE__ */ nodeImmutable(ScreenNode, ScreenNode.DPR);
var screenUV = /* @__PURE__ */ nodeImmutable(ScreenNode, ScreenNode.UV);
var screenSize = /* @__PURE__ */ nodeImmutable(ScreenNode, ScreenNode.SIZE);
var screenCoordinate = /* @__PURE__ */ nodeImmutable(ScreenNode, ScreenNode.COORDINATE);
var viewport = /* @__PURE__ */ nodeImmutable(ScreenNode, ScreenNode.VIEWPORT);
var viewportSize = viewport.zw;
var viewportCoordinate = /* @__PURE__ */ screenCoordinate.sub(viewport.xy);
var _cameraProjectionMatrixBase = null;
var _cameraProjectionMatrixArray = null;
var _cameraProjectionMatrixInverseBase = null;
var _cameraProjectionMatrixInverseArray = null;
var _cameraViewMatrixBase = null;
var _cameraViewMatrixArray = null;
var _cameraWorldMatrixBase = null;
var _cameraWorldMatrixArray = null;
var cameraIndex = /* @__PURE__ */ uniform(0, "uint").setName("u_cameraIndex").setGroup(sharedUniformGroup("cameraIndex")).toVarying("v_cameraIndex");
var cameraNear = /* @__PURE__ */ uniform("float").setName("cameraNear").setGroup(renderGroup).onRenderUpdate(({ camera }) => camera.near);
var cameraFar = /* @__PURE__ */ uniform("float").setName("cameraFar").setGroup(renderGroup).onRenderUpdate(({ camera }) => camera.far);
var cameraProjectionMatrix = /* @__PURE__ */ Fn(({ camera }) => {
  let cameraProjectionMatrix2;
  if (camera.isArrayCamera && camera.cameras.length > 0) {
    const matrices = [];
    for (const subCamera of camera.cameras) {
      matrices.push(subCamera.projectionMatrix);
    }
    if (_cameraProjectionMatrixArray === null) {
      _cameraProjectionMatrixArray = uniformArray(matrices).setGroup(renderGroup).setName("cameraProjectionMatrices");
    } else {
      _cameraProjectionMatrixArray.array = matrices;
    }
    cameraProjectionMatrix2 = _cameraProjectionMatrixArray.element(camera.isMultiViewCamera ? builtin("gl_ViewID_OVR") : cameraIndex);
  } else {
    if (_cameraProjectionMatrixBase === null) {
      _cameraProjectionMatrixBase = uniform(camera.projectionMatrix).setName("cameraProjectionMatrix").setGroup(renderGroup).onRenderUpdate(({ camera: camera2 }) => camera2.projectionMatrix);
    }
    cameraProjectionMatrix2 = _cameraProjectionMatrixBase;
  }
  return cameraProjectionMatrix2;
}).once()();
var cameraProjectionMatrixInverse = /* @__PURE__ */ Fn(({ camera }) => {
  let cameraProjectionMatrixInverse2;
  if (camera.isArrayCamera && camera.cameras.length > 0) {
    const matrices = [];
    for (const subCamera of camera.cameras) {
      matrices.push(subCamera.projectionMatrixInverse);
    }
    if (_cameraProjectionMatrixInverseArray === null) {
      _cameraProjectionMatrixInverseArray = uniformArray(matrices).setGroup(renderGroup).setName("cameraProjectionMatricesInverse");
    } else {
      _cameraProjectionMatrixInverseArray.array = matrices;
    }
    cameraProjectionMatrixInverse2 = _cameraProjectionMatrixInverseArray.element(camera.isMultiViewCamera ? builtin("gl_ViewID_OVR") : cameraIndex);
  } else {
    if (_cameraProjectionMatrixInverseBase === null) {
      _cameraProjectionMatrixInverseBase = uniform(camera.projectionMatrixInverse).setName("cameraProjectionMatrixInverse").setGroup(renderGroup).onRenderUpdate(({ camera: camera2 }) => camera2.projectionMatrixInverse);
    }
    cameraProjectionMatrixInverse2 = _cameraProjectionMatrixInverseBase;
  }
  return cameraProjectionMatrixInverse2;
}).once()();
var cameraViewMatrix = /* @__PURE__ */ Fn(({ camera }) => {
  let cameraViewMatrix2;
  if (camera.isArrayCamera && camera.cameras.length > 0) {
    const matrices = [];
    for (const subCamera of camera.cameras) {
      matrices.push(subCamera.matrixWorldInverse);
    }
    if (_cameraViewMatrixArray === null) {
      _cameraViewMatrixArray = uniformArray(matrices).setGroup(renderGroup).setName("cameraViewMatrices");
    } else {
      _cameraViewMatrixArray.array = matrices;
    }
    cameraViewMatrix2 = _cameraViewMatrixArray.element(camera.isMultiViewCamera ? builtin("gl_ViewID_OVR") : cameraIndex);
  } else {
    if (_cameraViewMatrixBase === null) {
      _cameraViewMatrixBase = uniform(camera.matrixWorldInverse).setName("cameraViewMatrix").setGroup(renderGroup).onRenderUpdate(({ camera: camera2 }) => camera2.matrixWorldInverse);
    }
    cameraViewMatrix2 = _cameraViewMatrixBase;
  }
  return cameraViewMatrix2;
}).once()();
var cameraWorldMatrix = /* @__PURE__ */ Fn(({ camera }) => {
  let cameraWorldMatrix2;
  if (camera.isArrayCamera && camera.cameras.length > 0) {
    const matrices = [];
    for (const subCamera of camera.cameras) {
      matrices.push(subCamera.matrixWorld);
    }
    if (_cameraWorldMatrixArray === null) {
      _cameraWorldMatrixArray = uniformArray(matrices).setGroup(renderGroup).setName("cameraWorldMatrices");
    } else {
      _cameraWorldMatrixArray.array = matrices;
    }
    cameraWorldMatrix2 = _cameraWorldMatrixArray.element(camera.isMultiViewCamera ? builtin("gl_ViewID_OVR") : cameraIndex);
  } else {
    if (_cameraWorldMatrixBase === null) {
      _cameraWorldMatrixBase = uniform(camera.matrixWorld).setName("cameraWorldMatrix").setGroup(renderGroup).onRenderUpdate(({ camera: camera2 }) => camera2.matrixWorld);
    }
    cameraWorldMatrix2 = _cameraWorldMatrixBase;
  }
  return cameraWorldMatrix2;
}).once()();
var _sphere = /* @__PURE__ */ new Sphere();
var Object3DNode = class _Object3DNode extends Node {
  static get type() {
    return "Object3DNode";
  }
  /**
   * Constructs a new object 3D node.
   *
   * @param {('position'|'viewPosition'|'direction'|'scale'|'worldMatrix')} scope - The node represents a different type of transformation depending on the scope.
   * @param {?Object3D} [object3d=null] - The 3D object.
   */
  constructor(scope, object3d = null) {
    super();
    this.scope = scope;
    this.object3d = object3d;
    this.updateType = NodeUpdateType.OBJECT;
    this.uniformNode = new UniformNode(null);
  }
  /**
   * Overwritten since the node type is inferred from the scope.
   *
   * @return {('mat4'|'vec3'|'float')} The node type.
   */
  generateNodeType() {
    const scope = this.scope;
    if (scope === _Object3DNode.WORLD_MATRIX) {
      return "mat4";
    } else if (scope === _Object3DNode.POSITION || scope === _Object3DNode.VIEW_POSITION || scope === _Object3DNode.DIRECTION || scope === _Object3DNode.SCALE) {
      return "vec3";
    } else if (scope === _Object3DNode.RADIUS) {
      return "float";
    }
  }
  /**
   * Updates the uniform value depending on the scope.
   *
   * @param {NodeFrame} frame - The current node frame.
   */
  update(frame) {
    const object = this.object3d;
    const uniformNode = this.uniformNode;
    const scope = this.scope;
    if (scope === _Object3DNode.WORLD_MATRIX) {
      uniformNode.value = object.matrixWorld;
    } else if (scope === _Object3DNode.POSITION) {
      uniformNode.value = uniformNode.value || new Vector3();
      uniformNode.value.setFromMatrixPosition(object.matrixWorld);
    } else if (scope === _Object3DNode.SCALE) {
      uniformNode.value = uniformNode.value || new Vector3();
      uniformNode.value.setFromMatrixScale(object.matrixWorld);
    } else if (scope === _Object3DNode.DIRECTION) {
      uniformNode.value = uniformNode.value || new Vector3();
      object.getWorldDirection(uniformNode.value);
    } else if (scope === _Object3DNode.VIEW_POSITION) {
      const camera = frame.camera;
      uniformNode.value = uniformNode.value || new Vector3();
      uniformNode.value.setFromMatrixPosition(object.matrixWorld);
      uniformNode.value.applyMatrix4(camera.matrixWorldInverse);
    } else if (scope === _Object3DNode.RADIUS) {
      const geometry = frame.object.geometry;
      if (geometry.boundingSphere === null) geometry.computeBoundingSphere();
      _sphere.copy(geometry.boundingSphere).applyMatrix4(object.matrixWorld);
      uniformNode.value = _sphere.radius;
    }
  }
  /**
   * Generates the code snippet of the uniform node. The node type of the uniform
   * node also depends on the selected scope.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {string} The generated code snippet.
   */
  generate(builder) {
    const scope = this.scope;
    if (scope === _Object3DNode.WORLD_MATRIX) {
      this.uniformNode.nodeType = "mat4";
    } else if (scope === _Object3DNode.POSITION || scope === _Object3DNode.VIEW_POSITION || scope === _Object3DNode.DIRECTION || scope === _Object3DNode.SCALE) {
      this.uniformNode.nodeType = "vec3";
    } else if (scope === _Object3DNode.RADIUS) {
      this.uniformNode.nodeType = "float";
    }
    return this.uniformNode.build(builder);
  }
  serialize(data) {
    super.serialize(data);
    data.scope = this.scope;
  }
  deserialize(data) {
    super.deserialize(data);
    this.scope = data.scope;
  }
};
Object3DNode.WORLD_MATRIX = "worldMatrix";
Object3DNode.POSITION = "position";
Object3DNode.SCALE = "scale";
Object3DNode.VIEW_POSITION = "viewPosition";
Object3DNode.DIRECTION = "direction";
Object3DNode.RADIUS = "radius";
var ModelNode = class extends Object3DNode {
  static get type() {
    return "ModelNode";
  }
  /**
   * Constructs a new object model node.
   *
   * @param {('position'|'viewPosition'|'direction'|'scale'|'worldMatrix')} scope - The node represents a different type of transformation depending on the scope.
   */
  constructor(scope) {
    super(scope);
  }
  /**
   * Extracts the model reference from the frame state and then
   * updates the uniform value depending on the scope.
   *
   * @param {NodeFrame} frame - The current node frame.
   */
  update(frame) {
    this.object3d = frame.object;
    super.update(frame);
  }
};
var modelDirection = /* @__PURE__ */ nodeImmutable(ModelNode, ModelNode.DIRECTION);
var modelWorldMatrix = /* @__PURE__ */ nodeImmutable(ModelNode, ModelNode.WORLD_MATRIX);
var modelPosition = /* @__PURE__ */ nodeImmutable(ModelNode, ModelNode.POSITION);
var modelScale = /* @__PURE__ */ nodeImmutable(ModelNode, ModelNode.SCALE);
var modelViewPosition = /* @__PURE__ */ nodeImmutable(ModelNode, ModelNode.VIEW_POSITION);
var modelRadius = /* @__PURE__ */ nodeImmutable(ModelNode, ModelNode.RADIUS);
var modelNormalMatrix = /* @__PURE__ */ uniform(new Matrix3()).onObjectUpdate(({ object }, self2) => self2.value.getNormalMatrix(object.matrixWorld));
var modelViewMatrix = /* @__PURE__ */ Fn((builder) => {
  return builder.context.modelViewMatrix || mediumpModelViewMatrix;
}).once()().toVar("modelViewMatrix");
var mediumpModelViewMatrix = /* @__PURE__ */ cameraViewMatrix.mul(modelWorldMatrix);
var clipSpace = /* @__PURE__ */ Fn((builder) => {
  if (builder.shaderStage !== "fragment") {
    warnOnce("TSL: `clipSpace` is only available in fragment stage.");
    return vec4();
  }
  return builder.context.clipSpace.toVarying("v_clipSpace");
}).once()();
var positionGeometry = /* @__PURE__ */ attribute("position", "vec3");
var positionLocal = /* @__PURE__ */ positionGeometry.toVarying("positionLocal");
var positionWorld = /* @__PURE__ */ Fn((builder) => {
  return modelWorldMatrix.mul(positionLocal).xyz.toVarying(builder.getSubBuildProperty("v_positionWorld"));
}, "vec3").once(["POSITION"])();
var positionView = /* @__PURE__ */ Fn((builder) => {
  if (builder.shaderStage === "fragment" && builder.material.vertexNode) {
    const viewPos = cameraProjectionMatrixInverse.mul(clipSpace);
    return viewPos.xyz.div(viewPos.w).toVar("positionView");
  }
  return builder.context.setupPositionView().toVarying("v_positionView");
}, "vec3").once(["POSITION", "VERTEX"])();
var positionViewDirection = /* @__PURE__ */ Fn((builder) => {
  let output2;
  if (builder.camera.isOrthographicCamera) {
    output2 = vec3(0, 0, 1);
  } else {
    output2 = positionView.negate().toVarying("v_positionViewDirection").normalize();
  }
  return output2.toVar("positionViewDirection");
}, "vec3").once(["POSITION"])();
var FrontFacingNode = class extends Node {
  static get type() {
    return "FrontFacingNode";
  }
  /**
   * Constructs a new front facing node.
   */
  constructor() {
    super("bool");
    this.isFrontFacingNode = true;
  }
  generate(builder) {
    if (builder.shaderStage !== "fragment") return "true";
    const { material } = builder;
    if (material.side === BackSide) {
      return "false";
    }
    return builder.getFrontFacing();
  }
};
var frontFacing = /* @__PURE__ */ nodeImmutable(FrontFacingNode);
var faceDirection = /* @__PURE__ */ float(frontFacing).mul(2).sub(1);
var negateOnBackSide = /* @__PURE__ */ Fn(([vector], { material }) => {
  const side = material.side;
  if (side === BackSide) {
    vector = vector.mul(-1);
  } else if (side === DoubleSide) {
    vector = vector.mul(faceDirection);
  }
  return vector;
});
var normalGeometry = /* @__PURE__ */ attribute("normal", "vec3");
var normalLocal = /* @__PURE__ */ Fn((builder) => {
  if (builder.geometry.hasAttribute("normal") === false) {
    warn('TSL: Vertex attribute "normal" not found on geometry.');
    return vec3(0, 1, 0);
  }
  return normalGeometry;
}, "vec3").once()().toVar("normalLocal");
var normalFlat = /* @__PURE__ */ positionView.dFdx().cross(positionView.dFdy()).normalize().toVar("normalFlat");
var normalViewGeometry = /* @__PURE__ */ Fn((builder) => {
  let node;
  if (builder.isFlatShading()) {
    node = normalFlat;
  } else {
    node = transformNormalToView(normalLocal).toVarying("v_normalViewGeometry").normalize();
  }
  return node;
}, "vec3").once()().toVar("normalViewGeometry");
var normalView = /* @__PURE__ */ Fn((builder) => {
  let node;
  if (builder.subBuildFn === "NORMAL" || builder.subBuildFn === "VERTEX") {
    node = normalViewGeometry;
    if (builder.isFlatShading() !== true) {
      node = negateOnBackSide(node);
    }
  } else {
    node = builder.context.setupNormal().context({ getUV: null, getTextureLevel: null });
  }
  return node;
}, "vec3").once(["NORMAL", "VERTEX"])().toVar("normalView");
var normalWorld = /* @__PURE__ */ normalView.transformNormalByInverseViewMatrix(cameraViewMatrix).toVar("normalWorld");
var clearcoatNormalView = /* @__PURE__ */ Fn(({ subBuildFn, context: context2 }) => {
  let node;
  if (subBuildFn === "NORMAL" || subBuildFn === "VERTEX") {
    node = normalView;
  } else {
    node = context2.setupClearcoatNormal().context({ getUV: null, getTextureLevel: null });
  }
  return node;
}, "vec3").once(["NORMAL", "VERTEX"])().toVar("clearcoatNormalView");
var transformNormal = /* @__PURE__ */ Fn(([normal2, matrix = modelWorldMatrix]) => {
  const normalMatrix = mat3(matrix).inverse().transpose();
  return normalMatrix.mul(normal2).normalize();
});
addMethodChaining("transformNormal", transformNormal);
var transformNormalToView = /* @__PURE__ */ Fn(([normal2], builder) => {
  const modelNormalViewMatrix = builder.context.modelNormalViewMatrix;
  if (modelNormalViewMatrix) {
    return normal2.transformNormalByViewMatrix(modelNormalViewMatrix);
  }
  const transformedNormal = modelNormalMatrix.mul(normal2);
  return transformedNormal.transformNormalByViewMatrix(cameraViewMatrix);
});
var transformedNormalView = Fn(() => {
  warn('TSL: "transformedNormalView" is deprecated. Use "normalView" instead.');
  return normalView;
}).once(["NORMAL", "VERTEX"])();
var transformedNormalWorld = Fn(() => {
  warn('TSL: "transformedNormalWorld" is deprecated. Use "normalWorld" instead.');
  return normalWorld;
}).once(["NORMAL", "VERTEX"])();
var transformedClearcoatNormalView = Fn(() => {
  warn('TSL: "transformedClearcoatNormalView" is deprecated. Use "clearcoatNormalView" instead.');
  return clearcoatNormalView;
}).once(["NORMAL", "VERTEX"])();
var _m1$12 = /* @__PURE__ */ new Matrix4();
var materialRefractionRatio = /* @__PURE__ */ uniform(0).onReference(({ material }) => material).onObjectUpdate(({ material }) => material.refractionRatio);
var materialEnvRotation = /* @__PURE__ */ uniform(new Matrix4()).onReference(function(frame) {
  return frame.material;
}).onObjectUpdate(function({ material, scene }) {
  const hasSceneEnvironment = scene.environment !== null || scene.environmentNode && scene.environmentNode.isNode;
  const rotation = hasSceneEnvironment && material.envMap === null ? scene.environmentRotation : material.envMapRotation;
  if (rotation) {
    _m1$12.makeRotationFromEuler(rotation).transpose();
  } else {
    _m1$12.identity();
  }
  return _m1$12;
});
var reflectView = /* @__PURE__ */ positionViewDirection.negate().reflect(normalView);
var refractView = /* @__PURE__ */ positionViewDirection.negate().refract(normalView, materialRefractionRatio);
var reflectVector = /* @__PURE__ */ reflectView.transformDirection(cameraWorldMatrix).toVar("reflectVector");
var refractVector = /* @__PURE__ */ refractView.transformDirection(cameraWorldMatrix).toVar("refractVector");
var EmptyTexture = /* @__PURE__ */ new CubeTexture();
var CubeTextureNode = class extends TextureNode {
  static get type() {
    return "CubeTextureNode";
  }
  /**
   * Constructs a new cube texture node.
   *
   * @param {CubeTexture} value - The cube texture.
   * @param {?Node<vec3>} [uvNode=null] - The uv node.
   * @param {?Node<int>} [levelNode=null] - The level node.
   * @param {?Node<float>} [biasNode=null] - The bias node.
   */
  constructor(value, uvNode = null, levelNode = null, biasNode = null) {
    super(value, uvNode, levelNode, biasNode);
    this.isCubeTextureNode = true;
  }
  /**
   * Overwrites the default implementation to return the appropriate cube texture type.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {string} The input type.
   */
  getInputType() {
    if (this.value.isDepthTexture === true) {
      return "cubeDepthTexture";
    }
    return "cubeTexture";
  }
  /**
   * Returns a default uvs based on the mapping type of the cube texture.
   *
   * @return {Node<vec3>} The default uv attribute.
   */
  getDefaultUV() {
    const texture2 = this.value;
    if (texture2.mapping === CubeReflectionMapping) {
      return reflectVector;
    } else if (texture2.mapping === CubeRefractionMapping) {
      return refractVector;
    } else {
      error('CubeTextureNode: Mapping "%s" not supported.', texture2.mapping);
      return vec3(0, 0, 0);
    }
  }
  /**
   * Overwritten with an empty implementation since the `updateMatrix` flag is ignored
   * for cube textures. The uv transformation matrix is not applied to cube textures.
   *
   * @param {boolean} value - The update toggle.
   */
  setUpdateMatrix() {
  }
  // Ignore .updateMatrix for CubeTextureNode
  /**
   * Setups the uv node. Depending on the backend as well as the texture type, it might be necessary
   * to modify the uv node for correct sampling.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @param {Node} uvNode - The uv node to setup.
   * @return {Node} The updated uv node.
   */
  setupUV(builder, uvNode) {
    const texture2 = this.value;
    if (texture2.isDepthTexture === true) {
      if (builder.renderer.coordinateSystem === WebGPUCoordinateSystem) {
        return vec3(uvNode.x, uvNode.y.negate(), uvNode.z);
      }
      return uvNode;
    }
    uvNode = materialEnvRotation.mul(uvNode);
    if (builder.renderer.coordinateSystem === WebGPUCoordinateSystem || !texture2.isRenderTargetTexture) {
      uvNode = vec3(uvNode.x.negate(), uvNode.yz);
    }
    return uvNode;
  }
  /**
   * Generates the uv code snippet.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @param {Node} cubeUV - The uv node to generate code for.
   * @return {string} The generated code snippet.
   */
  generateUV(builder, cubeUV) {
    return cubeUV.build(builder, this.sampler === true ? "vec3" : "ivec3");
  }
};
var cubeTextureBase = /* @__PURE__ */ nodeProxy(CubeTextureNode).setParameterLength(1, 4).setName("cubeTexture");
var cubeTexture = (value = EmptyTexture, uvNode = null, levelNode = null, biasNode = null) => {
  let textureNode;
  if (value && value.isCubeTextureNode === true) {
    textureNode = nodeObject(value.clone());
    textureNode.referenceNode = value;
    if (uvNode !== null) textureNode.uvNode = nodeObject(uvNode);
    if (levelNode !== null) textureNode.levelNode = nodeObject(levelNode);
    if (biasNode !== null) textureNode.biasNode = nodeObject(biasNode);
  } else {
    textureNode = cubeTextureBase(value, uvNode, levelNode, biasNode);
  }
  return textureNode;
};
var ReferenceElementNode2 = class extends ArrayElementNode {
  static get type() {
    return "ReferenceElementNode";
  }
  /**
   * Constructs a new reference element node.
   *
   * @param {?ReferenceNode} referenceNode - The reference node.
   * @param {Node} indexNode - The index node that defines the element access.
   */
  constructor(referenceNode, indexNode) {
    super(referenceNode, indexNode);
    this.referenceNode = referenceNode;
    this.isReferenceElementNode = true;
  }
  /**
   * This method is overwritten since the node type is inferred from
   * the uniform type of the reference node.
   *
   * @return {string} The node type.
   */
  generateNodeType() {
    return this.referenceNode.uniformType;
  }
  generate(builder) {
    const snippet = super.generate(builder);
    const arrayType = this.referenceNode.getNodeType(builder);
    const elementType = this.getNodeType(builder);
    return builder.format(snippet, arrayType, elementType);
  }
};
var ReferenceNode = class extends Node {
  static get type() {
    return "ReferenceNode";
  }
  /**
   * Constructs a new reference node.
   *
   * @param {string} property - The name of the property the node refers to.
   * @param {string} uniformType - The uniform type that should be used to represent the property value.
   * @param {?Object} [object=null] - The object the property belongs to.
   * @param {?number} [count=null] - When the linked property is an array-like, this parameter defines its length.
   */
  constructor(property2, uniformType, object = null, count = null) {
    super();
    this.property = property2;
    this.uniformType = uniformType;
    this.object = object;
    this.count = count;
    this.properties = property2.split(".");
    this.reference = object;
    this.node = null;
    this.group = null;
    this.name = null;
    this.updateType = NodeUpdateType.OBJECT;
  }
  /**
   * When the referred property is array-like, this method can be used
   * to access elements via an index node.
   *
   * @param {IndexNode} indexNode - indexNode.
   * @return {ReferenceElementNode} A reference to an element.
   */
  element(indexNode) {
    return new ReferenceElementNode2(this, nodeObject(indexNode));
  }
  /**
   * Sets the uniform group for this reference node.
   *
   * @param {UniformGroupNode} group - The uniform group to set.
   * @return {ReferenceNode} A reference to this node.
   */
  setGroup(group) {
    this.group = group;
    return this;
  }
  /**
   * Sets the name for the internal uniform.
   *
   * @param {string} name - The label to set.
   * @return {ReferenceNode} A reference to this node.
   */
  setName(name) {
    this.name = name;
    return this;
  }
  /**
   * Sets the label for the internal uniform.
   *
   * @deprecated
   * @param {string} name - The label to set.
   * @return {ReferenceNode} A reference to this node.
   */
  label(name) {
    warn('TSL: "label()" has been deprecated. Use "setName()" instead.');
    return this.setName(name);
  }
  /**
   * Sets the node type which automatically defines the internal
   * uniform type.
   *
   * @param {string} uniformType - The type to set.
   */
  setNodeType(uniformType) {
    let node = null;
    if (this.count !== null) {
      node = buffer(null, uniformType, this.count);
    } else if (Array.isArray(this.getValueFromReference())) {
      node = uniformArray(null, uniformType);
      node.updateType = NodeUpdateType.OBJECT;
    } else if (uniformType === "texture") {
      node = texture(null);
    } else if (uniformType === "cubeTexture") {
      node = cubeTexture(null);
    } else {
      node = uniform(null, uniformType);
    }
    if (this.group !== null) {
      node.setGroup(this.group);
    }
    if (this.name !== null) node.setName(this.name);
    this.node = node;
  }
  /**
   * This method is overwritten since the node type is inferred from
   * the type of the reference node.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {string} The node type.
   */
  generateNodeType(builder) {
    if (this.node === null) {
      this.updateReference(builder);
      this.updateValue();
    }
    return this.node.getNodeType(builder);
  }
  /**
   * Returns the property value from the given referred object.
   *
   * @param {Object} [object=this.reference] - The object to retrieve the property value from.
   * @return {any} The value.
   */
  getValueFromReference(object = this.reference) {
    const { properties } = this;
    let value = object[properties[0]];
    for (let i = 1; i < properties.length; i++) {
      value = value[properties[i]];
    }
    return value;
  }
  /**
   * Allows to update the reference based on the given state. The state is only
   * evaluated {@link ReferenceNode#object} is not set.
   *
   * @param {(NodeFrame|NodeBuilder)} state - The current state.
   * @return {Object} The updated reference.
   */
  updateReference(state) {
    this.reference = this.object !== null ? this.object : state.object;
    return this.reference;
  }
  /**
   * The output of the reference node is the internal uniform node.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {UniformNode} The output node.
   */
  setup() {
    this.updateValue();
    return this.node;
  }
  /**
   * Overwritten to update the internal uniform value.
   *
   * @param {NodeFrame} frame - A reference to the current node frame.
   */
  update() {
    this.updateValue();
  }
  /**
   * Retrieves the value from the referred object property and uses it
   * to updated the internal uniform.
   */
  updateValue() {
    if (this.node === null) this.setNodeType(this.uniformType);
    const value = this.getValueFromReference();
    if (Array.isArray(value)) {
      this.node.array = value;
    } else {
      this.node.value = value;
    }
  }
};
var reference = (name, type, object) => new ReferenceNode(name, type, object);
var MaterialReferenceNode = class extends ReferenceNode {
  static get type() {
    return "MaterialReferenceNode";
  }
  /**
   * Constructs a new material reference node.
   *
   * @param {string} property - The name of the property the node refers to.
   * @param {string} inputType - The uniform type that should be used to represent the property value.
   * @param {?Material} [material=null] - The material the property belongs to. When no material is set,
   * the node refers to the material of the current rendered object.
   */
  constructor(property2, inputType, material = null) {
    super(property2, inputType, material);
    this.material = material;
    this.isMaterialReferenceNode = true;
  }
  /**
   * Updates the reference based on the given state. The state is only evaluated
   * {@link MaterialReferenceNode#material} is not set.
   *
   * @param {(NodeFrame|NodeBuilder)} state - The current state.
   * @return {Object} The updated reference.
   */
  updateReference(state) {
    this.reference = this.material !== null ? this.material : state.material;
    return this.reference;
  }
};
var materialReference = (name, type, material = null) => new MaterialReferenceNode(name, type, material);
var uv = uv$1();
var q0 = positionView.dFdx();
var q1 = positionView.dFdy();
var st0 = uv.dFdx();
var st1 = uv.dFdy();
var N = normalView;
var q1perp = q1.cross(N);
var q0perp = N.cross(q0);
var T = q1perp.mul(st0.x).add(q0perp.mul(st1.x));
var B = q1perp.mul(st0.y).add(q0perp.mul(st1.y));
var det = T.dot(T).max(B.dot(B));
var scale$1 = det.equal(0).select(0, det.inverseSqrt());
var tangentViewFrame = /* @__PURE__ */ T.mul(scale$1).toVar("tangentViewFrame");
var bitangentViewFrame = /* @__PURE__ */ B.mul(scale$1).toVar("bitangentViewFrame");
var tangentGeometry = /* @__PURE__ */ attribute("tangent", "vec4");
var tangentLocal = /* @__PURE__ */ tangentGeometry.xyz.toVar("tangentLocal");
var tangentView = /* @__PURE__ */ Fn((builder) => {
  let node;
  if (builder.subBuildFn === "VERTEX" || builder.geometry.hasAttribute("tangent")) {
    node = modelViewMatrix.mul(vec4(tangentLocal, 0)).xyz.toVarying("v_tangentView").normalize();
  } else {
    node = tangentViewFrame;
  }
  if (builder.isFlatShading() !== true) {
    node = negateOnBackSide(node);
  }
  return node;
}, "vec3").once(["NORMAL", "VERTEX"])().toVar("tangentView");
var getBitangent = /* @__PURE__ */ Fn(([crossNormalTangent, varyingName], builder) => {
  let bitangent = crossNormalTangent.mul(tangentGeometry.w).xyz;
  if (builder.subBuildFn === "NORMAL" && builder.isFlatShading() !== true) {
    bitangent = bitangent.toVarying(varyingName);
  }
  return bitangent;
}).once(["NORMAL"]);
var bitangentView = /* @__PURE__ */ Fn((builder) => {
  let node;
  if (builder.subBuildFn === "VERTEX" || builder.geometry.hasAttribute("tangent")) {
    node = getBitangent(normalView.cross(tangentView), "v_bitangentView").normalize();
  } else {
    node = bitangentViewFrame;
  }
  if (builder.isFlatShading() !== true) {
    node = negateOnBackSide(node);
  }
  return node;
}, "vec3").once(["NORMAL", "VERTEX"])().toVar("bitangentView");
var TBNViewMatrix = /* @__PURE__ */ mat3(tangentView, bitangentView, normalView).toVar("TBNViewMatrix");
var unpackNormal = (xy) => vec3(xy, sqrt(saturate(float(1).sub(dot(xy, xy)))));
var NormalMapNode = class extends TempNode {
  static get type() {
    return "NormalMapNode";
  }
  /**
   * Constructs a new normal map node.
   *
   * @param {Node<vec3>} node - Represents the normal map data.
   * @param {?Node<vec2>} [scaleNode=null] - Controls the intensity of the effect.
   */
  constructor(node, scaleNode = null) {
    super("vec3");
    this.node = node;
    this.scaleNode = scaleNode;
    this.normalMapType = TangentSpaceNormalMap;
    this.unpackNormalMode = NoNormalPacking;
  }
  setup(builder) {
    const { normalMapType, scaleNode, unpackNormalMode } = this;
    let normalMap2 = this.node.mul(2).sub(1);
    if (normalMapType === TangentSpaceNormalMap) {
      if (unpackNormalMode === NormalRGPacking) {
        normalMap2 = unpackNormal(normalMap2.xy);
      } else if (unpackNormalMode === NormalGAPacking) {
        normalMap2 = unpackNormal(normalMap2.yw);
      } else if (unpackNormalMode !== NoNormalPacking) {
        error(`THREE.NodeMaterial: Unexpected unpack normal mode: ${unpackNormalMode}`);
      }
    } else {
      if (unpackNormalMode !== NoNormalPacking) {
        error(`THREE.NodeMaterial: Normal map type '${normalMapType}' is not compatible with unpack normal mode '${unpackNormalMode}'`);
      }
    }
    if (scaleNode !== null) {
      let scale = scaleNode;
      if (builder.isFlatShading() === true) {
        scale = negateOnBackSide(scale);
      }
      normalMap2 = vec3(normalMap2.xy.mul(scale), normalMap2.z);
    }
    let output2 = null;
    if (normalMapType === ObjectSpaceNormalMap) {
      output2 = transformNormalToView(normalMap2);
    } else if (normalMapType === TangentSpaceNormalMap) {
      output2 = TBNViewMatrix.mul(normalMap2).normalize();
    } else {
      error(`NodeMaterial: Unsupported normal map type: ${normalMapType}`);
      output2 = normalView;
    }
    return output2;
  }
};
var normalMap = /* @__PURE__ */ nodeProxy(NormalMapNode).setParameterLength(1, 2);
var dHdxy_fwd = Fn(({ textureNode, bumpScale }) => {
  const sampleTexture = (callback) => textureNode.isolate().context({ getUV: (texNode) => callback(texNode.uvNode || uv$1()), forceUVContext: true });
  const Hll = float(sampleTexture((uvNode) => uvNode));
  return vec2(
    float(sampleTexture((uvNode) => uvNode.add(uvNode.dFdx()))).sub(Hll),
    float(sampleTexture((uvNode) => uvNode.add(uvNode.dFdy()))).sub(Hll)
  ).mul(bumpScale);
});
var perturbNormalArb = Fn((inputs) => {
  const { surf_pos, surf_norm, dHdxy } = inputs;
  const vSigmaX = surf_pos.dFdx().normalize();
  const vSigmaY = surf_pos.dFdy().normalize();
  const vN = surf_norm;
  const R1 = vSigmaY.cross(vN);
  const R2 = vN.cross(vSigmaX);
  const fDet = vSigmaX.dot(R1).mul(faceDirection);
  const vGrad = fDet.sign().mul(dHdxy.x.mul(R1).add(dHdxy.y.mul(R2)));
  return fDet.abs().mul(surf_norm).sub(vGrad).normalize();
});
var BumpMapNode = class extends TempNode {
  static get type() {
    return "BumpMapNode";
  }
  /**
   * Constructs a new bump map node.
   *
   * @param {Node<float>} textureNode - Represents the bump map data.
   * @param {?Node<float>} [scaleNode=null] - Controls the intensity of the bump effect.
   */
  constructor(textureNode, scaleNode = null) {
    super("vec3");
    this.textureNode = textureNode;
    this.scaleNode = scaleNode;
  }
  setup(builder) {
    if (builder.material.wireframe === true) return normalView;
    const bumpScale = this.scaleNode !== null ? this.scaleNode : 1;
    const dHdxy = dHdxy_fwd({ textureNode: this.textureNode, bumpScale });
    return perturbNormalArb({
      surf_pos: positionView,
      surf_norm: normalView,
      dHdxy
    });
  }
};
var bumpMap = /* @__PURE__ */ nodeProxy(BumpMapNode).setParameterLength(1, 2);
var _propertyCache = /* @__PURE__ */ new Map();
var MaterialNode = class _MaterialNode extends Node {
  static get type() {
    return "MaterialNode";
  }
  /**
   * Constructs a new material node.
   *
   * @param {string} scope - The scope defines what kind of material property is referred by the node.
   */
  constructor(scope) {
    super();
    this.scope = scope;
  }
  /**
   * Returns a cached reference node for the given property and type.
   *
   * @param {string} property - The name of the material property.
   * @param {string} type - The uniform type of the property.
   * @return {MaterialReferenceNode} A material reference node representing the property access.
   */
  getCache(property2, type) {
    let node = _propertyCache.get(property2);
    if (node === void 0) {
      node = materialReference(property2, type);
      _propertyCache.set(property2, node);
    }
    return node;
  }
  /**
   * Returns a float-typed material reference node for the given property name.
   *
   * @param {string} property - The name of the material property.
   * @return {MaterialReferenceNode<float>} A material reference node representing the property access.
   */
  getFloat(property2) {
    return this.getCache(property2, "float");
  }
  /**
   * Returns a color-typed material reference node for the given property name.
   *
   * @param {string} property - The name of the material property.
   * @return {MaterialReferenceNode<color>} A material reference node representing the property access.
   */
  getColor(property2) {
    return this.getCache(property2, "color");
  }
  /**
   * Returns a texture-typed material reference node for the given property name.
   *
   * @param {string} property - The name of the material property.
   * @return {MaterialReferenceNode} A material reference node representing the property access.
   */
  getTexture(property2) {
    return this.getCache(property2 === "map" ? "map" : property2 + "Map", "texture");
  }
  /**
   * The node setup is done depending on the selected scope. Multiple material properties
   * might be grouped into a single node composition if they logically belong together.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {Node} The node representing the selected scope.
   */
  setup(builder) {
    const material = builder.context.material;
    const scope = this.scope;
    let node = null;
    if (scope === _MaterialNode.COLOR) {
      const colorNode = material.color !== void 0 ? this.getColor(scope) : vec3();
      if (material.map && material.map.isTexture === true) {
        node = colorNode.mul(this.getTexture("map"));
      } else {
        node = colorNode;
      }
    } else if (scope === _MaterialNode.OPACITY) {
      const opacityNode = this.getFloat(scope);
      if (material.alphaMap && material.alphaMap.isTexture === true) {
        node = opacityNode.mul(this.getTexture("alpha"));
      } else {
        node = opacityNode;
      }
    } else if (scope === _MaterialNode.SPECULAR_STRENGTH) {
      if (material.specularMap && material.specularMap.isTexture === true) {
        node = this.getTexture("specular").r;
      } else {
        node = float(1);
      }
    } else if (scope === _MaterialNode.SPECULAR_INTENSITY) {
      const specularIntensityNode = this.getFloat(scope);
      if (material.specularIntensityMap && material.specularIntensityMap.isTexture === true) {
        node = specularIntensityNode.mul(this.getTexture(scope).a);
      } else {
        node = specularIntensityNode;
      }
    } else if (scope === _MaterialNode.SPECULAR_COLOR) {
      const specularColorNode = this.getColor(scope);
      if (material.specularColorMap && material.specularColorMap.isTexture === true) {
        node = specularColorNode.mul(this.getTexture(scope).rgb);
      } else {
        node = specularColorNode;
      }
    } else if (scope === _MaterialNode.ROUGHNESS) {
      const roughnessNode = this.getFloat(scope);
      if (material.roughnessMap && material.roughnessMap.isTexture === true) {
        node = roughnessNode.mul(this.getTexture(scope).g);
      } else {
        node = roughnessNode;
      }
    } else if (scope === _MaterialNode.METALNESS) {
      const metalnessNode = this.getFloat(scope);
      if (material.metalnessMap && material.metalnessMap.isTexture === true) {
        node = metalnessNode.mul(this.getTexture(scope).b);
      } else {
        node = metalnessNode;
      }
    } else if (scope === _MaterialNode.EMISSIVE) {
      const emissiveIntensityNode = this.getFloat("emissiveIntensity");
      const emissiveNode = this.getColor(scope).mul(emissiveIntensityNode);
      if (material.emissiveMap && material.emissiveMap.isTexture === true) {
        node = emissiveNode.mul(this.getTexture(scope));
      } else {
        node = emissiveNode;
      }
    } else if (scope === _MaterialNode.NORMAL) {
      if (material.normalMap) {
        node = normalMap(this.getTexture("normal"), this.getCache("normalScale", "vec2"));
        node.normalMapType = material.normalMapType;
        if (material.normalMap.format == RGFormat || material.normalMap.format == RED_GREEN_RGTC2_Format || material.normalMap.format == RG11_EAC_Format) {
          node.unpackNormalMode = NormalRGPacking;
        }
      } else if (material.bumpMap) {
        node = bumpMap(this.getTexture("bump").r, this.getFloat("bumpScale"));
      } else {
        node = normalView;
      }
    } else if (scope === _MaterialNode.CLEARCOAT) {
      const clearcoatNode = this.getFloat(scope);
      if (material.clearcoatMap && material.clearcoatMap.isTexture === true) {
        node = clearcoatNode.mul(this.getTexture(scope).r);
      } else {
        node = clearcoatNode;
      }
    } else if (scope === _MaterialNode.CLEARCOAT_ROUGHNESS) {
      const clearcoatRoughnessNode = this.getFloat(scope);
      if (material.clearcoatRoughnessMap && material.clearcoatRoughnessMap.isTexture === true) {
        node = clearcoatRoughnessNode.mul(this.getTexture(scope).r);
      } else {
        node = clearcoatRoughnessNode;
      }
    } else if (scope === _MaterialNode.CLEARCOAT_NORMAL) {
      if (material.clearcoatNormalMap) {
        node = normalMap(this.getTexture(scope), this.getCache(scope + "Scale", "vec2"));
      } else {
        node = normalView;
      }
    } else if (scope === _MaterialNode.SHEEN) {
      const sheenNode = this.getColor("sheenColor").mul(this.getFloat("sheen"));
      if (material.sheenColorMap && material.sheenColorMap.isTexture === true) {
        node = sheenNode.mul(this.getTexture("sheenColor").rgb);
      } else {
        node = sheenNode;
      }
    } else if (scope === _MaterialNode.SHEEN_ROUGHNESS) {
      const sheenRoughnessNode = this.getFloat(scope);
      if (material.sheenRoughnessMap && material.sheenRoughnessMap.isTexture === true) {
        node = sheenRoughnessNode.mul(this.getTexture(scope).a);
      } else {
        node = sheenRoughnessNode;
      }
      node = node.clamp(1e-4, 1);
    } else if (scope === _MaterialNode.ANISOTROPY) {
      if (material.anisotropyMap && material.anisotropyMap.isTexture === true) {
        const anisotropyPolar = this.getTexture(scope);
        const anisotropyMat = mat2(materialAnisotropyVector.x, materialAnisotropyVector.y, materialAnisotropyVector.y.negate(), materialAnisotropyVector.x);
        node = anisotropyMat.mul(anisotropyPolar.rg.mul(2).sub(vec2(1)).normalize().mul(anisotropyPolar.b));
      } else {
        node = materialAnisotropyVector;
      }
    } else if (scope === _MaterialNode.IRIDESCENCE_THICKNESS) {
      const iridescenceThicknessMaximum = reference("1", "float", material.iridescenceThicknessRange);
      if (material.iridescenceThicknessMap) {
        const iridescenceThicknessMinimum = reference("0", "float", material.iridescenceThicknessRange);
        node = iridescenceThicknessMaximum.sub(iridescenceThicknessMinimum).mul(this.getTexture(scope).g).add(iridescenceThicknessMinimum);
      } else {
        node = iridescenceThicknessMaximum;
      }
    } else if (scope === _MaterialNode.TRANSMISSION) {
      const transmissionNode = this.getFloat(scope);
      if (material.transmissionMap) {
        node = transmissionNode.mul(this.getTexture(scope).r);
      } else {
        node = transmissionNode;
      }
    } else if (scope === _MaterialNode.THICKNESS) {
      const thicknessNode = this.getFloat(scope);
      if (material.thicknessMap) {
        node = thicknessNode.mul(this.getTexture(scope).g);
      } else {
        node = thicknessNode;
      }
    } else if (scope === _MaterialNode.IOR) {
      node = this.getFloat(scope);
    } else if (scope === _MaterialNode.LIGHT_MAP) {
      if (material.lightMap) {
        node = this.getTexture(scope).rgb.mul(this.getFloat("lightMapIntensity"));
      } else {
        node = vec3(0);
      }
    } else if (scope === _MaterialNode.AO) {
      if (material.aoMap) {
        node = this.getTexture(scope).r.sub(1).mul(this.getFloat("aoMapIntensity")).add(1);
      } else {
        node = float(1);
      }
    } else if (scope === _MaterialNode.LINE_DASH_OFFSET) {
      node = material.dashOffset ? this.getFloat(scope) : float(0);
    } else {
      const outputType = this.getNodeType(builder);
      node = this.getCache(scope, outputType);
    }
    return node;
  }
};
MaterialNode.ALPHA_TEST = "alphaTest";
MaterialNode.COLOR = "color";
MaterialNode.OPACITY = "opacity";
MaterialNode.SHININESS = "shininess";
MaterialNode.SPECULAR = "specular";
MaterialNode.SPECULAR_STRENGTH = "specularStrength";
MaterialNode.SPECULAR_INTENSITY = "specularIntensity";
MaterialNode.SPECULAR_COLOR = "specularColor";
MaterialNode.REFLECTIVITY = "reflectivity";
MaterialNode.ROUGHNESS = "roughness";
MaterialNode.METALNESS = "metalness";
MaterialNode.NORMAL = "normal";
MaterialNode.CLEARCOAT = "clearcoat";
MaterialNode.CLEARCOAT_ROUGHNESS = "clearcoatRoughness";
MaterialNode.CLEARCOAT_NORMAL = "clearcoatNormal";
MaterialNode.EMISSIVE = "emissive";
MaterialNode.ROTATION = "rotation";
MaterialNode.SHEEN = "sheen";
MaterialNode.SHEEN_ROUGHNESS = "sheenRoughness";
MaterialNode.ANISOTROPY = "anisotropy";
MaterialNode.IRIDESCENCE = "iridescence";
MaterialNode.IRIDESCENCE_IOR = "iridescenceIOR";
MaterialNode.IRIDESCENCE_THICKNESS = "iridescenceThickness";
MaterialNode.IOR = "ior";
MaterialNode.TRANSMISSION = "transmission";
MaterialNode.THICKNESS = "thickness";
MaterialNode.ATTENUATION_DISTANCE = "attenuationDistance";
MaterialNode.ATTENUATION_COLOR = "attenuationColor";
MaterialNode.LINE_SCALE = "scale";
MaterialNode.LINE_DASH_SIZE = "dashSize";
MaterialNode.LINE_GAP_SIZE = "gapSize";
MaterialNode.LINE_WIDTH = "linewidth";
MaterialNode.LINE_DASH_OFFSET = "dashOffset";
MaterialNode.POINT_SIZE = "size";
MaterialNode.DISPERSION = "dispersion";
MaterialNode.LIGHT_MAP = "light";
MaterialNode.AO = "ao";
var materialAlphaTest = /* @__PURE__ */ nodeImmutable(MaterialNode, MaterialNode.ALPHA_TEST);
var materialColor = /* @__PURE__ */ nodeImmutable(MaterialNode, MaterialNode.COLOR);
var materialShininess = /* @__PURE__ */ nodeImmutable(MaterialNode, MaterialNode.SHININESS);
var materialEmissive = /* @__PURE__ */ nodeImmutable(MaterialNode, MaterialNode.EMISSIVE);
var materialOpacity = /* @__PURE__ */ nodeImmutable(MaterialNode, MaterialNode.OPACITY);
var materialSpecular = /* @__PURE__ */ nodeImmutable(MaterialNode, MaterialNode.SPECULAR);
var materialSpecularIntensity = /* @__PURE__ */ nodeImmutable(MaterialNode, MaterialNode.SPECULAR_INTENSITY);
var materialSpecularColor = /* @__PURE__ */ nodeImmutable(MaterialNode, MaterialNode.SPECULAR_COLOR);
var materialSpecularStrength = /* @__PURE__ */ nodeImmutable(MaterialNode, MaterialNode.SPECULAR_STRENGTH);
var materialReflectivity = /* @__PURE__ */ nodeImmutable(MaterialNode, MaterialNode.REFLECTIVITY);
var materialRoughness = /* @__PURE__ */ nodeImmutable(MaterialNode, MaterialNode.ROUGHNESS);
var materialMetalness = /* @__PURE__ */ nodeImmutable(MaterialNode, MaterialNode.METALNESS);
var materialNormal = /* @__PURE__ */ nodeImmutable(MaterialNode, MaterialNode.NORMAL);
var materialClearcoat = /* @__PURE__ */ nodeImmutable(MaterialNode, MaterialNode.CLEARCOAT);
var materialClearcoatRoughness = /* @__PURE__ */ nodeImmutable(MaterialNode, MaterialNode.CLEARCOAT_ROUGHNESS);
var materialClearcoatNormal = /* @__PURE__ */ nodeImmutable(MaterialNode, MaterialNode.CLEARCOAT_NORMAL);
var materialRotation = /* @__PURE__ */ nodeImmutable(MaterialNode, MaterialNode.ROTATION);
var materialSheen = /* @__PURE__ */ nodeImmutable(MaterialNode, MaterialNode.SHEEN);
var materialSheenRoughness = /* @__PURE__ */ nodeImmutable(MaterialNode, MaterialNode.SHEEN_ROUGHNESS);
var materialAnisotropy = /* @__PURE__ */ nodeImmutable(MaterialNode, MaterialNode.ANISOTROPY);
var materialIridescence = /* @__PURE__ */ nodeImmutable(MaterialNode, MaterialNode.IRIDESCENCE);
var materialIridescenceIOR = /* @__PURE__ */ nodeImmutable(MaterialNode, MaterialNode.IRIDESCENCE_IOR);
var materialIridescenceThickness = /* @__PURE__ */ nodeImmutable(MaterialNode, MaterialNode.IRIDESCENCE_THICKNESS);
var materialTransmission = /* @__PURE__ */ nodeImmutable(MaterialNode, MaterialNode.TRANSMISSION);
var materialThickness = /* @__PURE__ */ nodeImmutable(MaterialNode, MaterialNode.THICKNESS);
var materialIOR = /* @__PURE__ */ nodeImmutable(MaterialNode, MaterialNode.IOR);
var materialAttenuationDistance = /* @__PURE__ */ nodeImmutable(MaterialNode, MaterialNode.ATTENUATION_DISTANCE);
var materialAttenuationColor = /* @__PURE__ */ nodeImmutable(MaterialNode, MaterialNode.ATTENUATION_COLOR);
var materialLineScale = /* @__PURE__ */ nodeImmutable(MaterialNode, MaterialNode.LINE_SCALE);
var materialLineDashSize = /* @__PURE__ */ nodeImmutable(MaterialNode, MaterialNode.LINE_DASH_SIZE);
var materialLineGapSize = /* @__PURE__ */ nodeImmutable(MaterialNode, MaterialNode.LINE_GAP_SIZE);
var materialLineWidth = /* @__PURE__ */ nodeImmutable(MaterialNode, MaterialNode.LINE_WIDTH);
var materialLineDashOffset = /* @__PURE__ */ nodeImmutable(MaterialNode, MaterialNode.LINE_DASH_OFFSET);
var materialPointSize = /* @__PURE__ */ nodeImmutable(MaterialNode, MaterialNode.POINT_SIZE);
var materialDispersion = /* @__PURE__ */ nodeImmutable(MaterialNode, MaterialNode.DISPERSION);
var materialLightMap = /* @__PURE__ */ nodeImmutable(MaterialNode, MaterialNode.LIGHT_MAP);
var materialAO = /* @__PURE__ */ nodeImmutable(MaterialNode, MaterialNode.AO);
var materialAnisotropyVector = /* @__PURE__ */ uniform(new Vector2()).onReference(function(frame) {
  return frame.material;
}).onRenderUpdate(function({ material }) {
  this.value.set(material.anisotropy * Math.cos(material.anisotropyRotation), material.anisotropy * Math.sin(material.anisotropyRotation));
});
var EventNode = class _EventNode extends Node {
  static get type() {
    return "EventNode";
  }
  /**
   * Creates an EventNode.
   *
   * @param {string} eventType - The type of event
   * @param {Function} callback - The callback to execute on update.
   */
  constructor(eventType, callback) {
    super("void");
    this.eventType = eventType;
    this.callback = callback;
    if (eventType === _EventNode.OBJECT) {
      this.updateType = NodeUpdateType.OBJECT;
    } else if (eventType === _EventNode.MATERIAL) {
      this.updateType = NodeUpdateType.RENDER;
    } else if (eventType === _EventNode.FRAME) {
      this.updateType = NodeUpdateType.FRAME;
    } else if (eventType === _EventNode.BEFORE_OBJECT) {
      this.updateBeforeType = NodeUpdateType.OBJECT;
    } else if (eventType === _EventNode.BEFORE_MATERIAL) {
      this.updateBeforeType = NodeUpdateType.RENDER;
    } else if (eventType === _EventNode.BEFORE_FRAME) {
      this.updateBeforeType = NodeUpdateType.FRAME;
    }
  }
  update(frame) {
    this.callback(frame);
  }
  updateBefore(frame) {
    this.callback(frame);
  }
};
EventNode.OBJECT = "object";
EventNode.MATERIAL = "material";
EventNode.FRAME = "frame";
EventNode.BEFORE_OBJECT = "beforeObject";
EventNode.BEFORE_MATERIAL = "beforeMaterial";
EventNode.BEFORE_FRAME = "beforeFrame";
var LoopNode = class extends Node {
  static get type() {
    return "LoopNode";
  }
  /**
   * Constructs a new loop node.
   *
   * @param {Array<any>} params - Depending on the loop type, array holds different parameterization values for the loop.
   */
  constructor(params = []) {
    super("void");
    this.params = params;
  }
  /**
   * Returns a loop variable name based on an index. The pattern is
   * `0` = `i`, `1`= `j`, `2`= `k` and so on.
   *
   * @param {number} index - The index.
   * @return {string} The loop variable name.
   */
  getVarName(index) {
    return String.fromCharCode("i".charCodeAt(0) + index);
  }
  /**
   * Returns properties about this node.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {Object} The node properties.
   */
  getProperties(builder) {
    const properties = builder.getNodeProperties(this);
    if (properties.stackNode !== void 0) return properties;
    const inputs = {};
    for (let i = 0, l = this.params.length - 1; i < l; i++) {
      const param = this.params[i];
      const name = param.isNode !== true && param.name || this.getVarName(i);
      const type = param.isNode !== true && param.type || "int";
      inputs[name] = expression(name, type);
    }
    const stack = builder.addStack();
    const fnCall = this.params[this.params.length - 1](inputs);
    properties.returnsNode = fnCall.context({ nodeLoop: fnCall });
    properties.stackNode = stack;
    const baseParam = this.params[0];
    if (baseParam.isNode !== true && typeof baseParam.update === "function") {
      const fnUpdateCall = Fn(this.params[0].update)(inputs);
      properties.updateNode = fnUpdateCall.context({ nodeLoop: fnUpdateCall });
    }
    builder.removeStack();
    return properties;
  }
  setup(builder) {
    this.getProperties(builder);
    if (builder.fnCall) {
      const shaderNodeData = builder.getDataFromNode(builder.fnCall.shaderNode);
      shaderNodeData.hasLoop = true;
    }
  }
  generate(builder) {
    const properties = this.getProperties(builder);
    const params = this.params;
    const stackNode = properties.stackNode;
    for (let i = 0, l = params.length - 1; i < l; i++) {
      const param = params[i];
      let isWhile = false, start = null, end = null, name = null, type = null, condition = null, update = null;
      if (param.isNode) {
        if (param.getNodeType(builder) === "bool") {
          isWhile = true;
          type = "bool";
          end = param.build(builder, type);
        } else {
          type = "int";
          name = this.getVarName(i);
          start = "0";
          end = param.build(builder, type);
          condition = "<";
        }
      } else {
        type = param.type || "int";
        name = param.name || this.getVarName(i);
        start = param.start;
        end = param.end;
        condition = param.condition;
        update = param.update;
        if (typeof start === "number") start = builder.generateConst(type, start);
        else if (start && start.isNode) start = start.build(builder, type);
        if (typeof end === "number") end = builder.generateConst(type, end);
        else if (end && end.isNode) end = end.build(builder, type);
        if (start !== void 0 && end === void 0) {
          start = start + " - 1";
          end = "0";
          condition = ">=";
        } else if (end !== void 0 && start === void 0) {
          start = "0";
          condition = "<";
        }
        if (condition === void 0) {
          if (Number(start) > Number(end)) {
            condition = ">=";
          } else {
            condition = "<";
          }
        }
      }
      let loopSnippet;
      if (isWhile) {
        loopSnippet = `while ( ${end} )`;
      } else {
        const internalParam = { start, end };
        const startSnippet = internalParam.start;
        const endSnippet = internalParam.end;
        let updateSnippet;
        const deltaOperator = () => condition.includes("<") ? "+=" : "-=";
        if (update !== void 0 && update !== null) {
          switch (typeof update) {
            case "function":
              const flow = builder.flowStagesNode(properties.updateNode, "void");
              const snippet = flow.code.replace(/\t|;/g, "");
              updateSnippet = snippet;
              break;
            case "number":
              updateSnippet = name + " " + deltaOperator() + " " + builder.generateConst(type, update);
              break;
            case "string":
              updateSnippet = name + " " + update;
              break;
            default:
              if (update.isNode) {
                updateSnippet = name + " " + deltaOperator() + " " + update.build(builder);
              } else {
                error("TSL: 'Loop( { update: ... } )' is not a function, string or number.", this.stackTrace);
                updateSnippet = "break /* invalid update */";
              }
          }
        } else {
          if (type === "int" || type === "uint") {
            update = condition.includes("<") ? "++" : "--";
          } else {
            update = deltaOperator() + " 1.";
          }
          updateSnippet = name + " " + update;
        }
        const declarationSnippet = builder.getVar(type, name) + " = " + startSnippet;
        const conditionalSnippet = name + " " + condition + " " + endSnippet;
        loopSnippet = `for ( ${declarationSnippet}; ${conditionalSnippet}; ${updateSnippet} )`;
      }
      builder.addFlowCode((i === 0 ? "\n" : "") + builder.tab + loopSnippet + " {\n\n").addFlowTab();
    }
    const stackSnippet = stackNode.build(builder, "void");
    properties.returnsNode.build(builder, "void");
    builder.removeFlowTab().addFlowCode("\n" + builder.tab + stackSnippet);
    for (let i = 0, l = this.params.length - 1; i < l; i++) {
      builder.addFlowCode((i === 0 ? "" : builder.tab) + "}\n\n").removeFlowTab();
    }
    builder.addFlowTab();
  }
};
var Loop = (...params) => new LoopNode(nodeArray(params, "int")).toStack();
var _size$5 = /* @__PURE__ */ new Vector2();
var ViewportTextureNode = class extends TextureNode {
  static get type() {
    return "ViewportTextureNode";
  }
  /**
   * Constructs a new viewport texture node.
   *
   * @param {Node} [uvNode=screenUV] - The uv node.
   * @param {?Node} [levelNode=null] - The level node.
   * @param {?Texture} [framebufferTexture=null] - A framebuffer texture holding the viewport data. If not provided, a framebuffer texture is created automatically.
   */
  constructor(uvNode = screenUV, levelNode = null, framebufferTexture = null) {
    let defaultFramebuffer = null;
    if (framebufferTexture === null) {
      defaultFramebuffer = new FramebufferTexture();
      defaultFramebuffer.minFilter = LinearMipmapLinearFilter;
      framebufferTexture = defaultFramebuffer;
    } else {
      defaultFramebuffer = framebufferTexture;
    }
    super(framebufferTexture, uvNode, levelNode);
    this.generateMipmaps = false;
    this.defaultFramebuffer = defaultFramebuffer;
    this.isOutputTextureNode = true;
    this.updateBeforeType = NodeUpdateType.RENDER;
    this._cacheTextures = /* @__PURE__ */ new WeakMap();
  }
  /**
   * This methods returns a texture for the given render target or canvas target reference.
   *
   * To avoid rendering errors, `ViewportTextureNode` must use unique framebuffer textures
   * for different render contexts.
   *
   * @param {?(RenderTarget|CanvasTarget)} [reference=null] - The render target or canvas target reference.
   * @return {Texture} The framebuffer texture.
   */
  getTextureForReference(reference2 = null) {
    let defaultFramebuffer;
    let cacheTextures;
    if (this.referenceNode) {
      defaultFramebuffer = this.referenceNode.defaultFramebuffer;
      cacheTextures = this.referenceNode._cacheTextures;
    } else {
      defaultFramebuffer = this.defaultFramebuffer;
      cacheTextures = this._cacheTextures;
    }
    if (reference2 === null) {
      return defaultFramebuffer;
    }
    if (cacheTextures.has(reference2) === false) {
      const framebufferTexture = defaultFramebuffer.clone();
      cacheTextures.set(reference2, framebufferTexture);
    }
    return cacheTextures.get(reference2);
  }
  updateReference(frame) {
    const renderer = frame.renderer;
    const renderTarget = renderer.getRenderTarget();
    const canvasTarget = renderer.getCanvasTarget();
    const reference2 = renderTarget ? renderTarget : canvasTarget;
    this.value = this.getTextureForReference(reference2);
    return this.value;
  }
  updateBefore(frame) {
    const renderer = frame.renderer;
    const renderTarget = renderer.getRenderTarget();
    const canvasTarget = renderer.getCanvasTarget();
    const reference2 = renderTarget ? renderTarget : canvasTarget;
    if (reference2 === null) {
      renderer.getDrawingBufferSize(_size$5);
    } else if (reference2.getDrawingBufferSize) {
      reference2.getDrawingBufferSize(_size$5);
    } else {
      _size$5.set(reference2.width, reference2.height);
    }
    const framebufferTexture = this.getTextureForReference(reference2);
    if (framebufferTexture.image.width !== _size$5.width || framebufferTexture.image.height !== _size$5.height) {
      framebufferTexture.image.width = _size$5.width;
      framebufferTexture.image.height = _size$5.height;
      framebufferTexture.needsUpdate = true;
    }
    const currentGenerateMipmaps = framebufferTexture.generateMipmaps;
    framebufferTexture.generateMipmaps = this.generateMipmaps;
    renderer.copyFramebufferToTexture(framebufferTexture);
    framebufferTexture.generateMipmaps = currentGenerateMipmaps;
  }
  clone() {
    const viewportTextureNode = new this.constructor(this.uvNode, this.levelNode, this.value);
    viewportTextureNode.generateMipmaps = this.generateMipmaps;
    return viewportTextureNode;
  }
};
var _sharedDepthbuffer = null;
var ViewportDepthTextureNode = class extends ViewportTextureNode {
  static get type() {
    return "ViewportDepthTextureNode";
  }
  /**
   * Constructs a new viewport depth texture node.
   *
   * @param {Node} [uvNode=screenUV] - The uv node.
   * @param {?Node} [levelNode=null] - The level node.
   * @param {?DepthTexture} [depthTexture=null] - A depth texture. If not provided, uses a shared depth texture.
   */
  constructor(uvNode = screenUV, levelNode = null, depthTexture = null) {
    if (depthTexture === null) {
      if (_sharedDepthbuffer === null) {
        _sharedDepthbuffer = new DepthTexture();
      }
      depthTexture = _sharedDepthbuffer;
    }
    super(uvNode, levelNode, depthTexture);
  }
};
var viewportDepthTexture = /* @__PURE__ */ nodeProxy(ViewportDepthTextureNode).setParameterLength(0, 3);
var ViewportDepthNode = class _ViewportDepthNode extends Node {
  static get type() {
    return "ViewportDepthNode";
  }
  /**
   * Constructs a new viewport depth node.
   *
   * @param {('depth'|'depthBase'|'linearDepth')} scope - The node's scope.
   * @param {?Node} [valueNode=null] - The value node.
   */
  constructor(scope, valueNode = null) {
    super("float");
    this.scope = scope;
    this.valueNode = valueNode;
    this.isViewportDepthNode = true;
  }
  generate(builder) {
    const { scope } = this;
    if (scope === _ViewportDepthNode.DEPTH_BASE) {
      return builder.getFragDepth();
    }
    return super.generate(builder);
  }
  setup({ camera }) {
    const { scope } = this;
    const value = this.valueNode;
    let node = null;
    if (scope === _ViewportDepthNode.DEPTH_BASE) {
      if (value !== null) {
        node = depthBase().assign(value);
      }
    } else if (scope === _ViewportDepthNode.DEPTH) {
      if (camera.isPerspectiveCamera) {
        node = viewZToPerspectiveDepth(positionView.z, cameraNear, cameraFar);
      } else {
        node = viewZToOrthographicDepth(positionView.z, cameraNear, cameraFar);
      }
    } else if (scope === _ViewportDepthNode.LINEAR_DEPTH) {
      if (value !== null) {
        if (camera.isPerspectiveCamera) {
          const viewZ = perspectiveDepthToViewZ(value, cameraNear, cameraFar);
          node = viewZToOrthographicDepth(viewZ, cameraNear, cameraFar);
        } else {
          node = value;
        }
      } else {
        node = viewZToOrthographicDepth(positionView.z, cameraNear, cameraFar);
      }
    }
    return node;
  }
};
ViewportDepthNode.DEPTH_BASE = "depthBase";
ViewportDepthNode.DEPTH = "depth";
ViewportDepthNode.LINEAR_DEPTH = "linearDepth";
var viewZToOrthographicDepth = (viewZ, near, far) => viewZ.add(near).div(near.sub(far));
var viewZToPerspectiveDepth = (viewZ, near, far) => near.add(viewZ).mul(far).div(far.sub(near).mul(viewZ));
var perspectiveDepthToViewZ = /* @__PURE__ */ Fn(([depth2, near, far], builder) => {
  if (builder.renderer.reversedDepthBuffer === true) {
    return near.mul(far).div(near.sub(far).mul(depth2).sub(near));
  } else {
    return near.mul(far).div(far.sub(near).mul(depth2).sub(far));
  }
});
var depthBase = /* @__PURE__ */ nodeProxy(ViewportDepthNode, ViewportDepthNode.DEPTH_BASE);
var depth = /* @__PURE__ */ nodeImmutable(ViewportDepthNode, ViewportDepthNode.DEPTH);
var linearDepth = /* @__PURE__ */ nodeProxy(ViewportDepthNode, ViewportDepthNode.LINEAR_DEPTH).setParameterLength(0, 1);
var viewportLinearDepth = /* @__PURE__ */ linearDepth(viewportDepthTexture());
depth.assign = (value) => depthBase(value);
var ClippingNode = class _ClippingNode extends Node {
  static get type() {
    return "ClippingNode";
  }
  /**
   * Constructs a new clipping node.
   *
   * @param {('default'|'hardware'|'alphaToCoverage')} [scope='default'] - The node's scope. Similar to other nodes,
   * the selected scope influences the behavior of the node and what type of code is generated.
   */
  constructor(scope = _ClippingNode.DEFAULT) {
    super();
    this.scope = scope;
  }
  /**
   * Setups the node depending on the selected scope.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {Node} The result node.
   */
  setup(builder) {
    super.setup(builder);
    const clippingContext = builder.clippingContext;
    const { intersectionPlanes, unionPlanes } = clippingContext;
    this.hardwareClipping = builder.hardwareClipping;
    if (this.scope === _ClippingNode.ALPHA_TO_COVERAGE) {
      return this.setupAlphaToCoverage(intersectionPlanes, unionPlanes);
    } else if (this.scope === _ClippingNode.HARDWARE) {
      return this.setupHardwareClipping(unionPlanes, builder);
    } else {
      return this.setupDefault(intersectionPlanes, unionPlanes);
    }
  }
  /**
   * Setups alpha to coverage.
   *
   * @param {Array<Vector4>} intersectionPlanes - The intersection planes.
   * @param {Array<Vector4>} unionPlanes - The union planes.
   * @return {Node} The result node.
   */
  setupAlphaToCoverage(intersectionPlanes, unionPlanes) {
    return Fn(() => {
      const distanceToPlane = float().toVar("distanceToPlane");
      const distanceGradient = float().toVar("distanceToGradient");
      const clipOpacity = float(1).toVar("clipOpacity");
      const numUnionPlanes = unionPlanes.length;
      if (this.hardwareClipping === false && numUnionPlanes > 0) {
        const clippingPlanes = uniformArray(unionPlanes).setGroup(renderGroup);
        Loop(numUnionPlanes, ({ i }) => {
          const plane = clippingPlanes.element(i);
          distanceToPlane.assign(positionView.dot(plane.xyz).negate().add(plane.w));
          distanceGradient.assign(distanceToPlane.fwidth().div(2));
          clipOpacity.mulAssign(smoothstep2(distanceGradient.negate(), distanceGradient, distanceToPlane));
        });
      }
      const numIntersectionPlanes = intersectionPlanes.length;
      if (numIntersectionPlanes > 0) {
        const clippingPlanes = uniformArray(intersectionPlanes).setGroup(renderGroup);
        const intersectionClipOpacity = float(1).toVar("intersectionClipOpacity");
        Loop(numIntersectionPlanes, ({ i }) => {
          const plane = clippingPlanes.element(i);
          distanceToPlane.assign(positionView.dot(plane.xyz).negate().add(plane.w));
          distanceGradient.assign(distanceToPlane.fwidth().div(2));
          intersectionClipOpacity.mulAssign(smoothstep2(distanceGradient.negate(), distanceGradient, distanceToPlane).oneMinus());
        });
        clipOpacity.mulAssign(intersectionClipOpacity.oneMinus());
      }
      diffuseColor.a.mulAssign(clipOpacity);
      diffuseColor.a.equal(0).discard();
    })();
  }
  /**
   * Setups the default clipping.
   *
   * @param {Array<Vector4>} intersectionPlanes - The intersection planes.
   * @param {Array<Vector4>} unionPlanes - The union planes.
   * @return {Node} The result node.
   */
  setupDefault(intersectionPlanes, unionPlanes) {
    return Fn(() => {
      const numUnionPlanes = unionPlanes.length;
      if (this.hardwareClipping === false && numUnionPlanes > 0) {
        const clippingPlanes = uniformArray(unionPlanes).setGroup(renderGroup);
        Loop(numUnionPlanes, ({ i }) => {
          const plane = clippingPlanes.element(i);
          positionView.dot(plane.xyz).greaterThan(plane.w).discard();
        });
      }
      const numIntersectionPlanes = intersectionPlanes.length;
      if (numIntersectionPlanes > 0) {
        const clippingPlanes = uniformArray(intersectionPlanes).setGroup(renderGroup);
        const clipped = bool(true).toVar("clipped");
        Loop(numIntersectionPlanes, ({ i }) => {
          const plane = clippingPlanes.element(i);
          clipped.assign(positionView.dot(plane.xyz).greaterThan(plane.w).and(clipped));
        });
        clipped.discard();
      }
    })();
  }
  /**
   * Setups hardware clipping.
   *
   * @param {Array<Vector4>} unionPlanes - The union planes.
   * @param {NodeBuilder} builder - The current node builder.
   * @return {Node} The result node.
   */
  setupHardwareClipping(unionPlanes, builder) {
    const numUnionPlanes = unionPlanes.length;
    builder.enableHardwareClipping(numUnionPlanes);
    return Fn(() => {
      const clippingPlanes = uniformArray(unionPlanes).setGroup(renderGroup);
      const hw_clip_distances = builtin(builder.getClipDistance());
      Loop(numUnionPlanes, ({ i }) => {
        const plane = clippingPlanes.element(i);
        const distance2 = positionView.dot(plane.xyz).sub(plane.w).negate();
        hw_clip_distances.element(i).assign(distance2);
      });
    })();
  }
};
ClippingNode.ALPHA_TO_COVERAGE = "alphaToCoverage";
ClippingNode.DEFAULT = "default";
ClippingNode.HARDWARE = "hardware";
var worldStart = varyingProperty("vec3", "worldStart");
var worldEnd = varyingProperty("vec3", "worldEnd");
var lineDistance = varyingProperty("float", "lineDistance");
var worldPos = varyingProperty("vec4", "worldPos");
var trimSegmentAlpha = Fn(({ start, end }) => {
  const a = cameraProjectionMatrix.element(2).element(2);
  const b = cameraProjectionMatrix.element(3).element(2);
  const nearEstimate = a.greaterThan(0).select(b.negate().div(a.add(1)), b.mul(-0.5).div(a));
  return nearEstimate.sub(start.z).div(end.z.sub(start.z));
}, { start: "vec4", end: "vec4", return: "float" });
var closestLineToLine = Fn(({ p1, p2, p3, p4 }) => {
  const p13 = p1.sub(p3);
  const p43 = p4.sub(p3);
  const p21 = p2.sub(p1);
  const d1343 = p13.dot(p43);
  const d4321 = p43.dot(p21);
  const d1321 = p13.dot(p21);
  const d4343 = p43.dot(p43);
  const d2121 = p21.dot(p21);
  const denom = d2121.mul(d4343).sub(d4321.mul(d4321));
  const numer = d1343.mul(d4321).sub(d1321.mul(d4343));
  const mua = numer.div(denom).clamp();
  const mub = d1343.add(d4321.mul(mua)).div(d4343).clamp();
  return vec2(mua, mub);
}, { p1: "vec3", p2: "vec3", p3: "vec3", p4: "vec3", return: "vec2" });
var mvpLine = Fn(({ material }) => {
  const useDash = material._useDash;
  const useWorldUnits = material._useWorldUnits;
  const instanceStart = attribute("instanceStart");
  const instanceEnd = attribute("instanceEnd");
  const start = vec4(modelViewMatrix.mul(vec4(instanceStart, 1))).toVar("start");
  const end = vec4(modelViewMatrix.mul(vec4(instanceEnd, 1))).toVar("end");
  let distanceStart, distanceEnd;
  if (useDash) {
    distanceStart = float(attribute("instanceDistanceStart")).toVar("distanceStart");
    distanceEnd = float(attribute("instanceDistanceEnd")).toVar("distanceEnd");
  }
  if (useWorldUnits) {
    worldStart.assign(start.xyz);
    worldEnd.assign(end.xyz);
  }
  const aspect = viewport.z.div(viewport.w);
  const perspective = cameraProjectionMatrix.element(2).element(3).equal(-1);
  If(perspective, () => {
    If(start.z.lessThan(0).and(end.z.greaterThan(0)), () => {
      const alpha = trimSegmentAlpha({ start, end });
      end.assign(vec4(mix(start.xyz, end.xyz, alpha), end.w));
      if (useDash) {
        distanceEnd.assign(mix(distanceStart, distanceEnd, alpha));
      }
    }).ElseIf(end.z.lessThan(0).and(start.z.greaterThanEqual(0)), () => {
      const alpha = trimSegmentAlpha({ start: end, end: start });
      start.assign(vec4(mix(end.xyz, start.xyz, alpha), start.w));
      if (useDash) {
        distanceStart.assign(mix(distanceEnd, distanceStart, alpha));
      }
    });
  });
  if (useDash) {
    const dashScaleNode = material.dashScaleNode ? float(material.dashScaleNode) : materialLineScale;
    const offsetNode = material.offsetNode ? float(material.offsetNode) : materialLineDashOffset;
    let lineDist = positionGeometry.y.lessThan(0.5).select(dashScaleNode.mul(distanceStart), dashScaleNode.mul(distanceEnd));
    lineDist = lineDist.add(offsetNode);
    lineDistance.assign(lineDist);
  }
  const clipStart = cameraProjectionMatrix.mul(start);
  const clipEnd = cameraProjectionMatrix.mul(end);
  const ndcStart = clipStart.xyz.div(clipStart.w);
  const ndcEnd = clipEnd.xyz.div(clipEnd.w);
  const dir = ndcEnd.xy.sub(ndcStart.xy).toVar();
  dir.x.assign(dir.x.mul(aspect));
  dir.assign(dir.normalize());
  const clip = vec4().toVar();
  if (useWorldUnits) {
    const worldDir = end.xyz.sub(start.xyz).normalize();
    const tmpFwd = mix(start.xyz, end.xyz, 0.5).normalize();
    const worldUp = worldDir.cross(tmpFwd).normalize();
    const worldFwd = worldDir.cross(worldUp);
    worldPos.assign(positionGeometry.y.lessThan(0.5).select(start, end));
    const hw = materialLineWidth.mul(0.5);
    worldPos.addAssign(vec4(positionGeometry.x.lessThan(0).select(worldUp.mul(hw), worldUp.mul(hw).negate()), 0));
    if (!useDash) {
      worldPos.addAssign(vec4(positionGeometry.y.lessThan(0.5).select(worldDir.mul(hw).negate(), worldDir.mul(hw)), 0));
      worldPos.addAssign(vec4(worldFwd.mul(hw), 0));
      If(positionGeometry.y.greaterThan(1).or(positionGeometry.y.lessThan(0)), () => {
        worldPos.subAssign(vec4(worldFwd.mul(2).mul(hw), 0));
      });
    }
    clip.assign(cameraProjectionMatrix.mul(worldPos));
    const clipPose = vec3().toVar();
    clipPose.assign(positionGeometry.y.lessThan(0.5).select(ndcStart, ndcEnd));
    clip.z.assign(clipPose.z.mul(clip.w));
  } else {
    const offset = vec2(dir.y, dir.x.negate()).toVar("offset");
    dir.x.assign(dir.x.div(aspect));
    offset.x.assign(offset.x.div(aspect));
    offset.assign(positionGeometry.x.lessThan(0).select(offset.negate(), offset));
    If(positionGeometry.y.lessThan(0), () => {
      offset.assign(offset.sub(dir));
    }).ElseIf(positionGeometry.y.greaterThan(1), () => {
      offset.assign(offset.add(dir));
    });
    offset.assign(offset.mul(materialLineWidth));
    offset.assign(offset.div(viewport.w.div(screenDPR)));
    clip.assign(positionGeometry.y.lessThan(0.5).select(clipStart, clipEnd));
    offset.assign(offset.mul(clip.w));
    clip.assign(clip.add(vec4(offset, 0, 0)));
  }
  return clip;
})();
var alphaLine = Fn(({ material, renderer }) => {
  const useAlphaToCoverage = material._useAlphaToCoverage;
  const useDash = material._useDash;
  const useWorldUnits = material._useWorldUnits;
  const vUv = uv$1();
  if (useDash) {
    const dashSizeNode = material.dashSizeNode ? float(material.dashSizeNode) : materialLineDashSize;
    const gapSizeNode = material.gapSizeNode ? float(material.gapSizeNode) : materialLineGapSize;
    dashSize.assign(dashSizeNode);
    gapSize.assign(gapSizeNode);
    vUv.y.lessThan(-1).or(vUv.y.greaterThan(1)).discard();
    lineDistance.mod(dashSize.add(gapSize)).greaterThan(dashSize).discard();
  }
  const alpha = float(1).toVar("alpha");
  if (useWorldUnits) {
    const rayEnd = worldPos.xyz.normalize().mul(1e5);
    const lineDir = worldEnd.sub(worldStart);
    const params = closestLineToLine({ p1: worldStart, p2: worldEnd, p3: vec3(0, 0, 0), p4: rayEnd });
    const p1 = worldStart.add(lineDir.mul(params.x));
    const p2 = rayEnd.mul(params.y);
    const delta = p1.sub(p2);
    const len = delta.length();
    const norm = len.div(materialLineWidth);
    if (!useDash) {
      if (useAlphaToCoverage && renderer.currentSamples > 0) {
        const dnorm = norm.fwidth();
        alpha.assign(smoothstep2(dnorm.negate().add(0.5), dnorm.add(0.5), norm).oneMinus());
      } else {
        norm.greaterThan(0.5).discard();
      }
    }
  } else {
    if (useAlphaToCoverage && renderer.currentSamples > 0) {
      const a = vUv.x;
      const b = vUv.y.greaterThan(0).select(vUv.y.sub(1), vUv.y.add(1));
      const len2 = a.mul(a).add(b.mul(b));
      const dlen = float(len2.fwidth()).toVar("dlen");
      If(vUv.y.abs().greaterThan(1), () => {
        alpha.assign(smoothstep2(dlen.oneMinus(), dlen.add(1), len2).oneMinus());
      });
    } else {
      If(vUv.y.abs().greaterThan(1), () => {
        const a = vUv.x;
        const b = vUv.y.greaterThan(0).select(vUv.y.sub(1), vUv.y.add(1));
        const len2 = a.mul(a).add(b.mul(b));
        len2.greaterThan(1).discard();
      });
    }
  }
  return alpha;
})();
var RECIPROCAL_PI = /* @__PURE__ */ float(1 / Math.PI);
var DATA = new Uint16Array([
  12469,
  15057,
  12620,
  14925,
  13266,
  14620,
  13807,
  14376,
  14323,
  13990,
  14545,
  13625,
  14713,
  13328,
  14840,
  12882,
  14931,
  12528,
  14996,
  12233,
  15039,
  11829,
  15066,
  11525,
  15080,
  11295,
  15085,
  10976,
  15082,
  10705,
  15073,
  10495,
  13880,
  14564,
  13898,
  14542,
  13977,
  14430,
  14158,
  14124,
  14393,
  13732,
  14556,
  13410,
  14702,
  12996,
  14814,
  12596,
  14891,
  12291,
  14937,
  11834,
  14957,
  11489,
  14958,
  11194,
  14943,
  10803,
  14921,
  10506,
  14893,
  10278,
  14858,
  9960,
  14484,
  14039,
  14487,
  14025,
  14499,
  13941,
  14524,
  13740,
  14574,
  13468,
  14654,
  13106,
  14743,
  12678,
  14818,
  12344,
  14867,
  11893,
  14889,
  11509,
  14893,
  11180,
  14881,
  10751,
  14852,
  10428,
  14812,
  10128,
  14765,
  9754,
  14712,
  9466,
  14764,
  13480,
  14764,
  13475,
  14766,
  13440,
  14766,
  13347,
  14769,
  13070,
  14786,
  12713,
  14816,
  12387,
  14844,
  11957,
  14860,
  11549,
  14868,
  11215,
  14855,
  10751,
  14825,
  10403,
  14782,
  10044,
  14729,
  9651,
  14666,
  9352,
  14599,
  9029,
  14967,
  12835,
  14966,
  12831,
  14963,
  12804,
  14954,
  12723,
  14936,
  12564,
  14917,
  12347,
  14900,
  11958,
  14886,
  11569,
  14878,
  11247,
  14859,
  10765,
  14828,
  10401,
  14784,
  10011,
  14727,
  9600,
  14660,
  9289,
  14586,
  8893,
  14508,
  8533,
  15111,
  12234,
  15110,
  12234,
  15104,
  12216,
  15092,
  12156,
  15067,
  12010,
  15028,
  11776,
  14981,
  11500,
  14942,
  11205,
  14902,
  10752,
  14861,
  10393,
  14812,
  9991,
  14752,
  9570,
  14682,
  9252,
  14603,
  8808,
  14519,
  8445,
  14431,
  8145,
  15209,
  11449,
  15208,
  11451,
  15202,
  11451,
  15190,
  11438,
  15163,
  11384,
  15117,
  11274,
  15055,
  10979,
  14994,
  10648,
  14932,
  10343,
  14871,
  9936,
  14803,
  9532,
  14729,
  9218,
  14645,
  8742,
  14556,
  8381,
  14461,
  8020,
  14365,
  7603,
  15273,
  10603,
  15272,
  10607,
  15267,
  10619,
  15256,
  10631,
  15231,
  10614,
  15182,
  10535,
  15118,
  10389,
  15042,
  10167,
  14963,
  9787,
  14883,
  9447,
  14800,
  9115,
  14710,
  8665,
  14615,
  8318,
  14514,
  7911,
  14411,
  7507,
  14279,
  7198,
  15314,
  9675,
  15313,
  9683,
  15309,
  9712,
  15298,
  9759,
  15277,
  9797,
  15229,
  9773,
  15166,
  9668,
  15084,
  9487,
  14995,
  9274,
  14898,
  8910,
  14800,
  8539,
  14697,
  8234,
  14590,
  7790,
  14479,
  7409,
  14367,
  7067,
  14178,
  6621,
  15337,
  8619,
  15337,
  8631,
  15333,
  8677,
  15325,
  8769,
  15305,
  8871,
  15264,
  8940,
  15202,
  8909,
  15119,
  8775,
  15022,
  8565,
  14916,
  8328,
  14804,
  8009,
  14688,
  7614,
  14569,
  7287,
  14448,
  6888,
  14321,
  6483,
  14088,
  6171,
  15350,
  7402,
  15350,
  7419,
  15347,
  7480,
  15340,
  7613,
  15322,
  7804,
  15287,
  7973,
  15229,
  8057,
  15148,
  8012,
  15046,
  7846,
  14933,
  7611,
  14810,
  7357,
  14682,
  7069,
  14552,
  6656,
  14421,
  6316,
  14251,
  5948,
  14007,
  5528,
  15356,
  5942,
  15356,
  5977,
  15353,
  6119,
  15348,
  6294,
  15332,
  6551,
  15302,
  6824,
  15249,
  7044,
  15171,
  7122,
  15070,
  7050,
  14949,
  6861,
  14818,
  6611,
  14679,
  6349,
  14538,
  6067,
  14398,
  5651,
  14189,
  5311,
  13935,
  4958,
  15359,
  4123,
  15359,
  4153,
  15356,
  4296,
  15353,
  4646,
  15338,
  5160,
  15311,
  5508,
  15263,
  5829,
  15188,
  6042,
  15088,
  6094,
  14966,
  6001,
  14826,
  5796,
  14678,
  5543,
  14527,
  5287,
  14377,
  4985,
  14133,
  4586,
  13869,
  4257,
  15360,
  1563,
  15360,
  1642,
  15358,
  2076,
  15354,
  2636,
  15341,
  3350,
  15317,
  4019,
  15273,
  4429,
  15203,
  4732,
  15105,
  4911,
  14981,
  4932,
  14836,
  4818,
  14679,
  4621,
  14517,
  4386,
  14359,
  4156,
  14083,
  3795,
  13808,
  3437,
  15360,
  122,
  15360,
  137,
  15358,
  285,
  15355,
  636,
  15344,
  1274,
  15322,
  2177,
  15281,
  2765,
  15215,
  3223,
  15120,
  3451,
  14995,
  3569,
  14846,
  3567,
  14681,
  3466,
  14511,
  3305,
  14344,
  3121,
  14037,
  2800,
  13753,
  2467,
  15360,
  0,
  15360,
  1,
  15359,
  21,
  15355,
  89,
  15346,
  253,
  15325,
  479,
  15287,
  796,
  15225,
  1148,
  15133,
  1492,
  15008,
  1749,
  14856,
  1882,
  14685,
  1886,
  14506,
  1783,
  14324,
  1608,
  13996,
  1398,
  13702,
  1183
]);
var bC = 1 / 6;
var clearcoatF0 = vec3(0.04);
var clearcoatF90 = float(1);
var getDirection = /* @__PURE__ */ Fn(([uv_immutable, face]) => {
  const uv2 = uv_immutable.toVar();
  uv2.assign(mul(2, uv2).sub(1));
  const direction = vec3(uv2, 1).toVar();
  If(face.equal(0), () => {
    direction.assign(direction.zyx);
  }).ElseIf(face.equal(1), () => {
    direction.assign(direction.xzy);
    direction.xz.mulAssign(-1);
  }).ElseIf(face.equal(2), () => {
    direction.x.mulAssign(-1);
  }).ElseIf(face.equal(3), () => {
    direction.assign(direction.zyx);
    direction.xz.mulAssign(-1);
  }).ElseIf(face.equal(4), () => {
    direction.assign(direction.xzy);
    direction.xy.mulAssign(-1);
  }).ElseIf(face.equal(5), () => {
    direction.z.mulAssign(-1);
  });
  return direction;
}).setLayout({
  name: "getDirection",
  type: "vec3",
  inputs: [
    { name: "uv", type: "vec2" },
    { name: "face", type: "float" }
  ]
});
var _direction = /* @__PURE__ */ getDirection(uv$1(), attribute("faceIndex")).normalize();
var _outputDirection = /* @__PURE__ */ vec3(_direction.x, _direction.y, _direction.z);
var scatteringDensity = property("vec3");
var linearDepthRay = property("vec3");
var outgoingRayLight = property("vec3");
var OverrideContextNode = class extends ContextNode {
  /**
   * Returns the type of the node.
   *
   * @type {string}
   * @readonly
   * @static
   */
  static get type() {
    return "OverrideContextNode";
  }
  /**
   * Constructs a new override context node.
   *
   * @param {Map<Node, Function>} overrideNodes - A map mapping target nodes to their respective override callback functions.
   * @param {Node|null} [flowNode=null] - The node whose context should be modified.
   */
  constructor(overrideNodes2, flowNode = null) {
    super(flowNode, {
      overrideNodes: overrideNodes2
    });
    this.isOverrideContextNode = true;
  }
  /**
   * Gathers the context data from all parent context nodes by traversing the hierarchy,
   * merging the `overrideNodes` maps from all encountered `OverrideContextNode` instances.
   *
   * @return {Object} The gathered context data, containing the merged `overrideNodes` map.
   */
  getFlowContextData() {
    const children = [];
    this.traverse((node) => {
      if (node.isOverrideContextNode === true) {
        children.push(node.value.overrideNodes);
      }
    });
    const overrideNodes2 = new Map(children.flatMap((map) => Array.from(map.entries())));
    const data = super.getFlowContextData();
    data.overrideNodes = overrideNodes2;
    return data;
  }
};
function overrideNode(targetNode, callback = null, flowNode = null) {
  if (callback && callback.isNode) {
    const node = callback;
    callback = () => node;
  }
  return new OverrideContextNode(/* @__PURE__ */ new Map([[targetNode, callback]]), flowNode);
}
addMethodChaining("overrideNode", (flowNode, node, callback) => overrideNode(node, callback, flowNode));
function overrideNodes(overrides, flowNode = null) {
  const overrideNodesMap = /* @__PURE__ */ new Map();
  for (const [node, value] of overrides) {
    const callback = value !== null ? typeof value === "function" ? value : () => value : null;
    overrideNodesMap.set(node, callback);
  }
  return new OverrideContextNode(overrideNodesMap, flowNode);
}
addMethodChaining("overrideNodes", (flowNode, overrides) => overrideNodes(overrides, flowNode));
var BitcastNode = class extends TempNode {
  static get type() {
    return "BitcastNode";
  }
  /**
   * Constructs a new bitcast node.
   *
   * @param {Node} valueNode - The value to convert.
   * @param {string} conversionType - The type to convert to.
   * @param {?string} [inputType = null] - The expected input data type of the bitcast operation.
   */
  constructor(valueNode, conversionType, inputType = null) {
    super();
    this.valueNode = valueNode;
    this.conversionType = conversionType;
    this.inputType = inputType;
    this.isBitcastNode = true;
  }
  generateNodeType(builder) {
    if (this.inputType !== null) {
      const valueType = this.valueNode.getNodeType(builder);
      const valueLength = builder.getTypeLength(valueType);
      return builder.getTypeFromLength(valueLength, this.conversionType);
    }
    return this.conversionType;
  }
  generate(builder) {
    const type = this.getNodeType(builder);
    let inputType = "";
    if (this.inputType !== null) {
      const valueType = this.valueNode.getNodeType(builder);
      const valueTypeLength = builder.getTypeLength(valueType);
      inputType = valueTypeLength === 1 ? this.inputType : builder.changeComponentType(valueType, this.inputType);
    } else {
      inputType = this.valueNode.getNodeType(builder);
    }
    return `${builder.getBitcastMethod(type, inputType)}( ${this.valueNode.build(builder, inputType)} )`;
  }
};
var bitcast = /* @__PURE__ */ nodeProxyIntent(BitcastNode).setParameterLength(2);
var floatBitsToUint = (value) => new BitcastNode(value, "uint", "float");
var registeredBitcountFunctions = {};
var BitcountNode = class _BitcountNode extends MathNode {
  static get type() {
    return "BitcountNode";
  }
  /**
   * Constructs a new math node.
   *
   * @param {'countTrailingZeros'|'countLeadingZeros'|'countOneBits'} method - The method name.
   * @param {Node} aNode - The first input.
   */
  constructor(method, aNode) {
    super(method, aNode);
    this.isBitcountNode = true;
  }
  /**
   * Casts the input value of the function to an integer if necessary.
   *
   * @private
   * @param {Node<uint>|Node<int>} inputNode - The input value.
   * @param {Node<uint>} outputNode - The output value.
   * @param {string} elementType - The type of the input value.
   */
  _resolveElementType(inputNode, outputNode, elementType) {
    if (elementType === "int") {
      outputNode.assign(bitcast(inputNode, "uint"));
    } else {
      outputNode.assign(inputNode);
    }
  }
  _returnDataNode(inputType) {
    switch (inputType) {
      case "uint": {
        return uint;
      }
      case "int": {
        return int;
      }
      case "uvec2": {
        return uvec2;
      }
      case "uvec3": {
        return uvec3;
      }
      case "uvec4": {
        return uvec4;
      }
      case "ivec2": {
        return ivec2;
      }
      case "ivec3": {
        return ivec3;
      }
      case "ivec4": {
        return ivec4;
      }
    }
  }
  /**
   * Creates and registers a reusable GLSL function that emulates the behavior of countTrailingZeros.
   *
   * @private
   * @param {string} method - The name of the function to create.
   * @param {string} elementType - The type of the input value.
   * @returns {Function} - The generated function
   */
  _createTrailingZerosBaseLayout(method, elementType) {
    const outputConvertNode = this._returnDataNode(elementType);
    const fnDef = Fn(([value]) => {
      const v = uint(0);
      this._resolveElementType(value, v, elementType);
      const f = float(v.bitAnd(negate(v)));
      const uintBits = floatBitsToUint(f);
      const numTrailingZeros = uintBits.shiftRight(23).sub(127);
      return outputConvertNode(numTrailingZeros);
    }).setLayout({
      name: method,
      type: elementType,
      inputs: [
        { name: "value", type: elementType }
      ]
    });
    return fnDef;
  }
  /**
   * Creates and registers a reusable GLSL function that emulates the behavior of countLeadingZeros.
   *
   * @private
   * @param {string} method - The name of the function to create.
   * @param {string} elementType - The type of the input value.
   * @returns {Function} - The generated function
   */
  _createLeadingZerosBaseLayout(method, elementType) {
    const outputConvertNode = this._returnDataNode(elementType);
    const fnDef = Fn(([value]) => {
      If(value.equal(uint(0)), () => {
        return uint(32);
      });
      const v = uint(0);
      const n = uint(0);
      this._resolveElementType(value, v, elementType);
      If(v.shiftRight(16).equal(0), () => {
        n.addAssign(16);
        v.shiftLeftAssign(16);
      });
      If(v.shiftRight(24).equal(0), () => {
        n.addAssign(8);
        v.shiftLeftAssign(8);
      });
      If(v.shiftRight(28).equal(0), () => {
        n.addAssign(4);
        v.shiftLeftAssign(4);
      });
      If(v.shiftRight(30).equal(0), () => {
        n.addAssign(2);
        v.shiftLeftAssign(2);
      });
      If(v.shiftRight(31).equal(0), () => {
        n.addAssign(1);
      });
      return outputConvertNode(n);
    }).setLayout({
      name: method,
      type: elementType,
      inputs: [
        { name: "value", type: elementType }
      ]
    });
    return fnDef;
  }
  /**
   * Creates and registers a reusable GLSL function that emulates the behavior of countOneBits.
   *
   * @private
   * @param {string} method - The name of the function to create.
   * @param {string} elementType - The type of the input value.
   * @returns {Function} - The generated function
   */
  _createOneBitsBaseLayout(method, elementType) {
    const outputConvertNode = this._returnDataNode(elementType);
    const fnDef = Fn(([value]) => {
      const v = uint(0);
      this._resolveElementType(value, v, elementType);
      v.assign(v.sub(v.shiftRight(uint(1)).bitAnd(uint(1431655765))));
      v.assign(v.bitAnd(uint(858993459)).add(v.shiftRight(uint(2)).bitAnd(uint(858993459))));
      const numBits = v.add(v.shiftRight(uint(4))).bitAnd(uint(252645135)).mul(uint(16843009)).shiftRight(uint(24));
      return outputConvertNode(numBits);
    }).setLayout({
      name: method,
      type: elementType,
      inputs: [
        { name: "value", type: elementType }
      ]
    });
    return fnDef;
  }
  /**
   * Creates and registers a reusable GLSL function that emulates the behavior of the specified bitcount function.
   * including considerations for component-wise bitcounts on vector type inputs.
   *
   * @private
   * @param {string} method - The name of the function to create.
   * @param {string} inputType - The type of the input value.
   * @param {number} typeLength - The vec length of the input value.
   * @param {Function} baseFn - The base function that operates on an individual component of the vector.
   * @returns {Function} - The alias function for the specified bitcount method.
   */
  _createMainLayout(method, inputType, typeLength, baseFn) {
    const outputConvertNode = this._returnDataNode(inputType);
    const fnDef = Fn(([value]) => {
      if (typeLength === 1) {
        return outputConvertNode(baseFn(value));
      } else {
        const vec = outputConvertNode(0);
        const components = ["x", "y", "z", "w"];
        for (let i = 0; i < typeLength; i++) {
          const component = components[i];
          vec[component].assign(baseFn(value[component]));
        }
        return vec;
      }
    }).setLayout({
      name: method,
      type: inputType,
      inputs: [
        { name: "value", type: inputType }
      ]
    });
    return fnDef;
  }
  setup(builder) {
    const { method, aNode } = this;
    const { renderer } = builder;
    if (renderer.backend.isWebGPUBackend) {
      return super.setup(builder);
    }
    const inputType = this.getInputType(builder);
    const elementType = builder.getElementType(inputType);
    const typeLength = builder.getTypeLength(inputType);
    const baseMethod = `${method}_base_${elementType}`;
    const newMethod = `${method}_${inputType}`;
    let baseFn = registeredBitcountFunctions[baseMethod];
    if (baseFn === void 0) {
      switch (method) {
        case _BitcountNode.COUNT_LEADING_ZEROS: {
          baseFn = this._createLeadingZerosBaseLayout(baseMethod, elementType);
          break;
        }
        case _BitcountNode.COUNT_TRAILING_ZEROS: {
          baseFn = this._createTrailingZerosBaseLayout(baseMethod, elementType);
          break;
        }
        case _BitcountNode.COUNT_ONE_BITS: {
          baseFn = this._createOneBitsBaseLayout(baseMethod, elementType);
          break;
        }
      }
      registeredBitcountFunctions[baseMethod] = baseFn;
    }
    let fn = registeredBitcountFunctions[newMethod];
    if (fn === void 0) {
      fn = this._createMainLayout(newMethod, inputType, typeLength, baseFn);
      registeredBitcountFunctions[newMethod] = fn;
    }
    const output2 = Fn(() => {
      return fn(
        aNode
      );
    });
    return output2();
  }
};
BitcountNode.COUNT_TRAILING_ZEROS = "countTrailingZeros";
BitcountNode.COUNT_LEADING_ZEROS = "countLeadingZeros";
BitcountNode.COUNT_ONE_BITS = "countOneBits";
var _reflectorPlane = new Plane();
var _normal = new Vector3();
var _reflectorWorldPosition = new Vector3();
var _cameraWorldPosition = new Vector3();
var _rotationMatrix = new Matrix4();
var _lookAtPosition = new Vector3(0, 0, -1);
var clipPlane = new Vector4();
var _view = new Vector3();
var _target2 = new Vector3();
var _q = new Vector4();
var _size$2 = new Vector2();
var _defaultRT = new RenderTarget();
var _defaultUV = screenUV.flipX();
_defaultRT.depthTexture = new DepthTexture(1, 1);
var interleavedGradientNoise = Fn(([position]) => {
  return fract(float(52.9829189).mul(fract(dot(position, vec2(0.06711056, 583715e-8)))));
}).setLayout({
  name: "interleavedGradientNoise",
  type: "float",
  inputs: [
    { name: "position", type: "vec2" }
  ]
});
var vogelDiskSample = Fn(([sampleIndex, samplesCount, phi]) => {
  const goldenAngle = float(2.399963229728653);
  const r = sqrt(float(sampleIndex).add(0.5).div(float(samplesCount)));
  const theta = float(sampleIndex).mul(goldenAngle).add(phi);
  return vec2(cos(theta), sin(theta)).mul(r);
}).setLayout({
  name: "vogelDiskSample",
  type: "vec2",
  inputs: [
    { name: "sampleIndex", type: "int" },
    { name: "samplesCount", type: "int" },
    { name: "phi", type: "float" }
  ]
});
var normal = Fn(({ texture: texture2, uv: uv2 }) => {
  const epsilon = 1e-4;
  const ret = vec3().toVar();
  If(uv2.x.lessThan(epsilon), () => {
    ret.assign(vec3(1, 0, 0));
  }).ElseIf(uv2.y.lessThan(epsilon), () => {
    ret.assign(vec3(0, 1, 0));
  }).ElseIf(uv2.z.lessThan(epsilon), () => {
    ret.assign(vec3(0, 0, 1));
  }).ElseIf(uv2.x.greaterThan(1 - epsilon), () => {
    ret.assign(vec3(-1, 0, 0));
  }).ElseIf(uv2.y.greaterThan(1 - epsilon), () => {
    ret.assign(vec3(0, -1, 0));
  }).ElseIf(uv2.z.greaterThan(1 - epsilon), () => {
    ret.assign(vec3(0, 0, -1));
  }).Else(() => {
    const step2 = 0.01;
    const x = texture2.sample(uv2.add(vec3(-step2, 0, 0))).r.sub(texture2.sample(uv2.add(vec3(step2, 0, 0))).r);
    const y = texture2.sample(uv2.add(vec3(0, -step2, 0))).r.sub(texture2.sample(uv2.add(vec3(0, step2, 0))).r);
    const z = texture2.sample(uv2.add(vec3(0, 0, -step2))).r.sub(texture2.sample(uv2.add(vec3(0, 0, step2))).r);
    ret.assign(vec3(x, y, z));
  });
  return ret.normalize();
});
var posterize = Fn(([source, steps]) => {
  return source.mul(steps).floor().div(steps);
});
var _size = /* @__PURE__ */ new Vector2();
var PassTextureNode = class extends TextureNode {
  static get type() {
    return "PassTextureNode";
  }
  /**
   * Constructs a new pass texture node.
   *
   * @param {PassNode} passNode - The pass node.
   * @param {Texture} texture - The output texture.
   */
  constructor(passNode, texture2) {
    super(texture2);
    this.passNode = passNode;
    this.isPassTextureNode = true;
    this.setUpdateMatrix(false);
  }
  setup(builder) {
    const properties = builder.getNodeProperties(this);
    properties.passNode = this.passNode;
    return super.setup(builder);
  }
  clone() {
    return new this.constructor(this.passNode, this.value);
  }
};
var PassMultipleTextureNode = class extends PassTextureNode {
  static get type() {
    return "PassMultipleTextureNode";
  }
  /**
   * Constructs a new pass texture node.
   *
   * @param {PassNode} passNode - The pass node.
   * @param {string} textureName - The output texture name.
   * @param {boolean} [previousTexture=false] - Whether previous frame data should be used or not.
   */
  constructor(passNode, textureName, previousTexture = false) {
    super(passNode, null);
    this.textureName = textureName;
    this.previousTexture = previousTexture;
    this.isPassMultipleTextureNode = true;
  }
  /**
   * Updates the texture reference of this node.
   */
  updateTexture() {
    this.value = this.previousTexture ? this.passNode.getPreviousTexture(this.textureName) : this.passNode.getTexture(this.textureName);
  }
  setup(builder) {
    this.updateTexture();
    return super.setup(builder);
  }
  clone() {
    const newNode = new this.constructor(this.passNode, this.textureName, this.previousTexture);
    newNode.uvNode = this.uvNode;
    newNode.levelNode = this.levelNode;
    newNode.biasNode = this.biasNode;
    newNode.sampler = this.sampler;
    newNode.depthNode = this.depthNode;
    newNode.compareNode = this.compareNode;
    newNode.gradNode = this.gradNode;
    newNode.gatherNode = this.gatherNode;
    newNode.offsetNode = this.offsetNode;
    return newNode;
  }
};
var PassNode = class _PassNode extends TempNode {
  static get type() {
    return "PassNode";
  }
  /**
   * Constructs a new pass node.
   *
   * @param {('color'|'depth')} scope - The scope of the pass. The scope determines whether the node outputs color or depth.
   * @param {Scene} scene - A reference to the scene.
   * @param {Camera} camera - A reference to the camera.
   * @param {Object} options - Options for the internal render target.
   */
  constructor(scope, scene, camera, options = {}) {
    super("vec4");
    this.scope = scope;
    this.scene = scene;
    this.camera = camera;
    this.options = options;
    this._width = 1;
    this._height = 1;
    const renderTarget = new RenderTarget(this._width, this._height, { type: HalfFloatType, ...options });
    renderTarget.texture.name = "output";
    let depthTexture = null;
    if (this.scope === _PassNode.DEPTH || options.depthBuffer !== false) {
      depthTexture = new DepthTexture();
      depthTexture.isRenderTargetTexture = true;
      depthTexture.name = "depth";
      renderTarget.depthTexture = depthTexture;
    }
    this.renderTarget = renderTarget;
    this.overrideMaterial = null;
    this.transparent = true;
    this.opaque = true;
    this.contextNode = null;
    this._contextNodeCache = null;
    this._textures = {
      output: renderTarget.texture
    };
    if (depthTexture !== null) {
      this._textures.depth = depthTexture;
    }
    this._textureNodes = {};
    this._linearDepthNodes = {};
    this._viewZNodes = {};
    this._previousTextures = {};
    this._previousTextureNodes = {};
    this._cameraNear = uniform(0);
    this._cameraFar = uniform(0);
    this._mrt = null;
    this._layers = null;
    this._resolutionScale = 1;
    this._viewport = null;
    this._scissor = null;
    this.isPassNode = true;
    this.updateBeforeType = NodeUpdateType.FRAME;
    this.global = true;
  }
  /**
   * Sets the resolution scale for the pass.
   * The resolution scale is a factor that is multiplied with the renderer's width and height.
   *
   * @param {number} resolutionScale - The resolution scale to set. A value of `1` means full resolution.
   * @return {PassNode} A reference to this pass.
   */
  setResolutionScale(resolutionScale) {
    this._resolutionScale = resolutionScale;
    return this;
  }
  /**
   * Gets the current resolution scale of the pass.
   *
   * @return {number} The current resolution scale. A value of `1` means full resolution.
   */
  getResolutionScale() {
    return this._resolutionScale;
  }
  /**
   * Sets the resolution for the pass.
   * The resolution is a factor that is multiplied with the renderer's width and height.
   *
   * @param {number} resolution - The resolution to set. A value of `1` means full resolution.
   * @return {PassNode} A reference to this pass.
   * @deprecated since r181. Use {@link PassNode#setResolutionScale `setResolutionScale()`} instead.
   */
  setResolution(resolution) {
    warn("PassNode: .setResolution() is deprecated. Use .setResolutionScale() instead.");
    return this.setResolutionScale(resolution);
  }
  /**
   * Gets the current resolution of the pass.
   *
   * @return {number} The current resolution. A value of `1` means full resolution.
   * @deprecated since r181. Use {@link PassNode#getResolutionScale `getResolutionScale()`} instead.
   */
  getResolution() {
    warn("PassNode: .getResolution() is deprecated. Use .getResolutionScale() instead.");
    return this.getResolutionScale();
  }
  /**
   * Sets the layer configuration that should be used when rendering the pass.
   *
   * @param {Layers} layers - The layers object to set.
   * @return {PassNode} A reference to this pass.
   */
  setLayers(layers) {
    this._layers = layers;
    return this;
  }
  /**
   * Gets the current layer configuration of the pass.
   *
   * @return {?Layers} .
   */
  getLayers() {
    return this._layers;
  }
  /**
   * Sets the given MRT node to setup MRT for this pass.
   *
   * @param {MRTNode} mrt - The MRT object.
   * @return {PassNode} A reference to this pass.
   */
  setMRT(mrt) {
    this._mrt = mrt;
    return this;
  }
  /**
   * Returns the current MRT node.
   *
   * @return {MRTNode} The current MRT node.
   */
  getMRT() {
    return this._mrt;
  }
  /**
   * Returns the texture for the given output name.
   *
   * @param {string} name - The output name to get the texture for.
   * @return {Texture} The texture.
   */
  getTexture(name) {
    let texture2 = this._textures[name];
    if (texture2 === void 0) {
      if (name === "depth") {
        throw new Error("THREE.PassNode: Depth texture is not available for this pass.");
      }
      const refTexture = this.renderTarget.texture;
      texture2 = refTexture.clone();
      texture2.name = name;
      this._textures[name] = texture2;
      this.renderTarget.textures.push(texture2);
    }
    return texture2;
  }
  /**
   * Returns the texture holding the data of the previous frame for the given output name.
   *
   * @param {string} name - The output name to get the texture for.
   * @return {Texture} The texture holding the data of the previous frame.
   */
  getPreviousTexture(name) {
    let texture2 = this._previousTextures[name];
    if (texture2 === void 0) {
      texture2 = this.getTexture(name).clone();
      this._previousTextures[name] = texture2;
    }
    return texture2;
  }
  /**
   * Switches current and previous textures for the given output name.
   *
   * @param {string} name - The output name.
   */
  toggleTexture(name) {
    const prevTexture = this._previousTextures[name];
    if (prevTexture !== void 0) {
      const texture2 = this._textures[name];
      const index = this.renderTarget.textures.indexOf(texture2);
      this.renderTarget.textures[index] = prevTexture;
      this._textures[name] = prevTexture;
      this._previousTextures[name] = texture2;
      this._textureNodes[name].updateTexture();
      this._previousTextureNodes[name].updateTexture();
    }
  }
  /**
   * Returns the texture node for the given output name.
   *
   * @param {string} [name='output'] - The output name to get the texture node for.
   * @return {TextureNode} The texture node.
   */
  getTextureNode(name = "output") {
    let textureNode = this._textureNodes[name];
    if (textureNode === void 0) {
      textureNode = new PassMultipleTextureNode(this, name);
      textureNode.updateTexture();
      this._textureNodes[name] = textureNode;
    }
    return textureNode;
  }
  /**
   * Returns the previous texture node for the given output name.
   *
   * @param {string} [name='output'] - The output name to get the previous texture node for.
   * @return {TextureNode} The previous texture node.
   */
  getPreviousTextureNode(name = "output") {
    let textureNode = this._previousTextureNodes[name];
    if (textureNode === void 0) {
      if (this._textureNodes[name] === void 0) this.getTextureNode(name);
      textureNode = new PassMultipleTextureNode(this, name, true);
      textureNode.updateTexture();
      this._previousTextureNodes[name] = textureNode;
    }
    return textureNode;
  }
  /**
   * Returns a viewZ node of this pass.
   *
   * @param {string} [name='depth'] - The output name to get the viewZ node for. In most cases the default `'depth'` can be used however the parameter exists for custom depth outputs.
   * @return {Node} The viewZ node.
   */
  getViewZNode(name = "depth") {
    let viewZNode = this._viewZNodes[name];
    if (viewZNode === void 0) {
      const cameraNear2 = this._cameraNear;
      const cameraFar2 = this._cameraFar;
      this._viewZNodes[name] = viewZNode = perspectiveDepthToViewZ(this.getTextureNode(name), cameraNear2, cameraFar2);
    }
    return viewZNode;
  }
  /**
   * Returns a linear depth node of this pass.
   *
   * @param {string} [name='depth'] - The output name to get the linear depth node for. In most cases the default `'depth'` can be used however the parameter exists for custom depth outputs.
   * @return {Node} The linear depth node.
   */
  getLinearDepthNode(name = "depth") {
    let linearDepthNode = this._linearDepthNodes[name];
    if (linearDepthNode === void 0) {
      const cameraNear2 = this._cameraNear;
      const cameraFar2 = this._cameraFar;
      const viewZNode = this.getViewZNode(name);
      this._linearDepthNodes[name] = linearDepthNode = viewZToOrthographicDepth(viewZNode, cameraNear2, cameraFar2);
    }
    return linearDepthNode;
  }
  /**
   * Precompiles the pass.
   *
   * Note that this method must be called after the pass configuration is complete.
   * So calls like `setMRT()` and `getTextureNode()` must proceed the precompilation.
   *
   * @async
   * @param {Renderer} renderer - The renderer.
   * @return {Promise} A Promise that resolves when the compile has been finished.
   * @see {@link Renderer#compileAsync}
   */
  async compileAsync(renderer) {
    const currentRenderTarget = renderer.getRenderTarget();
    const currentMRT = renderer.getMRT();
    renderer.setRenderTarget(this.renderTarget);
    renderer.setMRT(this._mrt);
    await renderer.compileAsync(this.scene, this.camera);
    renderer.setRenderTarget(currentRenderTarget);
    renderer.setMRT(currentMRT);
  }
  setup({ renderer }) {
    this.renderTarget.samples = this.options.samples === void 0 ? renderer.samples : this.options.samples;
    this.renderTarget.texture.type = renderer.getOutputBufferType();
    if (renderer.reversedDepthBuffer === true && this.renderTarget.depthTexture !== null) {
      this.renderTarget.depthTexture.type = FloatType;
    }
    return this.scope === _PassNode.COLOR ? this.getTextureNode() : this.getLinearDepthNode();
  }
  updateBefore(frame) {
    const { renderer } = frame;
    const { scene } = this;
    let camera;
    const outputRenderTarget = renderer.getOutputRenderTarget();
    if (outputRenderTarget && outputRenderTarget.isXRRenderTarget === true) {
      camera = renderer.xr.getCamera();
      renderer.xr.updateCamera(camera);
      _size.set(outputRenderTarget.width, outputRenderTarget.height);
    } else {
      camera = this.camera;
      renderer.getDrawingBufferSize(_size);
    }
    this.setSize(_size.width, _size.height);
    const currentRenderTarget = renderer.getRenderTarget();
    const currentMRT = renderer.getMRT();
    const currentAutoClear = renderer.autoClear;
    const currentTransparent = renderer.transparent;
    const currentOpaque = renderer.opaque;
    const currentMask = camera.layers.mask;
    const currentContextNode = renderer.contextNode;
    const currentOverrideMaterial = scene.overrideMaterial;
    this._cameraNear.value = camera.near;
    this._cameraFar.value = camera.far;
    if (this._layers !== null) {
      camera.layers.mask = this._layers.mask;
    }
    for (const name in this._previousTextures) {
      this.toggleTexture(name);
    }
    if (this.overrideMaterial !== null) {
      scene.overrideMaterial = this.overrideMaterial;
    }
    renderer.setRenderTarget(this.renderTarget);
    renderer.setMRT(this._mrt);
    renderer.autoClear = true;
    renderer.transparent = this.transparent;
    renderer.opaque = this.opaque;
    if (this.contextNode !== null) {
      if (this._contextNodeCache === null || this._contextNodeCache.version !== this.version) {
        this._contextNodeCache = {
          version: this.version,
          context: context({ ...renderer.contextNode.getFlowContextData(), ...this.contextNode.getFlowContextData() })
        };
      }
      renderer.contextNode = this._contextNodeCache.context;
    }
    const currentSceneName = scene.name;
    scene.name = this.name ? this.name : scene.name;
    renderer.render(scene, camera);
    scene.name = currentSceneName;
    scene.overrideMaterial = currentOverrideMaterial;
    renderer.setRenderTarget(currentRenderTarget);
    renderer.setMRT(currentMRT);
    renderer.autoClear = currentAutoClear;
    renderer.transparent = currentTransparent;
    renderer.opaque = currentOpaque;
    renderer.contextNode = currentContextNode;
    camera.layers.mask = currentMask;
  }
  /**
   * Sets the size of the pass's render target. Honors the pixel ratio.
   *
   * @param {number} width - The width to set.
   * @param {number} height - The height to set.
   */
  setSize(width, height) {
    this._width = width;
    this._height = height;
    const effectiveWidth = Math.floor(this._width * this._resolutionScale);
    const effectiveHeight = Math.floor(this._height * this._resolutionScale);
    this.renderTarget.setSize(effectiveWidth, effectiveHeight);
    if (this._scissor !== null) {
      this.renderTarget.scissor.copy(this._scissor).multiplyScalar(this._resolutionScale).floor();
      this.renderTarget.scissorTest = true;
    } else {
      this.renderTarget.scissorTest = false;
    }
    if (this._viewport !== null) {
      this.renderTarget.viewport.copy(this._viewport).multiplyScalar(this._resolutionScale).floor();
    }
  }
  /**
   * This method allows to define the pass's scissor rectangle. By default, the scissor rectangle is kept
   * in sync with the pass's dimensions. To reverse the process and use auto-sizing again, call the method
   * with `null` as the single argument.
   *
   * @param {?(number | Vector4)} x - The horizontal coordinate for the lower left corner of the box in logical pixel unit.
   * Instead of passing four arguments, the method also works with a single four-dimensional vector.
   * @param {number} y - The vertical coordinate for the lower left corner of the box in logical pixel unit.
   * @param {number} width - The width of the scissor box in logical pixel unit.
   * @param {number} height - The height of the scissor box in logical pixel unit.
   */
  setScissor(x, y, width, height) {
    if (x === null) {
      this._scissor = null;
    } else {
      if (this._scissor === null) this._scissor = new Vector4();
      if (x.isVector4) {
        this._scissor.copy(x);
      } else {
        this._scissor.set(x, y, width, height);
      }
    }
  }
  /**
   * This method allows to define the pass's viewport. By default, the viewport is kept in sync
   * with the pass's dimensions. To reverse the process and use auto-sizing again, call the method
   * with `null` as the single argument.
   *
   * @param {number | Vector4} x - The horizontal coordinate for the lower left corner of the viewport origin in logical pixel unit.
   * @param {number} y - The vertical coordinate for the lower left corner of the viewport origin  in logical pixel unit.
   * @param {number} width - The width of the viewport in logical pixel unit.
   * @param {number} height - The height of the viewport in logical pixel unit.
   */
  setViewport(x, y, width, height) {
    if (x === null) {
      this._viewport = null;
    } else {
      if (this._viewport === null) this._viewport = new Vector4();
      if (x.isVector4) {
        this._viewport.copy(x);
      } else {
        this._viewport.set(x, y, width, height);
      }
    }
  }
  /**
   * Frees internal resources. Should be called when the node is no longer in use.
   */
  dispose() {
    this.renderTarget.dispose();
  }
};
PassNode.COLOR = "color";
PassNode.DEPTH = "depth";
var LINEAR_REC2020_TO_LINEAR_SRGB = /* @__PURE__ */ mat3(vec3(1.6605, -0.1246, -0.0182), vec3(-0.5876, 1.1329, -0.1006), vec3(-0.0728, -83e-4, 1.1187));
var LINEAR_SRGB_TO_LINEAR_REC2020 = /* @__PURE__ */ mat3(vec3(0.6274, 0.0691, 0.0164), vec3(0.3293, 0.9195, 0.088), vec3(0.0433, 0.0113, 0.8956));
var CodeNode = class extends Node {
  static get type() {
    return "CodeNode";
  }
  /**
   * Constructs a new code node.
   *
   * @param {string} [code=''] - The native code.
   * @param {Array<Node>} [includes=[]] - An array of includes.
   * @param {('js'|'wgsl'|'glsl')} [language=''] - The used language.
   */
  constructor(code = "", includes = [], language = "") {
    super("code");
    this.isCodeNode = true;
    this.global = true;
    this.code = code;
    this.includes = includes;
    this.language = language;
  }
  /**
   * Sets the includes of this code node.
   *
   * @param {Array<Node>} includes - The includes to set.
   * @return {CodeNode} A reference to this node.
   */
  setIncludes(includes) {
    this.includes = includes;
    return this;
  }
  /**
   * Returns the includes of this code node.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {Array<Node>} The includes.
   */
  getIncludes() {
    return this.includes;
  }
  generate(builder) {
    const includes = this.getIncludes(builder);
    for (const include of includes) {
      include.build(builder);
    }
    const nodeCode = builder.getCodeFromNode(this, this.getNodeType(builder));
    nodeCode.code = this.code;
    return nodeCode.code;
  }
  serialize(data) {
    super.serialize(data);
    data.code = this.code;
    data.language = this.language;
  }
  deserialize(data) {
    super.deserialize(data);
    this.code = data.code;
    this.language = data.language;
  }
};
function getViewZNode(builder) {
  let viewZ;
  const getViewZ = builder.context.getViewZ;
  if (getViewZ !== void 0) {
    viewZ = getViewZ(this);
  }
  return (viewZ || positionView.z).negate();
}
var rangeFogFactor = Fn(([near, far], builder) => {
  const viewZ = getViewZNode(builder);
  return smoothstep2(near, far, viewZ);
});
var densityFogFactor = Fn(([density], builder) => {
  const viewZ = getViewZNode(builder);
  return density.mul(density, viewZ, viewZ).negate().exp().oneMinus();
});
var exponentialHeightFogFactor = Fn(([density, height], builder) => {
  const viewZ = getViewZNode(builder);
  const distance2 = height.sub(positionWorld.y).max(0).toConst();
  const m = distance2.mul(viewZ).toConst();
  return density.mul(density, m, m).negate().exp().oneMinus();
});
var fog = Fn(([color2, factor]) => {
  return vec4(factor.toFloat().mix(output.rgb, color2.toVec3()), output.a);
});
var BarrierNode = class extends Node {
  /**
   * Constructs a new barrier node.
   *
   * @param {string} scope - The scope defines the behavior of the node.
   */
  constructor(scope) {
    super();
    this.scope = scope;
    this.isBarrierNode = true;
  }
  setup(builder) {
    builder.allowEarlyReturns = false;
    builder.allowGlobalVariables = false;
  }
  generate(builder) {
    const { scope } = this;
    const { renderer } = builder;
    if (renderer.backend.isWebGLBackend === true) {
      builder.addFlowCode(`	// ${scope}Barrier 
`);
    } else {
      builder.addLineFlowCode(`${scope}Barrier()`, this);
    }
  }
};
var barrier = nodeProxy(BarrierNode);
var AtomicFunctionNode = class extends Node {
  static get type() {
    return "AtomicFunctionNode";
  }
  /**
   * Constructs a new atomic function node.
   *
   * @param {string} method - The signature of the atomic function to construct.
   * @param {Node} pointerNode - An atomic variable or element of an atomic buffer.
   * @param {Node} valueNode - The value that mutates the atomic variable.
   */
  constructor(method, pointerNode, valueNode) {
    super("uint");
    this.method = method;
    this.pointerNode = pointerNode;
    this.valueNode = valueNode;
    this.parents = true;
  }
  /**
   * Overwrites the default implementation to return the type of
   * the pointer node.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {string} The input type.
   */
  getInputType(builder) {
    return this.pointerNode.getNodeType(builder);
  }
  /**
   * Overwritten since the node type is inferred from the input type.
   *
   * @param {NodeBuilder} builder - The current node builder.
   * @return {string} The node type.
   */
  generateNodeType(builder) {
    return this.getInputType(builder);
  }
  generate(builder) {
    const properties = builder.getNodeProperties(this);
    const parents = properties.parents;
    const method = this.method;
    const type = this.getNodeType(builder);
    const inputType = this.getInputType(builder);
    const a = this.pointerNode;
    const b = this.valueNode;
    const params = [];
    params.push(`&${a.build(builder, inputType)}`);
    if (b !== null) {
      params.push(b.build(builder, inputType));
    }
    const methodSnippet = `${builder.getMethod(method, type)}( ${params.join(", ")} )`;
    const isVoid = parents ? parents.length === 1 && parents[0].isStackNode === true : false;
    if (isVoid) {
      builder.addLineFlowCode(methodSnippet, this);
    } else {
      if (properties.constNode === void 0) {
        properties.constNode = expression(methodSnippet, type).toConst();
      }
      return properties.constNode.build(builder);
    }
  }
};
AtomicFunctionNode.ATOMIC_LOAD = "atomicLoad";
AtomicFunctionNode.ATOMIC_STORE = "atomicStore";
AtomicFunctionNode.ATOMIC_ADD = "atomicAdd";
AtomicFunctionNode.ATOMIC_SUB = "atomicSub";
AtomicFunctionNode.ATOMIC_MAX = "atomicMax";
AtomicFunctionNode.ATOMIC_MIN = "atomicMin";
AtomicFunctionNode.ATOMIC_AND = "atomicAnd";
AtomicFunctionNode.ATOMIC_OR = "atomicOr";
AtomicFunctionNode.ATOMIC_XOR = "atomicXor";
var atomicNode = nodeProxy(AtomicFunctionNode);
var SubgroupFunctionNode = class _SubgroupFunctionNode extends TempNode {
  static get type() {
    return "SubgroupFunctionNode";
  }
  /**
   * Constructs a new function node.
   *
   * @param {string} method - The subgroup/wave intrinsic method to construct.
   * @param {Node} [aNode=null] - The method's first argument.
   * @param {Node} [bNode=null] - The method's second argument.
   */
  constructor(method, aNode = null, bNode = null) {
    super();
    this.method = method;
    this.aNode = aNode;
    this.bNode = bNode;
  }
  getInputType(builder) {
    const aType = this.aNode ? this.aNode.getNodeType(builder) : null;
    const bType = this.bNode ? this.bNode.getNodeType(builder) : null;
    const aLen = builder.isMatrix(aType) ? 0 : builder.getTypeLength(aType);
    const bLen = builder.isMatrix(bType) ? 0 : builder.getTypeLength(bType);
    if (aLen > bLen) {
      return aType;
    } else {
      return bType;
    }
  }
  generateNodeType(builder) {
    const method = this.method;
    if (method === _SubgroupFunctionNode.SUBGROUP_ELECT) {
      return "bool";
    } else if (method === _SubgroupFunctionNode.SUBGROUP_BALLOT) {
      return "uvec4";
    } else {
      return this.getInputType(builder);
    }
  }
  generate(builder, output2) {
    const method = this.method;
    const type = this.getNodeType(builder);
    const inputType = this.getInputType(builder);
    const a = this.aNode;
    const b = this.bNode;
    const params = [];
    if (method === _SubgroupFunctionNode.SUBGROUP_BROADCAST || method === _SubgroupFunctionNode.SUBGROUP_SHUFFLE || method === _SubgroupFunctionNode.QUAD_BROADCAST) {
      const bType = b.getNodeType(builder);
      params.push(
        a.build(builder, type),
        b.build(builder, bType === "float" ? "int" : type)
      );
    } else if (method === _SubgroupFunctionNode.SUBGROUP_SHUFFLE_XOR || method === _SubgroupFunctionNode.SUBGROUP_SHUFFLE_DOWN || method === _SubgroupFunctionNode.SUBGROUP_SHUFFLE_UP) {
      params.push(
        a.build(builder, type),
        b.build(builder, "uint")
      );
    } else {
      if (a !== null) params.push(a.build(builder, inputType));
      if (b !== null) params.push(b.build(builder, inputType));
    }
    const paramsString = params.length === 0 ? "()" : `( ${params.join(", ")} )`;
    return builder.format(`${builder.getMethod(method, type)}${paramsString}`, type, output2);
  }
  serialize(data) {
    super.serialize(data);
    data.method = this.method;
  }
  deserialize(data) {
    super.deserialize(data);
    this.method = data.method;
  }
};
SubgroupFunctionNode.SUBGROUP_ELECT = "subgroupElect";
SubgroupFunctionNode.SUBGROUP_BALLOT = "subgroupBallot";
SubgroupFunctionNode.SUBGROUP_ADD = "subgroupAdd";
SubgroupFunctionNode.SUBGROUP_INCLUSIVE_ADD = "subgroupInclusiveAdd";
SubgroupFunctionNode.SUBGROUP_EXCLUSIVE_AND = "subgroupExclusiveAdd";
SubgroupFunctionNode.SUBGROUP_MUL = "subgroupMul";
SubgroupFunctionNode.SUBGROUP_INCLUSIVE_MUL = "subgroupInclusiveMul";
SubgroupFunctionNode.SUBGROUP_EXCLUSIVE_MUL = "subgroupExclusiveMul";
SubgroupFunctionNode.SUBGROUP_AND = "subgroupAnd";
SubgroupFunctionNode.SUBGROUP_OR = "subgroupOr";
SubgroupFunctionNode.SUBGROUP_XOR = "subgroupXor";
SubgroupFunctionNode.SUBGROUP_MIN = "subgroupMin";
SubgroupFunctionNode.SUBGROUP_MAX = "subgroupMax";
SubgroupFunctionNode.SUBGROUP_ALL = "subgroupAll";
SubgroupFunctionNode.SUBGROUP_ANY = "subgroupAny";
SubgroupFunctionNode.SUBGROUP_BROADCAST_FIRST = "subgroupBroadcastFirst";
SubgroupFunctionNode.QUAD_SWAP_X = "quadSwapX";
SubgroupFunctionNode.QUAD_SWAP_Y = "quadSwapY";
SubgroupFunctionNode.QUAD_SWAP_DIAGONAL = "quadSwapDiagonal";
SubgroupFunctionNode.SUBGROUP_BROADCAST = "subgroupBroadcast";
SubgroupFunctionNode.SUBGROUP_SHUFFLE = "subgroupShuffle";
SubgroupFunctionNode.SUBGROUP_SHUFFLE_XOR = "subgroupShuffleXor";
SubgroupFunctionNode.SUBGROUP_SHUFFLE_UP = "subgroupShuffleUp";
SubgroupFunctionNode.SUBGROUP_SHUFFLE_DOWN = "subgroupShuffleDown";
SubgroupFunctionNode.QUAD_BROADCAST = "quadBroadcast";
var totalDiffuse = property("vec3", "totalDiffuse");
var totalSpecular = property("vec3", "totalSpecular");
var outgoingLight = property("vec3", "outgoingLight");
var shapeCircle = Fn(([coord = uv$1()], { renderer, material }) => {
  const len2 = lengthSq(coord.mul(2).sub(1));
  let alpha;
  if (material.alphaToCoverage && renderer.currentSamples > 0) {
    const dlen = float(len2.fwidth()).toVar();
    alpha = smoothstep2(dlen.oneMinus(), dlen.add(1), len2).oneMinus();
  } else {
    alpha = select(len2.greaterThan(1), 0, 1);
  }
  return alpha;
});
var NodeFunctionInput = class {
  /**
   * Constructs a new node function input.
   *
   * @param {string} type - The input type.
   * @param {string} name - The input name.
   * @param {?number} [count=null] - If the input is an Array, count will be the length.
   * @param {('in'|'out'|'inout')} [qualifier=''] - The parameter qualifier (only relevant for GLSL).
   * @param {boolean} [isConst=false] - Whether the input uses a const qualifier or not (only relevant for GLSL).
   */
  constructor(type, name, count = null, qualifier = "", isConst = false) {
    this.type = type;
    this.name = name;
    this.count = count;
    this.qualifier = qualifier;
    this.isConst = isConst;
  }
};
NodeFunctionInput.isNodeFunctionInput = true;
var NodeFunction = class {
  /**
   * Constructs a new node function.
   *
   * @param {string} type - The node type. This type is the return type of the node function.
   * @param {Array<NodeFunctionInput>} inputs - The function's inputs.
   * @param {string} [name=''] - The function's name.
   * @param {string} [precision=''] - The precision qualifier.
   */
  constructor(type, inputs, name = "", precision = "") {
    this.type = type;
    this.inputs = inputs;
    this.name = name;
    this.precision = precision;
  }
  /**
   * This method returns the native code of the node function.
   *
   * @abstract
   * @param {string} name - The function's name.
   * @return {string} A shader code.
   */
  getCode() {
    warn("Abstract function.");
  }
};
NodeFunction.isNodeFunction = true;
var _shadowSide = { [FrontSide]: BackSide, [BackSide]: FrontSide, [DoubleSide]: DoubleSide };
var glslPolyfills = {
  bitcast_int_uint: new CodeNode(
    /* glsl */
    "uint tsl_bitcast_int_to_uint ( int x ) { return floatBitsToUint( intBitsToFloat ( x ) ); }"
  ),
  bitcast_uint_int: new CodeNode(
    /* glsl */
    "uint tsl_bitcast_uint_to_int ( uint x ) { return floatBitsToInt( uintBitsToFloat ( x ) ); }"
  ),
  textureGather: new CodeNode(
    /* glsl */
    `
vec4 tsl_textureGather( const int comp, sampler2D map, vec2 coord, ivec2 offset, bool flipY ) {
	if ( flipY ) offset.y = - offset.y;
	vec2 size = vec2( textureSize( map, 0 ) );
	vec2 st = floor( coord * size + vec2( offset ) - 0.5 );
	vec4 ij = vec4( st + 0.5, st + 1.5 ) / size.xyxy;
	vec4 ret = vec4(
		textureLod( map, ij.xw, 0.0 )[ comp ],
		textureLod( map, ij.zw, 0.0 )[ comp ],
		textureLod( map, ij.zy, 0.0 )[ comp ],
		textureLod( map, ij.xy, 0.0 )[ comp ]
	);
	return flipY ? ret.wzyx : ret;
}
`
  ),
  textureGatherArray: new CodeNode(
    /* glsl */
    `
vec4 tsl_textureGather_array( const int comp, sampler2DArray map, vec3 coord, ivec2 offset, bool flipY ) {
	if ( flipY ) offset.y = - offset.y;
	vec2 size = vec2( textureSize( map, 0 ).xy );
	vec2 st = floor( coord.xy * size + vec2( offset ) - 0.5 );
	vec4 ij = vec4( st + 0.5, st + 1.5 ) / size.xyxy;
	vec4 ret = vec4(
		textureLod( map, vec3( ij.xw, coord.z ), 0.0 )[ comp ],
		textureLod( map, vec3( ij.zw, coord.z ), 0.0 )[ comp ],
		textureLod( map, vec3( ij.zy, coord.z ), 0.0 )[ comp ],
		textureLod( map, vec3( ij.xy, coord.z ), 0.0 )[ comp ]
	);
	return flipY ? ret.wzyx : ret;
}
`
  ),
  textureGatherCompare: new CodeNode(
    /* glsl */
    `
vec4 tsl_textureGatherCompare( sampler2DShadow map, vec2 coord, ivec2 offset, float ref, bool flipY ) {
	if ( flipY ) offset.y = - offset.y;
	vec2 size = vec2( textureSize( map, 0 ) );
	vec2 st = floor( coord * size + vec2( offset ) - 0.5 );
	vec4 ij = vec4( st + 0.5, st + 1.5 ) / size.xyxy;
	vec4 ret = vec4(
		textureLod( map, vec3( ij.xw, ref ), 0.0 ),
		textureLod( map, vec3( ij.zw, ref ), 0.0 ),
		textureLod( map, vec3( ij.zy, ref ), 0.0 ),
		textureLod( map, vec3( ij.xy, ref ), 0.0 )
	);
	return flipY ? ret.wzyx : ret;
}
`
  ),
  textureGatherCompareArray: new CodeNode(
    /* glsl */
    `
vec4 tsl_textureGatherCompare_array( sampler2DArrayShadow map, vec3 coord, ivec2 offset, float ref, bool flipY ) {
	if ( flipY ) offset.y = - offset.y;
	vec2 size = vec2( textureSize( map, 0 ).xy );
	vec2 st = floor( coord.xy * size + vec2( offset ) - 0.5 );
	vec4 ij = vec4( st + 0.5, st + 1.5 ) / size.xyxy;
	vec4 ret = vec4(
		texture( map, vec4( ij.xw, coord.z, ref ) ),
		texture( map, vec4( ij.zw, coord.z, ref ) ),
		texture( map, vec4( ij.zy, coord.z, ref ) ),
		texture( map, vec4( ij.xy, coord.z, ref ) )
	);
	return flipY ? ret.wzyx : ret;
}
`
  )
};
var GPUShaderStage = typeof self !== "undefined" && self.GPUShaderStage ? self.GPUShaderStage : { VERTEX: 1, FRAGMENT: 2, COMPUTE: 4 };
var GPUBindGroupDescriptor = class {
  constructor() {
    this.label = "";
    this.layout = null;
    this.entries = [];
  }
  /**
   * Resets the descriptor to its default state. The internal `entries` array
   * is emptied without releasing its backing storage.
   */
  reset() {
    this.label = "";
    this.layout = null;
    this.entries.length = 0;
  }
};
var GPUBufferDescriptor = class {
  constructor() {
    this.label = "";
    this.size = 0;
    this.usage = 0;
    this.mappedAtCreation = false;
  }
  /**
   * Resets the descriptor to its default state.
   */
  reset() {
    this.label = "";
    this.size = 0;
    this.usage = 0;
    this.mappedAtCreation = false;
  }
};
var GPUCommandEncoderDescriptor = class {
  constructor() {
    this.label = "";
  }
  /**
   * Resets the descriptor to its default state.
   */
  reset() {
    this.label = "";
  }
};
var GPURenderBundleEncoderDescriptor = class {
  constructor() {
    this.label = "";
    this.colorFormats = null;
    this.depthStencilFormat = void 0;
    this.sampleCount = 1;
    this.depthReadOnly = false;
    this.stencilReadOnly = false;
  }
  /**
   * Resets the descriptor to its default state.
   */
  reset() {
    this.label = "";
    this.colorFormats = null;
    this.depthStencilFormat = void 0;
    this.sampleCount = 1;
    this.depthReadOnly = false;
    this.stencilReadOnly = false;
  }
};
var GPURenderPassColorAttachment = class {
  constructor() {
    this.view = null;
    this.depthSlice = void 0;
    this.resolveTarget = void 0;
    this.clearValue = void 0;
    this.loadOp = void 0;
    this.storeOp = void 0;
  }
  /**
   * Resets the descriptor to its default state.
   */
  reset() {
    this.view = null;
    this.depthSlice = void 0;
    this.resolveTarget = void 0;
    this.clearValue = void 0;
    this.loadOp = void 0;
    this.storeOp = void 0;
  }
};
var GPURenderPassDescriptor = class {
  constructor() {
    this.label = "";
    this.colorAttachments = [];
    this.depthStencilAttachment = void 0;
    this.occlusionQuerySet = void 0;
    this.timestampWrites = void 0;
    this.maxDrawCount = 5e7;
  }
  /**
   * Resets the descriptor to its default state. The internal `colorAttachments`
   * array is emptied without releasing its backing storage.
   */
  reset() {
    this.label = "";
    this.colorAttachments.length = 0;
    this.depthStencilAttachment = void 0;
    this.occlusionQuerySet = void 0;
    this.timestampWrites = void 0;
    this.maxDrawCount = 5e7;
  }
};
var GPURenderPipelineDescriptor = class {
  constructor() {
    this.label = "";
    this.layout = null;
    this.vertex = null;
    this.primitive = {};
    this.depthStencil = void 0;
    this.multisample = new GPUMultisampleState();
    this.fragment = null;
  }
  /**
   * Resets the descriptor to its default state.
   */
  reset() {
    this.label = "";
    this.layout = null;
    this.vertex = null;
    this.primitive = {};
    this.depthStencil = void 0;
    this.multisample.reset();
    this.fragment = null;
  }
};
var GPUMultisampleState = class {
  constructor() {
    this.count = 1;
    this.mask = 4294967295;
    this.alphaToCoverageEnabled = false;
  }
  /**
   * Resets the state to its default values.
   */
  reset() {
    this.count = 1;
    this.mask = 4294967295;
    this.alphaToCoverageEnabled = false;
  }
};
var GPUShaderModuleDescriptor = class {
  constructor() {
    this.label = "";
    this.code = "";
    this.compilationHints = [];
  }
  /**
   * Resets the descriptor to its default state.
   */
  reset() {
    this.label = "";
    this.code = "";
    this.compilationHints.length = 0;
  }
};
var GPUTextureDescriptor = class {
  constructor() {
    this.label = "";
    this.size = { width: 0, height: 1, depthOrArrayLayers: 1 };
    this.mipLevelCount = 1;
    this.sampleCount = 1;
    this.dimension = "2d";
    this.format = void 0;
    this.usage = void 0;
    this.viewFormats = [];
    this.textureBindingViewDimension = void 0;
  }
  /**
   * Resets the descriptor to its default state.
   */
  reset() {
    this.label = "";
    this.size.width = 0;
    this.size.height = 1;
    this.size.depthOrArrayLayers = 1;
    this.mipLevelCount = 1;
    this.sampleCount = 1;
    this.dimension = "2d";
    this.format = void 0;
    this.usage = void 0;
    this.viewFormats.length = 0;
    this.textureBindingViewDimension = void 0;
  }
};
var GPUTextureViewDescriptor = class {
  constructor() {
    this.label = "";
    this.format = void 0;
    this.dimension = void 0;
    this.usage = 0;
    this.aspect = "all";
    this.baseMipLevel = 0;
    this.mipLevelCount = void 0;
    this.baseArrayLayer = 0;
    this.arrayLayerCount = void 0;
    this.swizzle = "rgba";
  }
  /**
   * Resets the descriptor to its default state.
   */
  reset() {
    this.label = "";
    this.format = void 0;
    this.dimension = void 0;
    this.usage = 0;
    this.aspect = "all";
    this.baseMipLevel = 0;
    this.mipLevelCount = void 0;
    this.baseArrayLayer = 0;
    this.arrayLayerCount = void 0;
    this.swizzle = "rgba";
  }
};
var _bindGroupDescriptor$1 = new GPUBindGroupDescriptor();
var _bufferDescriptor$5 = new GPUBufferDescriptor();
var _commandEncoderDescriptor$4 = new GPUCommandEncoderDescriptor();
var _renderBundleEncoderDescriptor$1 = new GPURenderBundleEncoderDescriptor();
var _renderPassDescriptor = new GPURenderPassDescriptor();
var _renderPipelineDescriptor$1 = new GPURenderPipelineDescriptor();
var _colorAttachment = new GPURenderPassColorAttachment();
var _shaderModuleDescriptor$1 = new GPUShaderModuleDescriptor();
var _textureDescriptor$1 = new GPUTextureDescriptor();
var _viewDescriptor$2 = new GPUTextureViewDescriptor();
var GPUSamplerDescriptor = class {
  constructor() {
    this.label = "";
    this.addressModeU = "clamp-to-edge";
    this.addressModeV = "clamp-to-edge";
    this.addressModeW = "clamp-to-edge";
    this.magFilter = "nearest";
    this.minFilter = "nearest";
    this.mipmapFilter = "nearest";
    this.lodMinClamp = 0;
    this.lodMaxClamp = 32;
    this.compare = void 0;
    this.maxAnisotropy = 1;
  }
  /**
   * Resets the descriptor to its default state.
   */
  reset() {
    this.label = "";
    this.addressModeU = "clamp-to-edge";
    this.addressModeV = "clamp-to-edge";
    this.addressModeW = "clamp-to-edge";
    this.magFilter = "nearest";
    this.minFilter = "nearest";
    this.mipmapFilter = "nearest";
    this.lodMinClamp = 0;
    this.lodMaxClamp = 32;
    this.compare = void 0;
    this.maxAnisotropy = 1;
  }
};
var GPUTexelCopyTextureInfo = class {
  constructor() {
    this.texture = null;
    this.mipLevel = 0;
    this.origin = { x: 0, y: 0, z: 0 };
    this.aspect = "all";
  }
  /**
   * Resets the descriptor to its default state.
   */
  reset() {
    this.texture = null;
    this.mipLevel = 0;
    this.origin.x = 0;
    this.origin.y = 0;
    this.origin.z = 0;
    this.aspect = "all";
  }
};
var GPUTexelCopyBufferInfo = class {
  constructor() {
    this.buffer = null;
    this.offset = 0;
    this.bytesPerRow = void 0;
    this.rowsPerImage = void 0;
  }
  /**
   * Resets the descriptor to its default state.
   */
  reset() {
    this.buffer = null;
    this.offset = 0;
    this.bytesPerRow = void 0;
    this.rowsPerImage = void 0;
  }
};
var GPUTexelCopyBufferLayout = class {
  constructor() {
    this.offset = 0;
    this.bytesPerRow = void 0;
    this.rowsPerImage = void 0;
  }
  /**
   * Resets the descriptor to its default state.
   */
  reset() {
    this.offset = 0;
    this.bytesPerRow = void 0;
    this.rowsPerImage = void 0;
  }
};
var GPUCopyExternalImageSourceInfo = class {
  constructor() {
    this.source = null;
    this.origin = { x: 0, y: 0 };
    this.flipY = false;
  }
  /**
   * Resets the descriptor to its default state.
   */
  reset() {
    this.source = null;
    this.origin.x = 0;
    this.origin.y = 0;
    this.flipY = false;
  }
};
var GPUCopyExternalImageDestInfo = class extends GPUTexelCopyTextureInfo {
  constructor() {
    super();
    this.colorSpace = "srgb";
    this.premultipliedAlpha = false;
  }
  /**
   * Resets the descriptor to its default state.
   */
  reset() {
    super.reset();
    this.colorSpace = "srgb";
    this.premultipliedAlpha = false;
  }
};
var GPUExtent3D = class {
  constructor() {
    this.width = 0;
    this.height = 1;
    this.depthOrArrayLayers = 1;
  }
  /**
   * Resets the descriptor to its default state.
   */
  reset() {
    this.width = 0;
    this.height = 1;
    this.depthOrArrayLayers = 1;
  }
};
var _bufferDescriptor$4 = new GPUBufferDescriptor();
var _commandEncoderDescriptor$3 = new GPUCommandEncoderDescriptor();
var _samplerDescriptor = new GPUSamplerDescriptor();
var _texelCopyTextureInfo = new GPUTexelCopyTextureInfo();
var _texelCopyBufferInfo = new GPUTexelCopyBufferInfo();
var _texelCopyBufferLayout = new GPUTexelCopyBufferLayout();
var _copyExternalImageSourceInfo = new GPUCopyExternalImageSourceInfo();
var _copyExternalImageDestInfo = new GPUCopyExternalImageDestInfo();
var _textureDescriptor = new GPUTextureDescriptor();
var _extent3D$1 = new GPUExtent3D();
var _compareToWebGPU = {
  [NeverCompare]: "never",
  [LessCompare]: "less",
  [EqualCompare]: "equal",
  [LessEqualCompare]: "less-equal",
  [GreaterCompare]: "greater",
  [GreaterEqualCompare]: "greater-equal",
  [AlwaysCompare]: "always",
  [NotEqualCompare]: "not-equal"
};
var accessNames = {
  [NodeAccess.READ_ONLY]: "read",
  [NodeAccess.WRITE_ONLY]: "write",
  [NodeAccess.READ_WRITE]: "read_write"
};
var wrapNames = {
  [RepeatWrapping]: "repeat",
  [ClampToEdgeWrapping]: "clamp",
  [MirroredRepeatWrapping]: "mirror"
};
var gpuShaderStageLib = {
  "vertex": GPUShaderStage.VERTEX,
  "fragment": GPUShaderStage.FRAGMENT,
  "compute": GPUShaderStage.COMPUTE
};
var wgslPolyfill = {
  tsl_xor: new CodeNode("fn tsl_xor( a : bool, b : bool ) -> bool { return ( a || b ) && !( a && b ); }"),
  mod_float: new CodeNode("fn tsl_mod_float( x : f32, y : f32 ) -> f32 { return x - y * floor( x / y ); }"),
  mod_vec2: new CodeNode("fn tsl_mod_vec2( x : vec2f, y : vec2f ) -> vec2f { return x - y * floor( x / y ); }"),
  mod_vec3: new CodeNode("fn tsl_mod_vec3( x : vec3f, y : vec3f ) -> vec3f { return x - y * floor( x / y ); }"),
  mod_vec4: new CodeNode("fn tsl_mod_vec4( x : vec4f, y : vec4f ) -> vec4f { return x - y * floor( x / y ); }"),
  equals_bool: new CodeNode("fn tsl_equals_bool( a : bool, b : bool ) -> bool { return a == b; }"),
  equals_bvec2: new CodeNode("fn tsl_equals_bvec2( a : vec2f, b : vec2f ) -> vec2<bool> { return vec2<bool>( a.x == b.x, a.y == b.y ); }"),
  equals_bvec3: new CodeNode("fn tsl_equals_bvec3( a : vec3f, b : vec3f ) -> vec3<bool> { return vec3<bool>( a.x == b.x, a.y == b.y, a.z == b.z ); }"),
  equals_bvec4: new CodeNode("fn tsl_equals_bvec4( a : vec4f, b : vec4f ) -> vec4<bool> { return vec4<bool>( a.x == b.x, a.y == b.y, a.z == b.z, a.w == b.w ); }"),
  repeatWrapping_float: new CodeNode("fn tsl_repeatWrapping_float( coord: f32 ) -> f32 { return fract( coord ); }"),
  mirrorWrapping_float: new CodeNode("fn tsl_mirrorWrapping_float( coord: f32 ) -> f32 { let mirrored = fract( coord * 0.5 ) * 2.0; return 1.0 - abs( 1.0 - mirrored ); }"),
  clampWrapping_float: new CodeNode("fn tsl_clampWrapping_float( coord: f32 ) -> f32 { return clamp( coord, 0.0, 1.0 ); }"),
  inverse_mat2: new CodeNode(
    /* wgsl */
    `
fn tsl_inverse_mat2( m : mat2x2<f32> ) -> mat2x2<f32> {

	let det = m[ 0 ][ 0 ] * m[ 1 ][ 1 ] - m[ 0 ][ 1 ] * m[ 1 ][ 0 ];

	return mat2x2<f32>(
		m[ 1 ][ 1 ], - m[ 0 ][ 1 ],
		- m[ 1 ][ 0 ], m[ 0 ][ 0 ]
	) * ( 1.0 / det );

}
`
  ),
  inverse_mat3: new CodeNode(
    /* wgsl */
    `
fn tsl_inverse_mat3( m : mat3x3<f32> ) -> mat3x3<f32> {

	let a00 = m[ 0 ][ 0 ]; let a01 = m[ 0 ][ 1 ]; let a02 = m[ 0 ][ 2 ];
	let a10 = m[ 1 ][ 0 ]; let a11 = m[ 1 ][ 1 ]; let a12 = m[ 1 ][ 2 ];
	let a20 = m[ 2 ][ 0 ]; let a21 = m[ 2 ][ 1 ]; let a22 = m[ 2 ][ 2 ];

	let b01 = a22 * a11 - a12 * a21;
	let b11 = - a22 * a10 + a12 * a20;
	let b21 = a21 * a10 - a11 * a20;

	let det = a00 * b01 + a01 * b11 + a02 * b21;

	return mat3x3<f32>(
		b01, ( - a22 * a01 + a02 * a21 ), ( a12 * a01 - a02 * a11 ),
		b11, ( a22 * a00 - a02 * a20 ), ( - a12 * a00 + a02 * a10 ),
		b21, ( - a21 * a00 + a01 * a20 ), ( a11 * a00 - a01 * a10 )
	) * ( 1.0 / det );

}
`
  ),
  inverse_mat4: new CodeNode(
    /* wgsl */
    `
fn tsl_inverse_mat4( m : mat4x4<f32> ) -> mat4x4<f32> {

	let a00 = m[ 0 ][ 0 ]; let a01 = m[ 0 ][ 1 ]; let a02 = m[ 0 ][ 2 ]; let a03 = m[ 0 ][ 3 ];
	let a10 = m[ 1 ][ 0 ]; let a11 = m[ 1 ][ 1 ]; let a12 = m[ 1 ][ 2 ]; let a13 = m[ 1 ][ 3 ];
	let a20 = m[ 2 ][ 0 ]; let a21 = m[ 2 ][ 1 ]; let a22 = m[ 2 ][ 2 ]; let a23 = m[ 2 ][ 3 ];
	let a30 = m[ 3 ][ 0 ]; let a31 = m[ 3 ][ 1 ]; let a32 = m[ 3 ][ 2 ]; let a33 = m[ 3 ][ 3 ];

	let b00 = a00 * a11 - a01 * a10;
	let b01 = a00 * a12 - a02 * a10;
	let b02 = a00 * a13 - a03 * a10;
	let b03 = a01 * a12 - a02 * a11;
	let b04 = a01 * a13 - a03 * a11;
	let b05 = a02 * a13 - a03 * a12;
	let b06 = a20 * a31 - a21 * a30;
	let b07 = a20 * a32 - a22 * a30;
	let b08 = a20 * a33 - a23 * a30;
	let b09 = a21 * a32 - a22 * a31;
	let b10 = a21 * a33 - a23 * a31;
	let b11 = a22 * a33 - a23 * a32;

	let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

	return mat4x4<f32>(
		a11 * b11 - a12 * b10 + a13 * b09,
		a02 * b10 - a01 * b11 - a03 * b09,
		a31 * b05 - a32 * b04 + a33 * b03,
		a22 * b04 - a21 * b05 - a23 * b03,
		a12 * b08 - a10 * b11 - a13 * b07,
		a00 * b11 - a02 * b08 + a03 * b07,
		a32 * b02 - a30 * b05 - a33 * b01,
		a20 * b05 - a22 * b02 + a23 * b01,
		a10 * b10 - a11 * b08 + a13 * b06,
		a01 * b08 - a00 * b10 - a03 * b06,
		a30 * b04 - a31 * b02 + a33 * b00,
		a21 * b02 - a20 * b04 - a23 * b00,
		a11 * b07 - a10 * b09 - a12 * b06,
		a00 * b09 - a01 * b07 + a02 * b06,
		a31 * b01 - a30 * b03 - a32 * b00,
		a20 * b03 - a21 * b01 + a22 * b00
	) * ( 1.0 / det );

}
`
  ),
  biquadraticTexture: new CodeNode(
    /* wgsl */
    `
fn tsl_biquadraticTexture( map : texture_2d<f32>, coord : vec2f, iRes : vec2u, level : u32 ) -> vec4f {

	let res = vec2f( iRes );

	let uvScaled = coord * res;
	let uvWrapping = ( ( uvScaled % res ) + res ) % res;

	// https://www.shadertoy.com/view/WtyXRy

	let uv = uvWrapping - 0.5;
	let iuv = floor( uv );
	let f = fract( uv );

	let rg1 = textureLoad( map, vec2u( iuv + vec2( 0.5, 0.5 ) ) % iRes, level );
	let rg2 = textureLoad( map, vec2u( iuv + vec2( 1.5, 0.5 ) ) % iRes, level );
	let rg3 = textureLoad( map, vec2u( iuv + vec2( 0.5, 1.5 ) ) % iRes, level );
	let rg4 = textureLoad( map, vec2u( iuv + vec2( 1.5, 1.5 ) ) % iRes, level );

	return mix( mix( rg1, rg2, f.x ), mix( rg3, rg4, f.x ), f.y );

}
`
  ),
  biquadraticTextureArray: new CodeNode(
    /* wgsl */
    `
fn tsl_biquadraticTexture_array( map : texture_2d_array<f32>, coord : vec2f, iRes : vec2u, layer : u32, level : u32 ) -> vec4f {

	let res = vec2f( iRes );

	let uvScaled = coord * res;
	let uvWrapping = ( ( uvScaled % res ) + res ) % res;

	// https://www.shadertoy.com/view/WtyXRy

	let uv = uvWrapping - 0.5;
	let iuv = floor( uv );
	let f = fract( uv );

	let rg1 = textureLoad( map, vec2u( iuv + vec2( 0.5, 0.5 ) ) % iRes, layer, level );
	let rg2 = textureLoad( map, vec2u( iuv + vec2( 1.5, 0.5 ) ) % iRes, layer, level );
	let rg3 = textureLoad( map, vec2u( iuv + vec2( 0.5, 1.5 ) ) % iRes, layer, level );
	let rg4 = textureLoad( map, vec2u( iuv + vec2( 1.5, 1.5 ) ) % iRes, layer, level );

	return mix( mix( rg1, rg2, f.x ), mix( rg3, rg4, f.x ), f.y );

}
`
  )
};
var diagnostics = "";
if ((typeof navigator !== "undefined" && /Firefox|Deno/g.test(navigator.userAgent)) !== true) {
  diagnostics += "diagnostic( off, derivative_uniformity );\n";
}
var _bufferDescriptor$3 = new GPUBufferDescriptor();
var _commandEncoderDescriptor$2 = new GPUCommandEncoderDescriptor();
var typedArraysToVertexFormatPrefix = /* @__PURE__ */ new Map([
  [Int8Array, ["sint8", "snorm8"]],
  [Uint8Array, ["uint8", "unorm8"]],
  [Int16Array, ["sint16", "snorm16"]],
  [Uint16Array, ["uint16", "unorm16"]],
  [Int32Array, ["sint32", "snorm32"]],
  [Uint32Array, ["uint32", "unorm32"]],
  [Float32Array, ["float32"]]
]);
if (typeof Float16Array !== "undefined") {
  typedArraysToVertexFormatPrefix.set(Float16Array, ["float16"]);
}
var _bindGroupDescriptor = new GPUBindGroupDescriptor();
var _bufferDescriptor$2 = new GPUBufferDescriptor();
var _viewDescriptor$1 = new GPUTextureViewDescriptor();
var GPUComputePipelineDescriptor = class {
  constructor() {
    this.label = "";
    this.layout = null;
    this.compute = null;
  }
  /**
   * Resets the descriptor to its default state.
   */
  reset() {
    this.label = "";
    this.layout = null;
    this.compute = null;
  }
};
var GPUPipelineLayoutDescriptor = class {
  constructor() {
    this.label = "";
    this.bindGroupLayouts = null;
  }
  /**
   * Resets the descriptor to its default state.
   */
  reset() {
    this.label = "";
    this.bindGroupLayouts = null;
  }
};
var _computePipelineDescriptor = new GPUComputePipelineDescriptor();
var _pipelineLayoutDescriptor = new GPUPipelineLayoutDescriptor();
var _renderBundleEncoderDescriptor = new GPURenderBundleEncoderDescriptor();
var _renderPipelineDescriptor = new GPURenderPipelineDescriptor();
var GPUQuerySetDescriptor = class {
  constructor() {
    this.label = "";
    this.type = void 0;
    this.count = 0;
  }
  /**
   * Resets the descriptor to its default state.
   */
  reset() {
    this.label = "";
    this.type = void 0;
    this.count = 0;
  }
};
var _bufferDescriptor$1 = new GPUBufferDescriptor();
var _commandEncoderDescriptor$1 = new GPUCommandEncoderDescriptor();
var _querySetDescriptor$1 = new GPUQuerySetDescriptor();
var GPUComputePassDescriptor = class {
  constructor() {
    this.label = "";
    this.timestampWrites = void 0;
  }
  /**
   * Resets the descriptor to its default state.
   */
  reset() {
    this.label = "";
    this.timestampWrites = void 0;
  }
};
var GPURenderPassTimestampWrites = class {
  constructor() {
    this.querySet = null;
    this.beginningOfPassWriteIndex = void 0;
    this.endOfPassWriteIndex = void 0;
  }
  /**
   * Resets the descriptor to its default state.
   */
  reset() {
    this.querySet = null;
    this.beginningOfPassWriteIndex = void 0;
    this.endOfPassWriteIndex = void 0;
  }
};
var _bufferDescriptor = new GPUBufferDescriptor();
var _commandEncoderDescriptor = new GPUCommandEncoderDescriptor();
var _computePassDescriptor = new GPUComputePassDescriptor();
var _querySetDescriptor = new GPUQuerySetDescriptor();
var _shaderModuleDescriptor = new GPUShaderModuleDescriptor();
var _renderPassTimestampWrites = new GPURenderPassTimestampWrites();
var _texelCopyTextureInfoSrc = new GPUTexelCopyTextureInfo();
var _texelCopyTextureInfoDst = new GPUTexelCopyTextureInfo();
var _viewDescriptor = new GPUTextureViewDescriptor();
var _extent3D = new GPUExtent3D();
var Storage3DTexture = class extends Texture {
  /**
   * Constructs a new storage texture.
   *
   * @param {number} [width=1] - The storage texture's width.
   * @param {number} [height=1] - The storage texture's height.
   * @param {number} [depth=1] - The storage texture's depth.
   */
  constructor(width = 1, height = 1, depth2 = 1) {
    super();
    this.isArrayTexture = false;
    this.image = { width, height, depth: depth2 };
    this.magFilter = LinearFilter;
    this.minFilter = LinearFilter;
    this.wrapR = ClampToEdgeWrapping;
    this.isStorageTexture = true;
    this.is3DTexture = true;
  }
  /**
   * Sets the size of the storage 3d texture.
   *
   * @param {number} width - The new width of the storage texture.
   * @param {number} height - The new height of the storage texture.
   * @param {number} depth - The new depth of the storage texture.
   */
  setSize(width, height, depth2) {
    if (this.image.width !== width || this.image.height !== height || this.image.depth !== depth2) {
      this.image.width = width;
      this.image.height = height;
      this.image.depth = depth2;
      this.dispose();
    }
  }
};

// docs/skills/threejs-procedural-vfx/examples/volumetric-fluid-fire/source/util/createStorage3D.ts
function createStorage3D(name, sizeX, sizeY, sizeZ, format = RGBAFormat, dataType = HalfFloatType) {
  const texture2 = new Storage3DTexture(sizeX, sizeY, sizeZ);
  texture2.name = name;
  texture2.format = format;
  texture2.type = format === RedFormat ? FloatType : dataType;
  texture2.minFilter = LinearFilter;
  texture2.magFilter = LinearFilter;
  texture2.wrapS = ClampToEdgeWrapping;
  texture2.wrapT = ClampToEdgeWrapping;
  texture2.wrapR = ClampToEdgeWrapping;
  texture2.generateMipmaps = false;
  return texture2;
}
export {
  createStorage3D
};
/*! Bundled license information:

three/build/three.core.js:
three/build/three.webgpu.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
