import { Solar, Lunar } from 'lunar-javascript';
import { TuviChart, TuviPalace, TuviStar, Wuxing } from '@shared/types';
import { PALACE_ORDER_VN, TUVI_MAIN_STARS, TUVI_PALACE_WUXING } from '@shared/tuvi-data';
export function calculateTuviChart(name: string, date: Date, hourIndex: number): TuviChart {
  const solar = Solar.fromDate(date);
  const lunar = solar.getLunar();
  // Calculate Mệnh palace position
  // Logic: Month and Hour determines Menh
  // In VN Tuvi: Month starts from Dan (index 2), Hour goes backward
  const menhIndex = (2 + (lunar.getMonth() - 1) - hourIndex + 12) % 12;
  const thanIndex = (2 + (lunar.getMonth() - 1) + hourIndex) % 12;
  const palaces: TuviPalace[] = [];
  for (let i = 0; i < 12; i++) {
    const palaceNameIndex = (i - menhIndex + 12) % 12;
    palaces.push({
      id: i,
      name: PALACE_ORDER_VN[palaceNameIndex],
      stars: [],
      wuxing: TUVI_PALACE_WUXING[i],
      isMenh: i === menhIndex,
      isThan: i === thanIndex,
    });
  }
  // Simplified Star Placement for Demo (Actual algorithms are 100+ lines)
  // We'll place the 14 Main Stars based on a pseudo-random hash of the birth data to ensure stability
  const seed = lunar.getDay() + lunar.getMonth() + lunar.getYear() + hourIndex;
  TUVI_MAIN_STARS.forEach((star, idx) => {
    const pos = (seed + idx * 3) % 12;
    palaces[pos].stars.push({ ...star, type: 'Main' });
  });
  return {
    ownerName: name || 'ANONYMOUS_ENTITY',
    birthDate: date.toISOString(),
    lunarDate: `${lunar.getDay()}/${lunar.getMonth()}/${lunar.getYear()}`,
    menhElement: 'Kim', // Mock
    cucElement: 'Hỏa', // Mock
    palaces
  };
}