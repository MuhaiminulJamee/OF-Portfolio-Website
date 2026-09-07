import type { Metadata } from 'next';
import { requireChatGPTUser, chatGPTSignOutPath } from '@/app/chatgpt-auth';
import { AdminConsole } from '@/components/admin-console';

export const metadata: Metadata = { title: 'Admin Workspace', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const user = await requireChatGPTUser('/admin');
  return <main className="admin-page"><div className="admin-bar"><a href="/">← Public site</a><span>{user.email}</span><a href={chatGPTSignOutPath('/')}>Sign out</a></div><AdminConsole displayName={user.fullName ?? user.email.split('@')[0]} /></main>;
}
