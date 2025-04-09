"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { 
  Users, 
  FileText, 
  Plus, 
  MessageSquare, 
  Bell,
  CheckCircle, 
  AlertCircle, 
  Calendar, 
  Settings,
  ChevronRight,
  BarChart3,
  User,
  FolderKanban,
  Database,
  Shield,
  UserPlus,
  Cog,
  HelpCircle,
  LogOut
} from "lucide-react";
import { useState } from "react";

// Define types for administrative data
interface UserSummary {
  id: number;
  name: string;
  email: string;
  role: "student" | "advisor" | "evaluator" | "admin";
  status: "active" | "inactive" | "pending";
  lastActive: string;
}

interface SystemStat {
  name: string;
  value: number;
  change: number;
  icon: React.ReactNode;
}

interface Project {
  id: number;
  name: string;
  department: string;
  teams: number;
  users: number;
  status: "active" | "archived" | "completed";
}

interface SystemLog {
  id: number;
  type: "error" | "warning" | "info" | "success";
  message: string;
  source: string;
  timestamp: string;
}

export default function AdminDashboardPage() {
  // Mock data for admin dashboard
  const [userSummaries, setUserSummaries] = useState<UserSummary[]>([
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex.johnson@example.edu",
      role: "student",
      status: "active",
      lastActive: "10 minutes ago"
    },
    {
      id: 2,
      name: "Dr. Maria Rodriguez",
      email: "m.rodriguez@example.edu",
      role: "advisor",
      status: "active",
      lastActive: "2 hours ago"
    },
    {
      id: 3,
      name: "Prof. David Chen",
      email: "d.chen@example.edu",
      role: "evaluator",
      status: "inactive",
      lastActive: "2 days ago"
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "s.williams@example.edu",
      role: "admin",
      status: "active",
      lastActive: "Just now"
    },
    {
      id: 5,
      name: "James Wilson",
      email: "j.wilson@example.edu",
      role: "student",
      status: "pending",
      lastActive: "Never"
    },
  ]);

  const [systemStats, setSystemStats] = useState<SystemStat[]>([
    {
      name: "Total Users",
      value: 842,
      change: 12,
      icon: <Users className="h-5 w-5 text-blue-600" />
    },
    {
      name: "Active Projects",
      value: 147,
      change: 8,
      icon: <FolderKanban className="h-5 w-5 text-green-600" />
    },
    {
      name: "Storage Used",
      value: 68,
      change: 5,
      icon: <Database className="h-5 w-5 text-purple-600" />
    },
    {
      name: "System Health",
      value: 99.8,
      change: 0.1,
      icon: <Shield className="h-5 w-5 text-indigo-600" />
    },
  ]);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: "Computer Science Senior Projects",
      department: "Computer Science",
      teams: 24,
      users: 96,
      status: "active"
    },
    {
      id: 2,
      name: "Electrical Engineering Research",
      department: "Engineering",
      teams: 18,
      users: 72,
      status: "active"
    },
    {
      id: 3,
      name: "Fall Semester Data Science",
      department: "Mathematics",
      teams: 12,
      users: 48,
      status: "completed"
    },
    {
      id: 4,
      name: "Biomedical Research Initiative",
      department: "Biology",
      teams: 15,
      users: 60,
      status: "active"
    },
    {
      id: 5,
      name: "Spring Software Engineering",
      department: "Computer Science",
      teams: 20,
      users: 80,
      status: "archived"
    },
  ]);

  const [systemLogs, setSystemLogs] = useState<SystemLog[]>([
    {
      id: 1,
      type: "error",
      message: "Database connection timeout",
      source: "Database Server",
      timestamp: "Today, 09:45"
    },
    {
      id: 2,
      type: "warning",
      message: "Storage usage above 65%",
      source: "Storage Monitor",
      timestamp: "Today, 08:30"
    },
    {
      id: 3,
      type: "info",
      message: "System backup completed successfully",
      source: "Backup Service",
      timestamp: "Today, 03:00"
    },
    {
      id: 4,
      type: "success",
      message: "Software update applied successfully",
      source: "Update Service",
      timestamp: "Yesterday, 22:15"
    },
    {
      id: 5,
      type: "warning",
      message: "3 failed login attempts",
      source: "Authentication Service",
      timestamp: "Yesterday, 16:42"
    },
  ]);

  const getRoleColor = (role: string): string => {
    switch(role) {
      case "student": return "bg-blue-100 text-blue-800";
      case "advisor": return "bg-green-100 text-green-800";
      case "evaluator": return "bg-purple-100 text-purple-800";
      case "admin": return "bg-red-100 text-red-800";
      default: return "bg-slate-100 text-slate-800";
    }
  };

  const getStatusColor = (status: string): string => {
    switch(status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-yellow-100 text-yellow-800";
      case "pending": return "bg-blue-100 text-blue-800";
      case "archived": return "bg-slate-100 text-slate-800";
      case "completed": return "bg-purple-100 text-purple-800";
      default: return "bg-slate-100 text-slate-800";
    }
  };

  const getLogTypeIcon = (type: string) => {
    switch(type) {
      case "error": return <AlertCircle className="h-4 w-4 text-red-600" />;
      case "warning": return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case "info": return <MessageSquare className="h-4 w-4 text-blue-600" />;
      case "success": return <CheckCircle className="h-4 w-4 text-green-600" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Administrator Dashboard</h1>
          <p className="text-muted-foreground">System overview and management</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Settings className="h-4 w-4 mr-1" />
            <span>System Settings</span>
          </Button>
          <Button size="sm" className="flex items-center gap-1">
            <UserPlus className="h-4 w-4 mr-1" />
            <span>Add User</span>
          </Button>
        </div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {systemStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="flex flex-row items-center p-6">
              <div className="rounded-full bg-slate-100 p-2 mr-4">
                {stat.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                <h3 className="text-2xl font-bold">
                  {stat.name === "Storage Used" || stat.name === "System Health" 
                    ? `${stat.value}%` 
                    : stat.value}
                </h3>
                <p className="text-xs text-muted-foreground">
                  <span className={stat.change > 0 ? "text-green-600" : stat.change < 0 ? "text-red-600" : ""}>
                    {stat.change > 0 ? "+" : ""}{stat.change}
                    {stat.name === "Storage Used" || stat.name === "System Health" ? "%" : ""}
                  </span>
                  {" "}since last week
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="projects">Projects Overview</TabsTrigger>
          <TabsTrigger value="system">System Logs</TabsTrigger>
        </TabsList>
        
        {/* Users Tab */}
        <TabsContent value="users" className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>User Management</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-1" />
                    Roles
                  </Button>
                  <Button size="sm">
                    <UserPlus className="h-4 w-4 mr-1" />
                    Add User
                  </Button>
                </div>
              </div>
              <CardDescription>Manage users and their access rights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {userSummaries.map((user) => (
                  <div 
                    key={user.id} 
                    className="flex items-center justify-between p-3 border rounded-md hover:bg-slate-50"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <Link 
                            href={`/dashboard/admin/users/${user.id}`}
                            className="text-sm font-medium hover:text-primary hover:underline"
                          >
                            {user.name}
                          </Link>
                          <Badge className={getRoleColor(user.role)}>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className={getStatusColor(user.status)}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        {user.lastActive}
                      </p>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <User className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="bg-slate-50 border-t flex justify-between py-2">
              <div className="text-xs text-muted-foreground">
                Showing {userSummaries.length} of 842 users
              </div>
              <Button variant="ghost" size="sm" className="text-primary">
                View All Users
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Projects Tab */}
        <TabsContent value="projects" className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Projects Overview</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Create Project
                </Button>
              </div>
              <CardDescription>Manage and monitor all projects in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {projects.map((project) => (
                  <div 
                    key={project.id} 
                    className="flex items-center justify-between p-3 border rounded-md hover:bg-slate-50"
                  >
                    <div>
                      <Link 
                        href={`/dashboard/admin/projects/${project.id}`}
                        className="text-base font-medium hover:text-primary hover:underline"
                      >
                        {project.name}
                      </Link>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="font-normal text-xs px-2 py-0 h-5">
                          {project.department}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {project.teams} teams • {project.users} users
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(project.status)}>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </Badge>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          Manage
                        </Button>
                        <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="bg-slate-50 border-t flex justify-between py-2">
              <div className="text-xs text-muted-foreground">
                Showing {projects.length} of 147 projects
              </div>
              <Button variant="ghost" size="sm" className="text-primary">
                View All Projects
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* System Logs Tab */}
        <TabsContent value="system" className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>System Logs</CardTitle>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-1" />
                  Export Logs
                </Button>
              </div>
              <CardDescription>Review system activity and error logs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {systemLogs.map((log) => (
                  <div 
                    key={log.id} 
                    className="flex items-start p-3 border rounded-md hover:bg-slate-50"
                  >
                    <div className="mt-0.5 mr-3">
                      {getLogTypeIcon(log.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium ${
                          log.type === "error" ? "text-red-600" : 
                          log.type === "warning" ? "text-yellow-600" : 
                          log.type === "success" ? "text-green-600" : 
                          "text-blue-600"
                        }`}>
                          {log.message}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {log.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Source: {log.source}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="bg-slate-50 border-t flex justify-between py-2">
              <div className="text-xs text-muted-foreground">
                Showing recent {systemLogs.length} log entries
              </div>
              <Button variant="ghost" size="sm" className="text-primary">
                View All Logs
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Administrative Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-4 gap-2 hover:bg-slate-50">
              <Database className="h-6 w-6 text-purple-600" />
              <span className="text-sm font-medium">Database Management</span>
              <span className="text-xs text-muted-foreground text-center">
                Manage database connections and backups
              </span>
            </Button>
            
            <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-4 gap-2 hover:bg-slate-50">
              <BarChart3 className="h-6 w-6 text-blue-600" />
              <span className="text-sm font-medium">System Analytics</span>
              <span className="text-xs text-muted-foreground text-center">
                View detailed usage and performance metrics
              </span>
            </Button>
            
            <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-4 gap-2 hover:bg-slate-50">
              <Cog className="h-6 w-6 text-slate-600" />
              <span className="text-sm font-medium">System Configuration</span>
              <span className="text-xs text-muted-foreground text-center">
                Modify system parameters and settings
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 