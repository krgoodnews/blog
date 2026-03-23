---
title: "LeetCode 290: Word Pattern"
date: 2026-02-10
tags: [Algorithm, Python, LeetCode, Hash, String]
---

> [!note]
> **pattern**의 각 문자와 **문자열 s**의 단어가 **일대일 대응(전단사)** 인지 판별하는 문제입니다. 해시맵(딕셔너리)을 사용하여 문자와 단어 사이의 매핑 관계를 추적합니다.

---

## 문제 링크

- [LeetCode 290: Word Pattern](https://leetcode.com/problems/word-pattern/)

---

## 알고리즘 이론: 전단사(Bijection)와 단어 패턴 일치

문자열 $s$가 $pattern$을 따른다는 것은 $pattern$의 각 문자와 $s$의 각 단어 사이에 **전단사(Bijection)** 관계가 존재함을 의미합니다.

### 전단사 성립 조건

1. **일대일 대응 (One-to-One)**: 서로 다른 문자는 서로 다른 단어에 대응되어야 합니다. (여러 문자가 하나의 단어를 가리키면 안 됨)
2. **일관성 (Consistency)**: 동일한 문자는 항상 동일한 단어에 대응되어야 합니다.
3. **길이 일치**: $pattern$의 문자 개수와 $s$의 단어 개수가 정확히 일치해야 합니다.

### 판별 전략

- **길이 체크**: `len(pattern) == len(s.split())`
- **매핑 일관성**: 딕셔너리를 사용하여 `문자 -> 단어` 매핑을 기록하고, 이미 존재하는 문자가 나올 때 이전과 동일한 단어인지 확인합니다.
- **고유 개수 체크**: `len(set(pattern)) == len(set(words))` 조건을 통해 서로 다른 문자가 동일한 단어에 매핑되는 케이스를 효율적으로 걸러낼 수 있습니다. (전단사 성립의 핵심)

---

## 코드 구현

### 전체 코드

```python
class Solution:
    def wordPattern(self, pattern: str, s: str) -> bool:
        words = s.split(' ')
        mapping = {}

        # 1. 길이 검사
        if len(words) != len(pattern):
            return False

        # 2. 전단사 조건 검사 (고유 문자 수 == 고유 단어 수)
        # 이 조건이 없으면 서로 다른 문자가 같은 단어를 가리키는 경우를 따로 체크해야 함
        if len(set(words)) != len(set(list(pattern))):
            return False

        # 3. 매핑 일관성 검사
        for i in range(len(pattern)):
            char = pattern[i]
            word = words[i]
            
            if char in mapping:
                if mapping[char] != word:
                    return False
            else:
                mapping[char] = word

        return True
```

---

## 예시 분석: `pattern = "abba"`, `s = "dog cat cat dog"`

1. **길이**: 4 == 4 (통과)
2. **고유 개수**: `set(pattern)`은 {'a', 'b'}로 2개, `set(words)`는 {'dog', 'cat'}으로 2개 (2 == 2 통과)
3. **매핑 추적**:
   - `i=0`: 'a' -> 'dog' 저장
   - `i=1`: 'b' -> 'cat' 저장
   - `i=2`: 'b'는 이미 있고 값이 'cat'으로 일치 (통과)
   - `i=3`: 'a'는 이미 있고 값이 'dog'으로 일치 (통과)
- **결과**: `True`

---

## 시간 및 공간 복잡도

- **시간 복잡도**: $O(N + M)$
  - $N$은 패턴의 길이, $M$은 문자열 $s$의 길이입니다.
  - 문자열 분리($O(M)$), 집합 생성 및 루프 순회($O(N)$)가 소요됩니다.
- **공간 복잡도**: $O(K + W)$
  - $K$는 고유 문자의 개수, $W$는 고유 단어의 개수입니다.
  - 딕셔너리와 집합(Set)을 저장하는 데 사용됩니다.

---

## 관련 알고리즘

- 해시맵 (HashMap)
- 문자열 처리 (String Manipulation)
