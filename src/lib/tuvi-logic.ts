import { Solar, Lunar } from 'lunar-javascript';
import { TuviChart, TuviPalace, TuviStar, Wuxing } from '@shared/types';
import { PALACE_ORDER_VN, TUVI_MAIN_STARS, TUVI_PALACE_WUXING } from '@shared/tuvi-data';
export function calculateTuviChart(name: string, date: Date, hourIndex: number): TuviChart {
  const solar = Solar.fromDate(date);
  const lunar = solar.getLunar();
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
  const seed = lunar.getDay() + lunar.getMonth() + lunar.getYear() + hourIndex;
  TUVI_MAIN_STARS.forEach((star, idx) => {
    const pos = (seed + idx * 3) % 12;
    palaces[pos].stars.push({ ...star, type: 'Main' });
  });
  return {
    ownerName: name || 'ANONYMOUS_ENTITY',
    birthDate: date.toISOString(),
    lunarDate: `${lunar.getDay()}/${lunar.getMonth()}/${lunar.getYear()}`,
    menhElement: 'Kim',
    cucElement: 'Hỏa',
    palaces
  };
}
export function getCanChi(date: string) {
  if (!date) return null;
  const lunar = Solar.fromDate(new Date(date)).getLunar();
  return {
    year: `${lunar.getYearGan()}${lunar.getYearZhi()}`,
    month: `${lunar.getMonthGan()}${lunar.getMonthZhi()}`,
    day: `${lunar.getDayGan()}${lunar.getDayZhi()}`
  };
}
export function getElement(date: string): Wuxing {
  if (!date) return 'Thổ';
  const lunar = Solar.fromDate(new Date(date)).getLunar();
  // Simplified logic for element mapping
  const elements: Wuxing[] = ['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'];
  return elements[lunar.getYearZhiIndex() % 5];
}