var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import {
  HalfFloatType,
  LinearFilter,
  WebGLArrayRenderTarget
} from "three";
import invariant from "../vendor/tiny-invariant.js";
import { PassBase } from "./PassBase";
import { ShaderArrayPass } from "./ShaderArrayPass";
import { ShadowMaterial } from "./ShadowMaterial";
import { ShadowResolveMaterial } from "./ShadowResolveMaterial";
function createRenderTarget(name) {
  const renderTarget = new WebGLArrayRenderTarget(1, 1, 1, {
    depthBuffer: false,
    stencilBuffer: false
  });
  renderTarget.texture.type = HalfFloatType;
  renderTarget.texture.minFilter = LinearFilter;
  renderTarget.texture.magFilter = LinearFilter;
  renderTarget.texture.name = name;
  return renderTarget;
}
class ShadowPass extends PassBase {
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
}
export {
  ShadowPass
};
