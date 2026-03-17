import React, { useState } from 'react';
import { useAstroStore } from '@/lib/store';
import { ZODIAC_SIGNS, getCompatibility } from '@shared/astrology-data';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Heart, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
export function CompatibilityPage() {
  const selectedSignId = useAstroStore((s) => s.selectedSignId);
  const [sign1, setSign1] = useState(selectedSignId || '');
  const [sign2, setSign2] = useState('');
  const [result, setResult] = useState<{ score: number; text: string } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const handleCalculate = () => {
    if (!sign1 || !sign2) return;
    setIsCalculating(true);
    setResult(null);
    // Fake processing time
    setTimeout(() => {
      setResult(getCompatibility(sign1, sign2));
      setIsCalculating(false);
    }, 2000);
  };
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-5xl md:text-6xl font-bold neon-text-cyan tracking-tighter uppercase italic">
          Cosmic Matchmaker
        </h1>
        <p className="text-magenta-500 text-xl font-mono">DETERMINING INTER-STELLAR COMPATIBILITY V2.0</p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="block text-magenta-500 uppercase font-bold text-sm">Target Sign A (Origin)</label>
          <select 
            value={sign1} 
            onChange={(e) => setSign1(e.target.value)}
            className="w-full bg-black border-2 border-magenta-500 p-3 text-magenta-500 font-mono focus:outline-none focus:shadow-neon"
          >
            <option value="">-- SELECT SIGN --</option>
            {ZODIAC_SIGNS.map(s => <option key={s.id} value={s.id}>{s.symbol} {s.name}</option>)}
          </select>
        </div>
        <div className="space-y-4">
          <label className="block text-magenta-500 uppercase font-bold text-sm">Target Sign B (External)</label>
          <select 
            value={sign2} 
            onChange={(e) => setSign2(e.target.value)}
            className="w-full bg-black border-2 border-magenta-500 p-3 text-magenta-500 font-mono focus:outline-none focus:shadow-neon"
          >
            <option value="">-- SELECT SIGN --</option>
            {ZODIAC_SIGNS.map(s => <option key={s.id} value={s.id}>{s.symbol} {s.name}</option>)}
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
              COMPUTING...
            </>
          ) : (
            <>
              <Heart className="mr-2 h-6 w-6" />
              CALCULATE MATCH
            </>
          )}
        </Button>
      </div>
      {result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <Card className="bg-black border-2 border-cyan-500 p-8 shadow-neon-cyan rounded-none relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <AlertCircle className="w-20 h-20 text-cyan-500" />
            </div>
            <div className="text-center space-y-6 relative z-10">
              <h2 className="text-4xl font-bold text-cyan-500 underline uppercase italic">Match Analysis Results</h2>
              <div className="space-y-2">
                <div className="flex justify-between text-cyan-500 font-mono text-xl">
                  <span>COMPATIBILITY_SCORE</span>
                  <span>{result.score}%</span>
                </div>
                <Progress value={result.score} className="h-6 bg-cyan-950 border border-cyan-500 rounded-none overflow-hidden" />
              </div>
              <div className="bg-cyan-500/10 border-l-4 border-cyan-500 p-6 text-left">
                <p className="text-cyan-500 font-mono text-xl leading-relaxed italic">
                  &gt; {result.text}
                </p>
              </div>
              <div className="text-2xs text-cyan-500/40 text-left font-mono">
                ENCRYPTION TYPE: RSA-99-CYBER<br />
                DATA_SOURCE: ASTRAL_SERVER_7<br />
                TIMESTAMP: {new Date().toISOString()}
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}