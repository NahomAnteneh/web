/**
 * Data Adapters
 * 
 * These functions convert between UI-focused types and database models
 */

import * as UITypes from './types';
import * as Models from './models';
import { modelUsers, roles, groups, modelProjects, modelRepositories, commits, branches, groupMembers } from './mock/models-data';
import { advisors, projectMembers } from './mock/users';

/**
 * User Adapters
 */

// Convert database User model to UI User type
export function dbUserToUIUser(dbUser: Models.User): UITypes.User {
  const role = roles.find(r => r.id === dbUser.roleId);
  let roleType: "student" | "advisor" | "evaluator" | "admin" = "student";
  
  if (role) {
    switch(role.roleName.toLowerCase()) {
      case 'student': roleType = "student"; break;
      case 'advisor': roleType = "advisor"; break;
      case 'evaluator': roleType = "evaluator"; break;
      case 'administrator': roleType = "admin"; break;
    }
  }
  
  return {
    id: dbUser.id,
    name: `${dbUser.firstName} ${dbUser.lastName}`,
    email: dbUser.email,
    role: roleType,
    avatar: `/avatars/${dbUser.id < 10 ? '0' + dbUser.id : dbUser.id}.png`
  };
}

// Convert UI User type to database User model (partial, for updates)
export function uiUserToDbUser(uiUser: UITypes.User): Partial<Models.User> {
  const nameParts = uiUser.name.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');
  
  const roleMap: Record<string, number> = {
    "student": 1,
    "advisor": 2,
    "admin": 3,
    "evaluator": 4
  };
  
  return {
    id: uiUser.id,
    firstName,
    lastName,
    email: uiUser.email,
    roleId: roleMap[uiUser.role] || 1
  };
}

/**
 * Project Adapters
 */

// Convert database Project model to UI Project type
export function dbProjectToUIProject(dbProject: Models.Project): UITypes.Project {
  // Find the group for this project
  const group = groups.find(g => g.id === dbProject.groupId);
  
  // Find the team members
  const teamMemberIds = group ? 
    modelUsers
      .filter(u => group.leaderId === u.id)
      .map(u => u.id) 
    : [];
  
  // Find the advisors associated with the group/project
  const projectAdvisor = advisors.find(a => a.id === 1) || advisors[0]; // Default to first advisor
  
  // Find the repository
  const repository = modelRepositories.find(r => r.projectId === dbProject.id);
  
  return {
    id: dbProject.id,
    name: dbProject.projectName,
    description: dbProject.description,
    status: mapProjectStatus(dbProject),
    progress: calculateProjectProgress(dbProject),
    lastUpdated: dbProject.updatedAt,
    createdAt: dbProject.createdAt,
    dueDate: dbProject.endDate,
    teamMembers: teamMemberIds.map(id => projectMembers.find(m => m.id === id) || projectMembers[0]),
    advisor: projectAdvisor,
    repositoryUrl: repository ? `/repository/${repository.id}` : '',
    isStarred: Math.random() > 0.5, // Mock data
    isOwner: Math.random() > 0.5 // Mock data
  };
}

// Helper function to map project status
function mapProjectStatus(dbProject: Models.Project): UITypes.ProjectStatus {
  // Calculate days remaining
  const now = new Date();
  const endDate = new Date(dbProject.endDate);
  const daysRemaining = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysRemaining < 0) {
    return "Completed";
  } else if (daysRemaining < 7) {
    return "Under Review";
  } else {
    return "In Progress";
  }
}

// Helper function to calculate project progress
function calculateProjectProgress(dbProject: Models.Project): number {
  const startDate = new Date(dbProject.startDate);
  const endDate = new Date(dbProject.endDate);
  const now = new Date();
  
  const totalDuration = endDate.getTime() - startDate.getTime();
  const elapsed = now.getTime() - startDate.getTime();
  
  // Calculate progress based on time elapsed
  let progress = Math.round((elapsed / totalDuration) * 100);
  
  // Ensure progress is between 0 and 100
  progress = Math.max(0, Math.min(100, progress));
  
  return progress;
}

/**
 * Repository Adapters
 */

// Convert database Repository model to UI Repository type
export function dbRepositoryToUIRepository(dbRepo: Models.Repository): UITypes.Repository {
  // Find associated project
  const project = modelProjects.find(p => p.id === dbRepo.projectId);
  const projectName = project ? project.projectName : "Unknown Project";
  
  // Find latest commit for this repository
  const latestCommit = commits
    .filter(c => c.repositoryId === dbRepo.id)
    .sort((a, b) => new Date(b.commitTime).getTime() - new Date(a.commitTime).getTime())[0];
  
  // Get branch count
  const branchCount = branches.filter(b => b.repositoryId === dbRepo.id).length;
  
  return {
    id: dbRepo.id,
    name: projectName.toLowerCase().replace(/\s+/g, '-'),
    description: project?.description || "Repository description",
    url: `https://github.com/org/${projectName.toLowerCase().replace(/\s+/g, '-')}`,
    language: ["TypeScript", "Python", "Go", "Java", "C++"][Math.floor(Math.random() * 5)],
    stars: Math.floor(Math.random() * 50) + 5,
    forks: Math.floor(Math.random() * 15) + 1,
    lastUpdated: latestCommit?.commitTime || dbRepo.createdAt,
    projectId: dbRepo.projectId
  };
}

/**
 * Team/Group Adapters
 */

// Convert database Group model to UI Team type
export function dbGroupToUITeam(dbGroup: Models.Group): UITypes.Team {
  // Find members of this group
  const memberIds = groupMembers
    .filter(gm => gm.groupId === dbGroup.id)
    .map(gm => gm.userId);
  
  // Find projects associated with this group
  const groupProjects = modelProjects
    .filter(p => p.groupId === dbGroup.id)
    .map(p => p.id);
  
  // Get department from the leader
  const leader = modelUsers.find(u => u.id === dbGroup.leaderId);
  const department = leader?.roleId === 2 ? "Computer Science" : "General";
  
  return {
    id: dbGroup.id,
    name: dbGroup.groupName,
    description: dbGroup.description,
    createdAt: dbGroup.createdAt,
    avatarUrl: `/teams/team-${dbGroup.id}.png`,
    members: memberIds.map(id => projectMembers.find(m => m.id === id) || projectMembers[0]),
    projects: groupProjects,
    department,
    isLead: Math.random() > 0.5, // Mock data 
    isMember: Math.random() > 0.5 // Mock data
  };
}

// Convert UI Team type to database Group model (partial, for updates)
export function uiTeamToDbGroup(uiTeam: UITypes.Team): Partial<Models.Group> {
  return {
    id: uiTeam.id,
    groupName: uiTeam.name,
    description: uiTeam.description
  };
}

// Get all UI teams from database groups
export function getAllUITeams(): UITypes.Team[] {
  return groups.map(dbGroupToUITeam);
}

// Get UI team by database group ID
export function getUITeamByDbId(dbGroupId: number): UITypes.Team | undefined {
  const dbGroup = groups.find(g => g.id === dbGroupId);
  return dbGroup ? dbGroupToUITeam(dbGroup) : undefined;
}

/**
 * Helper functions for working with both model types
 */

// Get UI user by database user ID
export function getUIUserByDbId(dbUserId: number): UITypes.User | undefined {
  const dbUser = modelUsers.find(u => u.id === dbUserId);
  return dbUser ? dbUserToUIUser(dbUser) : undefined;
}

// Get UI project by database project ID
export function getUIProjectByDbId(dbProjectId: number): UITypes.Project | undefined {
  const dbProject = modelProjects.find(p => p.id === dbProjectId);
  return dbProject ? dbProjectToUIProject(dbProject) : undefined;
}

// Get UI repository by database repository ID
export function getUIRepositoryByDbId(dbRepoId: number): UITypes.Repository | undefined {
  const dbRepo = modelRepositories.find(r => r.id === dbRepoId);
  return dbRepo ? dbRepositoryToUIRepository(dbRepo) : undefined;
}

// Get all UI projects from database projects
export function getAllUIProjects(): UITypes.Project[] {
  return modelProjects.map(dbProjectToUIProject);
}

// Get all UI repositories from database repositories
export function getAllUIRepositories(): UITypes.Repository[] {
  return modelRepositories.map(dbRepositoryToUIRepository);
} 