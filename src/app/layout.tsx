import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientLayout from './client-layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Enginuity - AI-Powered Coding Education',
  description: 'Learn to code like a pro with personalized AI-powered projects and guidance.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[#0A0A0B] text-white min-h-screen`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
} 