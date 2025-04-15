import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    // Get user info from request headers (set by middleware)
    const userRole = request.headers.get('x-user-role');
    
    // Check if user has admin role
    if (userRole !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
    
    // Get request body
    const body = await request.json();
    const { userId, action } = body;
    
    if (!userId || !action || (action !== 'assign' && action !== 'revoke')) {
      return NextResponse.json(
        { error: 'Invalid request parameters' },
        { status: 400 }
      );
    }
    
    // Fetch the user's current role
    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
      include: { role: true },
    });
    
    if (!targetUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Prevent modifying admin users
    if (targetUser.role.roleName === 'admin') {
      return NextResponse.json(
        { error: 'Cannot modify admin users' },
        { status: 403 }
      );
    }
    
    // Get the role IDs
    const roles = await prisma.role.findMany();
    const advisorRole = roles.find(role => role.roleName === 'advisor');
    const studentRole = roles.find(role => role.roleName === 'student');
    
    if (!advisorRole || !studentRole) {
      return NextResponse.json(
        { error: 'Required roles not found in the system' },
        { status: 500 }
      );
    }
    
    let updatedUser;
    let message;
    
    // Assign or revoke advisor role
    if (action === 'assign' && targetUser.role.roleName === 'student') {
      updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { roleId: advisorRole.id },
        include: { role: true },
      });
      message = `${targetUser.firstName} ${targetUser.lastName} is now an advisor`;
    } else if (action === 'revoke' && targetUser.role.roleName === 'advisor') {
      updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { roleId: studentRole.id },
        include: { role: true },
      });
      message = `${targetUser.firstName} ${targetUser.lastName} is no longer an advisor`;
    } else {
      return NextResponse.json(
        { error: 'Invalid role transition' },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ 
      message, 
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        role: {
          id: updatedUser.role.id,
          roleName: updatedUser.role.roleName,
        },
      }
    });
  } catch (error) {
    console.error('Error updating user role:', error);
    return NextResponse.json(
      { error: 'An error occurred while updating the user role' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 