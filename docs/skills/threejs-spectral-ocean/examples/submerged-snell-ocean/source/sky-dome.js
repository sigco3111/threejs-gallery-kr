import { BackSide, DirectionalLight, Mesh, Scene, SphereGeometry } from "three";
import { MeshBasicNodeMaterial, PMREMGenerator } from "three/webgpu";
import { float, normalize, positionLocal } from "three/tsl";
import { skyRadiance } from "./sky-radiance";
import { SUN_LIGHT_INTENSITY, sunColor, sunDirection } from "./sun";
function createSkyDome() {
  const domeMaterial = new MeshBasicNodeMaterial();
  domeMaterial.colorNode = skyRadiance(normalize(positionLocal), float(1));
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
const SKY_ENVIRONMENT_INTENSITY = 0.5;
export {
  SKY_ENVIRONMENT_INTENSITY,
  bakeSkyEnvironment,
  createSkyDome,
  createSunLight
};
