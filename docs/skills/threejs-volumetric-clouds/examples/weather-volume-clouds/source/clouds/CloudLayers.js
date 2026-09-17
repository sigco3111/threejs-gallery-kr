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

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/CloudLayer.ts
var paramKeys = [
  "channel",
  "altitude",
  "height",
  "densityScale",
  "shapeAmount",
  "shapeDetailAmount",
  "weatherExponent",
  "shapeAlteringBias",
  "coverageFilterWidth",
  "shadow",
  "densityProfile"
];
function applyOptions(target, params) {
  if (params == null) {
    return;
  }
  for (const key of paramKeys) {
    const value = params[key];
    if (value == null) {
      continue;
    }
    if (target[key] instanceof DensityProfile) {
      target[key].copy(value);
    } else {
      ;
      target[key] = value;
    }
  }
}
var CloudLayer = class _CloudLayer {
  static DEFAULT = /* @__PURE__ */ new _CloudLayer();
  channel = "r";
  altitude = 0;
  height = 0;
  densityScale = 0.2;
  shapeAmount = 1;
  shapeDetailAmount = 1;
  weatherExponent = 1;
  shapeAlteringBias = 0.35;
  coverageFilterWidth = 0.6;
  densityProfile = new DensityProfile(0, 0, 0.75, 0.25);
  shadow = false;
  constructor(options) {
    this.set(options);
  }
  set(options) {
    applyOptions(this, options);
    return this;
  }
  clone() {
    return new _CloudLayer(this);
  }
  copy(other) {
    this.channel = other.channel;
    this.altitude = other.altitude;
    this.height = other.height;
    this.densityScale = other.densityScale;
    this.shapeAmount = other.shapeAmount;
    this.shapeDetailAmount = other.shapeDetailAmount;
    this.weatherExponent = other.weatherExponent;
    this.shapeAlteringBias = other.shapeAlteringBias;
    this.coverageFilterWidth = other.coverageFilterWidth;
    this.densityProfile.copy(other.densityProfile);
    this.shadow = other.shadow;
    return this;
  }
};

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/CloudLayers.ts
var entriesScratch = /* @__PURE__ */ Array.from(
  { length: 8 },
  () => ({ value: 0, flag: 0 })
);
var intervalsScratch = /* @__PURE__ */ Array.from(
  { length: 3 },
  () => ({ min: 0, max: 0 })
);
function compareEntries(a, b) {
  return a.value !== b.value ? a.value - b.value : a.flag - b.flag;
}
var CloudLayers = class _CloudLayers extends Array {
  static DEFAULT = /* @__PURE__ */ new _CloudLayers([
    {
      channel: "r",
      altitude: 750,
      height: 650,
      densityScale: 0.2,
      shapeAmount: 1,
      shapeDetailAmount: 1,
      weatherExponent: 1,
      shapeAlteringBias: 0.35,
      coverageFilterWidth: 0.6,
      shadow: true
    },
    {
      channel: "g",
      altitude: 1e3,
      height: 1200,
      densityScale: 0.2,
      shapeAmount: 1,
      shapeDetailAmount: 1,
      weatherExponent: 1,
      shapeAlteringBias: 0.35,
      coverageFilterWidth: 0.6,
      shadow: true
    },
    {
      channel: "b",
      altitude: 7500,
      height: 500,
      densityScale: 3e-3,
      shapeAmount: 0.4,
      shapeDetailAmount: 0,
      weatherExponent: 1,
      shapeAlteringBias: 0.35,
      coverageFilterWidth: 0.5
    },
    { channel: "a" }
  ]);
  constructor(options) {
    super(
      new CloudLayer(options?.[0]),
      new CloudLayer(options?.[1]),
      new CloudLayer(options?.[2]),
      new CloudLayer(options?.[3])
    );
  }
  set(options) {
    this[0].set(options?.[0]);
    this[1].set(options?.[1]);
    this[2].set(options?.[2]);
    this[3].set(options?.[3]);
    return this;
  }
  reset() {
    this[0].copy(CloudLayer.DEFAULT);
    this[1].copy(CloudLayer.DEFAULT);
    this[2].copy(CloudLayer.DEFAULT);
    this[3].copy(CloudLayer.DEFAULT);
    return this;
  }
  clone() {
    return new _CloudLayers(this);
  }
  copy(other) {
    this[0].copy(other[0]);
    this[1].copy(other[1]);
    this[2].copy(other[2]);
    this[3].copy(other[3]);
    return this;
  }
  get localWeatherChannels() {
    return this[0].channel + this[1].channel + this[2].channel + this[3].channel;
  }
  packValues(key, result) {
    return result.set(this[0][key], this[1][key], this[2][key], this[3][key]);
  }
  packSums(a, b, result) {
    return result.set(
      this[0][a] + this[0][b],
      this[1][a] + this[1][b],
      this[2][a] + this[2][b],
      this[3][a] + this[3][b]
    );
  }
  packDensityProfiles(key, result) {
    return result.set(
      this[0].densityProfile[key],
      this[1].densityProfile[key],
      this[2].densityProfile[key],
      this[3].densityProfile[key]
    );
  }
  // Redundant, but need to avoid creating garbage here as this runs every frame.
  packIntervalHeights(minIntervals, maxIntervals) {
    for (let i = 0; i < 4; ++i) {
      const layer = this[i];
      let entry = entriesScratch[i];
      entry.value = layer.altitude;
      entry.flag = 0;
      entry = entriesScratch[i + 4];
      entry.value = layer.altitude + layer.height;
      entry.flag = 1;
    }
    entriesScratch.sort(compareEntries);
    let intervalIndex = 0;
    let balance = 0;
    for (let entryIndex = 0; entryIndex < entriesScratch.length; ++entryIndex) {
      const { value, flag } = entriesScratch[entryIndex];
      if (balance === 0 && entryIndex > 0) {
        const interval2 = intervalsScratch[intervalIndex++];
        interval2.min = entriesScratch[entryIndex - 1].value;
        interval2.max = value;
      }
      balance += flag === 0 ? 1 : -1;
    }
    for (; intervalIndex < 3; ++intervalIndex) {
      const interval2 = intervalsScratch[intervalIndex];
      interval2.min = 0;
      interval2.max = 0;
    }
    let interval = intervalsScratch[0];
    minIntervals.x = interval.min;
    maxIntervals.x = interval.max;
    interval = intervalsScratch[1];
    minIntervals.y = interval.min;
    maxIntervals.y = interval.max;
    interval = intervalsScratch[2];
    minIntervals.z = interval.min;
    maxIntervals.z = interval.max;
  }
};
export {
  CloudLayers
};
