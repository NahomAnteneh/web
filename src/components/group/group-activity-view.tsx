"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGroupContext } from "./group-context";
import { 
  GitCommit, 
  GitPullRequest, 
  GitMerge, 
  Users,
  UserPlus,
  Calendar,
  Clock,
  FileText,
  MessageCircle,
  Plus,
  RefreshCw,
  PenSquare,
  Megaphone,
  ThumbsUp,
  Send,
  Paperclip,
  MoreHorizontal,
  PenLine,
  Pin
} from "lucide-react";

// Define activity types
interface ActivityItem {
  id: string;
  type: 'project' | 'member' | 'announcement' | 'message' | 'commit' | 'meeting';
  title: string;
  description?: string;
  timestamp: string;
  user: {
    id: number;
    name: string;
    avatar: string;
  };
  icon?: React.ReactNode;
  badges?: {
    text: string;
    variant?: "default" | "secondary" | "outline" | "destructive";
  }[];
  link?: string;
  linkText?: string;
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  author: {
    id: number;
    name: string;
    avatar: string;
  };
  pinned: boolean;
  likes: number;
  userHasLiked: boolean;
}

interface GroupActivityViewProps {
  type: 'overview' | 'full';
}

export function GroupActivityView({ type }: GroupActivityViewProps) {
  const { groupData, isLoading, error } = useGroupContext();
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [showAnnouncementDialog, setShowAnnouncementDialog] = useState(false);
  const [newAnnouncementTitle, setNewAnnouncementTitle] = useState('');
  const [newAnnouncementContent, setNewAnnouncementContent] = useState('');
  
  // Simulate loading activities and announcements
  useEffect(() => {
    const loadData = async () => {
      // In a real app, this would fetch from an API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock activities
      const mockActivities: ActivityItem[] = [
        {
          id: 'a1',
          type: 'project',
          title: 'Vector Database Integration updated',
          description: 'Alex Johnson made 3 new commits to the project',
          timestamp: '2023-11-18T14:30:00Z',
          user: {
            id: 2,
            name: 'Alex Johnson',
            avatar: '/avatars/user1.png',
          },
          icon: <GitCommit className="h-4 w-4 text-blue-500" />,
          badges: [
            { text: 'Project Update', variant: 'secondary' }
          ],
          link: '/dashboard/projects/1',
          linkText: 'View Project'
        },
        {
          id: 'a2',
          type: 'member',
          title: 'New member joined',
          description: 'Daniel Wright joined the group',
          timestamp: '2023-11-17T10:15:00Z',
          user: {
            id: 8,
            name: 'Daniel Wright',
            avatar: '/avatars/user13.png',
          },
          icon: <UserPlus className="h-4 w-4 text-green-500" />,
          badges: [
            { text: 'New Member', variant: 'outline' }
          ]
        },
        {
          id: 'a3',
          type: 'commit',
          title: 'Pull request merged',
          description: 'Michael Chen merged a pull request for ML Algorithm Optimization',
          timestamp: '2023-11-16T16:45:00Z',
          user: {
            id: 3,
            name: 'Michael Chen',
            avatar: '/avatars/user2.png',
          },
          icon: <GitMerge className="h-4 w-4 text-purple-500" />,
          badges: [
            { text: 'Merge', variant: 'secondary' }
          ],
          link: '/dashboard/projects/2',
          linkText: 'View Changes'
        },
        {
          id: 'a4',
          type: 'meeting',
          title: 'Advisor meeting scheduled',
          description: 'Meeting with Dr. Sarah Williams scheduled for Nov 20, 3:00 PM',
          timestamp: '2023-11-15T09:30:00Z',
          user: {
            id: 1,
            name: 'Nahom Anteneh',
            avatar: '/avatars/user.png',
          },
          icon: <Calendar className="h-4 w-4 text-amber-500" />,
          badges: [
            { text: 'Meeting', variant: 'outline' }
          ]
        },
        {
          id: 'a5',
          type: 'project',
          title: 'New project created',
          description: 'Lisa Wong created a new project: Database Security Audit',
          timestamp: '2023-11-14T11:20:00Z',
          user: {
            id: 4,
            name: 'Lisa Wong',
            avatar: '/avatars/user4.png',
          },
          icon: <FileText className="h-4 w-4 text-green-500" />,
          badges: [
            { text: 'New Project', variant: 'secondary' }
          ],
          link: '/dashboard/projects/3',
          linkText: 'View Project'
        }
      ];
      
      // Mock announcements
      const mockAnnouncements: Announcement[] = [
        {
          id: 'ann1',
          title: 'End of Semester Project Showcase',
          content: 'Our group has been selected to showcase our projects at the end of semester exhibition! Please prepare your demonstrations and be ready to present your work on December 15th at the Main Hall. This is a great opportunity to get feedback and recognition for our hard work.',
          timestamp: '2023-11-17T08:45:00Z',
          author: {
            id: 1,
            name: 'Nahom Anteneh',
            avatar: '/avatars/user.png',
          },
          pinned: true,
          likes: 7,
          userHasLiked: true
        },
        {
          id: 'ann2',
          title: 'Monthly Progress Report Due',
          content: 'A friendly reminder that our monthly progress reports are due this Friday. Please document your contributions, challenges faced, and goals for the next month. The template has been shared in our shared documents folder.',
          timestamp: '2023-11-15T14:20:00Z',
          author: {
            id: 2,
            name: 'Alex Johnson',
            avatar: '/avatars/user1.png',
          },
          pinned: false,
          likes: 4,
          userHasLiked: false
        },
        {
          id: 'ann3',
          title: 'New Library Resources Available',
          content: 'The university has added new resources to the digital library that might be helpful for our vector database project. I\'ve compiled a list of relevant papers and books that you can access using your student credentials. Check the shared documents folder for the list.',
          timestamp: '2023-11-10T09:15:00Z',
          author: {
            id: 3,
            name: 'Michael Chen',
            avatar: '/avatars/user2.png',
          },
          pinned: false,
          likes: 5,
          userHasLiked: true
        }
      ];
      
      setActivities(mockActivities);
      setAnnouncements(mockAnnouncements);
      setIsDataLoaded(true);
    };
    
    if (groupData && !isDataLoaded) {
      loadData();
    }
  }, [groupData, isDataLoaded]);

  // Format timestamp to readable format
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Format timestamp to relative time
  const getRelativeTime = (timestamp: string) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  // Handle create announcement
  const handleCreateAnnouncement = async () => {
    // In a real app, this would send to an API
    if (!newAnnouncementTitle || !newAnnouncementContent) return;
    
    const newAnnouncement: Announcement = {
      id: `ann${Date.now()}`,
      title: newAnnouncementTitle,
      content: newAnnouncementContent,
      timestamp: new Date().toISOString(),
      author: {
        id: 1, // Current user ID
        name: 'Nahom Anteneh', // Current user name
        avatar: '/avatars/user.png', // Current user avatar
      },
      pinned: false,
      likes: 0,
      userHasLiked: false
    };
    
    setAnnouncements([newAnnouncement, ...announcements]);
    setNewAnnouncementTitle('');
    setNewAnnouncementContent('');
    setShowAnnouncementDialog(false);
  };

  // Handle like announcement
  const handleLikeAnnouncement = (id: string) => {
    setAnnouncements(announcements.map(ann => {
      if (ann.id === id) {
        return {
          ...ann,
          likes: ann.userHasLiked ? ann.likes - 1 : ann.likes + 1,
          userHasLiked: !ann.userHasLiked
        };
      }
      return ann;
    }));
  };

  // Handle pin announcement
  const handlePinAnnouncement = (id: string) => {
    setAnnouncements(announcements.map(ann => {
      if (ann.id === id) {
        return { ...ann, pinned: !ann.pinned };
      } else if (ann.pinned && ann.id !== id) {
        // Unpin other announcements if this one is being pinned
        return { ...ann, pinned: false };
      }
      return ann;
    }));
  };

  if (isLoading) {
    return (
      <div className="rounded-lg border bg-card p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-200 rounded w-40 animate-pulse"></div>
          <div className="h-9 w-28 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4 animate-pulse">
              <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!groupData) {
    return (
      <div className="rounded-lg border bg-card p-6">
        <div className="text-center py-8">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error loading group activity</h2>
          <p className="text-muted-foreground mb-4">{error || 'Unable to load group activity. Please try again later.'}</p>
          <Button>
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  // For overview, show only pinned announcements and fewer activities
  const filteredAnnouncements = type === 'overview' 
    ? announcements.filter(ann => ann.pinned)
    : announcements;
  
  const filteredActivities = type === 'overview'
    ? activities.slice(0, 3)
    : activities;

  return (
    <div className="space-y-6">
      {/* Announcements */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Megaphone className="h-5 w-5 text-amber-500" />
              Announcements
            </CardTitle>
            <CardDescription>
              Important updates and information for the group
            </CardDescription>
          </div>
          {groupData.currentUserIsLeader && (
            <Dialog open={showAnnouncementDialog} onOpenChange={setShowAnnouncementDialog}>
              <DialogTrigger asChild>
                <Button className="shrink-0">
                  <PenSquare className="h-4 w-4 mr-2" />
                  New Announcement
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Announcement</DialogTitle>
                  <DialogDescription>
                    Share important information with the group.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">Title</label>
                    <Input
                      id="title"
                      placeholder="Enter announcement title"
                      value={newAnnouncementTitle}
                      onChange={(e) => setNewAnnouncementTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="content" className="text-sm font-medium">Content</label>
                    <Textarea
                      id="content"
                      placeholder="Enter announcement content"
                      rows={4}
                      value={newAnnouncementContent}
                      onChange={(e) => setNewAnnouncementContent(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAnnouncementDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateAnnouncement} disabled={!newAnnouncementTitle || !newAnnouncementContent}>
                    <Send className="h-4 w-4 mr-2" />
                    Post Announcement
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </CardHeader>
        <CardContent>
          {filteredAnnouncements.length > 0 ? (
            <div className="space-y-4">
              {filteredAnnouncements.map((announcement) => (
                <div key={announcement.id} className={`rounded-lg border p-4 ${announcement.pinned ? 'bg-amber-50 border-amber-200' : ''}`}>
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={announcement.author.avatar} alt={announcement.author.name} />
                      <AvatarFallback>{announcement.author.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{announcement.title}</h3>
                          {announcement.pinned && (
                            <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                              <Pin className="h-3 w-3 mr-1" />
                              Pinned
                            </Badge>
                          )}
                        </div>
                        {groupData.currentUserIsLeader && (
                          <div className="flex items-center gap-1">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => handlePinAnnouncement(announcement.id)}
                              title={announcement.pinned ? "Unpin announcement" : "Pin announcement"}
                            >
                              <Pin className={`h-4 w-4 ${announcement.pinned ? 'text-amber-600' : 'text-slate-400'}`} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              title="Edit announcement"
                            >
                              <PenLine className="h-4 w-4 text-slate-400" />
                            </Button>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Posted by {announcement.author.name} • {getRelativeTime(announcement.timestamp)}
                      </p>
                      <p className="text-sm mb-3">{announcement.content}</p>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className={`flex items-center gap-1 h-7 px-2 ${announcement.userHasLiked ? 'text-vec-primary bg-vec-primary/10' : ''}`}
                          onClick={() => handleLikeAnnouncement(announcement.id)}
                        >
                          <ThumbsUp className="h-3.5 w-3.5" />
                          <span>{announcement.likes}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 h-7 px-2">
                          <MessageCircle className="h-3.5 w-3.5" />
                          <span>Reply</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground">
                {type === 'overview' 
                  ? 'No pinned announcements yet.'
                  : 'No announcements yet. Create one to keep the group informed.'}
              </p>
              {type === 'full' && groupData.currentUserIsLeader && (
                <Button className="mt-4" onClick={() => setShowAnnouncementDialog(true)}>
                  <PenSquare className="h-4 w-4 mr-2" />
                  New Announcement
                </Button>
              )}
            </div>
          )}
        </CardContent>
        {filteredAnnouncements.length > 0 && type === 'overview' && (
          <CardFooter className="border-t bg-slate-50 px-6 py-4">
            <Button variant="link" className="mx-auto">
              View All Announcements
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            What's happening in {groupData.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredActivities.length > 0 ? (
            <div className="space-y-4">
              {filteredActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                    <Avatar>
                      <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                      <AvatarFallback>{activity.user.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-medium">{activity.title}</h3>
                      {activity.badges && activity.badges.map((badge, index) => (
                        <Badge key={index} variant={badge.variant || "default"} className="text-xs">
                          {badge.text}
                        </Badge>
                      ))}
                    </div>
                    {activity.description && (
                      <p className="text-sm text-muted-foreground mb-1">{activity.description}</p>
                    )}
                    <div className="flex items-center text-xs text-muted-foreground gap-6">
                      <span>{activity.user.name}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {getRelativeTime(activity.timestamp)}
                      </span>
                      {activity.link && (
                        <Button variant="link" size="sm" className="h-auto p-0" asChild>
                          <a href={activity.link}>
                            {activity.linkText || 'View'}
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground">No recent activities</p>
            </div>
          )}
        </CardContent>
        {filteredActivities.length > 0 && type === 'overview' && activities.length > 3 && (
          <CardFooter className="border-t bg-slate-50 px-6 py-4">
            <Button variant="link" className="mx-auto">
              View All Activity
            </Button>
          </CardFooter>
        )}
      </Card>
      
      {/* Project Statistics (Only for overview) */}
      {type === 'overview' && (
        <Card>
          <CardHeader>
            <CardTitle>Group Statistics</CardTitle>
            <CardDescription>
              Quick overview of the group's numbers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4 flex flex-col items-center">
                <div className="text-3xl font-bold text-vec-primary mb-1">
                  {groupData.projectCount}
                </div>
                <p className="text-sm text-muted-foreground">Active Projects</p>
              </div>
              <div className="border rounded-lg p-4 flex flex-col items-center">
                <div className="text-3xl font-bold text-vec-primary mb-1">
                  {groupData.memberCount}
                </div>
                <p className="text-sm text-muted-foreground">Group Members</p>
              </div>
              <div className="border rounded-lg p-4 flex flex-col items-center">
                <div className="text-3xl font-bold text-vec-primary mb-1">
                  12
                </div>
                <p className="text-sm text-muted-foreground">Tasks Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 