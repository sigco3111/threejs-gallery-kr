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

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/ShadowPass.ts
import {
  HalfFloatType as HalfFloatType2,
  LinearFilter as LinearFilter2,
  WebGLArrayRenderTarget
} from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/vendor/tiny-invariant.ts
function invariant(condition, message) {
  if (condition) return;
  const provided = typeof message === "function" ? message() : message;
  throw new Error(provided != null ? `Invariant failed: ${provided}` : "Invariant failed");
}

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/PassBase.ts
import { Pass } from "https://esm.sh/postprocessing@6.37.4?deps=three@0.185.1&external=three";
import { Camera } from "https://esm.sh/three@0.185.1?external";
var PassBase = class extends Pass {
  constructor(name, options) {
    super(name);
    __publicField(this, "shadow");
    __publicField(this, "_mainCamera", new Camera());
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

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/ShaderArrayPass.ts
import { ShaderPass } from "https://esm.sh/postprocessing@6.37.4?deps=three@0.185.1&external=three";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/helpers/setArrayRenderTargetLayers.ts
function setArrayRenderTargetLayers(renderer, outputBuffer) {
  const glTexture = renderer.properties.get(outputBuffer.texture).__webglTexture;
  const gl = renderer.getContext();
  invariant(gl instanceof WebGL2RenderingContext);
  renderer.setRenderTarget(outputBuffer);
  const drawBuffers = [];
  if (glTexture != null) {
    for (let layer = 0; layer < outputBuffer.depth; ++layer) {
      gl.framebufferTextureLayer(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0 + layer,
        glTexture,
        0,
        layer
      );
      drawBuffers.push(gl.COLOR_ATTACHMENT0 + layer);
    }
  }
  gl.drawBuffers(drawBuffers);
}

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/ShaderArrayPass.ts
var ShaderArrayPass = class extends ShaderPass {
  render(renderer, inputBuffer, outputBuffer, deltaTime, stencilTest) {
    const uniforms = this.fullscreenMaterial.uniforms;
    if (inputBuffer !== null && uniforms?.[this.input] != null) {
      uniforms[this.input].value = inputBuffer.texture;
    }
    setArrayRenderTargetLayers(renderer, outputBuffer);
    renderer.render(this.scene, this.camera);
  }
};

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/ShadowMaterial.ts
import {
  GLSL3,
  Matrix4 as Matrix43,
  RawShaderMaterial,
  Uniform,
  Vector2 as Vector23
} from "https://esm.sh/three@0.185.1?external";

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
              this.defines ?? (this.defines = {});
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
            this.defines ?? (this.defines = {});
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

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/shaders/math.glsl
var math_default = "#if !defined(saturate)\n#define saturate(a) clamp(a, 0.0, 1.0)\n#endif // !defined(saturate)\n\nfloat remap(const float x, const float min1, const float max1, const float min2, const float max2) {\n  return min2 + (x - min1) / (max1 - min1) * (max2 - min2);\n}\n\nvec2 remap(const vec2 x, const vec2 min1, const vec2 max1, const vec2 min2, const vec2 max2) {\n  return min2 + (x - min1) / (max1 - min1) * (max2 - min2);\n}\n\nvec3 remap(const vec3 x, const vec3 min1, const vec3 max1, const vec3 min2, const vec3 max2) {\n  return min2 + (x - min1) / (max1 - min1) * (max2 - min2);\n}\n\nvec4 remap(const vec4 x, const vec4 min1, const vec4 max1, const vec4 min2, const vec4 max2) {\n  return min2 + (x - min1) / (max1 - min1) * (max2 - min2);\n}\n\nfloat remapClamped(\n  const float x,\n  const float min1,\n  const float max1,\n  const float min2,\n  const float max2\n) {\n  return clamp(min2 + (x - min1) / (max1 - min1) * (max2 - min2), min2, max2);\n}\n\nvec2 remapClamped(\n  const vec2 x,\n  const vec2 min1,\n  const vec2 max1,\n  const vec2 min2,\n  const vec2 max2\n) {\n  return clamp(min2 + (x - min1) / (max1 - min1) * (max2 - min2), min2, max2);\n}\n\nvec3 remapClamped(\n  const vec3 x,\n  const vec3 min1,\n  const vec3 max1,\n  const vec3 min2,\n  const vec3 max2\n) {\n  return clamp(min2 + (x - min1) / (max1 - min1) * (max2 - min2), min2, max2);\n}\n\nvec4 remapClamped(\n  const vec4 x,\n  const vec4 min1,\n  const vec4 max1,\n  const vec4 min2,\n  const vec4 max2\n) {\n  return clamp(min2 + (x - min1) / (max1 - min1) * (max2 - min2), min2, max2);\n}\n\n// Implicitly remap to 0 and 1\nfloat remap(const float x, const float min1, const float max1) {\n  return (x - min1) / (max1 - min1);\n}\n\nvec2 remap(const vec2 x, const vec2 min1, const vec2 max1) {\n  return (x - min1) / (max1 - min1);\n}\n\nvec3 remap(const vec3 x, const vec3 min1, const vec3 max1) {\n  return (x - min1) / (max1 - min1);\n}\n\nvec4 remap(const vec4 x, const vec4 min1, const vec4 max1) {\n  return (x - min1) / (max1 - min1);\n}\n\nfloat remapClamped(const float x, const float min1, const float max1) {\n  return saturate((x - min1) / (max1 - min1));\n}\n\nvec2 remapClamped(const vec2 x, const vec2 min1, const vec2 max1) {\n  return saturate((x - min1) / (max1 - min1));\n}\n\nvec3 remapClamped(const vec3 x, const vec3 min1, const vec3 max1) {\n  return saturate((x - min1) / (max1 - min1));\n}\n\nvec4 remapClamped(const vec4 x, const vec4 min1, const vec4 max1) {\n  return saturate((x - min1) / (max1 - min1));\n}\n";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/shaders/raySphereIntersection.glsl
var raySphereIntersection_default = "float raySphereFirstIntersection(\n  const vec3 origin,\n  const vec3 direction,\n  const vec3 center,\n  const float radius\n) {\n  vec3 a = origin - center;\n  float b = 2.0 * dot(direction, a);\n  float c = dot(a, a) - radius * radius;\n  float discriminant = b * b - 4.0 * c;\n  return discriminant < 0.0\n    ? -1.0\n    : (-b - sqrt(discriminant)) * 0.5;\n}\n\nfloat raySphereFirstIntersection(const vec3 origin, const vec3 direction, const float radius) {\n  return raySphereFirstIntersection(origin, direction, vec3(0.0), radius);\n}\n\nvec4 raySphereFirstIntersection(\n  const vec3 origin,\n  const vec3 direction,\n  const vec3 center,\n  const vec4 radius\n) {\n  vec3 a = origin - center;\n  float b = 2.0 * dot(direction, a);\n  vec4 c = dot(a, a) - radius * radius;\n  vec4 discriminant = b * b - 4.0 * c;\n  vec4 mask = step(discriminant, vec4(0.0));\n  return mix((-b - sqrt(max(vec4(0.0), discriminant))) * 0.5, vec4(-1.0), mask);\n}\n\nvec4 raySphereFirstIntersection(const vec3 origin, const vec3 direction, const vec4 radius) {\n  return raySphereFirstIntersection(origin, direction, vec3(0.0), radius);\n}\n\nfloat raySphereSecondIntersection(\n  const vec3 origin,\n  const vec3 direction,\n  const vec3 center,\n  const float radius\n) {\n  vec3 a = origin - center;\n  float b = 2.0 * dot(direction, a);\n  float c = dot(a, a) - radius * radius;\n  float discriminant = b * b - 4.0 * c;\n  return discriminant < 0.0\n    ? -1.0\n    : (-b + sqrt(discriminant)) * 0.5;\n}\n\nfloat raySphereSecondIntersection(const vec3 origin, const vec3 direction, const float radius) {\n  return raySphereSecondIntersection(origin, direction, vec3(0.0), radius);\n}\n\nvec4 raySphereSecondIntersection(\n  const vec3 origin,\n  const vec3 direction,\n  const vec3 center,\n  const vec4 radius\n) {\n  vec3 a = origin - center;\n  float b = 2.0 * dot(direction, a);\n  vec4 c = dot(a, a) - radius * radius;\n  vec4 discriminant = b * b - 4.0 * c;\n  vec4 mask = step(discriminant, vec4(0.0));\n  return mix((-b + sqrt(max(vec4(0.0), discriminant))) * 0.5, vec4(-1.0), mask);\n}\n\nvec4 raySphereSecondIntersection(const vec3 origin, const vec3 direction, const vec4 radius) {\n  return raySphereSecondIntersection(origin, direction, vec3(0.0), radius);\n}\n\nvoid raySphereIntersections(\n  const vec3 origin,\n  const vec3 direction,\n  const vec3 center,\n  const float radius,\n  out float intersection1,\n  out float intersection2\n) {\n  vec3 a = origin - center;\n  float b = 2.0 * dot(direction, a);\n  float c = dot(a, a) - radius * radius;\n  float discriminant = b * b - 4.0 * c;\n  if (discriminant < 0.0) {\n    intersection1 = -1.0;\n    intersection2 = -1.0;\n    return;\n  } else {\n    float Q = sqrt(discriminant);\n    intersection1 = (-b - Q) * 0.5;\n    intersection2 = (-b + Q) * 0.5;\n  }\n}\n\nvoid raySphereIntersections(\n  const vec3 origin,\n  const vec3 direction,\n  const float radius,\n  out float intersection1,\n  out float intersection2\n) {\n  raySphereIntersections(origin, direction, vec3(0.0), radius, intersection1, intersection2);\n}\n\nvoid raySphereIntersections(\n  const vec3 origin,\n  const vec3 direction,\n  const vec3 center,\n  const vec4 radius,\n  out vec4 intersection1,\n  out vec4 intersection2\n) {\n  vec3 a = origin - center;\n  float b = 2.0 * dot(direction, a);\n  vec4 c = dot(a, a) - radius * radius;\n  vec4 discriminant = b * b - 4.0 * c;\n  vec4 mask = step(discriminant, vec4(0.0));\n  vec4 Q = sqrt(max(vec4(0.0), discriminant));\n  intersection1 = mix((-b - Q) * 0.5, vec4(-1.0), mask);\n  intersection2 = mix((-b + Q) * 0.5, vec4(-1.0), mask);\n}\n\nvoid raySphereIntersections(\n  const vec3 origin,\n  const vec3 direction,\n  const vec4 radius,\n  out vec4 intersection1,\n  out vec4 intersection2\n) {\n  raySphereIntersections(origin, direction, vec3(0.0), radius, intersection1, intersection2);\n}\n";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/geospatial/shaders/index.ts
var math = math_default;
var raySphereIntersection = raySphereIntersection_default;

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

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/shaders/clouds.glsl
var clouds_default = "float getSTBN() {\n  ivec3 size = textureSize(stbnTexture, 0);\n  vec3 scale = 1.0 / vec3(size);\n  return texture(stbnTexture, vec3(gl_FragCoord.xy, float(frame % size.z)) * scale).r;\n}\n\n// Straightforward spherical mapping\nvec2 getSphericalUv(const vec3 position) {\n  vec2 st = normalize(position.yx);\n  float phi = atan(st.x, st.y);\n  float theta = asin(normalize(position).z);\n  return vec2(phi * RECIPROCAL_PI2 + 0.5, theta * RECIPROCAL_PI + 0.5);\n}\n\nvec2 getCubeSphereUv(const vec3 position) {\n  // Cube-sphere relaxation by: http://mathproofs.blogspot.com/2005/07/mapping-cube-to-sphere.html\n  // TODO: Tile and fix seams.\n  // Possible improvements:\n  // https://iquilezles.org/articles/texturerepetition/\n  // https://gamedev.stackexchange.com/questions/184388/fragment-shader-map-dot-texture-repeatedly-over-the-sphere\n  // https://github.com/mmikk/hextile-demo\n\n  vec3 n = normalize(position);\n  vec3 f = abs(n);\n  vec3 c = n / max(f.x, max(f.y, f.z));\n  vec2 m;\n  if (all(greaterThan(f.yy, f.xz))) {\n    m = c.y > 0.0 ? vec2(-n.x, n.z) : n.xz;\n  } else if (all(greaterThan(f.xx, f.yz))) {\n    m = c.x > 0.0 ? n.yz : vec2(-n.y, n.z);\n  } else {\n    m = c.z > 0.0 ? n.xy : vec2(n.x, -n.y);\n  }\n\n  vec2 m2 = m * m;\n  float q = dot(m2.xy, vec2(-2.0, 2.0)) - 3.0;\n  float q2 = q * q;\n  vec2 uv;\n  uv.x = sqrt(1.5 + m2.x - m2.y - 0.5 * sqrt(-24.0 * m2.x + q2)) * (m.x > 0.0 ? 1.0 : -1.0);\n  uv.y = sqrt(6.0 / (3.0 - uv.x * uv.x)) * m.y;\n  return uv * 0.5 + 0.5;\n}\n\nvec2 getGlobeUv(const vec3 position) {\n  return getCubeSphereUv(position);\n}\n\nfloat getMipLevel(const vec2 uv) {\n  const float mipLevelScale = 0.1;\n  vec2 coord = uv * resolution;\n  vec2 ddx = dFdx(coord);\n  vec2 ddy = dFdy(coord);\n  float deltaMaxSqr = max(dot(ddx, ddx), dot(ddy, ddy)) * mipLevelScale;\n  return max(0.0, 0.5 * log2(max(1.0, deltaMaxSqr)));\n}\n\nbool insideLayerIntervals(const float height) {\n  bvec3 gt = greaterThan(vec3(height), minIntervalHeights);\n  bvec3 lt = lessThan(vec3(height), maxIntervalHeights);\n  return any(bvec3(gt.x && lt.x, gt.y && lt.y, gt.z && lt.z));\n}\n\nstruct WeatherSample {\n  vec4 heightFraction; // Normalized height of each layer\n  vec4 density;\n};\n\nvec4 shapeAlteringFunction(const vec4 heightFraction, const vec4 bias) {\n  // Apply a semi-circle transform to round the clouds towards the top.\n  vec4 biased = pow(heightFraction, bias);\n  vec4 x = clamp(biased * 2.0 - 1.0, -1.0, 1.0);\n  return 1.0 - x * x;\n}\n\nWeatherSample sampleWeather(const vec2 uv, const float height, const float mipLevel) {\n  WeatherSample weather;\n  weather.heightFraction = remapClamped(vec4(height), minLayerHeights, maxLayerHeights);\n\n  vec4 localWeather = pow(\n    textureLod(\n      localWeatherTexture,\n      uv * localWeatherRepeat + localWeatherOffset,\n      mipLevel\n    ).LOCAL_WEATHER_CHANNELS,\n    weatherExponents\n  );\n  #ifdef SHADOW\n  localWeather *= shadowLayerMask;\n  #endif // SHADOW\n\n  vec4 heightScale = shapeAlteringFunction(weather.heightFraction, shapeAlteringBiases);\n\n  // Modulation to control weather by coverage parameter.\n  // Reference: https://github.com/Prograda/Skybolt/blob/master/Assets/Core/Shaders/Clouds.h#L63\n  vec4 factor = 1.0 - coverage * heightScale;\n  weather.density = remapClamped(\n    mix(localWeather, vec4(1.0), coverageFilterWidths),\n    factor,\n    factor + coverageFilterWidths\n  );\n\n  return weather;\n}\n\nvec4 getLayerDensity(const vec4 heightFraction) {\n  // prettier-ignore\n  return densityProfile.expTerms * exp(densityProfile.exponents * heightFraction) +\n    densityProfile.linearTerms * heightFraction +\n    densityProfile.constantTerms;\n}\n\nstruct MediaSample {\n  float density;\n  vec4 weight;\n  float scattering;\n  float extinction;\n};\n\nMediaSample sampleMedia(\n  const WeatherSample weather,\n  const vec3 position,\n  const vec2 uv,\n  const float mipLevel,\n  const float jitter,\n  out ivec3 sampleCount\n) {\n  vec4 density = weather.density;\n\n  // TODO: Define in physical length.\n  vec3 surfaceNormal = normalize(position);\n  float localWeatherSpeed = length(localWeatherOffset);\n  vec3 evolution = -surfaceNormal * localWeatherSpeed * 2e4;\n\n  vec3 turbulence = vec3(0.0);\n  #ifdef TURBULENCE\n  vec2 turbulenceUv = uv * localWeatherRepeat * turbulenceRepeat;\n  turbulence =\n    turbulenceDisplacement *\n    (texture(turbulenceTexture, turbulenceUv).rgb * 2.0 - 1.0) *\n    dot(density, remapClamped(weather.heightFraction, vec4(0.3), vec4(0.0)));\n  #endif // TURBULENCE\n\n  vec3 shapePosition = (position + evolution + turbulence) * shapeRepeat + shapeOffset;\n  float shape = texture(shapeTexture, shapePosition).r;\n  density = remapClamped(density, vec4(1.0 - shape) * shapeAmounts, vec4(1.0));\n\n  #ifdef DEBUG_SHOW_SAMPLE_COUNT\n  ++sampleCount.y;\n  #endif // DEBUG_SHOW_SAMPLE_COUNT\n\n  #ifdef SHAPE_DETAIL\n  if (mipLevel * 0.5 + (jitter - 0.5) * 0.5 < 0.5) {\n    vec3 detailPosition = (position + turbulence) * shapeDetailRepeat + shapeDetailOffset;\n    float detail = texture(shapeDetailTexture, detailPosition).r;\n    // Fluffy at the top and whippy at the bottom.\n    vec4 modifier = mix(\n      vec4(pow(detail, 6.0)),\n      vec4(1.0 - detail),\n      remapClamped(weather.heightFraction, vec4(0.2), vec4(0.4))\n    );\n    modifier = mix(vec4(0.0), modifier, shapeDetailAmounts);\n    density = remapClamped(density * 2.0, vec4(modifier * 0.5), vec4(1.0));\n\n    #ifdef DEBUG_SHOW_SAMPLE_COUNT\n    ++sampleCount.z;\n    #endif // DEBUG_SHOW_SAMPLE_COUNT\n  }\n  #endif // SHAPE_DETAIL\n\n  // Apply the density profiles.\n  density = saturate(density * densityScales * getLayerDensity(weather.heightFraction));\n\n  MediaSample media;\n  float densitySum = density.x + density.y + density.z + density.w;\n  media.weight = density / densitySum;\n  media.scattering = densitySum * scatteringCoefficient;\n  media.extinction = densitySum * absorptionCoefficient + media.scattering;\n  return media;\n}\n\nMediaSample sampleMedia(\n  const WeatherSample weather,\n  const vec3 position,\n  const vec2 uv,\n  const float mipLevel,\n  const float jitter\n) {\n  ivec3 sampleCount;\n  return sampleMedia(weather, position, uv, mipLevel, jitter, sampleCount);\n}\n";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/shaders/parameters.glsl
var parameters_default = "uniform vec2 resolution;\nuniform int frame;\nuniform sampler3D stbnTexture;\n\n// Atmosphere\nuniform float bottomRadius;\nuniform mat4 ellipsoidMatrix;\nuniform mat4 inverseEllipsoidMatrix;\nuniform vec3 sunDirection;\n\n// Participating medium\nuniform float scatteringCoefficient;\nuniform float absorptionCoefficient;\n\n// Primary raymarch\nuniform float minDensity;\nuniform float minExtinction;\nuniform float minTransmittance;\n\n// Shape and weather\nuniform sampler2D localWeatherTexture;\nuniform vec2 localWeatherRepeat;\nuniform vec2 localWeatherOffset;\nuniform float coverage;\nuniform sampler3D shapeTexture;\nuniform vec3 shapeRepeat;\nuniform vec3 shapeOffset;\n\n#ifdef SHAPE_DETAIL\nuniform sampler3D shapeDetailTexture;\nuniform vec3 shapeDetailRepeat;\nuniform vec3 shapeDetailOffset;\n#endif // SHAPE_DETAIL\n\n#ifdef TURBULENCE\nuniform sampler2D turbulenceTexture;\nuniform vec2 turbulenceRepeat;\nuniform float turbulenceDisplacement;\n#endif // TURBULENCE\n\n// Haze\n#ifdef HAZE\nuniform float hazeDensityScale;\nuniform float hazeExponent;\nuniform float hazeScatteringCoefficient;\nuniform float hazeAbsorptionCoefficient;\n#endif // HAZE\n\n// Cloud layers\nuniform vec4 minLayerHeights;\nuniform vec4 maxLayerHeights;\nuniform vec3 minIntervalHeights;\nuniform vec3 maxIntervalHeights;\nuniform vec4 densityScales;\nuniform vec4 shapeAmounts;\nuniform vec4 shapeDetailAmounts;\nuniform vec4 weatherExponents;\nuniform vec4 shapeAlteringBiases;\nuniform vec4 coverageFilterWidths;\nuniform float minHeight;\nuniform float maxHeight;\nuniform float shadowTopHeight;\nuniform float shadowBottomHeight;\nuniform vec4 shadowLayerMask;\nuniform DensityProfile densityProfile;\n";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/shaders/shadow.frag
var shadow_default = `precision highp float;
precision highp sampler3D;

#include <common>

#include "core/math"
#include "core/raySphereIntersection"
#include "types"
#include "parameters"
#include "structuredSampling"
#include "clouds"

uniform mat4 inverseShadowMatrices[CASCADE_COUNT];
uniform mat4 reprojectionMatrices[CASCADE_COUNT];

// Primary raymarch
uniform int maxIterationCount;
uniform float minStepSize;
uniform float maxStepSize;
uniform float opticalDepthTailScale;

in vec2 vUv;
in vec3 vEllipsoidCenter;

layout(location = 0) out vec4 outputColor[CASCADE_COUNT];

// Redundant notation for prettier.
#if CASCADE_COUNT == 1
layout(location = 1) out vec3 outputDepthVelocity[CASCADE_COUNT];
#elif CASCADE_COUNT == 2
layout(location = 2) out vec3 outputDepthVelocity[CASCADE_COUNT];
#elif CASCADE_COUNT == 3
layout(location = 3) out vec3 outputDepthVelocity[CASCADE_COUNT];
#elif CASCADE_COUNT == 4
layout(location = 4) out vec3 outputDepthVelocity[CASCADE_COUNT];
#endif // CASCADE_COUNT

vec4 marchClouds(
  const vec3 rayOrigin,
  const vec3 rayDirection,
  const float maxRayDistance,
  const float jitter,
  const float mipLevel
) {
  // Setup structured volume sampling (SVS).
  // While SVS introduces spatial aliasing, it is indeed temporally stable,
  // which is important for lower-resolution shadow maps where a flickering
  // single pixel can be highly noticeable.
  vec3 normal = getStructureNormal(rayDirection, jitter);
  float rayDistance;
  float stepSize;
  intersectStructuredPlanes(
    normal,
    rayOrigin,
    rayDirection,
    clamp(maxRayDistance / float(maxIterationCount), minStepSize, maxStepSize),
    rayDistance,
    stepSize
  );

  #ifdef TEMPORAL_JITTER
  rayDistance -= stepSize * jitter;
  #endif // TEMPORAL_JITTER

  float extinctionSum = 0.0;
  float maxOpticalDepth = 0.0;
  float maxOpticalDepthTail = 0.0;
  float transmittanceIntegral = 1.0;
  float weightedDistanceSum = 0.0;
  float transmittanceSum = 0.0;

  int sampleCount = 0;
  for (int i = 0; i < maxIterationCount; ++i) {
    if (rayDistance > maxRayDistance) {
      break; // Termination
    }

    vec3 position = rayDistance * rayDirection + rayOrigin;
    float height = length(position) - bottomRadius;

    #if !defined(DEBUG_MARCH_INTERVALS)
    if (insideLayerIntervals(height)) {
      rayDistance += stepSize;
      continue;
    }
    #endif // !defined(DEBUG_MARCH_INTERVALS)

    // Sample rough weather.
    vec2 uv = getGlobeUv(position);
    WeatherSample weather = sampleWeather(uv, height, mipLevel);

    if (any(greaterThan(weather.density, vec4(minDensity)))) {
      // Sample detailed participating media.
      // Note this assumes an homogeneous medium.
      MediaSample media = sampleMedia(weather, position, uv, mipLevel, jitter);
      if (media.extinction > minExtinction) {
        extinctionSum += media.extinction;
        maxOpticalDepth += media.extinction * stepSize;
        transmittanceIntegral *= exp(-media.extinction * stepSize);
        weightedDistanceSum += rayDistance * transmittanceIntegral;
        transmittanceSum += transmittanceIntegral;
        ++sampleCount;
      }
    }

    if (transmittanceIntegral <= minTransmittance) {
      // A large amount of optical depth accumulates in the tail, beyond the
      // point of minimum transmittance. The expected optical depth seems to
      // decrease exponentially with the number of samples taken before reaching
      // the minimum transmittance.
      // See the discussion here: https://x.com/shotamatsuda/status/1886259549931520437
      maxOpticalDepthTail = min(
        opticalDepthTailScale * stepSize * exp(float(1 - sampleCount)),
        stepSize * 0.5 // Excessive optical depth only introduces aliasing.
      );
      break; // Early termination
    }
    rayDistance += stepSize;
  }

  if (sampleCount == 0) {
    return vec4(maxRayDistance, 0.0, 0.0, 0.0);
  }
  float frontDepth = min(weightedDistanceSum / transmittanceSum, maxRayDistance);
  float meanExtinction = extinctionSum / float(sampleCount);
  return vec4(frontDepth, meanExtinction, maxOpticalDepth, maxOpticalDepthTail);
}

void getRayNearFar(
  const vec3 sunPosition,
  const vec3 rayDirection,
  out float rayNear,
  out float rayFar
) {
  vec4 firstIntersections = raySphereFirstIntersection(
    sunPosition,
    rayDirection,
    vec3(0.0),
    bottomRadius + vec4(shadowTopHeight, shadowBottomHeight, 0.0, 0.0)
  );
  rayNear = max(0.0, firstIntersections.x);
  rayFar = firstIntersections.y;
  if (rayFar < 0.0) {
    rayFar = 1e6;
  }
}

void cascade(
  const int cascadeIndex,
  const float mipLevel,
  out vec4 outputColor,
  out vec3 outputDepthVelocity
) {
  vec2 clip = vUv * 2.0 - 1.0;
  vec4 point = inverseShadowMatrices[cascadeIndex] * vec4(clip.xy, -1.0, 1.0);
  point /= point.w;
  vec3 sunPosition = mat3(inverseEllipsoidMatrix) * point.xyz - vEllipsoidCenter;

  // The sun direction is in ECEF. Since the view matrix is constructed with the
  // ellipsoid matrix already applied, there's no need to apply the inverse
  // matrix here.
  vec3 rayDirection = normalize(-sunDirection);
  float rayNear;
  float rayFar;
  getRayNearFar(sunPosition, rayDirection, rayNear, rayFar);

  vec3 rayOrigin = rayNear * rayDirection + sunPosition;
  float stbn = getSTBN();
  vec4 color = marchClouds(rayOrigin, rayDirection, rayFar - rayNear, stbn, mipLevel);
  outputColor = color;

  // Velocity for temporal resolution.
  #ifdef TEMPORAL_PASS
  vec3 frontPosition = color.x * rayDirection + rayOrigin;
  vec3 frontPositionWorld = mat3(ellipsoidMatrix) * (frontPosition + vEllipsoidCenter);
  vec4 prevClip = reprojectionMatrices[cascadeIndex] * vec4(frontPositionWorld, 1.0);
  prevClip /= prevClip.w;
  vec2 prevUv = prevClip.xy * 0.5 + 0.5;
  vec2 velocity = (vUv - prevUv) * resolution;
  outputDepthVelocity = vec3(color.x, velocity);
  #else // TEMPORAL_PASS
  outputDepthVelocity = vec3(0.0);
  #endif // TEMPORAL_PASS
}

// TODO: Calculate from the main camera frustum perhaps?
const float mipLevels[4] = float[4](0.0, 0.5, 1.0, 2.0);

void main() {
  #pragma unroll_loop_start
  for (int i = 0; i < 4; ++i) {
    #if UNROLLED_LOOP_INDEX < CASCADE_COUNT
    cascade(UNROLLED_LOOP_INDEX, mipLevels[i], outputColor[i], outputDepthVelocity[i]);
    #endif // UNROLLED_LOOP_INDEX < CASCADE_COUNT
  }
  #pragma unroll_loop_end
}
`;

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/shaders/shadow.vert
var shadow_default2 = "precision highp float;\n\nuniform vec3 ellipsoidCenter;\nuniform vec3 altitudeCorrection;\n\nlayout(location = 0) in vec3 position;\n\nout vec2 vUv;\nout vec3 vEllipsoidCenter;\n\nvoid main() {\n  vUv = position.xy * 0.5 + 0.5;\n  vEllipsoidCenter = ellipsoidCenter + altitudeCorrection;\n\n  gl_Position = vec4(position.xy, 1.0, 1.0);\n}\n";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/shaders/structuredSampling.glsl
var structuredSampling_default = "// Implements Structured Volume Sampling in fragment shader:\n// https://github.com/huwb/volsample\n// Implementation reference:\n// https://www.shadertoy.com/view/ttVfDc\n\nvoid getIcosahedralVertices(const vec3 direction, out vec3 v1, out vec3 v2, out vec3 v3) {\n  // Normalization scalers to fit dodecahedron to unit sphere.\n  const float a = 0.85065080835204; // phi / sqrt(2 + phi)\n  const float b = 0.5257311121191336; // 1 / sqrt(2 + phi)\n\n  // Derive the vertices of icosahedron where triangle intersects the direction.\n  // See: https://www.ppsloan.org/publications/AmbientDice.pdf\n  const float kT = 0.6180339887498948; // 1 / phi\n  const float kT2 = 0.38196601125010515; // 1 / phi^2\n  vec3 absD = abs(direction);\n  float selector1 = dot(absD, vec3(1.0, kT2, -kT));\n  float selector2 = dot(absD, vec3(-kT, 1.0, kT2));\n  float selector3 = dot(absD, vec3(kT2, -kT, 1.0));\n  v1 = selector1 > 0.0 ? vec3(a, b, 0.0) : vec3(-b, 0.0, a);\n  v2 = selector2 > 0.0 ? vec3(0.0, a, b) : vec3(a, -b, 0.0);\n  v3 = selector3 > 0.0 ? vec3(b, 0.0, a) : vec3(0.0, a, -b);\n  vec3 octantSign = sign(direction);\n  v1 *= octantSign;\n  v2 *= octantSign;\n  v3 *= octantSign;\n}\n\nvoid swapIfBigger(inout vec4 a, inout vec4 b) {\n  if (a.w > b.w) {\n    vec4 t = a;\n    a = b;\n    b = t;\n  }\n}\n\nvoid sortVertices(inout vec3 a, inout vec3 b, inout vec3 c) {\n  const vec3 base = vec3(0.5, 0.5, 1.0);\n  vec4 aw = vec4(a, dot(a, base));\n  vec4 bw = vec4(b, dot(b, base));\n  vec4 cw = vec4(c, dot(c, base));\n  swapIfBigger(aw, bw);\n  swapIfBigger(bw, cw);\n  swapIfBigger(aw, bw);\n  a = aw.xyz;\n  b = bw.xyz;\n  c = cw.xyz;\n}\n\nvec3 getPentagonalWeights(const vec3 direction, const vec3 v1, const vec3 v2, const vec3 v3) {\n  float d1 = dot(v1, direction);\n  float d2 = dot(v2, direction);\n  float d3 = dot(v3, direction);\n  vec3 w = exp(vec3(d1, d2, d3) * 40.0);\n  return w / (w.x + w.y + w.z);\n}\n\nvec3 getStructureNormal(\n  const vec3 direction,\n  const float jitter,\n  out vec3 a,\n  out vec3 b,\n  out vec3 c,\n  out vec3 weights\n) {\n  getIcosahedralVertices(direction, a, b, c);\n  sortVertices(a, b, c);\n  weights = getPentagonalWeights(direction, a, b, c);\n  return jitter < weights.x\n    ? a\n    : jitter < weights.x + weights.y\n      ? b\n      : c;\n}\n\nvec3 getStructureNormal(const vec3 direction, const float jitter) {\n  vec3 a, b, c, weights;\n  return getStructureNormal(direction, jitter, a, b, c, weights);\n}\n\n// Reference: https://github.com/huwb/volsample/blob/master/src/unity/Assets/Shaders/RayMarchCore.cginc\nvoid intersectStructuredPlanes(\n  const vec3 normal,\n  const vec3 rayOrigin,\n  const vec3 rayDirection,\n  const float samplePeriod,\n  out float stepOffset,\n  out float stepSize\n) {\n  float NoD = dot(rayDirection, normal);\n  stepSize = samplePeriod / abs(NoD);\n\n  // Skips leftover bit to get from rayOrigin to first strata plane.\n  stepOffset = -mod(dot(rayOrigin, normal), samplePeriod) / NoD;\n\n  // mod() gives different results depending on if the arg is negative or\n  // positive. This line makes it consistent, and ensures the first sample is in\n  // front of the viewer.\n  if (stepOffset < 0.0) {\n    stepOffset += stepSize;\n  }\n}\n";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/shaders/types.glsl
var types_default = "struct GroundIrradiance {\n  vec3 sun;\n  vec3 sky;\n};\n\nstruct CloudsIrradiance {\n  vec3 minSun;\n  vec3 minSky;\n  vec3 maxSun;\n  vec3 maxSky;\n};\n\nstruct DensityProfile {\n  vec4 expTerms;\n  vec4 exponents;\n  vec4 linearTerms;\n  vec4 constantTerms;\n};\n";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/ShadowMaterial.ts
var _turbulence_dec, _shapeDetail_dec, _temporalJitter_dec, _temporalPass_dec, _cascadeCount_dec, _localWeatherChannels_dec, _a, _init;
var ShadowMaterial = class extends (_a = RawShaderMaterial, _localWeatherChannels_dec = [defineExpression("LOCAL_WEATHER_CHANNELS", {
  validate: (value) => /^[rgba]{4}$/.test(value)
})], _cascadeCount_dec = [defineInt("CASCADE_COUNT", { min: 1, max: 4 })], _temporalPass_dec = [define("TEMPORAL_PASS")], _temporalJitter_dec = [define("TEMPORAL_JITTER")], _shapeDetail_dec = [define("SHAPE_DETAIL")], _turbulence_dec = [define("TURBULENCE")], _a) {
  constructor({
    parameterUniforms,
    layerUniforms,
    atmosphereUniforms
  }) {
    super({
      name: "ShadowMaterial",
      glslVersion: GLSL3,
      vertexShader: shadow_default2,
      fragmentShader: unrollLoops(
        resolveIncludes(shadow_default, {
          core: {
            math,
            raySphereIntersection
          },
          types: types_default,
          parameters: parameters_default,
          structuredSampling: structuredSampling_default,
          clouds: clouds_default
        })
      ),
      uniforms: {
        ...parameterUniforms,
        ...layerUniforms,
        ...atmosphereUniforms,
        inverseShadowMatrices: new Uniform(
          Array.from({ length: 4 }, () => new Matrix43())
          // Populate the max number of elements
        ),
        reprojectionMatrices: new Uniform(
          Array.from({ length: 4 }, () => new Matrix43())
          // Populate the max number of elements
        ),
        resolution: new Uniform(new Vector23()),
        frame: new Uniform(0),
        stbnTexture: new Uniform(null),
        // Primary raymarch
        maxIterationCount: new Uniform(defaults.shadow.maxIterationCount),
        minStepSize: new Uniform(defaults.shadow.minStepSize),
        maxStepSize: new Uniform(defaults.shadow.maxStepSize),
        minDensity: new Uniform(defaults.shadow.minDensity),
        minExtinction: new Uniform(defaults.shadow.minExtinction),
        minTransmittance: new Uniform(defaults.shadow.minTransmittance),
        opticalDepthTailScale: new Uniform(2)
      },
      defines: {
        SHADOW: "1",
        TEMPORAL_PASS: "1",
        TEMPORAL_JITTER: "1"
      }
    });
    __publicField(this, "localWeatherChannels", __runInitializers(_init, 8, this, "rgba")), __runInitializers(_init, 11, this);
    __publicField(this, "cascadeCount", __runInitializers(_init, 12, this, defaults.shadow.cascadeCount)), __runInitializers(_init, 15, this);
    __publicField(this, "temporalPass", __runInitializers(_init, 16, this, true)), __runInitializers(_init, 19, this);
    __publicField(this, "temporalJitter", __runInitializers(_init, 20, this, true)), __runInitializers(_init, 23, this);
    __publicField(this, "shapeDetail", __runInitializers(_init, 24, this, defaults.shapeDetail)), __runInitializers(_init, 27, this);
    __publicField(this, "turbulence", __runInitializers(_init, 28, this, defaults.turbulence)), __runInitializers(_init, 31, this);
    this.cascadeCount = defaults.shadow.cascadeCount;
  }
  setSize(width, height) {
    this.uniforms.resolution.value.set(width, height);
  }
};
_init = __decoratorStart(_a);
__decorateElement(_init, 5, "localWeatherChannels", _localWeatherChannels_dec, ShadowMaterial);
__decorateElement(_init, 5, "cascadeCount", _cascadeCount_dec, ShadowMaterial);
__decorateElement(_init, 5, "temporalPass", _temporalPass_dec, ShadowMaterial);
__decorateElement(_init, 5, "temporalJitter", _temporalJitter_dec, ShadowMaterial);
__decorateElement(_init, 5, "shapeDetail", _shapeDetail_dec, ShadowMaterial);
__decorateElement(_init, 5, "turbulence", _turbulence_dec, ShadowMaterial);
__decoratorMetadata(_init, ShadowMaterial);

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/ShadowResolveMaterial.ts
import {
  GLSL3 as GLSL32,
  RawShaderMaterial as RawShaderMaterial2,
  Uniform as Uniform2,
  Vector2 as Vector24
} from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/shaders/shadowResolve.frag
var shadowResolve_default = 'precision highp float;\nprecision highp sampler2DArray;\n\n#define VARIANCE_9_SAMPLES (1)\n#define VARIANCE_SAMPLER_ARRAY (1)\n\n#include "varianceClipping"\n\nuniform sampler2DArray inputBuffer;\nuniform sampler2DArray historyBuffer;\n\nuniform vec2 texelSize;\nuniform float varianceGamma;\nuniform float temporalAlpha;\n\nin vec2 vUv;\n\nlayout(location = 0) out vec4 outputColor[CASCADE_COUNT];\n\nconst ivec2 neighborOffsets[9] = ivec2[9](\n  ivec2(-1, -1),\n  ivec2(-1, 0),\n  ivec2(-1, 1),\n  ivec2(0, -1),\n  ivec2(0, 0),\n  ivec2(0, 1),\n  ivec2(1, -1),\n  ivec2(1, 0),\n  ivec2(1, 1)\n);\n\nvec4 getClosestFragment(const ivec3 coord) {\n  vec4 result = vec4(1e7, 0.0, 0.0, 0.0);\n  vec4 neighbor;\n  #pragma unroll_loop_start\n  for (int i = 0; i < 9; ++i) {\n    neighbor = texelFetchOffset(\n      inputBuffer,\n      coord + ivec3(0, 0, CASCADE_COUNT),\n      0,\n      neighborOffsets[i]\n    );\n    if (neighbor.r < result.r) {\n      result = neighbor;\n    }\n  }\n  #pragma unroll_loop_end\n  return result;\n}\n\nvoid cascade(const int cascadeIndex, out vec4 outputColor) {\n  ivec3 coord = ivec3(gl_FragCoord.xy, cascadeIndex);\n  vec4 current = texelFetch(inputBuffer, coord, 0);\n\n  vec4 depthVelocity = getClosestFragment(coord);\n  vec2 velocity = depthVelocity.gb * texelSize;\n  vec2 prevUv = vUv - velocity;\n  if (prevUv.x < 0.0 || prevUv.x > 1.0 || prevUv.y < 0.0 || prevUv.y > 1.0) {\n    outputColor = current;\n    return; // Rejection\n  }\n\n  vec4 history = texture(historyBuffer, vec3(prevUv, float(cascadeIndex)));\n  vec4 clippedHistory = varianceClipping(inputBuffer, coord, current, history, varianceGamma);\n  outputColor = mix(clippedHistory, current, temporalAlpha);\n}\n\nvoid main() {\n  #pragma unroll_loop_start\n  for (int i = 0; i < 4; ++i) {\n    #if UNROLLED_LOOP_INDEX < CASCADE_COUNT\n    cascade(UNROLLED_LOOP_INDEX, outputColor[i]);\n    #endif // UNROLLED_LOOP_INDEX < CASCADE_COUNT\n  }\n  #pragma unroll_loop_end\n}\n';

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/shaders/shadowResolve.vert
var shadowResolve_default2 = "precision highp float;\n\nlayout(location = 0) in vec3 position;\n\nout vec2 vUv;\n\nvoid main() {\n  vUv = position.xy * 0.5 + 0.5;\n  gl_Position = vec4(position.xy, 1.0, 1.0);\n}\n";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/shaders/varianceClipping.glsl
var varianceClipping_default = "#ifdef VARIANCE_9_SAMPLES\n#define VARIANCE_OFFSET_COUNT (8)\nconst ivec2 varianceOffsets[8] = ivec2[8](\n  ivec2(-1, -1),\n  ivec2(-1, 1),\n  ivec2(1, -1),\n  ivec2(1, 1),\n  ivec2(1, 0),\n  ivec2(0, -1),\n  ivec2(0, 1),\n  ivec2(-1, 0)\n);\n#else // VARIANCE_9_SAMPLES\n#define VARIANCE_OFFSET_COUNT (4)\nconst ivec2 varianceOffsets[4] = ivec2[4](ivec2(1, 0), ivec2(0, -1), ivec2(0, 1), ivec2(-1, 0));\n#endif // VARIANCE_9_SAMPLES\n\n// Reference: https://github.com/playdeadgames/temporal\nvec4 clipAABB(const vec4 current, const vec4 history, const vec4 minColor, const vec4 maxColor) {\n  vec3 pClip = 0.5 * (maxColor.rgb + minColor.rgb);\n  vec3 eClip = 0.5 * (maxColor.rgb - minColor.rgb) + 1e-7;\n  vec4 vClip = history - vec4(pClip, current.a);\n  vec3 vUnit = vClip.xyz / eClip;\n  vec3 aUnit = abs(vUnit);\n  float maUnit = max(aUnit.x, max(aUnit.y, aUnit.z));\n  if (maUnit > 1.0) {\n    return vec4(pClip, current.a) + vClip / maUnit;\n  }\n  return history;\n}\n\n#ifdef VARIANCE_SAMPLER_ARRAY\n#define VARIANCE_SAMPLER sampler2DArray\n#define VARIANCE_SAMPLER_COORD ivec3\n#else // VARIANCE_SAMPLER_ARRAY\n#define VARIANCE_SAMPLER sampler2D\n#define VARIANCE_SAMPLER_COORD ivec2\n#endif // VARIANCE_SAMPLER_ARRAY\n\n// Variance clipping\n// Reference: https://developer.download.nvidia.com/gameworks/events/GDC2016/msalvi_temporal_supersampling.pdf\nvec4 varianceClipping(\n  const VARIANCE_SAMPLER inputBuffer,\n  const VARIANCE_SAMPLER_COORD coord,\n  const vec4 current,\n  const vec4 history,\n  const float gamma\n) {\n  vec4 moment1 = current;\n  vec4 moment2 = current * current;\n  vec4 neighbor;\n  #pragma unroll_loop_start\n  for (int i = 0; i < 8; ++i) {\n    #if UNROLLED_LOOP_INDEX < VARIANCE_OFFSET_COUNT\n    neighbor = texelFetchOffset(inputBuffer, coord, 0, varianceOffsets[i]);\n    moment1 += neighbor;\n    moment2 += neighbor * neighbor;\n    #endif // UNROLLED_LOOP_INDEX < VARIANCE_OFFSET_COUNT\n  }\n  #pragma unroll_loop_end\n\n  const float N = float(VARIANCE_OFFSET_COUNT + 1);\n  vec4 mean = moment1 / N;\n  vec4 varianceGamma = sqrt(max(moment2 / N - mean * mean, 0.0)) * gamma;\n  vec4 minColor = mean - varianceGamma;\n  vec4 maxColor = mean + varianceGamma;\n  return clipAABB(clamp(mean, minColor, maxColor), history, minColor, maxColor);\n}\n\nvec4 varianceClipping(\n  const VARIANCE_SAMPLER inputBuffer,\n  const VARIANCE_SAMPLER_COORD coord,\n  const vec4 current,\n  const vec4 history\n) {\n  return varianceClipping(inputBuffer, coord, current, history, 1.0);\n}\n\nvec4 varianceClipping(\n  const sampler2D inputBuffer,\n  const vec2 coord,\n  const vec4 current,\n  const vec4 history,\n  const float gamma\n) {\n  vec4 moment1 = current;\n  vec4 moment2 = current * current;\n  vec4 neighbor;\n  #pragma unroll_loop_start\n  for (int i = 0; i < 8; ++i) {\n    #if UNROLLED_LOOP_INDEX < VARIANCE_OFFSET_COUNT\n    neighbor = textureOffset(inputBuffer, coord, varianceOffsets[i]);\n    moment1 += neighbor;\n    moment2 += neighbor * neighbor;\n    #endif // UNROLLED_LOOP_INDEX < VARIANCE_OFFSET_COUNT\n  }\n  #pragma unroll_loop_end\n\n  const float N = float(VARIANCE_OFFSET_COUNT + 1);\n  vec4 mean = moment1 / N;\n  vec4 varianceGamma = sqrt(max(moment2 / N - mean * mean, 0.0)) * gamma;\n  vec4 minColor = mean - varianceGamma;\n  vec4 maxColor = mean + varianceGamma;\n  return clipAABB(clamp(mean, minColor, maxColor), history, minColor, maxColor);\n}\n\nvec4 varianceClipping(\n  const sampler2D inputBuffer,\n  const vec2 coord,\n  const vec4 current,\n  const vec4 history\n) {\n  return varianceClipping(inputBuffer, coord, current, history, 1.0);\n}\n";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/ShadowResolveMaterial.ts
var _cascadeCount_dec2, _a2, _init2;
var ShadowResolveMaterial = class extends (_a2 = RawShaderMaterial2, _cascadeCount_dec2 = [defineInt("CASCADE_COUNT", { min: 1, max: 4 })], _a2) {
  constructor({
    inputBuffer = null,
    historyBuffer = null
  } = {}) {
    super({
      name: "ShadowResolveMaterial",
      glslVersion: GLSL32,
      vertexShader: shadowResolve_default2,
      fragmentShader: unrollLoops(
        resolveIncludes(shadowResolve_default, {
          varianceClipping: varianceClipping_default
        })
      ),
      uniforms: {
        inputBuffer: new Uniform2(inputBuffer),
        historyBuffer: new Uniform2(historyBuffer),
        texelSize: new Uniform2(new Vector24()),
        varianceGamma: new Uniform2(1),
        // Use a very slow alpha because a single flickering pixel can be highly
        // noticeable in shadow maps. This value can be increased if temporal
        // jitter is turned off in the shadows rendering, but it will suffer
        // from spatial aliasing.
        temporalAlpha: new Uniform2(0.01)
      },
      defines: {}
    });
    __publicField(this, "cascadeCount", __runInitializers(_init2, 8, this, defaults.shadow.cascadeCount)), __runInitializers(_init2, 11, this);
  }
  setSize(width, height) {
    this.uniforms.texelSize.value.set(1 / width, 1 / height);
  }
};
_init2 = __decoratorStart(_a2);
__decorateElement(_init2, 5, "cascadeCount", _cascadeCount_dec2, ShadowResolveMaterial);
__decoratorMetadata(_init2, ShadowResolveMaterial);

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/ShadowPass.ts
function createRenderTarget(name) {
  const renderTarget = new WebGLArrayRenderTarget(1, 1, 1, {
    depthBuffer: false,
    stencilBuffer: false
  });
  renderTarget.texture.type = HalfFloatType2;
  renderTarget.texture.minFilter = LinearFilter2;
  renderTarget.texture.magFilter = LinearFilter2;
  renderTarget.texture.name = name;
  return renderTarget;
}
var ShadowPass = class extends PassBase {
  constructor({
    parameterUniforms,
    layerUniforms,
    atmosphereUniforms,
    ...options
  }) {
    super("ShadowPass", options);
    __publicField(this, "currentRenderTarget");
    __publicField(this, "currentMaterial");
    __publicField(this, "currentPass");
    __publicField(this, "resolveRenderTarget");
    __publicField(this, "resolveMaterial");
    __publicField(this, "resolvePass");
    __publicField(this, "historyRenderTarget");
    __publicField(this, "width", 0);
    __publicField(this, "height", 0);
    this.currentMaterial = new ShadowMaterial({
      parameterUniforms,
      layerUniforms,
      atmosphereUniforms
    });
    this.currentPass = new ShaderArrayPass(this.currentMaterial);
    this.resolveMaterial = new ShadowResolveMaterial();
    this.resolvePass = new ShaderArrayPass(this.resolveMaterial);
    this.initRenderTargets();
  }
  initialize(renderer, alpha, frameBufferType) {
    this.currentPass.initialize(renderer, alpha, frameBufferType);
    this.resolvePass.initialize(renderer, alpha, frameBufferType);
  }
  initRenderTargets() {
    this.currentRenderTarget?.dispose();
    this.resolveRenderTarget?.dispose();
    this.historyRenderTarget?.dispose();
    const current = createRenderTarget("Shadow");
    const resolve = this.temporalPass ? createRenderTarget("Shadow.A") : null;
    const history = this.temporalPass ? createRenderTarget("Shadow.B") : null;
    this.currentRenderTarget = current;
    this.resolveRenderTarget = resolve;
    this.historyRenderTarget = history;
    const resolveUniforms = this.resolveMaterial.uniforms;
    resolveUniforms.inputBuffer.value = current.texture;
    resolveUniforms.historyBuffer.value = history?.texture ?? null;
  }
  copyShadow() {
    const shadow = this.shadow;
    const currentUniforms = this.currentMaterial.uniforms;
    for (let i = 0; i < shadow.cascadeCount; ++i) {
      const cascade = shadow.cascades[i];
      currentUniforms.inverseShadowMatrices.value[i].copy(cascade.inverseMatrix);
    }
  }
  copyReprojection() {
    const shadow = this.shadow;
    const uniforms = this.currentMaterial.uniforms;
    for (let i = 0; i < shadow.cascadeCount; ++i) {
      const cascade = shadow.cascades[i];
      uniforms.reprojectionMatrices.value[i].copy(cascade.matrix);
    }
  }
  swapBuffers() {
    invariant(this.historyRenderTarget != null);
    invariant(this.resolveRenderTarget != null);
    const nextResolve = this.historyRenderTarget;
    const nextHistory = this.resolveRenderTarget;
    this.resolveRenderTarget = nextResolve;
    this.historyRenderTarget = nextHistory;
    this.resolveMaterial.uniforms.historyBuffer.value = nextHistory.texture;
  }
  update(renderer, frame, deltaTime) {
    this.currentMaterial.uniforms.frame.value = frame;
    this.copyShadow();
    this.currentPass.render(renderer, null, this.currentRenderTarget);
    if (this.temporalPass) {
      invariant(this.resolveRenderTarget != null);
      this.resolvePass.render(renderer, null, this.resolveRenderTarget);
      this.copyReprojection();
      this.swapBuffers();
    }
  }
  setSize(width, height, depth = this.shadow.cascadeCount) {
    this.width = width;
    this.height = height;
    this.currentMaterial.cascadeCount = depth;
    this.resolveMaterial.cascadeCount = depth;
    this.currentMaterial.setSize(width, height);
    this.resolveMaterial.setSize(width, height);
    this.currentRenderTarget.setSize(
      width,
      height,
      this.temporalPass ? depth * 2 : depth
      // For depth velocity
    );
    this.resolveRenderTarget?.setSize(width, height, depth);
    this.historyRenderTarget?.setSize(width, height, depth);
  }
  get outputBuffer() {
    if (this.temporalPass) {
      invariant(this.historyRenderTarget != null);
      return this.historyRenderTarget.texture;
    }
    return this.currentRenderTarget.texture;
  }
  get temporalPass() {
    return this.currentMaterial.temporalPass;
  }
  set temporalPass(value) {
    if (value !== this.temporalPass) {
      this.currentMaterial.temporalPass = value;
      this.initRenderTargets();
      this.setSize(this.width, this.height);
    }
  }
};
export {
  ShadowPass
};
