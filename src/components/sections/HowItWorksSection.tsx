'use client';

import React from 'react';
import { Search, CheckCircle, Gift } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Discover',
    description: 'Explore a universe of campaigns from top-tier projects and find new ecosystems to join.',
  },
  {
    icon: CheckCircle,
    title: 'Complete',
    description: 'Engage with dApps, complete on-chain and social tasks, and verify your progress seamlessly.',
  },
  {
    icon: Gift,
    title: 'Earn',
    description: 'Claim XP, unlock exclusive rewards, and build your on-chain reputation as a valuable contributor.',
  },
];

export const HowItWorksSection = () => {
  return (
    <section className="py-16 md:py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_rgba(124,58,237,0.05),transparent_50%)]"></div>
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:36px_36px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3 md:mb-4">
            Start Your Journey in Minutes
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Three simple steps to unlock rewards and build your Web3 reputation
          </p>
        </div>

        <div className="relative">
          {/* Desktop SVG Path */}
          <svg
            className="absolute top-8 left-1/2 -translate-x-1/2 h-full w-auto hidden md:block pointer-events-none"
            width="200"
            height="600"
            viewBox="0 0 200 600"
            style={{ zIndex: 1 }}
          >
            <defs>
              <linearGradient id="pathGradient" gradientTransform="rotate(90)">
                <stop offset="0%" stopColor="rgba(168, 85, 247, 0)" />
                <stop offset="50%" stopColor="rgba(168, 85, 247, 0.8)" />
                <stop offset="100%" stopColor="rgba(168, 85, 247, 0)" />
              </linearGradient>
            </defs>
            <path
              d="M 100 0 V 100 L 50 200 V 300 L 150 400 V 500 L 100 600"
              fill="none"
              stroke="url(#pathGradient)"
              strokeWidth="2"
              className="animate-pulse"
              style={{ animationDuration: '3s' }}
            />
            {/* Node circles on desktop */}
            <circle cx="100" cy="100" r="8" fill="#a855f7" opacity="0.8" />
            <circle cx="50" cy="300" r="8" fill="#a855f7" opacity="0.8" />
            <circle cx="150" cy="500" r="8" fill="#a855f7" opacity="0.8" />
          </svg>
          
          {/* Mobile Vertical Line */}
          <div className="md:hidden absolute top-0 bottom-0 left-6 w-0.5 bg-gradient-to-b from-transparent via-purple-500 to-transparent" style={{ zIndex: 1 }}></div>

          {/* Steps */}
          <div className="space-y-8 md:space-y-0">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isEven = i % 2 === 1;
              
              return (
                <div
                  key={step.title}
                  className={`relative z-10 flex flex-col md:flex-row items-start md:items-center ${
                    isEven ? 'md:justify-end' : 'md:justify-start'
                  } md:min-h-[220px]`}
                >
                  {/* Mobile timeline node */}
                  <div className="md:hidden absolute top-4 left-6 w-3 h-3 -translate-x-1/2 bg-purple-500 rounded-full border-2 border-slate-950 shadow-lg shadow-purple-500/50"></div>

                  {/* Card Container */}
                  <div className={`md:w-5/12 w-full pl-10 md:pl-0 ${isEven ? 'md:order-last' : ''}`}>
                    <div className="group relative w-full bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-5 sm:p-6 overflow-hidden transition-all duration-300 hover:border-purple-500/60 hover:bg-slate-900/70 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
                      {/* Gradient overlay on hover */}
                      <div className="absolute -inset-px bg-gradient-to-br from-purple-500/20 via-indigo-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                      
                      {/* Content */}
                      <div className="relative flex flex-col">
                        {/* Step number badge */}
                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-xs font-bold shadow-lg">
                          {i + 1}
                        </div>

                        {/* Icon */}
                        <div className="mb-4 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-900/60 to-indigo-900/60 border border-purple-500/40 shadow-lg shadow-purple-500/20 group-hover:scale-110 group-hover:shadow-purple-500/40 transition-all duration-300">
                          <Icon size={24} className="text-purple-300 group-hover:text-purple-200 transition-colors" />
                        </div>

                        {/* Text */}
                        <h3 className="mb-2 text-xl sm:text-2xl font-bold text-white group-hover:text-purple-100 transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-slate-400 text-sm sm:text-base leading-relaxed group-hover:text-slate-300 transition-colors">
                          {step.description}
                        </p>

                        {/* Decorative corner accent */}
                        <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-purple-500/10 to-transparent rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-indigo-500/10 to-transparent rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA or stats (optional) */}
        <div className="mt-16 md:mt-20 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-6 sm:gap-8 px-6 py-4 rounded-2xl bg-slate-900/30 border border-slate-800/50 backdrop-blur-sm">
            <div className="flex flex-col items-center">
              <div className="text-2xl sm:text-3xl font-bold text-purple-400">500+</div>
              <div className="text-xs sm:text-sm text-slate-500">Active Campaigns</div>
            </div>
            <div className="h-8 w-px bg-slate-800"></div>
            <div className="flex flex-col items-center">
              <div className="text-2xl sm:text-3xl font-bold text-purple-400">100K+</div>
              <div className="text-xs sm:text-sm text-slate-500">Users Earning</div>
            </div>
            <div className="h-8 w-px bg-slate-800"></div>
            <div className="flex flex-col items-center">
              <div className="text-2xl sm:text-3xl font-bold text-purple-400">$10M+</div>
              <div className="text-xs sm:text-sm text-slate-500">Rewards Distributed</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};