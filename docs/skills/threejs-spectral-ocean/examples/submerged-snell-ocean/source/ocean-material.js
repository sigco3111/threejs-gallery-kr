import { DoubleSide } from "three";
import { MeshBasicNodeMaterial } from "three/webgpu";
import {
  Fn,
  If,
  cameraProjectionMatrix,
  cameraProjectionMatrixInverse,
  cameraPosition,
  cameraViewMatrix,
  cameraWorldMatrix,
  dot,
  exp,
  float,
  getViewPosition,
  log2,
  max,
  min,
  mix,
  modelWorldMatrix,
  mrt,
  normalize,
  normalView,
  positionLocal,
  pow,
  reflect,
  refract,
  screenUV,
  smoothstep,
  step,
  varying,
  vec2,
  vec3,
  vec4
} from "three/tsl";
import { valueNoise2 } from "./noise";
import { skyRadiance } from "./sky-radiance";
import { sunColorUniform, sunDirectionUniform } from "./sun";
import { seabedRippleSlope } from "./seabed-surface";
import {
  AIR_IOR,
  AQUATIC_AMBIENT_DOWN,
  AQUATIC_AMBIENT_UP,
  AQUATIC_EXTINCTION,
  WATER_IOR
} from "./optical-constants";
import { createOceanFoam } from "./ocean-foam";
import { OCEAN_FLAT_EDGE_MARGIN } from "./ocean-skirt-geometry";
import { SEABED_DIRECT_SHARE } from "./seabed-radiance";
const PIXEL_ANGLE = 1e-3;
const DEEP = vec3(5e-3, 0.045, 0.09);
const SHALLOW = vec3(0.014, 0.13, 0.17);
const SSS_TINT = vec3(0.035, 0.2, 0.22);
function oceanOpticsDebugMode(pass) {
  switch (pass) {
    case "water-foam":
      return "foam";
    case "water-fresnel":
      return "fresnel";
    case "water-reflection":
      return "reflection";
    case "water-transmission":
      return "transmission";
    case "water-interface":
      return "interface";
    case "water-validity":
      return "validity";
    default:
      return "final";
  }
}
function createOceanSurfaceMaterial(sim, timeUniform, options) {
  const material = new MeshBasicNodeMaterial();
  material.side = DoubleSide;
  material.fog = false;
  material.transparent = true;
  material.depthWrite = true;
  material.forceSinglePass = true;
  material.mrtNode = mrt({ normal: vec4(normalView, 0) });
  const patch = sim.patchLengths;
  const cascadeCount = options.detailed ? 3 : 1;
  const baseWorld = modelWorldMatrix.mul(vec4(positionLocal, 1)).xyz;
  const xz = baseWorld.xz;
  const edgeHalf = options.edgeFadeHalfSize ?? 0;
  const edgeKeep = edgeHalf > 0 ? float(1).sub(
    smoothstep(
      edgeHalf - 170,
      edgeHalf - OCEAN_FLAT_EDGE_MARGIN,
      max(positionLocal.x.abs(), positionLocal.z.abs())
    )
  ) : float(0);
  const vertexDistance = cameraPosition.sub(baseWorld).length();
  const vertexGap = cameraPosition.y.abs().max(0.5);
  const vertexFootprint = vertexDistance.mul(vertexDistance).mul(PIXEL_ANGLE).div(vertexGap);
  const vertexKeeps = [
    // Match the above-water cascade-0 normal cutoff. Keeping coarse vertex
    // displacement to 18 m/pixel left sub-pixel triangle rows even after the
    // fragment normal and height response had flattened, producing both the
    // dark comb and the faint gray band at the inner-mesh transition.
    float(1).sub(smoothstep(2.5, 5.5, vertexFootprint)),
    float(1).sub(smoothstep(0.35, 1.2, vertexFootprint)),
    float(1).sub(smoothstep(0.1, 0.4, vertexFootprint))
  ];
  let displacement = sim.displacementNodes[0].sample(xz.div(patch[0])).xyz.mul(edgeKeep).mul(vertexKeeps[0]);
  for (let i = 1; i < cascadeCount; i++) {
    displacement = displacement.add(
      sim.displacementNodes[i].sample(xz.div(patch[i])).xyz.mul(edgeKeep).mul(vertexKeeps[i])
    );
  }
  const foamHistory = options.detailed ? sim.displacementNodes[0].sample(xz.div(patch[0])).w.min(
    sim.displacementNodes[1].sample(xz.div(patch[1])).w
  ) : float(1);
  material.positionNode = positionLocal.add(displacement);
  const vWorldXZ = varying(xz);
  const vHeight = varying(displacement.y);
  const vFoam = varying(foamHistory);
  const vWorld = varying(baseWorld.add(displacement));
  const vEdgeKeep = varying(edgeKeep);
  const vDistance = varying(
    cameraPosition.sub(baseWorld.add(displacement)).length()
  );
  const heightGap = cameraPosition.y.sub(vWorld.y).abs().max(0.5);
  const pixelFootprint = vDistance.mul(vDistance).mul(PIXEL_ANGLE).div(heightGap);
  const keepCascade0Above = float(1).sub(smoothstep(2.5, 5.5, pixelFootprint));
  const keepCascade1 = float(1).sub(smoothstep(0.35, 1.2, pixelFootprint));
  const keepCascade2 = float(1).sub(smoothstep(0.1, 0.4, pixelFootprint));
  const cascadeKeeps = [float(1), keepCascade1, keepCascade2];
  const derivativeSamples = [];
  for (let i = 0; i < cascadeCount; i++) {
    derivativeSamples.push(
      sim.derivativeNodes[i].sample(vWorldXZ.div(patch[i])).mul(vEdgeKeep).toVar()
    );
  }
  const derivative0 = derivativeSamples[0];
  let derivatives = derivative0;
  for (let i = 1; i < cascadeCount; i++) {
    derivatives = derivatives.add(
      derivativeSamples[i].mul(cascadeKeeps[i])
    );
  }
  const aboveDerivatives = derivatives.sub(
    derivative0.mul(float(1).sub(keepCascade0Above))
  );
  const slopeX = derivatives.x.div(max(0.18, derivatives.z.add(1)));
  const slopeZ = derivatives.y.div(max(0.18, derivatives.w.add(1)));
  const upNormal = normalize(vec3(slopeX.negate(), 1, slopeZ.negate()));
  const isAbove = float(1).sub(options.submerged);
  const sideSign = isAbove.mul(2).sub(1);
  const rawNormal = upNormal.mul(sideSign);
  const toCamera = cameraPosition.sub(vWorld);
  const viewDistance = toCamera.length();
  const viewDir = toCamera.div(viewDistance);
  const distanceFade = smoothstep(5, 16, pixelFootprint);
  const normal = normalize(mix(rawNormal, vec3(0, sideSign, 0), distanceFade));
  const sunDir = sunDirectionUniform;
  const aboveSlopeX = aboveDerivatives.x.div(max(0.18, aboveDerivatives.z.add(1)));
  const aboveSlopeZ = aboveDerivatives.y.div(max(0.18, aboveDerivatives.w.add(1)));
  let aboveNormal = normalize(
    vec3(aboveSlopeX.negate(), 1, aboveSlopeZ.negate())
  );
  if (options.detailed) {
    const detailUvA = vWorldXZ.mul(1.7).add(vec2(0.11, -0.07).mul(timeUniform));
    const detailUvB = vWorldXZ.mul(4.7).add(vec2(-0.19, 0.13).mul(timeUniform));
    const heightA = valueNoise2(detailUvA);
    const detailA = vec2(
      valueNoise2(detailUvA.add(vec2(0.12, 0))).sub(heightA),
      valueNoise2(detailUvA.add(vec2(0, 0.12))).sub(heightA)
    ).div(0.12);
    const heightB = valueNoise2(detailUvB);
    const detailB = vec2(
      valueNoise2(detailUvB.add(vec2(0.08, 0))).sub(heightB),
      valueNoise2(detailUvB.add(vec2(0, 0.08))).sub(heightB)
    ).div(0.08);
    const detailKeepA = float(1).sub(smoothstep(0.025, 0.12, pixelFootprint)).mul(vEdgeKeep);
    const detailKeepB = float(1).sub(smoothstep(8e-3, 0.035, pixelFootprint)).mul(vEdgeKeep);
    const capillarySlope = detailA.mul(detailKeepA).add(detailB.mul(detailKeepB).mul(0.35));
    aboveNormal = normalize(
      normal.add(vec3(capillarySlope.x, 0, capillarySlope.y).mul(0.045))
    );
  }
  const dielectricFresnel = (cosIncident, incidentIor, transmittedIor) => {
    const etaI = float(incidentIor);
    const etaT = float(transmittedIor);
    const etaRatio = etaI.div(etaT);
    const sinTransmitted2 = etaRatio.mul(etaRatio).mul(float(1).sub(cosIncident.mul(cosIncident)));
    const criticalWidth = sinTransmitted2.fwidth().mul(1.5).max(1e-3).min(0.05);
    const canTransmit = float(1).sub(
      smoothstep(
        float(1).sub(criticalWidth),
        float(1).add(criticalWidth),
        sinTransmitted2
      )
    );
    const cosTransmitted = float(1).sub(sinTransmitted2).max(0).sqrt();
    const rs = etaI.mul(cosIncident).sub(etaT.mul(cosTransmitted)).div(etaI.mul(cosIncident).add(etaT.mul(cosTransmitted)).max(1e-4));
    const rp = etaT.mul(cosIncident).sub(etaI.mul(cosTransmitted)).div(etaT.mul(cosIncident).add(etaI.mul(cosTransmitted)).max(1e-4));
    return vec3(
      rs.mul(rs).add(rp.mul(rp)).mul(0.5),
      canTransmit,
      cosTransmitted
    );
  };
  const incident = viewDir.negate();
  const aboveNoV = max(dot(viewDir, aboveNormal), 1e-3);
  const aboveFresnelResult = dielectricFresnel(aboveNoV, AIR_IOR, WATER_IOR);
  const aboveFresnel = aboveFresnelResult.x;
  const belowNoV = max(dot(viewDir, normal), 1e-3);
  const belowFresnelResult = dielectricFresnel(belowNoV, WATER_IOR, AIR_IOR);
  const interfaceFresnel = belowFresnelResult.x;
  const insideWindow = belowFresnelResult.y;
  const projectDirection = (direction) => {
    const view = cameraViewMatrix.mul(vec4(direction, 0)).xyz;
    const clip = cameraProjectionMatrix.mul(vec4(view, 1));
    const ndc = clip.xy.div(max(clip.w, 0.05));
    return vec2(ndc.x.mul(0.5).add(0.5), float(0.5).sub(ndc.y.mul(0.5)));
  };
  const sampleInterfaceStructure = (enabled, reconstructPath = false) => {
    const structures = options.interfaceStructures;
    if (!structures) return { sample: vec4(0), path: float(0) };
    const sample = Fn(() => {
      const result = vec4(0).toVar();
      If(enabled.greaterThan(1e-3), () => {
        const rawColor = structures.color.sample(screenUV);
        const geometryValidity = rawColor.a.mul(structures.active);
        If(geometryValidity.greaterThan(1e-3), () => {
          const sourceColor = rawColor.rgb.div(max(rawColor.a, 1e-3));
          result.assign(vec4(sourceColor, geometryValidity));
        });
      });
      return result;
    })();
    const path = reconstructPath ? Fn(() => {
      const result = float(0).toVar();
      If(enabled.greaterThan(1e-3), () => {
        const sourceDepth = structures.depth.sample(screenUV).r;
        const sourceView = getViewPosition(
          screenUV,
          sourceDepth,
          cameraProjectionMatrixInverse
        );
        const sourceWorld = cameraWorldMatrix.mul(vec4(sourceView, 1)).xyz;
        result.assign(sourceWorld.sub(vWorld).length().max(0.02));
      });
      return result;
    })() : float(0);
    return {
      sample,
      path
    };
  };
  const belowRefracted = refract(incident, normal, WATER_IOR / AIR_IOR);
  const belowSceneSample = vec4(0);
  const belowSceneValid = float(0);
  const belowStructure = options.interfaceStructures ? sampleInterfaceStructure(
    options.interfaceStructures.active.mul(options.submerged).mul(insideWindow)
  ) : { sample: vec4(0), path: float(0) };
  const belowStructureSample = belowStructure.sample;
  const belowStructureValid = max(belowStructureSample.a, 0);
  const aboveRefracted = refract(incident, aboveNormal, AIR_IOR / WATER_IOR);
  const aboveStructureEnabled = options.detailed ? isAbove.mul(step(0.03, float(1).sub(aboveFresnel))) : float(0);
  const aboveStructure = options.interfaceStructures ? sampleInterfaceStructure(
    options.interfaceStructures.active.mul(aboveStructureEnabled),
    true
  ) : { sample: vec4(0), path: float(0) };
  const aboveStructureSample = aboveStructure.sample;
  const aboveStructureContribution = max(aboveStructureSample.a, 0).clamp(0, 1);
  const reflectedDirection = reflect(incident, aboveNormal);
  const aboveHeight = vHeight.mul(keepCascade0Above);
  const heightMask = smoothstep(-1.7, 1.5, aboveHeight);
  const bodyBase = mix(DEEP, SHALLOW, heightMask);
  const crestLight = normalize(sunDir.negate().add(normal.mul(0.4)));
  const crestScatter = pow(max(dot(viewDir, crestLight), 0), 4.5).mul(1).mul(smoothstep(-0.1, 1.1, vHeight));
  const sunShadow = (options.sunShadow ? options.sunShadow(vWorld) : float(1)).clamp(0, 1);
  const noL = max(dot(aboveNormal, sunDir), 0);
  const fresnelF0 = float(((AIR_IOR - WATER_IOR) / (AIR_IOR + WATER_IOR)) ** 2);
  const aboveCrestLight = normalize(sunDir.negate().add(aboveNormal.mul(0.4)));
  const aboveCrestScatter = pow(max(dot(viewDir, aboveCrestLight), 0), 4.5).mul(smoothstep(-0.1, 1.1, aboveHeight));
  const forwardScatter = pow(max(dot(viewDir, sunDir.negate()), 0), 4).mul(smoothstep(-0.15, 0.9, aboveHeight)).mul(float(1).sub(aboveFresnel)).mul(0.32);
  const scatterLight = noL.mul(0.5).add(0.5);
  const surfaceScatter = SSS_TINT.mul(aboveCrestScatter.add(forwardScatter)).mul(scatterLight).mul(sunShadow);
  const body = bodyBase.add(surfaceScatter);
  const skyReflection = skyRadiance(reflectedDirection, float(0));
  const reflection = options.reflection;
  const reflectedRadiance = reflection ? Fn(() => {
    const result = skyReflection.toVar();
    If(isAbove.mul(reflection.active).greaterThan(1e-3), () => {
      const flatReflected = reflect(incident, vec3(0, 1, 0));
      const waveOffset = projectDirection(reflectedDirection).sub(
        projectDirection(flatReflected)
      );
      const boundedOffset = waveOffset.mul(
        min(float(1), float(0.05).div(waveOffset.length().max(1e-5)))
      );
      const mirroredUv = vec2(
        screenUV.x.oneMinus().sub(boundedOffset.x),
        screenUV.y.add(boundedOffset.y)
      ).clamp(vec2(1e-3), vec2(0.999));
      const raw = reflection.color.sample(mirroredUv);
      const coverage = raw.a.clamp(0, 1);
      If(coverage.greaterThan(1e-3), () => {
        result.assign(
          mix(skyReflection, raw.rgb.div(max(raw.a, 1e-3)), coverage)
        );
      });
    });
    return result;
  })() : skyReflection;
  const undersea = options.undersea;
  const seabedHeight = options.seabedHeight;
  const transmittedRadiance = undersea && seabedHeight ? Fn(() => {
    const result = body.toVar();
    If(isAbove.greaterThan(1e-3), () => {
      const downSlope = aboveRefracted.y.min(-0.3);
      const firstPath = undersea.canopyHeight(vWorldXZ).sub(vWorld.y).div(downSlope).clamp(0.5, 300);
      const midLandingXZ = vWorldXZ.add(aboveRefracted.xz.mul(firstPath));
      const canopyPath = undersea.canopyHeight(midLandingXZ).sub(vWorld.y).div(downSlope).clamp(0.5, 320).toVar();
      const landingXZ = vWorldXZ.add(aboveRefracted.xz.mul(canopyPath));
      const canopyY = undersea.canopyHeight(landingXZ).toVar();
      const landingFootprint = float(PIXEL_ANGLE).mul(vDistance.add(canopyPath.mul(AIR_IOR / WATER_IOR))).div(downSlope.negate());
      const landingLod = log2(
        max(landingFootprint.div(undersea.texelSize), 1)
      ).clamp(0, 11);
      const isSand = float(1).sub(
        smoothstep(0.4, 1.4, canopyY.sub(seabedHeight(landingXZ)))
      );
      const rippleSlope = seabedRippleSlope(landingXZ, landingFootprint);
      const rippleNormal = normalize(vec3(rippleSlope.x, 1, rippleSlope.y));
      const rippleRatio = mix(
        float(1),
        max(dot(rippleNormal, sunDir), 0).div(max(sunDir.y, 0.05)),
        isSand
      );
      const restoredDetail = mix(float(1), rippleRatio, SEABED_DIRECT_SHARE);
      const structureShare = aboveStructureContribution;
      const bottomColor = mix(
        undersea.radiance(landingXZ, landingLod).mul(restoredDetail),
        aboveStructureSample.rgb,
        structureShare
      );
      const waterPath = mix(
        canopyPath,
        aboveStructure.path.clamp(0.05, 3500),
        structureShare
      );
      const aquaticTransmittance = exp(
        vec3(...AQUATIC_EXTINCTION).mul(waterPath).negate()
      );
      const sourceVerticalDepth = waterPath.mul(aboveRefracted.y.negate().max(0));
      const downwellingPath = sourceVerticalDepth.div(max(sunDir.y, 0.15));
      const downwellingTransmittance = exp(
        vec3(...AQUATIC_EXTINCTION).mul(downwellingPath).negate()
      );
      const sourceLightingFilter = mix(vec3(1), downwellingTransmittance, 0.82);
      const transmittedMidpointY = vWorld.y.add(
        aboveRefracted.y.mul(waterPath.mul(0.5))
      );
      const transmittedDepthDim = exp(transmittedMidpointY.min(0).mul(0.03));
      const transmittedUpness = smoothstep(-0.5, 0.75, aboveRefracted.y);
      const transmittedSunward = pow(
        max(dot(aboveRefracted, sunDir), 0),
        6
      ).mul(0.06).mul(sunShadow);
      const aquaticInscatter = mix(
        vec3(...AQUATIC_AMBIENT_DOWN),
        vec3(...AQUATIC_AMBIENT_UP),
        transmittedUpness
      ).mul(transmittedDepthDim).mul(heightMask.mul(0.55).add(1)).add(sunColorUniform.mul(transmittedSunward));
      const foggedTransmission = bottomColor.mul(sourceLightingFilter).mul(aquaticTransmittance).add(aquaticInscatter.mul(float(1).sub(aquaticTransmittance.g)));
      const transportKeep = float(1).sub(distanceFade).mul(vEdgeKeep);
      result.assign(
        mix(
          body,
          foggedTransmission.add(surfaceScatter.mul(0.45)),
          transportKeep
        )
      );
    });
    return result;
  })() : body;
  const halfVector = normalize(sunDir.add(viewDir));
  const noH = max(dot(aboveNormal, halfVector), 0);
  const voH = max(dot(viewDir, halfVector), 0);
  const roughness = float(0.075);
  const alpha2 = roughness.mul(roughness);
  const distributionDenominator = noH.mul(noH).mul(alpha2.sub(1)).add(1);
  const distribution = alpha2.div(
    distributionDenominator.mul(distributionDenominator).mul(Math.PI)
  );
  const smithK = roughness.add(1).mul(roughness.add(1)).div(8);
  const geometryV = aboveNoV.div(aboveNoV.mul(float(1).sub(smithK)).add(smithK));
  const geometryL = noL.div(noL.mul(float(1).sub(smithK)).add(smithK).max(1e-4));
  const microFresnel = fresnelF0.add(
    float(1).sub(fresnelF0).mul(pow(float(1).sub(voH), 5))
  );
  const directSpecular = distribution.mul(geometryV).mul(geometryL).mul(microFresnel).mul(noL).div(max(aboveNoV.mul(noL).mul(4), 0.02));
  const sunGlint = sunColorUniform.mul(directSpecular).mul(3.4).mul(sunShadow);
  let above = mix(transmittedRadiance, reflectedRadiance, aboveFresnel).add(sunGlint);
  let foamDebug = vec3(0);
  if (options.detailed) {
    const foam = createOceanFoam({
      sea: sim.sea,
      time: timeUniform,
      worldXZ: vWorldXZ,
      jacobianHistory: vFoam,
      crestHeight: aboveHeight,
      steepness: vec2(aboveSlopeX, aboveSlopeZ).length(),
      convergence: aboveDerivatives.z.add(aboveDerivatives.w).negate(),
      pixelFootprint,
      edgeKeep: vEdgeKeep,
      normal: aboveNormal,
      viewDir,
      waterRadiance: above,
      sunShadow,
      wakeFoam: options.wakeFoam
    });
    foamDebug = foam.debug;
    above = mix(above, foam.color, foam.mask);
  }
  const skyThrough = skyRadiance(belowRefracted, float(0)).mul(0.9);
  const snellAngularStretch = float(WATER_IOR / AIR_IOR).mul(belowNoV).div(belowFresnelResult.z.max(0.04)).max(1);
  const normalTiltPerPixel = max(normal.dFdx().length(), normal.dFdy().length());
  const transmittedSpread = snellAngularStretch.sub(1).mul(normalTiltPerPixel).mul(0.5);
  const glintExponent = float(1).div(
    float(1 / 700).add(transmittedSpread.mul(transmittedSpread))
  );
  const windowGlint = pow(max(dot(belowRefracted, sunDir), 0), glintExponent).mul(glintExponent.mul(24 / 700)).mul(sunColorUniform);
  const belowStructureContribution = belowStructureValid.clamp(0, 1);
  const aboveWaterStructure = max(
    belowSceneValid,
    belowStructureContribution
  ).clamp(0, 1);
  const belowTransmissionSource = mix(
    belowSceneSample.rgb,
    belowStructureSample.rgb,
    belowStructureContribution
  );
  const transmittedScene = mix(
    skyThrough.add(windowGlint),
    belowTransmissionSource,
    aboveWaterStructure
  );
  const interfaceTransmission = insideWindow.mul(float(1).sub(interfaceFresnel));
  const tirBody = vec3(0.035, 0.14, 0.19).add(SSS_TINT.mul(crestScatter).mul(0.5));
  const below = mix(tirBody, transmittedScene, interfaceTransmission);
  const debugMode = options.debugMode ?? "final";
  let finalColor = mix(below, above, isAbove);
  if (debugMode === "fresnel") {
    finalColor = vec3(mix(interfaceFresnel, aboveFresnel, isAbove));
  } else if (debugMode === "reflection") {
    finalColor = mix(tirBody, reflectedRadiance, isAbove);
  } else if (debugMode === "transmission") {
    finalColor = mix(transmittedScene, transmittedRadiance, isAbove);
  } else if (debugMode === "interface") {
    const aboveInterface = aboveStructureSample.rgb.mul(aboveStructureContribution);
    const belowInterface = belowStructureSample.rgb.mul(belowStructureContribution);
    finalColor = mix(belowInterface, aboveInterface, isAbove);
  } else if (debugMode === "foam") {
    finalColor = foamDebug.mul(isAbove);
  } else if (debugMode === "validity") {
    const aboveValidity = vec3(
      reflection ? reflection.active : float(0),
      undersea ? float(1) : float(0),
      aboveStructureContribution
    );
    const belowValidity = vec3(
      belowSceneValid,
      belowStructureContribution,
      insideWindow
    );
    finalColor = mix(belowValidity, aboveValidity, isAbove);
  }
  material.colorNode = vec4(finalColor, 1);
  return material;
}
export {
  createOceanSurfaceMaterial,
  oceanOpticsDebugMode
};
