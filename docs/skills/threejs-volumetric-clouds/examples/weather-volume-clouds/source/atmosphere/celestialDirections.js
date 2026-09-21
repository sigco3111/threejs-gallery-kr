// docs/skills/threejs-volumetric-clouds/examples/weather-volume-clouds/source/atmosphere/celestialDirections.ts
import {
  AstroTime,
  Body,
  CombineRotation,
  GeoVector,
  Rotation_EQJ_EQD,
  RotationMatrix,
  SiderealTime
} from "https://esm.sh/astronomy-engine@2.1.19?external";
import { Matrix4, Vector3 } from "https://esm.sh/three@0.185.1?external";
var matrixScratch = /* @__PURE__ */ new Matrix4();
function RotationZ(angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return new RotationMatrix([
    [cos, -sin, 0],
    [sin, cos, 0],
    [0, 0, 1]
  ]);
}
function makeTime(value) {
  return value instanceof AstroTime ? value : new AstroTime(value instanceof Date ? value : new Date(value));
}
function getECIToECEFRotationMatrix(date, result = new Matrix4()) {
  const time = makeTime(date);
  const rotationEQJtoEQD = Rotation_EQJ_EQD(time);
  const rotationEQDtoECEF = RotationZ(SiderealTime(time) * (-Math.PI / 12));
  const { rot } = CombineRotation(rotationEQJtoEQD, rotationEQDtoECEF);
  return result.set(
    rot[0][0],
    rot[0][1],
    rot[0][2],
    0,
    rot[1][0],
    rot[1][1],
    rot[1][2],
    0,
    rot[2][0],
    rot[2][1],
    rot[2][2],
    0,
    0,
    0,
    0,
    1
  );
}
function getDirectionECI(body, time, result) {
  const { x, y, z } = GeoVector(body, time, false);
  return result.set(x, y, z).normalize();
}
function getDirectionECEF(body, time, result) {
  const matrix = getECIToECEFRotationMatrix(time, matrixScratch);
  return getDirectionECI(body, time, result).applyMatrix4(matrix);
}
function getSunDirectionECI(date, result = new Vector3()) {
  return getDirectionECI(Body.Sun, makeTime(date), result);
}
function getMoonDirectionECI(date, result = new Vector3()) {
  return getDirectionECI(Body.Moon, makeTime(date), result);
}
function getSunDirectionECEF(date, result = new Vector3()) {
  return getDirectionECEF(Body.Sun, makeTime(date), result);
}
function getMoonDirectionECEF(date, result = new Vector3()) {
  return getDirectionECEF(Body.Moon, makeTime(date), result);
}
export {
  getECIToECEFRotationMatrix,
  getMoonDirectionECEF,
  getMoonDirectionECI,
  getSunDirectionECEF,
  getSunDirectionECI
};
