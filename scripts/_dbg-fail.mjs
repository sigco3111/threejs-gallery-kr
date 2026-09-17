import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true, channel: "chromium" });

const TESTS = [
  "threejs-procedural-geometry/sculpted-gallery-frame",
  "threejs-procedural-materials/raytraced-diamond",
  "threejs-procedural-vfx/filmic-lens-flare",
  "threejs-water-optics/interactive-pool-volume",
];

for (const slug of TESTS) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await ctx.newPage();
  const errs = [];
  page.on("pageerror", e => errs.push("PAGE: " + e.message.slice(0, 150)));
  page.on("console", m => { if (m.type() === "error") errs.push("CON: " + m.text().slice(0, 150)); });
  page.on("response", r => { if (r.status() >= 400) errs.push(`HTTP ${r.status()}: ${r.url().replace("https://sigco3111.github.io", "")}`); });

  await page.goto(`https://sigco3111.github.io/threejs-gallery-kr/examples/${slug}/`, { waitUntil: "domcontentloaded", timeout: 25000 });
  await page.waitForTimeout(8000);
  const ready = await page.locator("html[data-example-ready='true']").count() > 0;
  console.log(`\n=== ${slug}: ready=${ready} ===`);
  for (const e of errs.slice(0, 5)) console.log("  ", e);
  await ctx.close();
}
await browser.close();
