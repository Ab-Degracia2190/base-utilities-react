import React from 'react';

interface SecondaryButtonProps {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  type = 'button',
  disabled = false,
  loading = false,
  children,
  onClick,
  className = '',
}) => {
  const baseStyles = 'cursor-pointer w-full font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-xs md:text-sm';
  const defaultStyles = 'bg-white dark:bg-gray-800 text-rose-500 dark:text-rose-400 border-2 border-rose-400 dark:border-rose-500 hover:bg-rose-50 dark:hover:bg-gray-700';
  
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${defaultStyles} ${className}`}
    >
      {children}
      {loading && (
        <svg
          className="w-4 h-4 animate-spin"
          viewBox="0 0 40 40"
          height="16"
          width="16"
        >
          <circle
            cx="20"
            cy="20"
            r="17.5"
            pathLength="100"
            strokeWidth="5"
            fill="none"
            className="stroke-rose-500 dark:stroke-rose-400 opacity-30"
          />
          <circle
            cx="20"
            cy="20"
            r="17.5"
            pathLength="100"
            strokeWidth="5"
            fill="none"
            className="stroke-rose-500 dark:stroke-rose-400"
            style={{
              strokeDasharray: '25, 75',
              strokeDashoffset: 0,
              strokeLinecap: 'round',
            }}
          />
        </svg>
      )}
    </button>
  );
};

export default SecondaryButton;