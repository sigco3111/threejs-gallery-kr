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
var _skipRendering_dec, _a, _init;
import { Effect, EffectAttribute, Resolution } from "postprocessing";
import {
  Camera,
  Data3DTexture,
  EventDispatcher,
  Matrix4,
  Texture,
  Uniform,
  Vector2,
  Vector3
} from "three";
import {
  AtmosphereParameters,
  getAltitudeCorrectionOffset
} from "../atmosphere/index.js";
import {
  define,
  definePropertyShorthand,
  defineUniformShorthand,
  lerp
} from "../geospatial/index.js";
import { CascadedShadowMaps } from "./CascadedShadowMaps";
import { CloudLayers } from "./CloudLayers";
import { CloudsPass } from "./CloudsPass";
import { defaults, qualityPresets } from "./qualityPresets";
import { ShadowPass } from "./ShadowPass";
import {
  createAtmosphereUniforms,
  createCloudLayerUniforms,
  createCloudParameterUniforms,
  updateCloudLayerUniforms
} from "./uniforms";
import fragmentShader from "./shaders/cloudsEffect.frag?raw";
const vector3Scratch = /* @__PURE__ */ new Vector3();
const vector2Scratch = /* @__PURE__ */ new Vector2();
const cloudsUniformKeys = [
  "maxIterationCount",
  "minStepSize",
  "maxStepSize",
  "maxRayDistance",
  "perspectiveStepScale",
  "minDensity",
  "minExtinction",
  "minTransmittance",
  "maxIterationCountToSun",
  "maxIterationCountToGround",
  "minSecondaryStepSize",
  "secondaryStepScale",
  "maxShadowFilterRadius",
  "maxShadowLengthIterationCount",
  "minShadowLengthStepSize",
  "maxShadowLengthRayDistance",
  "hazeDensityScale",
  "hazeExponent",
  "hazeScatteringCoefficient",
  "hazeAbsorptionCoefficient"
];
const cloudsMaterialParameterKeys = [
  "multiScatteringOctaves",
  "accurateSunSkyIrradiance",
  "accuratePhaseFunction"
];
const shadowUniformKeys = [
  "maxIterationCount",
  "minStepSize",
  "maxStepSize",
  "minDensity",
  "minExtinction",
  "minTransmittance",
  "opticalDepthTailScale"
];
const shadowMaterialParameterKeys = [
  "temporalJitter"
];
const shadowPassParameterKeys = [
  "temporalPass"
];
const shadowMapsParameterKeys = [
  "cascadeCount",
  "mapSize",
  "maxFar",
  "farScale",
  "splitMode",
  "splitLambda"
];
const changeEvent = {
  type: "change"
};
const cloudsPassOptionsDefaults = {
  resolutionScale: defaults.resolutionScale,
  width: Resolution.AUTO_SIZE,
  height: Resolution.AUTO_SIZE
};
class CloudsEffect extends (_a = Effect, _skipRendering_dec = [define("SKIP_RENDERING")], _a) {
  constructor(camera = new Camera(), options, atmosphere = AtmosphereParameters.DEFAULT) {
    super("CloudsEffect", fragmentShader, {
      attributes: EffectAttribute.DEPTH,
      uniforms: /* @__PURE__ */ new Map([["cloudsBuffer", new Uniform(null)]])
    });
    this.camera = camera;
    this.atmosphere = atmosphere;
    __publicField(this, "cloudLayers", CloudLayers.DEFAULT.clone());
    __publicField(this, "correctAltitude", true);
    // Mutable instances of cloud parameter uniforms
    __publicField(this, "localWeatherRepeat", new Vector2().setScalar(100));
    __publicField(this, "localWeatherOffset", new Vector2());
    __publicField(this, "shapeRepeat", new Vector3().setScalar(3e-4));
    __publicField(this, "shapeOffset", new Vector3());
    __publicField(this, "shapeDetailRepeat", new Vector3().setScalar(6e-3));
    __publicField(this, "shapeDetailOffset", new Vector3());
    __publicField(this, "turbulenceRepeat", new Vector2().setScalar(20));
    // Mutable instances of atmosphere parameter uniforms
    __publicField(this, "ellipsoidCenter", new Vector3());
    __publicField(this, "ellipsoidMatrix", new Matrix4());
    __publicField(this, "inverseEllipsoidMatrix", new Matrix4());
    __publicField(this, "altitudeCorrection", new Vector3());
    __publicField(this, "sunDirection", new Vector3());
    // Uniforms shared by both cloud and shadow materials
    __publicField(this, "parameterUniforms");
    __publicField(this, "layerUniforms");
    __publicField(this, "atmosphereUniforms");
    __publicField(this, "localWeatherVelocity", new Vector2());
    __publicField(this, "shapeVelocity", new Vector3());
    __publicField(this, "shapeDetailVelocity", new Vector3());
    // Weather and shape procedural textures
    __publicField(this, "proceduralLocalWeather");
    __publicField(this, "proceduralShape");
    __publicField(this, "proceduralShapeDetail");
    __publicField(this, "proceduralTurbulence");
    __publicField(this, "shadowMaps");
    __publicField(this, "shadowPass");
    __publicField(this, "cloudsPass");
    __publicField(this, "clouds");
    __publicField(this, "shadow");
    __publicField(this, "_atmosphereOverlay", null);
    __publicField(this, "_atmosphereShadow", null);
    __publicField(this, "_atmosphereShadowLength", null);
    __publicField(this, "resolution");
    __publicField(this, "events", new EventDispatcher());
    __publicField(this, "frame", 0);
    __publicField(this, "shadowCascadeCount", 0);
    __publicField(this, "shadowMapSize", new Vector2());
    __publicField(this, "onResolutionChange", () => {
      this.setSize(this.resolution.baseWidth, this.resolution.baseHeight);
    });
    __publicField(this, "skipRendering", __runInitializers(_init, 8, this, true)), __runInitializers(_init, 11, this);
    const {
      resolutionScale,
      width,
      height,
      resolutionX = width,
      resolutionY = height
    } = {
      ...cloudsPassOptionsDefaults,
      ...options
    };
    this.shadowMaps = new CascadedShadowMaps({
      cascadeCount: defaults.shadow.cascadeCount,
      mapSize: defaults.shadow.mapSize,
      splitLambda: 0.6
    });
    this.parameterUniforms = createCloudParameterUniforms({
      localWeatherTexture: this.proceduralLocalWeather?.texture ?? null,
      localWeatherRepeat: this.localWeatherRepeat,
      localWeatherOffset: this.localWeatherOffset,
      shapeTexture: this.proceduralShape?.texture ?? null,
      shapeRepeat: this.shapeRepeat,
      shapeOffset: this.shapeOffset,
      shapeDetailTexture: this.proceduralShapeDetail?.texture ?? null,
      shapeDetailRepeat: this.shapeDetailRepeat,
      shapeDetailOffset: this.shapeDetailOffset,
      turbulenceTexture: this.proceduralTurbulence?.texture ?? null,
      turbulenceRepeat: this.turbulenceRepeat
    });
    this.layerUniforms = createCloudLayerUniforms();
    this.atmosphereUniforms = createAtmosphereUniforms(atmosphere, {
      ellipsoidCenter: this.ellipsoidCenter,
      ellipsoidMatrix: this.ellipsoidMatrix,
      inverseEllipsoidMatrix: this.inverseEllipsoidMatrix,
      altitudeCorrection: this.altitudeCorrection,
      sunDirection: this.sunDirection
    });
    const passOptions = {
      shadow: this.shadowMaps,
      parameterUniforms: this.parameterUniforms,
      layerUniforms: this.layerUniforms,
      atmosphereUniforms: this.atmosphereUniforms
    };
    this.shadowPass = new ShadowPass(passOptions);
    this.shadowPass.mainCamera = camera;
    this.cloudsPass = new CloudsPass(passOptions, atmosphere);
    this.cloudsPass.mainCamera = camera;
    this.clouds = definePropertyShorthand(
      defineUniformShorthand(
        {},
        this.cloudsPass.currentMaterial,
        cloudsUniformKeys
      ),
      this.cloudsPass.currentMaterial,
      cloudsMaterialParameterKeys
    );
    this.shadow = definePropertyShorthand(
      defineUniformShorthand(
        {},
        this.shadowPass.currentMaterial,
        shadowUniformKeys
      ),
      this.shadowPass.currentMaterial,
      shadowMaterialParameterKeys,
      this.shadowPass,
      shadowPassParameterKeys,
      this.shadowMaps,
      shadowMapsParameterKeys
    );
    this.resolution = new Resolution(
      this,
      resolutionX,
      resolutionY,
      resolutionScale
    );
    this.resolution.addEventListener("change", this.onResolutionChange);
  }
  get mainCamera() {
    return this.camera;
  }
  set mainCamera(value) {
    this.camera = value;
    this.shadowPass.mainCamera = value;
    this.cloudsPass.mainCamera = value;
  }
  initialize(renderer, alpha, frameBufferType) {
    this.shadowPass.initialize(renderer, alpha, frameBufferType);
    this.cloudsPass.initialize(renderer, alpha, frameBufferType);
  }
  updateSharedUniforms(deltaTime) {
    updateCloudLayerUniforms(this.layerUniforms, this.cloudLayers);
    const { parameterUniforms } = this;
    parameterUniforms.localWeatherOffset.value.add(
      vector2Scratch.copy(this.localWeatherVelocity).multiplyScalar(deltaTime)
    );
    parameterUniforms.shapeOffset.value.add(
      vector3Scratch.copy(this.shapeVelocity).multiplyScalar(deltaTime)
    );
    parameterUniforms.shapeDetailOffset.value.add(
      vector3Scratch.copy(this.shapeDetailVelocity).multiplyScalar(deltaTime)
    );
    const inverseEllipsoidMatrix = this.inverseEllipsoidMatrix.copy(this.ellipsoidMatrix).invert();
    const cameraPositionECEF = this.camera.getWorldPosition(vector3Scratch).applyMatrix4(inverseEllipsoidMatrix).sub(this.ellipsoidCenter);
    const altitudeCorrection = this.altitudeCorrection;
    if (this.correctAltitude) {
      getAltitudeCorrectionOffset(
        cameraPositionECEF,
        this.atmosphere.bottomRadius,
        this.ellipsoid,
        altitudeCorrection,
        false
      );
    } else {
      altitudeCorrection.setScalar(0);
    }
    const surfaceNormal = this.ellipsoid.getSurfaceNormal(
      cameraPositionECEF,
      vector3Scratch
    );
    const zenithAngle = this.sunDirection.dot(surfaceNormal);
    const distance = lerp(1e6, 1e3, zenithAngle);
    this.shadowMaps.update(
      this.camera,
      // The sun direction must be rotated with the ellipsoid to ensure the
      // frusta are constructed correctly. Note this affects the transformation
      // in the shadow shader.
      vector3Scratch.copy(this.sunDirection).applyMatrix4(this.ellipsoidMatrix),
      distance
    );
  }
  updateWeatherTextureChannels() {
    const value = this.cloudLayers.localWeatherChannels;
    this.cloudsPass.currentMaterial.localWeatherChannels = value;
    this.shadowPass.currentMaterial.localWeatherChannels = value;
  }
  updateAtmosphereComposition() {
    const { shadowMaps, shadowPass, cloudsPass } = this;
    const shadowUniforms = shadowPass.currentMaterial.uniforms;
    const cloudsUniforms = cloudsPass.currentMaterial.uniforms;
    const prevOverlay = this._atmosphereOverlay;
    const nextOverlay = Object.assign(this._atmosphereOverlay ?? {}, {
      map: cloudsPass.outputBuffer
    });
    if (prevOverlay !== nextOverlay) {
      this._atmosphereOverlay = nextOverlay;
      changeEvent.target = this;
      changeEvent.property = "atmosphereOverlay";
      this.events.dispatchEvent(changeEvent);
    }
    const prevShadow = this._atmosphereShadow;
    const nextShadow = Object.assign(this._atmosphereShadow ?? {}, {
      map: shadowPass.outputBuffer,
      mapSize: shadowMaps.mapSize,
      cascadeCount: shadowMaps.cascadeCount,
      intervals: cloudsUniforms.shadowIntervals.value,
      matrices: cloudsUniforms.shadowMatrices.value,
      inverseMatrices: shadowUniforms.inverseShadowMatrices.value,
      far: shadowMaps.far,
      topHeight: cloudsUniforms.shadowTopHeight.value
    });
    if (prevShadow !== nextShadow) {
      this._atmosphereShadow = nextShadow;
      changeEvent.target = this;
      changeEvent.property = "atmosphereShadow";
      this.events.dispatchEvent(changeEvent);
    }
    const prevShadowLength = this._atmosphereShadowLength;
    const nextShadowLength = cloudsPass.shadowLengthBuffer != null ? Object.assign(this._atmosphereShadowLength ?? {}, {
      map: cloudsPass.shadowLengthBuffer
    }) : null;
    if (prevShadowLength !== nextShadowLength) {
      this._atmosphereShadowLength = nextShadowLength;
      changeEvent.target = this;
      changeEvent.property = "atmosphereShadowLength";
      this.events.dispatchEvent(changeEvent);
    }
  }
  update(renderer, inputBuffer, deltaTime = 0) {
    const { shadowMaps, shadowPass, cloudsPass } = this;
    if (shadowMaps.cascadeCount !== this.shadowCascadeCount || !shadowMaps.mapSize.equals(this.shadowMapSize)) {
      const { width, height } = shadowMaps.mapSize;
      const depth = shadowMaps.cascadeCount;
      this.shadowMapSize.set(width, height);
      this.shadowCascadeCount = depth;
      shadowPass.setSize(width, height, depth);
      cloudsPass.setShadowSize(width, height, depth);
    }
    this.proceduralLocalWeather?.render(renderer, deltaTime);
    this.proceduralShape?.render(renderer, deltaTime);
    this.proceduralShapeDetail?.render(renderer, deltaTime);
    this.proceduralTurbulence?.render(renderer, deltaTime);
    ++this.frame;
    this.updateSharedUniforms(deltaTime);
    this.updateWeatherTextureChannels();
    shadowPass.update(renderer, this.frame, deltaTime);
    cloudsPass.shadowBuffer = shadowPass.outputBuffer;
    cloudsPass.update(renderer, this.frame, deltaTime);
    this.updateAtmosphereComposition();
    this.uniforms.get("cloudsBuffer").value = this.cloudsPass.outputBuffer;
  }
  setSize(baseWidth, baseHeight) {
    const { resolution } = this;
    resolution.setBaseSize(baseWidth, baseHeight);
    const { width, height } = resolution;
    this.cloudsPass.setSize(width, height);
  }
  setDepthTexture(depthTexture, depthPacking) {
    this.shadowPass.setDepthTexture(depthTexture, depthPacking);
    this.cloudsPass.setDepthTexture(depthTexture, depthPacking);
  }
  // eslint-disable-next-line accessor-pairs
  set qualityPreset(value) {
    const { clouds, shadow, ...props } = qualityPresets[value];
    Object.assign(this, props);
    Object.assign(this.clouds, clouds);
    Object.assign(this.shadow, shadow);
  }
  // Textures
  get localWeatherTexture() {
    return this.proceduralLocalWeather ?? this.parameterUniforms.localWeatherTexture.value;
  }
  set localWeatherTexture(value) {
    if (value instanceof Texture || value == null) {
      this.proceduralLocalWeather = void 0;
      this.parameterUniforms.localWeatherTexture.value = value;
    } else {
      this.proceduralLocalWeather = value;
      this.parameterUniforms.localWeatherTexture.value = value.texture;
    }
  }
  get shapeTexture() {
    return this.proceduralShape ?? this.parameterUniforms.shapeTexture.value;
  }
  set shapeTexture(value) {
    if (value instanceof Data3DTexture || value == null) {
      this.proceduralShape = void 0;
      this.parameterUniforms.shapeTexture.value = value;
    } else {
      this.proceduralShape = value;
      this.parameterUniforms.shapeTexture.value = value.texture;
    }
  }
  get shapeDetailTexture() {
    return this.proceduralShapeDetail ?? this.parameterUniforms.shapeDetailTexture.value;
  }
  set shapeDetailTexture(value) {
    if (value instanceof Data3DTexture || value == null) {
      this.proceduralShapeDetail = void 0;
      this.parameterUniforms.shapeDetailTexture.value = value;
    } else {
      this.proceduralShapeDetail = value;
      this.parameterUniforms.shapeDetailTexture.value = value.texture;
    }
  }
  get turbulenceTexture() {
    return this.proceduralTurbulence ?? this.parameterUniforms.turbulenceTexture.value;
  }
  set turbulenceTexture(value) {
    if (value instanceof Texture || value == null) {
      this.proceduralTurbulence = void 0;
      this.parameterUniforms.turbulenceTexture.value = value;
    } else {
      this.proceduralTurbulence = value;
      this.parameterUniforms.turbulenceTexture.value = value.texture;
    }
  }
  get stbnTexture() {
    return this.cloudsPass.currentMaterial.uniforms.stbnTexture.value;
  }
  set stbnTexture(value) {
    this.cloudsPass.currentMaterial.uniforms.stbnTexture.value = value;
    this.shadowPass.currentMaterial.uniforms.stbnTexture.value = value;
  }
  // Rendering controls
  get resolutionScale() {
    return this.resolution.scale;
  }
  set resolutionScale(value) {
    this.resolution.scale = value;
  }
  get temporalUpscale() {
    return this.cloudsPass.temporalUpscale;
  }
  set temporalUpscale(value) {
    this.cloudsPass.temporalUpscale = value;
  }
  get lightShafts() {
    return this.cloudsPass.lightShafts;
  }
  set lightShafts(value) {
    this.cloudsPass.lightShafts = value;
  }
  get shapeDetail() {
    return this.cloudsPass.currentMaterial.shapeDetail;
  }
  set shapeDetail(value) {
    this.cloudsPass.currentMaterial.shapeDetail = value;
    this.shadowPass.currentMaterial.shapeDetail = value;
  }
  get turbulence() {
    return this.cloudsPass.currentMaterial.turbulence;
  }
  set turbulence(value) {
    this.cloudsPass.currentMaterial.turbulence = value;
    this.shadowPass.currentMaterial.turbulence = value;
  }
  get haze() {
    return this.cloudsPass.currentMaterial.haze;
  }
  set haze(value) {
    this.cloudsPass.currentMaterial.haze = value;
  }
  // Cloud parameter primitives
  get scatteringCoefficient() {
    return this.parameterUniforms.scatteringCoefficient.value;
  }
  set scatteringCoefficient(value) {
    this.parameterUniforms.scatteringCoefficient.value = value;
  }
  get absorptionCoefficient() {
    return this.parameterUniforms.absorptionCoefficient.value;
  }
  set absorptionCoefficient(value) {
    this.parameterUniforms.absorptionCoefficient.value = value;
  }
  get coverage() {
    return this.parameterUniforms.coverage.value;
  }
  set coverage(value) {
    this.parameterUniforms.coverage.value = value;
  }
  get turbulenceDisplacement() {
    return this.parameterUniforms.turbulenceDisplacement.value;
  }
  set turbulenceDisplacement(value) {
    this.parameterUniforms.turbulenceDisplacement.value = value;
  }
  // Scattering parameters
  get scatterAnisotropy1() {
    return this.cloudsPass.currentMaterial.scatterAnisotropy1;
  }
  set scatterAnisotropy1(value) {
    this.cloudsPass.currentMaterial.scatterAnisotropy1 = value;
  }
  get scatterAnisotropy2() {
    return this.cloudsPass.currentMaterial.scatterAnisotropy2;
  }
  set scatterAnisotropy2(value) {
    this.cloudsPass.currentMaterial.scatterAnisotropy2 = value;
  }
  get scatterAnisotropyMix() {
    return this.cloudsPass.currentMaterial.scatterAnisotropyMix;
  }
  set scatterAnisotropyMix(value) {
    this.cloudsPass.currentMaterial.scatterAnisotropyMix = value;
  }
  get skyIrradianceScale() {
    return this.cloudsPass.currentMaterial.uniforms.skyIrradianceScale.value;
  }
  set skyIrradianceScale(value) {
    this.cloudsPass.currentMaterial.uniforms.skyIrradianceScale.value = value;
  }
  get groundIrradianceScale() {
    return this.cloudsPass.currentMaterial.uniforms.groundIrradianceScale.value;
  }
  set groundIrradianceScale(value) {
    this.cloudsPass.currentMaterial.uniforms.groundIrradianceScale.value = value;
  }
  get powderScale() {
    return this.cloudsPass.currentMaterial.uniforms.powderScale.value;
  }
  set powderScale(value) {
    this.cloudsPass.currentMaterial.uniforms.powderScale.value = value;
  }
  get powderExponent() {
    return this.cloudsPass.currentMaterial.uniforms.powderExponent.value;
  }
  set powderExponent(value) {
    this.cloudsPass.currentMaterial.uniforms.powderExponent.value = value;
  }
  // Atmosphere composition
  get atmosphereOverlay() {
    return this._atmosphereOverlay;
  }
  get atmosphereShadow() {
    return this._atmosphereShadow;
  }
  get atmosphereShadowLength() {
    return this._atmosphereShadowLength;
  }
  // Atmosphere parameters
  get irradianceTexture() {
    return this.cloudsPass.currentMaterial.irradianceTexture;
  }
  set irradianceTexture(value) {
    this.cloudsPass.currentMaterial.irradianceTexture = value;
  }
  get scatteringTexture() {
    return this.cloudsPass.currentMaterial.scatteringTexture;
  }
  set scatteringTexture(value) {
    this.cloudsPass.currentMaterial.scatteringTexture = value;
  }
  get transmittanceTexture() {
    return this.cloudsPass.currentMaterial.transmittanceTexture;
  }
  set transmittanceTexture(value) {
    this.cloudsPass.currentMaterial.transmittanceTexture = value;
  }
  get ellipsoid() {
    return this.cloudsPass.currentMaterial.ellipsoid;
  }
  set ellipsoid(value) {
    this.cloudsPass.currentMaterial.ellipsoid = value;
  }
  get photometric() {
    return this.cloudsPass.currentMaterial.photometric;
  }
  set photometric(value) {
    this.cloudsPass.currentMaterial.photometric = value;
  }
  get sunAngularRadius() {
    return this.cloudsPass.currentMaterial.sunAngularRadius;
  }
  set sunAngularRadius(value) {
    this.cloudsPass.currentMaterial.sunAngularRadius = value;
  }
}
_init = __decoratorStart(_a);
__decorateElement(_init, 5, "skipRendering", _skipRendering_dec, CloudsEffect);
__decoratorMetadata(_init, CloudsEffect);
export {
  CloudsEffect,
  cloudsPassOptionsDefaults
};
