import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true, channel: "chromium" });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto("http://127.0.0.1:8765/index.html", { waitUntil: "networkidle", timeout: 20000 });
await page.waitForTimeout(3000);
await page.screenshot({ path: "/tmp/gallery-v2.png", fullPage: false });
await page.screenshot({ path: "/tmp/gallery-v2-full.png", fullPage: true });
await browser.close();
console.log("Saved");
