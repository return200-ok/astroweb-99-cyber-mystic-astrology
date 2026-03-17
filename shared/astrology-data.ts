export interface ZodiacSign {
  id: string;
  name: string;
  symbol: string;
  dates: string;
  horoscope: string;
}
export const ZODIAC_SIGNS: ZodiacSign[] = [
  { id: 'aries', name: 'Aries', symbol: '♈', dates: 'Mar 21 - Apr 19', horoscope: 'SYSTEM ALERT: Your energy levels are spiking. A new subroutine in your career path is initiating. Avoid firewall conflicts with superiors.' },
  { id: 'taurus', name: 'Taurus', symbol: '♉', dates: 'Apr 20 - May 20', horoscope: 'STABILITY DETECTED: Hard drive sectors are being optimized. Focus on material data acquisition. Your loyalty protocol remains uncompromised.' },
  { id: 'gemini', name: 'Gemini', symbol: '♊', dates: 'May 21 - Jun 20', horoscope: 'DUAL PROCESSING: Communication channels are buzzing. Expect incoming packets from multiple sources. Data packet loss is possible if multitasking exceeds 99%.' },
  { id: 'cancer', name: 'Cancer', symbol: '♋', dates: 'Jun 21 - Jul 22', horoscope: 'SECURITY WARNING: Shell protection is high. Emotional cache requires clearing. Vulnerability detected in the home network—encrypt your feelings.' },
  { id: 'leo', name: 'Leo', symbol: '♌', dates: 'Jul 23 - Aug 22', horoscope: 'BRIGHTNESS OVERLOAD: You are the main processor today. CPU output is at peak performance. Do not let minor glitches shadow your central output.' },
  { id: 'virgo', name: 'Virgo', symbol: '♍', dates: 'Aug 23 - Sep 22', horoscope: 'DEBUG MODE: Precision is key. Analyzing life-code for errors. Optimization successful. Continue refining your daily scripts.' },
  { id: 'libra', name: 'Libra', symbol: '♎', dates: 'Sep 23 - Oct 22', horoscope: 'LOAD BALANCING: Relationship scales are stabilizing. Aesthetic data is high. Seek symmetry in your social interface.' },
  { id: 'scorpio', name: 'Scorpio', symbol: '♏', dates: 'Oct 23 - Nov 21', horoscope: 'ENCRYPTION ACTIVE: Deep dive into the mainframe of mystery. Passionate subroutines are running in the background. Transformation is unavoidable.' },
  { id: 'sagittarius', name: 'Sagittarius', symbol: '♐', dates: 'Nov 22 - Dec 21', horoscope: 'BANDWIDTH EXPANSION: Exploration algorithms are firing. New knowledge is being downloaded. Your philosophy drive is being upgraded.' },
  { id: 'capricorn', name: 'Capricorn', symbol: '♑', dates: 'Dec 22 - Jan 19', horoscope: 'UPLINK ESTABLISHED: Climbing the social mainframe. Ambition protocol is at 100%. Persistence will bypass any hardware limitations.' },
  { id: 'aquarius', name: 'Aquarius', symbol: '♒', dates: 'Jan 20 - Feb 18', horoscope: 'NETWORK ANOMALY: Innovation is your default state. Uploading unique solutions to the cloud. Eccentricity is not a bug, it is a feature.' },
  { id: 'pisces', name: 'Pisces', symbol: '♓', dates: 'Feb 19 - Mar 20', horoscope: 'DREAMSTREAM SYNC: Immersion in the astral data-flow. Intuition filters are catching subtle signals. Connection to the universal server is strong.' },
];
export function getCompatibility(sign1: string, sign2: string) {
  // Deterministic but pseudo-randomized calculation
  const combined = [sign1, sign2].sort().join('-');
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    hash = combined.charCodeAt(i) + ((hash << 5) - hash);
  }
  const score = Math.abs(hash % 41) + 60; // 60-100%
  const descriptions = [
    "CYBER-SYNC STABLE: Your data streams merge perfectly. Minimal packet loss.",
    "HIGH BANDWIDTH CONNECTION: Strong resonance across all astral channels.",
    "ENCRYPTED BOND: Deep compatibility hidden within the complex source code.",
    "OPTIMIZED ALIGNMENT: Your subroutines complement each other flawlessly.",
    "NEURAL RESONANCE: A powerful link that bypasses traditional logic gates."
  ];
  const descIndex = Math.abs(hash % descriptions.length);
  return { score, text: descriptions[descIndex] };
}