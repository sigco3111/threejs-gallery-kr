// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/effects/LensFlareEffect.ts
import {
  BlendFunction,
  Effect,
  EffectAttribute,
  KawaseBlurPass,
  KernelSize,
  MipmapBlurPass,
  Resolution,
  ShaderPass
} from "https://esm.sh/postprocessing@6.37.4?deps=three@0.185.1&external=three";
import {
  HalfFloatType,
  Uniform as Uniform3,
  WebGLRenderTarget
} from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/effects/DownsampleThresholdMaterial.ts
import {
  NoBlending,
  ShaderMaterial,
  Uniform,
  Vector2
} from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/effects/shaders/downsampleThreshold.frag
var downsampleThreshold_default = "#include <common>\n\nuniform sampler2D inputBuffer;\n\nuniform float thresholdLevel;\nuniform float thresholdRange;\n\nin vec2 vCenterUv1;\nin vec2 vCenterUv2;\nin vec2 vCenterUv3;\nin vec2 vCenterUv4;\nin vec2 vRowUv1;\nin vec2 vRowUv2;\nin vec2 vRowUv3;\nin vec2 vRowUv4;\nin vec2 vRowUv5;\nin vec2 vRowUv6;\nin vec2 vRowUv7;\nin vec2 vRowUv8;\nin vec2 vRowUv9;\n\nfloat clampToBorder(const vec2 uv) {\n  return float(uv.x >= 0.0 && uv.x <= 1.0 && uv.y >= 0.0 && uv.y <= 1.0);\n}\n\n// Reference: https://learnopengl.com/Guest-Articles/2022/Phys.-Based-Bloom\nvoid main() {\n  vec3 color = 0.125 * texture(inputBuffer, vec2(vRowUv5)).rgb;\n  vec4 weight =\n    0.03125 *\n    vec4(\n      clampToBorder(vRowUv1),\n      clampToBorder(vRowUv3),\n      clampToBorder(vRowUv7),\n      clampToBorder(vRowUv9)\n    );\n  color += weight.x * texture(inputBuffer, vec2(vRowUv1)).rgb;\n  color += weight.y * texture(inputBuffer, vec2(vRowUv3)).rgb;\n  color += weight.z * texture(inputBuffer, vec2(vRowUv7)).rgb;\n  color += weight.w * texture(inputBuffer, vec2(vRowUv9)).rgb;\n\n  weight =\n    0.0625 *\n    vec4(\n      clampToBorder(vRowUv2),\n      clampToBorder(vRowUv4),\n      clampToBorder(vRowUv6),\n      clampToBorder(vRowUv8)\n    );\n  color += weight.x * texture(inputBuffer, vec2(vRowUv2)).rgb;\n  color += weight.y * texture(inputBuffer, vec2(vRowUv4)).rgb;\n  color += weight.z * texture(inputBuffer, vec2(vRowUv6)).rgb;\n  color += weight.w * texture(inputBuffer, vec2(vRowUv8)).rgb;\n\n  weight =\n    0.125 *\n    vec4(\n      clampToBorder(vRowUv2),\n      clampToBorder(vRowUv4),\n      clampToBorder(vRowUv6),\n      clampToBorder(vRowUv8)\n    );\n  color += weight.x * texture(inputBuffer, vec2(vCenterUv1)).rgb;\n  color += weight.y * texture(inputBuffer, vec2(vCenterUv2)).rgb;\n  color += weight.z * texture(inputBuffer, vec2(vCenterUv3)).rgb;\n  color += weight.w * texture(inputBuffer, vec2(vCenterUv4)).rgb;\n\n  // WORKAROUND: Avoid screen flashes if the input buffer contains NaN texels.\n  // See: https://github.com/takram-design-engineering/three-geospatial/issues/7\n  if (any(isnan(color))) {\n    gl_FragColor = vec4(vec3(0.0), 1.0);\n    return;\n  }\n\n  float l = luminance(color);\n  float scale = saturate(smoothstep(thresholdLevel, thresholdLevel + thresholdRange, l));\n  gl_FragColor = vec4(color * scale, 1.0);\n}\n";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/effects/shaders/downsampleThreshold.vert
var downsampleThreshold_default2 = "uniform vec2 texelSize;\n\nout vec2 vCenterUv1;\nout vec2 vCenterUv2;\nout vec2 vCenterUv3;\nout vec2 vCenterUv4;\nout vec2 vRowUv1;\nout vec2 vRowUv2;\nout vec2 vRowUv3;\nout vec2 vRowUv4;\nout vec2 vRowUv5;\nout vec2 vRowUv6;\nout vec2 vRowUv7;\nout vec2 vRowUv8;\nout vec2 vRowUv9;\n\nvoid main() {\n  vec2 uv = position.xy * 0.5 + 0.5;\n  vCenterUv1 = uv + texelSize * vec2(-1.0, 1.0);\n  vCenterUv2 = uv + texelSize * vec2(1.0, 1.0);\n  vCenterUv3 = uv + texelSize * vec2(-1.0, -1.0);\n  vCenterUv4 = uv + texelSize * vec2(1.0, -1.0);\n  vRowUv1 = uv + texelSize * vec2(-2.0, 2.0);\n  vRowUv2 = uv + texelSize * vec2(0.0, 2.0);\n  vRowUv3 = uv + texelSize * vec2(2.0, 2.0);\n  vRowUv4 = uv + texelSize * vec2(-2.0, 0.0);\n  vRowUv5 = uv + texelSize;\n  vRowUv6 = uv + texelSize * vec2(2.0, 0.0);\n  vRowUv7 = uv + texelSize * vec2(-2.0, -2.0);\n  vRowUv8 = uv + texelSize * vec2(0.0, -2.0);\n  vRowUv9 = uv + texelSize * vec2(2.0, -2.0);\n\n  gl_Position = vec4(position.xy, 1.0, 1.0);\n}\n";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/effects/DownsampleThresholdMaterial.ts
var downsampleThresholdMaterialParametersDefaults = {
  thresholdLevel: 10,
  thresholdRange: 1
};
var DownsampleThresholdMaterial = class extends ShaderMaterial {
  constructor(params) {
    const {
      inputBuffer = null,
      thresholdLevel,
      thresholdRange,
      ...others
    } = {
      ...downsampleThresholdMaterialParametersDefaults,
      ...params
    };
    super({
      name: "DownsampleThresholdMaterial",
      fragmentShader: downsampleThreshold_default,
      vertexShader: downsampleThreshold_default2,
      blending: NoBlending,
      toneMapped: false,
      depthWrite: false,
      depthTest: false,
      ...others,
      uniforms: {
        inputBuffer: new Uniform(inputBuffer),
        texelSize: new Uniform(new Vector2()),
        thresholdLevel: new Uniform(thresholdLevel),
        thresholdRange: new Uniform(thresholdRange),
        ...others.uniforms
      }
    });
  }
  setSize(width, height) {
    this.uniforms.texelSize.value.set(1 / width, 1 / height);
  }
  get inputBuffer() {
    return this.uniforms.inputBuffer.value;
  }
  set inputBuffer(value) {
    this.uniforms.inputBuffer.value = value;
  }
  get thresholdLevel() {
    return this.uniforms.thresholdLevel.value;
  }
  set thresholdLevel(value) {
    this.uniforms.thresholdLevel.value = value;
  }
  get thresholdRange() {
    return this.uniforms.thresholdRange.value;
  }
  set thresholdRange(value) {
    this.uniforms.thresholdRange.value = value;
  }
};

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/effects/LensFlareFeaturesMaterial.ts
import {
  NoBlending as NoBlending2,
  ShaderMaterial as ShaderMaterial2,
  Uniform as Uniform2,
  Vector2 as Vector22
} from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/effects/shaders/lensFlareFeatures.frag
var lensFlareFeatures_default = "#include <common>\n\n#define SQRT_2 (0.7071067811865476)\n\nuniform sampler2D inputBuffer;\n\nuniform vec2 texelSize;\nuniform float ghostAmount;\nuniform float haloAmount;\nuniform float chromaticAberration;\n\nin vec2 vUv;\nin vec2 vAspectRatio;\n\nvec3 sampleGhost(const vec2 direction, const vec3 color, const float offset) {\n  vec2 suv = clamp(1.0 - vUv + direction * offset, 0.0, 1.0);\n  vec3 result = texture(inputBuffer, suv).rgb * color;\n\n  // Falloff at the perimeter.\n  float d = clamp(length(0.5 - suv) / (0.5 * SQRT_2), 0.0, 1.0);\n  result *= pow(1.0 - d, 3.0);\n  return result;\n}\n\nvec4 sampleGhosts(float amount) {\n  vec3 color = vec3(0.0);\n  vec2 direction = vUv - 0.5;\n  color += sampleGhost(direction, vec3(0.8, 0.8, 1.0), -5.0);\n  color += sampleGhost(direction, vec3(1.0, 0.8, 0.4), -1.5);\n  color += sampleGhost(direction, vec3(0.9, 1.0, 0.8), -0.4);\n  color += sampleGhost(direction, vec3(1.0, 0.8, 0.4), -0.2);\n  color += sampleGhost(direction, vec3(0.9, 0.7, 0.7), -0.1);\n  color += sampleGhost(direction, vec3(0.5, 1.0, 0.4), 0.7);\n  color += sampleGhost(direction, vec3(0.5, 0.5, 0.5), 1.0);\n  color += sampleGhost(direction, vec3(1.0, 1.0, 0.6), 2.5);\n  color += sampleGhost(direction, vec3(0.5, 0.8, 1.0), 10.0);\n  return vec4(color * amount, 1.0);\n}\n\n// Reference: https://john-chapman.github.io/2017/11/05/pseudo-lens-flare.html\nfloat cubicRingMask(const float x, const float radius, const float thickness) {\n  float v = min(abs(x - radius) / thickness, 1.0);\n  return 1.0 - v * v * (3.0 - 2.0 * v);\n}\n\nvec3 sampleHalo(const float radius) {\n  vec2 direction = normalize((vUv - 0.5) / vAspectRatio) * vAspectRatio;\n  vec3 offset = vec3(texelSize.x * chromaticAberration) * vec3(-1.0, 0.0, 1.0);\n  vec2 suv = fract(1.0 - vUv + direction * radius);\n  vec3 result = vec3(\n    texture(inputBuffer, suv + direction * offset.r).r,\n    texture(inputBuffer, suv + direction * offset.g).g,\n    texture(inputBuffer, suv + direction * offset.b).b\n  );\n\n  // Falloff at the center and perimeter.\n  vec2 wuv = (vUv - vec2(0.5, 0.0)) / vAspectRatio + vec2(0.5, 0.0);\n  float d = saturate(distance(wuv, vec2(0.5)));\n  result *= cubicRingMask(d, 0.45, 0.25);\n  return result;\n}\n\nvec4 sampleHalos(const float amount) {\n  vec3 color = vec3(0.0);\n  color += sampleHalo(0.3);\n  return vec4(color, 1.0) * amount;\n}\n\nvoid main() {\n  gl_FragColor += sampleGhosts(ghostAmount);\n  gl_FragColor += sampleHalos(haloAmount);\n}\n\n";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/effects/shaders/lensFlareFeatures.vert
var lensFlareFeatures_default2 = "uniform vec2 texelSize;\n\nout vec2 vUv;\nout vec2 vAspectRatio;\n\nvoid main() {\n  vUv = position.xy * 0.5 + 0.5;\n  vAspectRatio = vec2(texelSize.x / texelSize.y, 1.0);\n  gl_Position = vec4(position.xy, 1.0, 1.0);\n}\n";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/effects/LensFlareFeaturesMaterial.ts
var lensFlareFeaturesMaterialParametersDefaults = {
  ghostAmount: 1e-3,
  haloAmount: 1e-3,
  chromaticAberration: 10
};
var LensFlareFeaturesMaterial = class extends ShaderMaterial2 {
  constructor(params) {
    const {
      inputBuffer = null,
      ghostAmount,
      haloAmount,
      chromaticAberration,
      ...others
    } = {
      ...lensFlareFeaturesMaterialParametersDefaults,
      ...params
    };
    super({
      name: "LensFlareFeaturesMaterial",
      fragmentShader: lensFlareFeatures_default,
      vertexShader: lensFlareFeatures_default2,
      blending: NoBlending2,
      toneMapped: false,
      depthWrite: false,
      depthTest: false,
      uniforms: {
        inputBuffer: new Uniform2(inputBuffer),
        texelSize: new Uniform2(new Vector22()),
        ghostAmount: new Uniform2(ghostAmount),
        haloAmount: new Uniform2(haloAmount),
        chromaticAberration: new Uniform2(chromaticAberration),
        ...others.uniforms
      }
    });
  }
  setSize(width, height) {
    this.uniforms.texelSize.value.set(1 / width, 1 / height);
  }
  get inputBuffer() {
    return this.uniforms.inputBuffer.value;
  }
  set inputBuffer(value) {
    this.uniforms.inputBuffer.value = value;
  }
  get ghostAmount() {
    return this.uniforms.ghostAmount.value;
  }
  set ghostAmount(value) {
    this.uniforms.ghostAmount.value = value;
  }
  get haloAmount() {
    return this.uniforms.haloAmount.value;
  }
  set haloAmount(value) {
    this.uniforms.haloAmount.value = value;
  }
  get chromaticAberration() {
    return this.uniforms.chromaticAberration.value;
  }
  set chromaticAberration(value) {
    this.uniforms.chromaticAberration.value = value;
  }
};

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/effects/shaders/lensFlareEffect.frag
var lensFlareEffect_default = "uniform sampler2D bloomBuffer;\nuniform sampler2D featuresBuffer;\nuniform float intensity;\n\nvoid mainImage(const vec4 inputColor, const vec2 uv, out vec4 outputColor) {\n  vec3 bloom = texture(bloomBuffer, uv).rgb;\n  vec3 features = texture(featuresBuffer, uv).rgb;\n  outputColor = vec4(inputColor.rgb + (bloom + features) * intensity, inputColor.a);\n}\n";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/effects/LensFlareEffect.ts
var lensFlareEffectOptionsDefaults = {
  blendFunction: BlendFunction.NORMAL,
  resolutionScale: 0.5,
  width: Resolution.AUTO_SIZE,
  height: Resolution.AUTO_SIZE,
  intensity: 5e-3
};
var LensFlareEffect = class extends Effect {
  resolution;
  renderTarget1;
  renderTarget2;
  thresholdMaterial;
  thresholdPass;
  blurPass;
  preBlurPass;
  featuresMaterial;
  featuresPass;
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
    super("LensFlareEffect", lensFlareEffect_default, {
      blendFunction,
      attributes: EffectAttribute.CONVOLUTION,
      uniforms: new Map(
        Object.entries({
          bloomBuffer: new Uniform3(null),
          featuresBuffer: new Uniform3(null),
          intensity: new Uniform3(1)
        })
      )
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
  onResolutionChange = () => {
    this.setSize(this.resolution.baseWidth, this.resolution.baseHeight);
  };
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
};
export {
  LensFlareEffect,
  lensFlareEffectOptionsDefaults
};
