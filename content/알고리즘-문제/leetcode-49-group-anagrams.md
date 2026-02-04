---
title: "LeetCode 49: Group Anagrams"
date: 2026-01-30
tags: [Algorithm, Python, LeetCode, Hash, String, Sort]
---

> [!note]
> [[anagram-grouping|애너그램 그룹화]] 원리를 적용해, **정렬된 문자열을 키**로 한 딕셔너리로 같은 애너그램끼리 묶는 코드 구조를 설명합니다.

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

## 관련 문서

- [[anagram-grouping|애너그램 그룹화 (Group Anagrams 원리)]] - 정렬 키와 그룹화 아이디어
