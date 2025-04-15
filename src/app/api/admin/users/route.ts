import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    // Get user info from request headers (set by middleware)
    const userRole = request.headers.get('x-user-role');
    
    // Check if user has admin role
    if (userRole !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
    
    // Fetch all users with their roles
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        role: {
          select: {
            id: true,
            roleName: true,
          },
        },
      },
      orderBy: {
        lastName: 'asc',
      },
    });
    
    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching users' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 