import { NextResponse, NextRequest } from 'next/server';

// The second argument to the route handler is a context object
// which contains the dynamic route parameters.
export async function POST(
  request: NextRequest, 
  context: { params: { questId: string } }
) {
  // We can destructure the questId directly from the context object.
  const { questId } = context.params;
  
  // In the future, you'll add your logic here to verify the quest.
  console.log(`Verifying quest with ID: ${questId}`);

  // Return a success response.
  return NextResponse.json({ message: `Verification for quest ${questId} received.` });
}
