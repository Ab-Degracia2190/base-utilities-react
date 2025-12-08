// partials/inputs/dropdown.tsx
import React, { useState, useRef, useEffect } from 'react';

interface DropdownOption {
  name: string;
  value: string;
}

interface DropdownProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  icon?: string;
  placeholder?: string;
  disabled?: boolean;
  options?: (DropdownOption | string)[];
  required?: boolean;
  error?: string;
  onSelect?: (value: string) => void;
  isDarkMode?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  onChange,
  icon,
  placeholder = '',
  disabled = false,
  options = [],
  required = false,
  error,
  onSelect,
  isDarkMode = false
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Get display name for current value
  const selectedName = options.find(opt => {
    if (typeof opt === 'object') {
      return opt.value === value;
    }
    return opt === value;
  });

  const displayValue = selectedName
    ? typeof selectedName === 'object'
      ? selectedName.name
      : selectedName
    : '';

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowOptions(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOptions = () => {
    if (!disabled && options.length > 0) {
      setShowOptions(!showOptions);
    }
  };

  const selectOption = (option: DropdownOption | string) => {
    const selectedValue = typeof option === 'object' ? option.value : option;
    onChange(selectedValue);
    onSelect?.(selectedValue);
    setShowOptions(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!showOptions) {
        setShowOptions(true);
      } else if (activeIndex !== -1) {
        selectOption(options[activeIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!showOptions) {
        setShowOptions(true);
      }
      setActiveIndex(prev => Math.min(prev + 1, options.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Escape') {
      setShowOptions(false);
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
  const iconColor = isDarkMode ? 'text-gray-400' : 'text-gray-500';

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
        
        <svg 
          className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${iconColor}`}
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>

        <input 
          value={displayValue}
          onClick={toggleOptions}
          onKeyDown={handleKeyDown}
          type="text" 
          readOnly
          placeholder={!displayValue ? placeholder : ''}
          disabled={disabled}
          className={`block w-full ${bgColor} ${textColor} border ${borderColor} ${focusBorderColor} text-[11px] tracking-widest rounded-lg px-3 py-2.5 leading-tight outline-none transition-all duration-200 cursor-pointer ${
            icon ? 'pl-10' : ''
          } pr-10 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${error ? 'border-red-600' : ''}`}
        />
      </div>
      
      {showOptions && options.length > 0 && (
        <ul className={`mt-1 rounded-lg ${dropdownBg} border ${borderColor} shadow-md absolute left-0 w-full z-50 max-h-60 overflow-y-auto`}>
          {options.map((option, index) => (
            <li 
              key={index}
              onClick={() => selectOption(option)}
              onMouseEnter={() => setActiveIndex(index)}
              className={`text-[11px] tracking-widest px-3 py-2 ${dropdownHover} cursor-pointer ${
                index === activeIndex ? activeDropdown : ''
              } ${textColor}`}
            >
              {typeof option === 'object' ? option.name : option}
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

export default Dropdown;