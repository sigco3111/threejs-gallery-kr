import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true, channel: "chromium" });
const page = await browser.newContext().then(c => c.newPage());

page.on("response", r => {
  const u = r.url();
  if (u.includes("cyberpunk") || u.includes(".hdr") || u.includes(".exr") || u.includes(".glb")) {
    console.log(`HDR/EXR/GLB: HTTP ${r.status()} ${u}`);
  }
});

await page.goto("https://sigco3111.github.io/threejs-gallery-kr/examples/threejs-precipitation-surfaces/wet-puddle-rain/", { waitUntil: "domcontentloaded", timeout: 25000 });
await page.waitForTimeout(8000);

// Test if our fetch wrapper is still active
const probe = await page.evaluate(() => {
  // Test: try fetching an absolute path
  return fetch("/test-probe").then(r => `fetch returned HTTP ${r.status} for /test-probe`).catch(e => "fetch threw: " + e.message);
});
console.log("Probe:", probe);

await browser.close();
