var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

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

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/shaders/math.glsl
var math_default = "#if !defined(saturate)\n#define saturate(a) clamp(a, 0.0, 1.0)\n#endif // !defined(saturate)\n\nfloat remap(const float x, const float min1, const float max1, const float min2, const float max2) {\n  return min2 + (x - min1) / (max1 - min1) * (max2 - min2);\n}\n\nvec2 remap(const vec2 x, const vec2 min1, const vec2 max1, const vec2 min2, const vec2 max2) {\n  return min2 + (x - min1) / (max1 - min1) * (max2 - min2);\n}\n\nvec3 remap(const vec3 x, const vec3 min1, const vec3 max1, const vec3 min2, const vec3 max2) {\n  return min2 + (x - min1) / (max1 - min1) * (max2 - min2);\n}\n\nvec4 remap(const vec4 x, const vec4 min1, const vec4 max1, const vec4 min2, const vec4 max2) {\n  return min2 + (x - min1) / (max1 - min1) * (max2 - min2);\n}\n\nfloat remapClamped(\n  const float x,\n  const float min1,\n  const float max1,\n  const float min2,\n  const float max2\n) {\n  return clamp(min2 + (x - min1) / (max1 - min1) * (max2 - min2), min2, max2);\n}\n\nvec2 remapClamped(\n  const vec2 x,\n  const vec2 min1,\n  const vec2 max1,\n  const vec2 min2,\n  const vec2 max2\n) {\n  return clamp(min2 + (x - min1) / (max1 - min1) * (max2 - min2), min2, max2);\n}\n\nvec3 remapClamped(\n  const vec3 x,\n  const vec3 min1,\n  const vec3 max1,\n  const vec3 min2,\n  const vec3 max2\n) {\n  return clamp(min2 + (x - min1) / (max1 - min1) * (max2 - min2), min2, max2);\n}\n\nvec4 remapClamped(\n  const vec4 x,\n  const vec4 min1,\n  const vec4 max1,\n  const vec4 min2,\n  const vec4 max2\n) {\n  return clamp(min2 + (x - min1) / (max1 - min1) * (max2 - min2), min2, max2);\n}\n\n// Implicitly remap to 0 and 1\nfloat remap(const float x, const float min1, const float max1) {\n  return (x - min1) / (max1 - min1);\n}\n\nvec2 remap(const vec2 x, const vec2 min1, const vec2 max1) {\n  return (x - min1) / (max1 - min1);\n}\n\nvec3 remap(const vec3 x, const vec3 min1, const vec3 max1) {\n  return (x - min1) / (max1 - min1);\n}\n\nvec4 remap(const vec4 x, const vec4 min1, const vec4 max1) {\n  return (x - min1) / (max1 - min1);\n}\n\nfloat remapClamped(const float x, const float min1, const float max1) {\n  return saturate((x - min1) / (max1 - min1));\n}\n\nvec2 remapClamped(const vec2 x, const vec2 min1, const vec2 max1) {\n  return saturate((x - min1) / (max1 - min1));\n}\n\nvec3 remapClamped(const vec3 x, const vec3 min1, const vec3 max1) {\n  return saturate((x - min1) / (max1 - min1));\n}\n\nvec4 remapClamped(const vec4 x, const vec4 min1, const vec4 max1) {\n  return saturate((x - min1) / (max1 - min1));\n}\n";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/shaders/index.ts
var math = math_default;

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/constants.ts
var CLOUD_SHAPE_DETAIL_TEXTURE_SIZE = 32;
var ref2 = "45a1c6c1bb9fd38b3680fd120795ff4c32df68ff";
var DEFAULT_LOCAL_WEATHER_URL = `https://media.githubusercontent.com/media/takram-design-engineering/three-geospatial/${ref2}/packages/clouds/assets/local_weather.png`;
var DEFAULT_SHAPE_URL = `https://media.githubusercontent.com/media/takram-design-engineering/three-geospatial/${ref2}/packages/clouds/assets/shape.bin`;
var DEFAULT_SHAPE_DETAIL_URL = `https://media.githubusercontent.com/media/takram-design-engineering/three-geospatial/${ref2}/packages/clouds/assets/shape_detail.bin`;
var DEFAULT_TURBULENCE_URL = `https://media.githubusercontent.com/media/takram-design-engineering/three-geospatial/${ref2}/packages/clouds/assets/turbulence.png`;

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/Procedural3DTexture.ts
import {
  Camera,
  GLSL3,
  LinearFilter as LinearFilter2,
  Mesh,
  NoColorSpace,
  PlaneGeometry,
  RawShaderMaterial,
  RedFormat as RedFormat2,
  RepeatWrapping as RepeatWrapping2,
  Uniform,
  WebGL3DRenderTarget
} from "https://esm.sh/three@0.185.1?external";
var Procedural3DTextureBase = class {
  constructor({ size, fragmentShader }) {
    __publicField(this, "size");
    __publicField(this, "needsRender", true);
    __publicField(this, "material");
    __publicField(this, "mesh");
    __publicField(this, "renderTarget");
    __publicField(this, "camera", new Camera());
    this.size = size;
    this.material = new RawShaderMaterial({
      glslVersion: GLSL3,
      vertexShader: (
        /* glsl */
        `
        in vec3 position;
        out vec2 vUv;
        void main() {
          vUv = position.xy * 0.5 + 0.5;
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      `
      ),
      fragmentShader,
      uniforms: {
        layer: new Uniform(0)
      }
    });
    this.mesh = new Mesh(new PlaneGeometry(2, 2), this.material);
    this.renderTarget = new WebGL3DRenderTarget(size, size, size, {
      depthBuffer: false,
      stencilBuffer: false,
      format: RedFormat2
    });
    const texture = this.renderTarget.texture;
    texture.minFilter = LinearFilter2;
    texture.magFilter = LinearFilter2;
    texture.wrapS = RepeatWrapping2;
    texture.wrapT = RepeatWrapping2;
    texture.wrapR = RepeatWrapping2;
    texture.colorSpace = NoColorSpace;
    texture.needsUpdate = true;
  }
  dispose() {
    this.renderTarget.dispose();
    this.material.dispose();
  }
  render(renderer, deltaTime) {
    if (!this.needsRender) {
      return;
    }
    this.needsRender = false;
    const renderTarget = renderer.getRenderTarget();
    for (let layer = 0; layer < this.size; ++layer) {
      this.material.uniforms.layer.value = layer / this.size;
      renderer.setRenderTarget(this.renderTarget, layer);
      renderer.render(this.mesh, this.camera);
    }
    renderer.setRenderTarget(renderTarget);
  }
  get texture() {
    return this.renderTarget.texture;
  }
};

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/shaders/cloudShapeDetail.frag
var cloudShapeDetail_default = '// Based on the following work with slight modifications.\n// https://github.com/sebh/TileableVolumeNoise\n\n/**\n * The MIT License (MIT)\n *\n * Copyright(c) 2017 S\xE9bastien Hillaire\n *\n * Permission is hereby granted, free of charge, to any person obtaining a copy\n * of this software and associated documentation files (the "Software"), to deal\n * in the Software without restriction, including without limitation the rights\n * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\n * copies of the Software, and to permit persons to whom the Software is\n * furnished to do so, subject to the following conditions:\n *\n * The above copyright notice and this permission notice shall be included in\n * all copies or substantial portions of the Software.\n *\n * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\n * SOFTWARE.\n */\n\nprecision highp float;\nprecision highp int;\n\n#include "core/math"\n#include "perlin"\n#include "tileableNoise"\n\nuniform float layer;\n\nin vec2 vUv;\n\nlayout(location = 0) out float outputColor;\n\nvoid main() {\n  vec3 point = vec3(vUv.x, vUv.y, layer);\n  float cellCount = 2.0;\n  vec4 noise = vec4(\n    1.0 - getWorleyNoise(point, cellCount * 1.0),\n    1.0 - getWorleyNoise(point, cellCount * 2.0),\n    1.0 - getWorleyNoise(point, cellCount * 4.0),\n    1.0 - getWorleyNoise(point, cellCount * 8.0)\n  );\n  vec3 fbm = vec3(\n    dot(noise.xyz, vec3(0.625, 0.25, 0.125)),\n    dot(noise.yzw, vec3(0.625, 0.25, 0.125)),\n    dot(noise.zw, vec2(0.75, 0.25))\n  );\n  outputColor = dot(fbm, vec3(0.625, 0.25, 0.125));\n}\n';

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/shaders/perlin.glsl
var perlin_default = '// Ported from GLM: https://github.com/g-truc/glm/blob/master/glm/gtc/noise.inl\n\n/**\n * OpenGL Mathematics (GLM)\n *\n * GLM is licensed under The Happy Bunny License or MIT License\n *\n * The Happy Bunny License (Modified MIT License)\n *\n * Copyright (c) 2005 - G-Truc Creation\n *\n * Permission is hereby granted, free of charge, to any person obtaining a copy\n * of this software and associated documentation files (the "Software"), to deal\n * in the Software without restriction, including without limitation the rights\n * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\n * copies of the Software, and to permit persons to whom the Software is\n * furnished to do so, subject to the following conditions:\n *\n * The above copyright notice and this permission notice shall be included in\n * all copies or substantial portions of the Software.\n *\n * Restrictions:\n *  By making use of the Software for military purposes, you choose to make a\n *  Bunny unhappy.\n *\n * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN\n * THE SOFTWARE.\n *\n * The MIT License\n *\n * Copyright (c) 2005 - G-Truc Creation\n *\n * Permission is hereby granted, free of charge, to any person obtaining a copy\n * of this software and associated documentation files (the "Software"), to deal\n * in the Software without restriction, including without limitation the rights\n * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\n * copies of the Software, and to permit persons to whom the Software is\n * furnished to do so, subject to the following conditions:\n *\n * The above copyright notice and this permission notice shall be included in\n * all copies or substantial portions of the Software.\n *\n * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN\n * THE SOFTWARE.\n */\n\nvec4 mod289(const vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(const vec4 v) {\n  return mod289((v * 34.0 + 1.0) * v);\n}\n\nvec4 taylorInvSqrt(const vec4 r) {\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec4 fade(const vec4 v) {\n  return v * v * v * (v * (v * 6.0 - 15.0) + 10.0);\n}\n\n// Classic Perlin noise, periodic version\nfloat perlin(const vec4 position, const vec4 rep) {\n  vec4 Pi0 = mod(floor(position), rep); // Integer part modulo rep\n  vec4 Pi1 = mod(Pi0 + 1.0, rep); // Integer part + 1 mod rep\n  vec4 Pf0 = fract(position); // Fractional part for interpolation\n  vec4 Pf1 = Pf0 - 1.0; // Fractional part - 1.0\n  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n  vec4 iy = vec4(Pi0.y, Pi0.y, Pi1.y, Pi1.y);\n  vec4 iz0 = vec4(Pi0.z);\n  vec4 iz1 = vec4(Pi1.z);\n  vec4 iw0 = vec4(Pi0.w);\n  vec4 iw1 = vec4(Pi1.w);\n\n  vec4 ixy = permute(permute(ix) + iy);\n  vec4 ixy0 = permute(ixy + iz0);\n  vec4 ixy1 = permute(ixy + iz1);\n  vec4 ixy00 = permute(ixy0 + iw0);\n  vec4 ixy01 = permute(ixy0 + iw1);\n  vec4 ixy10 = permute(ixy1 + iw0);\n  vec4 ixy11 = permute(ixy1 + iw1);\n\n  vec4 gx00 = ixy00 / 7.0;\n  vec4 gy00 = floor(gx00) / 7.0;\n  vec4 gz00 = floor(gy00) / 6.0;\n  gx00 = fract(gx00) - 0.5;\n  gy00 = fract(gy00) - 0.5;\n  gz00 = fract(gz00) - 0.5;\n  vec4 gw00 = vec4(0.75) - abs(gx00) - abs(gy00) - abs(gz00);\n  vec4 sw00 = step(gw00, vec4(0));\n  gx00 -= sw00 * (step(0.0, gx00) - 0.5);\n  gy00 -= sw00 * (step(0.0, gy00) - 0.5);\n\n  vec4 gx01 = ixy01 / 7.0;\n  vec4 gy01 = floor(gx01) / 7.0;\n  vec4 gz01 = floor(gy01) / 6.0;\n  gx01 = fract(gx01) - 0.5;\n  gy01 = fract(gy01) - 0.5;\n  gz01 = fract(gz01) - 0.5;\n  vec4 gw01 = vec4(0.75) - abs(gx01) - abs(gy01) - abs(gz01);\n  vec4 sw01 = step(gw01, vec4(0.0));\n  gx01 -= sw01 * (step(0.0, gx01) - 0.5);\n  gy01 -= sw01 * (step(0.0, gy01) - 0.5);\n\n  vec4 gx10 = ixy10 / 7.0;\n  vec4 gy10 = floor(gx10) / 7.0;\n  vec4 gz10 = floor(gy10) / 6.0;\n  gx10 = fract(gx10) - 0.5;\n  gy10 = fract(gy10) - 0.5;\n  gz10 = fract(gz10) - 0.5;\n  vec4 gw10 = vec4(0.75) - abs(gx10) - abs(gy10) - abs(gz10);\n  vec4 sw10 = step(gw10, vec4(0.0));\n  gx10 -= sw10 * (step(0.0, gx10) - 0.5);\n  gy10 -= sw10 * (step(0.0, gy10) - 0.5);\n\n  vec4 gx11 = ixy11 / 7.0;\n  vec4 gy11 = floor(gx11) / 7.0;\n  vec4 gz11 = floor(gy11) / 6.0;\n  gx11 = fract(gx11) - 0.5;\n  gy11 = fract(gy11) - 0.5;\n  gz11 = fract(gz11) - 0.5;\n  vec4 gw11 = vec4(0.75) - abs(gx11) - abs(gy11) - abs(gz11);\n  vec4 sw11 = step(gw11, vec4(0.0));\n  gx11 -= sw11 * (step(0.0, gx11) - 0.5);\n  gy11 -= sw11 * (step(0.0, gy11) - 0.5);\n\n  vec4 g0000 = vec4(gx00.x, gy00.x, gz00.x, gw00.x);\n  vec4 g1000 = vec4(gx00.y, gy00.y, gz00.y, gw00.y);\n  vec4 g0100 = vec4(gx00.z, gy00.z, gz00.z, gw00.z);\n  vec4 g1100 = vec4(gx00.w, gy00.w, gz00.w, gw00.w);\n  vec4 g0010 = vec4(gx10.x, gy10.x, gz10.x, gw10.x);\n  vec4 g1010 = vec4(gx10.y, gy10.y, gz10.y, gw10.y);\n  vec4 g0110 = vec4(gx10.z, gy10.z, gz10.z, gw10.z);\n  vec4 g1110 = vec4(gx10.w, gy10.w, gz10.w, gw10.w);\n  vec4 g0001 = vec4(gx01.x, gy01.x, gz01.x, gw01.x);\n  vec4 g1001 = vec4(gx01.y, gy01.y, gz01.y, gw01.y);\n  vec4 g0101 = vec4(gx01.z, gy01.z, gz01.z, gw01.z);\n  vec4 g1101 = vec4(gx01.w, gy01.w, gz01.w, gw01.w);\n  vec4 g0011 = vec4(gx11.x, gy11.x, gz11.x, gw11.x);\n  vec4 g1011 = vec4(gx11.y, gy11.y, gz11.y, gw11.y);\n  vec4 g0111 = vec4(gx11.z, gy11.z, gz11.z, gw11.z);\n  vec4 g1111 = vec4(gx11.w, gy11.w, gz11.w, gw11.w);\n\n  vec4 norm00 = taylorInvSqrt(\n    vec4(dot(g0000, g0000), dot(g0100, g0100), dot(g1000, g1000), dot(g1100, g1100))\n  );\n  g0000 *= norm00.x;\n  g0100 *= norm00.y;\n  g1000 *= norm00.z;\n  g1100 *= norm00.w;\n\n  vec4 norm01 = taylorInvSqrt(\n    vec4(dot(g0001, g0001), dot(g0101, g0101), dot(g1001, g1001), dot(g1101, g1101))\n  );\n  g0001 *= norm01.x;\n  g0101 *= norm01.y;\n  g1001 *= norm01.z;\n  g1101 *= norm01.w;\n\n  vec4 norm10 = taylorInvSqrt(\n    vec4(dot(g0010, g0010), dot(g0110, g0110), dot(g1010, g1010), dot(g1110, g1110))\n  );\n  g0010 *= norm10.x;\n  g0110 *= norm10.y;\n  g1010 *= norm10.z;\n  g1110 *= norm10.w;\n\n  vec4 norm11 = taylorInvSqrt(\n    vec4(dot(g0011, g0011), dot(g0111, g0111), dot(g1011, g1011), dot(g1111, g1111))\n  );\n  g0011 *= norm11.x;\n  g0111 *= norm11.y;\n  g1011 *= norm11.z;\n  g1111 *= norm11.w;\n\n  float n0000 = dot(g0000, Pf0);\n  float n1000 = dot(g1000, vec4(Pf1.x, Pf0.y, Pf0.z, Pf0.w));\n  float n0100 = dot(g0100, vec4(Pf0.x, Pf1.y, Pf0.z, Pf0.w));\n  float n1100 = dot(g1100, vec4(Pf1.x, Pf1.y, Pf0.z, Pf0.w));\n  float n0010 = dot(g0010, vec4(Pf0.x, Pf0.y, Pf1.z, Pf0.w));\n  float n1010 = dot(g1010, vec4(Pf1.x, Pf0.y, Pf1.z, Pf0.w));\n  float n0110 = dot(g0110, vec4(Pf0.x, Pf1.y, Pf1.z, Pf0.w));\n  float n1110 = dot(g1110, vec4(Pf1.x, Pf1.y, Pf1.z, Pf0.w));\n  float n0001 = dot(g0001, vec4(Pf0.x, Pf0.y, Pf0.z, Pf1.w));\n  float n1001 = dot(g1001, vec4(Pf1.x, Pf0.y, Pf0.z, Pf1.w));\n  float n0101 = dot(g0101, vec4(Pf0.x, Pf1.y, Pf0.z, Pf1.w));\n  float n1101 = dot(g1101, vec4(Pf1.x, Pf1.y, Pf0.z, Pf1.w));\n  float n0011 = dot(g0011, vec4(Pf0.x, Pf0.y, Pf1.z, Pf1.w));\n  float n1011 = dot(g1011, vec4(Pf1.x, Pf0.y, Pf1.z, Pf1.w));\n  float n0111 = dot(g0111, vec4(Pf0.x, Pf1.y, Pf1.z, Pf1.w));\n  float n1111 = dot(g1111, Pf1);\n\n  vec4 fade_xyzw = fade(Pf0);\n  vec4 n_0w = mix(vec4(n0000, n1000, n0100, n1100), vec4(n0001, n1001, n0101, n1101), fade_xyzw.w);\n  vec4 n_1w = mix(vec4(n0010, n1010, n0110, n1110), vec4(n0011, n1011, n0111, n1111), fade_xyzw.w);\n  vec4 n_zw = mix(n_0w, n_1w, fade_xyzw.z);\n  vec2 n_yzw = mix(n_zw.xy, n_zw.zw, fade_xyzw.y);\n  float n_xyzw = mix(n_yzw.x, n_yzw.y, fade_xyzw.x);\n  return 2.2 * n_xyzw;\n}\n';

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/shaders/tileableNoise.glsl
var tileableNoise_default = '// Based on the following work with slight modifications.\n// https://github.com/sebh/TileableVolumeNoise\n\n/**\n * The MIT License (MIT)\n *\n * Copyright(c) 2017 S\xE9bastien Hillaire\n *\n * Permission is hereby granted, free of charge, to any person obtaining a copy\n * of this software and associated documentation files (the "Software"), to deal\n * in the Software without restriction, including without limitation the rights\n * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\n * copies of the Software, and to permit persons to whom the Software is\n * furnished to do so, subject to the following conditions:\n *\n * The above copyright notice and this permission notice shall be included in\n * all copies or substantial portions of the Software.\n *\n * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\n * SOFTWARE.\n */\n\nfloat hash(const float n) {\n  return fract(sin(n + 1.951) * 43758.5453);\n}\n\nfloat noise(const vec3 x) {\n  vec3 p = floor(x);\n  vec3 f = fract(x);\n\n  f = f * f * (3.0 - 2.0 * f);\n  float n = p.x + p.y * 57.0 + 113.0 * p.z;\n  return mix(\n    mix(mix(hash(n + 0.0), hash(n + 1.0), f.x), mix(hash(n + 57.0), hash(n + 58.0), f.x), f.y),\n    mix(\n      mix(hash(n + 113.0), hash(n + 114.0), f.x),\n      mix(hash(n + 170.0), hash(n + 171.0), f.x),\n      f.y\n    ),\n    f.z\n  );\n}\n\nfloat getWorleyNoise(const vec3 p, const float cellCount) {\n  vec3 cell = p * cellCount;\n  float d = 1.0e10;\n  for (int x = -1; x <= 1; ++x) {\n    for (int y = -1; y <= 1; ++y) {\n      for (int z = -1; z <= 1; ++z) {\n        vec3 tp = floor(cell) + vec3(x, y, z);\n        tp = cell - tp - noise(mod(tp, cellCount / 1.0));\n        d = min(d, dot(tp, tp));\n      }\n    }\n  }\n  return clamp(d, 0.0, 1.0);\n}\n\nfloat getPerlinNoise(const vec3 point, const vec3 frequency, const int octaveCount) {\n  // Noise frequency factor between octave, forced to 2.\n  const float octaveFrequencyFactor = 2.0;\n\n  // Compute the sum for each octave.\n  float sum = 0.0;\n  float roughness = 0.5;\n  float weightSum = 0.0;\n  float weight = 1.0;\n  vec3 nextFrequency = frequency;\n  for (int i = 0; i < octaveCount; ++i) {\n    vec4 p = vec4(point.x, point.y, point.z, 0.0) * vec4(nextFrequency, 1.0);\n    float value = perlin(p, vec4(nextFrequency, 1.0));\n    sum += value * weight;\n    weightSum += weight;\n    weight *= roughness;\n    nextFrequency *= octaveFrequencyFactor;\n  }\n\n  return sum / weightSum; // Intentionally skip clamping.\n}\n\nfloat getPerlinNoise(const vec3 point, const float frequency, const int octaveCount) {\n  return getPerlinNoise(point, vec3(frequency), octaveCount);\n}\n';

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/CloudShapeDetail.ts
var CloudShapeDetail = class extends Procedural3DTextureBase {
  constructor() {
    super({
      size: CLOUD_SHAPE_DETAIL_TEXTURE_SIZE,
      fragmentShader: resolveIncludes(cloudShapeDetail_default, {
        core: { math },
        perlin: perlin_default,
        tileableNoise: tileableNoise_default
      })
    });
  }
};
export {
  CloudShapeDetail
};
