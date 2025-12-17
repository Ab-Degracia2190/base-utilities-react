import React, { useState } from 'react';

interface NumberInputProps {
  label?: string;
  value: string | number;
  onChange: (value: string) => void;
  icon?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  fieldType?: string;
}

export const Number: React.FC<NumberInputProps> = ({
  label,
  value,
  onChange,
  icon,
  placeholder = '',
  disabled = false,
  required = false,
  error,
  fieldType = ''
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const validateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/[^0-9]/g, '');
    if (fieldType === 'working_hours' && val.length > 1) {
      val = val.slice(0, 1);
    }
    onChange(val);
  };

  const blockE = (e: React.KeyboardEvent) => {
    if (e.key.toLowerCase() === 'e') {
      e.preventDefault();
    }
  };

  return (
    <div className="relative mb-6">
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
          onChange={validateInput}
          onKeyDown={blockE}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          type="text"
          placeholder={isFocused || !value ? placeholder : ''}
          disabled={disabled}
          className={`block w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:border-blue-600 dark:focus:border-blue-500 text-[11px] tracking-widest rounded-lg px-3 py-2.5 leading-tight outline-none transition-all duration-200 ${
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

export default Number;