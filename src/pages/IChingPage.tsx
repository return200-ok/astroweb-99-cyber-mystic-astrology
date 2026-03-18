import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAstroStore } from '@/lib/store';
import { I18N } from '@shared/astrology-data';
import { getHexagram } from '@shared/iching-data';
import { castLine, generateHexagrams } from '@/lib/iching-logic';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Sparkles, Loader2, Scroll, Leaf, History } from 'lucide-react';
import { api } from '@/lib/api-client';
import { IChingLineType, IChingResult } from '@shared/types';
export function IChingPage() {
  const language = useAstroStore(s => s.language);
  const dict = I18N[language];
  const [question, setQuestion] = useState("");
  const [isCasting, setIsCasting] = useState(false);
  const [lines, setLines] = useState<IChingLineType[]>([]);
  const [result, setResult] = useState<IChingResult | null>(null);
  const [isInterpreting, setIsInterpreting] = useState(false);
  const playSfx = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch (e) {}
  };
  const handleCast = async () => {
    if (!question.trim()) return;
    setIsCasting(true);
    setResult(null);
    setLines([]);
    playSfx();
    const newLines: IChingLineType[] = [];
    for (let i = 0; i < 6; i++) {
      await new Promise(r => setTimeout(r, 400));
      newLines.push(castLine());
      setLines([...newLines]);
    }
    setIsCasting(false);
    setIsInterpreting(true);
    const { mainBinary, transBinary } = generateHexagrams(newLines);
    const mainHex = getHexagram(mainBinary);
    const transHex = getHexagram(transBinary);
    try {
      const data = await api<IChingResult>('/api/iching/interpret', {
        method: 'POST',
        body: JSON.stringify({ question, mainHex, transHex, lines: newLines, language })
      });
      setResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsInterpreting(false);
    }
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-5xl md:text-7xl font-mystic font-bold text-gold-500 uppercase italic mystic-text-glow">{dict.navIching}</h1>
        <p className="text-gold-500/60 text-lg md:text-xl font-serif italic tracking-widest">{dict.ichingSub}</p>
      </div>
      <div className="max-w-2xl mx-auto space-y-8">
        <Card className="bg-indigo-950/40 border border-gold-500/30 p-8 rounded-3xl shadow-ethereal-glow space-y-6">
          <div className="space-y-2">
            <label className="text-gold-500 font-mystic text-xs uppercase tracking-[0.2em]">{dict.askQuestion}</label>
            <Input 
              value={question} 
              onChange={e => setQuestion(e.target.value)}
              placeholder="..."
              className="bg-indigo-900/50 border-gold-500/30 text-gold-500 rounded-full h-14 px-8 text-lg italic"
            />
          </div>
          <Button 
            onClick={handleCast} 
            disabled={isCasting || isInterpreting || !question.trim()}
            className="w-full bg-gold-500 text-indigo-900 font-mystic font-bold h-16 rounded-full uppercase italic tracking-widest text-xl shadow-ethereal-glow hover:bg-gold-400"
          >
            {isCasting ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="mr-2" />}
            {isCasting ? dict.formingHexagram : dict.castHexagram}
          </Button>
        </Card>
        <div className="flex flex-col items-center gap-2 min-h-[160px] justify-center">
          {lines.map((line, idx) => (
            <motion.div
              key={idx}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              className="flex gap-2 w-48 h-3 items-center"
            >
              {(line === 6 || line === 8) ? (
                <>
                  <div className="flex-1 h-full bg-gold-500/80 rounded-sm shadow-inner-glow" />
                  <div className="w-8" />
                  <div className="flex-1 h-full bg-gold-500/80 rounded-sm shadow-inner-glow" />
                </>
              ) : (
                <div className="w-full h-full bg-gold-500 shadow-ethereal-glow rounded-sm" />
              )}
              {(line === 6 || line === 9) && <div className="w-2 h-2 rounded-full bg-gold-500 animate-ping absolute right-[-20px]" />}
            </motion.div>
          ))}
        </div>
        <AnimatePresence>
          {result && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <Card className="bg-indigo-950/60 border border-gold-500/30 p-10 rounded-3xl shadow-ethereal-glow">
                <div className="flex flex-col items-center gap-6 text-center">
                  <Scroll className="w-12 h-12 text-gold-500 opacity-50" />
                  <h2 className="text-3xl font-mystic text-gold-500 uppercase italic tracking-widest">{dict.interpretationTitle}</h2>
                  <p className="text-gold-500 font-serif text-2xl italic leading-relaxed">“{result.summary}”</p>
                  <div className="h-[1px] w-full bg-gold-500/20" />
                  <div className="text-gold-500/80 font-serif leading-relaxed text-lg space-y-6">
                    <p>{result.analysis}</p>
                    <div className="space-y-3">
                      <p className="font-mystic text-xs uppercase tracking-widest text-gold-500">{dict.advice}</p>
                      <ul className="space-y-2">
                        {result.guidance.map((g, i) => (
                          <li key={i} className="flex items-start gap-2 justify-center italic">
                            <span className="text-gold-500">•</span> {g}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}