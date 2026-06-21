import type { NextApiRequest, NextApiResponse } from 'next';
import { NodeVM } from 'vm2';
import { prisma } from '../../../lib/prisma';
import { getUserFromToken } from '../../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const token = req.headers.authorization?.split(' ')[1];
  const user = token ? await getUserFromToken(token) : null;
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  const { challengeId, code } = req.body;
  const challenge = await prisma.challenge.findUnique({ where: { id: challengeId }});
  if (!challenge) return res.status(404).json({ error: 'Challenge not found' });

  const testcases = challenge.testcases as any[];
  try {
    const vm = new NodeVM({ console: 'off', timeout: 2000, sandbox: {} });
    const wrapper = `module.exports.run = (input) => { ${code} }`;
    const script = vm.run(wrapper, 'usercode.js');
    const results: any[] = [];
    for (const tc of testcases) {
      let out;
      try {
        out = await script.run(tc.input);
      } catch (e) {
        out = { error: String(e) };
      }
      const outStr = typeof out === 'string' ? out.trim() : JSON.stringify(out);
      const expected = (tc.output + '').trim();
      const passed = outStr === expected;
      results.push({ input: tc.input, expected, out: outStr, passed });
    }

    const overall = results.every(r => r.passed) ? 'passed' : 'failed';
    const submission = await prisma.submission.create({
      data: {
        userId: user.id,
        challengeId,
        language: challenge.language,
        code,
        result: JSON.stringify({ overall, results })
      }
    });

    return res.json({ id: submission.id, overall, results });
  } catch (err) {
    return res.status(500).json({ error: String(err) });
  }
}
