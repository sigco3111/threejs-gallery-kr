var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import {
  AdditiveBlending,
  AxesHelper,
  BoxGeometry,
  Color,
  DoubleSide,
  Layers,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  Vector2,
  Vector3,
  Vector4
} from "three";
import {
  abs,
  color,
  float,
  Fn,
  fract,
  frameId,
  globalId,
  If,
  interleavedGradientNoise,
  ivec3,
  mix,
  pass,
  pow,
  Return,
  screenCoordinate,
  screenUV,
  select,
  smoothstep,
  uniform,
  uniformArray,
  vec3
} from "three/tsl";
import {
  VolumeNodeMaterial
} from "three/webgpu";
import { EmitterManager } from "./EmitterManager";
import { FluidFireShaderContext } from "./FluidFireShaderContext";
import { curlNoisePass } from "./pass/curlNoisePass";
import { advectVelocityPass } from "./pass/advectVelocityPass";
import { divergencePass } from "./pass/divergencePass";
import { jacobiPass } from "./pass/jacobiPass";
import { projectPass } from "./pass/projectPass";
import { advectDyePass } from "./pass/advectDyePass";
import { emitObjectPassFragment, emitObjectsVelocityAndDyePassFragment } from "./pass/emitObjectPass";
import { gaussianBlur } from "three/addons/tsl/display/GaussianBlurNode.js";
import { CollisionHandler } from "./sdf/CollisionHandler";
import { vorticityPass } from "./pass/vorticityPass";
const DEBUG_MODE_IDS = {
  final: 0,
  density: 1,
  temperature: 2,
  velocity: 3,
  colliders: 4
};
class VolumetricFluidFire extends Object3D {
  constructor(renderer, config = {}) {
    super();
    /**
     * User for post-processing this is the node that will contain the volumetric lighting.
     * Usually you would "add" this on top of your sceneNode
     */
    __publicField(this, "getRenderPass");
    /**
     * Returns a proxy objects that will "contain" the fire for that particular emitter's ID.
     */
    __publicField(this, "getFireFor");
    __publicField(this, "objectsManager");
    /**
     * Must be called AFTER `initialize` otherwise it will be `undefined`.
     * This will keep the position of the objects and other data in sync with the data on the GPU.
     */
    __publicField(this, "update");
    /**
     * Call this se we can compute some shaders ( like the to create the noise texture )
     */
    __publicField(this, "initialize");
    /**
     * Data relevant to the compute shaders so they can do their thing...
     */
    __publicField(this, "shaderContext");
    __publicField(this, "simulate", true);
    __publicField(this, "simulationSpeed", 2);
    __publicField(this, "volumetricPass");
    __publicField(this, "config");
    __publicField(this, "volumetricMaterial");
    __publicField(this, "_curlNoiseUpdated", false);
    __publicField(this, "_keyLightPosition", new Vector3());
    __publicField(this, "uKeyLightPosition", uniform(this._keyLightPosition));
    /**
     * Colors to be used in the fire, base color, tier1,2,3 and special color.
     */
    __publicField(this, "uTemperatureColors");
    /**
     * Smoothstep steps for each tier color ( tier 1, 2, 3 )
     */
    __publicField(this, "uTemperatureColorStops");
    __publicField(this, "uTemperatureAtMaxColor", uniform(0));
    //set in the constructor
    // --- New Aesthetic Control Uniforms ---
    __publicField(this, "uRadianceMultiplier", uniform(15));
    // Controls bloom/core intensity
    __publicField(this, "uSpecialColorMultiplier", uniform(8));
    // Overall volumetric opacity scale
    __publicField(this, "uShadowAbsorption", uniform(2));
    // Controls how fast light is blocked by smoke
    __publicField(this, "uTintBlendRange", uniform(new Vector2(0.01, 0.1)));
    // Smooth transition range for colorMass/special tints
    __publicField(this, "uDebugMode", uniform(0, "int"));
    __publicField(this, "collisions");
    const cfg = {
      debug: { renderColliders: false, renderVolumeBox: false, noise: false },
      renderLayer: 10,
      size: {
        boundingBox: new Vector3(10, 10, 10),
        renderResolution: new Vector3(100, 100, 100),
        physicsResolution: new Vector3(64, 64, 64)
      },
      steps: 12,
      burnableMeshes: [],
      noise: {
        size: 64,
        frecuency: 122
      },
      pressureIterations: 4,
      vertexEmissionWorldRadius: 0.02,
      blurStrength: 0,
      colors: {
        baseColor: new Color(0, 0, 0),
        temperatureAtMaxColor: 1,
        //set below...
        byTemperature: {
          tier1: {
            //"smoke"
            color: new Color(1.2, 0.1, 0),
            transition: {
              from: 0.01,
              to: 0.1
            }
          },
          tier2: {
            color: new Color(4, 1.2, 0.05).multiplyScalar(3),
            transition: {
              from: 0.3,
              to: 0.5
            }
          },
          tier3: {
            color: new Color(12, 9, 2).multiplyScalar(3),
            transition: {
              from: 0.7,
              to: 0.8
            }
          }
        },
        specialColor: new Color(65535)
        //debug
      },
      collisions: {
        disabled: false,
        friction: 0.8,
        angularVelocityMultiplier: 1,
        collisionMargin: 0.1,
        maxCollisionShapes: {
          boxes: 32,
          ellipsoids: 32,
          total: 64
        },
        sdfShapes: []
      },
      ...config
    };
    this.config = cfg;
    this.uTemperatureColors = uniformArray(
      [
        cfg.colors.baseColor,
        cfg.colors.byTemperature.tier1.color,
        cfg.colors.byTemperature.tier2.color,
        cfg.colors.byTemperature.tier3.color,
        cfg.colors.specialColor
      ],
      "color"
    );
    this.uTemperatureColorStops = uniformArray(
      [
        new Vector2(
          cfg.colors.byTemperature.tier1.transition.from,
          cfg.colors.byTemperature.tier1.transition.to
        ),
        new Vector2(
          cfg.colors.byTemperature.tier2.transition.from,
          cfg.colors.byTemperature.tier2.transition.to
        ),
        new Vector2(
          cfg.colors.byTemperature.tier3.transition.from,
          cfg.colors.byTemperature.tier3.transition.to
        )
      ],
      "vec2"
    );
    this.temperatureAtMaxColor = cfg.colors.temperatureAtMaxColor;
    if (cfg.debug.renderVolumeBox) {
      this.add(new AxesHelper(0.1));
      this.add(
        new Mesh(
          new BoxGeometry(cfg.size.boundingBox.x, cfg.size.boundingBox.y, cfg.size.boundingBox.z),
          new MeshBasicMaterial({ wireframe: true })
        )
      );
    }
    this.objectsManager = new EmitterManager(cfg.burnableMeshes);
    this.collisions = new CollisionHandler(cfg.collisions);
    this.shaderContext = new FluidFireShaderContext({
      world: this,
      grid: {
        phy: cfg.size.physicsResolution,
        dye: cfg.size.renderResolution,
        world: cfg.size.boundingBox
      },
      noiseTextureConfig: cfg.noise,
      collisions: this.collisions
    });
    this.vertexEmissionRadius = cfg.vertexEmissionWorldRadius;
    const WORKGROUP_3D = [4, 4, 4];
    const PHYS_DISPATCH = [
      Math.ceil(cfg.size.physicsResolution.x / WORKGROUP_3D[0]),
      // 64 / 4 = 16
      Math.ceil(cfg.size.physicsResolution.y / WORKGROUP_3D[1]),
      // 64 / 4 = 16
      Math.ceil(cfg.size.physicsResolution.z / WORKGROUP_3D[2])
      // 64 / 4 = 16
    ];
    const DYE_DISPATCH = [
      Math.ceil(cfg.size.renderResolution.x / WORKGROUP_3D[0]),
      // 100 / 4 = 25
      Math.ceil(cfg.size.renderResolution.y / WORKGROUP_3D[1]),
      // 100 / 4 = 25
      Math.ceil(cfg.size.renderResolution.z / WORKGROUP_3D[2])
      // 100 / 4 = 25
    ];
    const NOISE_DISPATCH = [
      Math.ceil(cfg.noise.size / WORKGROUP_3D[0]),
      Math.ceil(cfg.noise.size / WORKGROUP_3D[1]),
      Math.ceil(cfg.noise.size / WORKGROUP_3D[2])
    ];
    const phyGridRes = cfg.size.physicsResolution;
    const dyeGridRes = cfg.size.renderResolution;
    const inBoundsRun = (name, grid, DISPATCH, execPass) => {
      return Fn(() => {
        const coord = globalId;
        const gridResolution = ivec3(grid.x, grid.y, grid.z);
        If(
          coord.x.lessThan(0).or(coord.x.greaterThanEqual(gridResolution.x)).or(coord.y.lessThan(0).or(coord.y.greaterThanEqual(gridResolution.y))).or(coord.z.lessThan(0).or(coord.z.greaterThanEqual(gridResolution.z))),
          () => {
            Return();
          }
        );
        execPass();
      })().compute(DISPATCH, WORKGROUP_3D).setName(name);
    };
    const pressTexture = this.shaderContext.texture.press;
    const computeShaders = {
      vorticityPass: inBoundsRun("Vorticity", phyGridRes, PHYS_DISPATCH, vorticityPass(this.shaderContext)),
      bakeColliders: inBoundsRun(
        "Bake Colliders",
        phyGridRes,
        PHYS_DISPATCH,
        this.collisions.bakeCollidersPass(this.shaderContext)
      ),
      curlPassCompute: inBoundsRun(
        "Curl Noise",
        { x: cfg.noise.size, y: cfg.noise.size, z: cfg.noise.size },
        NOISE_DISPATCH,
        curlNoisePass(this.shaderContext)
      ),
      advectPassCompute: inBoundsRun(
        "Advect Velocity",
        phyGridRes,
        PHYS_DISPATCH,
        advectVelocityPass(this.shaderContext)
      ),
      divPassCompute: inBoundsRun("Divergence", phyGridRes, PHYS_DISPATCH, divergencePass(this.shaderContext)),
      jacobiPassABCompute: inBoundsRun(
        "jacobiABCompute",
        phyGridRes,
        PHYS_DISPATCH,
        jacobiPass(this.shaderContext, pressTexture.A, pressTexture.B)
      ),
      jacobiPassBACompute: inBoundsRun(
        "jacobiBACompute",
        phyGridRes,
        PHYS_DISPATCH,
        jacobiPass(this.shaderContext, pressTexture.B, pressTexture.A)
      ),
      projectCompute: inBoundsRun("Project", phyGridRes, PHYS_DISPATCH, projectPass(this.shaderContext)),
      advectDyeCompute: inBoundsRun("Advect Dye", dyeGridRes, DYE_DISPATCH, advectDyePass(this.shaderContext)),
      objectsPassCompute: this.objectsManager.computeNodePerVertex(emitObjectPassFragment(this.shaderContext)).setName("emit Ojects"),
      emitObjectsVelocityAndDyePass: this.objectsManager.computeNodePerVertex(emitObjectsVelocityAndDyePassFragment(this.shaderContext)).setName("emitVelocityAndDye")
    };
    const calculateScattering = Fn(([posRay]) => {
      const { density, temperature, colorMass, bboxPosition, uvw } = this.shaderContext.sampleVolumeAt(posRay);
      const crispDensity = pow(density, float(1.5));
      const t = temperature;
      const radiance = t.pow(3).mul(this.uRadianceMultiplier).add(1);
      const uShadowAbsorption = this.uShadowAbsorption;
      const selfAbsorption = crispDensity.mul(uShadowAbsorption).negate().exp();
      const fireAbsorption = mix(float(1), selfAbsorption, smoothstep(0.2, 0, t));
      const finalTemperature = t.div(this.uTemperatureAtMaxColor);
      const palette = this.uTemperatureColors;
      const temp0Color = palette.element(0);
      const temp1Color = palette.element(1);
      const temp2Color = palette.element(2);
      const temp3Color = palette.element(3);
      const specialColor = palette.element(4);
      const tintMask = mix(color("black"), specialColor, colorMass);
      const colorStops = this.uTemperatureColorStops;
      const temp1Stop = colorStops.element(0);
      const temp2Stop = colorStops.element(1);
      const temp3Stop = colorStops.element(2);
      const fireColor = mix(
        temp0Color,
        mix(
          temp1Color,
          mix(temp2Color, temp3Color, smoothstep(temp3Stop.x, temp3Stop.y, finalTemperature)),
          smoothstep(temp2Stop.x, temp2Stop.y, finalTemperature)
        ),
        smoothstep(temp1Stop.x, temp1Stop.y, finalTemperature)
      );
      const normalColor = fireColor.mul(radiance).mul(crispDensity).mul(fireAbsorption);
      const outColor = normalColor.toVar();
      If(colorMass.greaterThan(0.1), () => {
        outColor.assign(vec3(normalColor.length()).mul(specialColor));
      });
      If(this.uDebugMode.equal(1), () => {
        outColor.assign(vec3(density));
      });
      If(this.uDebugMode.equal(2), () => {
        outColor.assign(vec3(finalTemperature));
      });
      If(this.uDebugMode.equal(3), () => {
        outColor.assign(abs(this.shaderContext.texture.vel.A.sample(uvw).xyz).div(5));
      });
      If(this.uDebugMode.equal(4), () => {
        outColor.assign(vec3(0));
        this.shaderContext.collisions.drawDebugShapes(outColor, uvw);
      });
      if (this.config.debug.renderColliders) this.shaderContext.collisions.drawDebugShapes(outColor, uvw);
      return outColor;
    });
    const renderNoiseTexture = Fn(([posRay]) => {
      const bboxPosition = this.shaderContext.invWorldMatrix.mul(posRay).xyz;
      const uvw = bboxPosition.div(this.shaderContext.uVolumeWorldSize).add(0.5).toVar();
      return this.shaderContext.texture.curlNoise.sample(uvw);
    });
    const volumetricMaterial = new VolumeNodeMaterial({
      transparent: true,
      blending: AdditiveBlending,
      side: DoubleSide,
      // ADD THIS so you can see it while the camera is inside
      steps: cfg.steps,
      depthWrite: false,
      //
      //offsetNode: bayer16(screenCoordinate).mul(0.42),
      offsetNode: fract(interleavedGradientNoise(screenCoordinate).add(float(frameId).mul(0.118033988749895))),
      //offsetNode: interleavedGradientNoise(screenCoordinate),
      //offsetNode,
      scatteringNode: ({ positionRay }) => {
        return this.config.debug.noise ? renderNoiseTexture(positionRay) : calculateScattering(positionRay);
      }
    });
    this.volumetricMaterial = volumetricMaterial;
    const volumetricMesh = new Mesh(
      new BoxGeometry(
        this.shaderContext.grid.world.size.x,
        this.shaderContext.grid.world.size.y,
        this.shaderContext.grid.world.size.z
      ),
      volumetricMaterial
    );
    volumetricMesh.receiveShadow = true;
    volumetricMesh.layers.disableAll();
    volumetricMesh.layers.enable(cfg.renderLayer);
    volumetricMesh.frustumCulled = false;
    this.add(volumetricMesh);
    this.getRenderPass = (scene, camera, sceneDepthTextureNode) => {
      volumetricMaterial.depthNode = sceneDepthTextureNode.sample(screenUV);
      const volumetricLayer = new Layers();
      volumetricLayer.disableAll();
      volumetricLayer.enable(cfg.renderLayer);
      const volumetricPass = pass(scene, camera, { depthBuffer: false }).toInspector("Fire Pass");
      volumetricPass.name = "Volumetric Lighting";
      volumetricPass.setLayers(volumetricLayer);
      volumetricPass.setResolutionScale(0.75);
      const uBlurStrength = uniform(this.blurStrength);
      uBlurStrength.onObjectUpdate(({ object }) => this.blurStrength);
      const blurredVolumetricPass = gaussianBlur(volumetricPass, uBlurStrength, 0.1);
      this.volumetricPass = volumetricPass;
      const uBlurEnabled = uniform(this.config.blurStrength);
      uBlurEnabled.onObjectUpdate(({ object }) => {
        uBlurEnabled.value = this.config.blurStrength;
      });
      return Fn(() => {
        const useBlur = uBlurEnabled.greaterThan(0);
        return select(useBlur, blurredVolumetricPass, volumetricPass);
      })();
    };
    this.getFireFor = (id, options) => {
      return this.objectsManager.getFireFor(id, options);
    };
    this.initialize = async () => {
      if (this.update) {
        console.warn("This fire object was already initialized");
        return;
      }
      await renderer.computeAsync(computeShaders.curlPassCompute);
      let frame = 0;
      let simulationTime = 0;
      let lastTime = performance.now();
      let simAccumulator = 0;
      let simDelta = 0;
      const stepTime = 1 / 30;
      let inv = this.matrixWorld.clone();
      this.update = (dt) => {
        this.updateWorldMatrix(true, true);
        dt = Math.min(dt, 1 / 60);
        if (this._curlNoiseUpdated) {
          renderer.compute(computeShaders.curlPassCompute);
          this._curlNoiseUpdated = false;
        }
        if (this.config.debug.noise) return;
        this.shaderContext.worldMatrix.value = this.matrixWorld;
        inv.copy(this.matrixWorld).invert();
        this.shaderContext.invWorldMatrix.value = inv;
        this.objectsManager.update(dt);
        this.collisions.update(dt);
        const currentTime = performance.now();
        const delta = Math.min((currentTime - lastTime) * 1e-3, 1 / 30);
        lastTime = currentTime;
        if (this.simulate && this.simulationSpeed > 0) {
          simDelta = delta * this.simulationSpeed;
          simAccumulator += simDelta;
          const simStep = stepTime * this.simulationSpeed;
          const maxAccumulator = simStep * 2;
          if (simAccumulator > maxAccumulator) {
            simAccumulator = maxAccumulator;
          }
          this.shaderContext.uDt.value = simStep;
          renderer.compute(computeShaders.bakeColliders);
          while (simAccumulator >= simStep) {
            simulationTime += simStep;
            this.shaderContext.uTime.value = simulationTime;
            renderer.compute(computeShaders.vorticityPass);
            renderer.compute(computeShaders.advectPassCompute);
            renderer.compute(computeShaders.divPassCompute);
            for (let i = 0; i < cfg.pressureIterations; i++) {
              renderer.compute(
                i % 2 === 0 ? computeShaders.jacobiPassABCompute : computeShaders.jacobiPassBACompute
                // read pressureB(R) + divergence(R) -> write pressureA(R)
              );
            }
            renderer.compute(computeShaders.projectCompute);
            renderer.compute(computeShaders.advectDyeCompute);
            renderer.compute(computeShaders.objectsPassCompute);
            this.shaderContext.texture.dye.swap();
            simAccumulator -= simStep;
          }
        }
      };
    };
  }
  get vorticityConfinementStrength() {
    return this.shaderContext.uVorticityConfinementStrength.value;
  }
  set vorticityConfinementStrength(value) {
    this.shaderContext.uVorticityConfinementStrength.value = value;
  }
  get temperature() {
    return this.shaderContext.uEmitTemperature.value;
  }
  set temperature(value) {
    this.shaderContext.uEmitTemperature.value = value;
  }
  get fireDensity() {
    return this.shaderContext.uEmitDensity.value;
  }
  set fireDensity(value) {
    this.shaderContext.uEmitDensity.value = value;
  }
  get turbulenceFrecuency() {
    return this.shaderContext.uTurbFrequency.value;
  }
  set turbulenceFrecuency(value) {
    this.shaderContext.uTurbFrequency.value = value;
    this._curlNoiseUpdated = true;
  }
  get turbulenceDecay() {
    return this.shaderContext.uTurbulenceDecay.value;
  }
  set turbulenceDecay(value) {
    this.shaderContext.uTurbulenceDecay.value = value;
  }
  get turbulence() {
    return this.shaderContext.uTurbulence.value;
  }
  set turbulence(value) {
    this.shaderContext.uTurbulence.value = value;
    this._curlNoiseUpdated = true;
  }
  get densityDissipation() {
    return this.shaderContext.uDissipation.value;
  }
  set densityDissipation(value) {
    this.shaderContext.uDissipation.value = value;
  }
  get cooling() {
    return this.shaderContext.uCooling.value;
  }
  set cooling(value) {
    this.shaderContext.uCooling.value = value;
  }
  get velocityDamping() {
    return this.shaderContext.uVelDamping.value;
  }
  set velocityDamping(value) {
    this.shaderContext.uVelDamping.value = value;
  }
  get buoyancy() {
    return this.shaderContext.uBuoyancy.value;
  }
  set buoyancy(value) {
    this.shaderContext.uBuoyancy.value = value;
  }
  get smokeWeight() {
    return this.shaderContext.uWeight.value;
  }
  set smokeWeight(value) {
    this.shaderContext.uWeight.value = value;
  }
  get pressureIterations() {
    return this.config.pressureIterations;
  }
  set pressureIterations(value) {
    this.config.pressureIterations = value;
  }
  get curlNoiseMultiplier() {
    return this.shaderContext.uCurlNoiseMultiplier.value;
  }
  set curlNoiseMultiplier(value) {
    this.shaderContext.uCurlNoiseMultiplier.value = value;
    this._curlNoiseUpdated = true;
  }
  get keyLightPosition() {
    return this._keyLightPosition;
  }
  set keyLightPosition(value) {
    this._keyLightPosition.copy(value);
    this.uKeyLightPosition.value = this._keyLightPosition;
  }
  get blurStrength() {
    return this.config.blurStrength;
  }
  set blurStrength(value) {
    this.config.blurStrength = value;
  }
  get temperatureAtMaxColor() {
    return this.config.colors.temperatureAtMaxColor;
  }
  set temperatureAtMaxColor(value) {
    this.config.colors.temperatureAtMaxColor = value;
    this.uTemperatureAtMaxColor.value = value;
  }
  get vertexEmissionRadius() {
    return this.config.vertexEmissionWorldRadius;
  }
  set vertexEmissionRadius(value) {
    this.config.vertexEmissionWorldRadius = value;
    const k = new Vector3(13, 13, 13);
    const radiusSq = k.lengthSq();
    const offsets = [];
    for (let dx = -k.x; dx <= k.x; dx++)
      for (let dy = -k.y; dy <= k.y; dy++)
        for (let dz = -k.z; dz <= k.z; dz++) {
          const _radiussq = dx * dx + dy * dy + dz * dz;
          offsets.push([dx, dy, dz, 1 - _radiussq / radiusSq]);
        }
    this.shaderContext.uEmitRadiusWorld.value = value;
    this.shaderContext.uVertexSplatBrushOffsetsCount.value = offsets.length;
    this.shaderContext.uVertexSplatBrushOffsets.array = offsets.map(([x, y, z, w]) => new Vector4(x, y, z, w));
  }
  get friction() {
    return this.collisions.uFriction.value;
  }
  set friction(value) {
    this.collisions.uFriction.value = value;
  }
  get angularVelocityMultiplier() {
    return this.collisions.config.angularVelocityMultiplier;
  }
  set angularVelocityMultiplier(value) {
    this.collisions.config.angularVelocityMultiplier = value;
  }
  get collisionMargin() {
    return this.collisions.collisionMargin;
  }
  set collisionMargin(v) {
    this.collisions.collisionMargin = v;
  }
  get colorRadianceMultiplier() {
    return this.uRadianceMultiplier.value;
  }
  set colorRadianceMultiplier(v) {
    this.uRadianceMultiplier.value = v;
  }
  getColor(type) {
    switch (type) {
      case "base":
        return this.config.colors.baseColor;
      case "tier1":
        return this.config.colors.byTemperature.tier1.color;
      case "tier2":
        return this.config.colors.byTemperature.tier2.color;
      case "tier3":
        return this.config.colors.byTemperature.tier3.color;
      case "special":
        return this.config.colors.specialColor;
    }
  }
  setColor(type, value) {
    const colors = this.uTemperatureColors.array;
    switch (type) {
      case "base":
        this.config.colors.baseColor = value;
        colors[0] = value;
        break;
      case "tier1":
        this.config.colors.byTemperature.tier1.color = value;
        colors[1] = value;
        break;
      case "tier2":
        this.config.colors.byTemperature.tier2.color = value;
        colors[2] = value;
        break;
      case "tier3":
        this.config.colors.byTemperature.tier3.color = value;
        colors[3] = value;
        break;
      case "special":
        this.config.colors.specialColor = value;
        colors[4] = value;
        break;
    }
  }
  getColorStop(tier) {
    switch (tier) {
      case "tier1":
        return this.config.colors.byTemperature.tier1.transition;
      case "tier2":
        return this.config.colors.byTemperature.tier2.transition;
      case "tier3":
        return this.config.colors.byTemperature.tier3.transition;
    }
  }
  setColorStop(tier, transition) {
    const stops = this.uTemperatureColorStops.array;
    const palette = this.config.colors.byTemperature;
    switch (tier) {
      case "tier1":
        palette.tier1.transition = transition;
        stops[0].x = transition.from;
        stops[0].y = transition.to;
        break;
      case "tier2":
        palette.tier2.transition = transition;
        stops[1].x = transition.from;
        stops[1].y = transition.to;
        break;
      case "tier3":
        palette.tier3.transition = transition;
        stops[2].x = transition.from;
        stops[2].y = transition.to;
        break;
    }
  }
  // private _blurIterations = 1;
  // get blurIterations() {
  // 	return this._blurIterations;
  // }
  // set blurIterations(value: number) {
  // 	this._blurIterations = value;
  // }
  /**
   * Get the current settings of the fire simulation as a snapshot
   */
  getSettingsSnapshot() {
    return {
      resolution: this.volumetricPass.getResolutionScale(),
      vorticityConfinementStrength: this.vorticityConfinementStrength,
      vertexEmissionRadius: this.vertexEmissionRadius,
      blurStrength: this.blurStrength,
      steps: this.config.steps,
      simulationSpeed: this.simulationSpeed,
      temperature: this.temperature,
      fireDensity: this.fireDensity,
      turbulenceFrecuency: this.turbulenceFrecuency,
      turbulenceDecay: this.turbulenceDecay,
      turbulence: this.turbulence,
      friction: this.friction,
      angularVelocityMultiplier: this.angularVelocityMultiplier,
      collisionMargin: this.collisionMargin,
      densityDissipation: this.densityDissipation,
      cooling: this.cooling,
      velocityDamping: this.velocityDamping,
      buoyancy: this.buoyancy,
      smokeWeight: this.smokeWeight,
      pressureIterations: this.pressureIterations,
      curlNoiseMultiplier: this.curlNoiseMultiplier,
      colorBase: this.getColor("base").toJSON(),
      colorTier1: this.getColor("tier1").toJSON(),
      colorTier2: this.getColor("tier2").toJSON(),
      colorTier3: this.getColor("tier3").toJSON(),
      colorSpecial: this.getColor("special").toJSON(),
      colorRadianceMultiplier: this.colorRadianceMultiplier,
      tier1Stop: this.getColorStop("tier1"),
      tier2Stop: this.getColorStop("tier2"),
      tier3Stop: this.getColorStop("tier3"),
      temperatureAtMaxColor: this.temperatureAtMaxColor,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  /**
   * Apply a settings snapshot to the fire simulation
   */
  applySettingsSnapshot(snapshot) {
    this.vorticityConfinementStrength = snapshot.vorticityConfinementStrength;
    this.volumetricPass.setResolutionScale(snapshot.resolution);
    this.vertexEmissionRadius = snapshot.vertexEmissionRadius;
    this.config.steps = snapshot.steps;
    this.volumetricMaterial.steps = snapshot.steps;
    this.simulationSpeed = snapshot.simulationSpeed;
    this.temperature = snapshot.temperature;
    this.fireDensity = snapshot.fireDensity;
    this.turbulenceFrecuency = snapshot.turbulenceFrecuency;
    this.turbulenceDecay = snapshot.turbulenceDecay;
    this.turbulence = snapshot.turbulence;
    this.collisionMargin = snapshot.collisionMargin;
    this.friction = snapshot.friction;
    this.densityDissipation = snapshot.densityDissipation;
    this.cooling = snapshot.cooling;
    this.velocityDamping = snapshot.velocityDamping;
    this.buoyancy = snapshot.buoyancy;
    this.smokeWeight = snapshot.smokeWeight;
    this.pressureIterations = snapshot.pressureIterations;
    this.curlNoiseMultiplier = snapshot.curlNoiseMultiplier;
    this.blurStrength = snapshot.blurStrength;
    this.angularVelocityMultiplier = snapshot.angularVelocityMultiplier;
    this.setColor("base", new Color().setHex(snapshot.colorBase));
    this.setColor("tier1", new Color().setHex(snapshot.colorTier1));
    this.setColor("tier2", new Color().setHex(snapshot.colorTier2));
    this.setColor("tier3", new Color().setHex(snapshot.colorTier3));
    this.setColor("special", new Color().setHex(snapshot.colorSpecial));
    this.setColorStop("tier1", snapshot.tier1Stop);
    this.setColorStop("tier2", snapshot.tier2Stop);
    this.setColorStop("tier3", snapshot.tier3Stop);
    this.colorRadianceMultiplier = snapshot.colorRadianceMultiplier;
    this.temperatureAtMaxColor = snapshot.temperatureAtMaxColor;
  }
  setDebugMode(mode) {
    this.uDebugMode.value = DEBUG_MODE_IDS[mode] ?? DEBUG_MODE_IDS.final;
  }
  /**
   * Use the object as a proxy to control a collider in the simulation.
   *
   * @param obj This object will be used to position and transform the collider in the simulation. You can movie it around and the simulation will sync.
   * @param colliderType
   */
  makeObjectCollidable(obj, colliderType) {
    this.collisions.makeObjectCollidable(obj, colliderType);
  }
}
export {
  VolumetricFluidFire
};
