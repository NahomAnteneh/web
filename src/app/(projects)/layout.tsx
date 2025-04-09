"use client";

import { ProjectsNavbar } from "@/components/projects/navbar";
import { ProjectsFooter } from "@/components/projects/footer";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ProjectsNavbar />
      
      <div className="flex">
        <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col">
          <div className="container py-6 flex-1 max-w-7xl mx-auto">
            {children}
          </div>
          <ProjectsFooter />
        </div>
      </div>
    </>
  );
} 