---
title: "LeetCode 62: Unique Paths"
date: 2026-01-30
tags: [Algorithm, Python, LeetCode, Dynamic Programming, Grid, Combinatorics]
---

> [!note]
> **m×n 그리드**에서 왼쪽 위에서 오른쪽 아래로, **오른쪽 또는 아래로만** 이동할 때 가능한 **서로 다른 경로의 개수**를 구하는 문제입니다. 동적 프로그래밍(DP)과 조합론(Combinatorics) 두 가지 방식으로 접근할 수 있습니다.

---

## 문제 링크

- [LeetCode 62: Unique Paths](https://leetcode.com/problems/unique-paths/)

---

## 알고리즘 이론: 그리드 경로 개수 세기

### 1. 동적 프로그래밍 (Dynamic Programming) 방식

어떤 칸 $(y, x)$에 도달하는 경로 수를 구할 때, 이동 규칙(오른쪽 또는 아래)에 따라 $(y, x)$로 오는 방법은 단 두 가지뿐입니다:
- **왼쪽 $(y, x-1)$에서 오른쪽으로 한 칸** 이동
- **위 $(y-1, x)$에서 아래로 한 칸** 이동

#### 점화식
$$dp[y][x] = dp[y-1][x] + dp[y][x-1]$$
- `dp[y][x]`: $(0, 0)$에서 $(y, x)$까지 도달하는 서로 다른 경로의 개수

#### 초기 조건
- **첫 번째 행** $(y=0)$: 왼쪽에서만 올 수 있으므로 모두 1 (`dp[0][x] = 1`)
- **첫 번째 열** $(x=0)$: 위에서만 올 수 있으므로 모두 1 (`dp[y][0] = 1`)

---

### 2. 조합론 (Combinatorics) 방식

로봇이 $(m-1, n-1)$ 칸에 도착하기 위해서는:
- **오른쪽(Right)**으로 총 $n-1$번 이동해야 함
- **아래(Down)**로 총 $m-1$번 이동해야 함

즉, 전체 이동 횟수는 $(n-1) + (m-1) = m+n-2$번이며, 이 중 **아래로 이동할 $m-1$번의 타이밍**을 결정하는 조합의 수와 같습니다.

#### 공식
$$\text{경로 수} = \binom{m+n-2}{m-1} = \frac{(m+n-2)!}{(m-1)!(n-1)!}$$

수학적으로는 이 조합 공식 한 번으로 답을 구할 수 있으며, DP 방식은 각 칸까지의 경로 수를 단계적으로 채워나가는 방식입니다.

---

## 코드 구현 (DP 방식)

### 전체 코드

```python
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        # 1. DP 테이블 생성 (m x n)
        grid = [[0 for _ in range(n)] for _ in range(m)]

        # 2. 첫 번째 열과 행 초기화 (경계 조건)
        for y in range(m):
            grid[y][0] = 1
        for x in range(n):
            grid[0][x] = 1

        # 3. 점화식을 이용해 나머지 칸 채우기
        for y in range(1, m):
            for x in range(1, n):
                grid[y][x] = grid[y - 1][x] + grid[y][x - 1]

        # 4. 도착 지점의 경로 수 반환
        return grid[m - 1][n - 1]
```

---

## 시간 및 공간 복잡도

### DP 방식
- **시간 복잡도**: $O(m \times n)$ — 그리드의 모든 칸을 한 번씩 방문합니다.
- **공간 복잡도**: $O(m \times n)$ — 2차원 DP 테이블을 사용합니다. (현재 행만 유지하는 방식으로 $O(n)$까지 최적화 가능)

### 조합론 방식
- **시간 복잡도**: $O(\min(m, n))$ — 조합 값을 계산하는 데 걸리는 시간입니다.
- **공간 복잡도**: $O(1)$ — 추가적인 공간이 거의 필요하지 않습니다.

---

## 관련 알고리즘

- [[dynamic-programming|동적 프로그래밍 (Dynamic Programming)]]
- 조합론 (Combinatorics)
