"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils'; // Assuming you have a utility for class names
import { Home, FolderKanban, Settings, User, Users } from 'lucide-react'; // Added Users icon

interface SidebarProps {
  userRole?: 'student' | 'advisor' | 'evaluator' | 'admin';
}

const studentLinks = [
  { href: '/dashboard/student', label: 'Overview', icon: Home },
  { href: '/dashboard/student/projects', label: 'Projects', icon: FolderKanban },
  { href: '/dashboard/student/team', label: 'My Team', icon: Users },
  { href: '/dashboard/student/profile', label: 'Profile', icon: User },
  { href: '/dashboard/student/settings', label: 'Settings', icon: Settings },
];

// Add links for other roles here if needed
// const advisorLinks = [...];
// const evaluatorLinks = [...];
// const adminLinks = [...];

export default function Sidebar({ userRole }: SidebarProps) {
  const pathname = usePathname();

  // Determine links based on role (only student for now)
  const navLinks = userRole === 'student' ? studentLinks : []; 
  // Add logic here for other roles if you expand this

  return (
    <aside className="md:flex md:flex-col w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-4 space-y-4 fixed top-0 left-0 h-full z-40">
      <div className="text-lg font-semibold mb-4">PRP Dashboard</div>
      <nav className="flex-1 space-y-1 overflow-y-auto">
        {navLinks.map((link) => {
          const isActive = pathname === link.href || (link.href !== '/dashboard/student' && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground' // Use primary color for active link
                  : 'text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-foreground'
              )}
            >
              <link.icon className="mr-3 h-5 w-5" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      {/* Add other sidebar content like user profile link maybe */}
      <div className="mt-auto">
        {/* Placeholder for user info or logout */}
      </div>
    </aside>
  );
} 