---
title: "LeetCode 230: Kth Smallest Element in a BST"
date: 2026-01-30
tags: [Algorithm, Python, LeetCode, BST, DFS, Inorder]
---

> [!note]
> [[bst-inorder-kth-smallest|BST에서 k번째 작은 값]] 원리를 적용해, **중위 순회**로 오름차순을 만들고 **k개만 채운 뒤** k번째(1-indexed) 값을 반환하는 코드 구조를 설명합니다.

---

## 문제 링크

- [LeetCode 230: Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)

---

## 문제 요약

- **입력**: BST의 `root`, 정수 `k` (1 ≤ k ≤ n)
- **출력**: 노드 값들 중 **k번째로 작은 값** (1-indexed)
- **BST**: 이진 탐색 트리 (왼쪽 < 루트 < 오른쪽)

---

## 전체 코드

```python
class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        arr = []

        def trav(node):
            if len(arr) == k:
                return
            if node.left:
                trav(node.left)
            arr.append(node.val)
            if node.right:
                trav(node.right)

        trav(root)
        return arr[k - 1]
```

---

## 코드 구조 설명

### 1. 값 수집용 리스트

```python
arr = []
```

- **중위 순회**로 방문한 노드 값을 **오름차순**으로 쌓는 리스트
- 최대 k개만 채우고 나면 더 이상 순회하지 않음 (조기 종료)

---

### 2. 중위 순회 (trav)

```python
def trav(node):
    if len(arr) == k:
        return
    if node.left:
        trav(node.left)
    arr.append(node.val)
    if node.right:
        trav(node.right)
```

| 단계 | 의미 |
|------|------|
| `len(arr) == k` | 이미 k개 수집됨 → 더 볼 필요 없이 **return** |
| `trav(node.left)` | **왼쪽 서브트리** 먼저 (더 작은 값들) |
| `arr.append(node.val)` | **현재 노드** 값을 오름차순 순서로 추가 |
| `trav(node.right)` | **오른쪽 서브트리** (더 큰 값들) |

순서가 **왼쪽 → 현재 → 오른쪽**이므로 BST에서 **오름차순**이 됩니다.

---

### 3. 조기 종료

```python
if len(arr) == k:
    return
```

- **함수 시작 시**에 체크하므로, 새 노드를 방문하기 전에 “이미 k개 찼는지” 확인
- k개가 찼으면 그 서브트리는 더 들어가지 않고 return
- 결과적으로 **arr에는 정확히 k개**의 값이 들어가고, **arr[k-1]** 이 k번째 작은 값(1-indexed)이 됨

---

### 4. 정답 반환

```python
trav(root)
return arr[k - 1]
```

- `trav(root)`로 중위 순회를 하며 **최대 k개**까지 `arr`에 채움
- **1-indexed**이므로 k번째 작은 값은 **arr[k - 1]**

---

## 데이터 흐름 요약

| 단계 | 역할 |
|------|------|
| arr | 중위 순회로 얻은 오름차순 값들 (최대 k개) |
| trav | 왼쪽 → 현재 노드 → 오른쪽 순서로 방문 |
| len(arr)==k | k개 채우면 더 이상 재귀하지 않고 return |
| arr[k-1] | k번째 작은 값 (1-indexed) |

---

## 예시: root = [5,3,6,2,4,null,null,1], k = 3

중위 순회 순서: 1 → 2 → 3 → 4 → 5 → 6  
k=3이므로 1, 2, 3을 넣고 (필요하면 더 넣지만) **3번째 작은 값 = 3** → **return 3**

---

## 시간·공간 복잡도

- **시간**: O(k) ~ O(n) — 조기 종료로 k개만 방문할 수 있고, 최악은 전체 노드 n
- **공간**: O(h) 재귀 스택 (h = 트리 높이), arr는 O(k)

---

## 관련 문서

- [[bst-inorder-kth-smallest|BST에서 k번째 작은 값 (중위 순회)]]
- [[dfs-algorithm|DFS (깊이 우선 탐색)]]
