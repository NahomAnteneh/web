"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, BookOpen, Star, ArrowUpRight, FileText, Users, Bell } from "lucide-react";

export function CTA() {
  return (
    <section className="py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-50">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
      </div>
      
      <Container className="relative z-10">
        <motion.div 
          className="text-center mx-auto max-w-2xl mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
            Elevate Academic Project Management
          </h2>
          <p className="text-xl text-gray-600">
            Join students, advisors, and evaluators already using the Project Repository Platform
          </p>
        </motion.div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Main CTA Card */}
          <motion.div
            className="md:col-span-2 lg:col-span-1 relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-600 via-primary to-blue-600 p-8 shadow-xl border border-white/10"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {/* Background pattern */}
            <div className="absolute top-0 left-0 h-full w-full opacity-15">
              <svg
                className="h-full w-full"
                viewBox="0 0 80 80"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <g fill="#FFF" fillOpacity="1">
                  <path d="M20 25h10v-5H20v5zm-5-10h10v-5H15v5zM20 10h10V5H20v5zM15 20h10v-5H15v5zm5 5h10v-5H20v5zm5 5h10v-5H25v5zm-5 5h10v-5H20v5zm5 5h10v-5H25v5zm-5 5h10v-5H20v5zm5 5h10v-5H25v5zm-5 5h10v-5H20v5zm5 5h10v-5H25v5zm-5 5h10v-5H20v5zm5 5h10v-5H25v5zm-5 5h10v-5H20v5zm5 5h10v-5H25v5zm-5 5h10v-5H20v5zm5 5h10v-5H25v5zm-5 5h10v-5H20v5zm5 5h10v-5H25v5zm-5 5h10v-5H20v5z" />
                </g>
              </svg>
            </div>
            
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-white/20 backdrop-blur-sm mx-auto border border-white/30 shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl mb-4 text-center">
                Join the platform today
              </h2>
              <p className="text-center text-lg leading-8 text-white/90 mb-8">
                Experience streamlined project management designed for academic environments.
              </p>
              <div className="flex flex-col gap-3">
                <Button 
                  size="lg" 
                  className="bg-white text-indigo-700 font-medium hover:bg-indigo-50 hover:text-indigo-800 hover:scale-105 transition-all w-full shadow-md"
                  asChild
                >
                  <Link href="/register" className="flex items-center justify-center gap-2">
                    <span className="font-medium">Create an account</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            className="rounded-xl border border-white/10 p-8 shadow-xl bg-gradient-to-br from-sky-500 to-cyan-400 relative overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-300/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-300/20 rounded-full blur-3xl"></div>
            
            <div className="absolute top-0 left-0 h-full w-full opacity-15">
              <svg
                className="h-full w-full"
                viewBox="0 0 80 80"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <g fill="#FFF" fillOpacity="1">
                  <path d="M20 25h10v-5H20v5zm-5-10h10v-5H15v5zM20 10h10V5H20v5zM15 20h10v-5H15v5zm5 5h10v-5H20v5zm5 5h10v-5H25v5zm-5 5h10v-5H20v5zm5 5h10v-5H25v5zm-5 5h10v-5H20v5zm5 5h10v-5H25v5zm-5 5h10v-5H20v5zm5 5h10v-5H25v5zm-5 5h10v-5H20v5zm5 5h10v-5H25v5zm-5 5h10v-5H20v5z" />
                </g>
              </svg>
            </div>
            
            <div className="flex flex-col h-full relative z-10">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/30 shadow-lg">
                  <BookOpen className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Project Repository</h3>
              <p className="text-white/90 mb-6 flex-grow">
                Access project archives, find examples, and learn from past academic projects.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white hover:text-sky-600 transition-all" 
                asChild
              >
                <Link href="/projects" className="flex items-center gap-1">
                  <span>Explore Projects</span>
                  <ArrowUpRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            className="rounded-xl border border-white/10 p-8 shadow-xl bg-gradient-to-br from-amber-500 to-orange-400 relative overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-yellow-400/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-orange-300/20 rounded-full blur-3xl"></div>
            
            <div className="absolute top-0 left-0 h-full w-full opacity-15">
              <svg
                className="h-full w-full"
                viewBox="0 0 80 80"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <g fill="#FFF" fillOpacity="1">
                  <path d="M20 25h10v-5H20v5zm-5-10h10v-5H15v5zM20 10h10V5H20v5zM15 20h10v-5H15v5zm5 5h10v-5H20v5zm5 5h10v-5H25v5zm-5 5h10v-5H20v5z" />
                </g>
              </svg>
            </div>
            
            <div className="flex flex-col h-full relative z-10">
              <div className="relative -mt-10 mb-3">
                <div className="w-14 h-14 bg-amber-600 rounded-full flex items-center justify-center">
                  <Bell className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Notification Center</h3>
              <p className="text-white/90 mb-6 flex-grow">
                Stay informed with timely notifications about project updates, feedback, and important deadlines.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white hover:text-amber-600 transition-all" 
                asChild
              >
                <Link href="/login" className="flex items-center gap-1">
                  <span>Sign In to Get Started</span>
                  <ArrowUpRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
} 