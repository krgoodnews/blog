---
title: "LeetCode 290: Word Pattern"
date: 2026-02-10
tags: [Algorithm, Python, LeetCode, Hash, String]
---

> [!note]
> [[word-pattern-bijection|단어 패턴 일치 (Word Pattern · 전단사)]] 원리를 적용해, **길이·고유 개수·문자→단어 일관성**으로 판별하는 코드 구조를 설명합니다.

---

## 문제 링크

- [LeetCode 290: Word Pattern](https://leetcode.com/problems/word-pattern/)

---

## 문제 요약

- **입력**: `pattern` (소문자 문자열), `s` (공백 하나로 구분된 단어들)
- **출력**: pattern의 문자와 s의 단어가 **전단사**로 대응하면 true
- **전단사**: 각 문자가 정확히 한 단어에, 각 단어가 정확히 한 문자에 대응

---

## 전체 코드

```python
class Solution:
    def wordPattern(self, pattern: str, s: str) -> bool:
        lst_s = s.split(' ')
        dic = {}

        if len(lst_s) != len(pattern):
            return False

        if len(set(lst_s)) != len(set(list(pattern))):
            return False

        for i in range(len(pattern)):
            p = pattern[i]
            if p in dic:
                if dic[p] != lst_s[i]:
                    return False
            else:
                dic[p] = lst_s[i]

        return True
```

---

## 코드 구조 설명

### 1. 단어 리스트와 길이 검사

```python
lst_s = s.split(' ')
dic = {}

if len(lst_s) != len(pattern):
    return False
```

- **lst_s**: s를 공백 기준으로 나눈 단어 리스트
- **길이**가 다르면 문자와 단어를 일대일로 맞출 수 없으므로 False

---

### 2. 고유 문자 수 vs 고유 단어 수

```python
if len(set(lst_s)) != len(set(list(pattern))):
    return False
```

- **set(pattern)**: pattern에서 서로 다른 문자의 개수
- **set(lst_s)**: 서로 다른 단어의 개수
- 두 개수가 다르면, “서로 다른 문자가 같은 단어를 가리키는” 경우나 그 반대가 생겨 **전단사가 불가능** → False

---

### 3. 문자 → 단어 매핑 일관성

```python
for i in range(len(pattern)):
    p = pattern[i]
    if p in dic:
        if dic[p] != lst_s[i]:
            return False
    else:
        dic[p] = lst_s[i]

return True
```

- **dic**: 문자 `p` → 대응 단어
- **p가 이미 있으면**: 이전에 정한 단어 `dic[p]`와 현재 단어 `lst_s[i]`가 같아야 함 (다르면 False)
- **p가 없으면**: `dic[p] = lst_s[i]` 로 매핑 추가
- 위에서 set 개수를 맞춰 두었으므로, “서로 다른 문자가 같은 단어를 가리키는” 경우는 발생하지 않음

---

## 데이터 흐름 요약

| 단계 | 역할 |
|------|------|
| lst_s | s를 공백으로 나눈 단어 리스트 |
| len(lst_s) == len(pattern) | 대응 가능한 길이인지 |
| len(set(lst_s)) == len(set(pattern)) | 전단사 가능한 고유 개수인지 |
| dic | 문자 → 단어 매핑, 같은 문자는 항상 같은 단어 |

---

## 예시: pattern = "abba", s = "dog cat cat dog"

- lst_s = ["dog","cat","cat","dog"], 길이 4 == 4
- set(pattern) 2개, set(lst_s) 2개 → 통과
- a→dog, b→cat, b→cat(일치), a→dog(일치) → **True**

---

## 시간·공간 복잡도

- **시간**: O(n + m) — split O(m), set/순회 O(n), n = len(pattern), m = len(s)
- **공간**: O(n) — 단어 리스트, set, 딕셔너리

---

## 관련 문서

- [[word-pattern-bijection|단어 패턴 일치 (Word Pattern · 전단사)]]
