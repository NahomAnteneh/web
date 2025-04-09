"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, ArrowRight, Clock, Loader2 } from "lucide-react";

// In a real application, this would come from your authentication system
// For demo purposes, we'll simulate a user role selection
const USER_ROLES = ["student", "advisor", "evaluator", "admin"] as const;
type UserRole = typeof USER_ROLES[number];

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Simulate fetching the user role from an API
  useEffect(() => {
    // In a real app, this would be an API call to get the user's role
    const fetchUserRole = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For demo purposes, we're not setting a role so that the user can choose one
        // In a real app, you would set the role from the API response
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch user role. Please try again later.");
        setIsLoading(false);
      }
    };
    
    fetchUserRole();
  }, []);

  // Redirect user to their role-specific dashboard
  const redirectToDashboard = (role: UserRole) => {
    setUserRole(role);
    // In a real app, you might want to save this choice in local storage or cookies
    
    // Short delay for better UX to show the selection
    setTimeout(() => {
      if (role === "student") {
        router.push("/dashboard/student");
      } else if (role === "advisor") {
        router.push("/dashboard/advisor");
      } else if (role === "evaluator") {
        router.push("/dashboard/evaluator");
      } else if (role === "admin") {
        router.push("/dashboard/admin");
      }
    }, 500);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
        <p className="text-muted-foreground">Loading your dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="bg-red-100 p-4 rounded-full">
          <AlertCircle className="h-10 w-10 text-red-600" />
        </div>
        <h2 className="text-xl font-semibold">Something went wrong</h2>
        <p className="text-muted-foreground text-center max-w-md">{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  if (userRole) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="bg-green-100 p-4 rounded-full">
          <Clock className="h-10 w-10 text-green-600 animate-pulse" />
        </div>
        <h2 className="text-xl font-semibold">Redirecting to your dashboard...</h2>
        <p className="text-muted-foreground">Please wait while we prepare your {userRole} dashboard.</p>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Welcome to the Project Repository Platform</h1>
      <p className="text-muted-foreground mb-8">Please select your role to continue to the appropriate dashboard.</p>
      
      <Tabs defaultValue="student" className="w-full mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="student">Student</TabsTrigger>
          <TabsTrigger value="advisor">Advisor</TabsTrigger>
          <TabsTrigger value="evaluator">Evaluator</TabsTrigger>
          <TabsTrigger value="admin">Administrator</TabsTrigger>
        </TabsList>
        
        <TabsContent value="student" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Dashboard</CardTitle>
              <CardDescription>Access your projects, assignments, and collaborative tools.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>As a student, you can:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                <li>Create and manage your academic projects</li>
                <li>Track assignments and deadlines</li>
                <li>Collaborate with team members</li>
                <li>Submit work for review</li>
                <li>Receive feedback from advisors</li>
              </ul>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-muted-foreground">Access all student tools and resources</p>
              <Button onClick={() => redirectToDashboard("student")}>
                Go to Student Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="advisor" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Advisor Dashboard</CardTitle>
              <CardDescription>Guide and manage student projects and assessments.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>As an advisor, you can:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                <li>Oversee student projects and teams</li>
                <li>Provide feedback and guidance</li>
                <li>Review and approve project milestones</li>
                <li>Schedule meetings and sessions</li>
                <li>Track student progress and performance</li>
              </ul>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-muted-foreground">Access all advisor tools and resources</p>
              <Button onClick={() => redirectToDashboard("advisor")}>
                Go to Advisor Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="evaluator" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Evaluator Dashboard</CardTitle>
              <CardDescription>Assess and evaluate student projects using rubrics and standards.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>As an evaluator, you can:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                <li>Conduct formal project assessments</li>
                <li>Create and manage evaluation rubrics</li>
                <li>Grade submissions and provide detailed feedback</li>
                <li>Track evaluation history and progress</li>
                <li>Generate comprehensive evaluation reports</li>
              </ul>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-muted-foreground">Access all evaluation tools and resources</p>
              <Button onClick={() => redirectToDashboard("evaluator")}>
                Go to Evaluator Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="admin" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Administrator Dashboard</CardTitle>
              <CardDescription>Manage the platform, users, and system settings.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>As an administrator, you can:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                <li>Manage user accounts and permissions</li>
                <li>Configure system settings and integrations</li>
                <li>Monitor platform usage and performance</li>
                <li>Create and manage academic departments and courses</li>
                <li>Access system logs and analytics</li>
              </ul>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-muted-foreground">Access all administrative tools and settings</p>
              <Button onClick={() => redirectToDashboard("admin")}>
                Go to Admin Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 