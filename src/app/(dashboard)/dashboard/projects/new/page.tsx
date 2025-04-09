"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  CalendarIcon,
  Check,
  ChevronLeft,
  GitBranch,
  Plus,
  Search,
  Users,
  X
} from "lucide-react";

// Define the form schema
const projectSchema = z.object({
  name: z.string().min(3, { message: "Project name must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  status: z.enum(["Planning", "In Progress", "On Hold", "Completed"]),
  startDate: z.date(),
  dueDate: z.date(),
  advisorId: z.string().optional(),
});

// Define types for team members and advisors
interface TeamMember {
  id: number;
  name: string;
  role: string;
  email: string;
  avatar?: string;
}

interface Advisor {
  id: number;
  name: string;
  department: string;
  email: string;
  avatar?: string;
}

interface Repository {
  id: number;
  name: string;
  url: string;
  description: string;
}

export default function NewProjectPage() {
  const router = useRouter();
  const [selectedMembers, setSelectedMembers] = useState<TeamMember[]>([]);
  const [memberSearch, setMemberSearch] = useState("");
  const [repositorySearch, setRepositorySearch] = useState("");
  const [selectedRepository, setSelectedRepository] = useState<Repository | null>(null);
  
  // Sample data for demo purposes
  const availableMembers: TeamMember[] = [
    { id: 1, name: "Alex Johnson", role: "Developer", email: "alex@example.com" },
    { id: 2, name: "Sophia Garcia", role: "Designer", email: "sophia@example.com" },
    { id: 3, name: "Michael Chen", role: "Developer", email: "michael@example.com" },
    { id: 4, name: "Emma Smith", role: "Data Scientist", email: "emma@example.com" },
    { id: 5, name: "Noah Wilson", role: "DevOps", email: "noah@example.com" },
    { id: 6, name: "Olivia Davis", role: "UI/UX Designer", email: "olivia@example.com" },
  ];
  
  const availableAdvisors: Advisor[] = [
    { id: 101, name: "Dr. Sarah Williams", department: "Computer Science", email: "s.williams@example.edu" },
    { id: 102, name: "Dr. James Peterson", department: "Data Science", email: "j.peterson@example.edu" },
    { id: 103, name: "Dr. Robert Chen", department: "Software Engineering", email: "r.chen@example.edu" },
    { id: 104, name: "Dr. Jessica Taylor", department: "Artificial Intelligence", email: "j.taylor@example.edu" },
  ];
  
  const availableRepositories: Repository[] = [
    { id: 201, name: "vector-db", url: "https://github.com/user/vector-db", description: "Vector database implementation" },
    { id: 202, name: "ml-algorithms", url: "https://github.com/user/ml-algorithms", description: "Machine learning algorithm library" },
    { id: 203, name: "web-framework", url: "https://github.com/user/web-framework", description: "Modern web framework" },
  ];
  
  // Setup form
  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "Planning",
      startDate: new Date(),
      dueDate: new Date(new Date().setMonth(new Date().getMonth() + 2)),
    },
  });
  
  // Filter members based on search term
  const filteredMembers = availableMembers.filter(member => 
    !selectedMembers.some(selected => selected.id === member.id) &&
    (member.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
     member.role.toLowerCase().includes(memberSearch.toLowerCase()) ||
     member.email.toLowerCase().includes(memberSearch.toLowerCase()))
  );
  
  // Filter repositories based on search term
  const filteredRepositories = availableRepositories.filter(repo =>
    repo.name.toLowerCase().includes(repositorySearch.toLowerCase()) ||
    repo.description.toLowerCase().includes(repositorySearch.toLowerCase())
  );
  
  // Add a team member
  const addTeamMember = (member: TeamMember) => {
    setSelectedMembers([...selectedMembers, member]);
    setMemberSearch("");
  };
  
  // Remove a team member
  const removeTeamMember = (memberId: number) => {
    setSelectedMembers(selectedMembers.filter(member => member.id !== memberId));
  };
  
  // Form submission handler
  const onSubmit = (values: z.infer<typeof projectSchema>) => {
    // Here we would normally send the data to the server
    console.log({
      ...values,
      teamMembers: selectedMembers,
      repository: selectedRepository,
    });
    
    // In a real app, wait for API response before redirecting
    setTimeout(() => {
      router.push("/dashboard/projects");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="p-0 h-8 w-8" asChild>
            <a href="/dashboard/projects">
              <ChevronLeft className="h-4 w-4" />
            </a>
          </Button>
          <h1 className="text-2xl font-bold">Create New Project</h1>
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Information</CardTitle>
                  <CardDescription>Provide the basic details about your project</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter project name" {...field} />
                        </FormControl>
                        <FormDescription>
                          Choose a clear, specific name for your project
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your project..." 
                            className="min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Provide a detailed description of your project's goals and scope
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Status</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Planning">Planning</SelectItem>
                              <SelectItem value="In Progress">In Progress</SelectItem>
                              <SelectItem value="On Hold">On Hold</SelectItem>
                              <SelectItem value="Completed">Completed</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            The current status of your project
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="advisorId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Advisor</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select an advisor" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="">No advisor</SelectItem>
                              {availableAdvisors.map((advisor) => (
                                <SelectItem key={advisor.id} value={advisor.id.toString()}>
                                  {advisor.name} - {advisor.department}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Select a faculty advisor for your project
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Start Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            When will the project start
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="dueDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Due Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            When is the project due
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              
              {/* Team Members Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>Add team members to your project</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search team members..."
                      className="pl-8"
                      value={memberSearch}
                      onChange={(e) => setMemberSearch(e.target.value)}
                    />
                  </div>
                  
                  {/* Selected Team Members */}
                  {selectedMembers.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-sm font-medium mb-2">Selected Members</h3>
                      <div className="space-y-2">
                        {selectedMembers.map((member) => (
                          <div 
                            key={member.id} 
                            className="flex items-center justify-between p-2 border rounded-md bg-slate-50"
                          >
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="text-xs">
                                  {member.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">{member.name}</p>
                                <p className="text-xs text-muted-foreground">{member.role}</p>
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-7 w-7 p-0 text-red-500 hover:text-red-700"
                              onClick={() => removeTeamMember(member.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Available Team Members */}
                  {memberSearch && filteredMembers.length > 0 && (
                    <div className="border rounded-md overflow-hidden mt-1">
                      {filteredMembers.map((member) => (
                        <div 
                          key={member.id} 
                          className="flex items-center justify-between p-2 hover:bg-slate-50 cursor-pointer border-b last:border-b-0"
                          onClick={() => addTeamMember(member)}
                        >
                          <div className="flex items-center gap-2">
                            <Avatar className="h-7 w-7">
                              <AvatarFallback className="text-xs">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{member.name}</p>
                              <p className="text-xs text-muted-foreground">{member.role}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {memberSearch && filteredMembers.length === 0 && (
                    <p className="text-sm text-muted-foreground mt-2">No matching team members found</p>
                  )}
                </CardContent>
              </Card>
              
              {/* Repository Link Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Link Repository</CardTitle>
                  <CardDescription>Connect a code repository to your project</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search repositories..."
                      className="pl-8"
                      value={repositorySearch}
                      onChange={(e) => setRepositorySearch(e.target.value)}
                    />
                  </div>
                  
                  {/* Selected Repository */}
                  {selectedRepository && (
                    <div className="mt-4">
                      <h3 className="text-sm font-medium mb-2">Selected Repository</h3>
                      <div 
                        className="flex items-center justify-between p-3 border rounded-md bg-slate-50"
                      >
                        <div className="flex items-center gap-2">
                          <GitBranch className="h-5 w-5 text-slate-600" />
                          <div>
                            <p className="text-sm font-medium">{selectedRepository.name}</p>
                            <p className="text-xs text-muted-foreground">{selectedRepository.description}</p>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 w-7 p-0 text-red-500 hover:text-red-700"
                          onClick={() => setSelectedRepository(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Available Repositories */}
                  {!selectedRepository && filteredRepositories.length > 0 && (
                    <div className="border rounded-md overflow-hidden mt-1">
                      {filteredRepositories.map((repo) => (
                        <div 
                          key={repo.id} 
                          className="flex items-center justify-between p-3 hover:bg-slate-50 cursor-pointer border-b last:border-b-0"
                          onClick={() => setSelectedRepository(repo)}
                        >
                          <div className="flex items-center gap-2">
                            <GitBranch className="h-5 w-5 text-slate-600" />
                            <div>
                              <p className="text-sm font-medium">{repo.name}</p>
                              <p className="text-xs text-muted-foreground">{repo.description}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="mt-4">
                    <Button variant="outline" type="button" className="w-full">
                      <GitBranch className="h-4 w-4 mr-2" />
                      Create New Repository
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-1">Team Size</h3>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{selectedMembers.length} members</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-1">Repository</h3>
                    <div className="flex items-center gap-1">
                      <GitBranch className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {selectedRepository ? selectedRepository.name : "Not selected"}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-1">Advisor</h3>
                    <span className="text-sm">
                      {form.watch("advisorId") 
                        ? availableAdvisors.find(advisor => advisor.id.toString() === form.watch("advisorId"))?.name
                        : "No advisor selected"}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-1">Timeline</h3>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <span className="text-muted-foreground">Start:</span>
                        <span>{form.watch("startDate") ? format(form.watch("startDate"), "MMM d, yyyy") : "Not set"}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <span className="text-muted-foreground">Due:</span>
                        <span>{form.watch("dueDate") ? format(form.watch("dueDate"), "MMM d, yyyy") : "Not set"}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Next Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                        <Check className="h-3.5 w-3.5 text-blue-700" />
                      </div>
                      <span className="text-sm">Create project</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200">
                        <span className="text-xs font-medium text-slate-600">2</span>
                      </div>
                      <span className="text-sm text-muted-foreground">Add milestones</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200">
                        <span className="text-xs font-medium text-slate-600">3</span>
                      </div>
                      <span className="text-sm text-muted-foreground">Create initial tasks</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200">
                        <span className="text-xs font-medium text-slate-600">4</span>
                      </div>
                      <span className="text-sm text-muted-foreground">Set up repository</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="space-y-4">
                <Button type="submit" className="w-full">Create Project</Button>
                <Button type="button" variant="outline" className="w-full" asChild>
                  <a href="/dashboard/projects">Cancel</a>
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
} 