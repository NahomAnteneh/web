/**
 * useProjects Hook
 * 
 * Custom hook to fetch and manage projects using the API services
 */

import { useState, useEffect, useCallback } from 'react';
import { Project } from '@/data/types';
import { fetchProjects, fetchProjectById, mockData } from '@/data/api';

// Set this to true to use mock data, false to use API (when backend is ready)
const USE_MOCK_DATA = true;

interface UseProjectsOptions {
  page?: number;
  limit?: number;
  groupId?: number;
  search?: string;
  status?: string;
  initialData?: Project[];
}

interface UseProjectsResult {
  projects: Project[];
  totalProjects: number;
  loading: boolean;
  error: Error | null;
  fetchMore: (newPage: number) => Promise<void>;
  refetch: () => Promise<void>;
  getProjectById: (id: number) => Promise<Project | undefined>;
}

export function useProjects(options: UseProjectsOptions = {}): UseProjectsResult {
  const {
    page = 1,
    limit = 10,
    groupId,
    search,
    status,
    initialData
  } = options;

  const [projects, setProjects] = useState<Project[]>(initialData || []);
  const [totalProjects, setTotalProjects] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(page);

  // Function to load projects
  const loadProjects = useCallback(async (pageNum: number) => {
    setLoading(true);
    setError(null);

    try {
      if (USE_MOCK_DATA) {
        // Use mock data
        let filteredProjects = [...mockData.projects];
        
        // Apply filters to mock data
        if (status) {
          filteredProjects = filteredProjects.filter(p => p.status === status);
        }
        if (search) {
          const searchLower = search.toLowerCase();
          filteredProjects = filteredProjects.filter(p => 
            p.name.toLowerCase().includes(searchLower) || 
            p.description.toLowerCase().includes(searchLower)
          );
        }
        
        // Apply pagination
        const start = (pageNum - 1) * limit;
        const paginatedProjects = filteredProjects.slice(start, start + limit);
        
        setProjects(prevProjects => 
          pageNum === 1 ? paginatedProjects : [...prevProjects, ...paginatedProjects]
        );
        setTotalProjects(filteredProjects.length);
      } else {
        // Use API
        const response = await fetchProjects(pageNum, limit, groupId, search, status);
        
        setProjects(prevProjects => 
          pageNum === 1 ? response.projects : [...prevProjects, ...response.projects]
        );
        setTotalProjects(response.total);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred while fetching projects'));
    } finally {
      setLoading(false);
    }
  }, [limit, groupId, search, status]);

  // Fetch projects on initial load and when dependencies change
  useEffect(() => {
    setCurrentPage(page);
    loadProjects(page);
  }, [loadProjects, page]);

  // Function to fetch more projects (pagination)
  const fetchMore = async (newPage: number) => {
    setCurrentPage(newPage);
    await loadProjects(newPage);
  };

  // Function to refetch current data
  const refetch = async () => {
    await loadProjects(currentPage);
  };

  // Function to get a single project by ID
  const getProjectById = async (id: number): Promise<Project | undefined> => {
    try {
      if (USE_MOCK_DATA) {
        return mockData.getProjectById(id);
      } else {
        return await fetchProjectById(id);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error(`Failed to fetch project with ID ${id}`));
      return undefined;
    }
  };

  return {
    projects,
    totalProjects,
    loading,
    error,
    fetchMore,
    refetch,
    getProjectById
  };
} 