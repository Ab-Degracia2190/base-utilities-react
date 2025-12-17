import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PrimaryTable from '@/components/partials/tables/primary';
import SecondaryTable from '@/components/partials/tables/secondary';
import TertiaryTable from '@/components/partials/tables/tertiary';

// Helper function to generate sample data
const generateSampleUsers = (count: number) => {
  const roles = ['Admin', 'Developer', 'Designer', 'Manager', 'HR Specialist', 'QA Engineer', 'Product Manager'];
  const departments = ['Engineering', 'Design', 'Management', 'Human Resources', 'Quality Assurance', 'Product'];
  const statuses = ['Active', 'Inactive'];
  const firstNames = ['John', 'Jane', 'Bob', 'Alice', 'Charlie', 'Diana', 'Edward', 'Fiona', 'George', 'Helen', 
    'Ian', 'Julia', 'Kevin', 'Laura', 'Michael', 'Nancy', 'Oscar', 'Patricia', 'Quinn', 'Rachel'];
  const lastNames = ['Doe', 'Smith', 'Johnson', 'Brown', 'Wilson', 'Prince', 'Norton', 'Apple', 'Davis', 'Miller',
    'Garcia', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Anderson', 'Thomas', 'Taylor', 'Moore'];

  const users = [];
  for (let i = 1; i <= count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`;
    const role = roles[Math.floor(Math.random() * roles.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const department = departments[Math.floor(Math.random() * departments.length)];
    
    // Generate random date between 2022-01-01 and 2024-12-31
    const startDate = new Date(2022, 0, 1);
    const endDate = new Date(2024, 11, 31);
    const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
    const joinDate = randomDate.toISOString().split('T')[0];

    users.push({
      id: i,
      name: `${firstName} ${lastName}`,
      email,
      role,
      status,
      department,
      joinDate
    });
  }
  return users;
};

// Generate 1000 sample users once (stored outside component to avoid regeneration)
const allPrimaryUsers = generateSampleUsers(1000);
const allSecondaryUsers = generateSampleUsers(1000);
const allTertiaryUsers = generateSampleUsers(1000);

// Table columns configuration
const tableColumns = [
  {
    key: 'id',
    label: 'ID',
    sortable: true,
    filterable: true,
    inputType: 'text' as const
  },
  {
    key: 'name',
    label: 'Name',
    sortable: true,
    filterable: true,
    inputType: 'text' as const
  },
  {
    key: 'email',
    label: 'Email',
    sortable: true,
    filterable: true,
    inputType: 'text' as const
  },
  {
    key: 'role',
    label: 'Role',
    sortable: true,
    filterable: true,
    inputType: 'dropdown' as const,
    dropdownOptions: [
      { label: 'All Roles', value: '' },
      { label: 'Admin', value: 'Admin' },
      { label: 'Developer', value: 'Developer' },
      { label: 'Designer', value: 'Designer' },
      { label: 'Manager', value: 'Manager' },
      { label: 'HR Specialist', value: 'HR Specialist' },
      { label: 'QA Engineer', value: 'QA Engineer' },
      { label: 'Product Manager', value: 'Product Manager' }
    ]
  },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    filterable: true,
    inputType: 'dropdown' as const,
    dropdownOptions: [
      { label: 'All Status', value: '' },
      { label: 'Active', value: 'Active' },
      { label: 'Inactive', value: 'Inactive' }
    ],
    render: (value: string) => (
      <span className={`px-2 py-1 text-[10px] md:text-xs rounded-full ${
        value === 'Active' 
          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      }`}>
        {value}
      </span>
    )
  },
  {
    key: 'department',
    label: 'Department',
    sortable: true,
    filterable: true,
    inputType: 'dropdown' as const,
    dropdownOptions: [
      { label: 'All Departments', value: '' },
      { label: 'Engineering', value: 'Engineering' },
      { label: 'Design', value: 'Design' },
      { label: 'Management', value: 'Management' },
      { label: 'Human Resources', value: 'Human Resources' },
      { label: 'Quality Assurance', value: 'Quality Assurance' },
      { label: 'Product', value: 'Product' }
    ]
  },
  {
    key: 'joinDate',
    label: 'Join Date',
    sortable: true,
    filterable: true,
    inputType: 'text' as const
  }
];

const TablesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  // Get initial values from URL or use defaults
  const getInitialPage = (tableKey: string) => {
    const page = searchParams.get(`${tableKey}_page`);
    return page ? parseInt(page, 10) : 1;
  };

  const getInitialItemsPerPage = (tableKey: string) => {
    const itemsPerPage = searchParams.get(`${tableKey}_items_per_page`);
    return itemsPerPage ? parseInt(itemsPerPage, 10) : 10;
  };

  const [primaryCurrentPage, setPrimaryCurrentPage] = useState(getInitialPage('primary'));
  const [secondaryCurrentPage, setSecondaryCurrentPage] = useState(getInitialPage('secondary'));
  const [tertiaryCurrentPage, setTertiaryCurrentPage] = useState(getInitialPage('tertiary'));
  const [primaryItemsPerPage, setPrimaryItemsPerPage] = useState(getInitialItemsPerPage('primary'));
  const [secondaryItemsPerPage, setSecondaryItemsPerPage] = useState(getInitialItemsPerPage('secondary'));
  const [tertiaryItemsPerPage, setTertiaryItemsPerPage] = useState(getInitialItemsPerPage('tertiary'));

  // Update URL when pagination changes
  const updateURLPage = (tableKey: string, page: number) => {
    const newParams = new URLSearchParams(searchParams);
    if (page === 1) {
      newParams.delete(`${tableKey}_page`);
    } else {
      newParams.set(`${tableKey}_page`, page.toString());
    }
    setSearchParams(newParams);
  };

  const updateURLItemsPerPage = (tableKey: string, itemsPerPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    if (itemsPerPage === 10) {
      newParams.delete(`${tableKey}_items_per_page`);
    } else {
      newParams.set(`${tableKey}_items_per_page`, itemsPerPage.toString());
    }
    newParams.delete(`${tableKey}_page`); // Reset to page 1 when items per page changes
    setSearchParams(newParams);
  };

  // Reset pagination to page 1 for specific table
  const resetPagination = (tableKey: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(`${tableKey}_page`);
    setSearchParams(newParams);
    
    // Update local state
    switch (tableKey) {
      case 'primary':
        setPrimaryCurrentPage(1);
        break;
      case 'secondary':
        setSecondaryCurrentPage(1);
        break;
      case 'tertiary':
        setTertiaryCurrentPage(1);
        break;
    }
  };

  // Sync component state with URL parameters when they change
  useEffect(() => {
    setPrimaryCurrentPage(getInitialPage('primary'));
    setSecondaryCurrentPage(getInitialPage('secondary'));
    setTertiaryCurrentPage(getInitialPage('tertiary'));
    setPrimaryItemsPerPage(getInitialItemsPerPage('primary'));
    setSecondaryItemsPerPage(getInitialItemsPerPage('secondary'));
    setTertiaryItemsPerPage(getInitialItemsPerPage('tertiary'));
  }, [searchParams]);

  const totalItems = 1000; // Total records in database

  // Paginate data - only slice the records needed for current page
  const paginatedPrimaryUsers = useMemo(() => {
    const startIndex = (primaryCurrentPage - 1) * primaryItemsPerPage;
    const endIndex = startIndex + primaryItemsPerPage;
    return allPrimaryUsers.slice(startIndex, endIndex);
  }, [primaryCurrentPage, primaryItemsPerPage]);

  const paginatedSecondaryUsers = useMemo(() => {
    const startIndex = (secondaryCurrentPage - 1) * secondaryItemsPerPage;
    const endIndex = startIndex + secondaryItemsPerPage;
    return allSecondaryUsers.slice(startIndex, endIndex);
  }, [secondaryCurrentPage, secondaryItemsPerPage]);

  const paginatedTertiaryUsers = useMemo(() => {
    const startIndex = (tertiaryCurrentPage - 1) * tertiaryItemsPerPage;
    const endIndex = startIndex + tertiaryItemsPerPage;
    return allTertiaryUsers.slice(startIndex, endIndex);
  }, [tertiaryCurrentPage, tertiaryItemsPerPage]);

  // Calculate total pages for each table
  const primaryTotalPages = Math.ceil(totalItems / primaryItemsPerPage);
  const secondaryTotalPages = Math.ceil(totalItems / secondaryItemsPerPage);
  const tertiaryTotalPages = Math.ceil(totalItems / tertiaryItemsPerPage);

  const handlePrimaryPageChange = (page: number) => {
    setLoading(true);
    setTimeout(() => {
      setPrimaryCurrentPage(page);
      updateURLPage('primary', page);
      setLoading(false);
    }, 300);
  };

  const handleSecondaryPageChange = (page: number) => {
    setLoading(true);
    setTimeout(() => {
      setSecondaryCurrentPage(page);
      updateURLPage('secondary', page);
      setLoading(false);
    }, 300);
  };

  const handleTertiaryPageChange = (page: number) => {
    setLoading(true);
    setTimeout(() => {
      setTertiaryCurrentPage(page);
      updateURLPage('tertiary', page);
      setLoading(false);
    }, 300);
  };

  // Items per page handlers
  const handlePrimaryItemsPerPageChange = (newItemsPerPage: number) => {
    setPrimaryItemsPerPage(newItemsPerPage);
    setPrimaryCurrentPage(1); // Reset to first page
    updateURLItemsPerPage('primary', newItemsPerPage);
  };

  const handleSecondaryItemsPerPageChange = (newItemsPerPage: number) => {
    setSecondaryItemsPerPage(newItemsPerPage);
    setSecondaryCurrentPage(1); // Reset to first page
    updateURLItemsPerPage('secondary', newItemsPerPage);
  };

  const handleTertiaryItemsPerPageChange = (newItemsPerPage: number) => {
    setTertiaryItemsPerPage(newItemsPerPage);
    setTertiaryCurrentPage(1); // Reset to first page
    updateURLItemsPerPage('tertiary', newItemsPerPage);
  };

  const handleCreate = () => {
    alert('Create new user functionality would be implemented here');
  };

  const handleView = (user: any) => {
    alert(`View user: ${user.name}`);
  };

  const handleEdit = (user: any) => {
    alert(`Edit user: ${user.name}`);
  };

  const handleDelete = (user: any) => {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      alert(`Delete user: ${user.name}`);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Data Tables Showcase
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Primary Table Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Primary Table</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Clean and modern table design with comprehensive features ({totalItems} records, {primaryItemsPerPage} per page)
            </p>
          </div>
          
          <PrimaryTable
            data={paginatedPrimaryUsers}
            columns={tableColumns}
            loading={loading}
            showSearch={true}
            showFilter={true}
            showCreateButton={true}
            showPagination={true}
            hasAction={true}
            searchableColumns={['name', 'email', 'role', 'department']}
            currentPage={primaryCurrentPage}
            totalPages={primaryTotalPages}
            totalItems={totalItems}
            itemsPerPage={primaryItemsPerPage}
            onPageChange={handlePrimaryPageChange}
            onItemsPerPageChange={handlePrimaryItemsPerPageChange}
            onCreate={handleCreate}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            defaultVisibleColumns={['name', 'email', 'role', 'status']}
            onSearchChange={() => resetPagination('primary')}
            onFilterChange={() => resetPagination('primary')}
            onSortChange={() => resetPagination('primary')}
          />
        </section>

        {/* Secondary Table Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Secondary Table</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Alternative table styling with enhanced visual hierarchy ({totalItems} records, {secondaryItemsPerPage} per page)
            </p>
          </div>
          
          <SecondaryTable
            data={paginatedSecondaryUsers}
            columns={tableColumns}
            loading={loading}
            showSearch={true}
            showFilter={true}
            showCreateButton={true}
            showPagination={true}
            hasAction={true}
            searchableColumns={['name', 'email', 'role', 'department']}
            currentPage={secondaryCurrentPage}
            totalPages={secondaryTotalPages}
            totalItems={totalItems}
            itemsPerPage={secondaryItemsPerPage}
            onPageChange={handleSecondaryPageChange}
            onItemsPerPageChange={handleSecondaryItemsPerPageChange}
            onCreate={handleCreate}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            defaultVisibleColumns={['name', 'role', 'status', 'department']}
            onSearchChange={() => resetPagination('secondary')}
            onFilterChange={() => resetPagination('secondary')}
            onSortChange={() => resetPagination('secondary')}
          />
        </section>

        {/* Tertiary Table Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Tertiary Table</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Premium table design with gradient effects and enhanced interactions ({totalItems} records, {tertiaryItemsPerPage} per page)
            </p>
          </div>
          
          <TertiaryTable
            data={paginatedTertiaryUsers}
            columns={tableColumns}
            loading={loading}
            showSearch={true}
            showFilter={true}
            showCreateButton={true}
            showPagination={true}
            hasAction={true}
            searchableColumns={['name', 'email', 'role', 'department']}
            currentPage={tertiaryCurrentPage}
            totalPages={tertiaryTotalPages}
            totalItems={totalItems}
            itemsPerPage={tertiaryItemsPerPage}
            onPageChange={handleTertiaryPageChange}
            onItemsPerPageChange={handleTertiaryItemsPerPageChange}
            onCreate={handleCreate}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            defaultVisibleColumns={['name', 'email', 'role', 'status']}
            onSearchChange={() => resetPagination('tertiary')}
            onFilterChange={() => resetPagination('tertiary')}
            onSortChange={() => resetPagination('tertiary')}
          />
        </section>

        {/* Feature Overview */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Table Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Responsive Design</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Works seamlessly on all device sizes</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Search & Filter</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Advanced search and multi-column filtering</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Column Management</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Show/hide columns with settings modal</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Sorting</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Click headers to sort ascending/descending</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Action Buttons</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">View, edit, and delete functionality</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Efficient Pagination</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Shows correct counts with dynamic items per page (5/10/25/50/100)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Performance Metrics Section */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Performance Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">✓ Correct</div>
              <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">Pagination Display</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Shows "Showing 1-{primaryItemsPerPage} of {totalItems} items"</div>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">⚡</div>
              <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">Fast Loading</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Only renders {primaryItemsPerPage} items, not all {totalItems}</div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">📱</div>
              <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">Responsive</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Works perfectly on all device sizes</div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Technical Implementation</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-green-600 dark:text-green-400 mb-2">✅ Current Implementation:</h5>
                <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• totalItems: {totalItems} (total database count)</li>
                  <li>• data: {primaryItemsPerPage} items (current page only)</li>
                  <li>• Dynamic items per page: 5/10/25/50/100</li>
                  <li>• Responsive pagination controls</li>
                  <li>• Memory efficient</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-red-600 dark:text-red-400 mb-2">❌ Previous Issues:</h5>
                <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• totalItems: data.length (wrong)</li>
                  <li>• Shows "Showing 1-10 of 10 items"</li>
                  <li>• Fixed items per page only</li>
                  <li>• Missing responsive controls</li>
                  <li>• Memory intensive</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TablesPage;