import { useState, useEffect } from 'react';
import { Text, Number, DatePicker, DateRangePicker } from "@/components/partials/inputs";
import { 
  dateConverter, 
  timeConverter, 
  dateTimeConverter, 
  convertDateRangeToEpoch 
} from "@/base/formatters/date-formatter";
import { 
  queryFormatter, 
  middleInitial, 
  upperCaseFormatter, 
  lowerCaseFormatter, 
  capitalizeFirstLetter 
} from "@/base/formatters/text-formatter";
import { formatAmount } from "@/base/formatters/number-formatter";

const Formatters = () => {
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

  // Text formatter states
  const [textInput, setTextInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  
  // Date formatter states
  const [dateInput, setDateInput] = useState('');
  const [dateRangeInput, setDateRangeInput] = useState('');
  const [epochTime] = useState(Date.now());
  
  // Number formatter states
  const [numberInput, setNumberInput] = useState('');
  const [amountInput, setAmountInput] = useState('');

  // Parse date to epoch for demonstration
  const parseInputToEpoch = (dateStr: string): number => {
    if (!dateStr) return Date.now();
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? Date.now() : date.getTime();
  };

  const selectedEpoch = dateInput ? parseInputToEpoch(dateInput) : epochTime;

  return (
    <div className={`min-h-screen py-8 px-4 transition-colors duration-200`}>
      <div className="max-w-4xl mx-auto">
        <h1 className={`text-lg md:text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Formatters Demo
        </h1>
        <p className={`mb-8 text-[10px] md:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Interactive demonstration of all formatter utilities
        </p>

        <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <p className="text-[10px] md:text-sm text-blue-800 dark:text-blue-200">
            <strong>File Structure:</strong><br/>
            📁 base/formatters/<br/>
            ├── date-formatter.ts<br/>
            ├── number-formatter.ts<br/>
            ├── text-formatter.ts<br/>
            └── index.ts (exports all formatters)
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* TEXT FORMATTERS SECTION */}
          <div className={`rounded-lg shadow-md p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-sm md:text-xl font-semibold mb-4 border-b pb-2 ${isDarkMode ? 'text-white border-gray-700' : 'text-gray-800 border-gray-200'}`}>
              📝 Text Formatters
            </h2>
            
            <div className="space-y-4">
              <Text
                label="TEXT INPUT"
                value={textInput}
                onChange={setTextInput}
                placeholder="Enter text to format..."
                isDarkMode={isDarkMode}
              />

              <div className={`rounded-lg p-4 space-y-3 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <div className="flex justify-between items-center">
                  <span className={`text-[10px] md:text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    UPPERCASE:
                  </span>
                  <span className={`text-[10px] md:text-sm font-mono ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    {upperCaseFormatter(textInput) || '—'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className={`text-[10px] md:text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    LOWERCASE:
                  </span>
                  <span className={`text-[10px] md:text-sm font-mono ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    {lowerCaseFormatter(textInput) || '—'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className={`text-[10px] md:text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    CAPITALIZE FIRST:
                  </span>
                  <span className={`text-[10px] md:text-sm font-mono ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    {capitalizeFirstLetter(textInput) || '—'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className={`text-[10px] md:text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    QUERY FORMAT:
                  </span>
                  <span className={`text-[10px] md:text-sm font-mono ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    {queryFormatter(textInput) || '—'}
                  </span>
                </div>
              </div>

              <Text
                label="FULL NAME (FOR MIDDLE INITIAL)"
                value={nameInput}
                onChange={setNameInput}
                placeholder="Enter full name..."
                isDarkMode={isDarkMode}
              />

              <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <div className="flex justify-between items-center">
                  <span className={`text-[10px] md:text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    MIDDLE INITIAL:
                  </span>
                  <span className={`text-[10px] md:text-sm font-mono ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    {middleInitial(nameInput) || '—'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* NUMBER FORMATTERS SECTION */}
          <div className={`rounded-lg shadow-md p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-sm md:text-xl font-semibold mb-4 border-b pb-2 ${isDarkMode ? 'text-white border-gray-700' : 'text-gray-800 border-gray-200'}`}>
              🔢 Number Formatters
            </h2>
            
            <div className="space-y-4">
              <Number
                label="NUMBER INPUT"
                value={numberInput}
                onChange={setNumberInput}
                placeholder="Enter numbers only..."
                isDarkMode={isDarkMode}
              />

              <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <div className="flex justify-between items-center">
                  <span className={`text-[10px] md:text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    PARSED VALUE:
                  </span>
                  <span className={`text-[10px] md:text-sm font-mono ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    {numberInput ? formatAmount(numberInput) : '—'}
                  </span>
                </div>
              </div>

              <Text
                label="AMOUNT INPUT (WITH DECIMALS)"
                value={amountInput}
                onChange={setAmountInput}
                placeholder="Enter amount (e.g., 1234.56)..."
                isDarkMode={isDarkMode}
              />

              <div className={`rounded-lg p-4 space-y-3 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <div className="flex justify-between items-center">
                  <span className={`text-[10px] md:text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    FORMATTED AMOUNT:
                  </span>
                  <span className={`text-[10px] md:text-sm font-mono ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    {amountInput ? formatAmount(amountInput).toFixed(2) : '—'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className={`text-[10px] md:text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    WITH CURRENCY:
                  </span>
                  <span className={`text-[10px] md:text-sm font-mono ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                    {amountInput ? `$${formatAmount(amountInput).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '—'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* DATE FORMATTERS SECTION */}
          <div className={`rounded-lg shadow-md p-6 lg:col-span-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-sm md:text-xl font-semibold mb-4 border-b pb-2 ${isDarkMode ? 'text-white border-gray-700' : 'text-gray-800 border-gray-200'}`}>
              📅 Date Formatters
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <DatePicker
                  label="SELECT DATE"
                  value={dateInput}
                  onChange={setDateInput}
                  placeholder="Choose a date..."
                  isDarkMode={isDarkMode}
                />

                <div className={`border rounded-lg p-4 ${isDarkMode ? 'bg-blue-900/30 border-blue-800' : 'bg-blue-50 border-blue-200'}`}>
                  <div className={`text-[10px] md:text-xs font-semibold mb-2 ${isDarkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                    EPOCH TIME:
                  </div>
                  <div className={`text-sm md:text-lg font-mono ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    {selectedEpoch}
                  </div>
                </div>
              </div>

              <div className={`rounded-lg p-4 space-y-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <div>
                  <span className={`text-[10px] md:text-xs font-semibold block mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    DATE ONLY:
                  </span>
                  <span className={`text-[10px] md:text-base font-mono ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    {dateConverter(selectedEpoch)}
                  </span>
                </div>
                
                <div>
                  <span className={`text-[10px] md:text-xs font-semibold block mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    TIME ONLY:
                  </span>
                  <span className={`text-[10px] md:text-base font-mono ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    {timeConverter(selectedEpoch)}
                  </span>
                </div>
                
                <div>
                  <span className={`text-[10px] md:text-xs font-semibold block mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    DATE & TIME:
                  </span>
                  <span className={`text-[10px] md:text-base font-mono ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    {dateTimeConverter(selectedEpoch)}
                  </span>
                </div>
              </div>
            </div>

            {/* DATE RANGE PICKER SECTION */}
            <div className="mt-6">
              <DateRangePicker
                label="SELECT DATE RANGE"
                value={dateRangeInput}
                onChange={setDateRangeInput}
                placeholder="Choose a date range..."
                isDarkMode={isDarkMode}
              />
            </div>

            {/* DATE RANGE CONVERTER OUTPUT */}
            {dateRangeInput && (
              <div className={`mt-4 border rounded-lg p-4 ${isDarkMode ? 'bg-yellow-900/30 border-yellow-800' : 'bg-yellow-50 border-yellow-200'}`}>
                <h3 className={`text-[10px] md:text-sm font-semibold mb-3 ${isDarkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>
                  📊 Date Range Converter Output
                </h3>
                <div className="space-y-2">
                  <div className={`text-[10px] md:text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <span className="font-semibold">Input:</span> {dateRangeInput}
                  </div>
                  <div className={`text-[10px] md:text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <span className="font-semibold">Output:</span>
                    <pre className={`mt-1 p-2 rounded text-[10px] md:text-xs overflow-x-auto ${isDarkMode ? 'bg-gray-950 text-gray-300' : 'bg-white text-gray-900'}`}>
                      {JSON.stringify(convertDateRangeToEpoch(dateRangeInput), null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* LIVE EXAMPLES SECTION */}
          <div className={`rounded-lg shadow-md p-6 lg:col-span-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-sm md:text-xl font-semibold mb-4 border-b pb-2 ${isDarkMode ? 'text-white border-gray-700' : 'text-gray-800 border-gray-200'}`}>
              💡 Live Examples & Use Cases
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-gradient-to-br from-purple-900/50 to-purple-800/50' : 'bg-gradient-to-br from-purple-50 to-purple-100'}`}>
                <h3 className={`text-[10px] md:text-sm font-bold mb-2 ${isDarkMode ? 'text-purple-300' : 'text-purple-800'}`}>
                  Search Query
                </h3>
                <div className={`text-[10px] md:text-xs mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                  Input: "hello world example"
                </div>
                <div className={`text-[10px] md:text-xs font-mono p-2 rounded ${isDarkMode ? 'bg-gray-950 text-purple-400' : 'bg-white text-purple-600'}`}>
                  {queryFormatter("hello world example")}
                </div>
              </div>

              <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-gradient-to-br from-green-900/50 to-green-800/50' : 'bg-gradient-to-br from-green-50 to-green-100'}`}>
                <h3 className={`text-[10px] md:text-sm font-bold mb-2 ${isDarkMode ? 'text-green-300' : 'text-green-800'}`}>
                  Name Format
                </h3>
                <div className={`text-[10px] md:text-xs mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                  Input: "John Michael Doe"
                </div>
                <div className={`text-[10px] md:text-xs font-mono p-2 rounded ${isDarkMode ? 'bg-gray-950 text-green-400' : 'bg-white text-green-600'}`}>
                  M. (Middle Initial)
                </div>
              </div>

              <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-gradient-to-br from-orange-900/50 to-orange-800/50' : 'bg-gradient-to-br from-orange-50 to-orange-100'}`}>
                <h3 className={`text-[10px] md:text-sm font-bold mb-2 ${isDarkMode ? 'text-orange-300' : 'text-orange-800'}`}>
                  Amount Display
                </h3>
                <div className={`text-[10px] md:text-xs mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                  Input: "1234567.89"
                </div>
                <div className={`text-[10px] md:text-xs font-mono p-2 rounded ${isDarkMode ? 'bg-gray-950 text-orange-400' : 'bg-white text-orange-600'}`}>
                  $1,234,567.89
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Formatters;