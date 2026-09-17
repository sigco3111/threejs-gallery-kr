// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/effects/GeometryPass.ts
import { RenderPass } from "https://esm.sh/postprocessing@6.37.4?deps=three@0.185.1&external=three";
import {
  HalfFloatType
} from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/effects/setupMaterialsForGeometryPass.ts
import { ShaderLib } from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/geospatial/shaders/packing.glsl
var packing_default = "// Reference: https://jcgt.org/published/0003/02/01/paper.pdf\n\nvec2 signNotZero(vec2 v) {\n  return vec2(v.x >= 0.0 ? 1.0 : -1.0, v.y >= 0.0 ? 1.0 : -1.0);\n}\n\nvec2 packNormalToVec2(vec3 v) {\n  vec2 p = v.xy * (1.0 / (abs(v.x) + abs(v.y) + abs(v.z)));\n  return v.z <= 0.0\n    ? (1.0 - abs(p.yx)) * signNotZero(p)\n    : p;\n}\n\nvec3 unpackVec2ToNormal(vec2 e) {\n  vec3 v = vec3(e.xy, 1.0 - abs(e.x) - abs(e.y));\n  if (v.z < 0.0) {\n    v.xy = (1.0 - abs(v.yx)) * signNotZero(v.xy);\n  }\n  return normalize(v);\n}\n";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/geospatial/shaders/index.ts
var packing = packing_default;

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/effects/setupMaterialsForGeometryPass.ts
var SETUP = Symbol("SETUP");
function injectNormal(shader) {
  const vertexShader = shader.vertexShader.replace(
    /* glsl */
    `#include <fog_pars_vertex>`,
    /* glsl */
    `
        #include <fog_pars_vertex>
        #include <normal_pars_vertex>
      `
  ).replace(
    /* glsl */
    `#include <defaultnormal_vertex>`,
    /* glsl */
    `
        #include <defaultnormal_vertex>
        #include <normal_vertex>
      `
  ).replace(
    /* glsl */
    `#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )`,
    /* glsl */
    `#if 1`
  ).replace(
    /* glsl */
    `#include <clipping_planes_vertex>`,
    /* glsl */
    `
        #include <clipping_planes_vertex>
        vViewPosition = - mvPosition.xyz;
      `
  );
  shader.vertexShader = /* glsl */
  `
    #undef FLAT_SHADED
    varying vec3 vViewPosition;
    ${vertexShader}
  `;
  const fragmentShader = shader.fragmentShader.replace(
    /#ifndef FLAT_SHADED\s+varying vec3 vNormal;\s+#endif/m,
    /* glsl */
    `#include <normal_pars_fragment>`
  ).replace(
    /* glsl */
    `#include <common>`,
    /* glsl */
    `
        #include <common>
        #include <packing>
      `
  ).replace(
    /* glsl */
    `#include <specularmap_fragment>`,
    /* glsl */
    `
        #include <specularmap_fragment>
        #include <normal_fragment_begin>
        #include <normal_fragment_maps>
      `
  );
  shader.fragmentShader = /* glsl */
  `
    #undef FLAT_SHADED
    varying vec3 vViewPosition;
    ${fragmentShader}
  `;
  return shader;
}
function injectGBuffer(shader, { type } = {}) {
  if (shader[SETUP] === true) {
    return shader;
  }
  if (type === "basic") {
    injectNormal(shader);
  }
  const outputBuffer1 = type === "physical" ? (
    /* glsl */
    `
          vec4(
            packNormalToVec2(normal),
            metalnessFactor,
            roughnessFactor
          )
        `
  ) : (
    /* glsl */
    `
          vec4(
            packNormalToVec2(normal),
            reflectivity,
            0.0
          );
        `
  );
  shader.fragmentShader = /* glsl */
  `
    layout(location = 1) out vec4 outputBuffer1;

    #if !defined(USE_ENVMAP)
      uniform float reflectivity;
    #endif // !defined(USE_ENVMAP)

    ${packing}
    ${shader.fragmentShader.replace(
    /}\s*$/m,
    // Assume the last curly brace is of main()
    /* glsl */
    `
          outputBuffer1 = ${outputBuffer1};
        }
      `
  )}
  `;
  shader[SETUP] = true;
  return shader;
}
function setupMaterialsForGeometryPass() {
  injectGBuffer(ShaderLib.lambert);
  injectGBuffer(ShaderLib.phong);
  injectGBuffer(ShaderLib.basic, { type: "basic" });
  injectGBuffer(ShaderLib.standard, { type: "physical" });
  injectGBuffer(ShaderLib.physical, { type: "physical" });
}

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/effects/GeometryPass.ts
var GeometryPass = class extends RenderPass {
  geometryTexture;
  constructor(inputBuffer, scene, camera, overrideMaterial) {
    super(scene, camera, overrideMaterial);
    this.geometryTexture = inputBuffer.texture.clone();
    this.geometryTexture.isRenderTargetTexture = true;
    this.geometryTexture.type = HalfFloatType;
    setupMaterialsForGeometryPass();
  }
  render(renderer, inputBuffer, outputBuffer, deltaTime, stencilTest) {
    if (inputBuffer != null) {
      inputBuffer.textures[1] = this.geometryTexture;
    }
    super.render(renderer, inputBuffer, null);
    if (inputBuffer != null) {
      inputBuffer.textures.length = 1;
    }
  }
  setSize(width, height) {
    this.geometryTexture.image.width = width;
    this.geometryTexture.image.height = height;
  }
};
export {
  GeometryPass
};
