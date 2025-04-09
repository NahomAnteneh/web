import { Team } from '../types';
import { projectMembers } from './users';
import { groups } from './models-data';
import { 
  dbGroupToUITeam, 
  getUITeamByDbId,
  getAllUITeams
} from '../adapters';

// Convert model groups to UI teams
export const teams: Team[] = getAllUITeams();

// Helper function to get team by ID
export const getTeamById = (id: number): Team | undefined => {
  return getUITeamByDbId(id);
};

// Helper function to get teams by department
export const getTeamsByDepartment = (department: string): Team[] => {
  return teams.filter(team => team.department === department);
};

// Helper function to get teams by member ID
export const getTeamsByMember = (memberId: number): Team[] => {
  return teams.filter(team => 
    team.members.some(member => member.id === memberId)
  );
};

// Helper function to get teams where user is lead
export const getTeamsAsLead = (): Team[] => {
  return teams.filter(team => team.isLead);
};

// Helper function to get teams where user is member
export const getTeamsAsMember = (): Team[] => {
  return teams.filter(team => team.isMember);
}; 