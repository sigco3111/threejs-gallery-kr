// docs/skills/threejs-procedural-vfx/examples/volumetric-fluid-fire/source/sdf/shape/SDFShape.ts
import { uniformArray } from "https://esm.sh/three@0.185.1?external/tsl";
var ShapeIndex = 0;
var SDFShape = class {
  //protected readonly uCount: UniformNode<"uint", number>;
  constructor(maxCount, name) {
    this.maxCount = maxCount;
    this.name = name;
    this.shapeTypeIndex = ++ShapeIndex;
    this.uDataIndex = uniformArray(
      Array.from({ length: maxCount }, () => 0),
      "uint"
    );
  }
  /**
   * creates a collider on the given object. You can override this (but you must call this too super.createColliderOn ) to configure
   * custom uniforms that your implementation may require. This must be called since it provides basic function.
   *
   * @param proxy object to add collider on. The user will be able to move, rotate, and scale this object, and the collider will follow.
   * @param dataIndex index of the buffer data array where this collider will pull it's data from
   * @param customColliderConfig Configuration for this specific collider.
   * @returns true if successful
   */
  createColliderOn(proxy, dataIndex, customColliderConfig) {
    const slots = this.uDataIndex.array;
    const freeIndex = slots.findIndex((slot) => slot === 0);
    if (freeIndex === -1) {
      throw new Error("No free index found for shape collider");
    }
    slots[freeIndex] = dataIndex;
    return true;
  }
  destroyColliderFrom(proxy, oldDataIndex, oldConfig) {
    const slots = this.uDataIndex.array;
    const index = slots.findIndex((slot) => slot === oldDataIndex);
    if (index !== -1) {
      slots[index] = 0;
    }
  }
  /**
   * This is called once per frame, before running anything. THis is where you update your uniforms.
   * @param proxy
   * @param dataIndex
   * @param delta
   */
  update(proxy, dataIndex, delta) {
  }
  /**
   * @param localPos Position of the query in local space (center of the sdf)
   * @param halfExtents Half extents of the sdf's world. The SDF is thought of as being contained in a box defined by these limits.
   * @see https://en.wikipedia.org/wiki/Signed_distance_function
   */
  sdf(localPos, halfExtents) {
    throw new Error("Not implemented");
  }
};

// docs/skills/threejs-procedural-vfx/examples/volumetric-fluid-fire/source/sdf/shape/SDFEllipsoid.ts
import { length } from "https://esm.sh/three@0.185.1?external/tsl";
var SDFEllipsoid = class extends SDFShape {
  sdf(position, radii) {
    const k0 = length(position.div(radii));
    const k1 = length(position.div(radii.mul(radii)));
    return k0.mul(k0.sub(1)).div(k1);
  }
};
export {
  SDFEllipsoid
};
