import { NextResponse, NextRequest } from 'next/server';

// The second argument to the route handler is a context object
// which contains the dynamic route parameters. The build environment
// indicates that the `params` object is a Promise that needs to be awaited.
export async function POST(
  request: NextRequest, 
  context: { params: Promise<{ questId: string }> }
) {
  // We await the promise to get the resolved params object.
  const { questId } = await context.params;
  
  // In the future, you'll add your logic here to verify the quest.
  console.log(`Verifying quest with ID: ${questId}`);

  // Return a success response.
  return NextResponse.json({ message: `Verification for quest ${questId} received.` });
}

