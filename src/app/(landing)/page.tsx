import { CTA } from "@/components/home/cta";
import { Features } from "@/components/home/features";
import { Hero } from "@/components/home/hero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Repository Platform - Modern Project Management System",
  description: "A comprehensive platform for managing academic projects, team collaboration, and research repositories.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <CTA />
    </>
  );
}
