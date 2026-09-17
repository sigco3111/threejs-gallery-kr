import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true, channel: "chromium" });
const page = await browser.newContext().then(c => c.newPage());
await page.goto("https://sigco3111.github.io/threejs-gallery-kr/example-gallery/runtime/index.html?module=/examples/threejs-procedural-vfx/filmic-lens-flare/scene.js", { waitUntil: "domcontentloaded", timeout: 30000 });
await page.waitForTimeout(4000);
const probe = await page.evaluate(() => {
  const probes = {};
  ["TextureLoader", "RGBELoader", "GLTFLoader", "EXRLoader", "CubeTextureLoader", "KTX2Loader", "DRACOLoader"].forEach(name => {
    probes[name] = !!window.THREE?.[name];
  });
  return probes;
});
console.log("Loaders available:", probe);
const fetchPatched = await page.evaluate(() => window.fetch.toString().slice(0, 200));
console.log("fetch patched:", fetchPatched);
await browser.close();
