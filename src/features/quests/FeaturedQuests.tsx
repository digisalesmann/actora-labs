'use client';

import React from 'react';
import { ArrowRight, Sparkles, Trophy, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export interface QuestWithProject {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  participants: number;
  project: {
    name: string;
    logoUrl: string;
  };
}

const featuredQuests: QuestWithProject[] = [
  {
    id: '1',
    title: 'Engage with Monad on X',
    description: 'Follow, like, and retweet the latest announcement to earn exclusive early access XP.',
    xpReward: 150,
    difficulty: 'Easy',
    participants: 12453,
    project: { name: 'Monad', logoUrl: '/logos/monad.png' },
  },
  {
    id: '2',
    title: 'Swap on Berachain Testnet',
    description: 'Perform a token swap on the Berachain Artio Testnet and submit the transaction hash.',
    xpReward: 250,
    difficulty: 'Medium',
    participants: 8721,
    project: { name: 'Berachain', logoUrl: '/logos/bera.png' },
  },
  {
    id: '3',
    title: 'Join the Arbitrum Guild',
    description: 'Become a member of the official Arbitrum Guild and claim your designated role.',
    xpReward: 100,
    difficulty: 'Easy',
    participants: 15892,
    project: { name: 'Arbitrum', logoUrl: '/logos/arb.svg' },
  },
];

const difficultyConfig = {
  Easy: { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  Medium: { color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  Hard: { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' },
};

const QuestCard = ({ quest, index }: { quest: QuestWithProject; index: number }) => {
  const diffStyle = difficultyConfig[quest.difficulty];
  
  return (
    <div
      className="group relative w-full h-full bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden transition-all duration-500 hover:border-purple-500/60 hover:bg-slate-900/60 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Glow effect */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative z-10 p-6 flex flex-col h-full">
        {/* Header with logo and project name */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-xl bg-slate-950 border border-slate-700 p-2 group-hover:border-purple-500/50 transition-colors duration-300 overflow-hidden">
              <Image
                src={quest.project.logoUrl}
                alt={`${quest.project.name} logo`}
                width={28}
                height={28}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-semibold text-slate-200 group-hover:text-white transition-colors">
              {quest.project.name}
            </span>
          </div>
          
          {/* Trending badge */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-xs font-medium text-purple-300">Hot</span>
          </div>
        </div>
        
        {/* Quest title */}
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-purple-100 transition-colors line-clamp-2">
          {quest.title}
        </h3>
        
        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed flex-grow mb-5 line-clamp-2 group-hover:text-slate-300 transition-colors">
          {quest.description}
        </p>
        
        {/* Stats row */}
        <div className="flex items-center gap-4 mb-5 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5" />
            <span>{quest.participants.toLocaleString()} joined</span>
          </div>
          <div className={`px-2 py-0.5 rounded-full ${diffStyle.bg} border ${diffStyle.border}`}>
            <span className={`font-medium ${diffStyle.color}`}>{quest.difficulty}</span>
          </div>
        </div>
        
        {/* Footer with XP and CTA */}
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-800 group-hover:border-slate-700 transition-colors">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/40 rounded-lg group-hover:border-purple-400/60 transition-colors">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="font-bold text-purple-300">{quest.xpReward} XP</span>
          </div>
          
          <Link 
            href={`/quests/${quest.id}`} 
            className="flex items-center gap-1.5 text-sm font-semibold text-slate-300 group-hover:text-purple-400 transition-colors"
          >
            Start Quest
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
};

export const FeaturedQuestsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_rgba(124,58,237,0.05),transparent_50%)]"></div>
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:36px_36px]"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">Most Popular</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white">
              Trending Quests
            </span>
          </h2>
          
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-400">
            Jump into the latest and most popular campaigns from across the ecosystem
          </p>
        </div>

        {/* Quest Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12 md:mb-16">
          {featuredQuests.map((quest, index) => (
            <QuestCard key={quest.id} quest={quest} index={index} />
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link 
            href="/quests" 
            className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base sm:text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            <span className="relative z-10">Explore All Quests</span>
            <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            
            {/* Button glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
          </Link>
          
          {/* Stats below button */}
          <div className="mt-8 flex items-center justify-center gap-8 text-sm text-slate-500">
            <div>
              <span className="font-bold text-xl text-purple-400">500+</span>
              <span className="ml-1">Active Quests</span>
            </div>
            <div className="h-4 w-px bg-slate-800"></div>
            <div>
              <span className="font-bold text-xl text-purple-400">100K+</span>
              <span className="ml-1">Participants</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};