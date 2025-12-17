import React, { useState } from 'react';

interface SearchProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  icon?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  onSearch?: (value: string) => void;
  debounceMs?: number;
}

const Search: React.FC<SearchProps> = ({
  label,
  value,
  onChange,
  icon,
  placeholder = 'Search...',
  disabled = false,
  required = false,
  error,
  onSearch,
  debounceMs = 300
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState(value);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [value, debounceMs]);

  React.useEffect(() => {
    if (onSearch && debouncedValue !== value) {
      onSearch(debouncedValue);
    }
  }, [debouncedValue, onSearch, value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className="relative">
      {label && (
        <label className="block mb-1 text-black dark:text-gray-300 text-[11px] tracking-widest">
          {label}
          {required && <span className="text-red-600">*</span>}
        </label>
      )}
      <div className="relative">
        {icon ? (
          <div
            dangerouslySetInnerHTML={{ __html: icon }}
            className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
          />
        ) : (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        )}
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder={isFocused || !value ? placeholder : ''}
          disabled={disabled}
          className={`block w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:border-blue-600 dark:focus:border-blue-500 text-[11px] tracking-widest rounded-lg px-3 py-2.5 leading-tight outline-none transition-all duration-200 pl-10 ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          } ${error ? 'border-red-600' : ''}`}
        />
      </div>
      {error && (
        <div className="text-red-600 text-[10px] tracking-widest font-normal mt-1 pl-1">
          {error}
        </div>
      )}
    </div>
  );
};

export default Search;