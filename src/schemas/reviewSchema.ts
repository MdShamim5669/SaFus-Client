import { z } from 'zod';

export const reviewSchema = z.object({
  name: z.string().default('Valued Customer'),
  recipeLike: z.string().optional(),
  recipeSuggestion: z.string().optional(),
  suggestion: z.string().optional(),
  details: z.string().min(10, 'Review text must be at least 10 characters long'),
  rating: z.number().min(1).max(5).default(5),
});

export type ReviewFormType = z.infer<typeof reviewSchema>;
export type ReviewSchemaType = ReviewFormType;
