/**
 * Project API Services
 * 
 * Functions for interacting with project-related endpoints in the API
 */

import { Project } from '../models';
import apiClient from './client';
import { dbProjectToUIProject } from '../adapters';
import { Project as UIProject } from '../types';

// Types for API responses
interface ProjectListResponse {
  projects: Project[];
  total: number;
  page: number;
  limit: number;
}

interface ProjectResponse {
  project: Project;
}

// Project API path
const PROJECT_API_PATH = 'projects';

/**
 * Fetch all projects with optional pagination and filtering
 */
export const fetchProjects = async (
  page = 1, 
  limit = 10, 
  groupId?: number,
  search?: string,
  status?: string
): Promise<{ projects: UIProject[], total: number }> => {
  try {
    // Build query parameters
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    });
    
    if (groupId) params.append('groupId', groupId.toString());
    if (search) params.append('search', search);
    if (status) params.append('status', status);
    
    // Make API request
    const response = await apiClient.get<ProjectListResponse>(
      `${PROJECT_API_PATH}?${params.toString()}`
    );
    
    // Convert database models to UI models
    const uiProjects = response.projects.map(dbProjectToUIProject);
    
    return {
      projects: uiProjects,
      total: response.total
    };
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

/**
 * Fetch a specific project by ID
 */
export const fetchProjectById = async (id: number): Promise<UIProject> => {
  try {
    const response = await apiClient.get<ProjectResponse>(`${PROJECT_API_PATH}/${id}`);
    return dbProjectToUIProject(response.project);
  } catch (error) {
    console.error(`Error fetching project with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new project
 */
export const createProject = async (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<UIProject> => {
  try {
    const response = await apiClient.post<ProjectResponse>(PROJECT_API_PATH, projectData);
    return dbProjectToUIProject(response.project);
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

/**
 * Update an existing project
 */
export const updateProject = async (id: number, projectData: Partial<Project>): Promise<UIProject> => {
  try {
    const response = await apiClient.put<ProjectResponse>(`${PROJECT_API_PATH}/${id}`, projectData);
    return dbProjectToUIProject(response.project);
  } catch (error) {
    console.error(`Error updating project with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a project
 */
export const deleteProject = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`${PROJECT_API_PATH}/${id}`);
  } catch (error) {
    console.error(`Error deleting project with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Fetch projects by advisor ID
 */
export const fetchProjectsByAdvisor = async (advisorId: number): Promise<UIProject[]> => {
  try {
    const params = new URLSearchParams({
      advisorId: advisorId.toString()
    });
    
    const response = await apiClient.get<ProjectListResponse>(
      `${PROJECT_API_PATH}/advisor?${params.toString()}`
    );
    
    return response.projects.map(dbProjectToUIProject);
  } catch (error) {
    console.error(`Error fetching projects for advisor ${advisorId}:`, error);
    throw error;
  }
}; 