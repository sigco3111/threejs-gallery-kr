var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import {
  ByteType,
  Data3DTexture,
  DataTexture,
  FloatType,
  HalfFloatType,
  IntType,
  LinearFilter,
  Loader,
  RGBAFormat,
  ShortType,
  UnsignedByteType,
  UnsignedIntType,
  UnsignedShortType
} from "three";
import invariant from "../vendor/tiny-invariant.js";
import { Float16Array } from "./typedArray";
import {
  createTypedArrayLoaderClass
} from "./TypedArrayLoader";
function getTextureDataType(array) {
  const type = array instanceof Int8Array ? ByteType : array instanceof Uint8Array ? UnsignedByteType : array instanceof Uint8ClampedArray ? UnsignedByteType : array instanceof Int16Array ? ShortType : array instanceof Uint16Array ? UnsignedShortType : array instanceof Int32Array ? IntType : array instanceof Uint32Array ? UnsignedIntType : array instanceof Float16Array ? HalfFloatType : array instanceof Float32Array ? FloatType : array instanceof Float64Array ? FloatType : null;
  invariant(type != null);
  return type;
}
const defaultDataTextureParameter = {
  format: RGBAFormat,
  minFilter: LinearFilter,
  magFilter: LinearFilter
};
class DataLoader extends Loader {
  constructor() {
    super(...arguments);
    __publicField(this, "parameters", {});
  }
  load(url, onLoad, onProgress, onError) {
    const texture = new this.Texture();
    const loader = new this.TypedArrayLoader(this.manager);
    loader.setRequestHeader(this.requestHeader);
    loader.setPath(this.path);
    loader.setWithCredentials(this.withCredentials);
    loader.load(
      url,
      (array) => {
        texture.image.data = array instanceof Float16Array ? new Uint16Array(array.buffer) : array;
        const { width, height, depth, ...params } = this.parameters;
        if (width != null) {
          texture.image.width = width;
        }
        if (height != null) {
          texture.image.height = height;
        }
        if ("depth" in texture.image && depth != null) {
          texture.image.depth = depth;
        }
        texture.type = getTextureDataType(array);
        Object.assign(texture, params);
        texture.needsUpdate = true;
        onLoad(texture);
      },
      onProgress,
      onError
    );
  }
}
function createDataLoaderClass(Texture, parser, parameters) {
  return class extends DataLoader {
    constructor() {
      super(...arguments);
      __publicField(this, "Texture", Texture);
      __publicField(this, "TypedArrayLoader", createTypedArrayLoaderClass(parser));
      __publicField(this, "parameters", {
        ...defaultDataTextureParameter,
        ...parameters
      });
    }
  };
}
function createData3DTextureLoaderClass(parser, parameters) {
  return createDataLoaderClass(Data3DTexture, parser, parameters);
}
function createDataTextureLoaderClass(parser, parameters) {
  return createDataLoaderClass(DataTexture, parser, parameters);
}
function createData3DTextureLoader(parser, parameters) {
  return new (createData3DTextureLoaderClass(parser, parameters))();
}
function createDataTextureLoader(parser, parameters) {
  return new (createDataTextureLoaderClass(parser, parameters))();
}
export {
  DataLoader,
  createData3DTextureLoader,
  createData3DTextureLoaderClass,
  createDataTextureLoader,
  createDataTextureLoaderClass
};
