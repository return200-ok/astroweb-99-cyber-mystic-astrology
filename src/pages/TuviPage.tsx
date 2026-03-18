import React, { useState } from 'react';
import { useAstroStore } from '@/lib/store';
import { I18N } from '@shared/astrology-data';
import { EARTHLY_BRANCHES, WUXING_COLORS } from '@shared/tuvi-data';
import { calculateTuviChart } from '@/lib/tuvi-logic';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Sparkles, RotateCcw, Heart, Calendar, Scroll, Gauge, Loader2, Download } from 'lucide-react';
import { toPng } from 'html-to-image';
import { TuviChart, AgeCompatResponse, AuspiciousDay, ImperialEventType } from '@shared/types';
import { api } from '@/lib/api-client';
import { toast } from 'sonner';
export function TuviPage() {
  const language = useAstroStore(s => s.language);
  const dict = I18N[language];
  // Tab 1: Chart State
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [hour, setHour] = useState(0);
  const [chart, setChart] = useState<TuviChart | null>(null);
  const [isCasting, setIsCasting] = useState(false);
  // Tab 2: Age State
  const [ageForm, setAgeForm] = useState({
    nameA: '', dobA: '', hourA: 0,
    nameB: '', dobB: '', hourB: 0,
    purpose: 'marriage' as ImperialEventType
  });
  const [ageResult, setAgeResult] = useState<AgeCompatResponse | null>(null);
  const [isComparing, setIsComparing] = useState(false);
  // Tab 3: Calendar State
  const [calForm, setCalForm] = useState({
    start: '', end: '', purpose: 'opening' as ImperialEventType
  });
  const [calResults, setCalResults] = useState<AuspiciousDay[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const handleCastChart = () => {
    if (!dob) return;
    setIsCasting(true);
    setTimeout(() => {
      setChart(calculateTuviChart(name, new Date(dob), hour));
      setIsCasting(false);
      toast.success("Stars have been cast.");
    }, 1200);
  };
  const handleAgeCompare = async () => {
    if (!ageForm.dobA || !ageForm.dobB) return;
    setIsComparing(true);
    try {
      const res = await api<AgeCompatResponse>('/api/tuvi/age-compat', {
        method: 'POST',
        body: JSON.stringify({
          personA: { name: ageForm.nameA, dob: ageForm.dobA, hour: ageForm.hourA },
          personB: { name: ageForm.nameB, dob: ageForm.dobB, hour: ageForm.hourB },
          eventType: ageForm.purpose
        })
      });
      setAgeResult(res);
    } catch (e) { 
      console.error(e);
      toast.error("Failed to calculate cosmic alignment.");
    }
    setIsComparing(false);
  };
  const handleDaySearch = async () => {
    if (!calForm.start || !calForm.end) return;
    setIsSearching(true);
    try {
      const res = await api<AuspiciousDay[]>('/api/tuvi/good-days', {
        method: 'POST',
        body: JSON.stringify({
          startDate: calForm.start,
          endDate: calForm.end,
          eventType: calForm.purpose
        })
      });
      setCalResults(res);
      toast.success(`${res.length} auspicious windows found.`);
    } catch (e) { 
      console.error(e);
      toast.error("Failed to seek auspicious windows.");
    }
    setIsSearching(false);
  };
  const exportChart = () => {
    const node = document.getElementById('tuvi-chart-grid');
    if (node) {
      toast.info("Capturing astral projection...");
      toPng(node, {
        backgroundColor: '#1e1b4b',
        pixelRatio: 2,
      }).then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `IMPERIAL_CHART_${name || 'SPIRIT'}.png`;
        link.href = dataUrl;
        link.click();
        toast.success("Chart exported to physical realm.");
      }).catch(err => {
        console.error("Export error:", err);
        toast.error("Failed to export chart. The stars are elusive.");
      });
    }
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-5xl md:text-7xl font-mystic font-bold text-gold-500 uppercase italic mystic-text-glow">{dict.tuviTitle}</h1>
        <p className="text-gold-500/60 text-lg md:text-xl font-serif italic tracking-widest">{dict.tuviSub}</p>
      </div>
      <Tabs defaultValue="chart" className="w-full">
        <TabsList className="grid grid-cols-3 bg-indigo-950/50 border border-gold-500/30 p-1 h-auto rounded-full max-w-2xl mx-auto mb-12">
          <TabsTrigger value="chart" className="data-[state=active]:bg-gold-500 data-[state=active]:text-indigo-900 rounded-full font-mystic uppercase text-xs py-3">{dict.tabChart}</TabsTrigger>
          <TabsTrigger value="age" className="data-[state=active]:bg-gold-500 data-[state=active]:text-indigo-900 rounded-full font-mystic uppercase text-xs py-3">{dict.tabAge}</TabsTrigger>
          <TabsTrigger value="calendar" className="data-[state=active]:bg-gold-500 data-[state=active]:text-indigo-900 rounded-full font-mystic uppercase text-xs py-3">{dict.tabDay}</TabsTrigger>
        </TabsList>
        <TabsContent value="chart" className="focus-visible:ring-0">
          <AnimatePresence mode="wait">
            {!chart ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="max-w-xl mx-auto">
                <Card className="bg-indigo-950/40 backdrop-blur-md border border-gold-500/30 p-8 rounded-3xl shadow-ethereal-glow space-y-6">
                  <div className="space-y-2">
                    <label className="text-gold-500 font-mystic text-xs uppercase tracking-widest">{dict.ownerName}</label>
                    <Input value={name} onChange={e => setName(e.target.value)} className="bg-indigo-900/50 border-gold-500/30 text-gold-500 rounded-full" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-gold-500 font-mystic text-xs uppercase tracking-widest">{dict.birthDate}</label>
                      <Input type="date" value={dob} onChange={e => setDob(e.target.value)} className="bg-indigo-900/50 border-gold-500/30 text-gold-500 rounded-full [color-scheme:dark]" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-gold-500 font-mystic text-xs uppercase tracking-widest">{dict.birthHour}</label>
                      <select value={hour} onChange={e => setHour(parseInt(e.target.value))} className="w-full h-10 bg-indigo-900/50 border border-gold-500/30 text-gold-500 rounded-full appearance-none px-4">
                        {EARTHLY_BRANCHES.map((b, i) => <option key={i} value={i} className="bg-indigo-950">{b}</option>)}
                      </select>
                    </div>
                  </div>
                  <Button onClick={handleCastChart} disabled={isCasting || !dob} className="w-full bg-gold-500 text-indigo-900 font-mystic font-bold h-14 rounded-full uppercase italic tracking-widest">
                    {isCasting ? <Loader2 className="animate-spin" /> : <Compass className="mr-2" />} {dict.calculateChart}
                  </Button>
                </Card>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div id="tuvi-chart-grid" className="grid grid-cols-4 grid-rows-4 gap-1 aspect-square w-full max-w-4xl mx-auto bg-indigo-950 border-2 border-gold-500/50 p-1 relative shadow-ethereal-glow overflow-hidden">
                  <div className="col-start-2 col-end-4 row-start-2 row-end-4 bg-indigo-900/90 flex flex-col items-center justify-center text-center p-6 border-2 border-gold-500 z-10">
                    <h3 className="text-2xl font-mystic font-bold text-gold-500 uppercase">{chart.ownerName}</h3>
                    <div className="text-[10px] text-gold-500/60 mt-4 space-y-1">
                      <p>SOLAR: {new Date(chart.birthDate).toLocaleDateString()}</p>
                      <p>LUNAR: {chart.lunarDate}</p>
                      <p className="text-gold-500 font-mystic pt-2 uppercase tracking-widest">Element: {chart.menhElement}</p>
                    </div>
                  </div>
                  {[9,8,7,6,10,5,11,4,0,1,2,3].map((pid, idx) => {
                    const p = chart.palaces[pid];
                    const gridStyles = [
                      {r: 4, c: 1}, {r: 4, c: 2}, {r: 4, c: 3}, {r: 4, c: 4},
                      {r: 3, c: 1}, {r: 3, c: 4}, {r: 2, c: 1}, {r: 2, c: 4},
                      {r: 1, c: 1}, {r: 1, c: 2}, {r: 1, c: 3}, {r: 1, c: 4}
                    ][idx];
                    return (
                      <div key={pid} style={{ gridRow: gridStyles.r, gridColumn: gridStyles.c }} className="border border-gold-500/10 p-2 flex flex-col relative bg-indigo-950/40">
                        <span className="text-[8px] font-mystic font-bold text-gold-500 uppercase">{p.name}</span>
                        <div className="flex-1 overflow-y-auto space-y-0.5 mt-1">
                          {p.stars.map((s, si) => <div key={si} style={{ color: WUXING_COLORS[s.wuxing] }} className="text-[9px] font-bold leading-none uppercase">{s.name}</div>)}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-center gap-4">
                   <Button variant="outline" onClick={() => setChart(null)} className="border-gold-500/50 text-gold-500 rounded-full font-mystic uppercase h-12 px-8">
                     <RotateCcw className="mr-2 w-4 h-4" /> RE-CAST
                   </Button>
                   <Button onClick={exportChart} className="bg-gold-500 text-indigo-900 rounded-full font-mystic uppercase h-12 px-8 shadow-ethereal-glow">
                     <Download className="mr-2 w-4 h-4" /> EXPORT
                   </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </TabsContent>
        <TabsContent value="age">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <Card className="bg-indigo-950/40 border border-gold-500/30 p-8 rounded-3xl shadow-ethereal-glow space-y-8">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-gold-500 font-mystic text-[10px] uppercase tracking-widest">Soul A</label>
                    <Input value={ageForm.nameA} onChange={e => setAgeForm({...ageForm, nameA: e.target.value})} placeholder="Identity..." className="bg-indigo-900/50 border-gold-500/30 text-gold-500 rounded-full" />
                    <Input type="date" value={ageForm.dobA} onChange={e => setAgeForm({...ageForm, dobA: e.target.value})} className="bg-indigo-900/50 border-gold-500/30 text-gold-500 rounded-full [color-scheme:dark]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-gold-500 font-mystic text-[10px] uppercase tracking-widest">Soul B</label>
                    <Input value={ageForm.nameB} onChange={e => setAgeForm({...ageForm, nameB: e.target.value})} placeholder="Identity..." className="bg-indigo-900/50 border-gold-500/30 text-gold-500 rounded-full" />
                    <Input type="date" value={ageForm.dobB} onChange={e => setAgeForm({...ageForm, dobB: e.target.value})} className="bg-indigo-900/50 border-gold-500/30 text-gold-500 rounded-full [color-scheme:dark]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-gold-500 font-mystic text-[10px] uppercase tracking-widest">Divine Purpose</label>
                  <select value={ageForm.purpose} onChange={e => setAgeForm({...ageForm, purpose: e.target.value as ImperialEventType})} className="w-full h-12 bg-indigo-900/50 border border-gold-500/30 text-gold-500 rounded-full appearance-none px-6">
                    <option value="marriage" className="bg-indigo-950">{dict.eventMarriage}</option>
                    <option value="business" className="bg-indigo-950">{dict.eventBusiness}</option>
                    <option value="kids" className="bg-indigo-950">{dict.eventKids}</option>
                  </select>
                </div>
                <Button onClick={handleAgeCompare} disabled={isComparing || !ageForm.dobA || !ageForm.dobB} className="w-full bg-gold-500 text-indigo-900 font-mystic font-bold h-14 rounded-full uppercase tracking-widest shadow-ethereal-glow">
                  {isComparing ? <Loader2 className="animate-spin" /> : <Heart className="mr-2" />} {dict.calculateMatch}
                </Button>
              </div>
            </Card>
            <AnimatePresence>
              {ageResult && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                  <Card className="bg-indigo-950/60 border border-gold-500/30 p-10 rounded-3xl shadow-ethereal-glow flex flex-col items-center text-center">
                    <div className="relative mb-6">
                      <Gauge className="w-24 h-24 text-gold-500 opacity-20" />
                      <div className="absolute inset-0 flex items-center justify-center text-4xl font-mystic font-bold text-gold-500">{ageResult.score}%</div>
                    </div>
                    <h3 className="text-2xl font-mystic text-gold-500 uppercase italic mb-4">{dict.compatibilityScore}</h3>
                    <div className="flex gap-2 mb-6">
                      {ageResult.elements.map((el, i) => (
                        <span key={i} className="text-[10px] bg-gold-500/10 border border-gold-500/30 px-3 py-1 rounded-full text-gold-500 font-mystic uppercase">
                          {el}
                        </span>
                      ))}
                    </div>
                    <div className="border-t border-gold-500/20 pt-6 w-full text-gold-500/80 font-serif italic text-lg leading-relaxed">
                      <Scroll className="w-8 h-8 text-gold-500/40 mx-auto mb-4" />
                      <p>“{ageResult.analysis}”</p>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </TabsContent>
        <TabsContent value="calendar">
          <div className="max-w-4xl mx-auto space-y-12">
            <Card className="bg-indigo-950/40 border border-gold-500/30 p-8 rounded-3xl shadow-ethereal-glow">
               <div className="grid md:grid-cols-3 gap-6 items-end">
                  <div className="space-y-2">
                    <label className="text-gold-500 font-mystic text-[10px] uppercase tracking-widest">Ascension Window (Start)</label>
                    <Input type="date" value={calForm.start} onChange={e => setCalForm({...calForm, start: e.target.value})} className="bg-indigo-900/50 border-gold-500/30 text-gold-500 rounded-full [color-scheme:dark]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-gold-500 font-mystic text-[10px] uppercase tracking-widest">Ascension Window (End)</label>
                    <Input type="date" value={calForm.end} onChange={e => setCalForm({...calForm, end: e.target.value})} className="bg-indigo-900/50 border-gold-500/30 text-gold-500 rounded-full [color-scheme:dark]" />
                  </div>
                  <Button onClick={handleDaySearch} disabled={isSearching || !calForm.start || !calForm.end} className="bg-gold-500 text-indigo-900 font-mystic font-bold h-10 rounded-full uppercase text-xs tracking-widest">
                    {isSearching ? <Loader2 className="animate-spin" /> : <Calendar className="mr-2 w-4 h-4" />} SEEK_DATES
                  </Button>
               </div>
            </Card>
            <div className="grid gap-6">
              <AnimatePresence>
                {calResults.map((day, idx) => (
                  <motion.div key={day.date} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                    <Card className="bg-indigo-950/20 border-l-4 border-gold-500 p-6 flex items-center gap-8 hover:bg-gold-500/5 transition-all rounded-r-2xl">
                       <div className="text-center min-w-[80px]">
                          <div className="text-gold-500 font-mystic text-xl font-bold">{new Date(day.date).getDate()}</div>
                          <div className="text-gold-500/40 text-[10px] uppercase">{new Date(day.date).toLocaleString('default', { month: 'short' })}</div>
                       </div>
                       <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-3">
                             <span className="text-gold-500 font-mystic font-bold text-sm uppercase italic">{day.type}</span>
                             <div className="h-[1px] flex-1 bg-gold-500/10" />
                          </div>
                          <p className="text-gold-500/70 text-sm font-serif italic">“{day.description}”</p>
                       </div>
                       <div className="flex flex-wrap gap-2 justify-end max-w-[150px]">
                          {day.stars.map(s => <span key={s} className="text-[8px] bg-gold-500/10 text-gold-500 px-2 py-0.5 rounded-full border border-gold-500/20 uppercase font-mystic">{s}</span>)}
                       </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
              {!isSearching && calResults.length === 0 && calForm.start && (
                <div className="text-center py-12 opacity-30 font-serif italic">
                  No specifically auspicious windows found for this period.
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}