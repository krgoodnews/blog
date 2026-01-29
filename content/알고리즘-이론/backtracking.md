---
title: "백트래킹 (Backtracking)"
date: 2026-01-18
tags: [Algorithm, Python, Backtracking, DFS, Recursion]
---

> [!note]
> **백트래킹(Backtracking)**은 가능한 모든 해를 탐색하되, 조건을 만족하지 않으면 이전 단계로 돌아가 다른 선택을 시도하는 알고리즘입니다.

---

## 백트래킹이란?

**백트래킹(Backtracking)**은 문제의 해를 찾기 위해 가능한 모든 경우를 탐색하되, 현재 선택이 해가 될 수 없다고 판단되면 **이전 단계로 돌아가(backtrack)** 다른 선택을 시도하는 알고리즘입니다.

### 핵심 아이디어

1. **선택**: 현재 단계에서 가능한 선택 중 하나를 선택
2. **재귀**: 선택한 상태에서 다음 단계로 진행
3. **되돌아가기**: 조건을 만족하지 않으면 이전 단계로 돌아가 다른 선택 시도

---

## 백트래킹의 특징

### DFS와의 관계

백트래킹은 [[dfs-algorithm|DFS(깊이 우선 탐색)]]의 한 형태입니다:
- DFS: 그래프 탐색에 사용
- 백트래킹: 해를 찾는 문제에 사용

### 가지치기 (Pruning)

백트래킹의 핵심은 **조기 종료(Early Termination)**입니다:
- 현재 경로가 해가 될 수 없다고 판단되면 즉시 중단
- 불필요한 탐색을 건너뛰어 효율성 향상

---

## 백트래킹의 구조

### 기본 템플릿

```python
def backtrack(current_state):
    # 기저 조건: 해를 찾았거나 조건을 만족
    if is_solution(current_state):
        process_solution(current_state)
        return
    
    # 가지치기: 현재 상태가 해가 될 수 없으면 중단
    if not is_valid(current_state):
        return
    
    # 가능한 선택들을 시도
    for choice in get_choices(current_state):
        # 선택 적용
        apply_choice(current_state, choice)
        
        # 재귀 호출
        backtrack(current_state)
        
        # 선택 취소 (되돌리기)
        undo_choice(current_state, choice)
```

---

## 백트래킹의 활용

### 1. 순열 생성

N개의 원소에서 M개를 선택하는 순열을 생성합니다.

```python
def generate_permutations(arr, m, current=[], used=[]):
    # 기저 조건: M개를 모두 선택
    if len(current) == m:
        print(current)
        return
    
    # 가능한 선택들
    for i in range(len(arr)):
        if i not in used:  # 아직 사용하지 않은 원소
            # 선택 적용
            current.append(arr[i])
            used.append(i)
            
            # 재귀 호출
            generate_permutations(arr, m, current, used)
            
            # 선택 취소
            current.pop()
            used.pop()
```

### 2. 조합 생성

N개의 원소에서 M개를 선택하는 조합을 생성합니다.

```python
def generate_combinations(arr, m, current=[], start=0):
    # 기저 조건
    if len(current) == m:
        print(current)
        return
    
    # start부터 시작하여 중복 선택 방지
    for i in range(start, len(arr)):
        current.append(arr[i])
        generate_combinations(arr, m, current, i + 1)
        current.pop()
```

### 3. 비내림차순 조합 (중복 선택 가능)

같은 수를 여러 번 선택할 수 있고, 비내림차순 조건을 만족하는 조합을 생성합니다.

```python
def generate_non_decreasing_combinations(arr, m, current=[], start=0):
    # 기저 조건
    if len(current) == m:
        print(current)
        return
    
    # start부터 시작 (비내림차순 보장)
    for i in range(start, len(arr)):
        current.append(arr[i])
        generate_non_decreasing_combinations(arr, m, current, i)  # i부터 시작 (중복 선택 가능)
        current.pop()
```

**핵심 포인트:**
- `start` 파라미터로 비내림차순 보장
- `i`부터 시작하여 같은 수를 여러 번 선택 가능
- 정렬된 배열 사용 시 자동으로 사전순 출력

### 4. N-Queen 문제

N×N 체스판에 N개의 퀸을 서로 공격하지 않게 배치하는 문제입니다.

---

## 백트래킹의 시간 복잡도

### 일반적인 경우

- **최악의 경우**: O(가능한 경우의 수)
- **가지치기 효과**: 실제로는 훨씬 적은 경우만 탐색

### 예시: 순열 생성

- N개에서 M개를 선택하는 순열: O(N! / (N-M)!)
- 가지치기로 불필요한 탐색 제거

---

## 백트래킹 vs 완전 탐색

| 특징 | 백트래킹 | 완전 탐색 |
|------|----------|----------|
| **가지치기** | 조건 불만족 시 즉시 중단 | 모든 경우 탐색 |
| **효율성** | 상대적으로 효율적 | 비효율적 |
| **구현** | 재귀 + 상태 되돌리기 | 단순 반복 |

---

## 실제 예시

### 예시: 수열 생성

N개의 자연수에서 M개를 선택하여 수열을 만드는 문제입니다.

```python
def generate_sequences(arr, m, current=[]):
    if len(current) == m:
        print(current)
        return
    
    for num in arr:
        if num not in current:  # 중복 방지
            current.append(num)
            generate_sequences(arr, m, current)
            current.pop()  # 되돌리기
```

---

## 주의사항

### 1. 상태 되돌리기

백트래킹에서 가장 중요한 것은 **상태를 되돌리는 것**입니다:

```python
# 선택 적용
current.append(choice)

# 재귀 호출
backtrack(current)

# 선택 취소 (필수!)
current.pop()
```

### 2. 중복 방지

이미 사용한 원소를 다시 사용하지 않도록 체크해야 합니다:

```python
if num not in current:  # 리스트에서 확인 (비효율적)
    # 또는
if not used[i]:  # 배열로 확인 (효율적)
```

### 3. 정렬

사전순으로 출력하려면 입력 배열을 먼저 정렬해야 합니다.

### 4. 중복 수열 처리

입력 배열에 중복된 원소가 있을 때, 같은 수열을 여러 번 출력하지 않도록 해야 합니다.

**방법 1: 딕셔너리 사용**

```python
def generate_sequences_no_duplicate(arr, m, current=[], used=[], result_dict={}):
    if len(current) == m:
        seq_str = ' '.join(map(str, current))
        if seq_str not in result_dict:
            print(seq_str)
            result_dict[seq_str] = True
        return
    
    for i in range(len(arr)):
        if i not in used:
            current.append(arr[i])
            used.append(i)
            generate_sequences_no_duplicate(arr, m, current, used, result_dict)
            current.pop()
            used.pop()
```

**방법 2: 이전 값 체크 (정렬된 배열 사용)**

입력 배열을 정렬한 후, 같은 레벨에서 이전에 사용한 값과 같은 값은 건너뛰는 방법입니다.

```python
def generate_sequences_no_duplicate_v2(arr, m, current=[], used=[]):
    if len(current) == m:
        print(' '.join(map(str, current)))
        return
    
    prev = -1  # 이전에 사용한 값
    for i in range(len(arr)):
        if i not in used and arr[i] != prev:  # 이전 값과 다를 때만
            prev = arr[i]
            current.append(arr[i])
            used.append(i)
            generate_sequences_no_duplicate_v2(arr, m, current, used)
            current.pop()
            used.pop()
```

**주의사항:**
- 입력 배열을 먼저 정렬해야 함
- 같은 레벨에서만 이전 값 체크 (다른 레벨에서는 같은 값 사용 가능)

---

## 관련 알고리즘

- [[dfs-algorithm|DFS (깊이 우선 탐색)]]
- 재귀 (Recursion)
- [[boj-15654|BOJ 15654: N과 M (5)]] - 백트래킹을 활용하는 대표적인 문제
- [[boj-15663|BOJ 15663: N과 M (9)]] - 중복 수열 처리가 필요한 백트래킹 문제
- [[boj-15652|BOJ 15652: N과 M (4)]] - 비내림차순 조합 문제
- [[boj-15666|BOJ 15666: N과 M (12)]] - 중복 원소가 있는 비내림차순 조합 문제
