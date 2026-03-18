import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IChingLineType } from '@shared/types';
import { cn } from '@/lib/utils';
interface StalkProps {
  index: number;
  line: IChingLineType;
  isLanding: boolean;
}
const Stalk = ({ index, line, isLanding }: StalkProps) => {
  // Randomize initial fall position and rotation for each stalk
  const randomX = useMemo(() => Math.floor(Math.random() * 40) - 20, []);
  const randomRotate = useMemo(() => Math.floor(Math.random() * 30) - 15, []);
  const isYin = line === 6 || line === 8;
  return (
    <div className="relative flex flex-col items-center w-full h-12">
      {/* Ghostly Line Reveal beneath the stalk */}
      <AnimatePresence>
        {isLanding && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center gap-4 px-4 pointer-events-none"
          >
            {isYin ? (
              <>
                <div className="h-1 flex-1 bg-gold-500/20 rounded-full blur-[1px]" />
                <div className="w-8" />
                <div className="h-1 flex-1 bg-gold-500/20 rounded-full blur-[1px]" />
              </>
            ) : (
              <div className="h-1 w-full bg-gold-500/20 rounded-full blur-[1px]" />
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {/* The Mystic Grass Stalk */}
      <motion.div
        initial={{ y: -500, x: randomX, rotate: randomRotate, opacity: 0 }}
        animate={{ 
          y: 0, 
          x: 0, 
          rotate: 0, 
          opacity: 1,
          transition: { type: "spring", damping: 15, stiffness: 60, delay: 0.1 }
        }}
        className={cn(
          "relative z-20 w-1.5 h-16 rounded-full shadow-lg",
          "bg-gradient-to-b from-emerald-400 via-forest-600 to-emerald-900",
          "border border-emerald-300/20"
        )}
      >
        {/* Glowing Tip */}
        <motion.div 
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-gold-400 rounded-full blur-sm shadow-ethereal-glow" 
        />
        {/* Subtle Wind Sway once landed */}
        <motion.div
          animate={{ rotate: [-1, 1, -1] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="w-full h-full"
        />
      </motion.div>
    </div>
  );
};
interface IChingCastingAltarProps {
  lines: IChingLineType[];
  isCasting: boolean;
}
export function IChingCastingAltar({ lines, isCasting }: IChingCastingAltarProps) {
  // We reverse lines for the altar display because I Ching lines are built from bottom to top
  const displayLines = useMemo(() => [...lines].reverse(), [lines]);
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-[3/4] sm:aspect-square bg-gradient-to-b from-indigo-950/20 to-indigo-900/40 rounded-[3rem] border border-gold-500/10 overflow-hidden shadow-inner-glow flex flex-col items-center justify-center p-8 gap-4">
      {/* Constellation SVG Overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 400 400">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {/* Draw lines between landed stalks */}
        {lines.length > 1 && lines.map((_, i) => {
          if (i === 0) return null;
          // Calculate positions for 6 slots in the center
          const getY = (idx: number) => 350 - (idx * 60);
          const x = 200;
          return (
            <motion.line
              key={`constellation-${i}`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.4 }}
              transition={{ duration: 1 }}
              x1={x}
              y1={getY(i - 1)}
              x2={x}
              y2={getY(i)}
              stroke="#ffd700"
              strokeWidth="1"
              strokeDasharray="4 2"
              filter="url(#glow)"
            />
          );
        })}
      </svg>
      {/* Altar Surface Patterns */}
      <div className="absolute inset-0 opacity-5 pointer-events-none select-none flex items-center justify-center">
        <div className="w-64 h-64 border-2 border-gold-500 rounded-full animate-[spin_20s_linear_infinite]" />
        <div className="absolute w-48 h-48 border border-gold-500 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
      </div>
      {/* Render the Stalks */}
      <div className="flex flex-col-reverse items-center justify-center w-full gap-4 relative z-20">
        {[0, 1, 2, 3, 4, 5].map((idx) => {
          const line = lines[idx];
          return (
            <div key={idx} className="w-full flex justify-center h-12">
              {line !== undefined && (
                <Stalk index={idx} line={line} isLanding={true} />
              )}
            </div>
          );
        })}
      </div>
      {/* Empty Slots visualization */}
      {lines.length === 0 && !isCasting && (
        <div className="text-gold-500/20 font-mystic text-xs uppercase tracking-[0.5em] animate-pulse">
          Altar Ready
        </div>
      )}
    </div>
  );
}