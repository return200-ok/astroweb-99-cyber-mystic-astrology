import React, { useState, useEffect } from 'react';
import { useAstroStore } from '@/lib/store';
import { I18N, PERSONALITY_QUESTIONS, TRAIT_METADATA } from '@shared/astrology-data';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Loader2, ShieldCheck, RefreshCcw, Binary, Printer } from 'lucide-react';
import type { BigFiveTrait } from '@shared/types';
function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    setDisplayed('');
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 15);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);
  return (
    <span>
      {displayed}
      {displayed.length < text.length && <span className="inline-block w-1.5 h-3 bg-cyan-500 animate-pulse ml-0.5" />}
    </span>
  );
}
export function PersonalityTestPage() {
  const language = useAstroStore(s => s.language);
  const results = useAstroStore(s => s.personalityResults);
  const setResults = useAstroStore(s => s.setPersonalityResults);
  const dict = I18N[language];
  const [step, setStep] = useState<'intro' | 'testing' | 'results'>(results ? 'results' : 'intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isComputing, setIsComputing] = useState(false);
  const progress = (currentQuestionIndex / PERSONALITY_QUESTIONS.length) * 100;
  const handleAnswer = (value: number) => {
    setAnswers(prev => ({ ...prev, [PERSONALITY_QUESTIONS[currentQuestionIndex].id]: value }));
    if (currentQuestionIndex < PERSONALITY_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      finalizeTest();
    }
  };
  const finalizeTest = () => {
    setIsComputing(true);
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
      setIsComputing(false);
      setStep('results');
    }, 2500);
  };
  const restart = () => {
    setResults(null);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setStep('intro');
  };
  if (isComputing) {
    return (
      <div className="flex flex-col items-center justify-center py-40 space-y-8">
        <div className="relative">
          <Loader2 className="w-24 h-24 text-magenta-500 animate-spin" />
          <Binary className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-cyan-500 animate-pulse" />
        </div>
        <div className="text-center space-y-2">
          <p className="text-magenta-500 font-mono text-2xl animate-pulse tracking-tighter">DECODING_NEURAL_SIGNATURE...</p>
          <p className="text-cyan-500 font-mono text-xs opacity-50 uppercase">Accessing encrypted logic gates</p>
        </div>
      </div>
    );
  }
  if (step === 'intro') {
    return (
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <motion.h1 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          className="text-5xl md:text-7xl font-bold neon-text-magenta uppercase italic tracking-tighter"
        >
          {dict.testTitle}
        </motion.h1>
        <p className="text-cyan-500 text-xl font-mono uppercase tracking-[0.2em]">{dict.testSub}</p>
        <Card className="bg-black border-2 border-magenta-500 p-8 rounded-none shadow-neon">
          <div className="space-y-6 text-magenta-500 font-mono text-lg text-left border-l-2 border-magenta-500/30 pl-6">
            <p className="leading-relaxed">
              &gt; INITIALIZING PSYCHOMETRIC ENGINE v4.9.9...<br />
              &gt; OBJECTIVE: MAP NEURAL TOPOLOGY THROUGH BIG-FIVE EXTRACTION.<br />
              &gt; STATUS: READY FOR UPLINK.
            </p>
            <div className="flex justify-center pt-4">
              <Button
                onClick={() => setStep('testing')}
                className="bg-magenta-500 text-black hover:bg-magenta-400 font-bold px-12 py-6 text-2xl rounded-none uppercase shadow-neon group"
              >
                <BrainCircuit className="mr-3 w-6 h-6 group-hover:rotate-12 transition-transform" />
                START_SCAN
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }
  if (step === 'testing') {
    const q = PERSONALITY_QUESTIONS[currentQuestionIndex];
    return (
      <div className="max-w-2xl mx-auto space-y-12">
        <div className="space-y-4">
          <div className="flex justify-between items-end font-mono text-cyan-500 text-xs uppercase">
            <span>{dict.questionCount}: {currentQuestionIndex + 1} / {PERSONALITY_QUESTIONS.length}</span>
            <span className="animate-pulse">STREAMING_DATA...</span>
          </div>
          <div className="h-3 bg-cyan-950 border border-cyan-500 p-0.5">
            <motion.div 
              className="h-full bg-cyan-500 shadow-neon-cyan"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-10"
          >
            <h2 className="text-3xl md:text-4xl text-magenta-500 font-bold text-center leading-tight min-h-[5rem] flex items-center justify-center">
              {q.text[language]}
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {[1, 2, 3, 4, 5].map(val => (
                <Button
                  key={val}
                  variant="outline"
                  onClick={() => handleAnswer(val)}
                  className="border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-black rounded-none h-auto py-4 font-mono text-lg transition-all group relative overflow-hidden"
                >
                  <span className="mr-4 opacity-30 group-hover:opacity-100 font-bold">[{val}]</span>
                  {dict[`likert${val}` as keyof typeof dict]}
                  <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }
  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold neon-text-cyan uppercase italic tracking-tighter">{dict.resultProfile}</h1>
        <div className="flex justify-center items-center gap-3 font-mono text-cyan-500 text-xs uppercase">
          <Printer className="w-4 h-4 animate-bounce" />
          <span>PRINTING_SYSTEM_REPORT...</span>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="bg-black border-2 border-magenta-500 p-8 rounded-none shadow-neon space-y-8 h-fit relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-10">
            <Binary className="w-20 h-20" />
          </div>
          <div className="bg-magenta-500 text-black px-4 py-1 font-bold font-mono text-sm flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            CORE_METRICS_V4.LOG
          </div>
          <div className="space-y-6">
            {(Object.entries(results!) as [BigFiveTrait, number][]).map(([trait, value], idx) => (
              <motion.div 
                key={trait} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="space-y-2"
              >
                <div className="flex justify-between font-mono text-sm text-magenta-500 uppercase">
                  <span className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-magenta-500" />
                    {TRAIT_METADATA[trait].name[language]}
                  </span>
                  <span>{value}%</span>
                </div>
                <div className="h-4 bg-magenta-950 border border-magenta-500 p-0.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 + (idx * 0.1) }}
                    className="h-full bg-magenta-500 shadow-[0_0_15px_#ff00ff]"
                  />
                </div>
              </motion.div>
            ))}
          </div>
          <Button
            variant="outline"
            onClick={restart}
            className="w-full border-magenta-500 text-magenta-500 hover:bg-magenta-500 hover:text-black rounded-none uppercase font-bold tracking-widest mt-4"
          >
            <RefreshCcw className="mr-2 w-4 h-4" />
            {dict.restartTest}
          </Button>
        </Card>
        <div className="space-y-6">
          <h3 className="text-cyan-500 font-mono text-xl underline decoration-double uppercase italic tracking-tighter flex items-center gap-2">
            <div className="w-3 h-3 bg-cyan-500" />
            DECODED_ANALYSIS
          </h3>
          <div className="grid gap-4">
            {(Object.entries(results!) as [BigFiveTrait, number][]).map(([trait, value], idx) => (
              <motion.div
                key={trait}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + (idx * 0.2) }}
                className="border-l-4 border-cyan-500 bg-cyan-500/5 p-4 space-y-2 hover:bg-cyan-500/10 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <span className="text-cyan-500 font-bold uppercase tracking-tight">{TRAIT_METADATA[trait].name[language]}</span>
                  <span className="text-[10px] text-cyan-500/50 uppercase font-mono px-2 border border-cyan-500/30">
                    {value > 50 ? dict.traitHigh : dict.traitLow}
                  </span>
                </div>
                <p className="text-cyan-500/80 font-mono text-sm leading-relaxed min-h-[3rem]">
                  &gt; <TypewriterText text={value > 50 ? TRAIT_METADATA[trait].highDesc[language] : TRAIT_METADATA[trait].lowDesc[language]} delay={1500 + (idx * 300)} />
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}