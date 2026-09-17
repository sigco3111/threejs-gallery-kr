import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true, channel: "chromium" });
const page = await browser.newContext().then(c => c.newPage());

const errors = [];
page.on("pageerror", e => errors.push("PAGE: " + e.message));
page.on("response", r => { if (r.status() >= 400) errors.push(`HTTP ${r.status()}: ${r.url().replace("https://sigco3111.github.io", "")}`); });

await page.goto("https://sigco3111.github.io/threejs-gallery-kr/examples/threejs-procedural-materials/raytraced-diamond/", { waitUntil: "domcontentloaded", timeout: 25000 });
await page.waitForTimeout(8000);

const fetchStr = await page.evaluate(() => fetch.toString().slice(0, 200));
console.log("fetch:", fetchStr);

const probe = await page.evaluate(async () => {
  try {
    const r = await fetch("/test-shim-probe");
    return `HTTP ${r.status}, URL=${r.url}`;
  } catch (e) { return "err: " + e.message; }
});
console.log("Probe:", probe);

console.log("\nErrors:", errors.length);
for (const e of errors.slice(0, 8)) console.log(" ", e);

await browser.close();
