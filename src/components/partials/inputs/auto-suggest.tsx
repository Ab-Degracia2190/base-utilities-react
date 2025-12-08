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
  isDarkMode?: boolean;
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
  onSelect,
  isDarkMode = false
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

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setShowSuggestions(true);
    setActiveIndex(-1);
  };

  const selectSuggestion = (suggestion: string) => {
    onChange(suggestion);
    onSelect?.(suggestion);
    setShowSuggestions(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions && filteredSuggestions.length > 0 && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setShowSuggestions(true);
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => {
        const nextIndex = Math.min(prev + 1, filteredSuggestions.length - 1);
        return nextIndex;
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex !== -1 && filteredSuggestions[activeIndex]) {
        selectSuggestion(filteredSuggestions[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setActiveIndex(-1);
    }
  };

  const bgColor = isDarkMode ? 'bg-gray-700' : 'bg-white';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const labelColor = isDarkMode ? 'text-gray-300' : 'text-black';
  const borderColor = isDarkMode ? 'border-gray-600' : 'border-gray-300';
  const focusBorderColor = isDarkMode ? 'focus:border-blue-500' : 'focus:border-blue-600';
  const dropdownBg = isDarkMode ? 'bg-gray-700' : 'bg-white';
  const dropdownHover = isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100';
  const activeDropdown = isDarkMode ? 'bg-gray-600' : 'bg-gray-100';

  return (
    <div className="relative mb-6" ref={wrapperRef}>
      {label && (
        <label className={`block mb-1 ${labelColor} text-[11px] tracking-widest`}>
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
          className={`block w-full ${bgColor} ${textColor} border ${borderColor} ${focusBorderColor} text-[11px] tracking-widest rounded-lg px-3 py-2.5 leading-tight outline-none transition-all duration-200 ${
            icon ? 'pl-10' : ''
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${error ? 'border-red-600' : ''}`}
        />
      </div>
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className={`mt-1 rounded-lg ${dropdownBg} border ${borderColor} shadow-md absolute left-0 w-full z-50 max-h-60 overflow-y-auto`}>
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => selectSuggestion(suggestion)}
              onMouseEnter={() => setActiveIndex(index)}
              className={`text-[11px] tracking-widest px-3 py-2 ${dropdownHover} cursor-pointer ${
                index === activeIndex ? activeDropdown : ''
              } ${textColor}`}
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