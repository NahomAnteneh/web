"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { 
  Plus, 
  Search, 
  Filter, 
  SortDesc, 
  GitBranch, 
  Users, 
  Calendar, 
  Clock, 
  MoreHorizontal,
  ChevronDown,
  User,
  Star,
  Share2,
  ExternalLink,
  Settings,
  LogOut
} from "lucide-react";
import { useGroupContext } from "./group-context";
import { cn } from "@/lib/utils";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue
} from "@/components/ui/select";
import { ArrowUp, ArrowDown, FolderOpen } from "lucide-react";

// Import types and mock data from centralized location
import { 
  ProjectStatus, 
  SortOption, 
  Project,
  Advisor,
  projects as mockProjects,
  advisors,
  getProjectsByStatus
} from "@/data/mock";

export function ProjectsView() {
  const { groupData } = useGroupContext();
  
  // State for projects data and filtering/sorting
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "All">("All");
  const [advisorFilter, setAdvisorFilter] = useState<number | 'All'>('All');
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch mock data
  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setProjects(mockProjects);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Apply filters and sort to the projects
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || project.status === statusFilter;
    
    const matchesAdvisor = advisorFilter === 'All' || 
      (project.advisor && project.advisor.id === advisorFilter);
    
    return matchesSearch && matchesStatus && matchesAdvisor;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === "name") {
      return sortOrder === "asc" 
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortBy === "progress") {
      return sortOrder === "asc"
        ? a.progress - b.progress
        : b.progress - a.progress;
    } else if (sortBy === "dueDate") {
      return sortOrder === "asc"
        ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
    } else if (sortBy === "status") {
      return sortOrder === "asc"
        ? a.status.localeCompare(b.status)
        : b.status.localeCompare(a.status);
    } else { // lastUpdated
      return sortOrder === "asc"
        ? new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime()
        : new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
    }
  });

  // Helper function to get status color
  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "On Hold":
        return "bg-yellow-100 text-yellow-800";
      case "Not Started":
        return "bg-gray-100 text-gray-800";
      case "Under Review":
        return "bg-purple-100 text-purple-800";
      case "Submitted":
        return "bg-indigo-100 text-indigo-800";
      case "Archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Button size="sm" className="flex items-center gap-1">
          <Plus className="h-4 w-4 mr-1" />
          Create New Project
        </Button>
      </div>
      
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 pb-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Status
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setStatusFilter('All')}>
                All
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('In Progress')}>
                In Progress
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('Submitted')}>
                Submitted
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('Under Review')}>
                Under Review
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('Completed')}>
                Completed
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('On Hold')}>
                On Hold
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('Not Started')}>
                Not Started
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('Archived')}>
                Archived
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Advisor
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filter by Advisor</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setAdvisorFilter('All')}>
                All Advisors
              </DropdownMenuItem>
              {advisors.map(advisor => (
                <DropdownMenuItem 
                  key={advisor.id} 
                  onClick={() => setAdvisorFilter(advisor.id)}
                  className="flex items-center gap-2"
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={advisor.avatar} alt={advisor.name} />
                    <AvatarFallback>{advisor.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <span>{advisor.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <SortDesc className="h-4 w-4" />
                Sort
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Sort Projects</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSortBy('name')}>
                Project Name
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('progress')}>
                Progress
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('dueDate')}>
                Due Date
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('status')}>
                Status
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('lastUpdated')}>
                Last Updated
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            {sortOrder === "asc" ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {sortedProjects.map(project => (
          <Card key={project.id} className="flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start mb-2">
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Project Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Star className="h-4 w-4 mr-2" />
                      {project.isStarred ? 'Unstar' : 'Star'} Project
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Project
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Repository
                    </DropdownMenuItem>
                    {project.isOwner && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Settings className="h-4 w-4 mr-2" />
                          Manage Project
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <LogOut className="h-4 w-4 mr-2" />
                          Leave Project
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Link href={`/projects/${project.id}`} className="group">
                <CardTitle className="text-xl group-hover:text-primary group-hover:underline transition-colors">
                  {project.name}
                </CardTitle>
              </Link>
              <CardDescription className="line-clamp-2 h-10 mt-1">
                {project.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="flex-1">
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Progress</span>
                  <span className="text-xs font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
              
              {project.advisor && (
                <div className="flex items-center mb-4 gap-2">
                  <span className="text-xs text-muted-foreground">Advisor:</span>
                  <div className="flex items-center">
                    <Avatar className="h-5 w-5 mr-1">
                      <AvatarImage src={project.advisor.avatar} alt={project.advisor.name} />
                      <AvatarFallback>{project.advisor.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs">{project.advisor.name}</span>
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-3 mb-2">
                <div className="flex -space-x-2">
                  {project.teamMembers.slice(0, 3).map(member => (
                    <Avatar key={member.id} className="h-6 w-6 border-2 border-white">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                  ))}
                  {project.teamMembers.length > 3 && (
                    <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-xs">
                      +{project.teamMembers.length - 3}
                    </div>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">
                  {project.teamMembers.length} {project.teamMembers.length === 1 ? 'Member' : 'Members'}
                </span>
              </div>
            </CardContent>
            
            <CardFooter className="border-t bg-slate-50 flex justify-between pt-3">
              <div className="flex items-center text-xs">
                <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                <span>Due {new Date(project.dueDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5 mr-1" />
                <span>Updated {new Date(project.lastUpdated).toLocaleDateString()}</span>
              </div>
            </CardFooter>
          </Card>
        ))}
        
        {/* Create New Project Card */}
        <Card className="border-dashed bg-slate-50/50 flex flex-col items-center justify-center h-[26rem]">
          <CardContent className="py-8 flex flex-col items-center justify-center">
            <div className="rounded-full border-2 border-dashed border-slate-300 p-3 mb-3">
              <Plus className="h-6 w-6 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium mb-1">Create a new project</h3>
            <p className="text-sm text-center text-muted-foreground mb-4 max-w-[200px]">
              Start a new project for your group
            </p>
            <Button>Create Project</Button>
          </CardContent>
        </Card>
      </div>
      
      {/* No Results Message */}
      {sortedProjects.length === 0 && !isLoading && (
        <div className="p-8 text-center border rounded-lg">
          <h3 className="text-lg font-medium mb-2">No projects found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your filters or search query, or create a new project.
          </p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create New Project
          </Button>
        </div>
      )}
      
      {/* Loading State */}
      {isLoading && (
        <div className="p-8 text-center">
          <p>Loading projects...</p>
        </div>
      )}
    </div>
  );
} 