"use client";

import React, { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  ReactNode,
  useMemo
} from 'react';
import { useRouter } from 'next/navigation';
import { 
  isAuthenticated, 
  getUser, 
  setTokens, 
  clearTokens, 
  refreshAuthToken,
  DecodedToken,
  hasRole,
  hasPermission
} from '@/lib/auth';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: string;
}

interface AuthContextType {
  user: DecodedToken | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  error: string | null;
  hasRole: (role: string) => boolean;
  hasPermission: (action: string, subject: string) => boolean;
}

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        if (isAuthenticated()) {
          const userData = getUser();
          setUser(userData);
        } else {
          // Try to refresh the token if it's expired
          const newToken = await refreshAuthToken();
          if (newToken) {
            const userData = getUser();
            setUser(userData);
          } else {
            setUser(null);
          }
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
      
      const data = await response.json();
      const { accessToken, refreshToken } = data;
      
      // Store tokens
      setTokens(accessToken, refreshToken);
      
      // Set user from decoded token
      const userData = getUser();
      setUser(userData);
      
      // Redirect based on user role
      if (userData) {
        const userRole = userData.role.name;
        
        switch (userRole) {
          case 'admin':
            router.push('/admin/dashboard');
            break;
          case 'developer':
            router.push('/developer/dashboard');
            break;
          case 'user':
          default:
            router.push('/dashboard');
            break;
        }
      } else {
        // Fallback to standard dashboard if role cannot be determined
        router.push('/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }
      
      // Redirect to login page with success message
      router.push('/login?registered=true');
    } catch (err) {
      console.error('Registration error:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Call logout endpoint to clear cookies
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage tokens regardless of API success
      clearTokens();
      setUser(null);
      router.push('/login');
    }
  };

  // Check if user has specific role
  const checkRole = (role: string) => {
    return hasRole(role);
  };

  // Check if user has specific permission
  const checkPermission = (action: string, subject: string) => {
    return hasPermission(action, subject);
  };

  // Create the context value object
  const contextValue = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      error,
      hasRole: checkRole,
      hasPermission: checkPermission
    }),
    [user, isLoading, error]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
} 