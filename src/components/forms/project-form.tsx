"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Project types and validation
import { ProjectFormValues, projectFormSchema } from "@/lib/validations/project";
import { formToDbProject } from "@/lib/adapters/project";
import { Project, ProjectStatus } from "@/data/types";
import { ProjectMember } from "@/data/types";
import { createProject, updateProject } from "@/data/api/projects";

// Props for the form component
interface ProjectFormProps {
  initialData?: Project;
  members?: ProjectMember[];
  advisors?: { id: number; name: string }[];
  groups?: { id: number; name: string }[];
  onSuccess?: (project: Project) => void;
}

/**
 * Project Form component for creating and editing projects
 */
export function ProjectForm({
  initialData,
  members = [],
  advisors = [],
  groups = [],
  onSuccess,
}: ProjectFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set up form with validation
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          description: initialData.description,
          status: initialData.status,
          startDate: initialData.createdAt.split("T")[0],
          endDate: initialData.dueDate.split("T")[0],
          teamMembers: initialData.teamMembers.map((m) => m.id),
          advisorId: initialData.advisor?.id,
          repositoryUrl: initialData.repositoryUrl || "",
          groupId: groups.length > 0 ? groups[0].id : 0,
        }
      : {
          name: "",
          description: "",
          status: "Not Started" as ProjectStatus,
          startDate: format(new Date(), "yyyy-MM-dd"),
          endDate: format(
            new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            "yyyy-MM-dd"
          ),
          teamMembers: [],
          advisorId: undefined,
          repositoryUrl: "",
          groupId: groups.length > 0 ? groups[0].id : 0,
        },
  });

  // Handle form submission
  async function onSubmit(data: ProjectFormValues) {
    try {
      setIsSubmitting(true);
      
      // Convert form data to database model
      const dbProjectData = formToDbProject(data);
      
      let result;
      
      if (initialData?.id) {
        // Update existing project
        result = await updateProject(initialData.id, {
          ...dbProjectData,
          id: initialData.id,
        });
      } else {
        // Create new project
        result = await createProject(dbProjectData);
      }
      
      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess(result);
      } else {
        // Redirect to the project page
        router.push(`/dashboard/projects/${result.id}`);
      }
    } catch (error) {
      console.error("Error submitting project form:", error);
      // Here you could add toast notifications or other error handling
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Project Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input placeholder="My Research Project" {...field} />
              </FormControl>
              <FormDescription>
                A descriptive name for your project.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your project's objectives and scope..."
                  className="resize-none h-32"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide a detailed description of your project.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Status */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Not Started">Not Started</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="On Hold">On Hold</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                  <SelectItem value="Submitted">Submitted</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                The current status of your project.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Dates - row of start and end dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Start Date */}
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={`w-full pl-3 text-left font-normal ${
                          !field.value ? "text-muted-foreground" : ""
                        }`}
                      >
                        {field.value ? (
                          format(new Date(field.value), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={new Date(field.value)}
                      onSelect={(date) => field.onChange(format(date as Date, "yyyy-MM-dd"))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  When will your project start?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* End Date / Due Date */}
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Due Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={`w-full pl-3 text-left font-normal ${
                          !field.value ? "text-muted-foreground" : ""
                        }`}
                      >
                        {field.value ? (
                          format(new Date(field.value), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={new Date(field.value)}
                      onSelect={(date) => field.onChange(format(date as Date, "yyyy-MM-dd"))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  When is the project due?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Team Members */}
        <FormField
          control={form.control}
          name="teamMembers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Members</FormLabel>
              <Select
                onValueChange={(value) => {
                  const id = parseInt(value);
                  if (!field.value.includes(id)) {
                    field.onChange([...field.value, id]);
                  }
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Add team members" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {members
                    .filter((m) => !field.value.includes(m.id))
                    .map((member) => (
                      <SelectItem key={member.id} value={member.id.toString()}>
                        {member.name} ({member.role})
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              {/* Display selected members with remove buttons */}
              <div className="mt-2 space-y-2">
                {field.value.length > 0 ? (
                  field.value.map((id) => {
                    const member = members.find((m) => m.id === id);
                    return (
                      <div
                        key={id}
                        className="flex items-center justify-between bg-muted p-2 rounded-md"
                      >
                        <span>
                          {member?.name || `Member #${id}`}
                          {member?.role && ` (${member.role})`}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            field.onChange(
                              field.value.filter((memberId) => memberId !== id)
                            );
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No team members selected
                  </p>
                )}
              </div>

              <FormDescription>
                Select team members for this project.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Advisor */}
        <FormField
          control={form.control}
          name="advisorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Advisor</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(parseInt(value))}
                value={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an advisor" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="">No advisor</SelectItem>
                  {advisors.map((advisor) => (
                    <SelectItem
                      key={advisor.id}
                      value={advisor.id.toString()}
                    >
                      {advisor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Select a faculty advisor for this project (optional).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Repository URL */}
        <FormField
          control={form.control}
          name="repositoryUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repository URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://github.com/username/repository"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Link to your project's code repository (optional).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Group/Team */}
        <FormField
          control={form.control}
          name="groupId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team/Group</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(parseInt(value))}
                value={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a team" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {groups.map((group) => (
                    <SelectItem key={group.id} value={group.id.toString()}>
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Select which team this project belongs to.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {initialData ? "Updating..." : "Creating..."}
            </>
          ) : (
            <>{initialData ? "Update Project" : "Create Project"}</>
          )}
        </Button>
      </form>
    </Form>
  );
} 