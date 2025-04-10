import { ProjectFormValues } from "@/lib/validations/project";
import { Project as DbProject } from "@/data/models";
import { Project as UIProject, ProjectStatus } from "@/data/types";

/**
 * Convert project form values to database project model
 * 
 * @param formValues Values from the project form
 * @returns Database project model
 */
export function formToDbProject(formValues: ProjectFormValues): Omit<DbProject, 'id' | 'createdAt' | 'updatedAt'> {
  return {
    groupId: formValues.groupId,
    projectName: formValues.name,
    description: formValues.description,
    startDate: formValues.startDate,
    endDate: formValues.endDate,
  };
}

/**
 * Convert database project model to form values
 * 
 * @param dbProject Database project model
 * @param teamMemberIds Array of team member IDs
 * @param advisorId Optional advisor ID
 * @param repositoryUrl Optional repository URL
 * @returns Project form values
 */
export function dbProjectToForm(
  dbProject: DbProject, 
  teamMemberIds: number[] = [], 
  advisorId?: number,
  repositoryUrl?: string,
  status: ProjectStatus = "Not Started"
): ProjectFormValues {
  return {
    name: dbProject.projectName,
    description: dbProject.description,
    status: status,
    startDate: dbProject.startDate,
    endDate: dbProject.endDate,
    teamMembers: teamMemberIds,
    advisorId: advisorId,
    repositoryUrl: repositoryUrl,
    groupId: dbProject.groupId,
  };
}

/**
 * Convert UI project to form values
 * 
 * @param uiProject UI project model
 * @returns Project form values
 */
export function uiProjectToForm(uiProject: UIProject): ProjectFormValues {
  return {
    name: uiProject.name,
    description: uiProject.description,
    status: uiProject.status,
    startDate: uiProject.createdAt.split("T")[0], // Extract YYYY-MM-DD from ISO date
    endDate: uiProject.dueDate.split("T")[0], // Extract YYYY-MM-DD from ISO date
    teamMembers: uiProject.teamMembers.map(member => member.id),
    advisorId: uiProject.advisor ? uiProject.advisor.id : undefined,
    repositoryUrl: uiProject.repositoryUrl,
    groupId: 0, // This needs to be determined from other data
  };
}

/**
 * Calculate project progress based on dates
 * 
 * @param startDate Project start date
 * @param endDate Project end date
 * @returns Progress percentage (0-100)
 */
export function calculateProjectProgress(startDate: string, endDate: string): number {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const now = new Date().getTime();
  
  if (now <= start) return 0;
  if (now >= end) return 100;
  
  const totalDuration = end - start;
  const elapsedDuration = now - start;
  const progress = Math.round((elapsedDuration / totalDuration) * 100);
  
  return progress;
} 