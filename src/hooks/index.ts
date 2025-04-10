/**
 * Hooks Index
 * 
 * Exports all custom hooks for use throughout the application
 */

export * from './useUsers';
export * from './useProjects';
export * from './useGroups';
export * from './useMembers';
export * from './useAdvisors';

// Example usage in components:
/**
 * ```tsx
 * import { useUsers, useProjects } from '@/hooks';
 * import { UserList, ProjectList } from '@/components';
 * 
 * export function DashboardPage() {
 *   const { users, loading: usersLoading } = useUsers({ limit: 5 });
 *   const { projects, loading: projectsLoading } = useProjects({ limit: 5 });
 * 
 *   if (usersLoading || projectsLoading) {
 *     return <LoadingSpinner />;
 *   }
 * 
 *   return (
 *     <div>
 *       <h2>Recent Users</h2>
 *       <UserList users={users} />
 *       
 *       <h2>Recent Projects</h2>
 *       <ProjectList projects={projects} />
 *     </div>
 *   );
 * }
 * ```
 */ 