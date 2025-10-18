'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, X, ChevronDown, ChevronUp, Rocket, Layers, BarChart3, Flame, Users, Network, Briefcase, BookOpen } from 'lucide-react'
import HeaderDropdown from './HeaderDropdown'
import { motion, AnimatePresence } from 'framer-motion'

// --- Navigation Data ---
const productMenu = [
    { title: 'Quest', description: 'Launch on-chain campaigns and rewards', icon: <Rocket size={20} />, link: '/product/quest' },
    { title: 'Launchpad', description: 'Token launch toolkit for web3 creators', icon: <Layers size={20} />, link: '/product/launchpad' },
    { title: 'Analytics', description: 'Track campaign insights and performance', icon: <BarChart3 size={20} />, link: '/product/analytics' },
]
const exploreMenu = [
    { title: 'Trending Campaigns', description: 'Discover what’s buzzing on Actora', icon: <Flame size={20} />, link: '/explore/trending' },
    { title: 'Top Creators', description: 'View high-performing campaign creators', icon: <Users size={20} />, link: '/explore/creators' },
]
const ecosystemMenu = [
    { title: 'Actora Gravity', description: 'Connect & grow your web3 community', icon: <Network size={20} />, link: '/ecosystem/gravity' },
    { title: 'Ambassadors', description: 'Become a voice for the Actora ecosystem', icon: <Users size={20} />, link: '/ecosystem/ambassadors' },
]
const companyMenu = [
    { title: 'About Us', description: 'The story and team behind Actora', icon: <BookOpen size={20} />, link: '/company/about' },
    { title: 'Careers', description: 'Join our team and build the future', icon: <Briefcase size={20} />, link: '/company/careers' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto'
  }, [menuOpen])

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const navLinks = [
      { label: 'Product', items: productMenu },
      { label: 'Explore', items: exploreMenu },
      { label: 'Ecosystem', items: ecosystemMenu },
      { label: 'Company', items: companyMenu },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${ scrolled ? 'bg-black/50 border-b border-white/10 shadow-lg backdrop-blur-xl' : 'bg-transparent' }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        
        <Link href="/" className="flex-shrink-0">
          <div className="relative h-12 w-36 md:h-14 md:w-44">
            <Image src="/actora-logoo.png" alt="Actora Logo" fill className="object-contain" priority />
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <HeaderDropdown label="Product" menuItems={productMenu} />
          <HeaderDropdown label="Explore" menuItems={exploreMenu} />
          <HeaderDropdown label="Ecosystem" menuItems={ecosystemMenu} />
          <HeaderDropdown label="Company" menuItems={companyMenu} />
        </nav>

        {/* STYLES UPDATED HERE */}
        <div className="hidden md:flex items-center space-x-2">
          <Link 
            href="/signin" 
            className="border border-transparent text-gray-300 hover:text-white hover:border-gray-700 px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300"
          >
            Sign In
          </Link>
          <Link 
            href="/signup" 
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
          >
            Sign Up
          </Link>
        </div>

        {/* BUG FIXED HERE */}
        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu (No changes needed here) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-[#0c021f] text-white p-4 flex flex-col h-screen"
          >
            <div className="flex justify-between items-center mb-6">
              <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center"><div className="relative h-12 w-36"><Image src="/actora-logoo.png" alt="Actora Logo" fill className="object-contain" priority /></div></Link>
              <button onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={28} /></button>
            </div>
            
            <nav className="flex-grow overflow-y-auto">
              <div className="flex flex-col gap-2">
                {navLinks.map(({ label, items }) => {
                   const isOpen = openDropdown === label;
                   return (
                     <div key={label} className="border-b border-white/10 last:border-b-0">
                        <button onClick={() => toggleDropdown(label)} className="w-full flex justify-between items-center py-4 text-lg font-semibold">
                           {label}
                           {isOpen ? <ChevronUp size={20} className="text-purple-400" /> : <ChevronDown size={20} className="text-gray-500" />}
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              key={`${label}-dropdown`}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                               <div className="flex flex-col gap-2 pt-2 pb-4 pl-4">
                                {items.map(({ title, link, icon }) => (
                                    <Link key={title} href={link} onClick={() => setMenuOpen(false)} className="flex items-center gap-4 py-2 rounded text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
                                        <span className="text-purple-400">{icon}</span>
                                        <span>{title}</span>
                                    </Link>
                                ))}
                               </div>
                            </motion.div>
                           )}
                         </AnimatePresence>
                     </div>
                   );
                })}
              </div>
            </nav>

            <div className="mt-auto pt-6 flex flex-col gap-4">
              <Link href="/signin" onClick={() => setMenuOpen(false)} className="block w-full border border-purple-500 hover:bg-purple-500/20 transition text-center py-3 rounded-full font-medium">
                Sign In
              </Link>
              <Link href="/signup" onClick={() => setMenuOpen(false)} className="block w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition text-center py-3 rounded-full font-medium">
                Sign Up
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}