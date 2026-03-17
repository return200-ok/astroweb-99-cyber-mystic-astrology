import React from 'react';
import { motion } from 'framer-motion';
import { ZODIAC_SIGNS, I18N } from '@shared/astrology-data';
import { useAstroStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { ScrollText } from 'lucide-react';
interface DeepScanProps {
  signId: string;
}
export function DeepScanPanel({ signId }: DeepScanProps) {
  const language = useAstroStore(s => s.language);
  const dict = I18N[language];
  const sign = ZODIAC_SIGNS.find(s => s.id === signId);
  if (!sign) return null;
  const analysis = sign.analysis[language];
  const sections = [
    { title: dict.analysisPersonality, data: analysis.personality },
    { title: dict.analysisThinking, data: analysis.thinking },
    { title: dict.analysisAttractedTo, data: analysis.attractedTo },
    { title: dict.analysisAttracts, data: analysis.attracts },
    { title: dict.analysisCareer, data: analysis.career },
    { title: dict.analysisNeeds, data: analysis.needs },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-8"
    >
      <Card className="bg-indigo-950/60 backdrop-blur-md border border-gold-500/30 shadow-ethereal-glow rounded-3xl overflow-hidden">
        <div className="bg-gold-500 text-indigo-900 px-6 py-2 flex items-center gap-2 font-bold font-mystic text-xs uppercase tracking-[0.2em]">
          <ScrollText className="w-4 h-4" />
          <span>{dict.deepScanTitle}</span>
        </div>
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + (idx * 0.1) }}
              className="space-y-3"
            >
              <h3 className="text-gold-500 font-mystic font-bold uppercase tracking-widest text-xs border-b border-gold-500/20 pb-1">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.data.map((item, i) => (
                  <li key={i} className="text-gold-500/70 text-sm font-serif italic flex items-start gap-2 leading-tight">
                    <span className="text-gold-500 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}