import { env } from 'cloudflare:workers';
import { jsonError } from '@/lib/server-validation';

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const row = await env.DB.prepare('SELECT object_key, name, content_type FROM uploads WHERE id = ?').bind(id).first<{ object_key: string; name: string; content_type: string }>();
  if (!row) return jsonError('File not found.', 404);
  const object = await env.FILES.get(row.object_key);
  if (!object) return jsonError('File not found.', 404);
  return new Response(object.body, { headers: { 'content-type': row.content_type, 'content-length': String(object.size), 'content-disposition': `inline; filename="${row.name.replaceAll('"', '')}"`, 'cache-control': 'public, max-age=3600' } });
}
