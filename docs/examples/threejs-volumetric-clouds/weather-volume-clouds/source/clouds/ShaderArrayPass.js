// docs/examples/threejs-volumetric-clouds/weather-volume-clouds/source/clouds/ShaderArrayPass.ts
import { ShaderPass } from "https://esm.sh/postprocessing@6.37.4?deps=three@0.185.1&external=three";

// docs/examples/threejs-volumetric-clouds/weather-volume-clouds/source/vendor/tiny-invariant.ts
function invariant(condition, message) {
  if (condition) return;
  const provided = typeof message === "function" ? message() : message;
  throw new Error(provided != null ? `Invariant failed: ${provided}` : "Invariant failed");
}

// docs/examples/threejs-volumetric-clouds/weather-volume-clouds/source/clouds/helpers/setArrayRenderTargetLayers.ts
function setArrayRenderTargetLayers(renderer, outputBuffer) {
  const glTexture = renderer.properties.get(outputBuffer.texture).__webglTexture;
  const gl = renderer.getContext();
  invariant(gl instanceof WebGL2RenderingContext);
  renderer.setRenderTarget(outputBuffer);
  const drawBuffers = [];
  if (glTexture != null) {
    for (let layer = 0; layer < outputBuffer.depth; ++layer) {
      gl.framebufferTextureLayer(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0 + layer,
        glTexture,
        0,
        layer
      );
      drawBuffers.push(gl.COLOR_ATTACHMENT0 + layer);
    }
  }
  gl.drawBuffers(drawBuffers);
}

// docs/examples/threejs-volumetric-clouds/weather-volume-clouds/source/clouds/ShaderArrayPass.ts
var ShaderArrayPass = class extends ShaderPass {
  render(renderer, inputBuffer, outputBuffer, deltaTime, stencilTest) {
    const uniforms = this.fullscreenMaterial.uniforms;
    if (inputBuffer !== null && uniforms?.[this.input] != null) {
      uniforms[this.input].value = inputBuffer.texture;
    }
    setArrayRenderTargetLayers(renderer, outputBuffer);
    renderer.render(this.scene, this.camera);
  }
};
export {
  ShaderArrayPass
};
