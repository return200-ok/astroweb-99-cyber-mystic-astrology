import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Heart, Sparkles, MessageSquare, Globe, BrainCircuit, Compass, ScrollText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAstroStore } from '@/lib/store';
import { I18N } from '@shared/astrology-data';
export function RetroLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const language = useAstroStore(s => s.language);
  const setLanguage = useAstroStore(s => s.setLanguage);
  const dict = I18N[language];
  const navItems = [
    { name: dict.navTerminal, path: '/', icon: Sun },
    { name: dict.navTuvi, path: '/tuvi', icon: Compass },
    { name: dict.navMatchmaker, path: '/matchmaker', icon: Heart },
    { name: dict.navIching, path: '/iching', icon: ScrollText },
    { name: dict.navTest, path: '/test', icon: BrainCircuit },
    { name: dict.navBBS, path: '/bbs', icon: MessageSquare },
  ];
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'vi' : 'en');
  };
  return (
    <div className="min-h-screen bg-[#1e1b4b] celestial-bg flex flex-col font-serif">
      <header className="sticky top-0 z-50 bg-[#1e1b4b]/80 backdrop-blur-md border-b border-gold-500/50 shadow-ethereal-glow">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="p-1.5 border border-gold-500 rounded-full group-hover:scale-110 transition-transform shadow-ethereal-glow">
              <Sparkles className="w-5 h-5 text-gold-500 animate-pulse" />
            </div>
            <span className="text-xl sm:text-2xl font-mystic font-bold text-gold-500 tracking-widest hidden xs:inline uppercase italic mystic-text-glow">ASTROWEB-99</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4 overflow-hidden">
            <nav className="flex gap-1 sm:gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    title={item.name}
                    className={cn(
                      "flex items-center gap-1.5 px-2 sm:px-4 py-1.5 sm:py-2 transition-all rounded-full font-mystic",
                      isActive
                        ? "bg-gold-500 text-indigo-900 shadow-ethereal-glow font-bold"
                        : "text-gold-500/80 hover:text-gold-500 hover:bg-gold-500/10"
                    )}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="text-[10px] sm:text-xs uppercase hidden md:inline">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center w-10 sm:w-auto sm:px-3 py-1.5 sm:py-2 border border-gold-500/50 text-gold-500 hover:bg-gold-500 hover:text-indigo-900 transition-all font-mystic text-[10px] sm:text-xs font-bold flex-shrink-0 rounded-full"
            >
              <Globe className="w-4 h-4 sm:mr-1.5" />
              <span className="hidden sm:inline">{language.toUpperCase()}</span>
            </button>
          </div>
        </div>
      </header>
      <main className="relative z-10 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8 md:py-12 lg:py-16">
            {children}
          </div>
        </div>
      </main>
      <footer className="mt-auto border-t border-gold-500/20 py-8 text-center text-gold-500/50 bg-[#0f0d2b]">
        <div className="max-w-7xl mx-auto px-4 space-y-3 font-mystic">
          <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase">{dict.footerLine}</p>
          <div className="flex justify-center items-center gap-4 text-[8px] sm:text-[10px] italic">
             <div className="h-[1px] w-8 bg-gold-500/20" />
             <span className="mystic-text-glow">{dict.footerSub}</span>
             <div className="h-[1px] w-8 bg-gold-500/20" />
          </div>
        </div>
      </footer>
    </div>
  );
}