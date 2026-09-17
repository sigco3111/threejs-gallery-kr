import { float, floor, If, max, vec3, vec4 } from "three/tsl";
const advectDyePass = (context) => () => {
  const coord = context.grid.dye.coord;
  const uvw = context.grid.dye.uvw;
  const grid = context.grid.dye;
  const vel = context.texture.vel.A.sample(uvw).xyz;
  const velUVW = vel.div(context.uVolumeWorldSize);
  const prevPos = uvw.sub(velUVW.mul(context.uDt)).toVar();
  const localPos = uvw.sub(0.5).mul(context.uVolumeWorldSize);
  const worldPos = context.worldMatrix.mul(localPos).xyz;
  const prevDist = context.collisions.distanceAtPoint(uvw).toVar();
  If(prevDist.lessThan(0), () => {
    const normal = context.collisions.normalAtPoint(uvw);
    worldPos.addAssign(normal.mul(prevDist.abs()));
    const correctedLocalPos = context.invWorldMatrix.mul(vec4(worldPos, 1)).xyz;
    prevPos.assign(correctedLocalPos.div(context.uVolumeWorldSize).add(0.5));
  });
  const dye = context.texture.dye.A.sample(prevPos);
  const dissipationFactor = max(float(1).sub(context.uDissipation.mul(context.uDt)), 0);
  const density = dye.r.mul(dissipationFactor).toVar();
  const temperature = dye.g.mul(max(float(1).sub(context.uCooling.mul(context.uDt)), 0)).toVar();
  const tintFactor = dye.a;
  const colorMass = tintFactor.mul(dissipationFactor).toVar();
  const gridDims = vec3(grid.size.x, grid.size.y, grid.size.z);
  const nearestUVW = floor(prevPos.mul(gridDims)).add(0.5).div(gridDims);
  const age = context.texture.dye.A.sample(nearestUVW).b.add(context.uDt).toVar();
  If(density.lessThanEqual(0.01), () => {
    age.assign(0);
  });
  context.texture.dye.B.write(coord, vec4(density, temperature, age, colorMass));
};
export {
  advectDyePass
};
