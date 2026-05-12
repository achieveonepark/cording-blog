import { getCollection, type CollectionEntry } from "astro:content";
import { site } from "../config/site";

export const BLOG_LANGS = ["ko", "en", "ja"] as const;
export type BlogLang = (typeof BLOG_LANGS)[number];

const TAXONOMY_SEGMENT_LABELS: Record<string, string> = {
  ai: "AI",
  "ci/cd": "CI/CD",
  cd: "CD",
  ci: "CI",
  gpt: "GPT",
  ios: "iOS",
  "go-f": "GoF",
  "r&d": "R&D"
};

const DERIVED_SUBCATEGORY_LABELS: Record<string, string> = {
  "designpattern/game-programming": "Game Programming",
  "designpattern/go-f/behavioral": "Behavioral",
  "designpattern/go-f/creational": "Creational",
  "designpattern/go-f/structural": "Structural"
};

function formatTaxonomySegment(segment: string) {
  const normalized = segment.trim().toLowerCase();
  if (!normalized) return "";

  const directLabel = TAXONOMY_SEGMENT_LABELS[normalized];
  if (directLabel) return directLabel;

  return normalized
    .split("-")
    .map((part) => {
      const knownLabel = TAXONOMY_SEGMENT_LABELS[part];
      if (knownLabel) return knownLabel;
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(" ");
}

/** frontmatter lang 필드에서 언어 감지 (기본값: "ko") */
export function getPostLang(post: CollectionEntry<"blog">): BlogLang {
  return post.data.lang ?? "ko";
}

/** 언어 접미사를 제거한 기본 slug (Astro glob loader가 dot을 제거하므로 "en"/"ja" suffix) */
export function getBaseSlug(post: CollectionEntry<"blog">): string {
  const lang = getPostLang(post);
  if (lang === "en") return post.id.replace(/en$/, "");
  if (lang === "ja") return post.id.replace(/ja$/, "");
  return post.id;
}

export function getPostSourceStem(post: CollectionEntry<"blog">) {
  const baseSlug = getBaseSlug(post);
  const lang = getPostLang(post);
  if (lang === "en") return `${baseSlug}.en`;
  if (lang === "ja") return `${baseSlug}.ja`;
  return baseSlug;
}

export function getPostSubcategory(post: CollectionEntry<"blog">) {
  if (typeof post.data.subcategory === "string") {
    return post.data.subcategory.trim();
  }

  const segments = post.id.split("/").filter(Boolean);
  if (segments.length < 3) return "";

  const derivedPath = segments.slice(0, -1).join("/").toLowerCase();
  const mappedLabel = DERIVED_SUBCATEGORY_LABELS[derivedPath];
  if (mappedLabel) return mappedLabel;

  const taxonomySegments = segments.slice(1, -1);
  const normalizedSegments = taxonomySegments[0]?.toLowerCase() === "go-f"
    ? taxonomySegments.slice(1)
    : taxonomySegments;

  return normalizedSegments
    .map(formatTaxonomySegment)
    .filter(Boolean)
    .join(" / ");
}

export function getPostCategoryTrail(post: CollectionEntry<"blog">) {
  const category = post.data.category?.trim() ?? "";
  const subcategory = getPostSubcategory(post);

  if (category && subcategory) return `${category} / ${subcategory}`;
  return category || subcategory;
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
    en: filterPostsByLang(posts, "en"),
    ja: filterPostsByLang(posts, "ja")
  } satisfies Record<BlogLang, T[]>;
}

export function getPostsPageUrl(pageNumber: number) {
  return pageNumber <= 1 ? "/posts/" : `/posts/${pageNumber}/`;
}

export type PaginatedPageData<T> = {
  data: T[];
  currentPage: number;
  lastPage: number;
  hasPage: boolean;
  url: {
    prev: string | null;
    next: string | null;
  };
};

// Astro isolates getStaticPaths(), so shared pagination helpers must be imported.
export function buildPostsPageData<T>(
  posts: T[],
  pageNumber: number,
  pageSize: number
): PaginatedPageData<T> {
  const lastPage = Math.max(1, Math.ceil(posts.length / pageSize));
  const hasPage = pageNumber <= lastPage;
  const start = (pageNumber - 1) * pageSize;

  return {
    data: hasPage ? posts.slice(start, start + pageSize) : [],
    currentPage: pageNumber,
    lastPage,
    hasPage,
    url: {
      prev: pageNumber > 1 ? getPostsPageUrl(Math.min(pageNumber - 1, lastPage)) : null,
      next: pageNumber < lastPage ? getPostsPageUrl(pageNumber + 1) : null
    }
  };
}

/** 번역본이 있는지 확인하고 반환 (ko ↔ en ↔ ja) */
export async function findTranslation(
  post: CollectionEntry<"blog">,
  preferLang?: BlogLang
) {
  const posts = await getPublishedPosts();
  const baseSlug = getBaseSlug(post);
  const currentLang = getPostLang(post);

  // 선호 언어가 지정된 경우 그 언어로만 시도
  const targetLangs: BlogLang[] = preferLang
    ? [preferLang]
    : BLOG_LANGS.filter((l) => l !== currentLang);

  for (const targetLang of targetLangs) {
    // Astro glob loader가 dot을 제거: slug.en.md → id "slugen", slug.ja.md → id "slugja"
    const targetId = targetLang === "ko" ? baseSlug : `${baseSlug}${targetLang}`;
    const found = posts.find((p) => p.id === targetId && getPostLang(p) === targetLang);
    if (found) return found;
  }
  return null;
}

export function formatDate(date: Date, lang: BlogLang = "ko") {
  const locale = lang === "en" ? "en-US" : lang === "ja" ? "ja-JP" : site.locale;
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(date);
}

export function getReadingTime(entry: CollectionEntry<"blog">, lang: BlogLang = getPostLang(entry)) {
  const body = (entry.body ?? "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/[#>*_\-|~=[\]{}()]/g, " ")
    .trim();

  if (!body) {
    if (lang === "en") return "1 min read";
    if (lang === "ja") return "1分で読める";
    return "1분 읽기";
  }

  const cjkChars = body.match(/[\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af]/g)?.length ?? 0;
  const latinWords = body
    .replace(/[\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.round(latinWords / 220 + cjkChars / 500));

  if (lang === "en") return `${minutes} min read`;
  if (lang === "ja") return `${minutes}分で読める`;
  return `${minutes}분 읽기`;
}
