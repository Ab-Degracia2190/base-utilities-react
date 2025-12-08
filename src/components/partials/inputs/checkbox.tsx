interface CheckboxProps {
  name: string;
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  isDarkMode?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  name,
  label,
  checked,
  onChange,
  required = false,
  disabled = false,
  error,
  isDarkMode = false
}) => {
  const textColor = isDarkMode ? 'text-gray-300' : 'text-gray-900';

  return (
    <div>
      <label className={`flex items-center cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        <input
          className="cursor-pointer w-4 h-4"
          type="checkbox"
          name={name}
          id={name}
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              !disabled && onChange(!checked);
            }
          }}
        />
        <span className={`text-[11px] tracking-widest w-full ml-2 ${textColor}`}>
          {label}
          {required && <span className="text-red-600">*</span>}
        </span>
      </label>
      {error && (
        <div className="text-red-600 text-[10px] tracking-widest font-normal pl-5 mt-1">
          {error}
        </div>
      )}
    </div>
  );
};

export default Checkbox;