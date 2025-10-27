// ============================================
// FILE 1: src/lib/questData.ts
// Shared quest data and types
// ============================================

export type QuestCategory = 'Social' | 'On-Chain' | 'Community' | 'Testnet' | 'DeFi' | 'NFT';
export type QuestDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Expert';
export type QuestStatus = 'Live' | 'Hot' | 'New' | 'Ending Soon';

export interface QuestStep {
  id: string;
  title: string;
  description: string;
  type: 'twitter' | 'discord' | 'onchain' | 'visit' | 'custom';
  verification: {
    type: 'manual' | 'auto' | 'signature';
    endpoint?: string;
    requireProof?: boolean;
  };
  status: 'locked' | 'available' | 'verifying' | 'completed' | 'failed';
  optional: boolean;
  points: number;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: QuestCategory;
  difficulty: QuestDifficulty;
  status: QuestStatus;
  timeEstimate: number;
  xpReward: number;
  participants: number;
  endDate: string;
  project: {
    name: string;
    logo: string;
    website?: string;
    twitter?: string;
    discord?: string;
  };
  rewards: {
    xp: number;
    badges?: string[];
    tokens?: { amount: number; symbol: string };
  };
  completionRate: number;
  requirements?: string[];
  steps?: QuestStep[];
  eligibility?: {
    minLevel?: number;
    requiredQuests?: string[];
    networkRequired?: string;
  };
}

// Projects data
const projects = [
  { 
    name: 'Monad', 
    logo: '/logos/monad.png',
    website: 'https://monad.xyz',
    twitter: 'https://twitter.com/monad_xyz',
    discord: 'https://discord.gg/monad'
  },
  { 
    name: 'Berachain', 
    logo: '/logos/bera.png',
    website: 'https://berachain.com',
    twitter: 'https://twitter.com/berachain',
    discord: 'https://discord.gg/berachain'
  },
  { 
    name: 'Arbitrum', 
    logo: '/logos/arb.svg',
    website: 'https://arbitrum.io',
    twitter: 'https://twitter.com/arbitrum'
  },
  { 
    name: 'Optimism', 
    logo: '/logos/op.svg',
    website: 'https://optimism.io',
    twitter: 'https://twitter.com/optimism'
  },
  { 
    name: 'Polygon', 
    logo: '/logos/poly.svg',
    website: 'https://polygon.technology',
    twitter: 'https://twitter.com/0xPolygon'
  },
  { 
    name: 'zkSync', 
    logo: '/logos/zk.png',
    website: 'https://zksync.io',
    twitter: 'https://twitter.com/zksync'
  },
  { 
    name: 'Linea', 
    logo: '/logos/linea.svg',
    website: 'https://linea.build',
    twitter: 'https://twitter.com/LineaBuild'
  },
  { 
    name: 'Starknet', 
    logo: '/logos/starknet.svg',
    website: 'https://starknet.io',
    twitter: 'https://twitter.com/Starknet'
  },
];

const categories: QuestCategory[] = ['Social', 'On-Chain', 'Community', 'Testnet', 'DeFi', 'NFT'];
const difficulties: QuestDifficulty[] = ['Easy', 'Medium', 'Hard', 'Expert'];
const statuses: QuestStatus[] = ['Live', 'Hot', 'New', 'Ending Soon'];

const titles = [
  'Complete First Swap', 'Bridge Assets', 'Provide Liquidity', 'Stake Tokens',
  'Join Community', 'Follow on Twitter', 'Share Campaign', 'Mint NFT',
  'Deploy Contract', 'Participate in Governance', 'Test New Feature', 'Refer Friends'
];

// Seeded random number generator for consistent quest generation
function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

// Generate quest steps based on category and difficulty
const generateStepsForQuest = (questId: string, project: typeof projects[0], category: QuestCategory, difficulty: QuestDifficulty): QuestStep[] => {
  const steps: QuestStep[] = [];
  
  // Step 1: Always follow on Twitter
  steps.push({
    id: `${questId}-step-1`,
    title: `Follow @${project.name} on Twitter`,
    description: `Follow the official ${project.name} Twitter account`,
    type: 'twitter',
    verification: { type: 'auto', endpoint: '/api/verify/twitter-follow' },
    status: 'available',
    optional: false,
    points: 50,
  });

  // Step 2: Join Discord (if available)
  if (project.discord) {
    steps.push({
      id: `${questId}-step-2`,
      title: `Join ${project.name} Discord`,
      description: `Join and verify in the ${project.name} Discord server`,
      type: 'discord',
      verification: { type: 'auto', endpoint: '/api/verify/discord-join' },
      status: 'locked',
      optional: false,
      points: 50,
    });
  }

  // Add category-specific steps
  if (category === 'DeFi' || category === 'On-Chain') {
    steps.push({
      id: `${questId}-step-${steps.length + 1}`,
      title: `Add ${project.name} to Wallet`,
      description: `Add the ${project.name} network to your wallet`,
      type: 'onchain',
      verification: { type: 'signature', requireProof: true },
      status: 'locked',
      optional: false,
      points: 100,
    });

    steps.push({
      id: `${questId}-step-${steps.length + 1}`,
      title: 'Complete Transaction',
      description: `Perform a transaction on ${project.name}`,
      type: 'onchain',
      verification: { type: 'auto', endpoint: '/api/verify/transaction', requireProof: true },
      status: 'locked',
      optional: false,
      points: difficulty === 'Expert' ? 200 : difficulty === 'Hard' ? 150 : 100,
    });
  }

  if (category === 'NFT') {
    steps.push({
      id: `${questId}-step-${steps.length + 1}`,
      title: 'Mint NFT',
      description: `Mint an NFT on ${project.name}`,
      type: 'onchain',
      verification: { type: 'auto', endpoint: '/api/verify/nft-mint', requireProof: true },
      status: 'locked',
      optional: false,
      points: 150,
    });
  }

  if (category === 'Community' || category === 'Social') {
    steps.push({
      id: `${questId}-step-${steps.length + 1}`,
      title: 'Share on Twitter',
      description: `Tweet about your experience with #${project.name}Quest`,
      type: 'twitter',
      verification: { type: 'manual' },
      status: 'locked',
      optional: true,
      points: 50,
    });
  }

  return steps;
};

// Generate all quests with seeded randomness for consistency
export const generateAllQuests = (): Quest[] => {
  const quests: Quest[] = [];
  
  for (let i = 0; i < 24; i++) {
    const questId = `quest-${i + 1}`;
    const seed = i + 1000; // Fixed seed for each quest
    
    const project = projects[Math.floor(seededRandom(seed) * projects.length)];
    const category = categories[Math.floor(seededRandom(seed + 1) * categories.length)];
    const difficulty = difficulties[Math.floor(seededRandom(seed + 2) * difficulties.length)];
    const status = statuses[Math.floor(seededRandom(seed + 3) * statuses.length)];
    const title = titles[Math.floor(seededRandom(seed + 4) * titles.length)];
    const xpReward = difficulty === 'Expert' ? 500 : difficulty === 'Hard' ? 300 : difficulty === 'Medium' ? 150 : 50;
    
    const steps = generateStepsForQuest(questId, project, category, difficulty);
    const timeOptions = [5, 10, 15, 20, 30, 45];
    
    quests.push({
      id: questId,
      title: `${title} on ${project.name}`,
      description: `Complete this exciting challenge to earn rewards and build your Web3 reputation in the ${project.name} ecosystem.`,
      longDescription: `Join thousands of early adopters in testing the ${project.name} network! This quest will guide you through various tasks to help you get familiar with the platform.\n\n• Complete social engagement tasks\n• Perform on-chain activities\n• Earn exclusive rewards and badges\n\nBy completing this quest, you'll be among the first to experience ${project.name}'s innovative technology and earn exclusive early adopter rewards.`,
      category,
      difficulty,
      status,
      timeEstimate: timeOptions[Math.floor(seededRandom(seed + 5) * timeOptions.length)],
      xpReward,
      participants: Math.floor(seededRandom(seed + 6) * 50000) + 1000,
      endDate: new Date(Date.now() + seededRandom(seed + 7) * 30 * 24 * 60 * 60 * 1000).toISOString(),
      project,
      rewards: {
        xp: xpReward,
        badges: seededRandom(seed + 8) > 0.5 ? ['Early Adopter'] : undefined,
        tokens: seededRandom(seed + 9) > 0.7 ? { 
          amount: Math.floor(seededRandom(seed + 10) * 100) + 10, 
          symbol: project.name.toUpperCase() 
        } : undefined,
      },
      completionRate: Math.floor(seededRandom(seed + 11) * 100),
      requirements: [
        'Wallet connected',
        `${project.name} network configured`,
        'Minimum 0.01 ETH for gas fees'
      ],
      steps,
      eligibility: {
        minLevel: 1,
        networkRequired: project.name,
      },
    });
  }
  
  return quests;
};

// Get single quest by ID
export const getQuestById = (id: string): Quest | undefined => {
  const allQuests = generateAllQuests();
  return allQuests.find(q => q.id === id);
};

// Export for use in components
export const allQuests = generateAllQuests();