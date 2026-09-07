import { env } from 'cloudflare:workers';
import { jsonError, readText, validEmail } from '@/lib/server-validation';

const allowedTypes = new Set(['research', 'consulting', 'courses', 'general']);

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!payload) return jsonError('Please complete the inquiry form.');
  const name = readText(payload.name, 100);
  const email = readText(payload.email, 180).toLowerCase();
  const message = readText(payload.message, 3000);
  const inquiryType = readText(payload.inquiryType, 30);
  if (!name || !validEmail(email) || !message || !allowedTypes.has(inquiryType)) {
    return jsonError('Enter a valid name, email, inquiry type and message.');
  }

  try {
    await env.DB.prepare(`
      INSERT INTO inquiries (
        id, name, email, organization, inquiry_type, academic_background,
        research_interest, experience, proposed_topic, message, status, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', ?)
    `).bind(
      crypto.randomUUID(),
      name,
      email,
      readText(payload.organization, 180) || null,
      inquiryType,
      readText(payload.academicBackground, 500) || null,
      readText(payload.researchInterest, 500) || null,
      readText(payload.experience, 800) || null,
      readText(payload.proposedTopic, 500) || null,
      message,
      new Date().toISOString(),
    ).run();
    return Response.json({ ok: true, message: 'Your inquiry has been received. We will reply by email.' });
  } catch {
    return jsonError('The inquiry could not be saved. Please try again.', 503);
  }
}
