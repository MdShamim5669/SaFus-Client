---
name: bistro-boss-frontend
description: Complete instructions, code patterns, and workflows for developing pages, components, Zod forms, API calls via src/api, OTP authentication, and checkout in the Bistro Boss React client.
---

# Bistro Boss Frontend Development Skill

This skill provides comprehensive instructions, code templates, and execution standards for developing components, pages, forms, centralized API calls in `src/api/`, routing, and payment workflows in the Bistro Boss React + TypeScript client.

---

## 1. Centralized API Layer (`src/api/`)

All backend HTTP calls MUST be defined inside `src/api/` and organized by feature module.

### API Module Template (`src/api/menuApi.ts`)

```typescript
import { AxiosInstance } from 'axios';

export interface MenuItem {
  _id: string;
  name: string;
  recipe: string;
  image: string;
  category: string;
  price: number;
}

export const fetchMenuItems = async (axiosPublic: AxiosInstance, category?: string): Promise<MenuItem[]> => {
  const url = category ? `/menu?category=${category}` : '/menu';
  const response = await axiosPublic.get<MenuItem[]>(url);
  return response.data;
};

export const createMenuItem = async (axiosSecure: AxiosInstance, itemData: Omit<MenuItem, '_id'>): Promise<MenuItem> => {
  const response = await axiosSecure.post<MenuItem>('/menu', itemData);
  return response.data;
};

export const deleteMenuItem = async (axiosSecure: AxiosInstance, id: string): Promise<{ success: boolean }> => {
  const response = await axiosSecure.delete<{ success: boolean }>(`/menu/${id}`);
  return response.data;
};
```

### Auth API Module (`src/api/authApi.ts`)

```typescript
import { AxiosInstance } from 'axios';
import { LoginSchemaType, RegisterSchemaType } from '../schemas/authSchema';

export const loginUser = async (axiosPublic: AxiosInstance, credentials: LoginSchemaType) => {
  const response = await axiosPublic.post('/auth/login', credentials);
  return response.data;
};

export const registerUser = async (axiosPublic: AxiosInstance, userData: RegisterSchemaType) => {
  const response = await axiosPublic.post('/auth/register', userData);
  return response.data;
};

export const verifyOtp = async (axiosPublic: AxiosInstance, payload: { email: string; otp: string }) => {
  const response = await axiosPublic.post('/auth/verify-otp', payload);
  return response.data;
};
```

### Using Centralized APIs in TanStack Query Hooks (`src/hooks/useMenuQuery.ts`)

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAxiosPublic } from './useAxiosPublic';
import { useAxiosSecure } from './useAxiosSecure';
import { fetchMenuItems, createMenuItem, deleteMenuItem } from '../api/menuApi';

export const useMenuItems = (category?: string) => {
  const axiosPublic = useAxiosPublic();
  return useQuery({
    queryKey: ['menu', category],
    queryFn: () => fetchMenuItems(axiosPublic, category),
  });
};

export const useAddMenuItem = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newItem: Parameters<typeof createMenuItem>[1]) => createMenuItem(axiosSecure, newItem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu'] });
    },
  });
};
```

---

## 2. Zod + React Hook Form Pattern

All forms in the application MUST use `react-hook-form` and `@hookform/resolvers/zod`.

### Zod Schema Definition (`src/schemas/reservationSchema.ts`)

```typescript
import { z } from 'zod';

export const reservationSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  guests: z.number().min(1, 'Minimum 1 guest required').max(10, 'Maximum 10 guests'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  specialRequest: z.string().optional(),
});

export type ReservationSchemaType = z.infer<typeof reservationSchema>;
```

### Component Implementation

```tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { reservationSchema, ReservationSchemaType } from '../../schemas/reservationSchema';
import { createReservation } from '../../api/reservationApi';
import { useAxiosSecure } from '../../hooks/useAxiosSecure';

export const ReservationForm: React.FC = () => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ReservationSchemaType>({
    resolver: zodResolver(reservationSchema),
  });

  const onSubmit = async (data: ReservationSchemaType) => {
    await createReservation(axiosSecure, data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block font-medium">Full Name</label>
        <input {...register('name')} className="input input-bordered w-full" />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Guests</label>
        <input type="number" {...register('guests', { valueAsNumber: true })} className="input input-bordered w-full" />
        {errors.guests && <p className="text-red-500 text-sm mt-1">{errors.guests.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full">
        {isSubmitting ? 'Submitting...' : 'Book Table'}
      </button>
    </form>
  );
};
```

---

## 3. Route Guard Architecture

Wrap routes in `src/routes/Routes.tsx`:

```tsx
// PrivateRoute wrapper for authenticated users
<PrivateRoute>
  <DashboardLayout />
</PrivateRoute>

// AdminRoute wrapper for admin-only pages
<AdminRoute>
  <ManageUsers />
</AdminRoute>
```

---

## 4. OTP Verification Workflow

1. **Register**: `Register.tsx` submits registration via `registerUser(axiosPublic, data)`. Server triggers 6-digit OTP email via Resend.
2. **Redirect**: Navigate user to `/verify-otp` with `email` state.
3. **Verify OTP Component (`src/components/otp/OtpInput.tsx`)**:
   - 6-digit PIN input with `OtpTimer.tsx`.
   - Calls `verifyOtp(axiosPublic, { email, otp })`.
   - Account activated -> Redirect user to `/login`.

---

## 5. Dual Payment Checkout Workflow

In `src/pages/cart/Checkout.tsx`:

- **Stripe (`StripeCheckoutForm.tsx`)**: Calls `createPaymentIntent(axiosSecure, cartItems)` from `src/api/paymentApi.ts` -> Confirms via `@stripe/react-stripe-js` `<CardElement />` -> Navigates to `/order-confirmation`.
- **SSLCommerz (`SSLCommerzButton.tsx`)**: Calls `initiateSSLPayment(axiosSecure, orderData)` from `src/api/paymentApi.ts` -> Redirects (`window.location.href = res.gatewayUrl`) -> SSLCommerz callback returns to `/order-confirmation`.

---

## 7. Static & Seed Data Usage (`src/data/`)

Store initial datasets and fallback mock data inside `src/data/`:
- `src/data/menu.json`: Initial list of restaurant menu items.
- `src/data/reviews.json`: Initial list of customer testimonials and ratings.

### Importing JSON directly in TypeScript components:
```typescript
import menuData from '../data/menu.json';
import reviewsData from '../data/reviews.json';

// Example: Using fallback mock data while API is loading or in development
export const useMenuWithFallback = () => {
  const { data: apiMenu, isLoading } = useMenuItems();
  const displayMenu = apiMenu || menuData;
  return { menu: displayMenu, isLoading };
};
```

