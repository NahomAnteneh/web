# Mock Data Structure

This directory contains a centralized structure for all mock data used in the Project Repository Platform (PRP) application. This approach makes it easier to maintain the mock data and eventually replace it with actual API calls to a backend server.

## Directory Structure

- `/data/types.ts` - Contains all TypeScript type definitions used throughout the application
- `/data/models.ts` - Contains comprehensive data models representing the database schema
- `/data/adapters.ts` - Contains adapter functions to convert between database models and UI types
- `/data/mock/` - Contains all mock data files organized by entity type
- `/data/mock/index.ts` - Main entry point that exports all mock data and utility functions
- `/data/mock/models-data.ts` - Mock data conforming to the database models

## Data Models

The application uses two sets of type definitions:

1. **UI-focused types** in `types.ts` - These are optimized for frontend display and component props
2. **Database-schema models** in `models.ts` - These represent the actual data structure as it exists in the database

For more detailed information on the data architecture, see [MODELS.md](./MODELS.md).

## Mock Data Files

- `users.ts` - Mock data for users, advisors, and team members
- `projects.ts` - Mock data for projects
- `teams.ts` - Mock data for teams
- `tasks.ts` - Mock data for tasks and milestones
- `repositories.ts` - Mock data for repositories
- `notifications.ts` - Mock data for notifications by user role
- `models-data.ts` - Raw mock data following the database schema models

## Usage

### Import Types

```tsx
// Import UI-focused types
import { Project, ProjectStatus, User } from '@/data/types';

// Import database schema models
import { User as UserModel, Repository as RepositoryModel } from '@/data/models';

// Import adapter functions
import { dbUserToUIUser, dbProjectToUIProject } from '@/data/adapters';
```

### Import Mock Data

```tsx
// Import specific entities
import { projects, users, tasks } from '@/data/mock';

// Import utility functions
import { 
  getProjectById, 
  getTasksByProject, 
  getUserById 
} from '@/data/mock';

// Import everything
import * as mockData from '@/data/mock';
```

### Example Usage

```tsx
import { useState, useEffect } from 'react';
import { projects, getProjectById } from '@/data/mock';
import { Project as DbProject } from '@/data/models';
import { dbProjectToUIProject } from '@/data/adapters';

export function ProjectsPage() {
  const [allProjects, setAllProjects] = useState(projects);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleSelectProject = (id: number) => {
    const project = getProjectById(id);
    setSelectedProject(project);
  };
  
  const handleSaveProject = (dbProject: DbProject) => {
    // Save to database (when implemented)
    // Convert to UI type for display
    const uiProject = dbProjectToUIProject(dbProject);
    // Update UI
  };

  // Rest of your component
}
```

## Future Integration with Backend API

When ready to replace mock data with actual API calls, you should:

1. Create a separate `/data/api` directory with the same structure as `/data/mock`
2. Implement API functions that return data with the same shape as the database models
3. Use the adapter functions to convert API responses to UI types
4. Update imports in components to use the API version instead of mock data

Example:

```tsx
// Before (using mock data)
import { projects, getProjectById } from '@/data/mock';

// After (using API)
import { fetchProjects, fetchProjectById } from '@/data/api';
import { dbProjectToUIProject } from '@/data/adapters';

// In component
const projectsResponse = await fetchProjects();
const uiProjects = projectsResponse.map(dbProjectToUIProject);
```

This approach ensures a smooth transition from mock data to actual API integration. 