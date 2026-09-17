import {
  NoBlending,
  ShaderMaterial,
  Uniform,
  Vector2
} from "three";
import fragmentShader from "./shaders/lensFlareFeatures.frag?raw";
import vertexShader from "./shaders/lensFlareFeatures.vert?raw";
const lensFlareFeaturesMaterialParametersDefaults = {
  ghostAmount: 1e-3,
  haloAmount: 1e-3,
  chromaticAberration: 10
};
class LensFlareFeaturesMaterial extends ShaderMaterial {
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
      fragmentShader,
      vertexShader,
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
}
export {
  LensFlareFeaturesMaterial,
  lensFlareFeaturesMaterialParametersDefaults
};
