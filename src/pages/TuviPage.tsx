import React, { useState } from 'react';
import { useAstroStore } from '@/lib/store';
import { I18N } from '@shared/astrology-data';
import { EARTHLY_BRANCHES, WUXING_COLORS } from '@shared/tuvi-data';
import { calculateTuviChart } from '@/lib/tuvi-logic';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Download, Sparkles, RotateCcw } from 'lucide-react';
import { toPng } from 'html-to-image';
import { TuviChart } from '@shared/types';
import { cn } from '@/lib/utils';
export function TuviPage() {
  const language = useAstroStore(s => s.language);
  const dict = I18N[language];
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [hour, setHour] = useState(0);
  const [chart, setChart] = useState<TuviChart | null>(null);
  const [isCasting, setIsCasting] = useState(false);
  const handleCalculate = () => {
    if (!dob) return;
    setIsCasting(true);
    setTimeout(() => {
      const result = calculateTuviChart(name, new Date(dob), hour);
      setChart(result);
      setIsCasting(false);
    }, 1500);
  };
  const exportChart = () => {
    const node = document.getElementById('tuvi-chart-grid');
    if (node) {
      // Fix: Add fontEmbedCSS and specific styling to avoid html-to-image font.trim runtime errors
      toPng(node, { 
        backgroundColor: '#1e1b4b', 
        pixelRatio: 2,
        fontEmbedCSS: "", 
        style: { fontVariant: "none" }
      })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `CELESTIAL_CHART_${name || 'SOUL'}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Export failed:', err);
      });
    }
  };
  const gridPositions = [
    { r: 4, c: 1, id: 9 }, { r: 4, c: 2, id: 8 }, { r: 4, c: 3, id: 7 }, { r: 4, c: 4, id: 6 },
    { r: 3, c: 1, id: 10 }, { r: 3, c: 4, id: 5 },
    { r: 2, c: 1, id: 11 }, { r: 2, c: 4, id: 4 },
    { r: 1, c: 1, id: 0 }, { r: 1, c: 2, id: 1 }, { r: 1, c: 3, id: 2 }, { r: 1, c: 4, id: 3 },
  ];
  if (isCasting) {
    return (
      <div className="flex flex-col items-center justify-center py-40 space-y-8">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 6, ease: "linear" }}>
          <Compass className="w-24 h-24 text-gold-500" />
        </motion.div>
        <div className="text-center space-y-2">
          <p className="text-gold-500 font-mystic text-2xl animate-pulse uppercase italic mystic-text-glow">{dict.calculateChart.replace('CAST', 'ALIGNING')}...</p>
          <p className="text-gold-500/50 font-serif text-sm italic">Harmonizing Earthly Branches with Celestial Nodes</p>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-5xl md:text-7xl font-mystic font-bold text-gold-500 tracking-tighter uppercase italic mystic-text-glow">{dict.tuviTitle}</h1>
        <p className="text-gold-500/60 text-lg md:text-xl font-serif italic tracking-widest">{dict.tuviSub}</p>
      </div>
      <AnimatePresence mode="wait">
        {!chart ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}>
            <Card className="max-w-xl mx-auto bg-indigo-950/40 backdrop-blur-md border border-gold-500/30 p-8 rounded-2xl shadow-ethereal-glow">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-gold-500 font-mystic text-sm uppercase tracking-widest">{dict.ownerName}</label>
                  <Input value={name} onChange={e => setName(e.target.value)} placeholder="Enter Spirit Identity..." className="bg-indigo-900/50 border-gold-500/30 text-gold-500 placeholder:text-gold-900/50 rounded-full focus:ring-1 focus:ring-gold-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-gold-500 font-mystic text-sm uppercase tracking-widest">{dict.birthDate}</label>
                    <Input type="date" value={dob} onChange={e => setDob(e.target.value)} className="bg-indigo-900/50 border-gold-500/30 text-gold-500 rounded-full h-10 [color-scheme:dark]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-gold-500 font-mystic text-sm uppercase tracking-widest">{dict.birthHour}</label>
                    <select value={hour} onChange={e => setHour(parseInt(e.target.value))} className="w-full bg-indigo-900/50 border border-gold-500/30 text-gold-500 p-2 h-10 rounded-full focus:outline-none appearance-none px-4">
                      {EARTHLY_BRANCHES.map((b, i) => <option key={i} value={i} className="bg-indigo-950">{b} ({i*2}-{(i*2+2)%24}h)</option>)}
                    </select>
                  </div>
                </div>
                <Button onClick={handleCalculate} disabled={!dob} className="w-full bg-gold-500 text-indigo-900 font-mystic font-bold h-14 rounded-full hover:bg-gold-400 hover:shadow-ethereal-glow transition-all text-xl uppercase italic tracking-widest">
                  <Compass className="mr-2" /> {dict.calculateChart}
                </Button>
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
            <div id="tuvi-chart-grid" className="grid grid-cols-4 grid-rows-4 gap-0.5 md:gap-1 aspect-square w-full max-w-4xl mx-auto bg-indigo-950 border-2 border-gold-500/50 p-1 relative shadow-ethereal-glow overflow-hidden">
              <div className="absolute inset-0 opacity-10 pointer-events-none celestial-bg" />
              {/* Center Info Block */}
              <div className="col-start-2 col-end-4 row-start-2 row-end-4 bg-indigo-900/80 backdrop-blur-md flex flex-col items-center justify-center text-center p-2 md:p-6 border-2 border-gold-500 z-10 overflow-hidden shadow-inner-glow">
                <h3 className="text-lg md:text-3xl font-mystic font-bold text-gold-500 uppercase italic tracking-tighter leading-tight mystic-text-glow">{chart.ownerName}</h3>
                <div className="text-[7px] md:text-xs font-serif text-gold-500/80 space-y-0.5 md:space-y-1 mt-2 md:mt-4 italic">
                  <p>SOLAR: {new Date(chart.birthDate).toLocaleDateString()}</p>
                  <p>LUNAR: {chart.lunarDate}</p>
                  <p className="text-gold-500 mt-2 font-mystic">MỆNH: {chart.menhElement}</p>
                  <p className="text-gold-500 font-mystic">CỤC: {chart.cucElement}</p>
                </div>
                <div className="mt-2 md:mt-4 p-1 border border-gold-500/30 rounded-full animate-pulse">
                  <Sparkles className="w-4 h-4 md:w-8 md:h-8 text-gold-500" />
                </div>
              </div>
              {/* 12 Palaces */}
              {gridPositions.map(pos => {
                const palace = chart.palaces[pos.id];
                return (
                  <div key={pos.id} style={{ gridRow: pos.r, gridColumn: pos.c }} className="bg-indigo-950/60 border border-gold-500/10 p-1 md:p-2 flex flex-col relative group hover:bg-gold-500/5 transition-all">
                    <div className="flex justify-between items-start mb-0.5 md:mb-1">
                      <span className="text-[6px] md:text-[8px] font-serif text-gold-500/30 italic">{pos.id}</span>
                      <span className={cn(
                        "text-[8px] md:text-sm font-mystic font-bold uppercase tracking-tighter",
                        palace.isMenh ? 'text-gold-500 border-b border-gold-500/50 mb-0.5' : 'text-gold-500/80'
                      )}>{palace.name}</span>
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-0.5 scrollbar-none">
                      {palace.stars.map((star, si) => (
                        <div key={si} style={{ color: WUXING_COLORS[star.wuxing], textShadow: '0 0 2px rgba(0,0,0,0.5)' }} className="text-[7px] md:text-[10px] font-bold leading-none md:leading-tight uppercase truncate">
                          {star.name}
                        </div>
                      ))}
                    </div>
                    <div className="absolute bottom-0.5 right-1 text-[5px] md:text-[8px] font-serif italic text-gold-500/20 uppercase">{palace.wuxing}</div>
                    {palace.isThan && <div className="absolute top-0.5 left-1 text-[6px] md:text-[8px] font-bold text-gold-500 border border-gold-500/30 px-0.5 scale-75 md:scale-100 rounded-sm">THÂN</div>}
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
              <Button variant="outline" onClick={() => setChart(null)} className="border-gold-500/50 text-gold-500 hover:bg-gold-500/10 rounded-full uppercase font-mystic font-bold h-12 flex-1 sm:flex-none sm:px-12">
                <RotateCcw className="mr-2 w-4 h-4" /> RE-CAST
              </Button>
              <Button onClick={exportChart} className="bg-gold-500 text-indigo-900 hover:bg-gold-400 rounded-full h-12 flex-1 sm:flex-none sm:px-12 font-mystic font-bold uppercase shadow-ethereal-glow">
                <Download className="mr-2 w-4 h-4" /> EXPORT_CHART
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}