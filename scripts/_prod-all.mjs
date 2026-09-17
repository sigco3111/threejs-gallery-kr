import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";

const ALL_EXAMPLES = [
  "threejs-atmosphere-aerial-perspective/lut-aerial-perspective",
  "threejs-parallax-occlusion-mapping/silhouette-relief",
  "threejs-precipitation-surfaces/snow-accumulation",
  "threejs-precipitation-surfaces/wet-puddle-rain",
  "threejs-procedural-architecture/procedural-financial-tower",
  "threejs-procedural-geometry/formula-one-race-car",
  "threejs-procedural-geometry/porcelain-brass-submarine",
  "threejs-procedural-geometry/sport-motorcycle",
  "threejs-procedural-geometry/procedural-optimus-humanoid",
  "threejs-procedural-geometry/sculpted-gallery-frame",
  "threejs-procedural-materials/hybrid-soil-moss-surface",
  "threejs-procedural-materials/lava-flow-surface",
  "threejs-procedural-materials/physical-diffraction-grating",
  "threejs-procedural-materials/raytraced-diamond",
  "threejs-procedural-materials/softbody-jelly",
  "threejs-procedural-materials/spectral-dispersive-glass",
  "threejs-procedural-materials/thin-film-soap-bubbles",
  "threejs-procedural-planets/procedural-planet-surface",
  "threejs-procedural-vegetation/gpu-computed-grass",
  "threejs-procedural-vegetation/gpu-culled-flower-field",
  "threejs-procedural-vegetation/procedural-surface-ivy",
  "threejs-procedural-vegetation/structured-ash-growth",
  "threejs-procedural-vegetation/stylized-meadow-grass",
  "threejs-procedural-vfx/filmic-lens-flare",
  "threejs-procedural-vfx/holographic-shape-transition",
  "threejs-procedural-vfx/raymarched-aurora-curtains",
  "threejs-procedural-vfx/reentry-plasma",
  "threejs-procedural-vfx/volumetric-fluid-fire",
  "threejs-raymarched-space-effects/curved-ray-accretion-volume",
  "threejs-raymarched-space-effects/schwarzschild-geodesic-black-hole",
  "threejs-raymarched-space-effects/traversable-wormhole-transit",
  "threejs-spectral-ocean/coastal-breaker-ocean",
  "threejs-spectral-ocean/hybrid-clear-water-ocean",
  "threejs-spectral-ocean/spectral-cascade-ocean",
  "threejs-spectral-ocean/stylized-above-below-ocean",
  "threejs-spectral-ocean/submerged-snell-ocean",
  "threejs-temporal-surfaces/refractive-window-rain",
  "threejs-temporal-surfaces/touch-history-frost",
  "threejs-volumetric-clouds/weather-volume-clouds",
  "threejs-water-optics/analytic-wave-optics",
  "threejs-water-optics/interactive-pool-volume",
];

const ORIGIN = "https://sigco3111.github.io/threejs-gallery-kr";
const browser = await chromium.launch({ headless: true, channel: "chromium" });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });

let ok = 0, fail = 0;
const failures = [];

for (const slug of ALL_EXAMPLES) {
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", e => errors.push(e.message));
  page.on("console", m => { if (m.type() === "error") errors.push(m.text().slice(0, 80)); });

  try {
    await page.goto(`${ORIGIN}/examples/${slug}/`, { waitUntil: "domcontentloaded", timeout: 25000 });
    await page.waitForTimeout(12000);
    const ready = await page.locator("html[data-example-ready='true']").count() > 0;
    if (ready) {
      ok++;
    } else {
      fail++;
      const err = errors.slice(0, 2).join(" | ");
      failures.push(`${slug}: ${err || "(no error)"}`);
    }
  } catch (e) {
    fail++;
    failures.push(`${slug}: ${e.message.slice(0, 100)}`);
  }
  await page.close();
}
await browser.close();

console.log(`\n=== ${ok}/${ALL_EXAMPLES.length} OK, ${fail} failed ===`);
for (const f of failures) console.log("  ✗", f);
