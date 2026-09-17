import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true, channel: "chromium" });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
const page = await ctx.newPage();

const errors = [];
page.on("pageerror", (e) => errors.push("PAGE ERR: " + e.message));
page.on("console", (m) => {
  if (m.type() === "error") errors.push("CONSOLE: " + m.text());
});

const target = "http://127.0.0.1:8765/example-gallery/runtime/index.html?module=/examples/threejs-procedural-geometry/sculpted-gallery-frame/scene.js&krTitle=%EC%A1%B0%EC%B1%99%EB%90%9C%20%EA%B0%A4%EB%9F%AC%EB%A6%AC%20%ED%94%84%EB%A0%88%EC%9E%84&krSkill=%EC%A0%88%EC%B1%84%EC%A0%81%20%EC%A7%80%EC%98%A4%EB%A9%94%ED%8A%B8%EB%A6%AC&krBack=../../";

await page.goto(target, { waitUntil: "domcontentloaded", timeout: 30000 });
await page.locator("html[data-example-ready='true']").waitFor({ timeout: 30000 });
await page.waitForTimeout(2500);

const overlay = await page.locator("#overlay").isVisible();
const title = await page.locator("#o-title").textContent();
const skill = await page.locator("#o-skill").textContent();
const back = await page.locator("#o-back").getAttribute("href");

console.log("Overlay:", overlay, "|", "Title:", title, "|", "Skill:", skill, "|", "Back href:", back);
console.log("Errors:", errors.length);
for (const e of errors.slice(0, 3)) console.log("  ", e);

await page.screenshot({ path: "/tmp/live-check.png", fullPage: false });
console.log("Screenshot: /tmp/live-check.png");

await browser.close();
