import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true, channel: "chromium" });
const page = await browser.newContext().then(c => c.newPage());

await page.goto("https://sigco3111.github.io/threejs-gallery-kr/examples/threejs-procedural-materials/raytraced-diamond/", { waitUntil: "domcontentloaded", timeout: 25000 });
await page.waitForTimeout(10000);

// Import inspection-host.js's EXRLoader to compare with scene's
const result = await page.evaluate(async () => {
  // Re-import from same importmap spec
  const mod = await import("three/addons/loaders/EXRLoader.js");
  return {
    className: mod.EXRLoader.name,
    protoLoad: mod.EXRLoader.prototype.load.toString().slice(0, 200)
  };
});
console.log(result);

await browser.close();
