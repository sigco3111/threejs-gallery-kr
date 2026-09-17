// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/sky-dome.ts
import { BackSide, DirectionalLight, Mesh, Scene, SphereGeometry } from "https://esm.sh/three@0.185.1?external";
import { MeshBasicNodeMaterial, PMREMGenerator } from "https://esm.sh/three@0.185.1/webgpu?external=three";
import { float as float2, normalize as normalize2, positionLocal } from "https://esm.sh/three@0.185.1/tsl?external=three";

// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/sky-radiance.ts
import { Fn, dot, float, max, mix, normalize, pow, smoothstep, vec3 } from "https://esm.sh/three@0.185.1/tsl?external=three";

// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/sun.ts
import { Color, Vector3 } from "https://esm.sh/three@0.185.1?external";
import { uniform } from "https://esm.sh/three@0.185.1/tsl?external=three";
var SUN_ELEVATION = 42 * Math.PI / 180;
var SUN_AZIMUTH = 215 * Math.PI / 180;
var sunDirection = new Vector3(
  Math.cos(SUN_ELEVATION) * Math.sin(SUN_AZIMUTH),
  Math.sin(SUN_ELEVATION),
  Math.cos(SUN_ELEVATION) * Math.cos(SUN_AZIMUTH)
).normalize();
var sunColor = new Color(1, 0.925, 0.79);
var SUN_LIGHT_INTENSITY = 3.4;
var sunDirectionUniform = uniform(sunDirection);
var sunColorUniform = uniform(sunColor);

// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/sky-radiance.ts
var SUN_COS_RADIUS = Math.cos(0.266 * Math.PI / 180);
var marineHazeTint = /* @__PURE__ */ vec3(0.65, 0.59, 0.69);
var skyRadiance = /* @__PURE__ */ Fn(
  ([direction, discStrength]) => {
    const dir = normalize(direction).toVar();
    const up = max(dir.y, 0);
    const zenith = vec3(0.05, 0.2, 0.5);
    const horizon = vec3(0.4, 0.54, 0.68);
    const seaMist = vec3(0.32, 0.43, 0.52);
    const gradient = mix(horizon, zenith, pow(up, 0.48));
    const sky = mix(seaMist, gradient, smoothstep(-0.08, 0.02, dir.y)).toVar();
    const marineHazeAmount = smoothstep(-0.18, 0, dir.y).mul(float(1).sub(smoothstep(0, 0.3, dir.y))).mul(0.16);
    sky.assign(mix(sky, marineHazeTint, marineHazeAmount));
    const sunAmount = max(dot(dir, sunDirectionUniform), 0).toVar();
    const x2 = float(1).sub(sunAmount).div(1 - SUN_COS_RADIUS).toVar();
    const inDisc = smoothstep(1, 0.96, x2);
    const mu = float(1).sub(x2).max(0).sqrt();
    const limb = float(0.3).add(mu.mul(0.93)).sub(mu.mul(mu).mul(0.23));
    const disc = inDisc.mul(limb).mul(discStrength).mul(1500);
    const aureole = pow(sunAmount, 3e3).mul(20).add(pow(sunAmount, 260).mul(1.7)).add(pow(sunAmount, 18).mul(0.16));
    return sky.mul(1.25).add(sunColorUniform.mul(aureole.add(disc)));
  }
);

// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/sky-dome.ts
function createSkyDome() {
  const domeMaterial = new MeshBasicNodeMaterial();
  domeMaterial.colorNode = skyRadiance(normalize2(positionLocal), float2(1));
  domeMaterial.side = BackSide;
  domeMaterial.depthWrite = false;
  domeMaterial.fog = false;
  const dome = new Mesh(new SphereGeometry(3400, 48, 24), domeMaterial);
  dome.frustumCulled = false;
  dome.renderOrder = -100;
  return dome;
}
function createSunLight(shadowMapSize = 2048) {
  const sun = new DirectionalLight(sunColor, SUN_LIGHT_INTENSITY);
  sun.castShadow = true;
  sun.shadow.mapSize.set(shadowMapSize, shadowMapSize);
  sun.shadow.bias = -4e-4;
  sun.shadow.normalBias = 0.02;
  sun.position.copy(sunDirection).multiplyScalar(700);
  sun.target.position.set(0, 0, 0);
  return sun;
}
function bakeSkyEnvironment(renderer, dome) {
  const envScene = new Scene();
  const envDome = new Mesh(new SphereGeometry(50, 32, 16), dome.material);
  envScene.add(envDome);
  const pmrem = new PMREMGenerator(renderer);
  const envTarget = pmrem.fromScene(envScene, 0.03, 1, 90);
  pmrem.dispose();
  return {
    texture: envTarget.texture,
    dispose: () => {
      envTarget.dispose();
      envDome.geometry.dispose();
    }
  };
}
var SKY_ENVIRONMENT_INTENSITY = 0.5;
export {
  SKY_ENVIRONMENT_INTENSITY,
  bakeSkyEnvironment,
  createSkyDome,
  createSunLight
};
