interface DecimalAmount {
  $numberDecimal: string;
}

// Parse amount to number
const formatAmount = (amount: string | number | DecimalAmount): number => {
  if (typeof amount === 'number') {
    return amount;
  }
  if (typeof amount === 'object' && '$numberDecimal' in amount) {
    return parseFloat((amount as DecimalAmount).$numberDecimal);
  }
  return parseFloat(amount as string);
};

// NEW: Format number with commas
const formatNumberWithCommas = (value: number | string): string => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return '0';
  return num.toLocaleString('en-US');
};

// NEW: Format as currency
const formatCurrency = (amount: number | string, currency: string = 'USD', locale: string = 'en-US'): string => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) return '$0.00';
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
};

// NEW: Format as percentage
const formatPercentage = (value: number | string, decimals: number = 2): string => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return '0%';
  return `${num.toFixed(decimals)}%`;
};

// NEW: Convert bytes to human-readable format
const formatBytes = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
};

// NEW: Format file size
const formatFileSize = (bytes: number): string => {
  return formatBytes(bytes, 1);
};

// NEW: Round to decimal places
const roundToDecimal = (value: number, decimals: number = 2): number => {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

// NEW: Format as ordinal (1st, 2nd, 3rd, etc.)
const formatOrdinal = (num: number): string => {
  const j = num % 10;
  const k = num % 100;
  
  if (j === 1 && k !== 11) return num + "st";
  if (j === 2 && k !== 12) return num + "nd";
  if (j === 3 && k !== 13) return num + "rd";
  return num + "th";
};

// NEW: Format number with suffix (K, M, B)
const formatNumberShort = (num: number): string => {
  if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
  if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
  return num.toString();
};

export { 
  formatAmount,
  // New exports
  formatNumberWithCommas,
  formatCurrency,
  formatPercentage,
  formatBytes,
  formatFileSize,
  roundToDecimal,
  formatOrdinal,
  formatNumberShort
};