import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

const blog = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/blog"
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    lang: z.enum(["ko", "en"]).default("ko"),
    tags: z.array(z.string()).default([]),
    category: z.string().optional(),
    thumbnail: z.string().optional(),
    series: z.string().optional(),
    seriesOrder: z.number().optional()
  })
});

export const collections = { blog };
