var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import {
  BlendFunction,
  Effect,
  EffectAttribute,
  KawaseBlurPass,
  KernelSize,
  MipmapBlurPass,
  Resolution,
  ShaderPass
} from "postprocessing";
import {
  HalfFloatType,
  Uniform,
  WebGLRenderTarget
} from "three";
import { DownsampleThresholdMaterial } from "./DownsampleThresholdMaterial";
import { LensFlareFeaturesMaterial } from "./LensFlareFeaturesMaterial";
import fragmentShader from "./shaders/lensFlareEffect.frag?raw";
const lensFlareEffectOptionsDefaults = {
  blendFunction: BlendFunction.NORMAL,
  resolutionScale: 0.5,
  width: Resolution.AUTO_SIZE,
  height: Resolution.AUTO_SIZE,
  intensity: 5e-3
};
class LensFlareEffect extends Effect {
  constructor(options) {
    const {
      blendFunction,
      resolutionScale,
      width,
      height,
      resolutionX = width,
      resolutionY = height,
      intensity
    } = {
      ...lensFlareEffectOptionsDefaults,
      ...options
    };
    super("LensFlareEffect", fragmentShader, {
      blendFunction,
      attributes: EffectAttribute.CONVOLUTION,
      uniforms: new Map(
        Object.entries({
          bloomBuffer: new Uniform(null),
          featuresBuffer: new Uniform(null),
          intensity: new Uniform(1)
        })
      )
    });
    __publicField(this, "resolution");
    __publicField(this, "renderTarget1");
    __publicField(this, "renderTarget2");
    __publicField(this, "thresholdMaterial");
    __publicField(this, "thresholdPass");
    __publicField(this, "blurPass");
    __publicField(this, "preBlurPass");
    __publicField(this, "featuresMaterial");
    __publicField(this, "featuresPass");
    __publicField(this, "onResolutionChange", () => {
      this.setSize(this.resolution.baseWidth, this.resolution.baseHeight);
    });
    this.renderTarget1 = new WebGLRenderTarget(1, 1, {
      depthBuffer: false,
      stencilBuffer: false,
      type: HalfFloatType
    });
    this.renderTarget1.texture.name = "LensFlare.Target1";
    this.renderTarget2 = new WebGLRenderTarget(1, 1, {
      depthBuffer: false,
      stencilBuffer: false,
      type: HalfFloatType
    });
    this.renderTarget2.texture.name = "LensFlare.Target2";
    this.thresholdMaterial = new DownsampleThresholdMaterial();
    this.thresholdPass = new ShaderPass(this.thresholdMaterial);
    this.blurPass = new MipmapBlurPass();
    this.blurPass.levels = 8;
    this.preBlurPass = new KawaseBlurPass({
      kernelSize: KernelSize.SMALL
    });
    this.featuresMaterial = new LensFlareFeaturesMaterial();
    this.featuresPass = new ShaderPass(this.featuresMaterial);
    this.uniforms.get("bloomBuffer").value = this.blurPass.texture;
    this.uniforms.get("featuresBuffer").value = this.renderTarget1.texture;
    this.resolution = new Resolution(
      this,
      resolutionX,
      resolutionY,
      resolutionScale
    );
    this.resolution.addEventListener("change", this.onResolutionChange);
    this.intensity = intensity;
  }
  initialize(renderer, alpha, frameBufferType) {
    this.thresholdPass.initialize(renderer, alpha, frameBufferType);
    this.blurPass.initialize(renderer, alpha, frameBufferType);
    this.preBlurPass.initialize(renderer, alpha, frameBufferType);
    this.featuresPass.initialize(renderer, alpha, frameBufferType);
  }
  update(renderer, inputBuffer, deltaTime) {
    this.thresholdPass.render(renderer, inputBuffer, this.renderTarget1);
    this.blurPass.render(renderer, this.renderTarget1, null);
    this.preBlurPass.render(renderer, this.renderTarget1, this.renderTarget2);
    this.featuresPass.render(renderer, this.renderTarget2, this.renderTarget1);
  }
  setSize(baseWidth, baseHeight) {
    const resolution = this.resolution;
    resolution.setBaseSize(baseWidth, baseHeight);
    const { width, height } = resolution;
    this.renderTarget1.setSize(width, height);
    this.renderTarget2.setSize(width, height);
    this.thresholdMaterial.setSize(width, height);
    this.blurPass.setSize(width, height);
    this.preBlurPass.setSize(width, height);
    this.featuresMaterial.setSize(width, height);
  }
  get intensity() {
    return this.uniforms.get("intensity").value;
  }
  set intensity(value) {
    this.uniforms.get("intensity").value = value;
  }
  get thresholdLevel() {
    return this.thresholdMaterial.thresholdLevel;
  }
  set thresholdLevel(value) {
    this.thresholdMaterial.thresholdLevel = value;
  }
  get thresholdRange() {
    return this.thresholdMaterial.thresholdRange;
  }
  set thresholdRange(value) {
    this.thresholdMaterial.thresholdRange = value;
  }
}
export {
  LensFlareEffect,
  lensFlareEffectOptionsDefaults
};
