import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { PrivateRoute } from './PrivateRoute';
import { AdminRoute } from './AdminRoute';

import { Home } from '../pages/home/Home';
import { AllMenu } from '../pages/menu/AllMenu';
import { OurShop } from '../pages/shop/OurShop';
import { MyCart } from '../pages/cart/MyCart';
import { Checkout } from '../pages/cart/Checkout';
import { OrderConfirmation } from '../pages/cart/OrderConfirmation';
import { BookTable } from '../pages/reservation/BookTable';
import { Contact } from '../pages/shared/Contact';
import { AllReviews } from '../pages/reviews/AllReviews';
import { NotFound } from '../pages/shared/NotFound';

import { Login } from '../pages/auth/Login';
import { Register } from '../pages/auth/Register';
import { VerifyOtp } from '../pages/auth/VerifyOtp';

import { DashboardHome } from '../pages/dashboard/DashboardHome';
import { UserHome } from '../pages/dashboard/UserHome';
import { AddReviewForm } from '../pages/dashboard/AddReviewForm';
import { PaymentHistory } from '../pages/dashboard/PaymentHistory';
import { UserBookings } from '../pages/dashboard/UserBookings';

import { ManageMenu } from '../pages/admin/ManageMenu';
import { ManageUsers } from '../pages/admin/ManageUsers';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'menu', element: <AllMenu /> },
      { path: 'shop', element: <OurShop /> },
      { path: 'contact', element: <Contact /> },
      { path: 'reviews', element: <AllReviews /> },
      { path: 'cart', element: <MyCart /> },
      {
        path: 'checkout',
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
      {
        path: 'order-confirmation',
        element: (
          <PrivateRoute>
            <OrderConfirmation />
          </PrivateRoute>
        ),
      },
      {
        path: 'reservation',
        element: (
          <PrivateRoute>
            <BookTable />
          </PrivateRoute>
        ),
      },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'verify-otp', element: <VerifyOtp /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },
      { path: 'user-home', element: <UserHome /> },
      { path: 'admin-home', element: <DashboardHome /> },
      { path: 'payment-history', element: <PaymentHistory /> },
      { path: 'my-reservations', element: <UserBookings /> },
      { path: 'add-review', element: <AddReviewForm /> },
      {
        path: 'manage-items',
        element: (
          <AdminRoute>
            <ManageMenu />
          </AdminRoute>
        ),
      },
      {
        path: 'add-item',
        element: (
          <AdminRoute>
            <ManageMenu />
          </AdminRoute>
        ),
      },
      {
        path: 'manage-bookings',
        element: (
          <AdminRoute>
            <BookTable />
          </AdminRoute>
        ),
      },
      {
        path: 'all-users',
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: 'analytics',
        element: (
          <AdminRoute>
            <DashboardHome />
          </AdminRoute>
        ),
      },
      { path: '*', element: <NotFound /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
