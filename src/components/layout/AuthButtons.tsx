// src/components/layout/AuthButtons.tsx
'use client'

import { useSession, signOut } from 'next-auth/react'
import { useAccount, useDisconnect } from 'wagmi'
import { Wallet, LogOut, User, Zap, Mail, Twitter, Disc } from 'lucide-react'
import Link from 'next/link'

// Using shadcn/ui components (assuming you have them)
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
// You will need to create this Modal component
import { AuthModal } from '@/components/auth/AuthModal' 

const truncateAddress = (address: string) => 
  `${address.slice(0, 6)}...${address.slice(-4)}`;

export const AuthButtons = () => {
  const { data: session } = useSession() // From NextAuth
  const { address, isConnected } = useAccount() // From Wagmi/Web3

  // The primary authenticated user is the one with a NextAuth session.
  // We prioritize the Social/Email session, but fall back to a connected wallet address.
  const isAuthenticated = !!session?.user || isConnected;
  
  // Display name preference: Social Name > Email Name > Truncated Address
  const displayName = session?.user?.name || (isConnected && address ? truncateAddress(address) : 'Guest');
  const userAddress = isConnected ? address : null;

  if (isAuthenticated) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="rounded-full px-4 py-2 text-white border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
          >
            <User size={18} className="mr-2 text-purple-400" />
            {displayName}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-black/80 border-white/20 backdrop-blur-md" align="end">
          <DropdownMenuLabel className="text-white">
            <span className="font-semibold">{displayName}</span>
            {userAddress && <p className="text-xs text-gray-400">{truncateAddress(userAddress)}</p>}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-white/10" />
          <DropdownMenuItem asChild>
            <Link href="/profile" className="cursor-pointer text-gray-300 hover:text-white">
              <User size={18} className="mr-2" />
              My Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings" className="cursor-pointer text-gray-300 hover:text-white">
              <Zap size={18} className="mr-2" />
              My XP & Rewards
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-white/10" />
          <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-red-400 hover:bg-red-900/10">
            <LogOut size={18} className="mr-2" />
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  // Not authenticated, show the Connect button which opens the modal
  return <AuthModal />;
}