---
title: "LeetCode 593: Valid Square"
date: 2026-02-10
tags: [Algorithm, Python, LeetCode, Geometry]
---

> [!note]
> [[valid-square-four-points|네 점이 정사각형인지 판별]] 원리를 적용해, **무게중심**과 **외접 직사각형**, **중심에서의 거리**로 검사하는 코드 구조를 설명합니다.

---

## 문제 링크

- [LeetCode 593: Valid Square](https://leetcode.com/problems/valid-square/)

---

## 문제 요약

- **입력**: 2D 평면 위 네 점 p1, p2, p3, p4 (각 [xi, yi], 순서 무관)
- **출력**: 네 점이 **정사각형**을 이루면 true, 아니면 false
- **정사각형**: 네 변의 길이가 같고, 네 각이 90도

---

## 전체 코드

```python
class Solution:
    def validSquare(self, p1: List[int], p2: List[int], p3: List[int], p4: List[int]) -> bool:
        center_x = (p1[0] + p2[0] + p3[0] + p4[0]) / 4
        center_y = (p1[1] + p2[1] + p3[1] + p4[1]) / 4

        min_x = 1e9
        min_y = 1e9
        max_x = -1e9
        max_y = -1e9

        st = set()

        for p in [p1, p2, p3, p4]:
            min_x = min(min_x, p[0])
            min_y = min(min_y, p[1])
            max_x = max(max_x, p[0])
            max_y = max(max_y, p[1])
            st.add((p[0], p[1]))

        if len(st) != 4:
            return False

        if (max_x - min_x) != (max_y - min_y):
            return False

        c = (center_x, center_y)

        def distance(c: (float, float), p: (int, int)) -> float:
            fp = (float(p[0]), float(p[1]))
            xd = c[0] - fp[0]
            yd = c[1] - fp[1]
            return (xd * xd) + (yd * yd)

        dis = distance(c, p1)
        if dis == 0:
            return False

        for p in [p2, p3, p4]:
            temp_dis = distance(c, p)
            if dis != temp_dis:
                return False

        return True
```

---

## 코드 구조 설명

### 1. 무게중심

```python
center_x = (p1[0] + p2[0] + p3[0] + p4[0]) / 4
center_y = (p1[1] + p2[1] + p3[1] + p4[1]) / 4
```

- 네 점 좌표의 **평균** = 무게중심
- 정사각형이면 대각선 교점과 같고, 네 꼭짓점은 이 점에서 **같은 거리**

---

### 2. 외접 직사각형 + 서로 다른 네 점

```python
min_x, min_y = 1e9, 1e9
max_x, max_y = -1e9, -1e9
st = set()

for p in [p1, p2, p3, p4]:
    min_x = min(min_x, p[0])
    ...
    max_y = max(max_y, p[1])
    st.add((p[0], p[1]))

if len(st) != 4:
    return False
```

- **min_x, max_x, min_y, max_y**: 네 점의 외접 직사각형
- **st**: 좌표 중복 제거 → **4개**여야 서로 다른 네 점

---

### 3. 외접 직사각형이 정사각형인지

```python
if (max_x - min_x) != (max_y - min_y):
    return False
```

- 가로 길이와 세로 길이가 같아야 정사각형 (직사각형이지만 정사각형이 아닌 경우 제외)

---

### 4. 무게중심에서 네 점까지 거리(제곱)

```python
def distance(c, p):
    ...
    return (xd * xd) + (yd * yd)   # 거리 제곱

dis = distance(c, p1)
if dis == 0:
    return False

for p in [p2, p3, p4]:
    temp_dis = distance(c, p)
    if dis != temp_dis:
        return False
```

- **distance**: 무게중심 `c`에서 점 `p`까지 **거리 제곱** 반환 (제곱근 미사용)
- **dis == 0**: 한 점이 무게중심과 겹치면 정사각형 아님
- **네 점 모두** 무게중심에서 같은 거리(제곱)여야 함 → p1 기준값과 p2, p3, p4 비교

---

## 데이터 흐름 요약

| 단계 | 역할 |
|------|------|
| center_x, center_y | 무게중심 |
| min_x, max_x, min_y, max_y | 외접 직사각형 |
| st | 서로 다른 점 4개 여부 |
| len(st)==4, 가로==세로 | 전제 조건 |
| distance(c, p) | 중심에서 점까지 거리 제곱 |
| 네 거리 동일 & > 0 | 정사각형 판별 |

---

## 예시: p1=[0,0], p2=[1,1], p3=[1,0], p4=[0,1]

- 무게중심 (0.5, 0.5), 외접 직사각형 1×1 → 가로==세로  
- 네 점 서로 다름, 중심에서 네 점까지 거리 제곱 모두 0.5 → **True**

---

## 시간·공간 복잡도

- **시간**: O(1) — 네 점 고정
- **공간**: O(1)

---

## 관련 문서

- [[valid-square-four-points|네 점이 정사각형인지 판별 (Valid Square 원리)]]
