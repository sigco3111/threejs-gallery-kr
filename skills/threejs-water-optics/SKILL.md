---
name: threejs-water-optics
description: Three.js에서 해석적 파동 광학과 풀 볼륨을 다룹니다. 단일 분석 파동, 풀 높이필드, 객체 리플, 굴절, 흡수, 반사, 반사-굴절 결합에 사용하세요.
---

# 물 광학 (Water Optics)

물 표면을 해석적 파동 광학으로 다루세요. 단순 반사/굴절 텍스처가 아니라 물리 기반 솔루션입니다.

이 스킬은 단순한 설명 외에 검증된 예제와 에셋을 포함하므로, 관련 시 참고하거나 복사해서 활용하세요. 무작정 건너뛰지 마세요.

## 워크플로

1. 파동 타입 선택 — Gerstner 해석, FFT 통계, 단일 분석 파동
2. 풀 높이필드 정의 (보통 256×256 이상)
3. 객체-기반 리플과 결합 (필요시)
4. 굴절: Beer-Lambert 흡수, 굴절 샘플링
5. 반사: 환경 맵 또는 라이브 반사
6. 라이팅과 섀도우 맵 결합

상세 패턴은 [references/analytic-wave-system.md](references/analytic-wave-system.md) 와 [references/interactive-pool-volume.md](references/interactive-pool-volume.md) 에 있습니다.

## 실패 조건

- 단순 환경 맵 반사로 표면 디테일 손실
- 굴절 샘플링이 거울처럼 작동
- 흡수가 Beer-Lambert 와 무관하게 균일
- 객체 리플이 표면과 시각적으로 단절
- 풀 높이가 라이팅과 불일치

## 라우팅 경계

이 스킬은 단일 해석 파동과 풀 볼륨을 다룹니다. 통계 FFT 기반 광역 바다는 `$threejs-spectral-ocean` 으로 라우팅하세요.
