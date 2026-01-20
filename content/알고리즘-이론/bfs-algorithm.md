---
title: "BFS (너비 우선 탐색)"
date: 2026-01-17
tags: [Algorithm, Python, Graph, BFS]
---

> [!note]
> **BFS(Breadth-First Search, 너비 우선 탐색)**는 그래프를 탐색하는 기본 알고리즘 중 하나로, 같은 레벨의 정점들을 먼저 탐색한 후 다음 레벨로 이동하는 방식입니다.

---

## BFS란?

BFS는 그래프의 모든 정점을 탐색하는 알고리즘으로, **같은 거리(레벨)의 정점들을 먼저 탐색**한 후, 다음 레벨로 이동하는 방식입니다.

### 핵심 아이디어

1. **시작 정점을 큐에 넣고** 방문 표시
2. **큐에서 정점을 꺼내** 방문 처리
3. **현재 정점과 연결된 정점들** 중에서
   - 아직 방문하지 않은 정점을 **큐에 추가**
   - 방문 표시 (큐에 넣을 때 표시)
4. 큐가 빌 때까지 반복

---

## BFS의 특징

### 자료구조

- **큐(Queue)** 구조를 사용
- FIFO (First In First Out) 원칙
- Python에서는 `collections.deque`를 사용

### 탐색 방식

- **너비 우선**: 같은 거리의 정점들을 먼저 탐색
- **레벨별 탐색**: 시작 정점으로부터 거리가 1인 정점들, 2인 정점들 순서로 탐색

### 최단 경로

- **가중치가 없는 그래프**에서 시작 정점으로부터의 최단 경로를 찾을 수 있음
- 각 정점은 시작 정점으로부터의 최단 거리로 방문됨

---

## BFS 구현

### 기본 구현

```python
from collections import deque

def bfs(graph, start, visited):
    queue = deque([start])
    visited[start] = True
    
    # 큐가 빌 때까지 반복
    while queue:
        v = queue.popleft()
        print(v, end=' ')
        
        for neighbor in graph[v]:
            if not visited[neighbor]:
                visited[neighbor] = True
                queue.append(neighbor)
```

**동작 과정:**
1. 시작 정점을 큐에 넣고 방문 표시
2. 큐가 빌 때까지 반복:
   - 큐에서 정점을 꺼내 출력
   - 그 정점과 연결된 정점들 중 방문하지 않은 것들을 큐에 추가하고 방문 표시

### 거리 정보를 포함한 구현

최단 거리를 구하는 경우:

```python
from collections import deque

def bfs_with_distance(graph, start, visited):
    queue = deque([(start, 0)])  # (정점, 거리)
    visited[start] = True
    distances = {}
    
    while queue:
        v, dist = queue.popleft()
        distances[v] = dist
        
        for neighbor in graph[v]:
            if not visited[neighbor]:
                visited[neighbor] = True
                queue.append((neighbor, dist + 1))
    
    return distances
```

---

## BFS 탐색 예시

### 예시 그래프

```
    1
   /|\
  2 3 4
  |   |
  5   6
```

인접 리스트 표현:
```
1: [2, 3, 4]
2: [1, 5]
3: [1]
4: [1, 6]
5: [2]
6: [4]
```

### BFS 탐색 순서 (시작: 1)

```
레벨 0: 1
레벨 1: 2, 3, 4
레벨 2: 5, 6
```

**단계별 과정:**
1. 큐: [1], 1 방문
2. 큐에서 1 제거, 1과 연결된 [2, 3, 4]를 큐에 추가
3. 큐: [2, 3, 4], 2 방문
4. 큐에서 2 제거, 2와 연결된 [5]를 큐에 추가
5. 큐: [3, 4, 5], 3 방문
6. 큐에서 3 제거
7. 큐: [4, 5], 4 방문
8. 큐에서 4 제거, 4와 연결된 [6]을 큐에 추가
9. 큐: [5, 6], 5 방문
10. 큐에서 5 제거
11. 큐: [6], 6 방문
12. 큐에서 6 제거
13. 큐가 비어있음 → 종료
14. 결과: `1 2 3 4 5 6`

---

## BFS의 시간 및 공간 복잡도

### 시간 복잡도

- **O(V + E)**: 모든 정점(V)과 간선(E)을 한 번씩 방문
- 각 정점은 한 번만 큐에 들어가고, 각 간선은 두 번 확인됨 (양방향 그래프의 경우)

### 공간 복잡도

- **방문 배열**: O(V)
- **큐**: O(V) - 최악의 경우 (완전 그래프에서 시작 정점과 연결된 모든 정점이 큐에 들어감)
- **전체**: O(V)

---

## BFS의 활용

### 1. 최단 경로 찾기 (가중치 없는 그래프)

가중치가 없는 그래프에서 시작 정점으로부터의 최단 경로를 찾을 수 있습니다.

```python
from collections import deque

def shortest_path(graph, start, end, visited):
    queue = deque([(start, [start])])  # (정점, 경로)
    visited[start] = True
    
    while queue:
        v, path = queue.popleft()
        
        if v == end:
            return path
        
        for neighbor in graph[v]:
            if not visited[neighbor]:
                visited[neighbor] = True
                queue.append((neighbor, path + [neighbor]))
    
    return None  # 경로가 없음
```

### 2. 레벨별 탐색

각 레벨(거리)별로 정점들을 처리할 수 있습니다.

```python
from collections import deque

def bfs_by_level(graph, start, visited):
    queue = deque([start])
    visited[start] = True
    level = 0
    
    while queue:
        level_size = len(queue)
        print(f"Level {level}:", end=' ')
        
        for _ in range(level_size):
            v = queue.popleft()
            print(v, end=' ')
            
            for neighbor in graph[v]:
                if not visited[neighbor]:
                    visited[neighbor] = True
                    queue.append(neighbor)
        
        print()
        level += 1
```

### 3. 최소 비용 문제

가중치가 1인 그래프에서 최소 비용을 구할 수 있습니다.

### 4. 미로 찾기

2D 그리드에서 최단 경로를 찾는 문제에 활용됩니다.

### 5. 다중 시작점 BFS

여러 개의 시작점에서 동시에 BFS를 시작할 수 있습니다. 모든 시작점을 큐에 먼저 넣고 시작하면 됩니다.

```python
from collections import deque

def multi_start_bfs(grid, starts):
    queue = deque([])
    
    # 모든 시작점을 큐에 추가
    for start in starts:
        queue.append(start)
        grid[start[0]][start[1]] = 1  # 시작점 표시
    
    offset = [(-1, 0), (1, 0), (0, -1), (0, 1)]
    
    while queue:
        y, x = queue.popleft()
        value = grid[y][x]
        
        for dy, dx in offset:
            ny = y + dy
            nx = x + dx
            
            if 0 <= ny < n and 0 <= nx < m:
                if grid[ny][nx] == 0:  # 아직 방문하지 않은 곳
                    grid[ny][nx] = value + 1
                    queue.append((ny, nx))
```

**활용 예시:**
- 토마토 문제: 여러 개의 익은 토마토에서 동시에 퍼져나가는 경우
- 최단 거리: 여러 목표 지점 중 가장 가까운 곳 찾기

### 6. 2D 그리드 BFS

2차원 그리드에서 BFS를 사용할 때는 상하좌우(또는 8방향) 이동을 고려합니다.

```python
from collections import deque

def bfs_2d_grid(grid, start_y, start_x, n, m):
    queue = deque([(start_y, start_x)])
    visited = [[False] * m for _ in range(n)]
    visited[start_y][start_x] = True
    
    # 상하좌우 방향
    offset = [(-1, 0), (1, 0), (0, -1), (0, 1)]
    
    while queue:
        y, x = queue.popleft()
        
        for dy, dx in offset:
            ny = y + dy
            nx = x + dx
            
            # 범위 체크
            if 0 <= ny < n and 0 <= nx < m:
                # 방문 가능한 곳이고 아직 방문하지 않았으면
                if grid[ny][nx] == 1 and not visited[ny][nx]:
                    visited[ny][nx] = True
                    grid[ny][nx] = grid[y][x] + 1  # 거리 저장
                    queue.append((ny, nx))
```

**주의사항:**
- 그리드 좌표는 `(y, x)` 순서로 주어지는 경우가 많음
- 인덱스 범위 체크 필수: `0 <= y < n and 0 <= x < m`
- 방문 표시와 거리 저장을 동시에 처리할 수 있음

---

## BFS vs DFS 비교

| 특징 | BFS | DFS |
|------|-----|-----|
| 자료구조 | 큐 | 스택 (재귀) |
| 탐색 방식 | 너비 우선 | 깊이 우선 |
| 메모리 사용 | 많음 (같은 레벨 모두) | 적음 (현재 경로만) |
| 최단 경로 | 찾을 수 있음 | 찾을 수 없음 |
| 구현 방식 | 큐 | 재귀 또는 스택 |

---

## 주의사항

### 1. 방문 표시 시점

**중요**: 방문 표시를 **큐에 넣을 때** 해야 합니다.

**올바른 예:**
```python
if not visited[neighbor]:
    visited[neighbor] = True  # 큐에 넣을 때 표시
    queue.append(neighbor)
```

**잘못된 예:**
```python
if not visited[neighbor]:
    queue.append(neighbor)
    visited[neighbor] = True  # 큐에서 꺼낼 때 표시 (잘못됨)
```

큐에서 꺼낼 때 표시하면 같은 정점이 큐에 여러 번 들어갈 수 있습니다.

### 2. 큐의 크기

- 완전 그래프나 밀집 그래프에서는 큐에 많은 정점이 들어갈 수 있음
- 메모리 사용량을 고려해야 함

### 3. 정점 번호 정렬

문제에서 "작은 번호부터 방문" 조건이 있다면:
```python
for node in graph:
    node.sort()
```

---

## BFS의 장단점

### 장점

- **최단 경로 보장**: 가중치가 없는 그래프에서 최단 경로를 찾을 수 있음
- **레벨별 탐색**: 같은 거리의 정점들을 함께 처리할 수 있음
- **완전 탐색**: 모든 정점을 방문할 수 있음

### 단점

- **메모리 사용**: DFS보다 메모리를 더 많이 사용할 수 있음
- **큐 관리**: 큐를 관리하는 오버헤드가 있음

---

## 관련 알고리즘

- [[dfs-algorithm|DFS (깊이 우선 탐색)]]
- [[boj-1260|BOJ 1260: DFS와 BFS]] - DFS와 BFS를 함께 구현하는 문제
- [[boj-7576|BOJ 7576: 토마토]] - 다중 시작점 BFS를 활용하는 문제
- [[boj-2178|BOJ 2178: 미로 탐색]] - 2D 그리드에서 BFS를 활용하는 문제
- [[boj-14940|BOJ 14940: 쉬운 최단거리]] - 2D 그리드에서 최단 거리를 구하는 문제
- [[boj-1697|BOJ 1697: 숨바꼭질]] - 1D 그래프에서 BFS를 활용하는 문제
