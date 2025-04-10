/**
 * Authentication Utilities
 * 
 * Functions for handling JWT tokens, login, logout, and token persistence
 */

import { jwtDecode } from 'jwt-decode';

export interface UserRole {
  id: number;
  name: 'user' | 'developer' | 'admin';
}

export interface UserPermission {
  action: string;
  subject: string;
}

export interface DecodedToken {
  sub: string;
  email: string;
  userId: number;
  role: UserRole;
  permissions: UserPermission[];
  exp: number;
  iat: number;
}

// Token storage keys
const ACCESS_TOKEN_KEY = 'prp_access_token';
const REFRESH_TOKEN_KEY = 'prp_refresh_token';

/**
 * Store authentication tokens in localStorage
 */
export const setTokens = (accessToken: string, refreshToken: string): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

/**
 * Get the stored access token
 */
export const getAccessToken = (): string | null => {
  return typeof window !== 'undefined' ? localStorage.getItem(ACCESS_TOKEN_KEY) : null;
};

/**
 * Get the stored refresh token
 */
export const getRefreshToken = (): string | null => {
  return typeof window !== 'undefined' ? localStorage.getItem(REFRESH_TOKEN_KEY) : null;
};

/**
 * Remove all authentication tokens (logout)
 */
export const clearTokens = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

/**
 * Check if the user is authenticated (has a valid, non-expired token)
 */
export const isAuthenticated = (): boolean => {
  const token = getAccessToken();
  if (!token) return false;
  
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const currentTime = Date.now() / 1000;
    
    // Check if token is expired
    return decoded.exp > currentTime;
  } catch (error) {
    // If token is invalid or can't be decoded
    clearTokens();
    return false;
  }
};

/**
 * Get the decoded user data from the token
 */
export const getUser = (): DecodedToken | null => {
  const token = getAccessToken();
  if (!token) return null;
  
  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    clearTokens();
    return null;
  }
};

/**
 * Check if the current user has a specific role
 */
export const hasRole = (roleToCheck: string): boolean => {
  const user = getUser();
  if (!user) return false;
  
  return user.role.name === roleToCheck;
};

/**
 * Check if the user has a permission to perform an action on a subject
 */
export const hasPermission = (action: string, subject: string): boolean => {
  const user = getUser();
  if (!user) return false;
  
  // Admin role has all permissions
  if (user.role.name === 'admin') return true;
  
  return user.permissions.some(
    permission => permission.action === action && permission.subject === subject
  );
};

/**
 * Refresh the authentication token
 */
export const refreshAuthToken = async (): Promise<string | null> => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;
  
  try {
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });
    
    if (!response.ok) {
      throw new Error('Token refresh failed');
    }
    
    const data = await response.json();
    setTokens(data.accessToken, data.refreshToken);
    return data.accessToken;
  } catch (error) {
    clearTokens();
    return null;
  }
}; 