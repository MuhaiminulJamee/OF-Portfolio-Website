import { env } from 'cloudflare:workers';
import { jsonError, readText, validEmail } from '@/lib/server-validation';

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!payload) return jsonError('Please complete the enrollment form.');
  const name = readText(payload.name, 100);
  const email = readText(payload.email, 180).toLowerCase();
  const courseSlug = readText(payload.courseSlug, 120);
  if (!name || !validEmail(email) || !courseSlug) return jsonError('Enter a valid name, email and course.');

  try {
    await env.DB.prepare(`
      INSERT INTO enrollments (id, course_slug, name, email, institution, message, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, 'pending', ?)
    `).bind(
      crypto.randomUUID(), courseSlug, name, email,
      readText(payload.institution, 180) || null,
      readText(payload.message, 1200) || null,
      new Date().toISOString(),
    ).run();
    return Response.json({ ok: true, message: 'Your place has been requested. Enrollment details will follow by email.' });
  } catch {
    return jsonError('Enrollment is temporarily unavailable. Please try again.', 503);
  }
}
