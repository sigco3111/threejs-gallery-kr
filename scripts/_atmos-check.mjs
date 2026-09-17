import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true, channel: "chromium" });
const page = await browser.newContext({ viewport: { width: 1280, height: 720 } }).then(c => c.newPage());

const errors = [];
page.on("pageerror", e => errors.push("PAGE: " + e.message.slice(0, 200)));
page.on("console", m => { if (m.type() === "error") errors.push("CON: " + m.text().slice(0, 200)); });
page.on("response", r => { if (r.status() >= 400) errors.push(`HTTP ${r.status()}: ${r.url().replace("https://sigco3111.github.io", "")}`); });

await page.goto("https://sigco3111.github.io/threejs-gallery-kr/examples/threejs-atmosphere-aerial-perspective/lut-aerial-perspective/", { waitUntil: "domcontentloaded", timeout: 25000 });
await page.waitForTimeout(12000);

const ready = await page.locator("html[data-example-ready='true']").count() > 0;
console.log("Ready:", ready);
console.log("Errors:", errors.length);
for (const e of errors.slice(0, 8)) console.log("  ", e);

await browser.close();
