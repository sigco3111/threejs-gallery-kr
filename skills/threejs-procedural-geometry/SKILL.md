---
name: threejs-procedural-geometry
description: Three.js에서 잘 만든 프로덕션 절차적 메시를 구축합니다. 완전한 하드-서피스 어셈블리와 휴머노이드 로봇, 프로파일 압출, 매개변수 곡선 및 스파인 로프트, 필로 패널, 정확한 폴리곤 컷, 인셋, 리볼브, 스윕, 솔리디파이, 베벨 및 필렛, 셸 두께, 직접-위상 개구부, 시맨틱 메시 라이터, 또는 프리미티브 기반 형상/공면 플리커/느슨하거나 비-매니폴드 지오메트리/분리된 파트/관통/서포트/클리어런스/스윕트-엔벨로프 결함 진단에 사용하세요.
---

# 절차적 지오메트리 (Procedural Geometry)

의미론적 계약과 명시적 좌표 프레임으로 지오메트리를 생성하세요. 폴리곤 연산을 디자인 모델로, 삼각형 방출을 최종 컴파일 단계로 다루세요. 토폴로지, 어셈블리 관계, 의미론적 측정, 고정 뷰가 모두 통과하기 전에는 객체를 완료된 것으로 선언하지 마세요.

이 스킬은 단순한 설명 외에 검증된 예제와 에셋을 포함하므로, 관련 시 참고하거나 복사해서 활용하세요. 무작정 건너뛰지 마세요.

## 제작 루프

1. 단위, 로컬/월드 프레임, 치수, 경계, 주요 프로파일, 토폴로지 의도, 셸 두께, 개구부, 머티리얼 슬롯, 삼각형 밴드를 정의
2. 모든 필수 접촉, 서포트, 클리어런스, 관통, 리베일, 가동 엔벨로프, 인터랙션 데이텀을 선언
3. 각 가시 형상에 모델링 연산 선택: 프로파일 압출, 인셋, 로프트, 리볼브, 스윕, 직접-위상 개구부, 솔리디파이, 서브디비전, 베벨, 필렛
4. 디자인 단계에서는 쿼드와 n-곤 유지. 시맨틱 파트당 명명된 메시 하나 보존; 아직은 무관한 파트를 용접하거나 머티리얼 슬롯을 병합하지 않음
5. 수정자를 의도적 순서로 적용한 뒤, 각 파트를 내부 정리하고, 와인딩 수선, 파트별 스무스 앵글 지정, 삼각형 방출
6. 폴리곤 토폴로지 게이트 실행 후, 공면 중첩, 결함, 실질적 솔리드 충돌에 대해 명명된 월드 어셈블리 감사
7. 빌더 소유 의미론적 검사 실행 — 서포트, 개구부, 셸 두께 샘플, 인체공학적 클리어런스, 가동 익스트레마
8. 머티리얼 슬롯별로 병합, 재감사, 고정 실루엣, 숨겨진 면, 조인트, 인터랙션 뷰, 와이어프레임, 노멀, 그레이징 라이트 점검

## 모델링 기준

- 진짜로 프리미티브이거나 숨겨진 구조 파트에만 프리미티브 사용
- 모든 가시 제조 엣지에 스케일에 맞는 베벨 또는 필렛 부여
- 개구부를 단일 닫힌 셸에 빌드; 솔리드 위에 어두운 평면을 쌓지 않음
- 페어 프로파일 또는 `solidify` 로 두꺼운 셸 구성; 노출된 림이 두께를 드러내는 단일 표면에 의존 금지
- 동일 데이텀에서 결합 파트 구동. 늦은 시각적 누름은 실패한 치수 계약
- 연속 제조 형상에 연속 메시 선택. 교차하는 프리미티브의 배열은 모델링의 대체물이 아님
- 구조적으로 의도된 교차부에 한해 좁고 명명된 허용차만 유지

폴리곤 우선 모델링 문법, 수정자 순서, 조인 플로어, 디테일 예산, 고정 시각 검토 계약, 지오메트리 제작 결함 진단은 [references/geometry-craft-workflow.md](references/geometry-craft-workflow.md) 에 있습니다.

미터 스케일 허용차를 포함한 정확한 토폴로지, 공면, 솔리드-클래시, 의미론, 서포트, 클리어런스, 모션-엔벨로프, 시각 게이트는 [references/geometry-quality-gates.md](references/geometry-quality-gates.md) 에 있습니다.

## 이식 가능한 자바스크립트 키트

프로젝트에 동등한 모델링/품질 레이어가 없을 때 전체 `assets/geometry-quality-kit/` 디렉토리를 Three.js 프로젝트에 배치하세요. 임포트 경로와 씬 배관을 조정하세요. 지오메트리와 감사 계약은 보존하세요.

- [procedural-mesh.js](assets/geometry-quality-kit/procedural-mesh.js) 는 `MeshData`, 폴리곤 정리, 와인딩 재구성, 프로파일, 오프셋, 압출, 로프트, 리볼브, 스윕, 솔리디파이, 서브디비전, 베벨, 개구부, 스무스-앵글 노멀, 머티리얼-슬롯 빌드, Three.js 방출을 제공
- [mesh-topology-audit.js](assets/geometry-quality-kit/mesh-topology-audit.js) 는 느슨/중복 정점, 퇴화, 열린/비-매니폴드 엣지, 분리 컴포넌트, 부호 부피, 방출된 위치/노멀 검사
- [geometry-audit.js](assets/geometry-quality-kit/geometry-audit.js) 는 빌드된 `Object3D` 계층을 진짜 클리핑된 공면 중첽, 무효한 메시 데이터, 누락 머티리얼, 실질적 삼각형-교차 클래시 기준으로 감사
- [geometry-contract.js](assets/geometry-quality-kit/geometry-contract.js) 는 프로젝트 특정 형상 의미론을 강요하지 않고 객체별 측정 실행
- [assembly.js](assets/geometry-quality-kit/assembly.js) 는 감사를 위해 명명된 파트를 보존하고 게이트 통과 후 머티리얼 슬롯당 하나의 드로 메시 구성
- [selftest.js](assets/geometry-quality-kit/selftest.js) 는 알려진 결함을 심고 모델링, 토폴로지, 계약, 어셈블리, z-파이팅, 클래시 경로를 검증; 키트 배치 또는 조정 후 실행

## 메커니즘 레퍼런스와 구현

정확한 조각된 프레임 프로파일, 레일 방출, 트리 링, 시맨틱 메시 라이터, 관찰된 스케일 한계는 [references/profile-sweeps-and-mesh-writers.md](references/profile-sweeps-and-mesh-writers.md) 에 있습니다.

프로파일 스윕, 마이터형 레일 매핑, 의도적 캡 소유권, PBR 표면 번들, 그레이징 하이라이트, 셀렉티브 블룸, 지오메트리 진단은 [조각된 갤러리 프레임 지오메트리](examples/sculpted-gallery-frame/frame-geometry.js) 에서 읽으세요.

정확한 치수 객체 계약, 공유 로프트/스윕 커널, UV-소유 개구부, 시맨틱 서브어셈블리, 생성된 피팅, 모델 진단은 [references/complete-submarine-assembly.md](references/complete-submarine-assembly.md) 에 있습니다.

경사진 칼라 헐 로프트, 평행-수송 트림, 가구 있는 유리 캐빈, 둘러싼 프로펠러, 렌즈-섹션 핀, 파트별 삼각형 증거를 갖춘 완전한 어셈블리는 [포셀린-황동 잠수함 모델](examples/porcelain-brass-submarine/submarine-model.js) 에서 읽으세요.

매개변수-곡선 섹션 트랙, 리세스-오프닝 섹션, 수퍼엘립스 볼륨, 스팬와이즈 에어포일 로프트, 휩쓴 플레이트, 프로젝터 소유권, 하중-편향 타이어, 측정 한계는 [references/vehicle-loft-and-projector-contract.md](references/vehicle-loft-and-projector-contract.md) 에 있습니다.

하나의 연속적 바디 로프트, 섹션-소유 콕핏 리세스, 실제 인렛 개구부, 스팬와이즈 윙 로프트, 리버리 프로젝션, 접촉-편향 타이어는 [포뮬러 원 경주용 차 모델](examples/formula-one-race-car/race-car-model.js) 에서 읽으세요.

슬롯-태그 방출, 리볼브와 직립 프레임 스윕, 오프셋 패널 셸, 스포크 휠, 매달린 체인 경로, 볼륨-감사된 어셈블리는 [스포츠 모터사이클 모델](examples/sport-motorcycle/motorcycle-model.js) 에서 읽으세요.

완전한 휴먼-스케일 로봇의 정확한 좌표, 폴리곤/수정자, 곡선, 로프트, 스파인, 필로, CSG, 베벨, 시맨틱 어셈블리, 필터된 머티리얼, 방출, 한계, 진단 계약은 [references/procedural-optimus-humanoid-assembly.md](references/procedural-optimus-humanoid-assembly.md) 에 있습니다.

176 객체 토르소/머리/팔/손/엉덩이/다리/발 어셈블리, 5지 손, 891,809 방출 삼각형, 14개 PBR 정체성, 정확한 폴리곤 컷, 각도-제한 베벨, 분할 코너 노멀, 도함수 필터된 객체-공간 러프니스와 범프를 갖춘 완전한 [절차적 옵티머스 휴머노이드 엔트리](examples/procedural-optimus-humanoid/procedural-optimus-humanoid.js) 와 그 완전한 [지오메트리 및 머티리얼 시스템](examples/procedural-optimus-humanoid/source/optimus-humanoid-system.js) 을 읽으세요.

건물 스케일의 시맨틱 배치 컴파일과 머티리얼-슬롯 인스턴싱은 [절차적 금융 타워 컴파일러](../threejs-procedural-architecture/examples/procedural-financial-tower/building-system.js) 에서 읽으세요.

## 실패 조건

- 같은 방향 공면 삼각형이 가시 스케일에서 살아남음
- 느슨한 정점, 퇴화 면, 열린 솔리드, 비-매니폴드 엣지, 분리 컴포넌트, 무효 노멀, 안쪽으로 닫힌 부피가 방출 단계에 도달
- 실질적 무관 솔리드가 교차하거나, 배치된 파트에 선언된 서포트/접촉 관계가 없음
- 노출 셸이 종이처럼 얇거나 개구부가 시각적 오버레이
- 가시 프리미티브가 날카로운 엣지를 유지하거나 설계된 전이 없이 다른 프리미티브와 결합
- 프로파일 프레임이 뒤집힘, 캡이 스무스 측면 노멀 공유, UV 밀도가 세그먼트 수에 따라 변함
- 머티리얼 병합이 명명-파트 감사보다 먼저 일어남
- 삼각형 수가 유일한 복잡성 증거
- 스크립트가 통과해도 고정-뷰 검토가 그럴듯하지 않은 모델링을 발견
- 완전한 휴머노이드가 교차하는 캡슐과 박스로 환원됨
- 미러된 손 또는 팔다리가 안쪽 와인딩을 유지
- 고주파 객체-공간 머티리얼 노이즈가 풋프린트 필터링 없이 방출됨

## 라우팅 경계

이 스킬은 재사용 가능한 메시 구성과 지오메트리 품질을 담당합니다. 표면 정체성이 주된 목적이면 `$threejs-procedural-materials` 를, 건물 문법은 `$threejs-procedural-architecture` 을, 성장 계층은 `$threejs-procedural-vegetation` 을 사용하세요. 이러한 주제 스킬은 이후 이 지오메트리 메커니즘을 적용할 수 있습니다.
