---
title: "레거시 아키텍처 리팩토링: RIBs에서 MVVM으로"
date: 2026-02-11
tags: [iOS, Refactoring, Architecture, MVVM, Combine, RIBs]
---

# 레거시 아키텍처 리팩토링: RIBs에서 MVVM으로

기존의 복잡한 RIBs Interactor와 ReactorKit의 강결합 구조를 분리하고, 직관적인 **MVVM + Combine 패턴**으로 재설계하여 코드 복잡도를 50% 감소시켰습니다. 높은 러닝 커브를 가진 독자적 아키텍처를 표준화함으로써 신규 입사자의 적응 기간을 단축하고 기술 부채를 해소했습니다. 또한, 분산되어 있던 상태 관리 로직을 ViewModel로 일원화하여 데이터 흐름 추적 시간을 단축하고 디버깅 용이성을 확보했습니다.

## 1. 문제 상황
기존 프로젝트는 Uber의 RIBs 아키텍처 위에 ReactorKit을 얹은 복합 구조였습니다.

* **Massive Interactor:** Interactor가 라우팅, 비즈니스 로직, 상태 관리(Reactor)를 모두 처리하여 코드가 지나치게 비대해지는 문제가 있었습니다.
* **Over-Engineering:** 간단한 화면 하나를 만드는 데도 5~6개의 파일과 수많은 보일러플레이트 코드가 필요했습니다.

## 2. 해결 전략: Pragmatic MVVM
팀의 규모와 개발 속도를 고려했을 때, 구조적 엄격함보다는 **생산성과 직관성**이 중요하다고 판단했습니다.

* **Architecture:** View - ViewModel - Model 구조로 단순화하되, **Combine**을 활용한 Input/Output 패턴을 정의하여 단방향 데이터 흐름(Unidirectional Data Flow)의 장점은 유지했습니다.
* **Migration Strategy:** 신규 피쳐부터 MVVM을 적용하고, 기존 RIBs 모듈은 유지보수 시점에 점진적으로 걷어내는 전략을 사용했습니다.

## 3. 결과
* 보일러플레이트 코드 약 50% 감소
* 신규 입사자의 프로젝트 온보딩 기간 단축 (구조 파악 용이성 증대)
