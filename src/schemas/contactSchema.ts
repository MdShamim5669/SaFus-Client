import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  phone: z.string().min(6, 'Please enter a valid phone number'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  isRobotChecked: z.boolean().refine((val) => val === true, {
    message: 'Please check the reCAPTCHA box',
  }),
});

export type ContactFormType = z.infer<typeof contactFormSchema>;
