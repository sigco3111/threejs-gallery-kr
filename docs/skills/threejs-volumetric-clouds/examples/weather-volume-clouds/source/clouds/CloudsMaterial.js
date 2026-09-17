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
var _scatterAnisotropyMix_dec, _scatterAnisotropy2_dec, _scatterAnisotropy1_dec, _shadowSampleCount_dec, _shadowCascadeCount_dec, _accuratePhaseFunction_dec, _accurateSunSkyIrradiance_dec, _multiScatteringOctaves_dec, _haze_dec, _shadowLength_dec, _turbulence_dec, _shapeDetail_dec, _localWeatherChannels_dec, _depthPacking_dec, _a, _init;
import {
  GLSL3,
  Matrix4,
  Uniform,
  Vector2,
  Vector3,
  Vector4
} from "three";
import {
  AtmosphereMaterialBase,
  AtmosphereParameters
} from "../atmosphere/index.js";
import {
  parameters as atmosphereParameters,
  functions
} from "../atmosphere/shaders/index.js";
import {
  assertType,
  define,
  defineExpression,
  defineFloat,
  defineInt,
  Geodetic,
  resolveIncludes,
  unrollLoops
} from "../geospatial/index.js";
import {
  cascadedShadowMaps,
  depth,
  generators,
  interleavedGradientNoise,
  math,
  raySphereIntersection,
  turbo,
  vogelDisk
} from "../geospatial/shaders/index.js";
import { bayerOffsets } from "./bayer";
import { defaults } from "./qualityPresets";
import fragmentShader from "./shaders/clouds.frag?raw";
import clouds from "./shaders/clouds.glsl?raw";
import vertexShader from "./shaders/clouds.vert?raw";
import parameters from "./shaders/parameters.glsl?raw";
import types from "./shaders/types.glsl?raw";
const vectorScratch = /* @__PURE__ */ new Vector3();
const geodeticScratch = /* @__PURE__ */ new Geodetic();
class CloudsMaterial extends (_a = AtmosphereMaterialBase, _depthPacking_dec = [defineInt("DEPTH_PACKING")], _localWeatherChannels_dec = [defineExpression("LOCAL_WEATHER_CHANNELS", {
  validate: (value) => /^[rgba]{4}$/.test(value)
})], _shapeDetail_dec = [define("SHAPE_DETAIL")], _turbulence_dec = [define("TURBULENCE")], _shadowLength_dec = [define("SHADOW_LENGTH")], _haze_dec = [define("HAZE")], _multiScatteringOctaves_dec = [defineInt("MULTI_SCATTERING_OCTAVES", { min: 1, max: 12 })], _accurateSunSkyIrradiance_dec = [define("ACCURATE_SUN_SKY_IRRADIANCE")], _accuratePhaseFunction_dec = [define("ACCURATE_PHASE_FUNCTION")], _shadowCascadeCount_dec = [defineInt("SHADOW_CASCADE_COUNT", { min: 1, max: 4 })], _shadowSampleCount_dec = [defineInt("SHADOW_SAMPLE_COUNT", { min: 1, max: 16 })], _scatterAnisotropy1_dec = [defineFloat("SCATTER_ANISOTROPY_1")], _scatterAnisotropy2_dec = [defineFloat("SCATTER_ANISOTROPY_2")], _scatterAnisotropyMix_dec = [defineFloat("SCATTER_ANISOTROPY_MIX")], _a) {
  constructor({
    parameterUniforms,
    layerUniforms,
    atmosphereUniforms
  }, atmosphere = AtmosphereParameters.DEFAULT) {
    super(
      {
        name: "CloudsMaterial",
        glslVersion: GLSL3,
        vertexShader: resolveIncludes(vertexShader, {
          atmosphere: {
            parameters: atmosphereParameters,
            functions
          },
          types
        }),
        fragmentShader: unrollLoops(
          resolveIncludes(fragmentShader, {
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
              parameters: atmosphereParameters,
              functions
            },
            types,
            parameters,
            clouds
          })
        ),
        // prettier-ignore
        uniforms: {
          ...parameterUniforms,
          ...layerUniforms,
          ...atmosphereUniforms,
          depthBuffer: new Uniform(null),
          viewMatrix: new Uniform(new Matrix4()),
          inverseProjectionMatrix: new Uniform(new Matrix4()),
          inverseViewMatrix: new Uniform(new Matrix4()),
          reprojectionMatrix: new Uniform(new Matrix4()),
          resolution: new Uniform(new Vector2()),
          cameraNear: new Uniform(0),
          cameraFar: new Uniform(0),
          cameraHeight: new Uniform(0),
          frame: new Uniform(0),
          temporalJitter: new Uniform(new Vector2()),
          targetUvScale: new Uniform(new Vector2()),
          mipLevelScale: new Uniform(1),
          stbnTexture: new Uniform(null),
          // Scattering
          skyIrradianceScale: new Uniform(1),
          groundIrradianceScale: new Uniform(1),
          powderScale: new Uniform(0.8),
          powderExponent: new Uniform(150),
          // Primary raymarch
          maxIterationCount: new Uniform(defaults.clouds.maxIterationCount),
          minStepSize: new Uniform(defaults.clouds.minStepSize),
          maxStepSize: new Uniform(defaults.clouds.maxStepSize),
          maxRayDistance: new Uniform(defaults.clouds.maxRayDistance),
          perspectiveStepScale: new Uniform(defaults.clouds.perspectiveStepScale),
          minDensity: new Uniform(defaults.clouds.minDensity),
          minExtinction: new Uniform(defaults.clouds.minExtinction),
          minTransmittance: new Uniform(defaults.clouds.minTransmittance),
          // Secondary raymarch
          maxIterationCountToSun: new Uniform(defaults.clouds.maxIterationCountToSun),
          maxIterationCountToGround: new Uniform(defaults.clouds.maxIterationCountToGround),
          minSecondaryStepSize: new Uniform(defaults.clouds.minSecondaryStepSize),
          secondaryStepScale: new Uniform(defaults.clouds.secondaryStepScale),
          // Beer shadow map
          shadowBuffer: new Uniform(null),
          shadowTexelSize: new Uniform(new Vector2()),
          shadowIntervals: new Uniform(
            Array.from({ length: 4 }, () => new Vector2())
            // Populate the max number of elements
          ),
          shadowMatrices: new Uniform(
            Array.from({ length: 4 }, () => new Matrix4())
            // Populate the max number of elements
          ),
          shadowFar: new Uniform(0),
          maxShadowFilterRadius: new Uniform(6),
          shadowLayerMask: new Uniform(new Vector4().setScalar(1)),
          // Disable mask
          // Shadow length
          maxShadowLengthIterationCount: new Uniform(defaults.clouds.maxShadowLengthIterationCount),
          minShadowLengthStepSize: new Uniform(defaults.clouds.minShadowLengthStepSize),
          maxShadowLengthRayDistance: new Uniform(defaults.clouds.maxShadowLengthRayDistance),
          // Haze
          hazeDensityScale: new Uniform(3e-5),
          hazeExponent: new Uniform(1e-3),
          hazeScatteringCoefficient: new Uniform(0.9),
          hazeAbsorptionCoefficient: new Uniform(0.5)
        }
      },
      atmosphere
    );
    __publicField(this, "temporalUpscale", true);
    __publicField(this, "previousProjectionMatrix");
    __publicField(this, "previousViewMatrix");
    __publicField(this, "depthPacking", __runInitializers(_init, 8, this, 0)), __runInitializers(_init, 11, this);
    __publicField(this, "localWeatherChannels", __runInitializers(_init, 12, this, "rgba")), __runInitializers(_init, 15, this);
    __publicField(this, "shapeDetail", __runInitializers(_init, 16, this, defaults.shapeDetail)), __runInitializers(_init, 19, this);
    __publicField(this, "turbulence", __runInitializers(_init, 20, this, defaults.turbulence)), __runInitializers(_init, 23, this);
    __publicField(this, "shadowLength", __runInitializers(_init, 24, this, defaults.lightShafts)), __runInitializers(_init, 27, this);
    __publicField(this, "haze", __runInitializers(_init, 28, this, defaults.haze)), __runInitializers(_init, 31, this);
    __publicField(this, "multiScatteringOctaves", __runInitializers(_init, 32, this, defaults.clouds.multiScatteringOctaves)), __runInitializers(_init, 35, this);
    __publicField(this, "accurateSunSkyIrradiance", __runInitializers(_init, 36, this, defaults.clouds.accurateSunSkyIrradiance)), __runInitializers(_init, 39, this);
    __publicField(this, "accuratePhaseFunction", __runInitializers(_init, 40, this, defaults.clouds.accuratePhaseFunction)), __runInitializers(_init, 43, this);
    __publicField(this, "shadowCascadeCount", __runInitializers(_init, 44, this, defaults.shadow.cascadeCount)), __runInitializers(_init, 47, this);
    __publicField(this, "shadowSampleCount", __runInitializers(_init, 48, this, 8)), __runInitializers(_init, 51, this);
    __publicField(this, "scatterAnisotropy1", __runInitializers(_init, 52, this, 0.7)), __runInitializers(_init, 55, this);
    __publicField(this, "scatterAnisotropy2", __runInitializers(_init, 56, this, -0.2)), __runInitializers(_init, 59, this);
    __publicField(this, "scatterAnisotropyMix", __runInitializers(_init, 60, this, 0.5)), __runInitializers(_init, 63, this);
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
    const cameraPositionECEF = vectorScratch.copy(cameraPosition).applyMatrix4(uniforms.inverseEllipsoidMatrix.value).sub(uniforms.ellipsoidCenter.value);
    try {
      uniforms.cameraHeight.value = geodeticScratch.setFromECEF(cameraPositionECEF).height;
    } catch (error) {
    }
  }
  // copyCameraSettings can be called multiple times within a frame. Only
  // reliable way is to explicitly store the matrices.
  copyReprojectionMatrix(camera) {
    this.previousProjectionMatrix ?? (this.previousProjectionMatrix = new Matrix4());
    this.previousViewMatrix ?? (this.previousViewMatrix = new Matrix4());
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
}
_init = __decoratorStart(_a);
__decorateElement(_init, 5, "depthPacking", _depthPacking_dec, CloudsMaterial);
__decorateElement(_init, 5, "localWeatherChannels", _localWeatherChannels_dec, CloudsMaterial);
__decorateElement(_init, 5, "shapeDetail", _shapeDetail_dec, CloudsMaterial);
__decorateElement(_init, 5, "turbulence", _turbulence_dec, CloudsMaterial);
__decorateElement(_init, 5, "shadowLength", _shadowLength_dec, CloudsMaterial);
__decorateElement(_init, 5, "haze", _haze_dec, CloudsMaterial);
__decorateElement(_init, 5, "multiScatteringOctaves", _multiScatteringOctaves_dec, CloudsMaterial);
__decorateElement(_init, 5, "accurateSunSkyIrradiance", _accurateSunSkyIrradiance_dec, CloudsMaterial);
__decorateElement(_init, 5, "accuratePhaseFunction", _accuratePhaseFunction_dec, CloudsMaterial);
__decorateElement(_init, 5, "shadowCascadeCount", _shadowCascadeCount_dec, CloudsMaterial);
__decorateElement(_init, 5, "shadowSampleCount", _shadowSampleCount_dec, CloudsMaterial);
__decorateElement(_init, 5, "scatterAnisotropy1", _scatterAnisotropy1_dec, CloudsMaterial);
__decorateElement(_init, 5, "scatterAnisotropy2", _scatterAnisotropy2_dec, CloudsMaterial);
__decorateElement(_init, 5, "scatterAnisotropyMix", _scatterAnisotropyMix_dec, CloudsMaterial);
__decoratorMetadata(_init, CloudsMaterial);
export {
  CloudsMaterial
};
