// docs/examples/threejs-volumetric-clouds/weather-volume-clouds/source/clouds/Procedural3DTexture.ts
import {
  Camera,
  GLSL3,
  LinearFilter,
  Mesh,
  NoColorSpace,
  PlaneGeometry,
  RawShaderMaterial,
  RedFormat,
  RepeatWrapping,
  Uniform,
  WebGL3DRenderTarget
} from "https://esm.sh/three@0.185.1?external";
var Procedural3DTextureBase = class {
  constructor({ size, fragmentShader }) {
    this.needsRender = true;
    this.camera = new Camera();
    this.size = size;
    this.material = new RawShaderMaterial({
      glslVersion: GLSL3,
      vertexShader: (
        /* glsl */
        `
        in vec3 position;
        out vec2 vUv;
        void main() {
          vUv = position.xy * 0.5 + 0.5;
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      `
      ),
      fragmentShader,
      uniforms: {
        layer: new Uniform(0)
      }
    });
    this.mesh = new Mesh(new PlaneGeometry(2, 2), this.material);
    this.renderTarget = new WebGL3DRenderTarget(size, size, size, {
      depthBuffer: false,
      stencilBuffer: false,
      format: RedFormat
    });
    const texture = this.renderTarget.texture;
    texture.minFilter = LinearFilter;
    texture.magFilter = LinearFilter;
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.wrapR = RepeatWrapping;
    texture.colorSpace = NoColorSpace;
    texture.needsUpdate = true;
  }
  dispose() {
    this.renderTarget.dispose();
    this.material.dispose();
  }
  render(renderer, deltaTime) {
    if (!this.needsRender) {
      return;
    }
    this.needsRender = false;
    const renderTarget = renderer.getRenderTarget();
    for (let layer = 0; layer < this.size; ++layer) {
      this.material.uniforms.layer.value = layer / this.size;
      renderer.setRenderTarget(this.renderTarget, layer);
      renderer.render(this.mesh, this.camera);
    }
    renderer.setRenderTarget(renderTarget);
  }
  get texture() {
    return this.renderTarget.texture;
  }
};
export {
  Procedural3DTextureBase
};
