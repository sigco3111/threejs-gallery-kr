import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true, channel: "chromium" });
const page = await browser.newContext({ viewport: { width: 1440, height: 900 } }).then(c => c.newPage());

const errors = [];
const failed = [];
page.on("pageerror", e => errors.push("PAGE: " + e.message.slice(0, 200)));
page.on("console", m => { if (m.type() === "error" || m.type() === "warning") errors.push(`${m.type()}: ${m.text().slice(0, 200)}`); });
page.on("response", r => { if (r.status() >= 400) failed.push(`HTTP ${r.status()}: ${r.url().replace("https://sigco3111.github.io", "")}`); });

await page.goto("https://sigco3111.github.io/threejs-gallery-kr/examples/threejs-atmosphere-aerial-perspective/lut-aerial-perspective/", { waitUntil: "domcontentloaded", timeout: 25000 });
await page.waitForTimeout(12000);

const ready = await page.locator("html[data-example-ready='true']").count() > 0;
const title = ready ? await page.locator("#o-title").textContent() : "(not ready)";

console.log(`\n=== Atmosphere Example ===`);
console.log(`Ready: ${ready}`);
console.log(`Title: ${title}`);
console.log(`\nErrors/Warnings (${errors.length}):`);
for (const e of errors.slice(0, 10)) console.log("  ", e);
console.log(`\nFailed responses (${failed.length}):`);
for (const f of failed.slice(0, 10)) console.log("  ", f);

if (ready) {
  await page.screenshot({ path: "/tmp/atmos-fixed.png", fullPage: false });
  console.log("\nScreenshot: /tmp/atmos-fixed.png");
}
await browser.close();
