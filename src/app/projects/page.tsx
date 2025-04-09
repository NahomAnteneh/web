"use client";

import { redirect } from "next/navigation";

export default function ProjectsPage() {
  // Use redirect instead of client-side routing
  redirect("/dashboard?tab=projects");
} 