// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/geospatial/defineShorthand.ts
function definePropertyShorthand(destination, ...sourceKeysArgs) {
  const descriptors = {};
  for (let i = 0; i < sourceKeysArgs.length; i += 2) {
    const source = sourceKeysArgs[i];
    const keys = sourceKeysArgs[i + 1];
    for (const key of keys) {
      descriptors[key] = {
        enumerable: true,
        get: () => source[key],
        set: (value) => {
          source[key] = value;
        }
      };
    }
  }
  Object.defineProperties(destination, descriptors);
  return destination;
}
function defineUniformShorthand(destination, source, keys) {
  const descriptors = {};
  for (const key of keys) {
    descriptors[key] = {
      enumerable: true,
      get: () => source.uniforms[key].value,
      set: (value) => {
        source.uniforms[key].value = value;
      }
    };
  }
  Object.defineProperties(destination, descriptors);
  return destination;
}
export {
  definePropertyShorthand,
  defineUniformShorthand
};
