---
title: "LeetCode 199: Binary Tree Right Side View"
date: 2026-01-30
tags: [Algorithm, Python, LeetCode, BFS, Binary Tree]
---

> [!note]
> **두 개의 큐**로 레벨을 구분한 BFS에서 **각 레벨의 마지막 노드**만 수집하는 코드 구조를 설명합니다.

---

## 문제 링크

- [LeetCode 199: Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/)

---

## 문제 요약

- **입력**: 이진 트리 `root`
- **출력**: 트리를 오른쪽에서 봤을 때 보이는 노드들의 값을 **위에서부터** 순서대로 담은 리 스트
- **의미**: 각 레벨에서 **가장 오른쪽에 있는 노드**의 값

---

## 전체 코드

```python
from collections import deque

class Solution:
    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
        result = []

        def bfs(root):
            if not root:
                return

            queue = deque([])
            next_queue = deque([])
            queue.append(root)

            while queue:
                v = queue.popleft()
                if not v:
                    continue
                if v.left:
                    next_queue.append(v.left)
                if v.right:
                    next_queue.append(v.right)
                if len(queue) == 0:
                    result.append(v.val)
                    queue = next_queue
                    next_queue = deque([])

        bfs(root)
        return result
```

---

## 코드 구조 설명

### 1. 결과 리스트와 빈 트리 처리

```python
result = []

def bfs(root):
    if not root:
        return
```

- **result**: 각 레벨의 “오른쪽 끝” 노드 값만 담음
- **root가 None**이면 아무 것도 보이지 않으므로 빈 리스트 그대로 반환

---

### 2. 현재 레벨 / 다음 레벨 큐

```python
queue = deque([])
next_queue = deque([])
queue.append(root)
```

- **queue**: 현재 레벨에 있는 노드들 (처음에는 root만)
- **next_queue**: 현재 레벨 노드들의 자식들 = 다음 레벨

같은 레벨을 **왼쪽→오른쪽** 순서로 처리하기 위해, 자식은 모두 next_queue에 넣습니다.

---

### 3. 현재 레벨 처리

```python
while queue:
    v = queue.popleft()
    if not v:
        continue
    if v.left:
        next_queue.append(v.left)
    if v.right:
        next_queue.append(v.right)
```

- **v**: 현재 레벨에서 방문한 노드
- **왼쪽·오른쪽 자식**이 있으면 **next_queue**에 추가 (다음 레벨로)
- 같은 레벨에서는 왼쪽 노드부터 popleft 하므로, **마지막에 popleft 되는 노드**가 그 레벨의 **가장 오른쪽 노드**

---

### 4. 레벨의 끝: 오른쪽 노드 기록

```python
if len(queue) == 0:
    result.append(v.val)
    queue = next_queue
    next_queue = deque([])
```

- **queue가 비었다** = 방금 **v**가 현재 레벨에서 **마지막으로 꺼낸 노드** = 그 레벨의 오른쪽 끝
- 따라서 **v.val**을 **result**에 추가
- 다음 레벨로 넘어가기 위해 **queue**를 next_queue로 바꾸고, next_queue는 새로 비운 deque로 초기화

---

## 데이터 흐름 요약

| 단계 | 역할 |
|------|------|
| queue | 현재 레벨 노드 (왼→오 순) |
| next_queue | 다음 레벨 노드 (자식들) |
| popleft → v | 현재 레벨에서 하나씩 방문 |
| v.left, v.right | next_queue에 추가 |
| len(queue)==0 | 이 레벨의 마지막 노드(v) → result에 v.val 추가, queue 교체 |

---

## 예시: root = [1,2,3,null,5,null,4]

- 레벨 0: queue=[1] → v=1, queue 비어 있음 → result=[1], queue=[2,3]
- 레벨 1: v=2 → next_queue=[5]; v=3 → next_queue=[5,4], queue 비어 있음 → result=[1,3], queue=[5,4]
- 레벨 2: v=5 → next_queue=[]; v=4 → queue 비어 있음 → result=[1,3,4], queue=[]
- 종료 → **return [1,3,4]**

---

## 시간·공간 복잡도

- **시간**: O(n) — 노드당 최대 한 번 큐에 들어가고 한 번 꺼짐
- **공간**: O(n) — 최악의 경우 한 레벨에 O(n)개 노드 (예: 완전 이진 트리 마지막 레벨)

---

## 심화 이론

> [!note]
> **이진 트리**를 오른쪽에서 봤을 때 보이는 노드는, **각 레벨마다 가장 오른쪽에 있는 노드**입니다. **레벨 순서 BFS**로 각 레벨의 마지막 노드를 모으면 됩니다.

---

### 문제 상황

이진 트리의 **root**가 주어졌을 때, 트리를 **오른쪽에서** 봤을 때 보이는 노드들의 값을 **위에서부터** 순서대로 반환합니다.

- 같은 레벨에 여러 노드가 있으면 **오른쪽에 있는 노드**만 보임
- 레벨이 다르면 각 레벨에서 하나씩 보임

따라서 **각 레벨에서 가장 오른쪽 노드**를 모두 모은 것이 정답입니다.

---

### 핵심 아이디어: 레벨 순서 BFS + “레벨의 마지막 노드”

**BFS(너비 우선 탐색)**로 노드를 **레벨별로, 왼쪽→오른쪽** 순서로 방문하면:

- 한 레벨을 다 처리할 때마다, **마지막으로 방문한 노드**가 그 레벨의 **가장 오른쪽 노드**
- 이 노드의 값만 수집하면 “오른쪽에서 본 값”이 됨

즉, **레벨 구분이 있는 BFS**를 하고, **각 레벨이 끝날 때마다 마지막 노드의 값**을 결과에 넣으면 됩니다.

---

### 레벨 구분 BFS 두 가지 방식

#### 1. 두 개의 큐 (현재 레벨 / 다음 레벨)

- **queue**: 현재 레벨 노드들
- **next_queue**: 그 자식들(다음 레벨)

현재 레벨에서 노드를 하나씩 꺼내면서:
- 자식을 **next_queue**에 넣음
- **queue가 비면** → 방금 꺼낸 노드가 그 레벨의 마지막 노드 → 값 기록  
  그다음 `queue = next_queue`, `next_queue` 비우고 반복

#### 2. 한 큐 + 레벨 크기

- 큐에 노드를 넣을 때 **같은 레벨의 노드 개수**를 알고 있으면, 그 개수만큼만 popleft 했을  때의 마지막 노드가 레벨의 오른쪽 끝
- `level_size = len(queue)` 로 한 레벨씩 처리하고, 매 레벨의 마지막 노드만 결과에 추가

둘 다 **시간 O(n), 공간 O(n)** 이고, “레벨의 마지막 = 오른쪽에서 보이는 노드”라는 점은 동일합니다.

---

### 예시

```
        1        ← 레벨 0: 오른쪽 끝 = 1
       / \
      2   3      ← 레벨 1: 오른쪽 끝 = 3
       \   \
        5   4    ← 레벨 2: 오른쪽 끝 = 4
```

BFS 순서(왼→오): 레벨0 [1], 레벨1 [2,3], 레벨2 [5,4]  
각 레벨의 마지막: 1, 3, 4 → **Right Side View = [1, 3, 4]**

---

### 요약

| 항목 | 내용 |
|------|------|
| “오른쪽에서 본다” | 각 레벨에서 가장 오른쪽 노드만 보임 |
| 방법 | 레벨 순서 BFS (왼쪽→오른쪽) |
| 수집 | 각 레벨을 끝낼 때, 그 레벨에서 마지막으로 방문한 노드의 값 |

---

## 관련 문서

- [[bfs-algorithm|BFS (너비 우선 탐색)]]
