"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { 
  Plus, 
  Search, 
  Filter, 
  GitBranch, 
  Users, 
  Calendar, 
  Clock, 
  ChevronRight,
  Star,
  CheckCircle,
  ExternalLink,
  Folder,
  ArrowUpDown,
  Grid3X3,
  List
} from "lucide-react";

// Define types for project data
type ProjectStatus = 'In Progress' | 'Submitted' | 'Under Review' | 'Completed' | 'Archived';

interface ProjectMember {
  id: number;
  name: string;
  role: string;
  avatar?: string;
}

interface Advisor {
  id: number;
  name: string;
  avatar?: string;
  department: string;
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
  isOwner: boolean;
}

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("lastUpdated");
  
  // Mock data for projects - in a real app, this would come from an API
  const projects: Project[] = [
    {
      id: 1,
      name: "Vector Database Implementation",
      description: "Building a vector database system for efficient similarity search and retrieval of embeddings",
      status: "In Progress",
      progress: 65,
      lastUpdated: "2 hours ago",
      createdAt: "2023-10-15",
      dueDate: "Dec 15, 2023",
      members: [
        { id: 1, name: "Alex Johnson", role: "Team Lead" },
        { id: 2, name: "Michael Chen", role: "Developer" },
      ],
      advisor: {
        id: 101,
        name: "Dr. Sarah Williams",
        department: "Computer Science"
      },
      repositoryUrl: "/repository/vector-db",
      isStarred: true,
      isOwner: true
    },
    {
      id: 2,
      name: "ML Algorithm Optimization",
      description: "Optimizing machine learning algorithms for better performance across different environments",
      status: "Under Review",
      progress: 90,
      lastUpdated: "1 day ago",
      createdAt: "2023-09-20",
      dueDate: "Dec 10, 2023",
      members: [
        { id: 3, name: "Lisa Wong", role: "Lead Researcher" },
        { id: 4, name: "James Wilson", role: "Data Scientist" },
      ],
      advisor: {
        id: 102,
        name: "Dr. Robert Chen",
        department: "Data Science"
      },
      repositoryUrl: "/repository/ml-optimization",
      isStarred: false,
      isOwner: false
    },
    {
      id: 3,
      name: "Database Security Audit",
      description: "Comprehensive security audit of database systems to identify and address vulnerabilities",
      status: "Completed",
      progress: 100,
      lastUpdated: "3 days ago",
      createdAt: "2023-08-05",
      dueDate: "Nov 30, 2023",
      members: [
        { id: 5, name: "Emma Smith", role: "Security Lead" },
        { id: 6, name: "David Kim", role: "Database Specialist" },
      ],
      advisor: {
        id: 103,
        name: "Dr. Maria Rodriguez",
        department: "Cybersecurity"
      },
      repositoryUrl: "/repository/db-security",
      isStarred: true,
      isOwner: false
    },
    {
      id: 4,
      name: "Web Framework Development",
      description: "Building a modern web development framework focused on performance and developer experience",
      status: "In Progress",
      progress: 45,
      lastUpdated: "6 hours ago",
      createdAt: "2023-10-01",
      dueDate: "Jan 15, 2024",
      members: [
        { id: 7, name: "Noah Garcia", role: "Frontend Lead" },
        { id: 8, name: "Sophia Clark", role: "Backend Engineer" },
      ],
      advisor: {
        id: 104,
        name: "Dr. Thomas Brown",
        department: "Software Engineering"
      },
      repositoryUrl: "/repository/web-framework",
      isStarred: false,
      isOwner: true
    }
  ];

  // Filter and sort the projects based on user selections
  const filteredProjects = projects
    .filter(project => {
      // Apply text search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          project.name.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          (project.advisor && project.advisor.name.toLowerCase().includes(query))
        );
      }
      return true;
    })
    .filter(project => {
      // Apply status filter
      if (statusFilter === "all") return true;
      return project.status === statusFilter;
    })
    .sort((a, b) => {
      // Apply sorting
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "dueDate":
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case "progress":
          return b.progress - a.progress;
        case "lastUpdated":
        default:
          // For simplicity, we're just sorting alphabetically for "lastUpdated" since they're strings
          // In a real app, you'd convert these to dates first
          return a.lastUpdated.localeCompare(b.lastUpdated);
      }
    });

  // Helper function to get status color
  const getStatusColor = (status: ProjectStatus): string => {
    switch(status) {
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Submitted": return "bg-purple-100 text-purple-800";
      case "Under Review": return "bg-yellow-100 text-yellow-800";
      case "Completed": return "bg-green-100 text-green-800";
      case "Archived": return "bg-slate-100 text-slate-800";
      default: return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage your academic and research projects</p>
        </div>
        <Button size="sm" className="flex items-center gap-1">
          <Plus className="h-4 w-4 mr-1" />
          <span>Create Project</span>
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search projects..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32 sm:w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Submitted">Submitted</SelectItem>
              <SelectItem value="Under Review">Under Review</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Archived">Archived</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32 sm:w-40">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lastUpdated">Last Updated</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="dueDate">Due Date</SelectItem>
              <SelectItem value="progress">Progress</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex border rounded-md">
            <Button 
              variant={viewMode === "grid" ? "default" : "ghost"} 
              size="icon" 
              className="h-10 w-10 rounded-r-none"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === "list" ? "default" : "ghost"} 
              size="icon" 
              className="h-10 w-10 rounded-l-none"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Project Display Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full max-w-md mb-4">
          <TabsTrigger value="all" className="flex-1">All Projects</TabsTrigger>
          <TabsTrigger value="mine" className="flex-1">My Projects</TabsTrigger>
          <TabsTrigger value="starred" className="flex-1">Starred</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0 space-y-4">
          {viewMode === "grid" ? (
            // Grid View
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden flex flex-col">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <Link 
                          href={`/dashboard/projects/${project.id}`}
                          className="font-medium hover:text-primary hover:underline text-lg"
                        >
                          {project.name}
                        </Link>
                        <CardDescription className="line-clamp-2 h-10">
                          {project.description}
                        </CardDescription>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className={`h-8 w-8 ${project.isStarred ? "text-yellow-500" : ""}`}
                      >
                        <Star className="h-4 w-4" fill={project.isStarred ? "currentColor" : "none"} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2 flex-1">
                    <div className="flex flex-col h-full">
                      <div className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Progress</span>
                          <span className="text-xs font-medium">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                        <span className="flex items-center">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          Due {project.dueDate}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-slate-50 border-t flex justify-between pt-2 pb-2">
                    <div className="flex -space-x-2">
                      {project.members.slice(0, 3).map((member, i) => (
                        <Avatar key={member.id} className="h-6 w-6 border-2 border-background">
                          <AvatarFallback className="text-[10px]">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {project.members.length > 3 && (
                        <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-muted text-[10px] font-medium">
                          +{project.members.length - 3}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <GitBranch className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <Users className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            // List View
            <div className="space-y-2">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0 mr-4">
                        <div className="flex items-center gap-2 mb-1">
                          <Link 
                            href={`/dashboard/projects/${project.id}`}
                            className="font-medium hover:text-primary hover:underline text-lg truncate"
                          >
                            {project.name}
                          </Link>
                          <Badge className={getStatusColor(project.status)}>
                            {project.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {project.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col items-end text-xs">
                          <div className="flex items-center mb-1">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            <span>{project.dueDate}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            <span>Updated {project.lastUpdated}</span>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className={`h-8 w-8 ${project.isStarred ? "text-yellow-500" : ""}`}
                        >
                          <Star className="h-4 w-4" fill={project.isStarred ? "currentColor" : "none"} />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-4">
                        <div className="flex -space-x-2">
                          {project.members.slice(0, 3).map((member, i) => (
                            <Avatar key={member.id} className="h-6 w-6 border-2 border-background">
                              <AvatarFallback className="text-[10px]">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {project.members.length > 3 && (
                            <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-muted text-[10px] font-medium">
                              +{project.members.length - 3}
                            </div>
                          )}
                        </div>
                        {project.advisor && (
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span>Advisor: {project.advisor.name}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-medium">{project.progress}%</span>
                          <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full" 
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-full">
                            <GitBranch className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-full">
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
          
          {filteredProjects.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="bg-slate-100 p-4 rounded-full mb-4">
                <Folder className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium">No projects found</h3>
              <p className="text-muted-foreground text-center mt-1 mb-4">
                {searchQuery 
                  ? "Try adjusting your search or filters"
                  : "Create your first project to get started"
                }
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-1" />
                Create Project
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="mine" className="mt-0">
          {/* My Projects Content - similar structure to "all" but filtered */}
          <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-2"}>
            {filteredProjects
              .filter(project => project.isOwner)
              .map((project) => (
                <Card key={project.id} className="overflow-hidden">
                  {/* Same card content as above, omitted for brevity */}
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <Link 
                          href={`/dashboard/projects/${project.id}`}
                          className="font-medium hover:text-primary hover:underline text-lg"
                        >
                          {project.name}
                        </Link>
                        <CardDescription className="line-clamp-2 h-10">
                          {project.description}
                        </CardDescription>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className={`h-8 w-8 ${project.isStarred ? "text-yellow-500" : ""}`}
                      >
                        <Star className="h-4 w-4" fill={project.isStarred ? "currentColor" : "none"} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-muted-foreground">Progress</span>
                        <span className="text-xs font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                      <span className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        Due {project.dueDate}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-slate-50 border-t flex justify-between pt-2 pb-2">
                    {/* Same footer as above */}
                    <div className="flex -space-x-2">
                      {project.members.slice(0, 3).map((member, i) => (
                        <Avatar key={member.id} className="h-6 w-6 border-2 border-background">
                          <AvatarFallback className="text-[10px]">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {project.members.length > 3 && (
                        <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-muted text-[10px] font-medium">
                          +{project.members.length - 3}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <GitBranch className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <Users className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
          </div>
          
          {filteredProjects.filter(p => p.isOwner).length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="bg-slate-100 p-4 rounded-full mb-4">
                <Folder className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium">No projects owned by you</h3>
              <p className="text-muted-foreground text-center mt-1 mb-4">
                Create your first project as an owner
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-1" />
                Create Project
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="starred" className="mt-0">
          {/* Starred Projects Content */}
          <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-2"}>
            {filteredProjects
              .filter(project => project.isStarred)
              .map((project) => (
                <Card key={project.id} className="overflow-hidden">
                  {/* Same card content as above, omitted for brevity */}
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <Link 
                          href={`/dashboard/projects/${project.id}`}
                          className="font-medium hover:text-primary hover:underline text-lg"
                        >
                          {project.name}
                        </Link>
                        <CardDescription className="line-clamp-2 h-10">
                          {project.description}
                        </CardDescription>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-yellow-500"
                      >
                        <Star className="h-4 w-4" fill="currentColor" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-muted-foreground">Progress</span>
                        <span className="text-xs font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                      <span className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        Due {project.dueDate}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-slate-50 border-t flex justify-between pt-2 pb-2">
                    {/* Same footer as above */}
                    <div className="flex -space-x-2">
                      {project.members.slice(0, 3).map((member, i) => (
                        <Avatar key={member.id} className="h-6 w-6 border-2 border-background">
                          <AvatarFallback className="text-[10px]">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {project.members.length > 3 && (
                        <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-muted text-[10px] font-medium">
                          +{project.members.length - 3}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <GitBranch className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <Users className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
          </div>
          
          {filteredProjects.filter(p => p.isStarred).length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="bg-slate-100 p-4 rounded-full mb-4">
                <Star className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium">No starred projects</h3>
              <p className="text-muted-foreground text-center mt-1 mb-4">
                Star projects to keep track of your favorites
              </p>
              <Button variant="outline">
                <Search className="h-4 w-4 mr-1" />
                Browse Projects
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 