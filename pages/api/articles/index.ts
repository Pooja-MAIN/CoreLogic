import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const q = String(req.query.q || '');
    const where = q ? { OR: [ { title: { contains: q, mode: 'insensitive' }}, { content: { contains: q, mode: 'insensitive' }} ] } : {};
    const articles = await prisma.article.findMany({ where, orderBy: { createdAt: 'desc' }});
    return res.json(articles);
  } else if (req.method === 'POST') {
    const { title, content, tags } = req.body;
    const a = await prisma.article.create({ data: { title, content, tags } });
    return res.status(201).json(a);
  }
  res.status(405).end();
}
