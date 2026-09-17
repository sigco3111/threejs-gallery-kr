import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true, channel: "chromium" });
const page = await browser.newContext().then(c => c.newPage());

await page.goto("https://sigco3111.github.io/threejs-gallery-kr/examples/threejs-procedural-materials/raytraced-diamond/", { waitUntil: "domcontentloaded", timeout: 25000 });
await page.waitForTimeout(3000);

const result = await page.evaluate(() => {
  // Test what new Request(same url, original) does
  const original = new Request("/test-via-request");
  const modified = new Request("https://sigco3111.github.io/threejs-gallery-kr/test-via-request", original);
  return { originalURL: original.url, modifiedURL: modified.url };
});
console.log(result);

await browser.close();
