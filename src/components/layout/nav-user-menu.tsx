"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  LogOut,
  Settings,
  UserCircle,
  ChevronDown,
  Shield,
  Key
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/auth-context";

export function NavUserMenu() {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Not authenticated - show login/register buttons
  if (!isMounted || !isAuthenticated) {
    return (
      <div className="flex items-center space-x-3">
        <Button asChild variant="ghost" size="sm">
          <Link href="/login">Log in</Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/register">Sign up</Link>
        </Button>
      </div>
    );
  }

  // Get user initials for the avatar fallback
  const getInitials = () => {
    if (!user) return "U";
    const nameParts = user.email.split('@')[0].split('.');
    return nameParts.map(part => part[0]?.toUpperCase() || '').join('');
  };

  // Get role label with appropriate styling
  const getRoleBadge = () => {
    if (!user) return null;
    
    const roleColors = {
      admin: "bg-red-100 text-red-800",
      student: "bg-blue-100 text-blue-800",
      advisor: "bg-green-100 text-green-800",
      evaluator: "bg-purple-100 text-purple-800",
    };
    
    const color = roleColors[user.role.name as keyof typeof roleColors] || "bg-gray-100 text-gray-800";
    
    return (
      <span className={`text-xs px-2 py-1 rounded-full ${color}`}>
        {user.role.name}
      </span>
    );
  };

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative h-8 flex items-center gap-1 text-sm pr-2 rounded-full overflow-hidden hover:bg-accent"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={`/avatars/avatar-${user?.userId || 1}.png`} alt="User avatar" />
            <AvatarFallback>{getInitials()}</AvatarFallback>
          </Avatar>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.email.split('@')[0]}</p>
            <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
            <div className="mt-2">
              {getRoleBadge()}
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          {user?.role.name === 'admin' && (
            <DropdownMenuItem>
              <Shield className="mr-2 h-4 w-4" />
              <span>Admin Dashboard</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <Key className="mr-2 h-4 w-4" />
            <span>API Keys</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}