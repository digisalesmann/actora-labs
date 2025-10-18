'use client';

import { motion, Variants } from 'framer-motion';
// The import for 'next/link' is removed to resolve the build error.
// import Link from 'next/link'; 
import React, { useState, useEffect } from 'react';
import { ArrowRight, Code } from 'lucide-react';

// A custom hook to get mouse position
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return mousePosition;
};

// The main Hero Section Component
export const HeroSection = () => {
  const { x, y } = useMousePosition();
  const [orbTransform, setOrbTransform] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const dx = x - window.innerWidth / 2;
      const dy = y - window.innerHeight / 2;
      const tiltX = dy / window.innerHeight * -20;
      const tiltY = dx / window.innerWidth * 20;
      setOrbTransform(`perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`);
    }
  }, [x, y]);

  // Explicitly type the variants with Variants from framer-motion to fix the type error
  const FADE_UP_ANIMATION_VARIANTS: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <section className="relative w-full h-[90vh] min-h-[700px] flex items-center justify-center overflow-hidden bg-black px-4">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px]"></div>

      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-600/40 rounded-full blur-3xl animate-blob -z-10"></div>
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-indigo-600/40 rounded-full blur-3xl animate-blob animation-delay-4000 -z-10"></div>

      {/* Interactive Orb */}
      <motion.div
        className="absolute inset-0 z-10 hidden md:flex items-center justify-center"
        style={{ transform: orbTransform }}
      >
        <div className="relative w-72 h-72">
          <div className="absolute inset-0 border-2 border-purple-400/30 rounded-full animate-spin-slow"></div>
          <div className="absolute inset-4 border-2 border-indigo-400/30 rounded-full animate-spin-slow-reverse"></div>
          <div className="absolute inset-8 bg-purple-900/20 rounded-full shadow-inner shadow-black"></div>
          <div className="absolute inset-12 bg-black rounded-full flex items-center justify-center">
             <div className="w-8 h-8 bg-purple-500 rounded-full blur-lg shadow-[0_0_20px_theme(colors.purple.500)]"></div>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial="hidden"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
        className="relative z-20 flex flex-col items-center text-center"
      >
        <motion.h1 
          className="text-4xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400 animate-gradient-text"
          variants={FADE_UP_ANIMATION_VARIANTS}
        >
          The XP Layer for Web3
        </motion.h1>

        <motion.p 
          className="mt-6 max-w-xl text-lg text-slate-300"
          variants={FADE_UP_ANIMATION_VARIANTS}
        >
          Discover dApps, complete quests, and earn XP. The ultimate platform for explorers, testers, and ecosystem builders.
        </motion.p>

        <motion.div 
          className="mt-8 flex flex-col sm:flex-row items-center gap-4"
          variants={FADE_UP_ANIMATION_VARIANTS}
        >
          {/* The <Link> component is removed and href is added directly to motion.a */}
          <motion.a 
            href="/quests"
            className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full shadow-lg transition-all duration-300 hover:shadow-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Quests
            <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.a>
          
          {/* The <Link> component is removed and href is added directly to motion.a */}
          <motion.a 
            href="/for-builders"
            className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-slate-300 bg-black/50 border border-slate-700 rounded-full shadow-lg transition-all duration-300 hover:border-slate-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-black"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            For Builders
            <Code className="w-5 h-5 ml-2" />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

