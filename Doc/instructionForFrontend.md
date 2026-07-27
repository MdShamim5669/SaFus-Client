# Frontend Instructions — Bistro Boss (client/)

## Tech Stack
React (Vite) + TypeScript, Tailwind CSS + DaisyUI + shadcn/ui, Zod, React Hook Form, react-icons, Framer Motion, Spline (3D hero/visuals), Axios, Stripe.js / SSLCommerz redirect checkout, Resend-triggered OTP screens.

## Folder Structure

```
client/
├── public/                       # favicons, static images
├── src/
│   ├── animations/                # Framer Motion variants, Lottie configs
│   ├── assets/                       # logos, icons, images (from /assets)
│   ├── components/
│   │   ├── common/                    # Button, Modal, Spinner, Navbar, Footer, SectionTitle
│   │   ├── layout/                     # Sidebar, DashHeader
│   │   ├── menu/                       # MenuCard, MenuCategoryTabs
│   │   ├── cart/                        # CartItem, CartSummary
│   │   ├── reservation/            # ReservationForm, ReservationCard
│   │   ├── reviews/                   # ReviewCard, ReviewForm
│   │   ├── payment/                  # StripeCheckoutForm, SSLCommerzButton
│   │   ├── otp/                         # OtpInput, OtpTimer
│   │   └── spline/                     # SplineHero wrapper
│   ├── api/                           # Centralized API requests layer
│   │   ├── axiosConfig.ts            # Axios instances & interceptor configs
│   │   ├── authApi.ts                # Auth & OTP endpoints (login, register, verify-otp)
│   │   ├── menuApi.ts                # Menu & categories endpoints
│   │   ├── cartApi.ts                # Cart operations endpoints
│   │   ├── reservationApi.ts         # Table booking endpoints
│   │   ├── orderApi.ts               # Order management endpoints
│   │   ├── reviewApi.ts              # Customer reviews endpoints
│   │   ├── paymentApi.ts             # Stripe & SSLCommerz payment endpoints
│   │   └── userApi.ts                # User profile & admin user management endpoints
│   ├── context/                       # AuthContext
│   ├── data/                          # Static data & initial JSON datasets
│   │   ├── menu.json                  # Initial menu dataset / mock items
│   │   ├── reviews.json               # Initial customer reviews dataset
│   │   └── categories.ts              # Menu category constants & nav links
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useAxiosSecure.ts
│   │   ├── useAxiosPublic.ts
│   │   ├── useCart.ts
│   │   └── useRole.ts
│   ├── layouts/                       # MainLayout, DashboardLayout, AuthLayout
│   ├── pages/
│   │   ├── admin/                     # ManageMenu, ManageOrders, ManageReservations, ManageUsers, Analytics
│   │   ├── auth/                       # Login, Register, VerifyOtp, ForgotPassword, ResetPassword
│   │   ├── dashboard/               # DashboardHome
│   │   ├── home/                       # Banner, Featured, Category, Testimonials sections
│   │   ├── menu/                       # AllMenu, MenuDetails
│   │   ├── cart/                        # MyCart, Checkout
│   │   ├── reservation/            # BookTable, MyReservations
│   │   ├── reviews/                   # AllReviews
│   │   └── shared/                     # About, Contact, NotFound
│   ├── providers/                    # AuthProvider, QueryProvider
│   ├── routes/
│   │   ├── AdminRoute.tsx
│   │   ├── PrivateRoute.tsx
│   │   └── Routes.tsx
│   ├── schemas/                       # zod schemas (login, register, reservation, review, checkout)
│   ├── services/                      # High-level domain services or TanStack query wrappers
│   ├── utils/                            # formatDate, formatCurrency
│   ├── App.tsx
│   ├── main.tsx
│   ├── App.css
│   └── index.css
├── .env                                  # VITE_API_URL, VITE_STRIPE_PK etc.
├── tailwind.config.js
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Setup

```bash
npm create vite@latest client -- --template react-ts
cd client
npm install tailwindcss daisyui @radix-ui/react-* zod react-hook-form @hookform/resolvers
npm install react-icons framer-motion @splinetool/react-spline axios
npm install @stripe/stripe-js @stripe/react-stripe-js
```

## Conventions
- Every form uses `react-hook-form` + `zodResolver` — no manual validation.
- All backend HTTP requests are centralized in `src/api/` by module (`authApi.ts`, `menuApi.ts`, `reservationApi.ts`, `paymentApi.ts`, etc.).
- All API calls go through `useAxiosSecure` (JWT attached) or `useAxiosPublic` configured via `src/api/axiosConfig.ts`.
- Protect admin routes with `AdminRoute`, authenticated routes with `PrivateRoute`.
- Use shadcn/ui for structured components (tables, dialogs, forms), DaisyUI for quick layout/utility components — don't mix both for the same component.
- OTP flow: Register → VerifyOtp (6-digit, resend via Resend email) → account activated → redirect to Login.
- Checkout: choose Stripe (card) or SSLCommerz (local gateway) at checkout step; redirect back to an order-confirmation page.

## Environment Variables (`.env`)
```
VITE_API_URL=
VITE_STRIPE_PUBLISHABLE_KEY=
VITE_SSLCZ_STORE_ID=
```
