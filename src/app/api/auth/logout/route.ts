import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Create a response that will clear the auth cookies
    const response = NextResponse.json({
      message: 'Logged out successfully',
      success: true
    });
    
    // Clear access token cookie
    response.cookies.set('prp_access_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 0, // Expire immediately
      path: '/',
      sameSite: 'strict'
    });
    
    // Clear refresh token cookie
    response.cookies.set('prp_refresh_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 0, // Expire immediately
      path: '/',
      sameSite: 'strict'
    });
    
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 