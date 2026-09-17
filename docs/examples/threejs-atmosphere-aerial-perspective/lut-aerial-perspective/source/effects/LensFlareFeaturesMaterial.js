// docs/examples/threejs-atmosphere-aerial-perspective/lut-aerial-perspective/source/effects/LensFlareFeaturesMaterial.ts
import {
  NoBlending,
  ShaderMaterial,
  Uniform,
  Vector2
} from "https://esm.sh/three@0.185.1?external";

// docs/examples/threejs-atmosphere-aerial-perspective/lut-aerial-perspective/source/effects/shaders/lensFlareFeatures.frag
var lensFlareFeatures_default = "#include <common>\n\n#define SQRT_2 (0.7071067811865476)\n\nuniform sampler2D inputBuffer;\n\nuniform vec2 texelSize;\nuniform float ghostAmount;\nuniform float haloAmount;\nuniform float chromaticAberration;\n\nin vec2 vUv;\nin vec2 vAspectRatio;\n\nvec3 sampleGhost(const vec2 direction, const vec3 color, const float offset) {\n  vec2 suv = clamp(1.0 - vUv + direction * offset, 0.0, 1.0);\n  vec3 result = texture(inputBuffer, suv).rgb * color;\n\n  // Falloff at the perimeter.\n  float d = clamp(length(0.5 - suv) / (0.5 * SQRT_2), 0.0, 1.0);\n  result *= pow(1.0 - d, 3.0);\n  return result;\n}\n\nvec4 sampleGhosts(float amount) {\n  vec3 color = vec3(0.0);\n  vec2 direction = vUv - 0.5;\n  color += sampleGhost(direction, vec3(0.8, 0.8, 1.0), -5.0);\n  color += sampleGhost(direction, vec3(1.0, 0.8, 0.4), -1.5);\n  color += sampleGhost(direction, vec3(0.9, 1.0, 0.8), -0.4);\n  color += sampleGhost(direction, vec3(1.0, 0.8, 0.4), -0.2);\n  color += sampleGhost(direction, vec3(0.9, 0.7, 0.7), -0.1);\n  color += sampleGhost(direction, vec3(0.5, 1.0, 0.4), 0.7);\n  color += sampleGhost(direction, vec3(0.5, 0.5, 0.5), 1.0);\n  color += sampleGhost(direction, vec3(1.0, 1.0, 0.6), 2.5);\n  color += sampleGhost(direction, vec3(0.5, 0.8, 1.0), 10.0);\n  return vec4(color * amount, 1.0);\n}\n\n// Reference: https://john-chapman.github.io/2017/11/05/pseudo-lens-flare.html\nfloat cubicRingMask(const float x, const float radius, const float thickness) {\n  float v = min(abs(x - radius) / thickness, 1.0);\n  return 1.0 - v * v * (3.0 - 2.0 * v);\n}\n\nvec3 sampleHalo(const float radius) {\n  vec2 direction = normalize((vUv - 0.5) / vAspectRatio) * vAspectRatio;\n  vec3 offset = vec3(texelSize.x * chromaticAberration) * vec3(-1.0, 0.0, 1.0);\n  vec2 suv = fract(1.0 - vUv + direction * radius);\n  vec3 result = vec3(\n    texture(inputBuffer, suv + direction * offset.r).r,\n    texture(inputBuffer, suv + direction * offset.g).g,\n    texture(inputBuffer, suv + direction * offset.b).b\n  );\n\n  // Falloff at the center and perimeter.\n  vec2 wuv = (vUv - vec2(0.5, 0.0)) / vAspectRatio + vec2(0.5, 0.0);\n  float d = saturate(distance(wuv, vec2(0.5)));\n  result *= cubicRingMask(d, 0.45, 0.25);\n  return result;\n}\n\nvec4 sampleHalos(const float amount) {\n  vec3 color = vec3(0.0);\n  color += sampleHalo(0.3);\n  return vec4(color, 1.0) * amount;\n}\n\nvoid main() {\n  gl_FragColor += sampleGhosts(ghostAmount);\n  gl_FragColor += sampleHalos(haloAmount);\n}\n\n";

// docs/examples/threejs-atmosphere-aerial-perspective/lut-aerial-perspective/source/effects/shaders/lensFlareFeatures.vert
var lensFlareFeatures_default2 = "uniform vec2 texelSize;\n\nout vec2 vUv;\nout vec2 vAspectRatio;\n\nvoid main() {\n  vUv = position.xy * 0.5 + 0.5;\n  vAspectRatio = vec2(texelSize.x / texelSize.y, 1.0);\n  gl_Position = vec4(position.xy, 1.0, 1.0);\n}\n";

// docs/examples/threejs-atmosphere-aerial-perspective/lut-aerial-perspective/source/effects/LensFlareFeaturesMaterial.ts
var lensFlareFeaturesMaterialParametersDefaults = {
  ghostAmount: 1e-3,
  haloAmount: 1e-3,
  chromaticAberration: 10
};
var LensFlareFeaturesMaterial = class extends ShaderMaterial {
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
      blending: NoBlending,
      toneMapped: false,
      depthWrite: false,
      depthTest: false,
      uniforms: {
        inputBuffer: new Uniform(inputBuffer),
        texelSize: new Uniform(new Vector2()),
        ghostAmount: new Uniform(ghostAmount),
        haloAmount: new Uniform(haloAmount),
        chromaticAberration: new Uniform(chromaticAberration),
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
export {
  LensFlareFeaturesMaterial,
  lensFlareFeaturesMaterialParametersDefaults
};
