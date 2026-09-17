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
export {
  TileCoordinate
};
