var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import {
  RedFormat,
  RepeatWrapping,
  Vector3,
  Vector4
} from "three";
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
} from "three/tsl";
import { createStorage3D } from "./util/createStorage3D";
import { snoise } from "three/addons/tsl/math/curlNoise.js";
const getVoxelCoord = (id, size) => {
  const x = id.mod(size.x);
  const y = id.div(size.x).mod(size.y);
  const z = id.div(size.x * size.y);
  return uvec3(x, y, z);
};
const gridCoordToUVW = (coord, grid) => vec3(coord).add(0.5).div(vec3(grid.x, grid.y, grid.z));
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
class FluidFireShaderContext {
  constructor(config) {
    /**
     * Size of 1 voxel in physical meters
     */
    __publicField(this, "dyeVoxelSizeWorld");
    // /**
    //  *  Radius in integer voxel count (CPU calculation)
    //  */
    // readonly emitKernelRadius: number;
    __publicField(this, "uTime", uniform(0));
    __publicField(this, "uCurlNoiseMultiplier", uniform(5));
    /**
     * noise force frequency
     */
    __publicField(this, "uTurbFrequency", uniform(4));
    /**
     *  turbulence decay rate over age
     */
    __publicField(this, "uTurbulenceDecay", uniform(0.51));
    /**
     * noise force strength
     */
    __publicField(this, "uTurbulence", uniform(0.9));
    /**
     * smoke dissipation /s (default for 2.5s lifespan)
     */
    __publicField(this, "uDissipation", uniform(0.2));
    /**
     * temperature cooling /s (default for 1.0s lifespan)
     */
    __publicField(this, "uCooling", uniform(0.21));
    __publicField(this, "uEmitDensity", uniform(20));
    __publicField(this, "uEmitTemperature", uniform(15.5));
    /**
     * velocity dissipation /s
     */
    __publicField(this, "uVelDamping", uniform(0.25));
    __publicField(this, "uVolumeWorldSize");
    /**
     * Simulation's delta time
     */
    __publicField(this, "uDt", uniform(0.016));
    /**
     * hot air rises
     */
    __publicField(this, "uBuoyancy", uniform(6.1));
    __publicField(this, "uVorticityConfinementStrength", uniform(0.1));
    /**
     * smoke weight (pulls down)
     */
    __publicField(this, "uWeight", uniform(0.15));
    __publicField(this, "noiseTextureConfig");
    /**
     * offsets in dye grid units for when a vertex will splat data on dye grid
     * This is calculated once on CPU before calling the emitObjectsPass to speed up the process
     *
     * xyz offset + w fallof factor
     */
    __publicField(this, "uVertexSplatBrushOffsets");
    __publicField(this, "uVertexSplatBrushOffsetsCount");
    __publicField(this, "uEmitRadiusWorld");
    /**
     * to turn world space coord to local space of our bounding box
     */
    __publicField(this, "invWorldMatrix");
    __publicField(this, "worldMatrix");
    __publicField(this, "grid");
    __publicField(this, "texture");
    __publicField(this, "collisions");
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
      divergence: makeDataTexture("divergence", config.grid.phy, { format: RedFormat }),
      press: {
        A: makeDataTexture("pressA", config.grid.phy, { format: RedFormat }),
        B: makeDataTexture("pressB", config.grid.phy, { format: RedFormat })
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
}
export {
  FluidFireShaderContext
};
