# Somiri Blog

`blog.somiri.dev`로 배포할 Astro 기반 블로그 스타터입니다.

## 시작하기

```bash
npm install
npm run dev
```

## 포함된 구성

- Astro 기반 정적 블로그 구조
- Content Collections 기반 마크다운 포스트
- `@astrojs/sitemap`과 RSS 피드
- Matrix canvas 배경 + Codex 스타일 다크 패널 테마

## 글 작성 위치

포스트는 `src/content/blog/*.md`에 추가하면 됩니다.

## 테마 수정 포인트

- 색상과 패널 분위기 변경: `src/styles/global.css`
- Matrix 배경 동작 변경: `src/layouts/BaseLayout.astro`

## 배포 메모

- Astro `site` 값은 `https://blog.somiri.dev`로 설정되어 있습니다.
- `public/robots.txt`에 사이트맵 경로를 포함해 두었습니다.
