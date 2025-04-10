"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { UserCircle, Mail, CheckCircle2, BookOpen, Users, Bell } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isLoading, error: authError } = useAuth();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  useEffect(() => {
    const registered = searchParams.get("registered");
    if (registered === "true") {
      setShowSuccessMessage(true);
      // Hide success message after 5 seconds
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  // Set form error from auth context error
  useEffect(() => {
    if (authError) {
      setFormErrors(prev => ({ ...prev, general: authError }));
    }
  }, [authError]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing again
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
    // Also clear general error
    if (formErrors.general) {
      setFormErrors(prev => ({ ...prev, general: "" }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {
      email: "",
      password: "",
      general: "",
    };

    // Email validation
    if (!formData.email) {
      errors.email = "Email is required";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      errors.password = "Password is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      // Use the login function from auth context
      await login({
        email: formData.email,
        password: formData.password
      });
      
      // No need to redirect here as the auth context will handle it
    } catch (error) {
      console.error("Login error:", error);
      // Auth context will set the error, but we can add more specific handling here if needed
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Column - Login Form */}
      <div className="w-full lg:w-1/2 p-8 md:p-12 xl:p-16 flex flex-col justify-center relative">
        <div className="absolute top-8 left-8 md:top-12 md:left-12 xl:top-16 xl:left-16">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">BiT PRP</span>
          </Link>
        </div>
        
        <motion.div 
          className="max-w-md mx-auto w-full mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome back
            </h1>
            <p className="mt-3 text-gray-600">
              Sign in to your Project Repository Platform account to manage your projects and collaborate with your team.
            </p>
          </div>

          {showSuccessMessage && (
            <motion.div 
              className="mb-6 p-4 bg-green-50 rounded-lg flex items-center gap-3 text-green-800 shadow-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
              <p>Account created successfully! Please sign in.</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {formErrors.general && (
              <div className="p-4 bg-red-50 rounded-lg text-red-600 text-sm shadow-sm">
                {formErrors.general}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Email address</Label>
              <Input 
                id="email"
                name="email"
                type="email"
                placeholder="example@example.com"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                className={`border-0 bg-gray-50 shadow-sm ${formErrors.email ? "ring-2 ring-red-500" : ""}`}
              />
              {formErrors.email && (
                <p className="text-sm text-red-500">{formErrors.email}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <Link 
                  href="/forgot-password" 
                  className="text-xs text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <Input 
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                className={`border-0 bg-gray-50 shadow-sm ${formErrors.password ? "ring-2 ring-red-500" : ""}`}
              />
              {formErrors.password && (
                <p className="text-sm text-red-500">{formErrors.password}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full py-6" 
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/register" className="text-primary font-medium hover:text-primary/80 transition-colors">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Right Column - Features Preview */}
      <div className="hidden lg:block lg:w-1/2 bg-primary/5">
        <div className="h-full flex flex-col justify-center p-8 md:p-12 xl:p-16">
          <div className="max-w-lg">
            <h2 className="text-2xl font-bold mb-8 text-gray-900">
              Manage your research and academic projects with ease
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 rounded-lg p-2 mt-1">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Project Management</h3>
                  <p className="text-gray-600 mt-1">
                    Create, track, and manage your academic and research projects in one place.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 rounded-lg p-2 mt-1">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Team Collaboration</h3>
                  <p className="text-gray-600 mt-1">
                    Invite teammates, assign tasks, and collaborate on projects efficiently.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 rounded-lg p-2 mt-1">
                  <UserCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Faculty Advisors</h3>
                  <p className="text-gray-600 mt-1">
                    Connect with faculty advisors for guidance and feedback on your projects.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 rounded-lg p-2 mt-1">
                  <Bell className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Real-time Updates</h3>
                  <p className="text-gray-600 mt-1">
                    Stay informed with notifications about project activity and deadlines.
                  </p>
                </div>
              </div>
            </div>
            
            <Separator className="my-8" />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  © 2023 Project Repository Platform
                </p>
              </div>
              <div className="flex gap-4">
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-primary">
                  Privacy
                </Link>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-primary">
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 