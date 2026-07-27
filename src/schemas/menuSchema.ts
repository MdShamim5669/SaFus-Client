import { z } from 'zod';

export const menuSchema = z.object({
  name: z.string().min(2, 'Item name is required'),
  category: z.enum(['salad', 'pizza', 'soup', 'dessert', 'drinks', 'offered', 'popular']),
  price: z.number().positive('Price must be greater than 0'),
  recipe: z.string().min(10, 'Recipe description must be at least 10 characters'),
  image: z.string().url('Please enter a valid image URL').or(z.string().min(1, 'Image path required')),
});

export type MenuSchemaType = z.infer<typeof menuSchema>;
