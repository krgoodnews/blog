---
title: "LeetCode 49: Group Anagrams"
date: 2026-01-30
tags: [Algorithm, Python, LeetCode, Hash, String, Sort]
---

> [!note]
> **정렬된 문자열을 키**로 한 딕셔너리로 같은 애너그램끼리 묶는 코드 구조를 설명합니다.

---

## 문제 링크

- [LeetCode 49: Group Anagrams](https://leetcode.com/problems/group-anagrams/)

---

## 문제 요약

- **입력**: 문자열 배열 `strs` (소문자 영문, 길이 0 가능)
- **출력**: 애너그램끼리 묶은 리스트의 리스트 (순서 무관)
- **애너그램**: 한 문자열을 재배열해 다른 문자열을 만들 수 있음

---

## 전체 코드

```python
class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        str_dict = {}

        for s in strs:
            list_s = list(s)
            list_s.sort()
            key = ''.join(list_s)

            if key in str_dict:
                str_dict[key].append(s)
            else:
                str_dict[key] = [s]

        result = []
        for key in str_dict:
            result.append(str_dict[key])

        return result
```

---

## 코드 구조 설명

### 1. 딕셔너리 초기화

```python
str_dict = {}
```

- **key**: 문자열을 알파벳 순으로 정렬한 결과 (같은 애너그램은 같은 key)
- **value**: 그 key에 해당하는 **원본 문자열들의 리스트**

---

### 2. 각 문자열을 키로 변환

```python
list_s = list(s)
list_s.sort()
key = ''.join(list_s)
```

- `list(s)`: 문자열을 문자 단위 리스트로 (예: `"tea"` → `['t','e','a']`)
- `.sort()`: 제자리 정렬 → `['a','e','t']`
- `''.join(list_s)`: 다시 문자열로 합침 → `"aet"`

같은 애너그램은 항상 같은 `key`가 됩니다.

---

### 3. 딕셔너리에 추가

```python
if key in str_dict:
    str_dict[key].append(s)
else:
    str_dict[key] = [s]
```

- **key가 이미 있으면**: 해당 그룹 리스트에 `s`만 추가
- **key가 없으면**: 새 그룹 `[s]` 로 등록

---

### 4. 결과 리스트 만들기

```python
result = []
for key in str_dict:
    result.append(str_dict[key])
return result
```

- 딕셔너리의 각 value(그룹 리스트)를 `result`에 순서대로 넣어 반환
- 순서는 문제에서 정해지지 않아도 됨

---

## 데이터 흐름 요약

| 단계 | 역할 |
|------|------|
| str_dict | key = 정렬된 문자열, value = 원본 문자열 리스트 |
| list → sort → join | 문자열 s → 대표 키 key |
| key in str_dict | 같은 그룹이 이미 있으면 append, 없으면 [s] 생성 |
| result | 모든 그룹 리스트를 모아서 반환 |

---

## 예시: strs = ["eat","tea","tan","ate","nat","bat"]

- "eat" → key "aet" → str_dict["aet"] = ["eat"]
- "tea" → key "aet" → str_dict["aet"] = ["eat", "tea"]
- "tan" → key "ant" → str_dict["ant"] = ["tan"]
- "ate" → key "aet" → str_dict["aet"] = ["eat", "tea", "ate"]
- "nat" → key "ant" → str_dict["ant"] = ["tan", "nat"]
- "bat" → key "abt" → str_dict["abt"] = ["bat"]

result = [["eat","tea","ate"], ["tan","nat"], ["bat"]] (또는 그 순서의 변형)

---

## 시간·공간 복잡도

- **시간**: O(n × k log k)  
  - n = len(strs), k = 최대 문자열 길이  
  - 각 문자열 정렬 O(k log k), n번
- **공간**: O(n × k) — 원본 문자열들과 키 저장

---

## 심화 이론

> [!note]
> **문자열 배열**에서 서로 **애너그램**인 것끼리 묶을 때, **정렬된 문자열을 키**로 쓰면 같 은 그룹을 한 번에 모을 수 있는 원리입니다.

---

### 애너그램이란?

두 문자열이 **애너그램(anagram)** 이라 함은, 한 쪽을 **재배열**해서 다른 쪽을 만들 수 있다 는 뜻입니다.

- 문자 종류와 개수가 같고, 순서만 다름
- 예: `"eat"`, `"tea"`, `"ate"` → 모두 같은 문자 {a, e, t}를 한 번씩 사용

따라서 **같은 문자 multiset(중복 집합)** 을 가지면 애너그램입니다.

---

### 핵심 아이디어: 정렬 = 대표 키

문자열을 **알파벳 순으로 정렬**하면:

- 애너그램끼리는 **같은 문자열**이 됨  
  - `"eat"` → `"aet"`, `"tea"` → `"aet"`, `"ate"` → `"aet"`
- 애너그램이 아니면 **다른 문자열**이 됨  
  - `"bat"` → `"abt"`

그래서 **정렬된 문자열**을 **그룹의 대표 키**로 쓰면,  
같은 키를 가진 문자열끼리 한 그룹으로 묶을 수 있습니다.

---

### 알고리즘 설계

1. **빈 딕셔너리** 준비: `key(정렬된 문자열) → [원본 문자열들]`
2. **각 문자열 s**에 대해:
   - s를 정렬한 결과를 **key**로 계산
   - key가 이미 있으면 해당 리스트에 s **추가**
   - 없으면 `[s]` 로 새 리스트 등록
3. 딕셔너리의 **value 리스트들**을 모아서 반환

한 번 순회로 그룹이 나뉘므로 **시간 O(n × k log k)** (n = 문자열 개수, k = 최대 길이), **공간 O(n × k)** 입니다.

---

### 예시: strs = ["eat","tea","tan","ate","nat","bat"]

| 원본 | 정렬 키 |
|------|--------|
| "eat" | "aet" |
| "tea" | "aet" |
| "tan" | "ant" |
| "ate" | "aet" |
| "nat" | "ant" |
| "bat" | "abt" |

딕셔너리:

- `"aet"` → ["eat", "tea", "ate"]
- `"ant"` → ["tan", "nat"]
- `"abt"` → ["bat"]

반환: `[["eat","tea","ate"], ["tan","nat"], ["bat"]]` (순서는 무관)

---

### 대안: 문자 개수 튜플을 키로

정렬 대신 **문자별 등장 횟수**를 세어 튜플/문자열로 만들 수도 있습니다.

- 예: `"aet"` → (a:1, e:1, t:1) → `(1,0,...,1,...,1,...)` 같은 형태
- 애너그램이면 이 “카운트 벡터”가 같음

정렬 키 방식이 구현이 간단하고, Python에서는 딕셔너리에 리스트를 value로 두기 좋습니다.

---

### 요약

| 항목 | 내용 |
|------|------|
| 애너그램 | 같은 문자 구성, 순서만 다름 |
| 그룹 키 | 문자열을 정렬한 결과 |
| 자료구조 | dict: key = 정렬된 문자열, value = 원본 문자열 리스트 |
| 한 번 순회 | 각 s에 대해 key 계산 후 dict에 추가/생성 |
