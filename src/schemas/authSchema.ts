import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  captcha: z.string().optional(),
  captchaInput: z.string().optional(),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
export const loginWithCaptchaSchema = loginSchema;
export type LoginWithCaptchaType = LoginSchemaType;

export const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  photoURL: z.string().optional(),
});

export type SignUpSchemaType = z.infer<typeof signUpSchema>;
export const registerSchema = signUpSchema;
export type RegisterSchemaType = SignUpSchemaType;

export const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be exactly 6 digits'),
  email: z.string().optional(),
});

export type OtpSchemaType = z.infer<typeof otpSchema>;
