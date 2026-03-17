import React, { useState } from 'react';
import { useAstroStore } from '@/lib/store';
import { I18N, ZODIAC_SIGNS } from '@shared/astrology-data';
import { EARTHLY_BRANCHES, WUXING_COLORS } from '@shared/tuvi-data';
import { calculateTuviChart } from '@/lib/tuvi-logic';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Compass, Download, Sparkles, Loader2 } from 'lucide-react';
import { toPng } from 'html-to-image';
import { TuviChart } from '@shared/types';
export function TuviPage() {
  const language = useAstroStore(s => s.language);
  const dict = I18N[language];
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [hour, setHour] = useState(0);
  const [chart, setChart] = useState<TuviChart | null>(null);
  const handleCalculate = () => {
    if (!dob) return;
    const result = calculateTuviChart(name, new Date(dob), hour);
    setChart(result);
  };
  const exportChart = () => {
    const node = document.getElementById('tuvi-chart-grid');
    if (node) {
      toPng(node).then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `Tuvi_${name || 'Chart'}.png`;
        link.href = dataUrl;
        link.click();
      });
    }
  };
  // 4x4 grid layout mapping for 12 palaces (0-11)
  // 0  1  2  3
  // 11       4
  // 10       5
  // 9  8  7  6
  const gridPositions = [
    { r: 4, c: 1, id: 9 }, { r: 4, c: 2, id: 8 }, { r: 4, c: 3, id: 7 }, { r: 4, c: 4, id: 6 },
    { r: 3, c: 1, id: 10 }, { r: 3, c: 4, id: 5 },
    { r: 2, c: 1, id: 11 }, { r: 2, c: 4, id: 4 },
    { r: 1, c: 1, id: 0 }, { r: 1, c: 2, id: 1 }, { r: 1, c: 3, id: 2 }, { r: 1, c: 4, id: 3 },
  ];
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold neon-text-magenta tracking-tighter uppercase italic">{dict.tuviTitle || 'TỬ VI ĐẨU SỐ'}</h1>
        <p className="text-cyan-500 text-xl font-mono uppercase tracking-widest">{dict.tuviSub || 'EASTERN IMPERIAL ASTROLOGY v9.9'}</p>
      </div>
      {!chart ? (
        <Card className="max-w-xl mx-auto bg-black border-2 border-magenta-500 p-8 rounded-none shadow-neon">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-magenta-500 font-mono text-sm uppercase">{dict.ownerName || 'NAME'}</label>
              <Input value={name} onChange={e => setName(e.target.value)} className="bg-black border-magenta-500 text-magenta-500 rounded-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-magenta-500 font-mono text-sm uppercase">{dict.birthDate || 'DATE'}</label>
                <Input type="date" value={dob} onChange={e => setDob(e.target.value)} className="bg-black border-magenta-500 text-magenta-500 rounded-none" />
              </div>
              <div className="space-y-2">
                <label className="text-magenta-500 font-mono text-sm uppercase">{dict.birthHour || 'HOUR'}</label>
                <select value={hour} onChange={e => setHour(parseInt(e.target.value))} className="w-full bg-black border border-magenta-500 text-magenta-500 p-2 h-10 rounded-none">
                  {EARTHLY_BRANCHES.map((b, i) => <option key={i} value={i}>{b} ({i*2}-{(i*2+2)%24}h)</option>)}
                </select>
              </div>
            </div>
            <Button onClick={handleCalculate} className="w-full bg-magenta-500 text-black font-bold h-12 rounded-none hover:shadow-neon">
              <Compass className="mr-2" /> {dict.calculateChart || 'CAST_CHART'}
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-8">
          <div id="tuvi-chart-grid" className="grid grid-cols-4 grid-rows-4 gap-1 aspect-square max-w-4xl mx-auto bg-magenta-900/20 border-4 border-magenta-500 p-1 relative overflow-hidden">
             {/* Center Block */}
             <div className="col-start-2 col-end-4 row-start-2 row-end-4 bg-black flex flex-col items-center justify-center text-center p-4 border-2 border-magenta-500 z-10">
                <h3 className="text-2xl font-bold text-magenta-500 uppercase">{chart.ownerName}</h3>
                <div className="text-[10px] font-mono text-cyan-500 space-y-1 mt-2">
                  <p>SOLAR: {new Date(chart.birthDate).toLocaleDateString()}</p>
                  <p>LUNAR: {chart.lunarDate}</p>
                  <p className="text-magenta-500 mt-2">MỆNH: {chart.menhElement}</p>
                  <p className="text-magenta-500">CỤC: {chart.cucElement}</p>
                </div>
                <Sparkles className="w-8 h-8 text-magenta-500 mt-4 animate-pulse" />
             </div>
             {/* Palaces */}
             {gridPositions.map(pos => {
               const palace = chart.palaces[pos.id];
               return (
                 <div key={pos.id} style={{ gridRow: pos.r, gridColumn: pos.c }} className="bg-black border border-magenta-900/50 p-2 flex flex-col relative group hover:border-magenta-500 transition-colors">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[10px] font-mono text-magenta-900">{pos.id}</span>
                      <span className={`text-xs font-bold uppercase ${palace.isMenh ? 'bg-magenta-500 text-black px-1' : 'text-magenta-500'}`}>{palace.name}</span>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                      {palace.stars.map((star, si) => (
                        <div key={si} style={{ color: WUXING_COLORS[star.wuxing] }} className="text-[10px] font-bold leading-tight uppercase">
                          {star.name}
                        </div>
                      ))}
                    </div>
                    <div className="absolute bottom-1 right-1 text-[8px] font-mono text-magenta-900 opacity-30">{palace.wuxing}</div>
                    {palace.isThan && <div className="absolute top-1 left-1 text-[8px] font-bold text-cyan-500 border border-cyan-500 px-0.5">THÂN</div>}
                 </div>
               );
             })}
          </div>
          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={() => setChart(null)} className="border-magenta-500 text-magenta-500 rounded-none">CAST_NEW</Button>
            <Button onClick={exportChart} className="bg-cyan-500 text-black rounded-none"><Download className="mr-2" /> EXPORT_PNG</Button>
          </div>
        </div>
      )}
    </div>
  );
}