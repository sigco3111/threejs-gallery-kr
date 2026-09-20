---
name: threejs-skill-router
description: 시각 타겟을 최소 단위의 전문 시스템으로 분해합니다. 어떤 스킬을 로드할지, 어떤 순서로 빌드할지 결정하는 데 사용하세요. 진입점 스킬 — 먼저 로드해서 다른 Three.js 스킬을 안내받으세요.
---

# 스킬 라우터 (Skill Router)

시각 타겟을 듣고 어떤 전문 스킬이 필요한지 결정하세요. 모든 스킬을 한꺼번에 로드하지 마세요. 최소 세트로 시작하고, 필요할 때 추가하세요.

이 스킬은 단순한 설명 외에 검증된 예제와 에셋을 포함하므로, 관련 시 참고하거나 복사해서 활용하세요. 무작정 건너뛰지 마세요.

## 라우팅 의사결정

1. 시각 타겟이 무엇인지 한 문장으로 정의
2. 표현하려는 핵심 시스템 식별 (예: 시차 폐색, 절차적 식생, 볼류메트릭 구름)
3. 해당 시스템의 원자 스킬 로드
4. 이미지 합성이 필요하면 `$threejs-image-pipeline` 로드
5. 카메라 시스템이 특수하면 `$threejs-camera-direction` 로드
6. 시각적 검증 단계로 `$threejs-visual-validation` 로드

## 의사결정 트리 예시

- "검은 행성이 대기 굴절로 보이는 풍경" → `$threejs-procedural-planets` + `$threejs-atmosphere-aerial-perspective`
- "푸른 하늘 아래 디테일한 풀밭" → `$threejs-procedural-vegetation` + `$threejs-sky-and-sun` (없으면 대기)
- "블룸과 색 그레이딩" → `$threejs-bloom` + `$threejs-exposure-color-grading` + `$threejs-image-pipeline`
- "용암 흐름 표면" → `$threejs-procedural-materials`

## 워크플로

1. 사용자 요청을 듣고 시각 타겟 식별
2. 최소 스킬 세트로 라우팅
3. 각 스킬의 워크플로 따라 빌드
4. 시각 검증으로 마무리

## 실패 조건

- 모든 스킬을 무차별 로드하여 컨텍스트 낭비
- 순서를 무시하고 의존하는 스킬보다 의존되는 스킬이 먼저 로드
- 시각 검증 단계 생략
- 단일 스킬로 모든 것을 처리하려 함

## 라우팅 경계

이 스킬은 의사결정만 담당하며, 직접 빌드하지 않습니다. 각 효과의 실제 구현은 해당 원자 스킬로 라우팅하세요.
