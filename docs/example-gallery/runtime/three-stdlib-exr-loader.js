// Single-file EXRLoader re-export using esm.sh so it shares the same three.js
// instance as the rest of the gallery (avoids "Multiple instances of Three.js"
// warnings when a scene imports the stdlib EXRLoader).
export { EXRLoader } from "https://esm.sh/three-stdlib@2.36.0/loaders/EXRLoader.js?deps=three@0.185.1";