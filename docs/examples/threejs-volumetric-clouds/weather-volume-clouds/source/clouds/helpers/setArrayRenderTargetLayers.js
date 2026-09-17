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
export {
  setArrayRenderTargetLayers
};
