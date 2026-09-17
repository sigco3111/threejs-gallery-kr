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

console.log("=== Loading gallery index ===");
await page.goto("http://127.0.0.1:8765/index.html", { waitUntil: "domcontentloaded", timeout: 20000 });
await page.waitForTimeout(2500);

const h1 = await page.locator("h1").first().textContent();
const cardCount = await page.locator(".card").count();
const skillSections = await page.locator(".skill-section").count();

console.log("H1:", h1);
console.log("Cards:", cardCount);
console.log("Skill sections:", skillSections);
console.log("Errors:", errors.length);

// Check a Korean skill title and card title
const skillTitles = await page.locator(".skill-title h2").allTextContents();
const firstCardTitle = await page.locator(".card-title").first().textContent();
console.log("\nFirst skill section:", skillTitles[0]);
console.log("First card title:", firstCardTitle);

// Take gallery screenshot
await page.screenshot({ path: "/tmp/gallery-index.png", fullPage: false });
console.log("\nGallery screenshot: /tmp/gallery-index.png");

// Test live example
console.log("\n=== Testing live example ===");
const testUrl = "http://127.0.0.1:8765/examples/threejs-procedural-geometry/sculpted-gallery-frame/";
await page.goto(testUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
await page.waitForTimeout(2000);
const isRuntime = page.url().includes("/runtime/");
const ready = await page.locator("html[data-example-ready='true']").count() > 0;
console.log("Redirected to runtime:", isRuntime);
console.log("Example ready:", ready);

if (ready) {
  const overlayTitle = await page.locator("#o-title").textContent();
  console.log("Overlay title:", overlayTitle);
  await page.waitForTimeout(2000);
  await page.screenshot({ path: "/tmp/live-example.png", fullPage: false });
  console.log("Live example screenshot: /tmp/live-example.png");
}

await browser.close();
