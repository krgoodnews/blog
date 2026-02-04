---
title: "LeetCode 6: Zigzag Conversion"
date: 2026-01-30
tags: [Algorithm, Python, LeetCode, String, Simulation]
---

> [!note]
> [[zigzag-conversion|지그재그 변환]] 원리를 적용해, **행 인덱스 + 방향(offset)** 으로 지그재그를 시뮬레이션하는 방법을 설명합니다.

---

## 문제 링크

- [LeetCode 6: Zigzag Conversion](https://leetcode.com/problems/zigzag-conversion/)

---

## 문제 요약

- **입력**: 문자열 `s`, 행 개수 `numRows`
- **출력**: s를 numRows개 행에 지그재그로 쓴 뒤, **행 순서대로** 이어 붙인 문자열
- **지그재그**: 0행 → 1행 → … → (numRows-1)행 → (numRows-2)행 → … → 0행 반복

---

## 2차원 배열 (리스트의 리스트)

각 행을 **리스트**로 두고, 문자를 하나씩 넣은 뒤 마지막에 각 행을 `''.join`으로 이어 붙입니다.

### 전체 코드

```python
class Solution:
    def convert(self, s: str, numRows: int) -> str:
        arr = []
        for _ in range(numRows):
            arr.append([])

        idx = 0
        offset = +1

        for c in list(s):
            arr[idx].append(c)

            if idx == numRows - 1:
                offset = -1
            elif idx == 0:
                offset = 1

            idx += offset

            if idx == numRows:
                idx -= 1
            elif idx == -1:
                idx = 0

        result = ""
        for chars in arr:
            result = result + ''.join(chars)
        return result
```

### 구조 설명

- **arr**: `arr[row]` = 그 행에 들어갈 문자들의 리스트 (이차원 배열처럼 사용)
- **idx**: 현재 문자를 넣을 행 번호 (0 ~ numRows-1)
- **offset**: 다음에 이동할 방향 (+1 아래, -1 위)
- **규칙**:
  - `idx == numRows - 1` → 다음은 위로 → `offset = -1`
  - `idx == 0` → 다음은 아래로 → `offset = 1`
  - `idx += offset` 후 `idx`가 numRows면 1 줄이고, -1이면 0으로 보정
- **결과**: 각 `arr[row]`를 `''.join(chars)`로 문자열로 만든 뒤 순서대로 이어 붙임

---


## 인덱스·경계 처리 정리

- **아래로**: `idx == numRows - 1`일 때 다음에 `offset = -1`로 바꿈.
- **위로**: `idx == 0`일 때 다음에 `offset = 1`로 바꿈.
- `idx += offset` 후:
  - `idx == numRows` → 한 칸 넘어갔으므로 `idx -= 1`
  - `idx == -1` → 한 칸 넘어갔으므로 `idx = 0`

---

## 예시: s = "PAYPALISHIRING", numRows = 3

- `arr[0]=['P','A','H','N'], arr[1]=['A','P','L','S','I','I','G'], arr[2]=['Y','I','R']`  
  → `"PAHNAPLSIIGYIR"`

---

## 시간·공간 복잡도

- **시간**: O(n) — 문자마다 한 번씩 해당 행에 추가
- **공간**: O(n) — 행별로 문자 저장

---

## 관련 문서

- [[zigzag-conversion|지그재그 변환 (Zigzag Conversion 원리)]]
