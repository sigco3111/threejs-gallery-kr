---
name: threejs-atmosphere-aerial-perspective
description: Three.js에서 물리 기반 하늘 및 시차 원근 시스템을 구현합니다. 행성 대기, 지표-우주 전이, Rayleigh/Mie 산란, 사전 계산 LUT, 깊이 기반 투과도·입사산란, 태양/달 디스크, 대기 인지 조명에 사용하세요.
---

# 대기 및 시차 원근 (Atmosphere and Aerial Perspective)

하늘 렌더링과 시차 원근을 동일한 산란 모델의 두 시각으로 다룹니다. 반경, 밀도 프로파일, 계수, 태양 방향, 노출 스케일, 좌표 변환을 반드시 공유해야 합니다.

이 스킬은 단순한 설명 외에 검증된 예제와 에셋을 포함하므로, 관련 시 참고하거나 복사해서 활용하세요. 무작정 건너뛰지 마세요.

## 구현 티어 선택

- 궤도 카메라가 없는 작은 씬: 해석적 높이/거리 근사
- 행성 지표-우주 카메라: 레이 적분 또는 사전 계산 LUT
- 대규모 지리 공간 월드: LUT + 월드→행성 변환, 고도 보정, 깊이 인지 시차 원근

구현 전에 [references/atmosphere-system-contract.md](references/atmosphere-system-contract.md) 를 읽으세요. LUT/타원체 아키텍처와 동적 적분, 셸/포스트 핸드오프를 분리합니다.

LUT 예제에서 사용하는 [LUT 하늘과 시차 원근 엔트리](examples/lut-aerial-perspective/atmosphere-effect.js) 와 그 `source/` 모듈을 읽으세요. SkyMaterial, SkyLightProbe, SunDirectionalLight, AerialPerspectiveEffect, 사전 계산 텍스처 로더, 태양/달 방향, 렌즈 플레어, 톤 매핑, 디더링 경로가 있습니다.

## 필수 출력

- 하늘 복사 휘도
- 태양 투과도/색상
- 카메라에서 가시 표면까지 세그먼트 투과도
- 세그먼트 입사산란
- 머티리얼용 선택적 하늘 복사 조도
- 월드 단위와 대기 단위 간 명시적 스케일 변환

## 실패 조건

- 하늘과 지형 헤이즈가 서로 다른 태양 방향이나 계수를 사용
- 대기가 균일하게 투명한 구체로 표현됨
- 궤도 운동 중 카메라 고도를 평면 로컬 프레임에서 측정
- 씬 깊이가 비선형인데 선형으로 취급
- 잘못된 복사 휘도 스케일을 노출로 가림
- 셸 진입부에서 대기가 갑자기 끊김

## 라우팅 경계

이 스킬은 분자/에어로졸 하늘 산란과 표면-세그먼트 시차 원근을 담당합니다. `$threejs-volumetric-clouds` 는 날씨 형태의 구름 밀도, 시간적 구름 재구성, 구름 그림자에 사용하세요. `$threejs-procedural-vfx` 는 발광 오로라 커튼 볼륨과 그 원근/이방사 재질, 그리고 단독 필름릭 HDR 렌즈 플레어 합성기에 사용하세요. LUT 예제의 렌즈 플레어는 하늘 산란과 시차 원근 합성의 한 단계로 남아있을 때 여기에 둡니다.
