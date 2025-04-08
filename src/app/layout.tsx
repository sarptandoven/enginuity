import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';
import { metadata } from './metadata';

const inter = Inter({ subsets: ['latin'] });

export { metadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[#0A0A0B] text-white min-h-screen`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
} 