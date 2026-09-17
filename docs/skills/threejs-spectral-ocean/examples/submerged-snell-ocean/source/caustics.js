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
var GRID = 256;
var PROJECT_DEPTH = 24;
var CausticsPass = class {
  renderTarget;
  textureNode;
  scene = new Scene();
  camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
  constructor(sim, resolution) {
    this.renderTarget = new RenderTarget(resolution, resolution, {
      type: HalfFloatType,
      depthBuffer: false
    });
    this.renderTarget.texture.wrapS = RepeatWrapping;
    this.renderTarget.texture.wrapT = RepeatWrapping;
    this.renderTarget.texture.minFilter = LinearFilter;
    this.renderTarget.texture.magFilter = LinearFilter;
    this.textureNode = texture(this.renderTarget.texture);
    const material = new MeshBasicNodeMaterial();
    material.blending = AdditiveBlending;
    material.depthTest = false;
    material.depthWrite = false;
    const tile = float(CAUSTIC_TILE);
    const uv01 = positionGeometry.xy.mul(0.5).add(0.5);
    const worldXZ = uv01.mul(tile);
    const patch1 = sim.patchLengths[1];
    const der = sim.derivativeNodes[1].sample(worldXZ.div(patch1));
    const disp = sim.displacementNodes[1].sample(worldXZ.div(patch1));
    const surfaceNormal = normalize(vec3(der.x.negate(), 1, der.y.negate()));
    const toSun = sunDirectionUniform;
    const eta = float(1 / 1.333);
    const flatRefract = refract(toSun.negate(), vec3(0, 1, 0), eta);
    const waveRefract = refract(toSun.negate(), surfaceNormal, eta);
    const depth = float(PROJECT_DEPTH);
    const oldPos = worldXZ.add(flatRefract.xz.mul(depth.div(flatRefract.y.abs())));
    const newPos = worldXZ.add(disp.xz).add(waveRefract.xz.mul(depth.add(disp.y).div(waveRefract.y.abs())));
    const centered = newPos.sub(flatRefract.xz.mul(depth.div(flatRefract.y.abs())));
    const vOld = varying(oldPos);
    const vNew = varying(newPos);
    const ix = float(instanceIndex.mod(3)).sub(1).mul(2);
    const iy = float(instanceIndex.div(3)).sub(1).mul(2);
    const ndc = centered.div(tile).mul(2).sub(1).add(vec2(ix, iy));
    material.vertexNode = vec4(ndc, 0, 1);
    material.colorNode = Fn(() => {
      const oldArea = dFdx(vOld).length().mul(dFdy(vOld).length());
      const newArea = max(dFdx(vNew).length().mul(dFdy(vNew).length()), 1e-6);
      const intensity = oldArea.div(newArea).mul(0.18);
      return vec4(vec3(intensity.min(6)), 1);
    })();
    const mesh = new InstancedMesh(new PlaneGeometry(2, 2, GRID, GRID), material, 9);
    mesh.frustumCulled = false;
    this.scene.add(mesh);
    this.scene.background = new Color2(0);
  }
  update(renderer) {
    renderer.setRenderTarget(this.renderTarget);
    void renderer.render(this.scene, this.camera);
    renderer.setRenderTarget(null);
  }
  dispose() {
    this.renderTarget.dispose();
  }
};
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
export {
  CAUSTIC_TILE,
  CausticsPass,
  causticBakeNeutral,
  causticWorldSample
};
