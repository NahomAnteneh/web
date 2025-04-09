"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Search, Bell, X, GitBranch, FolderKanban, Users, Home, CheckSquare, Star, Settings, MessageSquare, BookOpen, HelpCircle, LogOut, User, ClipboardList, UserCog, Shield, Clock, FileText, AlertCircle, FileCheck, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Import mock data
import { 
  getNotificationsByRole, 
  getUnreadNotificationsCount, 
  markNotificationAsRead,
  markAllNotificationsAsRead,
  Notification
} from "@/data/mock";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  count?: number;
}

function NavItem({ href, icon, label, count }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link 
      href={href}
      className={cn(
        "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
        isActive 
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
      )}
    >
      {icon}
      <span>{label}</span>
      {count !== undefined && (
        <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-muted text-xs">
          {count}
        </span>
      )}
    </Link>
  );
}

interface DashboardNavbarProps {
  userRole?: "student" | "advisor" | "evaluator" | "admin";
}

export function DashboardNavbar({ userRole = "student" }: DashboardNavbarProps) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const pathname = usePathname();
  const { toast } = useToast();

  // Load notifications for the user role
  useEffect(() => {
    const userNotifications = getNotificationsByRole(userRole);
    setNotifications(userNotifications);
    setUnreadCount(getUnreadNotificationsCount(userRole));
  }, [userRole]);

  // Placeholder search results
  const searchResults = searchQuery.length > 0 ? [
    {
      type: "repository",
      name: "Vector Database Implementation",
      description: "A vector database system for efficient similarity search"
    },
    {
      type: "repository",
      name: "ML Algorithm Analysis",
      description: "Analysis of machine learning algorithms"
    },
    {
      type: "project",
      name: "Database Security Project",
      description: "Security measures for database systems"
    }
  ] : [];

  const handleNotificationClick = (notificationId: number) => {
    markNotificationAsRead(userRole, notificationId);
    setNotifications(getNotificationsByRole(userRole));
    setUnreadCount(getUnreadNotificationsCount(userRole));
    
    toast({
      title: "Notification",
      description: "Notification marked as read.",
    });
  };

  const handleReadAllNotifications = () => {
    markAllNotificationsAsRead(userRole);
    setNotifications(getNotificationsByRole(userRole));
    setUnreadCount(0);
    
    toast({
      title: "Notifications",
      description: "All notifications marked as read.",
    });
  };

  const handleProfileClick = () => {
    toast({
      title: "Profile",
      description: "Profile settings will be available soon.",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logout",
      description: "You have been logged out successfully.",
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/dashboard" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block text-primary">
              PRP
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/dashboard"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/dashboard" ? "text-foreground" : "text-foreground/60"
              )}
            >
              <Home className="h-5 w-5" />
            </Link>
            <Link
              href="/dashboard/projects"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/dashboard/projects" ? "text-foreground" : "text-foreground/60"
              )}
            >
              <FolderKanban className="h-5 w-5" />
            </Link>
            <Link
              href="/dashboard/teams"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/dashboard/teams" ? "text-foreground" : "text-foreground/60"
              )}
            >
              <Users className="h-5 w-5" />
            </Link>
            <Link
              href="/dashboard/tasks"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/dashboard/tasks" ? "text-foreground" : "text-foreground/60"
              )}
            >
              <CheckSquare className="h-5 w-5" />
            </Link>
            <Link
              href="/dashboard/repositories"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/dashboard/repositories" ? "text-foreground" : "text-foreground/60"
              )}
            >
              <GitBranch className="h-5 w-5" />
            </Link>
          </nav>
        </div>
        <button
          className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0 md:hidden"
          type="button"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="radix-:R15hja:"
          data-state="closed"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </button>
        {searchOpen ? (
          <div className="flex flex-1 items-center justify-between px-4 md:px-6">
            <div className="flex flex-1 items-center space-x-2">
              <Input
                type="search"
                placeholder="Search..."
                className="h-9 md:w-[100px] lg:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={() => setSearchOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-between space-x-2 md:space-x-4">
            <div className="w-full flex-1">
              <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="pl-8 md:w-[100px] lg:w-[300px]"
                    onClick={() => setSearchOpen(true)}
                  />
                </div>
              </form>
            </div>
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative h-9 w-9"
                  >
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -right-1 -top-1 h-4 w-4 rounded-full p-0"
                      >
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80" align="end">
                  <div className="flex items-center justify-between px-4 py-2">
                    <DropdownMenuLabel className="font-normal">Notifications</DropdownMenuLabel>
                    {unreadCount > 0 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={handleReadAllNotifications}
                        className="h-8 px-2 text-xs"
                      >
                        Mark all as read
                      </Button>
                    )}
                  </div>
                  <DropdownMenuSeparator />
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <DropdownMenuItem 
                          key={notification.id}
                          className="flex flex-col items-start p-3 cursor-pointer"
                          onClick={() => handleNotificationClick(notification.id)}
                        >
                          <div className="flex justify-between w-full">
                            <span className={cn(
                              "text-sm font-medium", 
                              !notification.read && "text-primary"
                            )}>
                              {notification.title}
                            </span>
                            <span className="text-xs text-muted-foreground ml-2">
                              {notification.time}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground mt-1">
                            {notification.description}
                          </span>
                          {!notification.read && (
                            <Badge 
                              variant="secondary" 
                              className="mt-2 px-2 py-0 h-5 text-xs bg-blue-50 text-blue-800"
                            >
                              New
                            </Badge>
                          )}
                        </DropdownMenuItem>
                      ))
                    ) : (
                      <div className="p-4 text-center text-sm text-muted-foreground">
                        No notifications found
                      </div>
                    )}
                  </div>
                  <DropdownMenuSeparator />
                  <div className="p-2">
                    <Button variant="outline" size="sm" className="w-full">
                      View all notifications
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/avatars/01.png" alt="@user" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">User</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        user@example.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleProfileClick}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 