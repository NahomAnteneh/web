import { useState, useEffect } from 'react';

// Import data types
import { ProjectMember } from '@/data/types';

interface UseMembersResult {
  members: ProjectMember[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook for fetching and managing team members data
 * @returns Members data, loading state, error state, and refetch function
 */
export function useMembers(): UseMembersResult {
  const [members, setMembers] = useState<ProjectMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Function to fetch members
  const fetchMembersData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock implementation with sample data
      const mockMembers: ProjectMember[] = [
        {
          id: 1,
          name: "Alex Johnson",
          role: "Developer",
          avatar: "/avatars/alex.png"
        },
        {
          id: 2,
          name: "Sophia Garcia",
          role: "Designer",
          avatar: "/avatars/sophia.png"
        },
        {
          id: 3,
          name: "Michael Chen",
          role: "Developer",
          avatar: "/avatars/michael.png"
        },
        {
          id: 4,
          name: "Emma Smith",
          role: "Data Scientist",
          avatar: "/avatars/emma.png"
        },
        {
          id: 5,
          name: "Noah Wilson",
          role: "DevOps",
          avatar: "/avatars/noah.png"
        },
        {
          id: 6,
          name: "Olivia Davis",
          role: "UI/UX Designer",
          avatar: "/avatars/olivia.png"
        }
      ];
      
      setMembers(mockMembers);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
    } finally {
      setLoading(false);
    }
  };

  // Fetch members on component mount
  useEffect(() => {
    fetchMembersData();
  }, []);

  // Refetch function to manually trigger data refresh
  const refetch = async () => {
    await fetchMembersData();
  };

  return {
    members,
    loading,
    error,
    refetch
  };
} 