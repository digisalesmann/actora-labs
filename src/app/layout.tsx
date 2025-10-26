import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Web3Provider } from '@/providers/Web3Provider';
import Header from '@/components/layout/Header';

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
    <html lang="en" className="dark">
      <body className={GeistSans.className}>
        <Web3Provider>
          <Header />
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}