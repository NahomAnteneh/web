"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { Users, Settings, BellRing, MessageSquare, LogOut, UserPlus } from "lucide-react";
import { useGroupContext } from "./group-context";
import { useState } from "react";

export function GroupHeader() {
  const router = useRouter();
  const { groupData, isLoading, leaveGroup } = useGroupContext();
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);

  if (isLoading) {
    return (
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-white p-6 rounded-lg border animate-pulse">
        <div className="h-16 w-16 md:h-20 md:w-20 bg-gray-200 rounded-full"></div>
        <div className="flex-1 space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    );
  }

  if (!groupData) {
    return (
      <div className="flex flex-col items-center justify-center p-6 rounded-lg border bg-white">
        <h2 className="text-xl font-bold text-red-600">Error loading group</h2>
        <p className="mt-2 text-muted-foreground">Unable to load group information. Please try again later.</p>
        <Button className="mt-4" onClick={() => router.push('/dashboard')}>
          Return to Dashboard
        </Button>
      </div>
    );
  }

  const handleLeaveGroup = async () => {
    await leaveGroup();
    // In a real app, this would navigate to the dashboard
    // router.push('/dashboard');
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-white p-6 rounded-lg border">
      <Avatar className="h-16 w-16 md:h-20 md:w-20">
        <AvatarImage src={groupData.avatar} alt={groupData.name} />
        <AvatarFallback className="text-lg">
          {groupData.name.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{groupData.name}</h1>
              <Badge variant={groupData.isPublic ? "secondary" : "outline"}>
                {groupData.isPublic ? "Public" : "Private"}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1">{groupData.description}</p>
          </div>
          
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            {groupData.currentUserIsLeader && (
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Manage Group
              </Button>
            )}
            {groupData.currentUserIsLeader && (
              <Button variant="outline" size="sm">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            )}
            <Button variant="outline" size="sm">
              <BellRing className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              Message Group
            </Button>
            <AlertDialog open={showLeaveDialog} onOpenChange={setShowLeaveDialog}>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="bg-red-50 border-red-200 text-red-600 hover:bg-red-100">
                  <LogOut className="h-4 w-4 mr-2" />
                  Leave Group
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to leave this group?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. You will lose access to all group projects, 
                    conversations, and resources. If you're the group leader, leadership will 
                    be transferred to another member.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLeaveGroup} className="bg-red-600 hover:bg-red-700">
                    Leave Group
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-1" />
            <span>{groupData.memberCount} Members</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <span>Created on {new Date(groupData.createdAt).toLocaleDateString()}</span>
          </div>
          {groupData.advisor && (
            <div className="flex items-center text-sm text-muted-foreground">
              <span>Advisor: {groupData.advisor.name}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 