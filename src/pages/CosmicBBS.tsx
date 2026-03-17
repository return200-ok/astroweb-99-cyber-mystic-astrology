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
import { MessageSquare, Send, Loader2 } from 'lucide-react';
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
        <h1 className="text-5xl md:text-6xl font-bold neon-text-magenta tracking-tighter uppercase italic">{dict.bbsTitle}</h1>
        <p className="text-cyan-500 text-xl font-mono uppercase tracking-widest">{dict.bbsSub}</p>
      </div>
      <Card className="bg-black border-2 border-magenta-500 rounded-none shadow-neon overflow-hidden">
        <div className="bg-magenta-500 text-black px-4 py-1 flex items-center justify-between font-bold">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            <span className="font-mono uppercase">ENCRYPT_MESSAGE.EXE</span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-magenta-500 text-xs font-mono uppercase">{dict.identifier}</label>
              <Input
                placeholder="GUEST_USER_99"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="bg-black border-magenta-500 text-magenta-500 placeholder:text-magenta-900 rounded-none focus:ring-1 focus:ring-magenta-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-magenta-500 text-xs font-mono uppercase">{dict.celestialSign}</label>
              <select
                value={localSignId}
                onChange={(e) => setLocalSignId(e.target.value)}
                className="w-full h-10 bg-black border border-magenta-500 text-magenta-500 px-3 py-2 text-sm focus:outline-none"
              >
                <option value="">{dict.selectSign}</option>
                {ZODIAC_SIGNS.map(s => <option key={s.id} value={s.id}>{s.symbol} {s.names[language]}</option>)}
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-magenta-500 text-xs font-mono uppercase">{dict.messagePacket}</label>
            <Textarea
              placeholder="ENTER COSMIC DATA..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-black border-magenta-500 text-magenta-500 placeholder:text-magenta-900 rounded-none min-h-[100px] focus:ring-1 focus:ring-magenta-500"
            />
          </div>
          <Button type="submit" disabled={postMutation.isPending || !author || !message || !localSignId} className="w-full bg-magenta-500 text-black hover:bg-magenta-400 font-bold rounded-none uppercase transition-all shadow-neon hover:shadow-[0_0_20px_#ff00ff]">
            {postMutation.isPending ? <Loader2 className="animate-spin" /> : <Send className="mr-2 w-4 h-4" />}
            {postMutation.isPending ? dict.transmitting : dict.transmit}
          </Button>
        </form>
      </Card>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-cyan-500 font-mono underline uppercase italic tracking-tighter flex items-center gap-2">
          <div className="w-2 h-6 bg-cyan-500 animate-pulse" />
          {dict.incomingStreams}
        </h2>
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="relative">
              <Loader2 className="w-12 h-12 text-magenta-500 animate-spin" />
              <div className="absolute inset-0 bg-magenta-500/20 blur-xl animate-pulse" />
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            <AnimatePresence initial={false}>
              {sortedMessages.map((entry) => {
                const sign = ZODIAC_SIGNS.find(s => s.id === entry.signId);
                return (
                  <motion.div 
                    key={entry.id} 
                    initial={{ x: -20, opacity: 0 }} 
                    animate={{ x: 0, opacity: 1 }} 
                    className="border-l-4 border-magenta-500 bg-magenta-500/5 p-4 space-y-2 group hover:bg-magenta-500/10 transition-colors relative"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 flex items-center justify-center border border-magenta-500 text-lg bg-black">{sign?.symbol || '?'}</div>
                        <div>
                          <span className="text-magenta-500 font-bold uppercase tracking-tighter">{entry.author}</span>
                          <span className="text-magenta-500/40 text-[10px] ml-2 font-mono">[{new Date(entry.ts).toLocaleString()}]</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-magenta-500 font-mono text-lg pl-10 leading-relaxed">&gt; {entry.message}</p>
                    <div className="absolute bottom-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-10 pointer-events-none">
                       <MessageSquare className="w-full h-full text-magenta-500" />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            {!sortedMessages.length && (
              <div className="text-center py-20 border-2 border-dashed border-magenta-900 text-magenta-900 font-mono uppercase">
                <p className="animate-pulse">ERROR 404: CELESTIAL_VOICE_NOT_FOUND</p>
                <p className="text-xs mt-2 opacity-50">{dict.emptyBBS}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}