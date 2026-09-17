import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true, channel: "chromium" });
const page = await browser.newContext().then(c => c.newPage());

page.on("response", r => {
  if (r.url().includes("/examples/threejs-procedural-materials/raytraced-diamond/assets/")) {
    console.log(`FETCH: ${r.status()} ${r.url()}`);
  }
});

await page.goto("https://sigco3111.github.io/threejs-gallery-kr/examples/threejs-procedural-materials/raytraced-diamond/", { waitUntil: "domcontentloaded", timeout: 25000 });
await page.waitForTimeout(8000);

const fetchStr = await page.evaluate(() => fetch.toString().slice(0, 300));
console.log("\nfetch:", fetchStr);

await browser.close();
