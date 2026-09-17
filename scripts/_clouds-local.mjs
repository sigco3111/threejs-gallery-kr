import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true, channel: "chromium" });
const page = await browser.newContext({ viewport: { width: 1440, height: 900 } }).then(c => c.newPage());

const errors = [];
page.on("pageerror", e => errors.push("PAGE: " + e.message.slice(0, 200)));
page.on("console", m => { if (m.type() === "error") errors.push("CON: " + m.text().slice(0, 200)); });
page.on("response", r => { if (r.status() >= 400) errors.push(`HTTP ${r.status()}: ${r.url().replace("http://127.0.0.1:8765", "")}`); });

await page.goto("http://127.0.0.1:8765/examples/threejs-volumetric-clouds/weather-volume-clouds/", { waitUntil: "domcontentloaded", timeout: 30000 });
await page.waitForTimeout(12000);

const ready = await page.locator("html[data-example-ready='true']").count() > 0;
const title = ready ? await page.locator("#o-title").textContent() : "(not ready)";
console.log("VolumetricClouds ready:", ready);
console.log("Title:", title);
console.log("Errors:", errors.length);
for (const e of errors.slice(0, 8)) console.log("  ", e);

await browser.close();
