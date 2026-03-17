import React, { useState, useEffect, useMemo } from 'react';
import { useAstroStore } from '@/lib/store';
import { I18N, PERSONALITY_QUESTIONS, TRAIT_METADATA, ENNEAGRAM_QUESTIONS, ENNEAGRAM_METADATA } from '@shared/astrology-data';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Sparkles, RefreshCcw, Sun, Scroll, Star } from 'lucide-react';
import type { BigFiveTrait, EnneagramType, I18nDictionary } from '@shared/types';
type TestMode = 'BIG_FIVE' | 'ENNEAGRAM';
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
          if (typeSums[q.type] !== undefined) typeSums[q.type] += raw;
        });
        const finalResults: Record<EnneagramType, number> = {
          1: Math.round((typeSums[1] / 5) * 20),
          2: Math.round((typeSums[2] / 5) * 20),
          3: Math.round((typeSums[3] / 5) * 20),
          4: Math.round((typeSums[4] / 5) * 20),
          5: Math.round((typeSums[5] / 5) * 20),
          6: Math.round((typeSums[6] / 5) * 20),
          7: Math.round((typeSums[7] / 5) * 20),
          8: Math.round((typeSums[8] / 5) * 20),
          9: Math.round((typeSums[9] / 5) * 20),
        } as Record<EnneagramType, number>;
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
    if (scores.length === 0) return null;
    scores.sort((a, b) => b[1] - a[1]);
    const core = parseInt(scores[0][0]) as EnneagramType;
    if (isNaN(core)) return null;
    const left = core === 1 ? 9 : core - 1;
    const right = core === 9 ? 1 : core + 1;
    const wing = (enneagramResults[left as EnneagramType] ?? 0) > (enneagramResults[right as EnneagramType] ?? 0) ? left : right;
    return { core, wing };
  }, [testMode, enneagramResults]);
  if (isComputing) {
    return (
      <div className="flex flex-col items-center justify-center py-40 space-y-8">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }}>
          <Sun className="w-24 h-24 text-gold-500 shadow-ethereal-glow" />
        </motion.div>
        <p className="text-gold-500 font-mystic text-2xl animate-pulse tracking-widest uppercase italic">{dict.computing}</p>
      </div>
    );
  }
  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="flex justify-center">
        <Tabs value={testMode} onValueChange={(v) => setTestMode(v as TestMode)} className="w-full max-w-md">
          <TabsList className="grid grid-cols-2 bg-indigo-950/50 border border-gold-500/30 p-1 h-auto rounded-full">
            <TabsTrigger value="BIG_FIVE" className="data-[state=active]:bg-gold-500 data-[state=active]:text-indigo-900 rounded-full font-mystic uppercase text-xs py-2">{dict.bigFiveMode}</TabsTrigger>
            <TabsTrigger value="ENNEAGRAM" className="data-[state=active]:bg-gold-500 data-[state=active]:text-indigo-900 rounded-full font-mystic uppercase text-xs py-2">{dict.enneagramMode}</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {step === 'intro' && (
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-mystic font-bold text-gold-500 uppercase italic tracking-tighter text-center">
            {testMode === 'BIG_FIVE' ? dict.testTitle : dict.enneagramMode}
          </h1>
          <Card className="bg-indigo-950/40 border border-gold-500/30 p-12 rounded-3xl shadow-ethereal-glow">
            <div className="space-y-8 text-gold-500/80 font-serif text-xl italic leading-relaxed">
              <p>“Before the stars can guide you, the inner self must be revealed.”</p>
              <Button onClick={() => setStep('testing')} className="bg-gold-500 text-indigo-900 font-mystic font-bold px-16 py-8 text-2xl rounded-full hover:bg-gold-400 hover:shadow-ethereal-glow transition-all uppercase tracking-widest h-auto">
                <Sparkles className="mr-3 w-6 h-6" /> BEGIN REVELATION
              </Button>
            </div>
          </Card>
        </div>
      )}
      {step === 'testing' && currentQuestion && (
        <div className="max-w-2xl mx-auto space-y-12">
          <div className="space-y-4">
             <div className="flex justify-between items-end font-mystic text-gold-500 text-[10px] uppercase tracking-widest">
              <span>{dict.questionCount}: {currentQuestionIndex + 1} / {questions.length}</span>
              <span className="animate-pulse">CHANNELING...</span>
            </div>
            <div className="h-1.5 bg-indigo-900/50 rounded-full overflow-hidden">
              <motion.div className="h-full bg-gold-500 shadow-ethereal-glow" initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={currentQuestion.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-10">
              <h2 className="text-3xl md:text-4xl text-gold-500 font-serif italic text-center leading-tight min-h-[5rem] flex items-center justify-center">
                {currentQuestion.text[language]}
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {[1, 2, 3, 4, 5].map(val => (
                  <Button 
                    key={val} 
                    variant="outline" 
                    onClick={() => handleAnswer(val)} 
                    className="border border-gold-500/30 text-gold-500 hover:bg-gold-500 hover:text-indigo-900 rounded-full h-auto py-5 font-mystic text-lg transition-all"
                  >
                    {dict[`likert${val}` as keyof I18nDictionary] as string}
                  </Button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
      {step === 'results' && (
        <div className="space-y-12">
          <h1 className="text-5xl font-mystic font-bold text-gold-500 text-center uppercase italic mystic-text-glow">{dict.resultProfile}</h1>
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <Card className="bg-indigo-950/40 border border-gold-500/30 p-10 rounded-3xl shadow-ethereal-glow space-y-8">
              {testMode === 'BIG_FIVE' && bigFiveResults && (Object.entries(bigFiveResults) as [BigFiveTrait, number][]).map(([trait, value], idx) => (
                <div key={trait} className="space-y-2">
                  <div className="flex justify-between font-mystic text-xs text-gold-500/80 uppercase tracking-widest">
                    <span>{TRAIT_METADATA[trait].name[language]}</span>
                    <span>{value}%</span>
                  </div>
                  <div className="h-2 bg-indigo-900/50 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 1.5, delay: idx * 0.1 }} className="h-full bg-gold-500 shadow-ethereal-glow" />
                  </div>
                </div>
              ))}
              {testMode === 'ENNEAGRAM' && enneagramResults && enneagramAnalysis && (
                <div className="space-y-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="border border-gold-500/30 p-6 text-center bg-gold-500/5 rounded-2xl">
                      <p className="text-[10px] text-gold-500 font-mystic mb-2 uppercase tracking-widest">{dict.coreType}</p>
                      <span className="text-7xl font-mystic font-bold text-gold-500 drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">{enneagramAnalysis.core}</span>
                    </div>
                    <div className="border border-gold-500/30 p-6 text-center bg-gold-500/5 rounded-2xl">
                      <p className="text-[10px] text-gold-500 font-mystic mb-2 uppercase tracking-widest">{dict.activeWing}</p>
                      <span className="text-7xl font-mystic font-bold text-gold-500/50">{enneagramAnalysis.wing}</span>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex gap-4">
                <Button variant="outline" onClick={restart} className="flex-1 border-gold-500/50 text-gold-500 hover:bg-gold-500 hover:text-indigo-900 rounded-full uppercase font-mystic font-bold h-14">
                  <RefreshCcw className="mr-2 w-4 h-4" /> PURIFY
                </Button>
              </div>
            </Card>
            <Card className="bg-indigo-950/60 backdrop-blur-md border border-gold-500/30 p-10 rounded-3xl shadow-ethereal-glow">
               <div className="space-y-6 font-serif italic text-gold-500/90 text-lg leading-relaxed">
                  <div className="flex items-center gap-3 mb-4">
                    <Scroll className="text-gold-500 w-8 h-8" />
                    <h2 className="text-3xl font-mystic not-italic uppercase tracking-widest">{dict.typeProfile}</h2>
                  </div>
                  {testMode === 'ENNEAGRAM' && enneagramAnalysis && ENNEAGRAM_METADATA[enneagramAnalysis.core] && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-mystic not-italic text-gold-500 uppercase">{ENNEAGRAM_METADATA[enneagramAnalysis.core].name[language]}</h3>
                      <p className="text-gold-500/90">{ENNEAGRAM_METADATA[enneagramAnalysis.core].description[language]}</p>
                      <div className="pt-6 border-t border-gold-500/20">
                         <p className="text-xs uppercase font-mystic not-italic text-gold-500 mb-2 flex items-center gap-2 font-bold tracking-widest">
                           <Star className="w-4 h-4" /> {dict.adviceProtocol}
                         </p>
                         <p className="text-sm text-gold-500/80 leading-relaxed font-serif italic">{ENNEAGRAM_METADATA[enneagramAnalysis.core].advice[language]}</p>
                      </div>
                    </div>
                  )}
                  {testMode === 'BIG_FIVE' && bigFiveResults && (
                    <div className="space-y-6">
                       {(Object.entries(bigFiveResults) as [BigFiveTrait, number][]).map(([trait, value]) => (
                         <div key={trait} className="space-y-1">
                           <p className="text-xs font-mystic not-italic uppercase text-gold-500 tracking-tighter font-bold">
                             {TRAIT_METADATA[trait].name[language]}
                           </p>
                           <p className="text-sm text-gold-500/80 italic font-serif">
                             {value > 50 ? TRAIT_METADATA[trait].highDesc[language] : TRAIT_METADATA[trait].lowDesc[language]}
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