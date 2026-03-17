import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Zap, Heart, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';
export function RetroLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navItems = [
    { name: 'TERMINAL', path: '/', icon: Terminal },
    { name: 'MATCHMAKER', path: '/matchmaker', icon: Heart },
  ];
  return (
    <div className="min-h-screen bg-[#09090b] font-retro selection:bg-magenta-500 selection:text-white">
      <div className="crt-overlay" />
      {/* Retro Nav Bar */}
      <header className="sticky top-0 z-50 bg-[#09090b] border-b-2 border-magenta-500 shadow-neon">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="p-1 border border-magenta-500 animate-pulse">
              <Sparkles className="w-5 h-5 text-magenta-500" />
            </div>
            <span className="text-2xl font-bold neon-text-magenta tracking-tighter">ASTROWEB-99</span>
          </div>
          <nav className="flex gap-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-1 px-3 py-1 border-2 transition-all",
                    isActive 
                      ? "bg-magenta-500 text-black border-magenta-500 shadow-neon" 
                      : "border-transparent text-magenta-500 hover:border-magenta-500 hover:shadow-neon"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8 md:py-10 lg:py-12">
            {children}
          </div>
        </div>
      </main>
      <footer className="mt-auto border-t border-magenta-500/30 py-6 text-center text-magenta-500/50 text-sm">
        <p>© 1999 CYBER-MYSTIC SYSTEMS INC.</p>
        <div className="flex justify-center gap-4 mt-2">
          <Zap className="w-4 h-4 animate-bounce" />
          <span>ESTABLISHED ON THE VOID</span>
          <Zap className="w-4 h-4 animate-bounce" />
        </div>
      </footer>
    </div>
  );
}