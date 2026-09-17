// docs/examples/threejs-volumetric-clouds/weather-volume-clouds/source/effects/DitheringEffect.ts
import { BlendFunction, Effect } from "https://esm.sh/postprocessing@6.37.4?deps=three@0.185.1&external=three";

// docs/examples/threejs-volumetric-clouds/weather-volume-clouds/source/effects/shaders/ditheringEffect.frag
var ditheringEffect_default = "#define DITHERING\n\n#include <dithering_pars_fragment>\n\nvoid mainImage(const vec4 inputColor, const vec2 uv, out vec4 outputColor) {\n  outputColor = vec4(saturate(dithering(inputColor.rgb)), inputColor.a);\n}\n";

// docs/examples/threejs-volumetric-clouds/weather-volume-clouds/source/effects/DitheringEffect.ts
var ditheringOptionsDefaults = {
  blendFunction: BlendFunction.NORMAL
};
var DitheringEffect = class extends Effect {
  constructor(options) {
    const { blendFunction } = {
      ...ditheringOptionsDefaults,
      ...options
    };
    super("DitheringEffect", ditheringEffect_default, {
      blendFunction
    });
  }
};
export {
  DitheringEffect,
  ditheringOptionsDefaults
};
