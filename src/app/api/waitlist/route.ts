import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();

    // Validate email
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json(
        { message: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingEntry = await prisma.waitingList.findUnique({
      where: { email },
    });

    if (existingEntry) {
      return NextResponse.json(
        { message: 'This email is already on the waitlist' },
        { status: 400 }
      );
    }

    // Create new entry
    const entry = await prisma.waitingList.create({
      data: {
        email,
        name,
      },
    });

    return NextResponse.json(
      { message: 'Successfully joined the waitlist', entry },
      { status: 201 }
    );
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json(
      { message: 'Failed to join waitlist' },
      { status: 500 }
    );
  }
} 