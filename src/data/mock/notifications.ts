import { Notification } from '../types';

// Mock notifications by user role
export const notifications: Record<string, Notification[]> = {
  student: [
    {
      id: 1,
      title: "Your project submission has been reviewed",
      description: "Dr. Johnson left feedback on your Database Implementation",
      time: "2 hours ago",
      read: false,
      type: "info"
    },
    {
      id: 2,
      title: "New task assigned to you",
      description: "Fix Indexing Bug in Database Implementation",
      time: "Today",
      read: false,
      type: "alert"
    },
    {
      id: 3,
      title: "Team meeting scheduled",
      description: "Project progress discussion at 3:00 PM",
      time: "Tomorrow",
      read: true,
      type: "info"
    },
    {
      id: 4,
      title: "Project deadline approaching",
      description: "Database Implementation is due in 3 days",
      time: "3 days ago",
      read: true,
      type: "warning"
    },
    {
      id: 5,
      title: "Repository update",
      description: "John Doe pushed 5 commits to Database Implementation",
      time: "Yesterday",
      read: false,
      type: "info"
    }
  ],
  
  advisor: [
    {
      id: 1,
      title: "New project submission to review",
      description: "Team Alpha submitted Database Implementation for review",
      time: "1 hour ago",
      read: false,
      type: "alert"
    },
    {
      id: 2,
      title: "Student meeting request",
      description: "Alex Johnson requested a meeting to discuss project progress",
      time: "Yesterday",
      read: true,
      type: "info"
    },
    {
      id: 3,
      title: "Upcoming evaluation deadline",
      description: "Final evaluations for ML Algorithm Optimization due in 2 days",
      time: "2 days ago",
      read: false,
      type: "warning"
    },
    {
      id: 4,
      title: "New team formed",
      description: "A new team has been created and assigned to you",
      time: "1 week ago",
      read: true,
      type: "info"
    },
    {
      id: 5,
      title: "Department meeting",
      description: "Monthly department meeting scheduled for Friday",
      time: "3 days ago",
      read: false,
      type: "info"
    }
  ],
  
  evaluator: [
    {
      id: 1,
      title: "New evaluation assigned",
      description: "Milestone evaluation for Database Implementation",
      time: "30 minutes ago",
      read: false,
      type: "alert"
    },
    {
      id: 2,
      title: "Rubric update requested",
      description: "Dr. Smith suggested changes to the Code Review rubric",
      time: "Yesterday",
      read: true,
      type: "info"
    },
    {
      id: 3,
      title: "Evaluation deadline approaching",
      description: "Complete final presentation evaluations by end of week",
      time: "2 days ago",
      read: false,
      type: "warning"
    },
    {
      id: 4,
      title: "New project assigned for evaluation",
      description: "Cloud Migration Strategy project awaiting evaluation",
      time: "4 days ago",
      read: true,
      type: "info"
    },
    {
      id: 5,
      title: "Evaluation committee meeting",
      description: "Discussion on standardizing project evaluation criteria",
      time: "Next Monday",
      read: false,
      type: "info"
    }
  ],
  
  admin: [
    {
      id: 1,
      title: "New user registration",
      description: "5 new users registered to the platform",
      time: "1 hour ago",
      read: false,
      type: "info"
    },
    {
      id: 2,
      title: "System warning",
      description: "Storage usage above 65%, consider cleanup",
      time: "Today",
      read: false,
      type: "warning"
    },
    {
      id: 3,
      title: "Department request",
      description: "Engineering department requested additional project slots",
      time: "Yesterday",
      read: true,
      type: "info"
    },
    {
      id: 4,
      title: "Advisor assignment needed",
      description: "3 new projects are waiting for advisor assignment",
      time: "2 days ago",
      read: false,
      type: "alert"
    },
    {
      id: 5,
      title: "System update scheduled",
      description: "Platform maintenance scheduled for Saturday night",
      time: "4 days ago",
      read: true,
      type: "info"
    }
  ]
};

// Helper function to get notifications by user role
export const getNotificationsByRole = (role: string): Notification[] => {
  return notifications[role] || [];
};

// Helper function to get unread notifications count by role
export const getUnreadNotificationsCount = (role: string): number => {
  const userNotifications = getNotificationsByRole(role);
  return userNotifications.filter(notification => !notification.read).length;
};

// Helper function to mark notification as read
export const markNotificationAsRead = (role: string, id: number): void => {
  const userNotifications = getNotificationsByRole(role);
  const notification = userNotifications.find(n => n.id === id);
  if (notification) {
    notification.read = true;
  }
};

// Helper function to mark all notifications as read
export const markAllNotificationsAsRead = (role: string): void => {
  const userNotifications = getNotificationsByRole(role);
  userNotifications.forEach(notification => {
    notification.read = true;
  });
}; 