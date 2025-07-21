import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { LanguageProvider } from '@/hooks/use-language';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-melody-black text-white">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}