"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { 
  FolderKanban
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

// Mock data - In a real application, this would likely be fetched
const mockProjects: Project[] = [
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
  {
      id: 4,
      name: "Web Dev Final Project",
      description: "Create a full-stack web application using Next.js and Prisma.",
      status: "Completed",
      progress: 100,
      lastUpdated: "1 week ago",
      dueDate: "Nov 15, 2023"
    },
];

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

export default function StudentProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FolderKanban className="h-6 w-6" /> 
            My Projects
          </h2>
          <p className="text-muted-foreground">Overview of all your current and past projects.</p>
        </div>
        {/* Add maybe a "Create New Project" button here later */}
        <Button asChild>
          <Link href="/dashboard/student/projects/new">Create New Project</Link>
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {projects.map((project) => (
          <Link key={project.id} href={`/dashboard/student/projects/${project.id}`} passHref>
            <Card className="hover:shadow-lg transition-shadow h-full flex flex-col cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-muted-foreground">Due Date</span>
                    <span>{project.dueDate}</span>
                  </div>
                   <div className="flex justify-between text-sm mt-1">
                     <span className="text-muted-foreground">Last Updated</span>
                    <span className="text-xs">{project.lastUpdated}</span>
                  </div>
                </div>
              </CardContent>
              {/* Removed footer for cleaner look on list page */}
              {/* <CardFooter className="flex justify-end">
                <Button variant="outline" size="sm">View Details</Button>
              </CardFooter> */}
              <CardFooter className="flex justify-end mt-auto pt-4">
                <Button variant="outline" size="sm" onClick={(e) => e.preventDefault()}>View Details</Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
} 