// src/app/api/user/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { walletAddress } = body;

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      );
    }

    // Use 'upsert' to find a user or create them if they don't exist
    const user = await prisma.user.upsert({
      where: { walletAddress: walletAddress },
      update: {}, // We can add things to update on every login here later
      create: { walletAddress: walletAddress },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error handling user:', error);
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    );
  }
}