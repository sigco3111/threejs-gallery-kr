// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/seabed-surface.ts
import { float as float2, sin as sin2, smoothstep, uniform, vec2 as vec22 } from "https://esm.sh/three@0.185.1?external/tsl";

// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/noise.ts
import { Fn, Loop, float, fract, dot, floor, mix, sin, vec2, vec3 } from "https://esm.sh/three@0.185.1?external/tsl";
var hash21 = /* @__PURE__ */ Fn(([p]) => {
  const p3 = fract(vec3(p.x, p.y, p.x).mul(0.1031)).toVar();
  p3.addAssign(dot(p3, vec3(p3.y, p3.z, p3.x).add(33.33)));
  return fract(p3.x.add(p3.y).mul(p3.z));
});
var valueNoise2 = /* @__PURE__ */ Fn(([p]) => {
  const i = floor(p).toVar();
  const f = fract(p).toVar();
  const u = f.mul(f).mul(f.mul(-2).add(3)).toVar();
  const a = hash21(i);
  const b = hash21(i.add(vec2(1, 0)));
  const c = hash21(i.add(vec2(0, 1)));
  const d = hash21(i.add(vec2(1, 1)));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
});
var fbm2 = /* @__PURE__ */ Fn(([p]) => {
  const value = float(0).toVar();
  const amplitude = float(0.5).toVar();
  const q = p.toVar();
  Loop({ start: 0, end: 5 }, () => {
    value.addAssign(valueNoise2(q).mul(amplitude));
    const rotated = vec2(
      q.x.mul(0.8).sub(q.y.mul(0.6)),
      q.x.mul(0.6).add(q.y.mul(0.8))
    );
    q.assign(rotated.mul(2.04));
    amplitude.mulAssign(0.5);
  });
  return value;
});

// docs/skills/threejs-spectral-ocean/examples/submerged-snell-ocean/source/seabed-surface.ts
var seabedRippleBakeFlat = uniform(0);
function seabedRippleSlope(worldXZ, footprint) {
  const warp = fbm2(worldXZ.mul(0.09)).mul(7);
  const band = sin2(worldXZ.x.mul(1.9).add(worldXZ.y.mul(0.9)).add(warp));
  const band2 = sin2(worldXZ.x.mul(-1).add(worldXZ.y.mul(2.3)).add(warp.mul(1.4)));
  const micro = valueNoise2(worldXZ.mul(7)).sub(0.5).mul(0.24);
  const bandKeep = footprint ? float2(1).sub(smoothstep(0.6, 2.2, footprint)) : float2(1);
  const microKeep = footprint ? float2(1).sub(smoothstep(0.03, 0.12, footprint)) : float2(1);
  return vec22(band.mul(0.08), band2.mul(0.06)).mul(bandKeep).add(micro.mul(microKeep));
}
export {
  seabedRippleBakeFlat,
  seabedRippleSlope
};
