import { Vector2 } from "three";
import { Rectangle } from "./Rectangle";
import { TileCoordinate } from "./TileCoordinate";
const vectorScratch = /* @__PURE__ */ new Vector2();
class TilingScheme {
  constructor(width = 2, height = 1, rectangle = Rectangle.MAX) {
    this.width = width;
    this.height = height;
    this.rectangle = rectangle;
  }
  clone() {
    return new TilingScheme(this.width, this.height, this.rectangle.clone());
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
    const size = this.getSize(z, vectorScratch);
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
    const size = this.getSize(tile.z, vectorScratch);
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
}
export {
  TilingScheme
};
