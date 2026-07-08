# URP 툰 셰이더 자체 구현

**프로젝트**: 재조합 (블루이글루) 게임 개발 · 인디 게임 개발 · 2026.06

## 개요

Claude(Claude Code)와 Codex를 활용해 lilToon·NiloCat(NiloToon 공개 레퍼런스)·UTS3·Poiyomi 등 기존 툰 셰이더를 코드 단위로 분석하고, 그 결과를 바탕으로 Unity 6 URP 기반의 자체 캐릭터·배경 툰 셰이더(CharacterToon · SceneToon)를 구현했습니다.

## 분석 과정 (Claude & Codex 활용)

- **목적 정의**: 쿼터뷰 인게임과 1인칭 로비 쇼케이스를 하나의 URP/HLSL 셰이더 체계로 구현하는 것이 목표였고, NiloCat·lilToon·UTS3는 그대로 채택할 대상이 아니라 "검증된 참고 자료"로 규정
- **코드 대조 분석**: Claude Code로 각 셰이더의 라이팅 구조·패스 구성·셰이더 변형(variant) 전략을 실제 코드 기준으로 비교해 최적화 수준과 기능 커버리지를 평가·문서화
- **기능 정의 확보**: Codex로 우리 셰이더 코드에서 각 기능의 실사용처를 전수 확인해, 의미가 불명확했던 기능(Ramp/LUT, ILM 마스크 등)을 추측이 아닌 코드 근거로 재정의
- **갭 로드맵 수립**: 분석 결과를 바탕으로 NiloToon급 기능 갭 로드맵을 작성해 우선순위와 구현 범위를 결정

## 자체 셰이더 구현

- **CharacterToon** — LUT Ramp, ILM 맵, Face SDF, Inverted Hull Outline, 캐릭터 전용 라이트, 림 라이트, MatCap·Angel Ring·SSS·Eye 등을 포함한 캐릭터용 URP 툰 셰이더
- **SceneToon** — 배경·터레인·스카이용 툰 셰이더 시스템(B0~B5 단계로 구현), 캐릭터와 공유되는 로직은 ToonShared 모듈로 분리
- Unity 6.3 LTS / URP 17.x 기준으로 구현, `com.blueigloo.shader` 패키지 구조로 정리해 다른 프로젝트에도 재사용 가능하도록 패키징

## 자체 평가

경쟁 분석 문서(`lilToon` / `NiloCat URP ToonLit` / `UTS3` / `Poiyomi`와 코드 대조) 기준 자체 평가입니다.

| 항목 | 평가 | 요지 |
|---|---|---|
| 게임 최적화 | B+ | 구조·변형(variant) 관리는 우수, 미사용 키워드 등 개선 여지 소량 존재 |
| 퀄리티 (기능 커버리지) | A− | UTS3급 캐릭터 표현. lilToon만큼 광범위하지는 않지만 실사용엔 충분 |
| 퀄리티 (동적 라이팅 정합) | C+ | 단일 키라이트 기준 설계라 동적 라이팅 대응은 추가 개선 여지 |

## 작업 히스토리

실제 커밋 로그 기준 개발 흐름입니다.

| 시기 | 작업 내용 |
|---|---|
| 2026.06.20 | CharacterToon URP 툰 셰이더 초기 구현 + 팀 피드백 기반 R&D |
| 2026.06.21 | Unlit 셰이더 변형, SSAO 강도 툴팁, MatCap 색상/블러, Face SDF 경계 처리, 캐릭터 다중 라이트 지원 등 반복 개선 |
| 2026.06.23 | SceneToon 배경 툰 셰이더 시스템(B0~B5) 추가, ToonShared를 배경 전용 공유 모듈로 분리 |
| 2026.06.23 | 그림자 마스크 토글, 렌더 페이스(앞/뒤면 노멀 플립) 셀렉터 추가, `com.blueigloo.shader` 패키지로 재구성 |

레포지토리: [github.com/JJH0204/unity-toonshader](https://github.com/JJH0204/unity-toonshader)

---
[← 포트폴리오로 돌아가기](https://jjh0204.github.io/JJH0204/)
