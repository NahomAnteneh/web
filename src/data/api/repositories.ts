/**
 * Repository API Services
 * 
 * Functions for interacting with repository-related endpoints in the API
 */

import { Repository, Commit, Branch } from '../models';
import apiClient from './client';
import { dbRepositoryToUIRepository } from '../adapters';
import { Repository as UIRepository } from '../types';

// Types for API responses
interface RepositoryListResponse {
  repositories: Repository[];
  total: number;
  page: number;
  limit: number;
}

interface RepositoryResponse {
  repository: Repository;
}

interface CommitListResponse {
  commits: Commit[];
  total: number;
  page: number;
  limit: number;
}

interface BranchListResponse {
  branches: Branch[];
}

// Repository API path
const REPOSITORY_API_PATH = 'repositories';

/**
 * Fetch all repositories with optional pagination and filtering
 */
export const fetchRepositories = async (
  page = 1, 
  limit = 10,
  projectId?: number
): Promise<{ repositories: UIRepository[], total: number }> => {
  try {
    // Build query parameters
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    });
    
    if (projectId) params.append('projectId', projectId.toString());
    
    // Make API request
    const response = await apiClient.get<RepositoryListResponse>(
      `${REPOSITORY_API_PATH}?${params.toString()}`
    );
    
    // Convert database models to UI models
    const uiRepositories = response.repositories.map(dbRepositoryToUIRepository);
    
    return {
      repositories: uiRepositories,
      total: response.total
    };
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw error;
  }
};

/**
 * Fetch a specific repository by ID
 */
export const fetchRepositoryById = async (id: number): Promise<UIRepository> => {
  try {
    const response = await apiClient.get<RepositoryResponse>(`${REPOSITORY_API_PATH}/${id}`);
    return dbRepositoryToUIRepository(response.repository);
  } catch (error) {
    console.error(`Error fetching repository with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new repository
 */
export const createRepository = async (repositoryData: Omit<Repository, 'id' | 'createdAt'>): Promise<UIRepository> => {
  try {
    const response = await apiClient.post<RepositoryResponse>(REPOSITORY_API_PATH, repositoryData);
    return dbRepositoryToUIRepository(response.repository);
  } catch (error) {
    console.error('Error creating repository:', error);
    throw error;
  }
};

/**
 * Fetch repository by project ID
 */
export const fetchRepositoryByProject = async (projectId: number): Promise<UIRepository | null> => {
  try {
    const params = new URLSearchParams({
      projectId: projectId.toString()
    });
    
    const response = await apiClient.get<RepositoryListResponse>(
      `${REPOSITORY_API_PATH}?${params.toString()}`
    );
    
    if (response.repositories.length === 0) {
      return null;
    }
    
    return dbRepositoryToUIRepository(response.repositories[0]);
  } catch (error) {
    console.error(`Error fetching repository for project ${projectId}:`, error);
    throw error;
  }
};

/**
 * Fetch commits for a repository
 */
export const fetchCommits = async (
  repositoryId: number,
  page = 1,
  limit = 20,
  branch?: string
): Promise<Commit[]> => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    });
    
    if (branch) params.append('branch', branch);
    
    const response = await apiClient.get<CommitListResponse>(
      `${REPOSITORY_API_PATH}/${repositoryId}/commits?${params.toString()}`
    );
    
    return response.commits;
  } catch (error) {
    console.error(`Error fetching commits for repository ${repositoryId}:`, error);
    throw error;
  }
};

/**
 * Fetch branches for a repository
 */
export const fetchBranches = async (repositoryId: number): Promise<Branch[]> => {
  try {
    const response = await apiClient.get<BranchListResponse>(
      `${REPOSITORY_API_PATH}/${repositoryId}/branches`
    );
    
    return response.branches;
  } catch (error) {
    console.error(`Error fetching branches for repository ${repositoryId}:`, error);
    throw error;
  }
}; 