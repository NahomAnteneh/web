"use client";

import { redirect } from "next/navigation";

export default function SoftwareEngTeamPage() {
  // Use redirect instead of client-side routing for better SEO and less flicker
  redirect("/software-eng-101?view=overview");
} 