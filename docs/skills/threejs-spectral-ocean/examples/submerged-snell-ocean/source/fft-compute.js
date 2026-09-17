// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/fft-compute.ts
import { DataTexture, FloatType, NearestFilter, RGBAFormat } from "https://esm.sh/three@0.185.1?external";
import { StorageBufferAttribute, StorageTexture } from "https://esm.sh/three@0.185.1/webgpu?external=three";
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
} from "https://esm.sh/three@0.185.1/tsl?external=three";
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
    this.stages = [];
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
async function runFftSelfTest(renderer, n = 64) {
  const ping = createFrequencyTexture(n);
  const pong = createFrequencyTexture(n);
  const ifft = new PackedIFFT(ping, pong, n);
  const readBuffer = new StorageBufferAttribute(new Float32Array(n * n * 4), 4);
  const runCase = async (impulseX, impulseY) => {
    const data = new Float32Array(n * n * 4);
    data[(impulseY * n + impulseX) * 4] = 1;
    const input = new DataTexture(data, n, n, RGBAFormat, FloatType);
    input.minFilter = NearestFilter;
    input.magFilter = NearestFilter;
    input.needsUpdate = true;
    const mask = uint(n - 1);
    const shift = uint(Math.log2(n));
    const upload = Fn(() => {
      const x = int(instanceIndex.bitAnd(mask));
      const y = int(instanceIndex.shiftRight(shift));
      textureStore(ping, ivec2(x, y), textureLoad(texture(input), ivec2(x, y)));
    })().compute(n * n);
    renderer.compute(upload);
    for (const stage of ifft.stages) renderer.compute(stage);
    const download = Fn(() => {
      const x = int(instanceIndex.bitAnd(mask));
      const y = int(instanceIndex.shiftRight(shift));
      const value = textureLoad(texture(ifft.output), ivec2(x, y));
      storage(readBuffer, "vec4", n * n).element(instanceIndex).assign(value);
    })().compute(n * n);
    renderer.compute(download);
    const pixels = new Float32Array(await renderer.getArrayBufferAsync(readBuffer));
    input.dispose();
    return pixels;
  };
  const constant = await runCase(n / 2, n / 2);
  let maxErrorConstant = 0;
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const sign = (x + y) % 2 === 0 ? 1 : -1;
      const re = constant[(y * n + x) * 4] * sign;
      const im = constant[(y * n + x) * 4 + 1] * sign;
      maxErrorConstant = Math.max(maxErrorConstant, Math.abs(re - 1), Math.abs(im));
    }
  }
  const wave = await runCase(n / 2 + 1, n / 2);
  let maxErrorWave = 0;
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const sign = (x + y) % 2 === 0 ? 1 : -1;
      const re = wave[(y * n + x) * 4] * sign;
      const im = wave[(y * n + x) * 4 + 1] * sign;
      const phase = Math.PI * 2 * x / n;
      maxErrorWave = Math.max(
        maxErrorWave,
        Math.abs(re - Math.cos(phase)),
        Math.abs(im - Math.sin(phase))
      );
    }
  }
  return { maxErrorConstant, maxErrorWave };
}
export {
  PackedIFFT,
  createFrequencyTexture,
  runFftSelfTest
};
