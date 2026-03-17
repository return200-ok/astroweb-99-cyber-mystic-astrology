import React, { useState, useEffect } from 'react';
import { useAstroStore } from '@/lib/store';
import { I18N, PERSONALITY_QUESTIONS, TRAIT_METADATA } from '@shared/astrology-data';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Loader2, ShieldCheck, RefreshCcw, Binary } from 'lucide-react';
import type { BigFiveTrait } from '@shared/types';
export function PersonalityTestPage() {
  const language = useAstroStore(s => s.language);
  const results = useAstroStore(s => s.personalityResults);
  const setResults = useAstroStore(s => s.setPersonalityResults);
  const dict = I18N[language];
  const [step, setStep] = useState<'intro' | 'testing' | 'results'>(results ? 'results' : 'intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [typedSummary, setTypedSummary] = useState('');
  const progress = (currentQuestionIndex / PERSONALITY_QUESTIONS.length) * 100;
  const handleAnswer = (value: number) => {
    setAnswers(prev => ({ ...prev, [PERSONALITY_QUESTIONS[currentQuestionIndex].id]: value }));
    if (currentQuestionIndex < PERSONALITY_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateResults();
    }
  };
  const calculateResults = () => {
    setStep('testing'); // Show "computing" state briefly
    setTimeout(() => {
      const traitSums: Record<BigFiveTrait, number> = {
        openness: 0,
        conscientiousness: 0,
        extraversion: 0,
        agreeableness: 0,
        neuroticism: 0
      };
      const traitCounts: Record<BigFiveTrait, number> = {
        openness: 0,
        conscientiousness: 0,
        extraversion: 0,
        agreeableness: 0,
        neuroticism: 0
      };
      PERSONALITY_QUESTIONS.forEach(q => {
        const raw = answers[q.id] || 3;
        const score = q.isReverse ? 6 - raw : raw;
        traitSums[q.trait] += score;
        traitCounts[q.trait] += 1;
      });
      const finalResults: Record<BigFiveTrait, number> = {
        openness: Math.round(((traitSums.openness / (traitCounts.openness * 5)) * 100)),
        conscientiousness: Math.round(((traitSums.conscientiousness / (traitCounts.conscientiousness * 5)) * 100)),
        extraversion: Math.round(((traitSums.extraversion / (traitCounts.extraversion * 5)) * 100)),
        agreeableness: Math.round(((traitSums.agreeableness / (traitCounts.agreeableness * 5)) * 100)),
        neuroticism: Math.round(((traitSums.neuroticism / (traitCounts.neuroticism * 5)) * 100))
      };
      setResults(finalResults);
      setStep('results');
    }, 2000);
  };
  const restart = () => {
    setResults(null);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setStep('intro');
    setTypedSummary('');
  };
  if (step === 'intro') {
    return (
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-bold neon-text-magenta uppercase italic">{dict.testTitle}</h1>
        <p className="text-cyan-500 text-xl font-mono uppercase tracking-widest">{dict.testSub}</p>
        <Card className="bg-black border-2 border-magenta-500 p-8 rounded-none shadow-neon">
          <div className="space-y-6 text-magenta-500 font-mono text-lg">
            <p className="leading-relaxed">
              &gt; INITIALIZING PSYCHOMETRIC ENGINE...<br />
              &gt; OBJECTIVE: MAP NEURAL TOPOLOGY THROUGH BIG-FIVE TRAIT EXTRACTION.<br />
              &gt; DURATION: 25 DATA PACKETS REQUIRED.
            </p>
            <Button 
              onClick={() => setStep('testing')}
              className="bg-magenta-500 text-black hover:bg-magenta-400 font-bold px-12 py-6 text-2xl rounded-none uppercase shadow-neon"
            >
              START_UPLINK
            </Button>
          </div>
        </Card>
      </div>
    );
  }
  if (step === 'testing' && !results) {
    const q = PERSONALITY_QUESTIONS[currentQuestionIndex];
    return (
      <div className="max-w-2xl mx-auto space-y-12">
        <div className="space-y-4">
          <div className="flex justify-between items-end font-mono text-cyan-500 text-xs uppercase">
            <span>{dict.questionCount}: {currentQuestionIndex + 1} / {PERSONALITY_QUESTIONS.length}</span>
            <span>UPLINK_STATUS: STABLE</span>
          </div>
          <Progress value={progress} className="h-2 bg-cyan-950 border border-cyan-500 rounded-none" />
        </div>
        <AnimatePresence mode="wait">
          <motion.div 
            key={q.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-10"
          >
            <h2 className="text-3xl md:text-4xl text-magenta-500 font-bold text-center leading-tight">
              {q.text[language]}
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {[1, 2, 3, 4, 5].map(val => (
                <Button
                  key={val}
                  variant="outline"
                  onClick={() => handleAnswer(val)}
                  className="border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-black rounded-none h-auto py-4 font-mono text-lg transition-all group"
                >
                  <span className="mr-4 opacity-30 group-hover:opacity-100">0{val}</span>
                  {dict[`likert${val}` as keyof typeof dict]}
                </Button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }
  if (step === 'testing' && results) {
    return (
      <div className="flex flex-col items-center justify-center py-40 space-y-8">
        <Loader2 className="w-20 h-20 text-magenta-500 animate-spin" />
        <p className="text-magenta-500 font-mono text-2xl animate-pulse">COMPUTING_NEURAL_SIGNATURE...</p>
      </div>
    );
  }
  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold neon-text-cyan uppercase italic">{dict.resultProfile}</h1>
        <div className="flex justify-center gap-2">
          <Binary className="w-4 h-4 text-cyan-500 animate-bounce" />
          <Binary className="w-4 h-4 text-cyan-500 animate-bounce delay-75" />
          <Binary className="w-4 h-4 text-cyan-500 animate-bounce delay-150" />
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="bg-black border-2 border-magenta-500 p-8 rounded-none shadow-neon space-y-8 h-fit">
          <div className="bg-magenta-500 text-black px-4 py-1 font-bold font-mono text-sm flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            CORE_TRAIT_METRICS.LOG
          </div>
          <div className="space-y-6">
            {(Object.entries(results!) as [BigFiveTrait, number][]).map(([trait, value]) => (
              <div key={trait} className="space-y-2">
                <div className="flex justify-between font-mono text-sm text-magenta-500 uppercase">
                  <span>{TRAIT_METADATA[trait].name[language]}</span>
                  <span>{value}%</span>
                </div>
                <div className="h-4 bg-magenta-950 border border-magenta-500 p-0.5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-magenta-500 shadow-[0_0_10px_#ff00ff]" 
                  />
                </div>
              </div>
            ))}
          </div>
          <Button 
            variant="outline" 
            onClick={restart}
            className="w-full border-magenta-500 text-magenta-500 hover:bg-magenta-500 hover:text-black rounded-none uppercase font-bold"
          >
            <RefreshCcw className="mr-2 w-4 h-4" />
            {dict.restartTest}
          </Button>
        </Card>
        <div className="space-y-6">
          <h3 className="text-cyan-500 font-mono text-xl underline uppercase italic tracking-tighter">DECODED_ANALYSIS</h3>
          <div className="grid gap-4">
            {(Object.entries(results!) as [BigFiveTrait, number][]).map(([trait, value]) => (
              <motion.div 
                key={trait} 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="border-l-4 border-cyan-500 bg-cyan-500/5 p-4 space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="text-cyan-500 font-bold uppercase">{TRAIT_METADATA[trait].name[language]}</span>
                  <span className="text-[10px] text-cyan-500/50 uppercase font-mono">
                    {value > 50 ? dict.traitHigh : dict.traitLow}
                  </span>
                </div>
                <p className="text-cyan-500/80 font-mono text-sm leading-relaxed">
                  &gt; {value > 50 ? TRAIT_METADATA[trait].highDesc[language] : TRAIT_METADATA[trait].lowDesc[language]}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}