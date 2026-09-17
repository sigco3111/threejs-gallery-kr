import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true, channel: "chromium" });
const page = await browser.newContext().then(c => c.newPage());

const errors = [];
const failed = [];
page.on("pageerror", e => errors.push(`PAGE: ${e.message} @ ${(e.stack || "").split("\n")[1]}`));
page.on("console", m => { if (m.type() === "error") errors.push(`CON: ${m.text().slice(0, 200)}`); });
page.on("response", r => { if (r.status() >= 400) failed.push(`HTTP ${r.status()}: ${r.url().replace("https://sigco3111.github.io", "")}`); });

// Direct load the bundle
await page.goto("https://sigco3111.github.io/threejs-gallery-kr/skills/threejs-atmosphere-aerial-perspective/examples/lut-aerial-perspective/source/atmosphere/index.js", { waitUntil: "domcontentloaded", timeout: 15000 });
await page.waitForTimeout(3000);
for (const e of errors) console.log(e);
for (const f of failed.slice(0, 10)) console.log(f);
await browser.close();
