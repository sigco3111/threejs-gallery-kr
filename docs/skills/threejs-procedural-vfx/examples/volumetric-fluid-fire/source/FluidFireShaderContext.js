// docs/skills/threejs-procedural-vfx/examples/volumetric-fluid-fire/source/FluidFireShaderContext.ts
import {
  RedFormat as RedFormat2,
  RepeatWrapping,
  Vector3,
  Vector4
} from "https://esm.sh/three@0.185.1?external";
import {
  globalId,
  If,
  min,
  smoothstep,
  storageTexture,
  texture3D,
  textureStore,
  uniform,
  uniformArray,
  uvec3,
  vec3
} from "https://esm.sh/three@0.185.1?external/tsl";

// docs/skills/threejs-procedural-vfx/examples/volumetric-fluid-fire/source/util/createStorage3D.ts
import * as THREE from "https://esm.sh/three@0.185.1?external/webgpu";
function createStorage3D(name, sizeX, sizeY, sizeZ, format = THREE.RGBAFormat, dataType = THREE.HalfFloatType) {
  const texture = new THREE.Storage3DTexture(sizeX, sizeY, sizeZ);
  texture.name = name;
  texture.format = format;
  texture.type = format === THREE.RedFormat ? THREE.FloatType : dataType;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.wrapR = THREE.ClampToEdgeWrapping;
  texture.generateMipmaps = false;
  return texture;
}

// docs/skills/threejs-procedural-vfx/examples/volumetric-fluid-fire/source/FluidFireShaderContext.ts
import { snoise } from "https://esm.sh/three@0.185.1?external/addons/tsl/math/curlNoise.js";
var gridCoordToUVW = (coord, grid) => vec3(coord).add(0.5).div(vec3(grid.x, grid.y, grid.z));
function makeDataTexture(name, size, config) {
  const texture = createStorage3D(name, size.x, size.y, size.z, config?.format, config?.dataType);
  const readOnlyNode = texture3D(texture);
  const writeOnlyNode = storageTexture(texture).toWriteOnly();
  if (config?.wrap) {
    texture.wrapR = config.wrap;
    texture.wrapS = config.wrap;
    texture.wrapT = config.wrap;
  }
  return {
    getTexture() {
      return readOnlyNode.value;
    },
    setTexture(newTexture) {
      readOnlyNode.value = newTexture;
      writeOnlyNode.value = newTexture;
    },
    write(coord, value) {
      textureStore(writeOnlyNode, coord, value);
    },
    sample(uvw) {
      return readOnlyNode.sample(uvw);
    },
    loadPixel(iuvw) {
      return readOnlyNode.load(iuvw);
    }
  };
}
var FluidFireShaderContext = class {
  constructor(config) {
    // /**
    //  *  Radius in integer voxel count (CPU calculation)
    //  */
    // readonly emitKernelRadius: number;
    this.uTime = uniform(0);
    this.uCurlNoiseMultiplier = uniform(5);
    /**
     * noise force frequency
     */
    this.uTurbFrequency = uniform(4);
    /**
     *  turbulence decay rate over age
     */
    this.uTurbulenceDecay = uniform(0.51);
    /**
     * noise force strength
     */
    this.uTurbulence = uniform(0.9);
    /**
     * smoke dissipation /s (default for 2.5s lifespan)
     */
    this.uDissipation = uniform(0.2);
    /**
     * temperature cooling /s (default for 1.0s lifespan)
     */
    this.uCooling = uniform(0.21);
    this.uEmitDensity = uniform(20);
    this.uEmitTemperature = uniform(15.5);
    /**
     * velocity dissipation /s
     */
    this.uVelDamping = uniform(0.25);
    /**
     * Simulation's delta time
     */
    this.uDt = uniform(0.016);
    /**
     * hot air rises
     */
    this.uBuoyancy = uniform(6.1);
    this.uVorticityConfinementStrength = uniform(0.1);
    /**
     * smoke weight (pulls down)
     */
    this.uWeight = uniform(0.15);
    this.noiseTextureConfig = config.noiseTextureConfig;
    this.collisions = config.collisions;
    this.worldMatrix = uniform(config.world.matrixWorld);
    this.invWorldMatrix = uniform(config.world.matrixWorld.invert());
    const phyCoord = globalId;
    const dyeCoord = globalId;
    this.dyeVoxelSizeWorld = new Vector3().copy(config.grid.world).divide(config.grid.dye);
    this.uVertexSplatBrushOffsets = uniformArray([new Vector4()]);
    this.uVertexSplatBrushOffsetsCount = uniform(0, "uint");
    this.uEmitRadiusWorld = uniform(0, "float");
    this.grid = {
      phy: {
        size: config.grid.phy,
        coord: phyCoord,
        uvw: gridCoordToUVW(phyCoord, config.grid.phy),
        texel: {
          x: 1 / config.grid.phy.x,
          y: 1 / config.grid.phy.y,
          z: 1 / config.grid.phy.z
        },
        count: config.grid.phy.x * config.grid.phy.y * config.grid.phy.z
      },
      dye: {
        size: config.grid.dye,
        coord: dyeCoord,
        uvw: gridCoordToUVW(dyeCoord, config.grid.dye),
        texel: {
          x: 1 / config.grid.dye.x,
          y: 1 / config.grid.dye.y,
          z: 1 / config.grid.dye.z
        },
        count: config.grid.dye.x * config.grid.dye.y * config.grid.dye.z
      },
      world: {
        size: config.grid.world
      }
    };
    this.uVolumeWorldSize = uniform(new Vector3(config.grid.world.x, config.grid.world.y, config.grid.world.z));
    this.texture = {
      curlNoise: makeDataTexture(
        "curlNoise",
        {
          x: config.noiseTextureConfig.size,
          y: config.noiseTextureConfig.size,
          z: config.noiseTextureConfig.size
        },
        {
          wrap: RepeatWrapping
        }
      ),
      vel: {
        A: makeDataTexture("velA", config.grid.phy),
        B: makeDataTexture("velB", config.grid.phy)
      },
      dye: {
        A: makeDataTexture("dyeA", config.grid.dye),
        B: makeDataTexture("dyeB", config.grid.dye),
        swap() {
          const tmp = this.A.getTexture();
          this.A.setTexture(this.B.getTexture());
          this.B.setTexture(tmp);
        }
      },
      divergence: makeDataTexture("divergence", config.grid.phy, { format: RedFormat2 }),
      press: {
        A: makeDataTexture("pressA", config.grid.phy, { format: RedFormat2 }),
        B: makeDataTexture("pressB", config.grid.phy, { format: RedFormat2 })
      },
      vorticity: makeDataTexture("vorticity", config.grid.phy)
      // detailNoise: makeDataTexture(
      // 	"detailNoise",
      // 	{
      // 		x: config.noiseTextureConfig.size,
      // 		y: config.noiseTextureConfig.size,
      // 		z: config.noiseTextureConfig.size,
      // 	},
      // 	{ wrap: RepeatWrapping, format: RedFormat },
      // ),
    };
    this.collisions.setBakeTexture(
      // normal + dist
      makeDataTexture("sdf", config.grid.phy),
      //
      makeDataTexture("sdfVelocity", config.grid.phy)
    );
  }
  insideBoundingVolume(worldPos, callMe) {
    const bboxPosition = this.invWorldMatrix.mul(worldPos).xyz;
    const uvw = bboxPosition.div(this.uVolumeWorldSize).add(0.5);
    If(
      uvw.x.greaterThanEqual(0).and(uvw.x.lessThanEqual(1)).and(uvw.y.greaterThanEqual(0)).and(uvw.y.lessThanEqual(1)).and(uvw.z.greaterThanEqual(0)).and(uvw.z.lessThanEqual(1)),
      () => {
        callMe(uvw);
      }
    );
  }
  sampleVolumeAt(worldPos) {
    const bboxPosition = this.invWorldMatrix.mul(worldPos).xyz;
    const uvw = bboxPosition.div(this.uVolumeWorldSize).add(0.5).toVar();
    const noiseDistortion = this.texture.vel.A.sample(uvw).xyz.div(this.uVolumeWorldSize).mul(0.35).mul(this.uTurbulence);
    const distortedUVW = uvw.add(noiseDistortion).clamp(0, 1).toVar();
    const sample = this.texture.dye.A.sample(uvw);
    const density = sample.r.toVar();
    const age = sample.b;
    const temperature = sample.g;
    const colorMass = sample.a;
    const detailNoise = snoise(bboxPosition.mul(5.5).add(vec3(0, age.mul(0.8).negate(), 0))).mul(this.uTurbulence);
    density.mulAssign(detailNoise.mul(0.35).add(0.85));
    const edge = min(distortedUVW, vec3(1).sub(distortedUVW));
    density.mulAssign(smoothstep(0, 0.03, min(edge.x, min(edge.y, edge.z))));
    return { density, temperature, age, distortedUVW, bboxPosition, uvw, colorMass };
  }
};
export {
  FluidFireShaderContext
};
