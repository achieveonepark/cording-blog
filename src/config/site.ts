export const site = {
  title: "Somblog",
  description: "Unity, Android, iOS, CI/CD, ASP.NET. 그리고 그 외 신기능이 궁금해서 경험을 기록하기 위한 블로그!",
  url: "https://blog.somiri.dev",
  author: "parkachieveone",
  locale: "ko-KR"
} as const;

export const navigation = [
  { href: "/", label: { ko: "홈", en: "Home" } },
  { href: "/tags", label: { ko: "태그", en: "Tags" } },
  { href: "/archive", label: { ko: "아카이브", en: "Archive" } },
  { href: "/about", label: { ko: "소개", en: "About" } },
  { href: "/contact", label: { ko: "문의", en: "Contact" } },
] as const;

export const externalLinks = [
  {
    href: "https://github.com/achieveonepark",
    label: "GitHub",
    kind: "github"
  },
  {
    href: "https://www.somiri.dev",
    label: "OS",
    kind: "os"
  }
] as const;

export const contact = {
  email: import.meta.env.PUBLIC_CONTACT_EMAIL ?? "",
  github: "https://github.com/achieveonepark",
  website: "https://www.somiri.dev",
  blogRepo: "https://github.com/achieveonepark/cording-blog"
} as const;
