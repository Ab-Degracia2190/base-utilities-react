import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import type { ObjectId } from 'mongoose';

// Interfaces
interface JwtPayload {
  user: {
    id: string | ObjectId;
    name: string;
    role: string;
    email: string;
    session: {
      token: string;
    };
  };
}

interface DecodedUser {
  token: string;
  user_id: string | ObjectId | null;
  name: string;
  email: string;
  role: string;
}

interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: number;
}

interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

// Local user store
let user = {
  id: null as string | ObjectId | null,
  name: '',
  role: '',
  email: '',
  token: ''
};

const getTokenValues = (): DecodedUser | null => {
  const token = localStorage.getItem('authToken');
  if (!token) return null;

  try {
    const decodedToken = jwtDecode<JwtPayload>(token);

    user = {
      id: decodedToken.user.id,
      name: decodedToken.user.name,
      role: decodedToken.user.role,
      email: decodedToken.user.email,
      token
    };

    return {
      token,
      user_id: user.id,
      name: user.name,
      role: user.role,
      email: user.email
    };
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

const setAxiosHeaders = (contentType: string = 'application/json') => {
  const token = localStorage.getItem('authToken');

  // Clear existing headers first
  delete axios.defaults.headers.common['Authorization'];
  delete axios.defaults.headers.common['Content-Type'];

  // Set new headers
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  if (contentType) {
    axios.defaults.headers.common['Content-Type'] = contentType;
  }
};

const resetTokens = (newToken: string) => {
  localStorage.setItem('authToken', newToken);
  setAxiosHeaders();
};

const clearTokens = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  delete axios.defaults.headers.common['Authorization'];
};

// Request interceptor
axios.interceptors.request.use(
  (config) => {
    // Ensure auth header is set for each request
    const token = localStorage.getItem('authToken');
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Set default content type if not specified
    if (!config.headers['Content-Type'] && config.data) {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;

    // Log error details
    console.error(`❌ ${originalRequest?.method?.toUpperCase()} ${originalRequest?.url} - Status: ${error.response?.status}`, error.response?.data || error.message);

    // Handle 401 Unauthorized - token expired or invalid
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Clear tokens and redirect to login
      clearTokens();
      
      // Only redirect if we're in a browser environment
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
      
      return Promise.reject(new Error('Session expired. Please login again.'));
    }

    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      return Promise.reject(new Error('Access denied. You do not have permission to perform this action.'));
    }

    // Handle 404 Not Found
    if (error.response?.status === 404) {
      return Promise.reject(new Error('The requested resource was not found.'));
    }

    // Handle 500 Server Error
    if (error.response?.status >= 500) {
      return Promise.reject(new Error('Server error. Please try again later.'));
    }

    // Handle network errors
    if (!error.response) {
      return Promise.reject(new Error('Network error. Please check your internet connection.'));
    }

    // Handle other errors with server message
    const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred.';
    return Promise.reject(new Error(errorMessage));
  }
);

// Utility functions for common API calls
const api = {
  get: async <T = any>(url: string, config?: any): Promise<ApiResponse<T>> => {
    const response = await axios.get<T>(url, config);
    return {
      data: response.data,
      status: response.status
    };
  },

  post: async <T = any>(url: string, data?: any, config?: any): Promise<ApiResponse<T>> => {
    const response = await axios.post<T>(url, data, config);
    return {
      data: response.data,
      status: response.status
    };
  },

  put: async <T = any>(url: string, data?: any, config?: any): Promise<ApiResponse<T>> => {
    const response = await axios.put<T>(url, data, config);
    return {
      data: response.data,
      status: response.status
    };
  },

  delete: async <T = any>(url: string, config?: any): Promise<ApiResponse<T>> => {
    const response = await axios.delete<T>(url, config);
    return {
      data: response.data,
      status: response.status
    };
  }
};

// Run once on import
setAxiosHeaders();

export { 
  getTokenValues, 
  setAxiosHeaders, 
  resetTokens, 
  clearTokens,
  api,
  type ApiResponse,
  type ApiError,
  type DecodedUser
};