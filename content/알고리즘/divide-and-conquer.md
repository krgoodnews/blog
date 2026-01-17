---
title: "분할 정복 (Divide and Conquer)"
date: 2026-01-17
tags: [Algorithm, Python, Divide and Conquer, Recursion]
---

> [!note]
> **분할 정복(Divide and Conquer)**은 큰 문제를 작은 하위 문제로 나누어 해결하는 알고리즘 설계 기법입니다.

---

## 분할 정복이란?

**분할 정복(Divide and Conquer)**은 문제를 더 작은 하위 문제로 나누어 해결한 후, 그 결과를 결합하여 원래 문제를 해결하는 알고리즘 설계 기법입니다.

### 핵심 아이디어

1. **분할 (Divide)**: 문제를 더 작은 하위 문제로 나눔
2. **정복 (Conquer)**: 하위 문제를 재귀적으로 해결
3. **결합 (Combine)**: 하위 문제의 해를 결합하여 원래 문제의 해를 구함

---

## 분할 정복의 구조

### 기본 템플릿

```python
def divide_and_conquer(problem):
    # 기저 조건: 문제가 충분히 작으면 직접 해결
    if is_base_case(problem):
        return solve_directly(problem)
    
    # 분할: 문제를 작은 하위 문제로 나눔
    subproblems = divide(problem)
    
    # 정복: 하위 문제를 재귀적으로 해결
    subresults = []
    for subproblem in subproblems:
        subresult = divide_and_conquer(subproblem)
        subresults.append(subresult)
    
    # 결합: 하위 문제의 해를 결합
    return combine(subresults)
```

---

## 분할 정복의 특징

### 장점

1. **문제 해결이 쉬워짐**: 복잡한 문제를 작은 문제로 나누어 해결
2. **병렬 처리 가능**: 하위 문제들이 독립적이면 병렬로 처리 가능
3. **효율적인 알고리즘**: 많은 경우 O(n log n) 시간 복잡도 달성

### 단점

1. **재귀 호출 오버헤드**: 함수 호출 비용이 발생
2. **스택 오버플로우 위험**: 깊은 재귀 호출 시 위험
3. **메모리 사용**: 재귀 호출 스택에 메모리 사용

---

## 대표적인 분할 정복 알고리즘

### 1. 병합 정렬 (Merge Sort)

배열을 반으로 나누어 각각 정렬한 후 병합합니다.

```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    # 분할
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    # 결합 (병합)
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    result.extend(left[i:])
    result.extend(right[j:])
    return result
```

**시간 복잡도**: O(n log n)

### 2. 퀵 정렬 (Quick Sort)

피벗을 기준으로 배열을 나누어 정렬합니다.

```python
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    
    # 분할
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    # 정복 및 결합
    return quick_sort(left) + middle + quick_sort(right)
```

**시간 복잡도**: 평균 O(n log n), 최악 O(n²)

### 3. 이진 탐색 (Binary Search)

정렬된 배열에서 특정 값을 찾습니다.

```python
def binary_search(arr, target, left, right):
    if left > right:
        return -1
    
    # 분할
    mid = (left + right) // 2
    
    if arr[mid] == target:
        return mid
    elif arr[mid] > target:
        # 정복 (왼쪽 부분)
        return binary_search(arr, target, left, mid - 1)
    else:
        # 정복 (오른쪽 부분)
        return binary_search(arr, target, mid + 1, right)
```

**시간 복잡도**: O(log n)

---

## 2D 그리드에서의 분할 정복

2차원 그리드를 4등분하여 재귀적으로 처리하는 패턴이 자주 사용됩니다.

### 기본 패턴

```python
def divide_grid(grid, y, x, size):
    # 기저 조건: 모든 셀이 같은 값이면
    if is_uniform(grid, y, x, size):
        return count_value(grid[y][x])
    
    # 분할: 4등분
    half = size // 2
    
    # 정복: 4개의 사분면을 재귀적으로 처리
    q1 = divide_grid(grid, y, x + half, half)  # 우상단
    q2 = divide_grid(grid, y, x, half)         # 좌상단
    q3 = divide_grid(grid, y + half, x, half)  # 좌하단
    q4 = divide_grid(grid, y + half, x + half, half)  # 우하단
    
    # 결합: 결과를 합침
    return q1 + q2 + q3 + q4
```

### 사분면 분할

2D 그리드를 4등분할 때:
- **Q1 (우상단)**: `(y, x + half, half)`
- **Q2 (좌상단)**: `(y, x, half)`
- **Q3 (좌하단)**: `(y + half, x, half)`
- **Q4 (우하단)**: `(y + half, x + half, half)`

---

## 분할 정복의 시간 복잡도

일반적으로 분할 정복 알고리즘의 시간 복잡도는 다음과 같이 계산됩니다:

**T(n) = a × T(n/b) + f(n)**

여기서:
- `a`: 하위 문제의 개수
- `b`: 문제를 나누는 비율
- `f(n)`: 분할과 결합에 걸리는 시간

### 마스터 정리 (Master Theorem)

일부 경우에 대해 시간 복잡도를 빠르게 계산할 수 있습니다.

---

## 분할 정복 vs 동적 프로그래밍

| 특징 | 분할 정복 | 동적 프로그래밍 |
|------|----------|----------------|
| **하위 문제** | 독립적 | 중복됨 |
| **결과 저장** | 필요 없음 | 필요함 |
| **예시** | 병합 정렬, 퀵 정렬 | 피보나치, 배낭 문제 |
| **시간 복잡도** | 보통 O(n log n) | 보통 O(n) 또는 O(n²) |

---

## 실제 예시

### 예시: 색종이 문제

N×N 그리드에서 같은 색으로 칠해진 정사각형의 개수를 세는 문제입니다.

**분할 정복 접근:**
1. 전체 그리드가 같은 색인지 확인
2. 같으면 1장의 색종이
3. 다르면 4등분하여 각각 재귀적으로 처리
4. 결과를 합침

---

## 주의사항

### 1. 기저 조건

기저 조건을 명확히 정의해야 합니다:
- 문제가 충분히 작을 때
- 더 이상 분할할 수 없을 때

### 2. 분할 비율

문제를 나누는 비율이 중요합니다:
- 균등하게 나누는 것이 일반적
- 불균등 분할도 가능 (퀵 정렬)

### 3. 결합 방법

하위 문제의 결과를 어떻게 결합할지 명확히 해야 합니다.

---

## 관련 알고리즘

- 재귀 (Recursion)
- 병합 정렬 (Merge Sort)
- 퀵 정렬 (Quick Sort)
- 이진 탐색 (Binary Search)
- [[boj-2630|BOJ 2630: 색종이 만들기]] - 분할 정복을 활용하는 대표적인 문제
