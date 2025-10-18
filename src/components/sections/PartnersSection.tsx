'use client';

import React from 'react';
import { motion } from 'framer-motion';
// 1. Re-enable the import for next/image
import Image from 'next/image';

// Your partner logos array is already correct with the leading "/"
const partnerLogos = [
  { name: 'Arbitrum', logoUrl: '/logos/arb.svg' },
  { name: 'Optimism', logoUrl: '/logos/op.svg' },
  { name: 'Polygon', logoUrl: '/logos/poly.svg' },
  { name: 'Chainlink', logoUrl: '/logos/chain.svg' },
  { name: 'Monad', logoUrl: '/logos/monad.png' },
  { name: 'Avalanche', logoUrl: '/logos/ava.svg' },
  { name: 'Ethereum', logoUrl: '/logos/eth.svg' },
];

export const PartnersSection = () => {
  const duplicatedLogos = [...partnerLogos, ...partnerLogos];

  return (
    <section className="pb-24 bg-black text-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 w-[60rem] h-[60rem] bg-purple-900/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 -z-10"></div>

      <div className="max-w-7xl mx-auto text-center px-4">
        <motion.h3
          className="mb-16 text-sm font-semibold tracking-widest uppercase text-slate-400"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          Trusted by the World&apos;s Leading Web3 Ecosystems
        </motion.h3>

        <div className="relative group w-full"
             style={{
               maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
               WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
             }}
        >
          <div className="relative overflow-hidden w-full">
            <motion.div
              className="flex items-center whitespace-nowrap group-hover:[animation-play-state:paused]"
              animate={{ x: ['0%', '-100%'] }}
              transition={{
                ease: 'linear',
                duration: 40,
                repeat: Infinity,
              }}
            >
              {duplicatedLogos.map((partner, index) => (
                <div key={index} className="flex-shrink-0 mx-16 flex items-center justify-center h-32">
                  {/* 2. Replace <img> with <Image> and add required props */}
                  <Image
                    src={partner.logoUrl}
                    alt={`${partner.name} logo`}
                    width={160} // 3. Add a width (adjust as needed for aspect ratio)
                    height={64}  // 4. Add a height (h-16 is 64px)
                    className="object-contain w-auto h-16 transition-all duration-300 opacity-80 hover:opacity-100 hover:scale-110"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
