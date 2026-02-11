---
title: "단어 패턴 일치 (Word Pattern · 전단사)"
date: 2026-02-10
tags: [Algorithm, Python, Hash, String]
---

> [!note]
> **pattern**의 각 문자와 **문자열 s**의 단어가 **일대일 대응(전단사)** 인지 판별하는 원리입니다. 문자 → 단어 방향만 보면 안 되고, 서로 다른 문자가 같은 단어를 가리키지 않는지도 확인해야 합니다.

---

## 문제 상황

- **pattern**: 소문자 알파벳 문자열 (예: `"abba"`)
- **s**: 공백으로 구분된 단어 문자열 (예: `"dog cat cat dog"`)

**s가 pattern을 따른다** = pattern의 문자와 s의 단어 사이에 **전단사(bijection)** 가 존재한다.

- 각 **문자**는 정확히 **한 단어**에 대응
- 각 **단어**는 정확히 **한 문자**에 대응
- 서로 다른 문자가 같은 단어를 가리키면 안 됨
- 서로 다른 단어가 같은 문자를 가리키면 안 됨

---

## 필요한 조건 세 가지

### 1. 길이 같음

단어 개수와 pattern 길이가 같아야 대응이 가능하다.

- `s.split()` 한 리스트 길이 == `len(pattern)`

### 2. 문자의 대응 일관성

같은 문자가 나올 때마다 **같은 단어**에 대응해야 한다.

- 처음 보는 문자 → 그 위치의 단어와 매핑해서 기록
- 이미 본 문자 → 이전에 기록한 단어와 **지금 단어가 같아야** 함  
  (다르면 False)

### 3. 서로 다른 문자가 같은 단어를 가리키지 않음

“문자 → 단어”만 보면 **여러 문자가 같은 단어**에 매핑될 수 있다.  
그러면 “단어 → 문자”가 하나로 정해지지 않으므로 전단사가 아니다.

- **서로 다른 문자의 개수** == **서로 다른 단어의 개수**  
  즉, `len(set(pattern)) == len(set(words))`  
  이렇게 하면, 일대일 대응이 가능한 개수만큼만 문자와 단어가 있게 된다.

---

## 왜 set 개수 비교인가?

- pattern 문자를 키로, 단어를 값으로 매핑할 때:
  - “같은 문자 → 같은 단어”는 루프에서 검사
  - “서로 다른 문자 → 서로 다른 단어”가 되려면, **고유 문자 수**와 **고유 단어 수**가 같아야 함  
    (고유 문자 수 > 고유 단어 수면 두 문자가 한 단어를 가리킴, 반대면 두 단어가 한 문자를 가리킴)
- 따라서 `len(set(pattern)) == len(set(words))` 이면, 일관된 매핑만 유지해도 전단사 조건을 만족한다.

---

## 알고리즘 흐름

1. `s.split()` → 단어 리스트, `len(words) != len(pattern)` 이면 False
2. `len(set(pattern)) != len(set(words))` 이면 False
3. 빈 딕셔너리로 **문자 → 단어** 매핑을 만들고, 인덱스 i로 pattern과 words를 순회:
   - pattern[i]가 이미 키면 → `dic[pattern[i]] == words[i]` 인지 확인
   - 키가 아니면 → `dic[pattern[i]] = words[i]`
4. 끝까지 걸리지 않으면 True

---

## 예시

- pattern `"abba"`, s `"dog cat cat dog"`  
  - 길이 4 == 4, set 개수 2 == 2  
  - a→dog, b→cat, b→cat, a→dog → 일관됨 → **True**

- pattern `"abba"`, s `"dog cat cat fish"`  
  - a→dog, b→cat, b→cat, a→fish → a가 dog와 fish 두 단어에 대응 → **False**

- pattern `"aaaa"`, s `"dog cat cat dog"`  
  - set 개수 1 != 2 → **False**

---

## 요약

| 조건 | 의미 |
|------|------|
| len(words)==len(pattern) | 대응 가능한 길이 |
| len(set(pattern))==len(set(words)) | 서로 다른 문자/단어 개수 같음 (전단사 가능) |
| 같은 문자 → 같은 단어 | 매핑 일관성 |

---

## 관련 문제

- [[leetcode-290-word-pattern|LeetCode 290: Word Pattern]] - 코드 구조 설명
