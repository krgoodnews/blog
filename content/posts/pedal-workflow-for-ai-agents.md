---
title: "AI Agent에게 구조를 주면, 비싼 모델이 필요 없다 — PEDAL 워크플로"
date: 2026-04-07
tags: [AI, Agent, PEDAL, Workflow, Development-Workflow]
---

![PEDAL Cycle](./posts/images/pedal_cycle.png)

AI Agent에게 기능 하나를 통째로 맡겨본 적 있으신가요?

"로그인 기능 만들어줘"라고 하면, Agent는 열심히 코드를 써내려갑니다. 그런데 결과를 보면 — 설계가 없고, 에러 처리가 빠져 있고, 보안은 고려도 안 되어 있습니다. Agent에게 **"잘 만들어"** 라고만 했지, **"어떤 과정을 거쳐 만들어"** 라고는 안 했기 때문입니다.

**PEDAL**은 이 문제에 대한 답입니다.

---

## PEDAL이란

PEDAL은 품질 관리 방법론 **PDCA(Plan-Do-Check-Act)** 를 AI Agent 기반 개발에 맞게 재설계한 워크플로입니다.

| 단계  | 의미        | 하는 일                                    |
| ----- | ----------- | ------------------------------------------ |
| **P** | Plan        | 목표, 범위, 요구사항, 리스크를 문서로 정리 |
| **E** | Engineering | 아키텍처, API 설계, 데이터 모델을 명세     |
| **D** | Do          | Engineering 문서를 따라 구현               |
| **A** | Analyze     | 설계 vs 구현을 비교하여 갭 분석            |
| **L** | Learn       | Wiki로 지식 축적, 완료 보고서 작성         |

각 단계마다 **크로스 리뷰**가 끼어들고, Analyze에서 품질 기준을 충족하지 못하면 **자동으로 Iterate**합니다. 여기에 **Archive**(산출물 보관)가 더해져, Agent의 "한 방" 성능에 의존하지 않고도 일관된 품질을 보장합니다.

```
[Plan] → [Review] → [Engineering] → [Review] → [Do] → [Analyze] → [Review] → [Learn] → [Review] → [Archive]
                                                           │    ↑
                                                           ↓    │
                                                        [Iterate]
```

---

## 핵심 1: 크로스 리뷰 — 에코 챔버를 깨는 장치

GPT에게 코드를 작성하게 하고, GPT에게 리뷰를 시키면? 높은 확률로 "잘 작성되었습니다"가 돌아옵니다. 같은 모델은 같은 학습 데이터와 추론 패턴을 공유하기 때문에, 한쪽이 간과한 부분을 다른 쪽도 간과합니다.

PEDAL의 크로스 리뷰는 **반드시 다른 회사의 AI 모델**이 수행합니다.

| 작성 Agent      | 리뷰 Agent      |
| --------------- | --------------- |
| Cursor (Claude) | Gemini CLI      |
| Gemini CLI      | Cursor (Claude) |

서로 다른 모델은 학습 데이터도, 정렬(alignment) 방식도, 강점과 약점도 다릅니다. Claude가 놓치는 보안 이슈를 Gemini가 잡아내고, Gemini가 과도하게 복잡하게 설계한 부분을 Claude가 단순화 제안을 합니다.

### 맹목적 수용 금지

리뷰 Agent도 틀릴 수 있습니다. 작성 Agent는 리뷰의 각 항목을 비판적으로 평가하여, **유효한 지적은 수용**하고 **부정확한 지적은 근거를 들어 거절**합니다.

```
├── Critical: 하드코딩된 시크릿 발견
│   └── ✅ 수용 → env 변수로 이동
│
├── Warning: Redis 대신 Memcached 권장
│   └── ❌ 거절 → 이미 Redis 인프라 존재, 전환 비용 대비 이점 없음
│
└── Info: 함수명 변경 제안
    └── ✅ 수용 → 리네이밍 적용
```

이 메커니즘은 크로스 리뷰의 이점을 살리면서도, 맥락을 가장 잘 아는 작성 Agent가 최종 결정권을 갖도록 합니다.

---

## 핵심 2: Learn — Agent의 장기 기억

AI Agent의 가장 큰 한계는 **세션 간 기억이 없다**는 것입니다. 오늘 로그인 기능을 구현하며 프로젝트 구조를 완벽히 파악했더라도, 내일 결제 기능을 시작하면 처음부터 다시 탐색해야 합니다.

PEDAL의 Learn 단계에서는 **Wiki 문서**를 생성합니다. 이 Wiki는 단순한 개발자용 문서가 아니라, **Agent가 다음 작업에서 참조할 수 있는 구조화된 지식**입니다.

```
docs/wiki/user-auth.wiki.md
━━━━━━━━━━━━━━━━━━━━━━━━━━
# user-auth

## 아키텍처
- JWT 기반 인증, Refresh Token은 HttpOnly Cookie
- 미들웨어: src/middleware/auth.ts

## 파일 구조
src/features/user-auth/
├── components/LoginForm.tsx
├── api/auth.ts
├── hooks/useAuth.ts
└── types/auth.types.ts

## API
POST /api/auth/login   → { token, refreshToken }
POST /api/auth/refresh → { token }
DELETE /api/auth/logout → 204
```

다음 사이클에서 결제 기능을 개발할 때, 이 Wiki를 참조하면 인증 미들웨어의 위치, API 명세, 토큰 전략을 즉시 파악할 수 있습니다. 사이클을 반복할수록 Wiki가 풍부해지고, Agent가 활용할 수 있는 컨텍스트가 넓어집니다. PEDAL의 Wiki는 **Agent를 위한 온보딩 문서**입니다.

---

## 핵심 3: 체급이 낮은 Agent로도 충분하다

AI 개발에서 가장 흔한 함정은 **"결과가 안 좋으면 더 비싼 모델을 써야지"** 라는 사고입니다. 하지만 프로세스 없이 최상위 모델을 쓰는 것보다, 구조화된 프로세스 위에 중급 모델을 올리는 것이 더 나은 결과를 내는 경우가 많습니다.

**Plan + Engineering**이 명확한 가이드라인을 제공하면, 중급 모델도 "무엇을 만들어야 하는지"에 집중할 수 있습니다. **크로스 리뷰**가 실수를 잡아내는 안전망이 되고 — 이때 리뷰 Agent도 비싼 모델일 필요가 없습니다. 핵심은 "다른 관점"이지 "더 뛰어난 관점"이 아닙니다. **Iterate**는 한 번에 완벽할 것을 요구하지 않고, 기준을 충족할 때까지 자동으로 반복합니다. **Wiki**가 프로젝트 지식을 구조화해두면, 모델이 스스로 추론해야 할 부분이 줄어듭니다.

```
Iteration 1: match rate 72% → 3개 이슈 수정
Iteration 2: match rate 85% → 2개 이슈 수정
Iteration 3: match rate 93% → 기준 충족, 완료
```

**결론**: 모델을 업그레이드하기 전에, 프로세스를 업그레이드하세요.

---

## Severity-Weighted Scoring: 정량적 품질 게이트

PEDAL의 Analyze 단계는 감이 아닌 숫자로 판단합니다.

| 심각도   | 가중치 | 조건                                 |
| -------- | :----: | ------------------------------------ |
| Critical |   x3   | **무조건 Iterate** (match rate 무관) |
| Warning  |   x2   | match rate < 90%일 때                |
| Info     |   x1   | match rate < 90%일 때                |

```
weightedScore      = Σ(심각도 가중치 × 이슈 수)
maxPossibleScore   = 전체 점검 항목 × 3
weightedMatchRate  = (1 - weightedScore / maxPossibleScore) × 100%
```

Critical 이슈가 하나라도 남아 있으면, 전체 match rate가 95%여도 Iterate가 강제됩니다. 보안 취약점이나 핵심 요구사항 누락이 수치에 묻히지 않도록 하는 장치입니다.

---

## 사람의 개입 지점: Human Gate

PEDAL은 두 곳에 명시적 승인 게이트를 둡니다.

```
Plan → Engineering → ⛔ GATE 1 → Do → Analyze → ⛔ GATE 2 → Learn
```

- **Gate 1 (Engineering 후)**: 구현 전에 사람이 설계를 검토합니다. 잘못된 설계 위에 쌓인 구현은 되돌리기 어렵기 때문입니다.
- **Gate 2 (Analyze 후)**: 분석 결과를 확인하고, 범위 재조정이 필요한지 판단합니다.

Agent에게 자율성을 주되, 핵심 의사결정은 사람이 합니다.

---

## 마무리

PEDAL은 세 가지 관찰에서 시작했습니다:

1. **같은 AI끼리는 같은 실수를 반복한다** → 크로스 리뷰
2. **Agent는 세션이 끝나면 모든 것을 잊는다** → Learn 단계의 Wiki 지식화
3. **비싼 모델이 항상 답은 아니다** → 구조와 반복이 모델의 체급을 보상

자전거의 페달처럼, 한 바퀴 한 바퀴 돌릴 때마다 앞으로 나아갑니다. 중요한 것은 페달을 밟는 힘(모델의 성능)이 아니라, **기어와 체인(프로세스)이 제대로 연결되어 있는지**입니다.

PEDAL을 프로젝트에 도입하면, AI Agent가 "가끔 잘 되는 도구"에서 "반복 가능한 개발 파트너"로 바뀝니다.

---

> **PEDAL**은 오픈소스입니다. [GitHub 저장소](https://github.com/krgoodnews/PEDAL)에서 `.pedal/` 디렉토리를 복사하여 바로 시작할 수 있습니다.
