import { Color, Vector3 } from "three";
import { uniform } from "three/tsl";
const SUN_ELEVATION = 42 * Math.PI / 180;
const SUN_AZIMUTH = 215 * Math.PI / 180;
const sunDirection = new Vector3(
  Math.cos(SUN_ELEVATION) * Math.sin(SUN_AZIMUTH),
  Math.sin(SUN_ELEVATION),
  Math.cos(SUN_ELEVATION) * Math.cos(SUN_AZIMUTH)
).normalize();
const sunColor = new Color(1, 0.925, 0.79);
const SUN_LIGHT_INTENSITY = 3.4;
const sunDirectionUniform = uniform(sunDirection);
const sunColorUniform = uniform(sunColor);
export {
  SUN_LIGHT_INTENSITY,
  sunColor,
  sunColorUniform,
  sunDirection,
  sunDirectionUniform
};
