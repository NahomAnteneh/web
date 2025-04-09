"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { ArrowRight, Github, Terminal, Zap, RefreshCw, Code2, BookOpen, Users, Clock } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-20 lg:pt-32 lg:pb-24 bg-white">
      {/* Remove decorative background and use plain white */}
      
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4 px-3 py-1 text-sm font-medium" variant="outline">
              <span className="text-primary font-semibold mr-1">BiT Platform</span> • Project Repository Platform
            </Badge>
            
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Streamlined Project{" "}
              <span className="text-primary">Management</span>
            </h1>
            
            <p className="mt-6 text-lg leading-8 text-gray-600">
              The Project Repository Platform is a comprehensive solution for students, advisors, 
              and evaluators to collaborate on academic projects. Manage tasks, track progress, 
              and receive feedback in one centralized platform.
            </p>
            
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
              <Button size="lg" asChild>
                <Link href="/register" className="flex items-center gap-2">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/login" className="flex items-center gap-2">
                  Login
                </Link>
              </Button>
            </div>

            {/* Feature highlights with symmetrical layout */}
            <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3 text-center">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="flex flex-col items-center p-4 rounded-lg bg-white/60 shadow-sm border hover:border-primary/30 hover:shadow-md transition-all">
                    <BookOpen className="h-6 w-6 text-primary mb-2" />
                    <h3 className="font-medium">Project Management</h3>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-semibold">Efficient Project Tracking</h4>
                    <p className="text-sm text-muted-foreground">
                      Create and manage projects with integrated version control using Vec. Track progress and manage tasks efficiently.
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>

              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="flex flex-col items-center p-4 rounded-lg bg-white/60 shadow-sm border hover:border-primary/30 hover:shadow-md transition-all">
                    <Users className="h-6 w-6 text-primary mb-2" />
                    <h3 className="font-medium">Collaborative Workspace</h3>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-semibold">Seamless Collaboration</h4>
                    <p className="text-sm text-muted-foreground">
                      Collaborate with team members, advisors, and evaluators through real-time communication, file sharing, and feedback tools.
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>

              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="flex flex-col items-center p-4 rounded-lg bg-white/60 shadow-sm border hover:border-primary/30 hover:shadow-md transition-all">
                    <Clock className="h-6 w-6 text-primary mb-2" />
                    <h3 className="font-medium">Task Management</h3>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-semibold">Organized Workflows</h4>
                    <p className="text-sm text-muted-foreground">
                      Create, assign, and track tasks with customizable workflows. Set deadlines, priorities, and monitor progress in real-time.
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </motion.div>

          {/* Project Dashboard Preview */}
          <motion.div
            className="mt-16 sm:mt-20"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative mx-auto overflow-hidden rounded-lg bg-gray-100 shadow-xl">
              <div className="flex items-center gap-2 border-b border-gray-200 bg-white px-4 py-3">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <div className="flex items-center gap-2 rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-700">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Project Dashboard</span>
                </div>
              </div>
              <div className="p-4 text-left font-sans text-sm text-gray-800 sm:p-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1 space-y-2">
                    <div className="rounded-md bg-white p-3 shadow-sm">
                      <h4 className="font-medium">My Projects</h4>
                      <div className="mt-2 space-y-1">
                        <div className="rounded bg-blue-50 p-2 text-xs">Software Engineering 101</div>
                        <div className="rounded bg-gray-50 p-2 text-xs">Database Design</div>
                        <div className="rounded bg-gray-50 p-2 text-xs">Web Development</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 space-y-2">
                    <div className="rounded-md bg-white p-3 shadow-sm">
                      <h4 className="font-medium">Software Engineering 101</h4>
                      <div className="mt-2 text-xs text-gray-500">
                        <span className="rounded-full bg-green-100 px-2 py-1 text-green-800">In Progress</span>
                        <span className="ml-2">Due in 14 days</span>
                      </div>
                      <div className="mt-3 space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>65%</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-gray-200">
                          <div className="h-1.5 rounded-full bg-primary" style={{ width: "65%" }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-md bg-white p-3 shadow-sm">
                      <h4 className="font-medium">Recent Activity</h4>
                      <div className="mt-2 space-y-2 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="rounded-full bg-blue-100 p-1">
                            <Users className="h-3 w-3 text-blue-700" />
                          </span>
                          <span>Alex added a new commit: "Fix login bug"</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="rounded-full bg-green-100 p-1">
                            <Clock className="h-3 w-3 text-green-700" />
                          </span>
                          <span>Task "Implement authentication" completed</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="rounded-full bg-yellow-100 p-1">
                            <Code2 className="h-3 w-3 text-yellow-700" />
                          </span>
                          <span>New feedback from Advisor: "Great progress!"</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
} 