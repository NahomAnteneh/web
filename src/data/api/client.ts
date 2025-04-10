/**
 * API Client Configuration and Setup
 * 
 * This file configures the base API client for making HTTP requests
 * to the Project Repository Platform backend server.
 */

// API Environment Configuration
const API_CONFIG = {
  // Base API URL - can be overridden by environment variables
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  // Default request timeout in milliseconds
  timeout: 30000,
  // API version
  version: 'v1',
};

/**
 * Common headers for API requests
 */
export const getHeaders = (token?: string) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  // Add authorization header if token is provided
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

/**
 * Helper function to build API URL
 */
export const buildUrl = (endpoint: string): string => {
  // Ensure endpoint starts with a slash if needed
  const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_CONFIG.baseUrl}/${API_CONFIG.version}${formattedEndpoint}`;
};

/**
 * Generic API request function
 */
export const apiRequest = async <T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET',
  data?: any,
  token?: string
): Promise<T> => {
  const url = buildUrl(endpoint);
  const headers = getHeaders(token);

  const config: RequestInit = {
    method,
    headers,
    credentials: 'include',
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      // Handle error responses
      const errorData = await response.json().catch(() => ({}));
      throw {
        status: response.status,
        statusText: response.statusText,
        data: errorData,
      };
    }

    // For successful responses, parse and return the data
    return await response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

/**
 * API client with methods for different HTTP verbs
 */
export const apiClient = {
  get: <T>(endpoint: string, token?: string) => 
    apiRequest<T>(endpoint, 'GET', undefined, token),
  
  post: <T>(endpoint: string, data: any, token?: string) => 
    apiRequest<T>(endpoint, 'POST', data, token),
  
  put: <T>(endpoint: string, data: any, token?: string) => 
    apiRequest<T>(endpoint, 'PUT', data, token),
  
  patch: <T>(endpoint: string, data: any, token?: string) => 
    apiRequest<T>(endpoint, 'PATCH', data, token),
  
  delete: <T>(endpoint: string, token?: string) => 
    apiRequest<T>(endpoint, 'DELETE', undefined, token),
};

export default apiClient; 