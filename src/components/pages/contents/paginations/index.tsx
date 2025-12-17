import { useState, useEffect } from 'react';
import { PrimaryPagination, SecondaryPagination, TertiaryPagination } from '@/components/partials/paginations';

const Paginations = () => {
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

  // Pagination state
  const [primaryCurrentPage, setPrimaryCurrentPage] = useState(3);
  const [primaryItemsPerPage, setPrimaryItemsPerPage] = useState(10);
  
  const [secondaryCurrentPage, setSecondaryCurrentPage] = useState(5);
  const [secondaryItemsPerPage, setSecondaryItemsPerPage] = useState(10);
  
  const [tertiaryCurrentPage, setTertiaryCurrentPage] = useState(2);
  const [tertiaryItemsPerPage, setTertiaryItemsPerPage] = useState(10);
  
  const [compactCurrentPage, setCompactCurrentPage] = useState(4);
  const [compactItemsPerPage, setCompactItemsPerPage] = useState(10);

  const totalItems = 95;
  
  // Calculate totalPages based on itemsPerPage
  const getTotalPages = (itemsPerPage: number) => Math.ceil(totalItems / itemsPerPage);
  
  const primaryTotalPages = getTotalPages(primaryItemsPerPage);
  const secondaryTotalPages = getTotalPages(secondaryItemsPerPage);
  const tertiaryTotalPages = getTotalPages(tertiaryItemsPerPage);
  const compactTotalPages = getTotalPages(compactItemsPerPage);

  return (
    <div className={`min-h-screen p-4 md:p-8 transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h1 className={`text-lg md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Pagination Component Variants
          </h1>
        </div>

        <div className={`mb-6 md:mb-8 p-3 md:p-4 rounded-lg ${isDarkMode ? 'bg-blue-900' : 'bg-blue-50'}`}>
          <p className={`text-[10px] md:text-sm ${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>
            <strong>File Structure:</strong><br/>
            📁 paginations/<br/>
            ├── primary.tsx<br/>
            ├── secondary.tsx<br/>
            ├── tertiary.tsx<br/>
            └── index.tsx (exports all components)
          </p>
        </div>

        {/* Primary Pagination */}
        <section className={`mb-6 md:mb-8 p-4 md:p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-sm md:text-2xl font-semibold mb-3 md:mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Primary Pagination <span className={`text-[10px] md:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>(primary.tsx)</span>
          </h2>
          <p className={`text-xs md:text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Classic pagination with gradient active page and First/Last navigation buttons.
          </p>
          <div className="space-y-4">
            <div>
              <p className={`text-[10px] md:text-xs mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Current page: {primaryCurrentPage}</p>
              <PrimaryPagination
                currentPage={primaryCurrentPage}
                totalPages={primaryTotalPages}
                onPageChange={setPrimaryCurrentPage}
                showPreviousNext={true}
                showFirstLast={true}
                maxVisiblePages={5}
                itemsPerPage={primaryItemsPerPage}
                totalItems={totalItems}
                showItemsCount={true}
                onItemsPerPageChange={setPrimaryItemsPerPage}
              />
            </div>
          </div>
        </section>

        {/* Secondary Pagination */}
        <section className={`mb-6 md:mb-8 p-4 md:p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-sm md:text-2xl font-semibold mb-3 md:mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Secondary Pagination <span className={`text-[10px] md:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>(secondary.tsx)</span>
          </h2>
          <p className={`text-xs md:text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Blue-themed pagination with page info and jump-to-page functionality.
          </p>
          <div className="space-y-4">
            <div>
              <p className={`text-[10px] md:text-xs mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Current page: {secondaryCurrentPage}</p>
              <SecondaryPagination
                currentPage={secondaryCurrentPage}
                totalPages={secondaryTotalPages}
                onPageChange={setSecondaryCurrentPage}
                showPageInfo={true}
                showJumpToPage={true}
                itemsPerPage={secondaryItemsPerPage}
                totalItems={totalItems}
                showItemsCount={true}
                onItemsPerPageChange={setSecondaryItemsPerPage}
              />
            </div>
          </div>
        </section>

        {/* Tertiary Pagination - Full Version */}
        <section className={`mb-6 md:mb-8 p-4 md:p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-sm md:text-2xl font-semibold mb-3 md:mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Tertiary Pagination (Full) <span className={`text-[10px] md:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>(tertiary.tsx)</span>
          </h2>
          <p className={`text-xs md:text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Indigo-themed pagination with item count display and items-per-page selector.
          </p>
          <div className="space-y-4">
            <div>
              <p className={`text-[10px] md:text-xs mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Current page: {tertiaryCurrentPage}</p>
              <TertiaryPagination
                currentPage={tertiaryCurrentPage}
                totalPages={tertiaryTotalPages}
                onPageChange={setTertiaryCurrentPage}
                itemsPerPage={tertiaryItemsPerPage}
                totalItems={totalItems}
                showItemsCount={true}
                compact={false}
                onItemsPerPageChange={setTertiaryItemsPerPage}
              />
            </div>
          </div>
        </section>

        {/* Tertiary Pagination - Compact Version */}
        <section className={`mb-6 md:mb-8 p-4 md:p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-sm md:text-2xl font-semibold mb-3 md:mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Tertiary Pagination (Compact) <span className={`text-[10px] md:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>(tertiary.tsx)</span>
          </h2>
          <p className={`text-xs md:text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Compact version with circular page buttons and horizontal layout.
          </p>
          <div className="space-y-4">
            <div>
              <p className={`text-[10px] md:text-xs mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Current page: {compactCurrentPage}</p>
              <TertiaryPagination
                currentPage={compactCurrentPage}
                totalPages={compactTotalPages}
                onPageChange={setCompactCurrentPage}
                itemsPerPage={compactItemsPerPage}
                totalItems={totalItems}
                showItemsCount={true}
                compact={true}
                onItemsPerPageChange={setCompactItemsPerPage}
              />
            </div>
          </div>
        </section>

        {/* Current Values */}
        <section className={`p-4 md:p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <h2 className={`text-sm md:text-xl font-semibold mb-3 md:mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Current Values:</h2>
          <pre className={`text-[9px] md:text-xs p-3 md:p-4 rounded overflow-auto ${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-white text-gray-900'} max-h-64`}>
{JSON.stringify({
  primaryPagination: {
    currentPage: primaryCurrentPage,
    totalPages: primaryTotalPages,
    itemsPerPage: primaryItemsPerPage,
    totalItems: totalItems
  },
  secondaryPagination: {
    currentPage: secondaryCurrentPage,
    totalPages: secondaryTotalPages,
    itemsPerPage: secondaryItemsPerPage,
    totalItems: totalItems
  },
  tertiaryPagination: {
    currentPage: tertiaryCurrentPage,
    totalPages: tertiaryTotalPages,
    itemsPerPage: tertiaryItemsPerPage,
    totalItems: totalItems
  },
  compactPagination: {
    currentPage: compactCurrentPage,
    totalPages: compactTotalPages,
    itemsPerPage: compactItemsPerPage,
    totalItems: totalItems
  }
}, null, 2)}
          </pre>
        </section>
      </div>
    </div>
  );
};

export default Paginations;