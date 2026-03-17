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
  const randomX = useMemo(() => Math.floor(Math.random() * 40) - 20, []);
  const randomRotate = useMemo(() => Math.floor(Math.random() * 30) - 15, []);
  const randomPulseDuration = useMemo(() => 2 + Math.random() * 2, []);
  const isYin = line === 6 || line === 8;
  const xOscillation = [randomX, randomX + 4, randomX - 4, randomX + 2, 0];
  const rotateOscillation = [randomRotate, randomRotate + 5, randomRotate - 5, 0];
  return (
    <div className="relative flex flex-col items-center w-full h-12 will-change-transform">
      <AnimatePresence>
        {isLanding && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}
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
      <motion.div
        initial={{ y: -600, x: randomX, rotate: randomRotate, opacity: 0 }}
        animate={{
          y: 0,
          x: xOscillation,
          rotate: rotateOscillation,
          opacity: 1,
        }}
        transition={{
          y: {
            type: "spring",
            damping: 22,
            stiffness: 35,
            restDelta: 0.001,
            delay: 0.1
          },
          x: {
            duration: 1.5,
            times: [0, 0.3, 0.6, 0.8, 1],
            ease: [0.215, 0.61, 0.355, 1]
          },
          rotate: {
            duration: 1.5,
            times: [0, 0.3, 0.6, 1],
            ease: "easeInOut"
          },
          opacity: {
            duration: 0.6,
            ease: "linear"
          }
        }}
        className={cn(
          "relative z-20 w-1.5 h-16 rounded-full shadow-lg",
          "bg-gradient-to-b from-emerald-400 via-emerald-600 to-emerald-900",
          "border border-emerald-300/20"
        )}
      >
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: randomPulseDuration }}
          className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-gold-400 rounded-full blur-sm shadow-ethereal-glow"
        />
        <motion.div
          animate={{ rotate: [-0.8, 0.8, -0.8] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
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
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-[3/4] sm:aspect-square bg-gradient-to-b from-indigo-950/20 to-indigo-900/40 rounded-[3rem] border border-gold-500/10 overflow-hidden shadow-inner-glow flex flex-col items-center justify-center p-8 gap-4">
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
        {lines.length > 1 && lines.map((_, i) => {
          if (i === 0) return null;
          const getY = (idx: number) => 350 - (idx * 60);
          const x = 200;
          return (
            <motion.line
              key={`constellation-${i}`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.4 }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 1.0 }}
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
      <div className="absolute inset-0 opacity-5 pointer-events-none select-none flex items-center justify-center">
        <div className="w-64 h-64 border-2 border-gold-500 rounded-full animate-[spin_25s_linear_infinite]" />
        <div className="absolute w-48 h-48 border border-gold-500 rounded-full animate-[spin_18s_linear_infinite_reverse]" />
      </div>
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
      {lines.length === 0 && !isCasting && (
        <div className="text-gold-500/10 font-mystic text-[10px] uppercase tracking-[0.5em] animate-pulse">
          Altar Ready
        </div>
      )}
    </div>
  );
}