import { lerp } from "../../geospatial/index.js";
const modes = {
  uniform: (count, near, far, _, result = []) => {
    for (let i = 0; i < count; ++i) {
      result[i] = (near + (far - near) * (i + 1) / count) / far;
    }
    result.length = count;
    return result;
  },
  logarithmic: (count, near, far, _, result = []) => {
    for (let i = 0; i < count; ++i) {
      result[i] = near * (far / near) ** ((i + 1) / count) / far;
    }
    result.length = count;
    return result;
  },
  practical: (count, near, far, lambda = 0.5, result = []) => {
    for (let i = 0; i < count; ++i) {
      const uniform = (near + (far - near) * (i + 1) / count) / far;
      const logarithmic = near * (far / near) ** ((i + 1) / count) / far;
      result[i] = lerp(uniform, logarithmic, lambda);
    }
    result.length = count;
    return result;
  }
};
const frustumSplitFunctions = modes;
function splitFrustum(mode, count, near, far, lambda, result = []) {
  return modes[mode](count, near, far, lambda, result);
}
export {
  frustumSplitFunctions,
  splitFrustum
};
