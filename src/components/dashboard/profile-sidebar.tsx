"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  User,
  Settings,
  Lock,
  Bell,
  Key,
  Smartphone,
  History,
  LogOut,
  Shield,
  CreditCard,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface ProfileSidebarItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  variant?: "default" | "danger";
}

function ProfileSidebarItem({ href, icon, label, variant = "default" }: ProfileSidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className="w-full">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start h-10 gap-3 px-4 font-normal rounded-md",
          isActive 
            ? "bg-accent text-accent-foreground font-medium" 
            : "hover:bg-accent/50 text-muted-foreground",
          variant === "danger" && "text-red-500 hover:text-red-600 hover:bg-red-50"
        )}
      >
        {icon}
        <span className="text-sm">{label}</span>
      </Button>
    </Link>
  );
}

function ProfileSidebarSection({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      {title && (
        <div className="px-4 py-2">
          <h3 className="text-xs font-medium text-muted-foreground tracking-wider">{title}</h3>
        </div>
      )}
      <div className="space-y-1">{children}</div>
    </div>
  );
}

interface ProfileSidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export function ProfileSidebar({ isOpen = false, onClose }: ProfileSidebarProps) {
  return (
    <div 
      className={cn(
        "fixed right-0 top-16 z-50 h-[calc(100vh-4rem)] border-l border-l-slate-200 shadow-[-1px_0_3px_rgba(0,0,0,0.02)] bg-slate-50/50 transition-transform duration-300 ease-in-out",
        "md:w-72 w-[85vw]",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <ScrollArea className="h-full py-6 px-4">
        {/* Mobile Close Button */}
        <div className="block md:hidden absolute top-2 right-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 w-7 p-0" 
            aria-label="Close profile sidebar"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {/* User Profile Summary */}
        <div className="flex flex-col items-center mb-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src="/avatars/user.png" alt="User" />
            <AvatarFallback className="text-lg">NA</AvatarFallback>
          </Avatar>
          <h2 className="mt-4 text-lg font-medium">Nahom Anteneh</h2>
          <p className="text-sm text-muted-foreground">nahom@example.com</p>
          <div className="mt-2 text-xs px-2 py-1 bg-slate-100 rounded-full text-muted-foreground">
            Free Plan
          </div>
        </div>

        <Separator className="mb-6" />

        <ProfileSidebarSection title="ACCOUNT">
          <ProfileSidebarItem
            href="/dashboard/profile"
            icon={<User className="h-4 w-4" />}
            label="Profile"
          />
          <ProfileSidebarItem
            href="/dashboard/account/security"
            icon={<Shield className="h-4 w-4" />}
            label="Security"
          />
          <ProfileSidebarItem
            href="/dashboard/account/billing"
            icon={<CreditCard className="h-4 w-4" />}
            label="Billing & Plans"
          />
        </ProfileSidebarSection>

        <ProfileSidebarSection title="PREFERENCES">
          <ProfileSidebarItem
            href="/dashboard/settings"
            icon={<Settings className="h-4 w-4" />}
            label="Settings"
          />
          <ProfileSidebarItem
            href="/dashboard/account/notifications"
            icon={<Bell className="h-4 w-4" />}
            label="Notifications"
          />
          <ProfileSidebarItem
            href="/dashboard/account/tokens"
            icon={<Key className="h-4 w-4" />}
            label="API Tokens"
          />
        </ProfileSidebarSection>

        <ProfileSidebarSection title="SECURITY">
          <ProfileSidebarItem
            href="/dashboard/account/password"
            icon={<Lock className="h-4 w-4" />}
            label="Password"
          />
          <ProfileSidebarItem
            href="/dashboard/account/two-factor"
            icon={<Smartphone className="h-4 w-4" />}
            label="Two-factor Auth"
          />
          <ProfileSidebarItem
            href="/dashboard/account/sessions"
            icon={<History className="h-4 w-4" />}
            label="Active Sessions"
          />
        </ProfileSidebarSection>

        <ProfileSidebarSection>
          <ProfileSidebarItem
            href="/logout"
            icon={<LogOut className="h-4 w-4" />}
            label="Log out"
            variant="danger"
          />
        </ProfileSidebarSection>
      </ScrollArea>
    </div>
  );
} 