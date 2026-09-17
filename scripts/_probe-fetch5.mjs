import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true, channel: "chromium" });
const page = await browser.newContext().then(c => c.newPage());

await page.goto("https://sigco3111.github.io/threejs-gallery-kr/examples/threejs-procedural-materials/raytraced-diamond/", { waitUntil: "domcontentloaded", timeout: 25000 });
await page.waitForTimeout(5000);

// Test fetch from page context — should be wrapped
const result = await page.evaluate(async () => {
  // First, direct fetch
  const r1 = await fetch("/test-direct");
  // Second, fetch via Request
  const req = new Request("/test-via-request");
  const r2 = await fetch(req);
  // Third, fetch in async context with new URL
  return { direct: r1.url, request: r2.url };
});
console.log("Fetch test:", result);

await browser.close();
