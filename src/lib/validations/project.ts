import { z } from "zod";
import { ProjectStatus } from "@/data/types";

/**
 * Project Form Schema
 * 
 * Validation schema for the project creation/edit form
 */
export const projectFormSchema = z.object({
  name: z.string()
    .min(3, { message: "Project name must be at least 3 characters" })
    .max(100, { message: "Project name must be less than 100 characters" }),
  description: z.string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(1000, { message: "Description must be less than 1000 characters" }),
  status: z.enum([
    "In Progress", 
    "Completed", 
    "On Hold", 
    "Not Started", 
    "Under Review", 
    "Submitted", 
    "Archived"
  ] as const),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Start date must be in format YYYY-MM-DD"
  }),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Due date must be in format YYYY-MM-DD"
  }),
  teamMembers: z.array(z.number()).min(1, { 
    message: "Project must have at least one team member" 
  }),
  advisorId: z.number().optional(),
  repositoryUrl: z.string().url({ message: "Please enter a valid URL" }).optional(),
  groupId: z.number(),
});

// Derived type from the schema
export type ProjectFormValues = z.infer<typeof projectFormSchema>;

/**
 * Database Project Schema
 * 
 * Validation schema for the database project model
 */
export const dbProjectSchema = z.object({
  id: z.number().optional(),
  groupId: z.number(),
  projectName: z.string().min(3),
  description: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

// Derived type from the schema
export type DbProjectValues = z.infer<typeof dbProjectSchema>; 