'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

type Entry = { id: string; title: string; summary: string; metadata: string; updated_at: string };

export function PublishedAdditions({ type }: { type: 'publication' | 'project' | 'course' | 'post' | 'resource' | 'lab-area' }) {
  const [entries, setEntries] = useState<Entry[]>([]);
  useEffect(() => {
    const controller = new AbortController();
    void fetch(`/api/content?type=${type}`, { signal: controller.signal })
      .then(async (response) => await response.json() as { entries?: Entry[] })
      .then((result) => setEntries(result.entries ?? []))
      .catch(() => undefined);
    return () => controller.abort();
  }, [type]);
  if (!entries.length) return null;
  return (
    <section className="published-additions"><div className="catalog-label"><span>Recently published from the lab</span><p>{entries.length} additions</p></div><div>{entries.map((entry) => { let metadata: Record<string, string> = {}; try { metadata = JSON.parse(entry.metadata) as Record<string, string>; } catch { /* Keep empty metadata. */ } const href = metadata.referenceUrl || '#'; return <article key={entry.id}><span>{type}</span><h2>{entry.title}</h2><p>{entry.summary}</p>{href !== '#' ? <a href={href} target="_blank" rel="noreferrer">Open reference <ArrowUpRight size={16} /></a> : null}</article>; })}</div></section>
  );
}
