import React, { useState } from 'react';

interface TextProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  icon?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  isDarkMode?: boolean;
}

const Text: React.FC<TextProps> = ({
  label,
  value,
  onChange,
  icon,
  placeholder = '',
  disabled = false,
  required = false,
  error,
  isDarkMode = false
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const bgColor = isDarkMode ? 'bg-gray-700' : 'bg-white';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const labelColor = isDarkMode ? 'text-gray-300' : 'text-black';
  const borderColor = isDarkMode ? 'border-gray-600' : 'border-gray-300';
  const focusBorderColor = isDarkMode ? 'focus:border-blue-500' : 'focus:border-blue-600';

  return (
    <div className="relative mb-6">
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
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          type="text"
          placeholder={isFocused || !value ? placeholder : ''}
          disabled={disabled}
          className={`block w-full ${bgColor} ${textColor} border ${borderColor} ${focusBorderColor} text-[11px] tracking-widest rounded-lg px-3 py-2.5 leading-tight outline-none transition-all duration-200 ${
            icon ? 'pl-10' : ''
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${error ? 'border-red-600' : ''}`}
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

export default Text;