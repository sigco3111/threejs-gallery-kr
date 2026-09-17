import {
  float,
  If,
  max,
  mix,
  uvec3,
  vec3,
  vec4
} from "three/tsl";
const emitObjectPassFragment = (context) => (vertexPos, worldPos, emitMultiplier, worldMatrix, objVelData, tintFactor) => {
  context.insideBoundingVolume(worldPos, (uvw) => {
    const grid = context.grid.dye;
    const gridDims = uvec3(grid.size.x, grid.size.y, grid.size.z);
    const centerCoord = uvec3(uvw.mul(gridDims));
    const voxelSizeWorld = context.uVolumeWorldSize.div(gridDims);
    const invGridDims = vec3(1).div(gridDims);
    const baseEmission = context.uEmitTemperature.greaterThan(0).select(float(1), float(0));
    const emissionFactor = baseEmission.mul(emitMultiplier);
    const objVelocity = objVelData.xyz;
    const motionVec = objVelocity.mul(context.uDt);
    const densityBaseVal = context.uEmitDensity.mul(float(1 / 20)).mul(emissionFactor);
    const tempBaseVal = context.uEmitTemperature.mul(0.05);
    If(densityBaseVal.greaterThan(0), () => {
      const currentDye = context.texture.dye.A.sample(uvw);
      const addedDensity = densityBaseVal.mul(1);
      const addedTemp = tempBaseVal.mul(1);
      const newDensity = currentDye.r.add(addedDensity).clamp(0, 1);
      const newTemp = currentDye.g.add(addedTemp);
      const addedColorMass = addedDensity.mul(tintFactor);
      const newColorMass = currentDye.a.add(addedColorMass);
      const ageMixWeight = densityBaseVal.div(max(newDensity, 1e-3)).clamp(0, 1);
      const newAge = mix(currentDye.b, float(0), ageMixWeight);
      context.texture.dye.B.write(centerCoord, vec4(newDensity, newTemp, newAge, newColorMass));
    });
  });
};
const emitObjectsVelocityAndDyePassFragment = (context) => (vertexPos, worldPos, emitMultiplier, worldMatrix, objVelData) => {
  context.insideBoundingVolume(worldPos, (uvw) => {
    const grid = context.grid.phy;
    const coord = uvec3(uvw.mul(vec3(grid.size.x, grid.size.y, grid.size.z)));
    const objVelocity = objVelData.xyz;
    const objSpeed = objVelData.w;
    If(objSpeed.greaterThan(1e-3), () => {
      const currentVel = context.texture.vel.B.sample(uvw).xyz;
      const velocityImpulse = objVelocity.mul(-0.1).mul(objSpeed);
      const newVel = currentVel.add(velocityImpulse);
    });
  });
};
export {
  emitObjectPassFragment,
  emitObjectsVelocityAndDyePassFragment
};
