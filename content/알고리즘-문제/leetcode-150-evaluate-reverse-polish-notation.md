---
title: "LeetCode 150: Evaluate Reverse Polish Notation"
date: 2026-01-30
tags: [Algorithm, Python, LeetCode, Stack]
---

> [!note]
> [[reverse-polish-notation|후위 표기법 계산]] 원리를 적용해, **스택**으로 토큰을 순회하며 숫자는 넣고 연산자면 두 개 꺼내 계산한 뒤 다시 넣는 코드 구조를 설명합니다.

---

## 문제 링크

- [LeetCode 150: Evaluate Reverse Polish Notation](https://leetcode.com/problems/evaluate-reverse-polish-notation/)

---

## 문제 요약

- **입력**: 후위 표기로 된 수식 토큰 배열 `tokens` (숫자 문자열 또는 `'+'`, `'-'`, `'*'`, `'/'`)
- **출력**: 수식을 계산한 **정수** 값
- **규칙**: 나눗셈은 **0 방향으로 버림**, 나눗셈의 나누는 수는 0이 아님, 중간·최종 결과는 32비트 정수 범위

---

## 전체 코드

```python
class Solution:
    def evalRPN(self, tokens: List[str]) -> int:
        nums = []

        for token in tokens:
            if token.lstrip('-').isdigit():
                nums.append(int(token))
            else:
                num1 = nums.pop()
                num0 = nums.pop()

                if token == '+':
                    nums.append(num0 + num1)
                elif token == '-':
                    nums.append(num0 - num1)
                elif token == '*':
                    nums.append(num0 * num1)
                elif token == '/':
                    nums.append(int(num0 / num1))

        return nums[0]
```

---

## 코드 구조 설명

### 1. 스택 초기화

```python
nums = []
```

- **nums**: 피연산자와 중간 결과를 쌓는 스택  
  - 숫자 토큰 → push  
  - 연산자 토큰 → pop 두 번 후 계산 결과 push

---

### 2. 숫자 vs 연산자 구분

```python
if token.lstrip('-').isdigit():
    nums.append(int(token))
```

- **숫자 토큰**: `'-'`를 왼쪽에서 제거한 뒤 `isdigit()`으로 판별 (음수 `"-123"` 처리)
- 숫자면 `int(token)`으로 변환해 **push**

---

### 3. 연산자일 때: pop 순서와 계산

```python
else:
    num1 = nums.pop()   # 나중에 들어간 것 = 오른쪽 피연산자
    num0 = nums.pop()   # 먼저 들어간 것 = 왼쪽 피연산자

    if token == '+':   nums.append(num0 + num1)
    elif token == '-': nums.append(num0 - num1)
    elif token == '*': nums.append(num0 * num1)
    elif token == '/': nums.append(int(num0 / num1))
```

- **pop 순서**: 먼저 나온 값이 **오른쪽 피연산자(num1)**, 그 다음이 **왼쪽 피연산자(num0)**  
  → `num0 연산자 num1` 로 계산
- **나눗셈**: `int(num0 / num1)` 로 **0 방향으로 버림** (Python `//`와 다름)

---

### 4. 결과 반환

```python
return nums[0]
```

- 유효한 후위 수식이면 반복이 끝났을 때 스택에 **값 하나**만 남음 → 그대로 반환

---

## 데이터 흐름 요약

| 단계 | 역할 |
|------|------|
| nums | 피연산자·중간 결과 스택 |
| 숫자 토큰 | `int(token)` push |
| 연산자 토큰 | pop → num1, num0 → num0 op num1 계산 후 push |
| 나눗셈 | `int(num0/num1)` (0 방향 버림) |

---

## 예시: tokens = ["4","13","5","/","+"]

- 4 push → [4]  
- 13 push → [4, 13]  
- 5 push → [4, 13, 5]  
- `/` → 5, 13 pop → 13/5=2 (0방향) push → [4, 2]  
- `+` → 2, 4 pop → 4+2=6 push → [6]  
- **return 6**

---

## 시간·공간 복잡도

- **시간**: O(n) — 토큰마다 한 번씩 처리 (push/pop·연산 상수)
- **공간**: O(n) — 스택 크기 (피연산자·중간 결과)

---

## 관련 문서

- [[reverse-polish-notation|후위 표기법 계산 (Reverse Polish Notation)]]
