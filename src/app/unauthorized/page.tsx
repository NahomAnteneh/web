"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Home, LogOut, ArrowLeft } from "lucide-react";

export default function UnauthorizedPage() {
  const router = useRouter();
  const { user, logout } = useAuth();

  // Function to navigate to the appropriate dashboard based on user role
  const handleGoToDashboard = () => {
    if (!user) {
      router.push('/login');
      return;
    }

    const userRole = user.role.name;
    switch (userRole) {
      case 'admin':
        router.push('/admin/dashboard');
        break;
      case 'developer':
        router.push('/developer/dashboard');
        break;
      case 'user':
      default:
        router.push('/dashboard');
        break;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="p-3 bg-red-100 rounded-full">
            <ShieldAlert className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
          <p className="text-center text-gray-600">
            You don't have permission to access this page. This area requires different privileges.
          </p>
        </div>

        <div className="pt-4 mt-6 border-t border-gray-200 space-y-4">
          <Button 
            className="w-full flex items-center justify-center gap-2"
            onClick={handleGoToDashboard}
          >
            <Home className="w-4 h-4" />
            Go to Dashboard
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={() => logout()}
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
} 