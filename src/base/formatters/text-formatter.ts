// Remove all whitespace
const queryFormatter = (value: string): string => {
  return value.replace(/\s/g, '');
};

// Get middle initial from name
const middleInitial = (name: string): string => {
  return name && typeof name === 'string' && name.trim() !== '' 
    ? name.charAt(0) + '.' 
    : '';
};

// Convert to UPPERCASE
const upperCaseFormatter = (value: string): string => {
  return value ? value.toUpperCase() : '';
};

// Convert to lowercase
const lowerCaseFormatter = (value: string): string => {
  return value ? value.toLowerCase() : '';
};

// Capitalize first letter only
const capitalizeFirstLetter = (value: string): string => {
  if (!value || typeof value !== 'string') return '';
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

// NEW: Capitalize each word (Title Case)
const titleCase = (value: string): string => {
  if (!value || typeof value !== 'string') return '';
  return value
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// NEW: Convert to snake_case
const snakeCase = (value: string): string => {
  if (!value || typeof value !== 'string') return '';
  return value
    .trim()
    .replace(/([A-Z])/g, '_$1')
    .replace(/\s+/g, '_')
    .replace(/-+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_/, '')
    .toLowerCase();
};

// NEW: Convert to camelCase
const camelCase = (value: string): string => {
  if (!value || typeof value !== 'string') return '';
  return value
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
};

// NEW: Convert to kebab-case
const kebabCase = (value: string): string => {
  if (!value || typeof value !== 'string') return '';
  return value
    .trim()
    .replace(/([A-Z])/g, '-$1')
    .replace(/\s+/g, '-')
    .replace(/_+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-/, '')
    .toLowerCase();
};

// NEW: Truncate text with ellipsis
const truncate = (value: string, maxLength: number = 50): string => {
  if (!value || typeof value !== 'string') return '';
  if (value.length <= maxLength) return value;
  return value.substring(0, maxLength).trim() + '...';
};

// NEW: Slugify text (URL-friendly)
const slugify = (value: string): string => {
  if (!value || typeof value !== 'string') return '';
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// NEW: Remove special characters
const removeSpecialChars = (value: string): string => {
  if (!value || typeof value !== 'string') return '';
  return value.replace(/[^a-zA-Z0-9\s]/g, '');
};

// NEW: Format phone number (US format)
const formatPhoneNumber = (value: string): string => {
  if (!value) return '';
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return value;
};

// NEW: Extract initials from full name
const extractInitials = (fullName: string): string => {
  if (!fullName || typeof fullName !== 'string') return '';
  return fullName
    .split(' ')
    .filter(word => word.length > 0)
    .map(word => word.charAt(0).toUpperCase())
    .join('');
};

export { 
  queryFormatter, 
  middleInitial, 
  upperCaseFormatter, 
  lowerCaseFormatter, 
  capitalizeFirstLetter,
  // New exports
  titleCase,
  snakeCase,
  camelCase,
  kebabCase,
  truncate,
  slugify,
  removeSpecialChars,
  formatPhoneNumber,
  extractInitials
};