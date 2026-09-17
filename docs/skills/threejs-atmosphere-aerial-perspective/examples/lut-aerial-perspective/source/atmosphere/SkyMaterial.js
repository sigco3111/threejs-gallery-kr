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

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/atmosphere/SkyMaterial.ts
import {
  Color,
  GLSL3,
  Matrix4 as Matrix44,
  Uniform as Uniform2,
  Vector3 as Vector310
} from "https://esm.sh/three@0.185.1?external";

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

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/geospatial/shaders/raySphereIntersection.glsl
var raySphereIntersection_default = "float raySphereFirstIntersection(\n  const vec3 origin,\n  const vec3 direction,\n  const vec3 center,\n  const float radius\n) {\n  vec3 a = origin - center;\n  float b = 2.0 * dot(direction, a);\n  float c = dot(a, a) - radius * radius;\n  float discriminant = b * b - 4.0 * c;\n  return discriminant < 0.0\n    ? -1.0\n    : (-b - sqrt(discriminant)) * 0.5;\n}\n\nfloat raySphereFirstIntersection(const vec3 origin, const vec3 direction, const float radius) {\n  return raySphereFirstIntersection(origin, direction, vec3(0.0), radius);\n}\n\nvec4 raySphereFirstIntersection(\n  const vec3 origin,\n  const vec3 direction,\n  const vec3 center,\n  const vec4 radius\n) {\n  vec3 a = origin - center;\n  float b = 2.0 * dot(direction, a);\n  vec4 c = dot(a, a) - radius * radius;\n  vec4 discriminant = b * b - 4.0 * c;\n  vec4 mask = step(discriminant, vec4(0.0));\n  return mix((-b - sqrt(max(vec4(0.0), discriminant))) * 0.5, vec4(-1.0), mask);\n}\n\nvec4 raySphereFirstIntersection(const vec3 origin, const vec3 direction, const vec4 radius) {\n  return raySphereFirstIntersection(origin, direction, vec3(0.0), radius);\n}\n\nfloat raySphereSecondIntersection(\n  const vec3 origin,\n  const vec3 direction,\n  const vec3 center,\n  const float radius\n) {\n  vec3 a = origin - center;\n  float b = 2.0 * dot(direction, a);\n  float c = dot(a, a) - radius * radius;\n  float discriminant = b * b - 4.0 * c;\n  return discriminant < 0.0\n    ? -1.0\n    : (-b + sqrt(discriminant)) * 0.5;\n}\n\nfloat raySphereSecondIntersection(const vec3 origin, const vec3 direction, const float radius) {\n  return raySphereSecondIntersection(origin, direction, vec3(0.0), radius);\n}\n\nvec4 raySphereSecondIntersection(\n  const vec3 origin,\n  const vec3 direction,\n  const vec3 center,\n  const vec4 radius\n) {\n  vec3 a = origin - center;\n  float b = 2.0 * dot(direction, a);\n  vec4 c = dot(a, a) - radius * radius;\n  vec4 discriminant = b * b - 4.0 * c;\n  vec4 mask = step(discriminant, vec4(0.0));\n  return mix((-b + sqrt(max(vec4(0.0), discriminant))) * 0.5, vec4(-1.0), mask);\n}\n\nvec4 raySphereSecondIntersection(const vec3 origin, const vec3 direction, const vec4 radius) {\n  return raySphereSecondIntersection(origin, direction, vec3(0.0), radius);\n}\n\nvoid raySphereIntersections(\n  const vec3 origin,\n  const vec3 direction,\n  const vec3 center,\n  const float radius,\n  out float intersection1,\n  out float intersection2\n) {\n  vec3 a = origin - center;\n  float b = 2.0 * dot(direction, a);\n  float c = dot(a, a) - radius * radius;\n  float discriminant = b * b - 4.0 * c;\n  if (discriminant < 0.0) {\n    intersection1 = -1.0;\n    intersection2 = -1.0;\n    return;\n  } else {\n    float Q = sqrt(discriminant);\n    intersection1 = (-b - Q) * 0.5;\n    intersection2 = (-b + Q) * 0.5;\n  }\n}\n\nvoid raySphereIntersections(\n  const vec3 origin,\n  const vec3 direction,\n  const float radius,\n  out float intersection1,\n  out float intersection2\n) {\n  raySphereIntersections(origin, direction, vec3(0.0), radius, intersection1, intersection2);\n}\n\nvoid raySphereIntersections(\n  const vec3 origin,\n  const vec3 direction,\n  const vec3 center,\n  const vec4 radius,\n  out vec4 intersection1,\n  out vec4 intersection2\n) {\n  vec3 a = origin - center;\n  float b = 2.0 * dot(direction, a);\n  vec4 c = dot(a, a) - radius * radius;\n  vec4 discriminant = b * b - 4.0 * c;\n  vec4 mask = step(discriminant, vec4(0.0));\n  vec4 Q = sqrt(max(vec4(0.0), discriminant));\n  intersection1 = mix((-b - Q) * 0.5, vec4(-1.0), mask);\n  intersection2 = mix((-b + Q) * 0.5, vec4(-1.0), mask);\n}\n\nvoid raySphereIntersections(\n  const vec3 origin,\n  const vec3 direction,\n  const vec4 radius,\n  out vec4 intersection1,\n  out vec4 intersection2\n) {\n  raySphereIntersections(origin, direction, vec3(0.0), radius, intersection1, intersection2);\n}\n";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/geospatial/shaders/index.ts
var raySphereIntersection = raySphereIntersection_default;

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/atmosphere/AtmosphereMaterialBase.ts
import {
  Matrix4 as Matrix43,
  RawShaderMaterial,
  Uniform,
  Vector3 as Vector39
} from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/atmosphere/AtmosphereParameters.ts
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

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/atmosphere/constants.ts
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

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/atmosphere/getAltitudeCorrectionOffset.ts
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

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/atmosphere/AtmosphereMaterialBase.ts
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
var AtmosphereMaterialBase = class extends RawShaderMaterial {
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
    this.ellipsoidMatrix = new Matrix43();
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
__decorateClass([
  define("PHOTOMETRIC")
], AtmosphereMaterialBase.prototype, "photometric", 2);

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/atmosphere/shaders/functions.glsl
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

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/atmosphere/shaders/parameters.glsl
var parameters_default = "uniform vec3 u_solar_irradiance;\nuniform float u_sun_angular_radius;\nuniform float u_bottom_radius;\nuniform float u_top_radius;\nuniform vec3 u_rayleigh_scattering;\nuniform vec3 u_mie_scattering;\nuniform float u_mie_phase_function_g;\nuniform float u_mu_s_min;\nuniform float u_max_rayleigh_shadow_length;\n\nuniform sampler2D u_transmittance_texture;\nuniform sampler3D u_scattering_texture;\nuniform sampler3D u_single_mie_scattering_texture;\nuniform sampler2D u_irradiance_texture;\n";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/atmosphere/shaders/sky.frag
var sky_default = 'precision highp float;\nprecision highp sampler3D;\n\n#define RECIPROCAL_PI (0.3183098861837907)\n\n#include "core/raySphereIntersection"\n#include "parameters"\n#include "functions"\n#include "sky"\n\nuniform vec3 sunDirection;\nuniform vec3 moonDirection;\nuniform float moonAngularRadius;\nuniform float lunarRadianceScale;\nuniform vec3 groundAlbedo;\n\n#ifdef HAS_SHADOW_LENGTH\nuniform sampler2D shadowLengthBuffer;\n#endif // HAS_SHADOW_LENGTH\n\nin vec2 vUv;\nin vec3 vCameraPosition;\nin vec3 vRayDirection;\nin vec3 vEllipsoidCenter;\n\nlayout(location = 0) out vec4 outputColor;\n\n#include <mrt_layout>\n\nbool rayIntersectsGround(const vec3 cameraPosition, const vec3 rayDirection) {\n  float r = length(cameraPosition);\n  float mu = dot(cameraPosition, rayDirection) / r;\n  return mu < 0.0 && r * r * (mu * mu - 1.0) + u_bottom_radius * u_bottom_radius >= 0.0;\n}\n\nvoid main() {\n  float shadowLength = 0.0;\n  #ifdef HAS_SHADOW_LENGTH\n  shadowLength = texture(shadowLengthBuffer, vUv).r;\n  #endif // HAS_SHADOW_LENGTH\n\n  vec3 cameraPosition = vCameraPosition - vEllipsoidCenter;\n  vec3 rayDirection = normalize(vRayDirection);\n\n  #ifdef GROUND_ALBEDO\n\n  bool intersectsGround = rayIntersectsGround(cameraPosition, rayDirection);\n  if (intersectsGround) {\n    float distanceToGround = raySphereFirstIntersection(\n      cameraPosition,\n      rayDirection,\n      u_bottom_radius\n    );\n    vec3 groundPosition = rayDirection * distanceToGround + cameraPosition;\n    vec3 surfaceNormal = normalize(groundPosition);\n    vec3 skyIrradiance;\n    vec3 sunIrradiance = GetSunAndSkyIrradiance(\n      cameraPosition,\n      surfaceNormal,\n      sunDirection,\n      skyIrradiance\n    );\n    vec3 transmittance;\n    vec3 inscatter = GetSkyRadianceToPoint(\n      cameraPosition,\n      u_bottom_radius * surfaceNormal,\n      shadowLength,\n      sunDirection,\n      transmittance\n    );\n    vec3 radiance = groundAlbedo * RECIPROCAL_PI * (sunIrradiance + skyIrradiance);\n    outputColor.rgb = radiance * transmittance + inscatter;\n  } else {\n    outputColor.rgb = getSkyRadiance(\n      cameraPosition,\n      rayDirection,\n      shadowLength,\n      sunDirection,\n      moonDirection,\n      moonAngularRadius,\n      lunarRadianceScale\n    );\n  }\n\n  #else // GROUND_ALBEDO\n\n  outputColor.rgb = getSkyRadiance(\n    cameraPosition,\n    rayDirection,\n    shadowLength,\n    sunDirection,\n    moonDirection,\n    moonAngularRadius,\n    lunarRadianceScale\n  );\n\n  #endif // GROUND_ALBEDO\n\n  outputColor.a = 1.0;\n\n  #include <mrt_output>\n}\n';

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/atmosphere/shaders/sky.glsl
var sky_default2 = "vec3 getLunarRadiance(const float moonAngularRadius) {\n  // Not a physical number but the order of 10^-6 relative to the sun may fit.\n  vec3 radiance = u_solar_irradiance * 0.000002 / (PI * moonAngularRadius * moonAngularRadius);\n  #ifdef PHOTOMETRIC\n  radiance *= SUN_SPECTRAL_RADIANCE_TO_LUMINANCE;\n  #endif // PHOTOMETRIC\n  return radiance;\n}\n\nfloat intersectSphere(const vec3 ray, const vec3 point, const float radius) {\n  vec3 P = -point;\n  float PoR = dot(P, ray);\n  float D = dot(P, P) - radius * radius;\n  return -PoR - sqrt(PoR * PoR - D);\n}\n\nfloat orenNayarDiffuse(const vec3 L, const vec3 V, const vec3 N) {\n  float NoL = dot(N, L);\n  float NoV = dot(N, V);\n  float s = dot(L, V) - NoL * NoV;\n  float t = mix(1.0, max(NoL, NoV), step(0.0, s));\n  return max(0.0, NoL) * (0.62406015 + 0.41284404 * s / t);\n}\n\nvec3 getSkyRadiance(\n  const vec3 cameraPosition,\n  const vec3 rayDirection,\n  const float shadowLength,\n  const vec3 sunDirection,\n  const vec3 moonDirection,\n  const float moonAngularRadius,\n  const float lunarRadianceScale\n) {\n  vec3 transmittance;\n  vec3 radiance = GetSkyRadiance(\n    cameraPosition,\n    rayDirection,\n    shadowLength,\n    sunDirection,\n    transmittance\n  );\n\n  // Rendering celestial objects without perspective doesn't make sense.\n  #ifdef PERSPECTIVE_CAMERA\n\n  #if defined(SUN) || defined(MOON)\n  vec3 ddx = dFdx(rayDirection);\n  vec3 ddy = dFdy(rayDirection);\n  float fragmentAngle = length(ddx + ddy) / length(rayDirection);\n  #endif // defined(SUN) || defined(MOON)\n\n  #ifdef SUN\n  float viewDotSun = dot(rayDirection, sunDirection);\n  if (viewDotSun > cos(u_sun_angular_radius)) {\n    float angle = acos(clamp(viewDotSun, -1.0, 1.0));\n    float antialias = smoothstep(u_sun_angular_radius, u_sun_angular_radius - fragmentAngle, angle);\n    radiance += transmittance * GetSolarRadiance() * antialias;\n  }\n  #endif // SUN\n\n  #ifdef MOON\n  float intersection = intersectSphere(rayDirection, moonDirection, moonAngularRadius);\n  if (intersection > 0.0) {\n    vec3 normal = normalize(moonDirection - rayDirection * intersection);\n    float diffuse = orenNayarDiffuse(-sunDirection, rayDirection, normal);\n    float viewDotMoon = dot(rayDirection, moonDirection);\n    float angle = acos(clamp(viewDotMoon, -1.0, 1.0));\n    float antialias = smoothstep(moonAngularRadius, moonAngularRadius - fragmentAngle, angle);\n    radiance +=\n      transmittance *\n      getLunarRadiance(moonAngularRadius) *\n      lunarRadianceScale *\n      diffuse *\n      antialias;\n  }\n  #endif // MOON\n\n  #endif // PERSPECTIVE_CAMERA\n\n  return radiance;\n}\n";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/atmosphere/shaders/sky.vert
var sky_default3 = 'precision highp float;\nprecision highp sampler3D;\n\n#include "parameters"\n\nuniform mat4 inverseProjectionMatrix;\nuniform mat4 inverseViewMatrix;\nuniform vec3 cameraPosition;\nuniform vec3 ellipsoidCenter;\nuniform mat4 inverseEllipsoidMatrix;\nuniform vec3 altitudeCorrection;\n\nlayout(location = 0) in vec3 position;\n\nout vec2 vUv;\nout vec3 vCameraPosition;\nout vec3 vRayDirection;\nout vec3 vEllipsoidCenter;\n\nvoid getCameraRay(out vec3 origin, out vec3 direction) {\n  bool isPerspective = inverseProjectionMatrix[2][3] != 0.0; // 4th entry in the 3rd column\n\n  if (isPerspective) {\n    // Calculate the camera ray for a perspective camera.\n    vec4 viewPosition = inverseProjectionMatrix * vec4(position, 1.0);\n    vec4 worldDirection = inverseViewMatrix * vec4(viewPosition.xyz, 0.0);\n    origin = cameraPosition;\n    direction = worldDirection.xyz;\n  } else {\n    // Unprojected points to calculate direction.\n    vec4 nearPoint = inverseProjectionMatrix * vec4(position.xy, -1.0, 1.0);\n    vec4 farPoint = inverseProjectionMatrix * vec4(position.xy, -0.9, 1.0);\n    nearPoint /= nearPoint.w;\n    farPoint /= farPoint.w;\n\n    // Calculate world values\n    vec4 worldDirection = inverseViewMatrix * vec4(farPoint.xyz - nearPoint.xyz, 0.0);\n    vec4 worldOrigin = inverseViewMatrix * nearPoint;\n\n    // Outputs\n    direction = worldDirection.xyz;\n    origin = worldOrigin.xyz;\n  }\n}\n\nvoid main() {\n  vUv = position.xy * 0.5 + 0.5;\n\n  vec3 direction, origin;\n  getCameraRay(origin, direction);\n\n  mat3 rotation = mat3(inverseEllipsoidMatrix);\n  vCameraPosition = rotation * origin.xyz * METER_TO_LENGTH_UNIT;\n  vRayDirection = rotation * direction.xyz;\n  vEllipsoidCenter = (ellipsoidCenter + altitudeCorrection) * METER_TO_LENGTH_UNIT;\n\n  gl_Position = vec4(position.xy, 1.0, 1.0);\n}\n';

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/atmosphere/SkyMaterial.ts
var skyMaterialParametersDefaults = {
  ...atmosphereMaterialParametersBaseDefaults,
  sun: true,
  moon: true,
  moonAngularRadius: 45e-4,
  // ≈ 15.5 arcminutes
  lunarRadianceScale: 1,
  groundAlbedo: new Color(0)
};
var SkyMaterial = class extends AtmosphereMaterialBase {
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
      fragmentShader: resolveIncludes(sky_default, {
        core: { raySphereIntersection },
        parameters: parameters_default,
        functions: functions_default,
        sky: sky_default2
      }),
      ...others,
      uniforms: {
        inverseProjectionMatrix: new Uniform2(new Matrix44()),
        inverseViewMatrix: new Uniform2(new Matrix44()),
        moonDirection: new Uniform2(moonDirection?.clone() ?? new Vector310()),
        moonAngularRadius: new Uniform2(moonAngularRadius),
        lunarRadianceScale: new Uniform2(lunarRadianceScale),
        groundAlbedo: new Uniform2(groundAlbedo?.clone() ?? new Color(0)),
        shadowLengthBuffer: new Uniform2(null),
        ...others.uniforms
      },
      defines: {
        PERSPECTIVE_CAMERA: "1"
      },
      depthTest: true
    });
    this.shadowLength = null;
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
__decorateClass([
  define("SUN")
], SkyMaterial.prototype, "sun", 2);
__decorateClass([
  define("MOON")
], SkyMaterial.prototype, "moon", 2);
export {
  SkyMaterial,
  skyMaterialParametersDefaults
};
