/**
 * Mock data for the comprehensive data models
 * This represents a simplified dataset for testing and development
 */

import {
  User,
  Role,
  Group,
  GroupMember,
  Project,
  Repository,
  Commit,
  CommitParent,
  Tree,
  TreeEntry,
  File,
  FileVersion,
  Branch,
  Task,
  Feedback,
  MergeRequest,
  IndexEntry
} from '../models';

// Mock Roles
export const roles: Role[] = [
  {
    id: 1,
    roleName: 'Student',
    permissions: JSON.stringify(['view_projects', 'edit_own_projects', 'create_tasks'])
  },
  {
    id: 2,
    roleName: 'Advisor',
    permissions: JSON.stringify(['view_all_projects', 'provide_feedback', 'approve_merge_requests'])
  },
  {
    id: 3,
    roleName: 'Administrator',
    permissions: JSON.stringify(['manage_users', 'manage_groups', 'manage_all_projects'])
  }
];

// Mock Users
export const modelUsers: User[] = [
  {
    id: 1,
    username: 'john.doe',
    password: 'hashed_password_1',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    roleId: 1, // Student
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z'
  },
  {
    id: 2,
    username: 'jane.smith',
    password: 'hashed_password_2',
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    roleId: 1, // Student
    createdAt: '2023-01-02T00:00:00Z',
    updatedAt: '2023-01-02T00:00:00Z'
  },
  {
    id: 3,
    username: 'prof.johnson',
    password: 'hashed_password_3',
    email: 'prof.johnson@example.com',
    firstName: 'Robert',
    lastName: 'Johnson',
    roleId: 2, // Advisor
    createdAt: '2023-01-03T00:00:00Z',
    updatedAt: '2023-01-03T00:00:00Z'
  },
  {
    id: 4,
    username: 'admin.user',
    password: 'hashed_password_4',
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'User',
    roleId: 3, // Administrator
    createdAt: '2023-01-04T00:00:00Z',
    updatedAt: '2023-01-04T00:00:00Z'
  }
];

// Mock Groups
export const groups: Group[] = [
  {
    id: 1,
    groupName: 'Project Team Alpha',
    leaderId: 1, // John Doe
    description: 'Team working on the Alpha project for Software Engineering course',
    createdAt: '2023-02-01T00:00:00Z',
    updatedAt: '2023-02-01T00:00:00Z'
  },
  {
    id: 2,
    groupName: 'Database Research Group',
    leaderId: 2, // Jane Smith
    description: 'Research group focused on database optimization techniques',
    createdAt: '2023-02-05T00:00:00Z',
    updatedAt: '2023-02-05T00:00:00Z'
  }
];

// Mock Group Members
export const groupMembers: GroupMember[] = [
  {
    groupId: 1,
    userId: 1,
    joinDate: '2023-02-01T00:00:00Z'
  },
  {
    groupId: 1,
    userId: 2,
    joinDate: '2023-02-02T00:00:00Z'
  },
  {
    groupId: 2,
    userId: 2,
    joinDate: '2023-02-05T00:00:00Z'
  },
  {
    groupId: 2,
    userId: 3,
    joinDate: '2023-02-06T00:00:00Z'
  }
];

// Mock Projects
export const modelProjects: Project[] = [
  {
    id: 1,
    groupId: 1,
    projectName: 'Student Management System',
    description: 'A comprehensive system to manage student records, courses, and grades',
    startDate: '2023-03-01',
    endDate: '2023-06-30',
    createdAt: '2023-03-01T00:00:00Z',
    updatedAt: '2023-03-01T00:00:00Z'
  },
  {
    id: 2,
    groupId: 2,
    projectName: 'Database Query Optimizer',
    description: 'Research project on optimizing complex SQL queries for large datasets',
    startDate: '2023-02-15',
    endDate: '2023-12-15',
    createdAt: '2023-02-15T00:00:00Z',
    updatedAt: '2023-02-15T00:00:00Z'
  }
];

// Mock Repositories
export const modelRepositories: Repository[] = [
  {
    id: 1,
    projectId: 1,
    createdAt: '2023-03-01T00:00:00Z'
  },
  {
    id: 2,
    projectId: 2,
    createdAt: '2023-02-15T00:00:00Z'
  }
];

// Mock Branches
export const branches: Branch[] = [
  {
    id: 1,
    repositoryId: 1,
    branchName: 'main',
    commitId: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0',
    createdAt: '2023-03-01T00:00:00Z'
  },
  {
    id: 2,
    repositoryId: 1,
    branchName: 'feature/user-authentication',
    commitId: 'b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1',
    createdAt: '2023-03-15T00:00:00Z'
  }
];

// Mock Commits
export const commits: Commit[] = [
  {
    id: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0',
    repositoryId: 1,
    authorId: 1,
    committerId: 1,
    message: 'Initial commit',
    commitTime: '2023-03-01T10:00:00Z',
    treeId: 't1r2e3e4i5d6h7a8s9h0',
    author: 'John Doe <john.doe@example.com>',
    committer: 'John Doe <john.doe@example.com>',
    createdAt: '2023-03-01T10:00:00Z'
  },
  {
    id: 'b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1',
    repositoryId: 1,
    authorId: 2,
    committerId: 2,
    message: 'Add user authentication module',
    commitTime: '2023-03-15T14:30:00Z',
    treeId: 't2r3e4e5i6d7h8a9s0h1',
    author: 'Jane Smith <jane.smith@example.com>',
    committer: 'Jane Smith <jane.smith@example.com>',
    createdAt: '2023-03-15T14:30:00Z'
  }
];

// Export all mock data
export const mockModelData = {
  roles,
  modelUsers,
  groups,
  groupMembers,
  modelProjects,
  modelRepositories,
  branches,
  commits
};

export default mockModelData; 