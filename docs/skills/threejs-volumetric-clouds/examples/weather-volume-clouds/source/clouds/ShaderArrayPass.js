import { ShaderPass } from "postprocessing";
import { setArrayRenderTargetLayers } from "./helpers/setArrayRenderTargetLayers";
class ShaderArrayPass extends ShaderPass {
  render(renderer, inputBuffer, outputBuffer, deltaTime, stencilTest) {
    const uniforms = this.fullscreenMaterial.uniforms;
    if (inputBuffer !== null && uniforms?.[this.input] != null) {
      uniforms[this.input].value = inputBuffer.texture;
    }
    setArrayRenderTargetLayers(renderer, outputBuffer);
    renderer.render(this.scene, this.camera);
  }
}
export {
  ShaderArrayPass
};
