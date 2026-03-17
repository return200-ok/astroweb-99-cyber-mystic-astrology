import React, { useState, useEffect, useMemo } from 'react';
import { useAstroStore } from '@/lib/store';
import { ZODIAC_SIGNS, I18N } from '@shared/astrology-data';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RefreshCcw, Power, Terminal as TerminalIcon, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DeepScanPanel } from '@/components/DeepScanPanel';
export function HomePage() {
  const selectedSignId = useAstroStore((s) => s.selectedSignId);
  const setSelectedSignId = useAstroStore((s) => s.setSelectedSignId);
  const language = useAstroStore(s => s.language);
  const dict = I18N[language];
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const selectedSign = useMemo(() =>
    ZODIAC_SIGNS.find((s) => s.id === selectedSignId),
    [selectedSignId]
  );
  useEffect(() => {
    if (!selectedSign) {
      setTypedText('');
      setIsTyping(false);
      setShowAnalysis(false);
      return;
    }
    setTypedText('');
    setIsTyping(true);
    setShowAnalysis(false);
    let i = 0;
    const fullText = selectedSign.horoscopes[language];
    const timer = setInterval(() => {
      setTypedText(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) {
        clearInterval(timer);
        setIsTyping(false);
        // Delay the appearance of the deep scan until reading is likely finished
        setTimeout(() => setShowAnalysis(true), 800);
      }
    }, 25); // Slightly slower for better readability
    return () => {
      clearInterval(timer);
      setIsTyping(false);
    };
  }, [selectedSignId, language, selectedSign]);
  if (!selectedSign) {
    return (
      <div className="space-y-12">
        <div className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block p-4 border-4 border-magenta-500 bg-black shadow-neon mb-4"
          >
            <Sparkles className="w-12 h-12 text-magenta-500 animate-pulse" />
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-bold neon-text-magenta tracking-tighter uppercase italic leading-none">
            {dict.terminalTitle}
          </h1>
          <p className="text-cyan-500 text-xl font-mono uppercase tracking-[0.4em] animate-pulse">
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
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255,0,255,0.1)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedSignId(sign.id)}
              className="p-8 border-2 border-magenta-500 bg-black hover:border-cyan-500 hover:shadow-neon-cyan transition-all group relative overflow-hidden text-center"
            >
              <div className="text-5xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">{sign.symbol}</div>
              <div className="text-xl font-bold uppercase tracking-widest text-magenta-500 group-hover:text-cyan-500">{sign.names[language]}</div>
              <div className="text-[10px] opacity-50 font-mono mt-2 text-magenta-500 group-hover:text-cyan-500">{sign.dates[language]}</div>
              <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-100 group-hover:text-cyan-500 transition-opacity">
                <Power className="w-3 h-3" />
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-magenta-500 group-hover:bg-cyan-500" />
            </motion.button>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <Card className="bg-black border-2 border-cyan-500 shadow-neon-cyan p-0 overflow-hidden rounded-none">
        <div className="bg-cyan-500 text-black px-4 py-1.5 flex justify-between items-center font-bold">
          <div className="flex items-center gap-2 font-mono text-sm">
            <TerminalIcon className="w-4 h-4 animate-pulse" />
            <span>ASTRAL_READER_v1.9.9 - {selectedSign.names[language].toUpperCase()}</span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 border-2 border-black" />
            <div className="w-3 h-3 bg-black" />
          </div>
        </div>
        <div className="p-8 space-y-8 font-mono text-cyan-500 min-h-[350px] relative">
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none select-none text-[60px] font-bold">
            {selectedSign.symbol}
          </div>
          <div className="space-y-1 text-[10px] opacity-40 uppercase">
            <p>&gt; ESTABLISHING ASTRAL UPLINK... [OK]</p>
            <p>&gt; DECRYPTING COSMIC DATASTREAMS... [OK]</p>
            <p>&gt; PARSING DESTINY PACKETS... [OK]</p>
          </div>
          <div className="text-4xl flex items-center gap-4 border-b-2 border-cyan-500/20 pb-4">
            <span className="text-6xl neon-text-cyan">{selectedSign.symbol}</span>
            <span className="font-retro uppercase underline decoration-double tracking-tighter">{selectedSign.names[language]}</span>
          </div>
          <div className="text-2xl leading-relaxed italic border-l-4 border-cyan-500 pl-6 py-4 bg-cyan-500/5 min-h-[6rem] neon-text-cyan">
            {typedText}
            {isTyping && <span className="animate-pulse inline-block w-3 h-6 bg-cyan-500 ml-2" />}
          </div>
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="text-[10px] opacity-50 uppercase leading-tight font-mono text-center sm:text-left w-full sm:w-auto">
              Uptime: {Math.floor(Date.now() / 10000) % 1000}s<br />
              Encryption: VOID-CRYPTO-99<br />
              Status: Future Locked
            </div>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setSelectedSignId(null)}
              className="border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-black rounded-none h-auto py-2 px-8 font-bold uppercase tracking-[0.2em] shadow-neon-cyan transition-all w-full sm:w-auto"
            >
              <RefreshCcw className="w-5 h-5 mr-3" />
              {dict.rebootSystem}
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
            transition={{ duration: 0.5 }}
          >
            <DeepScanPanel signId={selectedSign.id} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}