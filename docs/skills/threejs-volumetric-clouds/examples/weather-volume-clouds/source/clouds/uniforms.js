// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/uniforms.ts
import {
  Uniform,
  Vector3,
  Vector4
} from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/vendor/tiny-invariant.ts
function invariant(condition, message) {
  if (condition) return;
  const provided = typeof message === "function" ? message() : message;
  throw new Error(provided != null ? `Invariant failed: ${provided}` : "Invariant failed");
}

// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/clouds/uniforms.ts
function createCloudParameterUniforms(instances) {
  return {
    // Participating medium
    scatteringCoefficient: new Uniform(1),
    absorptionCoefficient: new Uniform(0),
    // Weather and shape
    coverage: new Uniform(0.3),
    localWeatherTexture: new Uniform(instances.localWeatherTexture),
    localWeatherRepeat: new Uniform(instances.localWeatherRepeat),
    localWeatherOffset: new Uniform(instances.localWeatherOffset),
    shapeTexture: new Uniform(instances.shapeTexture),
    shapeRepeat: new Uniform(instances.shapeRepeat),
    shapeOffset: new Uniform(instances.shapeOffset),
    shapeDetailTexture: new Uniform(instances.shapeDetailTexture),
    shapeDetailRepeat: new Uniform(instances.shapeDetailRepeat),
    shapeDetailOffset: new Uniform(instances.shapeDetailOffset),
    turbulenceTexture: new Uniform(instances.turbulenceTexture),
    turbulenceRepeat: new Uniform(instances.turbulenceRepeat),
    turbulenceDisplacement: new Uniform(350)
  };
}
function createCloudLayerUniforms() {
  return {
    minLayerHeights: new Uniform(new Vector4()),
    maxLayerHeights: new Uniform(new Vector4()),
    minIntervalHeights: new Uniform(new Vector3()),
    maxIntervalHeights: new Uniform(new Vector3()),
    densityScales: new Uniform(new Vector4()),
    shapeAmounts: new Uniform(new Vector4()),
    shapeDetailAmounts: new Uniform(new Vector4()),
    weatherExponents: new Uniform(new Vector4()),
    shapeAlteringBiases: new Uniform(new Vector4()),
    coverageFilterWidths: new Uniform(new Vector4()),
    minHeight: new Uniform(0),
    maxHeight: new Uniform(0),
    shadowTopHeight: new Uniform(0),
    shadowBottomHeight: new Uniform(0),
    shadowLayerMask: new Uniform(new Vector4()),
    densityProfile: new Uniform({
      expTerms: new Vector4(),
      exponents: new Vector4(),
      linearTerms: new Vector4(),
      constantTerms: new Vector4()
    })
  };
}
var shadowLayerMask = [0, 0, 0, 0];
function updateCloudLayerUniforms(uniforms, layers) {
  layers.packValues("altitude", uniforms.minLayerHeights.value);
  layers.packSums("altitude", "height", uniforms.maxLayerHeights.value);
  layers.packIntervalHeights(
    uniforms.minIntervalHeights.value,
    uniforms.maxIntervalHeights.value
  );
  layers.packValues("densityScale", uniforms.densityScales.value);
  layers.packValues("shapeAmount", uniforms.shapeAmounts.value);
  layers.packValues("shapeDetailAmount", uniforms.shapeDetailAmounts.value);
  layers.packValues("weatherExponent", uniforms.weatherExponents.value);
  layers.packValues("shapeAlteringBias", uniforms.shapeAlteringBiases.value);
  layers.packValues("coverageFilterWidth", uniforms.coverageFilterWidths.value);
  const densityProfile = uniforms.densityProfile.value;
  layers.packDensityProfiles("expTerm", densityProfile.expTerms);
  layers.packDensityProfiles("exponent", densityProfile.exponents);
  layers.packDensityProfiles("linearTerm", densityProfile.linearTerms);
  layers.packDensityProfiles("constantTerm", densityProfile.constantTerms);
  let totalMinHeight = Infinity;
  let totalMaxHeight = 0;
  let shadowBottomHeight = Infinity;
  let shadowTopHeight = 0;
  shadowLayerMask.fill(0);
  for (let i = 0; i < layers.length; ++i) {
    const { altitude, height, shadow } = layers[i];
    const maxHeight = altitude + height;
    if (height > 0) {
      if (altitude < totalMinHeight) {
        totalMinHeight = altitude;
      }
      if (shadow && altitude < shadowBottomHeight) {
        shadowBottomHeight = altitude;
      }
      if (maxHeight > totalMaxHeight) {
        totalMaxHeight = maxHeight;
      }
      if (shadow && maxHeight > shadowTopHeight) {
        shadowTopHeight = maxHeight;
      }
    }
    shadowLayerMask[i] = shadow ? 1 : 0;
  }
  if (totalMinHeight !== Infinity) {
    uniforms.minHeight.value = totalMinHeight;
    uniforms.maxHeight.value = totalMaxHeight;
  } else {
    invariant(totalMaxHeight === 0);
    uniforms.minHeight.value = 0;
  }
  if (shadowBottomHeight !== Infinity) {
    uniforms.shadowBottomHeight.value = shadowBottomHeight;
    uniforms.shadowTopHeight.value = shadowTopHeight;
  } else {
    invariant(shadowTopHeight === 0);
    uniforms.shadowBottomHeight.value = 0;
  }
  uniforms.shadowLayerMask.value.fromArray(shadowLayerMask);
}
function createAtmosphereUniforms(atmosphere, instances) {
  return {
    bottomRadius: new Uniform(atmosphere.bottomRadius),
    topRadius: new Uniform(atmosphere.topRadius),
    ellipsoidCenter: new Uniform(instances.ellipsoidCenter),
    ellipsoidMatrix: new Uniform(instances.ellipsoidMatrix),
    inverseEllipsoidMatrix: new Uniform(instances.inverseEllipsoidMatrix),
    altitudeCorrection: new Uniform(instances.altitudeCorrection),
    sunDirection: new Uniform(instances.sunDirection)
  };
}
export {
  createAtmosphereUniforms,
  createCloudLayerUniforms,
  createCloudParameterUniforms,
  updateCloudLayerUniforms
};
