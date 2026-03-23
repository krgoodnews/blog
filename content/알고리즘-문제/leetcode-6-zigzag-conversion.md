---
title: "LeetCode 6: Zigzag Conversion"
date: 2026-01-30
tags: [Algorithm, Python, LeetCode, String, Simulation]
---

> [!note]
> **행 인덱스 + 방향(offset)** 으로 지그재그를 시뮬레이션하는 방법을 설명합니다.

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

## 심화 이론

> [!note]
> **문자열**을 **numRows개의 행**에 지그재그로 쓴 뒤, **행 순서대로** 이어 붙이는 변환의 원리입니다. 행 인덱스를 **위→아래→위**로 바꿔 가며 문자를 배치하면 됩니다.

---

### 문제 상황

문자열 `s`를 **지그재그**로 씁니다.

- **numRows**개의 행이 있음 (0번 ~ numRows-1번)
- 문자는 **0행 → 1행 → … → (numRows-1)행**으로 내려갔다가, 그다음 **(numRows-2)행 → … → 0행**으로 올라갔다가, 다시 내려가는 식으로 반복
- 맨 위·맨 아래에서 방향이 바뀜

그 후 **0행, 1행, …, (numRows-1)행** 순서로 각 행의 문자를 이어 붙인 문자열이 정답입니다.

---

### 지그재그가 의미하는 것

- **아래로**: 행 인덱스가 **+1** (0 → 1 → … → numRows-1)
- **위로**: 행 인덱스가 **-1** (numRows-1 → … → 0)
- **맨 위(0)** 또는 **맨 아래(numRows-1)** 에 도달하면 방향 전환

즉, **현재 행 인덱스**와 **방향(offset: +1 또는 -1)** 만 관리하면 됩니다.

---

### 시뮬레이션 방식

1. **행별로 문자를 모을 공간** 준비 — `arr[row]` = 그 행에 들어갈 문자들의 리스트
2. **idx = 0, offset = +1** 로 시작
3. **s의 각 문자**에 대해:
   - `arr[idx]`에 문자 추가
   - **idx가 numRows-1**이면 방향을 위로 → **offset = -1**
   - **idx가 0**이면 방향을 아래로 → **offset = +1**
   - **idx += offset**
   - idx가 numRows가 되면 1 줄이고, -1이 되면 0으로 보정 (경계 처리)
4. 모든 행의 문자를 **순서대로** 이어 붙여 반환

---

### 예시: s = "PAYPALISHIRING", numRows = 3

| 행 0 | 행 1 | 행 2 |
|------|------|------|
| P    | A    | Y    |
|      | P    |      |
| A    | L    | I    |
|      | S    |      |
| H    | I    | R    |
|      | I    |      |
| N    | G    |      |

행 순서로 읽으면: **"PAHNAPLSIIGYIR"**

---

### 요약

| 항목 | 내용 |
|------|------|
| 지그재그 | 0행 → … → (numRows-1)행 → … → 0행 반복 |
| 방향 전환 | idx가 0이면 +1, numRows-1이면 -1 |
| 행별 저장 | 리스트의 리스트(행별 문자 리스트) |
| 출력 | 0행 + 1행 + … + (numRows-1)행 |
