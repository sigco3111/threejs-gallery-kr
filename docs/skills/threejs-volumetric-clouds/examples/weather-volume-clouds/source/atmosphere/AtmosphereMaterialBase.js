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
var _photometric_dec, _a, _init;
import {
  Matrix4,
  RawShaderMaterial,
  Uniform,
  Vector3
} from "three";
import { define, Ellipsoid } from "../geospatial/index.js";
import { AtmosphereParameters } from "./AtmosphereParameters";
import {
  IRRADIANCE_TEXTURE_HEIGHT,
  IRRADIANCE_TEXTURE_WIDTH,
  METER_TO_LENGTH_UNIT,
  SCATTERING_TEXTURE_MU_S_SIZE,
  SCATTERING_TEXTURE_MU_SIZE,
  SCATTERING_TEXTURE_NU_SIZE,
  SCATTERING_TEXTURE_R_SIZE,
  TRANSMITTANCE_TEXTURE_HEIGHT,
  TRANSMITTANCE_TEXTURE_WIDTH
} from "./constants";
import { getAltitudeCorrectionOffset } from "./getAltitudeCorrectionOffset";
const vectorScratch = /* @__PURE__ */ new Vector3();
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
const atmosphereMaterialParametersBaseDefaults = {
  ellipsoid: Ellipsoid.WGS84,
  correctAltitude: true,
  photometric: true,
  renderTargetCount: 1
};
class AtmosphereMaterialBase extends (_a = RawShaderMaterial, _photometric_dec = [define("PHOTOMETRIC")], _a) {
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
        cameraPosition: new Uniform(new Vector3()),
        ellipsoidCenter: new Uniform(new Vector3()),
        inverseEllipsoidMatrix: new Uniform(new Matrix4()),
        altitudeCorrection: new Uniform(new Vector3()),
        sunDirection: new Uniform(sunDirection?.clone() ?? new Vector3()),
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
    __publicField(this, "ellipsoid");
    __publicField(this, "ellipsoidMatrix", new Matrix4());
    __publicField(this, "correctAltitude");
    __publicField(this, "_renderTargetCount");
    __publicField(this, "photometric", __runInitializers(_init, 8, this)), __runInitializers(_init, 11, this);
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
    const cameraPositionECEF = vectorScratch.copy(cameraPosition).applyMatrix4(inverseEllipsoidMatrix).sub(uniforms.ellipsoidCenter.value);
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
}
_init = __decoratorStart(_a);
__decorateElement(_init, 5, "photometric", _photometric_dec, AtmosphereMaterialBase);
__decoratorMetadata(_init, AtmosphereMaterialBase);
export {
  AtmosphereMaterialBase,
  atmosphereMaterialParametersBaseDefaults
};
