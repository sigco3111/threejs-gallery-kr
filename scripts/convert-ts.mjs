#!/usr/bin/env node
// Bundle all .ts source files with esbuild, resolving imports,
// stripping "?raw" query strings, and writing .js alongside.
import { build } from "esbuild";
import { readdir, readFile, writeFile, unlink } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const ROOT = path.join(process.cwd(), "docs");
const tsFiles = [];

async function walk(p) {
  for (const e of await readdir(p, { withFileTypes: true })) {
    const fp = path.join(p, e.name);
    if (e.isDirectory()) await walk(fp);
    else if (e.name.endsWith(".ts")) tsFiles.push(fp);
  }
}

await walk(ROOT);
console.log(`Found ${tsFiles.length} .ts files`);

// Bundle each .ts into a self-contained .js. Imports between .ts files are
// resolved by esbuild (it produces a flat IIFE-free ESM bundle).
let bundled = 0;
let errors = 0;
for (const tsPath of tsFiles) {
  try {
    const result = await build({
      entryPoints: [tsPath],
      bundle: true,
      format: "esm",
      target: "es2022",
      tsconfigRaw: {
        compilerOptions: {
          // Legacy decorator mode — emits simple __decorate helper that
          // works across all browsers (no TC39 native runtime dependency).
          experimentalDecorators: true,
          useDefineForClassFields: false,
          target: "es2022",
          module: "esnext",
          moduleResolution: "bundler",
        },
      },
      supported: {
        "decorators": false,
      },
      write: false,
      sourcemap: false,
      // Critical: alias to esm.sh URLs so esbuild pulls packages that share
      // the SAME three.js instance as the rest of the page (avoids
      // "Multiple instances of Three.js" + Object.defineProperty crashes).
      alias: {
        "postprocessing": "https://esm.sh/postprocessing@6.37.4?deps=three@0.185.1&external=three",
        "three": "https://esm.sh/three@0.185.1?external",
        "three-mesh-bvh": "https://esm.sh/three-mesh-bvh@0.9.10?deps=three@0.185.1&external=three",
        "@petamoriken/float16": "https://esm.sh/@petamoriken/float16@3.9.2?external",
        "fflate": "https://esm.sh/fflate@0.8.2?external",
        "astronomy-engine": "https://esm.sh/astronomy-engine@2.1.19?external",
      },
      loader: {
        ".ts": "ts",
        ".js": "js",
        ".frag": "text",
        ".vert": "text",
        ".glsl": "text",
        ".png": "dataurl",
        ".jpg": "dataurl",
        ".webp": "dataurl",
      },
      plugins: [
        // Strip "?raw" query strings from imports; loader returns text.
        {
          name: "strip-raw",
          setup(build) {
            build.onResolve({ filter: /\?raw$/ }, (args) => {
              const cleanPath = args.path.replace(/\?raw$/, "");
              const resolved = path.isAbsolute(cleanPath)
                ? cleanPath
                : path.resolve(path.dirname(args.importer), cleanPath);
              return { path: resolved, namespace: "file" };
            });
          },
        },
      ],
    });
    const jsPath = tsPath.replace(/\.ts$/, ".js");
    await writeFile(jsPath, result.outputFiles[0].text);
    bundled += 1;
  } catch (e) {
    errors += 1;
    console.error(`  FAIL ${path.relative(ROOT, tsPath)}: ${e.message.split("\n")[0]}`);
  }
}
console.log(`Bundled ${bundled}, errors ${errors}`);

// Strip .ts imports left in any .js (already rewritten from .ts to .js by esbuild).
// (No further rewrite needed for .ts→.js; check just in case.)
let rewrote = 0;
async function walkJs(p) {
  for (const e of await readdir(p, { withFileTypes: true })) {
    const fp = path.join(p, e.name);
    if (e.isDirectory()) await walkJs(fp);
    else if (e.name.endsWith(".js")) {
      const txt = await readFile(fp, "utf8");
      const newTxt = txt
        .replace(/(from\s+["'])([^"']+?)\.ts(["'])/g, '$1$2.js$3')
        .replace(/(import\s*\(\s*["'])([^"']+?)\.ts(["'])/g, '$1$2.js$3');
      if (newTxt !== txt) {
        await writeFile(fp, newTxt);
        rewrote += 1;
      }
    }
  }
}
await walkJs(ROOT);
console.log(`Final import-rewrite pass: ${rewrote} files`);
console.log("Done.");