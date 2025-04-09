// Export all mock data and helper functions from a single entry point
export * from './users';
export * from './projects';
export * from './teams';
export * from './tasks';
export * from './repositories';
export * from './notifications';
export * from './models-data';

// Re-export types
export * from '../types';

// Main mock data container that holds all data
import { users, advisors, projectMembers } from './users';
import { projects } from './projects';
import { teams } from './teams';
import { tasks, milestones } from './tasks';
import { repositories } from './repositories';
import { notifications } from './notifications';
import { 
  roles, 
  modelUsers, 
  groups, 
  groupMembers, 
  modelProjects, 
  modelRepositories, 
  branches, 
  commits,
  mockModelData 
} from './models-data';

export const mockData = {
  users,
  advisors,
  projectMembers,
  projects,
  teams,
  tasks,
  milestones,
  repositories,
  notifications,
  // Database schema models
  roles,
  modelUsers,
  groups,
  groupMembers,
  modelProjects,
  modelRepositories,
  branches,
  commits
};

export default mockData; 