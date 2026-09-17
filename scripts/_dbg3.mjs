import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true, channel: "chromium" });
const page = await browser.newContext().then(c => c.newPage());

page.on("pageerror", e => console.log("PAGE:", e.message));
page.on("console", m => { if (m.type() === "error" || m.type() === "warning") console.log(`${m.type()}: ${m.text().slice(0, 200)}`); });

await page.goto("https://sigco3111.github.io/threejs-gallery-kr/examples/threejs-atmosphere-aerial-perspective/lut-aerial-perspective/scene.js", { waitUntil: "domcontentloaded", timeout: 15000 });
await page.waitForTimeout(3000);
await browser.close();
