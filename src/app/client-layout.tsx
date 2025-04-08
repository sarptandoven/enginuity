'use client';

import { AuthProvider } from '@/lib/auth-context';
import { ConfigProvider } from '@/lib/config-provider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConfigProvider>
      <AuthProvider>
        <Header />
        <main className="pt-20">
          {children}
        </main>
        <Footer />
      </AuthProvider>
    </ConfigProvider>
  );
} 