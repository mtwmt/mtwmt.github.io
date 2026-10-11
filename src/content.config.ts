import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    // description: z.string(),
    // Transform string to Date object
    tags: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
    date: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    update: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
  }),
});

const drafts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/drafts" }),
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
    date: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    update: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
  }),
});

export const collections = { blog, drafts };
