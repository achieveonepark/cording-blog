import rss from "@astrojs/rss";
import { site } from "../config/site";
import { getPublishedPosts } from "../lib/blog";

export async function GET(context: { site?: string | URL }) {
  const posts = await getPublishedPosts();

  return rss({
    title: site.title,
    description: site.description,
    site: context.site ?? site.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/posts/${post.id}/`
    }))
  });
}
