"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart4, 
  Users, 
  Briefcase, 
  FileText, 
  Clock, 
  RefreshCw,
  LayoutDashboard,
  UserCog
} from "lucide-react";
import Link from "next/link";

type SystemStats = {
  totalUsers: number;
  totalProjects: number;
  activeProjects: number;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  recentSubmissions: number;
};

export default function AdminDashboard() {
  const { user, isLoading, hasRole } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<SystemStats>({
    totalUsers: 0,
    totalProjects: 0,
    activeProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    recentSubmissions: 0,
  });
  const [loading, setLoading] = useState(true);

  // Redirect if user is not an admin
  useEffect(() => {
    if (!isLoading && (!user || !hasRole('admin'))) {
      router.push('/unauthorized');
    }
  }, [user, isLoading, hasRole, router]);

  // Fetch system stats
  const fetchSystemStats = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/stats');
      if (!response.ok) {
        throw new Error('Failed to fetch system stats');
      }
      const data = await response.json();
      setStats(data.stats);
    } catch (error) {
      console.error('Error fetching system stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && hasRole('admin')) {
      fetchSystemStats();
    }
  }, [user, hasRole]);

  if (isLoading || loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // Don't render anything if not authenticated or not admin
  if (!user || !hasRole('admin')) {
    return null;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600">System overview and monitoring</p>
        </div>
        <Button onClick={fetchSystemStats} variant="outline" size="icon">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {/* Quick Access */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/admin/users" className="block">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between p-4">
                <CardTitle className="text-sm font-medium">User Management</CardTitle>
                <UserCog className="h-5 w-5 text-primary" />
              </CardHeader>
            </Card>
          </Link>
          
          <Link href="/admin" className="block">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between p-4">
                <CardTitle className="text-sm font-medium">Admin Home</CardTitle>
                <LayoutDashboard className="h-5 w-5 text-primary" />
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>

      {/* System Statistics */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">System Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                Registered users in the system
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeProjects}</div>
              <p className="text-xs text-muted-foreground">
                Of {stats.totalProjects} total projects
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedTasks}</div>
              <p className="text-xs text-muted-foreground">
                Completed of {stats.totalTasks} total tasks
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Recent Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.recentSubmissions}</div>
              <p className="text-xs text-muted-foreground">
                In the last 7 days
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* System Health */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">System Health</h2>
        <div className="grid grid-cols-1 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Activity Overview</CardTitle>
              <CardDescription>
                System activity overview for the last 30 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Chart visualization will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <Card>
          <CardHeader>
            <CardTitle>Activity Log</CardTitle>
            <CardDescription>
              Recent system activity and events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-md p-3 bg-accent/50">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">New user registered</p>
                  <p className="text-sm text-muted-foreground">Jane Doe created an account 2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 rounded-md p-3 bg-accent/50">
                <FileText className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Project submission</p>
                  <p className="text-sm text-muted-foreground">Group A submitted their final project 5 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 rounded-md p-3 bg-accent/50">
                <Users className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Role update</p>
                  <p className="text-sm text-muted-foreground">Admin updated John Smith's role to Advisor 1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 