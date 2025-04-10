"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectForm } from "@/components/forms/project-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Data fetching
import { useEffect } from "react";
import { ProjectMember } from "@/data/types";
import { useGroups, useMembers, useAdvisors } from "@/hooks";

export default function NewProjectPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  // Fetch data for the form
  const { groups, loading: loadingGroups } = useGroups();
  const { members, loading: loadingMembers } = useMembers();
  const { advisors, loading: loadingAdvisors } = useAdvisors();

  // Handle success
  const handleSuccess = (createdProject: any) => {
    router.push(`/dashboard/projects/${createdProject.id}`);
  };

  // Handle error
  const handleError = (error: Error) => {
    setError(error.message || "An error occurred while creating the project.");
  };

  // Check if loading
  const isLoading = loadingGroups || loadingMembers || loadingAdvisors;

  // Empty state for data
  const emptyGroups = [{ id: 0, name: 'Default Group' }];
  
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Create New Project</h1>
          <p className="text-muted-foreground">
            Create a new research or academic project to collaborate with your team.
          </p>
        </div>

        <Separator />

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Project Details</TabsTrigger>
            <TabsTrigger value="import" disabled>
              Import from Repository
            </TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Project Information</CardTitle>
                <CardDescription>
                  Enter the details of your new project. You can edit these later.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProjectForm
                  members={members || []}
                  advisors={advisors || []}
                  groups={groups?.length ? groups : emptyGroups}
                  onSuccess={handleSuccess}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="import">
            {/* Future feature for importing projects from repositories */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 