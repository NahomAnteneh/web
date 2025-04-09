"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  GitBranch,
  FileText,
  MessageSquare,
  Clock,
  Calendar,
  Users,
  ChevronLeft,
  Settings,
  Star,
  Share2,
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
  Edit,
  ArrowUpRight,
  PlusCircle,
  Folder,
  PackageOpen
} from "lucide-react";

// Define types for project data
type ProjectStatus = 'In Progress' | 'Submitted' | 'Under Review' | 'Completed' | 'Archived';
type TaskStatus = 'To Do' | 'In Progress' | 'Under Review' | 'Completed';

interface ProjectMember {
  id: number;
  name: string;
  role: string;
  avatar?: string;
  email: string;
}

interface Advisor {
  id: number;
  name: string;
  avatar?: string;
  department: string;
  email: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  assignee?: ProjectMember;
  status: TaskStatus;
  dueDate: string;
  priority: 'Low' | 'Medium' | 'High';
}

interface Repository {
  name: string;
  url: string;
  lastCommit: string;
  branch: string;
  commitCount: number;
}

interface Milestone {
  id: number;
  title: string;
  dueDate: string;
  status: 'Upcoming' | 'In Progress' | 'Completed' | 'Overdue';
  description: string;
}

interface Project {
  id: number;
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  startDate: string;
  dueDate: string;
  createdAt: string;
  lastUpdated: string;
  members: ProjectMember[];
  advisor?: Advisor;
  repository?: Repository;
  tasks: Task[];
  milestones: Milestone[];
  isStarred: boolean;
  isOwner: boolean;
}

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = parseInt(params.id as string);
  
  // In a real application, you would fetch the project data based on the ID
  // For demo purposes, we'll use mock data
  const [project, setProject] = useState<Project>({
    id: projectId,
    name: "Vector Database Implementation",
    description: "Building a vector database system for efficient similarity search and retrieval of embeddings. The system will support multiple vector types, distance metrics, and indexing strategies. Performance benchmarks will be conducted against existing solutions.",
    status: "In Progress",
    progress: 65,
    startDate: "Oct 15, 2023",
    dueDate: "Dec 15, 2023",
    createdAt: "Oct 10, 2023",
    lastUpdated: "2 hours ago",
    members: [
      { id: 1, name: "Alex Johnson", role: "Team Lead", email: "alex@example.com" },
      { id: 2, name: "Michael Chen", role: "Developer", email: "michael@example.com" },
      { id: 3, name: "Sophia Garcia", role: "Database Specialist", email: "sophia@example.com" },
      { id: 4, name: "Emma Smith", role: "ML Engineer", email: "emma@example.com" },
    ],
    advisor: {
      id: 101,
      name: "Dr. Sarah Williams",
      department: "Computer Science",
      email: "s.williams@example.edu"
    },
    repository: {
      name: "vector-db",
      url: "/repository/vector-db",
      lastCommit: "3 hours ago",
      branch: "main",
      commitCount: 87
    },
    tasks: [
      {
        id: 1,
        title: "Complete API Documentation",
        description: "Document all REST API endpoints and parameters",
        assignee: { id: 1, name: "Alex Johnson", role: "Team Lead", email: "alex@example.com" },
        status: "In Progress",
        dueDate: "Nov 25, 2023",
        priority: "High"
      },
      {
        id: 2,
        title: "Fix Indexing Bug",
        description: "Resolve the indexing issue with large vector dimensions",
        assignee: { id: 3, name: "Sophia Garcia", role: "Database Specialist", email: "sophia@example.com" },
        status: "To Do",
        dueDate: "Nov 28, 2023",
        priority: "High"
      },
      {
        id: 3,
        title: "Implement Vector Compression",
        description: "Add support for vector compression algorithms",
        assignee: { id: 4, name: "Emma Smith", role: "ML Engineer", email: "emma@example.com" },
        status: "To Do",
        dueDate: "Dec 5, 2023",
        priority: "Medium"
      },
      {
        id: 4,
        title: "Performance Benchmarks",
        description: "Run benchmarks comparing with FAISS and other solutions",
        status: "To Do",
        dueDate: "Dec 10, 2023",
        priority: "Medium"
      },
      {
        id: 5,
        title: "Unit Tests for Core Functions",
        description: "Write comprehensive unit tests for core functionality",
        assignee: { id: 2, name: "Michael Chen", role: "Developer", email: "michael@example.com" },
        status: "Completed",
        dueDate: "Nov 15, 2023",
        priority: "Medium"
      }
    ],
    milestones: [
      {
        id: 1,
        title: "Project Proposal",
        dueDate: "Oct 20, 2023",
        status: "Completed",
        description: "Initial project proposal and requirements"
      },
      {
        id: 2,
        title: "Core Implementation",
        dueDate: "Nov 30, 2023",
        status: "In Progress",
        description: "Implementation of core vector database functionality"
      },
      {
        id: 3,
        title: "Performance Optimization",
        dueDate: "Dec 10, 2023",
        status: "Upcoming",
        description: "Optimization and benchmarking"
      },
      {
        id: 4,
        title: "Final Submission",
        dueDate: "Dec 15, 2023",
        status: "Upcoming",
        description: "Project completion and submission"
      }
    ],
    isStarred: true,
    isOwner: true
  });

  const [activeTab, setActiveTab] = useState("overview");

  // Helper functions for UI
  const getStatusColor = (status: ProjectStatus | TaskStatus): string => {
    switch(status) {
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Submitted": return "bg-purple-100 text-purple-800";
      case "Under Review": return "bg-yellow-100 text-yellow-800";
      case "Completed": return "bg-green-100 text-green-800";
      case "Archived": return "bg-slate-100 text-slate-800";
      case "To Do": return "bg-slate-100 text-slate-800";
      default: return "bg-slate-100 text-slate-800";
    }
  };

  const getPriorityColor = (priority: string): string => {
    switch(priority) {
      case "High": return "text-red-600";
      case "Medium": return "text-amber-600";
      case "Low": return "text-blue-600";
      default: return "text-slate-600";
    }
  };

  const getMilestoneColor = (status: string): string => {
    switch(status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Upcoming": return "bg-slate-100 text-slate-800";
      case "Overdue": return "bg-red-100 text-red-800";
      default: return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Project Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Button variant="ghost" size="sm" className="p-0 h-8 w-8" asChild>
              <a href="/dashboard/projects">
                <ChevronLeft className="h-4 w-4" />
              </a>
            </Button>
            <Badge className={getStatusColor(project.status)}>
              {project.status}
            </Badge>
          </div>
          <h1 className="text-2xl font-bold">{project.name}</h1>
          <p className="text-muted-foreground mt-1 max-w-3xl">{project.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className={project.isStarred ? "text-yellow-500" : ""}>
            <Star className="h-4 w-4 mr-2" fill={project.isStarred ? "currentColor" : "none"} />
            {project.isStarred ? "Starred" : "Star"}
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          {project.isOwner && (
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
          <Button variant="default" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Manage
          </Button>
        </div>
      </div>

      {/* Project Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Project Progress</p>
              <p className="text-2xl font-bold">{project.progress}%</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Start Date</p>
              <p className="font-medium">{project.startDate}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Due Date</p>
              <p className="font-medium">{project.dueDate}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Last Updated</p>
              <p className="font-medium">{project.lastUpdated}</p>
            </div>
          </div>
          <Progress value={project.progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-5 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="repository">Repository</TabsTrigger>
          <TabsTrigger value="files" className="hidden lg:inline-flex">Files</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column - Project Info */}
            <div className="space-y-6 md:col-span-2">
              {/* Milestones */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>Milestones</CardTitle>
                    <Button variant="ghost" size="sm">
                      <PlusCircle className="h-4 w-4 mr-1" />
                      Add Milestone
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.milestones.map((milestone) => (
                      <div key={milestone.id} className="flex items-start p-3 border rounded-md">
                        <div className={`rounded-full p-2 mr-3 ${
                          milestone.status === "Completed" ? "bg-green-100" : 
                          milestone.status === "In Progress" ? "bg-blue-100" : 
                          milestone.status === "Overdue" ? "bg-red-100" : "bg-slate-100"
                        }`}>
                          {milestone.status === "Completed" ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : milestone.status === "In Progress" ? (
                            <Clock className="h-5 w-5 text-blue-600" />
                          ) : milestone.status === "Overdue" ? (
                            <AlertCircle className="h-5 w-5 text-red-600" />
                          ) : (
                            <Calendar className="h-5 w-5 text-slate-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium">{milestone.title}</h4>
                            <Badge className={getMilestoneColor(milestone.status)}>
                              {milestone.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{milestone.description}</p>
                          <div className="flex items-center mt-2 text-xs text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            <span>{milestone.dueDate}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="bg-slate-50 border-t py-2">
                  <Button variant="ghost" size="sm" className="mx-auto">
                    View All Milestones
                  </Button>
                </CardFooter>
              </Card>

              {/* Recent Tasks */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Tasks</CardTitle>
                    <Button variant="ghost" size="sm" asChild>
                      <a href="#tasks" onClick={() => setActiveTab("tasks")}>
                        View All
                      </a>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {project.tasks.slice(0, 3).map((task) => (
                      <div 
                        key={task.id} 
                        className="flex items-center justify-between p-3 border rounded-md hover:bg-slate-50"
                      >
                        <div className="flex items-center gap-3">
                          {task.status === "Completed" ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : task.priority === "High" ? (
                            <AlertCircle className="h-5 w-5 text-red-600" />
                          ) : (
                            <div className="h-5 w-5 border-2 rounded-full border-slate-300" />
                          )}
                          <div>
                            <p className={`text-sm font-medium ${task.status === "Completed" ? "line-through text-muted-foreground" : ""}`}>
                              {task.title}
                            </p>
                            {task.assignee && (
                              <p className="text-xs text-muted-foreground">
                                Assigned to {task.assignee.name}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={getStatusColor(task.status)}>
                            {task.status}
                          </Badge>
                          <p className={`text-xs ${getPriorityColor(task.priority)} font-medium`}>
                            {task.priority}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {task.dueDate}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Project Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Advisor</h4>
                    {project.advisor ? (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {project.advisor.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm">{project.advisor.name}</p>
                          <p className="text-xs text-muted-foreground">{project.advisor.department}</p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No advisor assigned</p>
                    )}
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1">Team Members</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.members.map((member) => (
                        <Avatar key={member.id} className="h-8 w-8">
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                      ))}
                      <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1">Created</h4>
                    <p className="text-sm">{project.createdAt}</p>
                  </div>

                  {project.repository && (
                    <div>
                      <h4 className="text-sm font-medium mb-1">Repository</h4>
                      <div className="flex items-center gap-2">
                        <GitBranch className="h-4 w-4 text-muted-foreground" />
                        <a href={project.repository.url} className="text-sm text-primary hover:underline">
                          {project.repository.name}
                        </a>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Task Summary */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Task Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-slate-300"></div>
                        <p className="text-sm">To Do</p>
                      </div>
                      <p className="text-sm font-medium">
                        {project.tasks.filter(t => t.status === "To Do").length}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-blue-400"></div>
                        <p className="text-sm">In Progress</p>
                      </div>
                      <p className="text-sm font-medium">
                        {project.tasks.filter(t => t.status === "In Progress").length}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-yellow-400"></div>
                        <p className="text-sm">Under Review</p>
                      </div>
                      <p className="text-sm font-medium">
                        {project.tasks.filter(t => t.status === "Under Review").length}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-green-400"></div>
                        <p className="text-sm">Completed</p>
                      </div>
                      <p className="text-sm font-medium">
                        {project.tasks.filter(t => t.status === "Completed").length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* Tasks Tab */}
        <TabsContent value="tasks">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Project Tasks</CardTitle>
                <Button size="sm">
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Add Task
                </Button>
              </div>
              <CardDescription>Manage and track tasks for this project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {project.tasks.map((task) => (
                  <div 
                    key={task.id} 
                    className="flex items-start justify-between p-3 border rounded-md hover:bg-slate-50"
                  >
                    <div className="flex items-start gap-3">
                      {task.status === "Completed" ? (
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      ) : task.priority === "High" ? (
                        <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                      ) : (
                        <div className="h-5 w-5 border-2 rounded-full border-slate-300 mt-0.5" />
                      )}
                      <div>
                        <p className={`text-sm font-medium ${task.status === "Completed" ? "line-through text-muted-foreground" : ""}`}>
                          {task.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {task.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          {task.assignee && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Avatar className="h-4 w-4">
                                <AvatarFallback className="text-[8px]">
                                  {task.assignee.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span>{task.assignee.name}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{task.dueDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(task.status)}>
                        {task.status}
                      </Badge>
                      <p className={`text-xs ${getPriorityColor(task.priority)} font-medium`}>
                        {task.priority}
                      </p>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="bg-slate-50 border-t flex justify-between py-2">
              <div className="text-xs text-muted-foreground">
                Showing {project.tasks.length} tasks
              </div>
              <Button variant="ghost" size="sm">
                View Task Board
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Team Tab */}
        <TabsContent value="team">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Team Members</CardTitle>
                <Button size="sm">
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Add Member
                </Button>
              </div>
              <CardDescription>Manage team members and their roles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {project.members.map((member) => (
                  <div 
                    key={member.id} 
                    className="flex items-center justify-between p-3 border rounded-md hover:bg-slate-50"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">
                        {member.role}
                      </Badge>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {project.advisor && (
                  <div className="flex items-center justify-between p-3 border rounded-md hover:bg-slate-50 mt-4 bg-slate-50">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>{project.advisor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{project.advisor.name}</p>
                        <p className="text-xs text-muted-foreground">{project.advisor.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge>
                        Advisor
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        {project.advisor.department}
                      </p>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Repository Tab */}
        <TabsContent value="repository">
          {project.repository ? (
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <GitBranch className="h-5 w-5" />
                      <span>{project.repository.name}</span>
                    </CardTitle>
                    <CardDescription>
                      Code repository for this project
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    Open Repository
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between gap-4 p-4 bg-slate-50 rounded-md border">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Branch</p>
                    <p className="text-sm font-medium">{project.repository.branch}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Last Commit</p>
                    <p className="text-sm font-medium">{project.repository.lastCommit}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Commits</p>
                    <p className="text-sm font-medium">{project.repository.commitCount}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Contributors</p>
                    <p className="text-sm font-medium">{project.members.length}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Recent Activity</h3>
                  <div className="space-y-2">
                    <div className="p-3 border rounded-md bg-white">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{project.members[0].name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm">
                            <span className="font-medium">{project.members[0].name}</span>
                            {" pushed to "}
                            <span className="font-medium">main</span>
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Fix indexing algorithm for high-dimensional vectors
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            3 hours ago
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 border rounded-md bg-white">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{project.members[1].name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm">
                            <span className="font-medium">{project.members[1].name}</span>
                            {" merged pull request "}
                            <span className="font-medium">#24</span>
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Add vector compression support
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            Yesterday
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-slate-50 border-t flex justify-between py-2">
                <Button variant="ghost" size="sm">
                  <PackageOpen className="h-4 w-4 mr-1" />
                  Browse Files
                </Button>
                <Button variant="ghost" size="sm">
                  View Commit History
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="bg-slate-100 p-4 rounded-full mb-4">
                <GitBranch className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium">No repository linked</h3>
              <p className="text-muted-foreground text-center mt-1 mb-4">
                Link a code repository to this project
              </p>
              <div className="flex gap-3">
                <Button variant="outline">
                  Connect Existing
                </Button>
                <Button>
                  Create Repository
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
        
        {/* Files Tab */}
        <TabsContent value="files">
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="bg-slate-100 p-4 rounded-full mb-4">
              <Folder className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium">Project Files</h3>
            <p className="text-muted-foreground text-center mt-1 mb-4">
              Upload, organize, and manage project files
            </p>
            <div className="flex gap-3">
              <Button variant="outline">
                Browse Files
              </Button>
              <Button>
                Upload File
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 