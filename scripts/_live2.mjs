import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true, channel: "chromium" });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

const errors = [];
page.on("pageerror", (e) => errors.push("PAGE ERR: " + e.message));
page.on("console", (m) => {
  if (m.type() === "error") errors.push("CONSOLE: " + m.text());
});
page.on("response", (r) => {
  if (r.status() >= 400) errors.push(`RESP ${r.status()}: ${r.url()}`);
});

// Follow redirect manually
const target = "http://127.0.0.1:8765/example-gallery/runtime/index.html?module=/examples/threejs-procedural-geometry/sculpted-gallery-frame/scene.js&krTitle=%EC%A1%B0%EA%B0%81%EB%90%9C%20%EA%B0%A4%EB%9F%AC%EB%A6%AC%20%ED%94%84%EB%A0%88%EC%9E%84&krSkill=%EC%A0%88%EC%B0%A8%EC%A0%81%20%EC%A7%80%EC%98%A4%EB%A9%94%ED%8A%B8%EB%A6%AC&krBack=../../";
await page.goto(target, { waitUntil: "domcontentloaded", timeout: 30000 });
await page.waitForTimeout(8000);
const ready = await page.locator("html[data-example-ready='true']").count() > 0;
console.log("Ready:", ready);
console.log("URL:", page.url());

if (ready) {
  const title = await page.locator("#o-title").textContent();
  const skill = await page.locator("#o-skill").textContent();
  console.log("Title:", title, "| Skill:", skill);
  await page.screenshot({ path: "/tmp/live2.png", fullPage: false });
}
console.log("\nErrors:", errors.length);
for (const e of errors.slice(0, 5)) console.log("  ", e);
await browser.close();
