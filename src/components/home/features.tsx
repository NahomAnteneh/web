"use client";

import { Container } from "@/components/ui/container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  BookOpen,
  Users,
  ClipboardList,
  Bell,
  Star,
  Clock,
  Search,
  FileText,
  Settings,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

function FeatureCard({ icon, title, description, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <Card className="h-full border-none shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
            {icon}
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-base">{description}</CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function Features() {
  const features = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Project Repository",
      description:
        "Create and manage academic projects with integrated Vec version control for tracking code changes, submissions, and documentation.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Role-Based Access",
      description:
        "Tailored dashboards and permissions for students, advisors, evaluators, and administrators, ensuring the right level of access for everyone.",
    },
    {
      icon: <ClipboardList className="h-6 w-6" />,
      title: "Task Management",
      description:
        "Create, assign, and track tasks with customizable workflows. Set deadlines, priorities, and monitor progress in real-time.",
    },
    {
      icon: <Bell className="h-6 w-6" />,
      title: "Notifications & Alerts",
      description:
        "Stay informed with timely notifications about project updates, feedback, and deadlines to ensure everyone remains in sync.",
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Feedback & Reviews",
      description:
        "Structured feedback tools allowing advisors and evaluators to provide comments on specific parts of projects, code, or documents.",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Deadline Management",
      description:
        "Track project timelines and deadlines with visual indicators and automated reminders to keep everyone on schedule.",
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: "Project Discovery",
      description:
        "Search and explore completed projects in the archive, allowing students and faculty to learn from past work.",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Documentation",
      description:
        "Integrated tools for creating and managing project documentation, ensuring comprehensive records of project development.",
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Administrative Tools",
      description:
        "Powerful management features for administrators to oversee users, projects, and system settings from a central dashboard.",
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <Container>
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge className="mb-4" variant="secondary">Features</Badge>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
            Comprehensive Project Management
          </h2>
          <p className="text-lg text-gray-600">
            The Project Repository Platform provides all the tools needed for effective
            academic project management, collaboration, and evaluation.
          </p>
        </div>

        <div className="mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center gap-6">
            <div className="inline-flex items-center justify-center">
              <Separator className="w-12 sm:w-24" />
              <span className="mx-6 text-gray-600 font-medium text-lg px-4">Get Started</span>
              <Separator className="w-12 sm:w-24" />
            </div>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="group"
              asChild
            >
              <Link href="/register" className="flex items-center gap-2">
                Create an account
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
} 