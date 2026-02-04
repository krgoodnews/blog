---
title: "LeetCode 199: Binary Tree Right Side View"
date: 2026-01-30
tags: [Algorithm, Python, LeetCode, BFS, Binary Tree]
---

> [!note]
> [[tree-level-rightmost|이진 트리 레벨별 오른쪽 노드]] 원리를 적용해, **두 개의 큐**로 레벨을 구분한 BFS에서 **각 레벨의 마지막 노드**만 수집하는 코드 구조를 설명합니다.

---

## 문제 링크

- [LeetCode 199: Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/)

---

## 문제 요약

- **입력**: 이진 트리 `root`
- **출력**: 트리를 오른쪽에서 봤을 때 보이는 노드들의 값을 **위에서부터** 순서대로 담은 리스트
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

## 관련 문서

- [[tree-level-rightmost|이진 트리 레벨별 오른쪽 노드 (Right Side View 원리)]]
- [[bfs-algorithm|BFS (너비 우선 탐색)]]
