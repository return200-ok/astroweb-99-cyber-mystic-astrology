import React, { useState, useEffect, useMemo } from 'react';
import { useAstroStore } from '@/lib/store';
import { ZODIAC_SIGNS, I18N } from '@shared/astrology-data';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RefreshCcw, Moon, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DeepScanPanel } from '@/components/DeepScanPanel';
import { cn } from '@/lib/utils';
export function HomePage() {
  const selectedSignId = useAstroStore((s) => s.selectedSignId);
  const setSelectedSignId = useAstroStore((s) => s.setSelectedSignId);
  const language = useAstroStore(s => s.language);
  const dict = I18N[language];
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [fadingText, setFadingText] = useState(false);
  const selectedSign = useMemo(() =>
    ZODIAC_SIGNS.find((s) => s.id === selectedSignId),
    [selectedSignId]
  );
  useEffect(() => {
    if (selectedSign) {
      setFadingText(false);
      setShowAnalysis(false);
      const timer = setTimeout(() => {
        setFadingText(true);
        setTimeout(() => setShowAnalysis(true), 1200);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [selectedSignId, selectedSign]);
  if (!selectedSign) {
    return (
      <div className="space-y-16">
        <div className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block p-6 border border-gold-500/30 bg-indigo-950/50 rounded-full shadow-ethereal-glow mb-4"
          >
            <Sparkles className="w-12 h-12 text-gold-500 animate-pulse" />
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-mystic font-bold text-gold-500 tracking-widest uppercase italic leading-none mystic-text-glow text-center">
            {dict.terminalTitle}
          </h1>
          <p className="text-gold-500/60 text-xl font-serif italic uppercase tracking-[0.4em] animate-pulse">
            {dict.terminalSub}
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {ZODIAC_SIGNS.map((sign, idx) => (
            <motion.button
              key={sign.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,215,0,0.05)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedSignId(sign.id)}
              className="p-8 border border-gold-500/20 bg-indigo-950/30 backdrop-blur-sm hover:border-gold-500 hover:shadow-ethereal-glow transition-all group relative overflow-hidden text-center rounded-2xl"
            >
              <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-500 drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">{sign.symbol}</div>
              <div className="text-xl font-mystic font-bold uppercase tracking-widest text-gold-500/80 group-hover:text-gold-500 group-hover:mystic-text-glow">{sign.names[language]}</div>
              <div className="text-[10px] opacity-40 font-serif italic mt-2 text-gold-500">{sign.dates[language]}</div>
              <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                 <Moon className="w-3 h-3 text-gold-500" />
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gold-500 group-hover:w-1/2 transition-all duration-500" />
            </motion.button>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <Card className="bg-indigo-950/40 backdrop-blur-lg border border-gold-500/30 shadow-ethereal-glow p-0 overflow-hidden rounded-3xl relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
        <div className="p-10 space-y-10 font-serif text-gold-500/90 min-h-[400px] relative text-center">
          <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none select-none text-[80px] font-mystic">
            {selectedSign.symbol}
          </div>
          <div className="flex flex-col items-center gap-4">
             <div className="text-6xl text-gold-500 drop-shadow-[0_0_15px_rgba(255,215,0,0.6)] animate-pulse">{selectedSign.symbol}</div>
             <h2 className="text-4xl font-mystic font-bold uppercase tracking-[0.2em] border-b border-gold-500/30 pb-2">{selectedSign.names[language]}</h2>
          </div>
          <div className={cn(
            "text-2xl leading-relaxed italic py-8 transition-opacity duration-1000",
            fadingText ? "opacity-100" : "opacity-0"
          )}>
            <span className="text-gold-500">“</span>
            {selectedSign.horoscopes[language]}
            <span className="text-gold-500">”</span>
          </div>
          <div className="pt-8 flex flex-col sm:flex-row justify-center items-center gap-6">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setSelectedSignId(null)}
              className="border border-gold-500/50 text-gold-500 hover:bg-gold-500 hover:text-indigo-900 rounded-full h-auto py-3 px-10 font-mystic font-bold uppercase tracking-widest shadow-inner-glow transition-all w-full sm:w-auto"
            >
              <RefreshCcw className="w-5 h-5 mr-3" />
              {dict.rebootSystem.replace('_', ' ')}
            </Button>
          </div>
        </div>
      </Card>
      <AnimatePresence>
        {showAnalysis && selectedSignId && (
          <motion.div
            initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
          >
            <DeepScanPanel signId={selectedSign.id} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}