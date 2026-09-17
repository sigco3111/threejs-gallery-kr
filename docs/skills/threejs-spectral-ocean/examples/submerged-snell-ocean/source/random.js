var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
function hashLabel(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = h << 13 | h >>> 19;
  }
  h = Math.imul(h ^ h >>> 16, 2246822507);
  h = Math.imul(h ^ h >>> 13, 3266489909);
  return (h ^ h >>> 16) >>> 0;
}
class Rng {
  constructor(seed) {
    __publicField(this, "seed");
    __publicField(this, "s");
    this.seed = seed >>> 0;
    this.s = this.seed === 0 ? 2654435769 : this.seed;
  }
  /** Uniform in [0, 1). splitmix32. */
  next() {
    this.s = this.s + 2654435769 >>> 0;
    let z = this.s;
    z = Math.imul(z ^ z >>> 16, 569420461);
    z = Math.imul(z ^ z >>> 15, 1935289751);
    z ^= z >>> 15;
    return (z >>> 0) / 4294967296;
  }
  range(min, max) {
    return min + (max - min) * this.next();
  }
  int(min, maxInclusive) {
    return Math.min(maxInclusive, Math.floor(this.range(min, maxInclusive + 1)));
  }
  pick(items) {
    return items[Math.min(items.length - 1, Math.floor(this.next() * items.length))];
  }
  chance(p) {
    return this.next() < p;
  }
  /** Gaussian-ish (sum of 3), mean 0, roughly unit spread. */
  spread() {
    return (this.next() + this.next() + this.next()) / 1.5 - 1;
  }
  /**
   * Independent deterministic stream. Forks derive from the root seed and the
   * label only — draw order elsewhere can never shift a fork's sequence.
   */
  fork(label) {
    return new Rng((hashLabel(label) ^ this.seed) >>> 0);
  }
}
export {
  Rng
};
