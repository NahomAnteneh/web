import { User, ProjectMember, Advisor } from '../types';
import { modelUsers } from './models-data';
import { dbUserToUIUser, getUIUserByDbId } from '../adapters';

// Convert model users to UI users
export const users: User[] = modelUsers.map(dbUserToUIUser);

// Mock project members data
export const projectMembers: ProjectMember[] = [
  {
    id: 1,
    name: "John Doe",
    role: "Team Lead",
    avatar: "/avatars/01.png"
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Developer",
    avatar: "/avatars/02.png"
  },
  {
    id: 3,
    name: "Alice Brown",
    role: "Team Lead",
    avatar: "/avatars/04.png"
  },
  {
    id: 4,
    name: "Bob Wilson",
    role: "Researcher",
    avatar: "/avatars/05.png"
  },
  {
    id: 5,
    name: "Charlie Davis",
    role: "Team Lead",
    avatar: "/avatars/07.png"
  },
  {
    id: 6,
    name: "Diana Evans",
    role: "Frontend Developer",
    avatar: "/avatars/08.png"
  },
  {
    id: 7,
    name: "Olivia Garcia",
    role: "Backend Developer",
    avatar: "/avatars/user9.png"
  },
  {
    id: 8,
    name: "Ethan Wilson",
    role: "DevOps Engineer",
    avatar: "/avatars/user10.png"
  },
  {
    id: 9,
    name: "Sophia Clark",
    role: "Project Manager",
    avatar: "/avatars/user12.png"
  },
  {
    id: 10,
    name: "Daniel Wright",
    role: "Cloud Architect",
    avatar: "/avatars/user13.png"
  }
];

// Mock advisors data
export const advisors: Advisor[] = [
  {
    id: 1,
    name: "Dr. Johnson",
    department: "Computer Science",
    avatar: "/avatars/03.png"
  },
  {
    id: 2,
    name: "Dr. Smith",
    department: "Computer Science",
    avatar: "/avatars/06.png"
  },
  {
    id: 3,
    name: "Dr. Taylor",
    department: "Computer Science",
    avatar: "/avatars/09.png"
  },
  {
    id: 4,
    name: "Dr. Amanda Lee",
    department: "Software Engineering",
    avatar: "/avatars/user11.png"
  },
  {
    id: 5,
    name: "Dr. Thomas Brown",
    department: "Cloud Computing",
    avatar: "/avatars/user14.png"
  }
];

// Helper function to get user by ID
export const getUserById = (id: number): User | undefined => {
  return getUIUserByDbId(id);
};

// Helper function to get project member by ID
export const getProjectMemberById = (id: number): ProjectMember | undefined => {
  return projectMembers.find(member => member.id === id);
};

// Helper function to get advisor by ID
export const getAdvisorById = (id: number): Advisor | undefined => {
  return advisors.find(advisor => advisor.id === id);
}; 