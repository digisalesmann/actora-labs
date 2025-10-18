'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Search, CheckCircle, Gift } from 'lucide-react';

const steps = [
  {
    icon: <Search size={28} className="text-purple-300" />,
    title: 'Discover',
    description: 'Explore a universe of campaigns from top-tier projects and find new ecosystems to join.',
  },
  {
    icon: <CheckCircle size={28} className="text-purple-300" />,
    title: 'Complete',
    description: 'Engage with dApps, complete on-chain and social tasks, and verify your progress seamlessly.',
  },
  {
    icon: <Gift size={28} className="text-purple-300" />,
    title: 'Earn',
    description: 'Claim XP, unlock exclusive rewards, and build your on-chain reputation as a valuable contributor.',
  },
];

export const HowItWorksSection = () => {
  const lineVariants: Variants = {
    hidden: { pathLength: 0 },
    visible: { 
      pathLength: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.3 + 0.5, // Sync delay with line animation
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  };
  
  const nodeVariants: Variants = {
    hidden: { scale: 0 },
    visible: (i: number) => ({
      scale: 1,
      transition: {
        delay: i * 0.3 + 0.5, // Same delay as cards
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    }),
  };

  return (
    <section className="py-24 bg-black text-white relative overflow-hidden">
       {/* Background Grid */}
       <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] opacity-50"></div>
       {/* Background Glow */}
       <div className="absolute top-1/4 left-1/2 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl -translate-x-1/2 -z-10 animate-pulse"></div>
       
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.h2
          className="text-4xl font-bold tracking-tight sm:text-5xl mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          Start Your Journey in Minutes
        </motion.h2>

        <div className="relative">
          {/* SVG Line for Desktop */}
          <motion.svg
            className="absolute top-8 left-1/2 h-full w-auto hidden md:block"
            width="200"
            height="600"
            viewBox="0 0 200 600"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.path
              d="M 100 0 V 100 L 50 200 V 300 L 150 400 V 500 L 100 600"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              variants={lineVariants}
            />
            <defs>
              <linearGradient id="gradient" gradientTransform="rotate(90)">
                <stop offset="0%" stopColor="rgba(168, 85, 247, 0)" />
                <stop offset="50%" stopColor="rgba(168, 85, 247, 1)" />
                <stop offset="100%" stopColor="rgba(168, 85, 247, 0)" />
              </linearGradient>
            </defs>
          </motion.svg>
          
          {/* Vertical Line for Mobile */}
          <div className="md:hidden absolute top-0 bottom-0 left-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-transparent via-purple-500 to-transparent"></div>


          <div className="space-y-20 md:space-y-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start even:md:justify-end text-center md:text-left md:min-h-[250px]"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
              >
                {/* Mobile timeline node */}
                <motion.div 
                  className="md:hidden absolute top-0 left-4 w-4 h-4 -translate-x-1/2 bg-purple-500 rounded-full border-2 border-slate-800"
                  variants={nodeVariants}
                ></motion.div>

                <div className="md:w-5/12 even:md:order-last pl-12 md:pl-0">
                  <motion.div 
                    className="group relative w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:border-purple-500/80 hover:bg-slate-900"
                    variants={cardVariants}
                  >
                    <div className="absolute -inset-px bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex flex-col items-center text-center md:items-start md:text-left">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-purple-900/50 border border-purple-500/50 shadow-inner shadow-black">
                            {step.icon}
                        </div>
                        <h3 className="mb-2 text-2xl font-bold text-white">{step.title}</h3>
                        <p className="text-slate-400">{step.description}</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

