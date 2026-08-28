import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

// CV is a single structured data file, not a list of entries.
// Keeping it as content-collection data (rather than hand-formatted HTML)
// means the CV page is just a template rendering this schema — updating
// your resume is editing JSON, not touching markup.
const cv = defineCollection({
  loader: file('src/content/cv/resume.json', {
    parser: (text) => ({ resume: JSON.parse(text) }),
  }),
  schema: z.object({
    basics: z.object({
      name: z.string(),
      title: z.string(),
      location: z.string(),
      email: z.string().email(),
      links: z.array(
        z.object({
          label: z.string(),
          url: z.string().url(),
        })
      ),
      summary: z.string(),
    }),
    experience: z.array(
      z.object({
        company: z.string(),
        role: z.string(),
        location: z.string().optional(),
        start: z.string(), // e.g. "2021-06"
        end: z.string().nullable().optional(), // omit or null for "Present"
        highlights: z.array(z.string()),
      })
    ),
    education: z.array(
      z.object({
        institution: z.string(),
        credential: z.string(),
        focus: z.string().optional(),
        start: z.string(),
        end: z.string().nullable().optional(),
        notes: z.string().optional(),
      })
    ),
    skills: z.array(
      z.object({
        category: z.string(), // e.g. "Languages", "Infrastructure"
        items: z.array(z.string()),
      })
    ),
  }),
});

// Blog scaffolded now, populated later. Standard markdown content collection.
const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { cv, blog };
