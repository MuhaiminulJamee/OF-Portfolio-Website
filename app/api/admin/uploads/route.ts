import { env } from 'cloudflare:workers';
import { getChatGPTUser } from '@/app/chatgpt-auth';
import { jsonError } from '@/lib/server-validation';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return jsonError('Sign in to upload files.', 401);
  const formData = await request.formData();
  const file = formData.get('file');
  if (!(file instanceof File)) return jsonError('Choose a file to upload.');
  if (file.size > 50 * 1024 * 1024) return jsonError('Files must be 50 MB or smaller.');

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]+/g, '-');
  const objectKey = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${safeName}`;
  await env.FILES.put(objectKey, file.stream(), {
    httpMetadata: { contentType: file.type || 'application/octet-stream' },
    customMetadata: { uploadedBy: user.userId, originalName: file.name },
  });
  const id = crypto.randomUUID();
  await env.DB.prepare(`
    INSERT INTO uploads (id, object_key, name, content_type, size, uploaded_by, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).bind(
    id, objectKey, file.name, file.type || 'application/octet-stream',
    file.size, user.userId, new Date().toISOString(),
  ).run();
  return Response.json({ ok: true, message: 'File uploaded to the resource library.', url: `/api/files/${id}` }, { status: 201 });
}
