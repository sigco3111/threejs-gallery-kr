// docs/skills/threejs-procedural-vfx/examples/volumetric-fluid-fire/source/pass/advectVelocityPass.ts
import { float as float2, max, min, smoothstep, vec3 as vec32, vec4 as vec42 } from "https://esm.sh/three@0.185.1?external/tsl";

// docs/skills/threejs-procedural-vfx/examples/volumetric-fluid-fire/source/pass/vorticityPass.ts
import { cross, length, vec3, vec4 } from "https://esm.sh/three@0.185.1?external/tsl";
var applyVorticity = (context, uvw, texel, vel) => {
  const vortData = context.texture.vorticity.sample(uvw);
  const omega = vortData.xyz;
  const vortR = context.texture.vorticity.sample(uvw.add(vec3(texel.x, 0, 0))).w;
  const vortL = context.texture.vorticity.sample(uvw.sub(vec3(texel.x, 0, 0))).w;
  const vortU = context.texture.vorticity.sample(uvw.add(vec3(0, texel.y, 0))).w;
  const vortD = context.texture.vorticity.sample(uvw.sub(vec3(0, texel.y, 0))).w;
  const vortF = context.texture.vorticity.sample(uvw.add(vec3(0, 0, texel.z))).w;
  const vortB = context.texture.vorticity.sample(uvw.sub(vec3(0, 0, texel.z))).w;
  const eta = vec3(vortR.sub(vortL), vortU.sub(vortD), vortF.sub(vortB)).mul(0.5);
  const N = eta.div(length(eta).add(1e-5));
  const confinementForce = cross(N, omega).mul(context.uVorticityConfinementStrength);
  vel.addAssign(confinementForce.mul(context.uDt));
};

// docs/skills/threejs-procedural-vfx/examples/volumetric-fluid-fire/source/pass/advectVelocityPass.ts
var advectVelocityPass = (context) => () => {
  const coord = context.grid.phy.coord;
  const uvw = context.grid.phy.uvw;
  const vel = context.texture.vel.A.sample(uvw).xyz;
  const velUVW = vel.div(context.uVolumeWorldSize);
  const prevPos = uvw.sub(velUVW.mul(context.uDt));
  const newVel = context.texture.vel.A.sample(prevPos).xyz.toVar();
  const dye = context.texture.dye.A.sample(prevPos).toVar();
  const density = dye.r;
  const temperature = dye.g;
  const age = dye.b;
  const buoyancyForce = temperature.mul(context.uBuoyancy).sub(density.mul(context.uWeight));
  newVel.addAssign(vec32(0, buoyancyForce, 0).mul(context.uDt));
  const thermalNoisePos = uvw.add(vec32(0, age.negate().mul(0.6), age.mul(0.13)).div(context.uTurbFrequency));
  const decay = age.mul(context.uTurbulenceDecay.negate()).exp();
  const thermalTurbulence = context.texture.curlNoise.sample(thermalNoisePos).xyz.mul(context.uTurbulence).mul(temperature).mul(decay);
  const ambientNoisePos = uvw.add(
    vec32(0, context.uTime.mul(0.15), context.uTime.mul(0.01)).div(context.uTurbFrequency)
  );
  const ambientTurbulence = context.texture.curlNoise.sample(ambientNoisePos).xyz.mul(context.uTurbulence).mul(density);
  const turbulence = thermalTurbulence.add(ambientTurbulence).mul(context.uTurbulence).mul(0.1);
  newVel.addAssign(turbulence.mul(context.uDt));
  newVel.mulAssign(max(float2(1).sub(context.uVelDamping.mul(context.uDt)), 0));
  const edge = min(uvw, vec32(1).sub(uvw));
  const boundary = smoothstep(0, 0.02, min(edge.x, min(edge.y, edge.z)));
  newVel.mulAssign(boundary);
  applyVorticity(context, uvw, context.grid.phy.texel, newVel);
  context.texture.vel.B.write(coord, vec42(newVel, 0));
};
export {
  advectVelocityPass
};
