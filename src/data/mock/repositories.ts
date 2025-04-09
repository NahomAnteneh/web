import { Repository } from '../types';
import { modelRepositories } from './models-data';
import { 
  dbRepositoryToUIRepository, 
  getUIRepositoryByDbId,
  getAllUIRepositories
} from '../adapters';

// Convert model repositories to UI repositories
export const repositories: Repository[] = getAllUIRepositories();

// Helper function to get repository by ID
export const getRepositoryById = (id: number): Repository | undefined => {
  return getUIRepositoryByDbId(id);
};

// Helper function to get repository by project ID
export const getRepositoryByProject = (projectId: number): Repository | undefined => {
  return repositories.find(repo => repo.projectId === projectId);
};

// Helper function to get repositories by language
export const getRepositoriesByLanguage = (language: string): Repository[] => {
  return repositories.filter(repo => repo.language === language);
};

// Helper function to get most starred repositories
export const getMostStarredRepositories = (limit: number = 5): Repository[] => {
  return [...repositories]
    .sort((a, b) => b.stars - a.stars)
    .slice(0, limit);
};

// Helper function to get recently updated repositories
export const getRecentlyUpdatedRepositories = (limit: number = 5): Repository[] => {
  return [...repositories]
    .sort((a, b) => 
      new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    )
    .slice(0, limit);
}; 