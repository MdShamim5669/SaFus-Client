import { z } from 'zod';

export const reservationSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  guests: z.number().min(1, 'At least 1 guest required').max(20, 'Maximum 20 guests per table'),
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(6, 'Please enter a valid phone number'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  specialRequest: z.string().optional(),
});

export type ReservationSchemaType = z.infer<typeof reservationSchema>;
