import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Zap, Heart, Terminal, MessageSquare, Globe, BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAstroStore } from '@/lib/store';
import { I18N } from '@shared/astrology-data';
export function RetroLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const language = useAstroStore(s => s.language);
  const setLanguage = useAstroStore(s => s.setLanguage);
  const dict = I18N[language];
  const navItems = [
    { name: dict.navTerminal, path: '/', icon: Terminal },
    { name: dict.navMatchmaker, path: '/matchmaker', icon: Heart },
    { name: dict.navTest, path: '/test', icon: BrainCircuit },
    { name: dict.navBBS, path: '/bbs', icon: MessageSquare },
  ];
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'vi' : 'en');
  };
  return (
    <div className="min-h-screen bg-[#09090b] font-retro selection:bg-magenta-500 selection:text-white flex flex-col">
      <div className="crt-overlay" />
      <header className="sticky top-0 z-50 bg-[#09090b] border-b-2 border-magenta-500 shadow-neon">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-1 border border-magenta-500 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5 text-magenta-500 animate-pulse" />
            </div>
            <span className="text-2xl font-bold neon-text-magenta tracking-tighter hidden sm:inline">ASTROWEB-99</span>
          </Link>
          <div className="flex items-center gap-4">
            <nav className="flex gap-2 sm:gap-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-1 px-2 sm:px-3 py-1 border-2 transition-all",
                      isActive
                        ? "bg-magenta-500 text-black border-magenta-500 shadow-neon"
                        : "border-transparent text-magenta-500 hover:border-magenta-500 hover:shadow-neon"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-xs sm:text-base">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-3 py-1 border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-black transition-all font-mono text-sm"
            >
              <Globe className="w-4 h-4" />
              <span>{language.toUpperCase()}</span>
            </button>
          </div>
        </div>
      </header>
      <main className="relative z-10 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8 md:py-10 lg:py-12">
            {children}
          </div>
        </div>
      </main>
      <footer className="mt-auto border-t border-magenta-500/30 py-6 text-center text-magenta-500/50 text-sm bg-black">
        <p className="font-mono">{dict.footerLine}</p>
        <div className="flex justify-center items-center gap-4 mt-2 font-mono uppercase tracking-widest text-[10px]">
          <Zap className="w-3 h-3 animate-bounce" />
          <span>{dict.footerSub}</span>
          <Zap className="w-3 h-3 animate-bounce" />
        </div>
      </footer>
    </div>
  );
}