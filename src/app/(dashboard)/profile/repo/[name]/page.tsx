"use client";

import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { 
  GitBranch, 
  GitCommit, 
  GitFork, 
  Clock, 
  Star, 
  AlignLeft, 
  Eye, 
  FileCode, 
  Folder,
  MessageCircle,
  AlertCircle,
  GitPullRequest,
  Download,
  LineChart,
  Users,
  Share2,
  Plus,
  Settings,
  History
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Function to get language color
const getLanguageColor = (language: string): string => {
  const colors: Record<string, string> = {
    "TypeScript": "bg-blue-500",
    "JavaScript": "bg-yellow-500",
    "Python": "bg-green-500",
    "Rust": "bg-orange-600",
    "Go": "bg-cyan-500",
    "Java": "bg-red-500",
    "C++": "bg-purple-500",
    "Ruby": "bg-red-600",
    "PHP": "bg-indigo-500",
  };
  
  return colors[language] || "bg-gray-500";
};

interface RepoDetailPageProps {
  params: {
    name: string;
  }
}

export default function RepoDetailPage({ params }: RepoDetailPageProps) {
  const { name } = params;
  
  // Mock repository data - in a real app, this would be fetched based on the name param
  const [repoData, setRepoData] = useState({
    name: name,
    description: "Modern version control system designed for simplicity and efficient collaboration",
    language: "TypeScript",
    stars: 345,
    forks: 42,
    watchers: 89,
    openIssues: 12,
    pullRequests: 5,
    lastUpdated: "2 days ago",
    isPrivate: false,
    progress: 85,
    owner: "nahomanteneh",
    license: "MIT",
    contributors: 8,
    commits: 768,
    branches: 3,
    tags: 12
  });
  
  // Mock file structure data
  const [files, setFiles] = useState([
    { name: "src", type: "directory", path: "src" },
    { name: "README.md", type: "file", path: "README.md" },
    { name: "package.json", type: "file", path: "package.json" },
    { name: "tsconfig.json", type: "file", path: "tsconfig.json" },
    { name: "LICENSE", type: "file", path: "LICENSE" },
    { name: ".gitignore", type: "file", path: ".gitignore" },
  ]);
  
  // Mock recent commits data
  const [commits, setCommits] = useState([
    { 
      id: "abc123", 
      message: "Add authentication middleware for API routes", 
      author: "Nahom Anteneh", 
      date: "2 hours ago",
      sha: "3a7bd3e"
    },
    { 
      id: "def456", 
      message: "Fix bug in vector search algorithm", 
      author: "Alex Johnson", 
      date: "1 day ago",
      sha: "9f1c42d"
    },
    { 
      id: "ghi789", 
      message: "Update dashboard UI components", 
      author: "Nahom Anteneh", 
      date: "2 days ago",
      sha: "5e2b91f"
    },
    { 
      id: "jkl012", 
      message: "Implement caching for frequent queries", 
      author: "Sarah Williams", 
      date: "3 days ago",
      sha: "7d4e8c2"
    },
  ]);
  
  // Mock README content
  const [readmeContent, setReadmeContent] = useState(`
# ${name}

A modern version control system designed for simplicity and efficient collaboration.

## Features

- **Smart Branching** - Create branches effortlessly with intelligent naming suggestions
- **Conflict-Free Merging** - Advanced merge algorithms significantly reduce conflicts
- **Lightning Fast** - Optimized for performance with a compact storage format
- **Secure by Design** - Built-in security features including signed commits

## Getting Started

\`\`\`bash
npm install ${name}
\`\`\`

## Documentation

Visit [docs.vecplatform.com](https://docs.vecplatform.com) for complete documentation.

## License

MIT
  `);

  return (
    <div className="space-y-6">
      {/* Repository Header */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Link href="/profile" className="text-muted-foreground hover:text-foreground text-sm">
              {repoData.owner}
            </Link>
            <span className="text-muted-foreground">/</span>
            <h1 className="text-2xl font-bold">{repoData.name}</h1>
            {repoData.isPrivate ? (
              <Badge variant="outline">Private</Badge>
            ) : (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Public</Badge>
            )}
          </div>
          <p className="text-muted-foreground mt-1">{repoData.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Eye className="h-4 w-4" />
            <span>Watch</span>
            <Badge variant="secondary" className="ml-1 rounded-sm px-1">{repoData.watchers}</Badge>
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Star className="h-4 w-4" />
            <span>Star</span>
            <Badge variant="secondary" className="ml-1 rounded-sm px-1">{repoData.stars}</Badge>
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <GitFork className="h-4 w-4" />
            <span>Fork</span>
            <Badge variant="secondary" className="ml-1 rounded-sm px-1">{repoData.forks}</Badge>
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Repository Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4">
        <Card className="col-span-1">
          <CardContent className="p-4 text-center">
            <GitCommit className="mx-auto h-5 w-5 text-muted-foreground mb-1" />
            <p className="text-xl font-bold">{repoData.commits}</p>
            <p className="text-xs text-muted-foreground">Commits</p>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardContent className="p-4 text-center">
            <GitBranch className="mx-auto h-5 w-5 text-muted-foreground mb-1" />
            <p className="text-xl font-bold">{repoData.branches}</p>
            <p className="text-xs text-muted-foreground">Branches</p>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardContent className="p-4 text-center">
            <GitPullRequest className="mx-auto h-5 w-5 text-muted-foreground mb-1" />
            <p className="text-xl font-bold">{repoData.pullRequests}</p>
            <p className="text-xs text-muted-foreground">Pull Requests</p>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardContent className="p-4 text-center">
            <AlertCircle className="mx-auto h-5 w-5 text-muted-foreground mb-1" />
            <p className="text-xl font-bold">{repoData.openIssues}</p>
            <p className="text-xs text-muted-foreground">Issues</p>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardContent className="p-4 text-center">
            <Star className="mx-auto h-5 w-5 text-muted-foreground mb-1" />
            <p className="text-xl font-bold">{repoData.stars}</p>
            <p className="text-xs text-muted-foreground">Stars</p>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardContent className="p-4 text-center">
            <Users className="mx-auto h-5 w-5 text-muted-foreground mb-1" />
            <p className="text-xl font-bold">{repoData.contributors}</p>
            <p className="text-xs text-muted-foreground">Contributors</p>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardContent className="p-4 text-center">
            <GitFork className="mx-auto h-5 w-5 text-muted-foreground mb-1" />
            <p className="text-xl font-bold">{repoData.forks}</p>
            <p className="text-xs text-muted-foreground">Forks</p>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardContent className="p-4 text-center">
            <Clock className="mx-auto h-5 w-5 text-muted-foreground mb-1" />
            <p className="text-sm font-medium">{repoData.lastUpdated}</p>
            <p className="text-xs text-muted-foreground">Last Updated</p>
          </CardContent>
        </Card>
      </div>

      {/* Repository Content Tabs */}
      <Tabs defaultValue="code" className="w-full">
        <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:inline-grid mb-4">
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
          <TabsTrigger value="pull-requests">Pull Requests</TabsTrigger>
          <TabsTrigger value="actions">Actions</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        {/* Code Tab */}
        <TabsContent value="code" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <GitBranch className="h-4 w-4 mr-2" />
                      <span className="font-semibold">main</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Clone
                      </Button>
                      <Button size="sm" variant="outline">
                        <GitBranch className="h-4 w-4 mr-1" />
                        Branch
                      </Button>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Create
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="border rounded-md">
                    <div className="border-b p-2 bg-muted/40 flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <History className="h-4 w-4 mr-1" />
                        <span>{repoData.commits} commits</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span>{repoData.lastUpdated}</span>
                      </div>
                    </div>
                    
                    {/* File Browser */}
                    <div className="divide-y">
                      {files.map((file, index) => (
                        <div key={index} className="p-3 flex items-center hover:bg-muted/50">
                          {file.type === 'directory' ? (
                            <Folder className="h-5 w-5 text-blue-500 mr-2" />
                          ) : (
                            <FileCode className="h-5 w-5 text-gray-500 mr-2" />
                          )}
                          <Link 
                            href={`/repo/${name}/${file.path}`} 
                            className="text-sm font-medium hover:underline hover:text-vec-primary"
                          >
                            {file.name}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* README section */}
                  <Card className="mt-4">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <AlignLeft className="h-5 w-5 mr-2" />
                        README.md
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose max-w-none">
                        <pre className="whitespace-pre-wrap text-sm">
                          {readmeContent}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* About section */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">About</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-4">
                    <p>{repoData.description}</p>
                    <div>
                      <div className="flex items-center mt-2">
                        <div className={`h-3 w-3 rounded-full ${getLanguageColor(repoData.language)} mr-2`}></div>
                        <span>{repoData.language}</span>
                      </div>
                      <div className="flex items-center mt-2">
                        <GitFork className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{repoData.license} License</span>
                      </div>
                    </div>
                    <div>
                      <div className="mt-2">
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Progress</span>
                          <span className="text-xs font-medium">{repoData.progress}%</span>
                        </div>
                        <Progress value={repoData.progress} className="h-1" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Recent Commits */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Recent Commits</CardTitle>
                  </CardHeader>
                  <CardContent className="px-2 py-0">
                    <div className="divide-y">
                      {commits.map((commit) => (
                        <div key={commit.id} className="py-2 px-2">
                          <div className="flex items-start">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarFallback>{commit.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {commit.message}
                              </p>
                              <div className="flex text-xs text-muted-foreground mt-1">
                                <span className="mr-2">{commit.author}</span>
                                <span>{commit.date}</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-1 text-xs font-mono text-muted-foreground">
                            {commit.sha}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="py-2">
                    <Button variant="ghost" size="sm" className="w-full">
                      View All Commits
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Placeholder for other tabs */}
        <TabsContent value="issues" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Issues</CardTitle>
              <CardDescription>View and manage issues for this repository.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This tab is under development. Check back soon!</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pull-requests" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Pull Requests</CardTitle>
              <CardDescription>View and manage pull requests for this repository.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This tab is under development. Check back soon!</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="actions" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
              <CardDescription>View and manage automated workflows for this repository.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This tab is under development. Check back soon!</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="insights" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Insights</CardTitle>
              <CardDescription>View analytics and insights for this repository.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This tab is under development. Check back soon!</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Manage repository settings and permissions.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This tab is under development. Check back soon!</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 