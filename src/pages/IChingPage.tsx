import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAstroStore } from '@/lib/store';
import { I18N } from '@shared/astrology-data';
import { getHexagram } from '@shared/iching-data';
import { castLine, generateHexagrams } from '@/lib/iching-logic';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Sparkles, Loader2, Scroll, RotateCcw } from 'lucide-react';
import { api } from '@/lib/api-client';
import { IChingLineType, IChingResult } from '@shared/types';
import { IChingCastingAltar } from '@/components/IChingCastingAltar';
import { toast } from 'sonner';
export function IChingPage() {
  const language = useAstroStore(s => s.language);
  const dict = I18N[language];
  const [question, setQuestion] = useState("");
  const [isCasting, setIsCasting] = useState(false);
  const [lines, setLines] = useState<IChingLineType[]>([]);
  const [result, setResult] = useState<IChingResult | null>(null);
  const [isInterpreting, setIsInterpreting] = useState(false);
  const playSfx = useCallback(() => {
    try {
      const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {
      console.warn("Audio feedback suppressed.");
    }
  }, []);
  const handleCast = async () => {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) {
      toast.error("The Oracle requires a query.");
      return;
    }
    setIsCasting(true);
    setResult(null);
    setLines([]);
    toast.info("Entering ritual state...");
    const newLines: IChingLineType[] = [];
    for (let i = 0; i < 6; i++) {
      await new Promise(r => setTimeout(r, 800));
      const nextLine = castLine();
      newLines.push(nextLine);
      setLines([...newLines]);
      playSfx();
    }
    setIsCasting(false);
    setIsInterpreting(true);
    await new Promise(r => setTimeout(r, 1000));
    const { mainBinary, transBinary } = generateHexagrams(newLines);
    const mainHex = getHexagram(mainBinary);
    const transHex = getHexagram(transBinary);
    try {
      const data = await api<IChingResult>('/api/iching/interpret', {
        method: 'POST',
        body: JSON.stringify({
          question: trimmedQuestion,
          mainHex,
          transHex,
          lines: newLines,
          language
        })
      });
      setResult(data);
      toast.success("Divine guidance received.");
    } catch (e) {
      console.error("Oracle Interpretation Error:", e);
      toast.error("The cosmic static is too loud. Try again.");
    } finally {
      setIsInterpreting(false);
    }
  };
  const handleReset = () => {
    setQuestion("");
    setLines([]);
    setResult(null);
    setIsCasting(false);
    setIsInterpreting(false);
    toast.info("Altar purified.");
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-5xl md:text-7xl font-mystic font-bold text-gold-500 uppercase italic mystic-text-glow">
          {dict.navIching}
        </h1>
        <p className="text-gold-500/60 text-lg md:text-xl font-serif italic tracking-[0.2em]">
          {dict.ichingSub}
        </p>
      </div>
      <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <Card className="bg-indigo-950/40 border border-gold-500/30 p-8 rounded-3xl shadow-ethereal-glow space-y-6">
            <div className="space-y-4">
              <label className="text-gold-500 font-mystic text-xs uppercase tracking-[0.2em] opacity-70">
                {dict.askQuestion}
              </label>
              <Input
                value={question}
                onChange={e => setQuestion(e.target.value)}
                placeholder="Whisper your query..."
                disabled={isCasting || isInterpreting}
                className="bg-indigo-900/50 border-gold-500/30 text-gold-500 rounded-2xl h-16 px-6 text-lg italic focus:ring-gold-500"
              />
            </div>
            <div className="flex gap-4">
              <Button
                onClick={handleCast}
                disabled={isCasting || isInterpreting || !question.trim()}
                className="flex-1 bg-gold-500 text-indigo-900 font-mystic font-bold h-16 rounded-full uppercase italic tracking-widest text-lg shadow-ethereal-glow hover:bg-gold-400 disabled:opacity-50"
              >
                {isCasting || isInterpreting ? (
                  <Loader2 className="animate-spin mr-2" />
                ) : (
                  <Sparkles className="mr-2" />
                )}
                {isCasting ? dict.formingHexagram : (isInterpreting ? dict.computing : dict.castHexagram)}
              </Button>
              {(lines.length > 0 || result) && (
                <Button 
                  variant="outline" 
                  onClick={handleReset}
                  className="w-16 h-16 rounded-full border-gold-500/30 text-gold-500 hover:bg-gold-500/10 transition-all active:scale-95"
                >
                  <RotateCcw className="w-6 h-6" />
                </Button>
              )}
            </div>
          </Card>
          <AnimatePresence>
            {isInterpreting && !result && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-8 space-y-4">
                <div className="flex justify-center gap-2">
                  <div className="w-2 h-2 bg-gold-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gold-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-gold-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
                <p className="text-gold-500 font-mystic text-sm uppercase tracking-widest animate-pulse">Consulting the Sages...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex justify-center items-center">
          <IChingCastingAltar lines={lines} isCasting={isCasting} />
        </div>
      </div>
      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto mt-12 pb-20">
            <Card className="bg-indigo-950/60 border border-gold-500/30 p-10 rounded-[3rem] shadow-ethereal-glow relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Scroll className="w-32 h-32 text-gold-500" />
              </div>
              <div className="flex flex-col items-center gap-8 text-center relative z-10">
                <div className="space-y-2">
                  <h2 className="text-3xl font-mystic text-gold-500 uppercase italic tracking-widest">
                    {dict.interpretationTitle}
                  </h2>
                  <div className="h-0.5 w-24 bg-gold-500/30 mx-auto rounded-full" />
                </div>
                <p className="text-gold-500 font-serif text-3xl italic leading-relaxed px-4">
                  “{result.summary}”
                </p>
                <div className="w-full space-y-8 text-left">
                  <div className="space-y-4">
                    <p className="font-mystic text-xs uppercase tracking-widest text-gold-500/60 border-b border-gold-500/10 pb-2">
                      Cosmic Analysis
                    </p>
                    <p className="text-gold-500/90 font-serif leading-relaxed text-lg italic indent-8">
                      {result.analysis}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <p className="font-mystic text-xs uppercase tracking-widest text-gold-500/60 border-b border-gold-500/10 pb-2">
                      {dict.advice}
                    </p>
                    <ul className="grid gap-4">
                      {result.guidance.map((g, i) => (
                        <motion.li 
                          key={i} 
                          initial={{ opacity: 0, x: -10 }} 
                          animate={{ opacity: 1, x: 0 }} 
                          transition={{ delay: 0.2 + (i * 0.1) }}
                          className="flex items-start gap-4 text-gold-500/80 font-serif italic text-lg"
                        >
                          <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full border border-gold-500/30 text-[10px] font-mystic not-italic">
                            0{i + 1}
                          </span>
                          <span>{g}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="pt-8 w-full flex justify-center border-t border-gold-500/10">
                  <Button 
                    variant="ghost" 
                    onClick={handleReset}
                    className="text-gold-500/40 hover:text-gold-500 font-mystic uppercase text-[10px] tracking-widest hover:bg-gold-500/5 px-8 py-6 rounded-full"
                  >
                    <RotateCcw className="w-3 h-3 mr-2" /> Return to Silence
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}