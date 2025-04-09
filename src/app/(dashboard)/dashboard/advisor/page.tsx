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
  GitBranch, 
  FileText, 
  Plus, 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Calendar, 
  Users, 
  BookOpen,
  ChevronRight,
  FileCheck,
  ClipboardList,
  User,
  Clipboard,
  BarChart,
  Star
} from "lucide-react";
import { useState } from "react";

// Define types for our data structures
type StatusType = "In Progress" | "To Do" | "Completed" | "Under Review" | "Pending Approval" | "Submitted";
type ReviewStatus = "Pending" | "Reviewed" | "Approved" | "Rejected" | "Needs Revision";

interface Project {
  id: number;
  name: string;
  description: string;
  group: string;
  members: number;
  status: StatusType;
  progress: number;
  lastUpdated: string;
  dueDate: string;
}

interface Student {
  id: number;
  name: string;
  group: string;
  project: string;
  lastActive: string;
  performance: "Excellent" | "Good" | "Average" | "Below Average" | "Needs Help";
}

interface Review {
  id: number;
  project: string;
  submissionType: string;
  group: string;
  submittedDate: string;
  status: ReviewStatus;
}

export default function AdvisorDashboardPage() {
  // Mock data for advisor dashboard
  const [assignedProjects, setAssignedProjects] = useState<Project[]>([
    {
      id: 1,
      name: "Vector Database Implementation",
      description: "Creating a vector database system with efficient search capabilities",
      group: "Team Alpha",
      members: 4,
      status: "In Progress",
      progress: 65,
      lastUpdated: "2 hours ago",
      dueDate: "Dec 15, 2023"
    },
    {
      id: 2,
      name: "ML Algorithm Optimization",
      description: "Optimizing machine learning algorithms for better performance",
      group: "Team Beta",
      members: 3,
      status: "Under Review",
      progress: 90,
      lastUpdated: "1 day ago",
      dueDate: "Dec 10, 2023"
    },
    {
      id: 3,
      name: "Database Security Audit",
      description: "Comprehensive security audit of database systems",
      group: "Team Gamma",
      members: 5,
      status: "Pending Approval",
      progress: 85,
      lastUpdated: "3 days ago",
      dueDate: "Nov 30, 2023"
    },
    {
      id: 4,
      name: "Web Development Framework",
      description: "Building a modern web development framework",
      group: "Team Delta",
      members: 4,
      status: "Submitted",
      progress: 100,
      lastUpdated: "1 week ago",
      dueDate: "Nov 15, 2023"
    },
  ]);

  const [studentGroups, setStudentGroups] = useState<Student[]>([
    {
      id: 1,
      name: "Alex Johnson",
      group: "Team Alpha",
      project: "Vector Database Implementation",
      lastActive: "1 hour ago",
      performance: "Excellent"
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      group: "Team Alpha",
      project: "Vector Database Implementation",
      lastActive: "3 hours ago",
      performance: "Good"
    },
    {
      id: 3,
      name: "David Chen",
      group: "Team Beta",
      project: "ML Algorithm Optimization",
      lastActive: "Yesterday",
      performance: "Average"
    },
    {
      id: 4,
      name: "Sofia Patel",
      group: "Team Beta",
      project: "ML Algorithm Optimization",
      lastActive: "2 days ago",
      performance: "Excellent"
    },
    {
      id: 5,
      name: "James Wilson",
      group: "Team Gamma",
      project: "Database Security Audit",
      lastActive: "Just now",
      performance: "Needs Help"
    },
  ]);

  const [pendingReviews, setPendingReviews] = useState<Review[]>([
    {
      id: 1,
      project: "Vector Database Implementation",
      submissionType: "Code Review",
      group: "Team Alpha",
      submittedDate: "Today, 9:45 AM",
      status: "Pending"
    },
    {
      id: 2,
      project: "ML Algorithm Optimization",
      submissionType: "Progress Report",
      group: "Team Beta",
      submittedDate: "Yesterday, 3:30 PM",
      status: "Reviewed"
    },
    {
      id: 3,
      project: "ML Algorithm Optimization",
      submissionType: "Code Review",
      group: "Team Beta",
      submittedDate: "Yesterday, 11:15 AM",
      status: "Needs Revision"
    },
    {
      id: 4,
      project: "Database Security Audit",
      submissionType: "Final Report Draft",
      group: "Team Gamma",
      submittedDate: "2 days ago",
      status: "Approved"
    },
  ]);

  const getStatusColor = (status: StatusType | ReviewStatus): string => {
    switch(status) {
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "To Do": return "bg-slate-100 text-slate-800";
      case "Completed": return "bg-green-100 text-green-800";
      case "Under Review": return "bg-yellow-100 text-yellow-800";
      case "Pending Approval": return "bg-purple-100 text-purple-800";
      case "Submitted": return "bg-teal-100 text-teal-800";
      case "Pending": return "bg-orange-100 text-orange-800";
      case "Reviewed": return "bg-blue-100 text-blue-800";
      case "Approved": return "bg-green-100 text-green-800";
      case "Rejected": return "bg-red-100 text-red-800";
      case "Needs Revision": return "bg-yellow-100 text-yellow-800";
      default: return "bg-slate-100 text-slate-800";
    }
  };

  const getPerformanceColor = (performance: string): string => {
    switch(performance) {
      case "Excellent": return "text-green-600";
      case "Good": return "text-blue-600";
      case "Average": return "text-yellow-600";
      case "Below Average": return "text-orange-600";
      case "Needs Help": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Advisor Dashboard</h1>
          <p className="text-muted-foreground">Manage your supervised projects and student groups</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Schedule Meeting</span>
          </Button>
          <Button size="sm" className="flex items-center gap-1">
            <FileText className="h-4 w-4 mr-1" />
            <span>Create Review</span>
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        <Card>
          <CardContent className="flex flex-row items-center p-6">
            <div className="rounded-full bg-blue-100 p-2 mr-4">
              <BookOpen className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Assigned Projects</p>
              <h3 className="text-2xl font-bold">{assignedProjects.length}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-row items-center p-6">
            <div className="rounded-full bg-green-100 p-2 mr-4">
              <Users className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Student Groups</p>
              <h3 className="text-2xl font-bold">4</h3>
              <p className="text-xs text-muted-foreground">{studentGroups.length} students total</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-row items-center p-6">
            <div className="rounded-full bg-orange-100 p-2 mr-4">
              <ClipboardList className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending Reviews</p>
              <h3 className="text-2xl font-bold">
                {pendingReviews.filter(r => r.status === "Pending").length}
              </h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-row items-center p-6">
            <div className="rounded-full bg-purple-100 p-2 mr-4">
              <Clock className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Upcoming Deadlines</p>
              <h3 className="text-2xl font-bold">3</h3>
              <p className="text-xs text-muted-foreground">Next: 5 days</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="projects">Assigned Projects</TabsTrigger>
          <TabsTrigger value="students">Student Groups</TabsTrigger>
          <TabsTrigger value="reviews">Pending Reviews</TabsTrigger>
        </TabsList>
        
        {/* Projects Tab */}
        <TabsContent value="projects" className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Your Assigned Projects</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Project
                </Button>
              </div>
              <CardDescription>Manage and review the projects you're supervising</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {assignedProjects.map((project) => (
                  <div key={project.id} className="border rounded-lg overflow-hidden bg-card">
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <Link 
                            href={`/dashboard/advisor/projects/${project.id}`}
                            className="text-lg font-medium hover:text-primary hover:underline"
                          >
                            {project.name}
                          </Link>
                          <p className="text-sm text-muted-foreground line-clamp-2 h-10">
                            {project.description}
                          </p>
                        </div>
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                      </div>
                      <div className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Progress</span>
                          <span className="text-xs font-medium">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center">
                            <Users className="h-3.5 w-3.5 mr-1" />
                            {project.group} ({project.members})
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            Updated {project.lastUpdated}
                          </span>
                        </div>
                        <span className={`flex items-center ${project.dueDate.includes("Nov") ? "text-red-500" : ""}`}>
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          Due {project.dueDate}
                        </span>
                      </div>
                    </div>
                    <div className="bg-slate-50 border-t flex justify-between items-center p-2">
                      <div className="flex -space-x-2">
                        {[...Array(Math.min(project.members, 3))].map((_, i) => (
                          <Avatar key={i} className="h-6 w-6 border-2 border-background">
                            <AvatarFallback className="text-[10px]">
                              {String.fromCharCode(65 + i)}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {project.members > 3 && (
                          <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-muted text-[10px] font-medium">
                            +{project.members - 3}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-full">
                          <MessageSquare className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-full">
                          <FileText className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-full">
                          <GitBranch className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="bg-slate-50 border-t flex justify-between py-2">
              <div className="text-xs text-muted-foreground">
                Showing {assignedProjects.length} projects
              </div>
              <Button variant="ghost" size="sm" className="text-primary">
                View All Projects
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Students Tab */}
        <TabsContent value="students" className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Student Groups</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Student
                </Button>
              </div>
              <CardDescription>Monitor and manage your supervised students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {studentGroups.map((student) => (
                  <div 
                    key={student.id} 
                    className="flex items-center justify-between p-3 border rounded-md hover:bg-slate-50"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <Link 
                          href={`/dashboard/advisor/students/${student.id}`}
                          className="text-sm font-medium hover:text-primary hover:underline"
                        >
                          {student.name}
                        </Link>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="font-normal text-xs px-2 py-0 h-5">
                            {student.group}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {student.project}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className={`text-sm font-medium ${getPerformanceColor(student.performance)}`}>
                          {student.performance}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Active {student.lastActive}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="bg-slate-50 border-t flex justify-between py-2">
              <div className="text-xs text-muted-foreground">
                Showing {studentGroups.length} students
              </div>
              <Button variant="ghost" size="sm" className="text-primary">
                View All Students
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Reviews Tab */}
        <TabsContent value="reviews" className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Pending Reviews</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Create Review
                </Button>
              </div>
              <CardDescription>Manage reviews and provide feedback on student submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingReviews.map((review) => (
                  <div 
                    key={review.id} 
                    className="flex items-center justify-between p-3 border rounded-md hover:bg-slate-50"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${
                        review.status === "Pending" ? "bg-orange-100" : 
                        review.status === "Reviewed" ? "bg-blue-100" : 
                        review.status === "Approved" ? "bg-green-100" : 
                        review.status === "Rejected" ? "bg-red-100" : 
                        "bg-yellow-100"
                      }`}>
                        {review.status === "Pending" ? (
                          <Clock className="h-5 w-5 text-orange-600" />
                        ) : review.status === "Reviewed" ? (
                          <CheckCircle className="h-5 w-5 text-blue-600" />
                        ) : review.status === "Approved" ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : review.status === "Rejected" ? (
                          <AlertCircle className="h-5 w-5 text-red-600" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-yellow-600" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <Link 
                            href={`/dashboard/advisor/reviews/${review.id}`}
                            className="text-sm font-medium hover:text-primary hover:underline"
                          >
                            {review.submissionType}
                          </Link>
                          <span className="mx-2 text-gray-300">•</span>
                          <span className="text-sm text-muted-foreground">
                            {review.project}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="font-normal text-xs px-2 py-0 h-5">
                            {review.group}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Submitted {review.submittedDate}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(review.status)}>
                        {review.status}
                      </Badge>
                      <Button 
                        variant="outline" 
                        size="sm"
                        disabled={review.status !== "Pending"}
                      >
                        Review
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="bg-slate-50 border-t flex justify-between py-2">
              <div className="text-xs text-muted-foreground">
                Showing {pendingReviews.length} reviews
              </div>
              <Button variant="ghost" size="sm" className="text-primary">
                View All Reviews
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Upcoming Deadlines */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Upcoming Deadlines</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="border-l-2 border-red-500 pl-3">
            <div className="flex justify-between">
              <h4 className="text-sm font-medium">Final Report Submission</h4>
              <span className="text-xs text-red-500 font-medium">2 days left</span>
            </div>
            <p className="text-xs text-muted-foreground">ML Algorithm Optimization - Team Beta</p>
          </div>
          <div className="border-l-2 border-yellow-500 pl-3">
            <div className="flex justify-between">
              <h4 className="text-sm font-medium">Mid-term Presentation</h4>
              <span className="text-xs text-yellow-600 font-medium">5 days left</span>
            </div>
            <p className="text-xs text-muted-foreground">Vector Database Implementation - Team Alpha</p>
          </div>
          <div className="border-l-2 border-blue-500 pl-3">
            <div className="flex justify-between">
              <h4 className="text-sm font-medium">Code Review Session</h4>
              <span className="text-xs text-blue-600 font-medium">1 week left</span>
            </div>
            <p className="text-xs text-muted-foreground">Database Security Audit - Team Gamma</p>
          </div>
        </CardContent>
        <CardFooter className="bg-slate-50 border-t flex justify-center py-2">
          <Button variant="ghost" size="sm">
            <Calendar className="mr-1 h-4 w-4" />
            View Calendar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 