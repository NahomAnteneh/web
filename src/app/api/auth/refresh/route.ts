import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@/generated/prisma';
import { UserRole, UserPermission } from '@/lib/auth';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-development-secret';
const JWT_EXPIRES_IN = '1h';
const REFRESH_TOKEN_EXPIRES_IN = '7d';

// Define permission mapping for roles
const ROLE_PERMISSIONS: Record<string, UserPermission[]> = {
  'admin': [
    { action: 'manage', subject: 'all' }
  ],
  'user': [
    { action: 'read', subject: 'project' },
    { action: 'create', subject: 'project' },
    { action: 'update', subject: 'project' },
    { action: 'read', subject: 'task' },
    { action: 'create', subject: 'task' },
    { action: 'update', subject: 'task' }
  ],
  'student': [
    { action: 'read', subject: 'project' },
    { action: 'create', subject: 'project' },
    { action: 'update', subject: 'project' },
    { action: 'read', subject: 'task' },
    { action: 'create', subject: 'task' },
    { action: 'update', subject: 'task' }
  ],
  'developer': [
    { action: 'read', subject: 'project' },
    { action: 'update', subject: 'project' },
    { action: 'read', subject: 'task' },
    { action: 'create', subject: 'feedback' },
    { action: 'read', subject: 'report' }
  ],
  'advisor': [
    { action: 'read', subject: 'project' },
    { action: 'update', subject: 'project' },
    { action: 'read', subject: 'task' },
    { action: 'create', subject: 'feedback' },
    { action: 'read', subject: 'report' }
  ],
  'evaluator': [
    { action: 'read', subject: 'project' },
    { action: 'evaluate', subject: 'project' },
    { action: 'read', subject: 'report' },
    { action: 'create', subject: 'evaluation' }
  ]
};

export async function POST(request: Request) {
  try {
    // Get refresh token from request
    let refreshToken: string | undefined;
    
    // First try to get token from request body
    try {
      const body = await request.json();
      refreshToken = body.refreshToken;
    } catch (e) {
      // Request body might not be valid JSON or might not exist
    }
    
    // If no token in body, try to get from cookies
    if (!refreshToken) {
      const cookieStore = cookies();
      refreshToken = cookieStore.get('prp_refresh_token')?.value;
    }

    if (!refreshToken) {
      return NextResponse.json(
        { message: 'Refresh token is required' },
        { status: 400 }
      );
    }

    // Verify the refresh token
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, JWT_SECRET) as { sub: string };
    } catch (error) {
      return NextResponse.json(
        { message: 'Invalid or expired refresh token' },
        { status: 401 }
      );
    }

    // Get user ID from token
    const userId = parseInt(decoded.sub, 10);

    // Find user in database
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        role: true
      }
    });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Get role name and permissions
    const roleName = user.role.roleName;
    const permissions = ROLE_PERMISSIONS[roleName] || [];

    // Create new JWT payload
    const payload = {
      sub: user.id.toString(),
      email: user.email,
      userId: user.id,
      role: {
        id: user.roleId,
        name: roleName
      },
      permissions,
    };

    // Sign new access token
    const accessToken = jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    // Sign new refresh token
    const newRefreshToken = jwt.sign(
      { sub: user.id.toString() },
      JWT_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
    );

    // Create response
    const response = NextResponse.json({
      accessToken,
      refreshToken: newRefreshToken,
    });
    
    // Set access token cookie (HTTP only for security)
    response.cookies.set('prp_access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60, // 1 hour
      path: '/',
      sameSite: 'strict'
    });
    
    // Set refresh token cookie (HTTP only for security)
    response.cookies.set('prp_refresh_token', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
      sameSite: 'strict'
    });

    return response;
  } catch (error) {
    console.error('Token refresh error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 