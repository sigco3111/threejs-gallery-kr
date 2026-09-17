import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true, channel: "chromium" });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
const page = await ctx.newPage();

page.on("pageerror", e => console.log("PAGE ERR:", e.message));
page.on("console", m => { if (m.type() === "error") console.log("CON ERR:", m.text().slice(0, 200)); });
page.on("response", r => { if (r.status() >= 400) console.log(`HTTP ${r.status()}: ${r.url()}`); });

await page.goto("https://sigco3111.github.io/threejs-gallery-kr/examples/threejs-procedural-geometry/formula-one-race-car/", { waitUntil: "domcontentloaded", timeout: 30000 });
await page.waitForTimeout(8000);
const ready = await page.locator("html[data-example-ready='true']").count() > 0;
console.log("Ready:", ready);
await browser.close();
