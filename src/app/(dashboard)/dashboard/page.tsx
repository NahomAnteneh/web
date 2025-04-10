"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";
import { 
  FileText, 
  Users, 
  Calendar, 
  Clock, 
  MessageSquare, 
  BookOpen 
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading, hasRole } = useAuth();

  // If user is admin or developer, redirect to their specific dashboard
  useEffect(() => {
    if (!isLoading && user) {
      if (hasRole('admin')) {
        router.push('/admin/dashboard');
      } else if (hasRole('developer')) {
        router.push('/developer/dashboard');
      }
    }
  }, [user, isLoading, hasRole, router]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // If user is not logged in, redirect to login
  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
      <p className="text-gray-600 mb-8">
        Welcome back, {user.email}. Here's an overview of your projects and activities.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">My Projects</CardTitle>
            <FileText className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <CardDescription>
              Access and manage your current projects.
            </CardDescription>
            <button 
              onClick={() => router.push('/projects')}
              className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
            >
              View Projects
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Team Collaboration</CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <CardDescription>
              Connect and collaborate with your team members.
            </CardDescription>
            <button 
              onClick={() => router.push('/teams')}
              className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
            >
              View Teams
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Upcoming Deadlines</CardTitle>
            <Calendar className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <CardDescription>
              Track your upcoming project deadlines and milestones.
            </CardDescription>
            <button 
              onClick={() => router.push('/calendar')}
              className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
            >
              View Calendar
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
            <Clock className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <CardDescription>
              View your recent project activities and updates.
            </CardDescription>
            <button 
              onClick={() => router.push('/activity')}
              className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
            >
              View Activity
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Messages</CardTitle>
            <MessageSquare className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <CardDescription>
              Check your messages and notifications.
            </CardDescription>
            <button 
              onClick={() => router.push('/messages')}
              className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
            >
              View Messages
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Resources</CardTitle>
            <BookOpen className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <CardDescription>
              Access helpful resources and documentation.
            </CardDescription>
            <button 
              onClick={() => router.push('/resources')}
              className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
            >
              View Resources
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 