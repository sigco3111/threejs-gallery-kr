// docs/skills/threejs-procedural-vegetation/examples/procedural-surface-ivy/source/flowers.ts
import * as THREE from "https://esm.sh/three@0.185.1?external";
import { mergeGeometries } from "https://esm.sh/three@0.185.1?external/addons/utils/BufferGeometryUtils.js";
var highGeo = null;
var lowGeo = null;
var highBudGeo = null;
var lowBudGeo = null;
var highMat = null;
var lowMat = null;
function hash(i, k) {
  const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453;
  return x - Math.floor(x);
}
function mergeParts(parts) {
  const flat = parts.map((p) => p.index ? p.toNonIndexed() : p);
  const merged = mergeGeometries(flat, false);
  for (const p of flat) p.dispose();
  for (const p of parts) p.dispose();
  return merged;
}
function colorize(geo, color) {
  const n = geo.attributes.position.count;
  const arr = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    arr[i * 3] = color.r;
    arr[i * 3 + 1] = color.g;
    arr[i * 3 + 2] = color.b;
  }
  geo.setAttribute("color", new THREE.BufferAttribute(arr, 3));
  return geo;
}
function buildUmbel(quality) {
  const high = quality === "high";
  const parts = [];
  const stalkColor = new THREE.Color("#a9b58e");
  const pedicelColor = new THREE.Color("#b9c69c");
  const budColor = new THREE.Color("#ccd8a8");
  const tmpColor = new THREE.Color();
  const stalk = new THREE.CylinderGeometry(0.035, 0.06, 0.72, high ? 6 : 4, 1);
  stalk.translate(0, 0.36, 0);
  parts.push(colorize(stalk, stalkColor));
  const head = new THREE.Vector3(0, 0.76, 0);
  const n = high ? 24 : 11;
  const up = new THREE.Vector3(0, 1, 0);
  const q = new THREE.Quaternion();
  const m = new THREE.Matrix4();
  for (let i = 0; i < n; i++) {
    const y = THREE.MathUtils.lerp(-0.35, 1, (i + 0.5) / n);
    const az = i * 2.39996;
    const hr = Math.sqrt(Math.max(0, 1 - y * y));
    const dir = new THREE.Vector3(hr * Math.cos(az), y, hr * Math.sin(az)).normalize();
    const len = 0.26 + 0.15 * hash(i, 1);
    const pedicel = new THREE.CylinderGeometry(0.011, 0.015, len, 3, 1);
    pedicel.translate(0, len / 2, 0);
    q.setFromUnitVectors(up, dir);
    m.makeRotationFromQuaternion(q).setPosition(head);
    pedicel.applyMatrix4(m);
    parts.push(colorize(pedicel, pedicelColor));
    const budR = 0.055 + 0.03 * hash(i, 2);
    const bud = high ? new THREE.SphereGeometry(budR, 6, 5) : new THREE.IcosahedronGeometry(budR, 0);
    bud.translate(
      head.x + dir.x * (len + budR * 0.45),
      head.y + dir.y * (len + budR * 0.45),
      head.z + dir.z * (len + budR * 0.45)
    );
    tmpColor.copy(budColor).offsetHSL(0, 0, (hash(i, 3) - 0.5) * 0.1);
    parts.push(colorize(bud, tmpColor));
  }
  return mergeParts(parts);
}
function buildBudBall(quality) {
  const high = quality === "high";
  const parts = [];
  const stalkColor = new THREE.Color("#a9b58e");
  const budColor = new THREE.Color("#c3d1a0");
  const tmpColor = new THREE.Color();
  const stalk = new THREE.CylinderGeometry(0.03, 0.05, 0.2, high ? 6 : 4, 1);
  stalk.translate(0, 0.1, 0);
  parts.push(colorize(stalk, stalkColor));
  const center = new THREE.Vector3(0, 0.3, 0);
  const core = high ? new THREE.SphereGeometry(0.1, 8, 6) : new THREE.IcosahedronGeometry(0.1, 0);
  core.translate(center.x, center.y, center.z);
  parts.push(colorize(core, budColor));
  const n = high ? 19 : 9;
  for (let i = 0; i < n; i++) {
    const y = 1 - 2 * (i + 0.5) / n;
    const az = i * 2.39996;
    const hr = Math.sqrt(Math.max(0, 1 - y * y));
    const dir = new THREE.Vector3(hr * Math.cos(az), y, hr * Math.sin(az));
    const budR = 0.05 + 0.018 * hash(i, 4);
    const bud = high ? new THREE.SphereGeometry(budR, 6, 5) : new THREE.IcosahedronGeometry(budR, 0);
    bud.translate(center.x + dir.x * 0.115, center.y + dir.y * 0.115, center.z + dir.z * 0.115);
    tmpColor.copy(budColor).offsetHSL(0, 0, (hash(i, 5) - 0.5) * 0.08);
    parts.push(colorize(bud, tmpColor));
  }
  return mergeParts(parts);
}
function getUmbelGeometry(quality) {
  if (quality === "high") return highGeo ?? (highGeo = buildUmbel("high"));
  return lowGeo ?? (lowGeo = buildUmbel("low"));
}
function getBudBallGeometry(quality) {
  if (quality === "high") return highBudGeo ?? (highBudGeo = buildBudBall("high"));
  return lowBudGeo ?? (lowBudGeo = buildBudBall("low"));
}
function getUmbelMaterial(quality) {
  if (quality === "high") {
    highMat ?? (highMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, metalness: 0 }));
    return highMat;
  }
  lowMat ?? (lowMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, metalness: 0, flatShading: true }));
  return lowMat;
}
export {
  getBudBallGeometry,
  getUmbelGeometry,
  getUmbelMaterial
};
