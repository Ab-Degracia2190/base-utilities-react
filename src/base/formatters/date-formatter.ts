const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const fullMonthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const dateConverter = (epochTime: number): string => {
  const date = new Date(epochTime);
  const year = date.getFullYear();
  const month = monthNames[date.getMonth()];
  const day = ('0' + date.getDate()).slice(-2);
  return `${month} ${day}, ${year}`;
};

const timeConverter = (epochTime: number): string => {
  const date = new Date(epochTime);
  let hours = date.getHours();
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const seconds = ('0' + date.getSeconds()).slice(-2);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const formattedHours = ('0' + hours).slice(-2);
  return `${formattedHours}:${minutes}:${seconds} ${ampm}`;
};

const dateTimeConverter = (epochTime: number): string => {
  const date = new Date(epochTime);
  const year = date.getFullYear();
  const month = monthNames[date.getMonth()];
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const seconds = ('0' + date.getSeconds()).slice(-2);
  return `${month} ${day}, ${year} ${hours}:${minutes}:${seconds}`;
};

const convertDateRangeToEpoch = (dateRange: string): [number, number] | null => {
  if (!dateRange || !dateRange.includes(" - ")) {
    return null;
  }

  const [startDateStr, endDateStr] = dateRange.split(" - ");

  const parseDateString = (dateStr: string): Date | null => {
    if (!dateStr || !dateStr.trim()) {
      console.error("Invalid date string:", dateStr);
      return null;
    }

    const [month, day, year] = dateStr.split(" ");
    if (!month || !day || !year) {
      console.error("Malformed date:", dateStr);
      return null;
    }

    const monthIndex = monthNames.indexOf(month);
    if (monthIndex === -1) {
      console.error("Invalid month:", month);
      return null;
    }

    const parsedDate = new Date(parseInt(year), monthIndex, parseInt(day));
    if (isNaN(parsedDate.getTime())) {
      console.error("Invalid parsed date:", dateStr);
      return null;
    }

    parsedDate.setHours(0, 0, 0, 0);
    return parsedDate;
  };

  const startDate = parseDateString(startDateStr);
  const endDate = parseDateString(endDateStr);

  if (!startDate || !endDate) {
    return null;
  }

  endDate.setHours(23, 59, 59, 999);

  const startEpoch = startDate.getTime();
  const endEpoch = endDate.getTime();

  return [startEpoch, endEpoch];
};

// NEW: Format relative time (e.g., "2 hours ago")
const formatRelativeTime = (epochTime: number): string => {
  const now = Date.now();
  const diff = now - epochTime;
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  
  if (seconds < 60) return 'just now';
  if (minutes < 60) return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  if (hours < 24) return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  if (days < 7) return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  if (weeks < 4) return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  if (months < 12) return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  return `${years} ${years === 1 ? 'year' : 'years'} ago`;
};

// NEW: Format duration (milliseconds to readable format)
const formatDuration = (milliseconds: number): string => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  }
  return `${seconds}s`;
};

// NEW: Get day of week
const getDayOfWeek = (epochTime: number): string => {
  const date = new Date(epochTime);
  return dayNames[date.getDay()];
};

// NEW: Format with full month name
const formatFullDate = (epochTime: number): string => {
  const date = new Date(epochTime);
  const year = date.getFullYear();
  const month = fullMonthNames[date.getMonth()];
  const day = date.getDate();
  return `${month} ${day}, ${year}`;
};

// NEW: Check if date is today
const isToday = (epochTime: number): boolean => {
  const date = new Date(epochTime);
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

// NEW: Check if date is yesterday
const isYesterday = (epochTime: number): boolean => {
  const date = new Date(epochTime);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return date.toDateString() === yesterday.toDateString();
};

export { 
  dateConverter, 
  timeConverter, 
  dateTimeConverter, 
  convertDateRangeToEpoch,
  // New exports
  formatRelativeTime,
  formatDuration,
  getDayOfWeek,
  formatFullDate,
  isToday,
  isYesterday
};