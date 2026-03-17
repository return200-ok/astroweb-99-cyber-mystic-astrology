export type Language = 'en' | 'vi';
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export type Wuxing = 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ';
export interface TuviStar {
  name: string;
  wuxing: Wuxing;
  status?: string; // Đắc, Hãm, Bình, v.v.
  type: 'Main' | 'Secondary';
}
export interface TuviPalace {
  id: number; // 0-11
  name: string;
  stars: TuviStar[];
  wuxing: Wuxing;
  isMenh?: boolean;
  isThan?: boolean;
}
export interface TuviChart {
  ownerName: string;
  birthDate: string; // ISO
  lunarDate: string;
  menhElement: Wuxing;
  cucElement: Wuxing;
  palaces: TuviPalace[];
}
export interface TuviAnalysisRequest {
  chart: TuviChart;
  language: Language;
}
export interface User { id: string; name: string; }
export interface Chat { id: string; title: string; }
export interface ChatMessage { id: string; chatId: string; userId: string; text: string; ts: number; }
export interface GuestbookEntry { id: string; signId: string; author: string; message: string; ts: number; }
export type BigFiveTrait = 'openness' | 'conscientiousness' | 'extraversion' | 'agreeableness' | 'neuroticism';
export type EnneagramType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export interface PersonalityQuestion { id: number; trait: BigFiveTrait; text: Record<Language, string>; isReverse?: boolean; }
export interface EnneagramQuestion { id: number; type: EnneagramType; text: Record<Language, string>; isReverse?: boolean; }
export interface ZodiacAnalysis { personality: string[]; thinking: string[]; attractedTo: string[]; attracts: string[]; career: string[]; needs: string[]; }
export interface ZodiacSign { id: string; symbol: string; names: Record<Language, string>; dates: Record<Language, string>; horoscopes: Record<Language, string>; analysis: Record<Language, ZodiacAnalysis>; }
export interface EnneagramMetadata { name: Record<Language, string>; title: Record<Language, string>; description: Record<Language, string>; advice: Record<Language, string>; }
export interface I18nDictionary {
  terminalTitle: string; terminalSub: string; navTerminal: string; navMatchmaker: string; navBBS: string; navTest: string; rebootSystem: string;
  matchmakerTitle: string; matchmakerSub: string; targetA: string; targetB: string; calculateMatch: string; computing: string; matchResults: string; score: string;
  bbsTitle: string; bbsSub: string; identifier: string; celestialSign: string; messagePacket: string; transmit: string; transmitting: string; incomingStreams: string; emptyBBS: string;
  footerLine: string; footerSub: string; selectSign: string; deepScanTitle: string; analysisPersonality: string; analysisThinking: string; analysisAttractedTo: string; analysisAttracts: string; analysisCareer: string; analysisNeeds: string;
  testTitle: string; testSub: string; questionCount: string; resultProfile: string; traitHigh: string; traitLow: string; restartTest: string; likert1: string; likert2: string; likert3: string; likert4: string; likert5: string;
  enneagramMode: string; bigFiveMode: string; coreType: string; activeWing: string; typeProfile: string; adviceProtocol: string;
  navTuvi: string; tuviTitle: string; tuviSub: string; birthDate: string; birthHour: string; lunarDate: string; ownerName: string; calculateChart: string; palaceNames: string[]; starNames: Record<string, string>;
}