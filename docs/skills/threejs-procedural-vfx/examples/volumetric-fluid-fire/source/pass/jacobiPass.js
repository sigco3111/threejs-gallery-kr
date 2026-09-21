// docs/skills/threejs-procedural-vfx/examples/volumetric-fluid-fire/source/pass/jacobiPass.ts
import { float, If, vec3, vec4 } from "https://esm.sh/three@0.185.1/tsl?deps=three@0.185.1";
var jacobiPass = (context, readFrom, writeTo) => () => {
  const coord = context.grid.phy.coord;
  const uvw = context.grid.phy.uvw;
  const grid = context.grid.phy;
  const voxelLocalPos = uvw.sub(0.5).mul(context.uVolumeWorldSize);
  const currentDist = context.collisions.distanceAtPoint(uvw);
  If(currentDist.lessThanEqual(0), () => {
    writeTo.write(coord, vec4(0));
  }).Else(() => {
    const sumPressure = float(0).toVar();
    const fluidCount = float(0).toVar();
    const checkNeighbor = (u, v, w) => {
      context.collisions.checkCollisionAt(
        grid,
        context.uVolumeWorldSize,
        context.worldMatrix,
        voxelLocalPos,
        uvw,
        vec3(u, v, w),
        // Step direction (ensure checkCollisionAt scales by texelSize!)
        false,
        // HIT (Solid obstacle): Do NOT add to sum or fluid count
        (otherUvw, hitDistance, normal) => {
        },
        // MISS (Open fluid): Accumulate pressure & increment fluid neighbor count
        (otherUvw) => {
          sumPressure.addAssign(readFrom.sample(otherUvw).x);
          fluidCount.addAssign(1);
        }
      );
    };
    checkNeighbor(1, 0, 0);
    checkNeighbor(-1, 0, 0);
    checkNeighbor(0, 1, 0);
    checkNeighbor(0, -1, 0);
    checkNeighbor(0, 0, 1);
    checkNeighbor(0, 0, -1);
    const divergence = context.texture.divergence.sample(uvw).x;
    const finalPressure = float(0).toVar();
    If(fluidCount.greaterThan(0), () => {
      finalPressure.assign(sumPressure.sub(divergence).div(fluidCount));
    });
    writeTo.write(coord, vec4(finalPressure, 0, 0, 0));
  });
};
export {
  jacobiPass
};
