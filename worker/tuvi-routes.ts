import { Hono } from "hono";
import { ok, bad } from './core-utils';
import type { Env } from './core-utils';
export function tuviRoutes(app: Hono<{ Bindings: Env }>) {
  app.post('/api/tuvi/analyze', async (c) => {
    const { chart, language } = await c.req.json();
    if (!chart) return bad(c, 'chart data required');
    // Artificial wait to simulate deep celestial calculation
    await new Promise(r => setTimeout(r, 1000));
    // Simple template based response (mocking AI for stability in deployment)
    const analysis = language === 'vi' 
      ? `Phân tích Mệnh: ${chart.menhElement}. Lá số có cách cục vững vàng. Cần chú trọng các cung Tài Bạch và Quan Lộc để phát triển sự nghiệp.`
      : `Analysis for ${chart.menhElement} element. Strong core structure detected. Focus on Career and Wealth sectors for optimal growth.`;
    return ok(c, { analysis });
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