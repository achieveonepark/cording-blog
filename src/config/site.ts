export const site = {
  title: "Somiri Logbook",
  description: "작업 기록, 실험, 회고를 차분하게 쌓아가는 Astro 블로그.",
  url: "https://blog.somiri.dev",
  author: "Somiri",
  locale: "ko-KR"
} as const;

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/posts", label: "Archive" },
  { href: "/rss.xml", label: "RSS" }
] as const;
