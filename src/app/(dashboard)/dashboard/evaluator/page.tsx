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
  FileCheck,
  ChevronRight,
  ClipboardList,
  Clipboard,
  BarChart,
  Star,
  Award,
  BookOpen,
  Filter,
  ExternalLink
} from "lucide-react";
import { useState } from "react";

// Define types for our data structures
type StatusType = "Pending" | "In Progress" | "Completed" | "Overdue";
type EvaluationType = "Project" | "Milestone" | "Final Presentation" | "Report" | "Code Review";

interface Evaluation {
  id: number;
  type: EvaluationType;
  projectName: string;
  group: string;
  dueDate: string;
  status: StatusType;
  progress: number;
}

interface Rubric {
  id: number;
  name: string;
  type: EvaluationType;
  createdAt: string;
  updatedAt: string;
  itemCount: number;
  maxScore: number;
}

interface EvaluationSummary {
  id: number;
  projectName: string;
  group: string;
  evaluationType: EvaluationType;
  evaluationDate: string;
  score: number;
  maxScore: number;
}

export default function EvaluatorDashboardPage() {
  // Mock data for evaluator dashboard
  const [pendingEvaluations, setPendingEvaluations] = useState<Evaluation[]>([
    {
      id: 1,
      type: "Milestone",
      projectName: "Vector Database Implementation",
      group: "Team Alpha",
      dueDate: "Today",
      status: "Pending",
      progress: 0
    },
    {
      id: 2,
      type: "Code Review",
      projectName: "ML Algorithm Optimization",
      group: "Team Beta",
      dueDate: "Tomorrow",
      status: "In Progress",
      progress: 35
    },
    {
      id: 3,
      type: "Report",
      projectName: "Database Security Audit",
      group: "Team Gamma",
      dueDate: "3 days",
      status: "In Progress",
      progress: 60
    },
    {
      id: 4,
      type: "Final Presentation",
      projectName: "Web Development Framework",
      group: "Team Delta",
      dueDate: "Dec 10",
      status: "Pending",
      progress: 0
    },
  ]);

  const [evaluationRubrics, setEvaluationRubrics] = useState<Rubric[]>([
    {
      id: 1,
      name: "Software Engineering Project",
      type: "Project",
      createdAt: "Oct 15, 2023",
      updatedAt: "Nov 05, 2023",
      itemCount: 12,
      maxScore: 100
    },
    {
      id: 2,
      name: "Database Implementation",
      type: "Milestone",
      createdAt: "Oct 25, 2023",
      updatedAt: "Oct 25, 2023",
      itemCount: 8,
      maxScore: 50
    },
    {
      id: 3,
      name: "Final Presentation Rubric",
      type: "Final Presentation",
      createdAt: "Sep 10, 2023",
      updatedAt: "Nov 20, 2023",
      itemCount: 10,
      maxScore: 75
    },
    {
      id: 4,
      name: "Code Quality Assessment",
      type: "Code Review",
      createdAt: "Nov 01, 2023",
      updatedAt: "Nov 01, 2023",
      itemCount: 15,
      maxScore: 100
    },
  ]);

  const [completedEvaluations, setCompletedEvaluations] = useState<EvaluationSummary[]>([
    {
      id: 1,
      projectName: "IoT Weather Station",
      group: "Team Omega",
      evaluationType: "Milestone",
      evaluationDate: "Nov 18, 2023",
      score: 45,
      maxScore: 50
    },
    {
      id: 2,
      projectName: "Mobile Payment App",
      group: "Team Sigma",
      evaluationType: "Code Review",
      evaluationDate: "Nov 15, 2023",
      score: 82,
      maxScore: 100
    },
    {
      id: 3,
      projectName: "Inventory Management System",
      group: "Team Zeta",
      evaluationType: "Final Presentation",
      evaluationDate: "Nov 10, 2023",
      score: 68,
      maxScore: 75
    },
    {
      id: 4,
      projectName: "AR Navigation App",
      group: "Team Theta",
      evaluationType: "Project",
      evaluationDate: "Nov 05, 2023",
      score: 93,
      maxScore: 100
    },
  ]);

  const getStatusColor = (status: StatusType): string => {
    switch(status) {
      case "Pending": return "bg-orange-100 text-orange-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Completed": return "bg-green-100 text-green-800";
      case "Overdue": return "bg-red-100 text-red-800";
      default: return "bg-slate-100 text-slate-800";
    }
  };

  const getTypeIcon = (type: EvaluationType) => {
    switch(type) {
      case "Project": return <FileCheck className="h-4 w-4" />;
      case "Milestone": return <CheckCircle className="h-4 w-4" />;
      case "Final Presentation": return <Users className="h-4 w-4" />;
      case "Report": return <FileText className="h-4 w-4" />;
      case "Code Review": return <GitBranch className="h-4 w-4" />;
      default: return <FileCheck className="h-4 w-4" />;
    }
  };

  const getScoreColor = (score: number, maxScore: number): string => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 85) return "text-green-600";
    if (percentage >= 70) return "text-blue-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Evaluator Dashboard</h1>
          <p className="text-muted-foreground">Manage evaluations, rubrics, and assessments</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <ClipboardList className="h-4 w-4 mr-1" />
            <span>Manage Rubrics</span>
          </Button>
          <Button size="sm" className="flex items-center gap-1">
            <Plus className="h-4 w-4 mr-1" />
            <span>Create Evaluation</span>
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        <Card>
          <CardContent className="flex flex-row items-center p-6">
            <div className="rounded-full bg-blue-100 p-2 mr-4">
              <ClipboardList className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending Evaluations</p>
              <h3 className="text-2xl font-bold">{pendingEvaluations.filter(e => e.status === "Pending").length}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-row items-center p-6">
            <div className="rounded-full bg-orange-100 p-2 mr-4">
              <Clock className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">In Progress</p>
              <h3 className="text-2xl font-bold">{pendingEvaluations.filter(e => e.status === "In Progress").length}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-row items-center p-6">
            <div className="rounded-full bg-green-100 p-2 mr-4">
              <Clipboard className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Completed</p>
              <h3 className="text-2xl font-bold">{completedEvaluations.length}</h3>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-row items-center p-6">
            <div className="rounded-full bg-purple-100 p-2 mr-4">
              <Award className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Available Rubrics</p>
              <h3 className="text-2xl font-bold">{evaluationRubrics.length}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="pending">Pending Evaluations</TabsTrigger>
          <TabsTrigger value="rubrics">Evaluation Rubrics</TabsTrigger>
          <TabsTrigger value="completed">Completed Evaluations</TabsTrigger>
        </TabsList>
        
        {/* Pending Evaluations Tab */}
        <TabsContent value="pending" className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Evaluations Queue</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-1" />
                    Filter
                  </Button>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    New Evaluation
                  </Button>
                </div>
              </div>
              <CardDescription>Manage your pending and in-progress evaluations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingEvaluations.map((evaluation) => (
                  <div 
                    key={evaluation.id} 
                    className="border rounded-lg overflow-hidden bg-card"
                  >
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-full ${
                            evaluation.type === "Milestone" ? "bg-green-100" : 
                            evaluation.type === "Code Review" ? "bg-blue-100" : 
                            evaluation.type === "Final Presentation" ? "bg-purple-100" : 
                            evaluation.type === "Report" ? "bg-yellow-100" : 
                            "bg-slate-100"
                          }`}>
                            {getTypeIcon(evaluation.type)}
                          </div>
                          <div>
                            <div className="flex items-center">
                              <Badge variant="outline" className="mr-2 font-normal">
                                {evaluation.type}
                              </Badge>
                              <Link 
                                href={`/dashboard/evaluator/evaluations/${evaluation.id}`}
                                className="text-base font-medium hover:text-primary hover:underline"
                              >
                                {evaluation.projectName}
                              </Link>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {evaluation.group}
                            </div>
                          </div>
                        </div>
                        <Badge className={getStatusColor(evaluation.status)}>
                          {evaluation.status}
                        </Badge>
                      </div>
                      
                      {evaluation.status === "In Progress" && (
                        <div className="mb-4">
                          <div className="flex justify-between mb-1">
                            <span className="text-xs text-muted-foreground">Evaluation Progress</span>
                            <span className="text-xs font-medium">{evaluation.progress}%</span>
                          </div>
                          <Progress value={evaluation.progress} className="h-2" />
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          <span className={evaluation.dueDate === "Today" || evaluation.dueDate === "Tomorrow" ? "text-orange-600 font-medium" : ""}>
                            Due: {evaluation.dueDate}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          {evaluation.status === "In Progress" ? (
                            <Button size="sm">
                              Continue
                            </Button>
                          ) : (
                            <Button size="sm">
                              Start Evaluation
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="bg-slate-50 border-t flex justify-between py-2">
              <div className="text-xs text-muted-foreground">
                Showing {pendingEvaluations.length} evaluations
              </div>
              <Button variant="ghost" size="sm" className="text-primary">
                View All Evaluations
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Rubrics Tab */}
        <TabsContent value="rubrics" className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Evaluation Rubrics</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-1" />
                    Filter
                  </Button>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Create Rubric
                  </Button>
                </div>
              </div>
              <CardDescription>View and manage evaluation rubrics and criteria</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {evaluationRubrics.map((rubric) => (
                  <div 
                    key={rubric.id} 
                    className="flex items-center justify-between p-3 border rounded-md hover:bg-slate-50"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${
                        rubric.type === "Milestone" ? "bg-green-100" : 
                        rubric.type === "Code Review" ? "bg-blue-100" : 
                        rubric.type === "Final Presentation" ? "bg-purple-100" : 
                        rubric.type === "Report" ? "bg-yellow-100" : 
                        "bg-slate-100"
                      }`}>
                        {getTypeIcon(rubric.type)}
                      </div>
                      <div>
                        <Link 
                          href={`/dashboard/evaluator/rubrics/${rubric.id}`}
                          className="text-base font-medium hover:text-primary hover:underline"
                        >
                          {rubric.name}
                        </Link>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="font-normal text-xs px-2 py-0 h-5">
                            {rubric.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {rubric.itemCount} criteria • Max score: {rubric.maxScore}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">
                          Created: {rubric.createdAt}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Updated: {rubric.updatedAt}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="bg-slate-50 border-t flex justify-between py-2">
              <div className="text-xs text-muted-foreground">
                Showing {evaluationRubrics.length} rubrics
              </div>
              <Button variant="ghost" size="sm" className="text-primary">
                View All Rubrics
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Completed Evaluations Tab */}
        <TabsContent value="completed" className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Completed Evaluations</CardTitle>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-1" />
                  Filter
                </Button>
              </div>
              <CardDescription>Review recently completed evaluations and assessments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {completedEvaluations.map((evaluation) => (
                  <div 
                    key={evaluation.id} 
                    className="flex items-center justify-between p-3 border rounded-md hover:bg-slate-50"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${
                        evaluation.evaluationType === "Milestone" ? "bg-green-100" : 
                        evaluation.evaluationType === "Code Review" ? "bg-blue-100" : 
                        evaluation.evaluationType === "Final Presentation" ? "bg-purple-100" : 
                        evaluation.evaluationType === "Report" ? "bg-yellow-100" : 
                        "bg-slate-100"
                      }`}>
                        {getTypeIcon(evaluation.evaluationType)}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <Badge variant="outline" className="mr-2 font-normal">
                            {evaluation.evaluationType}
                          </Badge>
                          <Link 
                            href={`/dashboard/evaluator/completed/${evaluation.id}`}
                            className="text-base font-medium hover:text-primary hover:underline"
                          >
                            {evaluation.projectName}
                          </Link>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {evaluation.group}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className={`text-base font-medium ${getScoreColor(evaluation.score, evaluation.maxScore)}`}>
                          {evaluation.score}/{evaluation.maxScore}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Evaluated on {evaluation.evaluationDate}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Report
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="bg-slate-50 border-t flex justify-between py-2">
              <div className="text-xs text-muted-foreground">
                Showing recent {completedEvaluations.length} evaluations
              </div>
              <Button variant="ghost" size="sm" className="text-primary">
                View All History
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Evaluation Metrics */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Recent Evaluation Metrics</CardTitle>
          <CardDescription>Average scores by category over the last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Code Quality</span>
                <span className="text-sm font-medium">85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Documentation</span>
                <span className="text-sm font-medium">78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Presentation Skills</span>
                <span className="text-sm font-medium">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Problem Solving</span>
                <span className="text-sm font-medium">81%</span>
              </div>
              <Progress value={81} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Team Collaboration</span>
                <span className="text-sm font-medium">88%</span>
              </div>
              <Progress value={88} className="h-2" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-slate-50 border-t flex justify-center py-2">
          <Button variant="ghost" size="sm">
            <BarChart className="mr-1 h-4 w-4" />
            View Detailed Analytics
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 