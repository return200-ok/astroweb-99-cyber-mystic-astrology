import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Zap, Heart, Terminal, MessageSquare, Globe, BrainCircuit, Compass } from 'lucide-react';
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
    { name: dict.navTuvi || 'TỬ VI', path: '/tuvi', icon: Compass },
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
      <header className="sticky top-0 z-50 bg-[#09090b]/90 backdrop-blur-sm border-b-2 border-magenta-500 shadow-neon">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="p-1.5 border-2 border-magenta-500 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5 text-magenta-500 animate-pulse" />
            </div>
            <span className="text-xl sm:text-2xl font-bold neon-text-magenta tracking-tighter hidden xs:inline uppercase italic">ASTROWEB-99</span>
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
                      "flex items-center gap-1.5 px-2 sm:px-4 py-1.5 sm:py-2 border-2 transition-all",
                      isActive
                        ? "bg-magenta-500 text-black border-magenta-500 shadow-neon"
                        : "border-transparent text-magenta-500 hover:border-magenta-500 hover:bg-magenta-500/5"
                    )}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-bold uppercase hidden md:inline">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center w-10 sm:w-auto sm:px-3 py-1.5 sm:py-2 border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-black transition-all font-mono text-xs sm:text-sm font-bold flex-shrink-0"
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
      <footer className="mt-auto border-t-2 border-magenta-500 py-8 text-center text-magenta-500/70 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none font-mono text-[8px] flex flex-wrap gap-4 leading-none overflow-hidden select-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i}>SYSTEM_BOOT_LOG_0x00{i}_CYBER_STREAMS_ACTIVE_SIGNAL_STRENGTH_100</span>
          ))}
        </div>
        <div className="relative z-10 space-y-3">
          <p className="font-mono text-xs sm:text-sm tracking-widest">{dict.footerLine}</p>
          <div className="flex justify-center items-center gap-6 mt-2 font-mono uppercase tracking-[0.3em] text-[10px]">
            <Zap className="w-3 h-3 text-cyan-500 animate-pulse" />
            <span className="neon-text-cyan">{dict.footerSub}</span>
            <Zap className="w-3 h-3 text-cyan-500 animate-pulse" />
          </div>
        </div>
      </footer>
    </div>
  );
}