import { env } from 'cloudflare:workers';
import { getChatGPTUser } from '@/app/chatgpt-auth';
import { jsonError, readText } from '@/lib/server-validation';

export const dynamic = 'force-dynamic';

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await getChatGPTUser();
  if (!user) return jsonError('Sign in to update content.', 401);
  const { id } = await context.params;
  const payload = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!payload) return jsonError('Provide the updated content.');

  const title = readText(payload.title, 220);
  const summary = readText(payload.summary, 800);
  const body = readText(payload.body, 20000);
  const status = readText(payload.status, 20);
  if (!title || !summary || !['draft', 'published', 'archived'].includes(status)) {
    return jsonError('Title, summary and a valid status are required.');
  }

  const result = await env.DB.prepare(`
    UPDATE content_entries SET title = ?, summary = ?, body = ?, status = ?, updated_at = ? WHERE id = ?
  `).bind(title, summary, body, status, new Date().toISOString(), id).run();
  if (!result.meta.changes) return jsonError('Content entry not found.', 404);
  return Response.json({ ok: true, message: 'Content updated.' });
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await getChatGPTUser();
  if (!user) return jsonError('Sign in to delete content.', 401);
  const { id } = await context.params;
  const result = await env.DB.prepare('DELETE FROM content_entries WHERE id = ?').bind(id).run();
  if (!result.meta.changes) return jsonError('Content entry not found.', 404);
  return Response.json({ ok: true, message: 'Content deleted.' });
}
