import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Optional cleanup (only use in dev)
  await prisma.stepCompletion.deleteMany();
  await prisma.questCompletion.deleteMany();
  await prisma.questStep.deleteMany();
  await prisma.quest.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();

  // Create demo user
  const user = await prisma.user.create({
    data: {
      walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
      username: 'victor_dev',
      email: 'victor@example.com',
      totalXP: 0,
      level: 1,
    },
  });
  console.log('👤 Created demo user:', user.username);

  // Create project
  const project = await prisma.project.create({
    data: {
      name: 'Monad',
      logo: '/logos/monad.png',
      website: 'https://monad.xyz',
      twitter: 'https://twitter.com/monad_xyz',
      discord: 'https://discord.gg/monad',
    },
  });
  console.log('🏗️ Created project:', project.name);

  // Create quest linked to project
  const quest = await prisma.quest.create({
    data: {
      title: 'Complete First Swap on Monad',
      description: 'Perform your first token swap on Monad testnet.',
      longDescription:
        'Join thousands of early adopters exploring Monad Testnet. Perform your first DeFi swap and learn how to interact with decentralized exchanges on Monad.',
      category: 'DeFi',
      difficulty: 'Medium',
      totalXP: 500,
      tokenReward: { amount: 100, symbol: 'MON' },
      timeEstimate: '15-20 minutes',
      participants: 0,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      requirements: ['Wallet connected', 'Monad testnet added'],
      eligibility: { minLevel: 1 },
      featured: true,
      project: {
        connect: { id: project.id },
      },
      steps: {
        create: [
          {
            order: 1,
            title: 'Follow @monad_xyz on Twitter',
            description: 'Follow Monad’s official Twitter account.',
            type: 'twitter',
            verificationType: 'auto',
            endpoint: '/api/verify/twitter-follow',
            requireProof: false,
            optional: false,
            points: 50,
          },
          {
            order: 2,
            title: 'Join Monad Discord',
            description: 'Join the official Monad Discord server.',
            type: 'discord',
            verificationType: 'auto',
            endpoint: '/api/verify/discord-join',
            requireProof: false,
            optional: false,
            points: 50,
          },
          {
            order: 3,
            title: 'Perform a Swap',
            description: 'Execute a swap on Monad DEX.',
            type: 'onchain',
            verificationType: 'auto',
            endpoint: '/api/verify/swap-transaction',
            requireProof: true,
            optional: false,
            points: 400,
          },
        ],
      },
    },
  });

  console.log('🎯 Created quest with steps:', quest.title);
  console.log('✅ Seeding completed successfully!');
}

main()
  .catch((error) => {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
