# Agent Guidelines — SaFus / Bistro Boss Client

This document defines the core rules, architectural guidelines, folder structures, and development conventions for AI agents working on the **Bistro Boss Client** codebase.

---

## 1. Tech Stack Overview

- **Framework**: React (Vite) with TypeScript (`.tsx`, `.ts`)
- **Styling & UI**: Tailwind CSS, DaisyUI, shadcn/ui, Framer Motion, Spline (`@splinetool/react-spline` for 3D hero/visuals), `react-icons`
- **Form & Validation**: `react-hook-form`, `zod`, `@hookform/resolvers`
- **Data & API Layer**: `src/api/` (centralized API calls per domain), Axios (`useAxiosSecure`, `useAxiosPublic`), TanStack React Query (`QueryProvider`)
- **Payments**: `@stripe/stripe-js` / `@stripe/react-stripe-js` (Stripe card element), SSLCommerz redirect gateway
- **Auth & State**: `AuthContext` (`AuthProvider`), Resend-triggered OTP verification screens

---

## 2. Comprehensive Project Architecture & Folder Structure

All source files reside inside `src/`:

```
client/
├── public/                       # Favicons, static images
├── src/
│   ├── animations/               # Framer Motion variants, Lottie configs
│   ├── assets/                   # Logos, icons, images
│   ├── api/                      # Centralized API requests layer (All backend fetch functions)
│   │   ├── axiosConfig.ts        # Base Axios instances & interceptor configs
│   │   ├── authApi.ts            # Auth & OTP endpoints (login, register, verify-otp)
│   │   ├── menuApi.ts            # Menu & categories endpoints
│   │   ├── cartApi.ts            # Cart operations endpoints
│   │   ├── reservationApi.ts     # Table booking endpoints
│   │   ├── orderApi.ts           # Order management endpoints
│   │   ├── reviewApi.ts          # Customer reviews endpoints
│   │   ├── paymentApi.ts         # Stripe & SSLCommerz payment endpoints
│   │   └── userApi.ts            # User profile & admin user management endpoints
│   ├── components/
│   │   ├── common/               # Shared UI: Button, Modal, Spinner, Navbar, Footer, SectionTitle
│   │   ├── layout/               # Sidebar, DashHeader
│   │   ├── menu/                 # MenuCard, MenuCategoryTabs
│   │   ├── cart/                 # CartItem, CartSummary
│   │   ├── reservation/          # ReservationForm, ReservationCard
│   │   ├── reviews/              # ReviewCard, ReviewForm
│   │   ├── payment/              # StripeCheckoutForm, SSLCommerzButton
│   │   ├── otp/                  # OtpInput, OtpTimer
│   │   └── spline/               # SplineHero wrapper
│   ├── context/                  # AuthContext
│   ├── data/                     # Static constants & mock JSON data (menu.json, reviews.json)
│   ├── hooks/                    # Custom hooks: useAuth, useAxiosSecure, useAxiosPublic, useCart, useRole
│   ├── layouts/                  # MainLayout, DashboardLayout, AuthLayout
│   ├── pages/
│   │   ├── admin/                # ManageMenu, ManageOrders, ManageReservations, ManageUsers, Analytics
│   │   ├── auth/                 # Login, Register, VerifyOtp, ForgotPassword, ResetPassword
│   │   ├── dashboard/            # DashboardHome
│   │   ├── home/                 # Banner, Featured, Category, Testimonials
│   │   ├── menu/                 # AllMenu, MenuDetails
│   │   ├── cart/                 # MyCart, Checkout
│   │   ├── reservation/          # BookTable, MyReservations
│   │   ├── reviews/              # AllReviews
│   │   └── shared/               # About, Contact, NotFound
│   ├── providers/                # AuthProvider, QueryProvider
│   ├── routes/                   # AdminRoute.tsx, PrivateRoute.tsx, Routes.tsx
│   ├── schemas/                  # Zod schemas: login, register, reservation, review, checkout
│   ├── services/                 # High-level domain services or TanStack query wrappers
│   ├── utils/                    # formatDate, formatCurrency
│   ├── App.tsx
│   ├── main.tsx
│   ├── App.css
│   └── index.css
├── .env                          # VITE_API_URL, VITE_STRIPE_PUBLISHABLE_KEY, VITE_SSLCZ_STORE_ID
├── tailwind.config.js
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 3. Mandatory Development Conventions & Rules

### Rule 1: Centralized API Architecture (`src/api/`)
- **ALL** backend HTTP fetch/axios requests MUST be organized inside `src/api/<module>Api.ts` files (e.g., `menuApi.ts`, `authApi.ts`, `reservationApi.ts`).
- **NEVER** write inline `axios.get()` or `fetch()` directly inside `.tsx` UI components.
- Components or TanStack Query hooks in `src/hooks/` / `src/services/` MUST import API request functions from `src/api/`.

### Rule 2: Form Handling & Validation
- **ALWAYS** use `react-hook-form` paired with `@hookform/resolvers/zod` and schemas defined in `src/schemas/`.
- **NEVER** write manual state-based form validations (`useState` for field error strings).
- Schemas must infer types using `export type FormSchemaType = z.infer<typeof formSchema>`.

### Rule 3: API Calls & Axios Custom Hooks
- All authenticated endpoints **MUST** use `useAxiosSecure` (automatically injects JWT Bearer header).
- Public endpoints **MUST** use `useAxiosPublic`.
- Axios instances and base configs reside in `src/api/axiosConfig.ts`.

### Rule 4: UI Component & Styling Isolation
- **shadcn/ui**: Use for structured UI primitives (`DataTable`, `Dialog`, `Select`, `DropdownMenu`, `Popover`).
- **DaisyUI**: Use for quick layout elements (`btn`, `badge`, `alert`, `card`, `avatar`).
- **CRITICAL**: Do **NOT** mix shadcn/ui and DaisyUI components within the exact same `.tsx` component file. Separate shadcn primitives under `src/components/ui/` or generic wrappers.

### Rule 5: Route Guards & Authorization
- Wrap all authenticated user routes in `<PrivateRoute>`.
- Wrap all administrator routes in `<AdminRoute>`.
- Use `useRole()` hook to perform role-based rendering (`admin` vs. `user`).

### Rule 6: Authentication & OTP Workflow
- **Registration Pipeline**: User submits `Register.tsx` -> Server sends 6-digit OTP via Resend -> Redirect to `/verify-otp` (`OtpInput` + `OtpTimer`) -> Submit OTP to activate account -> Redirect to `/login`.
- Global auth state managed via `useAuth()` (`AuthContext`).

### Rule 7: Dual Payment Checkout Flow
- At checkout step (`Checkout.tsx`), allow selection between:
  1. **Stripe**: Embedded card element via `StripeCheckoutForm.tsx`.
  2. **SSLCommerz**: Gateway redirect via `SSLCommerzButton.tsx`.
- Upon successful payment verification callback, redirect user to `/order-confirmation`.

---

## 4. Environment Variables Reference

Always reference environment variables using Vite's `import.meta.env`:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const sslczStoreId = import.meta.env.VITE_SSLCZ_STORE_ID;
```

---

## 5. Dependencies Reference

Project dependencies installed via npm:
- Core UI: `tailwindcss`, `daisyui`, `@radix-ui/react-*`, `react-icons`, `framer-motion`, `@splinetool/react-spline`
- Forms & Validation: `zod`, `react-hook-form`, `@hookform/resolvers`
- API & Payments: `axios`, `@stripe/stripe-js`, `@stripe/react-stripe-js`
