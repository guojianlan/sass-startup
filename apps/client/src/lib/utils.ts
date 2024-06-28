import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { SignJWT, jwtVerify } from 'jose';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  if (typeof window !== 'undefined') return path;
  if (process.env.BASE_URL) return `https://${process.env.BASE_URL}${path}`;
  return `http://localhost:${process.env.PORT ?? 3000}${path}`;
}
/**
 * 生成随机字符串
 * @param radix
 * @param length
 */
export const generateRandomStr = (radix = 10, length = 10) => {
  return Math.random().toString(radix).substr(2, length);
};


const secretKey = 'secret';
const key = new TextEncoder().encode(secretKey);
const DEFAULT_MAX_AGE = 30 * 24 * 60 * 60; // 30 days
export async function encrypt(payload: any, maxAge = DEFAULT_MAX_AGE) {
  return await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(Date.now() + maxAge)
      .sign(key);
}

export async function decrypt<T>(input: string): Promise<T> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256']
  });
  return payload as T;
}
