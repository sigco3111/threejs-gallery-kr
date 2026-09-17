function safeSqrt(a) {
  return Math.sqrt(Math.max(a, 0));
}
function clampDistance(d) {
  return Math.max(d, 0);
}
function rayIntersectsGround(atmosphere, r, mu) {
  const { bottomRadius } = atmosphere;
  return mu < 0 && r ** 2 * (mu ** 2 - 1) + bottomRadius ** 2 >= 0;
}
function distanceToTopAtmosphereBoundary(atmosphere, r, mu) {
  const { topRadius } = atmosphere;
  const discriminant = r ** 2 * (mu ** 2 - 1) + topRadius ** 2;
  return clampDistance(-r * mu + safeSqrt(discriminant));
}
function getTextureCoordFromUnitRange(x, textureSize) {
  return 0.5 / textureSize + x * (1 - 1 / textureSize);
}
export {
  clampDistance,
  distanceToTopAtmosphereBoundary,
  getTextureCoordFromUnitRange,
  rayIntersectsGround,
  safeSqrt
};
