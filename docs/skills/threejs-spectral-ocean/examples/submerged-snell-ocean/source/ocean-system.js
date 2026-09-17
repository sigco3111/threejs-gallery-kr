var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { Mesh, PlaneGeometry } from "three";
import { uniform } from "three/tsl";
import { createOceanSurfaceMaterial, oceanOpticsDebugMode } from "./ocean-material";
import {
  InterfaceStructureLayer
} from "./interface-structure-layer";
import { createOceanSkirtGeometry, OCEAN_INNER_HALF_SIZE } from "./ocean-skirt-geometry";
import { WaveSim } from "./wave-sim";
const INNER_SIZE = OCEAN_INNER_HALF_SIZE * 2;
class SubmergedOcean {
  constructor(scene, rng, options = {}) {
    __publicField(this, "simulation");
    __publicField(this, "interfaceStructures");
    /** Camera-medium authority shared by the surface, medium, and particulates. */
    __publicField(this, "submerged");
    __publicField(this, "inner");
    __publicField(this, "outer");
    __publicField(this, "timeUniform", uniform(0));
    __publicField(this, "followStep");
    const segments = options.segments ?? 384;
    this.followStep = INNER_SIZE / segments;
    this.simulation = new WaveSim(rng);
    this.submerged = uniform(1);
    this.interfaceStructures = new InterfaceStructureLayer(this.simulation, this.submerged);
    const timeNode = this.timeUniform;
    const debugMode = oceanOpticsDebugMode(options.debugPass ?? "");
    const innerGeometry = new PlaneGeometry(INNER_SIZE, INNER_SIZE, segments, segments);
    innerGeometry.rotateX(-Math.PI / 2);
    this.inner = new Mesh(
      innerGeometry,
      createOceanSurfaceMaterial(this.simulation, timeNode, {
        detailed: true,
        edgeFadeHalfSize: INNER_SIZE / 2,
        interfaceStructures: this.interfaceStructures.nodes,
        submerged: this.submerged,
        wakeFoam: null,
        debugMode
      })
    );
    this.inner.frustumCulled = false;
    this.inner.renderOrder = -100;
    scene.add(this.inner);
    this.outer = new Mesh(
      createOceanSkirtGeometry(segments),
      createOceanSurfaceMaterial(this.simulation, timeNode, {
        detailed: false,
        interfaceStructures: this.interfaceStructures.nodes,
        submerged: this.submerged,
        debugMode
      })
    );
    this.outer.frustumCulled = false;
    this.outer.renderOrder = -101;
    scene.add(this.outer);
  }
  /**
   * Register a bounded opaque assembly that straddles the interface, so its
   * forward-refracted image can be transported through the Snell window.
   */
  register(registration) {
    return this.interfaceStructures.register(registration);
  }
  update(renderer, camera, scene, elapsed, delta) {
    this.timeUniform.value = elapsed;
    this.simulation.update(renderer, elapsed, delta);
    const step = this.followStep;
    const qx = Math.round(camera.position.x / step) * step;
    const qz = Math.round(camera.position.z / step) * step;
    this.inner.position.set(qx, 0, qz);
    this.outer.position.set(qx, 0, qz);
    this.interfaceStructures.update({ camera, renderer, scene });
  }
  dispose(scene) {
    scene.remove(this.inner);
    scene.remove(this.outer);
    this.inner.geometry.dispose();
    this.outer.geometry.dispose();
    this.inner.material.dispose();
    this.outer.material.dispose();
    this.interfaceStructures.dispose();
    this.simulation.dispose();
  }
}
export {
  SubmergedOcean
};
