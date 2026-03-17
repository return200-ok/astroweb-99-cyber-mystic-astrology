import React, { useState, useEffect, useMemo } from 'react';
import { useAstroStore } from '@/lib/store';
import { I18N, PERSONALITY_QUESTIONS, TRAIT_METADATA, ENNEAGRAM_QUESTIONS, ENNEAGRAM_METADATA } from '@shared/astrology-data';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Loader2, ShieldCheck, RefreshCcw, Binary, Printer, Zap, Terminal } from 'lucide-react';
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
  const questions = useMemo(() =>
    testMode === 'BIG_FIVE' ? PERSONALITY_QUESTIONS : ENNEAGRAM_QUESTIONS,
  [testMode]);
  const hasResults = useMemo(() =>
    (testMode === 'BIG_FIVE' && !!bigFiveResults) || (testMode === 'ENNEAGRAM' && !!enneagramResults),
  [testMode, bigFiveResults, enneagramResults]);
  useEffect(() => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    if (hasResults) setStep('results');
    else setStep('intro');
  }, [testMode, hasResults]);
  const progress = (currentQuestionIndex / (questions.length || 1)) * 100;
  const currentQuestion = questions[currentQuestionIndex];
  const handleAnswer = (value: number) => {
    if (!currentQuestion) return;
    const updatedAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(updatedAnswers);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      finalizeTest(updatedAnswers);
    }
  };
  const finalizeTest = (finalAnswers: Record<number, number>) => {
    setIsComputing(true);
    setTimeout(() => {
      if (testMode === 'BIG_FIVE') {
        const traitSums: Record<BigFiveTrait, number> = { openness: 0, conscientiousness: 0, extraversion: 0, agreeableness: 0, neuroticism: 0 };
        const traitCounts: Record<BigFiveTrait, number> = { openness: 0, conscientiousness: 0, extraversion: 0, agreeableness: 0, neuroticism: 0 };
        PERSONALITY_QUESTIONS.forEach(q => {
          const raw = finalAnswers[q.id] ?? 3;
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
          const raw = finalAnswers[q.id] ?? 3;
          typeSums[q.type] += raw;
        });
        const finalResults: Record<EnneagramType, number> = {
          1: Math.round((typeSums[1] / 25) * 100),
          2: Math.round((typeSums[2] / 25) * 100),
          3: Math.round((typeSums[3] / 25) * 100),
          4: Math.round((typeSums[4] / 25) * 100),
          5: Math.round((typeSums[5] / 25) * 100),
          6: Math.round((typeSums[6] / 25) * 100),
          7: Math.round((typeSums[7] / 25) * 100),
          8: Math.round((typeSums[8] / 25) * 100),
          9: Math.round((typeSums[9] / 25) * 100),
        };
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
    const left = core === 1 ? 9 : core - 1;
    const right = core === 9 ? 1 : core + 1;
    const wing = (enneagramResults[left as EnneagramType] ?? 0) > (enneagramResults[right as EnneagramType] ?? 0) ? left : right;
    return { core, wing };
  }, [testMode, enneagramResults]);
  if (isComputing) {
    return (
      <div className="flex flex-col items-center justify-center py-40 space-y-8">
        <div className="relative">
          <motion.div animate={{ rotate: 360, scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
            <Loader2 className="w-24 h-24 text-magenta-500" />
          </motion.div>
          <Binary className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-cyan-500 animate-pulse" />
        </div>
        <div className="text-center space-y-2">
          <p className="text-magenta-500 font-mono text-2xl animate-pulse tracking-tighter uppercase italic neon-text-magenta">DECODING_NEURAL_SIGNATURE...</p>
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
          <Card className="bg-black border-2 border-magenta-500 p-8 rounded-none shadow-neon">
            <div className="space-y-6 text-magenta-500 font-mono text-lg text-left border-l-2 border-magenta-500/30 pl-6">
              <p className="leading-relaxed uppercase">
                &gt; INITIALIZING {testMode} ENGINE...<br />
                &gt; STATUS: READY FOR UPLINK.
              </p>
              <div className="flex justify-center pt-4">
                <Button onClick={() => setStep('testing')} className="bg-magenta-500 text-black hover:bg-magenta-400 font-bold px-12 py-6 text-2xl rounded-none uppercase shadow-neon group">
                  <BrainCircuit className="mr-3 w-6 h-6" /> START_SCAN
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
      {step === 'testing' && currentQuestion && (
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
            <motion.div key={currentQuestion.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
              <h2 className="text-3xl md:text-4xl text-magenta-500 font-bold text-center leading-tight min-h-[5rem] flex items-center justify-center">
                {currentQuestion.text[language]}
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {[1, 2, 3, 4, 5].map(val => (
                  <Button key={val} variant="outline" onClick={() => handleAnswer(val)} className="border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-black rounded-none h-auto py-4 font-mono text-lg transition-all group">
                    <span className="mr-4 opacity-30">[{val}]</span>
                    {(dict as any)[`likert${val}`]}
                  </Button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
      {step === 'results' && (
        <div className="space-y-10">
          <div className="text-center space-y-2">
            <h1 className="text-5xl font-bold neon-text-magenta uppercase italic">{dict.resultProfile}</h1>
            <p className="text-cyan-500 font-mono text-sm tracking-widest">ENCRYPTION: NEURAL-99 [VERIFIED]</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <Card className="bg-black border-2 border-magenta-500 p-8 rounded-none shadow-neon space-y-8">
              {testMode === 'BIG_FIVE' && bigFiveResults && (Object.entries(bigFiveResults) as [BigFiveTrait, number][]).map(([trait, value], idx) => (
                <div key={trait} className="space-y-2">
                  <div className="flex justify-between font-mono text-sm text-magenta-500 uppercase">
                    <span>{TRAIT_METADATA[trait].name[language]}</span>
                    <span>{value}%</span>
                  </div>
                  <div className="h-4 bg-magenta-950 border border-magenta-500 p-0.5">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 1.5, delay: idx * 0.1 }} className="h-full bg-magenta-500 shadow-neon" />
                  </div>
                </div>
              ))}
              {testMode === 'ENNEAGRAM' && enneagramResults && enneagramAnalysis && (
                <div className="space-y-10">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="border-2 border-cyan-500 p-6 text-center bg-cyan-500/5">
                      <p className="text-[10px] text-cyan-500 font-mono mb-2 uppercase">{dict.coreType}</p>
                      <span className="text-7xl font-bold text-cyan-500 neon-text-cyan">{enneagramAnalysis.core}</span>
                    </div>
                    <div className="border-2 border-magenta-500 p-6 text-center bg-magenta-500/5">
                      <p className="text-[10px] text-magenta-500 font-mono mb-2 uppercase">{dict.activeWing}</p>
                      <span className="text-7xl font-bold text-magenta-500 neon-text-magenta">{enneagramAnalysis.wing}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {(Object.entries(enneagramResults) as [string, number][]).map(([type, val]) => (
                      <div key={type} className="border border-magenta-500/30 p-2 text-center">
                        <p className="text-[8px] text-magenta-500 font-mono uppercase">T{type}</p>
                        <div className="h-1 bg-magenta-950 mt-1"><div className="h-full bg-magenta-500" style={{ width: `${val}%` }} /></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex gap-4">
                <Button variant="outline" onClick={restart} className="flex-1 border-magenta-500 text-magenta-500 hover:bg-magenta-500/10 rounded-none uppercase font-bold h-12">
                  <RefreshCcw className="mr-2 w-4 h-4" /> {dict.restartTest}
                </Button>
                <Button variant="outline" className="flex-1 border-cyan-500 text-cyan-500 hover:bg-cyan-500/10 rounded-none uppercase font-bold h-12">
                  <Printer className="mr-2 w-4 h-4" /> EXPORT_LOG
                </Button>
              </div>
            </Card>
            <Card className="bg-black border-2 border-cyan-500 p-0 rounded-none shadow-neon-cyan overflow-hidden">
               <div className="bg-cyan-500 text-black px-4 py-1.5 flex justify-between items-center font-bold font-mono text-sm">
                 <div className="flex items-center gap-2">
                   <Terminal className="w-4 h-4" />
                   <span>{dict.typeProfile}</span>
                 </div>
               </div>
               <div className="p-8 space-y-6 font-mono text-cyan-500">
                  {testMode === 'ENNEAGRAM' && enneagramAnalysis && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-2xl font-bold border-b border-cyan-500/20 pb-2">
                        <Zap className="text-cyan-500 animate-pulse" />
                        <TypewriterText text={`${ENNEAGRAM_METADATA[enneagramAnalysis.core].name[language].toUpperCase()}`} />
                      </div>
                      <div className="p-4 bg-cyan-500/5 border-l-4 border-cyan-500 italic text-sm">
                        <TypewriterText text={ENNEAGRAM_METADATA[enneagramAnalysis.core].description[language]} delay={1000} />
                      </div>
                      <div className="space-y-2 mt-6">
                        <p className="text-xs uppercase font-bold text-magenta-500 flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4" /> {dict.adviceProtocol}
                        </p>
                        <p className="text-xs opacity-80 leading-relaxed">
                          <TypewriterText text={ENNEAGRAM_METADATA[enneagramAnalysis.core].advice[language]} delay={2000} />
                        </p>
                      </div>
                    </div>
                  )}
                  {testMode === 'BIG_FIVE' && bigFiveResults && (
                    <div className="space-y-6">
                       {(Object.entries(bigFiveResults) as [BigFiveTrait, number][]).map(([trait, value], i) => (
                         <div key={trait} className="space-y-1">
                           <p className="text-xs font-bold uppercase text-magenta-500">
                             [{trait.slice(0, 3).toUpperCase()}] {TRAIT_METADATA[trait].name[language]}
                           </p>
                           <p className="text-[10px] opacity-70 italic">
                             <TypewriterText text={value > 50 ? TRAIT_METADATA[trait].highDesc[language] : TRAIT_METADATA[trait].lowDesc[language]} delay={i * 500} />
                           </p>
                         </div>
                       ))}
                    </div>
                  )}
               </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}