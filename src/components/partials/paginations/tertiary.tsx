import React from 'react';

interface TertiaryPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
  totalItems?: number;
  showItemsCount?: boolean;
  compact?: boolean;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
}

const TertiaryPagination: React.FC<TertiaryPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage = 10,
  totalItems,
  showItemsCount = true,
  compact = false,
  onItemsPerPageChange
}) => {
  const [itemsPerPageValue, setItemsPerPageValue] = React.useState(itemsPerPage.toString());

  const startItem = totalItems ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endItem = totalItems ? Math.min(currentPage * itemsPerPage, totalItems) : 0;

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPageValue(value);
    const newItemsPerPage = parseInt(value);
    if (!isNaN(newItemsPerPage) && onItemsPerPageChange) {
      onItemsPerPageChange(newItemsPerPage);
    }
  };

  const getAdjacentPages = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    
    pages.push(currentPage);
    
    if (currentPage > 1) {
      pages.unshift(currentPage - 1);
    }
    
    if (currentPage < totalPages) {
      pages.push(currentPage + 1);
    }
    
    if (typeof pages[0] === 'number' && pages[0] > 2) {
      pages.unshift(1);
      if (typeof pages[1] === 'number' && pages[1] > 2) {
        pages.splice(1, 0, '...');
      }
    }
    
    const lastIndex = pages.length - 1;
    if (typeof pages[lastIndex] === 'number' && pages[lastIndex] < totalPages - 1) {
      pages.push(totalPages);
      if (typeof pages[lastIndex] === 'number' && pages[lastIndex] < totalPages - 1) {
        pages.splice(lastIndex + 1, 0, '...');
      }
    }
    
    return pages;
  };

  const visiblePages = getAdjacentPages();

  if (compact) {
    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-1 md:space-x-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1.5 md:p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110 disabled:transform-none"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="flex items-center space-x-0.5 md:space-x-1">
            {visiblePages.map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="px-1 md:px-2 text-[10px] md:text-xs text-gray-500 dark:text-gray-400">...</span>
                ) : (
                  <button
                    onClick={() => onPageChange(page as number)}
                    className={`w-6 h-6 md:w-8 md:h-8 text-[10px] md:text-sm font-medium rounded-full transition-all duration-200 transform hover:scale-110 ${
                      currentPage === page
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                    }`}
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-1.5 md:p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110 disabled:transform-none"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          {showItemsCount && totalItems && (
            <div className="text-[10px] md:text-xs text-gray-600 dark:text-gray-400">
              {startItem}-{endItem} of {totalItems}
            </div>
          )}
          
          {totalItems && onItemsPerPageChange && (
            <div className="flex items-center space-x-1 md:space-x-2">
              <label className="text-[10px] md:text-xs text-gray-600 dark:text-gray-400">Per page:</label>
              <select
                value={itemsPerPageValue}
                onChange={(e) => handleItemsPerPageChange(e.target.value)}
                className="px-1.5 md:px-2 py-1 text-[10px] md:text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-3 md:space-y-4 w-full">
      {(showItemsCount && totalItems) && (
        <div className="text-[8px] md:text-xs text-gray-600 dark:text-gray-400 text-center">
          Showing {startItem}-{endItem} of {totalItems} items
        </div>
      )}

      {/* Responsive pagination layout */}
      <div className="flex flex-wrap items-center justify-center gap-1 md:gap-2">
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center px-1.5 md:px-3 py-1.5 md:py-2 text-[8px] md:text-sm font-medium text-indigo-600 border border-indigo-300 rounded-lg hover:bg-indigo-50 dark:text-indigo-400 dark:border-indigo-600 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:transform-none min-w-[60px] md:min-w-[80px]"
        >
          <svg className="w-2.5 h-2.5 md:w-4 md:h-4 mr-0.5 md:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* Page numbers */}
        <div className="flex items-center space-x-0.5 md:space-x-1">
          {visiblePages.map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className="px-1.5 md:px-3 text-[8px] md:text-xs text-gray-500 dark:text-gray-400">...</span>
              ) : (
                <button
                  onClick={() => onPageChange(page as number)}
                  className={`px-1.5 md:px-3 py-1.5 md:py-2 text-[8px] md:text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105 min-w-[32px] md:min-w-[40px] ${
                    currentPage === page
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 hover:shadow-sm'
                  }`}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center px-1.5 md:px-3 py-1.5 md:py-2 text-[8px] md:text-sm font-medium text-indigo-600 border border-indigo-300 rounded-lg hover:bg-indigo-50 dark:text-indigo-400 dark:border-indigo-600 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:transform-none min-w-[60px] md:min-w-[80px]"
        >
          <span className="hidden sm:inline">Next</span>
          <svg className="w-2.5 h-2.5 md:w-4 md:h-4 ml-0.5 md:ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
        {totalItems && onItemsPerPageChange && (
          <div className="flex items-center space-x-1 md:space-x-2">
            <label className="text-[8px] md:text-xs text-gray-600 dark:text-gray-400">Items per page:</label>
            <select
              value={itemsPerPageValue}
              onChange={(e) => handleItemsPerPageChange(e.target.value)}
              className="px-1.5 md:px-2 py-1 text-[8px] md:text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white min-w-[50px]"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default TertiaryPagination;