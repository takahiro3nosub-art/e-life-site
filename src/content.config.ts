import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./articles" }),
  schema: z
    .object({
      title: z
        .string()
        .min(1)
        .refine(
          (value) => !value.includes("。"),
          "title must not contain Japanese full stops; use ｜ for separation or ？ for a question",
        ),
      description: z.string().min(1),
      personalLead: z.string().min(20).max(180),
      publishedAt: z.coerce.date(),
      updatedAt: z.coerce.date(),
      category: z.string().min(1),
      tags: z.array(z.string().min(1)).min(1),
      image: z.string().optional(),
      imageAlt: z.string().optional(),
      articleImage: z
        .object({
          src: z.string().min(1),
          alt: z.string().min(1),
          width: z.number().int().positive(),
          height: z.number().int().positive(),
        })
        .optional(),
      draft: z.boolean().default(true),
      readerState: z.array(z.string().min(8)).min(1).max(4),
      quickAnswer: z
        .string()
        .min(20)
        .refine(
          (value) => value.split(/\n+/).filter((line) => line.trim().length > 0).length >= 2,
          "quickAnswer must contain at least two lines",
        )
        .refine(
          (value) => !/(?:です|ます|でした|ました)。/.test(value),
          "quickAnswer must use a direct, non-desu-masu style",
        ),
      articleSteps: z.array(z.string().min(4)).min(2).max(6),
      experienceScope: z.string().min(20),
      factCheckedAt: z.coerce.date(),
      copyPrompt: z.object({
        label: z.string().min(4),
        text: z.string().min(80),
      }),
      faq: z
        .array(
          z.object({
            question: z.string().min(8),
            answer: z.string().min(20),
          }),
        )
        .min(3)
        .max(5),
    })
    .refine(({ updatedAt, factCheckedAt }) => updatedAt >= factCheckedAt, {
      message: "updatedAt must be the same as or later than factCheckedAt",
      path: ["updatedAt"],
    }),
});

export const collections = { articles };
