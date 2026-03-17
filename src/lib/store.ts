import { create } from 'zustand';
import { persist } from 'zustand/middleware';
interface AstroState {
  selectedSignId: string | null;
  setSelectedSignId: (id: string | null) => void;
}
export const useAstroStore = create<AstroState>()(
  persist(
    (set) => ({
      selectedSignId: null,
      setSelectedSignId: (id) => set({ selectedSignId: id }),
    }),
    {
      name: 'astroweb-99-storage',
    }
  )
);