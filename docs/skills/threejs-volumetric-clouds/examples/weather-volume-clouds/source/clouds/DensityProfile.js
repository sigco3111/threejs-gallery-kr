// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/DensityProfile.ts
var DensityProfile = class _DensityProfile {
  constructor(expTerm = 0, exponent = 0, linearTerm = 0, constantTerm = 0) {
    this.expTerm = expTerm;
    this.exponent = exponent;
    this.linearTerm = linearTerm;
    this.constantTerm = constantTerm;
  }
  set(expTerm = 0, exponent = 0, linearTerm = 0, constantTerm = 0) {
    this.expTerm = expTerm;
    this.exponent = exponent;
    this.linearTerm = linearTerm;
    this.constantTerm = constantTerm;
    return this;
  }
  clone() {
    return new _DensityProfile(
      this.expTerm,
      this.exponent,
      this.linearTerm,
      this.constantTerm
    );
  }
  copy(other) {
    this.expTerm = other.expTerm;
    this.exponent = other.exponent;
    this.linearTerm = other.linearTerm;
    this.constantTerm = other.constantTerm;
    return this;
  }
};
export {
  DensityProfile
};
