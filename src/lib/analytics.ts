// lib/analytics.ts
export const trackQuestStart = (questId: string, walletAddress: string) => {
  // Track with your analytics provider
  console.log('Quest started:', { questId, walletAddress });
};

export const trackStepComplete = (stepId: string, walletAddress: string) => {
  console.log('Step completed:', { stepId, walletAddress });
};

export const trackRewardClaim = (questId: string, xpEarned: number) => {
  console.log('Reward claimed:', { questId, xpEarned });
};