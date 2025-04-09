import { Project } from '../types';
import { projectMembers, advisors } from './users';
import { modelProjects } from './models-data';
import { 
  dbProjectToUIProject, 
  getUIProjectByDbId, 
  getAllUIProjects 
} from '../adapters';

// Convert model projects to UI projects
export const projects: Project[] = getAllUIProjects();

// Helper function to get project by ID
export const getProjectById = (id: number): Project | undefined => {
  return getUIProjectByDbId(id);
};

// Helper function to get projects by status
export const getProjectsByStatus = (status: string): Project[] => {
  return projects.filter(project => project.status === status);
};

// Helper function to get projects by advisor ID
export const getProjectsByAdvisor = (advisorId: number): Project[] => {
  return projects.filter(project => project.advisor.id === advisorId);
};

// Helper function to get projects by team member ID
export const getProjectsByTeamMember = (memberId: number): Project[] => {
  return projects.filter(project => 
    project.teamMembers.some(member => member.id === memberId)
  );
};

// Helper function to get starred projects
export const getStarredProjects = (): Project[] => {
  return projects.filter(project => project.isStarred);
};

// Helper function to get owned projects
export const getOwnedProjects = (): Project[] => {
  return projects.filter(project => project.isOwner);
}; 