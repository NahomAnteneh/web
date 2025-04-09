"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { 
  GitBranch, 
  FileText, 
  Plus, 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Users, 
  BookOpen, 
  ChevronRight,
  FolderKanban,
  Star,
  Menu,
  Bell,
  Settings,
  Home
} from "lucide-react";

// Define types for our data structures
type StatusType = "In Progress" | "To Do" | "Completed" | "Under Review" | "Pending Approval";

interface Project {
  id: number;
  name: string;
  description: string;
  status: StatusType;
  progress: number;
  lastUpdated: string;
  dueDate: string;
}

interface Task {
  id: number;
  title: string;
  project: string;
  dueDate: string;
  status: StatusType;
}

interface Activity {
  id: number;
  type: "comment" | "commit" | "review" | "update" | "submission";
  actor: string;
  action: string;
  target: string;
  project: string;
  time: string;
}

export default function StudentDashboardPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // Mock data for our dashboard
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: "Vector Database Implementation",
      description: "Building a vector database system for efficient similarity search and retrieval of embeddings",
      status: "In Progress",
      progress: 65,
      lastUpdated: "2 hours ago",
      dueDate: "Dec 15, 2023"
    },
    {
      id: 2,
      name: "ML Algorithm Analysis",
      description: "Analyzing and comparing the performance of different machine learning algorithms",
      status: "To Do",
      progress: 0,
      lastUpdated: "1 day ago",
      dueDate: "Dec 20, 2023"
    },
    {
      id: 3,
      name: "Database Security Project",
      description: "Implementing and testing security measures for database systems",
      status: "Under Review",
      progress: 90,
      lastUpdated: "3 days ago",
      dueDate: "Nov 30, 2023"
    },
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Complete API Documentation",
      project: "Vector Database Implementation",
      dueDate: "Tomorrow",
      status: "In Progress"
    },
    {
      id: 2,
      title: "Fix Indexing Bug",
      project: "Vector Database Implementation",
      dueDate: "Today",
      status: "To Do"
    },
    {
      id: 3,
      title: "Submit Project Proposal",
      project: "ML Algorithm Analysis",
      dueDate: "3 days",
      status: "To Do"
    },
    {
      id: 4,
      title: "Prepare Demo for Review",
      project: "Database Security Project",
      dueDate: "Completed",
      status: "Completed"
    },
    {
      id: 5,
      title: "Weekly Progress Report",
      project: "Vector Database Implementation",
      dueDate: "Friday",
      status: "To Do"
    },
  ]);

  const [activities, setActivities] = useState<Activity[]>([
    {
      id: 1,
      type: "comment",
      actor: "Dr. Smith",
      action: "commented on your",
      target: "progress report",
      project: "Vector Database Implementation",
      time: "30 minutes ago"
    },
    {
      id: 2,
      type: "review",
      actor: "Dr. Rodriguez",
      action: "approved your",
      target: "milestone submission",
      project: "Database Security Project",
      time: "2 hours ago"
    },
    {
      id: 3,
      type: "commit",
      actor: "You",
      action: "pushed 5 commits to",
      target: "main branch",
      project: "Vector Database Implementation",
      time: "Yesterday"
    },
    {
      id: 4,
      type: "update",
      actor: "Team Leader",
      action: "updated the",
      target: "project requirements",
      project: "ML Algorithm Analysis",
      time: "Yesterday"
    },
    {
      id: 5,
      type: "submission",
      actor: "You",
      action: "submitted",
      target: "security audit report",
      project: "Database Security Project",
      time: "3 days ago"
    },
  ]);

  const getStatusColor = (status: StatusType): string => {
    switch(status) {
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "To Do": return "bg-slate-100 text-slate-800";
      case "Completed": return "bg-green-100 text-green-800";
      case "Under Review": return "bg-yellow-100 text-yellow-800";
      case "Pending Approval": return "bg-purple-100 text-purple-800";
      default: return "bg-slate-100 text-slate-800";
    }
  };

  const getActivityIcon = (type: Activity["type"]) => {
    switch(type) {
      case "comment": return <MessageSquare className="h-4 w-4" />;
      case "commit": return <GitBranch className="h-4 w-4" />;
      case "review": return <CheckCircle className="h-4 w-4" />;
      case "update": return <FileText className="h-4 w-4" />;
      case "submission": return <FileText className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: Activity["type"]): string => {
    switch(type) {
      case "comment": return "bg-blue-100 text-blue-800";
      case "commit": return "bg-purple-100 text-purple-800";
      case "review": return "bg-green-100 text-green-800";
      case "update": return "bg-yellow-100 text-yellow-800";
      case "submission": return "bg-slate-100 text-slate-800";
      default: return "bg-slate-100 text-slate-800";
    }
  };

  return (
    // The main content div now becomes the root element
    <div className="flex-1 flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 p-6 md:p-8 overflow-y-auto">
      {/* 
        The original structure was:
        <div className="flex min-h-screen ...">
          <Sidebar />
          <div className="flex-1 flex flex-col"> <-- This is now the root
            <Header/Content />
          </div>
        </div>
      */}
      
      {/* Main Content Area (adjusted to be direct child) */}
      <div className="max-w-7xl mx-auto space-y-6 w-full">
        {/* Welcome Header - Keep this or rely on the layout's Navbar? */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Welcome back, John!</h2>
            <p className="text-muted-foreground">Track your projects, tasks, and activities</p>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button size="sm" className="flex items-center gap-1">
              <Plus className="h-4 w-4 mr-1" />
              <span>New Project</span>
            </Button>
          </div>
        </div>

        {/* Announcements Section */}
        <Card>
          <CardHeader>
            <CardTitle>Announcements</CardTitle>
            <CardDescription>Important updates and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                <div className="rounded-full bg-blue-100 p-2">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">Project Submission Deadline Extended</h4>
                  <p className="text-sm text-muted-foreground">The deadline for the Vector Database project has been extended to Dec 20, 2023</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
                <div className="rounded-full bg-yellow-100 p-2">
                  <MessageSquare className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-medium">New Feedback Available</h4>
                  <p className="text-sm text-muted-foreground">Dr. Smith has provided feedback on your latest submission</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="projects" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <FolderKanban className="h-4 w-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Tasks
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Card key={project.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </div>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Due Date</span>
                        <span>{project.dueDate}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button size="sm">Update Progress</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            <div className="grid gap-4">
              {tasks.map((task) => (
                <Card key={task.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-slate-100 p-2">
                          <FileText className="h-4 w-4 text-slate-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{task.title}</h4>
                          <p className="text-sm text-muted-foreground">{task.project}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(task.status)}>
                          {task.status}
                        </Badge>
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <div className="space-y-4">
              {activities.map((activity) => (
                <Card key={activity.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`rounded-full p-2 ${getActivityColor(activity.type)}`}>
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.actor}</span>{" "}
                          {activity.action}{" "}
                          <span className="font-medium">{activity.target}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.project} • {activity.time}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Analytics Section (Moved to Bottom) */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="flex flex-row items-center p-6">
              <div className="rounded-full bg-blue-100 p-2 mr-4">
                <FolderKanban className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
                <h3 className="text-2xl font-bold">{projects.length}</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="flex flex-row items-center p-6">
              <div className="rounded-full bg-yellow-100 p-2 mr-4">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Tasks</p>
                <h3 className="text-2xl font-bold">{tasks.filter(t => t.status === "To Do").length}</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="flex flex-row items-center p-6">
              <div className="rounded-full bg-green-100 p-2 mr-4">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed Tasks</p>
                <h3 className="text-2xl font-bold">{tasks.filter(t => t.status === "Completed").length}</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="flex flex-row items-center p-6">
              <div className="rounded-full bg-purple-100 p-2 mr-4">
                <Star className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Project Score</p>
                <h3 className="text-2xl font-bold">85%</h3>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 