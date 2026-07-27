import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { router } from './routes/Routes';
import { AuthProvider } from './providers/AuthProvider';
import { QueryProvider } from './providers/QueryProvider';

export const App: React.FC = () => {
  return (
    <HelmetProvider>
      <QueryProvider>
        <AuthProvider>
          <Toaster position="top-right" reverseOrder={false} />
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryProvider>
    </HelmetProvider>
  );
};

export default App;
