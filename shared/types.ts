export type Language = 'en' | 'vi';
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export interface User {
  id: string;
  name: string;
}
export interface Chat {
  id: string;
  title: string;
}
export interface ChatMessage {
  id: string;
  chatId: string;
  userId: string;
  text: string;
  ts: number;
}
export interface GuestbookEntry {
  id: string;
  signId: string;
  author: string;
  message: string;
  ts: number;
}
export interface ZodiacAnalysis {
  personality: string[];
  thinking: string[];
  attractedTo: string[];
  attracts: string[];
  career: string[];
  needs: string[];
}
export interface ZodiacSign {
  id: string;
  symbol: string;
  names: Record<Language, string>;
  dates: Record<Language, string>;
  horoscopes: Record<Language, string>;
  analysis: Record<Language, ZodiacAnalysis>;
}
export interface I18nDictionary {
  terminalTitle: string;
  terminalSub: string;
  navTerminal: string;
  navMatchmaker: string;
  navBBS: string;
  rebootSystem: string;
  matchmakerTitle: string;
  matchmakerSub: string;
  targetA: string;
  targetB: string;
  calculateMatch: string;
  computing: string;
  matchResults: string;
  score: string;
  bbsTitle: string;
  bbsSub: string;
  identifier: string;
  celestialSign: string;
  messagePacket: string;
  transmit: string;
  transmitting: string;
  incomingStreams: string;
  emptyBBS: string;
  footerLine: string;
  footerSub: string;
  selectSign: string;
  deepScanTitle: string;
  analysisPersonality: string;
  analysisThinking: string;
  analysisAttractedTo: string;
  analysisAttracts: string;
  analysisCareer: string;
  analysisNeeds: string;
}