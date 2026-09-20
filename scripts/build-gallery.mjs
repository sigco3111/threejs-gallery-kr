#!/usr/bin/env node
// Build script: convert source repo into GitHub-Pages-deployable site under ./docs/
// 1. Copy skills/, support/, runtime/ to docs/
// 2. Rewrite /example-gallery/examples/... → /examples/... in copied files
// 3. Rewrite /example-gallery/runtime/index.html → CDN-based importmap
// 4. Build examples.json with Korean metadata
// 5. Generate per-example standalone pages that redirect to runtime
// 6. Build main gallery index.html

import { spawn } from "node:child_process";
import { copyFile, mkdir, readdir, readFile, writeFile, stat, mkdtemp, rm, copyFile as cp } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const PROJECT_ROOT = process.cwd();
const SRC = PROJECT_ROOT;
const DST = path.join(PROJECT_ROOT, "docs");

const TITLE_KR = {
  "threejs-procedural-geometry|formula-one-race-car": "포뮬러 원 레이스카",
  "threejs-procedural-geometry|porcelain-brass-submarine": "도자기-황동 잠수함",
  "threejs-procedural-geometry|sport-motorcycle": "스포츠 모터사이클",
  "threejs-procedural-geometry|procedural-optimus-humanoid": "절차적 옵티머스 휴머노이드",
  "threejs-procedural-geometry|sculpted-gallery-frame": "조각된 갤러리 프레임",
  "threejs-procedural-materials|hybrid-soil-moss-surface": "하이브리드 흙-이끼 표면",
  "threejs-procedural-materials|lava-flow-surface": "용암 흐름 표면",
  "threejs-procedural-materials|physical-diffraction-grating": "물리 회절 격자",
  "threejs-procedural-materials|raytraced-diamond": "레이 트레이싱 다이아몬드",
  "threejs-procedural-materials|softbody-jelly": "소프트바디 젤리",
  "threejs-procedural-materials|spectral-dispersive-glass": "스펙트럼 분산 유리",
  "threejs-procedural-materials|thin-film-soap-bubbles": "박막 비눗방울",
  "threejs-procedural-vegetation|procedural-surface-ivy": "절차적 표면 아이비",
  "threejs-procedural-vegetation|gpu-computed-grass": "GPU 계산 풀",
  "threejs-procedural-vegetation|gpu-culled-flower-field": "GPU 컬링 꽃밭",
  "threejs-procedural-vegetation|stylized-meadow-grass": "스타일라이즈드 목초지 풀",
  "threejs-procedural-vegetation|structured-ash-growth": "구조화된 재 성장",
  "threejs-procedural-vfx|filmic-lens-flare": "필름릭 렌즈 플레어",
  "threejs-procedural-vfx|holographic-shape-transition": "홀로그래픽 형태 전환",
  "threejs-procedural-vfx|raymarched-aurora-curtains": "레이마칭 오로라 커튼",
  "threejs-procedural-vfx|reentry-plasma": "재진입 플라즈마",
  "threejs-procedural-vfx|volumetric-fluid-fire": "볼류메트릭 유체 불",
  "threejs-raymarched-space-effects|curved-ray-accretion-volume": "곡선-레이 강착 볼륨",
  "threejs-raymarched-space-effects|schwarzschild-geodesic-black-hole": "슈바르츠실트 측지선 블랙홀",
  "threejs-raymarched-space-effects|traversable-wormhole-transit": "통과 가능한 웜홀 이동",
  "threejs-spectral-ocean|coastal-breaker-ocean": "해안 파도 바다",
  "threejs-spectral-ocean|hybrid-clear-water-ocean": "하이브리드 맑은 물 바다",
  "threejs-spectral-ocean|spectral-cascade-ocean": "스펙트럼 캐스케이드 바다",
  "threejs-spectral-ocean|stylized-above-below-ocean": "스타일라이즈드 수면 위·아래 바다",
  "threejs-spectral-ocean|submerged-snell-ocean": "잠수 스넬 바다",
  "threejs-temporal-surfaces|refractive-window-rain": "굴절 창문 빗물",
  "threejs-temporal-surfaces|touch-history-frost": "터치 이력 프로스트",
  "threejs-atmosphere-aerial-perspective|lut-aerial-perspective": "LUT 대기 원근법",
  "threejs-parallax-occlusion-mapping|silhouette-relief": "실루엣 릴리프",
  "threejs-precipitation-surfaces|snow-accumulation": "눈 적설",
  "threejs-precipitation-surfaces|wet-puddle-rain": "젖은 웅덩이 비",
  "threejs-procedural-architecture|procedural-financial-tower": "절차적 금융 타워",
  "threejs-procedural-planets|procedural-planet-surface": "절차적 행성 표면",
  "threejs-volumetric-clouds|weather-volume-clouds": "날씨 볼류메트릭 구름",
  "threejs-water-optics|analytic-wave-optics": "해석적 파동 광학",
  "threejs-water-optics|interactive-pool-volume": "인터랙티브 풀 볼륨",
};

const SKILL_DESCRIPTIONS = {
  "threejs-skill-router": "시각 타겟을 최소 단위의 전문 시스템으로 분해하는 라우터",
  "threejs-camera-direction": "오소리/사이드/오빗 릭, 바디-기준 프레임, 핸드오프, 포인터 룩",
  "threejs-procedural-animation": "해석적 타임라인, 중력 턴, 회전 프레임 도킹, 스프링, 쿼터니언 정렬",
  "threejs-procedural-fields": "스칼라/벡터 필드, 주파수 밴드, 도메인 와핑, 절차적 노멀",
  "threejs-procedural-materials": "하이브리드 텍스처 PBR, 대기권/용암/디스펜션 글래스/베벨/프레임 PBR",
  "threejs-parallax-occlusion-mapping": "TSL 높이 매칭, 클립 실루엣, 인플레이트 릴리프 셸, 셀프 섀도잉",
  "threejs-procedural-geometry": "폴리곤 모델링, 로프트/리볼브/스윕/솔리디파이/베벨, 시맨틱 조인",
  "threejs-procedural-vegetation": "성장 계층, 표면-팔로잉 ivy, GPU-컴퓨티드 그래스, 가지 링, 바람",
  "threejs-procedural-architecture": "매싱과 파사드 문법, 노출-엣지 분석, 모듈, 머티리얼-슬롯 컴파일",
  "threejs-procedural-planets": "구면 지형, 능선, 크레이터, 바이옴, 절차적 노멀, 고도 필터링",
  "threejs-spectral-ocean": "FFT 합성, 하이브리드 FFT/Gerstner, 스넬 창, 총 내부 반사, 거품",
  "threejs-water-optics": "해석적 파동, 풀 높이필드, 객체 리플, 굴절, 흡수, 반사",
  "threejs-precipitation-surfaces": "눈/비 낙하, 적설, 빙판, 물웅덩이, 리플 노멀, 스플래시",
  "threejs-atmosphere-aerial-perspective": "공유 Rayleigh/Mie 대기, 스카이, 깊이 산란",
  "threejs-volumetric-clouds": "날씨-모양 밀도, 바운디드 레이마칭, 클라우드 라이팅, 그림자",
  "threejs-raymarched-space-effects": "곡선-레이, 블랙홀, 강착 원반, 웜홀 스로트, 렌즈드 천체",
  "threejs-procedural-vfx": "오로라 커튼, 필름릭 렌즈 플레어, WebGPU 복셀 불/연기, 유체장",
  "threejs-temporal-surfaces": "터치 이력, 프로스트, 창문 빗물, 배경 굴절, 블러",
  "threejs-shadow-systems": "안정적인 캐스케이드, 클립맵 섀도우, 업데이트 예산, 무효화",
  "threejs-screen-space-ambient-occlusion": "GTAO 스타일, 벤트 노멀, 바이레이트럴/템포럴 재구성",
  "threejs-bloom": "HDR 추출, 멀티-스케일 필터링, 선택적 기여, 노출 커플링",
  "threejs-exposure-color-grading": "인코디드 루미넌스 미터링, 비대칭 적응, 톤 매핑, 3D LUT",
  "threejs-image-pipeline": "공유 렌더 시그널 오너십과 오더링",
  "threejs-visual-validation": "고정-뷰 캡쳐, 진단 모자이크, 시드/스케일 스윕, 시간/GPU 증거",
};

const SKILL_KOREAN = {
  "threejs-skill-router": "스킬 라우터",
  "threejs-camera-direction": "카메라 디렉션",
  "threejs-procedural-animation": "절차적 애니메이션",
  "threejs-procedural-fields": "절차적 필드",
  "threejs-procedural-materials": "절차적 머티리얼",
  "threejs-parallax-occlusion-mapping": "시차 차폐 매핑",
  "threejs-procedural-geometry": "절차적 지오메트리",
  "threejs-procedural-vegetation": "절차적 식생",
  "threejs-procedural-architecture": "절차적 건축",
  "threejs-procedural-planets": "절차적 행성",
  "threejs-spectral-ocean": "스펙트럼 바다",
  "threejs-water-optics": "물 광학",
  "threejs-precipitation-surfaces": "강수 표면",
  "threejs-atmosphere-aerial-perspective": "대기 원근법",
  "threejs-volumetric-clouds": "볼류메트릭 구름",
  "threejs-raymarched-space-effects": "레이마칭 우주 효과",
  "threejs-procedural-vfx": "절차적 VFX",
  "threejs-temporal-surfaces": "시간적 표면",
  "threejs-shadow-systems": "섀도우 시스템",
  "threejs-screen-space-ambient-occlusion": "스크린-스페이스 AO",
  "threejs-bloom": "블러",
  "threejs-exposure-color-grading": "노출·컬러 그레이딩",
  "threejs-image-pipeline": "이미지 파이프라인",
  "threejs-visual-validation": "시각적 검증",
};

const SKILL_ICONS = {
  "threejs-skill-router": "◈", "threejs-camera-direction": "◎",
  "threejs-procedural-animation": "↻", "threejs-procedural-fields": "▦",
  "threejs-procedural-materials": "◐", "threejs-parallax-occlusion-mapping": "▲",
  "threejs-procedural-geometry": "⬡", "threejs-procedural-vegetation": "❋",
  "threejs-procedural-architecture": "⌂", "threejs-procedural-planets": "◉",
  "threejs-spectral-ocean": "≈", "threejs-water-optics": "~",
  "threejs-precipitation-surfaces": "❅", "threejs-atmosphere-aerial-perspective": "○",
  "threejs-volumetric-clouds": "☁", "threejs-raymarched-space-effects": "✦",
  "threejs-procedural-vfx": "✧", "threejs-temporal-surfaces": "❉",
  "threejs-shadow-systems": "▒", "threejs-screen-space-ambient-occlusion": "▓",
  "threejs-bloom": "✺", "threejs-exposure-color-grading": "▤",
  "threejs-image-pipeline": "▣", "threejs-visual-validation": "◊",
};

async function isFile(p) { try { return (await stat(p)).isFile(); } catch { return false; } }

async function rmdir(p) {
  try { await readdir(p); } catch { return; }
  const { rm } = await import("node:fs/promises");
  await rm(p, { recursive: true, force: true });
}

async function copyDir(src, dst) {
  await mkdir(dst, { recursive: true });
  for (const e of await readdir(src, { withFileTypes: true })) {
    const sp = path.join(src, e.name);
    const dp = path.join(dst, e.name);
    if (e.isDirectory()) await copyDir(sp, dp);
    else await copyFile(sp, dp);
  }
}

function rewrite(content) {
  // Rewrite absolute asset URLs from /example-gallery/examples/ → /examples/
  // Support files stay at /example-gallery/support/
  return content
    .replace(/(['"])\/example-gallery\/examples\//g, "$1/examples/")
    .replace(/(from\s+["'])\/example-gallery\//g, "$1/example-gallery/")
    .replace(/(import\s*\(\s*["'])\/example-gallery\//g, "$1/example-gallery/");
}

async function discover(root) {
  const found = [];
  let entries = [];
  try { entries = await readdir(root, { withFileTypes: true }); } catch { return found; }
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    const dir = path.join(root, e.name);
    const next = [e.name];
    if (await isFile(path.join(dir, "scene.js")) && await isFile(path.join(dir, "example.json"))) {
      found.push({ dir, segments: next });
    } else {
      found.push(...await discover(dir, next));
    }
  }
  return found;
}

async function main() {
  // 1. Clean docs/ (but preserve thumbs/ if present from previous capture)
  const thumbsBackup = path.join(PROJECT_ROOT, "docs", "thumbs");
  let thumbsKeep = null;
  try { thumbsKeep = await readdir(thumbsBackup); } catch {}
  // Stash thumbs to a temp dir before rmdir wipes docs/thumbs/
  let thumbsStash = null;
  if (thumbsKeep && thumbsKeep.length > 0) {
    thumbsStash = await mkdtemp(path.join(process.env.TMPDIR || "/tmp", "threejs-gallery-thumbs-"));
    for (const f of thumbsKeep) {
      await copyFile(path.join(thumbsBackup, f), path.join(thumbsStash, f)).catch(() => {});
    }
  }
  await rmdir(DST);

  // 2. Copy tree
  await mkdir(DST);
  await copyDir(path.join(SRC, "skills"), path.join(DST, "skills"));
  await mkdir(path.join(DST, "example-gallery"));
  await copyDir(path.join(SRC, "example-gallery", "support"), path.join(DST, "example-gallery", "support"));
  await copyDir(path.join(SRC, "example-gallery", "runtime"), path.join(DST, "example-gallery", "runtime"));
  await copyDir(path.join(SRC, "example-gallery", "examples"), path.join(DST, "examples"));

  // Restore thumbs from stash if we backed them up.
  if (thumbsStash) {
    await mkdir(path.join(DST, "thumbs"), { recursive: true });
    for (const f of (await readdir(thumbsStash))) {
      await copyFile(path.join(thumbsStash, f), path.join(DST, "thumbs", f)).catch(() => {});
    }
    await rm(thumbsStash, { recursive: true, force: true });
  }

  // 3. Rewrite imports in all copied .js/.ts
  const targets = [
    path.join(DST, "skills"),
    path.join(DST, "example-gallery", "support"),
    path.join(DST, "examples"),
  ];
  let rewritten = 0;
  async function walk(p) {
    for (const e of await readdir(p, { withFileTypes: true })) {
      const fp = path.join(p, e.name);
      if (e.isDirectory()) await walk(fp);
      else if (e.name.endsWith(".js") || e.name.endsWith(".ts")) {
        const txt = await readFile(fp, "utf8");
        const newTxt = rewrite(txt);
        if (newTxt !== txt) { await writeFile(fp, newTxt); rewritten += 1; }
      }
    }
  }
  for (const t of targets) await walk(t);
  console.log(`Rewrote imports in ${rewritten} files`);

  // 4. Overwrite runtime/index.html with CDN-based importmap
  // NOTE: the fetch/XHR shim below must stay in sync with
  // docs/example-gallery/runtime/index.html (the production Pages file).
  // Request.url is ALWAYS fully qualified — the Request branch must
  // compare against ORIGIN + "/" (charAt(0) === "/" never matches).
  const runtimeHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="dark" />
    <title>Three.js Example Inspection</title>
    <!-- Pre-module fetch shim: redirect absolute-path fetches through
         document.baseURI so scene-internal fetch("/skills/foo.webp") and
         dynamic imports resolve under the GitHub Pages repo path.
         Must run before any module code.
         We do NOT inject <base> here — it would also rewrite our own
         relative <script src="./inspection-host.js"> to a wrong path.
         <base> is added later by inspection-host.js (after dynamic-import
         resolution has succeeded), and the importmap prefix mappings
         declared just below use relative paths so they resolve correctly
         without <base>. -->
    <script>
      (function () {
        var REPO_PREFIX = "/threejs-gallery-kr";
        var ORIGIN = window.location.origin;
        var originalFetch = window.fetch.bind(window);
        // Convert "/foo/bar" → origin + REPO_PREFIX + "/foo/bar"
        // by stripping the leading "/" and concatenating. Using new URL()
        // with the absolute path as the spec would ignore the base entirely.
        function withRepoPrefix(absPath) {
          return ORIGIN + REPO_PREFIX + absPath;
        }
        function needsPrefix(url) {
          return typeof url === "string"
            && url.charAt(0) === "/"
            && url.indexOf(REPO_PREFIX + "/") !== 0;
        }
        function redirect(input) {
          if (typeof input === "string" && needsPrefix(input)) {
            return withRepoPrefix(input);
          }
          if (input instanceof Request) {
            // Request.url is ALWAYS fully qualified — compare against
            // ORIGIN + "/" and splice the prefix back in when missing.
            var u = input.url;
            if (u.indexOf(ORIGIN + "/") === 0 && u.indexOf(ORIGIN + REPO_PREFIX + "/") !== 0) {
              return new Request(ORIGIN + REPO_PREFIX + u.slice(ORIGIN.length), input);
            }
          }
          return input;
        }
        window.fetch = function (input, init) {
          return originalFetch(redirect(input), init);
        };

        // Also patch XMLHttpRequest — some loaders (e.g. older patterns)
        // still use XHR for asset loading.
        var OriginalXHR = window.XMLHttpRequest;
        function PatchedXHR() {
          var xhr = new OriginalXHR();
          var origOpen = xhr.open;
          xhr.open = function (method, url) {
            if (typeof url === "string" && url.charAt(0) === "/") {
              arguments[1] = withRepoPrefix(url);
            }
            return origOpen.apply(xhr, arguments);
          };
          return xhr;
        }
        PatchedXHR.prototype = OriginalXHR.prototype;
        window.XMLHttpRequest = PatchedXHR;
      })();
    </script>
    <style>
      * { box-sizing: border-box; }
      html, body, canvas { width: 100%; height: 100%; margin: 0; display: block; }
      body { overflow: hidden; background: #020305; font-family: system-ui, sans-serif; }
      canvas { touch-action: none; }
      .overlay {
        position: fixed; top: 14px; left: 14px; z-index: 10;
        background: rgba(8, 12, 20, 0.55);
        backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
        border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px;
        padding: 10px 14px; color: #e8edf2; font-size: 13px; line-height: 1.4; max-width: 360px;
      }
      .overlay h1 { margin: 0 0 4px; font-size: 15px; font-weight: 600; }
      .overlay .skill { font-size: 11px; color: #8aa4d1; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 4px; }
      .overlay .desc { font-size: 12px; color: #b8c4d4; margin: 6px 0 0; }
      .overlay a { color: #6ec1ff; text-decoration: none; font-size: 12px; }
      .overlay a:hover { text-decoration: underline; }
      .overlay .badges { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 6px; }
      .overlay .badge { font-size: 10px; padding: 2px 6px; background: rgba(110, 193, 255, 0.12); color: #6ec1ff; border-radius: 4px; }
    </style>
    <script type="importmap">
      {
        "imports": {
          "three": "https://esm.sh/three@0.185.1",
          "three/webgpu": "https://esm.sh/three@0.185.1/webgpu?deps=three@0.185.1",
          "three/tsl": "https://esm.sh/three@0.185.1/tsl?deps=three@0.185.1",
          "three/addons/": "https://esm.sh/three@0.185.1/examples/jsm/",
          "@petamoriken/float16": "https://esm.sh/@petamoriken/float16@3.9.2?deps=three@0.185.1",
          "astronomy-engine": "https://esm.sh/astronomy-engine@2.1.19?deps=three@0.185.1",
          "fflate": "https://esm.sh/fflate@0.8.2?deps=three@0.185.1",
          "postprocessing": "https://esm.sh/postprocessing@6.37.4?deps=three@0.185.1",
          "three-mesh-bvh": "https://esm.sh/three-mesh-bvh@0.9.10?deps=three@0.185.1",
          "three-stdlib": "./three-stdlib-exr-loader.js"
        }
      }
    </script>
  </head>
  <body>
    <div class="overlay" id="overlay" hidden>
      <div class="skill" id="o-skill"></div>
      <h1 id="o-title"></h1>
      <p class="desc" id="o-desc"></p>
      <div class="badges" id="o-badges"></div>
      <a href="../" id="o-back">← 갤러리로 돌아가기</a>
    </div>
    <canvas></canvas>
    <script type="module" src="./inspection-host.js"></script>
    <script>
      (() => {
        const params = new URLSearchParams(window.location.search);
        const title = params.get("krTitle");
        const skill = params.get("krSkill");
        const desc = params.get("krDesc");
        const back = params.get("krBack");
        const tech = (params.get("krTech") || "").split("|").filter(Boolean);
        if (!title) return;
        document.title = title + " — 갤러리";
        document.documentElement.lang = "ko";
        const ov = document.getElementById("overlay");
        document.getElementById("o-skill").textContent = skill || "";
        document.getElementById("o-title").textContent = title;
        document.getElementById("o-desc").textContent = desc || "";
        const badges = document.getElementById("o-badges");
        for (const t of tech) {
          const b = document.createElement("span");
          b.className = "badge";
          b.textContent = t;
          badges.append(b);
        }
        const backLink = document.getElementById("o-back");
        backLink.href = back || "../";
        ov.hidden = false;
      })();
    </script>
  </body>
</html>`;
  await writeFile(path.join(DST, "example-gallery", "runtime", "index.html"), runtimeHtml);

  // 5. Patch inspection-host.js module path check + base-aware resolution for GitHub Pages
  // NOTE: This must stay in sync with the REPO_PREFIX-hardcoded runtime patch
  // below (fetch shim + wrapLoaderLoad + resolvedModulePath). That runtime is
  // the production Pages code — any change here must be validated against it.
  const ihPath = path.join(DST, "example-gallery", "runtime", "inspection-host.js");
  let ih = await readFile(ihPath, "utf8");
  ih = ih.replace(
    'if (!modulePath?.startsWith("/example-gallery/examples/"))',
    'if (!modulePath?.startsWith("/examples/"))'
  );
  // Inject <base> tag at the top of inspection-host.js so absolute-path
  // imports inside example code (/skills/..., /example-gallery/...) resolve
  // under the GitHub Pages repo prefix. Also store the prefix on window so
  // we can prepend it to dynamic import URLs (which resolve against origin).
  ih = ih.replace(
    'import { OrbitControls } from "three/addons/controls/OrbitControls.js";\nimport { exampleRuntime } from "./example-runtime.js";',
    [
      '// GitHub Pages lives under /<repo>/ — inject <base> so absolute paths',
      '// in example code resolve correctly under the repo prefix.',
      '{',
      '  const m = window.location.pathname.match(/^(\\/[^/]+)?\\/example-gallery\\//);',
      '  const repoPrefix = m ? (m[1] || "") : "";',
      '  if (repoPrefix) {',
      '    const base = document.createElement("base");',
      '    base.href = repoPrefix + "/";',
      '    document.head.prepend(base);',
      '    window.__repoPrefix = repoPrefix;',
      '  }',
      '}',
      '',
      'import { OrbitControls } from "three/addons/controls/OrbitControls.js";',
      'import { exampleRuntime } from "./example-runtime.js";',
    ].join("\n")
  );
  ih = ih.replace(
      'const adapterModule = await import(modulePath);\nconst adapter = adapterModule.default;',
      [
        '// dynamic import resolves against window.location.origin (not <base>),',
        '// so we must prepend the repo prefix manually using document.baseURI',
        '// (which respects the injected <base> tag).',
        '// NOTE: modulePath starts with "/" — new URL() would discard the base,',
        '// so use string concatenation to preserve the repo prefix.',
        'const repoPrefix = window.__repoPrefix || "";',
        'const resolvedModulePath = window.location.origin + repoPrefix + modulePath;',
        'const adapterModule = await import(resolvedModulePath);',
        'const adapter = adapterModule.default;',
      ].join("\n")
    );
  ih = ih.replace(
    'moduleUrl: new URL(modulePath, window.location.origin),',
    'moduleUrl: new URL(resolvedModulePath),'
  );
  ih = ih.replace(
    'return new URL(relativePath, new URL(modulePath, window.location.origin))\n      .href;',
    'return new URL(relativePath, resolvedModulePath)\n      .href;'
  );
  await writeFile(ihPath, ih);

  // 6. Discover examples and build examples.json + per-example pages
  const candidates = await discover(path.join(SRC, "example-gallery", "examples"));
  const examples = await Promise.all(candidates.map(async (c) => {
    const meta = JSON.parse(await readFile(path.join(c.dir, "example.json"), "utf8"));
    const skill = c.segments[0];
    const slug = c.segments.at(-1);
    return {
      skill,
      skill_kr: SKILL_KOREAN[skill] || skill,
      skill_desc: SKILL_DESCRIPTIONS[skill] || "",
      slug,
      title: meta.title,
      title_kr: TITLE_KR[`${skill}|${slug}`] || meta.title,
      description: meta.description || "",
      techniques: meta.techniques || [],
      backend: meta.backend || "WebGL",
      thumb: `thumbs/${skill}__${slug}.png`,
      url: `examples/${skill}/${slug}/`,
      debug_modes: meta.debugModes || [],
    };
  }));

  await writeFile(path.join(DST, "examples.json"), JSON.stringify({ examples }, null, 2));

  for (const ex of examples) {
    const modulePath = `/examples/${ex.skill}/${ex.slug}/scene.js`;
    const desc = ex.description.slice(0, 200) + (ex.description.length > 200 ? "…" : "");
    const tech = ex.techniques.slice(0, 5).join("|");
    const backend = ex.backend;

    const q = (s) => encodeURIComponent(s);
    let runtimeUrl = `../../../example-gallery/runtime/index.html?module=${q(modulePath)}&krTitle=${q(ex.title_kr)}&krSkill=${q(ex.skill_kr)}&krDesc=${q(desc)}&krTech=${q(tech)}&krBack=${q("../../../../")}`;
    if (/webgpu|tsl|WebGPU/i.test(backend)) runtimeUrl += "&galleryBackend=webgpu";

    const html = `<!doctype html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<meta http-equiv="refresh" content="0; url=${runtimeUrl}" />
<title>${ex.title_kr} — 갤러리</title>
<style>
body { margin: 0; height: 100vh; display: flex; align-items: center; justify-content: center;
  background: #020305; color: #e8edf2; font-family: system-ui, -apple-system, sans-serif; }
.loader { text-align: center; max-width: 480px; padding: 0 24px; }
.loader h1 { margin: 0 0 8px; font-size: 18px; font-weight: 600; }
.loader .skill { font-size: 11px; color: #8aa4d1; text-transform: uppercase; letter-spacing: 0.04em; }
.loader p { color: #8a96a8; font-size: 13px; }
.loader a { color: #6ec1ff; text-decoration: none; }
.loader a:hover { text-decoration: underline; }
</style>
</head>
<body>
<div class="loader">
  <div class="skill">${ex.skill_kr}</div>
  <h1>${ex.title_kr}</h1>
  <p>씬을 로딩하고 있습니다…</p>
  <p><a href="${runtimeUrl}">여기를 눌러 계속</a></p>
</div>
<script>window.location.replace(${JSON.stringify(runtimeUrl)});</script>
</body>
</html>
`;
    const outPath = path.join(DST, "examples", ex.skill, ex.slug, "index.html");
    await mkdir(path.dirname(outPath), { recursive: true });
    await writeFile(outPath, html);
  }

  // 7. Build main index.html with hero mosaic
  const grouped = {};
  for (const ex of examples) {
    if (!grouped[ex.skill]) grouped[ex.skill] = [];
    grouped[ex.skill].push(ex);
  }
  const dataForClient = Object.keys(grouped).map((skill) => ({
    skill,
    skill_kr: grouped[skill][0].skill_kr,
    skill_desc: grouped[skill][0].skill_desc,
    icon: SKILL_ICONS[skill] || "◇",
    examples: grouped[skill],
  }));
  const dataJson = JSON.stringify(dataForClient);

  const heroHtml = await readFile(path.join(SRC, "scripts", "templates", "gallery-index.html"), "utf8").catch(() => null);
  // Fallback inline template
  const template = heroHtml || GALLERY_TEMPLATE();
  const finalHtml = template.replace("__DATA__", dataJson);
  await writeFile(path.join(DST, "index.html"), finalHtml);

  console.log(`Built ${examples.length} examples, ${Object.keys(grouped).length} skill groups`);
}

function GALLERY_TEMPLATE() {
  return `<!doctype html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="color-scheme" content="dark" />
<title>Three.js 그래픽스 갤러리 — 한글판</title>
<meta name="description" content="scottstts/Threejs-Awesome-Graphics-Agent-Skills 갤러리 한글판. 41개의 Three.js 절차적 그래픽 데모를 라이브로 살펴보세요." />
<link rel="preconnect" href="https://esm.sh" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
<style>
:root { --bg: #050810; --bg-card: rgba(14, 20, 36, 0.65); --border: rgba(110, 193, 255, 0.12); --border-strong: rgba(110, 193, 255, 0.25); --fg: #e8edf2; --muted: #8aa4d1; --muted-2: #5a6a85; --accent: #6ec1ff; --accent-glow: rgba(110, 193, 255, 0.35); }
* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { background: var(--bg); color: var(--fg); font-family: "Noto Sans KR", system-ui, sans-serif; line-height: 1.5; min-height: 100vh; overflow-x: hidden; position: relative; }
body::before { content: ""; position: fixed; inset: 0; background: radial-gradient(ellipse 60% 50% at 20% 0%, rgba(110, 193, 255, 0.10), transparent), radial-gradient(ellipse 60% 50% at 80% 100%, rgba(255, 158, 196, 0.08), transparent), linear-gradient(180deg, #050810 0%, #0a1020 100%); z-index: -2; pointer-events: none; }
body::after { content: ""; position: fixed; inset: 0; background-image: linear-gradient(rgba(110, 193, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(110, 193, 255, 0.03) 1px, transparent 1px); background-size: 64px 64px; z-index: -1; pointer-events: none; mask-image: radial-gradient(ellipse 100% 80% at 50% 30%, black, transparent 70%); }
header.hero { position: relative; padding: 64px 24px 48px; text-align: center; max-width: 1280px; margin: 0 auto; }
.hero h1 { font-size: clamp(2.2rem, 5vw, 3.8rem); font-weight: 700; letter-spacing: -0.02em; background: linear-gradient(135deg, #6ec1ff 0%, #ff9ec4 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 12px; }
.hero .sub { color: var(--muted); font-size: clamp(0.95rem, 1.5vw, 1.15rem); font-weight: 300; max-width: 720px; margin: 0 auto 24px; }
.hero .stats { display: flex; gap: 24px; justify-content: center; flex-wrap: wrap; margin-top: 24px; }
.hero .stat { background: var(--bg-card); border: 1px solid var(--border); backdrop-filter: blur(8px); padding: 12px 20px; border-radius: 12px; display: flex; flex-direction: column; align-items: center; min-width: 110px; }
.hero .stat-num { font-family: "JetBrains Mono", monospace; font-size: 1.5rem; font-weight: 600; color: var(--accent); }
.hero .stat-label { font-size: 0.75rem; color: var(--muted); margin-top: 4px; }
.banner { text-align: center; padding: 0 24px; margin: 0 auto; max-width: 1280px; }
.hero-mosaic { display: grid; grid-template-columns: repeat(6, 1fr); grid-template-rows: 180px 180px; gap: 8px; margin: 0 auto; border-radius: 14px; overflow: hidden; border: 1px solid var(--border); box-shadow: 0 24px 60px -20px rgba(0, 0, 0, 0.6); }
.hero-mosaic .tile { position: relative; overflow: hidden; background: #0a0e18; }
.hero-mosaic .tile img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.6s ease; }
.hero-mosaic .tile:hover img { transform: scale(1.08); }
.hero-mosaic .tile.tall { grid-row: span 2; }
.hero-mosaic .tile.wide { grid-column: span 2; }
.hero-mosaic .tile .label { position: absolute; bottom: 8px; left: 8px; right: 8px; font-size: 0.75rem; font-weight: 600; background: rgba(0, 0, 0, 0.6); color: #fff; padding: 4px 10px; border-radius: 6px; backdrop-filter: blur(6px); border: 1px solid rgba(255, 255, 255, 0.08); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-align: left; }
@media (max-width: 900px) { .hero-mosaic { grid-template-columns: repeat(3, 1fr); grid-template-rows: 120px 120px 120px; } .hero-mosaic .tile.tall { grid-row: span 1; } .hero-mosaic .tile.wide { grid-column: span 1; } }
.toolbar { max-width: 1280px; margin: 32px auto 0; padding: 0 24px; display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }
.toolbar input[type="search"] { flex: 1; min-width: 200px; background: var(--bg-card); border: 1px solid var(--border); color: var(--fg); padding: 12px 16px; border-radius: 10px; font: inherit; font-size: 0.95rem; backdrop-filter: blur(8px); }
.toolbar input[type="search"]::placeholder { color: var(--muted-2); }
.toolbar input[type="search"]:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-glow); }
.toolbar select { background: var(--bg-card); border: 1px solid var(--border); color: var(--fg); padding: 12px 16px; border-radius: 10px; font: inherit; cursor: pointer; }
.toolbar .count { color: var(--muted); font-size: 0.85rem; margin-left: auto; font-family: "JetBrains Mono", monospace; }
.skills { max-width: 1280px; margin: 32px auto 80px; padding: 0 24px; }
.skill-section { margin-bottom: 56px; }
.skill-header { display: flex; align-items: center; gap: 16px; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid var(--border); }
.skill-icon { width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; font-size: 24px; background: var(--bg-card); border: 1px solid var(--border); border-radius: 10px; color: var(--accent); }
.skill-title { flex: 1; min-width: 0; }
.skill-title h2 { font-size: 1.4rem; font-weight: 600; margin-bottom: 4px; letter-spacing: -0.01em; }
.skill-title p { font-size: 0.85rem; color: var(--muted); font-weight: 300; }
.skill-count { background: var(--bg-card); padding: 6px 12px; border-radius: 8px; font-family: "JetBrains Mono", monospace; font-size: 0.85rem; color: var(--accent); border: 1px solid var(--border); }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(310px, 1fr)); gap: 16px; }
.card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; text-decoration: none; color: inherit; display: flex; flex-direction: column; transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease; backdrop-filter: blur(8px); cursor: pointer; }
.card:hover { transform: translateY(-3px); border-color: var(--border-strong); box-shadow: 0 12px 32px -8px rgba(110, 193, 255, 0.25); }
.card-thumb { aspect-ratio: 16 / 9; background: #0a0e18; position: relative; overflow: hidden; }
.card-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s ease; }
.card:hover .card-thumb img { transform: scale(1.04); }
.card-thumb .backend-tag { position: absolute; top: 8px; right: 8px; background: rgba(0, 0, 0, 0.65); backdrop-filter: blur(6px); color: var(--accent); padding: 3px 8px; border-radius: 6px; font-size: 0.7rem; font-family: "JetBrains Mono", monospace; font-weight: 600; border: 1px solid var(--border); }
.card-body { padding: 14px 16px 16px; display: flex; flex-direction: column; gap: 6px; }
.card-title { font-size: 1rem; font-weight: 600; line-height: 1.3; letter-spacing: -0.01em; }
.card-title-en { font-size: 0.75rem; color: var(--muted-2); font-family: "JetBrains Mono", monospace; margin-top: 2px; }
.card-desc { font-size: 0.85rem; color: var(--muted); line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.card-tech { display: flex; gap: 4px; flex-wrap: wrap; margin-top: 8px; }
.tech-pill { background: rgba(110, 193, 255, 0.08); color: var(--accent); font-size: 0.7rem; padding: 3px 8px; border-radius: 4px; border: 1px solid rgba(110, 193, 255, 0.12); }
.empty { text-align: center; padding: 80px 24px; color: var(--muted); }
.empty h3 { font-size: 1.1rem; margin-bottom: 8px; color: var(--fg); }
footer { border-top: 1px solid var(--border); margin-top: 80px; padding: 40px 24px; text-align: center; color: var(--muted-2); font-size: 0.85rem; }
footer a { color: var(--accent); text-decoration: none; }
footer a:hover { text-decoration: underline; }
footer .repo-link { font-family: "JetBrains Mono", monospace; font-size: 0.8rem; }
.skill-section { scroll-margin-top: 24px; }
@media (max-width: 640px) { header.hero { padding: 40px 16px 32px; } .grid { grid-template-columns: 1fr; } .toolbar { padding: 0 16px; } .skills { padding: 0 16px; } }
.install-banner { max-width: 900px; margin: 32px auto 0; padding: 20px 24px; background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; backdrop-filter: blur(8px); }
.install-banner h3 { font-size: 1rem; color: var(--accent); margin-bottom: 8px; }
.install-banner pre { background: #03060c; color: #c5d4ed; padding: 12px 16px; border-radius: 8px; font-family: "JetBrains Mono", monospace; font-size: 0.78rem; overflow-x: auto; border: 1px solid var(--border); margin-top: 8px; }
</style>
</head>
<body>
<header class="hero">
  <h1>Three.js 그래픽스 갤러리</h1>
  <p class="sub">절차적 지오메트리, PBR 머티리얼, 볼류메트릭 라이팅, VFX — 최상급 Three.js 그래픽 구현 41선을 라이브로 만나보세요</p>
  <div class="stats">
    <div class="stat"><span class="stat-num" id="stat-examples">41</span><span class="stat-label">예제</span></div>
    <div class="stat"><span class="stat-num" id="stat-skills">14</span><span class="stat-label">스킬 카테고리</span></div>
    <div class="stat"><span class="stat-num" id="stat-techniques">120+</span><span class="stat-label">기법</span></div>
  </div>
</header>
<div class="banner"><div class="hero-mosaic" id="hero-mosaic"></div></div>
<div class="install-banner">
  <h3>⌘ 스킬 설치 (한 줄)</h3>
  <p style="font-size:0.9rem; color:var(--muted); margin-bottom:4px;">이 갤러리에 보이는 모든 구현은 <code>threejs-awesome-graphics-agent-skills</code> npm 패키지로 배포됩니다. 에이전트에 설치하면 동일한 기법들이 즉시 사용 가능합니다.</p>
  <pre>npx threejs-awesome-graphics-agent-skills@latest install --agent codex
npx threejs-awesome-graphics-agent-skills@latest install --agent claude-code
npx threejs-awesome-graphics-agent-skills@latest install --agent cursor</pre>
</div>
<div class="toolbar">
  <input type="search" id="search" placeholder="예제 제목·기법·카테고리 검색…" autocomplete="off" />
  <select id="backend-filter">
    <option value="">전체 백엔드</option>
    <option value="WebGL">WebGL</option>
    <option value="WebGPU">WebGPU</option>
    <option value="TSL">TSL</option>
  </select>
  <span class="count" id="visible-count"></span>
</div>
<main class="skills" id="skills"></main>
<footer>
  <p>원본: <a href="https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills" target="_blank" rel="noopener">scottstts/Threejs-Awesome-Graphics-Agent-Skills</a> · 한글화 배포: <span class="repo-link">sigco3111/threejs-gallery-kr</span></p>
  <p style="margin-top:8px;">소스 코드는 원작자의 MIT/GPL-3.0 라이선스를 따릅니다.</p>
</footer>
<script>
const DATA = __DATA__;
const skillsEl = document.getElementById("skills");
const searchEl = document.getElementById("search");
const backendEl = document.getElementById("backend-filter");
const visibleCount = document.getElementById("visible-count");
function escape(s) { return String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]); }
function render(filtered) {
  skillsEl.innerHTML = "";
  let totalShown = 0;
  for (const skill of DATA) {
    const items = skill.examples.filter(ex => {
      if (filtered.q && !(ex.title_kr.toLowerCase().includes(filtered.q) || ex.title.toLowerCase().includes(filtered.q) || (ex.description || "").toLowerCase().includes(filtered.q) || (ex.techniques || []).some(t => t.toLowerCase().includes(filtered.q)))) return false;
      if (filtered.backend && !ex.backend.toLowerCase().includes(filtered.backend.toLowerCase())) return false;
      return true;
    });
    if (items.length === 0) continue;
    const section = document.createElement("section");
    section.className = "skill-section";
    section.id = \`skill-\${skill.skill}\`;
    section.innerHTML = \`<div class="skill-header"><div class="skill-icon">\${escape(skill.icon)}</div><div class="skill-title"><h2>\${escape(skill.skill_kr)}</h2><p>\${escape(skill.skill_desc)}</p></div><div class="skill-count">\${items.length}개</div></div><div class="grid"></div>\`;
    const grid = section.querySelector(".grid");
    for (const ex of items) {
      totalShown += 1;
      const tech = (ex.techniques || []).slice(0, 3).map(t => \`<span class="tech-pill">\${escape(t)}</span>\`).join("");
      const card = document.createElement("a");
      card.className = "card";
      card.href = ex.url;
      card.target = "_blank";
      card.rel = "noopener";
      card.innerHTML = \`<div class="card-thumb"><img src="\${escape(ex.thumb)}" alt="\${escape(ex.title_kr)}" loading="lazy" decoding="async" /><span class="backend-tag">\${escape(ex.backend)}</span></div><div class="card-body"><div class="card-title">\${escape(ex.title_kr)}</div><div class="card-title-en">\${escape(ex.title)}</div><div class="card-desc">\${escape(ex.description)}</div><div class="card-tech">\${tech}</div></div>\`;
      grid.append(card);
    }
    skillsEl.append(section);
  }
  visibleCount.textContent = \`\${totalShown} / 41 예제 표시 중\`;
  if (totalShown === 0) skillsEl.innerHTML = \`<div class="empty"><h3>일치하는 예제가 없습니다</h3><p>다른 검색어를 입력하거나 필터를 초기화해 보세요.</p></div>\`;
}
const st = { q: "", backend: "" };
function update() { render(st); }
searchEl.addEventListener("input", (e) => { st.q = e.target.value.trim().toLowerCase(); update(); });
backendEl.addEventListener("change", (e) => { st.backend = e.target.value; update(); });
update();
const techTotal = DATA.reduce((sum, s) => sum + s.examples.reduce((a, e) => a + (e.techniques?.length || 0), 0), 0);
document.getElementById("stat-techniques").textContent = techTotal + "+";
document.getElementById("stat-examples").textContent = DATA.reduce((a, s) => a + s.examples.length, 0);
document.getElementById("stat-skills").textContent = DATA.length;
const HERO_PICKS = [
  { skill: "threejs-spectral-ocean", slug: "stylized-above-below-ocean", class: "tall" },
  { skill: "threejs-procedural-geometry", slug: "porcelain-brass-submarine" },
  { skill: "threejs-raymarched-space-effects", slug: "schwarzschild-geodesic-black-hole", class: "wide" },
  { skill: "threejs-volumetric-clouds", slug: "weather-volume-clouds" },
  { skill: "threejs-procedural-vegetation", slug: "gpu-culled-flower-field" },
  { skill: "threejs-procedural-vfx", slug: "raymarched-aurora-curtains" },
  { skill: "threejs-procedural-materials", slug: "thin-film-soap-bubbles", class: "tall" },
  { skill: "threejs-water-optics", slug: "interactive-pool-volume" },
];
const mosaic = document.getElementById("hero-mosaic");
for (const p of HERO_PICKS) {
  const ex = DATA.flatMap(s => s.examples).find(e => e.skill === p.skill && e.slug === p.slug);
  if (!ex) continue;
  const tile = document.createElement("a");
  tile.className = "tile" + (p.class ? " " + p.class : "");
  tile.href = ex.url;
  tile.target = "_blank";
  tile.rel = "noopener";
  tile.innerHTML = \`<img src="\${escape(ex.thumb)}" alt="\${escape(ex.title_kr)}" loading="lazy" /><span class="label">\${escape(ex.title_kr)}</span>\`;
  mosaic.append(tile);
}
</script>
</body>
</html>`;
}

main().catch((e) => { console.error(e); process.exit(1); });