import { chromium } from "playwright";

const TESTS = [
  "threejs-atmosphere-aerial-perspective/lut-aerial-perspective",
  "threejs-procedural-vfx/volumetric-fluid-fire",
  "threejs-procedural-vfx/filmic-lens-flare",
];

const browser = await chromium.launch({ headless: true, channel: "chromium" });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });

for (const ex of TESTS) {
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", e => errors.push("PAGE: " + e.message));
  page.on("console", m => { if (m.type() === "error") errors.push("CON: " + m.text().slice(0, 100)); });

  const url = `http://127.0.0.1:8765/examples/${ex}/`;
  console.log(`\n=== ${ex} ===`);
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(6000);

  const ready = await page.locator("html[data-example-ready='true']").count() > 0;
  const overlayTitle = ready ? await page.locator("#o-title").textContent() : "(not ready)";
  console.log(`  ready=${ready}, title="${overlayTitle}"`);
  if (!ready && errors.length > 0) {
    for (const e of errors.slice(0, 3)) console.log("  !", e);
  }
  await page.close();
}
await browser.close();
