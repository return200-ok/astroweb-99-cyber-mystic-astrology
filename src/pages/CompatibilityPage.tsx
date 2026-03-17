import React, { useState } from 'react';
import { useAstroStore } from '@/lib/store';
import { ZODIAC_SIGNS, getCompatibility, I18N } from '@shared/astrology-data';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Heart, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
export function CompatibilityPage() {
  const selectedSignId = useAstroStore((s) => s.selectedSignId);
  const language = useAstroStore((s) => s.language);
  const dict = I18N[language];
  const [sign1, setSign1] = useState(selectedSignId || '');
  const [sign2, setSign2] = useState('');
  const [result, setResult] = useState<{ score: number; text: string } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const handleCalculate = () => {
    if (!sign1 || !sign2) return;
    setIsCalculating(true);
    setResult(null);
    setTimeout(() => {
      setResult(getCompatibility(sign1, sign2, language));
      setIsCalculating(false);
    }, 2000);
  };
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-5xl md:text-6xl font-bold text-gold-500 mystic-text-glow tracking-tighter uppercase italic">
          {dict.matchmakerTitle}
        </h1>
        <p className="text-gold-500/60 text-xl font-serif uppercase tracking-widest">{dict.matchmakerSub}</p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="block text-gold-500/80 uppercase font-mystic font-bold text-xs tracking-widest">{dict.targetA}</label>
          <select
            value={sign1}
            onChange={(e) => setSign1(e.target.value)}
            className="w-full bg-indigo-950/40 border border-gold-500/50 p-3 text-gold-500 font-serif focus:outline-none focus:ring-1 focus:ring-gold-500 rounded-full appearance-none px-6"
          >
            <option value="" className="bg-indigo-950">{dict.selectSign}</option>
            {ZODIAC_SIGNS.map(s => <option key={s.id} value={s.id} className="bg-indigo-950">{s.symbol} {s.names[language]}</option>)}
          </select>
        </div>
        <div className="space-y-4">
          <label className="block text-gold-500/80 uppercase font-mystic font-bold text-xs tracking-widest">{dict.targetB}</label>
          <select
            value={sign2}
            onChange={(e) => setSign2(e.target.value)}
            className="w-full bg-indigo-950/40 border border-gold-500/50 p-3 text-gold-500 font-serif focus:outline-none focus:ring-1 focus:ring-gold-500 rounded-full appearance-none px-6"
          >
            <option value="" className="bg-indigo-950">{dict.selectSign}</option>
            {ZODIAC_SIGNS.map(s => <option key={s.id} value={s.id} className="bg-indigo-950">{s.symbol} {s.names[language]}</option>)}
          </select>
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          onClick={handleCalculate}
          disabled={!sign1 || !sign2 || isCalculating}
          className="bg-indigo-950/40 border border-gold-500/50 text-gold-500 hover:bg-gold-500 hover:text-indigo-900 font-mystic font-bold text-xl h-auto py-4 px-12 transition-all shadow-ethereal-glow rounded-full disabled:opacity-50 uppercase tracking-widest"
        >
          {isCalculating ? (
            <>
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              {dict.computing}
            </>
          ) : (
            <>
              <Heart className="mr-2 h-6 w-6" />
              {dict.calculateMatch}
            </>
          )}
        </Button>
      </div>
      {result && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <Card className="bg-indigo-950/40 backdrop-blur-md border border-gold-500/30 p-10 shadow-ethereal-glow rounded-3xl relative overflow-hidden">
            <div className="text-center space-y-8 relative z-10">
              <h2 className="text-3xl font-mystic font-bold text-gold-500 uppercase italic tracking-widest">{dict.matchResults}</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-gold-500 font-mystic text-sm uppercase tracking-widest">
                  <span>{dict.score}</span>
                  <span>{result.score}%</span>
                </div>
                <Progress value={result.score} className="h-4 bg-indigo-900/50 border border-gold-500/30 rounded-full overflow-hidden" />
              </div>
              <div className="bg-gold-500/5 border border-gold-500/20 p-8 rounded-2xl">
                <p className="text-gold-500 font-serif text-xl leading-relaxed italic">“{result.text}”</p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}