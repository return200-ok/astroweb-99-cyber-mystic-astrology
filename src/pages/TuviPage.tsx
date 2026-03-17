import React, { useState } from 'react';
import { useAstroStore } from '@/lib/store';
import { I18N } from '@shared/astrology-data';
import { EARTHLY_BRANCHES, WUXING_COLORS } from '@shared/tuvi-data';
import { calculateTuviChart } from '@/lib/tuvi-logic';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Download, Sparkles, Loader2, RotateCcw } from 'lucide-react';
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
      toPng(node, { backgroundColor: '#09090b', pixelRatio: 2 }).then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `ASTRO_TUVI_${name || 'CHART'}_99.png`;
        link.href = dataUrl;
        link.click();
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
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}>
          <Compass className="w-24 h-24 text-magenta-500" />
        </motion.div>
        <div className="text-center space-y-2">
          <p className="text-magenta-500 font-mono text-2xl animate-pulse uppercase italic neon-text-magenta">CASTING_IMPERIAL_CHART...</p>
          <p className="text-cyan-500 font-mono text-xs opacity-50 uppercase">Syncing Earthly Branches with Stellar Nodes</p>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-5xl md:text-7xl font-bold neon-text-magenta tracking-tighter uppercase italic">{dict.tuviTitle}</h1>
        <p className="text-cyan-500 text-lg md:text-xl font-mono uppercase tracking-widest">{dict.tuviSub}</p>
      </div>
      <AnimatePresence mode="wait">
        {!chart ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}>
            <Card className="max-w-xl mx-auto bg-black border-2 border-magenta-500 p-8 rounded-none shadow-neon">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-magenta-500 font-mono text-sm uppercase">{dict.ownerName}</label>
                  <Input value={name} onChange={e => setName(e.target.value)} placeholder="ENTITY_ID_00" className="bg-black border-magenta-500 text-magenta-500 rounded-none focus:ring-1 focus:ring-magenta-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-magenta-500 font-mono text-sm uppercase">{dict.birthDate}</label>
                    <Input type="date" value={dob} onChange={e => setDob(e.target.value)} className="bg-black border-magenta-500 text-magenta-500 rounded-none h-10 [color-scheme:dark]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-magenta-500 font-mono text-sm uppercase">{dict.birthHour}</label>
                    <select value={hour} onChange={e => setHour(parseInt(e.target.value))} className="w-full bg-black border border-magenta-500 text-magenta-500 p-2 h-10 rounded-none focus:outline-none">
                      {EARTHLY_BRANCHES.map((b, i) => <option key={i} value={i}>{b} ({i*2}-{(i*2+2)%24}h)</option>)}
                    </select>
                  </div>
                </div>
                <Button onClick={handleCalculate} disabled={!dob} className="w-full bg-magenta-500 text-black font-bold h-14 rounded-none hover:shadow-neon transition-all text-xl uppercase italic tracking-tighter">
                  <Compass className="mr-2" /> {dict.calculateChart}
                </Button>
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
            <div id="tuvi-chart-grid" className="grid grid-cols-4 grid-rows-4 gap-0.5 md:gap-1 aspect-square w-full max-w-4xl mx-auto bg-magenta-900/20 border-4 border-magenta-500 p-0.5 md:p-1 relative">
              {/* Center Info Block */}
              <div className="col-start-2 col-end-4 row-start-2 row-end-4 bg-black flex flex-col items-center justify-center text-center p-2 md:p-6 border-2 border-magenta-500 z-10 overflow-hidden">
                <h3 className="text-lg md:text-3xl font-bold text-magenta-500 uppercase italic tracking-tighter leading-none">{chart.ownerName}</h3>
                <div className="text-[7px] md:text-xs font-mono text-cyan-500 space-y-0.5 md:space-y-1 mt-2 md:mt-4">
                  <p>SOLAR: {new Date(chart.birthDate).toLocaleDateString()}</p>
                  <p>LUNAR: {chart.lunarDate}</p>
                  <p className="text-magenta-500 mt-2 font-bold">MỆNH: {chart.menhElement}</p>
                  <p className="text-magenta-500 font-bold">CỤC: {chart.cucElement}</p>
                </div>
                <div className="mt-2 md:mt-4 p-1 border border-magenta-500 animate-pulse">
                  <Sparkles className="w-4 h-4 md:w-8 md:h-8 text-magenta-500" />
                </div>
              </div>
              {/* 12 Palaces */}
              {gridPositions.map(pos => {
                const palace = chart.palaces[pos.id];
                return (
                  <div key={pos.id} style={{ gridRow: pos.r, gridColumn: pos.c }} className="bg-black border border-magenta-900/40 p-1 md:p-2 flex flex-col relative group hover:bg-magenta-500/5 transition-all">
                    <div className="flex justify-between items-start mb-0.5 md:mb-1">
                      <span className="text-[6px] md:text-[8px] font-mono text-magenta-900">{pos.id}</span>
                      <span className={cn(
                        "text-[8px] md:text-sm font-bold uppercase tracking-tighter",
                        palace.isMenh ? 'bg-magenta-500 text-black px-0.5 md:px-1 shadow-neon' : 'text-magenta-500'
                      )}>{palace.name}</span>
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-0.5 scrollbar-none">
                      {palace.stars.map((star, si) => (
                        <div key={si} style={{ color: WUXING_COLORS[star.wuxing] }} className="text-[7px] md:text-[10px] font-bold leading-none md:leading-tight uppercase truncate">
                          {star.name}
                        </div>
                      ))}
                    </div>
                    <div className="absolute bottom-0.5 right-1 text-[5px] md:text-[8px] font-mono text-magenta-900 uppercase opacity-50">{palace.wuxing}</div>
                    {palace.isThan && <div className="absolute top-0.5 left-1 text-[6px] md:text-[8px] font-bold text-cyan-500 border border-cyan-500 px-0.5 scale-75 md:scale-100">THÂN</div>}
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
              <Button variant="outline" onClick={() => setChart(null)} className="border-magenta-500 text-magenta-500 hover:bg-magenta-500/10 rounded-none uppercase font-bold h-12 flex-1 sm:flex-none sm:px-12">
                <RotateCcw className="mr-2 w-4 h-4" /> CAST_NEW
              </Button>
              <Button onClick={exportChart} className="bg-cyan-500 text-black hover:bg-cyan-400 rounded-none h-12 flex-1 sm:flex-none sm:px-12 font-bold uppercase shadow-neon-cyan">
                <Download className="mr-2 w-4 h-4" /> EXPORT_PNG
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}