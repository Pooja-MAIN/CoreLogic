import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

export function signToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export async function getUserFromToken(token: string) {
  const data = verifyToken(token);
  if (!data || typeof data === 'string') return null;
  const user = await prisma.user.findUnique({ where: { id: (data as any).id }});
  return user;
}

export async function createUser(email: string, password: string, name?: string) {
  const hash = await bcrypt.hash(password, 10);
  return prisma.user.create({ data: { email, password: hash, name } });
}

export async function checkPassword(user: any, pass: string) {
  return bcrypt.compare(pass, user.password);
}
