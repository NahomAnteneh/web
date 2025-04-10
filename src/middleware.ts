import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Define JWT payload interface
interface JwtPayload {
  sub: string;
  role?: {
    name: string;
    id: number;
  };
  [key: string]: any;
}

// Routes that don't require authentication
const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/terms',
  '/privacy',
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/refresh',
];

// Routes that require admin role
const adminRoutes = [
  '/admin',
  '/admin/dashboard',
  '/admin/users',
  '/admin/settings',
  '/admin/logs',
  '/admin/statistics',
  '/admin/templates',
  '/admin/approvals',
];

// Routes that require developer role
const developerRoutes = [
  '/developer',
  '/developer/dashboard',
  '/developer/projects',
  '/developer/repositories',
  '/developer/resources',
  '/developer/database',
  '/developer/api-console',
  '/developer/documentation',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow access to public routes without authentication
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Allow access to static files
  if (
    pathname.includes('/_next') || 
    pathname.includes('/images') || 
    pathname.includes('/fonts') ||
    pathname.includes('/favicon.ico')
  ) {
    return NextResponse.next();
  }

  // Check for authentication token
  const accessToken = request.cookies.get('prp_access_token')?.value;
  
  if (!accessToken) {
    // Redirect to login if not authenticated
    const url = new URL('/login', request.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  try {
    // Verify the token
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'your-development-secret'
    );
    
    const { payload } = await jwtVerify(accessToken, secret) as { payload: JwtPayload };
    
    // Check if accessing admin routes with non-admin role
    if (
      adminRoutes.some(route => pathname.startsWith(route)) && 
      payload.role?.name !== 'admin'
    ) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    // Check if accessing developer routes with non-developer role
    if (
      developerRoutes.some(route => pathname.startsWith(route)) && 
      payload.role?.name !== 'developer' && 
      payload.role?.name !== 'admin'  // Allow admins to access developer routes
    ) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    // Add user info to headers for backend routes if needed
    if (pathname.startsWith('/api/')) {
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-id', payload.sub as string);
      requestHeaders.set('x-user-role', payload.role?.name as string);
      
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }

    // Allow access to the requested page
    return NextResponse.next();
  } catch (error) {
    // Token verification failed - redirect to login
    const refreshToken = request.cookies.get('prp_refresh_token')?.value;
    
    if (refreshToken) {
      // Attempt to refresh the token
      const response = NextResponse.redirect(new URL('/api/auth/refresh', request.url));
      response.cookies.set('redirect_after_refresh', pathname, { 
        path: '/',
        httpOnly: true,
        maxAge: 60, // 1 minute
      });
      return response;
    }
    
    // No refresh token available, redirect to login
    const url = new URL('/login', request.url);
    return NextResponse.redirect(url);
  }
}

// Configure which routes this middleware will run on
export const config = {
  matcher: [
    // Apply to all routes except _next and api routes that don't need auth
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 