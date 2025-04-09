"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { 
  Search,
  Plus,
  Mail, 
  Users, 
  UserPlus, 
  FolderKanban, 
  ChevronRight,
  Calendar,
  Settings,
  Eye,
  UserCircle,
  Filter,
  CheckCircle,
  X
} from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

// Define types
interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  joinDate: string;
  isLead: boolean;
}

interface Project {
  id: number;
  name: string;
  status: "Planning" | "In Progress" | "Completed" | "On Hold";
  progress: number;
  dueDate: string;
  course?: string;
}

interface Team {
  id: number;
  name: string;
  description: string;
  members: TeamMember[];
  projects: Project[];
  createdAt: string;
  department?: string;
  course?: string;
}

export default function TeamsPage() {
  // Teams state
  const [teams, setTeams] = useState<Team[]>([
    {
      id: 1,
      name: "Team Alpha",
      description: "Working on vector database implementation and optimization",
      members: [
        { 
          id: 1, 
          name: "Alex Johnson", 
          email: "alex@example.com", 
          role: "Team Lead",
          joinDate: "Oct 1, 2023",
          isLead: true
        },
        { 
          id: 2, 
          name: "Sophia Garcia", 
          email: "sophia@example.com", 
          role: "Database Specialist",
          joinDate: "Oct 2, 2023",
          isLead: false
        },
        { 
          id: 3, 
          name: "Michael Chen", 
          email: "michael@example.com", 
          role: "Developer",
          joinDate: "Oct 2, 2023",
          isLead: false
        },
        { 
          id: 4, 
          name: "Emma Smith", 
          email: "emma@example.com", 
          role: "ML Engineer",
          joinDate: "Oct 5, 2023",
          isLead: false
        },
      ],
      projects: [
        {
          id: 101,
          name: "Vector Database Implementation",
          status: "In Progress",
          progress: 65,
          dueDate: "Dec 15, 2023",
          course: "Advanced Database Systems"
        }
      ],
      createdAt: "October 1, 2023",
      department: "Computer Science",
      course: "Advanced Database Systems"
    },
    {
      id: 2,
      name: "Team Beta",
      description: "Machine learning algorithm optimization research group",
      members: [
        { 
          id: 5, 
          name: "Daniel Lee", 
          email: "daniel@example.com", 
          role: "ML Researcher",
          joinDate: "Sep 15, 2023",
          isLead: true
        },
        { 
          id: 6, 
          name: "Olivia Brown", 
          email: "olivia@example.com", 
          role: "Data Scientist",
          joinDate: "Sep 18, 2023",
          isLead: false
        },
        { 
          id: 7, 
          name: "William Taylor", 
          email: "william@example.com", 
          role: "ML Engineer",
          joinDate: "Sep 20, 2023",
          isLead: false
        },
      ],
      projects: [
        {
          id: 102,
          name: "ML Algorithm Optimization",
          status: "In Progress",
          progress: 75,
          dueDate: "Dec 10, 2023",
          course: "Advanced Machine Learning"
        }
      ],
      createdAt: "September 15, 2023",
      department: "Data Science",
      course: "Advanced Machine Learning"
    },
    {
      id: 3,
      name: "Team Gamma",
      description: "Database security audit research team",
      members: [
        { 
          id: 8, 
          name: "James Wilson", 
          email: "james@example.com", 
          role: "Security Specialist",
          joinDate: "Sep 5, 2023",
          isLead: true
        },
        { 
          id: 9, 
          name: "Ava Martinez", 
          email: "ava@example.com", 
          role: "Database Admin",
          joinDate: "Sep 7, 2023",
          isLead: false
        },
        { 
          id: 10, 
          name: "Ethan Anderson", 
          email: "ethan@example.com", 
          role: "Security Analyst",
          joinDate: "Sep 10, 2023",
          isLead: false
        },
      ],
      projects: [
        {
          id: 103,
          name: "Database Security Audit",
          status: "Completed",
          progress: 100,
          dueDate: "Nov 30, 2023",
          course: "Database Security"
        }
      ],
      createdAt: "September 5, 2023",
      department: "Cybersecurity",
      course: "Database Security"
    }
  ]);
  
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [newTeamDialogOpen, setNewTeamDialogOpen] = useState(false);
  const [newTeam, setNewTeam] = useState({
    name: "",
    description: "",
    course: "",
    department: ""
  });
  
  // Filter teams based on search
  const filteredTeams = teams.filter(team => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      team.name.toLowerCase().includes(query) ||
      team.description.toLowerCase().includes(query) ||
      team.department?.toLowerCase().includes(query) ||
      team.course?.toLowerCase().includes(query) ||
      team.members.some(member => 
        member.name.toLowerCase().includes(query) || 
        member.role.toLowerCase().includes(query)
      )
    );
  });
  
  // Create a new team
  const handleCreateTeam = () => {
    const newTeamData: Team = {
      id: Math.max(0, ...teams.map(t => t.id)) + 1,
      name: newTeam.name,
      description: newTeam.description,
      members: [],
      projects: [],
      createdAt: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      department: newTeam.department,
      course: newTeam.course
    };
    
    setTeams([...teams, newTeamData]);
    setNewTeam({
      name: "",
      description: "",
      course: "",
      department: ""
    });
    setNewTeamDialogOpen(false);
  };
  
  // Get status color
  const getStatusColor = (status: string): string => {
    switch(status) {
      case "Planning": return "bg-slate-100 text-slate-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Completed": return "bg-green-100 text-green-800";
      case "On Hold": return "bg-yellow-100 text-yellow-800";
      default: return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Teams</h1>
          <p className="text-muted-foreground">Manage your project teams and collaborators</p>
        </div>
        <Dialog open={newTeamDialogOpen} onOpenChange={setNewTeamDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="flex items-center gap-1">
              <Plus className="h-4 w-4 mr-1" />
              <span>Create Team</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Team</DialogTitle>
              <DialogDescription>
                Create a new team for project collaboration.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="teamName">Team Name</Label>
                <Input
                  id="teamName"
                  placeholder="Enter team name"
                  value={newTeam.name}
                  onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the team's focus..."
                  rows={3}
                  value={newTeam.description}
                  onChange={(e) => setNewTeam({ ...newTeam, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    placeholder="e.g. Computer Science"
                    value={newTeam.department}
                    onChange={(e) => setNewTeam({ ...newTeam, department: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="course">Course</Label>
                  <Input
                    id="course"
                    placeholder="e.g. Advanced Databases"
                    value={newTeam.course}
                    onChange={(e) => setNewTeam({ ...newTeam, course: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setNewTeamDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleCreateTeam} 
                disabled={!newTeam.name || !newTeam.description}
              >
                Create Team
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search teams..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="cs">Computer Science</SelectItem>
              <SelectItem value="ds">Data Science</SelectItem>
              <SelectItem value="cy">Cybersecurity</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Teams Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full max-w-md mb-4">
          <TabsTrigger value="all" className="flex-1">All Teams</TabsTrigger>
          <TabsTrigger value="my" className="flex-1">My Teams</TabsTrigger>
          <TabsTrigger value="lead" className="flex-1">Team Lead</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          {filteredTeams.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="bg-slate-100 p-4 rounded-full mb-4">
                <Users className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium">No teams found</h3>
              <p className="text-muted-foreground text-center mt-1 mb-4">
                {searchQuery ? "Try adjusting your search" : "Create your first team to get started"}
              </p>
              <Button onClick={() => setNewTeamDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-1" />
                Create Team
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTeams.map((team) => (
                <Card key={team.id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link 
                          href={`/dashboard/teams/${team.id}`}
                          className="text-xl font-medium hover:text-primary hover:underline"
                        >
                          {team.name}
                        </Link>
                        <CardDescription className="mt-1">
                          {team.description}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-8">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Team Members */}
                      <div>
                        <h3 className="text-sm font-medium mb-2 flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          Members ({team.members.length})
                        </h3>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {team.members.slice(0, 5).map((member) => (
                            <Avatar key={member.id} className="h-8 w-8" title={member.name}>
                              <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {team.members.length > 5 && (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs">
                              +{team.members.length - 5}
                            </div>
                          )}
                          <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                            <UserPlus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="text-sm text-muted-foreground mt-2">
                          Lead: {team.members.find(m => m.isLead)?.name || "None"}
                        </div>
                      </div>
                      
                      {/* Team Projects */}
                      <div>
                        <h3 className="text-sm font-medium mb-2 flex items-center">
                          <FolderKanban className="h-4 w-4 mr-1" />
                          Projects ({team.projects.length})
                        </h3>
                        <div className="space-y-2">
                          {team.projects.map((project) => (
                            <div key={project.id} className="flex items-center justify-between">
                              <Link 
                                href={`/dashboard/projects/${project.id}`}
                                className="text-sm hover:text-primary hover:underline"
                              >
                                {project.name}
                              </Link>
                              <Badge className={getStatusColor(project.status)}>
                                {project.status}
                              </Badge>
                            </div>
                          ))}
                          {team.projects.length === 0 && (
                            <p className="text-sm text-muted-foreground">No projects yet</p>
                          )}
                        </div>
                      </div>
                      
                      {/* Team Details */}
                      <div>
                        <h3 className="text-sm font-medium mb-2 flex items-center">
                          <Settings className="h-4 w-4 mr-1" />
                          Details
                        </h3>
                        <div className="space-y-1 text-sm">
                          {team.department && (
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Department:</span>
                              <span>{team.department}</span>
                            </div>
                          )}
                          {team.course && (
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Course:</span>
                              <span>{team.course}</span>
                            </div>
                          )}
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Created:</span>
                            <span>{team.createdAt}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-slate-50 border-t flex justify-between py-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>
                        Next meeting: {Math.floor(Math.random() * 7) + 1} days
                      </span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary" asChild>
                      <Link href={`/dashboard/teams/${team.id}`}>
                        Team Details
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="my" className="mt-0">
          {/* My Teams Tab - We'll use a subset of the teams for demo */}
          <div className="space-y-4">
            {filteredTeams.slice(0, 2).map((team) => (
              <Card key={team.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link 
                        href={`/dashboard/teams/${team.id}`}
                        className="text-xl font-medium hover:text-primary hover:underline"
                      >
                        {team.name}
                      </Link>
                      <CardDescription className="mt-1">
                        {team.description}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-8">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Team Members */}
                    <div>
                      <h3 className="text-sm font-medium mb-2 flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        Members ({team.members.length})
                      </h3>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {team.members.slice(0, 5).map((member) => (
                          <Avatar key={member.id} className="h-8 w-8" title={member.name}>
                            <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {team.members.length > 5 && (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs">
                            +{team.members.length - 5}
                          </div>
                        )}
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                          <UserPlus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">
                        Lead: {team.members.find(m => m.isLead)?.name || "None"}
                      </div>
                    </div>
                    
                    {/* Team Projects */}
                    <div>
                      <h3 className="text-sm font-medium mb-2 flex items-center">
                        <FolderKanban className="h-4 w-4 mr-1" />
                        Projects ({team.projects.length})
                      </h3>
                      <div className="space-y-2">
                        {team.projects.map((project) => (
                          <div key={project.id} className="flex items-center justify-between">
                            <Link 
                              href={`/dashboard/projects/${project.id}`}
                              className="text-sm hover:text-primary hover:underline"
                            >
                              {project.name}
                            </Link>
                            <Badge className={getStatusColor(project.status)}>
                              {project.status}
                            </Badge>
                          </div>
                        ))}
                        {team.projects.length === 0 && (
                          <p className="text-sm text-muted-foreground">No projects yet</p>
                        )}
                      </div>
                    </div>
                    
                    {/* Team Details */}
                    <div>
                      <h3 className="text-sm font-medium mb-2 flex items-center">
                        <Settings className="h-4 w-4 mr-1" />
                        Details
                      </h3>
                      <div className="space-y-1 text-sm">
                        {team.department && (
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Department:</span>
                            <span>{team.department}</span>
                          </div>
                        )}
                        {team.course && (
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Course:</span>
                            <span>{team.course}</span>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Created:</span>
                          <span>{team.createdAt}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-slate-50 border-t flex justify-between py-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>
                      Next meeting: {Math.floor(Math.random() * 7) + 1} days
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary" asChild>
                    <Link href={`/dashboard/teams/${team.id}`}>
                      Team Details
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="lead" className="mt-0">
          {/* Teams where I'm a lead - For demo, let's use only one team */}
          <div className="space-y-4">
            {filteredTeams.slice(0, 1).map((team) => (
              <Card key={team.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <Link 
                          href={`/dashboard/teams/${team.id}`}
                          className="text-xl font-medium hover:text-primary hover:underline"
                        >
                          {team.name}
                        </Link>
                        <Badge className="bg-purple-100 text-purple-800">Team Lead</Badge>
                      </div>
                      <CardDescription className="mt-1">
                        {team.description}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="h-8">
                        <Settings className="h-4 w-4 mr-1" />
                        Manage
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Team Members */}
                    <div>
                      <h3 className="text-sm font-medium mb-2 flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        Members ({team.members.length})
                      </h3>
                      <div className="space-y-2">
                        {team.members.map((member) => (
                          <div key={member.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-7 w-7">
                                <AvatarFallback className="text-xs">
                                  {member.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">{member.name}</p>
                                <p className="text-xs text-muted-foreground">{member.role}</p>
                              </div>
                            </div>
                            {member.isLead ? (
                              <Badge variant="outline" className="text-xs">Lead</Badge>
                            ) : (
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <X className="h-3.5 w-3.5" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-2">
                        <UserPlus className="h-4 w-4 mr-1" />
                        Add Member
                      </Button>
                    </div>
                    
                    {/* Team Projects */}
                    <div>
                      <h3 className="text-sm font-medium mb-2 flex items-center">
                        <FolderKanban className="h-4 w-4 mr-1" />
                        Projects ({team.projects.length})
                      </h3>
                      <div className="space-y-2">
                        {team.projects.map((project) => (
                          <div key={project.id} className="p-2 border rounded-md">
                            <div className="flex justify-between mb-1">
                              <Link 
                                href={`/dashboard/projects/${project.id}`}
                                className="text-sm font-medium hover:text-primary hover:underline"
                              >
                                {project.name}
                              </Link>
                              <Badge className={getStatusColor(project.status)}>
                                {project.status}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>Due: {project.dueDate}</span>
                              <span>Progress: {project.progress}%</span>
                            </div>
                          </div>
                        ))}
                        <Button variant="outline" size="sm" className="w-full">
                          <Plus className="h-4 w-4 mr-1" />
                          Add Project
                        </Button>
                      </div>
                    </div>
                    
                    {/* Team Management */}
                    <div>
                      <h3 className="text-sm font-medium mb-2 flex items-center">
                        <UserCircle className="h-4 w-4 mr-1" />
                        Team Lead Actions
                      </h3>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule Meeting
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Mail className="h-4 w-4 mr-2" />
                          Send Announcement
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <FolderKanban className="h-4 w-4 mr-2" />
                          Assign Tasks
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Review Progress
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-slate-50 border-t flex justify-between py-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>
                      Next meeting: 3 days
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary" asChild>
                    <Link href={`/dashboard/teams/${team.id}`}>
                      Team Dashboard
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            {filteredTeams.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 px-4">
                <div className="bg-slate-100 p-4 rounded-full mb-4">
                  <UserCircle className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium">Not a team lead yet</h3>
                <p className="text-muted-foreground text-center mt-1 mb-4">
                  Create a new team to become a team lead
                </p>
                <Button onClick={() => setNewTeamDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-1" />
                  Create Team
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 