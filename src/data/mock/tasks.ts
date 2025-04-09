import { Task, Milestone } from '../types';
import { projectMembers } from './users';

// Mock tasks data
export const tasks: Task[] = [
  {
    id: 1,
    title: "Database Schema Design",
    description: "Design the database schema for the core system",
    status: "Done",
    priority: "High",
    dueDate: "2024-02-10T23:59:59Z",
    createdAt: "2024-01-20T09:30:00Z",
    assigneeId: 1,
    assignee: projectMembers[0],
    projectId: 1,
    tags: ["Database", "Design", "Documentation"]
  },
  {
    id: 2,
    title: "Implement Query Optimizer",
    description: "Develop the query optimization engine for efficient data retrieval",
    status: "In Progress",
    priority: "High",
    dueDate: "2024-04-15T23:59:59Z",
    createdAt: "2024-02-05T11:45:00Z",
    assigneeId: 2,
    assignee: projectMembers[1],
    projectId: 1,
    tags: ["Database", "Performance", "Algorithm"]
  },
  {
    id: 3,
    title: "Implement Authentication Layer",
    description: "Create a secure authentication system for API access",
    status: "To Do",
    priority: "Medium",
    dueDate: "2024-04-25T23:59:59Z",
    createdAt: "2024-03-01T10:20:00Z",
    assigneeId: 1,
    assignee: projectMembers[0],
    projectId: 1,
    tags: ["Security", "API", "Authentication"]
  },
  {
    id: 4,
    title: "Feature Selection Algorithm",
    description: "Research and implement automated feature selection for ML models",
    status: "In Review",
    priority: "Medium",
    dueDate: "2024-03-05T23:59:59Z",
    createdAt: "2024-01-25T14:15:00Z",
    assigneeId: 3,
    assignee: projectMembers[2],
    projectId: 2,
    tags: ["ML", "Algorithm", "Research"]
  },
  {
    id: 5,
    title: "Hyperparameter Tuning",
    description: "Implement hyperparameter tuning for model optimization",
    status: "Done",
    priority: "High",
    dueDate: "2024-03-01T23:59:59Z",
    createdAt: "2024-01-20T09:00:00Z",
    assigneeId: 4,
    assignee: projectMembers[3],
    projectId: 2,
    tags: ["ML", "Optimization", "Performance"]
  },
  {
    id: 6,
    title: "UI Component Library",
    description: "Create reusable UI component library for the web application",
    status: "Done",
    priority: "Medium",
    dueDate: "2024-02-10T23:59:59Z",
    createdAt: "2024-01-10T12:45:00Z",
    assigneeId: 6,
    assignee: projectMembers[5],
    projectId: 3,
    tags: ["Frontend", "UI", "Components"]
  },
  {
    id: 7,
    title: "API Gateway Authentication",
    description: "Implement JWT authentication for the API gateway",
    status: "In Progress",
    priority: "High",
    dueDate: "2024-04-10T23:59:59Z",
    createdAt: "2024-02-15T10:30:00Z",
    assigneeId: 7,
    assignee: projectMembers[6],
    projectId: 4,
    tags: ["API", "Security", "Authentication"]
  },
  {
    id: 8,
    title: "Rate Limiting Implementation",
    description: "Add rate limiting features to the API gateway",
    status: "To Do",
    priority: "Medium",
    dueDate: "2024-04-30T23:59:59Z",
    createdAt: "2024-03-01T13:15:00Z",
    assigneeId: 8,
    assignee: projectMembers[7],
    projectId: 4,
    tags: ["API", "Performance", "Security"]
  },
  {
    id: 9,
    title: "Cloud Infrastructure Planning",
    description: "Plan cloud infrastructure requirements and architecture",
    status: "Done",
    priority: "High",
    dueDate: "2024-02-15T23:59:59Z",
    createdAt: "2024-01-15T09:45:00Z",
    assigneeId: 10,
    assignee: projectMembers[9],
    projectId: 5,
    tags: ["Cloud", "Architecture", "Planning"]
  },
  {
    id: 10,
    title: "Migration Strategy Document",
    description: "Create detailed migration strategy and timeline document",
    status: "Done",
    priority: "High",
    dueDate: "2024-03-01T23:59:59Z",
    createdAt: "2024-02-01T14:30:00Z",
    assigneeId: 9,
    assignee: projectMembers[8],
    projectId: 5,
    tags: ["Documentation", "Planning", "Migration"]
  }
];

// Mock milestones data
export const milestones: Milestone[] = [
  {
    id: 1,
    title: "Database Design Complete",
    description: "Complete the database design including schema, indexes, and relationships",
    dueDate: "2024-02-15T23:59:59Z",
    completedDate: "2024-02-12T16:30:00Z",
    status: "Completed",
    projectId: 1
  },
  {
    id: 2,
    title: "MVP Database Implementation",
    description: "First working version of the database with basic CRUD operations",
    dueDate: "2024-03-31T23:59:59Z",
    status: "In Progress",
    projectId: 1
  },
  {
    id: 3,
    title: "Final Performance Optimizations",
    description: "Complete all performance optimizations and stress testing",
    dueDate: "2024-04-25T23:59:59Z",
    status: "Not Started",
    projectId: 1
  },
  {
    id: 4,
    title: "ML Algorithm Selection",
    description: "Research and select appropriate ML algorithms for the project",
    dueDate: "2024-02-20T23:59:59Z",
    completedDate: "2024-02-18T11:45:00Z",
    status: "Completed",
    projectId: 2
  },
  {
    id: 5,
    title: "Model Training and Validation",
    description: "Complete training and validation of selected models",
    dueDate: "2024-03-10T23:59:59Z",
    completedDate: "2024-03-09T14:20:00Z",
    status: "Completed",
    projectId: 2
  },
  {
    id: 6,
    title: "Frontend Components",
    description: "Complete development of all frontend components",
    dueDate: "2024-02-20T23:59:59Z",
    completedDate: "2024-02-15T17:30:00Z",
    status: "Completed",
    projectId: 3
  },
  {
    id: 7,
    title: "Backend Integration",
    description: "Integrate frontend with backend services",
    dueDate: "2024-03-05T23:59:59Z",
    completedDate: "2024-03-03T12:45:00Z",
    status: "Completed",
    projectId: 3
  },
  {
    id: 8,
    title: "API Gateway Core Features",
    description: "Implement core routing and proxy features",
    dueDate: "2024-03-15T23:59:59Z",
    completedDate: "2024-03-10T16:30:00Z",
    status: "Completed",
    projectId: 4
  },
  {
    id: 9,
    title: "Security Features",
    description: "Implement authentication, authorization, and encryption",
    dueDate: "2024-04-30T23:59:59Z",
    status: "In Progress",
    projectId: 4
  },
  {
    id: 10,
    title: "Migration Planning",
    description: "Complete detailed migration planning and documentation",
    dueDate: "2024-03-01T23:59:59Z",
    completedDate: "2024-02-28T15:20:00Z",
    status: "Completed",
    projectId: 5
  }
];

// Helper function to get task by ID
export const getTaskById = (id: number): Task | undefined => {
  return tasks.find(task => task.id === id);
};

// Helper function to get tasks by project ID
export const getTasksByProject = (projectId: number): Task[] => {
  return tasks.filter(task => task.projectId === projectId);
};

// Helper function to get tasks by assignee ID
export const getTasksByAssignee = (assigneeId: number): Task[] => {
  return tasks.filter(task => task.assigneeId === assigneeId);
};

// Helper function to get tasks by status
export const getTasksByStatus = (status: string): Task[] => {
  return tasks.filter(task => task.status === status);
};

// Helper function to get milestone by ID
export const getMilestoneById = (id: number): Milestone | undefined => {
  return milestones.find(milestone => milestone.id === id);
};

// Helper function to get milestones by project ID
export const getMilestonesByProject = (projectId: number): Milestone[] => {
  return milestones.filter(milestone => milestone.projectId === projectId);
}; 