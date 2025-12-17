import React, { useState, useRef, useEffect } from 'react';

interface DatePickerProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  placeholder = '',
  disabled = false,
  required = false,
  error
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showMonthsRange, setShowMonthsRange] = useState(false);
  const [showYearsRange, setShowYearsRange] = useState(true);
  const [yearRangeStart, setYearRangeStart] = useState(new Date().getFullYear() - 10);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const today = new Date();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowDatePicker(false);
      }
    };

    if (showDatePicker) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [showDatePicker]);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const startDay = new Date(currentYear, currentMonth, 1).getDay();
  const paddedDays = Array(startDay).fill(null).concat(currentMonthDays);

  const yearsRange = Array.from({ length: 12 }, (_, i) => yearRangeStart + i);

  const selectDate = (day: number) => {
    const selectedDate = new Date(currentYear, currentMonth, day);
    const formatted = selectedDate.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    onChange(formatted);
    setShowDatePicker(false);
  };

  const handleYearRangeUp = () => {
    setYearRangeStart(yearRangeStart - 12);
  };

  const handleYearRangeDown = () => {
    setYearRangeStart(yearRangeStart + 12);
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
        <div
          onClick={() => !disabled && setShowDatePicker(true)}
          className={`flex items-center justify-between bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 text-[11px] tracking-widest rounded-lg px-3 py-2.5 cursor-pointer ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          } ${error ? 'border-red-600' : ''}`}
        >
          <span className={!value ? 'text-gray-400 dark:text-gray-500' : ''}>{value || placeholder}</span>
          <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z" />
            <path clipRule="evenodd" fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" />
          </svg>
        </div>
      </div>
      {error && (
        <div className="text-red-600 text-[10px] tracking-widest font-normal mt-1 pl-1">
          {error}
        </div>
      )}

      {showDatePicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800 shadow-lg rounded-xl z-50 max-w-full max-h-[90vh] overflow-hidden">
            {/* Left Sidebar */}
            <div className="border-gray-300 dark:border-gray-600 md:border-r w-full md:w-32 flex-shrink-0">
              {showMonthsRange && (
                <ul className="flex flex-col text-[11px] tracking-widest py-2 max-h-[300px] md:max-h-full overflow-y-auto">
                  {months.map((month, index) => (
                    <li key={index}>
                      <button
                        onClick={() => {
                          setCurrentMonth(index);
                          setShowMonthsRange(false);
                          setShowYearsRange(true);
                        }}
                        className={`px-6 py-1.5 w-full leading-5 hover:bg-gray-100 dark:hover:bg-gray-700 text-center text-gray-900 dark:text-white ${
                          currentMonth === index ? 'font-semibold' : ''
                        }`}
                      >
                        {month}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {showYearsRange && !showMonthsRange && (
                <div className="flex flex-col">
                  <button
                    onClick={handleYearRangeUp}
                    className="flex items-center justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <svg className="w-5 h-5 text-gray-900 dark:text-white stroke-current" fill="none">
                      <path d="M7 14l5-5 5 5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <ul className="flex flex-col text-[11px] tracking-widest max-h-[300px] md:max-h-full overflow-y-auto">
                    {yearsRange.map((year, index) => (
                      <li key={index}>
                        <button
                          onClick={() => {
                            setCurrentYear(year);
                            setShowYearsRange(false);
                            setShowYearsRange(true);
                          }}
                          className={`px-6 py-1.5 w-full leading-5 hover:bg-gray-100 dark:hover:bg-gray-700 text-center text-gray-900 dark:text-white ${
                            currentYear === year ? 'font-semibold' : ''
                          }`}
                        >
                          {year}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={handleYearRangeDown}
                    className="flex items-center justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <svg className="w-5 h-5 text-gray-900 dark:text-white stroke-current" fill="none">
                      <path d="M7 10l5 5 5-5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Calendar */}
            <div className="flex flex-col px-4 md:px-6 pt-5 pb-6">
              {/* Year selector with full width arrows */}
              <div className="flex items-center justify-between w-full mb-4">
                <button
                  onClick={() => setCurrentYear(currentYear - 1)}
                  className="flex items-center justify-center p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg className="w-5 h-5 text-gray-900 dark:text-white stroke-current" fill="none">
                    <path d="M13.25 8.75L9.75 12l3.5 3.25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    setShowYearsRange(true);
                    setShowMonthsRange(false);
                  }}
                  className="px-4 py-1.5 flex-1 mx-2 leading-5 hover:bg-gray-100 dark:hover:bg-gray-700 text-center text-gray-900 dark:text-white font-semibold text-sm"
                >
                  {currentYear}
                </button>
                <button
                  onClick={() => setCurrentYear(currentYear + 1)}
                  className="flex items-center justify-center p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg className="w-5 h-5 text-gray-900 dark:text-white stroke-current" fill="none">
                    <path d="M10.75 8.75l3.5 3.25-3.5 3.25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              {/* Month selector with full width arrows */}
              <div className="flex items-center justify-between w-full mb-4">
                <button
                  onClick={() => setCurrentMonth((currentMonth - 1 + 12) % 12)}
                  className="flex items-center justify-center p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg className="w-5 h-5 text-gray-900 dark:text-white stroke-current" fill="none">
                    <path d="M13.25 8.75L9.75 12l3.5 3.25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    setShowMonthsRange(true);
                    setShowYearsRange(false);
                  }}
                  className="px-4 py-1.5 flex-1 mx-2 leading-5 hover:bg-gray-100 dark:hover:bg-gray-700 text-center text-gray-900 dark:text-white font-semibold text-sm"
                >
                  {months[currentMonth]}
                </button>
                <button
                  onClick={() => setCurrentMonth((currentMonth + 1) % 12)}
                  className="flex items-center justify-center p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg className="w-5 h-5 text-gray-900 dark:text-white stroke-current" fill="none">
                    <path d="M10.75 8.75l3.5 3.25-3.5 3.25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-[11px] tracking-widest text-center text-gray-900 dark:text-white mb-2">
                <span className="font-semibold">Sun</span>
                <span className="font-semibold">Mon</span>
                <span className="font-semibold">Tue</span>
                <span className="font-semibold">Wed</span>
                <span className="font-semibold">Thu</span>
                <span className="font-semibold">Fri</span>
                <span className="font-semibold">Sat</span>
              </div>

              <div className="grid grid-cols-7 gap-1 text-[11px] tracking-widest text-center text-gray-900 dark:text-white">
                {paddedDays.map((day, index) => (
                  <span
                    key={index}
                    onClick={() => day && selectDate(day)}
                    className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg ${
                      day ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700' : ''
                    } ${
                      day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()
                        ? 'font-semibold bg-blue-100 dark:bg-blue-700'
                        : ''
                    }`}
                  >
                    {day || ''}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;