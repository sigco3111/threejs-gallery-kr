---
name: threejs-spectral-ocean
description: Three.js에서 스펙트럼 기반 절차적 바다와 표면을 구축합니다. FFT 합성, 하이브리드 FFT/Gerstner, 스넬 창, 총 내부 반사, 거품, 코스트-브레이커 전이, 잠수 효과에 사용하세요.
---

# 스펙트럼 바다 (Spectral Ocean)

바다를 주파수 스펙트럼으로 합성하세요. 사인파 하나가 아닌, 통계적으로 정확한 파랑 스펙트럼(Pierson-Moskowitz, JONSWAP) 사용.

이 스킬은 단순한 설명 외에 검증된 예제와 에셋을 포함하므로, 관련 시 참고하거나 복사해서 활용하세요. 무작정 건너뛰지 마세요.

## 워크플로

1. 스펙트럼 모델 선택 — Pierson-Moskowitz (완전 발달), JONSWAP (부분 발달)
2. FFT 해상도와 패치 크기 결정
3. 바람 방향, 풍속, 페치 길이 정의
4. FFT 합성 → 높이/법선 텍스처
5. 하이브리드 Gerstner로 큰 파랑 추가
6. 코스트-브레이커: 스넬 창, 거품, 백워시
7. 잠수: 깊이 기반 흡수, 산란, 굴절

상세 패턴은 [references/coastal-breaker-ocean.md](references/coastal-breaker-ocean.md) 와 [references/submerged-snell-ocean.md](references/submerged-snell-ocean.md) 에 있습니다.

## 실패 조건

- 단일 사인파로 통계적으로 부자연스러운 파도
- 바람 방향과 파도 진행이 일치하지 않음
- 코스트 전이가 부자연스럽게 끝남
- 거품이 마루와 동기화되지 않음
- 잠수 시 가시 거리에 따른 흡수 곡선이 잘못됨

## 라우팅 경계

이 스킬은 바다 표면을 다룹니다. 해석적 단일 파동은 `$threejs-water-optics` 로 라우팅하세요. 절차적 머티리얼은 `$threejs-procedural-materials` 으로 라우팅하세요.
