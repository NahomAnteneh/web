"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the types for group data
export type GroupRole = "Leader" | "Co-Leader" | "Member";

export interface GroupMember {
  id: number;
  name: string;
  role: GroupRole;
  avatar: string;
  email: string;
  joinedAt: string;
  isCurrentUser: boolean;
}

export interface Advisor {
  id: number;
  name: string;
  avatar: string;
  department: string;
  email: string;
}

export interface GroupData {
  id: number;
  name: string;
  description: string;
  memberCount: number;
  isPublic: boolean;
  avatar: string;
  createdAt: string;
  members: GroupMember[];
  advisor?: Advisor;
  projectCount: number;
  currentUserIsLeader: boolean;
  currentUserRole: GroupRole;
}

interface GroupContextType {
  groupData: GroupData | null;
  isLoading: boolean;
  error: string | null;
  updateGroupData: (data: Partial<GroupData>) => void;
  refreshGroupData: () => void;
  addMember: (memberId: number) => Promise<void>;
  removeMember: (memberId: number) => Promise<void>;
  leaveGroup: () => Promise<void>;
  requestAdvisor: (advisorId: number) => Promise<void>;
}

const GroupContext = createContext<GroupContextType | undefined>(undefined);

export function GroupContextProvider({
  children,
  groupName,
}: {
  children: ReactNode;
  groupName: string;
}) {
  const [groupData, setGroupData] = useState<GroupData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch group data when the component mounts or groupName changes
  useEffect(() => {
    refreshGroupData();
  }, [groupName]);

  // Function to refresh group data
  const refreshGroupData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real application, this would be an API call
      // For now, we're simulating with mock data
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const mockGroupData: GroupData = {
        id: 1,
        name: groupName,
        description: "A collaborative team working on advanced projects in the Vec platform.",
        memberCount: 8,
        isPublic: true,
        avatar: `/avatars/group1.png`,
        createdAt: "2023-05-15",
        projectCount: 5,
        currentUserIsLeader: true,
        currentUserRole: "Leader",
        members: [
          {
            id: 1,
            name: "Nahom Anteneh",
            role: "Leader",
            avatar: "/avatars/user.png",
            email: "nahom@example.com",
            joinedAt: "2023-05-15",
            isCurrentUser: true,
          },
          {
            id: 2,
            name: "Alex Johnson",
            role: "Co-Leader",
            avatar: "/avatars/user1.png",
            email: "alex@example.com",
            joinedAt: "2023-05-16",
            isCurrentUser: false,
          },
          {
            id: 3,
            name: "Michael Chen",
            role: "Member",
            avatar: "/avatars/user2.png",
            email: "michael@example.com",
            joinedAt: "2023-05-18",
            isCurrentUser: false,
          },
          {
            id: 4,
            name: "Lisa Wong",
            role: "Member",
            avatar: "/avatars/user4.png",
            email: "lisa@example.com",
            joinedAt: "2023-06-01",
            isCurrentUser: false,
          },
          {
            id: 5,
            name: "Emma Smith",
            role: "Member",
            avatar: "/avatars/user6.png",
            email: "emma@example.com",
            joinedAt: "2023-06-12",
            isCurrentUser: false,
          },
          {
            id: 6,
            name: "David Kim",
            role: "Member",
            avatar: "/avatars/user7.png",
            email: "david@example.com",
            joinedAt: "2023-07-03",
            isCurrentUser: false,
          },
          {
            id: 7,
            name: "Sophia Clark",
            role: "Member",
            avatar: "/avatars/user12.png",
            email: "sophia@example.com",
            joinedAt: "2023-08-22",
            isCurrentUser: false,
          },
          {
            id: 8,
            name: "Daniel Wright",
            role: "Member",
            avatar: "/avatars/user13.png",
            email: "daniel@example.com",
            joinedAt: "2023-09-14",
            isCurrentUser: false,
          },
        ],
        advisor: {
          id: 101,
          name: "Dr. Sarah Williams",
          avatar: "/avatars/user3.png",
          department: "Computer Science",
          email: "sarah.williams@university.edu",
        },
      };
      
      setGroupData(mockGroupData);
    } catch (err) {
      setError("Failed to load group data");
      console.error("Error loading group data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to update group data (for edit operations)
  const updateGroupData = (data: Partial<GroupData>) => {
    setGroupData((prev) => (prev ? { ...prev, ...data } : null));
  };

  // Function to add a member to the group
  const addMember = async (memberId: number) => {
    // In a real application, this would be an API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Mock implementation for now
    setGroupData((prev) => {
      if (!prev) return null;
      
      // Simulating adding a new member
      const newMember: GroupMember = {
        id: memberId,
        name: "New Member",
        role: "Member",
        avatar: "/avatars/default.png",
        email: "new.member@example.com",
        joinedAt: new Date().toISOString().split('T')[0],
        isCurrentUser: false,
      };
      
      return {
        ...prev,
        members: [...prev.members, newMember],
        memberCount: prev.memberCount + 1,
      };
    });
  };

  // Function to remove a member from the group
  const removeMember = async (memberId: number) => {
    // In a real application, this would be an API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Mock implementation for now
    setGroupData((prev) => {
      if (!prev) return null;
      
      return {
        ...prev,
        members: prev.members.filter((member) => member.id !== memberId),
        memberCount: prev.memberCount - 1,
      };
    });
  };

  // Function for the current user to leave the group
  const leaveGroup = async () => {
    // In a real application, this would be an API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Mock implementation - in a real app, this would redirect to another page
    setGroupData((prev) => {
      if (!prev) return null;
      
      return {
        ...prev,
        members: prev.members.filter((member) => !member.isCurrentUser),
        memberCount: prev.memberCount - 1,
        currentUserIsLeader: false,
      };
    });
    
    // In a real application, this would navigate away from the group page
    alert("You have left the group. This is a mock implementation.");
  };

  // Function to request an advisor for the group
  const requestAdvisor = async (advisorId: number) => {
    // In a real application, this would be an API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Mock implementation for now
    setGroupData((prev) => {
      if (!prev) return null;
      
      return {
        ...prev,
        advisor: {
          id: advisorId,
          name: "Dr. New Advisor",
          avatar: "/avatars/advisor.png",
          department: "Computer Science",
          email: "new.advisor@university.edu",
        },
      };
    });
  };

  const value = {
    groupData,
    isLoading,
    error,
    updateGroupData,
    refreshGroupData,
    addMember,
    removeMember,
    leaveGroup,
    requestAdvisor,
  };

  return <GroupContext.Provider value={value}>{children}</GroupContext.Provider>;
}

export function useGroupContext() {
  const context = useContext(GroupContext);
  if (context === undefined) {
    throw new Error("useGroupContext must be used within a GroupContextProvider");
  }
  return context;
} 