---
name: threejs-screen-space-ambient-occlusion
description: Three.js에서 GTAO(Ground Truth Ambient Occlusion) 스타일 스크린-공간 환경 폐색을 구현합니다. 벤트 노멀, 바이레이트럴/템포럴 재구성, 디더, 노이즈 균등화에 사용하세요.
---

# 스크린-공간 환경 폐색 (SSAO/GTAO)

깊이와 노멀에서 영역 폐색을 추정하세요. 단순 거리 기반 SSAO가 아닌, 벤트 노멀로 방향성을 보정하세요.

이 스킬은 단순한 설명 외에 검증된 예제와 에셋을 포함하므로, 관련 시 참고하거나 복사해서 활용하세요. 무작정 건너뛰지 마세요.

## 워크플로

1. 깊이/노멀 버퍼가 안정적인지 확인 (이전 패스 의존)
2. 샘플 수와 반경 결정
3. GTAO 또는 horizon-based AO 알고리즘 선택
4. 벤트 노멀로 AO 방향 보정
5. 템포럴 안정화 (motion vector, history reprojection)
6. 디더로 밴딩 제거

## 실패 조건

- 반경이 너무 작아 폐색이 거의 없음
- 반경이 너무 커서 모든 곳에 균일한 어두움
- 벤트 노멀이 없어 AO 방향성 손실
- 템포럴 안정성 없이 깜빡임
- 노이즈가 균등화되지 않아 밴딩 가시

## 라우팅 경계

이 스킬은 AO 만을 다룹니다. 블룸, DOF, 모션 블러 같은 다른 이미지-공간 효과는 `$threejs-image-pipeline` 으로 라우팅하세요.
