var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { Matrix4, Quaternion, Ray, Vector3 } from "three";
import { Ellipsoid } from "./Ellipsoid";
import { clamp } from "./math";
const EPSILON = 1e-6;
const eastScratch = /* @__PURE__ */ new Vector3();
const northScratch = /* @__PURE__ */ new Vector3();
const upScratch = /* @__PURE__ */ new Vector3();
const vectorScratch1 = /* @__PURE__ */ new Vector3();
const vectorScratch2 = /* @__PURE__ */ new Vector3();
const vectorScratch3 = /* @__PURE__ */ new Vector3();
const matrixScratch = /* @__PURE__ */ new Matrix4();
const quaternionScratch = /* @__PURE__ */ new Quaternion();
const rayScratch = /* @__PURE__ */ new Ray();
class PointOfView {
  constructor(distance = 0, heading = 0, pitch = 0, roll = 0) {
    // Distance from the target.
    __publicField(this, "_distance");
    // Radians from the local east direction relative from true north, measured
    // clockwise (90 degrees is true north, and -90 is true south).
    __publicField(this, "heading");
    // Radians from the local horizon plane, measured with positive values looking
    // up (90 degrees is straight up, -90 is straight down).
    __publicField(this, "_pitch");
    __publicField(this, "roll");
    this.distance = distance;
    this.heading = heading;
    this.pitch = pitch;
    this.roll = roll;
  }
  get distance() {
    return this._distance;
  }
  set distance(value) {
    this._distance = Math.max(value, EPSILON);
  }
  get pitch() {
    return this._pitch;
  }
  set pitch(value) {
    this._pitch = clamp(value, -Math.PI / 2 + EPSILON, Math.PI / 2 - EPSILON);
  }
  set(distance, heading, pitch, roll) {
    this.distance = distance;
    this.heading = heading;
    this.pitch = pitch;
    if (roll != null) {
      this.roll = roll;
    }
    return this;
  }
  clone() {
    return new PointOfView(this.distance, this.heading, this.pitch, this.roll);
  }
  copy(other) {
    this.distance = other.distance;
    this.heading = other.heading;
    this.pitch = other.pitch;
    this.roll = other.roll;
    return this;
  }
  equals(other) {
    return other.distance === this.distance && other.heading === this.heading && other.pitch === this.pitch && other.roll === this.roll;
  }
  decompose(target, eye, quaternion, up, ellipsoid = Ellipsoid.WGS84) {
    ellipsoid.getEastNorthUpVectors(
      target,
      eastScratch,
      northScratch,
      upScratch
    );
    up?.copy(upScratch);
    const offset = vectorScratch1.copy(eastScratch).multiplyScalar(Math.cos(this.heading)).add(
      vectorScratch2.copy(northScratch).multiplyScalar(Math.sin(this.heading))
    ).multiplyScalar(Math.cos(this.pitch)).add(vectorScratch2.copy(upScratch).multiplyScalar(Math.sin(this.pitch))).normalize().multiplyScalar(this.distance);
    eye.copy(target).sub(offset);
    if (this.roll !== 0) {
      const rollAxis = vectorScratch1.copy(target).sub(eye).normalize();
      upScratch.applyQuaternion(
        quaternionScratch.setFromAxisAngle(rollAxis, this.roll)
      );
    }
    quaternion.setFromRotationMatrix(
      matrixScratch.lookAt(eye, target, upScratch)
    );
  }
  setFromCamera(camera, ellipsoid = Ellipsoid.WGS84) {
    const eye = vectorScratch1.setFromMatrixPosition(camera.matrixWorld);
    const direction = vectorScratch2.set(0, 0, 0.5).unproject(camera).sub(eye).normalize();
    const target = ellipsoid.getIntersection(rayScratch.set(eye, direction));
    if (target == null) {
      return;
    }
    this.distance = eye.distanceTo(target);
    ellipsoid.getEastNorthUpVectors(
      target,
      eastScratch,
      northScratch,
      upScratch
    );
    this.heading = Math.atan2(
      northScratch.dot(direction),
      eastScratch.dot(direction)
    );
    this.pitch = Math.asin(upScratch.dot(direction));
    const up = vectorScratch1.copy(camera.up).applyQuaternion(camera.quaternion);
    const s = vectorScratch3.copy(direction).multiplyScalar(-up.dot(direction)).add(up).normalize();
    const t = vectorScratch1.copy(direction).multiplyScalar(-upScratch.dot(direction)).add(upScratch).normalize();
    const x = t.dot(s);
    const y = direction.dot(t.cross(s));
    this.roll = Math.atan2(y, x);
    return this;
  }
}
export {
  PointOfView
};
