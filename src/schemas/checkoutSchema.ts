import { z } from 'zod';

export const checkoutSchema = z.object({
  name: z.string().min(2, 'Full name is required'),
  fullName: z.string().optional(),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  phone: z.string().min(6, 'Please enter a valid phone number'),
  address: z.string().min(5, 'Delivery address is required'),
  streetAddress: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  paymentMethod: z.enum(['stripe', 'sslcommerz']),
});

export type CheckoutSchemaType = z.infer<typeof checkoutSchema>;
