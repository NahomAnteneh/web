"use client";

import { usePathname } from "next/navigation";
import Sidebar from '@/components/dashboard/Sidebar';
import Navbar from '@/components/dashboard/Navbar';
import { useState } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  
  // Determine the user role based on the current path
  const getUserRole = () => {
    if (pathname.includes("/dashboard/student")) {
      return "student";
    } else if (pathname.includes("/dashboard/advisor")) {
      return "advisor";
    } else if (pathname.includes("/dashboard/evaluator")) {
      return "evaluator";
    } else if (pathname.includes("/dashboard/admin")) {
      return "admin";
    }
    
    // Default to no specific role (will be handled by the role selection page)
    return undefined;
  };
  
  const userRole = getUserRole();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen);
  
  return (
    <div className="min-h-screen w-full flex bg-muted/40">
      <Sidebar userRole={userRole} />

      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden" role="dialog" aria-modal="true">
           <div className="fixed inset-0 bg-black/60" aria-hidden="true" onClick={toggleMobileSidebar}></div>
           <div className="relative mr-auto flex h-full max-w-xs flex-col overflow-y-auto bg-background pb-12 shadow-xl">
              <div className="flex justify-end p-4"><button onClick={toggleMobileSidebar}>Close</button></div>
              <Sidebar userRole={userRole} />
           </div>
        </div>
      )}

      <div className="flex flex-col flex-1 md:ml-64">
        <div className="sticky top-0 z-30 bg-background">
          <Navbar onToggleSidebar={toggleMobileSidebar} />
        </div>

        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
} 