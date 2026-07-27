import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyle =
    'inline-flex items-center justify-center font-bold tracking-wider uppercase transition-all duration-200 rounded-md focus:outline-none shadow-md disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-gold-500 hover:bg-gold-600 text-black border-none active:scale-95',
    secondary: 'bg-dark-100 hover:bg-dark-300 text-white border border-gold-500/40',
    outline: 'border-2 border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black',
    ghost: 'text-gray-300 hover:text-gold-400 hover:bg-white/5',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3 text-base',
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center space-x-2">
          <span className="loading loading-spinner loading-xs"></span>
          <span>{children}</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};
