'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Wallet, Mail, Twitter, Disc } from 'lucide-react'

export const AuthModal = () => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="rounded-full px-5 py-2 text-white bg-purple-600 hover:bg-purple-700 transition-colors"
        >
          Connect
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-[#0c021f] text-white border border-white/10 p-6 max-w-sm rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            Sign In or Connect Wallet
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 flex flex-col gap-3">
          <Button className="bg-white/10 hover:bg-white/20 text-white w-full justify-center">
            <Wallet className="mr-2" /> Connect Wallet
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full justify-center">
            <Twitter className="mr-2" /> Continue with Twitter
          </Button>
          <Button className="bg-gray-800 hover:bg-gray-700 text-white w-full justify-center">
            <Mail className="mr-2" /> Continue with Email
          </Button>
          <Button className="bg-indigo-700 hover:bg-indigo-800 text-white w-full justify-center">
            <Disc className="mr-2" /> Continue with Discord
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
