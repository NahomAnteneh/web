/**
 * API Services Index
 * 
 * Exports all API service functions for use throughout the application
 */

// Export the base API client
export { default as apiClient } from './client';

// Export all service functions
export * from './users';
export * from './projects';
export * from './repositories';

/**
 * Example of how to use these API services in a component:
 * 
 * ```tsx
 * import { fetchProjects, fetchUserById } from '@/data/api';
 * import { useState, useEffect } from 'react';
 * 
 * export function ProjectsPage() {
 *   const [projects, setProjects] = useState([]);
 *   const [loading, setLoading] = useState(true);
 *   const [error, setError] = useState(null);
 * 
 *   useEffect(() => {
 *     async function loadProjects() {
 *       try {
 *         setLoading(true);
 *         const response = await fetchProjects();
 *         setProjects(response.projects);
 *       } catch (err) {
 *         setError(err);
 *       } finally {
 *         setLoading(false);
 *       }
 *     }
 * 
 *     loadProjects();
 *   }, []);
 * 
 *   // Component implementation
 * }
 * ```
 */

// Re-export mock data for fallback during development
export * as mockData from '../mock';

/**
 * During development, you can conditionally use either the API or mock data:
 * 
 * ```tsx
 * import { fetchProjects, mockData } from '@/data/api';
 * 
 * // If API is not yet available or for local development without backend
 * const { projects } = USE_MOCK_DATA ? mockData : await fetchProjects();
 * ```
 */ 