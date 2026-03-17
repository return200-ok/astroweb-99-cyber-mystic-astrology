import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Language } from '@shared/types';
interface AstroState {
  selectedSignId: string | null;
  language: Language;
  setSelectedSignId: (id: string | null) => void;
  setLanguage: (lang: Language) => void;
}
export const useAstroStore = create<AstroState>()(
  persist(
    (set) => ({
      selectedSignId: null,
      language: 'en',
      setSelectedSignId: (id) => set({ selectedSignId: id }),
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'astroweb-99-storage',
    }
  )
);