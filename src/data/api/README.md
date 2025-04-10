# API Services

This directory contains services for interacting with the Project Repository Platform backend API. The services follow a consistent pattern, using the adapter functions to convert between database models and UI types.

## Service Structure

Each service file:
1. Imports the necessary database models and adapter functions
2. Defines response interface types
3. Implements CRUD operations and other specialized functions
4. Handles error cases appropriately

## Available Services

- **users.ts** - Services for user management
- **projects.ts** - Services for project management
- **repositories.ts** - Services for repository management

## Base Client

The `client.ts` file provides a configurable API client for making HTTP requests, including:

- Base URL configuration (can be overridden with environment variables)
- Authorization header handling
- Error handling
- Utility functions for common HTTP verbs (GET, POST, PUT, PATCH, DELETE)

## Usage Examples

### Basic Usage

```tsx
import { fetchProjects, fetchUserById } from '@/data/api';
import { useState, useEffect } from 'react';

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetchProjects();
        setProjects(response.projects);
      } catch (error) {
        console.error('Failed to load projects:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, []);
  
  // Component implementation
}
```

### With Custom Hooks

For more convenient data fetching, use the custom hooks provided in `src/hooks`:

```tsx
import { useProjects } from '@/hooks';

function ProjectsPage() {
  const { 
    projects, 
    loading, 
    error, 
    fetchMore 
  } = useProjects({ limit: 10 });
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  
  return (
    <div>
      <ProjectList projects={projects} />
      <LoadMoreButton onClick={() => fetchMore(page + 1)} />
    </div>
  );
}
```

### Creating or Updating Data

```tsx
import { createProject, updateProject } from '@/data/api';

async function handleSubmit(projectData) {
  try {
    if (projectData.id) {
      // Update existing project
      const updatedProject = await updateProject(projectData.id, projectData);
      console.log('Project updated:', updatedProject);
    } else {
      // Create new project
      const newProject = await createProject(projectData);
      console.log('Project created:', newProject);
    }
  } catch (error) {
    console.error('Error saving project:', error);
  }
}
```

## Fallback to Mock Data

The API services include fallback mechanisms to use mock data during development:

```tsx
import { fetchProjects, mockData } from '@/data/api';

// Configuration flag (set in environment)
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

// Choose data source based on configuration
const projectsData = USE_MOCK_DATA 
  ? mockData.projects 
  : await fetchProjects();
```

## Environment Configuration

The API client uses the following environment variables:

- `NEXT_PUBLIC_API_URL` - Base URL for the API (default: 'http://localhost:5000/api')
- `NEXT_PUBLIC_USE_MOCK_DATA` - Whether to use mock data (Boolean string, 'true' or 'false') 