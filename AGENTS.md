# 블로그 작업 가이드 (Codex 참고용)

## 기술 스택
- Astro SSG + View Transitions (`<ClientRouter />`)
- 포스트: `src/content/blog/` 디렉토리에 `.md` 파일
- 스타일: 매트릭스 다크 테마 (green on black)

## 새 글 추가 절차

### 1. 한국어 포스트 작성
파일: `src/content/blog/{slug}.md`

```yaml
---
title: "제목"
description: "한줄 설명"
pubDate: 2026-01-01
tags:
  - 태그1
  - 태그2
category: 카테고리명
---
```

- `lang` 필드 생략 가능 (기본값 `"ko"`)
- `thumbnail`, `series`, `seriesOrder`, `draft` 등은 선택

### 2. 영어 번역 추가
파일: `src/content/blog/{slug}.en.md`

```yaml
---
title: "English Title"
description: "One-line description in English"
lang: en          # ← 반드시 명시!
pubDate: 2026-01-01
tags:
  - Tag1
  - Tag2
category: CategoryName
---
```

**필수 규칙:**
- 파일명: 한국어 파일명 + `.en.md` (예: `my-post.md` → `my-post.en.md`)
- frontmatter에 `lang: en` 반드시 추가
- `pubDate`, `tags`, `category`는 한국어 원본과 동일하게 유지
- `title`, `description`, 본문만 영어로 번역

## 언어 필터 동작 원리

### CSS 기반 필터링
- `html[data-blog-lang="ko"]` → `.post-card[data-lang="en"]` 숨김
- `html[data-blog-lang="en"]` → `.post-card[data-lang="ko"]` 숨김
- 관련 CSS: `src/styles/global.css` 상단

### 언어 감지
- `getPostLang()` → `post.data.lang` 값 사용 (기본값 "ko")
- Astro glob loader가 `post.id`에서 dot을 제거하므로 파일명 기반 감지 불가

### View Transitions 주의사항
- `html[data-blog-lang]`은 `astro:after-swap`에서 복원 (BaseLayout.astro)
- 동적 삽입 요소 스타일은 `:global()` 필수 (Astro scoped CSS 제한)
- `is:inline` 스크립트만 매 페이지마다 재실행됨

## 검색 (Pagefind)
- `data-pagefind-filter="lang:${currentLang}"` → 현재 언어만 검색
- `data-pagefind-meta="description"` → `<p>` element에 직접 부착
- 콤마가 포함된 값은 attribute 방식 (`title:값, desc:값`) 대신 element 방식 사용

## 스키마 (content.config.ts)
```
title, description, pubDate        → 필수
lang                               → "ko" | "en" (기본값 "ko")
tags                               → string[] (기본값 [])
category, thumbnail, series        → 선택
seriesOrder                        → 선택 (number)
draft                              → 선택 (기본값 false)
```

## 커밋 규칙
- 커밋 author: `achieveonepark <park_achieveone@naver.com>`
- git config를 변경하지 말 것 (이미 설정됨)
