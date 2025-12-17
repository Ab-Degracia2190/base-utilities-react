// partials/inputs/auto-suggest.tsx
import React, { useState, useRef, useEffect } from 'react';

interface AutoSuggestProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  icon?: string;
  placeholder?: string;
  disabled?: boolean;
  suggestions?: string[];
  required?: boolean;
  error?: string;
  onSelect?: (value: string) => void;
}

const AutoSuggest: React.FC<AutoSuggestProps> = ({
  label,
  value,
  onChange,
  icon,
  placeholder = '',
  disabled = false,
  suggestions = [],
  required = false,
  error,
  onSelect
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(value.toLowerCase())
  );

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectSuggestion = (suggestion: string) => {
    onChange(suggestion);
    onSelect?.(suggestion);
    setShowSuggestions(false);
    setActiveIndex(-1);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!showSuggestions) {
        setShowSuggestions(true);
      } else if (activeIndex !== -1) {
        selectSuggestion(filteredSuggestions[activeIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!showSuggestions) {
        setShowSuggestions(true);
      }
      setActiveIndex(prev => Math.min(prev + 1, filteredSuggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setShowSuggestions(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div className="relative mb-6" ref={wrapperRef}>
      {label && (
        <label className="block mb-1 text-black dark:text-gray-300 text-[11px] tracking-widest">
          {label}
          {required && <span className="text-red-600">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div
            dangerouslySetInnerHTML={{ __html: icon }}
            className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
          />
        )}
        <input
          value={value}
          onChange={handleInput}
          onFocus={() => {
            setIsFocused(true);
            if (filteredSuggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder={isFocused || !value ? placeholder : ''}
          disabled={disabled}
          className={`block w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:border-blue-600 dark:focus:border-blue-500 text-[11px] tracking-widest rounded-lg px-3 py-2.5 leading-tight outline-none transition-all duration-200 ${
            icon ? 'pl-10' : ''
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${error ? 'border-red-600' : ''}`}
        />
      </div>
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="mt-1 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 shadow-md absolute left-0 w-full z-50 max-h-60 overflow-y-auto">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => selectSuggestion(suggestion)}
              onMouseEnter={() => setActiveIndex(index)}
              className={`text-[11px] tracking-widest px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-gray-900 dark:text-white ${
                index === activeIndex ? 'bg-gray-100 dark:bg-gray-600' : ''
              }`}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      {error && (
        <div className="text-red-600 text-[10px] tracking-widest font-normal mt-1 pl-1">
          {error}
        </div>
      )}
    </div>
  );
};

export default AutoSuggest;