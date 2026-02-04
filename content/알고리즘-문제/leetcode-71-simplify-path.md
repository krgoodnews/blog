---
title: "LeetCode 71: Simplify Path"
date: 2026-01-30
tags: [Algorithm, Python, LeetCode, Stack, String]
---

> [!note]
> [[unix-path-simplify|유닉스 경로 단순화]] 원리를 적용해, **`/`로 split**한 뒤 **스택**으로 `'.'`·`'..'`를 처리하는 코드 구조를 설명합니다.

---

## 문제 링크

- [LeetCode 71: Simplify Path](https://leetcode.com/problems/simplify-path/)

---

## 문제 요약

- **입력**: 유닉스 스타일 절대 경로 문자열 `path` (맨 앞은 `'/'`)
- **출력**: 정규화된(canonical) 경로
- **규칙**: `'.'` 현재 디렉터리, `'..'` 상위 디렉터리, 연속 `//`는 `/` 하나, `'...'` 등은 유효한 이름

---

## 전체 코드

```python
class Solution:
    def simplifyPath(self, path: str) -> str:
        dirs = path.split(sep='/')

        arr = []

        for name in dirs:
            if name == '..':
                if len(arr) > 0:
                    arr.pop()
            elif name == '.':
                continue
            elif name != '':
                arr.append(name)

        return '/' + '/'.join(arr)
```

---

## 코드 구조 설명

### 1. `/`로 분리

```python
dirs = path.split(sep='/')
```

- 경로를 `'/'` 기준으로 나누어 토큰 리스트로 만듦
- 예: `"/home//foo/"` → `['', 'home', '', 'foo', '']`
- 연속 `/`는 빈 문자열 `''`로 나타남

---

### 2. 스택 역할의 리스트

```python
arr = []
```

- **현재까지 유효한 경로**를 디렉터리 이름 순서대로 쌓는 스택
- `'..'`일 때는 여기서 한 칸 빼고, 일반 이름일 때는 여기에 넣음

---

### 3. 토큰별 처리

```python
for name in dirs:
    if name == '..':
        if len(arr) > 0:
            arr.pop()
    elif name == '.':
        continue
    elif name != '':
        arr.append(name)
```

| name | 의미 | 동작 |
|------|------|------|
| `'..'` | 상위 디렉터리 | 스택에 뭔가 있으면 `pop()` (루트 위로는 안 감) |
| `'.'` | 현재 디렉터리 | 아무 것도 하지 않음 (`continue`) |
| `''` | 연속 `/`에서 나온 빈 토큰 | `name != ''`에 걸리지 않아서 무시 |
| 그 외 | 디렉터리/파일 이름 | `arr.append(name)` |

`'...'`는 `'.'`·`'..'`가 아니고 빈 문자열도 아니므로 그대로 `append` 됩니다.

---

### 4. 정규화된 경로 반환

```python
return '/' + '/'.join(arr)
```

- 스택에 쌓인 이름들을 `'/'`로 이어 붙이고, 맨 앞에 `'/'` 하나 붙임
- `arr`가 비어 있으면 `"/"` (루트) 반환

---

## 데이터 흐름 요약

| 단계 | 역할 |
|------|------|
| path.split('/') | 슬래시 기준 토큰 분리 |
| arr | 유효한 디렉터리 이름만 순서대로 유지 (스택) |
| '..' → pop | 상위로 이동 (스택 비면 무시) |
| '.' / '' | 무시 |
| 그 외 → append | 디렉터리 이름으로 추가 |
| '/' + '/'.join(arr) | 최종 경로 문자열 |

---

## 예시: path = "/home/user/Documents/../Pictures"

- split → `['', 'home', 'user', 'Documents', '..', 'Pictures']`
- `''` 무시, `'home'` append → `['home']`
- `'user'` append → `['home','user']`
- `'Documents'` append → `['home','user','Documents']`
- `'..'` → pop → `['home','user']`
- `'Pictures'` append → `['home','user','Pictures']`
- return `"/home/user/Pictures"`

---

## 시간·공간 복잡도

- **시간**: O(n) — path 한 번 순회, split·join 포함
- **공간**: O(n) — split 결과와 스택

---

## 관련 문서

- [[unix-path-simplify|유닉스 경로 단순화 (Simplify Path 원리)]] - 규칙과 스택 사용 이유
