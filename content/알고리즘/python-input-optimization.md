---
title: "Python 입력 최적화: input() vs sys.stdin.readline()"
date: 2026-01-17
tags: [Algorithm, Python, Performance, Optimization]
---

> [!note]
> 파이썬에서 데이터를 입력받을 때 `input()`과 `sys.stdin.readline()`의 성능 차이와 사용법에 대해 알아봅니다.

---

## 문제 상황

파이썬에서 데이터를 입력받을 때 `input()`과 `sys.stdin.readline()`은 처리 속도에서 상당한 차이를 보입니다. 특히 대량의 데이터를 처리해야 하는 코딩 테스트나 알고리즘 문제 풀이에서 이 차이는 합격과 불합격(시간 초과)을 가르는 결정적인 요인이 되기도 합니다.

---

## 속도 비교: 왜 sys.stdin.readline()이 더 빠른가?

결론부터 말씀드리면, `sys.stdin.readline()`이 `input()`보다 훨씬 빠릅니다. 그 이유는 두 함수가 내부적으로 동작하는 방식이 다르기 때문입니다.

### 특징 비교

| 특징 | `input()` | `sys.stdin.readline()` |
|------|-----------|------------------------|
| **속도** | 느림 | 매우 빠름 |
| **프롬프트** | 출력 기능 있음 (사용자 안내 메시지) | 출력 기능 없음 |
| **후처리** | 입력된 값의 끝에 있는 줄바꿈(`\n`)을 자동으로 제거 | 줄바꿈(`\n`)을 포함하여 문자열로 반환 |
| **동작 방식** | 인자로 받은 문자열을 출력하고, 한 글자씩 읽어들임 | 한꺼번에 버퍼에 읽어와서 대기함 |

---

## 성능 차이가 발생하는 근본적 이유

### 1. 버퍼링(Buffering)

`sys.stdin.readline()`은 대량의 데이터를 한꺼번에 읽어와 버퍼에 저장한 뒤 처리합니다. 반면 `input()`은 상대적으로 작은 단위로 데이터를 읽어들입니다.

**버퍼링의 장점:**
- 시스템 호출 횟수 감소
- I/O 오버헤드 최소화
- 전체적인 처리 속도 향상

### 2. 부가 기능

`input()`은 다음과 같은 추가적인 가공 과정을 거칩니다:
- 매개변수로 프롬프트 메시지를 받을 수 있음 (예: `input("입력하세요: ")`)
- 입력받은 값에서 줄바꿈 문자를 자동으로 제거
- 사용자 친화적인 인터페이스 제공

이 사소한 과정들이 반복문 안에서 수만 번 실행되면 큰 시간 차이를 만듭니다.

### 3. 실제 성능 차이

입력 데이터가 많을수록 성능 차이는 더욱 커집니다:

- **1,000줄 입력**: 약 2-3배 차이
- **10,000줄 입력**: 약 5-10배 차이
- **100,000줄 이상**: 시간 초과 vs 통과의 차이

---

## 실제 사용법 비교

### input() 사용법

```python
# 기본 사용법
data = input()

# 프롬프트 메시지와 함께
name = input("이름을 입력하세요: ")

# 여러 개의 숫자를 한 줄에서 입력받을 때
a, b = map(int, input().split())

# 여러 줄 입력받기
n = int(input())
for _ in range(n):
    data = input()
```

### sys.stdin.readline() 사용법

```python
import sys

# 1. 기본적인 사용법
data = sys.stdin.readline()

# 2. 줄바꿈 문자(\n)를 제거하고 싶을 때 (.rstrip() 추가)
data = sys.stdin.readline().rstrip()

# 3. 여러 개의 숫자를 한 줄에서 입력받을 때
a, b = map(int, sys.stdin.readline().split())

# 4. 여러 줄 입력받기
n = int(sys.stdin.readline())
for _ in range(n):
    data = sys.stdin.readline().rstrip()
```

### 편의를 위한 팁

매번 `sys.stdin.readline()`이라고 적기 귀찮다면, 코드 상단에 다음과 같이 선언하여 기존 `input()` 함수를 덮어쓰는 방식을 자주 사용합니다:

```python
import sys
input = sys.stdin.readline

# 이제 input()을 사용해도 sys.stdin.readline()과 동일하게 동작
n = int(input().rstrip())
data = input().rstrip()
a, b = map(int, input().split())
```

**주의사항:**
- 이 방식을 사용하면 `input()`에 프롬프트 메시지를 전달할 수 없습니다.
- 줄바꿈 문자를 제거하려면 `.rstrip()`을 명시적으로 호출해야 합니다.

---

## 언제 무엇을 써야 할까?

### input()을 사용해야 하는 경우

- **일반적인 프로그램**: 사용자에게 안내 문구를 보여줘야 하거나 입력 데이터가 적다면 사용하기 편한 `input()`을 쓰셔도 무방합니다.
- **대화형 프로그램**: 사용자와 상호작용하는 프로그램
- **입력 데이터가 적은 경우**: 100줄 이하의 작은 입력

### sys.stdin.readline()을 사용해야 하는 경우

- **알고리즘 문제 (PS)**: 입력 데이터가 10,000줄(또는 개) 이상이거나 "시간 제한"이 촉박한 문제라면 반드시 `sys.stdin.readline()`을 사용해야 합니다.
- **대량의 데이터 처리**: 파일에서 많은 데이터를 읽어야 하는 경우
- **시간 제한이 엄격한 문제**: 백준, 프로그래머스 등 코딩 테스트 플랫폼

---

## 실제 성능 테스트 예시

### 테스트 코드

```python
import sys
import time

# 10,000줄의 데이터를 입력받는 시뮬레이션
n = 10000

# input() 사용
start = time.time()
for _ in range(n):
    data = input()
end = time.time()
print(f"input() 시간: {end - start:.4f}초")

# sys.stdin.readline() 사용
start = time.time()
for _ in range(n):
    data = sys.stdin.readline()
end = time.time()
print(f"sys.stdin.readline() 시간: {end - start:.4f}초")
```

### 예상 결과

일반적으로 `sys.stdin.readline()`이 `input()`보다 5-10배 빠른 결과를 보입니다.

---

## 주의사항

### 1. 줄바꿈 문자 처리

`sys.stdin.readline()`은 줄바꿈 문자(`\n`)를 포함하여 반환합니다:

```python
data = sys.stdin.readline()  # "hello\n" (줄바꿈 포함)
data = sys.stdin.readline().rstrip()  # "hello" (줄바꿈 제거)
```

### 2. EOF 처리

파일 끝(EOF)에 도달하면 빈 문자열(`''`)을 반환합니다:

```python
while True:
    line = sys.stdin.readline()
    if not line:  # EOF
        break
    # 처리
```

### 3. 여러 줄 입력 처리

```python
import sys

# 방법 1: 개수만큼 반복
n = int(sys.stdin.readline())
for _ in range(n):
    data = sys.stdin.readline().rstrip()

# 방법 2: EOF까지 읽기
for line in sys.stdin:
    data = line.rstrip()
    # 처리
```

---

## 실전 예제

### 예제 1: 기본 입력

```python
import sys
input = sys.stdin.readline

# 정수 하나 입력
n = int(input().rstrip())

# 공백으로 구분된 두 정수 입력
a, b = map(int, input().split())

# 문자열 입력
s = input().rstrip()
```

### 예제 2: 여러 줄 입력

```python
import sys
input = sys.stdin.readline

# 첫 줄: 정수 n
n = int(input().rstrip())

# 다음 n줄: 각 줄에 정수 하나씩
numbers = []
for _ in range(n):
    numbers.append(int(input().rstrip()))
```

### 예제 3: 2차원 배열 입력

```python
import sys
input = sys.stdin.readline

n, m = map(int, input().split())
graph = []

for _ in range(n):
    row = list(map(int, input().split()))
    graph.append(row)
```

---

## 요약

| 항목 | `input()` | `sys.stdin.readline()` |
|------|-----------|------------------------|
| **속도** | 느림 | 빠름 |
| **용도** | 일반 프로그램, 대화형 프로그램 | 알고리즘 문제, 대량 데이터 처리 |
| **줄바꿈 처리** | 자동 제거 | 수동 제거 필요 (`.rstrip()`) |
| **프롬프트** | 지원 | 미지원 |
| **권장 사용** | 입력이 적은 경우 | 입력이 많은 경우, 시간 제한이 엄격한 경우 |

**결론**: 알고리즘 문제를 풀 때는 `sys.stdin.readline()`을 사용하는 것이 좋습니다!

---

## 관련 주제

- 파이썬 성능 최적화
- 알고리즘 문제 풀이 팁
