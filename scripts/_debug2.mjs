import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true, channel: "chromium" });
const page = await browser.newContext({ viewport: { width: 1440, height: 900 } }).then(c => c.newPage());

const failed = [];
page.on("requestfailed", r => failed.push(`${r.url()} : ${r.failure()?.errorText}`));
page.on("response", r => { if (r.status() >= 400) failed.push(`HTTP ${r.status()}: ${r.url()}`); });

await page.goto("https://sigco3111.github.io/threejs-gallery-kr/examples/threejs-procedural-geometry/sculpted-gallery-frame/", { waitUntil: "domcontentloaded", timeout: 30000 });
await page.waitForTimeout(8000);

const base = await page.evaluate(() => document.baseURI);
const baseEls = await page.evaluate(() => Array.from(document.querySelectorAll("base")).map(b => b.href));
const ready = await page.locator("html[data-example-ready='true']").count() > 0;
console.log("baseURI:", base);
console.log("base elements:", baseEls);
console.log("Ready:", ready);
console.log("\nFailed requests:");
for (const f of failed.slice(0, 10)) console.log("  ", f);

await browser.close();
