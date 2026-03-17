import React, { useState, useEffect, useMemo } from 'react';
import { useAstroStore } from '@/lib/store';
import { I18N, PERSONALITY_QUESTIONS, TRAIT_METADATA, ENNEAGRAM_QUESTIONS, ENNEAGRAM_METADATA } from '@shared/astrology-data';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Loader2, ShieldCheck, RefreshCcw, Binary, Printer, Zap } from 'lucide-react';
import type { BigFiveTrait, EnneagramType } from '@shared/types';
type TestMode = 'BIG_FIVE' | 'ENNEAGRAM';
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
  const bigFiveResults = useAstroStore(s => s.personalityResults);
  const setBigFiveResults = useAstroStore(s => s.setPersonalityResults);
  const enneagramResults = useAstroStore(s => s.enneagramResults);
  const setEnneagramResults = useAstroStore(s => s.setEnneagramResults);
  const dict = I18N[language];
  const [testMode, setTestMode] = useState<TestMode>('BIG_FIVE');
  const [step, setStep] = useState<'intro' | 'testing' | 'results'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isComputing, setIsComputing] = useState(false);
  // Derived Values
  const questions = useMemo(() => 
    testMode === 'BIG_FIVE' ? PERSONALITY_QUESTIONS : ENNEAGRAM_QUESTIONS, 
  [testMode]);
  const hasResults = useMemo(() => 
    (testMode === 'BIG_FIVE' && !!bigFiveResults) || (testMode === 'ENNEAGRAM' && !!enneagramResults),
  [testMode, bigFiveResults, enneagramResults]);
  useEffect(() => {
    if (hasResults) setStep('results');
    else setStep('intro');
    // Reset state when switching modes
    setCurrentQuestionIndex(0);
    setAnswers({});
  }, [testMode, hasResults]);
  const progress = (currentQuestionIndex / questions.length) * 100;
  const handleAnswer = (value: number) => {
    setAnswers(prev => ({ ...prev, [questions[currentQuestionIndex].id]: value }));
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      finalizeTest();
    }
  };
  const finalizeTest = () => {
    setIsComputing(true);
    setTimeout(() => {
      if (testMode === 'BIG_FIVE') {
        const traitSums: Record<BigFiveTrait, number> = { openness: 0, conscientiousness: 0, extraversion: 0, agreeableness: 0, neuroticism: 0 };
        const traitCounts: Record<BigFiveTrait, number> = { openness: 0, conscientiousness: 0, extraversion: 0, agreeableness: 0, neuroticism: 0 };
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
        setBigFiveResults(finalResults);
      } else {
        const typeSums: Record<EnneagramType, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
        ENNEAGRAM_QUESTIONS.forEach(q => {
          const raw = answers[q.id] || 3;
          typeSums[q.type] += raw;
        });
        // Normalize to 100 (5 questions * max 5 = 25 per type)
        const finalResults: Record<EnneagramType, number> = Object.keys(typeSums).reduce((acc, key) => {
          const type = parseInt(key) as EnneagramType;
          acc[type] = Math.round((typeSums[type] / 25) * 100);
          return acc;
        }, {} as Record<EnneagramType, number>);
        setEnneagramResults(finalResults);
      }
      setIsComputing(false);
      setStep('results');
    }, 2500);
  };
  const restart = () => {
    if (testMode === 'BIG_FIVE') setBigFiveResults(null);
    else setEnneagramResults(null);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setStep('intro');
  };
  const enneagramAnalysis = useMemo(() => {
    if (testMode !== 'ENNEAGRAM' || !enneagramResults) return null;
    const scores = Object.entries(enneagramResults) as [string, number][];
    scores.sort((a, b) => b[1] - a[1]);
    const core = parseInt(scores[0][0]) as EnneagramType;
    // Wing detection (highest adjacent type)
    const left = core === 1 ? 9 : core - 1;
    const right = core === 9 ? 1 : core + 1;
    const wing = enneagramResults[left as EnneagramType] > enneagramResults[right as EnneagramType] ? left : right;
    return { core, wing };
  }, [testMode, enneagramResults]);
  if (isComputing) {
    return (
      <div className="flex flex-col items-center justify-center py-40 space-y-8">
        <div className="relative">
          <Loader2 className="w-24 h-24 text-magenta-500 animate-spin" />
          <Binary className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-cyan-500 animate-pulse" />
        </div>
        <div className="text-center space-y-2">
          <p className="text-magenta-500 font-mono text-2xl animate-pulse tracking-tighter uppercase italic">DECODING_NEURAL_SIGNATURE...</p>
          <p className="text-cyan-500 font-mono text-xs opacity-50 uppercase">Accessing {testMode} logic gates</p>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="flex flex-col items-center gap-6">
        <Tabs value={testMode} onValueChange={(v) => setTestMode(v as TestMode)} className="w-full max-w-md">
          <TabsList className="grid grid-cols-2 bg-black border-2 border-magenta-500 p-1 h-auto rounded-none">
            <TabsTrigger value="BIG_FIVE" className="data-[state=active]:bg-magenta-500 data-[state=active]:text-black rounded-none font-mono uppercase text-xs sm:text-sm py-2">{dict.bigFiveMode}</TabsTrigger>
            <TabsTrigger value="ENNEAGRAM" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black rounded-none font-mono uppercase text-xs sm:text-sm py-2">{dict.enneagramMode}</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {step === 'intro' && (
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.h1 initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-5xl md:text-7xl font-bold neon-text-magenta uppercase italic tracking-tighter">
            {testMode === 'BIG_FIVE' ? dict.testTitle : dict.enneagramMode}
          </motion.h1>
          <p className="text-cyan-500 text-xl font-mono uppercase tracking-[0.2em]">{dict.testSub}</p>
          <Card className="bg-black border-2 border-magenta-500 p-8 rounded-none shadow-neon">
            <div className="space-y-6 text-magenta-500 font-mono text-lg text-left border-l-2 border-magenta-500/30 pl-6">
              <p className="leading-relaxed uppercase">
                &gt; INITIALIZING {testMode} ENGINE v4.9.9...<br />
                &gt; OBJECTIVE: MAP NEURAL TOPOLOGY THROUGH {testMode === 'BIG_FIVE' ? '5-FACTOR' : '9-TYPE'} EXTRACTION.<br />
                &gt; STATUS: READY FOR UPLINK.
              </p>
              <div className="flex justify-center pt-4">
                <Button onClick={() => setStep('testing')} className="bg-magenta-500 text-black hover:bg-magenta-400 font-bold px-12 py-6 text-2xl rounded-none uppercase shadow-neon group">
                  <BrainCircuit className="mr-3 w-6 h-6 group-hover:rotate-12 transition-transform" />
                  START_SCAN
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
      {step === 'testing' && (
        <div className="max-w-2xl mx-auto space-y-12">
          <div className="space-y-4">
            <div className="flex justify-between items-end font-mono text-cyan-500 text-xs uppercase">
              <span>{dict.questionCount}: {currentQuestionIndex + 1} / {questions.length}</span>
              <span className="animate-pulse">STREAMING_DATA...</span>
            </div>
            <div className="h-3 bg-cyan-950 border border-cyan-500 p-0.5">
              <motion.div className="h-full bg-cyan-500 shadow-neon-cyan" initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={questions[currentQuestionIndex].id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
              <h2 className="text-3xl md:text-4xl text-magenta-500 font-bold text-center leading-tight min-h-[5rem] flex items-center justify-center">
                {questions[currentQuestionIndex].text[language]}
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {[1, 2, 3, 4, 5].map(val => (
                  <Button key={val} variant="outline" onClick={() => handleAnswer(val)} className="border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-black rounded-none h-auto py-4 font-mono text-lg transition-all group relative overflow-hidden">
                    <span className="mr-4 opacity-30 group-hover:opacity-100 font-bold">[{val}]</span>
                    {dict[`likert${val}` as keyof typeof dict]}
                    <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
      {step === 'results' && testMode === 'BIG_FIVE' && bigFiveResults && (
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="bg-black border-2 border-magenta-500 p-8 rounded-none shadow-neon space-y-8 h-fit relative">
            <div className="bg-magenta-500 text-black px-4 py-1 font-bold font-mono text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> CORE_METRICS_V4.LOG
            </div>
            <div className="space-y-6">
              {(Object.entries(bigFiveResults) as [BigFiveTrait, number][]).map(([trait, value], idx) => (
                <div key={trait} className="space-y-2">
                  <div className="flex justify-between font-mono text-sm text-magenta-500 uppercase">
                    <span>{TRAIT_METADATA[trait].name[language]}</span>
                    <span>{value}%</span>
                  </div>
                  <div className="h-4 bg-magenta-950 border border-magenta-500 p-0.5">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 1.5, delay: idx * 0.1 }} className="h-full bg-magenta-500 shadow-[0_0_15px_#ff00ff]" />
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" onClick={restart} className="w-full border-magenta-500 text-magenta-500 hover:bg-magenta-500 hover:text-black rounded-none uppercase font-bold tracking-widest mt-4">
              <RefreshCcw className="mr-2 w-4 h-4" /> {dict.restartTest}
            </Button>
          </Card>
          <div className="space-y-6">
            <h3 className="text-cyan-500 font-mono text-xl underline uppercase italic flex items-center gap-2">
              <div className="w-3 h-3 bg-cyan-500" /> DECODED_ANALYSIS
            </h3>
            <div className="grid gap-4">
              {(Object.entries(bigFiveResults) as [BigFiveTrait, number][]).map(([trait, value], idx) => (
                <motion.div key={trait} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + (idx * 0.1) }} className="border-l-4 border-cyan-500 bg-cyan-500/5 p-4 space-y-2 hover:bg-cyan-500/10">
                  <div className="flex justify-between items-center">
                    <span className="text-cyan-500 font-bold uppercase">{TRAIT_METADATA[trait].name[language]}</span>
                    <span className="text-[10px] text-cyan-500/50 uppercase font-mono px-2 border border-cyan-500/30">{value > 50 ? dict.traitHigh : dict.traitLow}</span>
                  </div>
                  <p className="text-cyan-500/80 font-mono text-sm leading-relaxed">
                    &gt; <TypewriterText text={value > 50 ? TRAIT_METADATA[trait].highDesc[language] : TRAIT_METADATA[trait].lowDesc[language]} delay={1000 + (idx * 200)} />
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
      {step === 'results' && testMode === 'ENNEAGRAM' && enneagramResults && enneagramAnalysis && (
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="bg-black border-2 border-cyan-500 p-8 rounded-none shadow-neon-cyan space-y-8 h-fit">
            <div className="bg-cyan-500 text-black px-4 py-1 font-bold font-mono text-sm flex items-center gap-2">
              <Zap className="w-4 h-4" /> {dict.enneagramMode}.STATUS
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="border-2 border-cyan-500 p-4 text-center">
                <span className="text-[10px] text-cyan-500/50 uppercase block mb-1">{dict.coreType}</span>
                <span className="text-4xl font-bold text-cyan-500 neon-text-cyan">{enneagramAnalysis.core}</span>
                <span className="block text-xs text-cyan-500 mt-1 uppercase">{ENNEAGRAM_METADATA[enneagramAnalysis.core].name[language]}</span>
              </div>
              <div className="border-2 border-magenta-500 p-4 text-center">
                <span className="text-[10px] text-magenta-500/50 uppercase block mb-1">{dict.activeWing}</span>
                <span className="text-4xl font-bold text-magenta-500 neon-text-magenta">{enneagramAnalysis.wing}</span>
                <span className="block text-xs text-magenta-500 mt-1 uppercase">WING_{enneagramAnalysis.wing}</span>
              </div>
            </div>
            <div className="space-y-4">
              {([1, 2, 3, 4, 5, 6, 7, 8, 9] as EnneagramType[]).map((type, idx) => (
                <div key={type} className="space-y-1">
                  <div className="flex justify-between font-mono text-[10px] text-cyan-500 uppercase">
                    <span>T{type} - {ENNEAGRAM_METADATA[type].name[language]}</span>
                    <span>{enneagramResults[type]}%</span>
                  </div>
                  <div className="h-2 bg-cyan-950 border border-cyan-500 p-0.5">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${enneagramResults[type]}%` }} transition={{ duration: 1.5, delay: idx * 0.05 }} className="h-full bg-cyan-500" />
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" onClick={restart} className="w-full border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-black rounded-none uppercase font-bold tracking-widest mt-4">
              <RefreshCcw className="mr-2 w-4 h-4" /> {dict.restartTest}
            </Button>
          </Card>
          <div className="space-y-6">
            <h3 className="text-magenta-500 font-mono text-xl underline uppercase italic flex items-center gap-2">
              <div className="w-3 h-3 bg-magenta-500" /> {dict.typeProfile}: {enneagramAnalysis.core}w{enneagramAnalysis.wing}
            </h3>
            <Card className="bg-magenta-500/5 border-2 border-magenta-500 p-6 space-y-6">
              <div className="space-y-2">
                <span className="text-magenta-500 font-bold uppercase block italic underline decoration-double">{ENNEAGRAM_METADATA[enneagramAnalysis.core].title[language]}</span>
                <p className="text-magenta-500/80 font-mono text-sm leading-relaxed">&gt; {ENNEAGRAM_METADATA[enneagramAnalysis.core].description[language]}</p>
              </div>
              <div className="bg-magenta-500/10 border-l-4 border-magenta-500 p-4 space-y-2">
                <span className="text-xs font-bold text-magenta-500 uppercase flex items-center gap-2">
                  <Printer className="w-3 h-3" /> {dict.adviceProtocol}
                </span>
                <p className="text-magenta-500 font-mono text-sm italic">
                  &gt; <TypewriterText text={ENNEAGRAM_METADATA[enneagramAnalysis.core].advice[language]} delay={500} />
                </p>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}