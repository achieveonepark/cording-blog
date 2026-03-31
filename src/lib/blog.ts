import { getCollection, type CollectionEntry } from "astro:content";
import { site } from "../config/site";

export const BLOG_LANGS = ["ko", "en"] as const;
export type BlogLang = (typeof BLOG_LANGS)[number];

/** frontmatter lang 필드에서 언어 감지 (기본값: "ko") */
export function getPostLang(post: CollectionEntry<"blog">): BlogLang {
  return post.data.lang ?? "ko";
}

/** 언어 접미사를 제거한 기본 slug (Astro glob loader가 dot을 제거하므로 "en" suffix) */
export function getBaseSlug(post: CollectionEntry<"blog">): string {
  return getPostLang(post) === "en" ? post.id.replace(/en$/, "") : post.id;
}

export async function getPublishedPosts() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);

  return posts.sort((left, right) => {
    return right.data.pubDate.getTime() - left.data.pubDate.getTime();
  });
}

/** 특정 언어 포스트만 반환 */
export async function getPublishedPostsByLang(lang: BlogLang) {
  const posts = await getPublishedPosts();
  return posts.filter((p) => getPostLang(p) === lang);
}

export function filterPostsByLang<T extends CollectionEntry<"blog">>(posts: T[], lang: BlogLang) {
  return posts.filter((post) => getPostLang(post) === lang);
}

export function groupPostsByLang<T extends CollectionEntry<"blog">>(posts: T[]) {
  return {
    ko: filterPostsByLang(posts, "ko"),
    en: filterPostsByLang(posts, "en")
  } satisfies Record<BlogLang, T[]>;
}

/** 번역본이 있는지 확인하고 반환 */
export async function findTranslation(post: CollectionEntry<"blog">) {
  const posts = await getPublishedPosts();
  const baseSlug = getBaseSlug(post);
  const currentLang = getPostLang(post);
  const targetLang = currentLang === "ko" ? "en" : "ko";
  // Astro glob loader가 dot을 제거: slug.en.md → id "slugen"
  const targetId = targetLang === "en" ? `${baseSlug}en` : baseSlug;
  return posts.find((p) => p.id === targetId && getPostLang(p) === targetLang) ?? null;
}

export function formatDate(date: Date, lang: BlogLang = "ko") {
  return new Intl.DateTimeFormat(lang === "en" ? "en-US" : site.locale, {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(date);
}

export function getReadingTime(entry: CollectionEntry<"blog">, lang: BlogLang = getPostLang(entry)) {
  const body = entry.body?.trim() ?? "";

  if (!body) {
    return lang === "en" ? "1 min read" : "1분 읽기";
  }

  const words = body.split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 220));

  return lang === "en" ? `${minutes} min read` : `${minutes}분 읽기`;
}
