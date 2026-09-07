import { env } from 'cloudflare:workers';
import { getChatGPTUser } from '@/app/chatgpt-auth';
import { jsonError, readText } from '@/lib/server-validation';

export const dynamic = 'force-dynamic';

export async function GET() {
  const user = await getChatGPTUser();
  if (!user) return jsonError('Sign in to access the admin workspace.', 401);

  const [content, inquiries, subscribers, enrollments, uploads] = await Promise.all([
    env.DB.prepare('SELECT * FROM content_entries ORDER BY updated_at DESC LIMIT 100').all(),
    env.DB.prepare('SELECT * FROM inquiries ORDER BY created_at DESC LIMIT 25').all(),
    env.DB.prepare('SELECT id, name, email, created_at FROM subscribers ORDER BY created_at DESC LIMIT 25').all(),
    env.DB.prepare('SELECT * FROM enrollments ORDER BY created_at DESC LIMIT 25').all(),
    env.DB.prepare('SELECT id, name, content_type, size, created_at FROM uploads ORDER BY created_at DESC LIMIT 25').all(),
  ]);

  return Response.json({
    ok: true,
    content: content.results,
    inquiries: inquiries.results,
    subscribers: subscribers.results,
    enrollments: enrollments.results,
    uploads: uploads.results,
  });
}

export async function POST(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return jsonError('Sign in to create content.', 401);
  const payload = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!payload) return jsonError('Provide content details.');

  const type = readText(payload.type, 40);
  const slug = readText(payload.slug, 120).toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '');
  const title = readText(payload.title, 220);
  const summary = readText(payload.summary, 800);
  const body = readText(payload.body, 20000);
  const status = readText(payload.status, 20);
  if (!type || !slug || !title || !summary || !['draft', 'published', 'archived'].includes(status)) {
    return jsonError('Type, slug, title, summary and a valid status are required.');
  }

  const now = new Date().toISOString();
  const metadata = JSON.stringify({
    videoUrl: readText(payload.videoUrl, 600),
    thumbnailUrl: readText(payload.thumbnailUrl, 600),
    referenceUrl: readText(payload.referenceUrl, 600),
    price: readText(payload.price, 40),
    projectStatus: readText(payload.projectStatus, 40),
    technologies: readText(payload.technologies, 500),
  });
  try {
    await env.DB.prepare(`
      INSERT INTO content_entries (id, type, slug, title, summary, body, metadata, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(crypto.randomUUID(), type, slug, title, summary, body, metadata, status, now, now).run();
    return Response.json({ ok: true, message: 'Content saved.' }, { status: 201 });
  } catch {
    return jsonError('That content slug is already in use.', 409);
  }
}
