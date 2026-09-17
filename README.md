# Three.js 그래픽스 갤러리 — 한글판 🇰🇷

> scottstts/Threejs-Awesome-Graphics-Agent-Skills 의 **41개 절차적 그래픽 예제**를 한글화된 갤러리로 라이브 미리보기까지 제공합니다.

<p align="center">
  <img width="900" src="https://raw.githubusercontent.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/main/assets/example_gallery.jpeg" alt="갤러리 미리보기">
</p>

## 🌐 라이브 데모

**GitHub Pages**: [sigco3111.github.io/threejs-gallery-kr](https://sigco3111.github.io/threejs-gallery-kr) *(배포 후 활성화)*

각 예제는 실제 WebGL/WebGPU 로 실행되며, OrbitControls 로 회전·줌이 가능합니다.

## ✨ 무엇이 들어있나요

| 카테고리 | 개수 | 예시 |
|---|---|---|
| **절차적 지오메트리** | 5 | 포뮬러 원, 잠수함, 모터사이클, 옵티머스 휴머노이드 |
| **절차적 머티리얼** | 7 | 흙-이끼, 용암, 다이아몬드, 박막 비눗방울 |
| **절차적 식생** | 5 | GPU 풀, 꽃밭, 아이비, 구조화 재 |
| **스펙트럼 바다 / 물 광학** | 7 | FFT 해안, 잠수 스넬, 풀 볼륨 |
| **레이마칭 우주 효과** | 3 | 슈바르츠실트 블랙홀, 웜홀, 강착 원반 |
| **볼류메트릭 라이팅** | 4 | 구름, 오로라, 화재, 재진입 플라즈마 |
| **대기 / 시차 / VFX** | 8 | Rayleigh 대기, POM 릴리프, 강수, 창문 빗물 |

총 **41개 예제 · 14개 스킬 카테고리 · 265+ 기법**을 라이브로 확인할 수 있습니다.

## 🚀 빠른 시작

```bash
# 레포 클론
git clone https://github.com/sigco3111/threejs-gallery-kr.git
cd threejs-gallery-kr

# 의존성 설치 (Playwright 포함)
npm install --legacy-peer-deps

# 1) 예제 썸네일 캡쳐 (~5분, 41장 PNG 생성)
node scripts/capture-thumbs.mjs

# 2) docs/ 사이트 빌드
node scripts/build-gallery.mjs

# 3) 로컬 미리보기
cd docs && python3 -m http.server 8765
# → http://127.0.0.1:8765/

# 4) 라이브 예제 (개발 모드 — 원본 dev 서버)
npm run dev   # 원본 repo 의 example-gallery 서버, 41개 모두 라이브
```

## 📦 스킬 사용법 (에이전트 설치)

이 갤러리에 보이는 **모든 구현**은 npm 패키지로 배포되어, AI 코딩 에이전트에 한 줄로 설치할 수 있습니다.

### Codex / Claude Code / Cursor 등

```bash
# 글로벌 설치 (사용자 PC 전체)
npx threejs-awesome-graphics-agent-skills@latest install --agent codex
npx threejs-awesome-graphics-agent-skills@latest install --agent claude-code
npx threejs-awesome-graphics-agent-skills@latest install --agent cursor

# 프로젝트 스코프 설치 (현재 프로젝트에만)
npx threejs-awesome-graphics-agent-skills@latest install --agent github-copilot --scope project

# 커스텀 에이전트 경로 지정
npx threejs-awesome-graphics-agent-skills@latest install --agent custom --path designated-agent-skills-dir

# 재설치 (현재 버전 강제)
npx threejs-awesome-graphics-agent-skills@latest install --agent gemini-cli --force

# 제거
npx threejs-awesome-graphics-agent-skills uninstall --agent codex
```

### 지원되는 에이전트

| 에이전트 | 글로벌 경로 | 프로젝트 경로 |
|---|---|---|
| `universal` | `~/.agents/skills` | `.agents/skills` |
| `codex` | `~/.codex/skills` | `.codex/skills` |
| `claude-code` | `~/.claude/skills` | `.claude/skills` |
| `cursor` | `~/.cursor/skills` | `.cursor/skills` |
| `github-copilot` | `~/.copilot/skills` | `.github/skills` |
| `gemini-cli` | `~/.gemini/skills` | `.gemini/skills` |
| `windsurf` | `~/.codeium/windsurf/skills` | `.windsurf/skills` |
| `grok` | `~/.grok/skills` | `.grok/skills` |
| `custom` | `--path` 로 지정 | `--path` 로 지정 |

### 설치 후 에이전트가 이해하게 되는 것

- **어떤 시스템**(PBR, 절차적 지오메트리, VFX 등)이 요청에 적합한지 자동으로 라우팅
- **어떻게 구현하는지** — 41개 검증된 예제 코드를 그대로 참조
- **튜닝 파라미터** — 명명된 perceptual inputs (예: `intensity`, `roughness`, `choppiness`)
- **검증 절차** — visual validation 스킬이 시드/스케일 스윕으로 결과 진단

## 🧠 스킬 운영 모델 (Operating Model)

모든 그래픽 시스템은 다음을 노출해야 합니다:

- **결정론적/재현 가능한 입력** — 동일 시드 → 동일 결과
- **명명된 제어 필드와 perceptual 파라미터** — `intensity`, `roughness`, `choppiness`
- **진단 출력** — `density`, `macro height`, `mask` 같은 debug 모드
- **스케일/거리/시간 안정성 규칙** — 고정밀 셰이더도 거리에 따라 일관됨
- **의도적 메커니즘 기반 품질/해상도 티어** — 자동 LOD
- **포스트 처리 없는 baseline** — raw 형태도 읽을 수 있어야 함

이 원칙을 따르면 "어떻게 그럴듯하게 보이게 할지" 가 아니라 **"왜 이렇게 보이는지"** 를 제어할 수 있습니다.

## 🏗️ 스킬 카테고리 전체

| 스킬 | 전문 분야 |
|---|---|
| `threejs-skill-router` | 시각 타겟을 최소 단위의 전문 시스템으로 분해하는 라우터 |
| `threejs-camera-direction` | 오소리/사이드/오빗 릭, 바디-기준 프레임, 핸드오프, 포인터 룩 |
| `threejs-procedural-animation` | 해석적 타임라인, 중력 턴, 회전 프레임 도킹, 스프링, 쿼터니언 정렬 |
| `threejs-procedural-fields` | 스칼라/벡터 필드, 주파수 밴드, 도메인 와핑, 절차적 노멀 |
| `threejs-procedural-materials` | 하이브리드 텍스처 PBR (흙-이끼, 용암, 다이아몬드, 박막, 분산 유리, 프레임, 젤리) |
| `threejs-parallax-occlusion-mapping` | TSL 높이 매칭, 클립 실루엣, 인플레이트 릴리프 셸, 셀프 섀도잉 |
| `threejs-procedural-geometry` | 폴리곤 모델링, 로프트/리볼브/스윕/솔리디파이/베벨, 시맨틱 조인 |
| `threejs-procedural-vegetation` | 성장 계층, 표면-팔로잉 ivy, GPU-컴퓨티드 그래스, 가지 링, 바람 |
| `threejs-procedural-architecture` | 매싱과 파사드 문법, 노출-엣지 분석, 모듈, 머티리얼-슬롯 컴파일 |
| `threejs-procedural-planets` | 구면 지형, 능선, 크레이터, 바이옴, 절차적 노멀, 고도 필터링 |
| `threejs-spectral-ocean` | FFT 합성, 하이브리드 FFT/Gerstner, 스넬 창, 총 내부 반사, 거품 |
| `threejs-water-optics` | 해석적 파동, 풀 높이필드, 객체 리플, 굴절, 흡수, 반사 |
| `threejs-precipitation-surfaces` | 눈/비 낙하, 적설, 빙판, 물웅덩이, 리플 노멀, 스플래시 |
| `threejs-atmosphere-aerial-perspective` | 공유 Rayleigh/Mie 대기, 스카이, 깊이 산란 |
| `threejs-volumetric-clouds` | 날씨-모양 밀도, 바운디드 레이마칭, 클라우드 라이팅, 그림자 |
| `threejs-raymarched-space-effects` | 곡선-레이, 블랙홀, 강착 원반, 웜홀 스로트, 렌즈드 천체 |
| `threejs-procedural-vfx` | 오로라 커튼, 필름릭 렌즈 플레어, WebGPU 복셀 불/연기, 유체장 |
| `threejs-temporal-surfaces` | 터치 이력, 프로스트, 창문 빗물, 배경 굴절, 블러 |
| `threejs-shadow-systems` | 안정적인 캐스케이드, 클립맵 섀도우, 업데이트 예산, 무효화 |
| `threejs-screen-space-ambient-occlusion` | GTAO 스타일, 벤트 노멀, 바이레이트럴/템포럴 재구성 |
| `threejs-bloom` | HDR 추출, 멀티-스케일 필터링, 선택적 기여, 노출 커플링 |
| `threejs-exposure-color-grading` | 인코디드 루미넌스 미터링, 비대칭 적응, 톤 매핑, 3D LUT |
| `threejs-image-pipeline` | 공유 렌더 시그널 오너십과 오더링 |
| `threejs-visual-validation` | 고정-뷰 캡쳐, 진단 모자이크, 시드/스케일 스윕, 시간/GPU 증거 |

## 🛠️ 빌드 / 개발

### npm 스크립트 (원본 레포 동작 유지)

| 명령어 | 설명 |
|---|---|
| `npm run validate` | 스킬 팩 검증 |
| `npm test` | 전체 테스트 스위트 |
| `npm run dev` | 원본 example-gallery 개발 서버 (`http://127.0.0.1:4173`) |
| `npm run dev:examples:fixture` | 자기 테스트 픽스처 포함 |
| `npm run capture:examples` | 모든 예제를 헤드리스 캡쳐 |

### 이 레포의 빌드 스크립트

| 스크립트 | 역할 |
|---|---|
| `scripts/capture-thumbs.mjs` | Playwright 로 41개 예제 썸네일 PNG 캡쳐 |
| `scripts/build-gallery.mjs` | `docs/` 디렉토리에 GitHub Pages 배포용 사이트 빌드 |
| `scripts/_debug.mjs`, `scripts/_live-check.mjs` | 개발용 검증 스크립트 |

### 빌드 파이프라인

```
원본 scottstts/Threejs-Awesome-Graphics-Agent-Skills
    │
    │ (수동 동기화: 새 스킬이 추가되면 다시 클론)
    ▼
skills/, example-gallery/, source_materials/   ← 그대로 보존
    │
    │ node scripts/build-gallery.mjs
    ▼
docs/                                          ← GitHub Pages 루트
    ├─ index.html            한글 메인 갤러리
    ├─ examples.json         메타데이터
    ├─ thumbs/               41장 PNG 미리보기
    ├─ skills/               원본 그대로 (재배포 라이선스 충족)
    ├─ example-gallery/      runtime + support
    └─ examples/             41개 단독 페이지 (CDN importmap)
```

## 🚢 GitHub Pages 배포

```bash
# 빌드 후 docs/ 안의 변경분만 커밋
git add docs/
git commit -m "갤러리 빌드 갱신"
git push origin main

# GitHub Pages 설정:
# Settings → Pages → Source: "Deploy from a branch" → main / docs
```

## ⚖️ 라이선스

원본 코드는 **scottstts/Threejs-Awesome-Graphics-Agent-Skills** 의 라이선스를 따릅니다:

- 본문 패키지: **MIT**
- third-party 머티리얼·에셋 일부: **GPL-3.0** (각 `example.json` 의 `sourceTrace` 참조)

이 한글화 배포는 라이선스 표기 의무를 충족합니다. 상업적 사용 시 원본 라이선스를 확인하세요.

## 🙏 크레딧

- **원작자**: [scottstts](https://github.com/scottstts) — `Threejs-Awesome-Graphics-Agent-Skills` 설계 및 구현
- **한글화 배포**: [sigco3111](https://github.com/sigco3111)
- **Three.js**: [mrdoob](https://github.com/mrdoob) 및 모든 기여자

## 📌 변경 이력

- **v1.0 (2026-09-17)** — 41개 예제 전체 한글화 · CDN 기반 라이브 미리보기 · GitHub Pages 배포