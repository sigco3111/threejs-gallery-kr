import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true, channel: "chromium" });
const page = await browser.newContext().then(c => c.newPage());

page.on("response", r => {
  if (r.status() === 404) {
    console.log("404:", r.url().replace("https://sigco3111.github.io", ""));
  }
});

await page.goto("https://sigco3111.github.io/threejs-gallery-kr/examples/threejs-atmosphere-aerial-perspective/lut-aerial-perspective/", { waitUntil: "domcontentloaded", timeout: 25000 });
await page.waitForTimeout(5000);
await browser.close();
