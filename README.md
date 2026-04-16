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
- 관리자 경로와 `/search/`는 검색엔진 색인에서 제외되도록 설정되어 있습니다.

## 선택 환경 변수

```bash
PUBLIC_CONTACT_EMAIL=hello@example.com
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx
PUBLIC_ADSENSE_SLOT_HOME_TOP=1234567890
PUBLIC_ADSENSE_SLOT_POST_TOP=2345678901
PUBLIC_ADSENSE_SLOT_POST_BOTTOM=3456789012
```

- `PUBLIC_CONTACT_EMAIL`을 설정하면 `/contact`, `/about`, `/privacy`에 이메일 문의 채널이 자동으로 노출됩니다.
- `PUBLIC_ADSENSE_CLIENT_ID`와 슬롯 값을 설정하면 홈과 글 페이지에 광고 슬롯이 활성화됩니다.
- AdSense 승인이 끝나면 발급받은 publisher 정보로 `public/ads.txt`도 추가해 주세요.
