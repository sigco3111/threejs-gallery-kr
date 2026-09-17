var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import {
  Camera,
  GLSL3,
  LinearFilter,
  LinearMipMapLinearFilter,
  Mesh,
  NoColorSpace,
  PlaneGeometry,
  RawShaderMaterial,
  RepeatWrapping,
  RGBAFormat,
  Uniform,
  WebGLRenderTarget
} from "three";
class ProceduralTextureBase {
  constructor({ size, fragmentShader }) {
    __publicField(this, "size");
    __publicField(this, "needsRender", true);
    __publicField(this, "material");
    __publicField(this, "mesh");
    __publicField(this, "renderTarget");
    __publicField(this, "camera", new Camera());
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
    this.renderTarget = new WebGLRenderTarget(size, size, {
      depthBuffer: false,
      stencilBuffer: false,
      format: RGBAFormat
    });
    const texture = this.renderTarget.texture;
    texture.generateMipmaps = true;
    texture.minFilter = LinearMipMapLinearFilter;
    texture.magFilter = LinearFilter;
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
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
    renderer.setRenderTarget(this.renderTarget);
    renderer.render(this.mesh, this.camera);
    renderer.setRenderTarget(renderTarget);
  }
  get texture() {
    return this.renderTarget.texture;
  }
}
export {
  ProceduralTextureBase
};
