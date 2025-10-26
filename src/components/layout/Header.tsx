'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, X, ChevronDown, ChevronUp, Rocket, Layers, BarChart3, Flame, Users, Network, Briefcase, BookOpen } from 'lucide-react'
import HeaderDropdown from './HeaderDropdown'
import { motion, AnimatePresence } from 'framer-motion'
import { ConnectButton } from '@rainbow-me/rainbowkit'

// --- Navigation Data ---
const productMenu = [
    { title: 'Quest', description: 'Launch on-chain campaigns and rewards', icon: <Rocket size={20} />, link: '/product/quest' },
    { title: 'Launchpad', description: 'Token launch toolkit for web3 creators', icon: <Layers size={20} />, link: '/product/launchpad' },
    { title: 'Analytics', description: 'Track campaign insights and performance', icon: <BarChart3 size={20} />, link: '/product/analytics' },
]
const exploreMenu = [
    { title: 'Trending Campaigns', description: 'Discover what is buzzing on Actora', icon: <Flame size={20} />, link: '/explore/trending' },
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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto'
  }, [menuOpen])

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label)
  }

  const navLinks = [
      { label: 'Product', items: productMenu },
      { label: 'Explore', items: exploreMenu },
      { label: 'Ecosystem', items: ecosystemMenu },
      { label: 'Company', items: companyMenu },
  ]

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

        {/* WALLET CONNECT BUTTON - DESKTOP */}
        <div className="hidden md:flex items-center">
          {mounted && (
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                mounted: buttonMounted,
              }) => {
                const ready = buttonMounted
                const connected = ready && account && chain

                return (
                  <div
                    {...(!ready && {
                      'aria-hidden': true,
                      style: {
                        opacity: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <button
                            onClick={openConnectModal}
                            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
                          >
                            Connect Wallet
                          </button>
                        )
                      }

                      if (chain.unsupported) {
                        return (
                          <button
                            onClick={openChainModal}
                            className="bg-red-600 text-white px-6 py-2.5 rounded-full text-sm font-medium"
                          >
                            Wrong network
                          </button>
                        )
                      }

                      return (
                        <div className="flex items-center gap-3">
                          <button
                            onClick={openChainModal}
                            className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm font-medium text-white hover:bg-white/10 transition-colors"
                          >
                            {chain.hasIcon && (
                              <div
                                style={{
                                  background: chain.iconBackground,
                                  width: 20,
                                  height: 20,
                                  borderRadius: 999,
                                  overflow: 'hidden',
                                }}
                              >
                                {chain.iconUrl && (
                                  <Image
                                    alt={chain.name ?? 'Chain icon'}
                                    src={chain.iconUrl}
                                    width={20}
                                    height={20}
                                  />
                                )}
                              </div>
                            )}
                            {chain.name}
                          </button>

                          <button
                            onClick={openAccountModal}
                            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
                          >
                            {account.displayName}
                          </button>
                        </div>
                      )
                    })()}
                  </div>
                )
              }}
            </ConnectButton.Custom>
          )}
          {!mounted && (
            <div className="h-10 w-36 bg-white/5 rounded-full animate-pulse" />
          )}
        </div>

        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
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
              <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center">
                <div className="relative h-12 w-36">
                  <Image src="/actora-logoo.png" alt="Actora Logo" fill className="object-contain" priority />
                </div>
              </Link>
              <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <X size={28} />
              </button>
            </div>
            
            <nav className="flex-grow overflow-y-auto">
              <div className="flex flex-col gap-2">
                {navLinks.map(({ label, items }) => {
                   const isOpen = openDropdown === label
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
                   )
                })}
              </div>
            </nav>

            {/* WALLET CONNECT BUTTON - MOBILE */}
            <div className="mt-auto pt-6">
              {mounted && (
                <ConnectButton.Custom>
                  {({ account, chain, openConnectModal, openAccountModal, mounted: buttonMounted }) => {
                    const ready = buttonMounted
                    const connected = ready && account && chain
                    
                    return connected ? (
                      <button
                        onClick={openAccountModal}
                        className="block w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition text-center py-3 rounded-full font-medium"
                      >
                        {account.displayName}
                      </button>
                    ) : (
                      <button
                        onClick={openConnectModal}
                        className="block w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition text-center py-3 rounded-full font-medium"
                      >
                        Connect Wallet
                      </button>
                    )
                  }}
                </ConnectButton.Custom>
              )}
              {!mounted && (
                <div className="h-12 w-full bg-white/5 rounded-full animate-pulse" />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}