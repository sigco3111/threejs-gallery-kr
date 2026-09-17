var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};

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
      this.parseTypedArray = parser;
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
  constructor(options) {
    this.solarIrradiance = new Vector37(1.474, 1.8504, 1.91198);
    this.sunAngularRadius = 4675e-6;
    this.bottomRadius = 636e4;
    this.topRadius = 642e4;
    this.rayleighScattering = new Vector37(5802e-6, 0.013558, 0.0331);
    this.mieScattering = new Vector37(3996e-6, 3996e-6, 3996e-6);
    this.miePhaseFunctionG = 0.8;
    this.muSMin = Math.cos(radians(120));
    // Radiance to luminance conversion
    // prettier-ignore
    this.skyRadianceToLuminance = new Vector37(114974.916437, 71305.954816, 65310.548555);
    this.sunRadianceToLuminance = new Vector37(98242.786222, 69954.398112, 66475.012354);
    this.luminousEfficiency = new Vector37(0.2126, 0.7152, 0.0722);
    this.skyRadianceToRelativeLuminance = new Vector37();
    this.sunRadianceToRelativeLuminance = new Vector37();
    applyOptions(this, options);
    const luminance = this.luminousEfficiency.dot(this.skyRadianceToLuminance);
    this.skyRadianceToRelativeLuminance.copy(this.skyRadianceToLuminance).divideScalar(luminance);
    this.sunRadianceToRelativeLuminance.copy(this.sunRadianceToLuminance).divideScalar(luminance);
  }
  static {
    this.DEFAULT = /* @__PURE__ */ new _AtmosphereParameters();
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
var AerialPerspectiveEffect = class extends Effect {
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
    this.ellipsoidMatrix = new Matrix43();
    this.overlay = null;
    this.shadow = null;
    this.shadowLength = null;
    this.irradianceMask = null;
    this.shadowSampleCount = 8;
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
__decorateClass([
  define("OCT_ENCODED_NORMAL")
], AerialPerspectiveEffect.prototype, "octEncodedNormal", 2);
__decorateClass([
  define("RECONSTRUCT_NORMAL")
], AerialPerspectiveEffect.prototype, "reconstructNormal", 2);
__decorateClass([
  define("CORRECT_GEOMETRIC_ERROR")
], AerialPerspectiveEffect.prototype, "correctGeometricError", 2);
__decorateClass([
  define("PHOTOMETRIC")
], AerialPerspectiveEffect.prototype, "photometric", 2);
__decorateClass([
  define("SUN_IRRADIANCE")
], AerialPerspectiveEffect.prototype, "sunIrradiance", 2);
__decorateClass([
  define("SKY_IRRADIANCE")
], AerialPerspectiveEffect.prototype, "skyIrradiance", 2);
__decorateClass([
  define("TRANSMITTANCE")
], AerialPerspectiveEffect.prototype, "transmittance", 2);
__decorateClass([
  define("INSCATTER")
], AerialPerspectiveEffect.prototype, "inscatter", 2);
__decorateClass([
  define("SKY")
], AerialPerspectiveEffect.prototype, "sky", 2);
__decorateClass([
  define("SUN")
], AerialPerspectiveEffect.prototype, "sun", 2);
__decorateClass([
  define("MOON")
], AerialPerspectiveEffect.prototype, "moon", 2);
__decorateClass([
  defineInt("SHADOW_SAMPLE_COUNT", { min: 1, max: 16 })
], AerialPerspectiveEffect.prototype, "shadowSampleCount", 2);
export {
  AerialPerspectiveEffect,
  aerialPerspectiveEffectOptionsDefaults
};
