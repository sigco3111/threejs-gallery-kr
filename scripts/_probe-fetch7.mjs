import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true, channel: "chromium" });
const page = await browser.newContext().then(c => c.newPage());

await page.goto("https://sigco3111.github.io/threejs-gallery-kr/examples/threejs-procedural-materials/raytraced-diamond/", { waitUntil: "domcontentloaded", timeout: 25000 });
await page.waitForTimeout(3000);

// Manually call redirect to test
const result = await page.evaluate(() => {
  // We can't directly access the closure-scoped redirect, but we can test
  // by overriding fetch again temporarily
  let capturedInput;
  const originalFetch = window.fetch.bind(window);
  window.fetch = function(input, init) {
    capturedInput = input instanceof Request ? 
      { type: "Request", url: input.url } : 
      { type: "string", val: input };
    return originalFetch(input, init);
  };
  // Now call fetch
  return fetch(new Request("/test-from-eval")).then(r => {
    window.fetch = originalFetch;
    return { capturedInput, responseUrl: r.url, responseStatus: r.status };
  });
});
console.log(result);

await browser.close();
