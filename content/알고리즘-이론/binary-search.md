---
title: "이분 탐색 (Binary Search)"
date: 2026-01-17
tags: [Algorithm, Python, Binary Search]
---

> [!note]
> **이분 탐색(Binary Search)**은 정렬된 배열에서 특정 값을 효율적으로 찾는 알고리즘입니다. 또한 매개 변수 탐색(Parametric Search)에도 활용됩니다.

---

## 이분 탐색이란?

**이분 탐색(Binary Search)**은 정렬된 배열에서 특정 값을 찾기 위해 배열을 반으로 나누어 탐색 범위를 좁혀가는 알고리즘입니다.

### 핵심 아이디어

1. **정렬된 배열**: 배열이 정렬되어 있어야 함
2. **중간값 비교**: 중간값과 목표값을 비교
3. **범위 축소**: 비교 결과에 따라 탐색 범위를 절반으로 줄임
4. **반복**: 목표값을 찾거나 범위가 없어질 때까지 반복

---

## 기본 이분 탐색

### 값 찾기

정렬된 배열에서 특정 값을 찾는 문제입니다.

```python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1  # 찾지 못함
```

**시간 복잡도**: O(log n)

---

## 매개 변수 탐색 (Parametric Search)

이분 탐색의 변형으로, **조건을 만족하는 최댓값 또는 최솟값**을 찾는 문제에 사용됩니다.

### 핵심 아이디어

1. **조건 함수**: 주어진 값이 조건을 만족하는지 확인하는 함수
2. **이분 탐색**: 조건을 만족하는 경계값을 찾음
3. **최댓값/최솟값**: 조건을 만족하는 값 중 최댓값 또는 최솟값

### 기본 패턴

```python
def parametric_search():
    left, right = 최소값, 최대값
    result = 0
    
    while left <= right:
        mid = (left + right) // 2
        
        if 조건을_만족하는가(mid):
            result = mid
            left = mid + 1  # 더 큰 값 탐색 (최댓값 찾기)
        else:
            right = mid - 1  # 더 작은 값 탐색
    
    return result
```

---

## 매개 변수 탐색의 종류

### 1. 최댓값 찾기

조건을 만족하는 값 중 최댓값을 찾습니다.

```python
def find_maximum():
    left, right = 0, max_value
    result = 0
    
    while left <= right:
        mid = (left + right) // 2
        
        if is_valid(mid):
            result = mid
            left = mid + 1  # 더 큰 값 시도
        else:
            right = mid - 1  # 더 작은 값 시도
    
    return result
```

### 2. 최솟값 찾기

조건을 만족하는 값 중 최솟값을 찾습니다.

```python
def find_minimum():
    left, right = 0, max_value
    result = max_value
    
    while left <= right:
        mid = (left + right) // 2
        
        if is_valid(mid):
            result = mid
            right = mid - 1  # 더 작은 값 시도
        else:
            left = mid + 1  # 더 큰 값 시도
    
    return result
```

---

## 실제 예시

### 예시: 나무 자르기

절단 높이를 조절하여 필요한 나무의 양을 얻는 문제입니다.

```python
def cut_trees(woods, required):
    left, right = 0, max(woods)
    result = 0
    
    while left <= right:
        height = (left + right) // 2
        total = sum(max(wood - height, 0) for wood in woods)
        
        if total >= required:
            result = height
            left = height + 1  # 더 높은 절단 높이 시도
        else:
            right = height - 1  # 더 낮은 절단 높이 시도
    
    return result
```

**조건 함수**: `total >= required` (필요한 양 이상을 얻을 수 있는가?)

---

## 이분 탐색의 시간 복잡도

### 기본 이분 탐색

- **시간 복잡도**: O(log n)
- **공간 복잡도**: O(1)

### 매개 변수 탐색

- **시간 복잡도**: O(log(max_value) × 조건_함수_시간)
- **공간 복잡도**: O(1)

---

## 이분 탐색 vs 선형 탐색

| 특징 | 이분 탐색 | 선형 탐색 |
|------|----------|----------|
| **전제 조건** | 정렬된 배열 | 정렬 불필요 |
| **시간 복잡도** | O(log n) | O(n) |
| **공간 복잡도** | O(1) | O(1) |
| **적용 범위** | 정렬된 배열 | 모든 배열 |

---

## 주의사항

### 1. 오버플로우 방지

큰 값에서 `(left + right) // 2`를 계산할 때 오버플로우가 발생할 수 있습니다:

```python
# 안전한 방법
mid = left + (right - left) // 2
```

### 2. 경계 조건

`left <= right` vs `left < right`:
- `left <= right`: 범위가 유효할 때까지 반복
- `left < right`: 마지막 하나 남을 때까지 반복

### 3. 결과 처리

매개 변수 탐색에서 결과를 올바르게 처리해야 합니다:
- 최댓값 찾기: `result`를 업데이트
- 최솟값 찾기: `result`를 업데이트

---

## 관련 알고리즘

- 정렬 (Sorting)
- [[divide-and-conquer|분할 정복 (Divide and Conquer)]]
- [[boj-2805|BOJ 2805: 나무 자르기]] - 이분 탐색을 활용하는 대표적인 문제
