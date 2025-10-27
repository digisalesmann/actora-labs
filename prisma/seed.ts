import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const quest = await prisma.quest.create({
    data: {
      title: 'Complete First Swap on Monad',
      description: 'Perform your first token swap on Monad testnet',
      longDescription: 'Join thousands of early adopters...',
      project: {
        name: 'Monad',
        logo: '/logos/monad.png',
        website: 'https://monad.xyz',
        twitter: 'https://twitter.com/monad_xyz',
        discord: 'https://discord.gg/monad'
      },
      category: 'DeFi',
      difficulty: 'Medium',
      totalXP: 500,
      timeEstimate: '15-20 minutes',
      participants: 0,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      requirements: ['Wallet connected', 'Monad testnet added'],
      eligibility: { minLevel: 1 },
      steps: {
        create: [
          {
            order: 1,
            title: 'Follow @monad_xyz on Twitter',
            description: 'Follow the official Monad Twitter account',
            type: 'twitter',
            verificationType: 'auto',
            endpoint: '/api/verify/twitter-follow',
            requireProof: false,
            optional: false,
            points: 50
          },
          {
            order: 2,
            title: 'Join Monad Discord',
            description: 'Join the Monad Discord community',
            type: 'discord',
            verificationType: 'auto',
            endpoint: '/api/verify/discord-join',
            requireProof: false,
            optional: false,
            points: 50
          },
          {
            order: 3,
            title: 'Perform a Swap',
            description: 'Complete a token swap on the Monad DEX',
            type: 'onchain',
            verificationType: 'auto',
            endpoint: '/api/verify/swap-transaction',
            requireProof: true,
            optional: false,
            points: 400
          }
        ]
      }
    }
  });

  console.log('Created quest:', quest);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });