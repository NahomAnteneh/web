/**
 * useUsers Hook
 * 
 * Custom hook to fetch and manage users using the API services
 */

import { useState, useEffect, useCallback } from 'react';
import { User } from '@/data/types';
import { fetchUsers, fetchUserById, mockData } from '@/data/api';

// Set this to true to use mock data, false to use API (when backend is ready)
const USE_MOCK_DATA = true;

interface UseUsersOptions {
  page?: number;
  limit?: number;
  roleId?: number;
  search?: string;
  initialData?: User[];
}

interface UseUsersResult {
  users: User[];
  totalUsers: number;
  loading: boolean;
  error: Error | null;
  fetchMore: (newPage: number) => Promise<void>;
  refetch: () => Promise<void>;
  getUserById: (id: number) => Promise<User | undefined>;
}

export function useUsers(options: UseUsersOptions = {}): UseUsersResult {
  const {
    page = 1,
    limit = 10,
    roleId,
    search,
    initialData
  } = options;

  const [users, setUsers] = useState<User[]>(initialData || []);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(page);

  // Function to load users
  const loadUsers = useCallback(async (pageNum: number) => {
    setLoading(true);
    setError(null);

    try {
      if (USE_MOCK_DATA) {
        // Use mock data
        let filteredUsers = [...mockData.users];
        
        // Apply filters to mock data
        if (roleId) {
          const roleMap: Record<number, string> = {
            1: 'student',
            2: 'advisor',
            3: 'admin',
            4: 'evaluator'
          };
          const roleType = roleMap[roleId];
          if (roleType) {
            filteredUsers = filteredUsers.filter(u => u.role === roleType);
          }
        }
        
        if (search) {
          const searchLower = search.toLowerCase();
          filteredUsers = filteredUsers.filter(u => 
            u.name.toLowerCase().includes(searchLower) || 
            u.email.toLowerCase().includes(searchLower)
          );
        }
        
        // Apply pagination
        const start = (pageNum - 1) * limit;
        const paginatedUsers = filteredUsers.slice(start, start + limit);
        
        setUsers(prevUsers => 
          pageNum === 1 ? paginatedUsers : [...prevUsers, ...paginatedUsers]
        );
        setTotalUsers(filteredUsers.length);
      } else {
        // Use API
        const response = await fetchUsers(pageNum, limit, search, roleId);
        
        setUsers(prevUsers => 
          pageNum === 1 ? response.users : [...prevUsers, ...response.users]
        );
        setTotalUsers(response.total);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred while fetching users'));
    } finally {
      setLoading(false);
    }
  }, [limit, roleId, search]);

  // Fetch users on initial load and when dependencies change
  useEffect(() => {
    setCurrentPage(page);
    loadUsers(page);
  }, [loadUsers, page]);

  // Function to fetch more users (pagination)
  const fetchMore = async (newPage: number) => {
    setCurrentPage(newPage);
    await loadUsers(newPage);
  };

  // Function to refetch current data
  const refetch = async () => {
    await loadUsers(currentPage);
  };

  // Function to get a single user by ID
  const getUserById = async (id: number): Promise<User | undefined> => {
    try {
      if (USE_MOCK_DATA) {
        return mockData.getUserById(id);
      } else {
        return await fetchUserById(id);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error(`Failed to fetch user with ID ${id}`));
      return undefined;
    }
  };

  return {
    users,
    totalUsers,
    loading,
    error,
    fetchMore,
    refetch,
    getUserById
  };
} 