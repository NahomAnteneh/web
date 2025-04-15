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
    
    // Calculate date for "recent" submissions (last 7 days)
    const recentDate = new Date();
    recentDate.setDate(recentDate.getDate() - 7);
    
    // Get total users count
    const totalUsers = await prisma.user.count();
    
    // Get project statistics
    const totalProjects = await prisma.project.count();
    const activeProjects = await prisma.project.count({
      where: {
        endDate: {
          gte: new Date(),
        },
      },
    });
    
    // Get task statistics
    const totalTasks = await prisma.task.count();
    const completedTasks = await prisma.task.count({
      where: {
        status: 'completed',
      },
    });
    const pendingTasks = await prisma.task.count({
      where: {
        status: 'pending',
      },
    });
    
    // For recent submissions, we'll count recent commits
    const recentSubmissions = await prisma.commit.count({
      where: {
        commitTime: {
          gte: recentDate,
        },
      },
    });
    
    // Return aggregated statistics
    return NextResponse.json({
      stats: {
        totalUsers,
        totalProjects,
        activeProjects,
        totalTasks,
        completedTasks,
        pendingTasks,
        recentSubmissions,
      },
    });
  } catch (error) {
    console.error('Error fetching system statistics:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching system statistics' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 