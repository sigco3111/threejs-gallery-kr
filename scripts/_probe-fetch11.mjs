import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true, channel: "chromium" });
const page = await browser.newContext().then(c => c.newPage());

page.on("request", r => {
  const u = r.url();
  if (u.includes(".exr") || u.includes(".hdr")) {
    console.log(`REQUEST: ${u}`);
  }
});

await page.goto("https://sigco3111.github.io/threejs-gallery-kr/examples/threejs-procedural-materials/raytraced-diamond/", { waitUntil: "domcontentloaded", timeout: 25000 });
await page.waitForTimeout(10000);

const result = await page.evaluate(async () => {
  // Wait for scene to set up
  await new Promise(r => setTimeout(r, 2000));
  // Direct test: call EXRLoader with absolute path
  const mod = await import("three/addons/loaders/EXRLoader.js");
  const loader = new mod.EXRLoader();
  return loader.load("/examples/test-asset.exr").then(r => `OK ${r}`).catch(e => `ERR: ${e.message}`);
});
console.log("Direct load result:", result);

await browser.close();
