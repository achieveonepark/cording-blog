import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";
import rehypeMermaid from "rehype-mermaid";

export default defineConfig({
  site: "https://blog.somiri.dev",
  output: "static",
  integrations: [
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname;
        return !pathname.startsWith("/admin/") && pathname !== "/search/" && pathname !== "/search";
      }
    }),
    pagefind()
  ],
  markdown: {
    rehypePlugins: [[rehypeMermaid, { strategy: "pre-mermaid" }]],
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "github-dark"
    }
  }
});
