import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/common/Button';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-dark-200 text-white text-center space-y-6">
      <img
        src="/assets/404.gif"
        alt="Page Not Found 404"
        className="max-w-md w-full rounded-2xl shadow-2xl border border-gray-800"
      />
      <div className="space-y-2">
        <h1 className="font-cinzel text-4xl font-extrabold text-gold-400">PAGE NOT FOUND</h1>
        <p className="text-gray-400 max-w-md text-sm">
          Oops! The dining page you are looking for has been moved, removed, or never existed.
        </p>
      </div>
      <Link to="/">
        <Button variant="primary" size="lg">
          BACK TO HOME
        </Button>
      </Link>
    </div>
  );
};
