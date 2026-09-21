// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/effects/createHaldLookupTexture.ts
import { LookupTexture, RawImageData } from "https://esm.sh/postprocessing@6.37.4?deps=three@0.185.1&external=three";
function createHaldLookupTexture(texture) {
  const { image } = texture;
  const { width, height } = image;
  if (width !== height) {
    throw new Error("Hald CLUT image must be square.");
  }
  const size = Math.cbrt(width * height);
  if (size % 1 !== 0) {
    throw new Error("Hald CLUT image must be cubic.");
  }
  const { data } = RawImageData.from(image);
  const lut = new LookupTexture(data, size);
  lut.name = texture.name;
  lut.type = texture.type;
  texture.colorSpace = lut.colorSpace;
  return lut;
}
export {
  createHaldLookupTexture
};
