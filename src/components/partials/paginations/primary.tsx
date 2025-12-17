import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PrimaryPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPreviousNext?: boolean;
  showFirstLast?: boolean;
  maxVisiblePages?: number;
  itemsPerPage?: number;
  totalItems?: number;
  showItemsCount?: boolean;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
}

const PrimaryPagination: React.FC<PrimaryPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showPreviousNext = true,
  showFirstLast = true,
  maxVisiblePages = 5,
  itemsPerPage = 10,
  totalItems,
  showItemsCount = true,
  onItemsPerPageChange
}) => {
  const [itemsPerPageValue, setItemsPerPageValue] = React.useState(itemsPerPage.toString());

  const getVisiblePages = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const visiblePages = getVisiblePages();

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPageValue(value);
    const newItemsPerPage = parseInt(value);
    if (!isNaN(newItemsPerPage) && onItemsPerPageChange) {
      onItemsPerPageChange(newItemsPerPage);
    }
  };

  const startItem = totalItems ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endItem = totalItems ? Math.min(currentPage * itemsPerPage, totalItems) : 0;

  return (
    <div className="flex flex-col items-center space-y-3 md:space-y-4 w-full">
      {showItemsCount && totalItems && (
        <div className="text-[8px] md:text-xs text-gray-600 dark:text-gray-400 text-center">
          Showing {startItem}-{endItem} of {totalItems} items
        </div>
      )}
      
      {/* Responsive pagination layout */}
      <div className="flex flex-wrap items-center justify-center gap-1 md:gap-2">
        {/* First and Previous buttons */}
        {showFirstLast && (
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="px-1.5 md:px-3 py-1 md:py-2 text-[8px] md:text-xs font-medium text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 min-w-[60px] md:min-w-[70px]"
          >
            <span className="hidden sm:inline">First</span>
            <ChevronsLeft className="sm:hidden w-3 h-3 mx-auto" />
          </button>
        )}

        {showPreviousNext && (
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-1.5 md:px-3 py-1 md:py-2 text-[8px] md:text-xs font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 min-w-[50px] md:min-w-[60px]"
          >
            <span className="hidden sm:inline">Prev</span>
            <ChevronLeft className="sm:hidden w-3 h-3 mx-auto" />
          </button>
        )}

        {/* Page numbers with responsive display */}
        <div className="flex items-center space-x-0.5 md:space-x-1">
          {visiblePages.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-1.5 md:px-3 py-1 md:py-2 text-[8px] md:text-xs font-medium border transition-all duration-200 min-w-[32px] md:min-w-[40px] ${
                currentPage === page
                  ? 'bg-gradient-to-r from-rose-400 to-orange-300 dark:from-rose-500 dark:to-orange-400 text-white border-rose-400 dark:border-rose-500 transform scale-105 shadow-md'
                  : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white hover:shadow-sm'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next and Last buttons */}
        {showPreviousNext && (
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-1.5 md:px-3 py-1 md:py-2 text-[8px] md:text-xs font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 min-w-[50px] md:min-w-[60px]"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="sm:hidden w-3 h-3 mx-auto" />
          </button>
        )}

        {showFirstLast && (
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="px-1.5 md:px-3 py-1 md:py-2 text-[8px] md:text-xs font-medium text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 min-w-[60px] md:min-w-[70px]"
          >
            <span className="hidden sm:inline">Last</span>
            <ChevronsRight className="sm:hidden w-3 h-3 mx-auto" />
          </button>
        )}
      </div>

      {totalItems && onItemsPerPageChange && (
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <label className="text-[8px] md:text-xs text-gray-600 dark:text-gray-400">Items per page:</label>
          <select
            value={itemsPerPageValue}
            onChange={(e) => handleItemsPerPageChange(e.target.value)}
            className="px-2 py-1 text-[8px] md:text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white min-w-[60px]"
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
  );
};

export default PrimaryPagination;