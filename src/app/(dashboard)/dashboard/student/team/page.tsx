'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Import Tabs components
import { Users, UserCheck, FolderKanban, MessageSquareText, UserCog, AlertCircle, ListTodo, Activity, CheckCircle, GitCommit, MessageCircle } from 'lucide-react'; // Added more icons
import Link from 'next/link'; // Import Link
import { Progress } from '@/components/ui/progress'; // Import Progress
import { Button } from '@/components/ui/button'; // Import Button

// --- Data Structures ---
interface TeamMember {
  id: string;
  name: string;
  role: 'Student'; // Assuming only students for now
  avatarUrl?: string;
}

interface Advisor {
  id: string;
  name: string;
  department: string;
  avatarUrl?: string;
}

interface Evaluator {
  id: string;
  name: string;
  organization: string;
  avatarUrl?: string;
}

interface TeamProject {
  id: number;
  name: string;
  description?: string;
  status: 'In Progress' | 'Completed' | 'Planning';
  progress?: number; // Added progress
  dueDate?: string; // Added dueDate
  lastUpdated?: string; // Added lastUpdated
}

interface Feedback {
  id: number;
  author: { name: string; role: 'Advisor' | 'Evaluator' };
  content: string;
  date: string;
}

interface TeamTask {
  id: number;
  title: string;
  project: string; // Reference project by name for simplicity
  dueDate: string;
  status: 'To Do' | 'In Progress' | 'Completed' | 'Blocked';
  assignee?: TeamMember; // Optional: Task might be unassigned initially
}

interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  type: 'Info' | 'Warning' | 'Urgent';
}

interface TeamActivity {
  id: number;
  type: 'task_update' | 'feedback_received' | 'project_status' | 'member_join' | 'commit';
  description: string; // e.g., "Alice completed task 'Setup Repo'", "Feedback received from Dr. Turing"
  timestamp: string;
  actor?: { name: string; avatarUrl?: string }; // Optional actor
}

interface TeamDetails {
  id: string;
  name: string;
  members: TeamMember[];
  advisor: Advisor;
  projects: TeamProject[];
  evaluators: Evaluator[];
  feedback: Feedback[];
  tasks: TeamTask[]; // Added tasks
  announcements: Announcement[]; // Added announcements
  activities: TeamActivity[]; // Added activities
}

// --- Mock Data ---
const mockTeamData: TeamDetails = {
  id: 'team-alpha-123',
  name: 'Team Alpha Coders',
  members: [
    { id: 'stu-001', name: 'Alice Wonderland', role: 'Student', avatarUrl: '/avatars/01.png' },
    { id: 'stu-002', name: 'Bob The Builder', role: 'Student', avatarUrl: '/avatars/02.png' },
    { id: 'stu-003', name: 'Charlie Chaplin', role: 'Student' }, // No avatar
    { id: 'stu-004', name: 'Diana Prince', role: 'Student', avatarUrl: '/avatars/04.png' },
  ],
  advisor: {
    id: 'adv-007',
    name: 'Dr. Alan Turing',
    department: 'Computer Science',
    avatarUrl: '/avatars/advisor.png',
  },
  projects: [
    { id: 1, name: 'AI-Powered Chatbot', description: 'Developing a chatbot using LLMs for customer support.', status: 'In Progress', progress: 75, dueDate: 'Dec 31, 2023', lastUpdated: '3 hours ago' },
    { id: 2, name: 'Decentralized File Storage', description: 'Building a secure P2P file storage system on blockchain.', status: 'Planning', progress: 10, dueDate: 'Jan 15, 2024', lastUpdated: '2 days ago' },
  ],
  evaluators: [
    { id: 'evl-101', name: 'Mr. Smith (Industry Inc.)', organization: 'Industry Inc.' },
    { id: 'evl-102', name: 'Prof. Eva Luator', organization: 'University Dept.' },
  ],
  feedback: [
    { id: 1, author: { name: 'Dr. Alan Turing', role: 'Advisor' }, content: 'Great progress on the chatbot architecture. Consider refining the state management.', date: '2 days ago' },
    { id: 2, author: { name: 'Mr. Smith (Industry Inc.)', role: 'Evaluator' }, content: 'The initial demo was promising. Need to see more detailed performance metrics.', date: '1 week ago' },
    { id: 3, author: { name: 'Prof. Eva Luator', role: 'Evaluator' }, content: 'Solid theoretical foundation for the decentralized storage. Ensure scalability is addressed.', date: '3 days ago' },
  ],
  tasks: [
    { id: 101, title: 'Setup Project Repository', project: 'AI-Powered Chatbot', dueDate: 'Yesterday', status: 'Completed', assignee: { id: 'stu-001', name: 'Alice Wonderland', role: 'Student' } },
    { id: 102, title: 'Design Chatbot UI Mockups', project: 'AI-Powered Chatbot', dueDate: 'Tomorrow', status: 'In Progress', assignee: { id: 'stu-002', name: 'Bob The Builder', role: 'Student' } },
    { id: 103, title: 'Research Encryption Algorithms', project: 'Decentralized File Storage', dueDate: 'Friday', status: 'To Do', assignee: { id: 'stu-003', name: 'Charlie Chaplin', role: 'Student' } },
    { id: 104, title: 'Implement User Authentication', project: 'AI-Powered Chatbot', dueDate: 'Next Week', status: 'To Do', assignee: { id: 'stu-004', name: 'Diana Prince', role: 'Student' } },
    { id: 105, title: 'Write Storage API Docs', project: 'Decentralized File Storage', dueDate: 'In 2 weeks', status: 'To Do' }, // Unassigned
  ],
  announcements: [
    { id: 201, title: 'Mid-term Presentation Schedule', content: 'The schedule for mid-term presentations is now available on the course website.', date: '1 day ago', type: 'Info' },
    { id: 202, title: 'Library System Maintenance', content: 'Access to library databases might be intermittent this weekend due to scheduled maintenance.', date: '3 days ago', type: 'Warning' },
  ],
  activities: [
    { id: 301, type: 'task_update', description: "Alice completed task 'Setup Project Repository'", timestamp: "1 hour ago", actor: { name: 'Alice Wonderland' } },
    { id: 302, type: 'feedback_received', description: "Feedback received from Dr. Alan Turing", timestamp: "2 hours ago" },
    { id: 303, type: 'commit', description: "Bob pushed 3 commits to 'AI-Powered Chatbot'", timestamp: "5 hours ago", actor: { name: 'Bob The Builder' } },
    { id: 304, type: 'project_status', description: "Project 'Decentralized File Storage' moved to 'Planning'", timestamp: "Yesterday" },
    { id: 305, type: 'task_update', description: "Charlie started task 'Research Encryption Algorithms'", timestamp: "Yesterday", actor: { name: 'Charlie Chaplin' } },
  ]
};

// Utility to get status color (can be reused or moved to utils)
const getTaskStatusColor = (status: TeamTask['status']): string => {
  switch(status) {
    case "In Progress": return "bg-blue-100 text-blue-800";
    case "To Do": return "bg-slate-100 text-slate-800";
    case "Completed": return "bg-green-100 text-green-800";
    case "Blocked": return "bg-red-100 text-red-800";
    default: return "bg-slate-100 text-slate-800";
  }
};

const getAnnouncementIcon = (type: Announcement['type']) => {
  switch(type) {
    case 'Info': return <AlertCircle className="h-4 w-4 text-blue-600" />;
    case 'Warning': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    case 'Urgent': return <AlertCircle className="h-4 w-4 text-red-600" />;
    default: return <AlertCircle className="h-4 w-4 text-gray-600" />;
  }
};

const getActivityIcon = (type: TeamActivity['type']) => {
  switch(type) {
    case 'task_update': return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'feedback_received': return <MessageCircle className="h-4 w-4 text-blue-600" />;
    case 'project_status': return <FolderKanban className="h-4 w-4 text-purple-600" />;
    case 'member_join': return <Users className="h-4 w-4 text-teal-600" />;
    case 'commit': return <GitCommit className="h-4 w-4 text-gray-600" />;
    default: return <Activity className="h-4 w-4 text-gray-500" />;
  }
};

// --- Team Page Component ---
export default function TeamPage() {
  // In a real app, fetch team data based on logged-in user
  const team = mockTeamData;

  if (!team) {
    // Handle case where student might not be assigned to a team yet
    return <div>You are not currently assigned to a team.</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Users className="h-6 w-6" />
          {team.name}
        </h2>
      </div>

      {/* Announcements Section - Placed Above Tabs */}
      {team.announcements.length > 0 && (
        <Card className="bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2"><AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400"/> Announcements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {team.announcements.map(announcement => (
              <div key={announcement.id} className="pb-3 border-b border-blue-100 dark:border-blue-800/50 last:border-b-0 last:pb-0">
                 <h4 className="font-medium text-sm mb-1">{announcement.title} <span className={`text-xs ml-1 p-1 rounded ${announcement.type === 'Warning' ? 'bg-yellow-100 text-yellow-800' : announcement.type === 'Urgent' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>{announcement.type}</span></h4>
                 <p className="text-sm text-muted-foreground">{announcement.content}</p>
                 <p className="text-xs text-muted-foreground text-right mt-1">{announcement.date}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Tabs Section */}
      <Tabs defaultValue="members" className="space-y-4">
         {/* Adjusted grid columns for 6 tabs now */}
         <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6"> 
           <TabsTrigger value="members" className="flex items-center gap-2"><Users className="h-4 w-4"/>Members</TabsTrigger>
           <TabsTrigger value="advisor" className="flex items-center gap-2"><UserCog className="h-4 w-4"/>Advisor</TabsTrigger>
           <TabsTrigger value="projects" className="flex items-center gap-2"><FolderKanban className="h-4 w-4"/>Projects</TabsTrigger>
           <TabsTrigger value="tasks" className="flex items-center gap-2"><ListTodo className="h-4 w-4"/>Tasks</TabsTrigger> {/* Added Tasks Trigger */}
           <TabsTrigger value="evaluators" className="flex items-center gap-2"><UserCheck className="h-4 w-4"/>Evaluators</TabsTrigger>
           <TabsTrigger value="feedback" className="flex items-center gap-2"><MessageSquareText className="h-4 w-4"/>Feedback</TabsTrigger>
        </TabsList>

        {/* Tab Content for Members */}
        <TabsContent value="members">
           <Card>
            <CardHeader>
               {/* Simplified header for tab content */}
              <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5"/> Members ({team.members.length}/4)</CardTitle>
             </CardHeader>
            <CardContent className="space-y-4">
              {team.members.map(member => (
                <div key={member.id} className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={member.avatarUrl} alt={member.name} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              ))}
             </CardContent>
          </Card>
         </TabsContent>

        {/* Tab Content for Advisor */}
        <TabsContent value="advisor">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><UserCog className="h-5 w-5"/> Advisor</CardTitle>
             </CardHeader>
            <CardContent className="flex items-center gap-3">
               <Avatar className="h-9 w-9">
                  <AvatarImage src={team.advisor.avatarUrl} alt={team.advisor.name} />
                  <AvatarFallback>{team.advisor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{team.advisor.name}</p>
                  <p className="text-xs text-muted-foreground">{team.advisor.department}</p>
                </div>
            </CardContent>
           </Card>
        </TabsContent>

        {/* Tab Content for Projects - Refactored to match StudentProjectsPage */}
         <TabsContent value="projects">
           <div className="grid gap-4 md:grid-cols-2"> 
             {team.projects.map(project => (
               <Link key={project.id} href={`/dashboard/student/projects/${project.id}`} passHref>
                 <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col"> 
                   <CardHeader>
                     <div className="flex items-center justify-between">
                       <CardTitle className="text-lg">{project.name}</CardTitle>
                       <Badge variant={project.status === 'Completed' ? 'default' : 'secondary'}>{project.status}</Badge>
                     </div>
                     {/* Description moved below Badge/Title for consistency */}
                     <CardDescription className="pt-2">{project.description || 'No description available.'}</CardDescription>
                   </CardHeader>
                   <CardContent className="flex-grow space-y-2"> {/* Added space-y-2 */}
                     {/* Added Progress, Due Date, Last Updated */}
                     {project.progress !== undefined && (
                       <>
                         <div className="flex justify-between text-sm">
                           <span className="text-muted-foreground">Progress</span>
                           <span>{project.progress}%</span>
                         </div>
                         <Progress value={project.progress} className="h-2" />
                       </>
                     )}
                      {project.dueDate && (
                       <div className="flex justify-between text-sm mt-2">
                         <span className="text-muted-foreground">Due Date</span>
                         <span>{project.dueDate}</span>
                       </div>
                     )}
                     {project.lastUpdated && (
                       <div className="flex justify-between text-sm mt-1">
                         <span className="text-muted-foreground">Last Updated</span>
                        <span className="text-xs">{project.lastUpdated}</span>
                       </div>
                     )}
                   </CardContent>
                   {/* Add the CardFooter with button like StudentProjectsPage */}
                   <CardFooter className="flex justify-end mt-auto pt-4">
                     <Button variant="outline" size="sm" onClick={(e) => e.preventDefault()}>View Details</Button>
                   </CardFooter>
                 </Card>
               </Link>
             ))}
              {team.projects.length === 0 && (
               <p className="text-sm text-muted-foreground md:col-span-2 text-center">No projects assigned to this team yet.</p>
             )}
           </div>
        </TabsContent>

        {/* Tab Content for Tasks - WITH Assignee */}
        <TabsContent value="tasks">
           <Card>
             <CardHeader>
               <CardTitle className="flex items-center gap-2"><ListTodo className="h-5 w-5"/> Tasks</CardTitle>
               <CardDescription>Tasks assigned to team members.</CardDescription>
             </CardHeader>
             <CardContent className="space-y-4">
               {team.tasks.map(task => (
                 <div key={task.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b pb-3 last:border-b-0 last:pb-0">
                   {/* Task Details */}
                   <div className="flex items-center gap-3 flex-grow">
                      {/* <Checkbox id={`task-${task.id}`} className="mt-1" /> Simplified: removed checkbox for now */}
                     <div>
                       <p className="font-medium text-sm">{task.title}</p>
                       <p className="text-xs text-muted-foreground">Project: {task.project} | Due: {task.dueDate}</p>
                     </div>
                   </div>
                   {/* Assignee & Status */}
                   <div className="flex items-center gap-3 mt-2 sm:mt-0 flex-shrink-0">
                     {task.assignee ? (
                       <div className="flex items-center gap-2 text-sm">
                         <Avatar className="h-6 w-6">
                           <AvatarImage src={task.assignee.avatarUrl} alt={task.assignee.name} />
                           <AvatarFallback>{task.assignee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                         </Avatar>
                         <span>{task.assignee.name}</span>
                       </div>
                     ) : (
                       <span className="text-sm text-muted-foreground italic">Unassigned</span>
                     )}
                     <Badge className={getTaskStatusColor(task.status)}>{task.status}</Badge>
                   </div>
                 </div>
               ))}
                {team.tasks.length === 0 && (
                 <p className="text-sm text-muted-foreground text-center">No tasks assigned yet.</p>
               )}
             </CardContent>
           </Card>
         </TabsContent>

        {/* Tab Content for Evaluators */}
        <TabsContent value="evaluators">
           <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><UserCheck className="h-5 w-5"/> Evaluators</CardTitle>
             </CardHeader>
            <CardContent className="space-y-3">
              {team.evaluators.map(evaluator => (
                 <div key={evaluator.id} className="flex items-center gap-3">
                   <Avatar className="h-9 w-9 border">
                     {/* <AvatarImage src={evaluator.avatarUrl} alt={evaluator.name} /> */}
                     <AvatarFallback>{evaluator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                   </Avatar>
                   <div>
                     <p className="font-medium text-sm">{evaluator.name}</p>
                     <p className="text-xs text-muted-foreground">{evaluator.organization}</p>
                   </div>
                 </div>
              ))}
             </CardContent>
          </Card>
         </TabsContent>

        {/* Tab Content for Feedback */}
         <TabsContent value="feedback">
          <Card>
             <CardHeader>
               <CardTitle className="flex items-center gap-2"><MessageSquareText className="h-5 w-5"/> Feedback</CardTitle>
               <CardDescription>Recent feedback from your advisor and evaluators.</CardDescription>
             </CardHeader>
             <CardContent className="space-y-4">
               {team.feedback.map(fb => (
                 <div key={fb.id} className="flex items-start gap-3 border-b pb-3 last:border-b-0 last:pb-0">
                   <Avatar className="h-8 w-8 mt-1">
                      {/* Add avatar logic based on author role/name if needed */}
                     <AvatarFallback>{fb.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                   </Avatar>
                   <div className="flex-1">
                     <div className="flex justify-between items-baseline">
                        <p className="font-medium text-sm">{fb.author.name} <span className="text-xs text-muted-foreground">({fb.author.role})</span></p>
                       <p className="text-xs text-muted-foreground">{fb.date}</p>
                     </div>
                     <p className="text-sm text-muted-foreground mt-1">{fb.content}</p>
                   </div>
                 </div>
               ))}
               {team.feedback.length === 0 && (
                 <p className="text-sm text-muted-foreground text-center">No feedback received yet.</p>
               )}
             </CardContent>
           </Card>
        </TabsContent>

      </Tabs>

      {/* Recent Activities Section - Below Tabs */}
       <Card className="mt-6"> {/* Added margin-top */}
         <CardHeader>
           <CardTitle className="flex items-center gap-2"><Activity className="h-5 w-5"/> Recent Activities</CardTitle> {/* Corrected icon */}
           <CardDescription>Latest updates related to your team.</CardDescription>
         </CardHeader>
         <CardContent className="space-y-4">
           {team.activities.map(activity => (
             <div key={activity.id} className="flex items-start gap-3 border-b pb-3 last:border-b-0 last:pb-0">
                {/* Icon based on activity type */}
               <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                 {getActivityIcon(activity.type)}
               </div>
               <div className="flex-1">
                 <p className="text-sm text-foreground">{activity.description}</p>
                 <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
               </div>
                {/* Optional: Show actor avatar if available */}
                {activity.actor && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={activity.actor.avatarUrl} alt={activity.actor.name} />
                    <AvatarFallback>{activity.actor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                )}
             </div>
           ))}
           {team.activities.length === 0 && (
             <p className="text-sm text-muted-foreground text-center">No recent activities.</p>
           )}
         </CardContent>
       </Card>

    </div>
  );
} 