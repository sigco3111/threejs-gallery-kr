#!/usr/bin/env node
// Convert all .ts files to .js with esbuild, rewrite internal imports,
// and ensure GitHub Pages can serve them as ES modules.
import { transform } from "esbuild";
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const ROOT = path.join(process.cwd(), "docs");
const tsFiles = [];

async function walk(p, ext) {
  for (const e of await readdir(p, { withFileTypes: true })) {
    const fp = path.join(p, e.name);
    if (e.isDirectory()) await walk(fp, ext);
    else if (e.name.endsWith(ext)) tsFiles.push(fp);
  }
}

await walk(ROOT, ".ts");
console.log(`Found ${tsFiles.length} .ts files`);

let converted = 0;
let errors = 0;
for (const tsPath of tsFiles) {
  try {
    const tsSrc = await readFile(tsPath, "utf8");
    const result = await transform(tsSrc, {
      loader: "ts",
      format: "esm",
      target: "es2020",
      sourcemap: false,
    });
    const jsPath = tsPath.replace(/\.ts$/, ".js");
    await writeFile(jsPath, result.code);
    converted += 1;
  } catch (e) {
    errors += 1;
    console.error(`  FAIL ${path.relative(ROOT, tsPath)}: ${e.message}`);
  }
}
console.log(`Converted ${converted}, errors ${errors}`);

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
console.log(`Rewrote .ts->.js imports in ${rewrote} files`);
console.log("Done.");