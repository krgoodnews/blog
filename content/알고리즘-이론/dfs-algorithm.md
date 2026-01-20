---
title: "DFS (깊이 우선 탐색)"
date: 2026-01-17
tags: [Algorithm, Python, Graph, DFS]
---

> [!note]
> **DFS(Depth-First Search, 깊이 우선 탐색)**는 그래프를 탐색하는 기본 알고리즘 중 하나로, 한 경로를 끝까지 깊이 탐색한 후 다른 경로로 이동하는 방식입니다.

---

## DFS란?

DFS는 그래프의 모든 정점을 탐색하는 알고리즘으로, **한 경로를 끝까지 깊이 탐색**한 후, 더 이상 진행할 수 없을 때 이전 정점으로 돌아가 다른 경로를 탐색하는 방식입니다.

### 핵심 아이디어

1. **시작 정점을 방문**하고 방문 표시
2. **현재 정점과 연결된 정점들** 중에서
   - 아직 방문하지 않은 정점을 선택
   - 그 정점으로 **재귀적으로 이동**
3. 더 이상 방문할 정점이 없으면 **이전 정점으로 돌아감** (백트래킹)

---

## DFS의 특징

### 자료구조

- **스택(Stack)** 구조를 사용
- 재귀 호출이 내부적으로 스택을 사용하므로 재귀 함수로 구현 가능
- 또는 명시적으로 스택 자료구조를 사용하여 구현 가능

### 탐색 방식

- **깊이 우선**: 한 경로를 끝까지 탐색한 후 다른 경로로 이동
- **백트래킹**: 더 이상 진행할 수 없을 때 이전 정점으로 돌아감

### 메모리 효율성

- **메모리 효율적**: 현재 경로만 저장하므로 메모리 사용량이 적음
- 최악의 경우 O(N) 공간 (선형 그래프)

---

## DFS 구현 방법

### 1. 재귀를 이용한 구현

가장 일반적이고 직관적인 방법입니다.

```python
def dfs(graph, v, visited):
    # 현재 노드의 방문 처리
    visited[v] = True
    print(v, end=' ')
    
    # 현재 노드와 연결된 부분을 재귀적으로 방문
    for neighbor in graph[v]:
        if not visited[neighbor]:
            dfs(graph, neighbor, visited)
```

**동작 과정:**
1. 현재 정점 `v`를 방문 처리하고 출력
2. `v`와 연결된 모든 정점을 순회
3. 방문하지 않은 정점에 대해 재귀 호출

### 2. 스택을 이용한 구현

명시적으로 스택을 사용하는 방법입니다.

```python
def dfs_stack(graph, start, visited):
    stack = [start]
    visited[start] = True
    
    while stack:
        v = stack.pop()
        print(v, end=' ')
        
        # 역순으로 추가하여 작은 번호부터 방문
        for neighbor in reversed(graph[v]):
            if not visited[neighbor]:
                visited[neighbor] = True
                stack.append(neighbor)
```

**재귀 vs 스택:**
- 재귀: 코드가 간결하고 이해하기 쉬움
- 스택: 스택 오버플로우 위험이 없음 (깊은 그래프에서 유용)

---

## DFS 탐색 예시

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

### DFS 탐색 순서 (시작: 1)

```
1 → 2 → 5 → 3 → 4 → 6
```

**단계별 과정:**
1. 1 방문 (시작)
2. 1과 연결된 정점: [2, 3, 4] 중 2 선택
3. 2 방문
4. 2와 연결된 정점: [1(방문함), 5] 중 5 선택
5. 5 방문
6. 5와 연결된 정점: [2(방문함)] → 모두 방문함, 백트래킹
7. 2로 돌아감 → 더 이상 방문할 정점 없음, 백트래킹
8. 1로 돌아감 → 3 선택
9. 3 방문
10. 3과 연결된 정점: [1(방문함)] → 모두 방문함, 백트래킹
11. 1로 돌아감 → 4 선택
12. 4 방문
13. 4와 연결된 정점: [1(방문함), 6] 중 6 선택
14. 6 방문
15. 결과: `1 2 5 3 4 6`

---

## DFS의 시간 및 공간 복잡도

### 시간 복잡도

- **O(V + E)**: 모든 정점(V)과 간선(E)을 한 번씩 방문
- 각 정점은 한 번만 방문되고, 각 간선은 두 번 확인됨 (양방향 그래프의 경우)

### 공간 복잡도

- **방문 배열**: O(V)
- **재귀 스택/스택**: O(V) - 최악의 경우 (선형 그래프)
- **전체**: O(V)

---

## DFS의 활용

### 1. 연결된 컴포넌트 찾기

그래프에서 연결된 모든 정점들을 찾을 수 있습니다.

```python
def find_components(graph, n):
    visited = [False] * (n + 1)
    components = []
    
    for i in range(1, n + 1):
        if not visited[i]:
            component = []
            dfs_component(graph, i, visited, component)
            components.append(component)
    
    return components

def dfs_component(graph, v, visited, component):
    visited[v] = True
    component.append(v)
    
    for neighbor in graph[v]:
        if not visited[neighbor]:
            dfs_component(graph, neighbor, visited, component)
```

### 2. 사이클 탐지

그래프에 사이클이 있는지 확인할 수 있습니다.

```python
def has_cycle(graph, v, visited, parent):
    visited[v] = True
    
    for neighbor in graph[v]:
        if not visited[neighbor]:
            if has_cycle(graph, neighbor, visited, v):
                return True
        elif neighbor != parent:
            # 이미 방문한 정점인데 부모가 아니면 사이클
            return True
    
    return False
```

### 3. 위상 정렬

방향 그래프에서 위상 정렬을 수행할 수 있습니다.

### 4. 백트래킹 문제

- N-Queen 문제
- 스도쿠 풀이
- 미로 찾기

### 5. 트리 탐색

트리는 사이클이 없는 그래프이므로 DFS를 사용하여 탐색할 수 있습니다. 트리에서 DFS를 사용하면 부모-자식 관계를 쉽게 파악할 수 있습니다.

```python
def dfs_tree(graph, v, visited, parent):
    visited[v] = True
    parent[v] = current_parent  # 부모 정보 저장
    
    for neighbor in graph[v]:
        if not visited[neighbor]:
            dfs_tree(graph, neighbor, visited, v)  # 현재 노드를 부모로 전달
```

**트리 탐색의 특징:**
- 각 노드는 정확히 하나의 부모를 가짐 (루트 제외)
- 방문한 노드를 다시 방문하지 않으므로 `parent` 체크만으로 충분
- 스택을 사용한 반복 구현도 가능

```python
def dfs_tree_stack(graph, start, n):
    stack = [start]
    visited = [False] * (n + 1)
    parent = [0] * (n + 1)
    visited[start] = True
    
    while stack:
        v = stack.pop()
        
        for neighbor in graph[v]:
            if not visited[neighbor]:
                visited[neighbor] = True
                parent[neighbor] = v
                stack.append(neighbor)
    
    return parent
```

---

## DFS vs BFS 비교

| 특징 | DFS | BFS |
|------|-----|-----|
| 자료구조 | 스택 (재귀) | 큐 |
| 탐색 방식 | 깊이 우선 | 너비 우선 |
| 메모리 사용 | 적음 (현재 경로만) | 많음 (같은 레벨 모두) |
| 최단 경로 | 찾을 수 없음 | 찾을 수 있음 |
| 구현 방식 | 재귀 또는 스택 | 큐 |

---

## 주의사항

### 1. 방문 표시 시점

**재귀 구현 시:**
- 방문 표시를 재귀 호출 **전**에 해야 함
- 그렇지 않으면 같은 정점을 여러 번 방문할 수 있음

**올바른 예:**
```python
visited[v] = True  # 재귀 호출 전
for neighbor in graph[v]:
    if not visited[neighbor]:
        dfs(graph, neighbor, visited)
```

### 2. 스택 오버플로우

- 깊은 그래프에서는 재귀 호출이 많아 스택 오버플로우가 발생할 수 있음
- 이 경우 스택을 이용한 반복 구현을 사용

### 3. 정점 번호 정렬

문제에서 "작은 번호부터 방문" 조건이 있다면:
```python
for node in graph:
    node.sort()
```

---

## 관련 알고리즘

- [[bfs-algorithm|BFS (너비 우선 탐색)]]
- [[boj-1260|BOJ 1260: DFS와 BFS]] - DFS와 BFS를 함께 구현하는 문제
- [[boj-11725|BOJ 11725: 트리의 부모 찾기]] - 트리에서 DFS를 활용하여 부모를 찾는 문제
