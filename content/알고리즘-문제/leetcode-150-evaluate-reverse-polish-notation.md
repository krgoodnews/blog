---
title: "LeetCode 150: Evaluate Reverse Polish Notation"
date: 2026-01-30
tags: [Algorithm, Python, LeetCode, Stack]
---

> [!note]
> **스택**으로 토큰을 순회하며 숫자는 넣고 연산자면 두 개 꺼내 계산한 뒤 다시 넣는 코드 구조를 설명합니다.

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

## 심화 이론

> [!note]
> **후위 표기법(RPN)** 은 연산자가 피연산자 **뒤**에 오는 표기입니다. **스택**으로 왼쪽부터 토큰을 보며 숫자는 넣고, 연산자면 스택에서 두 개 꺼내 계산한 뒤 결과를 다시 넣으면 됩니다.

---

### 후위 표기법이란?

- **중위 표기**: 우리가 쓰는 형태 — `2 + 1`, `(2 + 1) * 3`
- **후위 표기(Reverse Polish Notation)**: 연산자가 **피연산자 뒤**에 옴  
  - `2 1 +` → 2와 1을 더함  
  - `2 1 + 3 *` → (2+1)을 먼저 계산한 뒤 3을 곱함 → 9

괄호가 없어도 **토큰 순서만**으로 계산 순서가 정해지므로, 스택 하나로从左도 오른쪽 한 번만 훑으 면 됩니다.

---

### 핵심 아이디어: 스택

- **숫자** 토큰 → 스택에 **push**
- **연산자** 토큰 → 스택에서 **두 개 pop** (먼저 나온 게 왼쪽 피연산자, 나중에 나온 게 오른쪽 피연산자)  
  → 연산 적용 후 결과를 스택에 **push**

마지막에 스택에 **한 개**만 남고, 그 값이 수식의 결과입니다.

---

### 연산자별 동작

| 연산자 | 계산 | 비고 |
|--------|------|------|
| `+` | num0 + num1 | |
| `-` | num0 - num1 | 순서: 먼저 pop한 게 num1, 그 다음 pop한 게 num0 → num0 - num1 |
| `*` | num0 * num1 | |
| `/` | num0 / num1 | **0 방향으로 버림** (truncate toward zero). Python: `int(num0/num1)` |

---

### 나눗셈: 0 방향 버림

- C/Java 스타일: 나눗셈 결과를 **0 쪽으로 내림** (양수면 내림, 음수면 올림)
- Python에서 `//`는 **음수에서 바닥(floor)** 이라 다름  
  예: `-1 // 2 == -1` (0 방향이 아님)
- 따라서 **`int(num0 / num1)`** 을 쓰면 0 방향으로 버린 정수와 같아짐

---

### 알고리즘 흐름

1. 빈 스택 `nums`
2. `tokens`를 왼쪽부터 순회:
   - **숫자**면 `int(token)`으로 바꿔 **push**
   - **연산자**면 **pop 두 번** → num1, num0 (순서 주의) → 연산 후 결과 **push**
3. 반복 끝나면 `nums[0]` 반환

---

### 예시: ["2","1","+","3","*"]

| 토큰 | 동작 | 스택 |
|------|------|------|
| 2 | push | [2] |
| 1 | push | [2, 1] |
| + | pop 1, 2 → 2+1=3, push | [3] |
| 3 | push | [3, 3] |
| * | pop 3, 3 → 3*3=9, push | [9] |

→ **9** 반환

---

### 요약

| 항목 | 내용 |
|------|------|
| 후위 표기 | 피연산자 먼저, 연산자 나중 |
| 자료구조 | 스택 (숫자 push, 연산자면 pop 2번 후 계산 결과 push) |
| 나눗셈 | 0 방향 버림 → `int(num0/num1)` |
