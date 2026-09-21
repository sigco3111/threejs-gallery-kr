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

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/CloudsPass.ts
import { ShaderPass as ShaderPass2 } from "https://esm.sh/postprocessing@6.37.4?deps=three@0.185.1&external=three";
import {
  HalfFloatType as HalfFloatType4,
  LinearFilter as LinearFilter3,
  RedFormat as RedFormat3,
  WebGLRenderTarget as WebGLRenderTarget2
} from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/CloudsMaterial.ts
import {
  GLSL3 as GLSL33,
  Matrix4 as Matrix410,
  Uniform as Uniform6,
  Vector2 as Vector28,
  Vector3 as Vector319,
  Vector4
} from "https://esm.sh/three@0.185.1?external";

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

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/assertions.ts
function assertType(value) {
}

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
function createDataLoaderClass(Texture, parser, parameters2) {
  return class extends DataLoader {
    constructor() {
      super(...arguments);
      this.Texture = Texture;
      this.TypedArrayLoader = createTypedArrayLoaderClass(parser);
      this.parameters = {
        ...defaultDataTextureParameter,
        ...parameters2
      };
    }
  };
}
function createData3DTextureLoaderClass(parser, parameters2) {
  return createDataLoaderClass(Data3DTexture, parser, parameters2);
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
function defineFloat(name, {
  min = -Infinity,
  max = Infinity,
  precision = 7
} = {}) {
  return (target, propertyKey) => {
    if (target instanceof Material) {
      Object.defineProperty(target, propertyKey, {
        enumerable: true,
        get() {
          const value = this.defines?.[name];
          return value != null ? parseFloat(value) : 0;
        },
        set(value) {
          const prevValue = this[propertyKey];
          if (value !== prevValue) {
            this.defines ??= {};
            this.defines[name] = clamp(value, min, max).toFixed(precision);
            this.needsUpdate = true;
          }
        }
      });
    } else {
      Object.defineProperty(target, propertyKey, {
        enumerable: true,
        get() {
          const value = this.defines.get(name);
          return value != null ? parseFloat(value) : 0;
        },
        set(value) {
          const prevValue = this[propertyKey];
          if (value !== prevValue) {
            this.defines.set(name, clamp(value, min, max).toFixed(precision));
            this.setChanged();
          }
        }
      });
    }
  };
}
function defineExpression(name, { validate } = {}) {
  return (target, propertyKey) => {
    if (target instanceof Material) {
      Object.defineProperty(target, propertyKey, {
        enumerable: true,
        get() {
          return this.defines?.[name] ?? "";
        },
        set(value) {
          if (value !== this[propertyKey]) {
            if (validate?.(value) === false) {
              console.error(`Expression validation failed: ${value}`);
              return;
            }
            this.defines ??= {};
            this.defines[name] = value;
            this.needsUpdate = true;
          }
        }
      });
    } else {
      Object.defineProperty(target, propertyKey, {
        enumerable: true,
        get() {
          return this.defines.get(name) ?? "";
        },
        set(value) {
          if (value !== this[propertyKey]) {
            if (validate?.(value) === false) {
              console.error(`Expression validation failed: ${value}`);
              return;
            }
            this.defines.set(name, value);
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

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/shaders/generators.glsl
var generators_default = "float checker(const vec2 uv, const vec2 repeats) {\n  vec2 c = floor(repeats * uv);\n  float result = mod(c.x + c.y, 2.0);\n  return sign(result);\n}\n\nfloat checker(const vec2 uv, const float repeats) {\n  return checker(uv, vec2(repeats));\n}\n";

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

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/shaders/turbo.glsl
var turbo_default = "// A fifth-order polynomial approximation of Turbo color map.\n// See: https://observablehq.com/@mbostock/turbo\n// prettier-ignore\nvec3 turbo(const float x) {\n  float r = 0.1357 + x * (4.5974 - x * (42.3277 - x * (130.5887 - x * (150.5666 - x * 58.1375))));\n  float g = 0.0914 + x * (2.1856 + x * (4.8052 - x * (14.0195 - x * (4.2109 + x * 2.7747))));\n  float b = 0.1067 + x * (12.5925 - x * (60.1097 - x * (109.0745 - x * (88.5066 - x * 26.8183))));\n  return vec3(r, g, b);\n}\n";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/shaders/vogelDisk.glsl
var vogelDisk_default = "// Reference: https://www.gamedev.net/tutorials/programming/graphics/contact-hardening-soft-shadows-made-fast-r4906/\n\nvec2 vogelDisk(const int index, const int sampleCount, const float phi) {\n  const float goldenAngle = 2.39996322972865332;\n  float r = sqrt(float(index) + 0.5) / sqrt(float(sampleCount));\n  float theta = float(index) * goldenAngle + phi;\n  return r * vec2(cos(theta), sin(theta));\n}\n";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/shaders/index.ts
var cascadedShadowMaps = cascadedShadowMaps_default;
var depth = depth_default;
var generators = generators_default;
var interleavedGradientNoise = interleavedGradientNoise_default;
var math = math_default;
var packing = packing_default;
var raySphereIntersection = raySphereIntersection_default;
var transform = transform_default;
var turbo = turbo_default;
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
    this.ellipsoidMatrix = new Matrix44();
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
  onBeforeCompile(parameters2, renderer) {
    parameters2.fragmentShader = includeRenderTargets(
      parameters2.fragmentShader,
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

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/blackBodyChromaticity.ts
import { Color, Matrix3, Vector3 as Vector311 } from "https://esm.sh/three@0.185.1?external";

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

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/getSunLightColor.ts
import { Color as Color2, Vector2 as Vector23, Vector3 as Vector314 } from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/helpers/sampleTexture.ts
import { HalfFloatType as HalfFloatType2, Vector3 as Vector313 } from "https://esm.sh/three@0.185.1?external";

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
  RedFormat as RedFormat2,
  RGBADepthPacking,
  Uniform as Uniform3,
  UnsignedIntType as UnsignedIntType2,
  WebGLRenderTarget
} from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/PrecomputedTexturesLoader.ts
import {
  FloatType as FloatType2,
  HalfFloatType as HalfFloatType3,
  LinearFilter as LinearFilter2,
  Loader as Loader5
} from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/SkyLightProbe.ts
import { LightProbe, Matrix4 as Matrix46, Vector2 as Vector24, Vector3 as Vector315 } from "https://esm.sh/three@0.185.1?external";
var L0_COEFF = 1 / Math.sqrt(Math.PI);
var L1_COEFF = Math.sqrt(3) / (2 * Math.sqrt(Math.PI));
var skyLightProbeParametersDefaults = {
  ellipsoid: Ellipsoid.WGS84,
  correctAltitude: true,
  photometric: true
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

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/StarsGeometry.ts
import {
  BufferGeometry as BufferGeometry3,
  InterleavedBuffer,
  InterleavedBufferAttribute,
  Sphere as Sphere2,
  Vector3 as Vector317
} from "https://esm.sh/three@0.185.1?external";

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
var StarsMaterial = class extends AtmosphereMaterialBase {
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
__decorateClass([
  define("BACKGROUND")
], StarsMaterial.prototype, "background", 2);

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/SunDirectionalLight.ts
import { DirectionalLight, Matrix4 as Matrix49, Vector3 as Vector318 } from "https://esm.sh/three@0.185.1?external";
var sunDirectionalLightParametersDefaults = {
  ellipsoid: Ellipsoid.WGS84,
  correctAltitude: true,
  photometric: true,
  distance: 1
};

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/shaders/index.ts
var functions = functions_default;
var parameters = parameters_default;

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/bayer.ts
import { Vector2 as Vector26 } from "https://esm.sh/three@0.185.1?external";
var bayerIndices = [
  0,
  8,
  2,
  10,
  12,
  4,
  14,
  6,
  3,
  11,
  1,
  9,
  15,
  7,
  13,
  5
];
var bayerOffsets = /* @__PURE__ */ bayerIndices.reduce(
  (result, _, index) => {
    const offset = new Vector26();
    for (let i = 0; i < 16; ++i) {
      if (bayerIndices[i] === index) {
        offset.set((i % 4 + 0.5) / 4, (Math.floor(i / 4) + 0.5) / 4);
        break;
      }
    }
    return [...result, offset];
  },
  []
);

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/qualityPresets.ts
import { Vector2 as Vector27 } from "https://esm.sh/three@0.185.1?external";
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
    mapSize: /* @__PURE__ */ new Vector27(512, 512),
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
      mapSize: /* @__PURE__ */ new Vector27(256, 256)
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
      mapSize: /* @__PURE__ */ new Vector27(256, 256)
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
      mapSize: /* @__PURE__ */ new Vector27(1024, 1024)
    }
  }
};

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/shaders/clouds.frag
var clouds_default = `precision highp float;
precision highp sampler3D;
precision highp sampler2DArray;

#include <common>
#include <packing>

#include "core/depth"
#include "core/math"
#include "core/turbo"
#include "core/generators"
#include "core/raySphereIntersection"
#include "core/cascadedShadowMaps"
#include "core/interleavedGradientNoise"
#include "core/vogelDisk"
#include "atmosphere/parameters"
#include "atmosphere/functions"
#include "types"
#include "parameters"
#include "clouds"

#if !defined(RECIPROCAL_PI4)
#define RECIPROCAL_PI4 (0.07957747154594767)
#endif // !defined(RECIPROCAL_PI4)

uniform sampler2D depthBuffer;
uniform mat4 viewMatrix;
uniform mat4 reprojectionMatrix;
uniform float cameraNear;
uniform float cameraFar;
uniform float cameraHeight;
uniform vec2 temporalJitter;
uniform vec2 targetUvScale;
uniform float mipLevelScale;

// Scattering
const vec2 scatterAnisotropy = vec2(SCATTER_ANISOTROPY_1, SCATTER_ANISOTROPY_2);
const float scatterAnisotropyMix = SCATTER_ANISOTROPY_MIX;
uniform float skyIrradianceScale;
uniform float groundIrradianceScale;
uniform float powderScale;
uniform float powderExponent;

// Primary raymarch
uniform int maxIterationCount;
uniform float minStepSize;
uniform float maxStepSize;
uniform float maxRayDistance;
uniform float perspectiveStepScale;

// Secondary raymarch
uniform int maxIterationCountToSun;
uniform int maxIterationCountToGround;
uniform float minSecondaryStepSize;
uniform float secondaryStepScale;

// Beer shadow map
uniform sampler2DArray shadowBuffer;
uniform vec2 shadowTexelSize;
uniform vec2 shadowIntervals[SHADOW_CASCADE_COUNT];
uniform mat4 shadowMatrices[SHADOW_CASCADE_COUNT];
uniform float shadowFar;
uniform float maxShadowFilterRadius;

// Shadow length
#ifdef SHADOW_LENGTH
uniform int maxShadowLengthIterationCount;
uniform float minShadowLengthStepSize;
uniform float maxShadowLengthRayDistance;
#endif // SHADOW_LENGTH

in vec2 vUv;
in vec3 vCameraPosition;
in vec3 vCameraDirection; // Direction to the center of screen
in vec3 vRayDirection; // Direction to the texel
in vec3 vEllipsoidCenter;
in GroundIrradiance vGroundIrradiance;
in CloudsIrradiance vCloudsIrradiance;

layout(location = 0) out vec4 outputColor;
layout(location = 1) out vec3 outputDepthVelocity;
#ifdef SHADOW_LENGTH
layout(location = 2) out float outputShadowLength;
#endif // SHADOW_LENGTH

float readDepth(const vec2 uv) {
  #if DEPTH_PACKING == 3201
  return unpackRGBAToDepth(texture(depthBuffer, uv));
  #else // DEPTH_PACKING == 3201
  return texture(depthBuffer, uv).r;
  #endif // DEPTH_PACKING == 3201
}

float getViewZ(const float depth) {
  #ifdef PERSPECTIVE_CAMERA
  return perspectiveDepthToViewZ(depth, cameraNear, cameraFar);
  #else // PERSPECTIVE_CAMERA
  return orthographicDepthToViewZ(depth, cameraNear, cameraFar);
  #endif // PERSPECTIVE_CAMERA
}

vec3 ECEFToWorld(const vec3 positionECEF) {
  return mat3(ellipsoidMatrix) * (positionECEF + vEllipsoidCenter);
}

vec2 getShadowUv(const vec3 worldPosition, const int cascadeIndex) {
  vec4 clip = shadowMatrices[cascadeIndex] * vec4(worldPosition, 1.0);
  clip /= clip.w;
  return clip.xy * 0.5 + 0.5;
}

float getDistanceToShadowTop(const vec3 rayPosition) {
  // Distance to the top of the shadows along the sun direction, which matches
  // the ray origin of BSM.
  return raySphereSecondIntersection(
    rayPosition,
    sunDirection,
    vec3(0.0),
    bottomRadius + shadowTopHeight
  );
}

#ifdef DEBUG_SHOW_CASCADES

const vec3 cascadeColors[4] = vec3[4](
  vec3(1.0, 0.0, 0.0),
  vec3(0.0, 1.0, 0.0),
  vec3(0.0, 0.0, 1.0),
  vec3(1.0, 1.0, 0.0)
);

vec3 getCascadeColor(const vec3 rayPosition) {
  vec3 worldPosition = ECEFToWorld(rayPosition);
  int cascadeIndex = getCascadeIndex(
    viewMatrix,
    worldPosition,
    shadowIntervals,
    cameraNear,
    shadowFar
  );
  vec2 uv = getShadowUv(worldPosition, cascadeIndex);
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
    return vec3(1.0);
  }
  return cascadeColors[cascadeIndex];
}

vec3 getFadedCascadeColor(const vec3 rayPosition, const float jitter) {
  vec3 worldPosition = ECEFToWorld(rayPosition);
  int cascadeIndex = getFadedCascadeIndex(
    viewMatrix,
    worldPosition,
    shadowIntervals,
    cameraNear,
    shadowFar,
    jitter
  );
  return cascadeIndex >= 0
    ? cascadeColors[cascadeIndex]
    : vec3(1.0);
}

#endif // DEBUG_SHOW_CASCADES

float readShadowOpticalDepth(
  const vec2 uv,
  const float distanceToTop,
  const float distanceOffset,
  const int cascadeIndex
) {
  // r: frontDepth, g: meanExtinction, b: maxOpticalDepth, a: maxOpticalDepthTail
  // Also see the discussion here: https://x.com/shotamatsuda/status/1885322308908442106
  vec4 shadow = texture(shadowBuffer, vec3(uv, float(cascadeIndex)));
  float distanceToFront = max(0.0, distanceToTop - distanceOffset - shadow.r);
  return min(shadow.b + shadow.a, shadow.g * distanceToFront);
}

float sampleShadowOpticalDepthPCF(
  const vec3 worldPosition,
  const float distanceToTop,
  const float distanceOffset,
  const float radius,
  const int cascadeIndex
) {
  vec2 uv = getShadowUv(worldPosition, cascadeIndex);
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
    return 0.0;
  }
  if (radius < 0.1) {
    return readShadowOpticalDepth(uv, distanceToTop, distanceOffset, cascadeIndex);
  }
  float sum = 0.0;
  vec2 offset;
  #pragma unroll_loop_start
  for (int i = 0; i < 16; ++i) {
    #if UNROLLED_LOOP_INDEX < SHADOW_SAMPLE_COUNT
    offset = vogelDisk(
      UNROLLED_LOOP_INDEX,
      SHADOW_SAMPLE_COUNT,
      interleavedGradientNoise(gl_FragCoord.xy + temporalJitter * resolution) * PI2
    );
    sum += readShadowOpticalDepth(
      uv + offset * radius * shadowTexelSize,
      distanceToTop,
      distanceOffset,
      cascadeIndex
    );
    #endif // UNROLLED_LOOP_INDEX < SHADOW_SAMPLE_COUNT
  }
  #pragma unroll_loop_end
  return sum / float(SHADOW_SAMPLE_COUNT);
}

float sampleShadowOpticalDepth(
  const vec3 rayPosition,
  const float distanceOffset,
  const float radius,
  const float jitter
) {
  float distanceToTop = getDistanceToShadowTop(rayPosition);
  if (distanceToTop <= 0.0) {
    return 0.0;
  }
  vec3 worldPosition = ECEFToWorld(rayPosition);
  int cascadeIndex = getFadedCascadeIndex(
    viewMatrix,
    worldPosition,
    shadowIntervals,
    cameraNear,
    shadowFar,
    jitter
  );
  return cascadeIndex >= 0
    ? sampleShadowOpticalDepthPCF(
      worldPosition,
      distanceToTop,
      distanceOffset,
      radius,
      cascadeIndex
    )
    : 0.0;
}

#ifdef DEBUG_SHOW_SHADOW_MAP
vec4 getCascadedShadowMaps(vec2 uv) {
  vec4 coord = vec4(vUv, vUv - 0.5) * 2.0;
  vec4 shadow = vec4(0.0);
  if (uv.y > 0.5) {
    if (uv.x < 0.5) {
      shadow = texture(shadowBuffer, vec3(coord.xw, 0.0));
    } else {
      #if SHADOW_CASCADE_COUNT > 1
      shadow = texture(shadowBuffer, vec3(coord.zw, 1.0));
      #endif // SHADOW_CASCADE_COUNT > 1
    }
  } else {
    if (uv.x < 0.5) {
      #if SHADOW_CASCADE_COUNT > 2
      shadow = texture(shadowBuffer, vec3(coord.xy, 2.0));
      #endif // SHADOW_CASCADE_COUNT > 2
    } else {
      #if SHADOW_CASCADE_COUNT > 3
      shadow = texture(shadowBuffer, vec3(coord.zy, 3.0));
      #endif // SHADOW_CASCADE_COUNT > 3
    }
  }

  #if !defined(DEBUG_SHOW_SHADOW_MAP_TYPE)
  #define DEBUG_SHOW_SHADOW_MAP_TYPE (0)
  #endif // !defined(DEBUG_SHOW_SHADOW_MAP_TYPE

  const float frontDepthScale = 1e-5;
  const float meanExtinctionScale = 10.0;
  const float maxOpticalDepthScale = 0.01;
  vec3 color;
  #if DEBUG_SHOW_SHADOW_MAP_TYPE == 1
  color = vec3(shadow.r * frontDepthScale);
  #elif DEBUG_SHOW_SHADOW_MAP_TYPE == 2
  color = vec3(shadow.g * meanExtinctionScale);
  #elif DEBUG_SHOW_SHADOW_MAP_TYPE == 3
  color = vec3((shadow.b + shadow.a) * maxOpticalDepthScale);
  #else // DEBUG_SHOW_SHADOW_MAP_TYPE
  color =
    (shadow.rgb + vec3(0.0, 0.0, shadow.a)) *
    vec3(frontDepthScale, meanExtinctionScale, maxOpticalDepthScale);
  #endif // DEBUG_SHOW_SHADOW_MAP_TYPE
  return vec4(color, 1.0);
}
#endif // DEBUG_SHOW_SHADOW_MAP

vec2 henyeyGreenstein(const vec2 g, const float cosTheta) {
  vec2 g2 = g * g;
  // prettier-ignore
  return RECIPROCAL_PI4 *
    ((1.0 - g2) / max(vec2(1e-7), pow(1.0 + g2 - 2.0 * g * cosTheta, vec2(1.5))));
}

#ifdef ACCURATE_PHASE_FUNCTION

float draine(float u, float g, float a) {
  float g2 = g * g;
  // prettier-ignore
  return (1.0 - g2) *
    (1.0 + a * u * u) /
    (4.0 * (1.0 + a * (1.0 + 2.0 * g2) / 3.0) * PI * pow(1.0 + g2 - 2.0 * g * u, 1.5));
}

// Numerically-fitted large particles (d=10) phase function It won't be
// plausible without a more precise multiple scattering.
// Reference: https://research.nvidia.com/labs/rtr/approximate-mie/
float phaseFunction(const float cosTheta, const float attenuation) {
  const float gHG = 0.988176691700256; // exp(-0.0990567/(d-1.67154))
  const float gD = 0.5556712547839497; // exp(-2.20679/(d+3.91029) - 0.428934)
  const float alpha = 21.995520856274638; // exp(3.62489 - 8.29288/(d+5.52825))
  const float weight = 0.4819554318404214; // exp(-0.599085/(d-0.641583)-0.665888)
  return mix(
    henyeyGreenstein(vec2(gHG) * attenuation, cosTheta).x,
    draine(cosTheta, gD * attenuation, alpha),
    weight
  );
}

#else // ACCURATE_PHASE_FUNCTION

float phaseFunction(const float cosTheta, const float attenuation) {
  const vec2 g = scatterAnisotropy;
  const vec2 weights = vec2(1.0 - scatterAnisotropyMix, scatterAnisotropyMix);
  // A similar approximation is described in the Frostbite's paper, where phase
  // angle is attenuated instead of anisotropy.
  return dot(henyeyGreenstein(g * attenuation, cosTheta), weights);
}

#endif // ACCURATE_PHASE_FUNCTION

float phaseFunction(const float cosTheta) {
  return phaseFunction(cosTheta, 1.0);
}

float marchOpticalDepth(
  const vec3 rayOrigin,
  const vec3 rayDirection,
  const int maxIterationCount,
  const float mipLevel,
  const float jitter,
  out float rayDistance
) {
  int iterationCount = int(
    max(0.0, remap(mipLevel, 0.0, 1.0, float(maxIterationCount + 1), 1.0) - jitter)
  );
  if (iterationCount == 0) {
    // Fudge factor to approximate the mean optical depth.
    // TODO: Remove it.
    return 0.5;
  }
  float stepSize = minSecondaryStepSize / float(iterationCount);
  float nextDistance = stepSize * jitter;
  float opticalDepth = 0.0;
  for (int i = 0; i < iterationCount; ++i) {
    rayDistance = nextDistance;
    vec3 position = rayDistance * rayDirection + rayOrigin;
    vec2 uv = getGlobeUv(position);
    float height = length(position) - bottomRadius;
    WeatherSample weather = sampleWeather(uv, height, mipLevel);
    MediaSample media = sampleMedia(weather, position, uv, mipLevel, jitter);
    opticalDepth += media.extinction * stepSize;
    nextDistance += stepSize;
    stepSize *= secondaryStepScale;
  }
  return opticalDepth;
}

float marchOpticalDepth(
  const vec3 rayOrigin,
  const vec3 rayDirection,
  const int maxIterationCount,
  const float mipLevel,
  const float jitter
) {
  float rayDistance;
  return marchOpticalDepth(
    rayOrigin,
    rayDirection,
    maxIterationCount,
    mipLevel,
    jitter,
    rayDistance
  );
}

float approximateMultipleScattering(const float opticalDepth, const float cosTheta) {
  // Multiple scattering approximation
  // See: https://fpsunflower.github.io/ckulla/data/oz_volumes.pdf
  // a: attenuation, b: contribution, c: phase attenuation
  vec3 coeffs = vec3(1.0); // [a, b, c]
  const vec3 attenuation = vec3(0.5, 0.5, 0.5); // Should satisfy a <= b
  float scattering = 0.0;
  float beerLambert;
  #pragma unroll_loop_start
  for (int i = 0; i < 12; ++i) {
    #if UNROLLED_LOOP_INDEX < MULTI_SCATTERING_OCTAVES
    beerLambert = exp(-opticalDepth * coeffs.y);
    scattering += coeffs.x * beerLambert * phaseFunction(cosTheta, coeffs.z);
    coeffs *= attenuation;
    #endif // UNROLLED_LOOP_INDEX < MULTI_SCATTERING_OCTAVES
  }
  #pragma unroll_loop_end
  return scattering;
}

// TODO: Construct spherical harmonics of degree 2 using 2 sample points
// positioned near the horizon occlusion points on the sun direction plane.
vec3 getGroundSunSkyIrradiance(
  const vec3 position,
  const vec3 surfaceNormal,
  const float height,
  out vec3 skyIrradiance
) {
  #ifdef ACCURATE_SUN_SKY_IRRADIANCE
  return GetSunAndSkyIrradiance(
    (position - surfaceNormal * height) * METER_TO_LENGTH_UNIT,
    surfaceNormal,
    sunDirection,
    skyIrradiance
  );
  #else // ACCURATE_SUN_SKY_IRRADIANCE
  skyIrradiance = vGroundIrradiance.sky;
  return vGroundIrradiance.sun;
  #endif // ACCURATE_SUN_SKY_IRRADIANCE
}

vec3 getCloudsSunSkyIrradiance(const vec3 position, const float height, out vec3 skyIrradiance) {
  #ifdef ACCURATE_SUN_SKY_IRRADIANCE
  return GetSunAndSkyIrradianceForParticle(
    position * METER_TO_LENGTH_UNIT,
    sunDirection,
    skyIrradiance
  );
  #else // ACCURATE_SUN_SKY_IRRADIANCE
  float alpha = remapClamped(height, minHeight, maxHeight);
  skyIrradiance = mix(vCloudsIrradiance.minSky, vCloudsIrradiance.maxSky, alpha);
  return mix(vCloudsIrradiance.minSun, vCloudsIrradiance.maxSun, alpha);
  #endif // ACCURATE_SUN_SKY_IRRADIANCE
}

#ifdef GROUND_IRRADIANCE
vec3 approximateIrradianceFromGround(
  const vec3 position,
  const vec3 surfaceNormal,
  const float height,
  const float mipLevel,
  const float jitter
) {
  float opticalDepthToGround = marchOpticalDepth(
    position,
    -surfaceNormal,
    maxIterationCountToGround,
    mipLevel,
    jitter
  );
  vec3 skyIrradiance;
  vec3 sunIrradiance = getGroundSunSkyIrradiance(position, surfaceNormal, height, skyIrradiance);
  const float groundAlbedo = 0.3;
  vec3 groundIrradiance = skyIrradiance + (1.0 - coverage) * sunIrradiance;
  vec3 bouncedRadiance = groundAlbedo * RECIPROCAL_PI * groundIrradiance;
  return bouncedRadiance * exp(-opticalDepthToGround);
}
#endif // GROUND_IRRADIANCE

vec4 marchClouds(
  const vec3 rayOrigin,
  const vec3 rayDirection,
  const vec2 rayNearFar,
  const float cosTheta,
  const float jitter,
  const float rayStartTexelsPerPixel,
  out float frontDepth,
  out ivec3 sampleCount
) {
  vec3 radianceIntegral = vec3(0.0);
  float transmittanceIntegral = 1.0;
  float weightedDistanceSum = 0.0;
  float transmittanceSum = 0.0;

  float maxRayDistance = rayNearFar.y - rayNearFar.x;
  float stepSize = minStepSize + (perspectiveStepScale - 1.0) * rayNearFar.x;
  // I don't understand why spatial aliasing remains unless doubling the jitter.
  float rayDistance = stepSize * jitter * 2.0;

  for (int i = 0; i < maxIterationCount; ++i) {
    if (rayDistance > maxRayDistance) {
      break; // Termination
    }

    vec3 position = rayDistance * rayDirection + rayOrigin;
    float height = length(position) - bottomRadius;
    float mipLevel = log2(max(1.0, rayStartTexelsPerPixel + rayDistance * 1e-5));

    #if !defined(DEBUG_MARCH_INTERVALS)
    if (insideLayerIntervals(height)) {
      stepSize *= perspectiveStepScale;
      rayDistance += mix(stepSize, maxStepSize, min(1.0, mipLevel));
      continue;
    }
    #endif // !defined(DEBUG_MARCH_INTERVALS)

    // Sample rough weather.
    vec2 uv = getGlobeUv(position);
    WeatherSample weather = sampleWeather(uv, height, mipLevel);

    #ifdef DEBUG_SHOW_SAMPLE_COUNT
    ++sampleCount.x;
    #endif // DEBUG_SHOW_SAMPLE_COUNT

    if (!any(greaterThan(weather.density, vec4(minDensity)))) {
      // Step longer in empty space.
      // TODO: This produces banding artifacts.
      // Possible improvement: Binary search refinement
      stepSize *= perspectiveStepScale;
      rayDistance += mix(stepSize, maxStepSize, min(1.0, mipLevel));
      continue;
    }

    // Sample detailed participating media.
    MediaSample media = sampleMedia(weather, position, uv, mipLevel, jitter, sampleCount);

    if (media.extinction > minExtinction) {
      vec3 skyIrradiance;
      vec3 sunIrradiance = getCloudsSunSkyIrradiance(position, height, skyIrradiance);
      vec3 surfaceNormal = normalize(position);

      // March optical depth to the sun for finer details, which BSM lacks.
      float sunRayDistance = 0.0;
      float opticalDepth = marchOpticalDepth(
        position,
        sunDirection,
        maxIterationCountToSun,
        mipLevel,
        jitter,
        sunRayDistance
      );

      if (height < shadowTopHeight) {
        // Obtain the optical depth from BSM at the ray position.
        opticalDepth += sampleShadowOpticalDepth(
          position,
          // Take account of only positions further than the marched ray
          // distance.
          sunRayDistance,
          // Apply PCF only when the sun is close to the horizon.
          maxShadowFilterRadius * remapClamped(dot(sunDirection, surfaceNormal), 0.1, 0.0),
          jitter
        );
      }

      vec3 radiance = sunIrradiance * approximateMultipleScattering(opticalDepth, cosTheta);

      #ifdef GROUND_IRRADIANCE
      // Fudge factor for the irradiance from ground.
      if (height < shadowTopHeight && mipLevel < 0.5) {
        vec3 groundIrradiance = approximateIrradianceFromGround(
          position,
          surfaceNormal,
          height,
          mipLevel,
          jitter
        );
        radiance += groundIrradiance * RECIPROCAL_PI4 * groundIrradianceScale;
      }
      #endif // GROUND_IRRADIANCE

      // Crude approximation of sky gradient. Better than none in the shadows.
      float skyGradient = dot(weather.heightFraction * 0.5 + 0.5, media.weight);
      radiance += skyIrradiance * RECIPROCAL_PI4 * skyGradient * skyIrradianceScale;

      // Finally multiply by scattering.
      radiance *= media.scattering;

      #ifdef POWDER
      radiance *= 1.0 - powderScale * exp(-media.extinction * powderExponent);
      #endif // POWDER

      #ifdef DEBUG_SHOW_CASCADES
      if (height < shadowTopHeight) {
        radiance = 1e-3 * getFadedCascadeColor(position, jitter);
      }
      #endif // DEBUG_SHOW_CASCADES

      // Energy-conserving analytical integration of scattered light
      // See 5.6.3 in https://media.contentapi.ea.com/content/dam/eacom/frostbite/files/s2016-pbs-frostbite-sky-clouds-new.pdf
      float transmittance = exp(-media.extinction * stepSize);
      float clampedExtinction = max(media.extinction, 1e-7);
      vec3 scatteringIntegral = (radiance - radiance * transmittance) / clampedExtinction;
      radianceIntegral += transmittanceIntegral * scatteringIntegral;
      transmittanceIntegral *= transmittance;

      // Aerial perspective affecting clouds
      // See 5.9.1 in https://media.contentapi.ea.com/content/dam/eacom/frostbite/files/s2016-pbs-frostbite-sky-clouds-new.pdf
      weightedDistanceSum += rayDistance * transmittanceIntegral;
      transmittanceSum += transmittanceIntegral;
    }

    if (transmittanceIntegral <= minTransmittance) {
      break; // Early termination
    }

    // Take a shorter step because we've already hit the clouds.
    stepSize *= perspectiveStepScale;
    rayDistance += stepSize;
  }

  // The final product of 5.9.1 and we'll evaluate this in aerial perspective.
  frontDepth = transmittanceSum > 0.0 ? weightedDistanceSum / transmittanceSum : -1.0;

  return vec4(radianceIntegral, remapClamped(transmittanceIntegral, 1.0, minTransmittance));
}

#ifdef SHADOW_LENGTH

float marchShadowLength(
  const vec3 rayOrigin,
  const vec3 rayDirection,
  const vec2 rayNearFar,
  const float jitter
) {
  float shadowLength = 0.0;
  float maxRayDistance = rayNearFar.y - rayNearFar.x;
  float stepSize = minShadowLengthStepSize;
  float rayDistance = stepSize * jitter;
  const float attenuationFactor = 1.0 - 5e-4;
  float attenuation = 1.0;

  // TODO: This march is closed, and sample resolution can be much lower.
  // Refining the termination by binary search will make it much more efficient.
  for (int i = 0; i < maxShadowLengthIterationCount; ++i) {
    if (rayDistance > maxRayDistance) {
      break; // Termination
    }
    vec3 position = rayDistance * rayDirection + rayOrigin;
    float opticalDepth = sampleShadowOpticalDepth(position, 0.0, 0.0, jitter);
    shadowLength += (1.0 - exp(-opticalDepth)) * stepSize * attenuation;

    // Hack to prevent over-integration of shadow length. The shadow should be
    // attenuated by the inscatter as the ray travels further.
    attenuation *= attenuationFactor;
    if (attenuation < 1e-5) {
      break;
    }

    stepSize *= perspectiveStepScale;
    rayDistance += stepSize;
  }
  return shadowLength;
}

#endif // SHADOW_LENGTH

#ifdef HAZE

vec4 approximateHaze(
  const vec3 rayOrigin,
  const vec3 rayDirection,
  const float maxRayDistance,
  const float cosTheta,
  const float shadowLength
) {
  float modulation = remapClamped(coverage, 0.2, 0.4);
  if (cameraHeight * modulation < 0.0) {
    return vec4(0.0);
  }
  float density = modulation * hazeDensityScale * exp(-cameraHeight * hazeExponent);
  if (density < 1e-7) {
    return vec4(0.0); // Prevent artifact in views from space
  }

  // Blend two normals by the difference in angle so that normal near the
  // ground becomes that of the origin, and in the sky that of the horizon.
  vec3 normalAtOrigin = normalize(rayOrigin);
  vec3 normalAtHorizon = (rayOrigin - dot(rayOrigin, rayDirection) * rayDirection) / bottomRadius;
  float alpha = remapClamped(dot(normalAtOrigin, normalAtHorizon), 0.9, 1.0);
  vec3 normal = mix(normalAtOrigin, normalAtHorizon, alpha);

  // Analytical optical depth where density exponentially decreases with height.
  // Based on: https://iquilezles.org/articles/fog/
  float angle = max(dot(normal, rayDirection), 1e-5);
  float exponent = angle * hazeExponent;
  float linearTerm = density / hazeExponent / angle;

  // Derive the optical depths separately for with and without shadow length.
  float expTerm = 1.0 - exp(-maxRayDistance * exponent);
  float shadowExpTerm = 1.0 - exp(-min(maxRayDistance, shadowLength) * exponent);
  float opticalDepth = expTerm * linearTerm;
  float shadowOpticalDepth = max((expTerm - shadowExpTerm) * linearTerm, 0.0);
  float transmittance = saturate(1.0 - exp(-opticalDepth));
  float shadowTransmittance = saturate(1.0 - exp(-shadowOpticalDepth));

  vec3 skyIrradiance = vGroundIrradiance.sky;
  vec3 sunIrradiance = vGroundIrradiance.sun;
  vec3 inscatter = sunIrradiance * phaseFunction(cosTheta) * shadowTransmittance;
  inscatter += skyIrradiance * RECIPROCAL_PI4 * skyIrradianceScale * transmittance;
  inscatter *= hazeScatteringCoefficient / (hazeAbsorptionCoefficient + hazeScatteringCoefficient);
  return vec4(inscatter, transmittance);
}

#endif // HAZE

void applyAerialPerspective(
  const vec3 cameraPosition,
  const vec3 frontPosition,
  const float shadowLength,
  inout vec4 color
) {
  vec3 transmittance;
  vec3 inscatter = GetSkyRadianceToPoint(
    cameraPosition * METER_TO_LENGTH_UNIT,
    frontPosition * METER_TO_LENGTH_UNIT,
    shadowLength * METER_TO_LENGTH_UNIT,
    sunDirection,
    transmittance
  );
  color.rgb = color.rgb * transmittance + inscatter * color.a;
}

bool rayIntersectsGround(const vec3 cameraPosition, const vec3 rayDirection) {
  float r = length(cameraPosition);
  float mu = dot(cameraPosition, rayDirection) / r;
  return mu < 0.0 && r * r * (mu * mu - 1.0) + bottomRadius * bottomRadius >= 0.0;
}

struct IntersectionResult {
  bool ground;
  vec4 first;
  vec4 second;
};

IntersectionResult getIntersections(const vec3 cameraPosition, const vec3 rayDirection) {
  IntersectionResult intersections;
  intersections.ground = rayIntersectsGround(cameraPosition, rayDirection);
  raySphereIntersections(
    cameraPosition,
    rayDirection,
    bottomRadius + vec4(0.0, minHeight, maxHeight, shadowTopHeight),
    intersections.first,
    intersections.second
  );
  return intersections;
}

vec2 getRayNearFar(const IntersectionResult intersections) {
  vec2 nearFar;
  if (cameraHeight < minHeight) {
    // View below the clouds
    if (intersections.ground) {
      nearFar = vec2(-1.0); // No clouds to the ground
    } else {
      nearFar = vec2(intersections.second.y, intersections.second.z);
      nearFar.y = min(nearFar.y, maxRayDistance);
    }
  } else if (cameraHeight < maxHeight) {
    // View inside the total cloud layer
    if (intersections.ground) {
      nearFar = vec2(cameraNear, intersections.first.y);
    } else {
      nearFar = vec2(cameraNear, intersections.second.z);
    }
  } else {
    // View above the clouds
    nearFar = vec2(intersections.first.z, intersections.second.z);
    if (intersections.ground) {
      // Clamp the ray at the min height.
      nearFar.y = intersections.first.y;
    }
  }
  return nearFar;
}

#ifdef SHADOW_LENGTH
vec2 getShadowRayNearFar(const IntersectionResult intersections) {
  vec2 nearFar;
  if (cameraHeight < shadowTopHeight) {
    if (intersections.ground) {
      nearFar = vec2(cameraNear, intersections.first.x);
    } else {
      nearFar = vec2(cameraNear, intersections.second.w);
    }
  } else {
    nearFar = vec2(intersections.first.w, intersections.second.w);
    if (intersections.ground) {
      // Clamp the ray at the ground.
      nearFar.y = intersections.first.x;
    }
  }
  nearFar.y = min(nearFar.y, maxShadowLengthRayDistance);
  return nearFar;
}
#endif // SHADOW_LENGTH

#ifdef HAZE
vec2 getHazeRayNearFar(const IntersectionResult intersections) {
  vec2 nearFar;
  if (cameraHeight < maxHeight) {
    if (intersections.ground) {
      nearFar = vec2(cameraNear, intersections.first.x);
    } else {
      nearFar = vec2(cameraNear, intersections.second.z);
    }
  } else {
    nearFar = vec2(cameraNear, intersections.second.z);
    if (intersections.ground) {
      // Clamp the ray at the ground.
      nearFar.y = intersections.first.x;
    }
  }
  return nearFar;
}
#endif // HAZE

float getRayDistanceToScene(const vec3 rayDirection) {
  float depth = readDepth(vUv * targetUvScale + temporalJitter);
  if (depth < 1.0 - 1e-7) {
    depth = reverseLogDepth(depth, cameraNear, cameraFar);
    float viewZ = getViewZ(depth);
    return -viewZ / dot(rayDirection, vCameraDirection);
  }
  return -1.0;
}

void main() {
  #ifdef DEBUG_SHOW_SHADOW_MAP
  outputColor = getCascadedShadowMaps(vUv);
  outputDepthVelocity = vec3(0.0);
  #ifdef SHADOW_LENGTH
  outputShadowLength = 0.0;
  #endif // SHADOW_LENGTH
  return;
  #endif // DEBUG_SHOW_SHADOW_MAP

  vec3 cameraPosition = vCameraPosition - vEllipsoidCenter;
  vec3 rayDirection = normalize(vRayDirection);
  float cosTheta = dot(sunDirection, rayDirection);

  IntersectionResult intersections = getIntersections(cameraPosition, rayDirection);
  vec2 rayNearFar = getRayNearFar(intersections);
  #ifdef SHADOW_LENGTH
  vec2 shadowRayNearFar = getShadowRayNearFar(intersections);
  #endif // SHADOW_LENGTH
  #ifdef HAZE
  vec2 hazeRayNearFar = getHazeRayNearFar(intersections);
  #endif // HAZE

  float rayDistanceToScene = getRayDistanceToScene(rayDirection);
  if (rayDistanceToScene >= 0.0) {
    rayNearFar.y = min(rayNearFar.y, rayDistanceToScene);
    #ifdef SHADOW_LENGTH
    shadowRayNearFar.y = min(shadowRayNearFar.y, rayDistanceToScene);
    #endif // SHADOW_LENGTH
    #ifdef HAZE
    hazeRayNearFar.y = min(hazeRayNearFar.y, rayDistanceToScene);
    #endif // HAZE
  }

  bool intersectsGround = any(lessThan(rayNearFar, vec2(0.0)));
  bool intersectsScene = rayNearFar.y < rayNearFar.x;

  float stbn = getSTBN();

  vec4 color = vec4(0.0);
  float frontDepth = rayNearFar.y;
  vec3 depthVelocity = vec3(0.0);
  float shadowLength = 0.0;

  if (!intersectsGround && !intersectsScene) {
    vec3 rayOrigin = rayNearFar.x * rayDirection + cameraPosition;

    vec2 globeUv = getGlobeUv(rayOrigin);
    #ifdef DEBUG_SHOW_UV
    outputColor = vec4(vec3(checker(globeUv, localWeatherRepeat + localWeatherOffset)), 1.0);
    outputDepthVelocity = vec3(0.0);
    #ifdef SHADOW_LENGTH
    outputShadowLength = 0.0;
    #endif // SHADOW_LENGTH
    return;
    #endif // DEBUG_SHOW_UV

    float mipLevel = getMipLevel(globeUv * localWeatherRepeat) * mipLevelScale;
    mipLevel = mix(0.0, mipLevel, min(1.0, 0.2 * cameraHeight / maxHeight));

    float marchedFrontDepth;
    ivec3 sampleCount = ivec3(0);
    color = marchClouds(
      rayOrigin,
      rayDirection,
      rayNearFar,
      cosTheta,
      stbn,
      pow(2.0, mipLevel),
      marchedFrontDepth,
      sampleCount
    );

    #ifdef DEBUG_SHOW_SAMPLE_COUNT
    outputColor = vec4(vec3(sampleCount) / vec3(500.0, 5.0, 5.0), 1.0);
    outputDepthVelocity = vec3(0.0);
    #ifdef SHADOW_LENGTH
    outputShadowLength = 0.0;
    #endif // SHADOW_LENGTH
    return;
    #endif // DEBUG_SHOW_SAMPLE_COUNT

    // Front depth will be -1.0 when no samples are accumulated.
    if (marchedFrontDepth >= 0.0) {
      frontDepth = rayNearFar.x + marchedFrontDepth;

      #ifdef SHADOW_LENGTH
      // Clamp the shadow length ray at the clouds.
      shadowRayNearFar.y = mix(
        shadowRayNearFar.y,
        min(frontDepth, shadowRayNearFar.y),
        color.a // Interpolate by the alpha for smoother edges.
      );
      #endif // SHADOW_LENGTH

      #ifdef HAZE
      // Clamp the haze ray at the clouds.
      hazeRayNearFar.y = mix(
        hazeRayNearFar.y,
        min(frontDepth, hazeRayNearFar.y),
        color.a // Interpolate by the alpha for smoother edges.
      );
      #endif // HAZE
    }

    #ifdef SHADOW_LENGTH
    if (all(greaterThanEqual(shadowRayNearFar, vec2(0.0)))) {
      shadowLength = marchShadowLength(
        shadowRayNearFar.x * rayDirection + cameraPosition,
        rayDirection,
        shadowRayNearFar,
        stbn
      );
    }
    #endif // SHADOW_LENGTH

    // Apply aerial perspective.
    vec3 frontPosition = cameraPosition + frontDepth * rayDirection;
    applyAerialPerspective(cameraPosition, frontPosition, shadowLength, color);

    // Velocity for temporal resolution.
    vec3 frontPositionWorld = ECEFToWorld(frontPosition);
    vec4 prevClip = reprojectionMatrix * vec4(frontPositionWorld, 1.0);
    prevClip /= prevClip.w;
    vec2 prevUv = prevClip.xy * 0.5 + 0.5;
    vec2 velocity = (vUv - prevUv) * resolution;
    depthVelocity = vec3(frontDepth, velocity);

  } else {
    #ifdef SHADOW_LENGTH
    if (all(greaterThanEqual(shadowRayNearFar, vec2(0.0)))) {
      shadowLength = marchShadowLength(
        shadowRayNearFar.x * rayDirection + cameraPosition,
        rayDirection,
        shadowRayNearFar,
        stbn
      );
    }
    #endif // SHADOW_LENGTH

    // TODO: We can calculate velocity to reduce occlusion errors at the edges,
    // but suffers from floating-point precision errors on near objects.

    // if (intersectsScene) {
    //   vec3 frontPosition = cameraPosition + rayNearFar.y * rayDirection;
    //   vec3 frontPositionWorld = ECEFToWorld(frontPosition);
    //   vec4 prevClip = reprojectionMatrix * vec4(frontPositionWorld, 1.0);
    //   prevClip /= prevClip.w;
    //   vec2 prevUv = prevClip.xy * 0.5 + 0.5;
    //   vec2 velocity = (vUv - prevUv) * resolution;
    //   depthVelocity = vec3(rayNearFar.y, velocity);
    // }

  }

  #ifdef DEBUG_SHOW_FRONT_DEPTH
  outputColor = vec4(turbo(frontDepth / maxRayDistance), 1.0);
  outputDepthVelocity = vec3(0.0);
  #ifdef SHADOW_LENGTH
  outputShadowLength = 0.0;
  #endif // SHADOW_LENGTH
  return;
  #endif // DEBUG_SHOW_FRONT_DEPTH

  #ifdef HAZE
  vec4 haze = approximateHaze(
    cameraNear * rayDirection + cameraPosition,
    rayDirection,
    hazeRayNearFar.y - hazeRayNearFar.x,
    cosTheta,
    shadowLength
  );
  color.rgb = mix(color.rgb, haze.rgb, haze.a);
  color.a = color.a * (1.0 - haze.a) + haze.a;
  #endif // HAZE

  outputColor = color;
  outputDepthVelocity = depthVelocity;
  #ifdef SHADOW_LENGTH
  outputShadowLength = shadowLength * METER_TO_LENGTH_UNIT;
  #endif // SHADOW_LENGTH
}
`;

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/shaders/clouds.glsl
var clouds_default2 = "float getSTBN() {\n  ivec3 size = textureSize(stbnTexture, 0);\n  vec3 scale = 1.0 / vec3(size);\n  return texture(stbnTexture, vec3(gl_FragCoord.xy, float(frame % size.z)) * scale).r;\n}\n\n// Straightforward spherical mapping\nvec2 getSphericalUv(const vec3 position) {\n  vec2 st = normalize(position.yx);\n  float phi = atan(st.x, st.y);\n  float theta = asin(normalize(position).z);\n  return vec2(phi * RECIPROCAL_PI2 + 0.5, theta * RECIPROCAL_PI + 0.5);\n}\n\nvec2 getCubeSphereUv(const vec3 position) {\n  // Cube-sphere relaxation by: http://mathproofs.blogspot.com/2005/07/mapping-cube-to-sphere.html\n  // TODO: Tile and fix seams.\n  // Possible improvements:\n  // https://iquilezles.org/articles/texturerepetition/\n  // https://gamedev.stackexchange.com/questions/184388/fragment-shader-map-dot-texture-repeatedly-over-the-sphere\n  // https://github.com/mmikk/hextile-demo\n\n  vec3 n = normalize(position);\n  vec3 f = abs(n);\n  vec3 c = n / max(f.x, max(f.y, f.z));\n  vec2 m;\n  if (all(greaterThan(f.yy, f.xz))) {\n    m = c.y > 0.0 ? vec2(-n.x, n.z) : n.xz;\n  } else if (all(greaterThan(f.xx, f.yz))) {\n    m = c.x > 0.0 ? n.yz : vec2(-n.y, n.z);\n  } else {\n    m = c.z > 0.0 ? n.xy : vec2(n.x, -n.y);\n  }\n\n  vec2 m2 = m * m;\n  float q = dot(m2.xy, vec2(-2.0, 2.0)) - 3.0;\n  float q2 = q * q;\n  vec2 uv;\n  uv.x = sqrt(1.5 + m2.x - m2.y - 0.5 * sqrt(-24.0 * m2.x + q2)) * (m.x > 0.0 ? 1.0 : -1.0);\n  uv.y = sqrt(6.0 / (3.0 - uv.x * uv.x)) * m.y;\n  return uv * 0.5 + 0.5;\n}\n\nvec2 getGlobeUv(const vec3 position) {\n  return getCubeSphereUv(position);\n}\n\nfloat getMipLevel(const vec2 uv) {\n  const float mipLevelScale = 0.1;\n  vec2 coord = uv * resolution;\n  vec2 ddx = dFdx(coord);\n  vec2 ddy = dFdy(coord);\n  float deltaMaxSqr = max(dot(ddx, ddx), dot(ddy, ddy)) * mipLevelScale;\n  return max(0.0, 0.5 * log2(max(1.0, deltaMaxSqr)));\n}\n\nbool insideLayerIntervals(const float height) {\n  bvec3 gt = greaterThan(vec3(height), minIntervalHeights);\n  bvec3 lt = lessThan(vec3(height), maxIntervalHeights);\n  return any(bvec3(gt.x && lt.x, gt.y && lt.y, gt.z && lt.z));\n}\n\nstruct WeatherSample {\n  vec4 heightFraction; // Normalized height of each layer\n  vec4 density;\n};\n\nvec4 shapeAlteringFunction(const vec4 heightFraction, const vec4 bias) {\n  // Apply a semi-circle transform to round the clouds towards the top.\n  vec4 biased = pow(heightFraction, bias);\n  vec4 x = clamp(biased * 2.0 - 1.0, -1.0, 1.0);\n  return 1.0 - x * x;\n}\n\nWeatherSample sampleWeather(const vec2 uv, const float height, const float mipLevel) {\n  WeatherSample weather;\n  weather.heightFraction = remapClamped(vec4(height), minLayerHeights, maxLayerHeights);\n\n  vec4 localWeather = pow(\n    textureLod(\n      localWeatherTexture,\n      uv * localWeatherRepeat + localWeatherOffset,\n      mipLevel\n    ).LOCAL_WEATHER_CHANNELS,\n    weatherExponents\n  );\n  #ifdef SHADOW\n  localWeather *= shadowLayerMask;\n  #endif // SHADOW\n\n  vec4 heightScale = shapeAlteringFunction(weather.heightFraction, shapeAlteringBiases);\n\n  // Modulation to control weather by coverage parameter.\n  // Reference: https://github.com/Prograda/Skybolt/blob/master/Assets/Core/Shaders/Clouds.h#L63\n  vec4 factor = 1.0 - coverage * heightScale;\n  weather.density = remapClamped(\n    mix(localWeather, vec4(1.0), coverageFilterWidths),\n    factor,\n    factor + coverageFilterWidths\n  );\n\n  return weather;\n}\n\nvec4 getLayerDensity(const vec4 heightFraction) {\n  // prettier-ignore\n  return densityProfile.expTerms * exp(densityProfile.exponents * heightFraction) +\n    densityProfile.linearTerms * heightFraction +\n    densityProfile.constantTerms;\n}\n\nstruct MediaSample {\n  float density;\n  vec4 weight;\n  float scattering;\n  float extinction;\n};\n\nMediaSample sampleMedia(\n  const WeatherSample weather,\n  const vec3 position,\n  const vec2 uv,\n  const float mipLevel,\n  const float jitter,\n  out ivec3 sampleCount\n) {\n  vec4 density = weather.density;\n\n  // TODO: Define in physical length.\n  vec3 surfaceNormal = normalize(position);\n  float localWeatherSpeed = length(localWeatherOffset);\n  vec3 evolution = -surfaceNormal * localWeatherSpeed * 2e4;\n\n  vec3 turbulence = vec3(0.0);\n  #ifdef TURBULENCE\n  vec2 turbulenceUv = uv * localWeatherRepeat * turbulenceRepeat;\n  turbulence =\n    turbulenceDisplacement *\n    (texture(turbulenceTexture, turbulenceUv).rgb * 2.0 - 1.0) *\n    dot(density, remapClamped(weather.heightFraction, vec4(0.3), vec4(0.0)));\n  #endif // TURBULENCE\n\n  vec3 shapePosition = (position + evolution + turbulence) * shapeRepeat + shapeOffset;\n  float shape = texture(shapeTexture, shapePosition).r;\n  density = remapClamped(density, vec4(1.0 - shape) * shapeAmounts, vec4(1.0));\n\n  #ifdef DEBUG_SHOW_SAMPLE_COUNT\n  ++sampleCount.y;\n  #endif // DEBUG_SHOW_SAMPLE_COUNT\n\n  #ifdef SHAPE_DETAIL\n  if (mipLevel * 0.5 + (jitter - 0.5) * 0.5 < 0.5) {\n    vec3 detailPosition = (position + turbulence) * shapeDetailRepeat + shapeDetailOffset;\n    float detail = texture(shapeDetailTexture, detailPosition).r;\n    // Fluffy at the top and whippy at the bottom.\n    vec4 modifier = mix(\n      vec4(pow(detail, 6.0)),\n      vec4(1.0 - detail),\n      remapClamped(weather.heightFraction, vec4(0.2), vec4(0.4))\n    );\n    modifier = mix(vec4(0.0), modifier, shapeDetailAmounts);\n    density = remapClamped(density * 2.0, vec4(modifier * 0.5), vec4(1.0));\n\n    #ifdef DEBUG_SHOW_SAMPLE_COUNT\n    ++sampleCount.z;\n    #endif // DEBUG_SHOW_SAMPLE_COUNT\n  }\n  #endif // SHAPE_DETAIL\n\n  // Apply the density profiles.\n  density = saturate(density * densityScales * getLayerDensity(weather.heightFraction));\n\n  MediaSample media;\n  float densitySum = density.x + density.y + density.z + density.w;\n  media.weight = density / densitySum;\n  media.scattering = densitySum * scatteringCoefficient;\n  media.extinction = densitySum * absorptionCoefficient + media.scattering;\n  return media;\n}\n\nMediaSample sampleMedia(\n  const WeatherSample weather,\n  const vec3 position,\n  const vec2 uv,\n  const float mipLevel,\n  const float jitter\n) {\n  ivec3 sampleCount;\n  return sampleMedia(weather, position, uv, mipLevel, jitter, sampleCount);\n}\n";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/shaders/clouds.vert
var clouds_default3 = 'precision highp float;\nprecision highp sampler3D;\n\n#include "atmosphere/parameters"\n#include "atmosphere/functions"\n#include "types"\n\nuniform mat4 inverseProjectionMatrix;\nuniform mat4 inverseViewMatrix;\nuniform vec3 cameraPosition;\nuniform vec3 ellipsoidCenter;\nuniform mat4 inverseEllipsoidMatrix;\nuniform vec3 altitudeCorrection;\n\n// Atmosphere\nuniform float bottomRadius;\nuniform vec3 sunDirection;\n\n// Cloud layers\nuniform float minHeight;\nuniform float maxHeight;\n\nlayout(location = 0) in vec3 position;\n\nout vec2 vUv;\nout vec3 vCameraPosition;\nout vec3 vCameraDirection; // Direction to the center of screen\nout vec3 vRayDirection; // Direction to the texel\nout vec3 vEllipsoidCenter;\n\nout GroundIrradiance vGroundIrradiance;\nout CloudsIrradiance vCloudsIrradiance;\n\nvoid sampleSunSkyIrradiance(const vec3 positionECEF) {\n  vGroundIrradiance.sun = GetSunAndSkyIrradianceForParticle(\n    positionECEF * METER_TO_LENGTH_UNIT,\n    sunDirection,\n    vGroundIrradiance.sky\n  );\n\n  vec3 surfaceNormal = normalize(positionECEF);\n  vec2 radii = (bottomRadius + vec2(minHeight, maxHeight)) * METER_TO_LENGTH_UNIT;\n  vCloudsIrradiance.minSun = GetSunAndSkyIrradianceForParticle(\n    surfaceNormal * radii.x,\n    sunDirection,\n    vCloudsIrradiance.minSky\n  );\n  vCloudsIrradiance.maxSun = GetSunAndSkyIrradianceForParticle(\n    surfaceNormal * radii.y,\n    sunDirection,\n    vCloudsIrradiance.maxSky\n  );\n}\n\nvoid main() {\n  vUv = position.xy * 0.5 + 0.5;\n\n  vec4 viewPosition = inverseProjectionMatrix * vec4(position, 1.0);\n  vec4 worldDirection = inverseViewMatrix * vec4(viewPosition.xyz, 0.0);\n  mat3 rotation = mat3(inverseEllipsoidMatrix);\n  vCameraPosition = rotation * cameraPosition;\n  vCameraDirection = rotation * normalize((inverseViewMatrix * vec4(0.0, 0.0, -1.0, 0.0)).xyz);\n  vRayDirection = rotation * worldDirection.xyz;\n  vEllipsoidCenter = ellipsoidCenter + altitudeCorrection;\n\n  sampleSunSkyIrradiance(vCameraPosition - vEllipsoidCenter);\n\n  gl_Position = vec4(position.xy, 1.0, 1.0);\n}\n';

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/shaders/parameters.glsl
var parameters_default2 = "uniform vec2 resolution;\nuniform int frame;\nuniform sampler3D stbnTexture;\n\n// Atmosphere\nuniform float bottomRadius;\nuniform mat4 ellipsoidMatrix;\nuniform mat4 inverseEllipsoidMatrix;\nuniform vec3 sunDirection;\n\n// Participating medium\nuniform float scatteringCoefficient;\nuniform float absorptionCoefficient;\n\n// Primary raymarch\nuniform float minDensity;\nuniform float minExtinction;\nuniform float minTransmittance;\n\n// Shape and weather\nuniform sampler2D localWeatherTexture;\nuniform vec2 localWeatherRepeat;\nuniform vec2 localWeatherOffset;\nuniform float coverage;\nuniform sampler3D shapeTexture;\nuniform vec3 shapeRepeat;\nuniform vec3 shapeOffset;\n\n#ifdef SHAPE_DETAIL\nuniform sampler3D shapeDetailTexture;\nuniform vec3 shapeDetailRepeat;\nuniform vec3 shapeDetailOffset;\n#endif // SHAPE_DETAIL\n\n#ifdef TURBULENCE\nuniform sampler2D turbulenceTexture;\nuniform vec2 turbulenceRepeat;\nuniform float turbulenceDisplacement;\n#endif // TURBULENCE\n\n// Haze\n#ifdef HAZE\nuniform float hazeDensityScale;\nuniform float hazeExponent;\nuniform float hazeScatteringCoefficient;\nuniform float hazeAbsorptionCoefficient;\n#endif // HAZE\n\n// Cloud layers\nuniform vec4 minLayerHeights;\nuniform vec4 maxLayerHeights;\nuniform vec3 minIntervalHeights;\nuniform vec3 maxIntervalHeights;\nuniform vec4 densityScales;\nuniform vec4 shapeAmounts;\nuniform vec4 shapeDetailAmounts;\nuniform vec4 weatherExponents;\nuniform vec4 shapeAlteringBiases;\nuniform vec4 coverageFilterWidths;\nuniform float minHeight;\nuniform float maxHeight;\nuniform float shadowTopHeight;\nuniform float shadowBottomHeight;\nuniform vec4 shadowLayerMask;\nuniform DensityProfile densityProfile;\n";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/shaders/types.glsl
var types_default = "struct GroundIrradiance {\n  vec3 sun;\n  vec3 sky;\n};\n\nstruct CloudsIrradiance {\n  vec3 minSun;\n  vec3 minSky;\n  vec3 maxSun;\n  vec3 maxSky;\n};\n\nstruct DensityProfile {\n  vec4 expTerms;\n  vec4 exponents;\n  vec4 linearTerms;\n  vec4 constantTerms;\n};\n";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/CloudsMaterial.ts
var vectorScratch6 = /* @__PURE__ */ new Vector319();
var geodeticScratch2 = /* @__PURE__ */ new Geodetic();
var CloudsMaterial = class extends AtmosphereMaterialBase {
  constructor({
    parameterUniforms,
    layerUniforms,
    atmosphereUniforms
  }, atmosphere = AtmosphereParameters.DEFAULT) {
    super(
      {
        name: "CloudsMaterial",
        glslVersion: GLSL33,
        vertexShader: resolveIncludes(clouds_default3, {
          atmosphere: {
            parameters,
            functions
          },
          types: types_default
        }),
        fragmentShader: unrollLoops(
          resolveIncludes(clouds_default, {
            core: {
              depth,
              math,
              turbo,
              generators,
              raySphereIntersection,
              cascadedShadowMaps,
              interleavedGradientNoise,
              vogelDisk
            },
            atmosphere: {
              parameters,
              functions
            },
            types: types_default,
            parameters: parameters_default2,
            clouds: clouds_default2
          })
        ),
        // prettier-ignore
        uniforms: {
          ...parameterUniforms,
          ...layerUniforms,
          ...atmosphereUniforms,
          depthBuffer: new Uniform6(null),
          viewMatrix: new Uniform6(new Matrix410()),
          inverseProjectionMatrix: new Uniform6(new Matrix410()),
          inverseViewMatrix: new Uniform6(new Matrix410()),
          reprojectionMatrix: new Uniform6(new Matrix410()),
          resolution: new Uniform6(new Vector28()),
          cameraNear: new Uniform6(0),
          cameraFar: new Uniform6(0),
          cameraHeight: new Uniform6(0),
          frame: new Uniform6(0),
          temporalJitter: new Uniform6(new Vector28()),
          targetUvScale: new Uniform6(new Vector28()),
          mipLevelScale: new Uniform6(1),
          stbnTexture: new Uniform6(null),
          // Scattering
          skyIrradianceScale: new Uniform6(1),
          groundIrradianceScale: new Uniform6(1),
          powderScale: new Uniform6(0.8),
          powderExponent: new Uniform6(150),
          // Primary raymarch
          maxIterationCount: new Uniform6(defaults.clouds.maxIterationCount),
          minStepSize: new Uniform6(defaults.clouds.minStepSize),
          maxStepSize: new Uniform6(defaults.clouds.maxStepSize),
          maxRayDistance: new Uniform6(defaults.clouds.maxRayDistance),
          perspectiveStepScale: new Uniform6(defaults.clouds.perspectiveStepScale),
          minDensity: new Uniform6(defaults.clouds.minDensity),
          minExtinction: new Uniform6(defaults.clouds.minExtinction),
          minTransmittance: new Uniform6(defaults.clouds.minTransmittance),
          // Secondary raymarch
          maxIterationCountToSun: new Uniform6(defaults.clouds.maxIterationCountToSun),
          maxIterationCountToGround: new Uniform6(defaults.clouds.maxIterationCountToGround),
          minSecondaryStepSize: new Uniform6(defaults.clouds.minSecondaryStepSize),
          secondaryStepScale: new Uniform6(defaults.clouds.secondaryStepScale),
          // Beer shadow map
          shadowBuffer: new Uniform6(null),
          shadowTexelSize: new Uniform6(new Vector28()),
          shadowIntervals: new Uniform6(
            Array.from({ length: 4 }, () => new Vector28())
            // Populate the max number of elements
          ),
          shadowMatrices: new Uniform6(
            Array.from({ length: 4 }, () => new Matrix410())
            // Populate the max number of elements
          ),
          shadowFar: new Uniform6(0),
          maxShadowFilterRadius: new Uniform6(6),
          shadowLayerMask: new Uniform6(new Vector4().setScalar(1)),
          // Disable mask
          // Shadow length
          maxShadowLengthIterationCount: new Uniform6(defaults.clouds.maxShadowLengthIterationCount),
          minShadowLengthStepSize: new Uniform6(defaults.clouds.minShadowLengthStepSize),
          maxShadowLengthRayDistance: new Uniform6(defaults.clouds.maxShadowLengthRayDistance),
          // Haze
          hazeDensityScale: new Uniform6(3e-5),
          hazeExponent: new Uniform6(1e-3),
          hazeScatteringCoefficient: new Uniform6(0.9),
          hazeAbsorptionCoefficient: new Uniform6(0.5)
        }
      },
      atmosphere
    );
    this.temporalUpscale = true;
    this.depthPacking = 0;
    this.localWeatherChannels = "rgba";
    this.shapeDetail = defaults.shapeDetail;
    this.turbulence = defaults.turbulence;
    this.shadowLength = defaults.lightShafts;
    this.haze = defaults.haze;
    this.multiScatteringOctaves = defaults.clouds.multiScatteringOctaves;
    this.accurateSunSkyIrradiance = defaults.clouds.accurateSunSkyIrradiance;
    this.accuratePhaseFunction = defaults.clouds.accuratePhaseFunction;
    this.shadowCascadeCount = defaults.shadow.cascadeCount;
    this.shadowSampleCount = 8;
    this.scatterAnisotropy1 = 0.7;
    this.scatterAnisotropy2 = -0.2;
    this.scatterAnisotropyMix = 0.5;
  }
  onBeforeRender(renderer, scene, camera, geometry, object, group) {
    const prevLogarithmicDepthBuffer = this.defines.USE_LOGDEPTHBUF != null;
    const nextLogarithmicDepthBuffer = renderer.capabilities.logarithmicDepthBuffer;
    if (nextLogarithmicDepthBuffer !== prevLogarithmicDepthBuffer) {
      if (nextLogarithmicDepthBuffer) {
        this.defines.USE_LOGDEPTHBUF = "1";
      } else {
        delete this.defines.USE_LOGDEPTHBUF;
      }
    }
    const prevPowder = this.defines.POWDER != null;
    const nextPowder = this.uniforms.powderScale.value > 0;
    if (nextPowder !== prevPowder) {
      if (nextPowder) {
        this.defines.POWDER = "1";
      } else {
        delete this.defines.POWDER;
      }
      this.needsUpdate = true;
    }
    const prevGroundIrradiance = this.defines.GROUND_IRRADIANCE != null;
    const nextGroundIrradiance = this.uniforms.groundIrradianceScale.value > 0 && this.uniforms.maxIterationCountToGround.value > 0;
    if (nextGroundIrradiance !== prevGroundIrradiance) {
      if (nextPowder) {
        this.defines.GROUND_IRRADIANCE = "1";
      } else {
        delete this.defines.GROUND_IRRADIANCE;
      }
      this.needsUpdate = true;
    }
  }
  copyCameraSettings(camera) {
    if (camera.isPerspectiveCamera === true) {
      if (this.defines.PERSPECTIVE_CAMERA !== "1") {
        this.defines.PERSPECTIVE_CAMERA = "1";
        this.needsUpdate = true;
      }
    } else {
      if (this.defines.PERSPECTIVE_CAMERA != null) {
        delete this.defines.PERSPECTIVE_CAMERA;
        this.needsUpdate = true;
      }
    }
    const uniforms = this.uniforms;
    uniforms.viewMatrix.value.copy(camera.matrixWorldInverse);
    uniforms.inverseViewMatrix.value.copy(camera.matrixWorld);
    const previousProjectionMatrix = this.previousProjectionMatrix ?? camera.projectionMatrix;
    const previousViewMatrix = this.previousViewMatrix ?? camera.matrixWorldInverse;
    const inverseProjectionMatrix = uniforms.inverseProjectionMatrix.value;
    const reprojectionMatrix = uniforms.reprojectionMatrix.value;
    if (this.temporalUpscale) {
      const frame = uniforms.frame.value % 16;
      const resolution = uniforms.resolution.value;
      const offset = bayerOffsets[frame];
      const dx = (offset.x - 0.5) / resolution.x * 4;
      const dy = (offset.y - 0.5) / resolution.y * 4;
      uniforms.temporalJitter.value.set(dx, dy);
      uniforms.mipLevelScale.value = 0.25;
      inverseProjectionMatrix.copy(camera.projectionMatrix);
      inverseProjectionMatrix.elements[8] += dx * 2;
      inverseProjectionMatrix.elements[9] += dy * 2;
      inverseProjectionMatrix.invert();
      reprojectionMatrix.copy(previousProjectionMatrix);
      reprojectionMatrix.elements[8] += dx * 2;
      reprojectionMatrix.elements[9] += dy * 2;
      reprojectionMatrix.multiply(previousViewMatrix);
    } else {
      uniforms.temporalJitter.value.setScalar(0);
      uniforms.mipLevelScale.value = 1;
      inverseProjectionMatrix.copy(camera.projectionMatrixInverse);
      reprojectionMatrix.copy(previousProjectionMatrix).multiply(previousViewMatrix);
    }
    assertType(camera);
    uniforms.cameraNear.value = camera.near;
    uniforms.cameraFar.value = camera.far;
    const cameraPosition = camera.getWorldPosition(
      uniforms.cameraPosition.value
    );
    const cameraPositionECEF = vectorScratch6.copy(cameraPosition).applyMatrix4(uniforms.inverseEllipsoidMatrix.value).sub(uniforms.ellipsoidCenter.value);
    try {
      uniforms.cameraHeight.value = geodeticScratch2.setFromECEF(cameraPositionECEF).height;
    } catch (error) {
    }
  }
  // copyCameraSettings can be called multiple times within a frame. Only
  // reliable way is to explicitly store the matrices.
  copyReprojectionMatrix(camera) {
    this.previousProjectionMatrix ??= new Matrix410();
    this.previousViewMatrix ??= new Matrix410();
    this.previousProjectionMatrix.copy(camera.projectionMatrix);
    this.previousViewMatrix.copy(camera.matrixWorldInverse);
  }
  setSize(width, height, targetWidth, targetHeight) {
    this.uniforms.resolution.value.set(width, height);
    if (targetWidth != null && targetHeight != null) {
      this.uniforms.targetUvScale.value.set(
        width / targetWidth,
        height / targetHeight
      );
    } else {
      this.uniforms.targetUvScale.value.setScalar(1);
    }
    this.previousProjectionMatrix = void 0;
    this.previousViewMatrix = void 0;
  }
  setShadowSize(width, height) {
    this.uniforms.shadowTexelSize.value.set(1 / width, 1 / height);
  }
  get depthBuffer() {
    return this.uniforms.depthBuffer.value;
  }
  set depthBuffer(value) {
    this.uniforms.depthBuffer.value = value;
  }
};
__decorateClass([
  defineInt("DEPTH_PACKING")
], CloudsMaterial.prototype, "depthPacking", 2);
__decorateClass([
  defineExpression("LOCAL_WEATHER_CHANNELS", {
    validate: (value) => /^[rgba]{4}$/.test(value)
  })
], CloudsMaterial.prototype, "localWeatherChannels", 2);
__decorateClass([
  define("SHAPE_DETAIL")
], CloudsMaterial.prototype, "shapeDetail", 2);
__decorateClass([
  define("TURBULENCE")
], CloudsMaterial.prototype, "turbulence", 2);
__decorateClass([
  define("SHADOW_LENGTH")
], CloudsMaterial.prototype, "shadowLength", 2);
__decorateClass([
  define("HAZE")
], CloudsMaterial.prototype, "haze", 2);
__decorateClass([
  defineInt("MULTI_SCATTERING_OCTAVES", { min: 1, max: 12 })
], CloudsMaterial.prototype, "multiScatteringOctaves", 2);
__decorateClass([
  define("ACCURATE_SUN_SKY_IRRADIANCE")
], CloudsMaterial.prototype, "accurateSunSkyIrradiance", 2);
__decorateClass([
  define("ACCURATE_PHASE_FUNCTION")
], CloudsMaterial.prototype, "accuratePhaseFunction", 2);
__decorateClass([
  defineInt("SHADOW_CASCADE_COUNT", { min: 1, max: 4 })
], CloudsMaterial.prototype, "shadowCascadeCount", 2);
__decorateClass([
  defineInt("SHADOW_SAMPLE_COUNT", { min: 1, max: 16 })
], CloudsMaterial.prototype, "shadowSampleCount", 2);
__decorateClass([
  defineFloat("SCATTER_ANISOTROPY_1")
], CloudsMaterial.prototype, "scatterAnisotropy1", 2);
__decorateClass([
  defineFloat("SCATTER_ANISOTROPY_2")
], CloudsMaterial.prototype, "scatterAnisotropy2", 2);
__decorateClass([
  defineFloat("SCATTER_ANISOTROPY_MIX")
], CloudsMaterial.prototype, "scatterAnisotropyMix", 2);

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/CloudsResolveMaterial.ts
import {
  GLSL3 as GLSL34,
  RawShaderMaterial as RawShaderMaterial2,
  Uniform as Uniform7,
  Vector2 as Vector29
} from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/shaders/catmullRomSampling.glsl
var catmullRomSampling_default = `// Taken from https://gist.github.com/TheRealMJP/c83b8c0f46b63f3a88a5986f4fa982b1
// TODO: Use 5-taps version: https://www.shadertoy.com/view/MtVGWz
// Or even 4 taps (requires preprocessing in the input buffer):
// https://www.shadertoy.com/view/4tyGDD

/**
 * MIT License
 *
 * Copyright (c) 2019 MJP
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

vec4 textureCatmullRom(sampler2D tex, vec2 uv) {
  vec2 texSize = vec2(textureSize(tex, 0));

  // We're going to sample a a 4x4 grid of texels surrounding the target UV
  // coordinate. We'll do this by rounding down the sample location to get the
  // exact center of our "starting" texel. The starting texel will be at
  // location [1, 1] in the grid, where [0, 0] is the top left corner.
  vec2 samplePos = uv * texSize;
  vec2 texPos1 = floor(samplePos - 0.5) + 0.5;

  // Compute the fractional offset from our starting texel to our original
  // sample location, which we'll feed into the Catmull-Rom spline function to
  // get our filter weights.
  vec2 f = samplePos - texPos1;

  // Compute the Catmull-Rom weights using the fractional offset that we
  // calculated earlier. These equations are pre-expanded based on our knowledge
  // of where the texels will be located, which lets us avoid having to evaluate
  // a piece-wise function.
  vec2 w0 = f * (-0.5 + f * (1.0 - 0.5 * f));
  vec2 w1 = 1.0 + f * f * (-2.5 + 1.5 * f);
  vec2 w2 = f * (0.5 + f * (2.0 - 1.5 * f));
  vec2 w3 = f * f * (-0.5 + 0.5 * f);

  // Work out weighting factors and sampling offsets that will let us use
  // bilinear filtering to simultaneously evaluate the middle 2 samples from the
  // 4x4 grid.
  vec2 w12 = w1 + w2;
  vec2 offset12 = w2 / (w1 + w2);

  // Compute the final UV coordinates we'll use for sampling the texture
  vec2 texPos0 = texPos1 - 1.0;
  vec2 texPos3 = texPos1 + 2.0;
  vec2 texPos12 = texPos1 + offset12;

  texPos0 /= texSize;
  texPos3 /= texSize;
  texPos12 /= texSize;

  vec4 result = vec4(0.0);
  result += texture(tex, vec2(texPos0.x, texPos0.y)) * w0.x * w0.y;
  result += texture(tex, vec2(texPos12.x, texPos0.y)) * w12.x * w0.y;
  result += texture(tex, vec2(texPos3.x, texPos0.y)) * w3.x * w0.y;

  result += texture(tex, vec2(texPos0.x, texPos12.y)) * w0.x * w12.y;
  result += texture(tex, vec2(texPos12.x, texPos12.y)) * w12.x * w12.y;
  result += texture(tex, vec2(texPos3.x, texPos12.y)) * w3.x * w12.y;

  result += texture(tex, vec2(texPos0.x, texPos3.y)) * w0.x * w3.y;
  result += texture(tex, vec2(texPos12.x, texPos3.y)) * w12.x * w3.y;
  result += texture(tex, vec2(texPos3.x, texPos3.y)) * w3.x * w3.y;

  return result;
}

vec4 textureCatmullRom(sampler2DArray tex, vec3 uv) {
  vec2 texSize = vec2(textureSize(tex, 0));
  vec2 samplePos = uv.xy * texSize;
  vec2 texPos1 = floor(samplePos - 0.5) + 0.5;
  vec2 f = samplePos - texPos1;
  vec2 w0 = f * (-0.5 + f * (1.0 - 0.5 * f));
  vec2 w1 = 1.0 + f * f * (-2.5 + 1.5 * f);
  vec2 w2 = f * (0.5 + f * (2.0 - 1.5 * f));
  vec2 w3 = f * f * (-0.5 + 0.5 * f);
  vec2 w12 = w1 + w2;
  vec2 offset12 = w2 / (w1 + w2);
  vec2 texPos0 = texPos1 - 1.0;
  vec2 texPos3 = texPos1 + 2.0;
  vec2 texPos12 = texPos1 + offset12;
  texPos0 /= texSize;
  texPos3 /= texSize;
  texPos12 /= texSize;
  vec4 result = vec4(0.0);
  result += texture(tex, vec3(texPos0.x, texPos0.y, uv.z)) * w0.x * w0.y;
  result += texture(tex, vec3(texPos12.x, texPos0.y, uv.z)) * w12.x * w0.y;
  result += texture(tex, vec3(texPos3.x, texPos0.y, uv.z)) * w3.x * w0.y;
  result += texture(tex, vec3(texPos0.x, texPos12.y, uv.z)) * w0.x * w12.y;
  result += texture(tex, vec3(texPos12.x, texPos12.y, uv.z)) * w12.x * w12.y;
  result += texture(tex, vec3(texPos3.x, texPos12.y, uv.z)) * w3.x * w12.y;
  result += texture(tex, vec3(texPos0.x, texPos3.y, uv.z)) * w0.x * w3.y;
  result += texture(tex, vec3(texPos12.x, texPos3.y, uv.z)) * w12.x * w3.y;
  result += texture(tex, vec3(texPos3.x, texPos3.y, uv.z)) * w3.x * w3.y;
  return result;
}
`;

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/shaders/cloudsResolve.frag
var cloudsResolve_default = `precision highp float;
precision highp sampler2DArray;

#include "core/turbo"
#include "catmullRomSampling"
#include "varianceClipping"

uniform sampler2D colorBuffer;
uniform sampler2D depthVelocityBuffer;
uniform sampler2D colorHistoryBuffer;

#ifdef SHADOW_LENGTH
uniform sampler2D shadowLengthBuffer;
uniform sampler2D shadowLengthHistoryBuffer;
#endif // SHADOW_LENGTH

uniform vec2 texelSize;
uniform int frame;
uniform float varianceGamma;
uniform float temporalAlpha;
uniform vec2 jitterOffset;

in vec2 vUv;

layout(location = 0) out vec4 outputColor;
#ifdef SHADOW_LENGTH
layout(location = 1) out float outputShadowLength;
#endif // SHADOW_LENGTH

const ivec2 neighborOffsets[9] = ivec2[9](
  ivec2(-1, -1),
  ivec2(-1, 0),
  ivec2(-1, 1),
  ivec2(0, -1),
  ivec2(0, 0),
  ivec2(0, 1),
  ivec2(1, -1),
  ivec2(1, 0),
  ivec2(1, 1)
);

const ivec4[4] bayerIndices = ivec4[4](
  ivec4(0, 12, 3, 15),
  ivec4(8, 4, 11, 7),
  ivec4(2, 14, 1, 13),
  ivec4(10, 6, 9, 5)
);

vec2 getUnjitteredUv(ivec2 coord) {
  return (vec2(coord) + 0.5 - jitterOffset) * texelSize;
}

vec4 getClosestFragment(const vec2 uv) {
  vec4 result = vec4(1e7, 0.0, 0.0, 0.0);
  vec4 neighbor;
  #pragma unroll_loop_start
  for (int i = 0; i < 9; ++i) {
    neighbor = textureOffset(depthVelocityBuffer, uv, neighborOffsets[i]);
    if (neighbor.r < result.r) {
      result = neighbor;
    }
  }
  #pragma unroll_loop_end
  return result;
}

vec4 getClosestFragment(const ivec2 coord) {
  vec4 result = vec4(1e7, 0.0, 0.0, 0.0);
  vec4 neighbor;
  #pragma unroll_loop_start
  for (int i = 0; i < 9; ++i) {
    neighbor = texelFetchOffset(depthVelocityBuffer, coord, 0, neighborOffsets[i]);
    if (neighbor.r < result.r) {
      result = neighbor;
    }
  }
  #pragma unroll_loop_end
  return result;
}

void temporalUpscale(
  const ivec2 coord,
  const ivec2 lowResCoord,
  const bool currentFrame,
  out vec4 outputColor,
  out float outputShadowLength
) {
  #if !defined(DEBUG_SHOW_VELOCITY)
  if (currentFrame) {
    // Use the texel just rendered without any accumulation.
    outputColor = texelFetch(colorBuffer, lowResCoord, 0);
    #ifdef SHADOW_LENGTH
    outputShadowLength = texelFetch(shadowLengthBuffer, lowResCoord, 0).r;
    #endif // SHADOW_LENGTH
    return;
  }
  #endif // !defined(DEBUG_SHOW_VELOCITY)

  vec2 unjitteredUv = getUnjitteredUv(coord);
  vec4 currentColor = texture(colorBuffer, unjitteredUv);
  #ifdef SHADOW_LENGTH
  vec4 currentShadowLength = vec4(texture(shadowLengthBuffer, unjitteredUv).rgb, 1.0);
  #endif // SHADOW_LENGTH

  vec4 depthVelocity = getClosestFragment(unjitteredUv);
  vec2 velocity = depthVelocity.gb * texelSize;
  vec2 prevUv = vUv - velocity;
  if (prevUv.x < 0.0 || prevUv.x > 1.0 || prevUv.y < 0.0 || prevUv.y > 1.0) {
    outputColor = currentColor;
    #ifdef SHADOW_LENGTH
    outputShadowLength = currentShadowLength.r;
    #endif // SHADOW_LENGTH
    return; // Rejection
  }

  // Variance clipping with a large variance gamma seems to work fine for
  // upsampling. This increases ghosting, of course, but it's hard to notice on
  // clouds.
  // vec4 historyColor = textureCatmullRom(colorHistoryBuffer, prevUv);
  vec4 historyColor = texture(colorHistoryBuffer, prevUv);
  vec4 clippedColor = varianceClipping(colorBuffer, vUv, currentColor, historyColor, varianceGamma);
  outputColor = clippedColor;

  #ifdef DEBUG_SHOW_VELOCITY
  outputColor.rgb = outputColor.rgb + vec3(abs(velocity), 0.0);
  #endif // DEBUG_SHOW_VELOCITY

  #ifdef SHADOW_LENGTH
  // Sampling the shadow length history using scene depth doesn't make much
  // sense, but it's too hard to derive it properly. At least this approach
  // resolves the edges of scene objects.
  // vec4 historyShadowLength = vec4(textureCatmullRom(shadowLengthHistoryBuffer, prevUv).rgb, 1.0);
  vec4 historyShadowLength = vec4(texture(shadowLengthHistoryBuffer, prevUv).rgb, 1.0);
  vec4 clippedShadowLength = varianceClipping(
    shadowLengthBuffer,
    vUv,
    currentShadowLength,
    historyShadowLength,
    varianceGamma
  );
  outputShadowLength = clippedShadowLength.r;
  #endif // SHADOW_LENGTH
}

void temporalAntialiasing(const ivec2 coord, out vec4 outputColor, out float outputShadowLength) {
  vec4 currentColor = texelFetch(colorBuffer, coord, 0);
  #ifdef SHADOW_LENGTH
  vec4 currentShadowLength = vec4(texelFetch(shadowLengthBuffer, coord, 0).rgb, 1.0);
  #endif // SHADOW_LENGTH

  vec4 depthVelocity = getClosestFragment(coord);
  vec2 velocity = depthVelocity.gb * texelSize;

  vec2 prevUv = vUv - velocity;
  if (prevUv.x < 0.0 || prevUv.x > 1.0 || prevUv.y < 0.0 || prevUv.y > 1.0) {
    outputColor = currentColor;
    #ifdef SHADOW_LENGTH
    outputShadowLength = currentShadowLength.r;
    #endif // SHADOW_LENGTH
    return; // Rejection
  }

  vec4 historyColor = texture(colorHistoryBuffer, prevUv);
  vec4 clippedColor = varianceClipping(colorBuffer, coord, currentColor, historyColor);
  outputColor = mix(clippedColor, currentColor, temporalAlpha);

  #ifdef DEBUG_SHOW_VELOCITY
  outputColor.rgb = outputColor.rgb + vec3(abs(velocity), 0.0);
  #endif // DEBUG_SHOW_VELOCITY

  #ifdef SHADOW_LENGTH
  vec4 historyShadowLength = vec4(texture(shadowLengthHistoryBuffer, prevUv).rgb, 1.0);
  vec4 clippedShadowLength = varianceClipping(
    shadowLengthBuffer,
    coord,
    currentShadowLength,
    historyShadowLength
  );
  outputShadowLength = mix(clippedShadowLength.r, currentShadowLength.r, temporalAlpha);
  #endif // SHADOW_LENGTH
}

void main() {
  ivec2 coord = ivec2(gl_FragCoord.xy);

  #if !defined(SHADOW_LENGTH)
  float outputShadowLength;
  #endif // !defined(SHADOW_LENGTH)

  #ifdef TEMPORAL_UPSCALE
  ivec2 lowResCoord = coord / 4;
  int bayerValue = bayerIndices[coord.x % 4][coord.y % 4];
  bool currentFrame = bayerValue == frame % 16;
  temporalUpscale(coord, lowResCoord, currentFrame, outputColor, outputShadowLength);
  #else // TEMPORAL_UPSCALE
  temporalAntialiasing(coord, outputColor, outputShadowLength);
  #endif // TEMPORAL_UPSCALE

  #if defined(SHADOW_LENGTH) && defined(DEBUG_SHOW_SHADOW_LENGTH)
  outputColor = vec4(turbo(outputShadowLength * 0.05), 1.0);
  #endif // defined(SHADOW_LENGTH) && defined(DEBUG_SHOW_SHADOW_LENGTH)
}
`;

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/shaders/cloudsResolve.vert
var cloudsResolve_default2 = "precision highp float;\n\nlayout(location = 0) in vec3 position;\n\nout vec2 vUv;\n\nvoid main() {\n  vUv = position.xy * 0.5 + 0.5;\n  gl_Position = vec4(position.xy, 1.0, 1.0);\n}\n";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/shaders/varianceClipping.glsl
var varianceClipping_default = "#ifdef VARIANCE_9_SAMPLES\n#define VARIANCE_OFFSET_COUNT (8)\nconst ivec2 varianceOffsets[8] = ivec2[8](\n  ivec2(-1, -1),\n  ivec2(-1, 1),\n  ivec2(1, -1),\n  ivec2(1, 1),\n  ivec2(1, 0),\n  ivec2(0, -1),\n  ivec2(0, 1),\n  ivec2(-1, 0)\n);\n#else // VARIANCE_9_SAMPLES\n#define VARIANCE_OFFSET_COUNT (4)\nconst ivec2 varianceOffsets[4] = ivec2[4](ivec2(1, 0), ivec2(0, -1), ivec2(0, 1), ivec2(-1, 0));\n#endif // VARIANCE_9_SAMPLES\n\n// Reference: https://github.com/playdeadgames/temporal\nvec4 clipAABB(const vec4 current, const vec4 history, const vec4 minColor, const vec4 maxColor) {\n  vec3 pClip = 0.5 * (maxColor.rgb + minColor.rgb);\n  vec3 eClip = 0.5 * (maxColor.rgb - minColor.rgb) + 1e-7;\n  vec4 vClip = history - vec4(pClip, current.a);\n  vec3 vUnit = vClip.xyz / eClip;\n  vec3 aUnit = abs(vUnit);\n  float maUnit = max(aUnit.x, max(aUnit.y, aUnit.z));\n  if (maUnit > 1.0) {\n    return vec4(pClip, current.a) + vClip / maUnit;\n  }\n  return history;\n}\n\n#ifdef VARIANCE_SAMPLER_ARRAY\n#define VARIANCE_SAMPLER sampler2DArray\n#define VARIANCE_SAMPLER_COORD ivec3\n#else // VARIANCE_SAMPLER_ARRAY\n#define VARIANCE_SAMPLER sampler2D\n#define VARIANCE_SAMPLER_COORD ivec2\n#endif // VARIANCE_SAMPLER_ARRAY\n\n// Variance clipping\n// Reference: https://developer.download.nvidia.com/gameworks/events/GDC2016/msalvi_temporal_supersampling.pdf\nvec4 varianceClipping(\n  const VARIANCE_SAMPLER inputBuffer,\n  const VARIANCE_SAMPLER_COORD coord,\n  const vec4 current,\n  const vec4 history,\n  const float gamma\n) {\n  vec4 moment1 = current;\n  vec4 moment2 = current * current;\n  vec4 neighbor;\n  #pragma unroll_loop_start\n  for (int i = 0; i < 8; ++i) {\n    #if UNROLLED_LOOP_INDEX < VARIANCE_OFFSET_COUNT\n    neighbor = texelFetchOffset(inputBuffer, coord, 0, varianceOffsets[i]);\n    moment1 += neighbor;\n    moment2 += neighbor * neighbor;\n    #endif // UNROLLED_LOOP_INDEX < VARIANCE_OFFSET_COUNT\n  }\n  #pragma unroll_loop_end\n\n  const float N = float(VARIANCE_OFFSET_COUNT + 1);\n  vec4 mean = moment1 / N;\n  vec4 varianceGamma = sqrt(max(moment2 / N - mean * mean, 0.0)) * gamma;\n  vec4 minColor = mean - varianceGamma;\n  vec4 maxColor = mean + varianceGamma;\n  return clipAABB(clamp(mean, minColor, maxColor), history, minColor, maxColor);\n}\n\nvec4 varianceClipping(\n  const VARIANCE_SAMPLER inputBuffer,\n  const VARIANCE_SAMPLER_COORD coord,\n  const vec4 current,\n  const vec4 history\n) {\n  return varianceClipping(inputBuffer, coord, current, history, 1.0);\n}\n\nvec4 varianceClipping(\n  const sampler2D inputBuffer,\n  const vec2 coord,\n  const vec4 current,\n  const vec4 history,\n  const float gamma\n) {\n  vec4 moment1 = current;\n  vec4 moment2 = current * current;\n  vec4 neighbor;\n  #pragma unroll_loop_start\n  for (int i = 0; i < 8; ++i) {\n    #if UNROLLED_LOOP_INDEX < VARIANCE_OFFSET_COUNT\n    neighbor = textureOffset(inputBuffer, coord, varianceOffsets[i]);\n    moment1 += neighbor;\n    moment2 += neighbor * neighbor;\n    #endif // UNROLLED_LOOP_INDEX < VARIANCE_OFFSET_COUNT\n  }\n  #pragma unroll_loop_end\n\n  const float N = float(VARIANCE_OFFSET_COUNT + 1);\n  vec4 mean = moment1 / N;\n  vec4 varianceGamma = sqrt(max(moment2 / N - mean * mean, 0.0)) * gamma;\n  vec4 minColor = mean - varianceGamma;\n  vec4 maxColor = mean + varianceGamma;\n  return clipAABB(clamp(mean, minColor, maxColor), history, minColor, maxColor);\n}\n\nvec4 varianceClipping(\n  const sampler2D inputBuffer,\n  const vec2 coord,\n  const vec4 current,\n  const vec4 history\n) {\n  return varianceClipping(inputBuffer, coord, current, history, 1.0);\n}\n";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/CloudsResolveMaterial.ts
var CloudsResolveMaterial = class extends RawShaderMaterial2 {
  constructor({
    colorBuffer = null,
    depthVelocityBuffer = null,
    shadowLengthBuffer = null,
    colorHistoryBuffer = null,
    shadowLengthHistoryBuffer = null
  } = {}) {
    super({
      name: "CloudsResolveMaterial",
      glslVersion: GLSL34,
      vertexShader: cloudsResolve_default2,
      fragmentShader: unrollLoops(
        resolveIncludes(cloudsResolve_default, {
          core: { turbo },
          catmullRomSampling: catmullRomSampling_default,
          varianceClipping: varianceClipping_default
        })
      ),
      uniforms: {
        colorBuffer: new Uniform7(colorBuffer),
        depthVelocityBuffer: new Uniform7(depthVelocityBuffer),
        shadowLengthBuffer: new Uniform7(shadowLengthBuffer),
        colorHistoryBuffer: new Uniform7(colorHistoryBuffer),
        shadowLengthHistoryBuffer: new Uniform7(shadowLengthHistoryBuffer),
        texelSize: new Uniform7(new Vector29()),
        frame: new Uniform7(0),
        jitterOffset: new Uniform7(new Vector29()),
        varianceGamma: new Uniform7(2),
        temporalAlpha: new Uniform7(0.1)
      }
    });
    this.temporalUpscale = true;
    this.shadowLength = true;
  }
  setSize(width, height) {
    this.uniforms.texelSize.value.set(1 / width, 1 / height);
  }
  onBeforeRender(renderer, scene, camera, geometry, object, group) {
    const uniforms = this.uniforms;
    const frame = uniforms.frame.value % 16;
    const offset = bayerOffsets[frame];
    const dx = (offset.x - 0.5) * 4;
    const dy = (offset.y - 0.5) * 4;
    this.uniforms.jitterOffset.value.set(dx, dy);
  }
};
__decorateClass([
  define("TEMPORAL_UPSCALE")
], CloudsResolveMaterial.prototype, "temporalUpscale", 2);
__decorateClass([
  define("SHADOW_LENGTH")
], CloudsResolveMaterial.prototype, "shadowLength", 2);

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/PassBase.ts
import { Pass as Pass2 } from "https://esm.sh/postprocessing@6.37.4?deps=three@0.185.1&external=three";
import { Camera as Camera2 } from "https://esm.sh/three@0.185.1?external";
var PassBase = class extends Pass2 {
  constructor(name, options) {
    super(name);
    this._mainCamera = new Camera2();
    const { shadow } = options;
    this.shadow = shadow;
  }
  get mainCamera() {
    return this._mainCamera;
  }
  set mainCamera(value) {
    this._mainCamera = value;
  }
};

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/CloudsPass.ts
function createRenderTarget(name, { depthVelocity, shadowLength }) {
  const renderTarget = new WebGLRenderTarget2(1, 1, {
    depthBuffer: false,
    stencilBuffer: false,
    type: HalfFloatType4
  });
  renderTarget.texture.minFilter = LinearFilter3;
  renderTarget.texture.magFilter = LinearFilter3;
  renderTarget.texture.name = name;
  let depthVelocityBuffer;
  if (depthVelocity) {
    depthVelocityBuffer = renderTarget.texture.clone();
    depthVelocityBuffer.isRenderTargetTexture = true;
    renderTarget.depthVelocity = depthVelocityBuffer;
    renderTarget.textures.push(depthVelocityBuffer);
  }
  let shadowLengthBuffer;
  if (shadowLength) {
    shadowLengthBuffer = renderTarget.texture.clone();
    shadowLengthBuffer.isRenderTargetTexture = true;
    shadowLengthBuffer.format = RedFormat3;
    renderTarget.shadowLength = shadowLengthBuffer;
    renderTarget.textures.push(shadowLengthBuffer);
  }
  return Object.assign(renderTarget, {
    depthVelocity: depthVelocityBuffer ?? null,
    shadowLength: shadowLengthBuffer ?? null
  });
}
var CloudsPass = class extends PassBase {
  constructor({
    parameterUniforms,
    layerUniforms,
    atmosphereUniforms,
    ...options
  }, atmosphere) {
    super("CloudsPass", options);
    this.atmosphere = atmosphere;
    this.width = 0;
    this.height = 0;
    this.currentMaterial = new CloudsMaterial(
      {
        parameterUniforms,
        layerUniforms,
        atmosphereUniforms
      },
      atmosphere
    );
    this.currentPass = new ShaderPass2(this.currentMaterial);
    this.resolveMaterial = new CloudsResolveMaterial();
    this.resolvePass = new ShaderPass2(this.resolveMaterial);
    this.initRenderTargets({
      depthVelocity: true,
      shadowLength: defaults.lightShafts
    });
  }
  copyCameraSettings(camera) {
    this.currentMaterial.copyCameraSettings(camera);
  }
  initialize(renderer, alpha, frameBufferType) {
    this.currentPass.initialize(renderer, alpha, frameBufferType);
    this.resolvePass.initialize(renderer, alpha, frameBufferType);
  }
  initRenderTargets(options) {
    this.currentRenderTarget?.dispose();
    this.resolveRenderTarget?.dispose();
    this.historyRenderTarget?.dispose();
    const current = createRenderTarget("Clouds", options);
    const resolve = createRenderTarget("Clouds.A", {
      ...options,
      depthVelocity: false
    });
    const history = createRenderTarget("Clouds.B", {
      ...options,
      depthVelocity: false
    });
    this.currentRenderTarget = current;
    this.resolveRenderTarget = resolve;
    this.historyRenderTarget = history;
    const resolveUniforms = this.resolveMaterial.uniforms;
    resolveUniforms.colorBuffer.value = current.texture;
    resolveUniforms.depthVelocityBuffer.value = current.depthVelocity;
    resolveUniforms.shadowLengthBuffer.value = current.shadowLength;
    resolveUniforms.colorHistoryBuffer.value = history.texture;
    resolveUniforms.shadowLengthHistoryBuffer.value = history.shadowLength;
  }
  copyShadow() {
    const shadow = this.shadow;
    const currentUniforms = this.currentMaterial.uniforms;
    for (let i = 0; i < shadow.cascadeCount; ++i) {
      const cascade = shadow.cascades[i];
      currentUniforms.shadowIntervals.value[i].copy(cascade.interval);
      currentUniforms.shadowMatrices.value[i].copy(cascade.matrix);
    }
    currentUniforms.shadowFar.value = shadow.far;
  }
  copyReprojection() {
    this.currentMaterial.copyReprojectionMatrix(this.mainCamera);
  }
  swapBuffers() {
    const nextResolve = this.historyRenderTarget;
    const nextHistory = this.resolveRenderTarget;
    this.resolveRenderTarget = nextResolve;
    this.historyRenderTarget = nextHistory;
    const resolveUniforms = this.resolveMaterial.uniforms;
    resolveUniforms.colorHistoryBuffer.value = nextHistory.texture;
    resolveUniforms.shadowLengthHistoryBuffer.value = nextHistory.shadowLength;
  }
  update(renderer, frame, deltaTime) {
    this.currentMaterial.uniforms.frame.value = frame;
    this.resolveMaterial.uniforms.frame.value = frame;
    this.copyCameraSettings(this.mainCamera);
    this.copyShadow();
    this.currentPass.render(renderer, null, this.currentRenderTarget);
    this.resolvePass.render(renderer, null, this.resolveRenderTarget);
    this.copyReprojection();
    this.swapBuffers();
  }
  setSize(width, height) {
    this.width = width;
    this.height = height;
    if (this.temporalUpscale) {
      const lowResWidth = Math.ceil(width / 4);
      const lowResHeight = Math.ceil(height / 4);
      this.currentRenderTarget.setSize(lowResWidth, lowResHeight);
      this.currentMaterial.setSize(
        lowResWidth * 4,
        lowResHeight * 4,
        width,
        height
      );
    } else {
      this.currentRenderTarget.setSize(width, height);
      this.currentMaterial.setSize(width, height);
    }
    this.resolveRenderTarget.setSize(width, height);
    this.resolveMaterial.setSize(width, height);
    this.historyRenderTarget.setSize(width, height);
  }
  setShadowSize(width, height, depth2) {
    this.currentMaterial.shadowCascadeCount = depth2;
    this.currentMaterial.setShadowSize(width, height);
  }
  setDepthTexture(depthTexture, depthPacking) {
    this.currentMaterial.depthBuffer = depthTexture;
    this.currentMaterial.depthPacking = depthPacking ?? 0;
  }
  get outputBuffer() {
    return this.historyRenderTarget.texture;
  }
  get shadowBuffer() {
    return this.currentMaterial.uniforms.shadowBuffer.value;
  }
  set shadowBuffer(value) {
    this.currentMaterial.uniforms.shadowBuffer.value = value;
  }
  get shadowLengthBuffer() {
    return this.historyRenderTarget.shadowLength;
  }
  get temporalUpscale() {
    return this.currentMaterial.temporalUpscale;
  }
  set temporalUpscale(value) {
    if (value !== this.temporalUpscale) {
      this.currentMaterial.temporalUpscale = value;
      this.resolveMaterial.temporalUpscale = value;
      this.setSize(this.width, this.height);
    }
  }
  get lightShafts() {
    return this.currentMaterial.shadowLength;
  }
  set lightShafts(value) {
    if (value !== this.lightShafts) {
      this.currentMaterial.shadowLength = value;
      this.resolveMaterial.shadowLength = value;
      this.initRenderTargets({
        depthVelocity: true,
        shadowLength: value
      });
      this.setSize(this.width, this.height);
    }
  }
};
export {
  CloudsPass
};
