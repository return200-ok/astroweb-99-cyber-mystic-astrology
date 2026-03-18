import { Hono } from "hono";
import { ok, bad } from './core-utils';
import type { Env } from './core-utils';
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
      // @ts-ignore - Workers AI is available on env in Cloudflare Workers
      const aiResponse = await c.env.AI.run('@cf/meta/llama-3-8b-instruct', {
        prompt,
      });
      // Simple cleanup if AI returns markdown
      let text = aiResponse.response || aiResponse;
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) text = jsonMatch[0];
      const result = JSON.parse(text);
      return ok(c, result);
    } catch (e) {
      console.error("AI Error:", e);
      return ok(c, {
        summary: language === 'vi' ? "Trời đất giao hòa, vạn vật sinh sôi." : "Heaven and Earth in flux.",
        analysis: language === 'vi' ? "Quẻ của bạn cho thấy sự chuyển động tích cực." : "Your reading indicates significant movement.",
        guidance: language === 'vi' ? ["Hãy kiên trì", "Đợi thời cơ", "Hành động đúng đắn"] : ["Be persistent", "Wait for the moment", "Act with integrity"]
      });
    }
  });
}