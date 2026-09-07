'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import { Download, LoaderCircle, Plus, RefreshCw, Upload } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';

type Row = Record<string, unknown>;
type AdminData = { content: Row[]; inquiries: Row[]; subscribers: Row[]; enrollments: Row[]; uploads: Row[] };
const empty: AdminData = { content: [], inquiries: [], subscribers: [], enrollments: [], uploads: [] };

export function AdminConsole({ displayName }: { displayName: string }) {
  const [data, setData] = useState<AdminData>(empty);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    const response = await fetch('/api/admin/content', { cache: 'no-store' });
    if (response.ok) {
      const result = await response.json() as AdminData & { ok: boolean };
      setData(result);
    } else setNotice('The content workspace could not be loaded.');
    setLoading(false);
  }, []);
  useEffect(() => { void load(); }, [load]);

  async function createContent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setNotice('');
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    const response = await fetch('/api/admin/content', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) });
    const result = await response.json() as { message: string };
    setNotice(result.message);
    if (response.ok) { form.reset(); await load(); }
  }

  async function updateStatus(id: string, row: Row, status: string) {
    const response = await fetch(`/api/admin/content/${id}`, { method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ title: row.title, summary: row.summary, body: row.body, status }) });
    const result = await response.json() as { message: string };
    setNotice(result.message);
    if (response.ok) await load();
  }

  async function uploadFile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setNotice('');
    const form = event.currentTarget;
    const response = await fetch('/api/admin/uploads', { method: 'POST', body: new FormData(form) });
    const result = await response.json() as { message: string };
    setNotice(result.message);
    if (response.ok) { form.reset(); await load(); }
  }

  function exportSubscribers() {
    const csv = ['Name,Email,Subscribed', ...data.subscribers.map((row) => [row.name, row.email, row.created_at].map((value) => `"${String(value ?? '').replaceAll('"', '""')}"`).join(','))].join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'lab-signals-subscribers.csv'; anchor.click(); URL.revokeObjectURL(url);
  }

  return (
    <section className="admin-shell">
      <header><div><span className="kicker">Secure content workspace</span><h1>Good to see you, {displayName}.</h1><p>Manage lab content, media, applications and course interest from one place.</p></div><button type="button" onClick={() => void load()}><RefreshCw size={16} /> Refresh</button></header>
      {notice ? <output className="admin-notice">{notice}</output> : null}
      {loading ? <div className="admin-loading"><LoaderCircle className="spin" /> Loading workspace…</div> : (
        <Tabs defaultValue="overview" className="admin-tabs">
          <TabsList variant="line" className="admin-tab-list"><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="content">Content</TabsTrigger><TabsTrigger value="inquiries">Inquiries</TabsTrigger><TabsTrigger value="enrollments">Enrollments</TabsTrigger><TabsTrigger value="subscribers">Subscribers</TabsTrigger><TabsTrigger value="files">Files</TabsTrigger></TabsList>
          <TabsContent value="overview"><div className="admin-metrics">{[['Content entries', data.content.length], ['New inquiries', data.inquiries.length], ['Course requests', data.enrollments.length], ['Subscribers', data.subscribers.length], ['Uploads', data.uploads.length]].map(([label, value]) => <article key={String(label)}><strong>{String(value).padStart(2, '0')}</strong><span>{label}</span></article>)}</div><div className="admin-guidance"><h2>Content model</h2><p>The public site ships with the verified CV and guideline content. New publications, projects, courses, posts and resources created here are stored in the site database and can be staged as drafts before publication.</p></div></TabsContent>
          <TabsContent value="content"><div className="admin-grid"><form className="admin-form" onSubmit={createContent}><h2><Plus size={18} /> Add content</h2><label><span>Content type</span><NativeSelect name="type" required><NativeSelectOption value="publication">Publication</NativeSelectOption><NativeSelectOption value="project">Project</NativeSelectOption><NativeSelectOption value="course">Course</NativeSelectOption><NativeSelectOption value="post">Blog / vlog</NativeSelectOption><NativeSelectOption value="resource">Resource</NativeSelectOption><NativeSelectOption value="lab-area">Lab research area</NativeSelectOption></NativeSelect></label><label><span>Title</span><input name="title" required /></label><label><span>Slug</span><input name="slug" required placeholder="short-readable-slug" /></label><label><span>Summary</span><textarea name="summary" required rows={3} /></label><label><span>Body / curriculum / notes</span><textarea name="body" rows={7} /></label><label><span>Video URL</span><input name="videoUrl" type="url" placeholder="YouTube or Vimeo course intro / vlog" /></label><label><span>Thumbnail URL</span><input name="thumbnailUrl" type="url" /></label><label><span>DOI, GitHub or download URL</span><input name="referenceUrl" type="url" /></label><div className="form-row"><label><span>Price</span><input name="price" placeholder="$180" /></label><label><span>Project status</span><input name="projectStatus" placeholder="Active / Under review" /></label></div><label><span>Technologies / tags</span><input name="technologies" placeholder="PyTorch, Qiskit, Power Systems" /></label><label><span>Publish state</span><NativeSelect name="status" defaultValue="draft"><NativeSelectOption value="draft">Draft</NativeSelectOption><NativeSelectOption value="published">Published</NativeSelectOption><NativeSelectOption value="archived">Archived</NativeSelectOption></NativeSelect></label><button type="submit">Save content</button></form><div className="admin-list"><h2>Database content</h2>{data.content.length ? data.content.map((row) => <article key={String(row.id)}><span>{String(row.type)} · {String(row.status)}</span><h3>{String(row.title)}</h3><p>{String(row.summary)}</p><NativeSelect value={String(row.status)} onChange={(event) => void updateStatus(String(row.id), row, event.target.value)}><NativeSelectOption value="draft">Draft</NativeSelectOption><NativeSelectOption value="published">Published</NativeSelectOption><NativeSelectOption value="archived">Archived</NativeSelectOption></NativeSelect></article>) : <p className="empty-copy">No database additions yet. Verified source content is already live on the public pages.</p>}</div></div></TabsContent>
          <TabsContent value="inquiries"><AdminTable rows={data.inquiries} columns={['name', 'email', 'inquiry_type', 'organization', 'proposed_topic', 'status', 'created_at']} emptyLabel="No inquiries yet." /></TabsContent>
          <TabsContent value="enrollments"><AdminTable rows={data.enrollments} columns={['name', 'email', 'course_slug', 'institution', 'status', 'created_at']} emptyLabel="No course requests yet." /></TabsContent>
          <TabsContent value="subscribers"><div className="admin-panel-head"><h2>Lab Signals subscribers</h2><button type="button" onClick={exportSubscribers} disabled={!data.subscribers.length}><Download size={16} /> Export CSV</button></div><AdminTable rows={data.subscribers} columns={['name', 'email', 'created_at']} emptyLabel="No subscribers yet." /></TabsContent>
          <TabsContent value="files"><div className="admin-grid"><form className="admin-form upload-form" onSubmit={uploadFile}><h2><Upload size={18} /> Upload media or resource</h2><p>Course introduction videos, thumbnails, PDFs, datasets and notebooks are stored in the site’s private object library.</p><input name="file" type="file" required accept="video/*,image/*,.pdf,.csv,.zip,.ipynb,.py,.m" /><button type="submit">Upload file</button></form><AdminTable rows={data.uploads} columns={['name', 'content_type', 'size', 'created_at']} emptyLabel="No uploaded files yet." /></div></TabsContent>
        </Tabs>
      )}
    </section>
  );
}

function AdminTable({ rows, columns, emptyLabel }: { rows: Row[]; columns: string[]; emptyLabel: string }) {
  if (!rows.length) return <p className="empty-copy">{emptyLabel}</p>;
  return <div className="admin-table-wrap"><table className="admin-table"><thead><tr>{columns.map((column) => <th key={column}>{column.replaceAll('_', ' ')}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={String(row.id ?? index)}>{columns.map((column) => <td key={column}>{String(row[column] ?? '—')}</td>)}</tr>)}</tbody></table></div>;
}
