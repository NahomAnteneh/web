"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserCircle,
  Mail,
  BookOpen,
  Users,
  Lock,
  School,
  Calendar,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Building,
  GraduationCap,
  UserCog
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Generate years for batch selection (current year + 6 future years)
const generateBatchYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i < 7; i++) {
    years.push(currentYear + i);
  }
  return years;
};

// List of departments
const departments = [
  "Computer Science",
  "Software Engineering",
  "Information Systems",
  "Information Technology",
  "Computer Engineering",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Chemical Engineering",
  "Biomedical Engineering",
];

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isStudent, setIsStudent] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    idNumber: "",
    department: "",
    batchYear: "",
    role: "", // No default role, user must select
  });
  const [formErrors, setFormErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    idNumber: "",
    department: "",
    batchYear: "",
    role: "", // Add back role validation
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

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleRoleChange = (value: string) => {
    setFormData(prev => ({ ...prev, role: value }));
    
    // Update isStudent based on role selection
    setIsStudent(value === "student");
    
    if (formErrors.role) {
      setFormErrors(prev => ({ ...prev, role: "" }));
    }
  };

  const validateStep1 = () => {
    let isValid = true;
    const errors = { ...formErrors };

    // First name validation
    if (!formData.firstName) {
      errors.firstName = "First name is required";
      isValid = false;
    }

    // Last name validation
    if (!formData.lastName) {
      errors.lastName = "Last name is required";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid institutional email address";
      isValid = false;
    }

    // ID number validation
    if (!formData.idNumber) {
      errors.idNumber = "ID number is required";
      isValid = false;
    }

    // Role validation - Add role validation to step 1
    if (!formData.role) {
      errors.role = "Please select your role";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const validateStep2 = () => {
    let isValid = true;
    const errors = { ...formErrors };

    // Student-specific validations
    if (isStudent) {
      if (!formData.department) {
        errors.department = "Department is required";
        isValid = false;
      }
      
      if (!formData.batchYear) {
        errors.batchYear = "Batch year is required";
        isValid = false;
      }
    }

    // Username validation
    if (!formData.username) {
      errors.username = "Username is required";
      isValid = false;
    } else if (formData.username.length < 3) {
      errors.username = "Username must be at least 3 characters";
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

    setFormErrors(errors);
    return isValid;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      // Now the isStudent state is set based on role selection, not ID
      setCurrentStep(2);
    }
  };

  const handlePrevStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep2()) {
      return;
    }

    setIsLoading(true);

    try {
      const registrationData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: formData.role,
        idNumber: formData.idNumber,
        ...(isStudent && {
          department: formData.department,
          batchYear: formData.batchYear,
          isStudent: true
        })
      };

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      console.log("Registration successful", data);
      
      // Redirect to login page
      router.push("/login?registered=true");
    } catch (error) {
      console.error("Registration error:", error);
      setFormErrors(prev => ({
        ...prev,
        general: error instanceof Error ? error.message : "Registration failed. Please try again."
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
            <span className="text-2xl font-bold text-primary">PRP</span>
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

          {/* Step indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className={`flex items-center ${currentStep === 1 ? 'text-primary' : 'text-gray-400'}`}>
                <div className={`rounded-full w-8 h-8 flex items-center justify-center border-2 ${currentStep === 1 ? 'border-primary bg-primary/10' : 'border-gray-200'}`}>
                  1
                </div>
                <span className="ml-2 text-sm font-medium">Basic Info</span>
              </div>
              
              <div className="flex-1 h-px bg-gray-200 mx-4"></div>
              
              <div className={`flex items-center ${currentStep === 2 ? 'text-primary' : 'text-gray-400'}`}>
                <div className={`rounded-full w-8 h-8 flex items-center justify-center border-2 ${currentStep === 2 ? 'border-primary bg-primary/10' : 'border-gray-200'}`}>
                  2
                </div>
                <span className="ml-2 text-sm font-medium">Account Setup</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {formErrors.general && (
              <div className="p-4 bg-red-50 rounded-lg text-red-600 text-sm shadow-sm">
                {formErrors.general}
              </div>
            )}
            
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-gray-700">First Name</Label>
                      <Input 
                        id="firstName"
                        name="firstName"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={handleChange}
                        disabled={isLoading}
                        className={`border-0 bg-gray-50 shadow-sm ${formErrors.firstName ? "ring-2 ring-red-500" : ""}`}
                      />
                      {formErrors.firstName && (
                        <p className="text-sm text-red-500">{formErrors.firstName}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-gray-700">Last Name</Label>
                      <Input 
                        id="lastName"
                        name="lastName"
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={handleChange}
                        disabled={isLoading}
                        className={`border-0 bg-gray-50 shadow-sm ${formErrors.lastName ? "ring-2 ring-red-500" : ""}`}
                      />
                      {formErrors.lastName && (
                        <p className="text-sm text-red-500">{formErrors.lastName}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700">Institutional Email</Label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.name@institution.edu"
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
                    <Label htmlFor="idNumber" className="text-gray-700">ID Number</Label>
                    <Input 
                      id="idNumber"
                      name="idNumber"
                      placeholder="Enter your institutional ID"
                      value={formData.idNumber}
                      onChange={handleChange}
                      disabled={isLoading}
                      className={`border-0 bg-gray-50 shadow-sm ${formErrors.idNumber ? "ring-2 ring-red-500" : ""}`}
                    />
                    {formErrors.idNumber && (
                      <p className="text-sm text-red-500">{formErrors.idNumber}</p>
                    )}
                  </div>

                  {/* Add role selection */}
                  <div className="space-y-3">
                    <Label className="text-gray-700">Select your role</Label>
                    <RadioGroup 
                      value={formData.role} 
                      onValueChange={handleRoleChange}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div className={`flex items-center space-x-2 border rounded-lg p-3 ${formData.role === 'student' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                        <RadioGroupItem value="student" id="student" className="sr-only" />
                        <Label htmlFor="student" className="flex flex-col items-center gap-1 cursor-pointer p-2 w-full">
                          <GraduationCap className="h-5 w-5 mb-1" />
                          <span className="font-medium">Student</span>
                          <span className="text-xs text-gray-500">I am a student</span>
                        </Label>
                      </div>
                      
                      <div className={`flex items-center space-x-2 border rounded-lg p-3 ${formData.role === 'advisor' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                        <RadioGroupItem value="advisor" id="advisor" className="sr-only" />
                        <Label htmlFor="advisor" className="flex flex-col items-center gap-1 cursor-pointer p-2 w-full">
                          <UserCog className="h-5 w-5 mb-1" />
                          <span className="font-medium">Advisor</span>
                          <span className="text-xs text-gray-500">I am an advisor</span>
                        </Label>
                      </div>
                    </RadioGroup>
                    {formErrors.role && (
                      <p className="text-sm text-red-500">{formErrors.role}</p>
                    )}
                  </div>

                  <Button 
                    type="button" 
                    className="w-full flex items-center justify-center gap-2"
                    onClick={handleNextStep}
                    disabled={isLoading}
                  >
                    Next Step
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {isStudent && (
                    <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                        <School className="h-4 w-4" />
                        <span>Student Account</span>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="department" className="text-gray-700">Department</Label>
                        <Select
                          value={formData.department}
                          onValueChange={(value) => handleSelectChange("department", value)}
                        >
                          <SelectTrigger 
                            className={`border border-gray-200 bg-white shadow-sm ${formErrors.department ? "ring-2 ring-red-500" : ""}`}
                            id="department"
                          >
                            <SelectValue placeholder="Select your department" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border border-gray-200 shadow-md z-50">
                            {departments.map((dept) => (
                              <SelectItem key={dept} value={dept}>
                                {dept}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {formErrors.department && (
                          <p className="text-sm text-red-500">{formErrors.department}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="batchYear" className="text-gray-700">Batch Year</Label>
                        <Select
                          value={formData.batchYear}
                          onValueChange={(value) => handleSelectChange("batchYear", value)}
                        >
                          <SelectTrigger 
                            className={`border border-gray-200 bg-white shadow-sm ${formErrors.batchYear ? "ring-2 ring-red-500" : ""}`}
                            id="batchYear"
                          >
                            <SelectValue placeholder="Select your batch year" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border border-gray-200 shadow-md z-50">
                            {generateBatchYears().map((year) => (
                              <SelectItem key={year} value={year.toString()}>
                                {year} Batch
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {formErrors.batchYear && (
                          <p className="text-sm text-red-500">{formErrors.batchYear}</p>
                        )}
                      </div>
                      
                      <Separator className="my-2" />
                    </div>
                  )}
                  
                  {!isStudent && (
                    <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                        <UserCog className="h-4 w-4" />
                        <span>Advisor Account</span>
                      </div>
                      <Separator className="my-2" />
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

                  <div className="flex flex-col space-y-3">
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating account..." : "Create account"}
                    </Button>
                    
                    <Button 
                      type="button" 
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2"
                      onClick={handlePrevStep}
                      disabled={isLoading}
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {currentStep === 1 && (
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
            )}
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