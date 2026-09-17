var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { Vector3 } from "three";
class FrustumCorners {
  constructor(camera, far) {
    __publicField(this, "near", [new Vector3(), new Vector3(), new Vector3(), new Vector3()]);
    __publicField(this, "far", [new Vector3(), new Vector3(), new Vector3(), new Vector3()]);
    if (camera != null && far != null) {
      this.setFromCamera(camera, far);
    }
  }
  clone() {
    return new FrustumCorners().copy(this);
  }
  copy(other) {
    for (let i = 0; i < 4; ++i) {
      this.near[i].copy(other.near[i]);
      this.far[i].copy(other.far[i]);
    }
    return this;
  }
  setFromCamera(camera, far) {
    const isOrthographic = camera.isOrthographicCamera === true;
    const inverseProjectionMatrix = camera.projectionMatrixInverse;
    this.near[0].set(1, 1, -1);
    this.near[1].set(1, -1, -1);
    this.near[2].set(-1, -1, -1);
    this.near[3].set(-1, 1, -1);
    for (let i = 0; i < 4; ++i) {
      this.near[i].applyMatrix4(inverseProjectionMatrix);
    }
    this.far[0].set(1, 1, 1);
    this.far[1].set(1, -1, 1);
    this.far[2].set(-1, -1, 1);
    this.far[3].set(-1, 1, 1);
    for (let i = 0; i < 4; ++i) {
      const corner = this.far[i];
      corner.applyMatrix4(inverseProjectionMatrix);
      const absZ = Math.abs(corner.z);
      if (isOrthographic) {
        corner.z *= Math.min(far / absZ, 1);
      } else {
        corner.multiplyScalar(Math.min(far / absZ, 1));
      }
    }
    return this;
  }
  split(clipDepths, result = []) {
    for (let index = 0; index < clipDepths.length; ++index) {
      const frustum = result[index] ?? (result[index] = new FrustumCorners());
      if (index === 0) {
        for (let i = 0; i < 4; ++i) {
          frustum.near[i].copy(this.near[i]);
        }
      } else {
        for (let i = 0; i < 4; ++i) {
          frustum.near[i].lerpVectors(
            this.near[i],
            this.far[i],
            clipDepths[index - 1]
          );
        }
      }
      if (index === clipDepths.length - 1) {
        for (let i = 0; i < 4; ++i) {
          frustum.far[i].copy(this.far[i]);
        }
      } else {
        for (let i = 0; i < 4; ++i) {
          frustum.far[i].lerpVectors(
            this.near[i],
            this.far[i],
            clipDepths[index]
          );
        }
      }
    }
    result.length = clipDepths.length;
    return result;
  }
  applyMatrix4(matrix) {
    for (let i = 0; i < 4; ++i) {
      this.near[i].applyMatrix4(matrix);
      this.far[i].applyMatrix4(matrix);
    }
    return this;
  }
}
export {
  FrustumCorners
};
