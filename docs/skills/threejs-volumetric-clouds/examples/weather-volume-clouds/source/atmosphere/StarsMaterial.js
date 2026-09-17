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

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/StarsMaterial.ts
import {
  GLSL3,
  Matrix4 as Matrix44,
  Uniform as Uniform2,
  Vector2 as Vector22
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

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/AtmosphereMaterialBase.ts
import {
  Matrix4 as Matrix43,
  RawShaderMaterial,
  Uniform,
  Vector3 as Vector39
} from "https://esm.sh/three@0.185.1?external";

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
var TRANSMITTANCE_TEXTURE_WIDTH = 256;
var TRANSMITTANCE_TEXTURE_HEIGHT = 64;
var METER_TO_LENGTH_UNIT = 1 / 1e3;
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

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/AtmosphereMaterialBase.ts
var vectorScratch5 = /* @__PURE__ */ new Vector39();
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
var _photometric_dec, _a, _init;
var AtmosphereMaterialBase = class extends (_a = RawShaderMaterial, _photometric_dec = [define("PHOTOMETRIC")], _a) {
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
        cameraPosition: new Uniform(new Vector39()),
        ellipsoidCenter: new Uniform(new Vector39()),
        inverseEllipsoidMatrix: new Uniform(new Matrix43()),
        altitudeCorrection: new Uniform(new Vector39()),
        sunDirection: new Uniform(sunDirection?.clone() ?? new Vector39()),
        // Uniforms for atmosphere functions
        u_solar_irradiance: new Uniform(atmosphere.solarIrradiance),
        u_sun_angular_radius: new Uniform(sunAngularRadius ?? atmosphere.sunAngularRadius),
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
        u_transmittance_texture: new Uniform(transmittanceTexture),
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
    __publicField(this, "ellipsoidMatrix", new Matrix43());
    __publicField(this, "correctAltitude");
    __publicField(this, "_renderTargetCount");
    __publicField(this, "photometric", __runInitializers(_init, 8, this)), __runInitializers(_init, 11, this);
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
_init = __decoratorStart(_a);
__decorateElement(_init, 5, "photometric", _photometric_dec, AtmosphereMaterialBase);
__decoratorMetadata(_init, AtmosphereMaterialBase);

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
var _background_dec, _a2, _init2;
var StarsMaterial = class extends (_a2 = AtmosphereMaterialBase, _background_dec = [define("BACKGROUND")], _a2) {
  constructor(params) {
    const { pointSize, radianceScale, background, ...others } = {
      ...starsMaterialParametersDefaults,
      ...params
    };
    super({
      name: "StarsMaterial",
      glslVersion: GLSL3,
      vertexShader: resolveIncludes(stars_default2, {
        parameters: parameters_default
      }),
      fragmentShader: resolveIncludes(stars_default, {
        parameters: parameters_default,
        functions: functions_default
      }),
      ...others,
      uniforms: {
        projectionMatrix: new Uniform2(new Matrix44()),
        modelViewMatrix: new Uniform2(new Matrix44()),
        viewMatrix: new Uniform2(new Matrix44()),
        matrixWorld: new Uniform2(new Matrix44()),
        cameraFar: new Uniform2(0),
        pointSize: new Uniform2(0),
        magnitudeRange: new Uniform2(new Vector22(-2, 8)),
        radianceScale: new Uniform2(radianceScale),
        ...others.uniforms
      },
      defines: {
        PERSPECTIVE_CAMERA: "1"
      }
    });
    __publicField(this, "pointSize");
    __publicField(this, "background", __runInitializers(_init2, 8, this)), __runInitializers(_init2, 11, this);
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
_init2 = __decoratorStart(_a2);
__decorateElement(_init2, 5, "background", _background_dec, StarsMaterial);
__decoratorMetadata(_init2, StarsMaterial);
export {
  StarsMaterial,
  starsMaterialParametersDefaults
};
