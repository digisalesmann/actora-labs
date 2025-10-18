'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link'; // FIX: Using Next.js Link for client-side navigation
import Image from 'next/image'; // FIX: Using Next.js Image for optimization

// Define the types for our quest data
export interface QuestWithProject {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  project: {
    name: string;
    logoUrl: string;
  };
}

// MOCK DATA with updated logo URLs
const featuredQuests: QuestWithProject[] = [
  {
    id: '1',
    title: 'Engage with Monad on X',
    description: 'Follow, like, and retweet the latest announcement to earn exclusive early access XP.',
    xpReward: 150,
    project: { name: 'Monad', logoUrl: '/logos/monad.png' },
  },
  {
    id: '2',
    title: 'Swap on Berachain Testnet',
    description: 'Perform a token swap on the Berachain Artio Testnet and submit the transaction hash.',
    xpReward: 250,
    project: { name: 'Berachain', logoUrl: '/logos/bera.png' }, // Assuming a logo file
  },
  {
    id: '3',
    title: 'Join the Arbitrum Guild',
    description: 'Become a member of the official Arbitrum Guild and claim your designated role.',
    xpReward: 100,
    project: { name: 'Arbitrum', logoUrl: '/logos/arb.svg' },
  },
];

// Rebuilt, professional Quest Card component
const QuestCard = ({ quest }: { quest: QuestWithProject }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
      }}
      className="group relative w-full h-full bg-slate-900/50 border border-slate-800 rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:border-purple-500/80 hover:bg-slate-900"
    >
      {/* Glow effect on hover */}
      <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15)_0,transparent_30%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center mb-4">
          {/* FIX: Replaced <img> with optimized Next.js Image component */}
          <Image
            src={quest.project.logoUrl}
            alt={`${quest.project.name} logo`}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full mr-4 object-contain bg-black/50 p-1"
          />
          <span className="font-semibold text-slate-300">{quest.project.name}</span>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2">{quest.title}</h3>
        <p className="text-slate-400 text-sm flex-grow mb-6">{quest.description}</p>
        
        <div className="flex justify-between items-center mt-auto">
          <div className="px-4 py-1 bg-purple-600/20 border border-purple-500/50 rounded-full">
            <span className="font-bold text-purple-300">{quest.xpReward} XP</span>
          </div>
          {/* FIX: Replaced <a> with <Link> for proper navigation */}
          <Link href={`/quests/${quest.id}`} className="flex items-center text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">
            Start Quest <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};


export const FeaturedQuestsSection = () => {
  return (
    <section className="py-24 bg-black text-white relative overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute inset-x-0 top-0 h-[500px] -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Trending Quests
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
            Jump into the latest and most popular campaigns from across the ecosystem.
          </p>
        </motion.div>

        <motion.div 
          className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.2 }}
        >
          {featuredQuests.map((quest) => (
            <QuestCard key={quest.id} quest={quest} />
          ))}
        </motion.div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {/* FIX: Replaced <a> and <button> with a single <Link> component styled as a button */}
          <Link href="/quests" className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full shadow-lg transition-all duration-300 hover:shadow-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black">
            Explore All Quests
            <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

