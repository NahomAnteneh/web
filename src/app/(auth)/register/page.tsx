"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion } from "framer-motion";
import { UserCircle, Mail, BookOpen, Users, ClipboardList, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student", // Default role
  });
  const [formErrors, setFormErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    general: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing again
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleRoleChange = (value: string) => {
    setFormData(prev => ({ ...prev, role: value }));
    if (formErrors.role) {
      setFormErrors(prev => ({ ...prev, role: "" }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      general: "",
    };

    // Username validation
    if (!formData.username) {
      errors.username = "Username is required";
      isValid = false;
    } else if (formData.username.length < 3) {
      errors.username = "Username must be at least 3 characters";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    // Role validation
    if (!formData.role) {
      errors.role = "Please select a role";
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

    setIsLoading(true);

    try {
      // This would be replaced with your actual API call
      // const response = await fetch('/api/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // if (!response.ok) throw new Error('Registration failed');
      
      // Mock successful registration
      console.log("Registration successful", formData);
      
      // Redirect to login page
      router.push("/login?registered=true");
    } catch (error) {
      console.error("Registration error:", error);
      setFormErrors(prev => ({
        ...prev,
        general: "Registration failed. Please try again."
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Column - Registration Form */}
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
              Create an account
            </h1>
            <p className="mt-3 text-gray-600">
              Join the Project Repository Platform to manage academic projects and collaborate with others.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {formErrors.general && (
              <div className="p-4 bg-red-50 rounded-lg text-red-600 text-sm shadow-sm">
                {formErrors.general}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700">Username</Label>
              <Input 
                id="username"
                name="username"
                placeholder="Enter a username"
                value={formData.username}
                onChange={handleChange}
                disabled={isLoading}
                className={`border-0 bg-gray-50 shadow-sm ${formErrors.username ? "ring-2 ring-red-500" : ""}`}
              />
              {formErrors.username && (
                <p className="text-sm text-red-500">{formErrors.username}</p>
              )}
            </div>
            
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
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <Input 
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                className={`border-0 bg-gray-50 shadow-sm ${formErrors.password ? "ring-2 ring-red-500" : ""}`}
              />
              {formErrors.password && (
                <p className="text-sm text-red-500">{formErrors.password}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700">Confirm password</Label>
              <Input 
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isLoading}
                className={`border-0 bg-gray-50 shadow-sm ${formErrors.confirmPassword ? "ring-2 ring-red-500" : ""}`}
              />
              {formErrors.confirmPassword && (
                <p className="text-sm text-red-500">{formErrors.confirmPassword}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label className="text-gray-700">Select your role</Label>
              <RadioGroup 
                value={formData.role} 
                onValueChange={handleRoleChange}
                className="grid grid-cols-2 gap-4"
              >
                <div className={`flex items-center space-x-2 border rounded-lg p-3 ${formData.role === 'student' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                  <RadioGroupItem value="student" id="student" className="sr-only" />
                  <Label
                    htmlFor="student"
                    className="flex flex-col items-center justify-between cursor-pointer w-full"
                  >
                    <Users className={`h-6 w-6 mb-1 ${formData.role === 'student' ? 'text-primary' : 'text-gray-400'}`} />
                    <span className={`text-sm font-medium ${formData.role === 'student' ? 'text-primary' : 'text-gray-500'}`}>Student</span>
                  </Label>
                </div>
                
                <div className={`flex items-center space-x-2 border rounded-lg p-3 ${formData.role === 'advisor' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                  <RadioGroupItem value="advisor" id="advisor" className="sr-only" />
                  <Label
                    htmlFor="advisor"
                    className="flex flex-col items-center justify-between cursor-pointer w-full"
                  >
                    <BookOpen className={`h-6 w-6 mb-1 ${formData.role === 'advisor' ? 'text-primary' : 'text-gray-400'}`} />
                    <span className={`text-sm font-medium ${formData.role === 'advisor' ? 'text-primary' : 'text-gray-500'}`}>Advisor</span>
                  </Label>
                </div>
                
                <div className={`flex items-center space-x-2 border rounded-lg p-3 ${formData.role === 'evaluator' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                  <RadioGroupItem value="evaluator" id="evaluator" className="sr-only" />
                  <Label
                    htmlFor="evaluator"
                    className="flex flex-col items-center justify-between cursor-pointer w-full"
                  >
                    <ClipboardList className={`h-6 w-6 mb-1 ${formData.role === 'evaluator' ? 'text-primary' : 'text-gray-400'}`} />
                    <span className={`text-sm font-medium ${formData.role === 'evaluator' ? 'text-primary' : 'text-gray-500'}`}>Evaluator</span>
                  </Label>
                </div>
              </RadioGroup>
              {formErrors.role && (
                <p className="text-sm text-red-500">{formErrors.role}</p>
              )}
              <p className="text-xs text-gray-500 mt-2">Administrator accounts can only be created by system administrators.</p>
            </div>

            <div className="pt-2">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </div>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link 
                  href="/login" 
                  className="font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Right Column - Information and Benefits */}
      <div className="hidden lg:block lg:w-1/2 bg-gray-50 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 p-12 flex flex-col justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Benefits of joining the platform
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-gray-900">Students</h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-green-100 p-1 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-green-600">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Manage project files with integrated version control</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-green-100 p-1 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-green-600">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Collaborate with team members in real-time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-green-100 p-1 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-green-600">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Receive immediate feedback from advisors and evaluators</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-gray-900">Advisors & Evaluators</h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-green-100 p-1 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-green-600">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Track student progress through comprehensive dashboards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-green-100 p-1 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-green-600">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Provide contextual feedback directly on code or documents</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-green-100 p-1 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-green-600">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Access a central repository of completed projects</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 bg-primary/5 rounded-lg p-4 border border-primary/20">
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-primary" />
                <p className="text-sm font-medium text-gray-700">Your data is secure with end-to-end encryption and regular backups.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 