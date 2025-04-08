'use client';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ConfigProvider } from '@/lib/config-provider';

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
        <ConfigProvider>
          <AuthProvider>
            <Header />
            <main className="pt-20">
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </ConfigProvider>
      </body>
    </html>
  );
} 