import { cross, length, vec3, vec4 } from "three/tsl";
const vorticityPass = (context) => () => {
  const grid = context.grid.phy;
  const coord = grid.coord;
  const uvw = grid.uvw;
  const texel = grid.texel;
  const velR = context.texture.vel.A.sample(uvw.add(vec3(texel.x, 0, 0))).xyz;
  const velL = context.texture.vel.A.sample(uvw.sub(vec3(texel.x, 0, 0))).xyz;
  const velU = context.texture.vel.A.sample(uvw.add(vec3(0, texel.y, 0))).xyz;
  const velD = context.texture.vel.A.sample(uvw.sub(vec3(0, texel.y, 0))).xyz;
  const velF = context.texture.vel.A.sample(uvw.add(vec3(0, 0, texel.z))).xyz;
  const velB = context.texture.vel.A.sample(uvw.sub(vec3(0, 0, texel.z))).xyz;
  const wx = velU.z.sub(velD.z).sub(velF.y.sub(velB.y)).mul(0.5);
  const wy = velF.x.sub(velB.x).sub(velR.z.sub(velL.z)).mul(0.5);
  const wz = velR.y.sub(velL.y).sub(velU.x.sub(velD.x)).mul(0.5);
  const vorticity = vec3(wx, wy, wz);
  const magnitude = length(vorticity);
  context.texture.vorticity.write(coord, vec4(vorticity, magnitude));
};
const applyVorticity = (context, uvw, texel, vel) => {
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
export {
  applyVorticity,
  vorticityPass
};
