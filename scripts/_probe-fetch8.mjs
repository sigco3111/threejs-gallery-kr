import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true, channel: "chromium" });
const page = await browser.newContext().then(c => c.newPage());

const fetches = [];
page.on("request", r => {
  const u = r.url();
  if (u.includes("colorful_studio") || u.includes(".exr") || u.includes(".hdr") || u.includes("raytraced")) {
    fetches.push(`REQUEST ${r.method()} ${u}`);
  }
});
page.on("requestfailed", r => {
  fetches.push(`FAILED ${r.url()}`);
});

await page.goto("https://sigco3111.github.io/threejs-gallery-kr/examples/threejs-procedural-materials/raytraced-diamond/", { waitUntil: "domcontentloaded", timeout: 25000 });
await page.waitForTimeout(10000);

console.log("\nAsset-related fetches:");
for (const f of fetches) console.log(" ", f);

await browser.close();
