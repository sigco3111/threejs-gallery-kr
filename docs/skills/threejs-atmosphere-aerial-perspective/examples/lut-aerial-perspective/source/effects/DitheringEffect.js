import { BlendFunction, Effect } from "postprocessing";
import fragmentShader from "./shaders/ditheringEffect.frag?raw";
const ditheringOptionsDefaults = {
  blendFunction: BlendFunction.NORMAL
};
class DitheringEffect extends Effect {
  constructor(options) {
    const { blendFunction } = {
      ...ditheringOptionsDefaults,
      ...options
    };
    super("DitheringEffect", fragmentShader, {
      blendFunction
    });
  }
}
export {
  DitheringEffect,
  ditheringOptionsDefaults
};
