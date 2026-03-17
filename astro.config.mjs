import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://blog.somiri.dev",
  output: "static",
  integrations: [sitemap()],
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "github-dark"
    }
  }
});
