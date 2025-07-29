import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { LanguageProvider } from '@/hooks/use-language';
import MusicPlayer from '@/components/MusicPlayer';

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
        <MusicPlayer />
      </div>
    </LanguageProvider>
  );
}