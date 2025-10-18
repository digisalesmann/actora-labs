'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { ReactNode, useState, useRef, useEffect } from 'react'

interface MenuItem {
  title: string
  description: string
  icon: ReactNode
  link: string
}

export default function HeaderDropdown({ // <-- Make sure 'default' is here
  label,
  menuItems,
}: {
  label: string
  menuItems: MenuItem[]
}) {
  const [open, setOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleMouseEnter = () => {
    if (!isMobile) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      setOpen(true)
    }
  }

  const handleMouseLeave = () => {
    if (!isMobile) {
      timeoutRef.current = setTimeout(() => setOpen(false), 200)
    }
  }

  const handleClick = () => {
    if (isMobile) {
      setOpen((prev) => !prev)
    }
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={handleClick}
        className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-300 text-[15px]"
      >
        {label}
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${
            open ? 'rotate-180 text-purple-400' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="header-dropdown"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[400px] bg-black/40 border border-white/10 rounded-2xl shadow-2xl p-4 z-50 backdrop-blur-xl"
          >
            <div className="space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.link}
                  className="group flex items-start gap-4 hover:bg-white/5 p-3 rounded-xl transition-all duration-300"
                  onClick={() => isMobile && setOpen(false)}
                >
                  <div className="mt-1 text-purple-400 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{item.title}</p>
                    <p className="text-gray-400 text-xs leading-snug mt-1">
                      {item.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}