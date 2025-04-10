"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Settings, 
  Activity, 
  BarChart4, 
  FilePlus, 
  CheckCircle2
} from "lucide-react";

export default function AdminDashboard() {
  const { user, isLoading, hasRole } = useAuth();
  const router = useRouter();

  // Redirect if user is not an admin
  useEffect(() => {
    if (!isLoading && (!user || !hasRole('admin'))) {
      router.push('/unauthorized');
    }
  }, [user, isLoading, hasRole, router]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // Don't render anything if not authenticated or not admin
  if (!user || !hasRole('admin')) {
    return null;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p className="text-gray-600 mb-8">
        Welcome back, {user.email}. You have admin privileges.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">User Management</CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <CardDescription>
              Manage user accounts, permissions, and access levels.
            </CardDescription>
            <button 
              onClick={() => router.push('/admin/users')}
              className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
            >
              Manage Users
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">System Settings</CardTitle>
            <Settings className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <CardDescription>
              Configure system-wide settings and preferences.
            </CardDescription>
            <button 
              onClick={() => router.push('/admin/settings')}
              className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
            >
              System Settings
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Activity Logs</CardTitle>
            <Activity className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <CardDescription>
              View system activity logs and audit trails.
            </CardDescription>
            <button 
              onClick={() => router.push('/admin/logs')}
              className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
            >
              View Logs
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Statistics</CardTitle>
            <BarChart4 className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <CardDescription>
              Review platform usage statistics and analytics.
            </CardDescription>
            <button 
              onClick={() => router.push('/admin/statistics')}
              className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
            >
              View Statistics
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Project Templates</CardTitle>
            <FilePlus className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <CardDescription>
              Manage project templates available to users.
            </CardDescription>
            <button 
              onClick={() => router.push('/admin/templates')}
              className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
            >
              Manage Templates
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Approvals</CardTitle>
            <CheckCircle2 className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <CardDescription>
              Review and approve pending requests.
            </CardDescription>
            <button 
              onClick={() => router.push('/admin/approvals')}
              className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
            >
              Pending Approvals
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 