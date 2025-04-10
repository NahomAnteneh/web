/**
 * User API Services
 * 
 * Functions for interacting with user-related endpoints in the API
 */

import { User } from '../models';
import apiClient from './client';
import { dbUserToUIUser } from '../adapters';
import { User as UIUser } from '../types';

// Types for API responses
interface UserListResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
}

interface UserResponse {
  user: User;
}

// User API path
const USER_API_PATH = 'users';

/**
 * Fetch all users with optional pagination and filtering
 */
export const fetchUsers = async (
  page = 1, 
  limit = 10, 
  search?: string,
  roleId?: number
): Promise<{ users: UIUser[], total: number }> => {
  try {
    // Build query parameters
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    });
    
    if (search) params.append('search', search);
    if (roleId) params.append('roleId', roleId.toString());
    
    // Make API request
    const response = await apiClient.get<UserListResponse>(
      `${USER_API_PATH}?${params.toString()}`
    );
    
    // Convert database models to UI models
    const uiUsers = response.users.map(dbUserToUIUser);
    
    return {
      users: uiUsers,
      total: response.total
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    // For now, mock data could be returned here as a fallback
    throw error;
  }
};

/**
 * Fetch a specific user by ID
 */
export const fetchUserById = async (id: number): Promise<UIUser> => {
  try {
    const response = await apiClient.get<UserResponse>(`${USER_API_PATH}/${id}`);
    return dbUserToUIUser(response.user);
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new user
 */
export const createUser = async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<UIUser> => {
  try {
    const response = await apiClient.post<UserResponse>(USER_API_PATH, userData);
    return dbUserToUIUser(response.user);
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

/**
 * Update an existing user
 */
export const updateUser = async (id: number, userData: Partial<User>): Promise<UIUser> => {
  try {
    const response = await apiClient.put<UserResponse>(`${USER_API_PATH}/${id}`, userData);
    return dbUserToUIUser(response.user);
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a user
 */
export const deleteUser = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`${USER_API_PATH}/${id}`);
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
    throw error;
  }
}; 