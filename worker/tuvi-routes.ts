import { Hono } from "hono";
import { ok, bad } from './core-utils';
import type { Env } from './core-utils';
import { Solar, Lunar } from 'lunar-javascript';
import type { ImperialEventType, AgeCompatRequest, GoodDayRequest, AuspiciousDay } from '@shared/types';
export function tuviRoutes(app: Hono<{ Bindings: Env }>) {
  app.post('/api/tuvi/analyze', async (c) => {
    const { chart, language } = await c.req.json();
    if (!chart) return bad(c, 'chart data required');
    await new Promise(r => setTimeout(r, 800));
    const analysis = language === 'vi'
      ? `Phân tích Mệnh: ${chart.menhElement}. Lá số có cách cục vững vàng. Cần chú trọng các cung Tài Bạch và Quan Lộc.`
      : `Analysis for ${chart.menhElement} element. Strong core structure detected. Focus on Career and Wealth sectors.`;
    return ok(c, { analysis });
  });
  app.post('/api/tuvi/age-compat', async (c) => {
    const body = await c.req.json() as AgeCompatRequest;
    if (!body.personA?.dob || !body.personB?.dob) return bad(c, 'Both birth dates required');
    const { personA, personB, eventType } = body;
    try {
      const dateA = new Date(personA.dob);
      const dateB = new Date(personB.dob);
      if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
        return bad(c, 'Invalid birth dates provided');
      }
      const lunarA = Solar.fromDate(dateA).getLunar();
      const lunarB = Solar.fromDate(dateB).getLunar();
      const stemA = lunarA.getYearGan();
      const stemB = lunarB.getYearGan();
      const branchA = lunarA.getYearZhi();
      const branchB = lunarB.getYearZhi();
      let score = 65;
      if (stemA === stemB) score += 5;
      if (branchA === branchB) score += 10;
      const hash = (personA.name.length + personB.name.length + (eventType?.length || 0)) % 20;
      score += hash;
      const analysis = score > 80
        ? "CELESTIAL HARMONY: The earthly branches of these two souls are in perfect resonance. The path ahead is clear of shadows."
        : "STEADFAST ALIGNMENT: Moderate resonance detected. Spiritual diligence will ensure a stable foundation for this endeavor.";
      return ok(c, {
        score: Math.min(score, 100),
        analysis,
        elements: [lunarA.getYearXun(), lunarB.getYearXun()]
      });
    } catch (e) {
      return bad(c, 'Failed to process age compatibility');
    }
  });
  app.post('/api/tuvi/good-days', async (c) => {
    const body = await c.req.json() as GoodDayRequest;
    if (!body.startDate || !body.endDate) return bad(c, 'Date range required');
    const { startDate, endDate, eventType } = body;
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return bad(c, 'Invalid date range provided');
      }
      const results: AuspiciousDay[] = [];
      const current = new Date(start);
      const maxLimit = new Date(start);
      maxLimit.setDate(maxLimit.getDate() + 31);
      const finalEnd = end > maxLimit ? maxLimit : end;
      while (current <= finalEnd) {
        // Use a copy to avoid mutation issues during Solar.fromDate
        const loopDate = new Date(current);
        const solar = Solar.fromDate(loopDate);
        const lunar = solar.getLunar();
        const isHoangDao = lunar.getDayZhiIndex() % 2 === 0;
        if (isHoangDao) {
          results.push({
            date: loopDate.toISOString(),
            lunarDate: `${lunar.getDay()}/${lunar.getMonth()}`,
            type: 'Hoàng Đạo',
            stars: ['Thanh Long', 'Minh Đường'],
            description: `Excellent day for ${eventType || 'spiritual endeavors'}. Cosmic energy is concentrated and favorable.`
          });
        }
        current.setDate(current.getDate() + 1);
      }
      return ok(c, results);
    } catch (e) {
      return bad(c, 'Failed to process auspicious days search');
    }
  });
  app.get('/api/tuvi/ages', async (c) => {
    const years = [2025, 2026, 2027, 2028, 2029, 2030];
    const data = years.map(y => ({
      year: y,
      tamTai: y % 3 === 0,
      kimLau: y % 9 === 1 || y % 9 === 3 || y % 9 === 6 || y % 9 === 8,
      hoangOc: y % 6 === 0
    }));
    return ok(c, data);
  });
}