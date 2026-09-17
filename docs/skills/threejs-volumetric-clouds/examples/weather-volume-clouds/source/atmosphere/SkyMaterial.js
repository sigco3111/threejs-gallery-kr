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
var _moon_dec, _sun_dec, _a, _init;
import {
  Color,
  GLSL3,
  Matrix4,
  Uniform,
  Vector3
} from "three";
import { define, resolveIncludes } from "../geospatial/index.js";
import { raySphereIntersection } from "../geospatial/shaders/index.js";
import {
  AtmosphereMaterialBase,
  atmosphereMaterialParametersBaseDefaults
} from "./AtmosphereMaterialBase";
import functions from "./shaders/functions.glsl?raw";
import parameters from "./shaders/parameters.glsl?raw";
import fragmentShader from "./shaders/sky.frag?raw";
import sky from "./shaders/sky.glsl?raw";
import vertexShader from "./shaders/sky.vert?raw";
const skyMaterialParametersDefaults = {
  ...atmosphereMaterialParametersBaseDefaults,
  sun: true,
  moon: true,
  moonAngularRadius: 45e-4,
  // ≈ 15.5 arcminutes
  lunarRadianceScale: 1,
  groundAlbedo: new Color(0)
};
class SkyMaterial extends (_a = AtmosphereMaterialBase, _sun_dec = [define("SUN")], _moon_dec = [define("MOON")], _a) {
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
      vertexShader: resolveIncludes(vertexShader, {
        parameters
      }),
      fragmentShader: resolveIncludes(fragmentShader, {
        core: { raySphereIntersection },
        parameters,
        functions,
        sky
      }),
      ...others,
      uniforms: {
        inverseProjectionMatrix: new Uniform(new Matrix4()),
        inverseViewMatrix: new Uniform(new Matrix4()),
        moonDirection: new Uniform(moonDirection?.clone() ?? new Vector3()),
        moonAngularRadius: new Uniform(moonAngularRadius),
        lunarRadianceScale: new Uniform(lunarRadianceScale),
        groundAlbedo: new Uniform(groundAlbedo?.clone() ?? new Color(0)),
        shadowLengthBuffer: new Uniform(null),
        ...others.uniforms
      },
      defines: {
        PERSPECTIVE_CAMERA: "1"
      },
      depthTest: true
    });
    __publicField(this, "shadowLength", null);
    __publicField(this, "sun", __runInitializers(_init, 8, this)), __runInitializers(_init, 11, this);
    __publicField(this, "moon", __runInitializers(_init, 12, this)), __runInitializers(_init, 15, this);
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
}
_init = __decoratorStart(_a);
__decorateElement(_init, 5, "sun", _sun_dec, SkyMaterial);
__decorateElement(_init, 5, "moon", _moon_dec, SkyMaterial);
__decoratorMetadata(_init, SkyMaterial);
export {
  SkyMaterial,
  skyMaterialParametersDefaults
};
