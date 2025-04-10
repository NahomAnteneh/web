import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();
    const { username, email, password, firstName, lastName, idNumber, role = 'user', department, batchYear } = body;

    // Validate required fields
    if (!username || !email || !password || !firstName || !lastName || !role) {
      return NextResponse.json(
        { 
          message: "Please provide all required fields",
          success: false
        }, 
        { status: 400 }
      );
    }
    
    // Validate idNumber if provided
    if (idNumber && typeof idNumber !== 'string') {
      return NextResponse.json(
        { 
          message: "ID Number must be a string",
          success: false 
        }, 
        { status: 400 }
      );
    }

    // Validate student fields if role is student
    const isStudent = role.toLowerCase() === 'student';
    if (isStudent) {
      if (!department || !batchYear) {
        return NextResponse.json(
          { 
            message: "Department and Batch Year are required for students",
            success: false 
          }, 
          { status: 400 }
        );
      }
    }

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if password is strong enough
    if (password.length < 8) {
      return NextResponse.json(
        { message: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email }
    });
    
    if (existingUserByEmail) {
      return NextResponse.json(
        { message: 'Email is already registered' },
        { status: 409 }
      );
    }

    // Check if username already exists
    const existingUserByUsername = await prisma.user.findUnique({
      where: { username }
    });
    
    if (existingUserByUsername) {
      return NextResponse.json(
        { message: 'Username is already taken' },
        { status: 409 }
      );
    }

    // Get roleId based on role name
    const roleRecord = await prisma.role.findUnique({
      where: { roleName: role }
    });

    if (!roleRecord) {
      return NextResponse.json(
        { message: 'Invalid role' },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        firstName,
        lastName,
        idNumber: idNumber || undefined,
        roleId: roleRecord.id,
      }
    });

    // Create student profile if the role is student
    if (isStudent && user) {
      await prisma.$transaction([
        prisma.studentProfile.create({
          data: {
            userId: user.id,
            department,
            batchYear,
          },
        })
      ]);
    }

    // Return success (without sensitive data)
    return NextResponse.json({
      message: 'Registration successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 