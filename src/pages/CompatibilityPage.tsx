import React, { useState } from 'react';
import { useAstroStore } from '@/lib/store';
import { ZODIAC_SIGNS, getCompatibility, I18N } from '@shared/astrology-data';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Heart, Loader2, AlertCircle } from 'lucide-react';
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
        <h1 className="text-5xl md:text-6xl font-bold neon-text-cyan tracking-tighter uppercase italic">
          {dict.matchmakerTitle}
        </h1>
        <p className="text-magenta-500 text-xl font-mono uppercase">{dict.matchmakerSub}</p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="block text-magenta-500 uppercase font-bold text-sm">{dict.targetA}</label>
          <select
            value={sign1}
            onChange={(e) => setSign1(e.target.value)}
            className="w-full bg-black border-2 border-magenta-500 p-3 text-magenta-500 font-mono focus:outline-none focus:shadow-neon"
          >
            <option value="">{dict.selectSign}</option>
            {ZODIAC_SIGNS.map(s => <option key={s.id} value={s.id}>{s.symbol} {s.names[language]}</option>)}
          </select>
        </div>
        <div className="space-y-4">
          <label className="block text-magenta-500 uppercase font-bold text-sm">{dict.targetB}</label>
          <select
            value={sign2}
            onChange={(e) => setSign2(e.target.value)}
            className="w-full bg-black border-2 border-magenta-500 p-3 text-magenta-500 font-mono focus:outline-none focus:shadow-neon"
          >
            <option value="">{dict.selectSign}</option>
            {ZODIAC_SIGNS.map(s => <option key={s.id} value={s.id}>{s.symbol} {s.names[language]}</option>)}
          </select>
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          onClick={handleCalculate}
          disabled={!sign1 || !sign2 || isCalculating}
          className="bg-black border-4 border-magenta-500 text-magenta-500 hover:bg-magenta-500 hover:text-black font-bold text-2xl h-auto py-4 px-12 transition-all shadow-neon rounded-none disabled:opacity-50"
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
          <Card className="bg-black border-2 border-cyan-500 p-8 shadow-neon-cyan rounded-none relative overflow-hidden">
            <div className="text-center space-y-6 relative z-10">
              <h2 className="text-4xl font-bold text-cyan-500 underline uppercase italic">{dict.matchResults}</h2>
              <div className="space-y-2">
                <div className="flex justify-between text-cyan-500 font-mono text-xl">
                  <span>{dict.score}</span>
                  <span>{result.score}%</span>
                </div>
                <Progress value={result.score} className="h-6 bg-cyan-950 border border-cyan-500 rounded-none overflow-hidden" />
              </div>
              <div className="bg-cyan-500/10 border-l-4 border-cyan-500 p-6 text-left">
                <p className="text-cyan-500 font-mono text-xl leading-relaxed italic">&gt; {result.text}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}