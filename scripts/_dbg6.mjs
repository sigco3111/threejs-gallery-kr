import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true, channel: "chromium" });
const page = await browser.newContext().then(c => c.newPage());

const events = [];
page.on("pageerror", e => events.push("PAGE: " + e.message + " @ " + (e.stack || "").split("\n").slice(1, 4).join(" | ")));
page.on("console", m => events.push(`${m.type()}: ${m.text().slice(0, 200)}`));
page.on("response", r => { if (r.status() >= 400) events.push(`${r.status()}: ${r.url()}`); });
page.on("requestfailed", r => events.push(`FAIL: ${r.url()} (${r.failure()?.errorText})`));

await page.goto("https://sigco3111.github.io/threejs-gallery-kr/examples/threejs-atmosphere-aerial-perspective/lut-aerial-perspective/", { waitUntil: "domcontentloaded", timeout: 25000 });
await page.waitForTimeout(8000);
for (const e of events) console.log(e);
await browser.close();
