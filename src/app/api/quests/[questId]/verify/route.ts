import { NextResponse } from 'next/server';

interface VerifyQuestParams {
  params: {
    questId: string;
  }
}

export async function POST(request: Request, { params }: VerifyQuestParams) {
  const { questId } = params;
  // In the future, you'll add logic here to verify the quest
  console.log(`Verifying quest with ID: ${questId}`);

  return NextResponse.json({ message: `Verification for quest ${questId} received.` });
}