var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import {
  AdditiveBlending,
  AgXToneMapping,
  InstancedMesh,
  NoToneMapping,
  SRGBColorSpace,
  TetrahedronGeometry
} from "three";
import {
  MeshBasicNodeMaterial,
  RenderPipeline
} from "three/webgpu";
import {
  Fn,
  If,
  Loop,
  cameraPosition,
  cameraProjectionMatrixInverse,
  cameraWorldMatrix,
  exp,
  exp2,
  float,
  fract,
  hash,
  instanceIndex,
  max,
  mix,
  mrt,
  normalView,
  output,
  pass,
  positionGeometry,
  positionWorld,
  pow,
  renderOutput,
  screenUV,
  sin,
  smoothstep,
  uniform,
  vec2,
  vec3,
  vec4
} from "three/tsl";
import { bloom } from "three/addons/tsl/display/BloomNode.js";
import { causticWorldSample } from "./caustics";
import { currentFlow } from "./current";
import { dreamGrade, gradeParams } from "./grade";
import {
  AQUATIC_AMBIENT_DOWN,
  AQUATIC_AMBIENT_UP,
  AQUATIC_EXTINCTION
} from "./optical-constants";
import { sunColorUniform, sunDirectionUniform } from "./sun";
const SIGMA = vec3(...AQUATIC_EXTINCTION);
const AMBIENT_DOWN = vec3(...AQUATIC_AMBIENT_DOWN);
const AMBIENT_UP = vec3(...AQUATIC_AMBIENT_UP);
const seabedShadowCaptureKeep = uniform(1);
const underwaterDebugModes = /* @__PURE__ */ new Map([
  ["final", 0],
  ["no-medium", 1],
  ["fog", 2],
  ["god-rays", 3],
  ["caustics", 4],
  ["depth", 5]
]);
class UnderwaterMediumPipeline {
  constructor(renderer, scene, camera, caustics, options = {}) {
    __publicField(this, "scenePass");
    /** 0 = open sea, 1 = deep inside an enclosed interior: kills fog glow + rays. */
    __publicField(this, "interior", uniform(0));
    __publicField(this, "pipeline");
    __publicField(this, "debugMode", uniform(0));
    __publicField(this, "timeUniform", uniform(0));
    __publicField(this, "particulates");
    __publicField(this, "scene");
    __publicField(this, "causticSampler");
    this.scene = scene;
    renderer.toneMapping = NoToneMapping;
    const godraySteps = options.godraySteps ?? 14;
    const submerged = options.submerged ?? uniform(1);
    const raySampler = causticWorldSample(caustics.textureNode);
    this.causticSampler = causticWorldSample(caustics.textureNode, { footprintFade: true });
    const scenePass = pass(scene, camera, { samples: 4 });
    scenePass.setMRT(mrt({ output, normal: vec4(normalView, 1) }));
    this.scenePass = scenePass;
    const sceneColor = scenePass.getTextureNode("output");
    const viewZ = scenePass.getViewZNode();
    const foggedNode = Fn(() => {
      const dist = viewZ.negate().min(3500).toVar();
      const ndc = vec2(screenUV.x.mul(2).sub(1), float(1).sub(screenUV.y).mul(2).sub(1));
      const far4 = cameraProjectionMatrixInverse.mul(vec4(ndc, 1, 1));
      const farView = far4.xyz.div(far4.w);
      const viewPos = farView.mul(viewZ.div(farView.z));
      const worldPos = cameraWorldMatrix.mul(vec4(viewPos, 1)).xyz;
      const rayDir = worldPos.sub(cameraPosition).div(max(dist, 1e-4));
      const transmittance = exp(SIGMA.mul(dist).negate());
      const upness = smoothstep(-0.5, 0.75, rayDir.y);
      const cameraDim = exp(cameraPosition.y.min(0).mul(0.03));
      const sunward = pow(max(rayDir.dot(sunDirectionUniform), 0), 6).mul(0.06);
      const interiorKeep = float(1).sub(this.interior.mul(0.94));
      const inscatter = mix(AMBIENT_DOWN, AMBIENT_UP, upness).mul(cameraDim).add(sunColorUniform.mul(sunward)).mul(interiorKeep);
      const fogged = sceneColor.rgb.mul(transmittance).add(inscatter.mul(float(1).sub(transmittance.g)));
      return vec4(mix(sceneColor.rgb, fogged, submerged), 1);
    })();
    const resolvedRays = Fn(() => {
      const dist = viewZ.negate().min(3500).toVar();
      const ndc = vec2(screenUV.x.mul(2).sub(1), float(1).sub(screenUV.y).mul(2).sub(1));
      const far4 = cameraProjectionMatrixInverse.mul(vec4(ndc, 1, 1));
      const farView = far4.xyz.div(far4.w);
      const viewPos = farView.mul(viewZ.div(farView.z));
      const worldPos = cameraWorldMatrix.mul(vec4(viewPos, 1)).xyz;
      const rayDir = worldPos.sub(cameraPosition).div(max(dist, 1e-4));
      const marchLength = dist.min(85);
      const stepLength = marchLength.div(godraySteps);
      const jitter = fract(
        sin(screenUV.x.mul(1741.37).add(screenUV.y.mul(921.13))).mul(43758.55)
      );
      const shaft = float(0).toVar();
      If(submerged.greaterThan(1e-3), () => {
        Loop({ start: 0, end: godraySteps }, (loopVars) => {
          const i = loopVars.i;
          const t = stepLength.mul(float(i).add(jitter));
          const samplePos = cameraPosition.add(rayDir.mul(t));
          const light = raySampler(samplePos).g;
          shaft.addAssign(light.mul(exp(t.mul(-0.03))));
        });
      });
      const interiorKeep = float(1).sub(this.interior.mul(0.94));
      const rays = sunColorUniform.mul(shaft.mul(stepLength).mul(7e-3)).mul(interiorKeep).mul(submerged);
      return rays;
    })();
    const withMedium = vec4(foggedNode.rgb.add(resolvedRays), 1);
    const bloomNode = bloom(withMedium, 0.35, 0.55, 1);
    const hdr = withMedium.add(bloomNode);
    const exposed = hdr.mul(exp2(gradeParams.exposureEV));
    const mapped = renderOutput(exposed, AgXToneMapping, SRGBColorSpace);
    const graded = dreamGrade(mapped);
    const rawMapped = renderOutput(sceneColor, AgXToneMapping, SRGBColorSpace);
    const fogMapped = renderOutput(foggedNode, AgXToneMapping, SRGBColorSpace);
    const raysMapped = renderOutput(vec4(resolvedRays, 1), AgXToneMapping, SRGBColorSpace);
    const causticsMapped = renderOutput(
      vec4(caustics.textureNode.rgb, 1),
      AgXToneMapping,
      SRGBColorSpace
    );
    const depthMapped = vec4(vec3(scenePass.getLinearDepthNode()), 1);
    const selected = Fn(() => {
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
    material.receivedShadowNode = Fn(([shadow]) => {
      const caustic = sampler(positionWorld).g;
      return mix(float(1), shadow, seabedShadowCaptureKeep).mul(
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
    const material = new MeshBasicNodeMaterial();
    material.blending = AdditiveBlending;
    material.depthWrite = false;
    material.transparent = true;
    const boxSize = float(60);
    const half = boxSize.div(2);
    const seed = vec3(
      hash(instanceIndex.add(1)),
      hash(instanceIndex.add(7919)),
      hash(instanceIndex.add(104729))
    );
    const base = seed.mul(boxSize);
    const drift = currentFlow(base, this.timeUniform).mul(4).add(vec3(0, this.timeUniform.mul(0.06), 0));
    const wrapped = fract(base.add(drift).sub(cameraPosition).div(boxSize)).mul(boxSize).sub(half);
    const center = cameraPosition.add(wrapped);
    const size = hash(instanceIndex.add(31)).mul(0.5).add(0.5).mul(0.02);
    material.positionNode = center.add(positionGeometry.mul(size));
    const camDist = wrapped.length();
    const fade = smoothstep(half.mul(0.95), half.mul(0.45), camDist);
    const depthGlow = exp(center.y.mul(0.04)).min(1);
    material.colorNode = vec4(vec3(0.7, 0.82, 0.84).mul(0.5).mul(depthGlow), 1);
    material.opacityNode = fade.mul(submerged);
    const mesh = new InstancedMesh(new TetrahedronGeometry(1, 0), material, count);
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
}
export {
  UnderwaterMediumPipeline,
  seabedShadowCaptureKeep,
  underwaterDebugModes
};
