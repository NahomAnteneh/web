"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChevronLeft,
  Plus,
  MoreHorizontal,
  AlertCircle,
  Clock,
  CalendarIcon,
  CheckCircle,
  ArrowLeftRight,
  PenSquare,
  Trash2
} from "lucide-react";

// Define types
type TaskStatus = 'To Do' | 'In Progress' | 'Under Review' | 'Completed';
type PriorityLevel = 'Low' | 'Medium' | 'High';

interface ProjectMember {
  id: number;
  name: string;
  role: string;
  avatar?: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: PriorityLevel;
  dueDate: string;
  assignee?: ProjectMember;
  tags: string[];
}

interface ProjectData {
  id: number;
  name: string;
  members: ProjectMember[];
}

export default function ProjectTasksPage() {
  const params = useParams();
  const projectId = parseInt(params.id as string);
  
  // Mock project data
  const [project, setProject] = useState<ProjectData>({
    id: projectId,
    name: "Vector Database Implementation",
    members: [
      { id: 1, name: "Alex Johnson", role: "Team Lead" },
      { id: 2, name: "Michael Chen", role: "Developer" },
      { id: 3, name: "Sophia Garcia", role: "Database Specialist" },
      { id: 4, name: "Emma Smith", role: "ML Engineer" },
    ]
  });
  
  // Mock task data
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Implement vector similarity search",
      description: "Create efficient algorithm for vector similarity search using cosine distance",
      status: "In Progress",
      priority: "High",
      dueDate: "Nov 28, 2023",
      assignee: project.members[2],
      tags: ["backend", "algorithm"]
    },
    {
      id: 2,
      title: "Design database schema",
      description: "Create database schema for vector storage and retrieval",
      status: "Completed",
      priority: "High",
      dueDate: "Nov 15, 2023",
      assignee: project.members[2],
      tags: ["database", "design"]
    },
    {
      id: 3,
      title: "API documentation",
      description: "Document all API endpoints and parameters",
      status: "In Progress",
      priority: "Medium",
      dueDate: "Dec 5, 2023",
      assignee: project.members[0],
      tags: ["documentation", "api"]
    },
    {
      id: 4,
      title: "Implement vector compression",
      description: "Add support for vector compression algorithms",
      status: "To Do",
      priority: "Medium",
      dueDate: "Dec 10, 2023",
      assignee: project.members[3],
      tags: ["backend", "optimization"]
    },
    {
      id: 5,
      title: "Performance benchmarks",
      description: "Run benchmarks comparing with FAISS and other solutions",
      status: "To Do",
      priority: "Low",
      dueDate: "Dec 15, 2023",
      tags: ["testing", "benchmarks"]
    },
    {
      id: 6,
      title: "Fix indexing bug",
      description: "Resolve the indexing issue with large vector dimensions",
      status: "Under Review",
      priority: "High",
      dueDate: "Nov 25, 2023",
      assignee: project.members[1],
      tags: ["bug", "backend"]
    }
  ]);
  
  // New task dialog state
  const [newTaskOpen, setNewTaskOpen] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: "",
    description: "",
    status: "To Do",
    priority: "Medium",
    dueDate: "",
    tags: []
  });
  
  // Task filter state
  const [filterAssignee, setFilterAssignee] = useState<number | "all">("all");
  const [filterPriority, setFilterPriority] = useState<PriorityLevel | "all">("all");
  
  // Helper functions
  const getStatusColor = (status: TaskStatus): string => {
    switch(status) {
      case "To Do": return "bg-slate-100 text-slate-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Under Review": return "bg-yellow-100 text-yellow-800";
      case "Completed": return "bg-green-100 text-green-800";
      default: return "bg-slate-100 text-slate-800";
    }
  };
  
  const getPriorityColor = (priority: PriorityLevel): string => {
    switch(priority) {
      case "High": return "text-red-600";
      case "Medium": return "text-amber-600";
      case "Low": return "text-blue-600";
      default: return "text-slate-600";
    }
  };
  
  const getPriorityIcon = (priority: PriorityLevel) => {
    switch(priority) {
      case "High": return <AlertCircle className="h-4 w-4" />;
      case "Medium": return <Clock className="h-4 w-4" />;
      case "Low": return <CalendarIcon className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };
  
  // Create a new task
  const handleCreateTask = () => {
    const newTaskWithId = {
      ...newTask,
      id: Math.max(0, ...tasks.map(t => t.id)) + 1,
      tags: newTask.tags || []
    } as Task;
    
    setTasks([...tasks, newTaskWithId]);
    setNewTask({
      title: "",
      description: "",
      status: "To Do",
      priority: "Medium",
      dueDate: "",
      tags: []
    });
    setNewTaskOpen(false);
  };
  
  // Move a task to a different status
  const moveTask = (taskId: number, newStatus: TaskStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };
  
  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (filterAssignee !== "all" && (!task.assignee || task.assignee.id !== filterAssignee)) {
      return false;
    }
    if (filterPriority !== "all" && task.priority !== filterPriority) {
      return false;
    }
    return true;
  });
  
  // Group tasks by status for the kanban board
  const tasksByStatus: Record<TaskStatus, Task[]> = {
    "To Do": filteredTasks.filter(t => t.status === "To Do"),
    "In Progress": filteredTasks.filter(t => t.status === "In Progress"),
    "Under Review": filteredTasks.filter(t => t.status === "Under Review"),
    "Completed": filteredTasks.filter(t => t.status === "Completed")
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Button variant="ghost" size="sm" className="p-0 h-8 w-8" asChild>
              <a href={`/dashboard/projects/${projectId}`}>
                <ChevronLeft className="h-4 w-4" />
              </a>
            </Button>
            <h1 className="text-2xl font-bold">{project.name}</h1>
          </div>
          <p className="text-muted-foreground">Manage tasks and track progress</p>
        </div>
        <div className="flex gap-3">
          <Dialog open={newTaskOpen} onOpenChange={setNewTaskOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
                <DialogDescription>
                  Add a new task to your project. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Task Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter task title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the task..."
                    rows={3}
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={newTask.status}
                      onValueChange={(value) => setNewTask({ ...newTask, status: value as TaskStatus })}
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="To Do">To Do</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Under Review">Under Review</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={newTask.priority}
                      onValueChange={(value) => setNewTask({ ...newTask, priority: value as PriorityLevel })}
                    >
                      <SelectTrigger id="priority">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="assignee">Assignee</Label>
                    <Select
                      value={newTask.assignee?.id.toString()}
                      onValueChange={(value) => {
                        const assignee = project.members.find(m => m.id.toString() === value);
                        setNewTask({ ...newTask, assignee });
                      }}
                    >
                      <SelectTrigger id="assignee">
                        <SelectValue placeholder="Assign to" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Unassigned</SelectItem>
                        {project.members.map((member) => (
                          <SelectItem key={member.id} value={member.id.toString()}>
                            {member.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    placeholder="e.g. backend, api, bug"
                    value={newTask.tags?.join(", ") || ""}
                    onChange={(e) => setNewTask({ 
                      ...newTask, 
                      tags: e.target.value.split(",").map(tag => tag.trim()).filter(tag => tag !== "") 
                    })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setNewTaskOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateTask} disabled={!newTask.title}>
                  Create Task
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Select
          value={filterAssignee === "all" ? "all" : filterAssignee.toString()}
          onValueChange={(value) => setFilterAssignee(value === "all" ? "all" : parseInt(value))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by assignee" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Members</SelectItem>
            {project.members.map((member) => (
              <SelectItem key={member.id} value={member.id.toString()}>
                {member.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select
          value={filterPriority}
          onValueChange={(value) => setFilterPriority(value as any)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
          <div key={status} className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-2 px-2">
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(status as TaskStatus)}>
                  {status}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {statusTasks.length} {statusTasks.length === 1 ? 'task' : 'tasks'}
                </span>
              </div>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="bg-slate-50 rounded-lg p-2 flex-1 min-h-[50vh]">
              <div className="space-y-2">
                {statusTasks.length === 0 ? (
                  <div className="flex items-center justify-center h-20 text-sm text-muted-foreground border border-dashed rounded-md">
                    No tasks
                  </div>
                ) : (
                  statusTasks.map((task) => (
                    <Card key={task.id} className="group">
                      <CardContent className="p-3 space-y-3">
                        <div className="flex items-start justify-between">
                          <h3 className="text-sm font-medium">{task.title}</h3>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>{task.title}</DialogTitle>
                                </DialogHeader>
                                <div className="py-4 space-y-4">
                                  <div>
                                    <h4 className="text-sm font-medium mb-1">Description</h4>
                                    <p className="text-sm text-muted-foreground">{task.description}</p>
                                  </div>
                                  
                                  <div className="flex justify-between">
                                    <div>
                                      <h4 className="text-sm font-medium mb-1">Priority</h4>
                                      <p className={`text-sm ${getPriorityColor(task.priority)}`}>
                                        {task.priority}
                                      </p>
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-medium mb-1">Due Date</h4>
                                      <p className="text-sm">{task.dueDate}</p>
                                    </div>
                                  </div>
                                  
                                  {task.assignee && (
                                    <div>
                                      <h4 className="text-sm font-medium mb-1">Assignee</h4>
                                      <div className="flex items-center gap-2">
                                        <Avatar className="h-6 w-6">
                                          <AvatarFallback>
                                            {task.assignee.name.split(' ').map(n => n[0]).join('')}
                                          </AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm">{task.assignee.name}</span>
                                      </div>
                                    </div>
                                  )}
                                  
                                  {task.tags.length > 0 && (
                                    <div>
                                      <h4 className="text-sm font-medium mb-1">Tags</h4>
                                      <div className="flex flex-wrap gap-1">
                                        {task.tags.map((tag, i) => (
                                          <Badge key={i} variant="outline" className="text-xs">
                                            {tag}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <DialogFooter className="gap-2">
                                  <Button variant="outline" size="sm" className="gap-1">
                                    <PenSquare className="h-4 w-4" />
                                    Edit
                                  </Button>
                                  <Button variant="outline" size="sm" className="gap-1">
                                    <ArrowLeftRight className="h-4 w-4" />
                                    Move
                                  </Button>
                                  <Button variant="outline" size="sm" className="text-red-500 gap-1">
                                    <Trash2 className="h-4 w-4" />
                                    Delete
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {task.tags.map((tag, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex justify-between items-center pt-2">
                          {task.assignee ? (
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">
                                {task.assignee.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                          ) : (
                            <div className="h-6 w-6 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center">
                              <Plus className="h-3 w-3 text-slate-400" />
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <span className={`text-xs flex items-center gap-1 ${getPriorityColor(task.priority)}`}>
                              {getPriorityIcon(task.priority)}
                              <span className="hidden sm:inline">{task.priority}</span>
                            </span>
                            <span className="text-xs text-muted-foreground">{task.dueDate}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 