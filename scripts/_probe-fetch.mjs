import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true, channel: "chromium" });
const ctx = await browser.newContext().then(c => c.newPage());

await page.goto("http://127.0.0.1:8765/examples/threejs-procedural-materials/raytraced-diamond/", { waitUntil: "domcontentloaded", timeout: 25000 });
await page.waitForTimeout(8000);

// Test if our fetch wrapper works
const probe = await page.evaluate(async () => {
  const r = await fetch("/test-fetch-shim");
  return `fetch("/test-fetch-shim") → ${r.status} (URL was ${r.url})`;
});
console.log("Fetch probe:", probe);

// Check what fetch.toString looks like
const fetchStr = await page.evaluate(() => fetch.toString().slice(0, 200));
console.log("Current fetch:", fetchStr);

await browser.close();
