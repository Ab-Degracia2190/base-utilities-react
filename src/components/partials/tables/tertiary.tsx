import React, { useState, useMemo } from "react";
import {
  Filter,
  Plus,
  Settings,
  ChevronDown,
  ChevronUp,
  SortAsc,
  SortDesc,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import SearchInput from "../inputs/search";
import TertiaryButton from "../buttons/tertiary";
import Text from "../inputs/text";
import Dropdown from "../inputs/dropdown";
import Checkbox from "../inputs/checkbox";
import TertiaryPagination from "../paginations/tertiary";
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

interface TertiaryTableProps {
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

const TertiaryTable: React.FC<TertiaryTableProps> = ({
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
      className={`bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg ${className}`}
    >
      {/* Header Controls */}
      <div className="p-4 md:p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center justify-between">
          <div className="flex-1 w-full md:max-w-md">
            {showSearch && (
              <div>
                <SearchInput
                  value={searchTerm}
                  onChange={(value) => {
                    setSearchTerm(value);
                    onSearchChange?.(value);
                  }}
                  placeholder="Type to search..."
                />
              </div>
            )}
          </div>

          <div className="flex gap-1 md:gap-2">
            {showFilter && (
              <button
                onClick={() => setShowFilterPanel(!showFilterPanel)}
                className={`p-2 md:py-2 md:px-4 rounded-lg transition-colors transition-all duration-200 ${
                  showFilterPanel
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
                }`}
              >
                <Filter className="w-3 h-3 md:w-4 md:h-4" />
              </button>
            )}

            <button
              onClick={() => setShowSettingsModal(true)}
              className={`p-2 md:py-2 md:px-4 rounded-lg transition-colors transition-all duration-200 ${
                showSettingsModal
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
              }`}
            >
              <Settings className="w-3 h-3 md:w-4 md:h-4" />
            </button>

            {showCreateButton && onCreate && (
              <TertiaryButton
                onClick={onCreate}
                className="flex items-center gap-1 md:gap-2 px-2 py-1.5 md:px-6 md:py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium shadow-lg text-[8px] md:text-xs"
              >
                <Plus className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">Create New</span>
              </TertiaryButton>
            )}
          </div>
        </div>

        {/* Filter Panel */}
        {showFilterPanel && (
          <div className="mt-4 md:mt-6 p-3 md:p-4 lg:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-inner border border-gray-200 dark:border-gray-600">
            <h3 className="text-xs md:text-sm lg:text-base font-bold text-gray-800 dark:text-gray-200 mb-3 md:mb-4 lg:mb-6 flex items-center gap-2">
              <Filter className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
              Advanced Filter Options
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 lg:gap-6">
              {visibleColumnsList
                .filter((col) => col.filterable)
                .map((column) => (
                  <div key={column.key} className="min-w-0">
                    <label className="block text-[8px] md:text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                      {column.label}
                    </label>
                    {renderFilterInput(column)}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
            <tr>
              {hasMoreColumns && (
                <th className="w-8 px-1 md:px-2 lg:px-3 py-2 md:py-3 lg:py-5 text-center text-[10px] md:text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wide"></th>
              )}
              {responsiveColumns.map((column) => (
                <th
                  key={column.key}
                  className={`px-1 md:px-2 lg:px-3 py-2 md:py-3 lg:py-5 text-left text-[10px] md:text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wide ${
                    column.sortable
                      ? "cursor-pointer hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200"
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
                            <SortAsc className="w-3 h-3 md:w-4 md:h-4 text-blue-600 dark:text-blue-400" />
                          ) : (
                            <SortDesc className="w-3 h-3 md:w-4 md:h-4 text-blue-600 dark:text-blue-400" />
                          )
                        ) : (
                          <SortAsc className="w-3 h-3 md:w-4 md:h-4 text-gray-400 dark:text-gray-500" />
                        )}
                      </div>
                    )}
                  </div>
                </th>
              ))}

              {hasAction && (
                <th className="px-1 md:px-2 lg:px-3 py-2 md:py-3 lg:py-5 text-left text-[10px] md:text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wide">
                  <span className="hidden md:inline">Quick Actions</span>
                  <span className="md:hidden">⋮</span>
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? (
              <tr>
                <td
                  colSpan={
                    responsiveColumns.length +
                    (hasMoreColumns ? 1 : 0) +
                    (hasAction ? 1 : 0)
                  }
                  className="px-3 md:px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16 text-center"
                >
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <div className="animate-spin rounded-full h-6 w-6 md:h-8 md:w-8 border-4 border-blue-200 dark:border-blue-800"></div>
                      <div className="animate-spin rounded-full h-6 w-6 md:h-8 md:w-8 border-4 border-blue-600 dark:border-blue-400 border-t-transparent absolute top-0"></div>
                    </div>
                    <span className="mt-2 md:mt-4 text-[10px] md:text-xs text-gray-500 dark:text-gray-400 font-medium">
                      Processing data...
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
                  className="px-3 md:px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16 text-center"
                >
                  <div className="text-gray-400 dark:text-gray-500">
                    <div className="text-sm md:text-base lg:text-lg mb-2 md:mb-3 font-semibold">
                      No Data Available
                    </div>
                    <div className="text-[10px] md:text-xs">
                      Please adjust your search criteria or add new records
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
                    <tr className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-gray-700 dark:hover:to-gray-700 transition-all duration-200">
                      {hasMoreColumns && (
                        <td className="w-8 px-2 md:px-3 md:px-4 lg:px-6 py-3 md:py-4 lg:py-6 text-center">
                          <button
                            onClick={() => toggleRowExpansion(rowIndex)}
                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-all duration-200"
                          >
                            {isExpanded ? (
                              <ChevronUp className="w-3 h-3 md:w-4 md:h-4 text-gray-600 dark:text-gray-400" />
                            ) : (
                              <ChevronDown className="w-3 h-3 md:w-4 md:h-4 text-gray-600 dark:text-gray-400" />
                            )}
                          </button>
                        </td>
                      )}

                       {responsiveColumns.map((column) => (
                         <td
                           key={column.key}
                           className="px-1 md:px-2 lg:px-3 py-2 md:py-3 lg:py-4 text-[10px] md:text-xs text-gray-700 dark:text-gray-200 font-medium truncate"
                         >
                           {column.render
                             ? column.render(row[column.key], row)
                             : row[column.key]}
                         </td>
                       ))}

                       {hasAction && (
                         <td className="px-1 md:px-2 lg:px-3 py-2 md:py-3 lg:py-4 text-[10px] md:text-xs">
                           <div className="flex gap-0.5 md:gap-1">
                             {onView && (
                               <button
                                 onClick={() => onView(row)}
                                 className="p-0.5 md:p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                               >
                                 <Eye className="w-2.5 h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4" />
                               </button>
                             )}
                             {onEdit && (
                               <button
                                 onClick={() => onEdit(row)}
                                 className="p-0.5 md:p-1 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                               >
                                 <Edit className="w-2.5 h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4" />
                               </button>
                             )}
                             {onDelete && (
                               <button
                                 onClick={() => onDelete(row)}
                                 className="p-0.5 md:p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                               >
                                 <Trash2 className="w-2.5 h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4" />
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
                        <tr className="bg-gradient-to-r from-blue-25 to-indigo-25 dark:from-gray-900 dark:to-gray-900">
                          <td
                            colSpan={
                              responsiveColumns.length +
                              (hasMoreColumns ? 1 : 0) +
                              (hasAction ? 1 : 0)
                            }
                            className="px-3 md:px-4 md:px-6 lg:px-8 py-3 md:py-4"
                          >
                            <div className="space-y-2 md:space-y-3">
                              {hiddenColumns.map((column) => (
                                <div
                                  key={column.key}
                                  className="flex flex-col md:flex-row md:items-start gap-1 md:gap-2"
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
        <div className="p-3 md:p-4 lg:p-6 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-800">
          <TertiaryPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange || (() => {})}
            compact={false}
            showItemsCount={true}
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
        title="Table Customization"
        hasHeader={true}
        hasBody={true}
        hasFooter={false}
      >
        <div className="space-y-4 md:space-y-6 py-6 px-6">
          <div className="text-center">
            <div className="text-sm md:text-base lg:text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
              Column Visibility
            </div>
            <div className="text-[10px] md:text-xs text-gray-600 dark:text-gray-400">
              Choose which columns to display in your table view
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {columns.map((column) => (
              <div
                key={column.key}
                className="flex items-center p-2 md:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <Checkbox
                  name={column.key}
                  checked={visibleColumns[column.key]}
                  onChange={() => toggleColumnVisibility(column.key)}
                  label={column.label}
                />
              </div>
            ))}
          </div>
        </div>
      </PrimaryModal>
    </div>
  );
};

export default TertiaryTable;