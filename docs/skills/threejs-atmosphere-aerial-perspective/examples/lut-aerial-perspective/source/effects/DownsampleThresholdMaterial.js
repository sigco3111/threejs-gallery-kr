// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/effects/DownsampleThresholdMaterial.ts
import {
  NoBlending,
  ShaderMaterial,
  Uniform,
  Vector2
} from "https://esm.sh/three@0.185.1?external";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/effects/shaders/downsampleThreshold.frag
var downsampleThreshold_default = "#include <common>\n\nuniform sampler2D inputBuffer;\n\nuniform float thresholdLevel;\nuniform float thresholdRange;\n\nin vec2 vCenterUv1;\nin vec2 vCenterUv2;\nin vec2 vCenterUv3;\nin vec2 vCenterUv4;\nin vec2 vRowUv1;\nin vec2 vRowUv2;\nin vec2 vRowUv3;\nin vec2 vRowUv4;\nin vec2 vRowUv5;\nin vec2 vRowUv6;\nin vec2 vRowUv7;\nin vec2 vRowUv8;\nin vec2 vRowUv9;\n\nfloat clampToBorder(const vec2 uv) {\n  return float(uv.x >= 0.0 && uv.x <= 1.0 && uv.y >= 0.0 && uv.y <= 1.0);\n}\n\n// Reference: https://learnopengl.com/Guest-Articles/2022/Phys.-Based-Bloom\nvoid main() {\n  vec3 color = 0.125 * texture(inputBuffer, vec2(vRowUv5)).rgb;\n  vec4 weight =\n    0.03125 *\n    vec4(\n      clampToBorder(vRowUv1),\n      clampToBorder(vRowUv3),\n      clampToBorder(vRowUv7),\n      clampToBorder(vRowUv9)\n    );\n  color += weight.x * texture(inputBuffer, vec2(vRowUv1)).rgb;\n  color += weight.y * texture(inputBuffer, vec2(vRowUv3)).rgb;\n  color += weight.z * texture(inputBuffer, vec2(vRowUv7)).rgb;\n  color += weight.w * texture(inputBuffer, vec2(vRowUv9)).rgb;\n\n  weight =\n    0.0625 *\n    vec4(\n      clampToBorder(vRowUv2),\n      clampToBorder(vRowUv4),\n      clampToBorder(vRowUv6),\n      clampToBorder(vRowUv8)\n    );\n  color += weight.x * texture(inputBuffer, vec2(vRowUv2)).rgb;\n  color += weight.y * texture(inputBuffer, vec2(vRowUv4)).rgb;\n  color += weight.z * texture(inputBuffer, vec2(vRowUv6)).rgb;\n  color += weight.w * texture(inputBuffer, vec2(vRowUv8)).rgb;\n\n  weight =\n    0.125 *\n    vec4(\n      clampToBorder(vRowUv2),\n      clampToBorder(vRowUv4),\n      clampToBorder(vRowUv6),\n      clampToBorder(vRowUv8)\n    );\n  color += weight.x * texture(inputBuffer, vec2(vCenterUv1)).rgb;\n  color += weight.y * texture(inputBuffer, vec2(vCenterUv2)).rgb;\n  color += weight.z * texture(inputBuffer, vec2(vCenterUv3)).rgb;\n  color += weight.w * texture(inputBuffer, vec2(vCenterUv4)).rgb;\n\n  // WORKAROUND: Avoid screen flashes if the input buffer contains NaN texels.\n  // See: https://github.com/takram-design-engineering/three-geospatial/issues/7\n  if (any(isnan(color))) {\n    gl_FragColor = vec4(vec3(0.0), 1.0);\n    return;\n  }\n\n  float l = luminance(color);\n  float scale = saturate(smoothstep(thresholdLevel, thresholdLevel + thresholdRange, l));\n  gl_FragColor = vec4(color * scale, 1.0);\n}\n";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/effects/shaders/downsampleThreshold.vert
var downsampleThreshold_default2 = "uniform vec2 texelSize;\n\nout vec2 vCenterUv1;\nout vec2 vCenterUv2;\nout vec2 vCenterUv3;\nout vec2 vCenterUv4;\nout vec2 vRowUv1;\nout vec2 vRowUv2;\nout vec2 vRowUv3;\nout vec2 vRowUv4;\nout vec2 vRowUv5;\nout vec2 vRowUv6;\nout vec2 vRowUv7;\nout vec2 vRowUv8;\nout vec2 vRowUv9;\n\nvoid main() {\n  vec2 uv = position.xy * 0.5 + 0.5;\n  vCenterUv1 = uv + texelSize * vec2(-1.0, 1.0);\n  vCenterUv2 = uv + texelSize * vec2(1.0, 1.0);\n  vCenterUv3 = uv + texelSize * vec2(-1.0, -1.0);\n  vCenterUv4 = uv + texelSize * vec2(1.0, -1.0);\n  vRowUv1 = uv + texelSize * vec2(-2.0, 2.0);\n  vRowUv2 = uv + texelSize * vec2(0.0, 2.0);\n  vRowUv3 = uv + texelSize * vec2(2.0, 2.0);\n  vRowUv4 = uv + texelSize * vec2(-2.0, 0.0);\n  vRowUv5 = uv + texelSize;\n  vRowUv6 = uv + texelSize * vec2(2.0, 0.0);\n  vRowUv7 = uv + texelSize * vec2(-2.0, -2.0);\n  vRowUv8 = uv + texelSize * vec2(0.0, -2.0);\n  vRowUv9 = uv + texelSize * vec2(2.0, -2.0);\n\n  gl_Position = vec4(position.xy, 1.0, 1.0);\n}\n";

// docs/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/effects/DownsampleThresholdMaterial.ts
var downsampleThresholdMaterialParametersDefaults = {
  thresholdLevel: 10,
  thresholdRange: 1
};
var DownsampleThresholdMaterial = class extends ShaderMaterial {
  constructor(params) {
    const {
      inputBuffer = null,
      thresholdLevel,
      thresholdRange,
      ...others
    } = {
      ...downsampleThresholdMaterialParametersDefaults,
      ...params
    };
    super({
      name: "DownsampleThresholdMaterial",
      fragmentShader: downsampleThreshold_default,
      vertexShader: downsampleThreshold_default2,
      blending: NoBlending,
      toneMapped: false,
      depthWrite: false,
      depthTest: false,
      ...others,
      uniforms: {
        inputBuffer: new Uniform(inputBuffer),
        texelSize: new Uniform(new Vector2()),
        thresholdLevel: new Uniform(thresholdLevel),
        thresholdRange: new Uniform(thresholdRange),
        ...others.uniforms
      }
    });
  }
  setSize(width, height) {
    this.uniforms.texelSize.value.set(1 / width, 1 / height);
  }
  get inputBuffer() {
    return this.uniforms.inputBuffer.value;
  }
  set inputBuffer(value) {
    this.uniforms.inputBuffer.value = value;
  }
  get thresholdLevel() {
    return this.uniforms.thresholdLevel.value;
  }
  set thresholdLevel(value) {
    this.uniforms.thresholdLevel.value = value;
  }
  get thresholdRange() {
    return this.uniforms.thresholdRange.value;
  }
  set thresholdRange(value) {
    this.uniforms.thresholdRange.value = value;
  }
};
export {
  DownsampleThresholdMaterial,
  downsampleThresholdMaterialParametersDefaults
};
