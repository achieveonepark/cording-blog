import { getCollection, type CollectionEntry } from "astro:content";
import { site } from "../config/site";

export async function getPublishedPosts() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);

  return posts.sort((left, right) => {
    return right.data.pubDate.getTime() - left.data.pubDate.getTime();
  });
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
