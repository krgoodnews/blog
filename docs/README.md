# 책 커버 이미지 사용 가이드

## 이미지 경로

책 커버 이미지는 `content/books/images/` 폴더에 저장하세요.

### 사용 예시

```yaml
---
title: 책 제목
cover: ./images/book-cover.jpg
emoji: 📚
year: 2024
---
```

## 지원하는 이미지 형식

- `.jpg` / `.jpeg`
- `.png`
- `.webp`
- `.gif`

## 경로 규칙

- **상대 경로**: `./images/filename.jpg` 또는 `images/filename.jpg`
- **절대 경로**: `/books/images/filename.jpg` (사이트 루트 기준)
- **외부 URL**: `https://example.com/image.jpg`

## 파일명 권장사항

- 영문과 숫자, 하이픈(`-`) 사용
- 공백 대신 하이픈 사용: `book-cover.jpg` ✅, `book cover.jpg` ❌
- 소문자 사용 권장

