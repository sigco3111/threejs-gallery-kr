// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/atmosphere/StarsGeometry.ts
import {
  BufferGeometry,
  InterleavedBuffer,
  InterleavedBufferAttribute,
  Sphere,
  Vector3
} from "https://esm.sh/three@0.185.1?external";
var StarsGeometry = class extends BufferGeometry {
  constructor(data) {
    super();
    const int16Array = new Int16Array(data);
    const uint8Array = new Uint8Array(data);
    const int16Buffer = new InterleavedBuffer(int16Array, 5);
    const uint8Buffer = new InterleavedBuffer(uint8Array, 10);
    this.setAttribute(
      "position",
      new InterleavedBufferAttribute(int16Buffer, 3, 0, true)
    );
    this.setAttribute(
      "magnitude",
      new InterleavedBufferAttribute(uint8Buffer, 1, 6, true)
    );
    this.setAttribute(
      "color",
      new InterleavedBufferAttribute(uint8Buffer, 3, 7, true)
    );
    this.boundingSphere = new Sphere(new Vector3(), 1);
  }
};
export {
  StarsGeometry
};
