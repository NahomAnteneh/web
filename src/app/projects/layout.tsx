"use client";

// We can't import server components (layouts) directly, so we'll create a wrapper
// that provides the same styling as the dashboard layout
import { DashboardNavbar } from "@/components/dashboard/navbar";
import { DashboardFooter } from "@/components/dashboard/footer";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <DashboardNavbar />
      
      <div className="flex">
        <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col">
          <div className="container py-6 flex-1 max-w-7xl mx-auto">
            {children}
          </div>
          <DashboardFooter />
        </div>
      </div>
    </>
  );
} 