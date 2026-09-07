import { env } from 'cloudflare:workers';
import { jsonError, readText } from '@/lib/server-validation';

const allowedTypes = new Set(['publication', 'project', 'course', 'post', 'resource', 'lab-area']);
export async function GET(request: Request) {
  const type = readText(new URL(request.url).searchParams.get('type'), 40);
  if (!allowedTypes.has(type)) return jsonError('Unknown content type.');
  try {
    const rows = await env.DB.prepare(
      'SELECT id, type, slug, title, summary, body, metadata, updated_at FROM content_entries WHERE type = ? AND status = ? ORDER BY updated_at DESC LIMIT 100',
    ).bind(type, 'published').all();
    return Response.json({ ok: true, entries: rows.results });
  } catch {
    return Response.json({ ok: true, entries: [] });
  }
}
