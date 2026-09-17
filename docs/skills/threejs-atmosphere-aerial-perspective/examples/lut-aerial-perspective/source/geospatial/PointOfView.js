// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/geospatial/PointOfView.ts
import { Matrix4 as Matrix42, Quaternion, Ray, Vector3 as Vector33 } from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/geospatial/Ellipsoid.ts
import { Matrix4, Vector3 as Vector32 } from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/vendor/tiny-invariant.ts
function invariant(condition, message) {
  if (condition) return;
  const provided = typeof message === "function" ? message() : message;
  throw new Error(provided != null ? `Invariant failed: ${provided}` : "Invariant failed");
}

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/geospatial/helpers/projectOnEllipsoidSurface.ts
import { Vector3 } from "https://esm.sh/three@0.185.1?external";
var vectorScratch = /* @__PURE__ */ new Vector3();
function projectOnEllipsoidSurface(position, reciprocalRadiiSquared, result = new Vector3(), options) {
  const { x, y, z } = position;
  const rx = reciprocalRadiiSquared.x;
  const ry = reciprocalRadiiSquared.y;
  const rz = reciprocalRadiiSquared.z;
  const x2 = x * x * rx;
  const y2 = y * y * ry;
  const z2 = z * z * rz;
  const normSquared = x2 + y2 + z2;
  const ratio = Math.sqrt(1 / normSquared);
  if (!Number.isFinite(ratio)) {
    return void 0;
  }
  const intersection = vectorScratch.copy(position).multiplyScalar(ratio);
  if (normSquared < (options?.centerTolerance ?? 0.1)) {
    return result.copy(intersection);
  }
  const gradient = intersection.multiply(reciprocalRadiiSquared).multiplyScalar(2);
  let lambda = (1 - ratio) * position.length() / (gradient.length() / 2);
  let correction = 0;
  let sx;
  let sy;
  let sz;
  let error;
  do {
    lambda -= correction;
    sx = 1 / (1 + lambda * rx);
    sy = 1 / (1 + lambda * ry);
    sz = 1 / (1 + lambda * rz);
    const sx2 = sx * sx;
    const sy2 = sy * sy;
    const sz2 = sz * sz;
    const sx3 = sx2 * sx;
    const sy3 = sy2 * sy;
    const sz3 = sz2 * sz;
    error = x2 * sx2 + y2 * sy2 + z2 * sz2 - 1;
    correction = error / ((x2 * sx3 * rx + y2 * sy3 * ry + z2 * sz3 * rz) * -2);
  } while (Math.abs(error) > 1e-12);
  return result.set(x * sx, y * sy, z * sz);
}

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/geospatial/Ellipsoid.ts
var vectorScratch1 = /* @__PURE__ */ new Vector32();
var vectorScratch2 = /* @__PURE__ */ new Vector32();
var vectorScratch3 = /* @__PURE__ */ new Vector32();
var Ellipsoid = class _Ellipsoid {
  static WGS84 = /* @__PURE__ */ new _Ellipsoid(
    6378137,
    6378137,
    6356752314245179e-9
  );
  radii;
  constructor(x, y, z) {
    this.radii = new Vector32(x, y, z);
  }
  get minimumRadius() {
    return Math.min(this.radii.x, this.radii.y, this.radii.z);
  }
  get maximumRadius() {
    return Math.max(this.radii.x, this.radii.y, this.radii.z);
  }
  reciprocalRadii(result = new Vector32()) {
    const { x, y, z } = this.radii;
    return result.set(1 / x, 1 / y, 1 / z);
  }
  reciprocalRadiiSquared(result = new Vector32()) {
    const { x, y, z } = this.radii;
    return result.set(1 / x ** 2, 1 / y ** 2, 1 / z ** 2);
  }
  projectOnSurface(position, result = new Vector32(), options) {
    return projectOnEllipsoidSurface(
      position,
      this.reciprocalRadiiSquared(),
      result,
      options
    );
  }
  getSurfaceNormal(position, result = new Vector32()) {
    return result.multiplyVectors(this.reciprocalRadiiSquared(vectorScratch1), position).normalize();
  }
  getEastNorthUpVectors(position, east = new Vector32(), north = new Vector32(), up = new Vector32()) {
    this.getSurfaceNormal(position, up);
    east.set(-position.y, position.x, 0).normalize();
    north.crossVectors(up, east).normalize();
  }
  getEastNorthUpFrame(position, result = new Matrix4()) {
    const east = vectorScratch1;
    const north = vectorScratch2;
    const up = vectorScratch3;
    this.getEastNorthUpVectors(position, east, north, up);
    return result.makeBasis(east, north, up).setPosition(position);
  }
  getIntersection(ray, result = new Vector32()) {
    const reciprocalRadii = this.reciprocalRadii(vectorScratch1);
    const p = vectorScratch2.copy(reciprocalRadii).multiply(ray.origin);
    const d = vectorScratch3.copy(reciprocalRadii).multiply(ray.direction);
    const p2 = p.lengthSq();
    const d2 = d.lengthSq();
    const pd = p.dot(d);
    const discriminant = pd ** 2 - d2 * (p2 - 1);
    if (p2 === 1) {
      return result.copy(ray.origin);
    }
    if (p2 > 1) {
      if (pd >= 0 || discriminant < 0) {
        return;
      }
      const Q = Math.sqrt(discriminant);
      const t1 = (-pd - Q) / d2;
      const t2 = (-pd + Q) / d2;
      return ray.at(Math.min(t1, t2), result);
    }
    if (p2 < 1) {
      const discriminant2 = pd ** 2 - d2 * (p2 - 1);
      const Q = Math.sqrt(discriminant2);
      const t = (-pd + Q) / d2;
      return ray.at(t, result);
    }
    if (pd < 0) {
      return ray.at(-pd / d2, result);
    }
  }
  getOsculatingSphereCenter(surfacePosition, radius, result = new Vector32()) {
    invariant(this.radii.x === this.radii.y);
    const a2 = this.radii.x ** 2;
    const b2 = this.radii.z ** 2;
    const normal = vectorScratch1.set(
      surfacePosition.x / a2,
      surfacePosition.y / a2,
      surfacePosition.z / b2
    ).normalize();
    return result.copy(normal.multiplyScalar(-radius).add(surfacePosition));
  }
  getNormalAtHorizon(position, direction, result = new Vector32()) {
    invariant(this.radii.x === this.radii.y);
    const a2 = this.radii.x ** 2;
    const b2 = this.radii.z ** 2;
    const p = position;
    const v = direction;
    let t = (p.x * v.x + p.y * v.y) / a2 + p.z * v.z / b2;
    t /= (p.x ** 2 + p.y ** 2) / a2 + p.z ** 2 / b2;
    const q = vectorScratch1.copy(v).multiplyScalar(-t).add(position);
    return result.set(q.x / a2, q.y / a2, q.z / b2).normalize();
  }
};

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/geospatial/math.ts
import { MathUtils } from "https://esm.sh/three@0.185.1?external";
var clamp = MathUtils.clamp;
var euclideanModulo = MathUtils.euclideanModulo;
var inverseLerp = MathUtils.inverseLerp;
var lerp = MathUtils.lerp;
var radians = MathUtils.degToRad;
var degrees = MathUtils.radToDeg;
var isPowerOfTwo = MathUtils.isPowerOfTwo;
var ceilPowerOfTwo = MathUtils.ceilPowerOfTwo;
var floorPowerOfTwo = MathUtils.floorPowerOfTwo;
var normalize = MathUtils.normalize;

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/geospatial/PointOfView.ts
var EPSILON = 1e-6;
var eastScratch = /* @__PURE__ */ new Vector33();
var northScratch = /* @__PURE__ */ new Vector33();
var upScratch = /* @__PURE__ */ new Vector33();
var vectorScratch12 = /* @__PURE__ */ new Vector33();
var vectorScratch22 = /* @__PURE__ */ new Vector33();
var vectorScratch32 = /* @__PURE__ */ new Vector33();
var matrixScratch = /* @__PURE__ */ new Matrix42();
var quaternionScratch = /* @__PURE__ */ new Quaternion();
var rayScratch = /* @__PURE__ */ new Ray();
var PointOfView = class _PointOfView {
  // Distance from the target.
  _distance;
  // Radians from the local east direction relative from true north, measured
  // clockwise (90 degrees is true north, and -90 is true south).
  heading;
  // Radians from the local horizon plane, measured with positive values looking
  // up (90 degrees is straight up, -90 is straight down).
  _pitch;
  roll;
  constructor(distance = 0, heading = 0, pitch = 0, roll = 0) {
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
    return new _PointOfView(this.distance, this.heading, this.pitch, this.roll);
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
    const offset = vectorScratch12.copy(eastScratch).multiplyScalar(Math.cos(this.heading)).add(
      vectorScratch22.copy(northScratch).multiplyScalar(Math.sin(this.heading))
    ).multiplyScalar(Math.cos(this.pitch)).add(vectorScratch22.copy(upScratch).multiplyScalar(Math.sin(this.pitch))).normalize().multiplyScalar(this.distance);
    eye.copy(target).sub(offset);
    if (this.roll !== 0) {
      const rollAxis = vectorScratch12.copy(target).sub(eye).normalize();
      upScratch.applyQuaternion(
        quaternionScratch.setFromAxisAngle(rollAxis, this.roll)
      );
    }
    quaternion.setFromRotationMatrix(
      matrixScratch.lookAt(eye, target, upScratch)
    );
  }
  setFromCamera(camera, ellipsoid = Ellipsoid.WGS84) {
    const eye = vectorScratch12.setFromMatrixPosition(camera.matrixWorld);
    const direction = vectorScratch22.set(0, 0, 0.5).unproject(camera).sub(eye).normalize();
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
    const up = vectorScratch12.copy(camera.up).applyQuaternion(camera.quaternion);
    const s = vectorScratch32.copy(direction).multiplyScalar(-up.dot(direction)).add(up).normalize();
    const t = vectorScratch12.copy(direction).multiplyScalar(-upScratch.dot(direction)).add(upScratch).normalize();
    const x = t.dot(s);
    const y = direction.dot(t.cross(s));
    this.roll = Math.atan2(y, x);
    return this;
  }
};
export {
  PointOfView
};
