var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/wake-foam-map.ts
import { HalfFloatType, LinearFilter, Vector4 } from "https://esm.sh/three@0.185.1?external";
import { StorageTexture } from "https://esm.sh/three@0.185.1?external/webgpu";
import {
  Fn,
  exp,
  float,
  instanceIndex,
  int,
  ivec2,
  mix,
  texture,
  textureLoad,
  textureStore,
  uint,
  uniform,
  uniformArray,
  vec4
} from "https://esm.sh/three@0.185.1?external/tsl";
var WAKE_FOAM_CENTER_X = 0;
var WAKE_FOAM_CENTER_Z = 10;
var WAKE_FOAM_SIZE = 820;
var RESOLUTION = 1024;
var BITS = 10;
var MAX_SPLATS = 8;
var FRESH_TAU = 2.4;
var RESIDUE_TAU = 8.5;
var DIFFUSE_RATE = 1.1;
var BLEED_RATE = 4e-3;
var QUIET_AFTER = 35;
var WakeFoamMap = class {
  constructor() {
    /** Stable texture node for the surface material — repointed after swaps. */
    __publicField(this, "foamNode");
    __publicField(this, "maps");
    __publicField(this, "steps");
    __publicField(this, "clears");
    __publicField(this, "splatShapes", uniformArray(
      Array.from({ length: MAX_SPLATS }, () => new Vector4(0, 0, 1, 0))
    ));
    __publicField(this, "splatPowers", uniformArray(
      Array.from({ length: MAX_SPLATS }, () => new Vector4(0, 0, 0, 0))
    ));
    __publicField(this, "freshKeep", uniform(1));
    __publicField(this, "residueKeep", uniform(1));
    __publicField(this, "diffuse", uniform(0));
    __publicField(this, "bleed", uniform(0));
    __publicField(this, "pendingCount", 0);
    __publicField(this, "hasPending", false);
    __publicField(this, "activeUntil", -Infinity);
    __publicField(this, "current", 0);
    __publicField(this, "initialized", false);
    const make = () => {
      const map = new StorageTexture(RESOLUTION, RESOLUTION);
      map.type = HalfFloatType;
      map.minFilter = LinearFilter;
      map.magFilter = LinearFilter;
      map.generateMipmaps = false;
      return map;
    };
    this.maps = [make(), make()];
    this.steps = [
      this.buildStep(this.maps[0], this.maps[1]),
      this.buildStep(this.maps[1], this.maps[0])
    ];
    this.clears = [this.buildClear(this.maps[0]), this.buildClear(this.maps[1])];
    this.foamNode = texture(this.maps[0]);
  }
  /**
   * Queue a gaussian foam deposit at world (x, z). `radius` is in metres;
   * `fresh`/`residue` are 0..1 peak coverages for the two channels. At most
   * MAX_SPLATS deposits are honoured per frame — the submarine's stamp set
   * is sized to exactly that budget.
   */
  splat(x, z, radius, fresh, residue) {
    if (this.pendingCount >= MAX_SPLATS) return;
    const u = (x - (WAKE_FOAM_CENTER_X - WAKE_FOAM_SIZE / 2)) / WAKE_FOAM_SIZE * RESOLUTION;
    const v = (z - (WAKE_FOAM_CENTER_Z - WAKE_FOAM_SIZE / 2)) / WAKE_FOAM_SIZE * RESOLUTION;
    const texels = Math.max(1, radius / WAKE_FOAM_SIZE * RESOLUTION);
    this.splatShapes.array[this.pendingCount].set(u, v, texels, 0);
    this.splatPowers.array[this.pendingCount].set(fresh, residue, 0, 0);
    this.pendingCount++;
    this.hasPending = true;
  }
  /** Advance decay/diffusion and apply queued splats. Costs nothing while
   * the field is known-zero (QUIET_AFTER outlives both channels + bleed). */
  update(renderer, dt, elapsed) {
    this.ensureInitialized(renderer);
    if (this.hasPending) {
      this.activeUntil = elapsed + QUIET_AFTER;
      this.hasPending = false;
    }
    if (elapsed > this.activeUntil) {
      this.pendingCount = 0;
      return;
    }
    for (let i = this.pendingCount; i < MAX_SPLATS; i++) {
      ;
      this.splatShapes.array[i].set(0, 0, 1, 0);
      this.splatPowers.array[i].set(0, 0, 0, 0);
    }
    this.pendingCount = 0;
    const step = Math.min(dt, 0.1);
    this.freshKeep.value = Math.exp(-step / FRESH_TAU);
    this.residueKeep.value = Math.exp(-step / RESIDUE_TAU);
    this.diffuse.value = 1 - Math.exp(-step * DIFFUSE_RATE);
    this.bleed.value = step * BLEED_RATE;
    renderer.compute(this.steps[this.current]);
    this.current = 1 - this.current;
    this.foamNode.value = this.maps[this.current];
  }
  ensureInitialized(renderer) {
    if (this.initialized) return;
    this.initialized = true;
    renderer.compute(this.clears[0]);
    renderer.compute(this.clears[1]);
  }
  buildClear(target) {
    return Fn(() => {
      const x = int(instanceIndex.bitAnd(uint(RESOLUTION - 1)));
      const y = int(instanceIndex.shiftRight(uint(BITS)));
      textureStore(target, ivec2(x, y), vec4(0));
    })().compute(RESOLUTION * RESOLUTION);
  }
  buildStep(read, write) {
    const shapes = this.splatShapes;
    const powers = this.splatPowers;
    return Fn(() => {
      const mask = uint(RESOLUTION - 1);
      const x = int(instanceIndex.bitAnd(mask));
      const y = int(instanceIndex.shiftRight(uint(BITS)));
      const cell = ivec2(x, y);
      const previous = textureLoad(texture(read), cell);
      const xm = int(uint(x.add(RESOLUTION - 1)).bitAnd(mask));
      const xp = int(uint(x.add(1)).bitAnd(mask));
      const ym = int(uint(y.add(RESOLUTION - 1)).bitAnd(mask));
      const yp = int(uint(y.add(1)).bitAnd(mask));
      const around = textureLoad(texture(read), ivec2(xm, y)).g.add(textureLoad(texture(read), ivec2(xp, y)).g).add(textureLoad(texture(read), ivec2(x, ym)).g).add(textureLoad(texture(read), ivec2(x, yp)).g).mul(0.25);
      let fresh = previous.r.mul(this.freshKeep).sub(this.bleed).max(0);
      let residue = mix(previous.g, around, this.diffuse).mul(this.residueKeep).sub(this.bleed).max(0);
      const px = float(x).add(0.5);
      const py = float(y).add(0.5);
      for (let k = 0; k < MAX_SPLATS; k++) {
        const shape = shapes.element(int(k));
        const power = powers.element(int(k));
        const dx = px.sub(shape.x);
        const dy = py.sub(shape.y);
        const falloff = exp(dx.mul(dx).add(dy.mul(dy)).div(shape.z.mul(shape.z)).negate());
        fresh = fresh.max(falloff.mul(power.x));
        residue = residue.max(falloff.mul(power.y));
      }
      textureStore(write, cell, vec4(fresh, residue, 0, 1));
    })().compute(RESOLUTION * RESOLUTION);
  }
  dispose() {
    this.maps[0].dispose();
    this.maps[1].dispose();
  }
};
export {
  WAKE_FOAM_CENTER_X,
  WAKE_FOAM_CENTER_Z,
  WAKE_FOAM_SIZE,
  WakeFoamMap
};
