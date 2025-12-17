import React, { useState, useMemo } from "react";
import {
  Filter,
  Plus,
  Settings,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import SearchInput from "../inputs/search";
import SecondaryButton from "../buttons/secondary";
import Text from "../inputs/text";
import Dropdown from "../inputs/dropdown";
import Checkbox from "../inputs/checkbox";
import SecondaryPagination from "../paginations/secondary";
import PrimaryModal from "../../modals/forms/primary";

interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  inputType?: "text" | "dropdown" | "checkbox";
  dropdownOptions?: { label: string; value: string }[];
  render?: (value: any, row: any) => React.ReactNode;
}

interface SecondaryTableProps {
  data: any[];
  columns: TableColumn[];
  loading?: boolean;
  showSearch?: boolean;
  showFilter?: boolean;
  showCreateButton?: boolean;
  showPagination?: boolean;
  hasAction?: boolean;
  searchableColumns?: string[];
  currentPage?: number;
  totalPages?: number;
  totalItems?: number; // Total count of all items (not just current page)
  onPageChange?: (page: number) => void;
  onCreate?: () => void;
  onView?: (item: any) => void;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  itemsPerPage?: number;
  className?: string;
  defaultVisibleColumns?: string[];
  onSearchChange?: (searchTerm: string) => void;
  onFilterChange?: (filters: Record<string, any>) => void;
  onSortChange?: (column: string, direction: "asc" | "desc") => void;
}

const SecondaryTable: React.FC<SecondaryTableProps> = ({
  data = [],
  columns = [],
  loading = false,
  showSearch = true,
  showFilter = true,
  showCreateButton = true,
  showPagination = true,
  hasAction = true,
  searchableColumns = [],
  currentPage = 1,
  totalPages = 1,
  totalItems,
  onPageChange,
  onCreate,
  onView,
  onEdit,
  onDelete,
  onItemsPerPageChange,
  itemsPerPage = 10,
  className = "",
  defaultVisibleColumns,
  onSearchChange,
  onFilterChange,
  onSortChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(
    defaultVisibleColumns
      ? columns.reduce(
          (acc, col) => ({
            ...acc,
            [col.key]: defaultVisibleColumns.includes(col.key),
          }),
          {}
        )
      : columns.reduce((acc, col) => ({ ...acc, [col.key]: true }), {})
  );
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  // Filter and sort data
  const processedData = useMemo(() => {
    let filtered = [...data];

    // Apply search
    if (searchTerm && searchableColumns.length > 0) {
      filtered = filtered.filter((item) =>
        searchableColumns.some((col) =>
          String(item[col] || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== "" && value !== null && value !== undefined) {
        filtered = filtered.filter((item) =>
          String(item[key] || "")
            .toLowerCase()
            .includes(String(value).toLowerCase())
        );
      }
    });

    // Apply sorting
    if (sortColumn) {
      filtered.sort((a, b) => {
        const aVal = a[sortColumn];
        const bVal = b[sortColumn];

        if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
        if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [data, searchTerm, filters, sortColumn, sortDirection, searchableColumns]);

  const visibleColumnsList = useMemo(
    () => columns.filter((col) => visibleColumns[col.key]),
    [columns, visibleColumns]
  );

  const handleSort = (columnKey: string) => {
    let newDirection: "asc" | "desc" = "asc";
    if (sortColumn === columnKey) {
      newDirection = sortDirection === "asc" ? "desc" : "asc";
    }
    setSortColumn(columnKey);
    setSortDirection(newDirection);
    onSortChange?.(columnKey, newDirection);
  };

  const handleFilterChange = (columnKey: string, value: any) => {
    setFilters((prev) => ({ ...prev, [columnKey]: value }));
    onFilterChange?.(filters);
  };

  const toggleColumnVisibility = (columnKey: string) => {
    setVisibleColumns((prev) => ({ ...prev, [columnKey]: !prev[columnKey] }));
  };

  const toggleRowExpansion = (rowIndex: number) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(rowIndex)) {
        newSet.delete(rowIndex);
      } else {
        newSet.add(rowIndex);
      }
      return newSet;
    });
  };

  // Responsive column management
  const getResponsiveColumns = () => {
    const width = window.innerWidth;
    let maxColumns: number;

    if (width < 480) maxColumns = 1; // Small mobile
    else if (width < 768) maxColumns = 1; // Mobile/Tablet
    else if (width < 1024) maxColumns = 2; // Tablet
    else maxColumns = visibleColumnsList.length; // Desktop

    return visibleColumnsList.slice(0, maxColumns);
  };

  const [responsiveColumns, setResponsiveColumns] = useState(
    getResponsiveColumns()
  );

  React.useEffect(() => {
    const handleResize = () => setResponsiveColumns(getResponsiveColumns());
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [visibleColumnsList]);

  const hasMoreColumns = responsiveColumns.length < visibleColumnsList.length;

  const renderFilterInput = (column: TableColumn) => {
    const value = filters[column.key] || "";

    switch (column.inputType) {
      case "dropdown":
        return (
          <Dropdown
            value={value}
            onChange={(val) => handleFilterChange(column.key, val)}
            placeholder={`Filter by ${column.label}`}
            options={
              column.dropdownOptions?.map((opt) => ({
                name: opt.label,
                value: opt.value,
              })) || []
            }
          />
        );
      case "checkbox":
        return (
          <Checkbox
            name={column.key}
            label={column.label}
            checked={value}
            onChange={(val) => handleFilterChange(column.key, val)}
          />
        );
      default:
        return (
          <Text
            value={value}
            onChange={(val) => handleFilterChange(column.key, val)}
            placeholder={`Filter by ${column.label}`}
          />
        );
    }
  };

  return (
    <div
      className={`bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm ${className}`}
    >
      {/* Header Controls */}
      <div className="p-4 md:p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center justify-between">
          <div className="flex-1 w-full md:max-w-md">
            {showSearch && (
              <SearchInput
                value={searchTerm}
                onChange={(value) => {
                  setSearchTerm(value);
                  onSearchChange?.(value);
                }}
                placeholder="Search records..."
              />
            )}
          </div>

          <div className="flex gap-1 md:gap-2">
            {showFilter && (
              <button
                onClick={() => setShowFilterPanel(!showFilterPanel)}
                className={`p-2 md:py-2 md:px-4 rounded-lg transition-colors border-2 ${
                  showFilterPanel
                    ? "bg-gray-100 dark:bg-gray-700 border-gray-400 dark:border-gray-500 text-gray-700 dark:text-gray-300"
                    : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <Filter className="w-3 h-3 md:w-4 md:h-4" />
              </button>
            )}

            <button
              onClick={() => setShowSettingsModal(true)}
              className={`p-2 md:py-2 md:px-4 rounded-lg transition-colors border-2 ${
                showSettingsModal
                  ? "bg-gray-100 dark:bg-gray-700 border-gray-400 dark:border-gray-500 text-gray-700 dark:text-gray-300"
                  : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              <Settings className="w-3 h-3 md:w-4 md:h-4" />
            </button>

            {showCreateButton && onCreate && (
              <SecondaryButton
                onClick={onCreate}
                className="flex items-center gap-1 md:gap-2 px-2 py-1.5 md:px-5 text-[8px] md:text-xs border-2 border-blue-500 text-blue-600 dark:text-blue-400"
              >
                <Plus className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline font-medium">New Record</span>
              </SecondaryButton>
            )}
          </div>
        </div>

        {/* Filter Panel */}
        {showFilterPanel && (
          <div className="mt-4 md:mt-6 p-3 md:p-5 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
            <h4 className="text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Filter Options
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3">
              {visibleColumnsList
                .filter((col) => col.filterable)
                .map((column) => (
                  <div key={column.key} className="min-w-0">
                    {renderFilterInput(column)}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-700 border-b-2 border-gray-200 dark:border-gray-600">
            <tr>
              {hasMoreColumns && (
                <th className="w-8 px-1 md:px-2 lg:px-3 py-2 md:py-3 text-center text-[10px] md:text-xs font-bold text-gray-600 dark:text-gray-200 uppercase tracking-wider"></th>
              )}
              {responsiveColumns.map((column) => (
                <th
                  key={column.key}
                  className={`px-1 md:px-2 lg:px-3 py-2 md:py-3 text-left text-[10px] md:text-xs font-bold text-gray-600 dark:text-gray-200 uppercase tracking-wider ${
                    column.sortable
                      ? "cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      : ""
                  }`}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center gap-1 md:gap-2">
                    <span className="text-[10px] md:text-xs truncate">{column.label}</span>
                    {column.sortable && (
                      <div className="flex flex-col items-center">
                        {sortColumn === column.key ? (
                          sortDirection === "asc" ? (
                            <ArrowUpDown className="w-3 h-3 rotate-180" />
                          ) : (
                            <ArrowUpDown className="w-3 h-3" />
                          )
                        ) : (
                          <ArrowUpDown className="w-3 h-3 opacity-40" />
                        )}
                      </div>
                    )}
                  </div>
                </th>
              ))}

              {hasAction && (
                <th className="px-1 md:px-2 lg:px-3 py-2 md:py-3 text-left text-[10px] md:text-xs font-bold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
                  <span className="hidden md:inline">Actions</span>
                  <span className="md:hidden">⋮</span>
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {loading ? (
              <tr>
                <td
                  colSpan={
                    responsiveColumns.length +
                    (hasMoreColumns ? 1 : 0) +
                    (hasAction ? 1 : 0)
                  }
                  className="px-6 py-8 text-center"
                >
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 dark:border-blue-400"></div>
                    <span className="ml-3 text-gray-500 dark:text-gray-400">
                      Loading data...
                    </span>
                  </div>
                </td>
              </tr>
            ) : processedData.length === 0 ? (
              <tr>
                <td
                  colSpan={
                    responsiveColumns.length +
                    (hasMoreColumns ? 1 : 0) +
                    (hasAction ? 1 : 0)
                  }
                  className="px-6 py-12 text-center"
                >
                  <div className="text-gray-400 dark:text-gray-500">
                    <div className="text-lg mb-2">No records found</div>
                    <div className="text-sm">
                      Try adjusting your search or filter criteria
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              processedData.map((row, rowIndex) => {
                const isExpanded = expandedRows.has(rowIndex);
                const hiddenColumns = visibleColumnsList.filter(
                  (col) => !responsiveColumns.includes(col)
                );

                return (
                  <React.Fragment key={rowIndex}>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      {hasMoreColumns && (
                        <td className="w-8 px-2 md:px-3 md:px-4 lg:px-6 py-2 md:py-3 md:py-4 text-center">
                          <button
                            onClick={() => toggleRowExpansion(rowIndex)}
                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                          >
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            )}
                          </button>
                        </td>
                      )}

                       {responsiveColumns.map((column) => (
                         <td
                           key={column.key}
                           className="px-1 md:px-2 lg:px-3 py-2 md:py-3 text-[10px] md:text-xs text-gray-700 dark:text-gray-200 truncate"
                         >
                           {column.render
                             ? column.render(row[column.key], row)
                             : row[column.key]}
                         </td>
                       ))}

                       {hasAction && (
                         <td className="px-1 md:px-2 lg:px-3 py-2 md:py-3 text-[10px] md:text-xs">
                           <div className="flex gap-1 md:gap-2">
                             {onView && (
                               <button
                                 onClick={() => onView(row)}
                                 className="p-1 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium text-xs"
                               >
                                 <Eye className="w-3 h-3 md:w-4 md:h-4" />
                               </button>
                             )}
                             {onEdit && (
                               <button
                                 onClick={() => onEdit(row)}
                                 className="p-1 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 font-medium text-xs"
                               >
                                 <Edit className="w-3 h-3 md:w-4 md:h-4" />
                               </button>
                             )}
                             {onDelete && (
                               <button
                                 onClick={() => onDelete(row)}
                                 className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-medium text-xs"
                               >
                                 <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                               </button>
                             )}
                           </div>
                         </td>
                       )}
                    </tr>

                    {/* Expandable row for additional columns */}
                    {hasMoreColumns &&
                      isExpanded &&
                      hiddenColumns.length > 0 && (
                        <tr className="bg-gray-50 dark:bg-gray-900">
                          <td
                            colSpan={
                              responsiveColumns.length +
                              (hasMoreColumns ? 1 : 0) +
                              (hasAction ? 1 : 0)
                            }
                            className="px-2 md:px-3 md:px-4 lg:px-6 py-3 md:py-4"
                          >
                            <div className="space-y-3 md:space-y-4">
                              {hiddenColumns.map((column) => (
                                <div
                                  key={column.key}
                                  className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4"
                                >
                                  <span className="text-[10px] md:text-xs font-semibold text-gray-600 dark:text-gray-400 min-w-0 md:min-w-32">
                                    {column.label}:
                                  </span>
                                  <div className="flex-1 text-[10px] md:text-xs text-gray-700 dark:text-gray-200 min-w-0">
                                    {column.render
                                      ? column.render(row[column.key], row)
                                      : row[column.key]}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {showPagination && (
        <div className="p-4 md:p-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <SecondaryPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange || (() => {})}
            showItemsCount={true}
            showPageInfo={true}
            showJumpToPage={true}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            onItemsPerPageChange={onItemsPerPageChange}
          />
        </div>
      )}

      {/* Settings Modal */}
      <PrimaryModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        title="Column Visibility"
        hasHeader={true}
        hasBody={true}
        hasFooter={false}
      >
        <div className="space-y-4 py-6 px-6">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
            Select Columns to Display
          </h4>
          {columns.map((column) => (
            <div key={column.key} className="flex items-center">
              <Checkbox
                name={column.key}
                checked={visibleColumns[column.key]}
                onChange={() => toggleColumnVisibility(column.key)}
                label={column.label}
              />
            </div>
          ))}
        </div>
      </PrimaryModal>
    </div>
  );
};

export default SecondaryTable;