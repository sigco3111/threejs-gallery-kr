var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/wave-sim.ts
import { HalfFloatType, LinearFilter, RepeatWrapping } from "https://esm.sh/three@0.185.1?external";
import { StorageTexture as StorageTexture2 } from "https://esm.sh/three@0.185.1?external/webgpu";
import {
  Fn as Fn2,
  float as float2,
  instanceIndex as instanceIndex2,
  int as int2,
  ivec2 as ivec22,
  max,
  min,
  texture as texture2,
  textureLoad as textureLoad2,
  textureStore as textureStore2,
  uint as uint2,
  uniform,
  vec2 as vec22,
  vec4 as vec42
} from "https://esm.sh/three@0.185.1?external/tsl";

// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/fft-compute.ts
import { DataTexture, FloatType, NearestFilter, RGBAFormat } from "https://esm.sh/three@0.185.1?external";
import { StorageBufferAttribute, StorageTexture } from "https://esm.sh/three@0.185.1?external/webgpu";
import {
  Fn,
  float,
  instanceIndex,
  int,
  ivec2,
  localId,
  select,
  storage,
  texture,
  textureLoad,
  textureStore,
  uint,
  vec2,
  vec4,
  workgroupArray,
  workgroupBarrier,
  workgroupId
} from "https://esm.sh/three@0.185.1?external/tsl";
function createFrequencyTexture(n) {
  const tex = new StorageTexture(n, n);
  tex.type = FloatType;
  tex.minFilter = NearestFilter;
  tex.magFilter = NearestFilter;
  tex.generateMipmaps = false;
  return tex;
}
var PackedIFFT = class {
  constructor(ping, pong, n) {
    __publicField(this, "stages", []);
    /** Where the spatial result lives after horizontal + vertical passes. */
    __publicField(this, "output");
    const logN = Math.log2(n);
    if (!Number.isInteger(logN) || n > 256) {
      throw new Error(`PackedIFFT requires a power-of-two workgroup size up to 256; received ${n}`);
    }
    const makeAxis = (source, dest, horizontal) => {
      const shared = workgroupArray("vec4", n);
      return Fn(() => {
        const lane = localId.x.toVar();
        const line = int(workgroupId.x);
        const reversed = uint(0).toVar();
        const remaining = lane.toVar();
        for (let bit = 0; bit < logN; bit++) {
          reversed.assign(reversed.shiftLeft(1).bitOr(remaining.bitAnd(1)));
          remaining.assign(remaining.shiftRight(1));
        }
        const input = horizontal ? ivec2(int(reversed), line) : ivec2(line, int(reversed));
        shared.element(lane).assign(textureLoad(texture(source), input));
        workgroupBarrier();
        for (let stage = 0; stage < logN; stage++) {
          const groupSize = uint(1 << stage + 1);
          const halfSize = uint(1 << stage);
          const local = lane.mod(groupSize);
          const top = local.lessThan(halfSize);
          const offset = local.mod(halfSize);
          const indexA = select(top, lane, lane.sub(halfSize));
          const indexB = indexA.add(halfSize);
          const a = shared.element(indexA).toVar();
          const b = shared.element(indexB).toVar();
          const angle = float(offset).mul(Math.PI * 2 / (1 << stage + 1));
          const sign = select(top, float(1), float(-1));
          const w = vec2(angle.cos(), angle.sin()).mul(sign);
          const field1 = a.xy.add(
            vec2(b.x.mul(w.x).sub(b.y.mul(w.y)), b.x.mul(w.y).add(b.y.mul(w.x)))
          );
          const field2 = a.zw.add(
            vec2(b.z.mul(w.x).sub(b.w.mul(w.y)), b.z.mul(w.y).add(b.w.mul(w.x)))
          );
          workgroupBarrier();
          shared.element(lane).assign(vec4(field1, field2));
          workgroupBarrier();
        }
        const output = horizontal ? ivec2(int(lane), line) : ivec2(line, int(lane));
        textureStore(dest, output, shared.element(lane));
      })().compute(n * n, [n]);
    };
    this.stages.push(makeAxis(ping, pong, true));
    this.stages.push(makeAxis(pong, ping, false));
    this.output = ping;
  }
};

// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/ocean-spectrum.ts
import { DataTexture as DataTexture2, FloatType as FloatType2, NearestFilter as NearestFilter2, RGBAFormat as RGBAFormat2 } from "https://esm.sh/three@0.185.1?external";
var DEFAULT_SEA_STATE = {
  gravity: 9.81,
  depth: 500,
  windSpeed: 8.5,
  windAzimuth: 205 * Math.PI / 180,
  fetch: 3e5,
  localScale: 1,
  swellScale: 0.45,
  swellAzimuth: 188 * Math.PI / 180,
  swellOmega: 0.62,
  shortWaveFade: 3e-3
};
function jonswapTma(omega, sea) {
  const { gravity: g, windSpeed, fetch, depth } = sea;
  if (omega <= 0) return 0;
  const alpha = 0.076 * Math.pow(g * fetch / (windSpeed * windSpeed), -0.22);
  const peakOmega = 22 * Math.pow(windSpeed * fetch / (g * g), -0.33);
  const sigma = omega <= peakOmega ? 0.07 : 0.09;
  const r = Math.exp(-((omega - peakOmega) ** 2) / (2 * sigma * sigma * peakOmega * peakOmega));
  const jonswap = alpha * g * g / omega ** 5 * Math.exp(-1.25 * Math.pow(peakOmega / omega, 4)) * Math.pow(3.3, r);
  const omegaH = omega * Math.sqrt(depth / g);
  let phi;
  if (omegaH <= 1) phi = 0.5 * omegaH * omegaH;
  else if (omegaH < 2) phi = 1 - 0.5 * (2 - omegaH) ** 2;
  else phi = 1;
  return jonswap * phi;
}
function wrapAngle(a) {
  while (a > Math.PI) a -= Math.PI * 2;
  while (a < -Math.PI) a += Math.PI * 2;
  return a;
}
function spreading(delta, omegaOverPeak) {
  const cosHalf = Math.max(Math.cos(delta * 0.5), 0);
  const broad = cosHalf * cosHalf;
  const power = 4 + 24 * Math.min(1, Math.max(0, omegaOverPeak - 0.4));
  const lobe = Math.pow(cosHalf, power);
  return (broad * 0.35 + lobe * 0.65) * (1 / Math.PI);
}
function createSpectrumTexture(rng, band, sea, resolution) {
  const n = resolution;
  const deltaK = Math.PI * 2 / band.patchLength;
  const { gravity: g, depth } = sea;
  const peakOmega = 22 * Math.pow(sea.windSpeed * sea.fetch / (g * g), -0.33);
  const h0 = new Float32Array(n * n * 2);
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      const kx = (i - n / 2) * deltaK;
      const kz = (j - n / 2) * deltaK;
      const kLength = Math.hypot(kx, kz);
      const index = (j * n + i) * 2;
      const inBand = kLength >= band.cutoffLow && kLength <= band.cutoffHigh;
      if (!inBand || kLength < 1e-6) {
        h0[index] = 0;
        h0[index + 1] = 0;
        rng.next();
        rng.next();
        continue;
      }
      const kSafe = Math.max(kLength, band.cutoffLow > 0 ? band.cutoffLow : 1e-4);
      const tanhArg = Math.min(kSafe * depth, 20);
      const tanhKd = Math.tanh(tanhArg);
      const omega = Math.sqrt(g * kSafe * tanhKd);
      const sech2 = tanhArg >= 20 ? 0 : 1 / Math.cosh(tanhArg) ** 2;
      const dOmegaDk = Math.max((g * tanhKd + g * kSafe * depth * sech2) / (2 * omega), 1e-6);
      const theta = Math.atan2(kz, kx);
      const local = jonswapTma(omega, sea) * spreading(wrapAngle(theta - sea.windAzimuth), omega / peakOmega) * sea.localScale;
      const swellSigma = 0.12;
      const swell = sea.swellScale * Math.exp(-(((omega - sea.swellOmega) / swellSigma) ** 2)) * Math.pow(Math.max(Math.cos(wrapAngle(theta - sea.swellAzimuth) * 0.5), 0), 48) * 0.9;
      const energy = (local + swell) * Math.exp(-(sea.shortWaveFade * sea.shortWaveFade) * kLength * kLength);
      const amplitude = Math.sqrt(energy * 2 * dOmegaDk / kSafe * deltaK * deltaK);
      const u1 = Math.max(rng.next(), 1e-9);
      const u2 = rng.next();
      const mag = Math.sqrt(-2 * Math.log(u1));
      const g1 = mag * Math.cos(Math.PI * 2 * u2);
      const g2 = mag * Math.sin(Math.PI * 2 * u2);
      h0[index] = g1 * amplitude / Math.SQRT2;
      h0[index + 1] = g2 * amplitude / Math.SQRT2;
    }
  }
  const packed = new Float32Array(n * n * 4);
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      const im = (n - i) % n;
      const jm = (n - j) % n;
      const src = (j * n + i) * 2;
      const mirror = (jm * n + im) * 2;
      const dst = (j * n + i) * 4;
      packed[dst] = h0[src];
      packed[dst + 1] = h0[src + 1];
      packed[dst + 2] = h0[mirror];
      packed[dst + 3] = -h0[mirror + 1];
    }
  }
  const texture3 = new DataTexture2(packed, n, n, RGBAFormat2, FloatType2);
  texture3.minFilter = NearestFilter2;
  texture3.magFilter = NearestFilter2;
  texture3.generateMipmaps = false;
  texture3.needsUpdate = true;
  return texture3;
}
function cascadeBands(patchLengths, boundaryFactor) {
  const handoff = (index) => Math.PI * 2 / patchLengths[index] * boundaryFactor;
  return patchLengths.map((patchLength, index) => ({
    patchLength,
    cutoffLow: index === 0 ? 1e-4 : handoff(index),
    cutoffHigh: index === patchLengths.length - 1 ? 1e4 : handoff(index + 1)
  }));
}

// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/wave-sim.ts
var OCEAN_PRESET = {
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
  const tex = new StorageTexture2(n, n);
  tex.type = HalfFloatType;
  tex.wrapS = RepeatWrapping;
  tex.wrapT = RepeatWrapping;
  tex.minFilter = LinearFilter;
  tex.magFilter = LinearFilter;
  tex.generateMipmaps = false;
  return tex;
}
var WaveSim = class {
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
    const mask = uint2(n - 1);
    const shift = uint2(logN);
    const bands = cascadeBands(patchLengths, boundaryFactor);
    const cellOf = () => {
      const x = int2(instanceIndex2.bitAnd(mask));
      const y = int2(instanceIndex2.shiftRight(shift));
      return { x, y, cell: ivec22(x, y) };
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
      const evolve = Fn2(() => {
        const { x, y, cell } = cellOf();
        const initial = textureLoad2(texture2(spectrum), cell);
        const centered = vec22(float2(x).sub(n / 2), float2(y).sub(n / 2));
        const k = centered.mul(twoPiOverPatch);
        const kLength = max(k.length(), 1e-4);
        const omega = k.length().mul(float2(sea.gravity)).mul(min(kLength.mul(sea.depth), 20).tanh()).sqrt();
        const phase = omega.mul(this.timeUniform);
        const pc = phase.cos();
        const ps = phase.sin();
        const h = vec22(
          initial.x.mul(pc).sub(initial.y.mul(ps)).add(initial.z.mul(pc).sub(initial.w.mul(ps.negate()))),
          initial.x.mul(ps).add(initial.y.mul(pc)).add(initial.z.mul(ps.negate()).add(initial.w.mul(pc)))
        ).mul(amplitude);
        const ih = vec22(h.y.negate(), h.x);
        const dx = ih.mul(k.x.div(kLength));
        const dz = ih.mul(k.y.div(kLength));
        const horizontal = vec22(dx.x.sub(dz.y), dx.y.add(dz.x));
        textureStore2(freqPing, cell, vec42(h, horizontal));
      })().compute(n * n);
      const spatial = ifft.output;
      const inverseSpacing = n / (2 * band.patchLength);
      const makeAssemble = (previous, next) => Fn2(() => {
        const { x, y, cell } = cellOf();
        const parity = float2(int2(instanceIndex2.bitAnd(mask)).add(int2(instanceIndex2.shiftRight(shift))).bitAnd(int2(1)));
        const sign = float2(1).sub(parity.mul(2));
        const nSign = sign.negate();
        const xp = int2(uint2(x.add(1)).bitAnd(mask));
        const xm = int2(uint2(x.add(n - 1)).bitAnd(mask));
        const yp = int2(uint2(y.add(1)).bitAnd(mask));
        const ym = int2(uint2(y.add(n - 1)).bitAnd(mask));
        const center = textureLoad2(texture2(spatial), cell);
        const right = textureLoad2(texture2(spatial), ivec22(xp, y)).mul(nSign);
        const left = textureLoad2(texture2(spatial), ivec22(xm, y)).mul(nSign);
        const up = textureLoad2(texture2(spatial), ivec22(x, yp)).mul(nSign);
        const down = textureLoad2(texture2(spatial), ivec22(x, ym)).mul(nSign);
        const height = center.x.mul(sign);
        const horizontal = center.zw.mul(sign);
        const slopeX = right.x.sub(left.x).mul(inverseSpacing);
        const slopeZ = up.x.sub(down.x).mul(inverseSpacing);
        const dDxDx = right.z.sub(left.z).mul(inverseSpacing);
        const dDzDz = up.w.sub(down.w).mul(inverseSpacing);
        const dDxDz = up.z.sub(down.z).mul(inverseSpacing);
        const dDzDx = right.w.sub(left.w).mul(inverseSpacing);
        const jxx = float2(1).add(dDxDx.mul(choppiness));
        const jzz = float2(1).add(dDzDz.mul(choppiness));
        const jxz = dDxDz.add(dDzDx).mul(0.5).mul(choppiness);
        const jacobian = jxx.mul(jzz).sub(jxz.mul(jxz));
        const previousHistory = textureLoad2(texture2(previous), cell).w;
        const recovered = previousHistory.add(
          this.dtUniform.mul(foamRecovery).div(max(jacobian, 0.5))
        );
        const history = min(min(jacobian, recovered), 2);
        textureStore2(
          next,
          cell,
          vec42(horizontal.x.mul(choppiness), height, horizontal.y.mul(choppiness), history)
        );
        textureStore2(
          derivativesMap,
          cell,
          vec42(slopeX, slopeZ, dDxDx.mul(choppiness), dDzDz.mul(choppiness))
        );
      })().compute(n * n);
      const makeClear = (target) => Fn2(() => {
        const { cell } = cellOf();
        textureStore2(target, cell, vec42(0, 0, 0, 1));
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
    this.displacementNodes = this.cascades.map((c) => texture2(c.displacementMaps[0]));
    this.derivativeNodes = this.cascades.map((c) => texture2(c.derivativesMap));
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
};
export {
  OCEAN_PRESET,
  WaveSim
};
