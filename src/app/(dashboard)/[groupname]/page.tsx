// TODO: We need to check if the user or the group exists before rendering anything else render 404 not found. if found check if it is a user or a group and render the pages accordingly

"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ProjectsView } from "@/components/group/projects-view";
import { MembersView } from "@/components/group/members-view";
import { GroupSettingsView } from "@/components/group/group-settings-view";
import { GroupActivityView } from "@/components/group/group-activity-view";
import { GroupHeader } from "@/components/group/group-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GroupContextProvider } from "@/components/group/group-context";

// Group page that handles different views based on the URL parameter
export default function GroupPage({ params }: { params: { groupname: string } }) {
  const searchParams = useSearchParams();
  const view = searchParams.get("view") || "overview";
  const { groupname } = params;
  
  // Decodes the groupname from URL
  const decodedGroupName = decodeURIComponent(groupname);
  
  return (
    <GroupContextProvider groupName={decodedGroupName}>
      <div className="space-y-6">
        <GroupHeader />
        
        <Tabs defaultValue={view} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <GroupActivityView type="overview" />
          </TabsContent>
          
          <TabsContent value="projects">
            <ProjectsView />
          </TabsContent>
          
          <TabsContent value="members">
            <MembersView />
          </TabsContent>
          
          <TabsContent value="activity">
            <GroupActivityView type="full" />
          </TabsContent>
          
          <TabsContent value="settings">
            <GroupSettingsView />
          </TabsContent>
        </Tabs>
      </div>
    </GroupContextProvider>
  );
} 