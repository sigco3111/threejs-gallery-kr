// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/medium.ts
import {
  AdditiveBlending as AdditiveBlending2,
  AgXToneMapping,
  InstancedMesh as InstancedMesh2,
  NoToneMapping,
  SRGBColorSpace,
  TetrahedronGeometry
} from "https://esm.sh/three@0.185.1?external";
import {
  MeshBasicNodeMaterial as MeshBasicNodeMaterial2,
  RenderPipeline
} from "https://esm.sh/three@0.185.1?external/webgpu";
import {
  Fn as Fn3,
  If,
  Loop,
  cameraPosition,
  cameraProjectionMatrixInverse,
  cameraWorldMatrix,
  exp as exp2,
  exp2 as exp22,
  float as float3,
  fract,
  hash,
  instanceIndex as instanceIndex2,
  max as max2,
  mix as mix2,
  mrt,
  normalView,
  output,
  pass,
  positionGeometry as positionGeometry2,
  positionWorld,
  pow,
  renderOutput,
  screenUV as screenUV2,
  sin as sin2,
  smoothstep as smoothstep3,
  uniform as uniform4,
  vec2 as vec22,
  vec3 as vec33,
  vec4 as vec43
} from "https://esm.sh/three@0.185.1?external/tsl";
import { bloom } from "https://esm.sh/three@0.185.1?external/addons/tsl/display/BloomNode.js";

// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/caustics.ts
import {
  AdditiveBlending,
  Color as Color2,
  HalfFloatType,
  InstancedMesh,
  LinearFilter,
  OrthographicCamera,
  PlaneGeometry,
  RenderTarget,
  RepeatWrapping,
  Scene
} from "https://esm.sh/three@0.185.1?external";
import { MeshBasicNodeMaterial } from "https://esm.sh/three@0.185.1?external/webgpu";
import {
  Fn,
  dFdx,
  dFdy,
  exp,
  float,
  instanceIndex,
  max,
  mix,
  normalize,
  positionGeometry,
  refract,
  smoothstep,
  texture,
  uniform as uniform2,
  varying,
  vec2,
  vec3,
  vec4
} from "https://esm.sh/three@0.185.1?external/tsl";

// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/sun.ts
import { Color, Vector3 } from "https://esm.sh/three@0.185.1?external";
import { uniform } from "https://esm.sh/three@0.185.1?external/tsl";
var SUN_ELEVATION = 42 * Math.PI / 180;
var SUN_AZIMUTH = 215 * Math.PI / 180;
var sunDirection = new Vector3(
  Math.cos(SUN_ELEVATION) * Math.sin(SUN_AZIMUTH),
  Math.sin(SUN_ELEVATION),
  Math.cos(SUN_ELEVATION) * Math.cos(SUN_AZIMUTH)
).normalize();
var sunColor = new Color(1, 0.925, 0.79);
var sunDirectionUniform = uniform(sunDirection);
var sunColorUniform = uniform(sunColor);

// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/caustics.ts
var CAUSTIC_TILE = 17;
var CAUSTIC_FIELD_MEAN = 0.18;
var causticBakeNeutral = uniform2(0);
function causticWorldSample(causticsNode, options = {}) {
  return Fn(([worldPos]) => {
    const toSun = sunDirectionUniform;
    const up = toSun.y.max(0.2);
    const travel = worldPos.y.negate().div(up);
    const surfaceXZ = vec2(
      worldPos.x.add(toSun.x.mul(travel)),
      worldPos.z.add(toSun.z.mul(travel))
    );
    const uv = surfaceXZ.div(CAUSTIC_TILE);
    const spread = float(16e-4);
    const r = causticsNode.sample(uv).r;
    const g = causticsNode.sample(uv.add(vec2(spread, spread.negate()))).r;
    const b = causticsNode.sample(uv.add(vec2(spread.negate().mul(1.6), spread))).r;
    const depthFade = exp(worldPos.y.mul(0.055)).min(1);
    let field = mix(
      vec3(r, g, b),
      vec3(CAUSTIC_FIELD_MEAN),
      causticBakeNeutral
    );
    if (options.footprintFade) {
      const footprint = max(dFdx(surfaceXZ).length(), dFdy(surfaceXZ).length());
      const fade = smoothstep(0.06, 0.28, footprint);
      field = mix(field, vec3(CAUSTIC_FIELD_MEAN), fade);
    }
    return field.mul(depthFade);
  });
}

// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/current.ts
import { Fn as Fn2, cos, sin, vec3 as vec32 } from "https://esm.sh/three@0.185.1?external/tsl";
var currentFlow = /* @__PURE__ */ Fn2(([p, t]) => {
  const x = p.x.mul(0.05);
  const z = p.z.mul(0.05);
  const s1 = sin(x.add(t.mul(0.11))).mul(cos(z.mul(1.3).sub(t.mul(0.07))));
  const s2 = sin(z.mul(0.7).add(t.mul(0.05)).add(x.mul(0.4)));
  const s3 = cos(x.mul(1.7).sub(z.mul(0.6)).add(t.mul(0.09)));
  return vec32(
    s1.mul(0.5).add(s2.mul(0.2)),
    s3.mul(0.12),
    s2.mul(0.45).sub(s1.mul(0.15))
  );
});

// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/grade.ts
import {
  ClampToEdgeWrapping,
  Data3DTexture,
  LinearFilter as LinearFilter2,
  RGBAFormat,
  UnsignedByteType
} from "https://esm.sh/three@0.185.1?external";
import { lut3D } from "https://esm.sh/three@0.185.1?external/addons/tsl/display/Lut3DNode.js";
import {
  clamp,
  float as float2,
  screenUV,
  smoothstep as smoothstep2,
  texture3D,
  uniform as uniform3,
  vec4 as vec42
} from "https://esm.sh/three@0.185.1?external/tsl";
var asColor = (node) => node;
var LUT_SIZE = 32;
var gradeParams = {
  exposureEV: uniform3(0),
  lutIntensity: uniform3(1),
  vignette: uniform3(0.115)
};
var dreamLutTexture = createDreamLutTexture();
function dreamGrade(inputColor) {
  const input = clamp(asColor(inputColor), 0, 1);
  const graded = lut3D(
    input,
    texture3D(dreamLutTexture),
    LUT_SIZE,
    gradeParams.lutIntensity
  );
  const centered = screenUV.sub(0.5);
  const falloff = smoothstep2(0.38, 0.94, centered.length().mul(1.34));
  const vignetted = graded.rgb.mul(float2(1).sub(falloff.mul(gradeParams.vignette)));
  return vec42(vignetted.clamp(0, 1), float2(1));
}
function createDreamLutTexture() {
  const data = new Uint8Array(LUT_SIZE ** 3 * 4);
  let offset = 0;
  for (let b = 0; b < LUT_SIZE; b++) {
    for (let g = 0; g < LUT_SIZE; g++) {
      for (let r = 0; r < LUT_SIZE; r++) {
        const source = [
          r / (LUT_SIZE - 1),
          g / (LUT_SIZE - 1),
          b / (LUT_SIZE - 1)
        ];
        const graded = gradeSample(source);
        data[offset++] = Math.round(graded[0] * 255);
        data[offset++] = Math.round(graded[1] * 255);
        data[offset++] = Math.round(graded[2] * 255);
        data[offset++] = 255;
      }
    }
  }
  const texture3D2 = new Data3DTexture(data, LUT_SIZE, LUT_SIZE, LUT_SIZE);
  texture3D2.format = RGBAFormat;
  texture3D2.type = UnsignedByteType;
  texture3D2.minFilter = LinearFilter2;
  texture3D2.magFilter = LinearFilter2;
  texture3D2.wrapS = ClampToEdgeWrapping;
  texture3D2.wrapT = ClampToEdgeWrapping;
  texture3D2.wrapR = ClampToEdgeWrapping;
  texture3D2.generateMipmaps = false;
  texture3D2.needsUpdate = true;
  texture3D2.name = "dreamGrade32";
  return texture3D2;
}
function gradeSample(color) {
  const lift = [0.011, 0.026, 0.033];
  const gain = [1.042, 1.008, 0.972];
  const balanced = color.map((channel, index) => channel * gain[index] + lift[index] * (1 - channel));
  const luminance = balanced[0] * 0.2126 + balanced[1] * 0.7152 + balanced[2] * 0.0722;
  const saturation = Math.max(...balanced) - Math.min(...balanced);
  const vibrance = 1 + 0.17 * (1 - saturation);
  return balanced.map((channel) => clampCpu(luminance + (channel - luminance) * vibrance));
}
function clampCpu(value) {
  return Math.max(0, Math.min(1, value));
}

// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/optical-constants.ts
var AQUATIC_EXTINCTION = [0.026, 85e-4, 5e-3];
var AQUATIC_AMBIENT_DOWN = [0.01, 0.075, 0.14];
var AQUATIC_AMBIENT_UP = [0.1, 0.32, 0.37];

// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/medium.ts
var SIGMA = vec33(...AQUATIC_EXTINCTION);
var AMBIENT_DOWN = vec33(...AQUATIC_AMBIENT_DOWN);
var AMBIENT_UP = vec33(...AQUATIC_AMBIENT_UP);
var seabedShadowCaptureKeep = uniform4(1);
var underwaterDebugModes = /* @__PURE__ */ new Map([
  ["final", 0],
  ["no-medium", 1],
  ["fog", 2],
  ["god-rays", 3],
  ["caustics", 4],
  ["depth", 5]
]);
var UnderwaterMediumPipeline = class {
  scenePass;
  /** 0 = open sea, 1 = deep inside an enclosed interior: kills fog glow + rays. */
  interior = uniform4(0);
  pipeline;
  debugMode = uniform4(0);
  timeUniform = uniform4(0);
  particulates;
  scene;
  causticSampler;
  constructor(renderer, scene, camera, caustics, options = {}) {
    this.scene = scene;
    renderer.toneMapping = NoToneMapping;
    const godraySteps = options.godraySteps ?? 14;
    const submerged = options.submerged ?? uniform4(1);
    const raySampler = causticWorldSample(caustics.textureNode);
    this.causticSampler = causticWorldSample(caustics.textureNode, { footprintFade: true });
    const scenePass = pass(scene, camera, { samples: 4 });
    scenePass.setMRT(mrt({ output, normal: vec43(normalView, 1) }));
    this.scenePass = scenePass;
    const sceneColor = scenePass.getTextureNode("output");
    const viewZ = scenePass.getViewZNode();
    const foggedNode = Fn3(() => {
      const dist = viewZ.negate().min(3500).toVar();
      const ndc = vec22(screenUV2.x.mul(2).sub(1), float3(1).sub(screenUV2.y).mul(2).sub(1));
      const far4 = cameraProjectionMatrixInverse.mul(vec43(ndc, 1, 1));
      const farView = far4.xyz.div(far4.w);
      const viewPos = farView.mul(viewZ.div(farView.z));
      const worldPos = cameraWorldMatrix.mul(vec43(viewPos, 1)).xyz;
      const rayDir = worldPos.sub(cameraPosition).div(max2(dist, 1e-4));
      const transmittance = exp2(SIGMA.mul(dist).negate());
      const upness = smoothstep3(-0.5, 0.75, rayDir.y);
      const cameraDim = exp2(cameraPosition.y.min(0).mul(0.03));
      const sunward = pow(max2(rayDir.dot(sunDirectionUniform), 0), 6).mul(0.06);
      const interiorKeep = float3(1).sub(this.interior.mul(0.94));
      const inscatter = mix2(AMBIENT_DOWN, AMBIENT_UP, upness).mul(cameraDim).add(sunColorUniform.mul(sunward)).mul(interiorKeep);
      const fogged = sceneColor.rgb.mul(transmittance).add(inscatter.mul(float3(1).sub(transmittance.g)));
      return vec43(mix2(sceneColor.rgb, fogged, submerged), 1);
    })();
    const resolvedRays = Fn3(() => {
      const dist = viewZ.negate().min(3500).toVar();
      const ndc = vec22(screenUV2.x.mul(2).sub(1), float3(1).sub(screenUV2.y).mul(2).sub(1));
      const far4 = cameraProjectionMatrixInverse.mul(vec43(ndc, 1, 1));
      const farView = far4.xyz.div(far4.w);
      const viewPos = farView.mul(viewZ.div(farView.z));
      const worldPos = cameraWorldMatrix.mul(vec43(viewPos, 1)).xyz;
      const rayDir = worldPos.sub(cameraPosition).div(max2(dist, 1e-4));
      const marchLength = dist.min(85);
      const stepLength = marchLength.div(godraySteps);
      const jitter = fract(
        sin2(screenUV2.x.mul(1741.37).add(screenUV2.y.mul(921.13))).mul(43758.55)
      );
      const shaft = float3(0).toVar();
      If(submerged.greaterThan(1e-3), () => {
        Loop({ start: 0, end: godraySteps }, (loopVars) => {
          const i = loopVars.i;
          const t = stepLength.mul(float3(i).add(jitter));
          const samplePos = cameraPosition.add(rayDir.mul(t));
          const light = raySampler(samplePos).g;
          shaft.addAssign(light.mul(exp2(t.mul(-0.03))));
        });
      });
      const interiorKeep = float3(1).sub(this.interior.mul(0.94));
      const rays = sunColorUniform.mul(shaft.mul(stepLength).mul(7e-3)).mul(interiorKeep).mul(submerged);
      return rays;
    })();
    const withMedium = vec43(foggedNode.rgb.add(resolvedRays), 1);
    const bloomNode = bloom(withMedium, 0.35, 0.55, 1);
    const hdr = withMedium.add(bloomNode);
    const exposed = hdr.mul(exp22(gradeParams.exposureEV));
    const mapped = renderOutput(exposed, AgXToneMapping, SRGBColorSpace);
    const graded = dreamGrade(mapped);
    const rawMapped = renderOutput(sceneColor, AgXToneMapping, SRGBColorSpace);
    const fogMapped = renderOutput(foggedNode, AgXToneMapping, SRGBColorSpace);
    const raysMapped = renderOutput(vec43(resolvedRays, 1), AgXToneMapping, SRGBColorSpace);
    const causticsMapped = renderOutput(
      vec43(caustics.textureNode.rgb, 1),
      AgXToneMapping,
      SRGBColorSpace
    );
    const depthMapped = vec43(vec33(scenePass.getLinearDepthNode()), 1);
    const selected = Fn3(() => {
      const result = graded.toVar();
      If(this.debugMode.equal(1), () => result.assign(rawMapped));
      If(this.debugMode.equal(2), () => result.assign(fogMapped));
      If(this.debugMode.equal(3), () => result.assign(raysMapped));
      If(this.debugMode.equal(4), () => result.assign(causticsMapped));
      If(this.debugMode.equal(5), () => result.assign(depthMapped));
      return result;
    })();
    this.pipeline = new RenderPipeline(renderer, selected);
    this.pipeline.outputColorTransform = false;
    this.particulates = this.buildParticulates(
      options.particulateCount ?? 18e3,
      submerged
    );
    scene.add(this.particulates);
  }
  /**
   * Caustic light on any lit material: modulates the received sun shadow, so
   * caustics inherit occlusion for free and never glow in occluded interiors.
   * Every underwater lit material must opt in.
   */
  applyCaustics(material, strength = 1.4) {
    const sampler = this.causticSampler;
    material.receivedShadowNode = Fn3(([shadow]) => {
      const caustic = sampler(positionWorld).g;
      return mix2(float3(1), shadow, seabedShadowCaptureKeep).mul(
        caustic.mul(strength).add(1)
      );
    });
  }
  /** Enclosed interiors fade the open-sea glow as the camera goes deep. */
  setInterior(value) {
    this.interior.value = Math.min(1, Math.max(0, value));
  }
  setDebugMode(mode) {
    this.debugMode.value = underwaterDebugModes.get(mode) ?? 0;
  }
  update(elapsed) {
    this.timeUniform.value = elapsed;
  }
  render() {
    void this.pipeline.render();
  }
  buildParticulates(count, submerged) {
    const material = new MeshBasicNodeMaterial2();
    material.blending = AdditiveBlending2;
    material.depthWrite = false;
    material.transparent = true;
    const boxSize = float3(60);
    const half = boxSize.div(2);
    const seed = vec33(
      hash(instanceIndex2.add(1)),
      hash(instanceIndex2.add(7919)),
      hash(instanceIndex2.add(104729))
    );
    const base = seed.mul(boxSize);
    const drift = currentFlow(base, this.timeUniform).mul(4).add(vec33(0, this.timeUniform.mul(0.06), 0));
    const wrapped = fract(base.add(drift).sub(cameraPosition).div(boxSize)).mul(boxSize).sub(half);
    const center = cameraPosition.add(wrapped);
    const size = hash(instanceIndex2.add(31)).mul(0.5).add(0.5).mul(0.02);
    material.positionNode = center.add(positionGeometry2.mul(size));
    const camDist = wrapped.length();
    const fade = smoothstep3(half.mul(0.95), half.mul(0.45), camDist);
    const depthGlow = exp2(center.y.mul(0.04)).min(1);
    material.colorNode = vec43(vec33(0.7, 0.82, 0.84).mul(0.5).mul(depthGlow), 1);
    material.opacityNode = fade.mul(submerged);
    const mesh = new InstancedMesh2(new TetrahedronGeometry(1, 0), material, count);
    mesh.frustumCulled = false;
    return mesh;
  }
  dispose() {
    this.scene.remove(this.particulates);
    this.particulates.geometry.dispose();
    if (Array.isArray(this.particulates.material)) {
      for (const material of this.particulates.material) material.dispose();
    } else {
      this.particulates.material.dispose();
    }
    this.pipeline.dispose();
  }
};
export {
  UnderwaterMediumPipeline,
  seabedShadowCaptureKeep,
  underwaterDebugModes
};
