import { resolveIncludes } from "../geospatial/index.js";
import { math } from "../geospatial/shaders/index.js";
import { ProceduralTextureBase } from "./ProceduralTexture";
import fragmentShader from "./shaders/localWeather.frag?raw";
import perlin from "./shaders/perlin.glsl?raw";
import tileableNoise from "./shaders/tileableNoise.glsl?raw";
class LocalWeather extends ProceduralTextureBase {
  constructor() {
    super({
      size: 512,
      fragmentShader: resolveIncludes(fragmentShader, {
        core: { math },
        perlin,
        tileableNoise
      })
    });
  }
}
export {
  LocalWeather
};
