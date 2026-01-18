---
title: "2D 그리드에서 연결된 컴포넌트 찾기"
date: 2026-01-17
tags: [Algorithm, Python, Graph, BFS, DFS, Grid]
---

> [!note]
> 2차원 그리드에서 상하좌우로 연결된 셀들을 하나의 컴포넌트로 묶어 찾는 문제는 [[bfs-algorithm|BFS]]나 [[dfs-algorithm|DFS]]를 활용하여 해결할 수 있습니다.

---

## 문제 상황

2차원 그리드에서 특정 값(예: 1)을 가진 셀들이 상하좌우로 연결되어 있을 때, **연결된 컴포넌트의 개수**를 찾아야 하는 경우가 많습니다.

### 예시

```
1 1 0 0 0
0 1 0 0 0
0 0 0 1 0
0 0 0 1 0
0 0 1 1 0
```

이 그리드에는 1을 가진 연결된 컴포넌트가 3개 있습니다:
- 컴포넌트 1: (0,0), (0,1), (1,1)
- 컴포넌트 2: (2,3), (3,3)
- 컴포넌트 3: (4,2), (4,3)

---

## 해결 방법

[[bfs-algorithm|BFS]]나 [[dfs-algorithm|DFS]]를 사용하여 연결된 컴포넌트를 찾을 수 있습니다.

### BFS를 이용한 방법

```python
from collections import deque

def count_components_bfs(grid, n, m):
    visited = [[False] * m for _ in range(n)]
    count = 0
    
    for i in range(n):
        for j in range(m):
            if grid[i][j] == 1 and not visited[i][j]:
                # 새로운 컴포넌트 발견
                count += 1
                
                # BFS로 연결된 모든 셀 탐색
                queue = deque([(i, j)])
                visited[i][j] = True
                
                while queue:
                    y, x = queue.popleft()
                    
                    # 상하좌우 탐색
                    for dy, dx in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                        ny, nx = y + dy, x + dx
                        
                        if 0 <= ny < n and 0 <= nx < m:
                            if grid[ny][nx] == 1 and not visited[ny][nx]:
                                visited[ny][nx] = True
                                queue.append((ny, nx))
    
    return count
```

### DFS를 이용한 방법

```python
def count_components_dfs(grid, n, m):
    visited = [[False] * m for _ in range(n)]
    count = 0
    
    def dfs(y, x):
        visited[y][x] = True
        
        # 상하좌우 탐색
        for dy, dx in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            ny, nx = y + dy, x + dx
            
            if 0 <= ny < n and 0 <= nx < m:
                if grid[ny][nx] == 1 and not visited[ny][nx]:
                    dfs(ny, nx)
    
    for i in range(n):
        for j in range(m):
            if grid[i][j] == 1 and not visited[i][j]:
                count += 1
                dfs(i, j)
    
    return count
```

---

## 상하좌우 탐색 패턴

2D 그리드에서 상하좌우로 이동하는 패턴은 자주 사용됩니다:

```python
# 방향 벡터 정의
directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]  # 상, 하, 좌, 우

# 또는
dy = [-1, 1, 0, 0]
dx = [0, 0, -1, 1]

# 사용 예시
for i in range(4):
    ny = y + dy[i]
    nx = x + dx[i]
    
    if 0 <= ny < n and 0 <= nx < m:
        # 유효한 범위 내
        if grid[ny][nx] == 1 and not visited[ny][nx]:
            # 처리
```

---

## 경계 체크

그리드에서 이동할 때 항상 경계를 체크해야 합니다:

```python
# 올바른 경계 체크
if 0 <= ny < n and 0 <= nx < m:
    # 유효한 범위
```

**주의**: 인덱스가 음수가 되거나 배열 크기를 넘어가면 안 됩니다.

---

## 방문 표시 방법

### 방법 1: 별도의 visited 배열 사용

```python
visited = [[False] * m for _ in range(n)]
```

### 방법 2: 원본 그리드 수정

```python
# 방문한 셀을 0으로 변경
grid[y][x] = 0
```

방법 2는 메모리를 절약할 수 있지만, 원본 데이터가 손실됩니다.

---

## 실제 예시

### 예시: 배추밭 문제

배추가 심어진 위치(1)가 상하좌우로 연결되어 있으면 하나의 그룹으로 간주합니다.

**그리드:**
```
1 1 0 0 0
0 1 0 0 0
0 0 0 1 0
0 0 0 1 0
0 0 1 1 0
```

**BFS 탐색 과정:**
1. (0, 0)에서 시작 → 컴포넌트 1 발견
   - (0,0), (0,1), (1,1) 탐색
2. (2, 3)에서 시작 → 컴포넌트 2 발견
   - (2,3), (3,3) 탐색
3. (4, 2)에서 시작 → 컴포넌트 3 발견
   - (4,2), (4,3) 탐색

**결과**: 3개의 컴포넌트

---

## 시간 및 공간 복잡도

### 시간 복잡도

- **O(N × M)**: 그리드의 모든 셀을 한 번씩 방문
- 각 셀에서 상하좌우 탐색은 상수 시간

### 공간 복잡도

- **방문 배열**: O(N × M)
- **BFS 큐**: O(N × M) - 최악의 경우 (모든 셀이 연결된 경우)
- **DFS 스택**: O(N × M) - 최악의 경우
- **전체**: O(N × M)

---

## BFS vs DFS 선택

2D 그리드에서 연결된 컴포넌트를 찾는 문제에서는 BFS와 DFS 모두 사용할 수 있습니다.

| 특징 | BFS | DFS |
|------|-----|-----|
| **구현** | 큐 사용 | 재귀 또는 스택 |
| **메모리** | 큐에 많은 셀 저장 가능 | 현재 경로만 저장 |
| **스택 오버플로우** | 위험 없음 | 깊은 재귀 시 위험 |
| **권장** | 일반적으로 BFS가 더 안전 | 재귀 구현이 간단 |

---

## 주의사항

### 1. 좌표 순서

그리드 문제에서 좌표가 `(y, x)` 순서로 주어지는 경우가 많습니다:
- 행(y)이 먼저, 열(x)이 나중
- `grid[y][x]` 형태로 접근

### 2. 인덱스 범위

- 0-based 인덱스: `0 <= y < n, 0 <= x < m`
- 1-based 인덱스: `1 <= y <= n, 1 <= x <= m`

### 3. 대각선 포함

상하좌우만이 아니라 대각선도 포함해야 하는 경우:

```python
# 8방향 탐색
directions = [
    (-1, -1), (-1, 0), (-1, 1),
    (0, -1),           (0, 1),
    (1, -1),  (1, 0),  (1, 1)
]
```

---

## 관련 알고리즘

- [[bfs-algorithm|BFS (너비 우선 탐색)]]
- [[dfs-algorithm|DFS (깊이 우선 탐색)]]
- [[connected-components|연결된 컴포넌트 찾기]]
- [[boj-1012|BOJ 1012: 유기농 배추]] - 2D 그리드에서 연결된 컴포넌트를 찾는 대표적인 문제
