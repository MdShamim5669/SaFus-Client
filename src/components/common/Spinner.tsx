import React from 'react';

export const Spinner: React.FC<{ label?: string }> = ({ label = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-3">
      <span className="loading loading-spinner loading-lg text-gold-500"></span>
      <p className="text-gold-500 font-cinzel text-sm tracking-wider animate-pulse">{label}</p>
    </div>
  );
};
