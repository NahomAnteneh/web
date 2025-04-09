# Project Repository Platform Data Models

This document explains the relationship between the UI-focused types and the database schema models in the Project Repository Platform.

## Architecture Overview

The application uses a two-layer data model approach:

1. **Database Schema Models** (`models.ts`): These represent the actual data structure as it exists in the database.
2. **UI-Focused Types** (`types.ts`): These are optimized for frontend display and component props.

## Database Schema Models

The comprehensive data models in `models.ts` include:

| Model | Description |
|-------|-------------|
| User | Represents user accounts in the system |
| Role | User roles with associated permissions |
| Group | Project groups/teams |
| GroupMember | Junction table for group membership |
| Project | Project information |
| Repository | Git repository metadata |
| Commit | Git commit information |
| CommitParent | Parent-child relationship between commits |
| Tree | Git tree objects |
| TreeEntry | Entries in a Git tree |
| File | Files in the repository |
| FileVersion | File versions tied to commits |
| Branch | Git branches |
| Task | Project tasks |
| Feedback | Project feedback |
| MergeRequest | Git merge requests |
| IndexEntry | Git index entries |

## UI Types

The UI-focused types in `types.ts` are designed for use in the frontend components:

| Type | Description |
|------|-------------|
| User | Simplified user information for display |
| ProjectMember | Team member with role information |
| Advisor | Advisor details with department |
| Team | Team information with members |
| Project | Project with progress and status |
| Task | Task with assignment and status |
| Milestone | Project milestone |
| Repository | Repository with stars, forks, and language |
| Notification | User notifications |

## Adapters

The `adapters.ts` file contains functions that convert between the database models and UI types:

| Adapter | Description |
|---------|-------------|
| dbUserToUIUser | Converts a database User to a UI User |
| uiUserToDbUser | Converts a UI User to a database User |
| dbProjectToUIProject | Converts a database Project to a UI Project |
| dbRepositoryToUIRepository | Converts a database Repository to a UI Repository |

## Usage in the Application

### For UI Components

UI components should import and use the UI-focused types:

```tsx
import { Project, User } from '@/data/types';

function ProjectCard({ project }: { project: Project }) {
  // Component implementation
}
```

### For Data Access/Manipulation

When working with data that needs to be saved to the database, use the database models:

```tsx
import { Project as DbProject } from '@/data/models';
import { dbProjectToUIProject } from '@/data/adapters';

function saveProject(dbProject: DbProject) {
  // Save to database...
  const uiProject = dbProjectToUIProject(dbProject);
  // Update UI with converted project
}
```

## Future API Integration

When integrating with a real backend API:

1. API calls will return data in the format of the database models
2. The adapter functions will convert this data to UI types for display
3. Forms will collect UI type data and convert it back to database models for API requests

This approach ensures a clean separation between the data as it exists in the database and how it's presented in the UI. 