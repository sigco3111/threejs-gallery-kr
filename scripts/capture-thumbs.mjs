#!/usr/bin/env node
// Capture thumbnails for all gallery examples.
// Outputs to docs/thumbs/<skill>__<slug>.png
import { chromium } from "playwright";
import { readdir, readFile, stat, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const THUMB_W = 1280;
const THUMB_H = 720;
const THUMB_DPR = 1.25;
const TIMEOUT_MS = 45000;
const CONCURRENT = 4;
const ORIGIN = "http://127.0.0.1:4173";
const EXAMPLES_ROOT = path.join(process.cwd(), "example-gallery", "examples");
const OUT_DIR = path.join(process.cwd(), "docs", "thumbs");

async function isFile(p) { try { return (await stat(p)).isFile(); } catch { return false; } }

async function discover(root, segments, entryFile = "scene.js") {
  const found = [];
  let entries = [];
  try { entries = await readdir(root, { withFileTypes: true }); } catch { return found; }
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    const dir = path.join(root, e.name);
    const next = [...segments, e.name];
    if (await isFile(path.join(dir, entryFile)) && await isFile(path.join(dir, "example.json"))) {
      found.push({ dir, segments: next });
    } else {
      found.push(...await discover(dir, next, entryFile));
    }
  }
  return found;
}

async function loadMeta(p) { try { return JSON.parse(await readFile(p, "utf8")); } catch { return {}; } }

function entryFor(skill, slug) {
  return `/example-gallery/runtime/index.html?module=/example-gallery/examples/${skill}/${slug}/scene.js`;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const candidates = await discover(EXAMPLES_ROOT, []);
  const examples = await Promise.all(candidates.map(async (c) => {
    const meta = await loadMeta(path.join(c.dir, "example.json"));
    const skill = c.segments[0];
    const slug = c.segments.at(-1);
    return {
      skill, slug,
      title: meta.title ?? slug,
      backend: meta.backend ?? "WebGL",
      entry: entryFor(skill, slug),
    };
  }));
  console.log(`Discovered ${examples.length} examples`);

  // Save manifest for later use
  await writeFile(
    path.join(process.cwd(), "docs", "examples.json"),
    JSON.stringify({ examples: examples.map(e => ({ ...e, entry: undefined })) }, null, 2)
  );

  const browser = await chromium.launch({ headless: true, channel: "chromium" });
  const ctx = await browser.newContext({
    viewport: { width: THUMB_W, height: THUMB_H },
    deviceScaleFactor: THUMB_DPR,
  });

  let active = 0;
  const queue = [...examples];
  const results = [];

  async function capture(ex) {
    const outPath = path.join(OUT_DIR, `${ex.skill}__${ex.slug}.png`);
    let page = null;
    try {
      page = await ctx.newPage();
      const url = new URL(ex.entry, ORIGIN);
      url.searchParams.set("galleryPaused", "1");
      url.searchParams.set("galleryDpr", String(THUMB_DPR));
      url.searchParams.set("galleryTimeScale", "1");
      url.searchParams.set("galleryDebugMode", "final");
      if (/^webgpu/i.test(ex.backend)) url.searchParams.set("galleryBackend", "webgpu");

      await page.goto(url.href, { waitUntil: "domcontentloaded", timeout: TIMEOUT_MS });
      await page.locator("html[data-example-ready='true']").waitFor({ timeout: TIMEOUT_MS });
      // Wait an extra moment for shaders to compile and first frame to settle
      await page.waitForTimeout(800);
      const buf = await page.locator("canvas").screenshot({ type: "png" });
      await writeFile(outPath, buf);
      results.push({ id: `${ex.skill}/${ex.slug}`, ok: true, size: buf.length });
      console.log(`  ✓ ${ex.skill}/${ex.slug} (${(buf.length/1024).toFixed(1)}KB)`);
    } catch (err) {
      results.push({ id: `${ex.skill}/${ex.slug}`, ok: false, error: String(err.message || err) });
      console.log(`  ✗ ${ex.skill}/${ex.slug}: ${err.message || err}`);
    } finally {
      if (page) await page.close().catch(() => {});
    }
  }

  // Simple concurrency-limited runner
  await new Promise((resolve) => {
    const workers = Array.from({ length: CONCURRENT }, async () => {
      while (queue.length > 0) {
        const ex = queue.shift();
        if (!ex) break;
        await capture(ex);
      }
    });
    Promise.all(workers).then(resolve);
  });

  await browser.close();

  const ok = results.filter(r => r.ok).length;
  const fail = results.filter(r => !r.ok).length;
  console.log(`\nDone: ${ok} ok, ${fail} failed`);
  if (fail > 0) {
    console.log("Failed:");
    for (const r of results.filter(x => !x.ok)) console.log(`  ${r.id}: ${r.error}`);
  }

  await writeFile(path.join(OUT_DIR, "_results.json"), JSON.stringify(results, null, 2));
}

main().catch(err => { console.error(err); process.exit(1); });