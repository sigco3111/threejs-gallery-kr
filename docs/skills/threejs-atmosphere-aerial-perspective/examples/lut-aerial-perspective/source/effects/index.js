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
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateIn = (member, obj) => Object(obj) !== obj ? __typeError('Cannot use the "in" operator on this value') : member.has(obj);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/effects/createHaldLookupTexture.ts
import { LookupTexture, RawImageData } from "https://esm.sh/postprocessing@6.37.4?deps=three@0.185.1&external=three";
function createHaldLookupTexture(texture) {
  const { image } = texture;
  const { width, height } = image;
  if (width !== height) {
    throw new Error("Hald CLUT image must be square.");
  }
  const size = Math.cbrt(width * height);
  if (size % 1 !== 0) {
    throw new Error("Hald CLUT image must be cubic.");
  }
  const { data } = RawImageData.from(image);
  const lut = new LookupTexture(data, size);
  lut.name = texture.name;
  lut.type = texture.type;
  texture.colorSpace = lut.colorSpace;
  return lut;
}

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/effects/DepthEffect.ts
import { BlendFunction, Effect, EffectAttribute } from "https://esm.sh/postprocessing@6.37.4?deps=three@0.185.1&external=three";
import { Uniform } from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/geospatial/ArrayBufferLoader.ts
import { FileLoader, Loader } from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/vendor/tiny-invariant.ts
function invariant(condition, message) {
  if (condition) return;
  const provided = typeof message === "function" ? message() : message;
  throw new Error(provided != null ? `Invariant failed: ${provided}` : "Invariant failed");
}

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/geospatial/ArrayBufferLoader.ts
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

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/geospatial/bufferGeometry.ts
import {
  Box3,
  BufferAttribute,
  BufferGeometry,
  Sphere,
  Vector3
} from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/geospatial/constants.ts
var STBN_TEXTURE_WIDTH = 128;
var STBN_TEXTURE_HEIGHT = 128;
var STBN_TEXTURE_DEPTH = 64;
var ref = "9627216cc50057994c98a2118f3c4a23765d43b9";
var DEFAULT_STBN_URL = `https://media.githubusercontent.com/media/takram-design-engineering/three-geospatial/${ref}/packages/core/assets/stbn.bin`;

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/geospatial/DataLoader.ts
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

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/geospatial/typedArray.ts
import {
  Float16Array
} from "https://esm.sh/@petamoriken/float16@3.9.2?external";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/geospatial/TypedArrayLoader.ts
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
      this.parseTypedArray = parser;
    }
  };
}

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/geospatial/DataLoader.ts
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
    this.parameters = {};
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
    constructor() {
      super(...arguments);
      this.Texture = Texture;
      this.TypedArrayLoader = createTypedArrayLoaderClass(parser);
      this.parameters = {
        ...defaultDataTextureParameter,
        ...parameters
      };
    }
  };
}
function createData3DTextureLoaderClass(parser, parameters) {
  return createDataLoaderClass(Data3DTexture, parser, parameters);
}

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/geospatial/decorators.ts
import { Material } from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/geospatial/math.ts
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

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/geospatial/decorators.ts
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

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/geospatial/Ellipsoid.ts
import { Matrix4, Vector3 as Vector33 } from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/geospatial/helpers/projectOnEllipsoidSurface.ts
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

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/geospatial/Ellipsoid.ts
var vectorScratch1 = /* @__PURE__ */ new Vector33();
var vectorScratch2 = /* @__PURE__ */ new Vector33();
var vectorScratch3 = /* @__PURE__ */ new Vector33();
var Ellipsoid = class _Ellipsoid {
  static {
    this.WGS84 = /* @__PURE__ */ new _Ellipsoid(
      6378137,
      6378137,
      6356752314245179e-9
    );
  }
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

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/geospatial/EllipsoidGeometry.ts
import { BufferAttribute as BufferAttribute2, BufferGeometry as BufferGeometry2, Vector3 as Vector34 } from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/geospatial/EXR3DLoader.ts
import { Data3DTexture as Data3DTexture2, Loader as Loader4 } from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/geospatial/Geodetic.ts
import { Vector3 as Vector35 } from "https://esm.sh/three@0.185.1?external";
var vectorScratch12 = /* @__PURE__ */ new Vector35();
var vectorScratch22 = /* @__PURE__ */ new Vector35();
var Geodetic = class _Geodetic {
  constructor(longitude = 0, latitude = 0, height = 0) {
    this.longitude = longitude;
    this.latitude = latitude;
    this.height = height;
  }
  static {
    this.MIN_LONGITUDE = -Math.PI;
  }
  static {
    this.MAX_LONGITUDE = Math.PI;
  }
  static {
    this.MIN_LATITUDE = -Math.PI / 2;
  }
  static {
    this.MAX_LATITUDE = Math.PI / 2;
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

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/geospatial/PointOfView.ts
import { Matrix4 as Matrix42, Quaternion, Ray, Vector3 as Vector36 } from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/geospatial/Rectangle.ts
var Rectangle = class _Rectangle {
  constructor(west = 0, south = 0, east = 0, north = 0) {
    this.west = west;
    this.south = south;
    this.east = east;
    this.north = north;
  }
  static {
    this.MAX = /* @__PURE__ */ new _Rectangle(
      Geodetic.MIN_LONGITUDE,
      Geodetic.MIN_LATITUDE,
      Geodetic.MAX_LONGITUDE,
      Geodetic.MAX_LATITUDE
    );
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

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/geospatial/resolveIncludes.ts
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

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/geospatial/STBNLoader.ts
import { NearestFilter, RedFormat, RepeatWrapping } from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/geospatial/typedArrayParsers.ts
import { Float16Array as Float16Array2, getFloat16 } from "https://esm.sh/@petamoriken/float16@3.9.2?external";
var parseUint8Array = (buffer) => new Uint8Array(buffer);

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/geospatial/STBNLoader.ts
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

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/geospatial/TilingScheme.ts
import { Vector2 } from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/geospatial/shaders/depth.glsl
var depth_default = "// cSpell:words logdepthbuf\n\nfloat reverseLogDepth(const float depth, const float near, const float far) {\n  #ifdef USE_LOGDEPTHBUF\n  float d = pow(2.0, depth * log2(far + 1.0)) - 1.0;\n  float a = far / (far - near);\n  float b = far * near / (near - far);\n  return a + b / d;\n  #else // USE_LOGDEPTHBUF\n  return depth;\n  #endif // USE_LOGDEPTHBUF\n}\n\nfloat linearizeDepth(const float depth, const float near, const float far) {\n  float ndc = depth * 2.0 - 1.0;\n  return 2.0 * near * far / (far + near - ndc * (far - near));\n}\n";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/geospatial/shaders/packing.glsl
var packing_default = "// Reference: https://jcgt.org/published/0003/02/01/paper.pdf\n\nvec2 signNotZero(vec2 v) {\n  return vec2(v.x >= 0.0 ? 1.0 : -1.0, v.y >= 0.0 ? 1.0 : -1.0);\n}\n\nvec2 packNormalToVec2(vec3 v) {\n  vec2 p = v.xy * (1.0 / (abs(v.x) + abs(v.y) + abs(v.z)));\n  return v.z <= 0.0\n    ? (1.0 - abs(p.yx)) * signNotZero(p)\n    : p;\n}\n\nvec3 unpackVec2ToNormal(vec2 e) {\n  vec3 v = vec3(e.xy, 1.0 - abs(e.x) - abs(e.y));\n  if (v.z < 0.0) {\n    v.xy = (1.0 - abs(v.yx)) * signNotZero(v.xy);\n  }\n  return normalize(v);\n}\n";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/geospatial/shaders/transform.glsl
var transform_default = "vec3 screenToView(\n  const vec2 uv,\n  const float depth,\n  const float viewZ,\n  const mat4 projectionMatrix,\n  const mat4 inverseProjectionMatrix\n) {\n  vec4 clip = vec4(vec3(uv, depth) * 2.0 - 1.0, 1.0);\n  float clipW = projectionMatrix[2][3] * viewZ + projectionMatrix[3][3];\n  clip *= clipW;\n  return (inverseProjectionMatrix * clip).xyz;\n}\n";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/geospatial/shaders/turbo.glsl
var turbo_default = "// A fifth-order polynomial approximation of Turbo color map.\n// See: https://observablehq.com/@mbostock/turbo\n// prettier-ignore\nvec3 turbo(const float x) {\n  float r = 0.1357 + x * (4.5974 - x * (42.3277 - x * (130.5887 - x * (150.5666 - x * 58.1375))));\n  float g = 0.0914 + x * (2.1856 + x * (4.8052 - x * (14.0195 - x * (4.2109 + x * 2.7747))));\n  float b = 0.1067 + x * (12.5925 - x * (60.1097 - x * (109.0745 - x * (88.5066 - x * 26.8183))));\n  return vec3(r, g, b);\n}\n";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/geospatial/shaders/index.ts
var depth = depth_default;
var packing = packing_default;
var transform = transform_default;
var turbo = turbo_default;

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/effects/shaders/depthEffect.frag
var depthEffect_default = '#include "core/depth"\n#include "core/turbo"\n\nuniform float near;\nuniform float far;\n\nvoid mainImage(const vec4 inputColor, const vec2 uv, out vec4 outputColor) {\n  float depth = readDepth(uv);\n  depth = reverseLogDepth(depth, cameraNear, cameraFar);\n  depth = linearizeDepth(depth, near, far) / far;\n\n  #ifdef USE_TURBO\n  vec3 color = turbo(1.0 - depth);\n  #else // USE_TURBO\n  vec3 color = vec3(depth);\n  #endif // USE_TURBO\n\n  outputColor = vec4(color, inputColor.a);\n}\n';

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/effects/DepthEffect.ts
var depthEffectOptionsDefaults = {
  blendFunction: BlendFunction.SRC,
  useTurbo: false,
  near: 1,
  far: 1e3
};
var _useTurbo_dec, _a, _init;
var DepthEffect = class extends (_a = Effect, _useTurbo_dec = [define("USE_TURBO")], _a) {
  constructor(options) {
    const { blendFunction, useTurbo, near, far } = {
      ...depthEffectOptionsDefaults,
      ...options
    };
    super(
      "DepthEffect",
      resolveIncludes(depthEffect_default, {
        core: { depth, turbo }
      }),
      {
        blendFunction,
        attributes: EffectAttribute.DEPTH,
        uniforms: new Map(
          Object.entries({
            near: new Uniform(near),
            far: new Uniform(far)
          })
        )
      }
    );
    this.useTurbo = __runInitializers(_init, 8, this), __runInitializers(_init, 11, this);
    this.useTurbo = useTurbo;
  }
  get near() {
    return this.uniforms.get("near").value;
  }
  set near(value) {
    this.uniforms.get("near").value = value;
  }
  get far() {
    return this.uniforms.get("far").value;
  }
  set far(value) {
    this.uniforms.get("far").value = value;
  }
};
_init = __decoratorStart(_a);
__decorateElement(_init, 5, "useTurbo", _useTurbo_dec, DepthEffect);
__decoratorMetadata(_init, DepthEffect);

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/effects/DitheringEffect.ts
import { BlendFunction as BlendFunction2, Effect as Effect2 } from "https://esm.sh/postprocessing@6.37.4?deps=three@0.185.1&external=three";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/effects/shaders/ditheringEffect.frag
var ditheringEffect_default = "#define DITHERING\n\n#include <dithering_pars_fragment>\n\nvoid mainImage(const vec4 inputColor, const vec2 uv, out vec4 outputColor) {\n  outputColor = vec4(saturate(dithering(inputColor.rgb)), inputColor.a);\n}\n";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/effects/DitheringEffect.ts
var ditheringOptionsDefaults = {
  blendFunction: BlendFunction2.NORMAL
};
var DitheringEffect = class extends Effect2 {
  constructor(options) {
    const { blendFunction } = {
      ...ditheringOptionsDefaults,
      ...options
    };
    super("DitheringEffect", ditheringEffect_default, {
      blendFunction
    });
  }
};

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/effects/GeometryPass.ts
import { RenderPass } from "https://esm.sh/postprocessing@6.37.4?deps=three@0.185.1&external=three";
import {
  HalfFloatType as HalfFloatType2
} from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/effects/setupMaterialsForGeometryPass.ts
import { ShaderLib } from "https://esm.sh/three@0.185.1?external";
var SETUP = Symbol("SETUP");
function injectNormal(shader) {
  const vertexShader = shader.vertexShader.replace(
    /* glsl */
    `#include <fog_pars_vertex>`,
    /* glsl */
    `
        #include <fog_pars_vertex>
        #include <normal_pars_vertex>
      `
  ).replace(
    /* glsl */
    `#include <defaultnormal_vertex>`,
    /* glsl */
    `
        #include <defaultnormal_vertex>
        #include <normal_vertex>
      `
  ).replace(
    /* glsl */
    `#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )`,
    /* glsl */
    `#if 1`
  ).replace(
    /* glsl */
    `#include <clipping_planes_vertex>`,
    /* glsl */
    `
        #include <clipping_planes_vertex>
        vViewPosition = - mvPosition.xyz;
      `
  );
  shader.vertexShader = /* glsl */
  `
    #undef FLAT_SHADED
    varying vec3 vViewPosition;
    ${vertexShader}
  `;
  const fragmentShader = shader.fragmentShader.replace(
    /#ifndef FLAT_SHADED\s+varying vec3 vNormal;\s+#endif/m,
    /* glsl */
    `#include <normal_pars_fragment>`
  ).replace(
    /* glsl */
    `#include <common>`,
    /* glsl */
    `
        #include <common>
        #include <packing>
      `
  ).replace(
    /* glsl */
    `#include <specularmap_fragment>`,
    /* glsl */
    `
        #include <specularmap_fragment>
        #include <normal_fragment_begin>
        #include <normal_fragment_maps>
      `
  );
  shader.fragmentShader = /* glsl */
  `
    #undef FLAT_SHADED
    varying vec3 vViewPosition;
    ${fragmentShader}
  `;
  return shader;
}
function injectGBuffer(shader, { type } = {}) {
  if (shader[SETUP] === true) {
    return shader;
  }
  if (type === "basic") {
    injectNormal(shader);
  }
  const outputBuffer1 = type === "physical" ? (
    /* glsl */
    `
          vec4(
            packNormalToVec2(normal),
            metalnessFactor,
            roughnessFactor
          )
        `
  ) : (
    /* glsl */
    `
          vec4(
            packNormalToVec2(normal),
            reflectivity,
            0.0
          );
        `
  );
  shader.fragmentShader = /* glsl */
  `
    layout(location = 1) out vec4 outputBuffer1;

    #if !defined(USE_ENVMAP)
      uniform float reflectivity;
    #endif // !defined(USE_ENVMAP)

    ${packing}
    ${shader.fragmentShader.replace(
    /}\s*$/m,
    // Assume the last curly brace is of main()
    /* glsl */
    `
          outputBuffer1 = ${outputBuffer1};
        }
      `
  )}
  `;
  shader[SETUP] = true;
  return shader;
}
function setupMaterialsForGeometryPass() {
  injectGBuffer(ShaderLib.lambert);
  injectGBuffer(ShaderLib.phong);
  injectGBuffer(ShaderLib.basic, { type: "basic" });
  injectGBuffer(ShaderLib.standard, { type: "physical" });
  injectGBuffer(ShaderLib.physical, { type: "physical" });
}

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/effects/GeometryPass.ts
var GeometryPass = class extends RenderPass {
  constructor(inputBuffer, scene, camera, overrideMaterial) {
    super(scene, camera, overrideMaterial);
    this.geometryTexture = inputBuffer.texture.clone();
    this.geometryTexture.isRenderTargetTexture = true;
    this.geometryTexture.type = HalfFloatType2;
    setupMaterialsForGeometryPass();
  }
  render(renderer, inputBuffer, outputBuffer, deltaTime, stencilTest) {
    if (inputBuffer != null) {
      inputBuffer.textures[1] = this.geometryTexture;
    }
    super.render(renderer, inputBuffer, null);
    if (inputBuffer != null) {
      inputBuffer.textures.length = 1;
    }
  }
  setSize(width, height) {
    this.geometryTexture.image.width = width;
    this.geometryTexture.image.height = height;
  }
};

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/effects/LensFlareEffect.ts
import {
  BlendFunction as BlendFunction3,
  Effect as Effect3,
  EffectAttribute as EffectAttribute2,
  KawaseBlurPass,
  KernelSize,
  MipmapBlurPass,
  Resolution,
  ShaderPass
} from "https://esm.sh/postprocessing@6.37.4?deps=three@0.185.1&external=three";
import {
  HalfFloatType as HalfFloatType3,
  Uniform as Uniform4,
  WebGLRenderTarget
} from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/effects/DownsampleThresholdMaterial.ts
import {
  NoBlending,
  ShaderMaterial,
  Uniform as Uniform2,
  Vector2 as Vector22
} from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/effects/shaders/downsampleThreshold.frag
var downsampleThreshold_default = "#include <common>\n\nuniform sampler2D inputBuffer;\n\nuniform float thresholdLevel;\nuniform float thresholdRange;\n\nin vec2 vCenterUv1;\nin vec2 vCenterUv2;\nin vec2 vCenterUv3;\nin vec2 vCenterUv4;\nin vec2 vRowUv1;\nin vec2 vRowUv2;\nin vec2 vRowUv3;\nin vec2 vRowUv4;\nin vec2 vRowUv5;\nin vec2 vRowUv6;\nin vec2 vRowUv7;\nin vec2 vRowUv8;\nin vec2 vRowUv9;\n\nfloat clampToBorder(const vec2 uv) {\n  return float(uv.x >= 0.0 && uv.x <= 1.0 && uv.y >= 0.0 && uv.y <= 1.0);\n}\n\n// Reference: https://learnopengl.com/Guest-Articles/2022/Phys.-Based-Bloom\nvoid main() {\n  vec3 color = 0.125 * texture(inputBuffer, vec2(vRowUv5)).rgb;\n  vec4 weight =\n    0.03125 *\n    vec4(\n      clampToBorder(vRowUv1),\n      clampToBorder(vRowUv3),\n      clampToBorder(vRowUv7),\n      clampToBorder(vRowUv9)\n    );\n  color += weight.x * texture(inputBuffer, vec2(vRowUv1)).rgb;\n  color += weight.y * texture(inputBuffer, vec2(vRowUv3)).rgb;\n  color += weight.z * texture(inputBuffer, vec2(vRowUv7)).rgb;\n  color += weight.w * texture(inputBuffer, vec2(vRowUv9)).rgb;\n\n  weight =\n    0.0625 *\n    vec4(\n      clampToBorder(vRowUv2),\n      clampToBorder(vRowUv4),\n      clampToBorder(vRowUv6),\n      clampToBorder(vRowUv8)\n    );\n  color += weight.x * texture(inputBuffer, vec2(vRowUv2)).rgb;\n  color += weight.y * texture(inputBuffer, vec2(vRowUv4)).rgb;\n  color += weight.z * texture(inputBuffer, vec2(vRowUv6)).rgb;\n  color += weight.w * texture(inputBuffer, vec2(vRowUv8)).rgb;\n\n  weight =\n    0.125 *\n    vec4(\n      clampToBorder(vRowUv2),\n      clampToBorder(vRowUv4),\n      clampToBorder(vRowUv6),\n      clampToBorder(vRowUv8)\n    );\n  color += weight.x * texture(inputBuffer, vec2(vCenterUv1)).rgb;\n  color += weight.y * texture(inputBuffer, vec2(vCenterUv2)).rgb;\n  color += weight.z * texture(inputBuffer, vec2(vCenterUv3)).rgb;\n  color += weight.w * texture(inputBuffer, vec2(vCenterUv4)).rgb;\n\n  // WORKAROUND: Avoid screen flashes if the input buffer contains NaN texels.\n  // See: https://github.com/takram-design-engineering/three-geospatial/issues/7\n  if (any(isnan(color))) {\n    gl_FragColor = vec4(vec3(0.0), 1.0);\n    return;\n  }\n\n  float l = luminance(color);\n  float scale = saturate(smoothstep(thresholdLevel, thresholdLevel + thresholdRange, l));\n  gl_FragColor = vec4(color * scale, 1.0);\n}\n";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/effects/shaders/downsampleThreshold.vert
var downsampleThreshold_default2 = "uniform vec2 texelSize;\n\nout vec2 vCenterUv1;\nout vec2 vCenterUv2;\nout vec2 vCenterUv3;\nout vec2 vCenterUv4;\nout vec2 vRowUv1;\nout vec2 vRowUv2;\nout vec2 vRowUv3;\nout vec2 vRowUv4;\nout vec2 vRowUv5;\nout vec2 vRowUv6;\nout vec2 vRowUv7;\nout vec2 vRowUv8;\nout vec2 vRowUv9;\n\nvoid main() {\n  vec2 uv = position.xy * 0.5 + 0.5;\n  vCenterUv1 = uv + texelSize * vec2(-1.0, 1.0);\n  vCenterUv2 = uv + texelSize * vec2(1.0, 1.0);\n  vCenterUv3 = uv + texelSize * vec2(-1.0, -1.0);\n  vCenterUv4 = uv + texelSize * vec2(1.0, -1.0);\n  vRowUv1 = uv + texelSize * vec2(-2.0, 2.0);\n  vRowUv2 = uv + texelSize * vec2(0.0, 2.0);\n  vRowUv3 = uv + texelSize * vec2(2.0, 2.0);\n  vRowUv4 = uv + texelSize * vec2(-2.0, 0.0);\n  vRowUv5 = uv + texelSize;\n  vRowUv6 = uv + texelSize * vec2(2.0, 0.0);\n  vRowUv7 = uv + texelSize * vec2(-2.0, -2.0);\n  vRowUv8 = uv + texelSize * vec2(0.0, -2.0);\n  vRowUv9 = uv + texelSize * vec2(2.0, -2.0);\n\n  gl_Position = vec4(position.xy, 1.0, 1.0);\n}\n";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/effects/DownsampleThresholdMaterial.ts
var downsampleThresholdMaterialParametersDefaults = {
  thresholdLevel: 10,
  thresholdRange: 1
};
var DownsampleThresholdMaterial = class extends ShaderMaterial {
  constructor(params) {
    const {
      inputBuffer = null,
      thresholdLevel,
      thresholdRange,
      ...others
    } = {
      ...downsampleThresholdMaterialParametersDefaults,
      ...params
    };
    super({
      name: "DownsampleThresholdMaterial",
      fragmentShader: downsampleThreshold_default,
      vertexShader: downsampleThreshold_default2,
      blending: NoBlending,
      toneMapped: false,
      depthWrite: false,
      depthTest: false,
      ...others,
      uniforms: {
        inputBuffer: new Uniform2(inputBuffer),
        texelSize: new Uniform2(new Vector22()),
        thresholdLevel: new Uniform2(thresholdLevel),
        thresholdRange: new Uniform2(thresholdRange),
        ...others.uniforms
      }
    });
  }
  setSize(width, height) {
    this.uniforms.texelSize.value.set(1 / width, 1 / height);
  }
  get inputBuffer() {
    return this.uniforms.inputBuffer.value;
  }
  set inputBuffer(value) {
    this.uniforms.inputBuffer.value = value;
  }
  get thresholdLevel() {
    return this.uniforms.thresholdLevel.value;
  }
  set thresholdLevel(value) {
    this.uniforms.thresholdLevel.value = value;
  }
  get thresholdRange() {
    return this.uniforms.thresholdRange.value;
  }
  set thresholdRange(value) {
    this.uniforms.thresholdRange.value = value;
  }
};

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/effects/LensFlareFeaturesMaterial.ts
import {
  NoBlending as NoBlending2,
  ShaderMaterial as ShaderMaterial2,
  Uniform as Uniform3,
  Vector2 as Vector23
} from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/effects/shaders/lensFlareFeatures.frag
var lensFlareFeatures_default = "#include <common>\n\n#define SQRT_2 (0.7071067811865476)\n\nuniform sampler2D inputBuffer;\n\nuniform vec2 texelSize;\nuniform float ghostAmount;\nuniform float haloAmount;\nuniform float chromaticAberration;\n\nin vec2 vUv;\nin vec2 vAspectRatio;\n\nvec3 sampleGhost(const vec2 direction, const vec3 color, const float offset) {\n  vec2 suv = clamp(1.0 - vUv + direction * offset, 0.0, 1.0);\n  vec3 result = texture(inputBuffer, suv).rgb * color;\n\n  // Falloff at the perimeter.\n  float d = clamp(length(0.5 - suv) / (0.5 * SQRT_2), 0.0, 1.0);\n  result *= pow(1.0 - d, 3.0);\n  return result;\n}\n\nvec4 sampleGhosts(float amount) {\n  vec3 color = vec3(0.0);\n  vec2 direction = vUv - 0.5;\n  color += sampleGhost(direction, vec3(0.8, 0.8, 1.0), -5.0);\n  color += sampleGhost(direction, vec3(1.0, 0.8, 0.4), -1.5);\n  color += sampleGhost(direction, vec3(0.9, 1.0, 0.8), -0.4);\n  color += sampleGhost(direction, vec3(1.0, 0.8, 0.4), -0.2);\n  color += sampleGhost(direction, vec3(0.9, 0.7, 0.7), -0.1);\n  color += sampleGhost(direction, vec3(0.5, 1.0, 0.4), 0.7);\n  color += sampleGhost(direction, vec3(0.5, 0.5, 0.5), 1.0);\n  color += sampleGhost(direction, vec3(1.0, 1.0, 0.6), 2.5);\n  color += sampleGhost(direction, vec3(0.5, 0.8, 1.0), 10.0);\n  return vec4(color * amount, 1.0);\n}\n\n// Reference: https://john-chapman.github.io/2017/11/05/pseudo-lens-flare.html\nfloat cubicRingMask(const float x, const float radius, const float thickness) {\n  float v = min(abs(x - radius) / thickness, 1.0);\n  return 1.0 - v * v * (3.0 - 2.0 * v);\n}\n\nvec3 sampleHalo(const float radius) {\n  vec2 direction = normalize((vUv - 0.5) / vAspectRatio) * vAspectRatio;\n  vec3 offset = vec3(texelSize.x * chromaticAberration) * vec3(-1.0, 0.0, 1.0);\n  vec2 suv = fract(1.0 - vUv + direction * radius);\n  vec3 result = vec3(\n    texture(inputBuffer, suv + direction * offset.r).r,\n    texture(inputBuffer, suv + direction * offset.g).g,\n    texture(inputBuffer, suv + direction * offset.b).b\n  );\n\n  // Falloff at the center and perimeter.\n  vec2 wuv = (vUv - vec2(0.5, 0.0)) / vAspectRatio + vec2(0.5, 0.0);\n  float d = saturate(distance(wuv, vec2(0.5)));\n  result *= cubicRingMask(d, 0.45, 0.25);\n  return result;\n}\n\nvec4 sampleHalos(const float amount) {\n  vec3 color = vec3(0.0);\n  color += sampleHalo(0.3);\n  return vec4(color, 1.0) * amount;\n}\n\nvoid main() {\n  gl_FragColor += sampleGhosts(ghostAmount);\n  gl_FragColor += sampleHalos(haloAmount);\n}\n\n";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/effects/shaders/lensFlareFeatures.vert
var lensFlareFeatures_default2 = "uniform vec2 texelSize;\n\nout vec2 vUv;\nout vec2 vAspectRatio;\n\nvoid main() {\n  vUv = position.xy * 0.5 + 0.5;\n  vAspectRatio = vec2(texelSize.x / texelSize.y, 1.0);\n  gl_Position = vec4(position.xy, 1.0, 1.0);\n}\n";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/effects/LensFlareFeaturesMaterial.ts
var lensFlareFeaturesMaterialParametersDefaults = {
  ghostAmount: 1e-3,
  haloAmount: 1e-3,
  chromaticAberration: 10
};
var LensFlareFeaturesMaterial = class extends ShaderMaterial2 {
  constructor(params) {
    const {
      inputBuffer = null,
      ghostAmount,
      haloAmount,
      chromaticAberration,
      ...others
    } = {
      ...lensFlareFeaturesMaterialParametersDefaults,
      ...params
    };
    super({
      name: "LensFlareFeaturesMaterial",
      fragmentShader: lensFlareFeatures_default,
      vertexShader: lensFlareFeatures_default2,
      blending: NoBlending2,
      toneMapped: false,
      depthWrite: false,
      depthTest: false,
      uniforms: {
        inputBuffer: new Uniform3(inputBuffer),
        texelSize: new Uniform3(new Vector23()),
        ghostAmount: new Uniform3(ghostAmount),
        haloAmount: new Uniform3(haloAmount),
        chromaticAberration: new Uniform3(chromaticAberration),
        ...others.uniforms
      }
    });
  }
  setSize(width, height) {
    this.uniforms.texelSize.value.set(1 / width, 1 / height);
  }
  get inputBuffer() {
    return this.uniforms.inputBuffer.value;
  }
  set inputBuffer(value) {
    this.uniforms.inputBuffer.value = value;
  }
  get ghostAmount() {
    return this.uniforms.ghostAmount.value;
  }
  set ghostAmount(value) {
    this.uniforms.ghostAmount.value = value;
  }
  get haloAmount() {
    return this.uniforms.haloAmount.value;
  }
  set haloAmount(value) {
    this.uniforms.haloAmount.value = value;
  }
  get chromaticAberration() {
    return this.uniforms.chromaticAberration.value;
  }
  set chromaticAberration(value) {
    this.uniforms.chromaticAberration.value = value;
  }
};

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/effects/shaders/lensFlareEffect.frag
var lensFlareEffect_default = "uniform sampler2D bloomBuffer;\nuniform sampler2D featuresBuffer;\nuniform float intensity;\n\nvoid mainImage(const vec4 inputColor, const vec2 uv, out vec4 outputColor) {\n  vec3 bloom = texture(bloomBuffer, uv).rgb;\n  vec3 features = texture(featuresBuffer, uv).rgb;\n  outputColor = vec4(inputColor.rgb + (bloom + features) * intensity, inputColor.a);\n}\n";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/effects/LensFlareEffect.ts
var lensFlareEffectOptionsDefaults = {
  blendFunction: BlendFunction3.NORMAL,
  resolutionScale: 0.5,
  width: Resolution.AUTO_SIZE,
  height: Resolution.AUTO_SIZE,
  intensity: 5e-3
};
var LensFlareEffect = class extends Effect3 {
  constructor(options) {
    const {
      blendFunction,
      resolutionScale,
      width,
      height,
      resolutionX = width,
      resolutionY = height,
      intensity
    } = {
      ...lensFlareEffectOptionsDefaults,
      ...options
    };
    super("LensFlareEffect", lensFlareEffect_default, {
      blendFunction,
      attributes: EffectAttribute2.CONVOLUTION,
      uniforms: new Map(
        Object.entries({
          bloomBuffer: new Uniform4(null),
          featuresBuffer: new Uniform4(null),
          intensity: new Uniform4(1)
        })
      )
    });
    this.onResolutionChange = () => {
      this.setSize(this.resolution.baseWidth, this.resolution.baseHeight);
    };
    this.renderTarget1 = new WebGLRenderTarget(1, 1, {
      depthBuffer: false,
      stencilBuffer: false,
      type: HalfFloatType3
    });
    this.renderTarget1.texture.name = "LensFlare.Target1";
    this.renderTarget2 = new WebGLRenderTarget(1, 1, {
      depthBuffer: false,
      stencilBuffer: false,
      type: HalfFloatType3
    });
    this.renderTarget2.texture.name = "LensFlare.Target2";
    this.thresholdMaterial = new DownsampleThresholdMaterial();
    this.thresholdPass = new ShaderPass(this.thresholdMaterial);
    this.blurPass = new MipmapBlurPass();
    this.blurPass.levels = 8;
    this.preBlurPass = new KawaseBlurPass({
      kernelSize: KernelSize.SMALL
    });
    this.featuresMaterial = new LensFlareFeaturesMaterial();
    this.featuresPass = new ShaderPass(this.featuresMaterial);
    this.uniforms.get("bloomBuffer").value = this.blurPass.texture;
    this.uniforms.get("featuresBuffer").value = this.renderTarget1.texture;
    this.resolution = new Resolution(
      this,
      resolutionX,
      resolutionY,
      resolutionScale
    );
    this.resolution.addEventListener("change", this.onResolutionChange);
    this.intensity = intensity;
  }
  initialize(renderer, alpha, frameBufferType) {
    this.thresholdPass.initialize(renderer, alpha, frameBufferType);
    this.blurPass.initialize(renderer, alpha, frameBufferType);
    this.preBlurPass.initialize(renderer, alpha, frameBufferType);
    this.featuresPass.initialize(renderer, alpha, frameBufferType);
  }
  update(renderer, inputBuffer, deltaTime) {
    this.thresholdPass.render(renderer, inputBuffer, this.renderTarget1);
    this.blurPass.render(renderer, this.renderTarget1, null);
    this.preBlurPass.render(renderer, this.renderTarget1, this.renderTarget2);
    this.featuresPass.render(renderer, this.renderTarget2, this.renderTarget1);
  }
  setSize(baseWidth, baseHeight) {
    const resolution = this.resolution;
    resolution.setBaseSize(baseWidth, baseHeight);
    const { width, height } = resolution;
    this.renderTarget1.setSize(width, height);
    this.renderTarget2.setSize(width, height);
    this.thresholdMaterial.setSize(width, height);
    this.blurPass.setSize(width, height);
    this.preBlurPass.setSize(width, height);
    this.featuresMaterial.setSize(width, height);
  }
  get intensity() {
    return this.uniforms.get("intensity").value;
  }
  set intensity(value) {
    this.uniforms.get("intensity").value = value;
  }
  get thresholdLevel() {
    return this.thresholdMaterial.thresholdLevel;
  }
  set thresholdLevel(value) {
    this.thresholdMaterial.thresholdLevel = value;
  }
  get thresholdRange() {
    return this.thresholdMaterial.thresholdRange;
  }
  set thresholdRange(value) {
    this.thresholdMaterial.thresholdRange = value;
  }
};

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/effects/NormalEffect.ts
import { BlendFunction as BlendFunction4, Effect as Effect4, EffectAttribute as EffectAttribute3 } from "https://esm.sh/postprocessing@6.37.4?deps=three@0.185.1&external=three";
import {
  Matrix4 as Matrix43,
  Uniform as Uniform5
} from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/effects/shaders/normalEffect.frag
var normalEffect_default = '#include "core/depth"\n#include "core/packing"\n#include "core/transform"\n\nuniform highp sampler2D normalBuffer;\n\nuniform mat4 projectionMatrix;\nuniform mat4 inverseProjectionMatrix;\n\nvec3 reconstructNormal(const vec2 uv) {\n  float depth = readDepth(uv);\n  depth = reverseLogDepth(depth, cameraNear, cameraFar);\n  vec3 position = screenToView(\n    uv,\n    depth,\n    getViewZ(depth),\n    projectionMatrix,\n    inverseProjectionMatrix\n  );\n  vec3 dx = dFdx(position);\n  vec3 dy = dFdy(position);\n  return normalize(cross(dx, dy));\n}\n\nvec3 readNormal(const vec2 uv) {\n  #ifdef OCT_ENCODED\n  return unpackVec2ToNormal(texture(normalBuffer, uv).xy);\n  #else // OCT_ENCODED\n  return 2.0 * texture(normalBuffer, uv).xyz - 1.0;\n  #endif // OCT_ENCODED\n}\n\nvoid mainImage(const vec4 inputColor, const vec2 uv, out vec4 outputColor) {\n  #ifdef RECONSTRUCT_FROM_DEPTH\n  vec3 normal = reconstructNormal(uv);\n  #else // RECONSTRUCT_FROM_DEPTH\n  vec3 normal = readNormal(uv);\n  #endif // RECONSTRUCT_FROM_DEPTH\n\n  outputColor = vec4(normal * 0.5 + 0.5, inputColor.a);\n}\n';

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/effects/NormalEffect.ts
var normalEffectOptionsDefaults = {
  blendFunction: BlendFunction4.SRC,
  octEncoded: false,
  reconstructFromDepth: false
};
var _reconstructFromDepth_dec, _octEncoded_dec, _a2, _init2;
var NormalEffect = class extends (_a2 = Effect4, _octEncoded_dec = [define("OCT_ENCODED")], _reconstructFromDepth_dec = [define("RECONSTRUCT_FROM_DEPTH")], _a2) {
  constructor(camera, options) {
    const {
      blendFunction,
      normalBuffer = null,
      octEncoded,
      reconstructFromDepth
    } = {
      ...normalEffectOptionsDefaults,
      ...options
    };
    super(
      "NormalEffect",
      resolveIncludes(normalEffect_default, {
        core: {
          depth,
          packing,
          transform
        }
      }),
      {
        blendFunction,
        attributes: EffectAttribute3.DEPTH,
        uniforms: new Map(
          Object.entries({
            normalBuffer: new Uniform5(normalBuffer),
            projectionMatrix: new Uniform5(new Matrix43()),
            inverseProjectionMatrix: new Uniform5(new Matrix43())
          })
        )
      }
    );
    this.camera = camera;
    this.octEncoded = __runInitializers(_init2, 8, this), __runInitializers(_init2, 11, this);
    this.reconstructFromDepth = __runInitializers(_init2, 12, this), __runInitializers(_init2, 15, this);
    if (camera != null) {
      this.mainCamera = camera;
    }
    this.octEncoded = octEncoded;
    this.reconstructFromDepth = reconstructFromDepth;
  }
  get mainCamera() {
    return this.camera;
  }
  set mainCamera(value) {
    this.camera = value;
  }
  update(renderer, inputBuffer, deltaTime) {
    const uniforms = this.uniforms;
    const projectionMatrix = uniforms.get("projectionMatrix");
    const inverseProjectionMatrix = uniforms.get("inverseProjectionMatrix");
    const camera = this.camera;
    if (camera != null) {
      projectionMatrix.value.copy(camera.projectionMatrix);
      inverseProjectionMatrix.value.copy(camera.projectionMatrixInverse);
    }
  }
  get normalBuffer() {
    return this.uniforms.get("normalBuffer").value;
  }
  set normalBuffer(value) {
    this.uniforms.get("normalBuffer").value = value;
  }
};
_init2 = __decoratorStart(_a2);
__decorateElement(_init2, 5, "octEncoded", _octEncoded_dec, NormalEffect);
__decorateElement(_init2, 5, "reconstructFromDepth", _reconstructFromDepth_dec, NormalEffect);
__decoratorMetadata(_init2, NormalEffect);
export {
  DepthEffect,
  DitheringEffect,
  GeometryPass,
  LensFlareEffect,
  NormalEffect,
  createHaldLookupTexture,
  depthEffectOptionsDefaults,
  ditheringOptionsDefaults,
  lensFlareEffectOptionsDefaults,
  normalEffectOptionsDefaults,
  setupMaterialsForGeometryPass
};
