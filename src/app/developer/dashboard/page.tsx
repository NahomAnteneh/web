"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Code, 
  GitBranch, 
  Folder, 
  Database, 
  Terminal, 
  Bookmark
} from "lucide-react";

export default function DeveloperDashboard() {
  const { user, isLoading, hasRole } = useAuth();
  const router = useRouter();

  // Redirect if user is not a developer
  useEffect(() => {
    if (!isLoading && (!user || !hasRole('developer'))) {
      router.push('/unauthorized');
    }
  }, [user, isLoading, hasRole, router]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // Don't render anything if not authenticated or not developer
  if (!user || !hasRole('developer')) {
    return null;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Developer Dashboard</h1>
      <p className="text-gray-600 mb-8">
        Welcome back, {user.email}. Here's your developer workspace.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Active Projects</CardTitle>
            <Code className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <CardDescription>
              Access and manage your assigned development projects.
            </CardDescription>
            <button 
              onClick={() => router.push('/developer/projects')}
              className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
            >
              View Projects
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Source Control</CardTitle>
            <GitBranch className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <CardDescription>
              Browse repositories, commits, and branches.
            </CardDescription>
            <button 
              onClick={() => router.push('/developer/repositories')}
              className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
            >
              View Repositories
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Resources</CardTitle>
            <Folder className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <CardDescription>
              Access development resources and documentation.
            </CardDescription>
            <button 
              onClick={() => router.push('/developer/resources')}
              className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
            >
              View Resources
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Database Explorer</CardTitle>
            <Database className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <CardDescription>
              Explore and query database schemas and data.
            </CardDescription>
            <button 
              onClick={() => router.push('/developer/database')}
              className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
            >
              Open Explorer
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">API Console</CardTitle>
            <Terminal className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <CardDescription>
              Test and debug API endpoints with interactive console.
            </CardDescription>
            <button 
              onClick={() => router.push('/developer/api-console')}
              className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
            >
              Open Console
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Documentation</CardTitle>
            <Bookmark className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <CardDescription>
              Access project documentation and specifications.
            </CardDescription>
            <button 
              onClick={() => router.push('/developer/documentation')}
              className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
            >
              View Documentation
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 