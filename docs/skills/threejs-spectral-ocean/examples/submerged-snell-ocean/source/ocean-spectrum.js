import { DataTexture, FloatType, NearestFilter, RGBAFormat } from "three";
const DEFAULT_SEA_STATE = {
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
  const texture = new DataTexture(packed, n, n, RGBAFormat, FloatType);
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;
  return texture;
}
function cascadeBands(patchLengths, boundaryFactor) {
  const handoff = (index) => Math.PI * 2 / patchLengths[index] * boundaryFactor;
  return patchLengths.map((patchLength, index) => ({
    patchLength,
    cutoffLow: index === 0 ? 1e-4 : handoff(index),
    cutoffHigh: index === patchLengths.length - 1 ? 1e4 : handoff(index + 1)
  }));
}
export {
  DEFAULT_SEA_STATE,
  cascadeBands,
  createSpectrumTexture
};
