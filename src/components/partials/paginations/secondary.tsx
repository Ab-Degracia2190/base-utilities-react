import React from 'react';

interface SecondaryPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPageInfo?: boolean;
  showJumpToPage?: boolean;
  itemsPerPage?: number;
  totalItems?: number;
  showItemsCount?: boolean;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
}

const SecondaryPagination: React.FC<SecondaryPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showPageInfo = true,
  showJumpToPage = true,
  itemsPerPage = 10,
  totalItems,
  showItemsCount = true,
  onItemsPerPageChange
}) => {
  const [jumpToPage, setJumpToPage] = React.useState('');
  const [itemsPerPageValue, setItemsPerPageValue] = React.useState(itemsPerPage.toString());

  const handleJumpToPage = () => {
    const page = parseInt(jumpToPage);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      onPageChange(page);
      setJumpToPage('');
    }
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPageValue(value);
    const newItemsPerPage = parseInt(value);
    if (!isNaN(newItemsPerPage) && onItemsPerPageChange) {
      onItemsPerPageChange(newItemsPerPage);
    }
  };

  const getVisiblePages = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisible = 7;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      if (currentPage <= 4) {
        for (let i = 2; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();
  const startItem = totalItems ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endItem = totalItems ? Math.min(currentPage * itemsPerPage, totalItems) : 0;

  return (
    <div className="flex flex-col items-center space-y-3 md:space-y-4 w-full">
      {(showPageInfo || (showItemsCount && totalItems)) && (
        <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-4 text-[8px] md:text-xs text-gray-600 dark:text-gray-400 text-center">
          {showPageInfo && <span>Page {currentPage} of {totalPages}</span>}
          {showItemsCount && totalItems && <span>{startItem}-{endItem} of {totalItems} items</span>}
        </div>
      )}
      
      {/* Responsive pagination layout */}
      <div className="flex flex-wrap items-center justify-center gap-1 md:gap-2">
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 md:px-4 py-1.5 md:py-2 text-[8px] md:text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:transform-none shadow-md hover:shadow-lg min-w-[50px] md:min-w-[60px]"
        >
          <span className="hidden sm:inline">Previous</span>
          <span className="sm:hidden">←</span>
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
                      ? 'bg-blue-600 text-white dark:bg-blue-500 shadow-md'
                      : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 hover:shadow-sm'
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
          className="px-2 md:px-4 py-1.5 md:py-2 text-[8px] md:text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:transform-none shadow-md hover:shadow-lg min-w-[50px] md:min-w-[60px]"
        >
          <span className="hidden sm:inline">Next</span>
          <span className="sm:hidden">→</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
        {showJumpToPage && (
          <div className="flex items-center space-x-1 md:space-x-2">
            <label className="text-[8px] md:text-xs text-gray-600 dark:text-gray-400">Go to page:</label>
            <input
              type="number"
              min="1"
              max={totalPages}
              value={jumpToPage}
              onChange={(e) => setJumpToPage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleJumpToPage()}
              className="w-10 md:w-16 px-1.5 md:px-2 py-1 text-[8px] md:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              placeholder="1"
            />
            <button
              onClick={handleJumpToPage}
              className="px-1.5 md:px-3 py-1 text-[8px] md:text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-800 transition-colors duration-200 min-w-[40px] md:min-w-[50px]"
            >
              Go
            </button>
          </div>
        )}

        {totalItems && onItemsPerPageChange && (
          <div className="flex items-center space-x-1 md:space-x-2">
            <label className="text-[8px] md:text-xs text-gray-600 dark:text-gray-400">Items per page:</label>
            <select
              value={itemsPerPageValue}
              onChange={(e) => handleItemsPerPageChange(e.target.value)}
              className="px-1.5 md:px-2 py-1 text-[8px] md:text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white min-w-[50px]"
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

export default SecondaryPagination;