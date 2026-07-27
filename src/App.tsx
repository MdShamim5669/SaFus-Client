import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { router } from './routes/Routes';
import { AuthProvider } from './providers/AuthProvider';
import { QueryProvider } from './providers/QueryProvider';
import { CartProvider } from './providers/CartProvider';

export const App: React.FC = () => {
  return (
    <HelmetProvider>
      <QueryProvider>
        <AuthProvider>
          <CartProvider>
            <Toaster position="top-right" reverseOrder={false} />
            <RouterProvider router={router} />
          </CartProvider>
        </AuthProvider>
      </QueryProvider>
    </HelmetProvider>
  );
};

export default App;
