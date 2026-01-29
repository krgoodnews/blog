---
title: "LeetCode 62: Unique Paths"
date: 2025-01-30
tags: [Algorithm, Python, LeetCode, Dynamic Programming, Grid]
---

> [!note]
> [[grid-path-count-dp|그리드 경로 개수 DP]] 원리를 적용해, **2차원 DP 테이블**로 (0,0)에서 (m-1, n-1)까지의 서로 다른 경로 개수를 구하는 코드 구조를 설명합니다.

---

## 문제 링크

- [LeetCode 62: Unique Paths](https://leetcode.com/problems/unique-paths/)

---

## 문제 요약

- **그리드**: m×n
- **시작**: (0, 0), **도착**: (m-1, n-1)
- **이동**: 한 번에 **오른쪽** 또는 **아래**로만 한 칸
- **출력**: 서로 다른 경로의 개수 (답 ≤ 2×10^9)

---

## 전체 코드

```python
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        grid = [[0 for _ in range(n)] for _ in range(m)]

        for y in range(m):
            grid[y][0] = 1

        for x in range(n):
            grid[0][x] = 1

        for y in range(1, m):
            for x in range(1, n):
                grid[y][x] = grid[y - 1][x] + grid[y][x - 1]

        return grid[m - 1][n - 1]
```

---

## 코드 구조 설명

### 1. DP 테이블 생성

```python
grid = [[0 for _ in range(n)] for _ in range(m)]
```

- `grid[y][x]`: **(0, 0)에서 (y, x)까지의 경로 개수**
- 크기: m행 × n열, 초기값 0

---

### 2. 첫 번째 열·첫 번째 행 초기화

```python
for y in range(m):
    grid[y][0] = 1

for x in range(n):
    grid[0][x] = 1
```

- **첫 번째 열** (x=0): 위에서만 올 수 있으므로 경로가 1가지 → `grid[y][0] = 1`
- **첫 번째 행** (y=0): 왼쪽에서만 올 수 있으므로 경로가 1가지 → `grid[0][x] = 1`

---

### 3. 나머지 칸 채우기 (점화식 적용)

```python
for y in range(1, m):
    for x in range(1, n):
        grid[y][x] = grid[y - 1][x] + grid[y][x - 1]
```

- (y, x)로 오는 방법:
  - **(y-1, x)** 에서 아래로 한 칸 → `grid[y - 1][x]`
  - **(y, x-1)** 에서 오른쪽으로 한 칸 → `grid[y][x - 1]`
- 따라서 `grid[y][x] = grid[y - 1][x] + grid[y][x - 1]`
- `y`, `x`를 1부터 순서대로 채우므로, 참조하는 위·왼쪽 칸은 이미 계산된 상태

---

### 4. 정답 반환

```python
return grid[m - 1][n - 1]
```

- 도착 칸 (m-1, n-1)의 값이 전체 경로 개수

---

## 데이터 흐름 요약

| 단계 | 역할 |
|------|------|
| `grid` 생성 | (y, x)까지의 경로 수 저장 |
| 첫 열·첫 행 = 1 | 경계 조건 (한 방향으로만 오는 칸) |
| 이중 루프 | 점화식으로 나머지 칸 채우기 |
| `grid[m-1][n-1]` | 최종 경로 개수 반환 |

---

## 시간·공간 복잡도

- **시간**: O(m × n) — 그리드 한 번 순회
- **공간**: O(m × n) — 2차원 `grid`

---

## 관련 문서

- [[grid-path-count-dp|그리드 경로 개수 세기 (Unique Paths 원리)]] - 점화식과 원리
- [[dynamic-programming|동적 프로그래밍 (Dynamic Programming)]]
