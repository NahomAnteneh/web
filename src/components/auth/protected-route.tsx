"use client";

import { useEffect } from "react";
import { redirect, usePathname } from "next/navigation";
import { useAuth } from "@/context/auth-context";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
  requiredPermission?: {
    action: string;
    subject: string;
  };
}

/**
 * ProtectedRoute Component
 * 
 * Wraps routes that require authentication and/or specific permissions or roles
 * Redirects to login page if user is not authenticated
 * Can be configured to require specific roles or permissions
 * 
 * @example
 * // Basic protection (just requires login)
 * <ProtectedRoute>
 *   <DashboardPage />
 * </ProtectedRoute>
 * 
 * @example
 * // Requires the 'admin' role
 * <ProtectedRoute requiredRole="admin">
 *   <AdminSettingsPage />
 * </ProtectedRoute>
 * 
 * @example
 * // Requires specific permission
 * <ProtectedRoute requiredPermission={{ action: 'create', subject: 'project' }}>
 *   <CreateProjectPage />
 * </ProtectedRoute>
 */
export function ProtectedRoute({ 
  children, 
  requiredRole,
  requiredPermission
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user, hasRole, hasPermission } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    // Wait until authentication state is determined
    if (isLoading) return;

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      // Store the attempted URL to redirect back after login
      sessionStorage.setItem('redirectAfterLogin', pathname);
      redirect('/login');
    }

    // If role is required but user doesn't have it
    if (requiredRole && !hasRole(requiredRole)) {
      redirect('/unauthorized');
    }

    // If permission is required but user doesn't have it
    if (
      requiredPermission && 
      !hasPermission(requiredPermission.action, requiredPermission.subject)
    ) {
      redirect('/unauthorized');
    }
  }, [
    isAuthenticated, 
    isLoading, 
    pathname, 
    requiredRole, 
    requiredPermission, 
    hasRole, 
    hasPermission
  ]);

  // Show nothing while checking authentication
  if (isLoading) {
    return null; // Or a loading spinner
  }

  // If all checks pass, render the children
  return <>{children}</>;
} 