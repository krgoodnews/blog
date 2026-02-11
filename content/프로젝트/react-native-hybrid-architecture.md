---
title: "React Native 하이브리드 아키텍처 및 공용 UI 시스템 구축"
date: 2026-02-11
tags: [React Native, iOS, TypeScript, Design System, Architecture]
---

# React Native 하이브리드 아키텍처 및 공용 UI 시스템 구축

기존 iOS 네이티브 앱 환경에 React Native와 TypeScript를 도입하여, 크로스 플랫폼 모듈로 전환하는 하이브리드 아키텍처를 구현했습니다. 비즈니스 로직이 빈번하게 변경되는 기능은 CodePush를 이용해 빠르게 대응했습니다. 

더 나아가 개발 효율성을 극대화하기 위해, 기존에 구축한 QDSKit(QANDA Design System Kit)을 확장하여, iOS와 React Native 환경에서 공통으로 사용할 수 있는 UI 컴포넌트 시스템을 개발했습니다. 이 과정에서 Swift로 작성된 네이티브 뷰 정보를 React Native에서 읽어오는 브릿지 구조를 설계했습니다. 해당 모듈로 두 플랫폼간의 코드 중복을 성공적으로 줄이고, 디자인 변경 사항을 즉각적으로 반영했습니다.

## 1. 배경 및 문제 정의
기존 iOS 네이티브 앱은 높은 완성도를 가졌으나, 단순한 UI 변경이나 비즈니스 로직 수정에도 앱 심사 과정을 거쳐야 하는 비효율이 존재했습니다. 이를 해결하기 위해 **CodePush** 활용이 가능한 React Native(RN)를 점진적으로 도입하기로 결정했습니다.

## 2. 주요 기술적 의사결정
* **하이브리드 내비게이션:** 전체를 RN으로 재작성하는 대신, 특정 탭이나 화면 단위로 RN 뷰를 로드하는 하이브리드 구조 채택
* **Native Module Bridge:** 기존에 구축된 Swift 기반의 디자인 시스템(QDSKit)을 RN에서도 재사용하기 위해, 네이티브 뷰를 래핑하여 RN 컴포넌트로 노출하는 브릿지 설계

## 3. 구현 내용 (Technical Detail)
* **TypeScript & Fabric:** 정적 타입 안정성을 위해 TypeScript를 전면 도입하고, 일부 성능이 중요한 모듈은 Fabric 아키텍처 적용 검토
* **UI 동기화:** 네이티브 쪽의 테마(Color, Font) JSON을 RN의 Theme Provider와 연동하여, 디자인 토큰 하나만 수정하면 양쪽 플랫폼에 자동 반영되도록 파이프라인 구축

## 4. 성과
* 신규 기능 4종 및 기존 화면 15개를 RN으로 전환 완료
* iOS/Android 동시 기능 출시가 가능해져 피쳐 개발 리드타임 약 40% 단축
