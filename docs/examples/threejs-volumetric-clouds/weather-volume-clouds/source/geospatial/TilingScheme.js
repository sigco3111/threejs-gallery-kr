// docs/examples/threejs-volumetric-clouds/weather-volume-clouds/source/geospatial/TilingScheme.ts
import { Vector2 } from "https://esm.sh/three@0.185.1?external";

// docs/examples/threejs-volumetric-clouds/weather-volume-clouds/source/geospatial/Geodetic.ts
import { Vector3 as Vector33 } from "https://esm.sh/three@0.185.1?external";

// docs/examples/threejs-volumetric-clouds/weather-volume-clouds/source/geospatial/Ellipsoid.ts
import { Matrix4, Vector3 as Vector32 } from "https://esm.sh/three@0.185.1?external";

// docs/examples/threejs-volumetric-clouds/weather-volume-clouds/source/vendor/tiny-invariant.ts
function invariant(condition, message) {
  if (condition) return;
  const provided = typeof message === "function" ? message() : message;
  throw new Error(provided != null ? `Invariant failed: ${provided}` : "Invariant failed");
}

// docs/examples/threejs-volumetric-clouds/weather-volume-clouds/source/geospatial/helpers/projectOnEllipsoidSurface.ts
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

// docs/examples/threejs-volumetric-clouds/weather-volume-clouds/source/geospatial/Ellipsoid.ts
var vectorScratch1 = /* @__PURE__ */ new Vector32();
var vectorScratch2 = /* @__PURE__ */ new Vector32();
var vectorScratch3 = /* @__PURE__ */ new Vector32();
var Ellipsoid = class _Ellipsoid {
  static {
    this.WGS84 = /* @__PURE__ */ new _Ellipsoid(
      6378137,
      6378137,
      6356752314245179e-9
    );
  }
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

// docs/examples/threejs-volumetric-clouds/weather-volume-clouds/source/geospatial/Geodetic.ts
var vectorScratch12 = /* @__PURE__ */ new Vector33();
var vectorScratch22 = /* @__PURE__ */ new Vector33();
var Geodetic = class _Geodetic {
  constructor(longitude = 0, latitude = 0, height = 0) {
    this.longitude = longitude;
    this.latitude = latitude;
    this.height = height;
  }
  static {
    this.MIN_LONGITUDE = -Math.PI;
  }
  static {
    this.MAX_LONGITUDE = Math.PI;
  }
  static {
    this.MIN_LATITUDE = -Math.PI / 2;
  }
  static {
    this.MAX_LATITUDE = Math.PI / 2;
  }
  set(longitude, latitude, height) {
    this.longitude = longitude;
    this.latitude = latitude;
    if (height != null) {
      this.height = height;
    }
    return this;
  }
  clone() {
    return new _Geodetic(this.longitude, this.latitude, this.height);
  }
  copy(other) {
    this.longitude = other.longitude;
    this.latitude = other.latitude;
    this.height = other.height;
    return this;
  }
  equals(other) {
    return other.longitude === this.longitude && other.latitude === this.latitude && other.height === this.height;
  }
  setLongitude(value) {
    this.longitude = value;
    return this;
  }
  setLatitude(value) {
    this.latitude = value;
    return this;
  }
  setHeight(value) {
    this.height = value;
    return this;
  }
  normalize() {
    if (this.longitude < _Geodetic.MIN_LONGITUDE) {
      this.longitude += Math.PI * 2;
    }
    return this;
  }
  // See: https://en.wikipedia.org/wiki/Geographic_coordinate_conversion
  // Reference: https://github.com/CesiumGS/cesium/blob/1.122/packages/engine/Source/Core/Geodetic.js#L119
  setFromECEF(position, options) {
    const ellipsoid = options?.ellipsoid ?? Ellipsoid.WGS84;
    const reciprocalRadiiSquared = ellipsoid.reciprocalRadiiSquared(vectorScratch12);
    const projection = projectOnEllipsoidSurface(
      position,
      reciprocalRadiiSquared,
      vectorScratch22,
      options
    );
    if (projection == null) {
      throw new Error(
        `Could not project position to ellipsoid surface: ${position.toArray()}`
      );
    }
    const normal = vectorScratch12.multiplyVectors(projection, reciprocalRadiiSquared).normalize();
    this.longitude = Math.atan2(normal.y, normal.x);
    this.latitude = Math.asin(normal.z);
    const height = vectorScratch12.subVectors(position, projection);
    this.height = Math.sign(height.dot(position)) * height.length();
    return this;
  }
  // See: https://en.wikipedia.org/wiki/Geographic_coordinate_conversion
  // Reference: https://github.com/CesiumGS/cesium/blob/1.122/packages/engine/Source/Core/Cartesian3.js#L916
  toECEF(result = new Vector33(), options) {
    const ellipsoid = options?.ellipsoid ?? Ellipsoid.WGS84;
    const radiiSquared = vectorScratch12.multiplyVectors(
      ellipsoid.radii,
      ellipsoid.radii
    );
    const cosLatitude = Math.cos(this.latitude);
    const normal = vectorScratch22.set(
      cosLatitude * Math.cos(this.longitude),
      cosLatitude * Math.sin(this.longitude),
      Math.sin(this.latitude)
    ).normalize();
    result.multiplyVectors(radiiSquared, normal);
    return result.divideScalar(Math.sqrt(normal.dot(result))).add(normal.multiplyScalar(this.height));
  }
  fromArray(array, offset = 0) {
    this.longitude = array[offset];
    this.latitude = array[offset + 1];
    this.height = array[offset + 2];
    return this;
  }
  toArray(array = [], offset = 0) {
    array[offset] = this.longitude;
    array[offset + 1] = this.latitude;
    array[offset + 2] = this.height;
    return array;
  }
  *[Symbol.iterator]() {
    yield this.longitude;
    yield this.latitude;
    yield this.height;
  }
};

// docs/examples/threejs-volumetric-clouds/weather-volume-clouds/source/geospatial/Rectangle.ts
var Rectangle = class _Rectangle {
  constructor(west = 0, south = 0, east = 0, north = 0) {
    this.west = west;
    this.south = south;
    this.east = east;
    this.north = north;
  }
  static {
    this.MAX = /* @__PURE__ */ new _Rectangle(
      Geodetic.MIN_LONGITUDE,
      Geodetic.MIN_LATITUDE,
      Geodetic.MAX_LONGITUDE,
      Geodetic.MAX_LATITUDE
    );
  }
  get width() {
    let east = this.east;
    if (east < this.west) {
      east += Math.PI * 2;
    }
    return east - this.west;
  }
  get height() {
    return this.north - this.south;
  }
  set(west, south, east, north) {
    this.west = west;
    this.south = south;
    this.east = east;
    this.north = north;
    return this;
  }
  clone() {
    return new _Rectangle(this.west, this.south, this.east, this.north);
  }
  copy(other) {
    this.west = other.west;
    this.south = other.south;
    this.east = other.east;
    this.north = other.north;
    return this;
  }
  equals(other) {
    return other.west === this.west && other.south === this.south && other.east === this.east && other.north === this.north;
  }
  at(x, y, result = new Geodetic()) {
    return result.set(
      this.west + (this.east - this.west) * x,
      this.north + (this.south - this.north) * y
    );
  }
  fromArray(array, offset = 0) {
    this.west = array[offset];
    this.south = array[offset + 1];
    this.east = array[offset + 2];
    this.north = array[offset + 3];
    return this;
  }
  toArray(array = [], offset = 0) {
    array[offset] = this.west;
    array[offset + 1] = this.south;
    array[offset + 2] = this.east;
    array[offset + 3] = this.north;
    return array;
  }
  *[Symbol.iterator]() {
    yield this.west;
    yield this.south;
    yield this.east;
    yield this.north;
  }
};

// docs/examples/threejs-volumetric-clouds/weather-volume-clouds/source/geospatial/TileCoordinate.ts
function* traverseChildren(x, y, z, maxZ, result) {
  if (z >= maxZ) {
    return;
  }
  const divisor = 2 ** z;
  const nextZ = z + 1;
  const scale = 2 ** nextZ;
  const nextX = Math.floor(x / divisor * scale);
  const nextY = Math.floor(y / divisor * scale);
  const children = [
    [nextX, nextY, nextZ],
    [nextX + 1, nextY, nextZ],
    [nextX, nextY + 1, nextZ],
    [nextX + 1, nextY + 1, nextZ]
  ];
  if (nextZ < maxZ) {
    for (const child of children) {
      for (const coord of traverseChildren(...child, maxZ, result)) {
        yield coord;
      }
    }
  } else {
    for (const child of children) {
      yield (result ?? new TileCoordinate()).set(...child);
    }
  }
}
var TileCoordinate = class _TileCoordinate {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  set(x, y, z) {
    this.x = x;
    this.y = y;
    if (z != null) {
      this.z = z;
    }
    return this;
  }
  clone() {
    return new _TileCoordinate(this.x, this.y, this.z);
  }
  copy(other) {
    this.x = other.x;
    this.y = other.y;
    this.z = other.z;
    return this;
  }
  equals(other) {
    return other.x === this.x && other.y === this.y && other.z === this.z;
  }
  getParent(result = new _TileCoordinate()) {
    const divisor = 2 ** this.z;
    const x = this.x / divisor;
    const y = this.y / divisor;
    const z = this.z - 1;
    const scale = 2 ** z;
    return result.set(Math.floor(x * scale), Math.floor(y * scale), z);
  }
  *traverseChildren(depth, result) {
    const { x, y, z } = this;
    for (const coord of traverseChildren(x, y, z, z + depth, result)) {
      yield coord;
    }
  }
  fromArray(array, offset = 0) {
    this.x = array[offset];
    this.y = array[offset + 1];
    this.z = array[offset + 2];
    return this;
  }
  toArray(array = [], offset = 0) {
    array[offset] = this.x;
    array[offset + 1] = this.y;
    array[offset + 2] = this.z;
    return array;
  }
  *[Symbol.iterator]() {
    yield this.x;
    yield this.y;
    yield this.z;
  }
};

// docs/examples/threejs-volumetric-clouds/weather-volume-clouds/source/geospatial/TilingScheme.ts
var vectorScratch4 = /* @__PURE__ */ new Vector2();
var TilingScheme = class _TilingScheme {
  constructor(width = 2, height = 1, rectangle = Rectangle.MAX) {
    this.width = width;
    this.height = height;
    this.rectangle = rectangle;
  }
  clone() {
    return new _TilingScheme(this.width, this.height, this.rectangle.clone());
  }
  copy(other) {
    this.width = other.width;
    this.height = other.height;
    this.rectangle.copy(other.rectangle);
    return this;
  }
  getSize(z, result = new Vector2()) {
    return result.set(this.width << z, this.height << z);
  }
  // Reference: https://github.com/CesiumGS/cesium/blob/1.122/packages/engine/Source/Core/GeographicTilingScheme.js#L210
  getTile(geodetic, z, result = new TileCoordinate()) {
    const size = this.getSize(z, vectorScratch4);
    const { rectangle } = this;
    const width = rectangle.width / size.x;
    const height = rectangle.height / size.y;
    const { west, south, east } = rectangle;
    let longitude = geodetic.longitude;
    if (east < west) {
      longitude += Math.PI * 2;
    }
    let x = Math.floor((longitude - west) / width);
    if (x >= size.x) {
      x = size.x - 1;
    }
    let y = Math.floor((geodetic.latitude - south) / height);
    if (y >= size.y) {
      y = size.y - 1;
    }
    result.x = x;
    result.y = y;
    result.z = z;
    return result;
  }
  // Reference: https://github.com/CesiumGS/cesium/blob/1.122/packages/engine/Source/Core/GeographicTilingScheme.js#L169
  getRectangle(tile, result = new Rectangle()) {
    const size = this.getSize(tile.z, vectorScratch4);
    const { rectangle } = this;
    const width = rectangle.width / size.x;
    const height = rectangle.height / size.y;
    const { west, north } = rectangle;
    result.west = tile.x * width + west;
    result.east = (tile.x + 1) * width + west;
    result.north = north - (size.y - tile.y - 1) * height;
    result.south = north - (size.y - tile.y) * height;
    return result;
  }
};
export {
  TilingScheme
};
