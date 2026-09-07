import { env } from 'cloudflare:workers';
import { jsonError, readText, validEmail } from '@/lib/server-validation';

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!payload) return jsonError('Please provide your name and email.');
  const name = readText(payload.name, 100);
  const email = readText(payload.email, 180).toLowerCase();
  if (!name || !validEmail(email)) return jsonError('Enter a valid name and email address.');

  try {
    await env.DB.prepare(
      'INSERT INTO subscribers (id, name, email, created_at) VALUES (?, ?, ?, ?) ON CONFLICT(email) DO UPDATE SET name = excluded.name',
    ).bind(crypto.randomUUID(), name, email, new Date().toISOString()).run();
    return Response.json({ ok: true, message: 'You are subscribed to Lab Signals.' });
  } catch {
    return jsonError('Subscription is temporarily unavailable. Please try again.', 503);
  }
}
