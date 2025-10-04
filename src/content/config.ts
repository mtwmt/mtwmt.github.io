import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
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

const ironman = defineCollection({
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

export const collections = { blog, drafts, ironman };
