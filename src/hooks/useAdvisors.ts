import { useState, useEffect } from 'react';

// Import data types
import { Advisor } from '@/data/types';

interface UseAdvisorsResult {
  advisors: Advisor[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook for fetching and managing advisors data
 * @returns Advisors data, loading state, error state, and refetch function
 */
export function useAdvisors(): UseAdvisorsResult {
  const [advisors, setAdvisors] = useState<Advisor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Function to fetch advisors
  const fetchAdvisorsData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock implementation with sample data
      const mockAdvisors: Advisor[] = [
        {
          id: 101,
          name: "Dr. Sarah Williams",
          department: "Computer Science",
          avatar: "/avatars/sarah.png"
        },
        {
          id: 102,
          name: "Dr. James Peterson",
          department: "Data Science",
          avatar: "/avatars/james.png"
        },
        {
          id: 103,
          name: "Dr. Robert Chen",
          department: "Software Engineering",
          avatar: "/avatars/robert.png"
        },
        {
          id: 104,
          name: "Dr. Jessica Taylor",
          department: "Artificial Intelligence",
          avatar: "/avatars/jessica.png"
        }
      ];
      
      setAdvisors(mockAdvisors);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
    } finally {
      setLoading(false);
    }
  };

  // Fetch advisors on component mount
  useEffect(() => {
    fetchAdvisorsData();
  }, []);

  // Refetch function to manually trigger data refresh
  const refetch = async () => {
    await fetchAdvisorsData();
  };

  return {
    advisors,
    loading,
    error,
    refetch
  };
} 