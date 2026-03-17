import React from 'react';
import { motion } from 'framer-motion';
import { ZODIAC_SIGNS, I18N } from '@shared/astrology-data';
import { useAstroStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';
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
      <Card className="bg-black border-2 border-magenta-500 shadow-neon rounded-none overflow-hidden">
        <div className="bg-magenta-500 text-black px-4 py-1 flex items-center gap-2 font-bold font-mono text-sm">
          <ShieldCheck className="w-4 h-4" />
          <span>{dict.deepScanTitle}</span>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + (idx * 0.1) }}
              className="space-y-2"
            >
              <h3 className="text-magenta-500 font-bold uppercase underline decoration-double text-sm tracking-tighter">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.data.map((item, i) => (
                  <li key={i} className="text-magenta-500/80 text-xs font-mono flex items-start gap-2">
                    <span className="text-magenta-500">[&gt;]</span>
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