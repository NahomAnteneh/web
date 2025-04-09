"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { 
  ArrowLeft, 
  GitBranch, 
  GitCommit, 
  GitPullRequest, 
  Calendar, 
  Clock, 
  Users, 
  User, 
  MessageSquare, 
  Settings, 
  Star, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink, 
  Share2,
  FileText,
  Plus,
  Clipboard
} from "lucide-react";

// Types (could be shared with the ProjectsView component)
type ProjectStatus = 'In Progress' | 'Submitted' | 'Under Review' | 'Completed' | 'Archived';

interface ProjectMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
}

interface Advisor {
  id: number;
  name: string;
  avatar: string;
  department: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Completed' | 'Blocked';
  assignee?: ProjectMember;
  dueDate: string;
  createdAt: string;
}

interface Commit {
  id: string;
  message: string;
  author: string;
  date: string;
  hash: string;
}

interface Project {
  id: number;
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  lastUpdated: string;
  createdAt: string;
  dueDate: string;
  members: ProjectMember[];
  advisor?: Advisor;
  repositoryUrl: string;
  isStarred: boolean;
  isGroupLeader: boolean;
  tasks: Task[];
  commits: Commit[];
  group: string;
}

export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // In a real app, you'd fetch the project data from an API
  useEffect(() => {
    const fetchData = async () => {
      // Simulate API fetch delay
      setTimeout(() => {
        // Mock data
        const projectData: Project = {
          id: parseInt(params.id),
          name: "Vector Database Integration",
          description: "A comprehensive implementation of vector database for efficient similarity search and machine learning applications. The project focuses on both performance and scalability.",
          status: "In Progress",
          progress: 65,
          lastUpdated: "2 hours ago",
          createdAt: "2023-10-15",
          dueDate: "2023-12-15",
          group: "Team Innovate",
          members: [
            { id: 1, name: "Alex Johnson", role: "Team Lead", avatar: "/avatars/user1.png" },
            { id: 2, name: "Michael Chen", role: "Developer", avatar: "/avatars/user2.png" },
            { id: 3, name: "Nahom Anteneh", role: "Researcher", avatar: "/avatars/user.png" },
            { id: 4, name: "Lisa Wong", role: "Data Scientist", avatar: "/avatars/user4.png" },
          ],
          advisor: {
            id: 101,
            name: "Dr. Sarah Williams",
            avatar: "/avatars/user3.png",
            department: "Computer Science"
          },
          repositoryUrl: "/repository/vector-db",
          isStarred: true,
          isGroupLeader: true,
          tasks: [
            {
              id: 1,
              title: "Implement authentication flow",
              description: "Create a secure authentication mechanism using JWT and proper role-based access control.",
              status: "In Progress",
              assignee: { id: 1, name: "Alex Johnson", role: "Team Lead", avatar: "/avatars/user1.png" },
              dueDate: "2023-12-08",
              createdAt: "2023-11-01"
            },
            {
              id: 2,
              title: "Write test cases for API endpoints",
              description: "Develop comprehensive test suite for all API endpoints to ensure proper functionality.",
              status: "To Do",
              assignee: { id: 2, name: "Michael Chen", role: "Developer", avatar: "/avatars/user2.png" },
              dueDate: "2023-12-10",
              createdAt: "2023-11-05"
            },
            {
              id: 3,
              title: "Optimize vector search algorithm",
              description: "Improve the performance of the vector search algorithm for large datasets.",
              status: "Completed",
              assignee: { id: 3, name: "Nahom Anteneh", role: "Researcher", avatar: "/avatars/user.png" },
              dueDate: "2023-11-30",
              createdAt: "2023-11-10"
            },
            {
              id: 4,
              title: "Deploy to staging environment",
              description: "Set up and deploy the current version to the staging environment for testing.",
              status: "Blocked",
              assignee: { id: 4, name: "Lisa Wong", role: "Data Scientist", avatar: "/avatars/user4.png" },
              dueDate: "2023-12-05",
              createdAt: "2023-11-15"
            }
          ],
          commits: [
            {
              id: "c1",
              message: "Implement authentication controller",
              author: "Alex Johnson",
              date: "2 hours ago",
              hash: "a1b2c3d"
            },
            {
              id: "c2",
              message: "Fix vector search performance issue",
              author: "Nahom Anteneh",
              date: "1 day ago",
              hash: "e4f5g6h"
            },
            {
              id: "c3",
              message: "Add unit tests for API endpoints",
              author: "Michael Chen",
              date: "2 days ago",
              hash: "i7j8k9l"
            },
            {
              id: "c4",
              message: "Update project documentation",
              author: "Lisa Wong",
              date: "3 days ago",
              hash: "m1n2o3p"
            }
          ]
        };
        
        setProject(projectData);
        setIsLoading(false);
      }, 1000);
    };
    
    fetchData();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <p>Loading project details...</p>
      </div>
    );
  }
  
  if (!project) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold mb-2">Project Not Found</h2>
        <p className="text-muted-foreground mb-4">
          The project you're looking for doesn't exist or you don't have access to it.
        </p>
        <Button asChild>
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    );
  }

  // Helper function to get status color
  const getStatusColor = (status: ProjectStatus) => {
    switch(status) {
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Submitted": return "bg-purple-100 text-purple-800";
      case "Under Review": return "bg-yellow-100 text-yellow-800";
      case "Completed": return "bg-green-100 text-green-800";
      case "Archived": return "bg-slate-100 text-slate-800";
      default: return "bg-slate-100 text-slate-800";
    }
  };

  // Helper function to get task status color and icon
  const getTaskStatusInfo = (status: Task['status']) => {
    switch(status) {
      case "In Progress": 
        return {
          color: "bg-blue-100 text-blue-800",
          icon: <Clock className="h-4 w-4 text-blue-600" />
        };
      case "To Do": 
        return {
          color: "bg-slate-100 text-slate-800",
          icon: <Clipboard className="h-4 w-4 text-slate-600" />
        };
      case "Completed": 
        return {
          color: "bg-green-100 text-green-800",
          icon: <CheckCircle className="h-4 w-4 text-green-600" />
        };
      case "Blocked": 
        return {
          color: "bg-red-100 text-red-800",
          icon: <AlertCircle className="h-4 w-4 text-red-600" />
        };
      default: 
        return {
          color: "bg-slate-100 text-slate-800",
          icon: <Clipboard className="h-4 w-4 text-slate-600" />
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Navigation */}
      <div>
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
      
      {/* Project Header */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold">{project.name}</h1>
            <Badge className={getStatusColor(project.status)}>
              {project.status}
            </Badge>
            {project.isStarred && (
              <Badge variant="outline" className="bg-yellow-50">
                <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                Starred
              </Badge>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <Link href={`/${project.group.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-vec-primary hover:underline">
                {project.group}
              </Link>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Due {project.dueDate}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>Updated {project.lastUpdated}</span>
            </div>
          </div>
          
          <p className="text-base text-muted-foreground max-w-3xl">
            {project.description}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 lg:justify-end">
          <Button className="flex items-center gap-2">
            <ExternalLink className="h-4 w-4" />
            View Repository
          </Button>
          
          {project.isGroupLeader && (
            <Button variant="outline" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Manage Project
            </Button>
          )}
          
          <Button variant="outline" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          
          <Button variant="outline" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Message
          </Button>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="bg-white p-4 rounded-lg border">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Project Progress</span>
          <span className="text-sm font-medium">{project.progress}%</span>
        </div>
        <Progress value={project.progress} className="h-2" />
      </div>
      
      {/* Project Content Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="repository">Repository</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Project Members */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Project Members</CardTitle>
                <CardDescription>Team members working on this project</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.members.map(member => (
                    <div key={member.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t bg-slate-50 justify-center">
                <Button variant="outline" size="sm" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Project Member
                </Button>
              </CardFooter>
            </Card>
            
            {/* Project Advisor */}
            <Card>
              <CardHeader>
                <CardTitle>Project Advisor</CardTitle>
                <CardDescription>Academic advisor for this project</CardDescription>
              </CardHeader>
              <CardContent>
                {project.advisor ? (
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-20 w-20 mb-3">
                      <AvatarImage src={project.advisor.avatar} alt={project.advisor.name} />
                      <AvatarFallback>{project.advisor.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-medium text-lg">{project.advisor.name}</h3>
                    <p className="text-muted-foreground mb-4">{project.advisor.department}</p>
                    <Button className="w-full">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message Advisor
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center p-4">
                    <User className="h-12 w-12 text-muted-foreground mb-3" />
                    <h3 className="font-medium mb-2">No Advisor Assigned</h3>
                    <p className="text-muted-foreground mb-4">
                      This project doesn't have an academic advisor yet.
                    </p>
                    {project.isGroupLeader && (
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Request Advisor
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest commits and project activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.commits.map(commit => (
                    <div key={commit.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
                      <GitCommit className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                          <Link 
                            href={`${project.repositoryUrl}/commit/${commit.hash}`}
                            className="font-medium hover:text-vec-primary hover:underline"
                          >
                            {commit.message}
                          </Link>
                          <span className="text-sm text-muted-foreground">{commit.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-sm">by</span>
                          <span className="text-sm font-medium">{commit.author}</span>
                          <span className="text-xs text-muted-foreground ml-2">#{commit.hash.substring(0, 7)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t bg-slate-50 justify-center">
                <Button variant="outline" size="sm" asChild>
                  <Link href={project.repositoryUrl}>
                    View All Commits
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        {/* Tasks Tab */}
        <TabsContent value="tasks" className="mt-0">
          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-bold">Project Tasks</h2>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>
          
          <div className="grid gap-4">
            {project.tasks.map(task => {
              const statusInfo = getTaskStatusInfo(task.status);
              return (
                <div 
                  key={task.id} 
                  className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border rounded-lg bg-white"
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-medium">{task.title}</h3>
                      <Badge className={statusInfo.color}>
                        <span className="flex items-center gap-1">
                          {statusInfo.icon}
                          {task.status}
                        </span>
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      {task.assignee && (
                        <div className="flex items-center">
                          <Avatar className="h-5 w-5 mr-1">
                            <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                            <AvatarFallback>{task.assignee.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <span>Assigned to {task.assignee.name}</span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        <span>Due {task.dueDate}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        <span>Created {task.createdAt}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    {task.status !== 'Completed' && (
                      <Button variant="outline" size="sm" className="text-green-600">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Mark Complete
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>
        
        {/* Repository Tab */}
        <TabsContent value="repository" className="mt-0">
          <div className="bg-white border rounded-lg p-6 text-center">
            <h2 className="text-xl font-bold mb-4">Repository Access</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Access the project's source code, manage files, create branches, 
              handle pull requests, and more in the repository.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <Button className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                Open Repository
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <GitBranch className="h-4 w-4" />
                Create Branch
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <GitPullRequest className="h-4 w-4" />
                Create Pull Request
              </Button>
            </div>
            
            <div className="bg-slate-50 rounded-lg p-4 inline-block">
              <p className="text-sm mb-2">Repository URL:</p>
              <div className="flex items-center gap-2">
                <code className="bg-slate-100 p-2 rounded text-sm">
                  {project.repositoryUrl}
                </code>
                <Button variant="ghost" size="sm">
                  Copy
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Feedback Tab */}
        <TabsContent value="feedback" className="mt-0">
          <div className="bg-white border rounded-lg p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-bold">Advisor Feedback</h2>
                <p className="text-muted-foreground">
                  View feedback and comments from your project advisor
                </p>
              </div>
              <Button>
                <FileText className="h-4 w-4 mr-2" />
                Request Feedback
              </Button>
            </div>
            
            {project.advisor ? (
              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar>
                      <AvatarImage src={project.advisor.avatar} alt={project.advisor.name} />
                      <AvatarFallback>{project.advisor.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{project.advisor.name}</p>
                      <p className="text-sm text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                  <p className="mb-4">
                    The project is progressing well. I'm particularly impressed with the vector search 
                    implementation. Consider adding more documentation for the API endpoints to make 
                    it easier for other developers to understand how to use them.
                  </p>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Reply
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar>
                      <AvatarImage src={project.advisor.avatar} alt={project.advisor.name} />
                      <AvatarFallback>{project.advisor.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{project.advisor.name}</p>
                      <p className="text-sm text-muted-foreground">1 week ago</p>
                    </div>
                  </div>
                  <p className="mb-4">
                    I reviewed the database schema and have some suggestions for optimizing the 
                    query performance. Let's schedule a meeting to discuss these in more detail.
                  </p>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <h3 className="text-lg font-medium mb-2">No Feedback Yet</h3>
                <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                  There's no feedback for this project yet. You can request feedback from your advisor 
                  using the button above.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 