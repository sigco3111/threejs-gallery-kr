---
name: threejs-parallax-occlusion-mapping
description: Three.js WebGPU 및 TSL에서 실루엣 인지 시차 폐색 매핑을 구축합니다. 높이 필드 레이 마칭, 릴리프 UV, 평면/곡면 실루엣 클리핑, 인플레이트 셸, 자체 그림자, 릴리프 인지 그림자 깊이, 높이-유도 노멀에 사용하세요.
---

# 시차 폐색 매핑 (Parallax Occlusion Mapping)

릴리프를 결합된 교차, 커버리지, 노멀, 그림자 시스템으로 다루세요. 텍스처 좌표 오프셋만으로는 부족합니다.

이 스킬은 단순한 설명 외에 검증된 예제와 에셋을 포함하므로, 관련 시 참고하거나 복사해서 활용하세요. 무작정 건너뛰지 마세요.

## 워크플로

1. 높이 필드 텍스처 해상도와 셀 크기 결정
2. POM 이펙트의 이터레이션 수와 릴리프 UV 계산 방식 선택
3. 실루엣 클리핑 평면 또는 곡면 정의
4. 인플레이트 셸 두께로 자체 폐색 깊이 생성
5. 릴리프 인지 그림자 깊이 패스 추가
6. 높이 그라디언트로 노멀 재계산

상세 패턴은 [references/parallax-occlusion-system.md](references/parallax-occlusion-system.md) 와 실루엣 릴리프 예제 [silhouette-relief-contract.md](examples/silhouette-relief/silhouette-relief-contract.md) 에 있습니다.

## 실패 조건

- 릴리프가 UV 오프셋만으로 표현되어 평면처럼 보임
- 실루엣에서 셸이 캡처되어 아티팩트 발생
- 자체 그림자가 릴리프 깊이와 불일치
- 노멀이 원본 텍스처 그대로 사용되어 라이팅이 평면
- 이터레이션 부족으로 그림자/실루엣 끊김

## 라우팅 경계

이 스킬은 단일 머티리얼의 표면 릴리프만 다룹니다. 풀 표면 PBR 합성은 `$threejs-procedural-materials` 로 라우팅하세요. 머티리얼 라이팅과 섀도 패스 합성은 `$threejs-shadow-systems` 으로 라우팅하세요.
