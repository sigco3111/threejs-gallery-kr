import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true, channel: "chromium" });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

const errors = [];
const failed = [];
page.on("pageerror", (e) => errors.push("PAGE: " + e.message));
page.on("console", (m) => {
  if (m.type() === "error") errors.push("CON: " + m.text());
});
page.on("response", (r) => {
  if (r.status() >= 400 && !r.url().includes("favicon")) failed.push(`HTTP ${r.status()}: ${r.url()}`);
});

// === Test 1: gallery index loads with cards ===
console.log("=== Test 1: Gallery Index ===");
await page.goto("https://sigco3111.github.io/threejs-gallery-kr/index.html", { waitUntil: "networkidle", timeout: 30000 });
await page.waitForTimeout(2000);
const h1 = await page.locator("h1").first().textContent();
const cards = await page.locator(".card").count();
const sections = await page.locator(".skill-section").count();
const mosaic = await page.locator(".hero-mosaic .tile").count();
console.log(`H1: ${h1}`);
console.log(`Cards: ${cards}, Sections: ${sections}, Mosaic tiles: ${mosaic}`);

// === Test 2: click a card → live example ===
console.log("\n=== Test 2: Live Example (CDN) ===");
// We follow the example URL directly
const exUrl = "https://sigco3111.github.io/threejs-gallery-kr/examples/threejs-procedural-geometry/sculpted-gallery-frame/";
await page.goto(exUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
// Wait for runtime to load + WebGL to compile
await page.waitForTimeout(8000);
const finalUrl = page.url();
const ready = await page.locator("html[data-example-ready='true']").count() > 0;
const overlayVisible = await page.locator("#overlay").isVisible();
const title = ready ? await page.locator("#o-title").textContent() : "(not ready)";
const skill = ready ? await page.locator("#o-skill").textContent() : "(not ready)";
console.log(`Redirected to: ${finalUrl.replace("https://sigco3111.github.io", "")}`);
console.log(`Ready: ${ready}, Overlay visible: ${overlayVisible}`);
console.log(`Title: ${title}, Skill: ${skill}`);

if (ready) {
  await page.waitForTimeout(2000);
  await page.screenshot({ path: "/tmp/live-prod.png" });
  console.log("Screenshot: /tmp/live-prod.png");
}

console.log(`\nErrors: ${errors.length}`);
for (const e of errors.slice(0, 5)) console.log("  ", e);
console.log(`Failed responses: ${failed.length}`);
for (const f of failed.slice(0, 5)) console.log("  ", f);

await browser.close();
