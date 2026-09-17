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
var _turbulence_dec, _shapeDetail_dec, _temporalJitter_dec, _temporalPass_dec, _cascadeCount_dec, _localWeatherChannels_dec, _a, _init;
import {
  GLSL3,
  Matrix4,
  RawShaderMaterial,
  Uniform,
  Vector2
} from "three";
import {
  define,
  defineExpression,
  defineInt,
  resolveIncludes,
  unrollLoops
} from "../geospatial/index.js";
import { math, raySphereIntersection } from "../geospatial/shaders/index.js";
import { defaults } from "./qualityPresets";
import clouds from "./shaders/clouds.glsl?raw";
import parameters from "./shaders/parameters.glsl?raw";
import fragmentShader from "./shaders/shadow.frag?raw";
import vertexShader from "./shaders/shadow.vert?raw";
import structuredSampling from "./shaders/structuredSampling.glsl?raw";
import types from "./shaders/types.glsl?raw";
class ShadowMaterial extends (_a = RawShaderMaterial, _localWeatherChannels_dec = [defineExpression("LOCAL_WEATHER_CHANNELS", {
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
      vertexShader,
      fragmentShader: unrollLoops(
        resolveIncludes(fragmentShader, {
          core: {
            math,
            raySphereIntersection
          },
          types,
          parameters,
          structuredSampling,
          clouds
        })
      ),
      uniforms: {
        ...parameterUniforms,
        ...layerUniforms,
        ...atmosphereUniforms,
        inverseShadowMatrices: new Uniform(
          Array.from({ length: 4 }, () => new Matrix4())
          // Populate the max number of elements
        ),
        reprojectionMatrices: new Uniform(
          Array.from({ length: 4 }, () => new Matrix4())
          // Populate the max number of elements
        ),
        resolution: new Uniform(new Vector2()),
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
}
_init = __decoratorStart(_a);
__decorateElement(_init, 5, "localWeatherChannels", _localWeatherChannels_dec, ShadowMaterial);
__decorateElement(_init, 5, "cascadeCount", _cascadeCount_dec, ShadowMaterial);
__decorateElement(_init, 5, "temporalPass", _temporalPass_dec, ShadowMaterial);
__decorateElement(_init, 5, "temporalJitter", _temporalJitter_dec, ShadowMaterial);
__decorateElement(_init, 5, "shapeDetail", _shapeDetail_dec, ShadowMaterial);
__decorateElement(_init, 5, "turbulence", _turbulence_dec, ShadowMaterial);
__decoratorMetadata(_init, ShadowMaterial);
export {
  ShadowMaterial
};
