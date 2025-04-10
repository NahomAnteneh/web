import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-development-secret';
const JWT_EXPIRES_IN = '1h';
const REFRESH_TOKEN_EXPIRES_IN = '7d';

// Define permission mapping for roles
const ROLE_PERMISSIONS = {
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
  'developer': [
    { action: 'read', subject: 'project' },
    { action: 'update', subject: 'project' },
    { action: 'read', subject: 'task' },
    { action: 'create', subject: 'feedback' },
    { action: 'read', subject: 'report' }
  ]
};

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();
    const { email, password } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        role: true
      }
    });

    // Check if user exists
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check if password matches using bcrypt
    const passwordValid = await bcrypt.compare(password, user.password);
    
    if (!passwordValid) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Get permissions based on role
    const roleName = user.role.roleName;
    const permissions = ROLE_PERMISSIONS[roleName as keyof typeof ROLE_PERMISSIONS] || [];

    // Create JWT payload
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

    // Sign access token
    const accessToken = jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    // Sign refresh token
    const refreshToken = jwt.sign(
      { sub: user.id.toString() },
      JWT_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
    );

    // Create response
    const response = NextResponse.json({
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: roleName,
      },
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
    response.cookies.set('prp_refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
      sameSite: 'strict'
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 