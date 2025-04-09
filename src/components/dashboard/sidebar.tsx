"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Home, FolderKanban, Users, CheckSquare, GitBranch, User, Settings, LogOut, BookOpen, HelpCircle, ClipboardList, UserCog, Shield, Clock, FileText, AlertCircle, FileCheck } from "lucide-react";

interface SidebarProps {
  userRole: "student" | "advisor" | "evaluator" | "admin";
}

export function DashboardSidebar({ userRole = "student" }: SidebarProps) {
  const pathname = usePathname();

  const getRoleInfo = (role: string) => {
    switch (role) {
      case "student":
        return {
          profileUrl: "/dashboard/student",
          notifications: [
            {
              title: "New Project Assignment",
              description: "You have been assigned to a new project",
              time: "2 hours ago",
            },
            {
              title: "Task Deadline Approaching",
              description: "Your task is due in 2 days",
              time: "1 day ago",
            },
            {
              title: "Team Invitation",
              description: "You have been invited to join a team",
              time: "3 days ago",
            },
          ],
        };
      case "advisor":
        return {
          profileUrl: "/dashboard/advisor",
          notifications: [
            {
              title: "Project Submission",
              description: "A student has submitted their project",
              time: "1 hour ago",
            },
            {
              title: "Meeting Request",
              description: "A student has requested a meeting",
              time: "2 hours ago",
            },
            {
              title: "Review Reminder",
              description: "You have pending reviews to complete",
              time: "1 day ago",
            },
          ],
        };
      case "evaluator":
        return {
          profileUrl: "/dashboard/evaluator",
          notifications: [
            {
              title: "Evaluation Assignment",
              description: "You have been assigned to evaluate a project",
              time: "3 hours ago",
            },
            {
              title: "Rubric Update",
              description: "The evaluation rubric has been updated",
              time: "1 day ago",
            },
            {
              title: "Report Due",
              description: "Your evaluation report is due in 3 days",
              time: "2 days ago",
            },
          ],
        };
      case "admin":
        return {
          profileUrl: "/dashboard/admin",
          notifications: [
            {
              title: "New User Registration",
              description: "A new user has registered",
              time: "30 minutes ago",
            },
            {
              title: "System Alert",
              description: "High server load detected",
              time: "1 hour ago",
            },
            {
              title: "Backup Complete",
              description: "System backup completed successfully",
              time: "2 hours ago",
            },
          ],
        };
      default:
        return {
          profileUrl: "/dashboard",
          notifications: [],
        };
    }
  };

  const roleInfo = getRoleInfo(userRole);

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="text-primary">PRP</span>
          </Link>
        </div>
        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-2 p-2">
            <Link
              href={roleInfo.profileUrl}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname === roleInfo.profileUrl && "bg-primary/10 text-primary"
              )}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>

            {userRole === "student" && (
              <>
                <Link
                  href="/dashboard/student/projects"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathname === "/dashboard/student/projects" && "bg-primary/10 text-primary"
                  )}
                >
                  <FolderKanban className="h-4 w-4" />
                  Projects
                </Link>
                <Link
                  href="/dashboard/student/tasks"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathname === "/dashboard/student/tasks" && "bg-primary/10 text-primary"
                  )}
                >
                  <CheckSquare className="h-4 w-4" />
                  Tasks
                </Link>
                <Link
                  href="/dashboard/student/teams"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathname === "/dashboard/student/teams" && "bg-primary/10 text-primary"
                  )}
                >
                  <Users className="h-4 w-4" />
                  Teams
                </Link>
              </>
            )}

            {userRole === "advisor" && (
              <>
                <Link
                  href="/dashboard/advisor/projects"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathname === "/dashboard/advisor/projects" && "bg-primary/10 text-primary"
                  )}
                >
                  <FolderKanban className="h-4 w-4" />
                  Projects
                </Link>
                <Link
                  href="/dashboard/advisor/students"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathname === "/dashboard/advisor/students" && "bg-primary/10 text-primary"
                  )}
                >
                  <Users className="h-4 w-4" />
                  Students
                </Link>
                <Link
                  href="/dashboard/advisor/reviews"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathname === "/dashboard/advisor/reviews" && "bg-primary/10 text-primary"
                  )}
                >
                  <FileCheck className="h-4 w-4" />
                  Reviews
                </Link>
              </>
            )}

            {userRole === "evaluator" && (
              <>
                <Link
                  href="/dashboard/evaluator/evaluations"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathname === "/dashboard/evaluator/evaluations" && "bg-primary/10 text-primary"
                  )}
                >
                  <ClipboardList className="h-4 w-4" />
                  Evaluations
                </Link>
                <Link
                  href="/dashboard/evaluator/rubrics"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathname === "/dashboard/evaluator/rubrics" && "bg-primary/10 text-primary"
                  )}
                >
                  <FileText className="h-4 w-4" />
                  Rubrics
                </Link>
                <Link
                  href="/dashboard/evaluator/reports"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathname === "/dashboard/evaluator/reports" && "bg-primary/10 text-primary"
                  )}
                >
                  <Clock className="h-4 w-4" />
                  Reports
                </Link>
              </>
            )}

            {userRole === "admin" && (
              <>
                <Link
                  href="/dashboard/admin/users"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathname === "/dashboard/admin/users" && "bg-primary/10 text-primary"
                  )}
                >
                  <UserCog className="h-4 w-4" />
                  Users
                </Link>
                <Link
                  href="/dashboard/admin/projects"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathname === "/dashboard/admin/projects" && "bg-primary/10 text-primary"
                  )}
                >
                  <FolderKanban className="h-4 w-4" />
                  Projects
                </Link>
                <Link
                  href="/dashboard/admin/system"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathname === "/dashboard/admin/system" && "bg-primary/10 text-primary"
                  )}
                >
                  <Shield className="h-4 w-4" />
                  System
                </Link>
              </>
            )}

            <div className="mt-auto">
              <Link
                href="/profile"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  pathname === "/profile" && "bg-primary/10 text-primary"
                )}
              >
                <User className="h-4 w-4" />
                Profile
              </Link>
              <Link
                href="/settings"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  pathname === "/settings" && "bg-primary/10 text-primary"
                )}
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
              <Link
                href="/help"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  pathname === "/help" && "bg-primary/10 text-primary"
                )}
              >
                <HelpCircle className="h-4 w-4" />
                Help
              </Link>
              <Link
                href="/logout"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <LogOut className="h-4 w-4" />
                Log out
              </Link>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
} 