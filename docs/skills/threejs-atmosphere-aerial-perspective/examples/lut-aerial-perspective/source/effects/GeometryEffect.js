import { BlendFunction, Effect, EffectAttribute } from "postprocessing";
import { Uniform } from "three";
import { resolveIncludes } from "../geospatial/index.js";
import { packing } from "../geospatial/shaders/index.js";
import fragmentShader from "./shaders/geometryEffect.frag?raw";
const geometryEffectOptionsDefaults = {
  blendFunction: BlendFunction.SRC,
  output: "normal"
};
class GeometryEffect extends Effect {
  constructor(options) {
    const {
      blendFunction,
      geometryBuffer = null,
      output
    } = {
      ...geometryEffectOptionsDefaults,
      ...options
    };
    super(
      "GeometryEffect",
      resolveIncludes(fragmentShader, {
        core: { packing }
      }),
      {
        blendFunction,
        attributes: EffectAttribute.DEPTH,
        uniforms: new Map(
          Object.entries({
            geometryBuffer: new Uniform(geometryBuffer)
          })
        )
      }
    );
    this.output = output;
  }
  get geometryBuffer() {
    return this.uniforms.get("geometryBuffer").value;
  }
  set geometryBuffer(value) {
    this.uniforms.get("geometryBuffer").value = value;
  }
  get output() {
    return this.defines.has("OUTPUT_NORMAL") ? "normal" : "pbr";
  }
  set output(value) {
    if (value !== this.output) {
      if (value === "normal") {
        this.defines.set("OUTPUT_NORMAL", "1");
      } else {
        this.defines.delete("OUTPUT_NORMAL");
      }
      if (value === "pbr") {
        this.defines.set("OUTPUT_PBR", "1");
      } else {
        this.defines.delete("OUTPUT_PBR");
      }
      this.setChanged();
    }
  }
}
export {
  GeometryEffect,
  geometryEffectOptionsDefaults
};
