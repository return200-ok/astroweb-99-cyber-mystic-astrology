import React, { useState, useEffect } from 'react';
import { useAstroStore } from '@/lib/store';
import { ZODIAC_SIGNS } from '@shared/astrology-data';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RefreshCcw, Power } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
export function HomePage() {
  const selectedSignId = useAstroStore((s) => s.selectedSignId);
  const setSelectedSignId = useAstroStore((s) => s.setSelectedSignId);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const selectedSign = ZODIAC_SIGNS.find((s) => s.id === selectedSignId);
  useEffect(() => {
    if (selectedSign && !isTyping) {
      setTypedText('');
      setIsTyping(true);
      let i = 0;
      const fullText = selectedSign.horoscope;
      const timer = setInterval(() => {
        setTypedText((prev) => fullText.slice(0, i + 1));
        i++;
        if (i >= fullText.length) {
          clearInterval(timer);
          setIsTyping(false);
        }
      }, 30);
      return () => clearInterval(timer);
    }
  }, [selectedSignId]);
  if (!selectedSign) {
    return (
      <div className="space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold neon-text-magenta tracking-widest uppercase italic">
            Astral Terminal
          </h1>
          <p className="text-cyan-500 text-xl font-mono">SELECT YOUR COSMIC IDENTIFIER TO BEGIN UPLINK</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {ZODIAC_SIGNS.map((sign) => (
            <motion.button
              key={sign.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedSignId(sign.id)}
              className="p-6 border-2 border-magenta-500 bg-black/50 hover:bg-magenta-500 hover:text-black transition-all group relative overflow-hidden"
            >
              <div className="text-4xl mb-2 group-hover:animate-bounce">{sign.symbol}</div>
              <div className="text-xl font-bold uppercase">{sign.name}</div>
              <div className="text-xs opacity-70 font-mono">{sign.dates}</div>
              <div className="absolute top-0 right-0 p-1 opacity-20 group-hover:opacity-100">
                <Power className="w-4 h-4" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <Card className="bg-black border-2 border-cyan-500 shadow-neon-cyan p-0 overflow-hidden rounded-none">
        <div className="bg-cyan-500 text-black px-4 py-1 flex justify-between items-center font-bold">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            <span>HOROSCOPE_READER.EXE - {selectedSign.name.toUpperCase()}</span>
          </div>
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-black" />
            <div className="w-3 h-3 bg-black" />
          </div>
        </div>
        <div className="p-8 space-y-6 font-mono text-cyan-500 min-h-[300px]">
          <div className="space-y-2">
            <p className="text-xs opacity-50"># INITIALIZING ASTRAL UPLINK...</p>
            <p className="text-xs opacity-50"># CONNECTION ESTABLISHED AT 28.8 KBPS</p>
            <p className="text-xs opacity-50"># DECRYPTING DESTINY PACKETS...</p>
          </div>
          <div className="text-3xl flex items-center gap-3">
            <span className="text-5xl">{selectedSign.symbol}</span>
            <span className="font-retro uppercase underline decoration-double">{selectedSign.name}</span>
          </div>
          <div className="text-xl leading-relaxed border-l-2 border-cyan-500/30 pl-4 py-2">
            {typedText}
            {isTyping && <span className="animate-pulse">_</span>}
          </div>
          <div className="pt-8 flex justify-between items-end">
            <div className="text-2xs opacity-40 uppercase">
              CRC Check: OK<br />
              Status: Future Secured
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedSignId(null)}
              className="border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-black rounded-none h-auto py-1"
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              REBOOT_SYSTEM
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
function Terminal({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
  );
}