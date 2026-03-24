import { getCollection, type CollectionEntry } from "astro:content";
import { site } from "../config/site";

/** 파일 id에서 언어 감지 (`.en.md` → "en", 나머지 → "ko") */
export function getPostLang(post: CollectionEntry<"blog">): string {
  return post.id.endsWith(".en") ? "en" : "ko";
}

/** 언어 접미사를 제거한 기본 slug */
export function getBaseSlug(post: CollectionEntry<"blog">): string {
  return post.id.replace(/\.en$/, "");
}

export async function getPublishedPosts() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);

  return posts.sort((left, right) => {
    return right.data.pubDate.getTime() - left.data.pubDate.getTime();
  });
}

/** 특정 언어 포스트만 반환 */
export async function getPublishedPostsByLang(lang: string) {
  const posts = await getPublishedPosts();
  return posts.filter((p) => getPostLang(p) === lang);
}

/** 번역본이 있는지 확인하고 slug 반환 */
export async function findTranslation(post: CollectionEntry<"blog">) {
  const posts = await getPublishedPosts();
  const baseSlug = getBaseSlug(post);
  const currentLang = getPostLang(post);
  const targetLang = currentLang === "ko" ? "en" : "ko";
  const targetId = targetLang === "en" ? `${baseSlug}.en` : baseSlug;
  return posts.find((p) => p.id === targetId) ?? null;
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat(site.locale, {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(date);
}

export function getReadingTime(entry: CollectionEntry<"blog">) {
  const body = entry.body?.trim() ?? "";

  if (!body) {
    return "1 min read";
  }

  const words = body.split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 220));

  return `${minutes} min read`;
}
