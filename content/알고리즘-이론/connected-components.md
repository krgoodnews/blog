---
title: "연결된 컴포넌트 찾기 (Connected Components)"
date: 2026-01-17
tags: [Algorithm, Python, Graph, BFS, DFS]
---

> [!note]
> 그래프에서 시작 정점과 연결된 모든 정점을 찾는 문제는 [[bfs-algorithm|BFS]]나 [[dfs-algorithm|DFS]]를 활용하여 해결할 수 있습니다.

---

## 연결된 컴포넌트란?

**연결된 컴포넌트(Connected Component)**는 그래프에서 서로 연결되어 있는 정점들의 집합을 의미합니다. 즉, 한 정점에서 다른 정점으로 경로가 존재하는 정점들의 그룹입니다.

### 예시

다음 그래프를 생각해봅시다:

```
1 -- 2 -- 3
|         |
4         5

6 -- 7
```

이 그래프에는 두 개의 연결된 컴포넌트가 있습니다:
- 컴포넌트 1: {1, 2, 3, 4, 5}
- 컴포넌트 2: {6, 7}

---

## 문제 상황

시작 정점에서 출발하여 **도달할 수 있는 모든 정점**을 찾아야 하는 경우가 많습니다.

예를 들어:
- 바이러스가 감염된 컴퓨터에서 네트워크로 연결된 모든 컴퓨터 찾기
- 소셜 네트워크에서 한 사람과 연결된 모든 사람 찾기
- 미로에서 시작점에서 도달 가능한 모든 위치 찾기

---

## 해결 방법

[[bfs-algorithm|BFS]]나 [[dfs-algorithm|DFS]]를 사용하여 시작 정점에서 도달 가능한 모든 정점을 탐색할 수 있습니다.

### BFS를 이용한 방법

```python
from collections import deque

def find_connected_components_bfs(graph, start, visited):
    queue = deque([start])
    visited[start] = True
    connected = [start]
    
    while queue:
        v = queue.popleft()
        
        for neighbor in graph[v]:
            if not visited[neighbor]:
                visited[neighbor] = True
                queue.append(neighbor)
                connected.append(neighbor)
    
    return connected
```

**동작 과정:**
1. 시작 정점을 큐에 넣고 방문 표시
2. 큐에서 정점을 꺼내고 연결된 정점들을 큐에 추가
3. 큐가 빌 때까지 반복
4. 방문한 모든 정점이 연결된 컴포넌트

### DFS를 이용한 방법

```python
def find_connected_components_dfs(graph, v, visited, connected):
    visited[v] = True
    connected.append(v)
    
    for neighbor in graph[v]:
        if not visited[neighbor]:
            find_connected_components_dfs(graph, neighbor, visited, connected)
```

**동작 과정:**
1. 현재 정점을 방문 표시하고 결과에 추가
2. 연결된 정점들에 대해 재귀적으로 탐색
3. 모든 연결된 정점을 깊이 우선으로 탐색

---

## 연결된 컴포넌트의 개수 세기

시작 정점과 연결된 정점의 **개수**만 필요하다면, 방문한 정점의 개수를 세면 됩니다.

### BFS를 이용한 개수 세기

```python
from collections import deque

def count_connected_components_bfs(graph, start, visited):
    queue = deque([start])
    visited[start] = True
    count = 1  # 시작 정점 포함
    
    while queue:
        v = queue.popleft()
        
        for neighbor in graph[v]:
            if not visited[neighbor]:
                visited[neighbor] = True
                queue.append(neighbor)
                count += 1
    
    return count
```

### DFS를 이용한 개수 세기

```python
def count_connected_components_dfs(graph, v, visited):
    visited[v] = True
    count = 1  # 현재 정점
    
    for neighbor in graph[v]:
        if not visited[neighbor]:
            count += count_connected_components_dfs(graph, neighbor, visited)
    
    return count
```

---

## 실제 예제

### 예제: 바이러스 전파

1번 컴퓨터가 바이러스에 감염되었을 때, 네트워크로 연결된 모든 컴퓨터를 찾는 문제입니다.

**그래프:**
```
1 -- 2 -- 3
|    |
5    4
```

**BFS 탐색 (시작: 1):**
```
큐: [1]
1 방문 → 연결된 [2, 5]를 큐에 추가
큐: [2, 5]
2 방문 → 연결된 [1(방문함), 3, 4] 중 [3, 4]를 큐에 추가
큐: [5, 3, 4]
5 방문
큐: [3, 4]
3 방문
큐: [4]
4 방문
큐: []

결과: 1, 2, 5, 3, 4 (총 5개)
```

**코드:**
```python
from collections import deque

def count_infected_computers(graph, start, n):
    visited = [False] * (n + 1)
    queue = deque([start])
    visited[start] = True
    count = 0  # 시작 정점 제외
    
    while queue:
        v = queue.popleft()
        
        for neighbor in graph[v]:
            if not visited[neighbor]:
                visited[neighbor] = True
                queue.append(neighbor)
                count += 1
    
    return count
```

---

## 시간 및 공간 복잡도

### 시간 복잡도

- **O(V + E)**: 모든 정점(V)과 간선(E)을 한 번씩 방문
- BFS와 DFS 모두 동일한 시간 복잡도

### 공간 복잡도

- **방문 배열**: O(V)
- **BFS 큐**: O(V) - 최악의 경우
- **DFS 스택**: O(V) - 최악의 경우
- **전체**: O(V)

---

## BFS vs DFS 선택

연결된 컴포넌트를 찾는 문제에서는 BFS와 DFS 모두 사용할 수 있습니다.

| 특징 | BFS | DFS |
|------|-----|-----|
| **구현** | 큐 사용 | 재귀 또는 스택 |
| **메모리** | 큐에 많은 정점 저장 가능 | 현재 경로만 저장 |
| **최단 거리** | 레벨별로 탐색 | 깊이 우선 탐색 |
| **권장** | 일반적으로 BFS가 더 직관적 | 재귀 구현이 간단 |

---

## 주의사항

### 1. 시작 정점 제외하기

문제에서 "시작 정점을 제외한" 연결된 정점의 개수를 요구할 수 있습니다:

```python
count = 0  # 시작 정점 제외
# 또는
count = -1  # 시작 정점을 카운트에서 제외
```

### 2. 양방향 그래프

네트워크 문제는 보통 양방향 그래프입니다:

```python
graph[start].append(end)
graph[end].append(start)
```

### 3. 인덱스 주의

정점 번호가 1부터 시작하는 경우, 배열 크기를 `n + 1`로 설정해야 합니다:

```python
visited = [False] * (n + 1)
graph = [[] for _ in range(n + 1)]
```

---

## 관련 알고리즘

- [[bfs-algorithm|BFS (너비 우선 탐색)]]
- [[dfs-algorithm|DFS (깊이 우선 탐색)]]
- [[boj-2606|BOJ 2606: 바이러스]] - 연결된 컴포넌트를 찾는 대표적인 문제
