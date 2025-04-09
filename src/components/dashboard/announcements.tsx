"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Megaphone, Bell, X, Pin, PinOff, Info, AlertTriangle, AlertCircle } from "lucide-react";

export type AnnouncementPriority = "low" | "medium" | "high";

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: AnnouncementPriority;
  isPinned?: boolean;
  isRead?: boolean;
  source: string;
}

interface AnnouncementsProps {
  className?: string;
}

export function Announcements({ className }: AnnouncementsProps) {
  // Mock announcements data - in a real app this would come from an API
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: "1",
      title: "Platform Maintenance",
      content: "The platform will be undergoing maintenance on Saturday, November 25th from 2:00 AM to 6:00 AM UTC. During this time, the system may be unavailable.",
      date: "2023-11-22",
      priority: "medium",
      isPinned: true,
      isRead: false,
      source: "System"
    },
    {
      id: "2",
      title: "New Vector Search Feature Released",
      content: "We're excited to announce the release of our new vector search feature. Check out the documentation to learn how to leverage this powerful tool in your projects.",
      date: "2023-11-20",
      priority: "low",
      isPinned: false,
      isRead: false,
      source: "Product Team"
    },
    {
      id: "3",
      title: "Important: Security Update Required",
      content: "A critical security update has been released. All users must update their local installations before December 1st to ensure continued access to the platform.",
      date: "2023-11-18",
      priority: "high",
      isPinned: false,
      isRead: true,
      source: "Security Team"
    },
    {
      id: "4",
      title: "Team Meeting Schedule Change",
      content: "Weekly team meetings will now be held on Thursdays at 2:00 PM instead of Fridays. Please update your calendars accordingly.",
      date: "2023-11-15",
      priority: "medium",
      isPinned: false,
      isRead: true,
      source: "Team Innovate"
    },
  ]);

  // Function to mark an announcement as read
  const markAsRead = (id: string) => {
    setAnnouncements(prev => 
      prev.map(announcement => 
        announcement.id === id 
          ? { ...announcement, isRead: true } 
          : announcement
      )
    );
  };

  // Function to toggle pinned status
  const togglePin = (id: string) => {
    setAnnouncements(prev => 
      prev.map(announcement => 
        announcement.id === id 
          ? { ...announcement, isPinned: !announcement.isPinned } 
          : announcement
      )
    );
  };

  // Function to dismiss an announcement
  const dismissAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(announcement => announcement.id !== id));
  };

  // Function to get the priority icon and color
  const getPriorityDetails = (priority: AnnouncementPriority) => {
    switch (priority) {
      case "high":
        return { 
          icon: <AlertCircle className="h-4 w-4" />, 
          color: "text-red-600 bg-red-100" 
        };
      case "medium":
        return { 
          icon: <AlertTriangle className="h-4 w-4" />, 
          color: "text-amber-600 bg-amber-100" 
        };
      case "low":
        return { 
          icon: <Info className="h-4 w-4" />, 
          color: "text-blue-600 bg-blue-100" 
        };
      default:
        return { 
          icon: <Info className="h-4 w-4" />, 
          color: "text-slate-600 bg-slate-100" 
        };
    }
  };

  // Sort announcements: pinned first, then by date (newest first)
  const sortedAnnouncements = [...announcements].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Count unread announcements
  const unreadCount = announcements.filter(a => !a.isRead).length;

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Megaphone className="h-5 w-5 text-vec-primary" />
            <div>
              <CardTitle>Announcements</CardTitle>
              <CardDescription>
                Important updates and notifications
              </CardDescription>
            </div>
          </div>
          {unreadCount > 0 && (
            <Badge className="bg-vec-primary">
              {unreadCount} new
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedAnnouncements.length > 0 ? (
          sortedAnnouncements.map((announcement) => {
            const { icon, color } = getPriorityDetails(announcement.priority);
            
            return (
              <div 
                key={announcement.id} 
                className={`relative p-4 border rounded-lg ${announcement.isRead ? 'bg-white' : 'bg-slate-50'} ${announcement.isPinned ? 'border-vec-primary' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`rounded-full p-2 ${color} flex-shrink-0`}>
                    {icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-sm truncate pr-8">
                        {announcement.title}
                      </h3>
                      <div className="flex gap-1 absolute top-3 right-3">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6" 
                          onClick={() => togglePin(announcement.id)}
                        >
                          {announcement.isPinned ? 
                            <PinOff className="h-3.5 w-3.5" /> : 
                            <Pin className="h-3.5 w-3.5" />
                          }
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6" 
                          onClick={() => dismissAnnouncement(announcement.id)}
                        >
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {announcement.content}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {new Date(announcement.date).toLocaleDateString()}
                        </span>
                        <Badge variant="outline" className="text-xs font-normal">
                          {announcement.source}
                        </Badge>
                      </div>
                      {!announcement.isRead && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 text-xs" 
                          onClick={() => markAsRead(announcement.id)}
                        >
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No announcements to display</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-slate-50 border-t flex justify-center py-2">
        <Button variant="ghost" size="sm">
          <Bell className="mr-1 h-4 w-4" />
          View All Announcements
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
} 