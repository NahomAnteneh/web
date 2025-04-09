"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { 
  Database, 
  Medal, 
  Star, 
  GitFork, 
  Users, 
  Calendar, 
  Mail, 
  Link as LinkIcon, 
  MapPin, 
  Edit,
  BarChart, 
  GitCommit, 
  GitPullRequest, 
  MessageCircle,
  Pencil,
  Settings,
  UserCog,
  UserPlus,
  Clock,
  FileCode,
  Share2,
  ExternalLink
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Import the CSS module
import styles from "./profile.module.css";

// Types
interface Repository {
  id: number;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  lastUpdated: string;
  isPrivate: boolean;
  progress: number;
}

interface Contribution {
  date: string;
  count: number;
}

interface Activity {
  id: number;
  type: string;
  repo: string;
  details: string;
  time: string;
}

interface UserData {
  username: string;
  fullName: string;
  avatar: string;
  role: string;
  bio: string;
  email: string;
  location: string;
  website: string;
  joined: string;
  followers: number;
  following: number;
  contributions: number;
  repositories: number;
  teams: number;
}

export default function ProfilePage() {
  // Mock user data - in a real app, this would come from an API
  const [userData, setUserData] = useState<UserData>({
    username: "nahomanteneh",
    fullName: "Nahom Anteneh",
    avatar: "/avatars/user.png",
    role: "Software Engineer",
    bio: "Software Engineer specializing in version control systems and distributed algorithms. Creator of Vec platform and contributor to several open-source projects.",
    email: "nahom@example.com",
    location: "San Francisco, CA",
    website: "https://nahomanteneh.com",
    joined: "January 2022",
    followers: 157,
    following: 89,
    contributions: 872,
    repositories: 18,
    teams: 5
  });

  // Mock repositories data
  const [repositories, setRepositories] = useState<Repository[]>([
    {
      id: 1,
      name: "vec-platform",
      description: "Modern version control system designed for simplicity and efficient collaboration",
      language: "TypeScript",
      stars: 345,
      forks: 42,
      lastUpdated: "2 days ago",
      isPrivate: false,
      progress: 85
    },
    {
      id: 2,
      name: "vector-db",
      description: "High-performance vector database with Python and TypeScript bindings",
      language: "Rust",
      stars: 218,
      forks: 36,
      lastUpdated: "1 week ago",
      isPrivate: false,
      progress: 92
    },
    {
      id: 3,
      name: "distributed-consensus",
      description: "Implementation of distributed consensus algorithms",
      language: "Go",
      stars: 127,
      forks: 18,
      lastUpdated: "2 weeks ago",
      isPrivate: false,
      progress: 78
    },
    {
      id: 4,
      name: "ml-knowledge-base",
      description: "Personal knowledge base for machine learning concepts and research papers",
      language: "Python",
      stars: 76,
      forks: 12,
      lastUpdated: "1 month ago",
      isPrivate: true,
      progress: 65
    },
  ]);

  // Mock activities data
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: 1,
      type: "commit",
      repo: "vec-platform",
      details: "Add authentication middleware for API routes",
      time: "2 hours ago"
    },
    {
      id: 2,
      type: "pull_request",
      repo: "vec-platform",
      details: "Update dashboard UI components for better mobile experience",
      time: "1 day ago"
    },
    {
      id: 3,
      type: "issue_comment",
      repo: "vector-db",
      details: "Commented on issue #42: Vector size optimization for large datasets",
      time: "2 days ago"
    },
    {
      id: 4,
      type: "fork",
      repo: "open-source/distributed-algorithms",
      details: "Forked repository for custom implementation",
      time: "1 week ago"
    },
    {
      id: 5,
      type: "star",
      repo: "community/web-components",
      details: "Starred repository",
      time: "1 week ago"
    }
  ]);

  // Generate mock contribution data for the last year
  const generateContributionData = (): Contribution[] => {
    const data: Contribution[] = [];
    const today = new Date();
    
    for (let i = 365; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      
      // Generate random contribution count, with higher probability of 0-2
      const rand = Math.random();
      let count = 0;
      
      if (rand > 0.7) {
        count = Math.floor(Math.random() * 5) + 1; // 1-5
      }
      if (rand > 0.9) {
        count = Math.floor(Math.random() * 10) + 5; // 5-15
      }
      
      data.push({
        date: date.toISOString().split('T')[0],
        count
      });
    }
    
    return data;
  };

  const [contributionData] = useState<Contribution[]>(generateContributionData());

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

  // Function to get activity icon
  const getActivityIcon = (type: string): React.ReactNode => {
    switch(type) {
      case "commit":
        return <GitCommit className="h-5 w-5 text-green-600" />;
      case "pull_request":
        return <GitPullRequest className="h-5 w-5 text-purple-600" />;
      case "issue_comment":
        return <MessageCircle className="h-5 w-5 text-blue-600" />;
      case "fork":
        return <GitFork className="h-5 w-5 text-orange-600" />;
      case "star":
        return <Star className="h-5 w-5 text-yellow-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-white shadow-md">
                <AvatarImage src={userData.avatar} alt={userData.fullName} />
                <AvatarFallback>{userData.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="mt-4 flex flex-col items-center md:items-start gap-1">
                <Button variant="outline" size="sm" className="w-full md:w-auto">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  {userData.fullName}
                  {userData.role && (
                    <Badge variant="outline" className="ml-2">
                      {userData.role}
                    </Badge>
                  )}
                </h1>
                <p className="text-muted-foreground">@{userData.username}</p>
              </div>
              
              <p className="text-sm text-gray-600">{userData.bio}</p>
              
              <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-gray-500">
                {userData.location && (
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4" />
                    <span>{userData.location}</span>
                  </div>
                )}
                {userData.email && (
                  <div className="flex items-center">
                    <Mail className="mr-1 h-4 w-4" />
                    <a href={`mailto:${userData.email}`} className="hover:underline">{userData.email}</a>
                  </div>
                )}
                {userData.website && (
                  <div className="flex items-center">
                    <LinkIcon className="mr-1 h-4 w-4" />
                    <a href={userData.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {userData.website.replace(/(^\w+:|^)\/\//, '')}
                    </a>
                  </div>
                )}
                <div className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span>Joined {userData.joined}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 pt-2">
                <Button variant="outline" size="sm" className="h-8">
                  <Users className="mr-1 h-4 w-4" />
                  <span className="font-normal">{userData.followers}</span>
                  <span className="ml-1">Followers</span>
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  <span className="font-normal">{userData.following}</span>
                  <span className="ml-1">Following</span>
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  <Database className="mr-1 h-4 w-4" />
                  <span className="font-normal">{userData.repositories}</span>
                  <span className="ml-1">Repositories</span>
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  <Medal className="mr-1 h-4 w-4" />
                  <span className="font-normal">{userData.contributions}</span>
                  <span className="ml-1">Contributions</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="repositories" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-4">
          <TabsTrigger value="repositories">Repositories</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="contributions">Contributions</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        {/* Repositories Tab */}
        <TabsContent value="repositories" className="mt-0">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">Your Repositories</h2>
            <Button size="sm">
              <Database className="mr-2 h-4 w-4" />
              New Repository
            </Button>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {repositories.map((repo) => (
              <Card key={repo.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center">
                        <Link href={`/profile/repo/${repo.name}`} className="hover:text-vec-primary hover:underline">
                          {repo.name}
                        </Link>
                        {repo.isPrivate && (
                          <Badge variant="outline" className="ml-2 text-xs">Private</Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {repo.description}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Star className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                    {repo.language && (
                      <div className="flex items-center">
                        <div className={`h-3 w-3 rounded-full ${getLanguageColor(repo.language)} mr-1`}></div>
                        <span>{repo.language}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      <span>{repo.stars}</span>
                    </div>
                    <div className="flex items-center">
                      <GitFork className="h-4 w-4 mr-1" />
                      <span>{repo.forks}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Updated {repo.lastUpdated}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Progress</span>
                      <span className="text-xs font-medium">{repo.progress}%</span>
                    </div>
                    <Progress value={repo.progress} className="h-1" />
                  </div>
                </CardContent>
                <CardFooter className="pt-2 flex justify-end">
                  <Link href={`/profile/repo/${repo.name}`} passHref legacyBehavior>
                    <Button variant="ghost" size="sm" asChild>
                      <a>
                        View Repository
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Activity Tab */}
        <TabsContent value="activity" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your recent actions and contributions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {activities.map((activity) => (
                <div 
                  key={activity.id} 
                  className="flex gap-3 border-l-2 border-gray-200 pl-3 py-1"
                >
                  <div className="mt-0.5">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">{activity.details}</span>{" "}
                      in{" "}
                      <Link href="#" className="text-vec-primary hover:underline">
                        {activity.repo}
                      </Link>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="border-t py-3 flex justify-center">
              <Button variant="ghost" size="sm">
                View Full Activity Log
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Contributions Tab */}
        <TabsContent value="contributions" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Contribution Graph</CardTitle>
              <CardDescription>
                Your code contributions over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mt-4 rounded-lg border bg-slate-50 p-4 overflow-x-auto">
                <div className="min-w-[750px]">
                  <div className="flex text-xs justify-between mb-1 text-muted-foreground">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                    <span>Jul</span>
                    <span>Aug</span>
                    <span>Sep</span>
                    <span>Oct</span>
                    <span>Nov</span>
                    <span>Dec</span>
                  </div>
                  <div className={styles.contributionGrid}>
                    {Array.from({ length: 7 }, (_, weekIndex) => (
                      <div key={weekIndex} className={styles.contributionWeek}>
                        {Array.from({ length: 52 }, (_, weekNum) => {
                          const contribution = contributionData[weekNum * 7 + weekIndex];
                          const level = contribution ? 
                            contribution.count === 0 ? 0 : 
                            contribution.count < 3 ? 1 : 
                            contribution.count < 6 ? 2 : 
                            contribution.count < 10 ? 3 : 4 : 0;
                          
                          const bgColor = [
                            "bg-gray-100",
                            "bg-green-100",
                            "bg-green-300",
                            "bg-green-500",
                            "bg-green-700"
                          ][level];
                          
                          return (
                            <div 
                              key={weekNum}
                              className={`h-3 w-3 rounded-sm ${bgColor}`}
                              title={contribution ? `${contribution.count} contributions on ${contribution.date}` : "No contributions"}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-between">
                <div className="text-sm">
                  <span className="font-semibold">{userData.contributions}</span> contributions in the last year
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-muted-foreground">Less</span>
                  <div className="h-3 w-3 rounded-sm bg-gray-100"></div>
                  <div className="h-3 w-3 rounded-sm bg-green-100"></div>
                  <div className="h-3 w-3 rounded-sm bg-green-300"></div>
                  <div className="h-3 w-3 rounded-sm bg-green-500"></div>
                  <div className="h-3 w-3 rounded-sm bg-green-700"></div>
                  <span className="text-xs text-muted-foreground">More</span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 flex flex-col items-center justify-center">
                    <FileCode className="h-10 w-10 text-vec-primary mb-2" />
                    <h3 className="text-2xl font-bold">586</h3>
                    <p className="text-sm text-muted-foreground">Commits</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex flex-col items-center justify-center">
                    <GitPullRequest className="h-10 w-10 text-purple-600 mb-2" />
                    <h3 className="text-2xl font-bold">128</h3>
                    <p className="text-sm text-muted-foreground">Pull Requests</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex flex-col items-center justify-center">
                    <MessageCircle className="h-10 w-10 text-blue-600 mb-2" />
                    <h3 className="text-2xl font-bold">247</h3>
                    <p className="text-sm text-muted-foreground">Code Reviews</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Teams Tab */}
        <TabsContent value="teams" className="mt-0">
          <Card>
            <CardHeader>
              <div className="flex justify-between">
                <div>
                  <CardTitle>Your Teams</CardTitle>
                  <CardDescription>
                    Teams you collaborate with
                  </CardDescription>
                </div>
                <Button size="sm">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Join Team
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src="/avatars/team1.png" alt="Team Innovate" />
                    <AvatarFallback>TI</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-medium">Team Innovate</h3>
                    <p className="text-sm text-muted-foreground">8 members · 3 projects</p>
                  </div>
                  <Link href="/team/team-innovate" passHref legacyBehavior>
                    <Button variant="outline" size="sm" asChild>
                      <a>View</a>
                    </Button>
                  </Link>
                </div>
                
                <div className="flex items-center p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src="/avatars/team2.png" alt="AI Research Group" />
                    <AvatarFallback>AR</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-medium">AI Research Group</h3>
                    <p className="text-sm text-muted-foreground">12 members · 5 projects</p>
                  </div>
                  <Link href="/team/ai-research-group" passHref legacyBehavior>
                    <Button variant="outline" size="sm" asChild>
                      <a>View</a>
                    </Button>
                  </Link>
                </div>
                
                <div className="flex items-center p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src="/avatars/team3.png" alt="Security Team Alpha" />
                    <AvatarFallback>ST</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-medium">Security Team Alpha</h3>
                    <p className="text-sm text-muted-foreground">6 members · 2 projects</p>
                  </div>
                  <Link href="/team/security-team-alpha" passHref legacyBehavior>
                    <Button variant="outline" size="sm" asChild>
                      <a>View</a>
                    </Button>
                  </Link>
                </div>
                
                <div className="flex items-center p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src="/avatars/team4.png" alt="UI/UX Guild" />
                    <AvatarFallback>UX</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-medium">UI/UX Guild</h3>
                    <p className="text-sm text-muted-foreground">10 members · 4 projects</p>
                  </div>
                  <Link href="/team/ui-ux-guild" passHref legacyBehavior>
                    <Button variant="outline" size="sm" asChild>
                      <a>View</a>
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Settings Tab */}
        <TabsContent value="settings" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>
                Manage your account settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Account</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start">
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit Profile Information
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Account Settings
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <UserCog className="mr-2 h-4 w-4" />
                    Notification Preferences
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <BarChart className="mr-2 h-4 w-4" />
                    Usage Statistics
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Security</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Change Password
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Two-Factor Authentication
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    API Tokens
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Session Management
                  </Button>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <Button variant="destructive">Delete Account</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 