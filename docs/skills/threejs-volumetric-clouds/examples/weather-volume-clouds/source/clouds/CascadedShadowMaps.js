// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/CascadedShadowMaps.ts
import {
  Box3 as Box32,
  Matrix4 as Matrix43,
  Object3D,
  Vector2 as Vector22,
  Vector3 as Vector38
} from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/vendor/tiny-invariant.ts
function invariant(condition, message) {
  if (condition) return;
  const provided = typeof message === "function" ? message() : message;
  throw new Error(provided != null ? `Invariant failed: ${provided}` : "Invariant failed");
}

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/helpers/FrustumCorners.ts
import { Vector3 } from "https://esm.sh/three@0.185.1?external";
var FrustumCorners = class _FrustumCorners {
  near = [new Vector3(), new Vector3(), new Vector3(), new Vector3()];
  far = [new Vector3(), new Vector3(), new Vector3(), new Vector3()];
  constructor(camera, far) {
    if (camera != null && far != null) {
      this.setFromCamera(camera, far);
    }
  }
  clone() {
    return new _FrustumCorners().copy(this);
  }
  copy(other) {
    for (let i = 0; i < 4; ++i) {
      this.near[i].copy(other.near[i]);
      this.far[i].copy(other.far[i]);
    }
    return this;
  }
  setFromCamera(camera, far) {
    const isOrthographic = camera.isOrthographicCamera === true;
    const inverseProjectionMatrix = camera.projectionMatrixInverse;
    this.near[0].set(1, 1, -1);
    this.near[1].set(1, -1, -1);
    this.near[2].set(-1, -1, -1);
    this.near[3].set(-1, 1, -1);
    for (let i = 0; i < 4; ++i) {
      this.near[i].applyMatrix4(inverseProjectionMatrix);
    }
    this.far[0].set(1, 1, 1);
    this.far[1].set(1, -1, 1);
    this.far[2].set(-1, -1, 1);
    this.far[3].set(-1, 1, 1);
    for (let i = 0; i < 4; ++i) {
      const corner = this.far[i];
      corner.applyMatrix4(inverseProjectionMatrix);
      const absZ = Math.abs(corner.z);
      if (isOrthographic) {
        corner.z *= Math.min(far / absZ, 1);
      } else {
        corner.multiplyScalar(Math.min(far / absZ, 1));
      }
    }
    return this;
  }
  split(clipDepths, result = []) {
    for (let index = 0; index < clipDepths.length; ++index) {
      const frustum = result[index] ??= new _FrustumCorners();
      if (index === 0) {
        for (let i = 0; i < 4; ++i) {
          frustum.near[i].copy(this.near[i]);
        }
      } else {
        for (let i = 0; i < 4; ++i) {
          frustum.near[i].lerpVectors(
            this.near[i],
            this.far[i],
            clipDepths[index - 1]
          );
        }
      }
      if (index === clipDepths.length - 1) {
        for (let i = 0; i < 4; ++i) {
          frustum.far[i].copy(this.far[i]);
        }
      } else {
        for (let i = 0; i < 4; ++i) {
          frustum.far[i].lerpVectors(
            this.near[i],
            this.far[i],
            clipDepths[index]
          );
        }
      }
    }
    result.length = clipDepths.length;
    return result;
  }
  applyMatrix4(matrix) {
    for (let i = 0; i < 4; ++i) {
      this.near[i].applyMatrix4(matrix);
      this.far[i].applyMatrix4(matrix);
    }
    return this;
  }
};

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/ArrayBufferLoader.ts
import { FileLoader, Loader } from "https://esm.sh/three@0.185.1?external";
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
  Vector3 as Vector32
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

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/Ellipsoid.ts
import { Matrix4, Vector3 as Vector34 } from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/helpers/projectOnEllipsoidSurface.ts
import { Vector3 as Vector33 } from "https://esm.sh/three@0.185.1?external";
var vectorScratch = /* @__PURE__ */ new Vector33();
function projectOnEllipsoidSurface(position, reciprocalRadiiSquared, result = new Vector33(), options) {
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
var vectorScratch1 = /* @__PURE__ */ new Vector34();
var vectorScratch2 = /* @__PURE__ */ new Vector34();
var vectorScratch3 = /* @__PURE__ */ new Vector34();
var Ellipsoid = class _Ellipsoid {
  static WGS84 = /* @__PURE__ */ new _Ellipsoid(
    6378137,
    6378137,
    6356752314245179e-9
  );
  radii;
  constructor(x, y, z) {
    this.radii = new Vector34(x, y, z);
  }
  get minimumRadius() {
    return Math.min(this.radii.x, this.radii.y, this.radii.z);
  }
  get maximumRadius() {
    return Math.max(this.radii.x, this.radii.y, this.radii.z);
  }
  reciprocalRadii(result = new Vector34()) {
    const { x, y, z } = this.radii;
    return result.set(1 / x, 1 / y, 1 / z);
  }
  reciprocalRadiiSquared(result = new Vector34()) {
    const { x, y, z } = this.radii;
    return result.set(1 / x ** 2, 1 / y ** 2, 1 / z ** 2);
  }
  projectOnSurface(position, result = new Vector34(), options) {
    return projectOnEllipsoidSurface(
      position,
      this.reciprocalRadiiSquared(),
      result,
      options
    );
  }
  getSurfaceNormal(position, result = new Vector34()) {
    return result.multiplyVectors(this.reciprocalRadiiSquared(vectorScratch1), position).normalize();
  }
  getEastNorthUpVectors(position, east = new Vector34(), north = new Vector34(), up = new Vector34()) {
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
  getIntersection(ray, result = new Vector34()) {
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
  getOsculatingSphereCenter(surfacePosition, radius, result = new Vector34()) {
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
  getNormalAtHorizon(position, direction, result = new Vector34()) {
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
import { BufferAttribute as BufferAttribute2, BufferGeometry as BufferGeometry2, Vector3 as Vector35 } from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/EXR3DLoader.ts
import { Data3DTexture as Data3DTexture2, Loader as Loader4 } from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/Geodetic.ts
import { Vector3 as Vector36 } from "https://esm.sh/three@0.185.1?external";
var vectorScratch12 = /* @__PURE__ */ new Vector36();
var vectorScratch22 = /* @__PURE__ */ new Vector36();
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
  toECEF(result = new Vector36(), options) {
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
import { Matrix4 as Matrix42, Quaternion, Ray, Vector3 as Vector37 } from "https://esm.sh/three@0.185.1?external";

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

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/helpers/splitFrustum.ts
var modes = {
  uniform: (count, near, far, _, result = []) => {
    for (let i = 0; i < count; ++i) {
      result[i] = (near + (far - near) * (i + 1) / count) / far;
    }
    result.length = count;
    return result;
  },
  logarithmic: (count, near, far, _, result = []) => {
    for (let i = 0; i < count; ++i) {
      result[i] = near * (far / near) ** ((i + 1) / count) / far;
    }
    result.length = count;
    return result;
  },
  practical: (count, near, far, lambda = 0.5, result = []) => {
    for (let i = 0; i < count; ++i) {
      const uniform = (near + (far - near) * (i + 1) / count) / far;
      const logarithmic = near * (far / near) ** ((i + 1) / count) / far;
      result[i] = lerp(uniform, logarithmic, lambda);
    }
    result.length = count;
    return result;
  }
};
function splitFrustum(mode, count, near, far, lambda, result = []) {
  return modes[mode](count, near, far, lambda, result);
}

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/CascadedShadowMaps.ts
var vectorScratch13 = /* @__PURE__ */ new Vector38();
var vectorScratch23 = /* @__PURE__ */ new Vector38();
var matrixScratch1 = /* @__PURE__ */ new Matrix43();
var matrixScratch2 = /* @__PURE__ */ new Matrix43();
var frustumScratch = /* @__PURE__ */ new FrustumCorners();
var boxScratch = /* @__PURE__ */ new Box32();
var cascadedShadowMapsDefaults = {
  maxFar: null,
  farScale: 1,
  splitMode: "practical",
  splitLambda: 0.5,
  margin: 0,
  fade: true
};
var CascadedShadowMaps = class {
  cascades = [];
  mapSize = new Vector22();
  maxFar;
  farScale;
  splitMode;
  splitLambda;
  margin;
  fade;
  cameraFrustum = new FrustumCorners();
  frusta = [];
  splits = [];
  _far = 0;
  constructor(options) {
    const {
      cascadeCount,
      mapSize,
      maxFar,
      farScale,
      splitMode,
      splitLambda,
      margin,
      fade
    } = {
      ...cascadedShadowMapsDefaults,
      ...options
    };
    this.cascadeCount = cascadeCount;
    this.mapSize.copy(mapSize);
    this.maxFar = maxFar;
    this.farScale = farScale;
    this.splitMode = splitMode;
    this.splitLambda = splitLambda;
    this.margin = margin;
    this.fade = fade;
  }
  get cascadeCount() {
    return this.cascades.length;
  }
  set cascadeCount(value) {
    if (value !== this.cascadeCount) {
      for (let i = 0; i < value; ++i) {
        this.cascades[i] ??= {
          interval: new Vector22(),
          matrix: new Matrix43(),
          inverseMatrix: new Matrix43(),
          projectionMatrix: new Matrix43(),
          inverseProjectionMatrix: new Matrix43(),
          viewMatrix: new Matrix43(),
          inverseViewMatrix: new Matrix43()
        };
      }
      this.cascades.length = value;
    }
  }
  get far() {
    return this._far;
  }
  updateIntervals(camera) {
    const cascadeCount = this.cascadeCount;
    const splits = this.splits;
    const far = this.far;
    splitFrustum(
      this.splitMode,
      cascadeCount,
      camera.near,
      far,
      this.splitLambda,
      splits
    );
    this.cameraFrustum.setFromCamera(camera, far);
    this.cameraFrustum.split(splits, this.frusta);
    const cascades = this.cascades;
    for (let i = 0; i < cascadeCount; ++i) {
      cascades[i].interval.set(splits[i - 1] ?? 0, splits[i] ?? 0);
    }
  }
  getFrustumRadius(camera, frustum) {
    const nearCorners = frustum.near;
    const farCorners = frustum.far;
    let diagonalLength = Math.max(
      farCorners[0].distanceTo(farCorners[2]),
      farCorners[0].distanceTo(nearCorners[2])
    );
    if (this.fade) {
      const near = camera.near;
      const far = this.far;
      const distance = farCorners[0].z / (far - near);
      diagonalLength += 0.25 * distance ** 2 * (far - near);
    }
    return diagonalLength * 0.5;
  }
  updateMatrices(camera, sunDirection, distance = 1) {
    const lightOrientationMatrix = matrixScratch1.lookAt(
      vectorScratch13.setScalar(0),
      vectorScratch23.copy(sunDirection).multiplyScalar(-1),
      Object3D.DEFAULT_UP
    );
    const cameraToLightMatrix = matrixScratch2.multiplyMatrices(
      matrixScratch2.copy(lightOrientationMatrix).invert(),
      camera.matrixWorld
    );
    const frusta = this.frusta;
    const cascades = this.cascades;
    invariant(frusta.length === cascades.length);
    const margin = this.margin;
    const mapSize = this.mapSize;
    for (let i = 0; i < frusta.length; ++i) {
      const frustum = frusta[i];
      const cascade = cascades[i];
      const radius = this.getFrustumRadius(camera, frusta[i]);
      const left = -radius;
      const right = radius;
      const top = radius;
      const bottom = -radius;
      cascade.projectionMatrix.makeOrthographic(
        left,
        right,
        top,
        bottom,
        -this.margin,
        // near
        radius * 2 + this.margin
        // far
      );
      const { near, far } = frustumScratch.copy(frustum).applyMatrix4(cameraToLightMatrix);
      const bbox = boxScratch.makeEmpty();
      for (let j = 0; j < 4; j++) {
        bbox.expandByPoint(near[j]);
        bbox.expandByPoint(far[j]);
      }
      const center = bbox.getCenter(vectorScratch13);
      center.z = bbox.max.z + margin;
      const texelWidth = (right - left) / mapSize.width;
      const texelHeight = (top - bottom) / mapSize.height;
      center.x = Math.round(center.x / texelWidth) * texelWidth;
      center.y = Math.round(center.y / texelHeight) * texelHeight;
      center.applyMatrix4(lightOrientationMatrix);
      const position = vectorScratch23.copy(sunDirection).multiplyScalar(distance).add(center);
      cascade.inverseViewMatrix.lookAt(center, position, Object3D.DEFAULT_UP).setPosition(position);
    }
  }
  update(camera, sunDirection, distance) {
    this._far = this.maxFar != null ? Math.min(this.maxFar, camera.far * this.farScale) : camera.far * this.farScale;
    this.updateIntervals(camera);
    this.updateMatrices(camera, sunDirection, distance);
    const cascades = this.cascades;
    const cascadeCount = this.cascadeCount;
    for (let i = 0; i < cascadeCount; ++i) {
      const {
        matrix,
        inverseMatrix,
        projectionMatrix,
        inverseProjectionMatrix,
        viewMatrix,
        inverseViewMatrix
      } = cascades[i];
      inverseProjectionMatrix.copy(projectionMatrix).invert();
      viewMatrix.copy(inverseViewMatrix).invert();
      matrix.copy(projectionMatrix).multiply(viewMatrix);
      inverseMatrix.copy(inverseViewMatrix).multiply(inverseProjectionMatrix);
    }
  }
};
export {
  CascadedShadowMaps,
  cascadedShadowMapsDefaults
};
