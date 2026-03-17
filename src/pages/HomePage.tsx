import React, { useState, useEffect, useMemo } from 'react';
import { useAstroStore } from '@/lib/store';
import { ZODIAC_SIGNS, I18N } from '@shared/astrology-data';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RefreshCcw, Power, Terminal as TerminalIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { DeepScanPanel } from '@/components/DeepScanPanel';
export function HomePage() {
  const selectedSignId = useAstroStore((s) => s.selectedSignId);
  const setSelectedSignId = useAstroStore((s) => s.setSelectedSignId);
  const language = useAstroStore(s => s.language);
  const dict = I18N[language];
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const selectedSign = useMemo(() =>
    ZODIAC_SIGNS.find((s) => s.id === selectedSignId),
    [selectedSignId]
  );
  useEffect(() => {
    if (!selectedSign) {
      setTypedText('');
      setIsTyping(false);
      return;
    }
    setTypedText('');
    setIsTyping(true);
    let i = 0;
    const fullText = selectedSign.horoscopes[language];
    const timer = setInterval(() => {
      setTypedText(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) {
        clearInterval(timer);
        setIsTyping(false);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [selectedSignId, selectedSign, language]);
  if (!selectedSign) {
    return (
      <div className="space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold neon-text-magenta tracking-widest uppercase italic">
            {dict.terminalTitle}
          </h1>
          <p className="text-cyan-500 text-xl font-mono uppercase">{dict.terminalSub}</p>
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
              <div className="text-xl font-bold uppercase">{sign.names[language]}</div>
              <div className="text-xs opacity-70 font-mono">{sign.dates[language]}</div>
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
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="bg-black border-2 border-cyan-500 shadow-neon-cyan p-0 overflow-hidden rounded-none">
        <div className="bg-cyan-500 text-black px-4 py-1 flex justify-between items-center font-bold">
          <div className="flex items-center gap-2 font-mono">
            <TerminalIcon className="w-4 h-4" />
            <span>HOROSCOPE_READER.EXE - {selectedSign.names[language].toUpperCase()}</span>
          </div>
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-black" />
            <div className="w-3 h-3 bg-black" />
          </div>
        </div>
        <div className="p-8 space-y-6 font-mono text-cyan-500 min-h-[300px]">
          <div className="space-y-2 text-xs opacity-60">
            <p># INITIALIZING ASTRAL UPLINK...</p>
            <p># DECRYPTING DESTINY PACKETS...</p>
          </div>
          <div className="text-3xl flex items-center gap-3">
            <span className="text-5xl">{selectedSign.symbol}</span>
            <span className="font-retro uppercase underline decoration-double">{selectedSign.names[language]}</span>
          </div>
          <div className="text-xl leading-relaxed border-l-2 border-cyan-500/30 pl-4 py-2 min-h-[4rem]">
            {typedText}
            {isTyping && <span className="animate-pulse">_</span>}
          </div>
          <div className="pt-8 flex justify-between items-end">
            <div className="text-[10px] opacity-40 uppercase leading-tight">
              CRC Check: OK<br />
              Status: Future Secured<br />
              Encryption: RSA-99-CRYPTO
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedSignId(null)}
              className="border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-black rounded-none h-auto py-1 px-4 font-bold"
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              {dict.rebootSystem}
            </Button>
          </div>
        </div>
      </Card>
      <DeepScanPanel signId={selectedSign.id} />
    </div>
  );
}