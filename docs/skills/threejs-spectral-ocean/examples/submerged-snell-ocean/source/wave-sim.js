var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { HalfFloatType, LinearFilter, RepeatWrapping } from "three";
import { StorageTexture } from "three/webgpu";
import {
  Fn,
  float,
  instanceIndex,
  int,
  ivec2,
  max,
  min,
  texture,
  textureLoad,
  textureStore,
  uint,
  uniform,
  vec2,
  vec4
} from "three/tsl";
import { createFrequencyTexture, PackedIFFT } from "./fft-compute";
import { cascadeBands, createSpectrumTexture, DEFAULT_SEA_STATE } from "./ocean-spectrum";
const OCEAN_PRESET = {
  resolution: 256,
  patchLengths: [250, 17, 5],
  boundaryFactor: 6,
  choppiness: 1.3,
  foamRecovery: 0.35,
  /** Global art-direction scale on displacement (dream lever). 0.35 keeps a
   * living glassy swell (~0.5 m crests). A 0.9 sea reads as a storm: it dunks
   * sightlines at deck height and makes a surface crossing chaotic. */
  amplitude: 0.35
};
function createMapTexture(n) {
  const tex = new StorageTexture(n, n);
  tex.type = HalfFloatType;
  tex.wrapS = RepeatWrapping;
  tex.wrapT = RepeatWrapping;
  tex.minFilter = LinearFilter;
  tex.magFilter = LinearFilter;
  tex.generateMipmaps = false;
  return tex;
}
class WaveSim {
  constructor(rng, sea = DEFAULT_SEA_STATE) {
    __publicField(this, "patchLengths");
    /** The sea state these cascades were built from — consumers that need the
     * wind axis (foam windrows) must read it here, never re-import a default. */
    __publicField(this, "sea");
    /** TSL texture nodes — .value is repointed after each ping-pong swap. */
    __publicField(this, "displacementNodes");
    __publicField(this, "derivativeNodes");
    __publicField(this, "cascades");
    __publicField(this, "timeUniform", uniform(0));
    __publicField(this, "dtUniform", uniform(1 / 60));
    __publicField(this, "current", 0);
    __publicField(this, "initialized", false);
    const { resolution: n, patchLengths, boundaryFactor, choppiness, foamRecovery, amplitude } = OCEAN_PRESET;
    this.patchLengths = patchLengths;
    this.sea = sea;
    const logN = Math.log2(n);
    const mask = uint(n - 1);
    const shift = uint(logN);
    const bands = cascadeBands(patchLengths, boundaryFactor);
    const cellOf = () => {
      const x = int(instanceIndex.bitAnd(mask));
      const y = int(instanceIndex.shiftRight(shift));
      return { x, y, cell: ivec2(x, y) };
    };
    this.cascades = bands.map((band, index) => {
      const spectrum = createSpectrumTexture(
        rng.fork(`ocean-cascade-${index}`),
        band,
        sea,
        n
      );
      const freqPing = createFrequencyTexture(n);
      const freqPong = createFrequencyTexture(n);
      const ifft = new PackedIFFT(freqPing, freqPong, n);
      const displacementMaps = [
        createMapTexture(n),
        createMapTexture(n)
      ];
      const derivativesMap = createMapTexture(n);
      const twoPiOverPatch = Math.PI * 2 / band.patchLength;
      const evolve = Fn(() => {
        const { x, y, cell } = cellOf();
        const initial = textureLoad(texture(spectrum), cell);
        const centered = vec2(float(x).sub(n / 2), float(y).sub(n / 2));
        const k = centered.mul(twoPiOverPatch);
        const kLength = max(k.length(), 1e-4);
        const omega = k.length().mul(float(sea.gravity)).mul(min(kLength.mul(sea.depth), 20).tanh()).sqrt();
        const phase = omega.mul(this.timeUniform);
        const pc = phase.cos();
        const ps = phase.sin();
        const h = vec2(
          initial.x.mul(pc).sub(initial.y.mul(ps)).add(initial.z.mul(pc).sub(initial.w.mul(ps.negate()))),
          initial.x.mul(ps).add(initial.y.mul(pc)).add(initial.z.mul(ps.negate()).add(initial.w.mul(pc)))
        ).mul(amplitude);
        const ih = vec2(h.y.negate(), h.x);
        const dx = ih.mul(k.x.div(kLength));
        const dz = ih.mul(k.y.div(kLength));
        const horizontal = vec2(dx.x.sub(dz.y), dx.y.add(dz.x));
        textureStore(freqPing, cell, vec4(h, horizontal));
      })().compute(n * n);
      const spatial = ifft.output;
      const inverseSpacing = n / (2 * band.patchLength);
      const makeAssemble = (previous, next) => Fn(() => {
        const { x, y, cell } = cellOf();
        const parity = float(int(instanceIndex.bitAnd(mask)).add(int(instanceIndex.shiftRight(shift))).bitAnd(int(1)));
        const sign = float(1).sub(parity.mul(2));
        const nSign = sign.negate();
        const xp = int(uint(x.add(1)).bitAnd(mask));
        const xm = int(uint(x.add(n - 1)).bitAnd(mask));
        const yp = int(uint(y.add(1)).bitAnd(mask));
        const ym = int(uint(y.add(n - 1)).bitAnd(mask));
        const center = textureLoad(texture(spatial), cell);
        const right = textureLoad(texture(spatial), ivec2(xp, y)).mul(nSign);
        const left = textureLoad(texture(spatial), ivec2(xm, y)).mul(nSign);
        const up = textureLoad(texture(spatial), ivec2(x, yp)).mul(nSign);
        const down = textureLoad(texture(spatial), ivec2(x, ym)).mul(nSign);
        const height = center.x.mul(sign);
        const horizontal = center.zw.mul(sign);
        const slopeX = right.x.sub(left.x).mul(inverseSpacing);
        const slopeZ = up.x.sub(down.x).mul(inverseSpacing);
        const dDxDx = right.z.sub(left.z).mul(inverseSpacing);
        const dDzDz = up.w.sub(down.w).mul(inverseSpacing);
        const dDxDz = up.z.sub(down.z).mul(inverseSpacing);
        const dDzDx = right.w.sub(left.w).mul(inverseSpacing);
        const jxx = float(1).add(dDxDx.mul(choppiness));
        const jzz = float(1).add(dDzDz.mul(choppiness));
        const jxz = dDxDz.add(dDzDx).mul(0.5).mul(choppiness);
        const jacobian = jxx.mul(jzz).sub(jxz.mul(jxz));
        const previousHistory = textureLoad(texture(previous), cell).w;
        const recovered = previousHistory.add(
          this.dtUniform.mul(foamRecovery).div(max(jacobian, 0.5))
        );
        const history = min(min(jacobian, recovered), 2);
        textureStore(
          next,
          cell,
          vec4(horizontal.x.mul(choppiness), height, horizontal.y.mul(choppiness), history)
        );
        textureStore(
          derivativesMap,
          cell,
          vec4(slopeX, slopeZ, dDxDx.mul(choppiness), dDzDz.mul(choppiness))
        );
      })().compute(n * n);
      const makeClear = (target) => Fn(() => {
        const { cell } = cellOf();
        textureStore(target, cell, vec4(0, 0, 0, 1));
      })().compute(n * n);
      return {
        patchLength: band.patchLength,
        ifft,
        evolve,
        assemble: [
          makeAssemble(displacementMaps[0], displacementMaps[1]),
          makeAssemble(displacementMaps[1], displacementMaps[0])
        ],
        clear: [makeClear(displacementMaps[0]), makeClear(displacementMaps[1])],
        displacementMaps,
        derivativesMap
      };
    });
    this.displacementNodes = this.cascades.map((c) => texture(c.displacementMaps[0]));
    this.derivativeNodes = this.cascades.map((c) => texture(c.derivativesMap));
  }
  /** Foam-history maps start at 1 (no foam). */
  ensureInitialized(renderer) {
    if (this.initialized) return;
    this.initialized = true;
    for (const cascade of this.cascades) {
      renderer.compute(cascade.clear[0]);
      renderer.compute(cascade.clear[1]);
    }
  }
  update(renderer, elapsed, dt) {
    this.ensureInitialized(renderer);
    this.timeUniform.value = elapsed;
    this.dtUniform.value = Math.min(dt, 0.1);
    renderer.compute(this.cascades.map((c) => c.evolve));
    const stageCount = this.cascades[0].ifft.stages.length;
    for (let stage = 0; stage < stageCount; stage++) {
      renderer.compute(this.cascades.map((c) => c.ifft.stages[stage]));
    }
    const parity = this.current;
    renderer.compute(this.cascades.map((c) => c.assemble[parity]));
    this.current = 1 - this.current;
    for (let i = 0; i < this.cascades.length; i++) {
      this.displacementNodes[i].value = this.cascades[i].displacementMaps[this.current === 0 ? 0 : 1];
    }
  }
}
export {
  OCEAN_PRESET,
  WaveSim
};
