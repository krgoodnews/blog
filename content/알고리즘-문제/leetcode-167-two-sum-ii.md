---
title: "LeetCode 167: Two Sum II - Input Array Is Sorted"
date: 2026-01-30
tags: [Algorithm, Python, LeetCode, Two Pointer, Array]
---

> [!note]
> [[two-pointer-sorted-array|정렬된 배열에서 두 수의 합 - 투포인터]]를 사용해, **상수 공간**으로 두 인덱스를 찾는 코드 구조를 설명합니다.

---

## 문제 링크

- [LeetCode 167: Two Sum II - Input Array Is Sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)

---

## 문제 요약

- **입력**: 비감소 정렬된 `numbers`, `target`
- **출력**: `numbers[i] + numbers[j] = target` 인 **1-indexed** `[index1, index2]` (index1 < index2)
- **조건**: 정답은 유일, 같은 원소 두 번 사용 불가, **O(1) 추가 공간**

---

## 전체 코드

```python
class Solution:
    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        left = 0
        right = len(numbers) - 1

        while left < right:
            two_sum = numbers[left] + numbers[right]
            if two_sum == target:
                return [left + 1, right + 1]
            elif two_sum < target:
                left += 1
            elif two_sum > target:
                right -= 1
```

---

## 코드 구조 설명

### 1. 포인터 초기화

```python
left = 0
right = len(numbers) - 1
```

- **left**: 가장 작은 값(맨 왼쪽)부터 시도
- **right**: 가장 큰 값(맨 오른쪽)부터 시도
- `left < right` 로 같은 인덱스를 두 번 쓰지 않음

---

### 2. 반복 조건

```python
while left < right:
```

- `left`와 `right`가 같아지면 두 개의 서로 다른 원소를 고를 수 없으므로 루프 종료
- 정답이 반드시 있다고 보장되므로, 그 전에 `return`으로 종료됨

---

### 3. 합 계산 및 분기

```python
two_sum = numbers[left] + numbers[right]
if two_sum == target:
    return [left + 1, right + 1]
elif two_sum < target:
    left += 1
elif two_sum > target:
    right -= 1
```

| 조건 | 의미 | 동작 |
|------|------|------|
| `two_sum == target` | 정답 | 1-indexed로 `[left+1, right+1]` 반환 |
| `two_sum < target` | 합이 작음 | `left`를 키워 더 큰 수 사용 |
| `two_sum > target` | 합이 큼 | `right`를 줄여 더 작은 수 사용 |

정렬 덕분에 한 방향으로만 포인터를 옮겨도 정답을 놓치지 않습니다.

---

## 데이터 흐름 요약

| 단계 | 역할 |
|------|------|
| `left`, `right` 설정 | 탐색 구간의 양 끝 |
| `two_sum` 계산 | 현재 두 수의 합 |
| `target`과 비교 | 포인터 이동 방향 결정 |
| `left+1`, `right+1` 반환 | 1-indexed 인덱스로 반환 |

---

## 시간·공간 복잡도

- **시간**: O(n) — 각 포인터가 최대 O(n)번만 이동
- **공간**: O(1) — 변수 `left`, `right`, `two_sum` 등 상수 개

---

## 관련 문서

- [[two-pointer-sorted-array|투포인터 - 정렬된 배열에서 두 수의 합]] - 원리와 포인터 이동 이유
