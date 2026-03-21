export const site = {
  title: "Somblog",
  description: "작업 기록, 실험, 회고를 차분하게 쌓아가는 Astro 블로그.",
  url: "https://blog.somiri.dev",
  author: "Somiri",
  locale: "ko-KR"
} as const;

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/posts", label: "Post" },
] as const;

export const externalLinks = [
  {
    href: "https://github.com/achieveonepark",
    label: "GitHub",
    kind: "github"
  },
  {
    href: "https://os.somiri.dev",
    label: "OS",
    kind: "os"
  },
  {
    href: "https://lib.somiri.dev",
    label: "Library",
    kind: "library"
  }
] as const;
