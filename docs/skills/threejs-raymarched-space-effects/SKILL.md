---
name: threejs-raymarched-space-effects
description: Three.js에서 레이마칭된 우주 효과를 구축합니다. 곡선-레이 블랙홀, 슈바르츠실트 측지선, 강착 원반, 웜홀 스로트, 렌즈드 천체, 적색편이, 라이팅 결합에 사용하세요.
---

# 레이마칭 우주 효과 (Raymarched Space Effects)

광선을 곡선화하고 시간적 누적을 정확히 다루세요. 블랙홀/웜홀은 단순 후처리 효과가 아니라 풀 광학 시뮬레이션입니다.

이 스킬은 단순한 설명 외에 검증된 예제와 에셋을 포함하므로, 관련 시 참고하거나 복사해서 활용하세요. 무작정 건너뛰지 마세요.

## 워크플로

1. 광선 적분기 선택 — RK4 또는 해석적 측지선
2. 적분 스텝 수와 거리-가중 누적 결정
3. 블랙홀/웜홀 메트릭 파라미터 (질량, 스로트 반경, 전하) 정의
4. 강착 원반 발광 모델 결합
5. 적색편이/청색편이 계산
6. 배경 천체 매핑 (별, 은하)

상세 패턴은 [references/curved-ray-integrators.md](references/curved-ray-integrators.md) 와 [references/lensed-celestial-spheres.md](references/lensed-celestial-spheres.md) 에 있습니다.

## 실패 조건

- 적분 스텝 부족으로 강착 원반 끊김
- 적색편이가 카메라 의존성 없이 적용
- 웜홀 양쪽 좌표계 불일치
- 광선이 사건의 지평선 통과 후 무한 누적
- 배경 천체가 왜곡되지 않아 부자연스러움

## 라우팅 경계

이 스킬은 풀 광학 시뮬레이션을 다룹니다. 발광 오로라/플라즈마 같은 단순 VFX 볼륨은 `$threejs-procedural-vfx` 으로 라우팅하세요.
