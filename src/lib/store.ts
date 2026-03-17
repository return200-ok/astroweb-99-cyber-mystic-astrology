import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Language, BigFiveTrait } from '@shared/types';
interface AstroState {
  selectedSignId: string | null;
  language: Language;
  personalityResults: Record<BigFiveTrait, number> | null;
  setSelectedSignId: (id: string | null) => void;
  setLanguage: (lang: Language) => void;
  setPersonalityResults: (results: Record<BigFiveTrait, number> | null) => void;
}
export const useAstroStore = create<AstroState>()(
  persist(
    (set) => ({
      selectedSignId: null,
      language: 'en',
      personalityResults: null,
      setSelectedSignId: (id) => set({ selectedSignId: id }),
      setLanguage: (lang) => set({ language: lang }),
      setPersonalityResults: (results) => set({ personalityResults: results }),
    }),
    {
      name: 'astroweb-99-storage',
    }
  )
);