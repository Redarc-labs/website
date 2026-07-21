import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Field-building content. One markdown file per entry — add a file, no code change.
// `draft: true` hides an entry from the live site (still buildable locally).

const talks = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/talks' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    venue: z.string(),
    location: z.string().optional(),
    speaker: z.string().optional(),
    tags: z.array(z.string()).default([]),
    slides: z.string().url().optional(),
    video: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

const workshops = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/workshops' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    cohort: z.string().optional(),
    format: z.string().optional(),
    location: z.string().optional(),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    materials: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

const curriculum = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/curriculum' }),
  schema: z.object({
    title: z.string(),
    order: z.number().default(0),
    summary: z.string(),
    duration: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { talks, workshops, curriculum };
