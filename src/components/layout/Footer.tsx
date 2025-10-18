'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Twitter, Github, MessageCircle, ArrowRight } from 'lucide-react';

// --- Footer Links ---
const footerLinks = [
  {
    title: 'Product',
    links: [
      { label: 'Quests', href: '/quests' },
      { label: 'For Builders', href: '/for-builders' },
      { label: 'Analytics', href: '/analytics' },
    ],
  },
  {
    title: 'Ecosystem',
    links: [
      { label: 'Partners', href: '/partners' },
      { label: 'Ambassadors', href: '/ambassadors' },
      { label: 'Community', href: '/community' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Docs', href: '/docs' },
      { label: 'Blog', href: '/blog' },
      { label: 'Brand Kit', href: '/brand' },
    ],
  },
];

// --- Social Links ---
const socialLinks = [
  { name: 'Twitter', icon: <Twitter size={20} />, href: 'https://twitter.com' },
  { name: 'Discord', icon: <MessageCircle size={20} />, href: 'https://discord.com' },
  { name: 'GitHub', icon: <Github size={20} />, href: 'https://github.com' },
];

// --- Footer Component ---
export const Footer = () => {
  return (
    <footer className="bg-black text-white pt-20 pb-12 overflow-hidden relative">
      
      {/* Background Accent */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="w-96 h-96 bg-purple-500 rounded-full blur-3xl absolute top-10 left-1/4 transform -translate-x-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-16 gap-y-12">

          {/* Branding */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="flex items-center">
              <Image 
                src="/actora-logoo.png" 
                alt="Actora Logo" 
                width={140}
                height={40} 
                className="h-10 w-auto" 
              />
            </Link>
            <p className="text-slate-400 text-base leading-relaxed max-w-sm">
              The ultimate platform for explorers, testers, and ecosystem builders in the Web3 space. Join the future.
            </p>

            {/* Mobile Social Links */}
            <div className="flex items-center space-x-5 pt-4 md:hidden">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-purple-400 transition-colors duration-300 transform hover:scale-110"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div className="md:col-span-5 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="font-bold text-slate-200 text-sm tracking-wider uppercase mb-5">{section.title}</h3>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-slate-400 text-[15px] hover:text-purple-400 transition-colors duration-300 relative before:content-[''] before:absolute before:w-0 before:h-px before:bottom-0 before:left-0 before:bg-purple-400 before:transition-all before:duration-300 hover:before:w-full"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="font-bold text-slate-200 text-sm tracking-wider uppercase mb-5">Stay Updated</h3>
            <p className="text-slate-400 text-sm">
              Get the latest news and updates directly to your inbox.
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-slate-800/50 border border-slate-700/50 text-white rounded-lg py-2 pl-4 pr-12 text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-purple-400 hover:text-purple-300 transition-colors duration-300"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

        </div>

        {/* Separator */}
        <div className="mt-16 mb-8 h-px w-full bg-gradient-to-r from-transparent via-slate-700/50 to-transparent"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm text-center md:text-left order-2 md:order-1 mt-6 md:mt-0">
            &copy; {new Date().getFullYear()} Actora Labs, Inc. All rights reserved. 
            <Link href="/privacy" className="ml-4 hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="ml-4 hover:text-slate-400 transition-colors">Terms of Service</Link>
          </p>

          {/* Desktop Social Links */}
          <div className="hidden md:flex items-center space-x-5 order-1 md:order-2">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-purple-400 transition-colors duration-300 transform hover:scale-110"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
