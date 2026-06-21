import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { code, language } = req.body;
  const key = process.env.OPENAI_API_KEY;
  if (!key) return res.status(500).json({ error: 'OpenAI key not configured' });
  const prompt = `Explain the following ${language} code in simple terms and generate at least one testbench or test to verify it:\n\n${code}`;
  try {
    const resp = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 800
    }, { headers: { Authorization: `Bearer ${key}` } });
    res.json(resp.data);
  } catch (e: any) {
    res.status(500).json({ error: e?.response?.data || e.message });
  }
}
