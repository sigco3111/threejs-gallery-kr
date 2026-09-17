var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { ShaderPass } from "postprocessing";
import {
  HalfFloatType,
  LinearFilter,
  RedFormat,
  WebGLRenderTarget
} from "three";
import { CloudsMaterial } from "./CloudsMaterial";
import { CloudsResolveMaterial } from "./CloudsResolveMaterial";
import { PassBase } from "./PassBase";
import { defaults } from "./qualityPresets";
function createRenderTarget(name, { depthVelocity, shadowLength }) {
  const renderTarget = new WebGLRenderTarget(1, 1, {
    depthBuffer: false,
    stencilBuffer: false,
    type: HalfFloatType
  });
  renderTarget.texture.minFilter = LinearFilter;
  renderTarget.texture.magFilter = LinearFilter;
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
    shadowLengthBuffer.format = RedFormat;
    renderTarget.shadowLength = shadowLengthBuffer;
    renderTarget.textures.push(shadowLengthBuffer);
  }
  return Object.assign(renderTarget, {
    depthVelocity: depthVelocityBuffer ?? null,
    shadowLength: shadowLengthBuffer ?? null
  });
}
class CloudsPass extends PassBase {
  constructor({
    parameterUniforms,
    layerUniforms,
    atmosphereUniforms,
    ...options
  }, atmosphere) {
    super("CloudsPass", options);
    this.atmosphere = atmosphere;
    __publicField(this, "currentRenderTarget");
    __publicField(this, "currentMaterial");
    __publicField(this, "currentPass");
    __publicField(this, "resolveRenderTarget");
    __publicField(this, "resolveMaterial");
    __publicField(this, "resolvePass");
    __publicField(this, "historyRenderTarget");
    __publicField(this, "width", 0);
    __publicField(this, "height", 0);
    this.currentMaterial = new CloudsMaterial(
      {
        parameterUniforms,
        layerUniforms,
        atmosphereUniforms
      },
      atmosphere
    );
    this.currentPass = new ShaderPass(this.currentMaterial);
    this.resolveMaterial = new CloudsResolveMaterial();
    this.resolvePass = new ShaderPass(this.resolveMaterial);
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
  setShadowSize(width, height, depth) {
    this.currentMaterial.shadowCascadeCount = depth;
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
}
export {
  CloudsPass
};
