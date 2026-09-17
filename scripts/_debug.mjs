import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true, channel: "chromium" });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
const page = await ctx.newPage();

const logs = [];
page.on("pageerror", (e) => logs.push("PAGE ERR: " + e.message + " @ " + (e.stack || "").split("\n")[1]));
page.on("console", (m) => logs.push(`[${m.type()}] ${m.text()}`));
page.on("requestfailed", (r) => logs.push(`REQ FAIL: ${r.url()} ${r.failure()?.errorText}`));
page.on("response", (r) => {
  if (r.status() >= 400) logs.push(`RESP ${r.status()}: ${r.url()}`);
});

await page.goto("http://127.0.0.1:8765/example-gallery/runtime/index.html?module=/examples/threejs-procedural-geometry/sculpted-gallery-frame/scene.js", { waitUntil: "domcontentloaded", timeout: 20000 });
await page.waitForTimeout(8000);

console.log("=== Logs ===");
for (const l of logs) console.log(l);

const html = await page.content();
console.log("\n=== HTML state ===");
const ready = html.includes('data-example-ready="true"');
console.log("data-example-ready:", ready);

await browser.close();
