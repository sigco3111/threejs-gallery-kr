var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __knownSymbol = (name, symbol) => (symbol = Symbol[name]) ? symbol : Symbol.for("Symbol." + name);
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __decoratorStart = (base) => [, , , __create(base?.[__knownSymbol("metadata")] ?? null)];
var __decoratorStrings = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"];
var __expectFn = (fn) => fn !== void 0 && typeof fn !== "function" ? __typeError("Function expected") : fn;
var __decoratorContext = (kind, name, done, metadata, fns) => ({ kind: __decoratorStrings[kind], name, metadata, addInitializer: (fn) => done._ ? __typeError("Already initialized") : fns.push(__expectFn(fn || null)) });
var __decoratorMetadata = (array, target) => __defNormalProp(target, __knownSymbol("metadata"), array[3]);
var __runInitializers = (array, flags, self, value) => {
  for (var i = 0, fns = array[flags >> 1], n = fns && fns.length; i < n; i++) flags & 1 ? fns[i].call(self) : value = fns[i].call(self, value);
  return value;
};
var __decorateElement = (array, flags, name, decorators, target, extra) => {
  return;  // patched: no-op to avoid Object.defineProperty crash
  var fn, it, done, ctx, access, k = flags & 7, s = !!(flags & 8), p = !!(flags & 16);
  var j = k > 3 ? array.length + 1 : k ? s ? 1 : 2 : 0, key = __decoratorStrings[k + 5];
  var initializers = k > 3 && (array[j - 1] = []), extraInitializers = array[j] || (array[j] = []);
  var desc = k && (!p && !s && (target = target.prototype), k < 5 && (k > 3 || !p) && __getOwnPropDesc(k < 4 ? target : { get [name]() {
    return __privateGet(this, extra);
  }, set [name](x) {
    return __privateSet(this, extra, x);
  } }, name));
  k ? p && k < 4 && __name(extra, (k > 2 ? "set " : k > 1 ? "get " : "") + name) : __name(target, name);
  for (var i = decorators.length - 1; i >= 0; i--) {
    ctx = __decoratorContext(k, name, done = {}, array[3], extraInitializers);
    if (k) {
      ctx.static = s, ctx.private = p, access = ctx.access = { has: p ? (x) => __privateIn(target, x) : (x) => name in x };
      if (k ^ 3) access.get = p ? (x) => (k ^ 1 ? __privateGet : __privateMethod)(x, target, k ^ 4 ? extra : desc.get) : (x) => x[name];
      if (k > 2) access.set = p ? (x, y) => __privateSet(x, target, y, k ^ 4 ? extra : desc.set) : (x, y) => x[name] = y;
    }
    it = (0, decorators[i])(k ? k < 4 ? p ? extra : desc[key] : k > 4 ? void 0 : { get: desc.get, set: desc.set } : target, ctx), done._ = 1;
    if (k ^ 4 || it === void 0) __expectFn(it) && (k > 4 ? initializers.unshift(it) : k ? p ? extra = it : desc[key] = it : target = it);
    else if (typeof it !== "object" || it === null) __typeError("Object expected");
    else __expectFn(fn = it.get) && (desc.get = fn), __expectFn(fn = it.set) && (desc.set = fn), __expectFn(fn = it.init) && initializers.unshift(fn);
  }
  return k || __decoratorMetadata(array, target), desc && __defProp(target, name, desc), p ? k ^ 4 ? extra : desc : target;
};
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateIn = (member, obj) => Object(obj) !== obj ? __typeError('Cannot use the "in" operator on this value') : member.has(obj);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/AerialPerspectiveEffect.ts
import { BlendFunction, Effect, EffectAttribute } from "https://esm.sh/postprocessing@6.37.4?deps=three@0.185.1&external=three";
import {
  Camera,
  Matrix4 as Matrix43,
  Uniform,
  Vector2 as Vector22,
  Vector3 as Vector39
} from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/ArrayBufferLoader.ts
import { FileLoader, Loader } from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/vendor/tiny-invariant.ts
function invariant(condition, message) {
  if (condition) return;
  const provided = typeof message === "function" ? message() : message;
  throw new Error(provided != null ? `Invariant failed: ${provided}` : "Invariant failed");
}

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/ArrayBufferLoader.ts
var ArrayBufferLoader = class extends Loader {
  load(url, onLoad, onProgress, onError) {
    const loader = new FileLoader(this.manager);
    loader.setResponseType("arraybuffer");
    loader.setRequestHeader(this.requestHeader);
    loader.setPath(this.path);
    loader.setWithCredentials(this.withCredentials);
    loader.load(
      url,
      (arrayBuffer) => {
        invariant(arrayBuffer instanceof ArrayBuffer);
        try {
          onLoad(arrayBuffer);
        } catch (error) {
          if (onError != null) {
            onError(error);
          } else {
            console.error(error);
          }
          this.manager.itemError(url);
        }
      },
      onProgress,
      onError
    );
  }
};

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/bufferGeometry.ts
import {
  Box3,
  BufferAttribute,
  BufferGeometry,
  Sphere,
  Vector3
} from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/constants.ts
var STBN_TEXTURE_WIDTH = 128;
var STBN_TEXTURE_HEIGHT = 128;
var STBN_TEXTURE_DEPTH = 64;
var ref = "9627216cc50057994c98a2118f3c4a23765d43b9";
var DEFAULT_STBN_URL = `https://media.githubusercontent.com/media/takram-design-engineering/three-geospatial/${ref}/packages/core/assets/stbn.bin`;

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/DataLoader.ts
import {
  ByteType,
  Data3DTexture,
  DataTexture,
  FloatType,
  HalfFloatType,
  IntType,
  LinearFilter,
  Loader as Loader3,
  RGBAFormat,
  ShortType,
  UnsignedByteType,
  UnsignedIntType,
  UnsignedShortType
} from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/typedArray.ts
import {
  Float16Array
} from "https://esm.sh/@petamoriken/float16@3.9.2?external";
function isTypedArray(value) {
  return value instanceof Int8Array || value instanceof Uint8Array || value instanceof Uint8ClampedArray || value instanceof Int16Array || value instanceof Uint16Array || value instanceof Int32Array || value instanceof Uint32Array || value instanceof Float16Array || value instanceof Float32Array || value instanceof Float64Array;
}

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/TypedArrayLoader.ts
import { Loader as Loader2 } from "https://esm.sh/three@0.185.1?external";
var TypedArrayLoader = class extends Loader2 {
  load(url, onLoad, onProgress, onError) {
    const loader = new ArrayBufferLoader(this.manager);
    loader.setRequestHeader(this.requestHeader);
    loader.setPath(this.path);
    loader.setWithCredentials(this.withCredentials);
    loader.load(
      url,
      (arrayBuffer) => {
        try {
          onLoad(this.parseTypedArray(arrayBuffer));
        } catch (error) {
          if (onError != null) {
            onError(error);
          } else {
            console.error(error);
          }
          this.manager.itemError(url);
        }
      },
      onProgress,
      onError
    );
  }
};
function createTypedArrayLoaderClass(parser) {
  return class extends TypedArrayLoader {
    parseTypedArray = parser;
  };
}

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/DataLoader.ts
function getTextureDataType(array) {
  const type = array instanceof Int8Array ? ByteType : array instanceof Uint8Array ? UnsignedByteType : array instanceof Uint8ClampedArray ? UnsignedByteType : array instanceof Int16Array ? ShortType : array instanceof Uint16Array ? UnsignedShortType : array instanceof Int32Array ? IntType : array instanceof Uint32Array ? UnsignedIntType : array instanceof Float16Array ? HalfFloatType : array instanceof Float32Array ? FloatType : array instanceof Float64Array ? FloatType : null;
  invariant(type != null);
  return type;
}
var defaultDataTextureParameter = {
  format: RGBAFormat,
  minFilter: LinearFilter,
  magFilter: LinearFilter
};
var DataLoader = class extends Loader3 {
  parameters = {};
  load(url, onLoad, onProgress, onError) {
    const texture = new this.Texture();
    const loader = new this.TypedArrayLoader(this.manager);
    loader.setRequestHeader(this.requestHeader);
    loader.setPath(this.path);
    loader.setWithCredentials(this.withCredentials);
    loader.load(
      url,
      (array) => {
        texture.image.data = array instanceof Float16Array ? new Uint16Array(array.buffer) : array;
        const { width, height, depth: depth2, ...params } = this.parameters;
        if (width != null) {
          texture.image.width = width;
        }
        if (height != null) {
          texture.image.height = height;
        }
        if ("depth" in texture.image && depth2 != null) {
          texture.image.depth = depth2;
        }
        texture.type = getTextureDataType(array);
        Object.assign(texture, params);
        texture.needsUpdate = true;
        onLoad(texture);
      },
      onProgress,
      onError
    );
  }
};
function createDataLoaderClass(Texture, parser, parameters) {
  return class extends DataLoader {
    Texture = Texture;
    TypedArrayLoader = createTypedArrayLoaderClass(parser);
    parameters = {
      ...defaultDataTextureParameter,
      ...parameters
    };
  };
}
function createData3DTextureLoaderClass(parser, parameters) {
  return createDataLoaderClass(Data3DTexture, parser, parameters);
}
function createDataTextureLoaderClass(parser, parameters) {
  return createDataLoaderClass(DataTexture, parser, parameters);
}
function createData3DTextureLoader(parser, parameters) {
  return new (createData3DTextureLoaderClass(parser, parameters))();
}
function createDataTextureLoader(parser, parameters) {
  return new (createDataTextureLoaderClass(parser, parameters))();
}

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/decorators.ts
import { Material } from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/math.ts
import { MathUtils } from "https://esm.sh/three@0.185.1?external";
var clamp = MathUtils.clamp;
var euclideanModulo = MathUtils.euclideanModulo;
var inverseLerp = MathUtils.inverseLerp;
var lerp = MathUtils.lerp;
var radians = MathUtils.degToRad;
var degrees = MathUtils.radToDeg;
var isPowerOfTwo = MathUtils.isPowerOfTwo;
var ceilPowerOfTwo = MathUtils.ceilPowerOfTwo;
var floorPowerOfTwo = MathUtils.floorPowerOfTwo;
var normalize = MathUtils.normalize;
function remap(x, min1, max1, min2 = 0, max2 = 1) {
  return MathUtils.mapLinear(x, min1, max1, min2, max2);
}
function saturate(x) {
  return Math.min(Math.max(x, 0), 1);
}

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/decorators.ts
function define(name) {
  return (target, propertyKey) => {
    if (target instanceof Material) {
      Object.defineProperty(target, propertyKey, {
        enumerable: true,
        get() {
          return this.defines?.[name] != null;
        },
        set(value) {
          if (value !== this[propertyKey]) {
            if (value) {
              this.defines ??= {};
              this.defines[name] = "1";
            } else {
              delete this.defines?.[name];
            }
            this.needsUpdate = true;
          }
        }
      });
    } else {
      Object.defineProperty(target, propertyKey, {
        enumerable: true,
        get() {
          return this.defines.has(name);
        },
        set(value) {
          if (value !== this[propertyKey]) {
            if (value) {
              this.defines.set(name, "1");
            } else {
              this.defines.delete(name);
            }
            ;
            this.setChanged();
          }
        }
      });
    }
  };
}
function defineInt(name, {
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER
} = {}) {
  return (target, propertyKey) => {
    if (target instanceof Material) {
      Object.defineProperty(target, propertyKey, {
        enumerable: true,
        get() {
          const value = this.defines?.[name];
          return value != null ? parseInt(value) : 0;
        },
        set(value) {
          const prevValue = this[propertyKey];
          if (value !== prevValue) {
            this.defines ??= {};
            this.defines[name] = clamp(value, min, max).toFixed(0);
            this.needsUpdate = true;
          }
        }
      });
    } else {
      Object.defineProperty(target, propertyKey, {
        enumerable: true,
        get() {
          const value = this.defines.get(name);
          return value != null ? parseInt(value) : 0;
        },
        set(value) {
          const prevValue = this[propertyKey];
          if (value !== prevValue) {
            this.defines.set(name, clamp(value, min, max).toFixed(0));
            this.setChanged();
          }
        }
      });
    }
  };
}

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/Ellipsoid.ts
import { Matrix4, Vector3 as Vector33 } from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/helpers/projectOnEllipsoidSurface.ts
import { Vector3 as Vector32 } from "https://esm.sh/three@0.185.1?external";
var vectorScratch = /* @__PURE__ */ new Vector32();
function projectOnEllipsoidSurface(position, reciprocalRadiiSquared, result = new Vector32(), options) {
  const { x, y, z } = position;
  const rx = reciprocalRadiiSquared.x;
  const ry = reciprocalRadiiSquared.y;
  const rz = reciprocalRadiiSquared.z;
  const x2 = x * x * rx;
  const y2 = y * y * ry;
  const z2 = z * z * rz;
  const normSquared = x2 + y2 + z2;
  const ratio = Math.sqrt(1 / normSquared);
  if (!Number.isFinite(ratio)) {
    return void 0;
  }
  const intersection = vectorScratch.copy(position).multiplyScalar(ratio);
  if (normSquared < (options?.centerTolerance ?? 0.1)) {
    return result.copy(intersection);
  }
  const gradient = intersection.multiply(reciprocalRadiiSquared).multiplyScalar(2);
  let lambda = (1 - ratio) * position.length() / (gradient.length() / 2);
  let correction = 0;
  let sx;
  let sy;
  let sz;
  let error;
  do {
    lambda -= correction;
    sx = 1 / (1 + lambda * rx);
    sy = 1 / (1 + lambda * ry);
    sz = 1 / (1 + lambda * rz);
    const sx2 = sx * sx;
    const sy2 = sy * sy;
    const sz2 = sz * sz;
    const sx3 = sx2 * sx;
    const sy3 = sy2 * sy;
    const sz3 = sz2 * sz;
    error = x2 * sx2 + y2 * sy2 + z2 * sz2 - 1;
    correction = error / ((x2 * sx3 * rx + y2 * sy3 * ry + z2 * sz3 * rz) * -2);
  } while (Math.abs(error) > 1e-12);
  return result.set(x * sx, y * sy, z * sz);
}

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/Ellipsoid.ts
var vectorScratch1 = /* @__PURE__ */ new Vector33();
var vectorScratch2 = /* @__PURE__ */ new Vector33();
var vectorScratch3 = /* @__PURE__ */ new Vector33();
var Ellipsoid = class _Ellipsoid {
  static WGS84 = /* @__PURE__ */ new _Ellipsoid(
    6378137,
    6378137,
    6356752314245179e-9
  );
  radii;
  constructor(x, y, z) {
    this.radii = new Vector33(x, y, z);
  }
  get minimumRadius() {
    return Math.min(this.radii.x, this.radii.y, this.radii.z);
  }
  get maximumRadius() {
    return Math.max(this.radii.x, this.radii.y, this.radii.z);
  }
  reciprocalRadii(result = new Vector33()) {
    const { x, y, z } = this.radii;
    return result.set(1 / x, 1 / y, 1 / z);
  }
  reciprocalRadiiSquared(result = new Vector33()) {
    const { x, y, z } = this.radii;
    return result.set(1 / x ** 2, 1 / y ** 2, 1 / z ** 2);
  }
  projectOnSurface(position, result = new Vector33(), options) {
    return projectOnEllipsoidSurface(
      position,
      this.reciprocalRadiiSquared(),
      result,
      options
    );
  }
  getSurfaceNormal(position, result = new Vector33()) {
    return result.multiplyVectors(this.reciprocalRadiiSquared(vectorScratch1), position).normalize();
  }
  getEastNorthUpVectors(position, east = new Vector33(), north = new Vector33(), up = new Vector33()) {
    this.getSurfaceNormal(position, up);
    east.set(-position.y, position.x, 0).normalize();
    north.crossVectors(up, east).normalize();
  }
  getEastNorthUpFrame(position, result = new Matrix4()) {
    const east = vectorScratch1;
    const north = vectorScratch2;
    const up = vectorScratch3;
    this.getEastNorthUpVectors(position, east, north, up);
    return result.makeBasis(east, north, up).setPosition(position);
  }
  getIntersection(ray, result = new Vector33()) {
    const reciprocalRadii = this.reciprocalRadii(vectorScratch1);
    const p = vectorScratch2.copy(reciprocalRadii).multiply(ray.origin);
    const d = vectorScratch3.copy(reciprocalRadii).multiply(ray.direction);
    const p2 = p.lengthSq();
    const d2 = d.lengthSq();
    const pd = p.dot(d);
    const discriminant = pd ** 2 - d2 * (p2 - 1);
    if (p2 === 1) {
      return result.copy(ray.origin);
    }
    if (p2 > 1) {
      if (pd >= 0 || discriminant < 0) {
        return;
      }
      const Q = Math.sqrt(discriminant);
      const t1 = (-pd - Q) / d2;
      const t2 = (-pd + Q) / d2;
      return ray.at(Math.min(t1, t2), result);
    }
    if (p2 < 1) {
      const discriminant2 = pd ** 2 - d2 * (p2 - 1);
      const Q = Math.sqrt(discriminant2);
      const t = (-pd + Q) / d2;
      return ray.at(t, result);
    }
    if (pd < 0) {
      return ray.at(-pd / d2, result);
    }
  }
  getOsculatingSphereCenter(surfacePosition, radius, result = new Vector33()) {
    invariant(this.radii.x === this.radii.y);
    const a2 = this.radii.x ** 2;
    const b2 = this.radii.z ** 2;
    const normal = vectorScratch1.set(
      surfacePosition.x / a2,
      surfacePosition.y / a2,
      surfacePosition.z / b2
    ).normalize();
    return result.copy(normal.multiplyScalar(-radius).add(surfacePosition));
  }
  getNormalAtHorizon(position, direction, result = new Vector33()) {
    invariant(this.radii.x === this.radii.y);
    const a2 = this.radii.x ** 2;
    const b2 = this.radii.z ** 2;
    const p = position;
    const v = direction;
    let t = (p.x * v.x + p.y * v.y) / a2 + p.z * v.z / b2;
    t /= (p.x ** 2 + p.y ** 2) / a2 + p.z ** 2 / b2;
    const q = vectorScratch1.copy(v).multiplyScalar(-t).add(position);
    return result.set(q.x / a2, q.y / a2, q.z / b2).normalize();
  }
};

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/EllipsoidGeometry.ts
import { BufferAttribute as BufferAttribute2, BufferGeometry as BufferGeometry2, Vector3 as Vector34 } from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/EXR3DLoader.ts
import { Data3DTexture as Data3DTexture2, Loader as Loader4 } from "https://esm.sh/three@0.185.1?external";

// node_modules/three-stdlib/_polyfill/constants.js
import { REVISION } from "https://esm.sh/three@0.185.1?external";
var version = /* @__PURE__ */ (() => parseInt(REVISION.replace(/\D+/g, "")))();

// node_modules/three-stdlib/loaders/EXRLoader.js
import { DataTextureLoader, HalfFloatType as HalfFloatType2, FloatType as FloatType2, RGBAFormat as RGBAFormat2, RedFormat, LinearFilter as LinearFilter2, DataUtils } from "https://esm.sh/three@0.185.1?external";
import { unzlibSync } from "https://esm.sh/fflate@0.8.2?external";
var hasColorSpace = version >= 152;
var EXRLoader = class extends DataTextureLoader {
  constructor(manager) {
    super(manager);
    this.type = HalfFloatType2;
  }
  parse(buffer) {
    const USHORT_RANGE = 1 << 16;
    const BITMAP_SIZE = USHORT_RANGE >> 3;
    const HUF_ENCBITS = 16;
    const HUF_DECBITS = 14;
    const HUF_ENCSIZE = (1 << HUF_ENCBITS) + 1;
    const HUF_DECSIZE = 1 << HUF_DECBITS;
    const HUF_DECMASK = HUF_DECSIZE - 1;
    const NBITS = 16;
    const A_OFFSET = 1 << NBITS - 1;
    const MOD_MASK = (1 << NBITS) - 1;
    const SHORT_ZEROCODE_RUN = 59;
    const LONG_ZEROCODE_RUN = 63;
    const SHORTEST_LONG_RUN = 2 + LONG_ZEROCODE_RUN - SHORT_ZEROCODE_RUN;
    const ULONG_SIZE = 8;
    const FLOAT32_SIZE = 4;
    const INT32_SIZE = 4;
    const INT16_SIZE = 2;
    const INT8_SIZE = 1;
    const STATIC_HUFFMAN = 0;
    const DEFLATE = 1;
    const UNKNOWN = 0;
    const LOSSY_DCT = 1;
    const RLE = 2;
    const logBase = Math.pow(2.7182818, 2.2);
    function reverseLutFromBitmap(bitmap, lut) {
      var k = 0;
      for (var i = 0; i < USHORT_RANGE; ++i) {
        if (i == 0 || bitmap[i >> 3] & 1 << (i & 7)) {
          lut[k++] = i;
        }
      }
      var n = k - 1;
      while (k < USHORT_RANGE)
        lut[k++] = 0;
      return n;
    }
    function hufClearDecTable(hdec) {
      for (var i = 0; i < HUF_DECSIZE; i++) {
        hdec[i] = {};
        hdec[i].len = 0;
        hdec[i].lit = 0;
        hdec[i].p = null;
      }
    }
    const getBitsReturn = { l: 0, c: 0, lc: 0 };
    function getBits(nBits, c, lc, uInt8Array2, inOffset) {
      while (lc < nBits) {
        c = c << 8 | parseUint8Array2(uInt8Array2, inOffset);
        lc += 8;
      }
      lc -= nBits;
      getBitsReturn.l = c >> lc & (1 << nBits) - 1;
      getBitsReturn.c = c;
      getBitsReturn.lc = lc;
    }
    const hufTableBuffer = new Array(59);
    function hufCanonicalCodeTable(hcode) {
      for (var i = 0; i <= 58; ++i)
        hufTableBuffer[i] = 0;
      for (var i = 0; i < HUF_ENCSIZE; ++i)
        hufTableBuffer[hcode[i]] += 1;
      var c = 0;
      for (var i = 58; i > 0; --i) {
        var nc = c + hufTableBuffer[i] >> 1;
        hufTableBuffer[i] = c;
        c = nc;
      }
      for (var i = 0; i < HUF_ENCSIZE; ++i) {
        var l = hcode[i];
        if (l > 0)
          hcode[i] = l | hufTableBuffer[l]++ << 6;
      }
    }
    function hufUnpackEncTable(uInt8Array2, inDataView, inOffset, ni, im, iM, hcode) {
      var p = inOffset;
      var c = 0;
      var lc = 0;
      for (; im <= iM; im++) {
        if (p.value - inOffset.value > ni)
          return false;
        getBits(6, c, lc, uInt8Array2, p);
        var l = getBitsReturn.l;
        c = getBitsReturn.c;
        lc = getBitsReturn.lc;
        hcode[im] = l;
        if (l == LONG_ZEROCODE_RUN) {
          if (p.value - inOffset.value > ni) {
            throw "Something wrong with hufUnpackEncTable";
          }
          getBits(8, c, lc, uInt8Array2, p);
          var zerun = getBitsReturn.l + SHORTEST_LONG_RUN;
          c = getBitsReturn.c;
          lc = getBitsReturn.lc;
          if (im + zerun > iM + 1) {
            throw "Something wrong with hufUnpackEncTable";
          }
          while (zerun--)
            hcode[im++] = 0;
          im--;
        } else if (l >= SHORT_ZEROCODE_RUN) {
          var zerun = l - SHORT_ZEROCODE_RUN + 2;
          if (im + zerun > iM + 1) {
            throw "Something wrong with hufUnpackEncTable";
          }
          while (zerun--)
            hcode[im++] = 0;
          im--;
        }
      }
      hufCanonicalCodeTable(hcode);
    }
    function hufLength(code) {
      return code & 63;
    }
    function hufCode(code) {
      return code >> 6;
    }
    function hufBuildDecTable(hcode, im, iM, hdecod) {
      for (; im <= iM; im++) {
        var c = hufCode(hcode[im]);
        var l = hufLength(hcode[im]);
        if (c >> l) {
          throw "Invalid table entry";
        }
        if (l > HUF_DECBITS) {
          var pl = hdecod[c >> l - HUF_DECBITS];
          if (pl.len) {
            throw "Invalid table entry";
          }
          pl.lit++;
          if (pl.p) {
            var p = pl.p;
            pl.p = new Array(pl.lit);
            for (var i = 0; i < pl.lit - 1; ++i) {
              pl.p[i] = p[i];
            }
          } else {
            pl.p = new Array(1);
          }
          pl.p[pl.lit - 1] = im;
        } else if (l) {
          var plOffset = 0;
          for (var i = 1 << HUF_DECBITS - l; i > 0; i--) {
            var pl = hdecod[(c << HUF_DECBITS - l) + plOffset];
            if (pl.len || pl.p) {
              throw "Invalid table entry";
            }
            pl.len = l;
            pl.lit = im;
            plOffset++;
          }
        }
      }
      return true;
    }
    const getCharReturn = { c: 0, lc: 0 };
    function getChar(c, lc, uInt8Array2, inOffset) {
      c = c << 8 | parseUint8Array2(uInt8Array2, inOffset);
      lc += 8;
      getCharReturn.c = c;
      getCharReturn.lc = lc;
    }
    const getCodeReturn = { c: 0, lc: 0 };
    function getCode(po, rlc, c, lc, uInt8Array2, inDataView, inOffset, outBuffer, outBufferOffset, outBufferEndOffset) {
      if (po == rlc) {
        if (lc < 8) {
          getChar(c, lc, uInt8Array2, inOffset);
          c = getCharReturn.c;
          lc = getCharReturn.lc;
        }
        lc -= 8;
        var cs = c >> lc;
        var cs = new Uint8Array([cs])[0];
        if (outBufferOffset.value + cs > outBufferEndOffset) {
          return false;
        }
        var s = outBuffer[outBufferOffset.value - 1];
        while (cs-- > 0) {
          outBuffer[outBufferOffset.value++] = s;
        }
      } else if (outBufferOffset.value < outBufferEndOffset) {
        outBuffer[outBufferOffset.value++] = po;
      } else {
        return false;
      }
      getCodeReturn.c = c;
      getCodeReturn.lc = lc;
    }
    function UInt16(value) {
      return value & 65535;
    }
    function Int16(value) {
      var ref3 = UInt16(value);
      return ref3 > 32767 ? ref3 - 65536 : ref3;
    }
    const wdec14Return = { a: 0, b: 0 };
    function wdec14(l, h) {
      var ls = Int16(l);
      var hs = Int16(h);
      var hi = hs;
      var ai = ls + (hi & 1) + (hi >> 1);
      var as = ai;
      var bs = ai - hi;
      wdec14Return.a = as;
      wdec14Return.b = bs;
    }
    function wdec16(l, h) {
      var m = UInt16(l);
      var d = UInt16(h);
      var bb = m - (d >> 1) & MOD_MASK;
      var aa = d + bb - A_OFFSET & MOD_MASK;
      wdec14Return.a = aa;
      wdec14Return.b = bb;
    }
    function wav2Decode(buffer2, j, nx, ox, ny, oy, mx) {
      var w14 = mx < 1 << 14;
      var n = nx > ny ? ny : nx;
      var p = 1;
      var p2;
      while (p <= n)
        p <<= 1;
      p >>= 1;
      p2 = p;
      p >>= 1;
      while (p >= 1) {
        var py = 0;
        var ey = py + oy * (ny - p2);
        var oy1 = oy * p;
        var oy2 = oy * p2;
        var ox1 = ox * p;
        var ox2 = ox * p2;
        var i00, i01, i10, i11;
        for (; py <= ey; py += oy2) {
          var px = py;
          var ex = py + ox * (nx - p2);
          for (; px <= ex; px += ox2) {
            var p01 = px + ox1;
            var p10 = px + oy1;
            var p11 = p10 + ox1;
            if (w14) {
              wdec14(buffer2[px + j], buffer2[p10 + j]);
              i00 = wdec14Return.a;
              i10 = wdec14Return.b;
              wdec14(buffer2[p01 + j], buffer2[p11 + j]);
              i01 = wdec14Return.a;
              i11 = wdec14Return.b;
              wdec14(i00, i01);
              buffer2[px + j] = wdec14Return.a;
              buffer2[p01 + j] = wdec14Return.b;
              wdec14(i10, i11);
              buffer2[p10 + j] = wdec14Return.a;
              buffer2[p11 + j] = wdec14Return.b;
            } else {
              wdec16(buffer2[px + j], buffer2[p10 + j]);
              i00 = wdec14Return.a;
              i10 = wdec14Return.b;
              wdec16(buffer2[p01 + j], buffer2[p11 + j]);
              i01 = wdec14Return.a;
              i11 = wdec14Return.b;
              wdec16(i00, i01);
              buffer2[px + j] = wdec14Return.a;
              buffer2[p01 + j] = wdec14Return.b;
              wdec16(i10, i11);
              buffer2[p10 + j] = wdec14Return.a;
              buffer2[p11 + j] = wdec14Return.b;
            }
          }
          if (nx & p) {
            var p10 = px + oy1;
            if (w14)
              wdec14(buffer2[px + j], buffer2[p10 + j]);
            else
              wdec16(buffer2[px + j], buffer2[p10 + j]);
            i00 = wdec14Return.a;
            buffer2[p10 + j] = wdec14Return.b;
            buffer2[px + j] = i00;
          }
        }
        if (ny & p) {
          var px = py;
          var ex = py + ox * (nx - p2);
          for (; px <= ex; px += ox2) {
            var p01 = px + ox1;
            if (w14)
              wdec14(buffer2[px + j], buffer2[p01 + j]);
            else
              wdec16(buffer2[px + j], buffer2[p01 + j]);
            i00 = wdec14Return.a;
            buffer2[p01 + j] = wdec14Return.b;
            buffer2[px + j] = i00;
          }
        }
        p2 = p;
        p >>= 1;
      }
      return py;
    }
    function hufDecode(encodingTable, decodingTable, uInt8Array2, inDataView, inOffset, ni, rlc, no, outBuffer, outOffset) {
      var c = 0;
      var lc = 0;
      var outBufferEndOffset = no;
      var inOffsetEnd = Math.trunc(inOffset.value + (ni + 7) / 8);
      while (inOffset.value < inOffsetEnd) {
        getChar(c, lc, uInt8Array2, inOffset);
        c = getCharReturn.c;
        lc = getCharReturn.lc;
        while (lc >= HUF_DECBITS) {
          var index = c >> lc - HUF_DECBITS & HUF_DECMASK;
          var pl = decodingTable[index];
          if (pl.len) {
            lc -= pl.len;
            getCode(pl.lit, rlc, c, lc, uInt8Array2, inDataView, inOffset, outBuffer, outOffset, outBufferEndOffset);
            c = getCodeReturn.c;
            lc = getCodeReturn.lc;
          } else {
            if (!pl.p) {
              throw "hufDecode issues";
            }
            var j;
            for (j = 0; j < pl.lit; j++) {
              var l = hufLength(encodingTable[pl.p[j]]);
              while (lc < l && inOffset.value < inOffsetEnd) {
                getChar(c, lc, uInt8Array2, inOffset);
                c = getCharReturn.c;
                lc = getCharReturn.lc;
              }
              if (lc >= l) {
                if (hufCode(encodingTable[pl.p[j]]) == (c >> lc - l & (1 << l) - 1)) {
                  lc -= l;
                  getCode(
                    pl.p[j],
                    rlc,
                    c,
                    lc,
                    uInt8Array2,
                    inDataView,
                    inOffset,
                    outBuffer,
                    outOffset,
                    outBufferEndOffset
                  );
                  c = getCodeReturn.c;
                  lc = getCodeReturn.lc;
                  break;
                }
              }
            }
            if (j == pl.lit) {
              throw "hufDecode issues";
            }
          }
        }
      }
      var i = 8 - ni & 7;
      c >>= i;
      lc -= i;
      while (lc > 0) {
        var pl = decodingTable[c << HUF_DECBITS - lc & HUF_DECMASK];
        if (pl.len) {
          lc -= pl.len;
          getCode(pl.lit, rlc, c, lc, uInt8Array2, inDataView, inOffset, outBuffer, outOffset, outBufferEndOffset);
          c = getCodeReturn.c;
          lc = getCodeReturn.lc;
        } else {
          throw "hufDecode issues";
        }
      }
      return true;
    }
    function hufUncompress(uInt8Array2, inDataView, inOffset, nCompressed, outBuffer, nRaw) {
      var outOffset = { value: 0 };
      var initialInOffset = inOffset.value;
      var im = parseUint32(inDataView, inOffset);
      var iM = parseUint32(inDataView, inOffset);
      inOffset.value += 4;
      var nBits = parseUint32(inDataView, inOffset);
      inOffset.value += 4;
      if (im < 0 || im >= HUF_ENCSIZE || iM < 0 || iM >= HUF_ENCSIZE) {
        throw "Something wrong with HUF_ENCSIZE";
      }
      var freq = new Array(HUF_ENCSIZE);
      var hdec = new Array(HUF_DECSIZE);
      hufClearDecTable(hdec);
      var ni = nCompressed - (inOffset.value - initialInOffset);
      hufUnpackEncTable(uInt8Array2, inDataView, inOffset, ni, im, iM, freq);
      if (nBits > 8 * (nCompressed - (inOffset.value - initialInOffset))) {
        throw "Something wrong with hufUncompress";
      }
      hufBuildDecTable(freq, im, iM, hdec);
      hufDecode(freq, hdec, uInt8Array2, inDataView, inOffset, nBits, iM, nRaw, outBuffer, outOffset);
    }
    function applyLut(lut, data, nData) {
      for (var i = 0; i < nData; ++i) {
        data[i] = lut[data[i]];
      }
    }
    function predictor(source) {
      for (var t = 1; t < source.length; t++) {
        var d = source[t - 1] + source[t] - 128;
        source[t] = d;
      }
    }
    function interleaveScalar(source, out) {
      var t1 = 0;
      var t2 = Math.floor((source.length + 1) / 2);
      var s = 0;
      var stop = source.length - 1;
      while (true) {
        if (s > stop)
          break;
        out[s++] = source[t1++];
        if (s > stop)
          break;
        out[s++] = source[t2++];
      }
    }
    function decodeRunLength(source) {
      var size = source.byteLength;
      var out = new Array();
      var p = 0;
      var reader = new DataView(source);
      while (size > 0) {
        var l = reader.getInt8(p++);
        if (l < 0) {
          var count = -l;
          size -= count + 1;
          for (var i = 0; i < count; i++) {
            out.push(reader.getUint8(p++));
          }
        } else {
          var count = l;
          size -= 2;
          var value = reader.getUint8(p++);
          for (var i = 0; i < count + 1; i++) {
            out.push(value);
          }
        }
      }
      return out;
    }
    function lossyDctDecode(cscSet, rowPtrs, channelData, acBuffer, dcBuffer, outBuffer) {
      var dataView = new DataView(outBuffer.buffer);
      var width = channelData[cscSet.idx[0]].width;
      var height = channelData[cscSet.idx[0]].height;
      var numComp = 3;
      var numFullBlocksX = Math.floor(width / 8);
      var numBlocksX = Math.ceil(width / 8);
      var numBlocksY = Math.ceil(height / 8);
      var leftoverX = width - (numBlocksX - 1) * 8;
      var leftoverY = height - (numBlocksY - 1) * 8;
      var currAcComp = { value: 0 };
      var currDcComp = new Array(numComp);
      var dctData = new Array(numComp);
      var halfZigBlock = new Array(numComp);
      var rowBlock = new Array(numComp);
      var rowOffsets = new Array(numComp);
      for (let comp2 = 0; comp2 < numComp; ++comp2) {
        rowOffsets[comp2] = rowPtrs[cscSet.idx[comp2]];
        currDcComp[comp2] = comp2 < 1 ? 0 : currDcComp[comp2 - 1] + numBlocksX * numBlocksY;
        dctData[comp2] = new Float32Array(64);
        halfZigBlock[comp2] = new Uint16Array(64);
        rowBlock[comp2] = new Uint16Array(numBlocksX * 64);
      }
      for (let blocky = 0; blocky < numBlocksY; ++blocky) {
        var maxY = 8;
        if (blocky == numBlocksY - 1)
          maxY = leftoverY;
        var maxX = 8;
        for (let blockx = 0; blockx < numBlocksX; ++blockx) {
          if (blockx == numBlocksX - 1)
            maxX = leftoverX;
          for (let comp2 = 0; comp2 < numComp; ++comp2) {
            halfZigBlock[comp2].fill(0);
            halfZigBlock[comp2][0] = dcBuffer[currDcComp[comp2]++];
            unRleAC(currAcComp, acBuffer, halfZigBlock[comp2]);
            unZigZag(halfZigBlock[comp2], dctData[comp2]);
            dctInverse(dctData[comp2]);
          }
          {
            csc709Inverse(dctData);
          }
          for (let comp2 = 0; comp2 < numComp; ++comp2) {
            convertToHalf(dctData[comp2], rowBlock[comp2], blockx * 64);
          }
        }
        let offset2 = 0;
        for (let comp2 = 0; comp2 < numComp; ++comp2) {
          const type2 = channelData[cscSet.idx[comp2]].type;
          for (let y2 = 8 * blocky; y2 < 8 * blocky + maxY; ++y2) {
            offset2 = rowOffsets[comp2][y2];
            for (let blockx = 0; blockx < numFullBlocksX; ++blockx) {
              const src = blockx * 64 + (y2 & 7) * 8;
              dataView.setUint16(offset2 + 0 * INT16_SIZE * type2, rowBlock[comp2][src + 0], true);
              dataView.setUint16(offset2 + 1 * INT16_SIZE * type2, rowBlock[comp2][src + 1], true);
              dataView.setUint16(offset2 + 2 * INT16_SIZE * type2, rowBlock[comp2][src + 2], true);
              dataView.setUint16(offset2 + 3 * INT16_SIZE * type2, rowBlock[comp2][src + 3], true);
              dataView.setUint16(offset2 + 4 * INT16_SIZE * type2, rowBlock[comp2][src + 4], true);
              dataView.setUint16(offset2 + 5 * INT16_SIZE * type2, rowBlock[comp2][src + 5], true);
              dataView.setUint16(offset2 + 6 * INT16_SIZE * type2, rowBlock[comp2][src + 6], true);
              dataView.setUint16(offset2 + 7 * INT16_SIZE * type2, rowBlock[comp2][src + 7], true);
              offset2 += 8 * INT16_SIZE * type2;
            }
          }
          if (numFullBlocksX != numBlocksX) {
            for (let y2 = 8 * blocky; y2 < 8 * blocky + maxY; ++y2) {
              const offset3 = rowOffsets[comp2][y2] + 8 * numFullBlocksX * INT16_SIZE * type2;
              const src = numFullBlocksX * 64 + (y2 & 7) * 8;
              for (let x2 = 0; x2 < maxX; ++x2) {
                dataView.setUint16(offset3 + x2 * INT16_SIZE * type2, rowBlock[comp2][src + x2], true);
              }
            }
          }
        }
      }
      var halfRow = new Uint16Array(width);
      var dataView = new DataView(outBuffer.buffer);
      for (var comp = 0; comp < numComp; ++comp) {
        channelData[cscSet.idx[comp]].decoded = true;
        var type = channelData[cscSet.idx[comp]].type;
        if (channelData[comp].type != 2)
          continue;
        for (var y = 0; y < height; ++y) {
          const offset2 = rowOffsets[comp][y];
          for (var x = 0; x < width; ++x) {
            halfRow[x] = dataView.getUint16(offset2 + x * INT16_SIZE * type, true);
          }
          for (var x = 0; x < width; ++x) {
            dataView.setFloat32(offset2 + x * INT16_SIZE * type, decodeFloat16(halfRow[x]), true);
          }
        }
      }
    }
    function unRleAC(currAcComp, acBuffer, halfZigBlock) {
      var acValue;
      var dctComp = 1;
      while (dctComp < 64) {
        acValue = acBuffer[currAcComp.value];
        if (acValue == 65280) {
          dctComp = 64;
        } else if (acValue >> 8 == 255) {
          dctComp += acValue & 255;
        } else {
          halfZigBlock[dctComp] = acValue;
          dctComp++;
        }
        currAcComp.value++;
      }
    }
    function unZigZag(src, dst) {
      dst[0] = decodeFloat16(src[0]);
      dst[1] = decodeFloat16(src[1]);
      dst[2] = decodeFloat16(src[5]);
      dst[3] = decodeFloat16(src[6]);
      dst[4] = decodeFloat16(src[14]);
      dst[5] = decodeFloat16(src[15]);
      dst[6] = decodeFloat16(src[27]);
      dst[7] = decodeFloat16(src[28]);
      dst[8] = decodeFloat16(src[2]);
      dst[9] = decodeFloat16(src[4]);
      dst[10] = decodeFloat16(src[7]);
      dst[11] = decodeFloat16(src[13]);
      dst[12] = decodeFloat16(src[16]);
      dst[13] = decodeFloat16(src[26]);
      dst[14] = decodeFloat16(src[29]);
      dst[15] = decodeFloat16(src[42]);
      dst[16] = decodeFloat16(src[3]);
      dst[17] = decodeFloat16(src[8]);
      dst[18] = decodeFloat16(src[12]);
      dst[19] = decodeFloat16(src[17]);
      dst[20] = decodeFloat16(src[25]);
      dst[21] = decodeFloat16(src[30]);
      dst[22] = decodeFloat16(src[41]);
      dst[23] = decodeFloat16(src[43]);
      dst[24] = decodeFloat16(src[9]);
      dst[25] = decodeFloat16(src[11]);
      dst[26] = decodeFloat16(src[18]);
      dst[27] = decodeFloat16(src[24]);
      dst[28] = decodeFloat16(src[31]);
      dst[29] = decodeFloat16(src[40]);
      dst[30] = decodeFloat16(src[44]);
      dst[31] = decodeFloat16(src[53]);
      dst[32] = decodeFloat16(src[10]);
      dst[33] = decodeFloat16(src[19]);
      dst[34] = decodeFloat16(src[23]);
      dst[35] = decodeFloat16(src[32]);
      dst[36] = decodeFloat16(src[39]);
      dst[37] = decodeFloat16(src[45]);
      dst[38] = decodeFloat16(src[52]);
      dst[39] = decodeFloat16(src[54]);
      dst[40] = decodeFloat16(src[20]);
      dst[41] = decodeFloat16(src[22]);
      dst[42] = decodeFloat16(src[33]);
      dst[43] = decodeFloat16(src[38]);
      dst[44] = decodeFloat16(src[46]);
      dst[45] = decodeFloat16(src[51]);
      dst[46] = decodeFloat16(src[55]);
      dst[47] = decodeFloat16(src[60]);
      dst[48] = decodeFloat16(src[21]);
      dst[49] = decodeFloat16(src[34]);
      dst[50] = decodeFloat16(src[37]);
      dst[51] = decodeFloat16(src[47]);
      dst[52] = decodeFloat16(src[50]);
      dst[53] = decodeFloat16(src[56]);
      dst[54] = decodeFloat16(src[59]);
      dst[55] = decodeFloat16(src[61]);
      dst[56] = decodeFloat16(src[35]);
      dst[57] = decodeFloat16(src[36]);
      dst[58] = decodeFloat16(src[48]);
      dst[59] = decodeFloat16(src[49]);
      dst[60] = decodeFloat16(src[57]);
      dst[61] = decodeFloat16(src[58]);
      dst[62] = decodeFloat16(src[62]);
      dst[63] = decodeFloat16(src[63]);
    }
    function dctInverse(data) {
      const a = 0.5 * Math.cos(3.14159 / 4);
      const b = 0.5 * Math.cos(3.14159 / 16);
      const c = 0.5 * Math.cos(3.14159 / 8);
      const d = 0.5 * Math.cos(3 * 3.14159 / 16);
      const e = 0.5 * Math.cos(5 * 3.14159 / 16);
      const f = 0.5 * Math.cos(3 * 3.14159 / 8);
      const g = 0.5 * Math.cos(7 * 3.14159 / 16);
      var alpha = new Array(4);
      var beta = new Array(4);
      var theta = new Array(4);
      var gamma = new Array(4);
      for (var row = 0; row < 8; ++row) {
        var rowPtr = row * 8;
        alpha[0] = c * data[rowPtr + 2];
        alpha[1] = f * data[rowPtr + 2];
        alpha[2] = c * data[rowPtr + 6];
        alpha[3] = f * data[rowPtr + 6];
        beta[0] = b * data[rowPtr + 1] + d * data[rowPtr + 3] + e * data[rowPtr + 5] + g * data[rowPtr + 7];
        beta[1] = d * data[rowPtr + 1] - g * data[rowPtr + 3] - b * data[rowPtr + 5] - e * data[rowPtr + 7];
        beta[2] = e * data[rowPtr + 1] - b * data[rowPtr + 3] + g * data[rowPtr + 5] + d * data[rowPtr + 7];
        beta[3] = g * data[rowPtr + 1] - e * data[rowPtr + 3] + d * data[rowPtr + 5] - b * data[rowPtr + 7];
        theta[0] = a * (data[rowPtr + 0] + data[rowPtr + 4]);
        theta[3] = a * (data[rowPtr + 0] - data[rowPtr + 4]);
        theta[1] = alpha[0] + alpha[3];
        theta[2] = alpha[1] - alpha[2];
        gamma[0] = theta[0] + theta[1];
        gamma[1] = theta[3] + theta[2];
        gamma[2] = theta[3] - theta[2];
        gamma[3] = theta[0] - theta[1];
        data[rowPtr + 0] = gamma[0] + beta[0];
        data[rowPtr + 1] = gamma[1] + beta[1];
        data[rowPtr + 2] = gamma[2] + beta[2];
        data[rowPtr + 3] = gamma[3] + beta[3];
        data[rowPtr + 4] = gamma[3] - beta[3];
        data[rowPtr + 5] = gamma[2] - beta[2];
        data[rowPtr + 6] = gamma[1] - beta[1];
        data[rowPtr + 7] = gamma[0] - beta[0];
      }
      for (var column = 0; column < 8; ++column) {
        alpha[0] = c * data[16 + column];
        alpha[1] = f * data[16 + column];
        alpha[2] = c * data[48 + column];
        alpha[3] = f * data[48 + column];
        beta[0] = b * data[8 + column] + d * data[24 + column] + e * data[40 + column] + g * data[56 + column];
        beta[1] = d * data[8 + column] - g * data[24 + column] - b * data[40 + column] - e * data[56 + column];
        beta[2] = e * data[8 + column] - b * data[24 + column] + g * data[40 + column] + d * data[56 + column];
        beta[3] = g * data[8 + column] - e * data[24 + column] + d * data[40 + column] - b * data[56 + column];
        theta[0] = a * (data[column] + data[32 + column]);
        theta[3] = a * (data[column] - data[32 + column]);
        theta[1] = alpha[0] + alpha[3];
        theta[2] = alpha[1] - alpha[2];
        gamma[0] = theta[0] + theta[1];
        gamma[1] = theta[3] + theta[2];
        gamma[2] = theta[3] - theta[2];
        gamma[3] = theta[0] - theta[1];
        data[0 + column] = gamma[0] + beta[0];
        data[8 + column] = gamma[1] + beta[1];
        data[16 + column] = gamma[2] + beta[2];
        data[24 + column] = gamma[3] + beta[3];
        data[32 + column] = gamma[3] - beta[3];
        data[40 + column] = gamma[2] - beta[2];
        data[48 + column] = gamma[1] - beta[1];
        data[56 + column] = gamma[0] - beta[0];
      }
    }
    function csc709Inverse(data) {
      for (var i = 0; i < 64; ++i) {
        var y = data[0][i];
        var cb = data[1][i];
        var cr = data[2][i];
        data[0][i] = y + 1.5747 * cr;
        data[1][i] = y - 0.1873 * cb - 0.4682 * cr;
        data[2][i] = y + 1.8556 * cb;
      }
    }
    function convertToHalf(src, dst, idx) {
      for (var i = 0; i < 64; ++i) {
        dst[idx + i] = DataUtils.toHalfFloat(toLinear(src[i]));
      }
    }
    function toLinear(float) {
      if (float <= 1) {
        return Math.sign(float) * Math.pow(Math.abs(float), 2.2);
      } else {
        return Math.sign(float) * Math.pow(logBase, Math.abs(float) - 1);
      }
    }
    function uncompressRAW(info) {
      return new DataView(info.array.buffer, info.offset.value, info.size);
    }
    function uncompressRLE(info) {
      var compressed = info.viewer.buffer.slice(info.offset.value, info.offset.value + info.size);
      var rawBuffer = new Uint8Array(decodeRunLength(compressed));
      var tmpBuffer = new Uint8Array(rawBuffer.length);
      predictor(rawBuffer);
      interleaveScalar(rawBuffer, tmpBuffer);
      return new DataView(tmpBuffer.buffer);
    }
    function uncompressZIP(info) {
      var compressed = info.array.slice(info.offset.value, info.offset.value + info.size);
      var rawBuffer = unzlibSync(compressed);
      var tmpBuffer = new Uint8Array(rawBuffer.length);
      predictor(rawBuffer);
      interleaveScalar(rawBuffer, tmpBuffer);
      return new DataView(tmpBuffer.buffer);
    }
    function uncompressPIZ(info) {
      var inDataView = info.viewer;
      var inOffset = { value: info.offset.value };
      var outBuffer = new Uint16Array(info.width * info.scanlineBlockSize * (info.channels * info.type));
      var bitmap = new Uint8Array(BITMAP_SIZE);
      var outBufferEnd = 0;
      var pizChannelData = new Array(info.channels);
      for (var i = 0; i < info.channels; i++) {
        pizChannelData[i] = {};
        pizChannelData[i]["start"] = outBufferEnd;
        pizChannelData[i]["end"] = pizChannelData[i]["start"];
        pizChannelData[i]["nx"] = info.width;
        pizChannelData[i]["ny"] = info.lines;
        pizChannelData[i]["size"] = info.type;
        outBufferEnd += pizChannelData[i].nx * pizChannelData[i].ny * pizChannelData[i].size;
      }
      var minNonZero = parseUint16(inDataView, inOffset);
      var maxNonZero = parseUint16(inDataView, inOffset);
      if (maxNonZero >= BITMAP_SIZE) {
        throw "Something is wrong with PIZ_COMPRESSION BITMAP_SIZE";
      }
      if (minNonZero <= maxNonZero) {
        for (var i = 0; i < maxNonZero - minNonZero + 1; i++) {
          bitmap[i + minNonZero] = parseUint8(inDataView, inOffset);
        }
      }
      var lut = new Uint16Array(USHORT_RANGE);
      var maxValue = reverseLutFromBitmap(bitmap, lut);
      var length = parseUint32(inDataView, inOffset);
      hufUncompress(info.array, inDataView, inOffset, length, outBuffer, outBufferEnd);
      for (var i = 0; i < info.channels; ++i) {
        var cd = pizChannelData[i];
        for (var j = 0; j < pizChannelData[i].size; ++j) {
          wav2Decode(outBuffer, cd.start + j, cd.nx, cd.size, cd.ny, cd.nx * cd.size, maxValue);
        }
      }
      applyLut(lut, outBuffer, outBufferEnd);
      var tmpOffset2 = 0;
      var tmpBuffer = new Uint8Array(outBuffer.buffer.byteLength);
      for (var y = 0; y < info.lines; y++) {
        for (var c = 0; c < info.channels; c++) {
          var cd = pizChannelData[c];
          var n = cd.nx * cd.size;
          var cp = new Uint8Array(outBuffer.buffer, cd.end * INT16_SIZE, n * INT16_SIZE);
          tmpBuffer.set(cp, tmpOffset2);
          tmpOffset2 += n * INT16_SIZE;
          cd.end += n;
        }
      }
      return new DataView(tmpBuffer.buffer);
    }
    function uncompressPXR(info) {
      var compressed = info.array.slice(info.offset.value, info.offset.value + info.size);
      var rawBuffer = unzlibSync(compressed);
      const sz = info.lines * info.channels * info.width;
      const tmpBuffer = info.type == 1 ? new Uint16Array(sz) : new Uint32Array(sz);
      let tmpBufferEnd = 0;
      let writePtr = 0;
      const ptr = new Array(4);
      for (let y = 0; y < info.lines; y++) {
        for (let c = 0; c < info.channels; c++) {
          let pixel = 0;
          switch (info.type) {
            case 1:
              ptr[0] = tmpBufferEnd;
              ptr[1] = ptr[0] + info.width;
              tmpBufferEnd = ptr[1] + info.width;
              for (let j = 0; j < info.width; ++j) {
                const diff = rawBuffer[ptr[0]++] << 8 | rawBuffer[ptr[1]++];
                pixel += diff;
                tmpBuffer[writePtr] = pixel;
                writePtr++;
              }
              break;
            case 2:
              ptr[0] = tmpBufferEnd;
              ptr[1] = ptr[0] + info.width;
              ptr[2] = ptr[1] + info.width;
              tmpBufferEnd = ptr[2] + info.width;
              for (let j = 0; j < info.width; ++j) {
                const diff = rawBuffer[ptr[0]++] << 24 | rawBuffer[ptr[1]++] << 16 | rawBuffer[ptr[2]++] << 8;
                pixel += diff;
                tmpBuffer[writePtr] = pixel;
                writePtr++;
              }
              break;
          }
        }
      }
      return new DataView(tmpBuffer.buffer);
    }
    function uncompressDWA(info) {
      var inDataView = info.viewer;
      var inOffset = { value: info.offset.value };
      var outBuffer = new Uint8Array(info.width * info.lines * (info.channels * info.type * INT16_SIZE));
      var dwaHeader = {
        version: parseInt64(inDataView, inOffset),
        unknownUncompressedSize: parseInt64(inDataView, inOffset),
        unknownCompressedSize: parseInt64(inDataView, inOffset),
        acCompressedSize: parseInt64(inDataView, inOffset),
        dcCompressedSize: parseInt64(inDataView, inOffset),
        rleCompressedSize: parseInt64(inDataView, inOffset),
        rleUncompressedSize: parseInt64(inDataView, inOffset),
        rleRawSize: parseInt64(inDataView, inOffset),
        totalAcUncompressedCount: parseInt64(inDataView, inOffset),
        totalDcUncompressedCount: parseInt64(inDataView, inOffset),
        acCompression: parseInt64(inDataView, inOffset)
      };
      if (dwaHeader.version < 2) {
        throw "EXRLoader.parse: " + EXRHeader.compression + " version " + dwaHeader.version + " is unsupported";
      }
      var channelRules = new Array();
      var ruleSize = parseUint16(inDataView, inOffset) - INT16_SIZE;
      while (ruleSize > 0) {
        var name = parseNullTerminatedString(inDataView.buffer, inOffset);
        var value = parseUint8(inDataView, inOffset);
        var compression = value >> 2 & 3;
        var csc = (value >> 4) - 1;
        var index = new Int8Array([csc])[0];
        var type = parseUint8(inDataView, inOffset);
        channelRules.push({
          name,
          index,
          type,
          compression
        });
        ruleSize -= name.length + 3;
      }
      var channels = EXRHeader.channels;
      var channelData = new Array(info.channels);
      for (var i = 0; i < info.channels; ++i) {
        var cd = channelData[i] = {};
        var channel = channels[i];
        cd.name = channel.name;
        cd.compression = UNKNOWN;
        cd.decoded = false;
        cd.type = channel.pixelType;
        cd.pLinear = channel.pLinear;
        cd.width = info.width;
        cd.height = info.lines;
      }
      var cscSet = {
        idx: new Array(3)
      };
      for (var offset2 = 0; offset2 < info.channels; ++offset2) {
        var cd = channelData[offset2];
        for (var i = 0; i < channelRules.length; ++i) {
          var rule = channelRules[i];
          if (cd.name == rule.name) {
            cd.compression = rule.compression;
            if (rule.index >= 0) {
              cscSet.idx[rule.index] = offset2;
            }
            cd.offset = offset2;
          }
        }
      }
      if (dwaHeader.acCompressedSize > 0) {
        switch (dwaHeader.acCompression) {
          case STATIC_HUFFMAN:
            var acBuffer = new Uint16Array(dwaHeader.totalAcUncompressedCount);
            hufUncompress(
              info.array,
              inDataView,
              inOffset,
              dwaHeader.acCompressedSize,
              acBuffer,
              dwaHeader.totalAcUncompressedCount
            );
            break;
          case DEFLATE:
            var compressed = info.array.slice(inOffset.value, inOffset.value + dwaHeader.totalAcUncompressedCount);
            var data = unzlibSync(compressed);
            var acBuffer = new Uint16Array(data.buffer);
            inOffset.value += dwaHeader.totalAcUncompressedCount;
            break;
        }
      }
      if (dwaHeader.dcCompressedSize > 0) {
        var zlibInfo = {
          array: info.array,
          offset: inOffset,
          size: dwaHeader.dcCompressedSize
        };
        var dcBuffer = new Uint16Array(uncompressZIP(zlibInfo).buffer);
        inOffset.value += dwaHeader.dcCompressedSize;
      }
      if (dwaHeader.rleRawSize > 0) {
        var compressed = info.array.slice(inOffset.value, inOffset.value + dwaHeader.rleCompressedSize);
        var data = unzlibSync(compressed);
        var rleBuffer = decodeRunLength(data.buffer);
        inOffset.value += dwaHeader.rleCompressedSize;
      }
      var outBufferEnd = 0;
      var rowOffsets = new Array(channelData.length);
      for (var i = 0; i < rowOffsets.length; ++i) {
        rowOffsets[i] = new Array();
      }
      for (var y = 0; y < info.lines; ++y) {
        for (var chan = 0; chan < channelData.length; ++chan) {
          rowOffsets[chan].push(outBufferEnd);
          outBufferEnd += channelData[chan].width * info.type * INT16_SIZE;
        }
      }
      lossyDctDecode(cscSet, rowOffsets, channelData, acBuffer, dcBuffer, outBuffer);
      for (var i = 0; i < channelData.length; ++i) {
        var cd = channelData[i];
        if (cd.decoded)
          continue;
        switch (cd.compression) {
          case RLE:
            var row = 0;
            var rleOffset = 0;
            for (var y = 0; y < info.lines; ++y) {
              var rowOffsetBytes = rowOffsets[i][row];
              for (var x = 0; x < cd.width; ++x) {
                for (var byte = 0; byte < INT16_SIZE * cd.type; ++byte) {
                  outBuffer[rowOffsetBytes++] = rleBuffer[rleOffset + byte * cd.width * cd.height];
                }
                rleOffset++;
              }
              row++;
            }
            break;
          case LOSSY_DCT:
          default:
            throw "EXRLoader.parse: unsupported channel compression";
        }
      }
      return new DataView(outBuffer.buffer);
    }
    function parseNullTerminatedString(buffer2, offset2) {
      var uintBuffer = new Uint8Array(buffer2);
      var endOffset = 0;
      while (uintBuffer[offset2.value + endOffset] != 0) {
        endOffset += 1;
      }
      var stringValue = new TextDecoder().decode(uintBuffer.slice(offset2.value, offset2.value + endOffset));
      offset2.value = offset2.value + endOffset + 1;
      return stringValue;
    }
    function parseFixedLengthString(buffer2, offset2, size) {
      var stringValue = new TextDecoder().decode(new Uint8Array(buffer2).slice(offset2.value, offset2.value + size));
      offset2.value = offset2.value + size;
      return stringValue;
    }
    function parseRational(dataView, offset2) {
      var x = parseInt32(dataView, offset2);
      var y = parseUint32(dataView, offset2);
      return [x, y];
    }
    function parseTimecode(dataView, offset2) {
      var x = parseUint32(dataView, offset2);
      var y = parseUint32(dataView, offset2);
      return [x, y];
    }
    function parseInt32(dataView, offset2) {
      var Int32 = dataView.getInt32(offset2.value, true);
      offset2.value = offset2.value + INT32_SIZE;
      return Int32;
    }
    function parseUint32(dataView, offset2) {
      var Uint32 = dataView.getUint32(offset2.value, true);
      offset2.value = offset2.value + INT32_SIZE;
      return Uint32;
    }
    function parseUint8Array2(uInt8Array2, offset2) {
      var Uint8 = uInt8Array2[offset2.value];
      offset2.value = offset2.value + INT8_SIZE;
      return Uint8;
    }
    function parseUint8(dataView, offset2) {
      var Uint8 = dataView.getUint8(offset2.value);
      offset2.value = offset2.value + INT8_SIZE;
      return Uint8;
    }
    const parseInt64 = function(dataView, offset2) {
      let int;
      if ("getBigInt64" in DataView.prototype) {
        int = Number(dataView.getBigInt64(offset2.value, true));
      } else {
        int = dataView.getUint32(offset2.value + 4, true) + Number(dataView.getUint32(offset2.value, true) << 32);
      }
      offset2.value += ULONG_SIZE;
      return int;
    };
    function parseFloat32(dataView, offset2) {
      var float = dataView.getFloat32(offset2.value, true);
      offset2.value += FLOAT32_SIZE;
      return float;
    }
    function decodeFloat32(dataView, offset2) {
      return DataUtils.toHalfFloat(parseFloat32(dataView, offset2));
    }
    function decodeFloat16(binary) {
      var exponent = (binary & 31744) >> 10, fraction = binary & 1023;
      return (binary >> 15 ? -1 : 1) * (exponent ? exponent === 31 ? fraction ? NaN : Infinity : Math.pow(2, exponent - 15) * (1 + fraction / 1024) : 6103515625e-14 * (fraction / 1024));
    }
    function parseUint16(dataView, offset2) {
      var Uint16 = dataView.getUint16(offset2.value, true);
      offset2.value += INT16_SIZE;
      return Uint16;
    }
    function parseFloat16(buffer2, offset2) {
      return decodeFloat16(parseUint16(buffer2, offset2));
    }
    function parseChlist(dataView, buffer2, offset2, size) {
      var startOffset = offset2.value;
      var channels = [];
      while (offset2.value < startOffset + size - 1) {
        var name = parseNullTerminatedString(buffer2, offset2);
        var pixelType = parseInt32(dataView, offset2);
        var pLinear = parseUint8(dataView, offset2);
        offset2.value += 3;
        var xSampling = parseInt32(dataView, offset2);
        var ySampling = parseInt32(dataView, offset2);
        channels.push({
          name,
          pixelType,
          pLinear,
          xSampling,
          ySampling
        });
      }
      offset2.value += 1;
      return channels;
    }
    function parseChromaticities(dataView, offset2) {
      var redX = parseFloat32(dataView, offset2);
      var redY = parseFloat32(dataView, offset2);
      var greenX = parseFloat32(dataView, offset2);
      var greenY = parseFloat32(dataView, offset2);
      var blueX = parseFloat32(dataView, offset2);
      var blueY = parseFloat32(dataView, offset2);
      var whiteX = parseFloat32(dataView, offset2);
      var whiteY = parseFloat32(dataView, offset2);
      return {
        redX,
        redY,
        greenX,
        greenY,
        blueX,
        blueY,
        whiteX,
        whiteY
      };
    }
    function parseCompression(dataView, offset2) {
      var compressionCodes = [
        "NO_COMPRESSION",
        "RLE_COMPRESSION",
        "ZIPS_COMPRESSION",
        "ZIP_COMPRESSION",
        "PIZ_COMPRESSION",
        "PXR24_COMPRESSION",
        "B44_COMPRESSION",
        "B44A_COMPRESSION",
        "DWAA_COMPRESSION",
        "DWAB_COMPRESSION"
      ];
      var compression = parseUint8(dataView, offset2);
      return compressionCodes[compression];
    }
    function parseBox2i(dataView, offset2) {
      var xMin = parseUint32(dataView, offset2);
      var yMin = parseUint32(dataView, offset2);
      var xMax = parseUint32(dataView, offset2);
      var yMax = parseUint32(dataView, offset2);
      return { xMin, yMin, xMax, yMax };
    }
    function parseLineOrder(dataView, offset2) {
      var lineOrders = ["INCREASING_Y"];
      var lineOrder = parseUint8(dataView, offset2);
      return lineOrders[lineOrder];
    }
    function parseV2f(dataView, offset2) {
      var x = parseFloat32(dataView, offset2);
      var y = parseFloat32(dataView, offset2);
      return [x, y];
    }
    function parseV3f(dataView, offset2) {
      var x = parseFloat32(dataView, offset2);
      var y = parseFloat32(dataView, offset2);
      var z = parseFloat32(dataView, offset2);
      return [x, y, z];
    }
    function parseValue(dataView, buffer2, offset2, type, size) {
      if (type === "string" || type === "stringvector" || type === "iccProfile") {
        return parseFixedLengthString(buffer2, offset2, size);
      } else if (type === "chlist") {
        return parseChlist(dataView, buffer2, offset2, size);
      } else if (type === "chromaticities") {
        return parseChromaticities(dataView, offset2);
      } else if (type === "compression") {
        return parseCompression(dataView, offset2);
      } else if (type === "box2i") {
        return parseBox2i(dataView, offset2);
      } else if (type === "lineOrder") {
        return parseLineOrder(dataView, offset2);
      } else if (type === "float") {
        return parseFloat32(dataView, offset2);
      } else if (type === "v2f") {
        return parseV2f(dataView, offset2);
      } else if (type === "v3f") {
        return parseV3f(dataView, offset2);
      } else if (type === "int") {
        return parseInt32(dataView, offset2);
      } else if (type === "rational") {
        return parseRational(dataView, offset2);
      } else if (type === "timecode") {
        return parseTimecode(dataView, offset2);
      } else if (type === "preview") {
        offset2.value += size;
        return "skipped";
      } else {
        offset2.value += size;
        return void 0;
      }
    }
    function parseHeader(dataView, buffer2, offset2) {
      const EXRHeader2 = {};
      if (dataView.getUint32(0, true) != 20000630) {
        throw "THREE.EXRLoader: provided file doesn't appear to be in OpenEXR format.";
      }
      EXRHeader2.version = dataView.getUint8(4);
      const spec = dataView.getUint8(5);
      EXRHeader2.spec = {
        singleTile: !!(spec & 2),
        longName: !!(spec & 4),
        deepFormat: !!(spec & 8),
        multiPart: !!(spec & 16)
      };
      offset2.value = 8;
      var keepReading = true;
      while (keepReading) {
        var attributeName = parseNullTerminatedString(buffer2, offset2);
        if (attributeName == 0) {
          keepReading = false;
        } else {
          var attributeType = parseNullTerminatedString(buffer2, offset2);
          var attributeSize = parseUint32(dataView, offset2);
          var attributeValue = parseValue(dataView, buffer2, offset2, attributeType, attributeSize);
          if (attributeValue === void 0) {
            console.warn(`EXRLoader.parse: skipped unknown header attribute type '${attributeType}'.`);
          } else {
            EXRHeader2[attributeName] = attributeValue;
          }
        }
      }
      if ((spec & ~4) != 0) {
        console.error("EXRHeader:", EXRHeader2);
        throw "THREE.EXRLoader: provided file is currently unsupported.";
      }
      return EXRHeader2;
    }
    function setupDecoder(EXRHeader2, dataView, uInt8Array2, offset2, outputType) {
      const EXRDecoder2 = {
        size: 0,
        viewer: dataView,
        array: uInt8Array2,
        offset: offset2,
        width: EXRHeader2.dataWindow.xMax - EXRHeader2.dataWindow.xMin + 1,
        height: EXRHeader2.dataWindow.yMax - EXRHeader2.dataWindow.yMin + 1,
        channels: EXRHeader2.channels.length,
        bytesPerLine: null,
        lines: null,
        inputSize: null,
        type: EXRHeader2.channels[0].pixelType,
        uncompress: null,
        getter: null,
        format: null,
        [hasColorSpace ? "colorSpace" : "encoding"]: null
      };
      switch (EXRHeader2.compression) {
        case "NO_COMPRESSION":
          EXRDecoder2.lines = 1;
          EXRDecoder2.uncompress = uncompressRAW;
          break;
        case "RLE_COMPRESSION":
          EXRDecoder2.lines = 1;
          EXRDecoder2.uncompress = uncompressRLE;
          break;
        case "ZIPS_COMPRESSION":
          EXRDecoder2.lines = 1;
          EXRDecoder2.uncompress = uncompressZIP;
          break;
        case "ZIP_COMPRESSION":
          EXRDecoder2.lines = 16;
          EXRDecoder2.uncompress = uncompressZIP;
          break;
        case "PIZ_COMPRESSION":
          EXRDecoder2.lines = 32;
          EXRDecoder2.uncompress = uncompressPIZ;
          break;
        case "PXR24_COMPRESSION":
          EXRDecoder2.lines = 16;
          EXRDecoder2.uncompress = uncompressPXR;
          break;
        case "DWAA_COMPRESSION":
          EXRDecoder2.lines = 32;
          EXRDecoder2.uncompress = uncompressDWA;
          break;
        case "DWAB_COMPRESSION":
          EXRDecoder2.lines = 256;
          EXRDecoder2.uncompress = uncompressDWA;
          break;
        default:
          throw "EXRLoader.parse: " + EXRHeader2.compression + " is unsupported";
      }
      EXRDecoder2.scanlineBlockSize = EXRDecoder2.lines;
      if (EXRDecoder2.type == 1) {
        switch (outputType) {
          case FloatType2:
            EXRDecoder2.getter = parseFloat16;
            EXRDecoder2.inputSize = INT16_SIZE;
            break;
          case HalfFloatType2:
            EXRDecoder2.getter = parseUint16;
            EXRDecoder2.inputSize = INT16_SIZE;
            break;
        }
      } else if (EXRDecoder2.type == 2) {
        switch (outputType) {
          case FloatType2:
            EXRDecoder2.getter = parseFloat32;
            EXRDecoder2.inputSize = FLOAT32_SIZE;
            break;
          case HalfFloatType2:
            EXRDecoder2.getter = decodeFloat32;
            EXRDecoder2.inputSize = FLOAT32_SIZE;
        }
      } else {
        throw "EXRLoader.parse: unsupported pixelType " + EXRDecoder2.type + " for " + EXRHeader2.compression + ".";
      }
      EXRDecoder2.blockCount = (EXRHeader2.dataWindow.yMax + 1) / EXRDecoder2.scanlineBlockSize;
      for (var i = 0; i < EXRDecoder2.blockCount; i++)
        parseInt64(dataView, offset2);
      EXRDecoder2.outputChannels = EXRDecoder2.channels == 3 ? 4 : EXRDecoder2.channels;
      const size = EXRDecoder2.width * EXRDecoder2.height * EXRDecoder2.outputChannels;
      switch (outputType) {
        case FloatType2:
          EXRDecoder2.byteArray = new Float32Array(size);
          if (EXRDecoder2.channels < EXRDecoder2.outputChannels)
            EXRDecoder2.byteArray.fill(1, 0, size);
          break;
        case HalfFloatType2:
          EXRDecoder2.byteArray = new Uint16Array(size);
          if (EXRDecoder2.channels < EXRDecoder2.outputChannels)
            EXRDecoder2.byteArray.fill(15360, 0, size);
          break;
        default:
          console.error("THREE.EXRLoader: unsupported type: ", outputType);
          break;
      }
      EXRDecoder2.bytesPerLine = EXRDecoder2.width * EXRDecoder2.inputSize * EXRDecoder2.channels;
      if (EXRDecoder2.outputChannels == 4)
        EXRDecoder2.format = RGBAFormat2;
      else
        EXRDecoder2.format = RedFormat;
      if (hasColorSpace)
        EXRDecoder2.colorSpace = "srgb-linear";
      else
        EXRDecoder2.encoding = 3e3;
      return EXRDecoder2;
    }
    const bufferDataView = new DataView(buffer);
    const uInt8Array = new Uint8Array(buffer);
    const offset = { value: 0 };
    const EXRHeader = parseHeader(bufferDataView, buffer, offset);
    const EXRDecoder = setupDecoder(EXRHeader, bufferDataView, uInt8Array, offset, this.type);
    const tmpOffset = { value: 0 };
    const channelOffsets = { R: 0, G: 1, B: 2, A: 3, Y: 0 };
    for (let scanlineBlockIdx = 0; scanlineBlockIdx < EXRDecoder.height / EXRDecoder.scanlineBlockSize; scanlineBlockIdx++) {
      const line = parseUint32(bufferDataView, offset);
      EXRDecoder.size = parseUint32(bufferDataView, offset);
      EXRDecoder.lines = line + EXRDecoder.scanlineBlockSize > EXRDecoder.height ? EXRDecoder.height - line : EXRDecoder.scanlineBlockSize;
      const isCompressed = EXRDecoder.size < EXRDecoder.lines * EXRDecoder.bytesPerLine;
      const viewer = isCompressed ? EXRDecoder.uncompress(EXRDecoder) : uncompressRAW(EXRDecoder);
      offset.value += EXRDecoder.size;
      for (let line_y = 0; line_y < EXRDecoder.scanlineBlockSize; line_y++) {
        const true_y = line_y + scanlineBlockIdx * EXRDecoder.scanlineBlockSize;
        if (true_y >= EXRDecoder.height)
          break;
        for (let channelID = 0; channelID < EXRDecoder.channels; channelID++) {
          const cOff = channelOffsets[EXRHeader.channels[channelID].name];
          for (let x = 0; x < EXRDecoder.width; x++) {
            tmpOffset.value = (line_y * (EXRDecoder.channels * EXRDecoder.width) + channelID * EXRDecoder.width + x) * EXRDecoder.inputSize;
            const outIndex = (EXRDecoder.height - 1 - true_y) * (EXRDecoder.width * EXRDecoder.outputChannels) + x * EXRDecoder.outputChannels + cOff;
            EXRDecoder.byteArray[outIndex] = EXRDecoder.getter(viewer, tmpOffset);
          }
        }
      }
    }
    return {
      header: EXRHeader,
      width: EXRDecoder.width,
      height: EXRDecoder.height,
      data: EXRDecoder.byteArray,
      format: EXRDecoder.format,
      [hasColorSpace ? "colorSpace" : "encoding"]: EXRDecoder[hasColorSpace ? "colorSpace" : "encoding"],
      type: this.type
    };
  }
  setDataType(value) {
    this.type = value;
    return this;
  }
  load(url, onLoad, onProgress, onError) {
    function onLoadCallback(texture, texData) {
      if (hasColorSpace)
        texture.colorSpace = texData.colorSpace;
      else
        texture.encoding = texData.encoding;
      texture.minFilter = LinearFilter2;
      texture.magFilter = LinearFilter2;
      texture.generateMipmaps = false;
      texture.flipY = false;
      if (onLoad)
        onLoad(texture, texData);
    }
    return super.load(url, onLoadCallback, onProgress, onError);
  }
};

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/EXR3DLoader.ts
var EXR3DLoader = class extends Loader4 {
  depth;
  setDepth(value) {
    this.depth = value;
    return this;
  }
  load(url, onLoad, onProgress, onError) {
    const loader = new EXRLoader(this.manager);
    loader.setRequestHeader(this.requestHeader);
    loader.setPath(this.path);
    loader.setWithCredentials(this.withCredentials);
    loader.load(
      url,
      (exr) => {
        const { data, width, height } = exr.image;
        const depth2 = this.depth ?? Math.sqrt(height);
        const texture = new Data3DTexture2(data, width, height / depth2, depth2);
        texture.type = exr.type;
        texture.format = exr.format;
        texture.colorSpace = exr.colorSpace;
        texture.needsUpdate = true;
        try {
          onLoad(texture);
        } catch (error) {
          if (onError != null) {
            onError(error);
          } else {
            console.error(error);
          }
          this.manager.itemError(url);
        }
      },
      onProgress,
      onError
    );
  }
};

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/Geodetic.ts
import { Vector3 as Vector35 } from "https://esm.sh/three@0.185.1?external";
var vectorScratch12 = /* @__PURE__ */ new Vector35();
var vectorScratch22 = /* @__PURE__ */ new Vector35();
var Geodetic = class _Geodetic {
  constructor(longitude = 0, latitude = 0, height = 0) {
    this.longitude = longitude;
    this.latitude = latitude;
    this.height = height;
  }
  static MIN_LONGITUDE = -Math.PI;
  static MAX_LONGITUDE = Math.PI;
  static MIN_LATITUDE = -Math.PI / 2;
  static MAX_LATITUDE = Math.PI / 2;
  set(longitude, latitude, height) {
    this.longitude = longitude;
    this.latitude = latitude;
    if (height != null) {
      this.height = height;
    }
    return this;
  }
  clone() {
    return new _Geodetic(this.longitude, this.latitude, this.height);
  }
  copy(other) {
    this.longitude = other.longitude;
    this.latitude = other.latitude;
    this.height = other.height;
    return this;
  }
  equals(other) {
    return other.longitude === this.longitude && other.latitude === this.latitude && other.height === this.height;
  }
  setLongitude(value) {
    this.longitude = value;
    return this;
  }
  setLatitude(value) {
    this.latitude = value;
    return this;
  }
  setHeight(value) {
    this.height = value;
    return this;
  }
  normalize() {
    if (this.longitude < _Geodetic.MIN_LONGITUDE) {
      this.longitude += Math.PI * 2;
    }
    return this;
  }
  // See: https://en.wikipedia.org/wiki/Geographic_coordinate_conversion
  // Reference: https://github.com/CesiumGS/cesium/blob/1.122/packages/engine/Source/Core/Geodetic.js#L119
  setFromECEF(position, options) {
    const ellipsoid = options?.ellipsoid ?? Ellipsoid.WGS84;
    const reciprocalRadiiSquared = ellipsoid.reciprocalRadiiSquared(vectorScratch12);
    const projection = projectOnEllipsoidSurface(
      position,
      reciprocalRadiiSquared,
      vectorScratch22,
      options
    );
    if (projection == null) {
      throw new Error(
        `Could not project position to ellipsoid surface: ${position.toArray()}`
      );
    }
    const normal = vectorScratch12.multiplyVectors(projection, reciprocalRadiiSquared).normalize();
    this.longitude = Math.atan2(normal.y, normal.x);
    this.latitude = Math.asin(normal.z);
    const height = vectorScratch12.subVectors(position, projection);
    this.height = Math.sign(height.dot(position)) * height.length();
    return this;
  }
  // See: https://en.wikipedia.org/wiki/Geographic_coordinate_conversion
  // Reference: https://github.com/CesiumGS/cesium/blob/1.122/packages/engine/Source/Core/Cartesian3.js#L916
  toECEF(result = new Vector35(), options) {
    const ellipsoid = options?.ellipsoid ?? Ellipsoid.WGS84;
    const radiiSquared = vectorScratch12.multiplyVectors(
      ellipsoid.radii,
      ellipsoid.radii
    );
    const cosLatitude = Math.cos(this.latitude);
    const normal = vectorScratch22.set(
      cosLatitude * Math.cos(this.longitude),
      cosLatitude * Math.sin(this.longitude),
      Math.sin(this.latitude)
    ).normalize();
    result.multiplyVectors(radiiSquared, normal);
    return result.divideScalar(Math.sqrt(normal.dot(result))).add(normal.multiplyScalar(this.height));
  }
  fromArray(array, offset = 0) {
    this.longitude = array[offset];
    this.latitude = array[offset + 1];
    this.height = array[offset + 2];
    return this;
  }
  toArray(array = [], offset = 0) {
    array[offset] = this.longitude;
    array[offset + 1] = this.latitude;
    array[offset + 2] = this.height;
    return array;
  }
  *[Symbol.iterator]() {
    yield this.longitude;
    yield this.latitude;
    yield this.height;
  }
};

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/PointOfView.ts
import { Matrix4 as Matrix42, Quaternion, Ray, Vector3 as Vector36 } from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/Rectangle.ts
var Rectangle = class _Rectangle {
  constructor(west = 0, south = 0, east = 0, north = 0) {
    this.west = west;
    this.south = south;
    this.east = east;
    this.north = north;
  }
  static MAX = /* @__PURE__ */ new _Rectangle(
    Geodetic.MIN_LONGITUDE,
    Geodetic.MIN_LATITUDE,
    Geodetic.MAX_LONGITUDE,
    Geodetic.MAX_LATITUDE
  );
  get width() {
    let east = this.east;
    if (east < this.west) {
      east += Math.PI * 2;
    }
    return east - this.west;
  }
  get height() {
    return this.north - this.south;
  }
  set(west, south, east, north) {
    this.west = west;
    this.south = south;
    this.east = east;
    this.north = north;
    return this;
  }
  clone() {
    return new _Rectangle(this.west, this.south, this.east, this.north);
  }
  copy(other) {
    this.west = other.west;
    this.south = other.south;
    this.east = other.east;
    this.north = other.north;
    return this;
  }
  equals(other) {
    return other.west === this.west && other.south === this.south && other.east === this.east && other.north === this.north;
  }
  at(x, y, result = new Geodetic()) {
    return result.set(
      this.west + (this.east - this.west) * x,
      this.north + (this.south - this.north) * y
    );
  }
  fromArray(array, offset = 0) {
    this.west = array[offset];
    this.south = array[offset + 1];
    this.east = array[offset + 2];
    this.north = array[offset + 3];
    return this;
  }
  toArray(array = [], offset = 0) {
    array[offset] = this.west;
    array[offset + 1] = this.south;
    array[offset + 2] = this.east;
    array[offset + 3] = this.north;
    return array;
  }
  *[Symbol.iterator]() {
    yield this.west;
    yield this.south;
    yield this.east;
    yield this.north;
  }
};

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/resolveIncludes.ts
var includePattern = /^[ \t]*#include +"([\w\d./]+)"/gm;
function resolveIncludes(source, includes) {
  return source.replace(includePattern, (match, path) => {
    const components = path.split("/");
    const include = components.reduce(
      (parent, component) => typeof parent !== "string" && parent != null ? parent[component] : void 0,
      includes
    );
    if (typeof include !== "string") {
      throw new Error(`Could not find include for ${path}.`);
    }
    return resolveIncludes(include, includes);
  });
}

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/STBNLoader.ts
import { NearestFilter, RedFormat as RedFormat2, RepeatWrapping } from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/typedArrayParsers.ts
import { Float16Array as Float16Array2, getFloat16 } from "https://esm.sh/@petamoriken/float16@3.9.2?external";
var hostLittleEndian;
function isHostLittleEndian() {
  if (hostLittleEndian != null) {
    return hostLittleEndian;
  }
  const a = new Uint32Array([268435456]);
  const b = new Uint8Array(a.buffer, a.byteOffset, a.byteLength);
  hostLittleEndian = b[0] === 0;
  return hostLittleEndian;
}
function parseTypedArray(buffer, TypedArray, getValue, littleEndian = true) {
  if (littleEndian === isHostLittleEndian()) {
    return new TypedArray(buffer);
  }
  const data = Object.assign(new DataView(buffer), {
    getFloat16(byteOffset, littleEndian2) {
      return getFloat16(this, byteOffset, littleEndian2);
    }
  });
  const array = new TypedArray(data.byteLength / TypedArray.BYTES_PER_ELEMENT);
  for (let index = 0, byteIndex = 0; index < array.length; ++index, byteIndex += TypedArray.BYTES_PER_ELEMENT) {
    array[index] = data[getValue](byteIndex, littleEndian);
  }
  return array;
}
var parseUint8Array = (buffer) => new Uint8Array(buffer);
var parseFloat16Array = (buffer, littleEndian) => parseTypedArray(buffer, Float16Array2, "getFloat16", littleEndian);

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/STBNLoader.ts
var STBNLoader = createData3DTextureLoaderClass(parseUint8Array, {
  format: RedFormat2,
  minFilter: NearestFilter,
  magFilter: NearestFilter,
  wrapS: RepeatWrapping,
  wrapT: RepeatWrapping,
  wrapR: RepeatWrapping,
  width: STBN_TEXTURE_WIDTH,
  height: STBN_TEXTURE_HEIGHT,
  depth: STBN_TEXTURE_DEPTH
});

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/TilingScheme.ts
import { Vector2 } from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/unrollLoops.ts
var unrollLoopPattern = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*(?:i\s*\+\+|\+\+\s*i)\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function loopReplacer(match, start, end, snippet) {
  let string = "";
  for (let i = parseInt(start); i < parseInt(end); ++i) {
    string += snippet.replace(/\[\s*i\s*\]/g, "[" + i + "]").replace(/UNROLLED_LOOP_INDEX/g, `${i}`);
  }
  return string;
}
function unrollLoops(string) {
  return string.replace(unrollLoopPattern, loopReplacer);
}

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/shaders/cascadedShadowMaps.glsl
var cascadedShadowMaps_default = `// Reference: https://github.com/mrdoob/three.js/blob/r171/examples/jsm/csm/CSMShader.js

#ifndef SHADOW_CASCADE_COUNT
#error "SHADOW_CASCADE_COUNT macro must be defined."
#endif // SHADOW_CASCADE_COUNT

int getCascadeIndex(
  const mat4 viewMatrix,
  const vec3 worldPosition,
  const vec2 intervals[SHADOW_CASCADE_COUNT],
  const float near,
  const float far
) {
  vec4 viewPosition = viewMatrix * vec4(worldPosition, 1.0);
  float depth = viewZToOrthographicDepth(viewPosition.z, near, far);
  vec2 interval;
  #pragma unroll_loop_start
  for (int i = 0; i < 4; ++i) {
    #if UNROLLED_LOOP_INDEX < SHADOW_CASCADE_COUNT
    interval = intervals[i];
    if (depth >= interval.x && depth < interval.y) {
      return UNROLLED_LOOP_INDEX;
    }
    #endif // UNROLLED_LOOP_INDEX < SHADOW_CASCADE_COUNT
  }
  #pragma unroll_loop_end
  return SHADOW_CASCADE_COUNT - 1;
}

int getFadedCascadeIndex(
  const mat4 viewMatrix,
  const vec3 worldPosition,
  const vec2 intervals[SHADOW_CASCADE_COUNT],
  const float near,
  const float far,
  const float jitter
) {
  vec4 viewPosition = viewMatrix * vec4(worldPosition, 1.0);
  float depth = viewZToOrthographicDepth(viewPosition.z, near, far);

  vec2 interval;
  float intervalCenter;
  float closestEdge;
  float margin;
  int nextIndex = -1;
  int prevIndex = -1;
  float alpha;

  #pragma unroll_loop_start
  for (int i = 0; i < 4; ++i) {
    #if UNROLLED_LOOP_INDEX < SHADOW_CASCADE_COUNT
    interval = intervals[i];
    intervalCenter = (interval.x + interval.y) * 0.5;
    closestEdge = depth < intervalCenter ? interval.x : interval.y;
    margin = closestEdge * closestEdge * 0.5;
    interval += margin * vec2(-0.5, 0.5);

    #if UNROLLED_LOOP_INDEX < SHADOW_CASCADE_COUNT - 1
    if (depth >= interval.x && depth < interval.y) {
      prevIndex = nextIndex;
      nextIndex = UNROLLED_LOOP_INDEX;
      alpha = saturate(min(depth - interval.x, interval.y - depth) / margin);
    }
    #else // UNROLLED_LOOP_INDEX < SHADOW_CASCADE_COUNT - 1
    // Don't fade out the last cascade.
    if (depth >= interval.x) {
      prevIndex = nextIndex;
      nextIndex = UNROLLED_LOOP_INDEX;
      alpha = saturate((depth - interval.x) / margin);
    }
    #endif // UNROLLED_LOOP_INDEX < SHADOW_CASCADE_COUNT - 1
    #endif // UNROLLED_LOOP_INDEX < SHADOW_CASCADE_COUNT
  }
  #pragma unroll_loop_end

  return jitter <= alpha
    ? nextIndex
    : prevIndex;
}
`;

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/shaders/depth.glsl
var depth_default = "// cSpell:words logdepthbuf\n\nfloat reverseLogDepth(const float depth, const float near, const float far) {\n  #ifdef USE_LOGDEPTHBUF\n  float d = pow(2.0, depth * log2(far + 1.0)) - 1.0;\n  float a = far / (far - near);\n  float b = far * near / (near - far);\n  return a + b / d;\n  #else // USE_LOGDEPTHBUF\n  return depth;\n  #endif // USE_LOGDEPTHBUF\n}\n\nfloat linearizeDepth(const float depth, const float near, const float far) {\n  float ndc = depth * 2.0 - 1.0;\n  return 2.0 * near * far / (far + near - ndc * (far - near));\n}\n";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/shaders/interleavedGradientNoise.glsl
var interleavedGradientNoise_default = "// Reference: https://advances.realtimerendering.com/s2014/index.html#_NEXT_GENERATION_POST\n\nfloat interleavedGradientNoise(const vec2 coord) {\n  const vec3 magic = vec3(0.06711056, 0.00583715, 52.9829189);\n  return fract(magic.z * fract(dot(coord, magic.xy)));\n}\n";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/shaders/math.glsl
var math_default = "#if !defined(saturate)\n#define saturate(a) clamp(a, 0.0, 1.0)\n#endif // !defined(saturate)\n\nfloat remap(const float x, const float min1, const float max1, const float min2, const float max2) {\n  return min2 + (x - min1) / (max1 - min1) * (max2 - min2);\n}\n\nvec2 remap(const vec2 x, const vec2 min1, const vec2 max1, const vec2 min2, const vec2 max2) {\n  return min2 + (x - min1) / (max1 - min1) * (max2 - min2);\n}\n\nvec3 remap(const vec3 x, const vec3 min1, const vec3 max1, const vec3 min2, const vec3 max2) {\n  return min2 + (x - min1) / (max1 - min1) * (max2 - min2);\n}\n\nvec4 remap(const vec4 x, const vec4 min1, const vec4 max1, const vec4 min2, const vec4 max2) {\n  return min2 + (x - min1) / (max1 - min1) * (max2 - min2);\n}\n\nfloat remapClamped(\n  const float x,\n  const float min1,\n  const float max1,\n  const float min2,\n  const float max2\n) {\n  return clamp(min2 + (x - min1) / (max1 - min1) * (max2 - min2), min2, max2);\n}\n\nvec2 remapClamped(\n  const vec2 x,\n  const vec2 min1,\n  const vec2 max1,\n  const vec2 min2,\n  const vec2 max2\n) {\n  return clamp(min2 + (x - min1) / (max1 - min1) * (max2 - min2), min2, max2);\n}\n\nvec3 remapClamped(\n  const vec3 x,\n  const vec3 min1,\n  const vec3 max1,\n  const vec3 min2,\n  const vec3 max2\n) {\n  return clamp(min2 + (x - min1) / (max1 - min1) * (max2 - min2), min2, max2);\n}\n\nvec4 remapClamped(\n  const vec4 x,\n  const vec4 min1,\n  const vec4 max1,\n  const vec4 min2,\n  const vec4 max2\n) {\n  return clamp(min2 + (x - min1) / (max1 - min1) * (max2 - min2), min2, max2);\n}\n\n// Implicitly remap to 0 and 1\nfloat remap(const float x, const float min1, const float max1) {\n  return (x - min1) / (max1 - min1);\n}\n\nvec2 remap(const vec2 x, const vec2 min1, const vec2 max1) {\n  return (x - min1) / (max1 - min1);\n}\n\nvec3 remap(const vec3 x, const vec3 min1, const vec3 max1) {\n  return (x - min1) / (max1 - min1);\n}\n\nvec4 remap(const vec4 x, const vec4 min1, const vec4 max1) {\n  return (x - min1) / (max1 - min1);\n}\n\nfloat remapClamped(const float x, const float min1, const float max1) {\n  return saturate((x - min1) / (max1 - min1));\n}\n\nvec2 remapClamped(const vec2 x, const vec2 min1, const vec2 max1) {\n  return saturate((x - min1) / (max1 - min1));\n}\n\nvec3 remapClamped(const vec3 x, const vec3 min1, const vec3 max1) {\n  return saturate((x - min1) / (max1 - min1));\n}\n\nvec4 remapClamped(const vec4 x, const vec4 min1, const vec4 max1) {\n  return saturate((x - min1) / (max1 - min1));\n}\n";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/shaders/packing.glsl
var packing_default = "// Reference: https://jcgt.org/published/0003/02/01/paper.pdf\n\nvec2 signNotZero(vec2 v) {\n  return vec2(v.x >= 0.0 ? 1.0 : -1.0, v.y >= 0.0 ? 1.0 : -1.0);\n}\n\nvec2 packNormalToVec2(vec3 v) {\n  vec2 p = v.xy * (1.0 / (abs(v.x) + abs(v.y) + abs(v.z)));\n  return v.z <= 0.0\n    ? (1.0 - abs(p.yx)) * signNotZero(p)\n    : p;\n}\n\nvec3 unpackVec2ToNormal(vec2 e) {\n  vec3 v = vec3(e.xy, 1.0 - abs(e.x) - abs(e.y));\n  if (v.z < 0.0) {\n    v.xy = (1.0 - abs(v.yx)) * signNotZero(v.xy);\n  }\n  return normalize(v);\n}\n";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/shaders/raySphereIntersection.glsl
var raySphereIntersection_default = "float raySphereFirstIntersection(\n  const vec3 origin,\n  const vec3 direction,\n  const vec3 center,\n  const float radius\n) {\n  vec3 a = origin - center;\n  float b = 2.0 * dot(direction, a);\n  float c = dot(a, a) - radius * radius;\n  float discriminant = b * b - 4.0 * c;\n  return discriminant < 0.0\n    ? -1.0\n    : (-b - sqrt(discriminant)) * 0.5;\n}\n\nfloat raySphereFirstIntersection(const vec3 origin, const vec3 direction, const float radius) {\n  return raySphereFirstIntersection(origin, direction, vec3(0.0), radius);\n}\n\nvec4 raySphereFirstIntersection(\n  const vec3 origin,\n  const vec3 direction,\n  const vec3 center,\n  const vec4 radius\n) {\n  vec3 a = origin - center;\n  float b = 2.0 * dot(direction, a);\n  vec4 c = dot(a, a) - radius * radius;\n  vec4 discriminant = b * b - 4.0 * c;\n  vec4 mask = step(discriminant, vec4(0.0));\n  return mix((-b - sqrt(max(vec4(0.0), discriminant))) * 0.5, vec4(-1.0), mask);\n}\n\nvec4 raySphereFirstIntersection(const vec3 origin, const vec3 direction, const vec4 radius) {\n  return raySphereFirstIntersection(origin, direction, vec3(0.0), radius);\n}\n\nfloat raySphereSecondIntersection(\n  const vec3 origin,\n  const vec3 direction,\n  const vec3 center,\n  const float radius\n) {\n  vec3 a = origin - center;\n  float b = 2.0 * dot(direction, a);\n  float c = dot(a, a) - radius * radius;\n  float discriminant = b * b - 4.0 * c;\n  return discriminant < 0.0\n    ? -1.0\n    : (-b + sqrt(discriminant)) * 0.5;\n}\n\nfloat raySphereSecondIntersection(const vec3 origin, const vec3 direction, const float radius) {\n  return raySphereSecondIntersection(origin, direction, vec3(0.0), radius);\n}\n\nvec4 raySphereSecondIntersection(\n  const vec3 origin,\n  const vec3 direction,\n  const vec3 center,\n  const vec4 radius\n) {\n  vec3 a = origin - center;\n  float b = 2.0 * dot(direction, a);\n  vec4 c = dot(a, a) - radius * radius;\n  vec4 discriminant = b * b - 4.0 * c;\n  vec4 mask = step(discriminant, vec4(0.0));\n  return mix((-b + sqrt(max(vec4(0.0), discriminant))) * 0.5, vec4(-1.0), mask);\n}\n\nvec4 raySphereSecondIntersection(const vec3 origin, const vec3 direction, const vec4 radius) {\n  return raySphereSecondIntersection(origin, direction, vec3(0.0), radius);\n}\n\nvoid raySphereIntersections(\n  const vec3 origin,\n  const vec3 direction,\n  const vec3 center,\n  const float radius,\n  out float intersection1,\n  out float intersection2\n) {\n  vec3 a = origin - center;\n  float b = 2.0 * dot(direction, a);\n  float c = dot(a, a) - radius * radius;\n  float discriminant = b * b - 4.0 * c;\n  if (discriminant < 0.0) {\n    intersection1 = -1.0;\n    intersection2 = -1.0;\n    return;\n  } else {\n    float Q = sqrt(discriminant);\n    intersection1 = (-b - Q) * 0.5;\n    intersection2 = (-b + Q) * 0.5;\n  }\n}\n\nvoid raySphereIntersections(\n  const vec3 origin,\n  const vec3 direction,\n  const float radius,\n  out float intersection1,\n  out float intersection2\n) {\n  raySphereIntersections(origin, direction, vec3(0.0), radius, intersection1, intersection2);\n}\n\nvoid raySphereIntersections(\n  const vec3 origin,\n  const vec3 direction,\n  const vec3 center,\n  const vec4 radius,\n  out vec4 intersection1,\n  out vec4 intersection2\n) {\n  vec3 a = origin - center;\n  float b = 2.0 * dot(direction, a);\n  vec4 c = dot(a, a) - radius * radius;\n  vec4 discriminant = b * b - 4.0 * c;\n  vec4 mask = step(discriminant, vec4(0.0));\n  vec4 Q = sqrt(max(vec4(0.0), discriminant));\n  intersection1 = mix((-b - Q) * 0.5, vec4(-1.0), mask);\n  intersection2 = mix((-b + Q) * 0.5, vec4(-1.0), mask);\n}\n\nvoid raySphereIntersections(\n  const vec3 origin,\n  const vec3 direction,\n  const vec4 radius,\n  out vec4 intersection1,\n  out vec4 intersection2\n) {\n  raySphereIntersections(origin, direction, vec3(0.0), radius, intersection1, intersection2);\n}\n";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/shaders/transform.glsl
var transform_default = "vec3 screenToView(\n  const vec2 uv,\n  const float depth,\n  const float viewZ,\n  const mat4 projectionMatrix,\n  const mat4 inverseProjectionMatrix\n) {\n  vec4 clip = vec4(vec3(uv, depth) * 2.0 - 1.0, 1.0);\n  float clipW = projectionMatrix[2][3] * viewZ + projectionMatrix[3][3];\n  clip *= clipW;\n  return (inverseProjectionMatrix * clip).xyz;\n}\n";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/shaders/vogelDisk.glsl
var vogelDisk_default = "// Reference: https://www.gamedev.net/tutorials/programming/graphics/contact-hardening-soft-shadows-made-fast-r4906/\n\nvec2 vogelDisk(const int index, const int sampleCount, const float phi) {\n  const float goldenAngle = 2.39996322972865332;\n  float r = sqrt(float(index) + 0.5) / sqrt(float(sampleCount));\n  float theta = float(index) * goldenAngle + phi;\n  return r * vec2(cos(theta), sin(theta));\n}\n";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/shaders/index.ts
var cascadedShadowMaps = cascadedShadowMaps_default;
var depth = depth_default;
var interleavedGradientNoise = interleavedGradientNoise_default;
var math = math_default;
var packing = packing_default;
var raySphereIntersection = raySphereIntersection_default;
var transform = transform_default;
var vogelDisk = vogelDisk_default;

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/AtmosphereParameters.ts
import { Vector3 as Vector37 } from "https://esm.sh/three@0.185.1?external";
var paramKeys = [
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
    if (target[key] instanceof Vector37) {
      target[key].copy(value);
    } else {
      ;
      target[key] = value;
    }
  }
}
var AtmosphereParameters = class _AtmosphereParameters {
  static DEFAULT = /* @__PURE__ */ new _AtmosphereParameters();
  solarIrradiance = new Vector37(1.474, 1.8504, 1.91198);
  sunAngularRadius = 4675e-6;
  bottomRadius = 636e4;
  topRadius = 642e4;
  rayleighScattering = new Vector37(5802e-6, 0.013558, 0.0331);
  mieScattering = new Vector37(3996e-6, 3996e-6, 3996e-6);
  miePhaseFunctionG = 0.8;
  muSMin = Math.cos(radians(120));
  // Radiance to luminance conversion
  // prettier-ignore
  skyRadianceToLuminance = new Vector37(114974.916437, 71305.954816, 65310.548555);
  sunRadianceToLuminance = new Vector37(98242.786222, 69954.398112, 66475.012354);
  luminousEfficiency = new Vector37(0.2126, 0.7152, 0.0722);
  skyRadianceToRelativeLuminance = new Vector37();
  sunRadianceToRelativeLuminance = new Vector37();
  constructor(options) {
    applyOptions(this, options);
    const luminance = this.luminousEfficiency.dot(this.skyRadianceToLuminance);
    this.skyRadianceToRelativeLuminance.copy(this.skyRadianceToLuminance).divideScalar(luminance);
    this.sunRadianceToRelativeLuminance.copy(this.sunRadianceToLuminance).divideScalar(luminance);
  }
};

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/constants.ts
var IRRADIANCE_TEXTURE_WIDTH = 64;
var IRRADIANCE_TEXTURE_HEIGHT = 16;
var SCATTERING_TEXTURE_R_SIZE = 32;
var SCATTERING_TEXTURE_MU_SIZE = 128;
var SCATTERING_TEXTURE_MU_S_SIZE = 32;
var SCATTERING_TEXTURE_NU_SIZE = 8;
var SCATTERING_TEXTURE_WIDTH = SCATTERING_TEXTURE_NU_SIZE * SCATTERING_TEXTURE_MU_S_SIZE;
var SCATTERING_TEXTURE_HEIGHT = SCATTERING_TEXTURE_MU_SIZE;
var SCATTERING_TEXTURE_DEPTH = SCATTERING_TEXTURE_R_SIZE;
var TRANSMITTANCE_TEXTURE_WIDTH = 256;
var TRANSMITTANCE_TEXTURE_HEIGHT = 64;
var METER_TO_LENGTH_UNIT = 1 / 1e3;
var SKY_RENDER_ORDER = 100;
var ref2 = "82e00c5222d6cbc222af69abdf6d3f4fc9f63030";
var DEFAULT_PRECOMPUTED_TEXTURES_URL = `https://media.githubusercontent.com/media/takram-design-engineering/three-geospatial/${ref2}/packages/atmosphere/assets`;
var DEFAULT_STARS_DATA_URL = `https://media.githubusercontent.com/media/takram-design-engineering/three-geospatial/${ref2}/packages/atmosphere/assets/stars.bin`;

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/getAltitudeCorrectionOffset.ts
import { Vector3 as Vector38 } from "https://esm.sh/three@0.185.1?external";
var vectorScratch4 = /* @__PURE__ */ new Vector38();
function getAltitudeCorrectionOffset(cameraPosition, bottomRadius, ellipsoid, result, clipToSurface = true) {
  const surfacePosition = ellipsoid.projectOnSurface(
    cameraPosition,
    vectorScratch4
  );
  return surfacePosition != null ? ellipsoid.getOsculatingSphereCenter(
    // Move the center of the atmosphere's inner sphere down to intersect
    // the viewpoint when it's located underground.
    !clipToSurface || surfacePosition.lengthSq() < cameraPosition.lengthSq() ? surfacePosition : cameraPosition,
    bottomRadius,
    result
  ) : result.setScalar(0);
}

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/shaders/aerialPerspectiveEffect.frag
var aerialPerspectiveEffect_default = `precision highp sampler2DArray;

#include "core/depth"
#include "core/math"
#include "core/packing"
#include "core/transform"
#ifdef HAS_SHADOW
#include "core/raySphereIntersection"
#include "core/cascadedShadowMaps"
#include "core/interleavedGradientNoise"
#include "core/vogelDisk"
#endif // HAS_SHADOW
#include "parameters"
#include "functions"
#include "sky"

uniform sampler2D normalBuffer;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 inverseProjectionMatrix;
uniform mat4 inverseViewMatrix;
uniform float bottomRadius;
uniform vec3 ellipsoidCenter;
uniform mat4 inverseEllipsoidMatrix;
uniform vec3 sunDirection;
uniform vec3 moonDirection;
uniform float moonAngularRadius;
uniform float lunarRadianceScale;
uniform float irradianceScale;
uniform float idealSphereAlpha;

#ifdef HAS_IRRADIANCE_MASK
uniform sampler2D irradianceMaskBuffer;
#endif // HAS_IRRADIANCE_MASK

// prettier-ignore
#define IRRADIANCE_MASK_CHANNEL_ IRRADIANCE_MASK_CHANNEL

#ifdef HAS_OVERLAY
uniform sampler2D overlayBuffer;
#endif // HAS_OVERLAY

#ifdef HAS_SHADOW
uniform sampler2DArray shadowBuffer;
uniform vec2 shadowIntervals[SHADOW_CASCADE_COUNT];
uniform mat4 shadowMatrices[SHADOW_CASCADE_COUNT];
uniform mat4 inverseShadowMatrices[SHADOW_CASCADE_COUNT];
uniform float shadowFar;
uniform float shadowTopHeight;
uniform float shadowRadius;
uniform sampler3D stbnTexture;
uniform int frame;
#endif // HAS_SHADOW

#ifdef HAS_SHADOW_LENGTH
uniform sampler2D shadowLengthBuffer;
#endif // HAS_SHADOW_LENGTH

varying vec3 vCameraPosition;
varying vec3 vRayDirection;
varying vec3 vEllipsoidCenter;
varying vec3 vGeometryEllipsoidCenter;
varying vec3 vEllipsoidRadiiSquared;

vec3 readNormal(const vec2 uv) {
  #ifdef OCT_ENCODED_NORMAL
  return unpackVec2ToNormal(texture(normalBuffer, uv).xy);
  #else // OCT_ENCODED_NORMAL
  return 2.0 * texture(normalBuffer, uv).xyz - 1.0;
  #endif // OCT_ENCODED_NORMAL
}

void correctGeometricError(inout vec3 positionECEF, inout vec3 normalECEF) {
  // TODO: The error is pronounced at the edge of the ellipsoid due to the
  // large difference between the sphere position and the unprojected position
  // at the current fragment. Calculating the sphere position from the fragment
  // UV may resolve this.

  // Correct way is slerp, but this will be small-angle interpolation anyways.
  vec3 sphereNormal = normalize(positionECEF / vEllipsoidRadiiSquared);
  vec3 spherePosition = u_bottom_radius * sphereNormal;
  normalECEF = mix(normalECEF, sphereNormal, idealSphereAlpha);
  positionECEF = mix(positionECEF, spherePosition, idealSphereAlpha);
}

#if defined(SUN_IRRADIANCE) || defined(SKY_IRRADIANCE)

vec3 getSunSkyIrradiance(
  const vec3 positionECEF,
  const vec3 normal,
  const vec3 inputColor,
  const float sunTransmittance
) {
  // Assume lambertian BRDF. If both SUN_IRRADIANCE and SKY_IRRADIANCE are not
  // defined, regard the inputColor as radiance at the texel.
  vec3 albedo = inputColor * irradianceScale * RECIPROCAL_PI;
  vec3 skyIrradiance;
  vec3 sunIrradiance = GetSunAndSkyIrradiance(positionECEF, normal, sunDirection, skyIrradiance);

  #ifdef HAS_SHADOW
  sunIrradiance *= sunTransmittance;
  #endif // HAS_SHADOW

  #if defined(SUN_IRRADIANCE) && defined(SKY_IRRADIANCE)
  return albedo * (sunIrradiance + skyIrradiance);
  #elif defined(SUN_IRRADIANCE)
  return albedo * sunIrradiance;
  #elif defined(SKY_IRRADIANCE)
  return albedo * skyIrradiance;
  #endif // defined(SUN_IRRADIANCE) && defined(SKY_IRRADIANCE)
}

#endif // defined(SUN_IRRADIANCE) || defined(SKY_IRRADIANCE)

#if defined(TRANSMITTANCE) || defined(INSCATTER)

void applyTransmittanceInscatter(const vec3 positionECEF, float shadowLength, inout vec3 radiance) {
  vec3 transmittance;
  vec3 inscatter = GetSkyRadianceToPoint(
    vCameraPosition - vGeometryEllipsoidCenter,
    positionECEF,
    shadowLength,
    sunDirection,
    transmittance
  );
  #ifdef TRANSMITTANCE
  radiance = radiance * transmittance;
  #endif // TRANSMITTANCE
  #ifdef INSCATTER
  radiance = radiance + inscatter;
  #endif // INSCATTER
}

#endif // defined(TRANSMITTANCE) || defined(INSCATTER)

#ifdef HAS_SHADOW

float getSTBN() {
  ivec3 size = textureSize(stbnTexture, 0);
  vec3 scale = 1.0 / vec3(size);
  return texture(stbnTexture, vec3(gl_FragCoord.xy, float(frame % size.z)) * scale).r;
}

vec2 getShadowUv(const vec3 worldPosition, const int cascadeIndex) {
  vec4 clip = shadowMatrices[cascadeIndex] * vec4(worldPosition, 1.0);
  clip /= clip.w;
  return clip.xy * 0.5 + 0.5;
}

float getDistanceToShadowTop(const vec3 positionECEF) {
  // Distance to the top of the shadows along the sun direction, which matches
  // the ray origin of BSM.
  return raySphereSecondIntersection(
    positionECEF / METER_TO_LENGTH_UNIT, // TODO: Make units consistent
    sunDirection,
    vec3(0.0),
    bottomRadius + shadowTopHeight
  );
}

float readShadowOpticalDepth(const vec2 uv, const float distanceToTop, const int cascadeIndex) {
  // r: frontDepth, g: meanExtinction, b: maxOpticalDepth, a: maxOpticalDepthTail
  vec4 shadow = texture(shadowBuffer, vec3(uv, float(cascadeIndex)));
  // Omit adding maxOpticalDepthTail to avoid pronounced aliasing. Ground
  // shadow will be attenuated by inscatter anyways.
  return min(shadow.b, shadow.g * max(0.0, distanceToTop - shadow.r));
}

float sampleShadowOpticalDepthPCF(
  const vec3 worldPosition,
  const float distanceToTop,
  const float radius,
  const int cascadeIndex
) {
  vec2 uv = getShadowUv(worldPosition, cascadeIndex);
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
    return 0.0;
  }

  vec2 texelSize = vec2(1.0) / vec2(textureSize(shadowBuffer, 0).xy);
  float sum = 0.0;
  vec2 offset;
  #pragma unroll_loop_start
  for (int i = 0; i < 16; ++i) {
    #if UNROLLED_LOOP_INDEX < SHADOW_SAMPLE_COUNT
    offset = vogelDisk(
      UNROLLED_LOOP_INDEX,
      SHADOW_SAMPLE_COUNT,
      interleavedGradientNoise(gl_FragCoord.xy) * PI2
    );
    sum += readShadowOpticalDepth(uv + offset * radius * texelSize, distanceToTop, cascadeIndex);
    #endif // UNROLLED_LOOP_INDEX < SHADOW_SAMPLE_COUNT
  }
  #pragma unroll_loop_end
  return sum / float(SHADOW_SAMPLE_COUNT);
}

float sampleShadowOpticalDepth(
  const vec3 worldPosition,
  const vec3 positionECEF,
  const float radius,
  const float jitter
) {
  float distanceToTop = getDistanceToShadowTop(positionECEF);
  if (distanceToTop <= 0.0) {
    return 0.0;
  }
  int cascadeIndex = getFadedCascadeIndex(
    viewMatrix,
    worldPosition,
    shadowIntervals,
    cameraNear,
    shadowFar,
    jitter
  );
  return cascadeIndex >= 0
    ? sampleShadowOpticalDepthPCF(worldPosition, distanceToTop, radius, cascadeIndex)
    : 0.0;
}

float getShadowRadius(const vec3 worldPosition) {
  vec4 clip = shadowMatrices[0] * vec4(worldPosition, 1.0);
  clip /= clip.w;

  // Offset by 1px in each direction in shadow's clip coordinates.
  vec2 shadowSize = vec2(textureSize(shadowBuffer, 0));
  vec3 offset = vec3(2.0 / shadowSize, 0.0);
  vec4 clipX = clip + offset.xzzz;
  vec4 clipY = clip + offset.zyzz;

  // Convert back to world space.
  vec4 worldX = inverseShadowMatrices[0] * clipX;
  vec4 worldY = inverseShadowMatrices[0] * clipY;

  // Project into the main camera's clip space.
  mat4 viewProjectionMatrix = projectionMatrix * viewMatrix;
  vec4 projected = viewProjectionMatrix * vec4(worldPosition, 1.0);
  vec4 projectedX = viewProjectionMatrix * worldX;
  vec4 projectedY = viewProjectionMatrix * worldY;
  projected /= projected.w;
  projectedX /= projectedX.w;
  projectedY /= projectedY.w;

  // Take the mean of pixel sizes.
  vec2 center = (projected.xy * 0.5 + 0.5) * resolution;
  vec2 offsetX = (projectedX.xy * 0.5 + 0.5) * resolution;
  vec2 offsetY = (projectedY.xy * 0.5 + 0.5) * resolution;
  float size = max(length(offsetX - center), length(offsetY - center));

  return remapClamped(size, 10.0, 50.0, 0.0, shadowRadius);
}

#endif // HAS_SHADOW

void mainImage(const vec4 inputColor, const vec2 uv, out vec4 outputColor) {
  #if defined(HAS_IRRADIANCE_MASK) && defined(DEBUG_SHOW_IRRADIANCE_MASK)
  outputColor.rgb = vec3(texture(irradianceMaskBuffer, uv).IRRADIANCE_MASK_CHANNEL_);
  outputColor.a = 1.0;
  return;
  #endif // defined(HAS_IRRADIANCE_MASK) && defined(DEBUG_SHOW_IRRADIANCE_MASK)

  float shadowLength = 0.0;
  #ifdef HAS_SHADOW_LENGTH
  shadowLength = texture(shadowLengthBuffer, uv).r;
  #endif // HAS_SHADOW_LENGTH

  #ifdef HAS_OVERLAY
  vec4 overlay = texture(overlayBuffer, uv);
  if (overlay.a == 1.0) {
    outputColor = overlay;
    return;
  }
  #endif // HAS_OVERLAY

  float depth = readDepth(uv);
  if (depth >= 1.0 - 1e-7) {
    #ifdef SKY
    vec3 rayDirection = normalize(vRayDirection);
    outputColor.rgb = getSkyRadiance(
      vCameraPosition - vEllipsoidCenter,
      rayDirection,
      shadowLength,
      sunDirection,
      moonDirection,
      moonAngularRadius,
      lunarRadianceScale
    );
    outputColor.a = 1.0;
    #else // SKY
    outputColor = inputColor;
    #endif // SKY

    #ifdef HAS_OVERLAY
    outputColor.rgb = outputColor.rgb * (1.0 - overlay.a) + overlay.rgb;
    #endif // HAS_OVERLAY
    return;
  }
  depth = reverseLogDepth(depth, cameraNear, cameraFar);

  // Reconstruct position and normal in world space.
  vec3 viewPosition = screenToView(
    uv,
    depth,
    getViewZ(depth),
    projectionMatrix,
    inverseProjectionMatrix
  );
  vec3 viewNormal;
  #ifdef RECONSTRUCT_NORMAL
  vec3 dx = dFdx(viewPosition);
  vec3 dy = dFdy(viewPosition);
  viewNormal = normalize(cross(dx, dy));
  #else // RECONSTRUCT_NORMAL
  viewNormal = readNormal(uv);
  #endif // RECONSTRUCT_NORMAL

  vec3 worldPosition = (inverseViewMatrix * vec4(viewPosition, 1.0)).xyz;
  vec3 worldNormal = normalize(mat3(inverseViewMatrix) * viewNormal);
  mat3 rotation = mat3(inverseEllipsoidMatrix);
  vec3 positionECEF = rotation * worldPosition * METER_TO_LENGTH_UNIT - vGeometryEllipsoidCenter;
  vec3 normalECEF = rotation * worldNormal;

  #ifdef CORRECT_GEOMETRIC_ERROR
  correctGeometricError(positionECEF, normalECEF);
  #endif // CORRECT_GEOMETRIC_ERROR

  #ifdef HAS_SHADOW
  float stbn = getSTBN();
  float radius = getShadowRadius(worldPosition);
  float opticalDepth = sampleShadowOpticalDepth(worldPosition, positionECEF, radius, stbn);
  float sunTransmittance = exp(-opticalDepth);
  #else // HAS_SHADOW
  float sunTransmittance = 1.0;
  #endif // HAS_SHADOW

  vec3 radiance;
  #if defined(SUN_IRRADIANCE) || defined(SKY_IRRADIANCE)
  radiance = getSunSkyIrradiance(positionECEF, normalECEF, inputColor.rgb, sunTransmittance);
  #ifdef HAS_IRRADIANCE_MASK
  float irradianceMask = texture(irradianceMaskBuffer, uv).IRRADIANCE_MASK_CHANNEL_;
  radiance = mix(inputColor.rgb, radiance, irradianceMask);
  #endif // HAS_IRRADIANCE_MASK
  #else // defined(SUN_IRRADIANCE) || defined(SKY_IRRADIANCE)
  radiance = inputColor.rgb;
  #endif // defined(SUN_IRRADIANCE) || defined(SKY_IRRADIANCE)

  #if defined(TRANSMITTANCE) || defined(INSCATTER)
  applyTransmittanceInscatter(positionECEF, shadowLength, radiance);
  #endif // defined(TRANSMITTANCE) || defined(INSCATTER)

  outputColor = vec4(radiance, inputColor.a);

  #ifdef HAS_OVERLAY
  outputColor.rgb = outputColor.rgb * (1.0 - overlay.a) + overlay.rgb;
  #endif // HAS_OVERLAY
}
`;

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/shaders/aerialPerspectiveEffect.vert
var aerialPerspectiveEffect_default2 = "uniform mat4 inverseViewMatrix;\nuniform mat4 inverseProjectionMatrix;\nuniform vec3 cameraPosition;\nuniform vec3 ellipsoidCenter;\nuniform mat4 inverseEllipsoidMatrix;\nuniform vec3 altitudeCorrection;\nuniform vec3 ellipsoidRadii;\nuniform float idealSphereAlpha;\n\nvarying vec3 vCameraPosition;\nvarying vec3 vRayDirection;\nvarying vec3 vEllipsoidCenter;\nvarying vec3 vGeometryEllipsoidCenter;\nvarying vec3 vEllipsoidRadiiSquared;\n\nvoid getCameraRay(out vec3 origin, out vec3 direction) {\n  bool isPerspective = inverseProjectionMatrix[2][3] != 0.0; // 4th entry in the 3rd column\n\n  if (isPerspective) {\n    // Calculate the camera ray for a perspective camera.\n    vec4 viewPosition = inverseProjectionMatrix * vec4(position, 1.0);\n    vec4 worldDirection = inverseViewMatrix * vec4(viewPosition.xyz, 0.0);\n    origin = cameraPosition;\n    direction = worldDirection.xyz;\n  } else {\n    // Unprojected points to calculate direction.\n    vec4 nearPoint = inverseProjectionMatrix * vec4(position.xy, -1.0, 1.0);\n    vec4 farPoint = inverseProjectionMatrix * vec4(position.xy, -0.9, 1.0);\n    nearPoint /= nearPoint.w;\n    farPoint /= farPoint.w;\n\n    // Calculate world values.\n    vec4 worldDirection = inverseViewMatrix * vec4(farPoint.xyz - nearPoint.xyz, 0.0);\n    vec4 worldOrigin = inverseViewMatrix * nearPoint;\n\n    // Outputs\n    direction = worldDirection.xyz;\n    origin = worldOrigin.xyz;\n  }\n}\n\nvoid mainSupport() {\n  vec3 direction, origin;\n  getCameraRay(origin, direction);\n\n  mat3 rotation = mat3(inverseEllipsoidMatrix);\n  vCameraPosition = rotation * origin.xyz * METER_TO_LENGTH_UNIT;\n  vRayDirection = rotation * direction.xyz;\n\n  vEllipsoidCenter = (ellipsoidCenter + altitudeCorrection) * METER_TO_LENGTH_UNIT;\n  #ifdef CORRECT_GEOMETRIC_ERROR\n  // Gradually turn off altitude correction for aerial perspective as geometric\n  // error correction takes effect.\n  // See: https://github.com/takram-design-engineering/three-geospatial/pull/23#issuecomment-2542914656\n  vGeometryEllipsoidCenter =\n    (ellipsoidCenter + mix(altitudeCorrection, vec3(0.0), idealSphereAlpha)) * METER_TO_LENGTH_UNIT;\n  #else\n  vGeometryEllipsoidCenter = vEllipsoidCenter;\n  #endif // CORRECT_GEOMETRIC_ERROR\n\n  vec3 radii = ellipsoidRadii * METER_TO_LENGTH_UNIT;\n  vEllipsoidRadiiSquared = radii * radii;\n}\n";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/shaders/functions.glsl
var functions_default = `// Based on the following work and adapted to Three.js.
// This file includes runtime functions only. Please refer to Bruneton's source
// code for the whole picture. It has detailed comments.
// https://github.com/ebruneton/precomputed_atmospheric_scattering/blob/master/atmosphere/functions.glsl

/**
 * Copyright (c) 2017 Eric Bruneton
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 3. Neither the name of the copyright holders nor the names of its
 *    contributors may be used to endorse or promote products derived from
 *    this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
 * THE POSSIBILITY OF SUCH DAMAGE.
 *
 * Precomputed Atmospheric Scattering
 * Copyright (c) 2008 INRIA
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 3. Neither the name of the copyright holders nor the names of its
 *    contributors may be used to endorse or promote products derived from
 *    this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
 * THE POSSIBILITY OF SUCH DAMAGE.
 */

float ClampCosine(const float mu) {
  return clamp(mu, -1.0, 1.0);
}

float ClampDistance(const float d) {
  return max(d, 0.0);
}

float ClampRadius(const float r) {
  return clamp(r, u_bottom_radius, u_top_radius);
}

float SafeSqrt(const float a) {
  return sqrt(max(a, 0.0));
}

float DistanceToTopAtmosphereBoundary(const float r, const float mu) {
  float discriminant = r * r * (mu * mu - 1.0) + u_top_radius * u_top_radius;
  return ClampDistance(-r * mu + SafeSqrt(discriminant));
}

float DistanceToBottomAtmosphereBoundary(const float r, const float mu) {
  float discriminant = r * r * (mu * mu - 1.0) + u_bottom_radius * u_bottom_radius;
  return ClampDistance(-r * mu - SafeSqrt(discriminant));
}

bool RayIntersectsGround(const float r, const float mu) {
  return mu < 0.0 && r * r * (mu * mu - 1.0) + u_bottom_radius * u_bottom_radius >= 0.0;
}

float GetTextureCoordFromUnitRange(const float x, const int texture_size) {
  return 0.5 / float(texture_size) + x * (1.0 - 1.0 / float(texture_size));
}

vec2 GetTransmittanceTextureUvFromRMu(const float r, const float mu) {
  float H = sqrt(u_top_radius * u_top_radius - u_bottom_radius * u_bottom_radius);
  float rho = SafeSqrt(r * r - u_bottom_radius * u_bottom_radius);
  float d = DistanceToTopAtmosphereBoundary(r, mu);
  float d_min = u_top_radius - r;
  float d_max = rho + H;
  float x_mu = (d - d_min) / (d_max - d_min);
  float x_r = rho / H;
  return vec2(
    GetTextureCoordFromUnitRange(x_mu, TRANSMITTANCE_TEXTURE_WIDTH),
    GetTextureCoordFromUnitRange(x_r, TRANSMITTANCE_TEXTURE_HEIGHT)
  );
}

vec3 GetTransmittanceToTopAtmosphereBoundary(
  const sampler2D transmittance_texture,
  const float r,
  const float mu
) {
  vec2 uv = GetTransmittanceTextureUvFromRMu(r, mu);
  return vec3(texture(transmittance_texture, uv));
}

vec3 GetTransmittance(
  const sampler2D transmittance_texture,
  const float r,
  const float mu,
  const float d,
  const bool ray_r_mu_intersects_ground
) {
  float r_d = ClampRadius(sqrt(d * d + 2.0 * r * mu * d + r * r));
  float mu_d = ClampCosine((r * mu + d) / r_d);
  if (ray_r_mu_intersects_ground) {
    return min(
      GetTransmittanceToTopAtmosphereBoundary(transmittance_texture, r_d, -mu_d) /
        GetTransmittanceToTopAtmosphereBoundary(transmittance_texture, r, -mu),
      vec3(1.0)
    );
  } else {
    return min(
      GetTransmittanceToTopAtmosphereBoundary(transmittance_texture, r, mu) /
        GetTransmittanceToTopAtmosphereBoundary(transmittance_texture, r_d, mu_d),
      vec3(1.0)
    );
  }
}

vec3 GetTransmittanceToSun(const sampler2D transmittance_texture, const float r, const float mu_s) {
  float sin_theta_h = u_bottom_radius / r;
  float cos_theta_h = -sqrt(max(1.0 - sin_theta_h * sin_theta_h, 0.0));
  return GetTransmittanceToTopAtmosphereBoundary(transmittance_texture, r, mu_s) *
  smoothstep(
    -sin_theta_h * u_sun_angular_radius,
    sin_theta_h * u_sun_angular_radius,
    mu_s - cos_theta_h
  );
}

float RayleighPhaseFunction(const float nu) {
  float k = 3.0 / (16.0 * PI);
  return k * (1.0 + nu * nu);
}

float MiePhaseFunction(const float g, const float nu) {
  float k = 3.0 / (8.0 * PI) * (1.0 - g * g) / (2.0 + g * g);
  return k * (1.0 + nu * nu) / pow(1.0 + g * g - 2.0 * g * nu, 1.5);
}

vec4 GetScatteringTextureUvwzFromRMuMuSNu(
  const float r,
  const float mu,
  const float mu_s,
  const float nu,
  const bool ray_r_mu_intersects_ground
) {
  float H = sqrt(u_top_radius * u_top_radius - u_bottom_radius * u_bottom_radius);
  float rho = SafeSqrt(r * r - u_bottom_radius * u_bottom_radius);
  float u_r = GetTextureCoordFromUnitRange(rho / H, SCATTERING_TEXTURE_R_SIZE);
  float r_mu = r * mu;
  float discriminant = r_mu * r_mu - r * r + u_bottom_radius * u_bottom_radius;
  float u_mu;
  if (ray_r_mu_intersects_ground) {
    float d = -r_mu - SafeSqrt(discriminant);
    float d_min = r - u_bottom_radius;
    float d_max = rho;
    u_mu =
      0.5 -
      0.5 *
        GetTextureCoordFromUnitRange(
          d_max == d_min
            ? 0.0
            : (d - d_min) / (d_max - d_min),
          SCATTERING_TEXTURE_MU_SIZE / 2
        );
  } else {
    float d = -r_mu + SafeSqrt(discriminant + H * H);
    float d_min = u_top_radius - r;
    float d_max = rho + H;
    u_mu =
      0.5 +
      0.5 *
        GetTextureCoordFromUnitRange((d - d_min) / (d_max - d_min), SCATTERING_TEXTURE_MU_SIZE / 2);
  }
  float d = DistanceToTopAtmosphereBoundary(u_bottom_radius, mu_s);
  float d_min = u_top_radius - u_bottom_radius;
  float d_max = H;
  float a = (d - d_min) / (d_max - d_min);
  float D = DistanceToTopAtmosphereBoundary(u_bottom_radius, u_mu_s_min);
  float A = (D - d_min) / (d_max - d_min);
  float u_mu_s = GetTextureCoordFromUnitRange(
    max(1.0 - a / A, 0.0) / (1.0 + a),
    SCATTERING_TEXTURE_MU_S_SIZE
  );
  float u_nu = (nu + 1.0) / 2.0;
  return vec4(u_nu, u_mu_s, u_mu, u_r);
}

vec2 GetIrradianceTextureUvFromRMuS(const float r, const float mu_s) {
  float x_r = (r - u_bottom_radius) / (u_top_radius - u_bottom_radius);
  float x_mu_s = mu_s * 0.5 + 0.5;
  return vec2(
    GetTextureCoordFromUnitRange(x_mu_s, IRRADIANCE_TEXTURE_WIDTH),
    GetTextureCoordFromUnitRange(x_r, IRRADIANCE_TEXTURE_HEIGHT)
  );
}

vec3 GetIrradiance(const sampler2D irradiance_texture, const float r, const float mu_s) {
  vec2 uv = GetIrradianceTextureUvFromRMuS(r, mu_s);
  return vec3(texture(irradiance_texture, uv));
}

vec3 GetExtrapolatedSingleMieScattering(const vec4 scattering) {
  if (scattering.r < 1e-5) {
    return vec3(0.0);
  }
  return scattering.rgb *
  scattering.a /
  scattering.r *
  (u_rayleigh_scattering.r / u_mie_scattering.r) *
  (u_mie_scattering / u_rayleigh_scattering);
}

vec3 GetCombinedScattering(
  const sampler3D scattering_texture,
  const sampler3D single_mie_scattering_texture,
  const float r,
  const float mu,
  const float mu_s,
  const float nu,
  const bool ray_r_mu_intersects_ground,
  out vec3 single_mie_scattering
) {
  vec4 uvwz = GetScatteringTextureUvwzFromRMuMuSNu(r, mu, mu_s, nu, ray_r_mu_intersects_ground);
  float tex_coord_x = uvwz.x * float(SCATTERING_TEXTURE_NU_SIZE - 1);
  float tex_x = floor(tex_coord_x);
  float lerp = tex_coord_x - tex_x;
  vec3 uvw0 = vec3((tex_x + uvwz.y) / float(SCATTERING_TEXTURE_NU_SIZE), uvwz.z, uvwz.w);
  vec3 uvw1 = vec3((tex_x + 1.0 + uvwz.y) / float(SCATTERING_TEXTURE_NU_SIZE), uvwz.z, uvwz.w);
  vec4 combined_scattering =
    texture(scattering_texture, uvw0) * (1.0 - lerp) + texture(scattering_texture, uvw1) * lerp;
  vec3 scattering = vec3(combined_scattering);
  single_mie_scattering = GetExtrapolatedSingleMieScattering(combined_scattering);
  return scattering;
}

vec3 GetSkyRadiance(
  const sampler2D transmittance_texture,
  const sampler3D scattering_texture,
  const sampler3D single_mie_scattering_texture,
  vec3 camera,
  const vec3 view_ray,
  const float shadow_length,
  const vec3 sun_direction,
  out vec3 transmittance
) {
  float r = length(camera);
  float rmu = dot(camera, view_ray);
  float distance_to_top_atmosphere_boundary =
    -rmu - SafeSqrt(rmu * rmu - r * r + u_top_radius * u_top_radius);
  if (distance_to_top_atmosphere_boundary > 0.0) {
    camera = camera + view_ray * distance_to_top_atmosphere_boundary;
    r = u_top_radius;
    rmu += distance_to_top_atmosphere_boundary;
  } else if (r > u_top_radius) {
    transmittance = vec3(1.0);
    return vec3(0.0);
  }
  float mu = rmu / r;
  float mu_s = dot(camera, sun_direction) / r;
  float nu = dot(view_ray, sun_direction);
  bool ray_r_mu_intersects_ground = RayIntersectsGround(r, mu);
  transmittance = ray_r_mu_intersects_ground
    ? vec3(0.0)
    : GetTransmittanceToTopAtmosphereBoundary(transmittance_texture, r, mu);

  vec3 single_mie_scattering;
  vec3 scattering;
  if (shadow_length == 0.0) {
    scattering = GetCombinedScattering(
      u_scattering_texture,
      u_single_mie_scattering_texture,
      r,
      mu,
      mu_s,
      nu,
      ray_r_mu_intersects_ground,
      single_mie_scattering
    );
  } else {
    // Use different points for Rayleigh and Mie scattering since a large shadow
    // length for Rayleigh scattering leads to an overly orange tint, which
    // doesn't work well with the clouds seemingly because their in-scattering
    // is an approximation for terrain.
    float rayleigh_shadow_length = min(shadow_length, u_max_rayleigh_shadow_length);
    float d = rayleigh_shadow_length;
    float r_p = ClampRadius(sqrt(d * d + 2.0 * r * mu * d + r * r));
    float mu_p = (r * mu + d) / r_p;
    float mu_s_p = (r * mu_s + d * nu) / r_p;
    scattering = GetCombinedScattering(
      scattering_texture,
      single_mie_scattering_texture,
      r_p,
      mu_p,
      mu_s_p,
      nu,
      ray_r_mu_intersects_ground,
      single_mie_scattering
    );
    vec3 rayleigh_transmittance = GetTransmittance(
      transmittance_texture,
      r,
      mu,
      rayleigh_shadow_length,
      ray_r_mu_intersects_ground
    );

    d = shadow_length;
    r_p = ClampRadius(sqrt(d * d + 2.0 * r * mu * d + r * r));
    mu_p = (r * mu + d) / r_p;
    mu_s_p = (r * mu_s + d * nu) / r_p;
    GetCombinedScattering(
      scattering_texture,
      single_mie_scattering_texture,
      r_p,
      mu_p,
      mu_s_p,
      nu,
      ray_r_mu_intersects_ground,
      single_mie_scattering
    );
    vec3 mie_transmittance = GetTransmittance(
      transmittance_texture,
      r,
      mu,
      shadow_length,
      ray_r_mu_intersects_ground
    );

    scattering = scattering * rayleigh_transmittance;
    single_mie_scattering = single_mie_scattering * mie_transmittance;
  }
  return scattering * RayleighPhaseFunction(nu) +
  single_mie_scattering * MiePhaseFunction(u_mie_phase_function_g, nu);
}

bool RayOutsideTopAtmosphereBoundary(const vec3 camera, const vec3 point, const float r) {
  if (r < u_top_radius || length(point) < u_top_radius) {
    return false;
  }
  vec3 ray = point - camera;
  float t = -clamp(dot(camera, ray) / dot(ray, ray), 0.0, 1.0);
  return length(camera + t * ray) > u_top_radius;
}

vec3 GetSkyRadianceToPoint(
  const sampler2D transmittance_texture,
  const sampler3D scattering_texture,
  const sampler3D single_mie_scattering_texture,
  vec3 camera,
  const vec3 point,
  const float shadow_length,
  const vec3 sun_direction,
  out vec3 transmittance
) {
  float r = length(camera);
  if (RayOutsideTopAtmosphereBoundary(camera, point, r)) {
    transmittance = vec3(1.0);
    return vec3(0.0); // Avoid artifacts
  }
  vec3 view_ray = normalize(point - camera);
  float rmu = dot(camera, view_ray);
  float distance_to_top_atmosphere_boundary =
    -rmu - sqrt(rmu * rmu - r * r + u_top_radius * u_top_radius);
  if (distance_to_top_atmosphere_boundary > 0.0) {
    camera = camera + view_ray * distance_to_top_atmosphere_boundary;
    r = u_top_radius;
    rmu += distance_to_top_atmosphere_boundary;
  }
  float mu = rmu / r;
  float mu_s = dot(camera, sun_direction) / r;
  float nu = dot(view_ray, sun_direction);
  float d = length(point - camera);
  bool ray_r_mu_intersects_ground = RayIntersectsGround(r, mu);

  // Hack to avoid rendering artifacts near the horizon, due to finite
  // atmosphere texture resolution and finite floating point precision.
  // See: https://github.com/ebruneton/precomputed_atmospheric_scattering/pull/32
  if (!ray_r_mu_intersects_ground) {
    float mu_horiz = -SafeSqrt(1.0 - u_bottom_radius / r * (u_bottom_radius / r));
    mu = max(mu, mu_horiz + 0.004);
  }

  transmittance = GetTransmittance(transmittance_texture, r, mu, d, ray_r_mu_intersects_ground);
  vec3 single_mie_scattering;
  vec3 scattering = GetCombinedScattering(
    scattering_texture,
    single_mie_scattering_texture,
    r,
    mu,
    mu_s,
    nu,
    ray_r_mu_intersects_ground,
    single_mie_scattering
  );
  d = max(d - shadow_length, 0.0);
  float r_p = ClampRadius(sqrt(d * d + 2.0 * r * mu * d + r * r));
  float mu_p = (r * mu + d) / r_p;
  float mu_s_p = (r * mu_s + d * nu) / r_p;
  vec3 single_mie_scattering_p;
  vec3 scattering_p = GetCombinedScattering(
    scattering_texture,
    single_mie_scattering_texture,
    r_p,
    mu_p,
    mu_s_p,
    nu,
    ray_r_mu_intersects_ground,
    single_mie_scattering_p
  );
  vec3 shadow_transmittance = transmittance;
  if (shadow_length > 0.0) {
    shadow_transmittance = GetTransmittance(
      transmittance_texture,
      r,
      mu,
      d,
      ray_r_mu_intersects_ground
    );
  }
  scattering = scattering - shadow_transmittance * scattering_p;
  single_mie_scattering = single_mie_scattering - shadow_transmittance * single_mie_scattering_p;
  single_mie_scattering = GetExtrapolatedSingleMieScattering(
    vec4(scattering, single_mie_scattering.r)
  );
  single_mie_scattering = single_mie_scattering * smoothstep(0.0, 0.01, mu_s);
  return scattering * RayleighPhaseFunction(nu) +
  single_mie_scattering * MiePhaseFunction(u_mie_phase_function_g, nu);
}

vec3 GetSunAndSkyIrradianceForParticle(
  const sampler2D transmittance_texture,
  const sampler2D irradiance_texture,
  const vec3 point,
  const vec3 sun_direction,
  out vec3 sky_irradiance
) {
  float r = length(point);
  float mu_s = dot(point, sun_direction) / r;
  // Integral of (1+dot(n,p))/2 over sphere yields 2\u03C0.
  sky_irradiance = GetIrradiance(irradiance_texture, r, mu_s) * 2.0 * PI;
  // Sunlight is directional. Just omit the cosine term.
  return u_solar_irradiance * GetTransmittanceToSun(transmittance_texture, r, mu_s);
}

vec3 GetSunAndSkyIrradiance(
  const sampler2D transmittance_texture,
  const sampler2D irradiance_texture,
  const vec3 point,
  const vec3 normal,
  const vec3 sun_direction,
  out vec3 sky_irradiance
) {
  float r = length(point);
  float mu_s = dot(point, sun_direction) / r;
  sky_irradiance =
    GetIrradiance(irradiance_texture, r, mu_s) * (1.0 + dot(normal, point) / r) * 0.5;
  return u_solar_irradiance *
  GetTransmittanceToSun(transmittance_texture, r, mu_s) *
  max(dot(normal, sun_direction), 0.0);
}

vec3 GetSolarRadiance() {
  vec3 radiance = u_solar_irradiance / (PI * u_sun_angular_radius * u_sun_angular_radius);
  #ifdef PHOTOMETRIC
  radiance *= SUN_SPECTRAL_RADIANCE_TO_LUMINANCE;
  #endif // PHOTOMETRIC
  return radiance;
}

vec3 GetSkyRadiance(
  const vec3 camera,
  const vec3 view_ray,
  const float shadow_length,
  const vec3 sun_direction,
  out vec3 transmittance
) {
  vec3 radiance = GetSkyRadiance(
    u_transmittance_texture,
    u_scattering_texture,
    u_single_mie_scattering_texture,
    camera,
    view_ray,
    shadow_length,
    sun_direction,
    transmittance
  );
  #ifdef PHOTOMETRIC
  radiance *= SKY_SPECTRAL_RADIANCE_TO_LUMINANCE;
  #endif // PHOTOMETRIC
  return radiance;
}

vec3 GetSkyRadianceToPoint(
  const vec3 camera,
  const vec3 point,
  const float shadow_length,
  const vec3 sun_direction,
  out vec3 transmittance
) {
  vec3 inscatter = GetSkyRadianceToPoint(
    u_transmittance_texture,
    u_scattering_texture,
    u_single_mie_scattering_texture,
    camera,
    point,
    shadow_length,
    sun_direction,
    transmittance
  );
  #ifdef PHOTOMETRIC
  inscatter *= SKY_SPECTRAL_RADIANCE_TO_LUMINANCE;
  #endif // PHOTOMETRIC
  return inscatter;
}

vec3 GetSunAndSkyIrradianceForParticle(
  const vec3 point,
  const vec3 sun_direction,
  out vec3 sky_irradiance
) {
  vec3 sun_irradiance = GetSunAndSkyIrradianceForParticle(
    u_transmittance_texture,
    u_irradiance_texture,
    point,
    sun_direction,
    sky_irradiance
  );
  #ifdef PHOTOMETRIC
  sun_irradiance *= SUN_SPECTRAL_RADIANCE_TO_LUMINANCE;
  sky_irradiance *= SKY_SPECTRAL_RADIANCE_TO_LUMINANCE;
  #endif // PHOTOMETRIC
  return sun_irradiance;
}

vec3 GetSunAndSkyIrradiance(
  const vec3 point,
  const vec3 normal,
  const vec3 sun_direction,
  out vec3 sky_irradiance
) {
  vec3 sun_irradiance = GetSunAndSkyIrradiance(
    u_transmittance_texture,
    u_irradiance_texture,
    point,
    normal,
    sun_direction,
    sky_irradiance
  );
  #ifdef PHOTOMETRIC
  sun_irradiance *= SUN_SPECTRAL_RADIANCE_TO_LUMINANCE;
  sky_irradiance *= SKY_SPECTRAL_RADIANCE_TO_LUMINANCE;
  #endif // PHOTOMETRIC
  return sun_irradiance;
}
`;

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/shaders/parameters.glsl
var parameters_default = "uniform vec3 u_solar_irradiance;\nuniform float u_sun_angular_radius;\nuniform float u_bottom_radius;\nuniform float u_top_radius;\nuniform vec3 u_rayleigh_scattering;\nuniform vec3 u_mie_scattering;\nuniform float u_mie_phase_function_g;\nuniform float u_mu_s_min;\nuniform float u_max_rayleigh_shadow_length;\n\nuniform sampler2D u_transmittance_texture;\nuniform sampler3D u_scattering_texture;\nuniform sampler3D u_single_mie_scattering_texture;\nuniform sampler2D u_irradiance_texture;\n";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/shaders/sky.glsl
var sky_default = "vec3 getLunarRadiance(const float moonAngularRadius) {\n  // Not a physical number but the order of 10^-6 relative to the sun may fit.\n  vec3 radiance = u_solar_irradiance * 0.000002 / (PI * moonAngularRadius * moonAngularRadius);\n  #ifdef PHOTOMETRIC\n  radiance *= SUN_SPECTRAL_RADIANCE_TO_LUMINANCE;\n  #endif // PHOTOMETRIC\n  return radiance;\n}\n\nfloat intersectSphere(const vec3 ray, const vec3 point, const float radius) {\n  vec3 P = -point;\n  float PoR = dot(P, ray);\n  float D = dot(P, P) - radius * radius;\n  return -PoR - sqrt(PoR * PoR - D);\n}\n\nfloat orenNayarDiffuse(const vec3 L, const vec3 V, const vec3 N) {\n  float NoL = dot(N, L);\n  float NoV = dot(N, V);\n  float s = dot(L, V) - NoL * NoV;\n  float t = mix(1.0, max(NoL, NoV), step(0.0, s));\n  return max(0.0, NoL) * (0.62406015 + 0.41284404 * s / t);\n}\n\nvec3 getSkyRadiance(\n  const vec3 cameraPosition,\n  const vec3 rayDirection,\n  const float shadowLength,\n  const vec3 sunDirection,\n  const vec3 moonDirection,\n  const float moonAngularRadius,\n  const float lunarRadianceScale\n) {\n  vec3 transmittance;\n  vec3 radiance = GetSkyRadiance(\n    cameraPosition,\n    rayDirection,\n    shadowLength,\n    sunDirection,\n    transmittance\n  );\n\n  // Rendering celestial objects without perspective doesn't make sense.\n  #ifdef PERSPECTIVE_CAMERA\n\n  #if defined(SUN) || defined(MOON)\n  vec3 ddx = dFdx(rayDirection);\n  vec3 ddy = dFdy(rayDirection);\n  float fragmentAngle = length(ddx + ddy) / length(rayDirection);\n  #endif // defined(SUN) || defined(MOON)\n\n  #ifdef SUN\n  float viewDotSun = dot(rayDirection, sunDirection);\n  if (viewDotSun > cos(u_sun_angular_radius)) {\n    float angle = acos(clamp(viewDotSun, -1.0, 1.0));\n    float antialias = smoothstep(u_sun_angular_radius, u_sun_angular_radius - fragmentAngle, angle);\n    radiance += transmittance * GetSolarRadiance() * antialias;\n  }\n  #endif // SUN\n\n  #ifdef MOON\n  float intersection = intersectSphere(rayDirection, moonDirection, moonAngularRadius);\n  if (intersection > 0.0) {\n    vec3 normal = normalize(moonDirection - rayDirection * intersection);\n    float diffuse = orenNayarDiffuse(-sunDirection, rayDirection, normal);\n    float viewDotMoon = dot(rayDirection, moonDirection);\n    float angle = acos(clamp(viewDotMoon, -1.0, 1.0));\n    float antialias = smoothstep(moonAngularRadius, moonAngularRadius - fragmentAngle, angle);\n    radiance +=\n      transmittance *\n      getLunarRadiance(moonAngularRadius) *\n      lunarRadianceScale *\n      diffuse *\n      antialias;\n  }\n  #endif // MOON\n\n  #endif // PERSPECTIVE_CAMERA\n\n  return radiance;\n}\n";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/AerialPerspectiveEffect.ts
var vectorScratch13 = /* @__PURE__ */ new Vector39();
var vectorScratch23 = /* @__PURE__ */ new Vector39();
var geodeticScratch = /* @__PURE__ */ new Geodetic();
var aerialPerspectiveEffectOptionsDefaults = {
  blendFunction: BlendFunction.NORMAL,
  octEncodedNormal: false,
  reconstructNormal: false,
  ellipsoid: Ellipsoid.WGS84,
  correctAltitude: true,
  correctGeometricError: true,
  photometric: true,
  sunIrradiance: false,
  skyIrradiance: false,
  transmittance: true,
  inscatter: true,
  irradianceScale: 1,
  sky: false,
  sun: true,
  moon: true,
  moonAngularRadius: 45e-4,
  // ≈ 15.5 arcminutes
  lunarRadianceScale: 1
};
var _shadowSampleCount_dec, _moon_dec, _sun_dec, _sky_dec, _inscatter_dec, _transmittance_dec, _skyIrradiance_dec, _sunIrradiance_dec, _photometric_dec, _correctGeometricError_dec, _reconstructNormal_dec, _octEncodedNormal_dec, _a, _init;
var AerialPerspectiveEffect = class extends (_a = Effect, _octEncodedNormal_dec = [define("OCT_ENCODED_NORMAL")], _reconstructNormal_dec = [define("RECONSTRUCT_NORMAL")], _correctGeometricError_dec = [define("CORRECT_GEOMETRIC_ERROR")], _photometric_dec = [define("PHOTOMETRIC")], _sunIrradiance_dec = [define("SUN_IRRADIANCE")], _skyIrradiance_dec = [define("SKY_IRRADIANCE")], _transmittance_dec = [define("TRANSMITTANCE")], _inscatter_dec = [define("INSCATTER")], _sky_dec = [define("SKY")], _sun_dec = [define("SUN")], _moon_dec = [define("MOON")], _shadowSampleCount_dec = [defineInt("SHADOW_SAMPLE_COUNT", { min: 1, max: 16 })], _a) {
  constructor(camera = new Camera(), options, atmosphere = AtmosphereParameters.DEFAULT) {
    const {
      blendFunction,
      normalBuffer = null,
      octEncodedNormal,
      reconstructNormal,
      irradianceTexture = null,
      scatteringTexture = null,
      transmittanceTexture = null,
      ellipsoid,
      correctAltitude,
      correctGeometricError,
      photometric,
      sunDirection,
      sunIrradiance,
      skyIrradiance,
      transmittance,
      inscatter,
      irradianceScale,
      sky,
      sun,
      moon,
      moonDirection,
      moonAngularRadius,
      lunarRadianceScale
    } = { ...aerialPerspectiveEffectOptionsDefaults, ...options };
    super(
      "AerialPerspectiveEffect",
      unrollLoops(
        resolveIncludes(aerialPerspectiveEffect_default, {
          core: {
            depth,
            packing,
            math,
            transform,
            raySphereIntersection,
            cascadedShadowMaps,
            interleavedGradientNoise,
            vogelDisk
          },
          parameters: parameters_default,
          functions: functions_default,
          sky: sky_default
        })
      ),
      {
        blendFunction,
        vertexShader: resolveIncludes(aerialPerspectiveEffect_default2, {
          parameters: parameters_default
        }),
        attributes: EffectAttribute.DEPTH,
        // prettier-ignore
        uniforms: new Map(
          Object.entries({
            normalBuffer: new Uniform(normalBuffer),
            projectionMatrix: new Uniform(new Matrix43()),
            viewMatrix: new Uniform(new Matrix43()),
            inverseProjectionMatrix: new Uniform(new Matrix43()),
            inverseViewMatrix: new Uniform(new Matrix43()),
            cameraPosition: new Uniform(new Vector39()),
            bottomRadius: new Uniform(atmosphere.bottomRadius),
            ellipsoidRadii: new Uniform(new Vector39()),
            ellipsoidCenter: new Uniform(new Vector39()),
            inverseEllipsoidMatrix: new Uniform(new Matrix43()),
            altitudeCorrection: new Uniform(new Vector39()),
            sunDirection: new Uniform(sunDirection?.clone() ?? new Vector39()),
            irradianceScale: new Uniform(irradianceScale),
            idealSphereAlpha: new Uniform(0),
            moonDirection: new Uniform(moonDirection?.clone() ?? new Vector39()),
            moonAngularRadius: new Uniform(moonAngularRadius),
            lunarRadianceScale: new Uniform(lunarRadianceScale),
            // Composition and shadow
            overlayBuffer: new Uniform(null),
            shadowBuffer: new Uniform(null),
            shadowMapSize: new Uniform(new Vector22()),
            shadowIntervals: new Uniform([]),
            shadowMatrices: new Uniform([]),
            inverseShadowMatrices: new Uniform([]),
            shadowFar: new Uniform(0),
            shadowTopHeight: new Uniform(0),
            shadowRadius: new Uniform(3),
            stbnTexture: new Uniform(null),
            frame: new Uniform(0),
            shadowLengthBuffer: new Uniform(null),
            // Irradiance mask
            irradianceMaskBuffer: new Uniform(null),
            // Uniforms for atmosphere functions
            u_solar_irradiance: new Uniform(atmosphere.solarIrradiance),
            u_sun_angular_radius: new Uniform(atmosphere.sunAngularRadius),
            u_bottom_radius: new Uniform(atmosphere.bottomRadius * METER_TO_LENGTH_UNIT),
            u_top_radius: new Uniform(atmosphere.topRadius * METER_TO_LENGTH_UNIT),
            u_rayleigh_scattering: new Uniform(atmosphere.rayleighScattering),
            u_mie_scattering: new Uniform(atmosphere.mieScattering),
            u_mie_phase_function_g: new Uniform(atmosphere.miePhaseFunctionG),
            u_mu_s_min: new Uniform(atmosphere.muSMin),
            u_max_rayleigh_shadow_length: new Uniform(1e4 * METER_TO_LENGTH_UNIT),
            u_irradiance_texture: new Uniform(irradianceTexture),
            u_scattering_texture: new Uniform(scatteringTexture),
            u_single_mie_scattering_texture: new Uniform(scatteringTexture),
            u_transmittance_texture: new Uniform(transmittanceTexture)
          })
        ),
        // prettier-ignore
        defines: /* @__PURE__ */ new Map([
          ["TRANSMITTANCE_TEXTURE_WIDTH", TRANSMITTANCE_TEXTURE_WIDTH.toFixed(0)],
          ["TRANSMITTANCE_TEXTURE_HEIGHT", TRANSMITTANCE_TEXTURE_HEIGHT.toFixed(0)],
          ["SCATTERING_TEXTURE_R_SIZE", SCATTERING_TEXTURE_R_SIZE.toFixed(0)],
          ["SCATTERING_TEXTURE_MU_SIZE", SCATTERING_TEXTURE_MU_SIZE.toFixed(0)],
          ["SCATTERING_TEXTURE_MU_S_SIZE", SCATTERING_TEXTURE_MU_S_SIZE.toFixed(0)],
          ["SCATTERING_TEXTURE_NU_SIZE", SCATTERING_TEXTURE_NU_SIZE.toFixed(0)],
          ["IRRADIANCE_TEXTURE_WIDTH", IRRADIANCE_TEXTURE_WIDTH.toFixed(0)],
          ["IRRADIANCE_TEXTURE_HEIGHT", IRRADIANCE_TEXTURE_HEIGHT.toFixed(0)],
          ["METER_TO_LENGTH_UNIT", METER_TO_LENGTH_UNIT.toFixed(7)],
          ["SUN_SPECTRAL_RADIANCE_TO_LUMINANCE", `vec3(${atmosphere.sunRadianceToRelativeLuminance.toArray().map((v) => v.toFixed(12)).join(",")})`],
          ["SKY_SPECTRAL_RADIANCE_TO_LUMINANCE", `vec3(${atmosphere.skyRadianceToRelativeLuminance.toArray().map((v) => v.toFixed(12)).join(",")})`]
        ])
      }
    );
    this.camera = camera;
    this.atmosphere = atmosphere;
    __publicField(this, "_ellipsoid");
    __publicField(this, "ellipsoidMatrix", new Matrix43());
    __publicField(this, "correctAltitude");
    __publicField(this, "overlay", null);
    __publicField(this, "shadow", null);
    __publicField(this, "shadowLength", null);
    __publicField(this, "irradianceMask", null);
    __publicField(this, "octEncodedNormal", __runInitializers(_init, 8, this)), __runInitializers(_init, 11, this);
    __publicField(this, "reconstructNormal", __runInitializers(_init, 12, this)), __runInitializers(_init, 15, this);
    __publicField(this, "correctGeometricError", __runInitializers(_init, 16, this)), __runInitializers(_init, 19, this);
    __publicField(this, "photometric", __runInitializers(_init, 20, this)), __runInitializers(_init, 23, this);
    __publicField(this, "sunIrradiance", __runInitializers(_init, 24, this)), __runInitializers(_init, 27, this);
    __publicField(this, "skyIrradiance", __runInitializers(_init, 28, this)), __runInitializers(_init, 31, this);
    __publicField(this, "transmittance", __runInitializers(_init, 32, this)), __runInitializers(_init, 35, this);
    __publicField(this, "inscatter", __runInitializers(_init, 36, this)), __runInitializers(_init, 39, this);
    __publicField(this, "sky", __runInitializers(_init, 40, this)), __runInitializers(_init, 43, this);
    __publicField(this, "sun", __runInitializers(_init, 44, this)), __runInitializers(_init, 47, this);
    __publicField(this, "moon", __runInitializers(_init, 48, this)), __runInitializers(_init, 51, this);
    __publicField(this, "shadowSampleCount", __runInitializers(_init, 52, this, 8)), __runInitializers(_init, 55, this);
    this.octEncodedNormal = octEncodedNormal;
    this.reconstructNormal = reconstructNormal;
    this.ellipsoid = ellipsoid;
    this.correctAltitude = correctAltitude;
    this.correctGeometricError = correctGeometricError;
    this.photometric = photometric;
    this.sunIrradiance = sunIrradiance;
    this.skyIrradiance = skyIrradiance;
    this.transmittance = transmittance;
    this.inscatter = inscatter;
    this.sky = sky;
    this.sun = sun;
    this.moon = moon;
  }
  get mainCamera() {
    return this.camera;
  }
  set mainCamera(value) {
    this.camera = value;
  }
  copyCameraSettings(camera) {
    const {
      projectionMatrix,
      matrixWorldInverse,
      projectionMatrixInverse,
      matrixWorld
    } = camera;
    const uniforms = this.uniforms;
    uniforms.get("projectionMatrix").value.copy(projectionMatrix);
    uniforms.get("viewMatrix").value.copy(matrixWorldInverse);
    uniforms.get("inverseProjectionMatrix").value.copy(projectionMatrixInverse);
    uniforms.get("inverseViewMatrix").value.copy(matrixWorld);
    const cameraPosition = camera.getWorldPosition(
      uniforms.get("cameraPosition").value
    );
    const inverseEllipsoidMatrix = uniforms.get("inverseEllipsoidMatrix").value.copy(this.ellipsoidMatrix).invert();
    const cameraPositionECEF = vectorScratch13.copy(cameraPosition).applyMatrix4(inverseEllipsoidMatrix).sub(uniforms.get("ellipsoidCenter").value);
    try {
      const cameraHeight = geodeticScratch.setFromECEF(cameraPositionECEF).height;
      const projectedScale = vectorScratch23.set(0, this.ellipsoid.maximumRadius, -cameraHeight).applyMatrix4(projectionMatrix);
      uniforms.get("idealSphereAlpha").value = saturate(
        remap(projectedScale.y, 41.5, 13.8, 0, 1)
      );
    } catch (error) {
      return;
    }
    const altitudeCorrection = uniforms.get("altitudeCorrection");
    if (this.correctAltitude) {
      getAltitudeCorrectionOffset(
        cameraPositionECEF,
        this.atmosphere.bottomRadius,
        this.ellipsoid,
        altitudeCorrection.value
      );
    } else {
      altitudeCorrection.value.setScalar(0);
    }
  }
  updateOverlay() {
    let needsUpdate = false;
    const { uniforms, defines, overlay } = this;
    const prevValue = defines.has("HAS_OVERLAY");
    const nextValue = overlay != null;
    if (nextValue !== prevValue) {
      if (nextValue) {
        defines.set("HAS_OVERLAY", "1");
      } else {
        defines.delete("HAS_OVERLAY");
        uniforms.get("overlayBuffer").value = null;
      }
      needsUpdate = true;
    }
    if (nextValue) {
      uniforms.get("overlayBuffer").value = overlay.map;
    }
    return needsUpdate;
  }
  updateShadow() {
    let needsUpdate = false;
    const { uniforms, defines, shadow } = this;
    const prevValue = defines.has("HAS_SHADOW");
    const nextValue = shadow != null;
    if (nextValue !== prevValue) {
      if (nextValue) {
        defines.set("HAS_SHADOW", "1");
      } else {
        defines.delete("HAS_SHADOW");
        uniforms.get("shadowBuffer").value = null;
      }
      needsUpdate = true;
    }
    if (nextValue) {
      const prevCascadeCount = defines.get("SHADOW_CASCADE_COUNT");
      const nextCascadeCount = `${shadow.cascadeCount}`;
      if (prevCascadeCount !== nextCascadeCount) {
        defines.set("SHADOW_CASCADE_COUNT", shadow.cascadeCount.toFixed(0));
        needsUpdate = true;
      }
      uniforms.get("shadowBuffer").value = shadow.map;
      uniforms.get("shadowMapSize").value = shadow.mapSize;
      uniforms.get("shadowIntervals").value = shadow.intervals;
      uniforms.get("shadowMatrices").value = shadow.matrices;
      uniforms.get("inverseShadowMatrices").value = shadow.inverseMatrices;
      uniforms.get("shadowFar").value = shadow.far;
      uniforms.get("shadowTopHeight").value = shadow.topHeight;
    }
    return needsUpdate;
  }
  updateShadowLength() {
    let needsUpdate = false;
    const { uniforms, defines, shadowLength } = this;
    const prevValue = defines.has("HAS_SHADOW_LENGTH");
    const nextValue = shadowLength != null;
    if (nextValue !== prevValue) {
      if (nextValue) {
        defines.set("HAS_SHADOW_LENGTH", "1");
      } else {
        defines.delete("HAS_SHADOW_LENGTH");
        uniforms.get("shadowLengthBuffer").value = null;
      }
      needsUpdate = true;
    }
    if (nextValue) {
      uniforms.get("shadowLengthBuffer").value = shadowLength.map;
    }
    return needsUpdate;
  }
  updateIrradianceMask() {
    let needsUpdate = false;
    const { uniforms, defines, irradianceMask } = this;
    const prevValue = defines.has("HAS_IRRADIANCE_MASK");
    const nextValue = irradianceMask != null;
    if (nextValue !== prevValue) {
      if (nextValue) {
        defines.set("HAS_IRRADIANCE_MASK", "1");
      } else {
        defines.delete("HAS_IRRADIANCE_MASK");
        uniforms.get("irradianceMaskBuffer").value = null;
      }
      needsUpdate = true;
    }
    if (nextValue) {
      uniforms.get("irradianceMaskBuffer").value = irradianceMask.map;
      const prevChannel = defines.get("IRRADIANCE_MASK_CHANNEL");
      const nextChannel = irradianceMask.channel;
      if (nextChannel !== prevChannel) {
        if (!/^[rgba]$/.test(nextChannel)) {
          console.error(`Expression validation failed: ${nextChannel}`);
        } else {
          defines.set("IRRADIANCE_MASK_CHANNEL", nextChannel);
          needsUpdate = true;
        }
      }
    }
    return needsUpdate;
  }
  update(renderer, inputBuffer, deltaTime) {
    this.copyCameraSettings(this.camera);
    let needsUpdate = false;
    needsUpdate ||= this.updateOverlay();
    needsUpdate ||= this.updateShadow();
    needsUpdate ||= this.updateShadowLength();
    needsUpdate ||= this.updateIrradianceMask();
    if (needsUpdate) {
      this.setChanged();
    }
    ++this.uniforms.get("frame").value;
  }
  get normalBuffer() {
    return this.uniforms.get("normalBuffer").value;
  }
  set normalBuffer(value) {
    this.uniforms.get("normalBuffer").value = value;
  }
  get irradianceTexture() {
    return this.uniforms.get("u_irradiance_texture").value;
  }
  set irradianceTexture(value) {
    this.uniforms.get("u_irradiance_texture").value = value;
  }
  get scatteringTexture() {
    return this.uniforms.get("u_scattering_texture").value;
  }
  set scatteringTexture(value) {
    this.uniforms.get("u_scattering_texture").value = value;
    this.uniforms.get("u_single_mie_scattering_texture").value = value;
  }
  get transmittanceTexture() {
    return this.uniforms.get("u_transmittance_texture").value;
  }
  set transmittanceTexture(value) {
    this.uniforms.get("u_transmittance_texture").value = value;
  }
  get ellipsoid() {
    return this._ellipsoid;
  }
  set ellipsoid(value) {
    this._ellipsoid = value;
    this.uniforms.get("ellipsoidRadii").value.copy(value.radii);
  }
  get ellipsoidCenter() {
    return this.uniforms.get("ellipsoidCenter").value;
  }
  get sunDirection() {
    return this.uniforms.get("sunDirection").value;
  }
  get irradianceScale() {
    return this.uniforms.get("irradianceScale").value;
  }
  set irradianceScale(value) {
    this.uniforms.get("irradianceScale").value = value;
  }
  get moonDirection() {
    return this.uniforms.get("moonDirection").value;
  }
  get moonAngularRadius() {
    return this.uniforms.get("moonAngularRadius").value;
  }
  set moonAngularRadius(value) {
    this.uniforms.get("moonAngularRadius").value = value;
  }
  get lunarRadianceScale() {
    return this.uniforms.get("lunarRadianceScale").value;
  }
  set lunarRadianceScale(value) {
    this.uniforms.get("lunarRadianceScale").value = value;
  }
  get stbnTexture() {
    return this.uniforms.get("stbnTexture").value;
  }
  set stbnTexture(value) {
    this.uniforms.get("stbnTexture").value = value;
  }
  get shadowRadius() {
    return this.uniforms.get("shadowRadius").value;
  }
  set shadowRadius(value) {
    this.uniforms.get("shadowRadius").value = value;
  }
};
_init = __decoratorStart(_a);
__decorateElement(_init, 5, "octEncodedNormal", _octEncodedNormal_dec, AerialPerspectiveEffect);
__decorateElement(_init, 5, "reconstructNormal", _reconstructNormal_dec, AerialPerspectiveEffect);
__decorateElement(_init, 5, "correctGeometricError", _correctGeometricError_dec, AerialPerspectiveEffect);
__decorateElement(_init, 5, "photometric", _photometric_dec, AerialPerspectiveEffect);
__decorateElement(_init, 5, "sunIrradiance", _sunIrradiance_dec, AerialPerspectiveEffect);
__decorateElement(_init, 5, "skyIrradiance", _skyIrradiance_dec, AerialPerspectiveEffect);
__decorateElement(_init, 5, "transmittance", _transmittance_dec, AerialPerspectiveEffect);
__decorateElement(_init, 5, "inscatter", _inscatter_dec, AerialPerspectiveEffect);
__decorateElement(_init, 5, "sky", _sky_dec, AerialPerspectiveEffect);
__decorateElement(_init, 5, "sun", _sun_dec, AerialPerspectiveEffect);
__decorateElement(_init, 5, "moon", _moon_dec, AerialPerspectiveEffect);
__decorateElement(_init, 5, "shadowSampleCount", _shadowSampleCount_dec, AerialPerspectiveEffect);
__decoratorMetadata(_init, AerialPerspectiveEffect);

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/AtmosphereMaterialBase.ts
import {
  Matrix4 as Matrix44,
  RawShaderMaterial,
  Uniform as Uniform2,
  Vector3 as Vector310
} from "https://esm.sh/three@0.185.1?external";
var vectorScratch5 = /* @__PURE__ */ new Vector310();
function includeRenderTargets(fragmentShader, count) {
  let layout = "";
  let output = "";
  for (let index = 1; index < count; ++index) {
    layout += `layout(location = ${index}) out float renderTarget${index};
`;
    output += `renderTarget${index} = 0.0;
`;
  }
  return fragmentShader.replace("#include <mrt_layout>", layout).replace("#include <mrt_output>", output);
}
var atmosphereMaterialParametersBaseDefaults = {
  ellipsoid: Ellipsoid.WGS84,
  correctAltitude: true,
  photometric: true,
  renderTargetCount: 1
};
var _photometric_dec2, _a2, _init2;
var AtmosphereMaterialBase = class extends (_a2 = RawShaderMaterial, _photometric_dec2 = [define("PHOTOMETRIC")], _a2) {
  constructor(params, atmosphere = AtmosphereParameters.DEFAULT) {
    const {
      irradianceTexture = null,
      scatteringTexture = null,
      transmittanceTexture = null,
      ellipsoid,
      correctAltitude,
      photometric,
      sunDirection,
      sunAngularRadius,
      renderTargetCount,
      ...others
    } = { ...atmosphereMaterialParametersBaseDefaults, ...params };
    super({
      toneMapped: false,
      depthWrite: false,
      depthTest: false,
      ...others,
      // prettier-ignore
      uniforms: {
        cameraPosition: new Uniform2(new Vector310()),
        ellipsoidCenter: new Uniform2(new Vector310()),
        inverseEllipsoidMatrix: new Uniform2(new Matrix44()),
        altitudeCorrection: new Uniform2(new Vector310()),
        sunDirection: new Uniform2(sunDirection?.clone() ?? new Vector310()),
        // Uniforms for atmosphere functions
        u_solar_irradiance: new Uniform2(atmosphere.solarIrradiance),
        u_sun_angular_radius: new Uniform2(sunAngularRadius ?? atmosphere.sunAngularRadius),
        u_bottom_radius: new Uniform2(atmosphere.bottomRadius * METER_TO_LENGTH_UNIT),
        u_top_radius: new Uniform2(atmosphere.topRadius * METER_TO_LENGTH_UNIT),
        u_rayleigh_scattering: new Uniform2(atmosphere.rayleighScattering),
        u_mie_scattering: new Uniform2(atmosphere.mieScattering),
        u_mie_phase_function_g: new Uniform2(atmosphere.miePhaseFunctionG),
        u_mu_s_min: new Uniform2(atmosphere.muSMin),
        u_max_rayleigh_shadow_length: new Uniform2(1e4 * METER_TO_LENGTH_UNIT),
        u_irradiance_texture: new Uniform2(irradianceTexture),
        u_scattering_texture: new Uniform2(scatteringTexture),
        u_single_mie_scattering_texture: new Uniform2(scatteringTexture),
        u_transmittance_texture: new Uniform2(transmittanceTexture),
        ...others.uniforms
      },
      // prettier-ignore
      defines: {
        PI: `${Math.PI}`,
        TRANSMITTANCE_TEXTURE_WIDTH: TRANSMITTANCE_TEXTURE_WIDTH.toFixed(0),
        TRANSMITTANCE_TEXTURE_HEIGHT: TRANSMITTANCE_TEXTURE_HEIGHT.toFixed(0),
        SCATTERING_TEXTURE_R_SIZE: SCATTERING_TEXTURE_R_SIZE.toFixed(0),
        SCATTERING_TEXTURE_MU_SIZE: SCATTERING_TEXTURE_MU_SIZE.toFixed(0),
        SCATTERING_TEXTURE_MU_S_SIZE: SCATTERING_TEXTURE_MU_S_SIZE.toFixed(0),
        SCATTERING_TEXTURE_NU_SIZE: SCATTERING_TEXTURE_NU_SIZE.toFixed(0),
        IRRADIANCE_TEXTURE_WIDTH: IRRADIANCE_TEXTURE_WIDTH.toFixed(0),
        IRRADIANCE_TEXTURE_HEIGHT: IRRADIANCE_TEXTURE_HEIGHT.toFixed(0),
        METER_TO_LENGTH_UNIT: METER_TO_LENGTH_UNIT.toFixed(7),
        SUN_SPECTRAL_RADIANCE_TO_LUMINANCE: `vec3(${atmosphere.sunRadianceToRelativeLuminance.toArray().map((v) => v.toFixed(12)).join(",")})`,
        SKY_SPECTRAL_RADIANCE_TO_LUMINANCE: `vec3(${atmosphere.skyRadianceToRelativeLuminance.toArray().map((v) => v.toFixed(12)).join(",")})`,
        ...others.defines
      }
    });
    this.atmosphere = atmosphere;
    __publicField(this, "ellipsoid");
    __publicField(this, "ellipsoidMatrix", new Matrix44());
    __publicField(this, "correctAltitude");
    __publicField(this, "_renderTargetCount");
    __publicField(this, "photometric", __runInitializers(_init2, 8, this)), __runInitializers(_init2, 11, this);
    this.atmosphere = atmosphere;
    this.ellipsoid = ellipsoid;
    this.correctAltitude = correctAltitude;
    this.photometric = photometric;
    this.renderTargetCount = renderTargetCount;
  }
  copyCameraSettings(camera) {
    const uniforms = this.uniforms;
    const cameraPosition = camera.getWorldPosition(
      uniforms.cameraPosition.value
    );
    const inverseEllipsoidMatrix = uniforms.inverseEllipsoidMatrix.value.copy(this.ellipsoidMatrix).invert();
    const cameraPositionECEF = vectorScratch5.copy(cameraPosition).applyMatrix4(inverseEllipsoidMatrix).sub(uniforms.ellipsoidCenter.value);
    const altitudeCorrection = uniforms.altitudeCorrection.value;
    if (this.correctAltitude) {
      getAltitudeCorrectionOffset(
        cameraPositionECEF,
        this.atmosphere.bottomRadius,
        this.ellipsoid,
        altitudeCorrection
      );
    } else {
      altitudeCorrection.setScalar(0);
    }
  }
  onBeforeCompile(parameters, renderer) {
    parameters.fragmentShader = includeRenderTargets(
      parameters.fragmentShader,
      this.renderTargetCount
    );
  }
  onBeforeRender(renderer, scene, camera, geometry, object, group) {
    this.copyCameraSettings(camera);
  }
  get irradianceTexture() {
    return this.uniforms.u_irradiance_texture.value;
  }
  set irradianceTexture(value) {
    this.uniforms.u_irradiance_texture.value = value;
  }
  get scatteringTexture() {
    return this.uniforms.u_scattering_texture.value;
  }
  set scatteringTexture(value) {
    this.uniforms.u_scattering_texture.value = value;
    this.uniforms.u_single_mie_scattering_texture.value = value;
  }
  get transmittanceTexture() {
    return this.uniforms.u_transmittance_texture.value;
  }
  set transmittanceTexture(value) {
    this.uniforms.u_transmittance_texture.value = value;
  }
  get ellipsoidCenter() {
    return this.uniforms.ellipsoidCenter.value;
  }
  get sunDirection() {
    return this.uniforms.sunDirection.value;
  }
  get sunAngularRadius() {
    return this.uniforms.u_sun_angular_radius.value;
  }
  set sunAngularRadius(value) {
    this.uniforms.u_sun_angular_radius.value = value;
  }
  /** @package */
  get renderTargetCount() {
    return this._renderTargetCount;
  }
  /** @package */
  set renderTargetCount(value) {
    if (value !== this.renderTargetCount) {
      this._renderTargetCount = value;
      this.needsUpdate = true;
    }
  }
};
_init2 = __decoratorStart(_a2);
__decorateElement(_init2, 5, "photometric", _photometric_dec2, AtmosphereMaterialBase);
__decoratorMetadata(_init2, AtmosphereMaterialBase);

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/blackBodyChromaticity.ts
import { Color, Matrix3, Vector3 as Vector311 } from "https://esm.sh/three@0.185.1?external";
var vectorScratch6 = /* @__PURE__ */ new Vector311();
var XYZToLinearRGB = /* @__PURE__ */ new Matrix3(
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
  const color = vectorScratch6.set(X, Y, Z).applyMatrix3(XYZToLinearRGB);
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

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/celestialDirections.ts
import {
  AstroTime,
  Body,
  CombineRotation,
  GeoVector,
  Rotation_EQJ_EQD,
  RotationMatrix,
  SiderealTime
} from "https://esm.sh/astronomy-engine@2.1.19?external";
import { Matrix4 as Matrix45, Vector3 as Vector312 } from "https://esm.sh/three@0.185.1?external";
var matrixScratch = /* @__PURE__ */ new Matrix45();
function RotationZ(angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return new RotationMatrix([
    [cos, -sin, 0],
    [sin, cos, 0],
    [0, 0, 1]
  ]);
}
function makeTime(value) {
  return value instanceof AstroTime ? value : new AstroTime(value instanceof Date ? value : new Date(value));
}
function getECIToECEFRotationMatrix(date, result = new Matrix45()) {
  const time = makeTime(date);
  const rotationEQJtoEQD = Rotation_EQJ_EQD(time);
  const rotationEQDtoECEF = RotationZ(SiderealTime(time) * (-Math.PI / 12));
  const { rot } = CombineRotation(rotationEQJtoEQD, rotationEQDtoECEF);
  return result.set(
    rot[0][0],
    rot[0][1],
    rot[0][2],
    0,
    rot[1][0],
    rot[1][1],
    rot[1][2],
    0,
    rot[2][0],
    rot[2][1],
    rot[2][2],
    0,
    0,
    0,
    0,
    1
  );
}
function getDirectionECI(body, time, result) {
  const { x, y, z } = GeoVector(body, time, false);
  return result.set(x, y, z).normalize();
}
function getDirectionECEF(body, time, result) {
  const matrix = getECIToECEFRotationMatrix(time, matrixScratch);
  return getDirectionECI(body, time, result).applyMatrix4(matrix);
}
function getSunDirectionECI(date, result = new Vector312()) {
  return getDirectionECI(Body.Sun, makeTime(date), result);
}
function getMoonDirectionECI(date, result = new Vector312()) {
  return getDirectionECI(Body.Moon, makeTime(date), result);
}
function getSunDirectionECEF(date, result = new Vector312()) {
  return getDirectionECEF(Body.Sun, makeTime(date), result);
}
function getMoonDirectionECEF(date, result = new Vector312()) {
  return getDirectionECEF(Body.Moon, makeTime(date), result);
}

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/getSunLightColor.ts
import { Color as Color2, Vector2 as Vector23, Vector3 as Vector314 } from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/helpers/functions.ts
function safeSqrt(a) {
  return Math.sqrt(Math.max(a, 0));
}
function clampDistance(d) {
  return Math.max(d, 0);
}
function rayIntersectsGround(atmosphere, r, mu) {
  const { bottomRadius } = atmosphere;
  return mu < 0 && r ** 2 * (mu ** 2 - 1) + bottomRadius ** 2 >= 0;
}
function distanceToTopAtmosphereBoundary(atmosphere, r, mu) {
  const { topRadius } = atmosphere;
  const discriminant = r ** 2 * (mu ** 2 - 1) + topRadius ** 2;
  return clampDistance(-r * mu + safeSqrt(discriminant));
}
function getTextureCoordFromUnitRange(x, textureSize) {
  return 0.5 / textureSize + x * (1 - 1 / textureSize);
}

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/helpers/sampleTexture.ts
import { HalfFloatType as HalfFloatType3, Vector3 as Vector313 } from "https://esm.sh/three@0.185.1?external";
var vectorScratch14 = /* @__PURE__ */ new Vector313();
var vectorScratch24 = /* @__PURE__ */ new Vector313();
var vectorScratch32 = /* @__PURE__ */ new Vector313();
function samplePixel(data, index, result) {
  const dataIndex = index * 4;
  return result.set(data[dataIndex], data[dataIndex + 1], data[dataIndex + 2]);
}
function sampleTexture(texture, uv, result) {
  const { width, height } = texture.image;
  invariant(isTypedArray(texture.image.data));
  let data = texture.image.data;
  if (texture.type === HalfFloatType3 && data instanceof Uint16Array) {
    data = new Float16Array(data.buffer);
  }
  const x = clamp(uv.x, 0, 1) * (width - 1);
  const y = clamp(uv.y, 0, 1) * (height - 1);
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const tx = x - xi;
  const ty = y - yi;
  const sx = tx;
  const sy = ty;
  const rx0 = xi % width;
  const rx1 = (rx0 + 1) % width;
  const ry0 = yi % height;
  const ry1 = (ry0 + 1) % height;
  const v00 = samplePixel(data, ry0 * width + rx0, vectorScratch14);
  const v10 = samplePixel(data, ry0 * width + rx1, vectorScratch24);
  const nx0 = v00.lerp(v10, sx);
  const v01 = samplePixel(data, ry1 * width + rx0, vectorScratch24);
  const v11 = samplePixel(data, ry1 * width + rx1, vectorScratch32);
  const nx1 = v01.lerp(v11, sx);
  return result.copy(nx0.lerp(nx1, sy));
}

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/getSunLightColor.ts
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
var vectorScratch15 = /* @__PURE__ */ new Vector314();
var vectorScratch25 = /* @__PURE__ */ new Vector314();
var uvScratch = /* @__PURE__ */ new Vector23();
function getSunLightColor(transmittanceTexture, worldPosition, sunDirection, result = new Color2(), {
  ellipsoid = Ellipsoid.WGS84,
  correctAltitude = true,
  photometric = true
} = {}, atmosphere = AtmosphereParameters.DEFAULT) {
  const camera = vectorScratch15.copy(worldPosition);
  if (correctAltitude) {
    const surfacePosition = ellipsoid.projectOnSurface(
      worldPosition,
      vectorScratch25
    );
    if (surfacePosition != null) {
      camera.sub(
        ellipsoid.getOsculatingSphereCenter(
          surfacePosition,
          atmosphere.bottomRadius,
          vectorScratch25
        )
      );
    }
  }
  const transmittance = vectorScratch25;
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

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/IrradianceMaskPass.ts
import {
  ClearPass,
  DepthCopyPass,
  DepthMaskMaterial,
  DepthTestStrategy,
  Pass,
  RenderPass,
  Selection,
  ShaderPass
} from "https://esm.sh/postprocessing@6.37.4?deps=three@0.185.1&external=three";
import {
  BasicDepthPacking,
  Color as Color3,
  DepthTexture,
  LessEqualDepth,
  MeshBasicMaterial,
  RedFormat as RedFormat3,
  RGBADepthPacking,
  Uniform as Uniform3,
  UnsignedIntType as UnsignedIntType2,
  WebGLRenderTarget
} from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/shaders/irradianceMask.frag
var irradianceMask_default = '// Based on: https://github.com/pmndrs/postprocessing/blob/v6.37.4/src/materials/glsl/depth-mask.frag\n\n#include <common>\n#include <packing>\n\n#include "core/depth"\n\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nuniform highp sampler2D depthBuffer0;\nuniform highp sampler2D depthBuffer1;\n#else // GL_FRAGMENT_PRECISION_HIGH\nuniform mediump sampler2D depthBuffer0;\nuniform mediump sampler2D depthBuffer1;\n#endif // GL_FRAGMENT_PRECISION_HIGH\n\nuniform sampler2D inputBuffer;\nuniform vec2 cameraNearFar;\nuniform bool inverted;\n\nfloat getViewZ(const float depth) {\n  #ifdef PERSPECTIVE_CAMERA\n  return perspectiveDepthToViewZ(depth, cameraNearFar.x, cameraNearFar.y);\n  #else // PERSPECTIVE_CAMERA\n  return orthographicDepthToViewZ(depth, cameraNearFar.x, cameraNearFar.y);\n  #endif // PERSPECTIVE_CAMERA\n}\n\nvarying vec2 vUv;\n\nvoid main() {\n  vec2 depth;\n\n  #if DEPTH_PACKING_0 == 3201\n  depth.x = unpackRGBAToDepth(texture2D(depthBuffer0, vUv));\n  #else // DEPTH_PACKING_0 == 3201\n  depth.x = reverseLogDepth(texture2D(depthBuffer0, vUv).r, cameraNearFar.x, cameraNearFar.y);\n  #endif // DEPTH_PACKING_0 == 3201\n\n  #if DEPTH_PACKING_1 == 3201\n  depth.y = unpackRGBAToDepth(texture2D(depthBuffer1, vUv));\n  #else // DEPTH_PACKING_1 == 3201\n  depth.y = reverseLogDepth(texture2D(depthBuffer1, vUv).r, cameraNearFar.x, cameraNearFar.y);\n  #endif // DEPTH_PACKING_1 == 3201\n\n  bool isMaxDepth = depth.x == 1.0;\n\n  #ifdef PERSPECTIVE_CAMERA\n  depth.x = viewZToOrthographicDepth(getViewZ(depth.x), cameraNearFar.x, cameraNearFar.y);\n  depth.y = viewZToOrthographicDepth(getViewZ(depth.y), cameraNearFar.x, cameraNearFar.y);\n  #endif // PERSPECTIVE_CAMERA\n\n  #if DEPTH_TEST_STRATEGY == 0\n  // Decide based on depth test.\n  bool keep = depthTest(depth.x, depth.y);\n\n  #elif DEPTH_TEST_STRATEGY == 1\n  // Always keep max depth.\n  bool keep = isMaxDepth || depthTest(depth.x, depth.y);\n\n  #else // DEPTH_TEST_STRATEGY\n  // Always discard max depth.\n  bool keep = !isMaxDepth && depthTest(depth.x, depth.y);\n\n  #endif // DEPTH_TEST_STRATEGY\n\n  if (inverted) {\n    keep = !keep;\n  }\n  if (keep) {\n    gl_FragColor = texture2D(inputBuffer, vUv);\n  } else {\n    discard;\n  }\n}\n';

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/IrradianceMaskPass.ts
var IrradianceMaskPass = class extends Pass {
  renderPass;
  depthTexture;
  renderTarget;
  depthCopyPass0;
  depthCopyPass1;
  clearPass;
  depthMaskMaterial;
  depthMaskPass;
  selection = new Selection();
  constructor(scene, camera) {
    super("IrradianceMaskPass");
    this.needsSwap = false;
    this.needsDepthTexture = true;
    this.renderPass = new RenderPass(scene, camera, new MeshBasicMaterial());
    this.renderPass.ignoreBackground = true;
    this.renderPass.skipShadowMapUpdate = true;
    this.renderPass.selection = this.selection;
    this.depthTexture = new DepthTexture(1, 1, UnsignedIntType2);
    this.renderTarget = new WebGLRenderTarget(1, 1, {
      format: RedFormat3,
      depthTexture: this.depthTexture
    });
    this.depthCopyPass0 = new DepthCopyPass({ depthPacking: RGBADepthPacking });
    this.depthCopyPass1 = new DepthCopyPass({ depthPacking: RGBADepthPacking });
    this.clearPass = new ClearPass(true, false, false);
    this.clearPass.overrideClearColor = new Color3(16777215);
    this.clearPass.overrideClearAlpha = 1;
    const depthMaskMaterial = new DepthMaskMaterial();
    depthMaskMaterial.fragmentShader = resolveIncludes(irradianceMask_default, {
      core: { depth }
    });
    depthMaskMaterial.uniforms.inverted = new Uniform3(false);
    depthMaskMaterial.copyCameraSettings(camera);
    depthMaskMaterial.depthBuffer0 = this.depthCopyPass0.texture;
    depthMaskMaterial.depthPacking0 = RGBADepthPacking;
    depthMaskMaterial.depthBuffer1 = this.depthCopyPass1.texture;
    depthMaskMaterial.depthPacking1 = RGBADepthPacking;
    depthMaskMaterial.depthMode = LessEqualDepth;
    depthMaskMaterial.maxDepthStrategy = DepthTestStrategy.DISCARD_MAX_DEPTH;
    this.depthMaskMaterial = depthMaskMaterial;
    this.depthMaskPass = new ShaderPass(depthMaskMaterial);
  }
  // eslint-disable-next-line accessor-pairs
  set mainScene(value) {
    this.renderPass.mainScene = value;
  }
  // eslint-disable-next-line accessor-pairs
  set mainCamera(value) {
    this.renderPass.mainCamera = value;
    this.depthMaskMaterial.copyCameraSettings(value);
  }
  initialize(renderer, alpha, frameBufferType) {
    this.renderPass.initialize(renderer, alpha, frameBufferType);
    this.clearPass.initialize(renderer, alpha, frameBufferType);
    this.depthMaskPass.initialize(renderer, alpha, frameBufferType);
  }
  setDepthTexture(depthTexture, depthPacking = BasicDepthPacking) {
    this.depthCopyPass0.setDepthTexture(depthTexture, depthPacking);
    this.depthCopyPass1.setDepthTexture(this.depthTexture, depthPacking);
  }
  render(renderer, inputBuffer, outputBuffer, deltaTime, stencilTest) {
    const autoClear = renderer.autoClear;
    renderer.autoClear = false;
    this.depthCopyPass0.render(renderer, null, null);
    this.renderPass.render(renderer, this.renderTarget, null);
    this.depthCopyPass1.render(renderer, null, null);
    this.clearPass.render(renderer, this.renderTarget, null);
    this.depthMaskPass.render(renderer, null, this.renderTarget);
    renderer.autoClear = autoClear;
  }
  setSize(width, height) {
    this.renderTarget.setSize(width, height);
    this.depthCopyPass0.setSize(width, height);
    this.depthCopyPass1.setSize(width, height);
  }
  get texture() {
    return this.renderTarget.texture;
  }
  get selectionLayer() {
    return this.selection.layer;
  }
  set selectionLayer(value) {
    this.selection.layer = value;
  }
  get inverted() {
    return this.depthMaskMaterial.uniforms.inverted.value;
  }
  set inverted(value) {
    this.depthMaskMaterial.uniforms.inverted.value = value;
  }
};

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/PrecomputedTexturesLoader.ts
import {
  FloatType as FloatType3,
  HalfFloatType as HalfFloatType4,
  LinearFilter as LinearFilter3,
  Loader as Loader5
} from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/vendor/url-join.ts
function normalize2(parts) {
  if (parts.length === 0) return "";
  const result = [];
  for (let index = 0; index < parts.length; index += 1) {
    let part = parts[index];
    if (typeof part !== "string") {
      throw new TypeError(`Url must be a string. Received ${part}`);
    }
    if (part === "") continue;
    if (index > 0) part = part.replace(/^[\/]+/, "");
    if (index < parts.length - 1) {
      part = part.replace(/[\/]+$/, "");
    } else {
      part = part.replace(/[\/]+$/, "/");
    }
    result.push(part);
  }
  return result.join("/").replace(/\/(\?|&|#[^!])/g, "$1");
}
function urlJoin(...parts) {
  return normalize2(parts);
}

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/PrecomputedTexturesLoader.ts
var PrecomputedTexturesLoader = class extends Loader5 {
  format = "exr";
  type = HalfFloatType4;
  setTypeFromRenderer(renderer) {
    this.type = renderer.getContext().getExtension("OES_texture_float_linear") == null ? HalfFloatType4 : FloatType3;
    return this;
  }
  load(url, onLoad, onProgress, onError) {
    const result = {};
    const loadTexture = (name, { loader, extension }) => {
      loader.setRequestHeader(this.requestHeader);
      loader.setPath(this.path);
      loader.setWithCredentials(this.withCredentials);
      loader.load(
        urlJoin(url, `${name}${extension}`),
        (texture) => {
          texture.minFilter = LinearFilter3;
          texture.magFilter = LinearFilter3;
          texture.type = this.type;
          if (this.type === FloatType3) {
            texture.image.data = new Float32Array(
              new Float16Array(texture.image.data.buffer)
            );
          }
          result[`${name}Texture`] = texture;
          if (result.irradianceTexture != null && result.scatteringTexture != null && result.transmittanceTexture != null) {
            onLoad(result);
          }
        },
        onProgress,
        onError
      );
    };
    if (this.format === "exr") {
      loadTexture("irradiance", {
        loader: new EXRLoader(this.manager),
        extension: ".exr"
      });
      loadTexture("scattering", {
        loader: new EXR3DLoader(this.manager).setDepth(
          SCATTERING_TEXTURE_DEPTH
        ),
        extension: ".exr"
      });
      loadTexture("transmittance", {
        loader: new EXRLoader(this.manager),
        extension: ".exr"
      });
    } else {
      loadTexture("irradiance", {
        loader: createDataTextureLoader(parseFloat16Array, {
          width: IRRADIANCE_TEXTURE_WIDTH,
          height: IRRADIANCE_TEXTURE_HEIGHT
        }),
        extension: ".bin"
      });
      loadTexture("scattering", {
        loader: createData3DTextureLoader(parseFloat16Array, {
          width: SCATTERING_TEXTURE_WIDTH,
          height: SCATTERING_TEXTURE_HEIGHT,
          depth: SCATTERING_TEXTURE_DEPTH
        }),
        extension: ".bin"
      });
      loadTexture("transmittance", {
        loader: createDataTextureLoader(parseFloat16Array, {
          width: TRANSMITTANCE_TEXTURE_WIDTH,
          height: TRANSMITTANCE_TEXTURE_HEIGHT
        }),
        extension: ".bin"
      });
    }
  }
};

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/SkyLightProbe.ts
import { LightProbe, Matrix4 as Matrix46, Vector2 as Vector24, Vector3 as Vector315 } from "https://esm.sh/three@0.185.1?external";
function getUvFromRMuS({ topRadius, bottomRadius }, r, muS, result) {
  const xR = (r - bottomRadius) / (topRadius - bottomRadius);
  const xMuS = muS * 0.5 + 0.5;
  return result.set(
    getTextureCoordFromUnitRange(xMuS, IRRADIANCE_TEXTURE_WIDTH),
    getTextureCoordFromUnitRange(xR, IRRADIANCE_TEXTURE_HEIGHT)
  );
}
var L0_COEFF = 1 / Math.sqrt(Math.PI);
var L1_COEFF = Math.sqrt(3) / (2 * Math.sqrt(Math.PI));
var vectorScratch16 = /* @__PURE__ */ new Vector315();
var vectorScratch26 = /* @__PURE__ */ new Vector315();
var uvScratch2 = /* @__PURE__ */ new Vector24();
var matrixScratch2 = /* @__PURE__ */ new Matrix46();
var skyLightProbeParametersDefaults = {
  ellipsoid: Ellipsoid.WGS84,
  correctAltitude: true,
  photometric: true
};
var SkyLightProbe = class extends LightProbe {
  constructor(params, atmosphere = AtmosphereParameters.DEFAULT) {
    super();
    this.atmosphere = atmosphere;
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
    this.sunDirection = sunDirection?.clone() ?? new Vector315();
  }
  irradianceTexture;
  ellipsoid;
  ellipsoidCenter = new Vector315();
  ellipsoidMatrix = new Matrix46();
  correctAltitude;
  photometric;
  sunDirection;
  update() {
    if (this.irradianceTexture == null) {
      return;
    }
    const inverseEllipsoidMatrix = matrixScratch2.copy(this.ellipsoidMatrix).invert();
    const cameraPosition = this.getWorldPosition(vectorScratch16);
    const cameraPositionECEF = cameraPosition.applyMatrix4(inverseEllipsoidMatrix).sub(this.ellipsoidCenter);
    if (this.correctAltitude) {
      const surfacePosition = this.ellipsoid.projectOnSurface(
        cameraPositionECEF,
        vectorScratch26
      );
      if (surfacePosition != null) {
        cameraPositionECEF.sub(
          getAltitudeCorrectionOffset(
            surfacePosition,
            this.atmosphere.bottomRadius,
            this.ellipsoid,
            vectorScratch26
          )
        );
      }
    }
    const r = cameraPositionECEF.length();
    const muS = cameraPositionECEF.dot(this.sunDirection) / r;
    const uv = getUvFromRMuS(this.atmosphere, r, muS, uvScratch2);
    const irradiance = sampleTexture(this.irradianceTexture, uv, vectorScratch26);
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
};

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/SkyMaterial.ts
import {
  Color as Color4,
  GLSL3,
  Matrix4 as Matrix47,
  Uniform as Uniform4,
  Vector3 as Vector316
} from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/shaders/sky.frag
var sky_default2 = 'precision highp float;\nprecision highp sampler3D;\n\n#define RECIPROCAL_PI (0.3183098861837907)\n\n#include "core/raySphereIntersection"\n#include "parameters"\n#include "functions"\n#include "sky"\n\nuniform vec3 sunDirection;\nuniform vec3 moonDirection;\nuniform float moonAngularRadius;\nuniform float lunarRadianceScale;\nuniform vec3 groundAlbedo;\n\n#ifdef HAS_SHADOW_LENGTH\nuniform sampler2D shadowLengthBuffer;\n#endif // HAS_SHADOW_LENGTH\n\nin vec2 vUv;\nin vec3 vCameraPosition;\nin vec3 vRayDirection;\nin vec3 vEllipsoidCenter;\n\nlayout(location = 0) out vec4 outputColor;\n\n#include <mrt_layout>\n\nbool rayIntersectsGround(const vec3 cameraPosition, const vec3 rayDirection) {\n  float r = length(cameraPosition);\n  float mu = dot(cameraPosition, rayDirection) / r;\n  return mu < 0.0 && r * r * (mu * mu - 1.0) + u_bottom_radius * u_bottom_radius >= 0.0;\n}\n\nvoid main() {\n  float shadowLength = 0.0;\n  #ifdef HAS_SHADOW_LENGTH\n  shadowLength = texture(shadowLengthBuffer, vUv).r;\n  #endif // HAS_SHADOW_LENGTH\n\n  vec3 cameraPosition = vCameraPosition - vEllipsoidCenter;\n  vec3 rayDirection = normalize(vRayDirection);\n\n  #ifdef GROUND_ALBEDO\n\n  bool intersectsGround = rayIntersectsGround(cameraPosition, rayDirection);\n  if (intersectsGround) {\n    float distanceToGround = raySphereFirstIntersection(\n      cameraPosition,\n      rayDirection,\n      u_bottom_radius\n    );\n    vec3 groundPosition = rayDirection * distanceToGround + cameraPosition;\n    vec3 surfaceNormal = normalize(groundPosition);\n    vec3 skyIrradiance;\n    vec3 sunIrradiance = GetSunAndSkyIrradiance(\n      cameraPosition,\n      surfaceNormal,\n      sunDirection,\n      skyIrradiance\n    );\n    vec3 transmittance;\n    vec3 inscatter = GetSkyRadianceToPoint(\n      cameraPosition,\n      u_bottom_radius * surfaceNormal,\n      shadowLength,\n      sunDirection,\n      transmittance\n    );\n    vec3 radiance = groundAlbedo * RECIPROCAL_PI * (sunIrradiance + skyIrradiance);\n    outputColor.rgb = radiance * transmittance + inscatter;\n  } else {\n    outputColor.rgb = getSkyRadiance(\n      cameraPosition,\n      rayDirection,\n      shadowLength,\n      sunDirection,\n      moonDirection,\n      moonAngularRadius,\n      lunarRadianceScale\n    );\n  }\n\n  #else // GROUND_ALBEDO\n\n  outputColor.rgb = getSkyRadiance(\n    cameraPosition,\n    rayDirection,\n    shadowLength,\n    sunDirection,\n    moonDirection,\n    moonAngularRadius,\n    lunarRadianceScale\n  );\n\n  #endif // GROUND_ALBEDO\n\n  outputColor.a = 1.0;\n\n  #include <mrt_output>\n}\n';

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/shaders/sky.vert
var sky_default3 = 'precision highp float;\nprecision highp sampler3D;\n\n#include "parameters"\n\nuniform mat4 inverseProjectionMatrix;\nuniform mat4 inverseViewMatrix;\nuniform vec3 cameraPosition;\nuniform vec3 ellipsoidCenter;\nuniform mat4 inverseEllipsoidMatrix;\nuniform vec3 altitudeCorrection;\n\nlayout(location = 0) in vec3 position;\n\nout vec2 vUv;\nout vec3 vCameraPosition;\nout vec3 vRayDirection;\nout vec3 vEllipsoidCenter;\n\nvoid getCameraRay(out vec3 origin, out vec3 direction) {\n  bool isPerspective = inverseProjectionMatrix[2][3] != 0.0; // 4th entry in the 3rd column\n\n  if (isPerspective) {\n    // Calculate the camera ray for a perspective camera.\n    vec4 viewPosition = inverseProjectionMatrix * vec4(position, 1.0);\n    vec4 worldDirection = inverseViewMatrix * vec4(viewPosition.xyz, 0.0);\n    origin = cameraPosition;\n    direction = worldDirection.xyz;\n  } else {\n    // Unprojected points to calculate direction.\n    vec4 nearPoint = inverseProjectionMatrix * vec4(position.xy, -1.0, 1.0);\n    vec4 farPoint = inverseProjectionMatrix * vec4(position.xy, -0.9, 1.0);\n    nearPoint /= nearPoint.w;\n    farPoint /= farPoint.w;\n\n    // Calculate world values\n    vec4 worldDirection = inverseViewMatrix * vec4(farPoint.xyz - nearPoint.xyz, 0.0);\n    vec4 worldOrigin = inverseViewMatrix * nearPoint;\n\n    // Outputs\n    direction = worldDirection.xyz;\n    origin = worldOrigin.xyz;\n  }\n}\n\nvoid main() {\n  vUv = position.xy * 0.5 + 0.5;\n\n  vec3 direction, origin;\n  getCameraRay(origin, direction);\n\n  mat3 rotation = mat3(inverseEllipsoidMatrix);\n  vCameraPosition = rotation * origin.xyz * METER_TO_LENGTH_UNIT;\n  vRayDirection = rotation * direction.xyz;\n  vEllipsoidCenter = (ellipsoidCenter + altitudeCorrection) * METER_TO_LENGTH_UNIT;\n\n  gl_Position = vec4(position.xy, 1.0, 1.0);\n}\n';

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/SkyMaterial.ts
var skyMaterialParametersDefaults = {
  ...atmosphereMaterialParametersBaseDefaults,
  sun: true,
  moon: true,
  moonAngularRadius: 45e-4,
  // ≈ 15.5 arcminutes
  lunarRadianceScale: 1,
  groundAlbedo: new Color4(0)
};
var _moon_dec2, _sun_dec2, _a3, _init3;
var SkyMaterial = class extends (_a3 = AtmosphereMaterialBase, _sun_dec2 = [define("SUN")], _moon_dec2 = [define("MOON")], _a3) {
  constructor(params) {
    const {
      sun,
      moon,
      moonDirection,
      moonAngularRadius,
      lunarRadianceScale,
      groundAlbedo,
      ...others
    } = { ...skyMaterialParametersDefaults, ...params };
    super({
      name: "SkyMaterial",
      glslVersion: GLSL3,
      vertexShader: resolveIncludes(sky_default3, {
        parameters: parameters_default
      }),
      fragmentShader: resolveIncludes(sky_default2, {
        core: { raySphereIntersection },
        parameters: parameters_default,
        functions: functions_default,
        sky: sky_default
      }),
      ...others,
      uniforms: {
        inverseProjectionMatrix: new Uniform4(new Matrix47()),
        inverseViewMatrix: new Uniform4(new Matrix47()),
        moonDirection: new Uniform4(moonDirection?.clone() ?? new Vector316()),
        moonAngularRadius: new Uniform4(moonAngularRadius),
        lunarRadianceScale: new Uniform4(lunarRadianceScale),
        groundAlbedo: new Uniform4(groundAlbedo?.clone() ?? new Color4(0)),
        shadowLengthBuffer: new Uniform4(null),
        ...others.uniforms
      },
      defines: {
        PERSPECTIVE_CAMERA: "1"
      },
      depthTest: true
    });
    __publicField(this, "shadowLength", null);
    __publicField(this, "sun", __runInitializers(_init3, 8, this)), __runInitializers(_init3, 11, this);
    __publicField(this, "moon", __runInitializers(_init3, 12, this)), __runInitializers(_init3, 15, this);
    this.sun = sun;
    this.moon = moon;
  }
  onBeforeRender(renderer, scene, camera, geometry, object, group) {
    super.onBeforeRender(renderer, scene, camera, geometry, object, group);
    const { uniforms, defines } = this;
    uniforms.inverseProjectionMatrix.value.copy(camera.projectionMatrixInverse);
    uniforms.inverseViewMatrix.value.copy(camera.matrixWorld);
    const prevPerspectiveCamera = defines.PERSPECTIVE_CAMERA != null;
    const nextPerspectiveCamera = camera.isPerspectiveCamera === true;
    if (nextPerspectiveCamera !== prevPerspectiveCamera) {
      if (nextPerspectiveCamera) {
        defines.PERSPECTIVE_CAMERA = "1";
      } else {
        delete defines.PERSPECTIVE_CAMERA;
      }
      this.needsUpdate = true;
    }
    const color = this.groundAlbedo;
    const prevGroundAlbedo = defines.GROUND_ALBEDO != null;
    const nextGroundAlbedo = color.r !== 0 || color.g !== 0 || color.b !== 0;
    if (nextGroundAlbedo !== prevGroundAlbedo) {
      if (nextGroundAlbedo) {
        this.defines.GROUND_ALBEDO = "1";
      } else {
        delete this.defines.GROUND_ALBEDO;
      }
      this.needsUpdate = true;
    }
    const shadowLength = this.shadowLength;
    const prevShadowLength = defines.HAS_SHADOW_LENGTH != null;
    const nextShadowLength = shadowLength != null;
    if (nextShadowLength !== prevShadowLength) {
      if (nextShadowLength) {
        defines.HAS_SHADOW_LENGTH = "1";
      } else {
        delete defines.HAS_SHADOW_LENGTH;
        uniforms.shadowLengthBuffer.value = null;
      }
      this.needsUpdate = true;
    }
    if (nextShadowLength) {
      uniforms.shadowLengthBuffer.value = shadowLength.map;
    }
  }
  get moonDirection() {
    return this.uniforms.moonDirection.value;
  }
  get moonAngularRadius() {
    return this.uniforms.moonAngularRadius.value;
  }
  set moonAngularRadius(value) {
    this.uniforms.moonAngularRadius.value = value;
  }
  get lunarRadianceScale() {
    return this.uniforms.lunarRadianceScale.value;
  }
  set lunarRadianceScale(value) {
    this.uniforms.lunarRadianceScale.value = value;
  }
  get groundAlbedo() {
    return this.uniforms.groundAlbedo.value;
  }
};
_init3 = __decoratorStart(_a3);
__decorateElement(_init3, 5, "sun", _sun_dec2, SkyMaterial);
__decorateElement(_init3, 5, "moon", _moon_dec2, SkyMaterial);
__decoratorMetadata(_init3, SkyMaterial);

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/StarsGeometry.ts
import {
  BufferGeometry as BufferGeometry3,
  InterleavedBuffer,
  InterleavedBufferAttribute,
  Sphere as Sphere2,
  Vector3 as Vector317
} from "https://esm.sh/three@0.185.1?external";
var StarsGeometry = class extends BufferGeometry3 {
  constructor(data) {
    super();
    const int16Array = new Int16Array(data);
    const uint8Array = new Uint8Array(data);
    const int16Buffer = new InterleavedBuffer(int16Array, 5);
    const uint8Buffer = new InterleavedBuffer(uint8Array, 10);
    this.setAttribute(
      "position",
      new InterleavedBufferAttribute(int16Buffer, 3, 0, true)
    );
    this.setAttribute(
      "magnitude",
      new InterleavedBufferAttribute(uint8Buffer, 1, 6, true)
    );
    this.setAttribute(
      "color",
      new InterleavedBufferAttribute(uint8Buffer, 3, 7, true)
    );
    this.boundingSphere = new Sphere2(new Vector317(), 1);
  }
};

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/StarsMaterial.ts
import {
  GLSL3 as GLSL32,
  Matrix4 as Matrix48,
  Uniform as Uniform5,
  Vector2 as Vector25
} from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/shaders/stars.frag
var stars_default = `precision highp float;
precision highp sampler3D;

#include "parameters"
#include "functions"

uniform vec3 sunDirection;

in vec3 vCameraPosition;
in vec3 vRayDirection;
in vec3 vEllipsoidCenter;

layout(location = 0) out vec4 outputColor;

#include <mrt_layout>

in vec3 vColor;

void main() {
  #if !defined(PERSPECTIVE_CAMERA)
  outputColor = vec4(0.0);
  discard; // Rendering celestial objects without perspective doesn't make sense.
  #endif // !defined(PERSPECTIVE_CAMERA)

  #ifdef BACKGROUND
  vec3 cameraPosition = vCameraPosition - vEllipsoidCenter;
  vec3 rayDirection = normalize(vRayDirection);
  float r = length(cameraPosition);
  float mu = dot(cameraPosition, rayDirection) / r;

  if (RayIntersectsGround(r, mu)) {
    discard;
  }

  vec3 transmittance;
  vec3 radiance = GetSkyRadiance(
    vCameraPosition - vEllipsoidCenter,
    normalize(vRayDirection),
    0.0,
    sunDirection,
    transmittance
  );
  radiance += transmittance * vColor;
  outputColor = vec4(radiance, 1.0);
  #else // BACKGROUND
  outputColor = vec4(vColor, 1.0);
  #endif // BACKGROUND

  #include <mrt_output>
}
`;

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/shaders/stars.vert
var stars_default2 = 'precision highp float;\nprecision highp sampler3D;\n\n#include "parameters"\n\n#define saturate(x) clamp(x, 0.0, 1.0)\n\nuniform mat4 projectionMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 viewMatrix;\nuniform mat4 matrixWorld;\nuniform vec3 cameraPosition;\nuniform float cameraFar;\nuniform vec3 ellipsoidCenter;\nuniform mat4 inverseEllipsoidMatrix;\nuniform vec3 altitudeCorrection;\nuniform float pointSize;\nuniform vec2 magnitudeRange;\nuniform float radianceScale;\n\nlayout(location = 0) in vec3 position;\nlayout(location = 1) in float magnitude;\nlayout(location = 2) in vec3 color;\n\nout vec3 vCameraPosition;\nout vec3 vRayDirection;\nout vec3 vEllipsoidCenter;\nout vec3 vColor;\n\nvoid main() {\n  // Magnitude is stored between 0 to 1 within the given range.\n  float m = mix(magnitudeRange.x, magnitudeRange.y, magnitude);\n  vec3 v = pow(vec3(10.0), -vec3(magnitudeRange, m) / 2.5);\n  vColor = vec3(radianceScale * color);\n  vColor *= saturate((v.z - v.y) / (v.x - v.y));\n\n  #ifdef BACKGROUND\n  vec3 worldDirection = normalize(matrixWorld * vec4(position, 1.0)).xyz;\n  mat3 rotation = mat3(inverseEllipsoidMatrix);\n  vCameraPosition = rotation * cameraPosition * METER_TO_LENGTH_UNIT;\n  vRayDirection = rotation * worldDirection;\n  vEllipsoidCenter = (ellipsoidCenter + altitudeCorrection) * METER_TO_LENGTH_UNIT;\n  gl_Position =\n    projectionMatrix * viewMatrix * vec4(cameraPosition + worldDirection * cameraFar, 1.0);\n  #else // BACKGROUND\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n  #endif // BACKGROUND\n\n  gl_PointSize = pointSize;\n}\n';

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/StarsMaterial.ts
var starsMaterialParametersDefaults = {
  ...atmosphereMaterialParametersBaseDefaults,
  pointSize: 1,
  radianceScale: 1,
  background: true
};
var _background_dec, _a4, _init4;
var StarsMaterial = class extends (_a4 = AtmosphereMaterialBase, _background_dec = [define("BACKGROUND")], _a4) {
  constructor(params) {
    const { pointSize, radianceScale, background, ...others } = {
      ...starsMaterialParametersDefaults,
      ...params
    };
    super({
      name: "StarsMaterial",
      glslVersion: GLSL32,
      vertexShader: resolveIncludes(stars_default2, {
        parameters: parameters_default
      }),
      fragmentShader: resolveIncludes(stars_default, {
        parameters: parameters_default,
        functions: functions_default
      }),
      ...others,
      uniforms: {
        projectionMatrix: new Uniform5(new Matrix48()),
        modelViewMatrix: new Uniform5(new Matrix48()),
        viewMatrix: new Uniform5(new Matrix48()),
        matrixWorld: new Uniform5(new Matrix48()),
        cameraFar: new Uniform5(0),
        pointSize: new Uniform5(0),
        magnitudeRange: new Uniform5(new Vector25(-2, 8)),
        radianceScale: new Uniform5(radianceScale),
        ...others.uniforms
      },
      defines: {
        PERSPECTIVE_CAMERA: "1"
      }
    });
    __publicField(this, "pointSize");
    __publicField(this, "background", __runInitializers(_init4, 8, this)), __runInitializers(_init4, 11, this);
    this.pointSize = pointSize;
    this.background = background;
  }
  onBeforeRender(renderer, scene, camera, geometry, object, group) {
    super.onBeforeRender(renderer, scene, camera, geometry, object, group);
    const uniforms = this.uniforms;
    uniforms.projectionMatrix.value.copy(camera.projectionMatrix);
    uniforms.modelViewMatrix.value.copy(camera.modelViewMatrix);
    uniforms.viewMatrix.value.copy(camera.matrixWorldInverse);
    uniforms.matrixWorld.value.copy(object.matrixWorld);
    uniforms.cameraFar.value = camera.far;
    uniforms.pointSize.value = this.pointSize * renderer.getPixelRatio();
    const isPerspectiveCamera = camera.isPerspectiveCamera === true;
    if (this.defines.PERSPECTIVE_CAMERA != null !== isPerspectiveCamera) {
      if (isPerspectiveCamera) {
        this.defines.PERSPECTIVE_CAMERA = "1";
      } else {
        delete this.defines.PERSPECTIVE_CAMERA;
      }
      this.needsUpdate = true;
    }
  }
  get magnitudeRange() {
    return this.uniforms.magnitudeRange.value;
  }
  get radianceScale() {
    return this.uniforms.radianceScale.value;
  }
  set radianceScale(value) {
    this.uniforms.radianceScale.value = value;
  }
};
_init4 = __decoratorStart(_a4);
__decorateElement(_init4, 5, "background", _background_dec, StarsMaterial);
__decoratorMetadata(_init4, StarsMaterial);

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/SunDirectionalLight.ts
import { DirectionalLight, Matrix4 as Matrix49, Vector3 as Vector318 } from "https://esm.sh/three@0.185.1?external";
var vectorScratch7 = /* @__PURE__ */ new Vector318();
var matrixScratch3 = /* @__PURE__ */ new Matrix49();
var sunDirectionalLightParametersDefaults = {
  ellipsoid: Ellipsoid.WGS84,
  correctAltitude: true,
  photometric: true,
  distance: 1
};
var SunDirectionalLight = class extends DirectionalLight {
  constructor(params, atmosphere = AtmosphereParameters.DEFAULT) {
    super();
    this.atmosphere = atmosphere;
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
    this.sunDirection = sunDirection?.clone() ?? new Vector318();
    this.distance = distance;
  }
  transmittanceTexture;
  ellipsoid;
  ellipsoidCenter = new Vector318();
  ellipsoidMatrix = new Matrix49();
  correctAltitude;
  photometric;
  sunDirection;
  distance;
  update() {
    this.position.copy(this.sunDirection).applyMatrix4(this.ellipsoidMatrix).normalize().multiplyScalar(this.distance).add(this.target.position);
    if (this.transmittanceTexture == null) {
      return;
    }
    const inverseEllipsoidMatrix = matrixScratch3.copy(this.ellipsoidMatrix).invert();
    const cameraPositionECEF = this.target.getWorldPosition(vectorScratch7).applyMatrix4(inverseEllipsoidMatrix).sub(this.ellipsoidCenter);
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
};
export {
  AerialPerspectiveEffect,
  AtmosphereMaterialBase,
  AtmosphereParameters,
  DEFAULT_PRECOMPUTED_TEXTURES_URL,
  DEFAULT_STARS_DATA_URL,
  IRRADIANCE_TEXTURE_HEIGHT,
  IRRADIANCE_TEXTURE_WIDTH,
  IrradianceMaskPass,
  METER_TO_LENGTH_UNIT,
  PrecomputedTexturesLoader,
  SCATTERING_TEXTURE_DEPTH,
  SCATTERING_TEXTURE_HEIGHT,
  SCATTERING_TEXTURE_MU_SIZE,
  SCATTERING_TEXTURE_MU_S_SIZE,
  SCATTERING_TEXTURE_NU_SIZE,
  SCATTERING_TEXTURE_R_SIZE,
  SCATTERING_TEXTURE_WIDTH,
  SKY_RENDER_ORDER,
  SkyLightProbe,
  SkyMaterial,
  StarsGeometry,
  StarsMaterial,
  SunDirectionalLight,
  TRANSMITTANCE_TEXTURE_HEIGHT,
  TRANSMITTANCE_TEXTURE_WIDTH,
  aerialPerspectiveEffectOptionsDefaults,
  atmosphereMaterialParametersBaseDefaults,
  convertBVIndexToLinearSRGBChromaticity,
  convertTemperatureToLinearSRGBChromaticity,
  getAltitudeCorrectionOffset,
  getECIToECEFRotationMatrix,
  getMoonDirectionECEF,
  getMoonDirectionECI,
  getSunDirectionECEF,
  getSunDirectionECI,
  getSunLightColor,
  skyLightProbeParametersDefaults,
  skyMaterialParametersDefaults,
  starsMaterialParametersDefaults,
  sunDirectionalLightParametersDefaults
};
