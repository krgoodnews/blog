---
title: "힙 (Heap) 자료구조"
date: 2026-01-17
tags: [Algorithm, Python, Data Structure, Heap, Priority Queue]
---

> [!note]
> **힙(Heap)**은 완전 이진 트리 기반의 자료구조로, 우선순위 큐를 구현하는 데 사용됩니다. 최소 힙과 최대 힙이 있습니다.

---

## 힙이란?

**힙(Heap)**은 완전 이진 트리(Complete Binary Tree)를 기반으로 한 자료구조로, 부모 노드와 자식 노드 간에 특정한 순서 관계를 유지합니다.

### 힙의 종류

1. **최소 힙 (Min Heap)**: 부모 노드의 값이 자식 노드의 값보다 작거나 같음
2. **최대 힙 (Max Heap)**: 부모 노드의 값이 자식 노드의 값보다 크거나 같음

### 힙의 특징

- **완전 이진 트리**: 마지막 레벨을 제외한 모든 레벨이 완전히 채워져 있고, 마지막 레벨은 왼쪽부터 채워짐
- **힙 속성 (Heap Property)**: 부모와 자식 간의 순서 관계가 항상 유지됨
- **배열로 구현**: 완전 이진 트리이므로 배열로 효율적으로 구현 가능

---

## 힙의 구조

### 배열 표현

완전 이진 트리를 배열로 표현할 때:
- 루트 노드: 인덱스 0 (또는 1)
- 부모 노드의 인덱스: `(i - 1) // 2` (0-based) 또는 `i // 2` (1-based)
- 왼쪽 자식: `2 * i + 1` (0-based) 또는 `2 * i` (1-based)
- 오른쪽 자식: `2 * i + 2` (0-based) 또는 `2 * i + 1` (1-based)

### 예시

최소 힙:
```
        1
       / \
      3   2
     / \ / \
    5  4 6  7
```

배열 표현: `[1, 3, 2, 5, 4, 6, 7]`

---

## 힙의 연산

### 1. 삽입 (Insert / Push)

새 원소를 힙에 추가하는 연산입니다.

**과정:**
1. 힙의 마지막 위치에 원소 추가
2. 부모 노드와 비교하여 힙 속성을 만족할 때까지 위로 올림 (Up-Heap)

**시간 복잡도**: O(log n)

### 2. 삭제 (Delete / Pop)

루트 노드(최소값 또는 최대값)를 제거하는 연산입니다.

**과정:**
1. 루트 노드를 마지막 노드로 교체
2. 마지막 노드 제거
3. 자식 노드와 비교하여 힙 속성을 만족할 때까지 아래로 내림 (Down-Heap)

**시간 복잡도**: O(log n)

### 3. 최소값/최대값 조회

루트 노드의 값을 반환합니다. (제거하지 않음)

**시간 복잡도**: O(1)

---

## Python에서의 힙 사용

Python의 `heapq` 모듈은 최소 힙을 제공합니다.

### 기본 사용법

```python
import heapq

# 빈 힙 생성
heap = []

# 원소 추가 (heappush)
heapq.heappush(heap, 3)
heapq.heappush(heap, 1)
heapq.heappush(heap, 4)
heapq.heappush(heap, 2)

# 힙 상태: [1, 2, 4, 3]

# 최소값 제거 및 반환 (heappop)
min_value = heapq.heappop(heap)  # 1
# 힙 상태: [2, 3, 4]

# 최소값 조회 (제거하지 않음)
min_value = heap[0]  # 2
```

### 최대 힙 구현

Python의 `heapq`는 최소 힙만 제공하므로, 최대 힙을 구현하려면 값에 음수를 적용합니다:

```python
import heapq

# 최대 힙으로 사용
heap = []

# 원소 추가 (음수로 변환)
heapq.heappush(heap, -3)
heapq.heappush(heap, -1)
heapq.heappush(heap, -4)
heapq.heappush(heap, -2)

# 최대값 제거 및 반환 (음수 제거)
max_value = -heapq.heappop(heap)  # 4
```

---

## 힙의 시간 복잡도

| 연산 | 시간 복잡도 | 설명 |
|------|------------|------|
| 삽입 (push) | O(log n) | 힙 속성을 유지하기 위해 최대 log n번 비교 |
| 삭제 (pop) | O(log n) | 힙 속성을 유지하기 위해 최대 log n번 비교 |
| 최소값 조회 | O(1) | 루트 노드만 확인 |
| 힙 생성 | O(n) | n개의 원소로 힙 구성 |

---

## 힙의 활용

### 1. 우선순위 큐 (Priority Queue)

힙은 우선순위 큐를 구현하는 데 사용됩니다:
- 최소 힙: 우선순위가 낮은 값(작은 값)이 먼저 나옴
- 최대 힙: 우선순위가 높은 값(큰 값)이 먼저 나옴

### 2. 정렬 (Heap Sort)

힙을 이용한 정렬 알고리즘:
1. 모든 원소를 힙에 삽입: O(n log n)
2. 힙에서 하나씩 제거: O(n log n)
3. 전체 시간 복잡도: O(n log n)

### 3. 최소값/최대값 관리

동적으로 최소값이나 최대값을 관리해야 할 때 유용합니다.

---

## 힙 vs 다른 자료구조

### 힙 vs 정렬된 리스트

| 특징 | 힙 | 정렬된 리스트 |
|------|-----|--------------|
| 삽입 | O(log n) | O(n) |
| 삭제 | O(log n) | O(n) |
| 최소값 조회 | O(1) | O(1) |
| 정렬 상태 | 부분적 | 완전 |

### 힙 vs 이진 탐색 트리 (BST)

| 특징 | 힙 | BST |
|------|-----|-----|
| 구조 | 완전 이진 트리 | 이진 트리 |
| 최소값 | O(1) | O(log n) |
| 검색 | O(n) | O(log n) |
| 용도 | 우선순위 큐 | 검색, 정렬 |

---

## 실제 사용 예시

### 예시 1: 최소 힙

```python
import heapq

heap = []
heapq.heappush(heap, 5)
heapq.heappush(heap, 2)
heapq.heappush(heap, 8)
heapq.heappush(heap, 1)

# 최소값 제거
min_val = heapq.heappop(heap)  # 1
min_val = heapq.heappop(heap)  # 2
```

### 예시 2: 최대 힙

```python
import heapq

heap = []
heapq.heappush(heap, -5)
heapq.heappush(heap, -2)
heapq.heappush(heap, -8)
heapq.heappush(heap, -1)

# 최대값 제거
max_val = -heapq.heappop(heap)  # 8
max_val = -heapq.heappop(heap)  # 5
```

### 예시 3: 빈 힙 처리

```python
import heapq

heap = []

if heap:
    min_val = heapq.heappop(heap)
else:
    print("힙이 비어있습니다")
```

---

## 주의사항

### 1. heapq는 최소 힙만 제공

Python의 `heapq` 모듈은 최소 힙만 제공하므로, 최대 힙이 필요하면 값에 음수를 적용해야 합니다.

### 2. 리스트를 힙으로 변환

기존 리스트를 힙으로 변환하려면 `heapq.heapify()`를 사용합니다:

```python
import heapq

arr = [3, 1, 4, 1, 5, 9, 2, 6]
heapq.heapify(arr)  # O(n) 시간에 힙으로 변환
```

### 3. 중복 값 처리

힙은 중복 값을 허용합니다. 중복을 제거하려면 Set과 함께 사용하거나, 별도로 처리해야 합니다.

---

## 관련 알고리즘

- 우선순위 큐 (Priority Queue)
- 힙 정렬 (Heap Sort)
- [[boj-1927|BOJ 1927: 최소 힙]] - 최소 힙을 구현하는 문제
