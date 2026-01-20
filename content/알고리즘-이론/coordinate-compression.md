---
title: "좌표 압축 (Coordinate Compression)"
date: 2026-01-17
tags: [Algorithm, Python, Sorting, Data Structure]
---

> [!note]
> **좌표 압축(Coordinate Compression)**은 큰 범위의 좌표를 작은 범위의 인덱스로 매핑하는 기법입니다.

---

## 좌표 압축이란?

**좌표 압축(Coordinate Compression)**은 값의 크기 순서를 유지하면서 큰 범위의 좌표를 작은 범위의 인덱스(0, 1, 2, ...)로 매핑하는 기법입니다.

### 핵심 아이디어

1. **중복 제거**: 고유한 값들만 추출
2. **정렬**: 값들을 크기 순으로 정렬
3. **인덱스 매핑**: 정렬된 순서대로 0부터 시작하는 인덱스 부여

---

## 좌표 압축의 필요성

### 문제 상황

좌표의 범위가 매우 크지만, 실제로 사용되는 값의 개수는 적을 때:
- 예: 좌표 범위가 -10⁹ ~ 10⁹이지만 실제 값은 1,000,000개만 사용
- 배열 인덱스로 직접 사용하기 어려움
- 메모리 낭비 발생

### 해결 방법

좌표 압축을 사용하면:
- 실제 사용되는 값의 개수만큼만 인덱스 사용
- 메모리 효율적
- 배열 접근이 빠름

---

## 좌표 압축 알고리즘

### 기본 과정

1. **중복 제거 및 정렬**: `sorted(set(arr))`
2. **딕셔너리 생성**: 각 값에 대해 인덱스 매핑
3. **압축 적용**: 원본 배열의 각 값을 인덱스로 변환

### 구현

```python
def coordinate_compression(arr):
    # 1. 중복 제거 및 정렬
    sorted_unique = sorted(set(arr))
    
    # 2. 딕셔너리 생성 (값 -> 인덱스)
    compression_map = {}
    for i, value in enumerate(sorted_unique):
        compression_map[value] = i
    
    # 3. 압축 적용
    compressed = [compression_map[x] for x in arr]
    
    return compressed
```

---

## 좌표 압축의 의미

### 정의

원본 좌표 `Xi`를 압축한 결과 `X'i`는:
- **`Xi > Xj`를 만족하는 서로 다른 좌표 `Xj`의 개수**

즉, `Xi`보다 작은 고유한 값의 개수가 압축된 값입니다.

### 예시

**원본 배열**: `[2, 4, -10, 4, -9]`

1. **중복 제거 및 정렬**: `[-10, -9, 2, 4]`
2. **인덱스 매핑**:
   - `-10` → 0
   - `-9` → 1
   - `2` → 2
   - `4` → 3
3. **압축 결과**: `[2, 3, 0, 3, 1]`

**검증**:
- `2`보다 작은 값: `-10, -9` → 2개 → 인덱스 2 ✓
- `4`보다 작은 값: `-10, -9, 2` → 3개 → 인덱스 3 ✓
- `-10`보다 작은 값: 없음 → 0개 → 인덱스 0 ✓

---

## 시간 및 공간 복잡도

### 시간 복잡도

- **중복 제거 및 정렬**: O(n log n) - n은 원소 개수
- **딕셔너리 생성**: O(k) - k는 고유한 값의 개수
- **압축 적용**: O(n)
- **전체**: O(n log n)

### 공간 복잡도

- **정렬된 배열**: O(k) - k는 고유한 값의 개수
- **딕셔너리**: O(k)
- **전체**: O(k)

---

## 실제 사용 예시

### 예시 1: 기본 사용

```python
arr = [2, 4, -10, 4, -9]

# 중복 제거 및 정렬
sorted_unique = sorted(set(arr))  # [-10, -9, 2, 4]

# 딕셔너리 생성
compression_map = {value: i for i, value in enumerate(sorted_unique)}
# {-10: 0, -9: 1, 2: 2, 4: 3}

# 압축 적용
compressed = [compression_map[x] for x in arr]
# [2, 3, 0, 3, 1]
```

### 예시 2: 효율적인 구현

```python
def compress_coordinates(arr):
    sorted_unique = sorted(set(arr))
    compression_map = {value: i for i, value in enumerate(sorted_unique)}
    return [compression_map[x] for x in arr]
```

---

## 좌표 압축의 활용

### 1. 메모리 최적화

큰 범위의 좌표를 작은 인덱스로 변환하여 메모리 사용량을 줄입니다.

### 2. 배열 인덱스로 사용

압축된 값은 0부터 시작하는 연속된 정수이므로 배열 인덱스로 직접 사용할 수 있습니다.

### 3. 정렬 순서 유지

압축 후에도 원본 값들의 크기 순서가 유지됩니다:
- `a < b`이면 `compressed(a) < compressed(b)`
- `a == b`이면 `compressed(a) == compressed(b)`
- `a > b`이면 `compressed(a) > compressed(b)`

---

## 주의사항

### 1. 중복 처리

`set()`을 사용하여 자동으로 중복을 제거합니다.

### 2. 정렬 순서

정렬 순서가 중요합니다. 오름차순으로 정렬해야 올바른 인덱스가 부여됩니다.

### 3. 딕셔너리 vs 리스트

딕셔너리를 사용하면 O(1) 시간에 압축된 값을 찾을 수 있습니다:
```python
# 딕셔너리 사용 (권장)
compression_map = {value: i for i, value in enumerate(sorted_unique)}
compressed = [compression_map[x] for x in arr]

# 리스트 사용 (비효율적)
compressed = [sorted_unique.index(x) for x in arr]  # O(n²)
```

---

## 관련 알고리즘

- 정렬 (Sorting)
- 딕셔너리/해시맵 (Dictionary/HashMap)
- [[boj-18870|BOJ 18870: 좌표 압축]] - 좌표 압축을 직접 구현하는 문제
