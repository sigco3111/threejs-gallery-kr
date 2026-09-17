import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true, channel: "chromium" });
const page = await browser.newContext().then(c => c.newPage());

await page.goto("https://sigco3111.github.io/threejs-gallery-kr/examples/threejs-procedural-materials/raytraced-diamond/", { waitUntil: "domcontentloaded", timeout: 25000 });
await page.waitForTimeout(5000);

const result = await page.evaluate(() => {
  // Direct call to our redirect
  const url = new URL("/test", window.location.origin + "/threejs-gallery-kr/").href;
  return { url, origin: window.location.origin };
});
console.log(result);

// Compare: what does window.fetch("/foo") actually do?
const fetched = await page.evaluate(async () => {
  const r = await fetch("/xyz");
  return { status: r.status, url: r.url };
});
console.log("Direct fetch:", fetched);

await browser.close();
