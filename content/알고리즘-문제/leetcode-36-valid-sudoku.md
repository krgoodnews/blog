---
title: "LeetCode 36: Valid Sudoku"
date: 2026-01-30
tags: [Algorithm, Python, LeetCode, Hash Set, Grid]
---

> [!note]
> [[sudoku-validation|스도쿠 유효성 검사]] 원리를 적용해, **행·열·3×3 박스**마다 set으로 중복을 검사하는 코드 구조를 설명합니다.

---

## 문제 링크

- [LeetCode 36: Valid Sudoku](https://leetcode.com/problems/valid-sudoku/)

---

## 문제 요약

- **입력**: 9×9 스도쿠 보드 (`board[i][j]`는 `'1'`~`'9'` 또는 `'.'`)
- **출력**: 채워진 칸만 봤을 때 유효하면 `true`, 아니면 `false`
- **유효 조건**: 각 행, 각 열, 각 3×3 서브박스에 1~9가 중복 없이 등장

---

## 전체 코드

```python
class Solution:
    def isValidSudoku(self, board: List[List[str]]) -> bool:
        cols = [set() for _ in range(9)]
        rows = [set() for _ in range(9)]
        boxes = [[set() for _ in range(3)] for _ in range(3)]
        for i in range(9):
            for j in range(9):
                n = board[i][j]
                if n.isnumeric():
                    if n in rows[i] or n in cols[j] or n in boxes[i // 3][j // 3]:
                        return False
                    rows[i].add(n)
                    cols[j].add(n)
                    boxes[i // 3][j // 3].add(n)
        return True
```

---

## 코드 구조 설명

### 1. 행·열·박스 set 초기화

```python
cols = [set() for _ in range(9)]
rows = [set() for _ in range(9)]
boxes = [[set() for _ in range(3)] for _ in range(3)]
```

- **rows[i]**: i번째 **행**에서 이미 등장한 숫자
- **cols[j]**: j번째 **열**에서 이미 등장한 숫자
- **boxes[r][c]**: 박스 **(r, c)** 에서 이미 등장한 숫자 (r, c = 0~2)

---

### 2. 보드 한 번 순회

```python
for i in range(9):
    for j in range(9):
        n = board[i][j]
```

- 모든 칸 (i, j)를 한 번씩만 방문합니다.

---

### 3. 숫자 칸만 검사

```python
if n.isnumeric():
```

- `'.'`는 건너뛰고, `'1'`~`'9'`인 칸만 검사합니다.

---

### 4. 중복 여부 확인

```python
if n in rows[i] or n in cols[j] or n in boxes[i // 3][j // 3]:
    return False
```

- **같은 행**에 이미 n이 있으면 → `rows[i]`
- **같은 열**에 이미 n이 있으면 → `cols[j]`
- **같은 3×3 박스**에 이미 n이 있으면 → `boxes[i // 3][j // 3]`

하나라도 참이면 유효하지 않으므로 즉시 **False** 반환합니다.

---

### 5. set에 추가

```python
rows[i].add(n)
cols[j].add(n)
boxes[i // 3][j // 3].add(n)
```

- 중복이 없으면, 해당 행·열·박스 set에 n을 넣어 “이미 봤다”고 표시합니다.

---

### 6. 정상 종료

```python
return True
```

- 모든 칸을 검사했는데 한 번도 False를 반환하지 않았다면 유효한 보드이므로 **True** 반환합니다.

---

## 3×3 박스 인덱스

| (i, j) 범위 | i // 3 | j // 3 |
|-------------|--------|--------|
| (0~2, 0~2) | 0 | 0 |
| (0~2, 3~5) | 0 | 1 |
| (0~2, 6~8) | 0 | 2 |
| (3~5, 0~2) | 1 | 0 |
| ... | ... | ... |

`boxes[i // 3][j // 3]` 하나로 (i, j)가 속한 3×3 박스를 지정할 수 있습니다.

---

## 데이터 흐름 요약

| 단계 | 역할 |
|------|------|
| rows, cols, boxes | 구역별 “이미 본 숫자” set |
| (i, j) 순회 | 각 칸을 한 번씩 검사 |
| n.isnumeric() | 빈 칸 제외, 숫자만 검사 |
| n in rows/cols/boxes | 같은 구역에서 중복이면 False |
| add(n) | 중복 없으면 세 set에 등록 |

---

## 시간·공간 복잡도

- **시간**: O(9²) = O(1) — 81칸, 칸마다 set 조회·추가 O(1)
- **공간**: O(1) — 행 9개, 열 9개, 박스 9개 set (고정 크기)

---

## 관련 문서

- [[sudoku-validation|스도쿠 유효성 검사 (Valid Sudoku 원리)]] - 규칙과 박스 인덱스
