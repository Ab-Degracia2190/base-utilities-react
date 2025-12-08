import { useState, useEffect } from 'react';
import { Text, Email, Password, Number, TextArea, AutoSuggest, Checkbox, Dropdown, DatePicker, DateRangePicker } from '@/components/partials/inputs';

const Inputs = () => {
  // Get theme from localStorage
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check localStorage for theme on mount
    const theme = localStorage.getItem('theme');
    setIsDarkMode(theme === 'dark');

    // Listen for theme changes
    const handleStorageChange = () => {
      const theme = localStorage.getItem('theme');
      setIsDarkMode(theme === 'dark');
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom theme change events
    const handleThemeChange = (e: CustomEvent) => {
      setIsDarkMode(e.detail === 'dark');
    };
    window.addEventListener('themeChange' as any, handleThemeChange as any);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('themeChange' as any, handleThemeChange as any);
    };
  }, []);
  
  // State management for all inputs
  const [textValue, setTextValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [numberValue, setNumberValue] = useState('');
  const [textAreaValue, setTextAreaValue] = useState('');
  const [autoSuggestValue, setAutoSuggestValue] = useState('');
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [dropdownValue, setDropdownValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [dateRangeValue, setDateRangeValue] = useState('');

  const suggestions = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'];
  const dropdownOptions = [
    { name: 'Option 1', value: '1' },
    { name: 'Option 2', value: '2' },
    { name: 'Option 3', value: '3' },
  ];

  return (
    <div className={`min-h-screen p-8 transition-colors duration-200`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-lg md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Input Component Variants
          </h1>
        </div>

        <div className={`mb-8 p-4 rounded-lg ${isDarkMode ? 'bg-blue-900' : 'bg-blue-50'}`}>
          <p className={`text-[10px] md:text-sm ${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>
            <strong>File Structure:</strong><br/>
            📁 inputs/<br/>
            ├── auto-suggest.tsx<br/>
            ├── checkbox.tsx<br/>
            ├── dropdown.tsx<br/>
            ├── date-picker.tsx<br/>
            ├── date-range-picker.tsx<br/>
            ├── email.tsx<br/>
            ├── password.tsx<br/>
            ├── text.tsx<br/>
            ├── number.tsx<br/>
            ├── text-area.tsx<br/>
            └── index.tsx (exports all components)
          </p>
        </div>

        {/* Text Input */}
        <section className={`mb-8 p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-sm md:text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Text Input <span className={`text-[10px] md:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>(text.tsx)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Text
              label="Full Name"
              value={textValue}
              onChange={setTextValue}
              placeholder="Enter your name"
              required
              isDarkMode={isDarkMode}
            />
            <Text
              label="Disabled"
              value="Disabled value"
              onChange={() => {}}
              placeholder="Disabled"
              disabled
              isDarkMode={isDarkMode}
            />
          </div>
        </section>

        {/* Email Input */}
        <section className={`mb-8 p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-sm md:text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Email Input <span className={`text-[10px] md:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>(email.tsx)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Email
              label="Email Address"
              value={emailValue}
              onChange={setEmailValue}
              placeholder="Enter your email"
              required
              isDarkMode={isDarkMode}
            />
            <Email
              label="With Error"
              value=""
              onChange={() => {}}
              placeholder="Email with error"
              error="Invalid email format"
              isDarkMode={isDarkMode}
            />
          </div>
        </section>

        {/* Password Input */}
        <section className={`mb-8 p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-sm md:text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Password Input <span className={`text-[10px] md:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>(password.tsx)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Password
              label="Password"
              value={passwordValue}
              onChange={setPasswordValue}
              placeholder="Enter password"
              required
              isDarkMode={isDarkMode}
            />
            <Password
              label="Confirm Password"
              value=""
              onChange={() => {}}
              placeholder="Confirm password"
              error="Passwords do not match"
              isDarkMode={isDarkMode}
            />
          </div>
        </section>

        {/* Number Input */}
        <section className={`mb-8 p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-sm md:text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Number Input <span className={`text-[10px] md:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>(number.tsx)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Number
              label="Age"
              value={numberValue}
              onChange={setNumberValue}
              placeholder="Enter your age"
              required
              isDarkMode={isDarkMode}
            />
            <Number
              label="Working Hours"
              value=""
              onChange={() => {}}
              placeholder="1-9 only"
              fieldType="working_hours"
              isDarkMode={isDarkMode}
            />
          </div>
        </section>

        {/* TextArea */}
        <section className={`mb-8 p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-sm md:text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            TextArea <span className={`text-[10px] md:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>(text-area.tsx)</span>
          </h2>
          <TextArea
            label="Description"
            value={textAreaValue}
            onChange={setTextAreaValue}
            placeholder="Enter description"
            required
            isDarkMode={isDarkMode}
          />
        </section>

        {/* AutoSuggest */}
        <section className={`mb-8 p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-sm md:text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            AutoSuggest <span className={`text-[10px] md:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>(auto-suggest.tsx)</span>
          </h2>
          <AutoSuggest
            label="Favorite Fruit"
            value={autoSuggestValue}
            onChange={setAutoSuggestValue}
            placeholder="Type to search..."
            suggestions={suggestions}
            required
            isDarkMode={isDarkMode}
          />
        </section>

        {/* Dropdown */}
        <section className={`mb-8 p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-sm md:text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Dropdown <span className={`text-[10px] md:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>(dropdown.tsx)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Dropdown
              label="Select Option"
              value={dropdownValue}
              onChange={setDropdownValue}
              placeholder="Choose an option"
              options={dropdownOptions}
              required
              isDarkMode={isDarkMode}
            />
            <Dropdown
              label="Disabled"
              value="Option 1"
              onChange={() => {}}
              placeholder="Disabled dropdown"
              options={dropdownOptions}
              disabled
              isDarkMode={isDarkMode}
            />
          </div>
        </section>

        {/* Date Picker */}
        <section className={`mb-8 p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-sm md:text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Date Picker <span className={`text-[10px] md:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>(date-picker.tsx)</span>
          </h2>
          <DatePicker
            label="Select Date"
            value={dateValue}
            onChange={setDateValue}
            placeholder="Pick a date"
            required
            isDarkMode={isDarkMode}
          />
        </section>

        {/* Date Range Picker */}
        <section className={`mb-8 p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-sm md:text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Date Range Picker <span className={`text-[10px] md:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>(date-range-picker.tsx)</span>
          </h2>
          <DateRangePicker
            label="Select Date Range"
            value={dateRangeValue}
            onChange={setDateRangeValue}
            placeholder="Pick date range"
            required
            isDarkMode={isDarkMode}
          />
        </section>

        {/* Checkbox */}
        <section className={`mb-8 p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-sm md:text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Checkbox <span className={`text-[10px] md:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>(checkbox.tsx)</span>
          </h2>
          <div className="space-y-4">
            <Checkbox
              name="terms"
              label="I agree to the terms and conditions"
              checked={checkboxValue}
              onChange={setCheckboxValue}
              required
              isDarkMode={isDarkMode}
            />
            <Checkbox
              name="newsletter"
              label="Subscribe to newsletter"
              checked={false}
              onChange={() => {}}
              isDarkMode={isDarkMode}
            />
            <Checkbox
              name="disabled"
              label="Disabled checkbox"
              checked={true}
              onChange={() => {}}
              disabled
              isDarkMode={isDarkMode}
            />
          </div>
        </section>

        {/* Current Values */}
        <section className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <h2 className={`text-sm md:text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Current Values:</h2>
          <pre className={`text-[10px] md:text-xs p-4 rounded overflow-auto ${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-white text-gray-900'}`}>
{JSON.stringify({
  text: textValue,
  email: emailValue,
  password: passwordValue,
  number: numberValue,
  textArea: textAreaValue,
  autoSuggest: autoSuggestValue,
  dropdown: dropdownValue,
  date: dateValue,
  dateRange: dateRangeValue,
  checkbox: checkboxValue
}, null, 2)}
          </pre>
        </section>
      </div>
    </div>
  );
};

export default Inputs;