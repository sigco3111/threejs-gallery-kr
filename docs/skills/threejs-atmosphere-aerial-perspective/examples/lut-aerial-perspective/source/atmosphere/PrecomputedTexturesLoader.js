var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import {
  FloatType,
  HalfFloatType,
  LinearFilter,
  Loader
} from "three";
import { EXRLoader } from "three-stdlib";
import join from "../vendor/url-join.js";
import {
  createData3DTextureLoader,
  createDataTextureLoader,
  EXR3DLoader,
  Float16Array,
  parseFloat16Array
} from "../geospatial/index.js";
import {
  IRRADIANCE_TEXTURE_HEIGHT,
  IRRADIANCE_TEXTURE_WIDTH,
  SCATTERING_TEXTURE_DEPTH,
  SCATTERING_TEXTURE_HEIGHT,
  SCATTERING_TEXTURE_WIDTH,
  TRANSMITTANCE_TEXTURE_HEIGHT,
  TRANSMITTANCE_TEXTURE_WIDTH
} from "./constants";
class PrecomputedTexturesLoader extends Loader {
  constructor() {
    super(...arguments);
    __publicField(this, "format", "exr");
    __publicField(this, "type", HalfFloatType);
  }
  setTypeFromRenderer(renderer) {
    this.type = renderer.getContext().getExtension("OES_texture_float_linear") == null ? HalfFloatType : FloatType;
    return this;
  }
  load(url, onLoad, onProgress, onError) {
    const result = {};
    const loadTexture = (name, { loader, extension }) => {
      loader.setRequestHeader(this.requestHeader);
      loader.setPath(this.path);
      loader.setWithCredentials(this.withCredentials);
      loader.load(
        join(url, `${name}${extension}`),
        (texture) => {
          texture.minFilter = LinearFilter;
          texture.magFilter = LinearFilter;
          texture.type = this.type;
          if (this.type === FloatType) {
            texture.image.data = new Float32Array(
              new Float16Array(texture.image.data.buffer)
            );
          }
          result[`${name}Texture`] = texture;
          if (result.irradianceTexture != null && result.scatteringTexture != null && result.transmittanceTexture != null) {
            onLoad(result);
          }
        },
        onProgress,
        onError
      );
    };
    if (this.format === "exr") {
      loadTexture("irradiance", {
        loader: new EXRLoader(this.manager),
        extension: ".exr"
      });
      loadTexture("scattering", {
        loader: new EXR3DLoader(this.manager).setDepth(
          SCATTERING_TEXTURE_DEPTH
        ),
        extension: ".exr"
      });
      loadTexture("transmittance", {
        loader: new EXRLoader(this.manager),
        extension: ".exr"
      });
    } else {
      loadTexture("irradiance", {
        loader: createDataTextureLoader(parseFloat16Array, {
          width: IRRADIANCE_TEXTURE_WIDTH,
          height: IRRADIANCE_TEXTURE_HEIGHT
        }),
        extension: ".bin"
      });
      loadTexture("scattering", {
        loader: createData3DTextureLoader(parseFloat16Array, {
          width: SCATTERING_TEXTURE_WIDTH,
          height: SCATTERING_TEXTURE_HEIGHT,
          depth: SCATTERING_TEXTURE_DEPTH
        }),
        extension: ".bin"
      });
      loadTexture("transmittance", {
        loader: createDataTextureLoader(parseFloat16Array, {
          width: TRANSMITTANCE_TEXTURE_WIDTH,
          height: TRANSMITTANCE_TEXTURE_HEIGHT
        }),
        extension: ".bin"
      });
    }
  }
}
export {
  PrecomputedTexturesLoader
};
