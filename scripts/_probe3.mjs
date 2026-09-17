import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true, channel: "chromium" });
const page = await browser.newContext().then(c => c.newPage());

await page.goto("https://sigco3111.github.io/threejs-gallery-kr/examples/threejs-procedural-geometry/sculpted-gallery-frame/", { waitUntil: "domcontentloaded", timeout: 25000 });
await page.waitForTimeout(5000);

const probe = await page.evaluate(() => {
  return fetch.toString().slice(0, 200);
});
console.log("Current fetch:", probe);

await browser.close();
