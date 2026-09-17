import { float, max, min, smoothstep, vec3, vec4 } from "three/tsl";
import { applyVorticity } from "./vorticityPass";
const advectVelocityPass = (context) => () => {
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
  newVel.addAssign(vec3(0, buoyancyForce, 0).mul(context.uDt));
  const thermalNoisePos = uvw.add(vec3(0, age.negate().mul(0.6), age.mul(0.13)).div(context.uTurbFrequency));
  const decay = age.mul(context.uTurbulenceDecay.negate()).exp();
  const thermalTurbulence = context.texture.curlNoise.sample(thermalNoisePos).xyz.mul(context.uTurbulence).mul(temperature).mul(decay);
  const ambientNoisePos = uvw.add(
    vec3(0, context.uTime.mul(0.15), context.uTime.mul(0.01)).div(context.uTurbFrequency)
  );
  const ambientTurbulence = context.texture.curlNoise.sample(ambientNoisePos).xyz.mul(context.uTurbulence).mul(density);
  const turbulence = thermalTurbulence.add(ambientTurbulence).mul(context.uTurbulence).mul(0.1);
  newVel.addAssign(turbulence.mul(context.uDt));
  newVel.mulAssign(max(float(1).sub(context.uVelDamping.mul(context.uDt)), 0));
  const edge = min(uvw, vec3(1).sub(uvw));
  const boundary = smoothstep(0, 0.02, min(edge.x, min(edge.y, edge.z)));
  newVel.mulAssign(boundary);
  applyVorticity(context, uvw, context.grid.phy.texel, newVel);
  context.texture.vel.B.write(coord, vec4(newVel, 0));
};
export {
  advectVelocityPass
};
