---
title: "Set을 이용한 교집합 찾기"
date: 2026-01-17
tags: [Algorithm, Python, Data Structure, Set]
---

> [!note]
> 두 집합의 **교집합(Intersection)**을 찾는 문제는 Set 자료구조를 활용하여 효율적으로 해결할 수 있습니다.

---

## 교집합이란?

**교집합(Intersection)**은 두 집합에 모두 속한 원소들의 집합을 의미합니다.

수학적 표기: A ∩ B = {x | x ∈ A and x ∈ B}

### 예시

- A = {1, 2, 3, 4, 5}
- B = {3, 4, 5, 6, 7}
- A ∩ B = {3, 4, 5}

---

## 문제 상황

두 개의 리스트나 집합이 주어졌을 때, **공통 원소**를 찾아야 하는 경우가 많습니다.

예를 들어:
- 듣도 못한 사람과 보도 못한 사람 중 겹치는 사람 찾기
- 두 데이터베이스에서 공통 레코드 찾기
- 두 파일에서 공통 단어 찾기

---

## 해결 방법

### 방법 1: Set의 교집합 연산 사용

Python의 Set은 내장된 교집합 연산을 제공합니다.

```python
set1 = {1, 2, 3, 4, 5}
set2 = {3, 4, 5, 6, 7}

# 방법 1: & 연산자 사용
intersection = set1 & set2
# 결과: {3, 4, 5}

# 방법 2: intersection() 메서드 사용
intersection = set1.intersection(set2)
# 결과: {3, 4, 5}
```

### 방법 2: 하나를 Set으로 변환 후 in 연산

한 집합을 Set으로 만들고, 다른 집합의 원소들이 Set에 있는지 확인합니다.

```python
# 리스트를 Set으로 변환
set1 = set(list1)

# 다른 리스트의 원소가 Set에 있는지 확인
intersection = []
for item in list2:
    if item in set1:
        intersection.append(item)
```

**장점:**
- 한 집합만 Set으로 변환하면 되므로 메모리 효율적
- `in` 연산이 O(1)이므로 빠름

---

## 시간 복잡도 비교

### Set의 교집합 연산

- **시간 복잡도**: O(min(len(A), len(B)))
- 두 Set 중 작은 크기의 Set을 기준으로 순회

### 리스트로 직접 비교

```python
# 비효율적인 방법
intersection = []
for item in list1:
    if item in list2:  # O(n) - 리스트의 in 연산
        intersection.append(item)
```

- **시간 복잡도**: O(n × m) - 매우 느림
- 리스트의 `in` 연산은 O(n)이므로 비효율적

### Set 변환 후 비교

```python
set1 = set(list1)  # O(n)
intersection = [item for item in list2 if item in set1]  # O(m)
```

- **시간 복잡도**: O(n + m) - 효율적
- Set의 `in` 연산은 O(1)이므로 빠름

---

## 실제 예제

### 예제: 듣보잡 찾기

듣도 못한 사람과 보도 못한 사람 중 겹치는 사람을 찾는 문제입니다.

**입력:**
```
듣도 못한 사람: ["ohhenrie", "charlie", "baesangwook"]
보도 못한 사람: ["obama", "baesangwook", "ohhenrie", "clinton"]
```

**해결 방법:**
```python
# 듣도 못한 사람을 Set으로 변환
no_heard = set(["ohhenrie", "charlie", "baesangwook"])

# 보도 못한 사람 중 Set에 있는 사람 찾기
no_heard_and_seen = []
for name in ["obama", "baesangwook", "ohhenrie", "clinton"]:
    if name in no_heard:
        no_heard_and_seen.append(name)

# 결과: ["baesangwook", "ohhenrie"]
```

**더 간단한 방법:**
```python
no_heard = set(["ohhenrie", "charlie", "baesangwook"])
no_seen = ["obama", "baesangwook", "ohhenrie", "clinton"]

# 리스트 컴프리헨션 사용
no_heard_and_seen = [name for name in no_seen if name in no_heard]
```

---

## 정렬이 필요한 경우

문제에서 결과를 **사전순으로 정렬**하라고 요구할 수 있습니다.

```python
# 교집합 찾기
intersection = [item for item in list2 if item in set1]

# 사전순 정렬
intersection.sort()
```

또는:

```python
# Set의 교집합 연산 사용
intersection = list(set1 & set2)

# 사전순 정렬
intersection.sort()
```

---

## 메모리 효율적인 방법

두 리스트가 모두 매우 큰 경우, 메모리를 절약할 수 있습니다:

```python
# 더 작은 리스트를 Set으로 변환
if len(list1) < len(list2):
    set1 = set(list1)
    target = list2
else:
    set1 = set(list2)
    target = list1

intersection = [item for item in target if item in set1]
```

---

## 실제 사용 패턴

### 패턴 1: 기본 사용

```python
# 첫 번째 집합을 Set으로 변환
set1 = set(list1)

# 두 번째 집합의 원소 중 Set에 있는 것 찾기
intersection = [item for item in list2 if item in set1]
```

### 패턴 2: Set 연산 활용

```python
set1 = set(list1)
set2 = set(list2)

intersection = list(set1 & set2)
```

### 패턴 3: 정렬 포함

```python
set1 = set(list1)
intersection = [item for item in list2 if item in set1]
intersection.sort()  # 사전순 정렬
```

---

## 시간 및 공간 복잡도

### 시간 복잡도

- **Set 변환**: O(n) - 리스트를 Set으로 변환
- **교집합 찾기**: O(m) - 두 번째 리스트 순회, 각 `in` 연산은 O(1)
- **정렬**: O(k log k) - k는 교집합의 크기
- **전체**: O(n + m + k log k)

### 공간 복잡도

- **Set 저장**: O(n) - 첫 번째 리스트를 Set으로 저장
- **결과 리스트**: O(k) - 교집합의 크기
- **전체**: O(n + k)

---

## 주의사항

### 1. 중복 처리

Set은 자동으로 중복을 제거하므로, 중복이 있는 리스트를 Set으로 변환하면 중복이 사라집니다:

```python
list1 = [1, 2, 2, 3]
set1 = set(list1)  # {1, 2, 3} - 중복 제거됨
```

### 2. 순서 보장

Set은 순서를 보장하지 않으므로, 순서가 중요하다면 리스트 컴프리헨션을 사용하세요:

```python
# 순서 보장 (list2의 순서 유지)
intersection = [item for item in list2 if item in set1]
```

### 3. 대소문자 구분

문자열 비교 시 대소문자를 구분합니다:

```python
set1 = {"Apple", "Banana"}
"apple" in set1  # False (대소문자 다름)
```

---

## 관련 알고리즘

- [[set-contagion-tracking|Set을 이용한 전염/확산 추적]]
- [[set-session-tracking|Set을 이용한 세션별 고유 사용자 추적]]
- [[boj-1764|BOJ 1764: 듣보잡]] - Set을 이용한 교집합 찾기 문제
