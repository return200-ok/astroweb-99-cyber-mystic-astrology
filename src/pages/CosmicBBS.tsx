import React, { useState, useMemo } from 'react';
import { useAstroStore } from '@/lib/store';
import { ZODIAC_SIGNS, I18N } from '@shared/astrology-data';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Loader2, Sparkles } from 'lucide-react';
import type { GuestbookEntry } from '@shared/types';
export function CosmicBBS() {
  const selectedSignId = useAstroStore((s) => s.selectedSignId);
  const language = useAstroStore((s) => s.language);
  const dict = I18N[language];
  const queryClient = useQueryClient();
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');
  const [localSignId, setLocalSignId] = useState(selectedSignId || '');
  const { data: bbsData, isLoading } = useQuery({
    queryKey: ['bbs-messages'],
    queryFn: () => api<{ items: GuestbookEntry[] }>('/api/bbs'),
  });
  const sortedMessages = useMemo(() => {
    if (!bbsData?.items) return [];
    return [...bbsData.items].sort((a, b) => b.ts - a.ts);
  }, [bbsData]);
  const postMutation = useMutation({
    mutationFn: (newEntry: Partial<GuestbookEntry>) =>
      api<GuestbookEntry>('/api/bbs', {
        method: 'POST',
        body: JSON.stringify(newEntry),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bbs-messages'] });
      setMessage('');
    },
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !localSignId || !message) return;
    postMutation.mutate({ author, signId: localSignId, message });
  };
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="text-center space-y-4">
        <h1 className="text-5xl md:text-6xl font-bold text-gold-500 mystic-text-glow tracking-tighter uppercase italic">{dict.bbsTitle}</h1>
        <p className="text-gold-500/60 text-xl font-serif uppercase tracking-widest">{dict.bbsSub}</p>
      </div>
      <Card className="bg-indigo-950/40 backdrop-blur-md border border-gold-500/30 rounded-3xl shadow-ethereal-glow overflow-hidden">
        <div className="bg-gold-500 text-indigo-900 px-6 py-2 flex items-center justify-between font-mystic font-bold text-xs uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>COMMUNE_WITH_VOID.EXE</span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-gold-500 font-mystic text-[10px] uppercase tracking-widest">{dict.identifier}</label>
              <Input
                placeholder="SPIRIT_ID"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="bg-indigo-900/50 border-gold-500/30 text-gold-500 placeholder:text-gold-900/40 rounded-full focus:ring-1 focus:ring-gold-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-gold-500 font-mystic text-[10px] uppercase tracking-widest">{dict.celestialSign}</label>
              <select
                value={localSignId}
                onChange={(e) => setLocalSignId(e.target.value)}
                className="w-full h-10 bg-indigo-900/50 border border-gold-500/30 text-gold-500 px-4 py-2 text-sm focus:outline-none rounded-full appearance-none"
              >
                <option value="" className="bg-indigo-950">{dict.selectSign}</option>
                {ZODIAC_SIGNS.map(s => <option key={s.id} value={s.id} className="bg-indigo-950">{s.symbol} {s.names[language]}</option>)}
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-gold-500 font-mystic text-[10px] uppercase tracking-widest">{dict.messagePacket}</label>
            <Textarea
              placeholder="WHISPER TO THE STARS..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-indigo-900/50 border-gold-500/30 text-gold-500 placeholder:text-gold-900/40 rounded-2xl min-h-[120px] focus:ring-1 focus:ring-gold-500 p-4"
            />
          </div>
          <Button type="submit" disabled={postMutation.isPending || !author || !message || !localSignId} className="w-full bg-gold-500 text-indigo-900 hover:bg-gold-400 font-mystic font-bold rounded-full h-14 uppercase transition-all shadow-ethereal-glow tracking-widest">
            {postMutation.isPending ? <Loader2 className="animate-spin" /> : <Send className="mr-2 w-4 h-4" />}
            {postMutation.isPending ? dict.transmitting : dict.transmit}
          </Button>
        </form>
      </Card>
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-gold-500 font-mystic underline decoration-gold-500/30 uppercase italic tracking-widest flex items-center gap-3">
          <div className="w-1.5 h-6 bg-gold-500 animate-pulse" />
          {dict.incomingStreams}
        </h2>
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-12 h-12 text-gold-500 animate-spin opacity-50" />
          </div>
        ) : (
          <div className="grid gap-6">
            <AnimatePresence initial={false}>
              {sortedMessages.map((entry) => {
                const sign = ZODIAC_SIGNS.find(s => s.id === entry.signId);
                return (
                  <motion.div
                    key={entry.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="border-l-4 border-gold-500 bg-gold-500/5 p-6 space-y-3 group hover:bg-gold-500/10 transition-colors relative rounded-r-3xl"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 flex items-center justify-center border border-gold-500/30 text-xl bg-indigo-900/50 text-gold-500 rounded-full shadow-inner-glow">{sign?.symbol || '?'}</div>
                        <div>
                          <span className="text-gold-500 font-bold uppercase tracking-widest font-mystic text-sm">{entry.author}</span>
                          <span className="text-gold-500/40 text-[9px] ml-3 font-serif italic tracking-tighter">[{new Date(entry.ts).toLocaleString()}]</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gold-500/90 font-serif text-lg pl-12 leading-relaxed italic">“{entry.message}”</p>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            {!sortedMessages.length && (
              <div className="text-center py-20 border-2 border-dashed border-gold-500/10 text-gold-500/30 font-serif italic">
                <p className="text-lg">The celestial void is currently silent.</p>
                <p className="text-xs mt-2 uppercase tracking-[0.2em]">{dict.emptyBBS}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}