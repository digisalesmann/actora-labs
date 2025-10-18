// src/app/layout.tsx
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans'; // <-- Import Geist Sans
import './globals.css';
import { Web3Provider } from '@/providers/Web3Provider';

export const metadata: Metadata = {
  title: 'Actora Hub',
  description: 'The XP Layer for web3',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark"> {/* <-- Add className="dark" */}
      <body className={GeistSans.className}> {/* <-- Use Geist Sans */}
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}