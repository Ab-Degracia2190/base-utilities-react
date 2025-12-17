import React, { useState, useMemo } from "react";
import {
  Filter,
  Plus,
  Settings,
  SortAsc,
  SortDesc,
  Edit,
  Trash2,
  Eye,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import SearchInput from "../inputs/search";
import PrimaryButton from "../buttons/primary";
import Text from "../inputs/text";
import Dropdown from "../inputs/dropdown";
import Checkbox from "../inputs/checkbox";
import PrimaryPagination from "../paginations/primary";
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

interface PrimaryTableProps {
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

const PrimaryTable: React.FC<PrimaryTableProps> = ({
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
    const currentlyVisible = Object.keys(visibleColumns).filter(key => visibleColumns[key]);
    const isCurrentlyVisible = visibleColumns[columnKey];
    
    // Prevent unchecking if it would result in fewer than 4 visible columns
    if (isCurrentlyVisible && currentlyVisible.length <= 4) {
      return; // Don't allow unchecking if it would go below 4 columns
    }
    
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
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md ${className}`}
    >
      {/* Header Controls */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center justify-between">
          <div className="flex-1 w-full md:max-w-md">
            {showSearch && (
              <SearchInput
                value={searchTerm}
                onChange={(value) => {
                  setSearchTerm(value);
                  onSearchChange?.(value);
                }}
                placeholder="Search..."
              />
            )}
          </div>

          <div className="flex gap-2">
            {showFilter && (
              <button
                onClick={() => setShowFilterPanel(!showFilterPanel)}
                className={`py-2 px-4 rounded-lg transition-colors ${
                  showFilterPanel
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                <Filter className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => setShowSettingsModal(true)}
              className={`py-2 px-4 rounded-lg transition-colors ${
                showSettingsModal
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              <Settings className="w-4 h-4" />
            </button>

            {showCreateButton && onCreate && (
              <PrimaryButton
                onClick={onCreate}
                className="flex items-center gap-2 px-3 py-2 md:px-4 text-[10px] md:text-xs"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden md:inline">Create</span>
              </PrimaryButton>
            )}
          </div>
        </div>

        {/* Filter Panel */}
        {showFilterPanel && (
          <div className="mt-4 p-3 md:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 md:gap-3">
              {visibleColumnsList
                .filter((col) => col.filterable)
                .map((column) => (
                  <div key={column.key}>
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
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {responsiveColumns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-4 text-left text-xs md:text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider ${
                    column.sortable
                      ? "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                      : ""
                  }`}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center gap-1 md:gap-2">
                    <span className="text-xs md:text-xs">{column.label}</span>
                    {column.sortable &&
                      sortColumn === column.key &&
                      (sortDirection === "asc" ? (
                        <SortAsc className="w-3 h-3 md:w-4 md:h-4" />
                      ) : (
                        <SortDesc className="w-3 h-3 md:w-4 md:h-4" />
                      ))}
                    {column.sortable && sortColumn !== column.key && (
                      <SortAsc className="w-3 h-3 md:w-4 md:h-4 opacity-30" />
                    )}
                  </div>
                </th>
              ))}

              {hasAction && (
                <th className="px-2 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  <span className="hidden md:inline">Actions</span>
                  <span className="md:hidden">⋮</span>
                </th>
              )}

              {hasMoreColumns && (
                <th className="px-2 md:px-6 py-2 md:py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  <span className="hidden md:inline">More</span>
                </th>
              )}
            </tr>
          </thead>

          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? (
              <tr>
                <td
                  colSpan={
                    responsiveColumns.length +
                    (hasAction ? 1 : 0) +
                    (hasMoreColumns ? 1 : 0)
                  }
                  className="px-6 py-4 text-center text-[10px] md:text-xs"
                >
                  Loading...
                </td>
              </tr>
            ) : processedData.length === 0 ? (
              <tr>
                <td
                  colSpan={
                    responsiveColumns.length +
                    (hasAction ? 1 : 0) +
                    (hasMoreColumns ? 1 : 0)
                  }
                  className="px-6 py-4 text-center text-gray-500 dark:text-gray-400 text-[10px] md:text-xs"
                >
                  No data available
                </td>
              </tr>
            ) : (
              processedData.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    {responsiveColumns.map((column) => (
                      <td
                        key={column.key}
                        className="px-6 py-2 md:py-4 whitespace-nowrap text-[10px] md:text-xs text-gray-900 dark:text-gray-100"
                      >
                        {column.render
                          ? column.render(row[column.key], row)
                          : row[column.key]}
                      </td>
                    ))}

                    {hasAction && (
                      <td className="px-0 md:px-4.5 py-2 md:py-4 whitespace-nowrap text-[10px] md:text-xs">
                        <div className="flex gap-1 md:gap-2">
                          {onView && (
                            <button
                              onClick={() => onView(row)}
                              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 p-1"
                            >
                              <Eye className="w-3 h-3 md:w-4 md:h-4" />
                            </button>
                          )}
                          {onEdit && (
                            <button
                              onClick={() => onEdit(row)}
                              className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 p-1"
                            >
                              <Edit className="w-3 h-3 md:w-4 md:h-4" />
                            </button>
                          )}
                          {onDelete && (
                            <button
                              onClick={() => onDelete(row)}
                              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-1"
                            >
                              <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    )}

                    {hasMoreColumns && (
                      <td className="px-4 py-2 md:py-4 text-center">
                        <button
                          onClick={() => toggleRowExpansion(rowIndex)}
                          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1"
                        >
                          {expandedRows.has(rowIndex) ? (
                            <ChevronUp className="w-3 h-3 md:w-4 md:h-4" />
                          ) : (
                            <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />
                          )}
                        </button>
                      </td>
                    )}
                  </tr>

                  {/* Expandable row for additional columns */}
                  {hasMoreColumns && expandedRows.has(rowIndex) && (
                    <tr className="bg-gray-50 dark:bg-gray-900">
                      <td
                        colSpan={
                          responsiveColumns.length + (hasAction ? 1 : 0) + 1
                        }
                        className="px-6 py-3"
                      >
                        <div className="space-y-2">
                          {visibleColumnsList
                            .slice(responsiveColumns.length)
                            .map((column) => (
                              <div
                                key={column.key}
                                className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2"
                              >
                                <span className="text-[10px] md:text-xs font-semibold text-gray-600 dark:text-gray-400 min-w-20">
                                  {column.label}:
                                </span>
                                <span className="text-[10px] md:text-xs text-gray-900 dark:text-gray-100">
                                  {column.render
                                    ? column.render(row[column.key], row)
                                    : row[column.key]}
                                </span>
                              </div>
                            ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>

       {/* Pagination */}
      {showPagination && (
        <div className="p-3 md:p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <PrimaryPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange || (() => {})}
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
        title="Table Settings"
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

export default PrimaryTable;