/**
 * Project Repository Platform Data Models
 * 
 * These models are derived from the functional requirements and use case descriptions.
 */

// 1. User Model
export interface User {
  id: number;
  username: string;
  password: string; // Note: In a real implementation, passwords should not be stored directly
  email: string;
  firstName: string;
  lastName: string;
  roleId: number;
  createdAt: string;
  updatedAt: string;
}

// 2. Role Model
export interface Role {
  id: number;
  roleName: string;
  permissions: string; // JSON string representation of permissions
}

// 3. Group Model
export interface Group {
  id: number;
  groupName: string;
  leaderId: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

// 4. GroupMember Model (junction table)
export interface GroupMember {
  groupId: number;
  userId: number;
  joinDate: string;
}

// 5. Project Model
export interface Project {
  id: number;
  groupId: number;
  projectName: string;
  description: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

// 6. Repository Model
export interface Repository {
  id: number;
  projectId: number;
  createdAt: string;
}

// 7. Commit Model
export interface Commit {
  id: string; // SHA-256 hash
  repositoryId: number;
  authorId: number;
  committerId: number;
  message: string;
  commitTime: string;
  treeId: string; // SHA-256 hash
  author: string;
  committer: string;
  createdAt: string;
}

// 8. CommitParent Model (junction table)
export interface CommitParent {
  commitId: string;
  parentId: string;
}

// 9. Tree Model
export interface Tree {
  id: string; // SHA-256 hash
  repositoryId: number;
  createdAt: string;
}

// 10. TreeEntry Model
export interface TreeEntry {
  treeId: string;
  mode: number;
  name: string;
  hash: string; // SHA-256 hash
  type: 'blob' | 'tree';
}

// 11. File Model
export interface File {
  id: number;
  repositoryId: number;
  filePath: string;
  createdAt: string;
}

// 12. FileVersion Model
export interface FileVersion {
  id: number;
  fileId: number;
  commitId: string;
  contentHash: string; // SHA-256 hash
  createdAt: string;
}

// 13. Branch Model
export interface Branch {
  id: number;
  repositoryId: number;
  branchName: string;
  commitId: string;
  createdAt: string;
}

// 14. Task Model
export interface Task {
  id: number;
  groupId: number;
  assignedTo: number;
  description: string;
  deadline: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

// 15. Feedback Model
export interface Feedback {
  id: number;
  projectId: number;
  userId: number;
  feedbackText: string;
  createdAt: string;
  updatedAt: string;
}

// 16. MergeRequest Model
export interface MergeRequest {
  id: number;
  targetBranchId: number;
  sourceBranchId: number;
  status: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

// 17. IndexEntry Model
export interface IndexEntry {
  id: number;
  repositoryId: number;
  mode: number;
  filePath: string;
  sha256: string;
  fileSize: number;
  mTime: string;
  stage: number;
  baseSha: string;
  ourSha: string;
  theirSha: string;
  createdAt: string;
} 