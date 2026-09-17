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

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/ShadowResolveMaterial.ts
import {
  GLSL3,
  RawShaderMaterial,
  Uniform,
  Vector2 as Vector23
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
    constructor() {
      super(...arguments);
      __publicField(this, "parseTypedArray", parser);
    }
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
  constructor() {
    super(...arguments);
    __publicField(this, "parameters", {});
  }
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
        const { width, height, depth, ...params } = this.parameters;
        if (width != null) {
          texture.image.width = width;
        }
        if (height != null) {
          texture.image.height = height;
        }
        if ("depth" in texture.image && depth != null) {
          texture.image.depth = depth;
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
    constructor() {
      super(...arguments);
      __publicField(this, "Texture", Texture);
      __publicField(this, "TypedArrayLoader", createTypedArrayLoaderClass(parser));
      __publicField(this, "parameters", {
        ...defaultDataTextureParameter,
        ...parameters
      });
    }
  };
}
function createData3DTextureLoaderClass(parser, parameters) {
  return createDataLoaderClass(Data3DTexture, parser, parameters);
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

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/decorators.ts
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
            this.defines ?? (this.defines = {});
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
var _Ellipsoid = class _Ellipsoid {
  constructor(x, y, z) {
    __publicField(this, "radii");
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
__publicField(_Ellipsoid, "WGS84", /* @__PURE__ */ new _Ellipsoid(
  6378137,
  6378137,
  6356752314245179e-9
));
var Ellipsoid = _Ellipsoid;

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/EllipsoidGeometry.ts
import { BufferAttribute as BufferAttribute2, BufferGeometry as BufferGeometry2, Vector3 as Vector34 } from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/EXR3DLoader.ts
import { Data3DTexture as Data3DTexture2, Loader as Loader4 } from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/Geodetic.ts
import { Vector3 as Vector35 } from "https://esm.sh/three@0.185.1?external";
var vectorScratch12 = /* @__PURE__ */ new Vector35();
var vectorScratch22 = /* @__PURE__ */ new Vector35();
var _Geodetic = class _Geodetic {
  constructor(longitude = 0, latitude = 0, height = 0) {
    this.longitude = longitude;
    this.latitude = latitude;
    this.height = height;
  }
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
__publicField(_Geodetic, "MIN_LONGITUDE", -Math.PI);
__publicField(_Geodetic, "MAX_LONGITUDE", Math.PI);
__publicField(_Geodetic, "MIN_LATITUDE", -Math.PI / 2);
__publicField(_Geodetic, "MAX_LATITUDE", Math.PI / 2);
var Geodetic = _Geodetic;

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/PointOfView.ts
import { Matrix4 as Matrix42, Quaternion, Ray, Vector3 as Vector36 } from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/Rectangle.ts
var _Rectangle = class _Rectangle {
  constructor(west = 0, south = 0, east = 0, north = 0) {
    this.west = west;
    this.south = south;
    this.east = east;
    this.north = north;
  }
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
__publicField(_Rectangle, "MAX", /* @__PURE__ */ new _Rectangle(
  Geodetic.MIN_LONGITUDE,
  Geodetic.MIN_LATITUDE,
  Geodetic.MAX_LONGITUDE,
  Geodetic.MAX_LATITUDE
));
var Rectangle = _Rectangle;

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
import { NearestFilter, RedFormat, RepeatWrapping } from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/typedArrayParsers.ts
import { Float16Array as Float16Array2, getFloat16 } from "https://esm.sh/@petamoriken/float16@3.9.2?external";
var parseUint8Array = (buffer) => new Uint8Array(buffer);

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/STBNLoader.ts
var STBNLoader = createData3DTextureLoaderClass(parseUint8Array, {
  format: RedFormat,
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

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/qualityPresets.ts
import { Vector2 as Vector22 } from "https://esm.sh/three@0.185.1?external";
var values = {
  resolutionScale: 1,
  lightShafts: true,
  shapeDetail: true,
  turbulence: true,
  haze: true,
  clouds: {
    multiScatteringOctaves: 8,
    accurateSunSkyIrradiance: true,
    accuratePhaseFunction: false,
    // Primary raymarch
    maxIterationCount: 500,
    minStepSize: 50,
    maxStepSize: 1e3,
    maxRayDistance: 2e5,
    perspectiveStepScale: 1.01,
    minDensity: 1e-5,
    minExtinction: 1e-5,
    minTransmittance: 0.01,
    // Secondary raymarch
    maxIterationCountToGround: 3,
    maxIterationCountToSun: 2,
    minSecondaryStepSize: 100,
    secondaryStepScale: 2,
    // Shadow length
    maxShadowLengthIterationCount: 500,
    minShadowLengthStepSize: 50,
    maxShadowLengthRayDistance: 2e5
  },
  shadow: {
    cascadeCount: 3,
    mapSize: /* @__PURE__ */ new Vector22(512, 512),
    // Primary raymarch
    maxIterationCount: 50,
    minStepSize: 100,
    maxStepSize: 1e3,
    minDensity: 1e-5,
    minExtinction: 1e-5,
    minTransmittance: 1e-4
  }
};
var defaults = values;
var qualityPresets = {
  // TODO: We cloud decrease multi-scattering octaves for lower quality presets,
  // but it leads to a loss of higher frequency scattering, making it darker
  // overall, which suggests the need for a fudge factor to scale the radiance.
  low: {
    ...defaults,
    lightShafts: false,
    // Expensive
    shapeDetail: false,
    // Expensive
    turbulence: false,
    // Expensive
    clouds: {
      ...defaults.clouds,
      accurateSunSkyIrradiance: false,
      // Greatly reduces texel reads.
      maxIterationCount: 200,
      minStepSize: 100,
      maxRayDistance: 1e5,
      minDensity: 1e-4,
      minExtinction: 1e-4,
      minTransmittance: 0.1,
      // Makes the primary march terminate earlier.
      maxIterationCountToGround: 0,
      // Expensive
      maxIterationCountToSun: 1
      // Only 1 march makes big difference
    },
    shadow: {
      ...defaults.shadow,
      maxIterationCount: 25,
      minDensity: 1e-4,
      minExtinction: 1e-4,
      minTransmittance: 0.01,
      // Makes the primary march terminate earlier.
      cascadeCount: 2,
      // Obvious
      mapSize: /* @__PURE__ */ new Vector22(256, 256)
      // Obvious
    }
  },
  medium: {
    ...defaults,
    lightShafts: false,
    // Expensive
    turbulence: false,
    // Expensive
    clouds: {
      ...defaults.clouds,
      minDensity: 1e-4,
      minExtinction: 1e-4,
      accurateSunSkyIrradiance: false,
      maxIterationCountToSun: 2,
      maxIterationCountToGround: 1
    },
    shadow: {
      ...defaults.shadow,
      minDensity: 1e-4,
      minExtinction: 1e-4,
      mapSize: /* @__PURE__ */ new Vector22(256, 256)
    }
  },
  high: defaults,
  // Consider high quality preset as default.
  ultra: {
    ...defaults,
    clouds: {
      ...defaults.clouds,
      minStepSize: 10
    },
    shadow: {
      ...defaults.shadow,
      mapSize: /* @__PURE__ */ new Vector22(1024, 1024)
    }
  }
};

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/shaders/shadowResolve.frag
var shadowResolve_default = 'precision highp float;\nprecision highp sampler2DArray;\n\n#define VARIANCE_9_SAMPLES (1)\n#define VARIANCE_SAMPLER_ARRAY (1)\n\n#include "varianceClipping"\n\nuniform sampler2DArray inputBuffer;\nuniform sampler2DArray historyBuffer;\n\nuniform vec2 texelSize;\nuniform float varianceGamma;\nuniform float temporalAlpha;\n\nin vec2 vUv;\n\nlayout(location = 0) out vec4 outputColor[CASCADE_COUNT];\n\nconst ivec2 neighborOffsets[9] = ivec2[9](\n  ivec2(-1, -1),\n  ivec2(-1, 0),\n  ivec2(-1, 1),\n  ivec2(0, -1),\n  ivec2(0, 0),\n  ivec2(0, 1),\n  ivec2(1, -1),\n  ivec2(1, 0),\n  ivec2(1, 1)\n);\n\nvec4 getClosestFragment(const ivec3 coord) {\n  vec4 result = vec4(1e7, 0.0, 0.0, 0.0);\n  vec4 neighbor;\n  #pragma unroll_loop_start\n  for (int i = 0; i < 9; ++i) {\n    neighbor = texelFetchOffset(\n      inputBuffer,\n      coord + ivec3(0, 0, CASCADE_COUNT),\n      0,\n      neighborOffsets[i]\n    );\n    if (neighbor.r < result.r) {\n      result = neighbor;\n    }\n  }\n  #pragma unroll_loop_end\n  return result;\n}\n\nvoid cascade(const int cascadeIndex, out vec4 outputColor) {\n  ivec3 coord = ivec3(gl_FragCoord.xy, cascadeIndex);\n  vec4 current = texelFetch(inputBuffer, coord, 0);\n\n  vec4 depthVelocity = getClosestFragment(coord);\n  vec2 velocity = depthVelocity.gb * texelSize;\n  vec2 prevUv = vUv - velocity;\n  if (prevUv.x < 0.0 || prevUv.x > 1.0 || prevUv.y < 0.0 || prevUv.y > 1.0) {\n    outputColor = current;\n    return; // Rejection\n  }\n\n  vec4 history = texture(historyBuffer, vec3(prevUv, float(cascadeIndex)));\n  vec4 clippedHistory = varianceClipping(inputBuffer, coord, current, history, varianceGamma);\n  outputColor = mix(clippedHistory, current, temporalAlpha);\n}\n\nvoid main() {\n  #pragma unroll_loop_start\n  for (int i = 0; i < 4; ++i) {\n    #if UNROLLED_LOOP_INDEX < CASCADE_COUNT\n    cascade(UNROLLED_LOOP_INDEX, outputColor[i]);\n    #endif // UNROLLED_LOOP_INDEX < CASCADE_COUNT\n  }\n  #pragma unroll_loop_end\n}\n';

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/shaders/shadowResolve.vert
var shadowResolve_default2 = "precision highp float;\n\nlayout(location = 0) in vec3 position;\n\nout vec2 vUv;\n\nvoid main() {\n  vUv = position.xy * 0.5 + 0.5;\n  gl_Position = vec4(position.xy, 1.0, 1.0);\n}\n";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/shaders/varianceClipping.glsl
var varianceClipping_default = "#ifdef VARIANCE_9_SAMPLES\n#define VARIANCE_OFFSET_COUNT (8)\nconst ivec2 varianceOffsets[8] = ivec2[8](\n  ivec2(-1, -1),\n  ivec2(-1, 1),\n  ivec2(1, -1),\n  ivec2(1, 1),\n  ivec2(1, 0),\n  ivec2(0, -1),\n  ivec2(0, 1),\n  ivec2(-1, 0)\n);\n#else // VARIANCE_9_SAMPLES\n#define VARIANCE_OFFSET_COUNT (4)\nconst ivec2 varianceOffsets[4] = ivec2[4](ivec2(1, 0), ivec2(0, -1), ivec2(0, 1), ivec2(-1, 0));\n#endif // VARIANCE_9_SAMPLES\n\n// Reference: https://github.com/playdeadgames/temporal\nvec4 clipAABB(const vec4 current, const vec4 history, const vec4 minColor, const vec4 maxColor) {\n  vec3 pClip = 0.5 * (maxColor.rgb + minColor.rgb);\n  vec3 eClip = 0.5 * (maxColor.rgb - minColor.rgb) + 1e-7;\n  vec4 vClip = history - vec4(pClip, current.a);\n  vec3 vUnit = vClip.xyz / eClip;\n  vec3 aUnit = abs(vUnit);\n  float maUnit = max(aUnit.x, max(aUnit.y, aUnit.z));\n  if (maUnit > 1.0) {\n    return vec4(pClip, current.a) + vClip / maUnit;\n  }\n  return history;\n}\n\n#ifdef VARIANCE_SAMPLER_ARRAY\n#define VARIANCE_SAMPLER sampler2DArray\n#define VARIANCE_SAMPLER_COORD ivec3\n#else // VARIANCE_SAMPLER_ARRAY\n#define VARIANCE_SAMPLER sampler2D\n#define VARIANCE_SAMPLER_COORD ivec2\n#endif // VARIANCE_SAMPLER_ARRAY\n\n// Variance clipping\n// Reference: https://developer.download.nvidia.com/gameworks/events/GDC2016/msalvi_temporal_supersampling.pdf\nvec4 varianceClipping(\n  const VARIANCE_SAMPLER inputBuffer,\n  const VARIANCE_SAMPLER_COORD coord,\n  const vec4 current,\n  const vec4 history,\n  const float gamma\n) {\n  vec4 moment1 = current;\n  vec4 moment2 = current * current;\n  vec4 neighbor;\n  #pragma unroll_loop_start\n  for (int i = 0; i < 8; ++i) {\n    #if UNROLLED_LOOP_INDEX < VARIANCE_OFFSET_COUNT\n    neighbor = texelFetchOffset(inputBuffer, coord, 0, varianceOffsets[i]);\n    moment1 += neighbor;\n    moment2 += neighbor * neighbor;\n    #endif // UNROLLED_LOOP_INDEX < VARIANCE_OFFSET_COUNT\n  }\n  #pragma unroll_loop_end\n\n  const float N = float(VARIANCE_OFFSET_COUNT + 1);\n  vec4 mean = moment1 / N;\n  vec4 varianceGamma = sqrt(max(moment2 / N - mean * mean, 0.0)) * gamma;\n  vec4 minColor = mean - varianceGamma;\n  vec4 maxColor = mean + varianceGamma;\n  return clipAABB(clamp(mean, minColor, maxColor), history, minColor, maxColor);\n}\n\nvec4 varianceClipping(\n  const VARIANCE_SAMPLER inputBuffer,\n  const VARIANCE_SAMPLER_COORD coord,\n  const vec4 current,\n  const vec4 history\n) {\n  return varianceClipping(inputBuffer, coord, current, history, 1.0);\n}\n\nvec4 varianceClipping(\n  const sampler2D inputBuffer,\n  const vec2 coord,\n  const vec4 current,\n  const vec4 history,\n  const float gamma\n) {\n  vec4 moment1 = current;\n  vec4 moment2 = current * current;\n  vec4 neighbor;\n  #pragma unroll_loop_start\n  for (int i = 0; i < 8; ++i) {\n    #if UNROLLED_LOOP_INDEX < VARIANCE_OFFSET_COUNT\n    neighbor = textureOffset(inputBuffer, coord, varianceOffsets[i]);\n    moment1 += neighbor;\n    moment2 += neighbor * neighbor;\n    #endif // UNROLLED_LOOP_INDEX < VARIANCE_OFFSET_COUNT\n  }\n  #pragma unroll_loop_end\n\n  const float N = float(VARIANCE_OFFSET_COUNT + 1);\n  vec4 mean = moment1 / N;\n  vec4 varianceGamma = sqrt(max(moment2 / N - mean * mean, 0.0)) * gamma;\n  vec4 minColor = mean - varianceGamma;\n  vec4 maxColor = mean + varianceGamma;\n  return clipAABB(clamp(mean, minColor, maxColor), history, minColor, maxColor);\n}\n\nvec4 varianceClipping(\n  const sampler2D inputBuffer,\n  const vec2 coord,\n  const vec4 current,\n  const vec4 history\n) {\n  return varianceClipping(inputBuffer, coord, current, history, 1.0);\n}\n";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/ShadowResolveMaterial.ts
var _cascadeCount_dec, _a, _init;
var ShadowResolveMaterial = class extends (_a = RawShaderMaterial, _cascadeCount_dec = [defineInt("CASCADE_COUNT", { min: 1, max: 4 })], _a) {
  constructor({
    inputBuffer = null,
    historyBuffer = null
  } = {}) {
    super({
      name: "ShadowResolveMaterial",
      glslVersion: GLSL3,
      vertexShader: shadowResolve_default2,
      fragmentShader: unrollLoops(
        resolveIncludes(shadowResolve_default, {
          varianceClipping: varianceClipping_default
        })
      ),
      uniforms: {
        inputBuffer: new Uniform(inputBuffer),
        historyBuffer: new Uniform(historyBuffer),
        texelSize: new Uniform(new Vector23()),
        varianceGamma: new Uniform(1),
        // Use a very slow alpha because a single flickering pixel can be highly
        // noticeable in shadow maps. This value can be increased if temporal
        // jitter is turned off in the shadows rendering, but it will suffer
        // from spatial aliasing.
        temporalAlpha: new Uniform(0.01)
      },
      defines: {}
    });
    __publicField(this, "cascadeCount", __runInitializers(_init, 8, this, defaults.shadow.cascadeCount)), __runInitializers(_init, 11, this);
  }
  setSize(width, height) {
    this.uniforms.texelSize.value.set(1 / width, 1 / height);
  }
};
_init = __decoratorStart(_a);
__decorateElement(_init, 5, "cascadeCount", _cascadeCount_dec, ShadowResolveMaterial);
__decoratorMetadata(_init, ShadowResolveMaterial);
export {
  ShadowResolveMaterial
};
