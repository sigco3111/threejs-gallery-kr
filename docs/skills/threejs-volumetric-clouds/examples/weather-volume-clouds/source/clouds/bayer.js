import { Vector2 } from "three";
const bayerIndices = [
  0,
  8,
  2,
  10,
  12,
  4,
  14,
  6,
  3,
  11,
  1,
  9,
  15,
  7,
  13,
  5
];
const bayerOffsets = /* @__PURE__ */ bayerIndices.reduce(
  (result, _, index) => {
    const offset = new Vector2();
    for (let i = 0; i < 16; ++i) {
      if (bayerIndices[i] === index) {
        offset.set((i % 4 + 0.5) / 4, (Math.floor(i / 4) + 0.5) / 4);
        break;
      }
    }
    return [...result, offset];
  },
  []
);
export {
  bayerIndices,
  bayerOffsets
};
