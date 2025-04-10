import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { UserRole, UserPermission } from '@/lib/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'your-development-secret';
const JWT_EXPIRES_IN = '1h';
const REFRESH_TOKEN_EXPIRES_IN = '7d';

// Mock user data for demonstration (in production this would be fetched from a database)
const MOCK_USERS = [
  {
    id: 1,
    email: 'admin@example.com',
    roleId: 1,
  },
  {
    id: 2,
    email: 'student@example.com',
    roleId: 2,
  },
  {
    id: 3,
    email: 'advisor@example.com',
    roleId: 3,
  }
];

// Mock role data (replace with actual roles from database)
const MOCK_ROLES: Record<number, UserRole> = {
  1: { id: 1, name: 'admin' },
  2: { id: 2, name: 'student' },
  3: { id: 3, name: 'advisor' },
  4: { id: 4, name: 'evaluator' }
};

// Mock permissions data (replace with actual permissions from database)
const MOCK_PERMISSIONS: Record<number, UserPermission[]> = {
  1: [{ action: 'manage', subject: 'all' }],
  2: [
    { action: 'read', subject: 'project' },
    { action: 'create', subject: 'project' },
    { action: 'update', subject: 'project' },
    { action: 'read', subject: 'task' },
    { action: 'create', subject: 'task' },
    { action: 'update', subject: 'task' }
  ],
  3: [
    { action: 'read', subject: 'project' },
    { action: 'update', subject: 'project' },
    { action: 'read', subject: 'task' },
    { action: 'create', subject: 'feedback' },
    { action: 'read', subject: 'report' }
  ],
  4: [
    { action: 'read', subject: 'project' },
    { action: 'evaluate', subject: 'project' },
    { action: 'read', subject: 'report' },
    { action: 'create', subject: 'evaluation' }
  ]
};

export async function POST(request: Request) {
  try {
    const { refreshToken } = await request.json();

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

    // Find user (in production, this would query your database)
    const user = MOCK_USERS.find(u => u.id === userId);

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Get user role and permissions
    const role = MOCK_ROLES[user.roleId];
    const permissions = MOCK_PERMISSIONS[user.roleId] || [];

    // Create new JWT payload
    const payload = {
      sub: user.id.toString(),
      email: user.email,
      userId: user.id,
      role,
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

    // Return tokens
    return NextResponse.json({
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 