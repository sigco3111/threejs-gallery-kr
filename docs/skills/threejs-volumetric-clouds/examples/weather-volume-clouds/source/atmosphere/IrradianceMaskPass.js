var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import {
  ClearPass,
  DepthCopyPass,
  DepthMaskMaterial,
  DepthTestStrategy,
  Pass,
  RenderPass,
  Selection,
  ShaderPass
} from "postprocessing";
import {
  BasicDepthPacking,
  Color,
  DepthTexture,
  LessEqualDepth,
  MeshBasicMaterial,
  RedFormat,
  RGBADepthPacking,
  Uniform,
  UnsignedIntType,
  WebGLRenderTarget
} from "three";
import { resolveIncludes } from "../geospatial/index.js";
import { depth } from "../geospatial/shaders/index.js";
import fragmentShader from "./shaders/irradianceMask.frag?raw";
class IrradianceMaskPass extends Pass {
  constructor(scene, camera) {
    super("IrradianceMaskPass");
    __publicField(this, "renderPass");
    __publicField(this, "depthTexture");
    __publicField(this, "renderTarget");
    __publicField(this, "depthCopyPass0");
    __publicField(this, "depthCopyPass1");
    __publicField(this, "clearPass");
    __publicField(this, "depthMaskMaterial");
    __publicField(this, "depthMaskPass");
    __publicField(this, "selection", new Selection());
    this.needsSwap = false;
    this.needsDepthTexture = true;
    this.renderPass = new RenderPass(scene, camera, new MeshBasicMaterial());
    this.renderPass.ignoreBackground = true;
    this.renderPass.skipShadowMapUpdate = true;
    this.renderPass.selection = this.selection;
    this.depthTexture = new DepthTexture(1, 1, UnsignedIntType);
    this.renderTarget = new WebGLRenderTarget(1, 1, {
      format: RedFormat,
      depthTexture: this.depthTexture
    });
    this.depthCopyPass0 = new DepthCopyPass({ depthPacking: RGBADepthPacking });
    this.depthCopyPass1 = new DepthCopyPass({ depthPacking: RGBADepthPacking });
    this.clearPass = new ClearPass(true, false, false);
    this.clearPass.overrideClearColor = new Color(16777215);
    this.clearPass.overrideClearAlpha = 1;
    const depthMaskMaterial = new DepthMaskMaterial();
    depthMaskMaterial.fragmentShader = resolveIncludes(fragmentShader, {
      core: { depth }
    });
    depthMaskMaterial.uniforms.inverted = new Uniform(false);
    depthMaskMaterial.copyCameraSettings(camera);
    depthMaskMaterial.depthBuffer0 = this.depthCopyPass0.texture;
    depthMaskMaterial.depthPacking0 = RGBADepthPacking;
    depthMaskMaterial.depthBuffer1 = this.depthCopyPass1.texture;
    depthMaskMaterial.depthPacking1 = RGBADepthPacking;
    depthMaskMaterial.depthMode = LessEqualDepth;
    depthMaskMaterial.maxDepthStrategy = DepthTestStrategy.DISCARD_MAX_DEPTH;
    this.depthMaskMaterial = depthMaskMaterial;
    this.depthMaskPass = new ShaderPass(depthMaskMaterial);
  }
  // eslint-disable-next-line accessor-pairs
  set mainScene(value) {
    this.renderPass.mainScene = value;
  }
  // eslint-disable-next-line accessor-pairs
  set mainCamera(value) {
    this.renderPass.mainCamera = value;
    this.depthMaskMaterial.copyCameraSettings(value);
  }
  initialize(renderer, alpha, frameBufferType) {
    this.renderPass.initialize(renderer, alpha, frameBufferType);
    this.clearPass.initialize(renderer, alpha, frameBufferType);
    this.depthMaskPass.initialize(renderer, alpha, frameBufferType);
  }
  setDepthTexture(depthTexture, depthPacking = BasicDepthPacking) {
    this.depthCopyPass0.setDepthTexture(depthTexture, depthPacking);
    this.depthCopyPass1.setDepthTexture(this.depthTexture, depthPacking);
  }
  render(renderer, inputBuffer, outputBuffer, deltaTime, stencilTest) {
    const autoClear = renderer.autoClear;
    renderer.autoClear = false;
    this.depthCopyPass0.render(renderer, null, null);
    this.renderPass.render(renderer, this.renderTarget, null);
    this.depthCopyPass1.render(renderer, null, null);
    this.clearPass.render(renderer, this.renderTarget, null);
    this.depthMaskPass.render(renderer, null, this.renderTarget);
    renderer.autoClear = autoClear;
  }
  setSize(width, height) {
    this.renderTarget.setSize(width, height);
    this.depthCopyPass0.setSize(width, height);
    this.depthCopyPass1.setSize(width, height);
  }
  get texture() {
    return this.renderTarget.texture;
  }
  get selectionLayer() {
    return this.selection.layer;
  }
  set selectionLayer(value) {
    this.selection.layer = value;
  }
  get inverted() {
    return this.depthMaskMaterial.uniforms.inverted.value;
  }
  set inverted(value) {
    this.depthMaskMaterial.uniforms.inverted.value = value;
  }
}
export {
  IrradianceMaskPass
};
