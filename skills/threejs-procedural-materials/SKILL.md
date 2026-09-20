---
name: threejs-procedural-materials
description: Three.js에서 프로덕션 절차적 머티리얼을 작성합니다. 하이브리드 텍스처-지원 PBR 흙/이끼(절차적 변위와 마스크 포함), 상향면 모델 이끼 누적, 아틀라스 필터링, 스펙큘러 AA, 행성-공간 필드, 지형 습윤, 용암과 발광 표면, 반사성 파동-광학 회절격자, 공기-박막-공기 비눗방울과 Airy 간섭, 내부 반사와 분산을 포함한 레이 트레이싱 다이아몬드와 보석 굴절, 스펙트럼 분산과 볼륨 흡수를 포함한 이미지-공간 유리 투과, XPBD 메커니즘과 굴절 카오스틱을 갖춘 변형 소프트바디 젤리 머티리얼, 인스턴스별 디졸브, 작성된 PBR 정체성, 도함수 노멀, 사용자 정의 직접광 그림자 변조에 사용하세요.
---

# 절차적 머티리얼 (Procedural Materials)

표면 정체성과 원인에서 머티리얼을 빌드하세요. 색상, 러프니스, 메탈릭, 노멀, 투과, 발광은 무관한 노이즈 텍스처가 아니라 같은 표면을 기술해야 합니다.

이 스킬은 단순한 설명 외에 검증된 예제와 에셋을 포함하므로, 관련 시 참고하거나 복사해서 활용하세요. 무작정 건너뛰지 마세요.

## 머티리얼 그래프 순서

```text
안정적인 좌표
  → 구조 필드
  → 머티리얼 정체성 가중치
  → 인과 수정자
  → 필터된 미세구조
  → PBR 채널
  → 라이팅/섀도우 확장
```

아틀라스 필터링, 스펙큘러 AA, 행성 좌표, 월드-높이 습윤, 인스턴스별 디졸브, 작성된 PBR 응답 번들은 [references/procedural-pbr-system.md](references/procedural-pbr-system.md) 에 있습니다.

월넛, 안틱-골드, 흑단 텍스처/러프니스/메탈니스/클리어코트 번들과 그레이징-라이트 설정은 [조각된 갤러리 프레임 지오메트리](../threejs-procedural-geometry/examples/sculpted-gallery-frame/frame-geometry.js) 에 있습니다.

공유 지질, 기후, 물, 바이옴, 러프니스, 도함수-노멀 원인이 절차적 행성 표면에 통합된 방식은 [절차적 행성 표면](../threejs-procedural-planets/examples/procedural-planet-surface/planet-system.js) 에 있습니다.

결합된 반사, 굴절, 흡수, 필터된 미세구조, 해결된 마루 응답과 그 진단 채널은 [해석적 파동 광학](../threejs-water-optics/examples/analytic-wave-optics/water-system.js) 에 있습니다.

레이마칭 절차적 높이 필드, 그 노멀, 암석/용암 정체성, 발광, 글로우, 잉걸불, 안개, 그레인이 단일 머티리얼 원인 스택에 결합된 모습은 [용암 흐름 표면 머티리얼](examples/lava-flow-surface/lava-surface.js) 에 있습니다.

메시가 자체 광학 볼륨인 보석 — 카메라-레이 진입 굴절, GPU BVH 첫-히트 루프, 경계 있는 전반사 바운스, 채널별 IOR 분산, MIP-보정 환경 출구 샘플링, 라이브 카메라-행렬 유니폼 — 은 [레이 트레이싱 다이아몬드 머티리얼](examples/raytraced-diamond/diamond-material.js) 에 있습니다.

이미지 공간에서 해결되는 투과 바디 — 양면 백-페이스 데이터 패스와 반전된 깊이, 반복적 내부 출구 탐색, 경계 있는 전반사, 진실한 경로 길이 위 Beer-Lambert 흡수, CIE 1931 통해 재결합된 파장별 Cauchy 인덱스 — 는 [스펙트럼 분산 유리 머티리얼](examples/spectral-dispersive-glass/spectral-glass-material.js) 에 있습니다. 재사용 가능한 광학 프리미티브 — 정확한 비편광 Fresnel, Cauchy 계수, 스펙트럼 가중치, 회전 가능한 환경 프로브, 버퍼 프로젝션 — 은 [유리 광학](examples/spectral-dispersive-glass/glass-optics.js) 에 있고, [references/dielectric-glass-optics.md](references/dielectric-glass-optics.md) 가 두-패스 계약, 버퍼 형식, 탐색 경계, 투과 진단을 담습니다.

두 투과 경로는 품질이 아니라 지오메트리로 선택하세요. 출구 패싯이 카메라에서 멀리 향할 때도 정확해야 하는 닫힌 다면 보석은 BVH 경로를 선택하세요. 스캔/조립된/열린-시트/다중-셸 바디는 이미지-공간 경로를 선택하세요. 이 경로는 일관되지 않은 와인딩과 어느 쪽이든 가리키는 작성된 노멀을 허용하지만 프레임 외부의 표면은 볼 수 없습니다.

정확한 엠보스-필드, CIE/블랙바디 스펙트럼, 위상-격자, Bessel 차수 효율, 결맞음-확장, 스트립-이미터, 가산-레이어, 안정적 객체-프레임, 한계, 진단 계약은 [references/physical-diffraction-grating.md](references/physical-diffraction-grating.md) 에 있습니다.

인쇄된 기판에 가산 HDR 포일 응답 — 별과 줄무늬 마스크가 국부 그루브 각도/피치/릴리프를 선택하고 파장만 스펙트럼 색을 소유 — 은 [물리적 회절격자 구현](examples/physical-diffraction-grating/physical-diffraction-grating.js) 에 있습니다. 완전한 광학 모델은 내장 네이티브 셰이더 소스 없이 `Fn`, `If`, `Loop` 로 순수 TSL 그래프로 표현됩니다.

공기-박막-공기 Airy 방정식, 대표 RGB 스펙트럼 밴드, 두 멤브레인 블렌딩, 경계 있는 보조 반사, 모세관 메커니즘, 카메라-인지 유입, 천공 수축, 한계, 진단은 [references/thin-film-soap-bubble-system.md](references/thin-film-soap-bubble-system.md) 에 있습니다.

비누막 간섭이 이미지를 구동해야 할 때 — 파장-의존 수성 인덱스, 앞/뒤 멤브레인 패스, 해석적 근접-거품 반사, 볼륨-보존 모세관 모드, 부력과 항력, Taylor-Culick 파열, 가시-낙하 여파, 결정론적 물리 게이트 — 는 [박막 비눗방울 시스템](examples/thin-film-soap-bubbles/soap-bubble-system.js) 에 있습니다.

사면체 XPBD 상태, 부드러운 광학 셸, 뷰-레이 두께, BVH 굴절, 흡수, 수신자 그림자, 유한 RGB 카오스틱 필드가 결합된 채로 유지되는 변형 꽃 모양 투과 바디는 [소프트바디 젤리 구현](examples/softbody-jelly/softbody-jelly.js) 에 있습니다.

소프트바디 좌표 계약, neo-Hookean XPBD 분리, 댐핑과 슬립 규칙, 굴절 수신자 예산, 머티리얼 상수, 한계, 진단은 [references/softbody-jelly.md](references/softbody-jelly.md) 에 있습니다.

## 필수 컨트롤

- 실제 또는 지각 텍스처 스케일
- 머티리얼 정체성 가중치
- 러프니스 범위와 마이크로-노멀 강도
- 선택된 머티리얼 패턴이 요구하는 인과 필드
- 투과 바디의 경우 정의하는 물리 상수 — 인덱스/Abbe 쌍, 내부 경로 예산, 소광 깊이 — 식 안에 묻지 말고 명명
- 비누막의 경우 외부와 막 인덱스, 나노미터 두께 범위, 파장 밴드, 표면 장력, 멤브레인 정렬
- 거리/도함수 필터링
- 스펙큘러 앤티앨리어싱
- 채널과 마스크 디버그 모드
- 발광 머티리얼이 글로우나 볼류메트릭 누적을 소유할 때 발광 머티리얼 디버그 모드

텍스처-지원 흙과 이끼 알베도, AO, 러프니스, 노멀 마이크로디테일을 절차적 mound 변위, 수분, 이끼 커버리지/높이, 휩쓴 셀룰러 크랙과 결합한 것은 [references/hybrid-soil-moss-surface.md](references/hybrid-soil-moss-surface.md) 와 [하이브리드 흙-이끼 구현](examples/hybrid-soil-moss-surface/hybrid-soil-moss-surface.js) 에 있습니다. 그 표면 정체성을 완전히 절차적으로 합성되었다고 기술하지 마세요. 이끼가 모델에도 자리잡아야 한다면 모델-잠금 커버리지, 상향면 누적, 변위 두께, 공유 이끼 PBR 정체성은 [모델 이끼 누적 구현](examples/hybrid-soil-moss-surface/model-moss-accumulation.js) 에 있습니다.

## 실패 조건

- 모든 PBR 채널이 독립 노이즈를 샘플링
- 러프니스가 스칼라 사후 처리
- 고주파 노멀이 한 픽셀 아래에서 살아남음
- 트라이플래너 투영이 가시 방향/스케일 솔기를 보임
- 아틀라스 패딩이 밉맵핑에서 무시됨
- 커스텀 라이팅이 명시적 양식화 목표 없이 에너지 보존 제거
- 불안정한 하이라이트를 숨기기 위해 포스트 프로세싱 사용
- 회절 색이 파장에서 유도되지 않고 UV에서 페인트됨
- 그루브 프레임이 객체가 아닌 카메라/월드 축을 따름
- 좁아진 회절 로브가 시그마 정규화 없는 밀도로 에너지를 잃음
- 비눗방울이 단단한 유리 구로 취급되거나 무지개로 페인트되어 공기-박막-공기 간섭을 사용하지 않음
- 변형된 비누 막이 변형되지 않은 구 노멀을 유지
- 변형 투과 바디가 렌더 셸, 광학 BVH, 수신 필드를 서로 다른 상태에서 업데이트
- 유한 카오스틱 수신기가 0이 아닌 데이터를 클램프된 텍스처 가장자리에 도달하게 둠
- 소프트바디 솔버가 가변 적분 스텝 또는 댐핑 후 에너지를 주입하는 결합되지 않은 정지-응력 분할 사용

## 라우팅 경계

주된 문제가 공유 스칼라/벡터 원인 설계라면 `$threejs-procedural-fields` 를 사용하세요. 머티리얼만이 아닌 완전한 궤도-근접접근 바디는 `$threejs-procedural-planets` 을 사용하세요. 높이 필드가 레이-마칭 교차, 실루엣 커버리지, 릴리프-인지 그림자를 소유해야 한다면 `$threejs-parallax-occlusion-mapping` 을 사용하세요. 뷰 정렬된 젖은 유리 광학과 스크린-공간 히스토리는 `$threejs-temporal-surfaces` 를 사용하세요. 이 스킬은 투과 바디 자체를 통한 광학 경로를 소유합니다.
