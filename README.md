# SaFus Restaurant Client 🍽️

SaFus Restaurant is a modern, high-performance fine-dining web application built using **React**, **Vite**, **TypeScript**, **Tailwind CSS**, and **DaisyUI**. 

## ✨ Key Features

- 🍲 **Complete Food Menu & Category Catalog**: Today's Offer, Desserts, Pizza, Salad, Soup, and Drinks with dynamic category tab switching and 6-item pagination.
- 🔐 **OTP Authentication & Firebase Social Login**: Email/Password registration with 6-digit OTP code verification dispatched via backend, plus Google, Facebook, and GitHub sign-in.
- 📋 **Centralized Zod Form Validation**: Validation schemas for Login, Sign Up, Table Reservation, Customer Reviews, Contact Us, and Checkout inside `src/schemas/`.
- 💳 **Dual Payment Gateway Integration**: Integrated Stripe Card Element (`@stripe/react-stripe-js`) and SSLCommerz redirect gateway with dynamic publishable key loading.
- 📱 **Customer User & Executive Admin Dashboard**: Profile overview, stats counters, interactive table booking management, review submission, order activity history, downloadable receipts, and Cloudinary profile photo upload.
- 🌐 **Live REST API Connection**: Connected to live Render backend server (`https://safus-restaurent.onrender.com`).

## 🚀 Tech Stack

- **Frontend Core**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS, DaisyUI, Framer Motion, React Icons
- **Form & Validation**: React Hook Form, Zod, `@hookform/resolvers`
- **Data Fetching & State**: Axios, TanStack React Query, React Context (`AuthProvider`)
- **Payments**: Stripe (`@stripe/stripe-js`), SSLCommerz
- **Alerts & Toast**: SweetAlert2, React Hot Toast

## 🛠️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/MdShamim5669/SaFus-Client.git
   cd SaFus-Client
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables (`.env`)**:
   ```env
   VITE_API_URL=https://safus-restaurent.onrender.com
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51Pdemo_key
   VITE_SSLCZ_STORE_ID=safus662c9b
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

5. **Type Check & Build**:
   ```bash
   npx tsc --noEmit
   npm run build
   ```
