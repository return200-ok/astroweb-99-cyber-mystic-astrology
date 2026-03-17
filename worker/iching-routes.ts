import { Hono } from "hono";
import { ok, bad } from './core-utils';
import type { Env } from './core-utils';
interface ExtendedEnv extends Env {
  AI: {
    run: (model: string, input: { prompt: string }) => Promise<any>;
  };
}
export function ichingRoutes(app: Hono<{ Bindings: Env }>) {
  app.post('/api/iching/interpret', async (c) => {
    const { question, mainHex, transHex, lines, language } = await c.req.json();
    if (!question) return bad(c, "Question is required for the Oracle.");
    const prompt = `
      You are the Ancient Celestial I Ching Oracle.
      User Question: "${question}"
      Primary Hexagram: ${mainHex.name.en} (${mainHex.symbol})
      Transformed Hexagram: ${transHex.name.en} (${transHex.symbol})
      Lines (6=Old Yin, 7=Young Yang, 8=Young Yin, 9=Old Yang): ${lines.join(", ")}
      Provide a mystic, professional interpretation in ${language === 'vi' ? 'Vietnamese' : 'English'}.
      Format strictly as JSON:
      {
        "summary": "Short poetic essence of the reading",
        "analysis": "Deep spiritual breakdown relating to the question",
        "guidance": ["Step 1", "Step 2", "Step 3"]
      }
    `;
    try {
      const env = c.env as ExtendedEnv;
      if (!env.AI || typeof env.AI.run !== 'function') {
        throw new Error("AI_BINDING_MISSING");
      }
      const aiResponse = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
        prompt,
      });
      let text = aiResponse.response || aiResponse;
      if (typeof text !== 'string') text = JSON.stringify(text);
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) text = jsonMatch[0];
      const result = JSON.parse(text);
      return ok(c, result);
    } catch (e) {
      console.warn("Oracle Fallback Engaged:", e instanceof Error ? e.message : String(e));
      // High-quality deterministic fallback
      const isVi = language === 'vi';
      return ok(c, {
        summary: isVi ? "Trời đất giao hòa, vạn vật sinh sôi." : "Heaven and Earth in flux.",
        analysis: isVi 
          ? `Sự kết hợp giữa ${mainHex.name.vi} và ${transHex.name.vi} cho thấy một tiến trình đang thay đổi. Câu hỏi của bạn về "${question}" phản ánh sự cần thiết của việc thích nghi với dòng chảy vũ trụ.`
          : `The transition from ${mainHex.name.en} to ${transHex.name.en} suggests a process in motion. Your inquiry regarding "${question}" reflects a need to align with the cosmic timing.`,
        guidance: isVi 
          ? ["Hãy kiên trì giữ vững đạo đức", "Chờ đợi thời cơ chín muồi", "Hành động khi tâm trí đã tĩnh lặng"] 
          : ["Maintain integrity in all actions", "Wait for the natural culmination of events", "Act only when your internal compass is steady"]
      });
    }
  });
}