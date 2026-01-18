---
title: "그리디 알고리즘 (Greedy Algorithm)"
date: 2026-01-17
tags: [Algorithm, Python, Greedy]
---

> [!note]
> **그리디 알고리즘(Greedy Algorithm)**은 각 단계에서 가장 좋아 보이는 선택을 하는 알고리즘 설계 기법입니다.

---

## 그리디 알고리즘이란?

**그리디 알고리즘(Greedy Algorithm)**은 각 단계에서 **현재 상황에서 가장 좋아 보이는 선택**을 하는 알고리즘입니다. 전체적인 최적해를 보장하지는 않지만, 많은 경우에 효율적으로 최적해를 찾을 수 있습니다.

### 핵심 아이디어

1. **탐욕적 선택**: 각 단계에서 가장 좋아 보이는 선택을 함
2. **부분 최적해**: 각 단계의 선택이 전체 최적해의 일부가 됨
3. **최적 부분 구조**: 문제가 최적 부분 구조를 가져야 함

---

## 그리디 알고리즘의 특징

### 장점

1. **빠른 실행**: 각 단계에서 한 번의 선택만 하므로 빠름
2. **간단한 구현**: 복잡한 알고리즘보다 구현이 간단
3. **효율적**: 많은 경우 O(n log n) 또는 O(n) 시간 복잡도

### 단점

1. **최적해 보장 안 됨**: 항상 최적해를 보장하지는 않음
2. **적용 가능성 제한**: 특정 조건을 만족하는 문제에만 적용 가능

---

## 그리디 알고리즘 적용 조건

그리디 알고리즘을 적용할 수 있는 문제는 다음 조건을 만족해야 합니다:

1. **탐욕 선택 속성 (Greedy Choice Property)**: 각 단계에서의 탐욕적 선택이 최적해에 포함됨
2. **최적 부분 구조 (Optimal Substructure)**: 문제의 최적해가 하위 문제의 최적해로 구성됨

---

## 대표적인 그리디 알고리즘

### 1. 활동 선택 문제 (Activity Selection)

가장 일찍 끝나는 활동을 선택하는 문제입니다.

```python
def activity_selection(activities):
    # 종료 시간 기준으로 정렬
    activities.sort(key=lambda x: x[1])
    
    selected = []
    last_end = 0
    
    for start, end in activities:
        if start >= last_end:
            selected.append((start, end))
            last_end = end
    
    return selected
```

**핵심**: 종료 시간이 가장 빠른 활동을 선택

### 2. 동전 교환 문제 (Coin Change)

가장 큰 동전부터 사용하는 문제입니다.

```python
def coin_change(coins, amount):
    coins.sort(reverse=True)
    count = 0
    
    for coin in coins:
        if amount >= coin:
            count += amount // coin
            amount %= coin
    
    return count if amount == 0 else -1
```

**주의**: 모든 경우에 최적해를 보장하지는 않음 (동전 체계에 따라 다름)

### 3. 최소 신장 트리 (MST)

Kruskal 알고리즘이나 Prim 알고리즘이 그리디 접근을 사용합니다.

---

## 그리디 알고리즘의 일반적인 패턴

### 패턴 1: 정렬 후 선택

```python
# 1. 정렬
items.sort(key=lambda x: (x[1], x[0]))  # 종료 시간, 시작 시간 순

# 2. 순회하며 선택
for item in items:
    if 조건을 만족하면:
        선택
```

### 패턴 2: 우선순위 큐 사용

```python
import heapq

heap = []
for item in items:
    heapq.heappush(heap, (우선순위, item))

while heap:
    priority, item = heapq.heappop(heap)
    # 처리
```

---

## 그리디 vs 동적 프로그래밍

| 특징 | 그리디 | 동적 프로그래밍 |
|------|--------|----------------|
| **선택** | 각 단계에서 한 번의 선택 | 모든 가능한 선택 고려 |
| **최적해 보장** | 항상 보장하지 않음 | 항상 보장 |
| **시간 복잡도** | 보통 O(n log n) | 보통 O(n²) 또는 O(n³) |
| **메모리** | 적음 | 많음 (결과 저장) |

---

## 실제 예시

### 예시: 회의실 배정

여러 회의 중 겹치지 않게 최대한 많은 회의를 선택하는 문제입니다.

**그리디 전략**: 종료 시간이 가장 빠른 회의부터 선택

```python
meetings = [(1, 4), (3, 5), (0, 6), (5, 7)]
meetings.sort(key=lambda x: (x[1], x[0]))  # 종료 시간, 시작 시간 순

selected = []
last_end = 0

for start, end in meetings:
    if start >= last_end:
        selected.append((start, end))
        last_end = end
```

---

## 주의사항

### 1. 정렬 기준

그리디 알고리즘에서 정렬 기준이 매우 중요합니다:
- 종료 시간 기준 정렬
- 시작 시간 기준 정렬
- 비율 기준 정렬 등

### 2. 최적해 보장 확인

그리디 알고리즘은 항상 최적해를 보장하지 않으므로, 문제의 특성을 분석해야 합니다.

### 3. 중복 처리

정렬 시 같은 값이 있을 때의 처리 방법을 고려해야 합니다.

---

## 관련 알고리즘

- 정렬 (Sorting)
- 우선순위 큐 (Priority Queue)
- [[boj-1931|BOJ 1931: 회의실 배정]] - 그리디 알고리즘을 활용하는 대표적인 문제
