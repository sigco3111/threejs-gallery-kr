import { Float16Array, getFloat16 } from "@petamoriken/float16";
let hostLittleEndian;
function isHostLittleEndian() {
  if (hostLittleEndian != null) {
    return hostLittleEndian;
  }
  const a = new Uint32Array([268435456]);
  const b = new Uint8Array(a.buffer, a.byteOffset, a.byteLength);
  hostLittleEndian = b[0] === 0;
  return hostLittleEndian;
}
function parseTypedArray(buffer, TypedArray, getValue, littleEndian = true) {
  if (littleEndian === isHostLittleEndian()) {
    return new TypedArray(buffer);
  }
  const data = Object.assign(new DataView(buffer), {
    getFloat16(byteOffset, littleEndian2) {
      return getFloat16(this, byteOffset, littleEndian2);
    }
  });
  const array = new TypedArray(data.byteLength / TypedArray.BYTES_PER_ELEMENT);
  for (let index = 0, byteIndex = 0; index < array.length; ++index, byteIndex += TypedArray.BYTES_PER_ELEMENT) {
    array[index] = data[getValue](byteIndex, littleEndian);
  }
  return array;
}
const parseUint8Array = (buffer) => new Uint8Array(buffer);
const parseInt8Array = (buffer) => new Int8Array(buffer);
const parseUint16Array = (buffer, littleEndian) => parseTypedArray(buffer, Uint16Array, "getUint16", littleEndian);
const parseInt16Array = (buffer, littleEndian) => parseTypedArray(buffer, Int16Array, "getInt16", littleEndian);
const parseInt32Array = (buffer, littleEndian) => parseTypedArray(buffer, Int32Array, "getInt32", littleEndian);
const parseUint32Array = (buffer, littleEndian) => parseTypedArray(buffer, Uint32Array, "getUint32", littleEndian);
const parseFloat16Array = (buffer, littleEndian) => parseTypedArray(buffer, Float16Array, "getFloat16", littleEndian);
const parseFloat32Array = (buffer, littleEndian) => parseTypedArray(buffer, Float32Array, "getFloat32", littleEndian);
const parseFloat64Array = (buffer, littleEndian) => parseTypedArray(buffer, Float64Array, "getFloat64", littleEndian);
export {
  parseFloat16Array,
  parseFloat32Array,
  parseFloat64Array,
  parseInt16Array,
  parseInt32Array,
  parseInt8Array,
  parseUint16Array,
  parseUint32Array,
  parseUint8Array
};
