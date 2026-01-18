---
title: "Set을 이용한 세션별 고유 사용자 추적"
date: 2026-01-16
tags: [Algorithm, Python, Data Structure]
---

> [!note]
> Set 자료구조를 활용하여 세션별로 고유한 사용자를 추적하는 기법에 대해 알아봅니다.

---

## 문제 상황

여러 세션으로 구분되는 데이터에서, 각 세션마다 **고유한 항목의 개수**를 세어야 하는 상황을 생각해봅시다.

예를 들어:
- 채팅방에서 새로운 사람이 입장(ENTER)할 때마다 새로운 세션이 시작
- 각 세션에서 처음 채팅을 보낸 사용자만 카운트
- 같은 사용자가 한 세션에서 여러 번 채팅을 보내도 한 번만 카운트

이런 문제를 해결하기 위해 **Set 자료구조**를 활용할 수 있습니다.

---

## Set 자료구조의 특징

Set은 다음과 같은 특징을 가집니다:

1. **중복 제거**: 같은 값을 여러 번 추가해도 하나만 저장됩니다.
2. **빠른 조회**: `in` 연산으로 O(1) 시간에 원소 존재 여부를 확인할 수 있습니다.
3. **빠른 추가/삭제**: 원소 추가/삭제가 O(1) 시간에 가능합니다.

### Python에서 Set 사용 예시

```python
greeting_set = set([])  # 빈 Set 생성

# 원소 추가
greeting_set.add("user1")
greeting_set.add("user2")
greeting_set.add("user1")  # 중복 추가해도 하나만 저장

print(len(greeting_set))  # 2 (user1, user2)
print("user1" in greeting_set)  # True
print("user3" in greeting_set)  # False
```

---

## 세션별 고유 사용자 추적 알고리즘

### 핵심 아이디어

1. **현재 세션의 Set 유지**: 현재 세션에서 등장한 고유 사용자들을 Set에 저장합니다.
2. **세션 종료 시 카운트**: 세션이 종료되면(예: ENTER가 다시 나오면) 현재 Set의 크기를 결과에 더합니다.
3. **Set 초기화**: 새로운 세션이 시작되면 Set을 비워서 새로운 세션을 추적합니다.

### 알고리즘 흐름

```
1. 결과 변수와 현재 세션 Set 초기화
2. 각 입력을 순회:
   - 세션 시작 신호(ENTER)가 나오면:
     * 현재 세션의 Set 크기를 결과에 더함
     * Set을 비워서 새 세션 시작
   - 사용자 이름이 나오면:
     * Set에 없으면 추가 (중복 체크)
3. 마지막 세션의 Set 크기를 결과에 더함
```

---

## 기본 구현

```python
N = int(input())
result = 0
current_session = set([])

for i in range(N):
    message = input().rstrip()
    
    if message == "ENTER":
        # 세션 종료: 현재 세션의 고유 사용자 수를 결과에 더함
        result += len(current_session)
        # 새 세션 시작을 위해 Set 초기화
        current_session = set([])
    else:
        # 사용자가 현재 세션에서 처음 등장하는 경우만 추가
        if message not in current_session:
            current_session.add(message)

# 마지막 세션의 고유 사용자 수를 결과에 더함
result += len(current_session)
print(result)
```

### 구현 포인트

1. **Set 초기화**: 각 세션마다 새로운 Set을 사용하여 고유 사용자를 추적합니다.
2. **중복 체크**: `if message not in current_session`으로 중복을 방지합니다.
3. **세션 종료 처리**: ENTER가 나오면 현재 세션의 결과를 저장하고 Set을 초기화합니다.
4. **마지막 세션 처리**: 루프 종료 후 마지막 세션의 결과도 더해야 합니다.

---

## 시간 복잡도 분석

- **각 입력 처리**: O(1) - Set의 `in` 연산과 `add` 연산이 모두 O(1)
- **전체 시간 복잡도**: O(N) (N은 입력 개수)

Set을 사용하지 않고 리스트로 중복을 체크한다면 O(N²)이 되지만, Set을 사용하면 O(N)으로 최적화됩니다.

---

## 활용 예시

이 패턴은 다음과 같은 상황에서 유용합니다:

- **세션별 고유 방문자 수 카운팅**
- **시간대별 고유 사용자 추적**
- **이벤트별 참여자 수 집계**
- **중복 제거가 필요한 카운팅 문제**

---

## 관련 문제

- [[boj-25192|BOJ 25192: 인사성 밝은 곰곰이]] - Set을 이용한 세션별 고유 사용자 추적 문제
