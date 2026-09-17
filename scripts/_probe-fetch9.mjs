import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true, channel: "chromium" });
const page = await browser.newContext().then(c => c.newPage());

await page.goto("https://sigco3111.github.io/threejs-gallery-kr/examples/threejs-procedural-materials/raytraced-diamond/", { waitUntil: "domcontentloaded", timeout: 25000 });
await page.waitForTimeout(10000);

const result = await page.evaluate(async () => {
  // Wait for example ready
  await new Promise(r => setTimeout(r, 2000));
  
  // Check current fetch function
  const fetchStr = fetch.toString();
  
  // Test if we can call EXRLoader directly
  let exrInfo = null;
  try {
    const mod = await import("https://esm.sh/three@0.185.1/examples/jsm/loaders/EXRLoader.js?deps=three@0.185.1&external=three");
    const EXRLoader = mod.EXRLoader;
    exrInfo = {
      className: EXRLoader.name,
      loadStr: EXRLoader.prototype.load.toString().slice(0, 100)
    };
  } catch (e) {
    exrInfo = `error: ${e.message}`;
  }
  return { fetchStr, exrInfo };
});
console.log("fetch:", result.fetchStr.slice(0, 200));
console.log("\nEXRLoader info:", result.exrInfo);

await browser.close();
