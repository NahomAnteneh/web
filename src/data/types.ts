// Project related types
export type ProjectStatus = "In Progress" | "Completed" | "On Hold" | "Not Started" | "Under Review" | "Submitted" | "Archived";
export type PriorityLevel = "Low" | "Medium" | "High" | "Urgent";
export type SortOption = "name" | "progress" | "dueDate" | "lastUpdated" | "status";

export interface User {
  id: number;
  name: string;
  email: string;
  role: "student" | "advisor" | "evaluator" | "admin";
  avatar: string;
}

export interface ProjectMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
}

export interface Advisor {
  id: number;
  name: string;
  department: string;
  avatar: string;
}

export interface Team {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  avatarUrl: string;
  members: ProjectMember[];
  projects: number[];
  department: string;
  isLead: boolean;
  isMember: boolean;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  lastUpdated: string;
  createdAt: string;
  dueDate: string;
  teamMembers: ProjectMember[];
  advisor: Advisor;
  repositoryUrl: string;
  isStarred: boolean;
  isOwner: boolean;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "In Review" | "Done";
  priority: PriorityLevel;
  dueDate: string;
  createdAt: string;
  assigneeId: number;
  assignee?: ProjectMember;
  projectId: number;
  tags: string[];
}

export interface Milestone {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  completedDate?: string;
  status: "Not Started" | "In Progress" | "Completed";
  projectId: number;
}

export interface Repository {
  id: number;
  name: string;
  description: string;
  url: string;
  language: string;
  stars: number;
  forks: number;
  lastUpdated: string;
  projectId: number;
}

export interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: "alert" | "info" | "warning" | "success";
}

// Export comprehensive data models from models.ts
// These models represent the complete database schema for the Project Repository Platform
export * from './models'; 