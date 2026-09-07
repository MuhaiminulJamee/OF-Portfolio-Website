import type { Metadata } from 'next';
import { Play } from 'lucide-react';
import { NewsletterForm } from '@/components/forms';
import { PageHero, PageShell } from '@/components/page-parts';
import { insights } from '@/lib/content';
import { PublishedAdditions } from '@/components/published-additions';

export const metadata: Metadata = { title: 'Intelligence Journal', description: 'Research notes, technical tutorials and video briefings across energy AI, quantum machine learning and academic practice.' };
export default function InsightsPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Intelligence journal" title="Notes from the boundary between ideas and evidence." description="Written research notes, technical briefings and video conversations on AI, energy systems, quantum computing, cybersecurity and the craft of research." />
      <section className="journal-feature" id={insights[0].slug}><div className="journal-visual"><span>Featured research note</span></div><div><span className="kicker">{insights[0].category} · {insights[0].date}</span><h2>{insights[0].title}</h2><p>{insights[0].excerpt}</p><p>A high-performing forecast can still be a poor operational instrument when it ignores scheduling constraints, imbalance costs and the asymmetry of downstream decisions. Decision-aware forecasting begins by asking what the prediction must enable—not only how close it is to the observed value.</p><span className="read-time">{insights[0].read}</span></div></section>
      <section className="journal-list">{insights.slice(1).map((post, index) => <article id={post.slug} key={post.slug}><div className={`insight-visual visual-${index + 2}`}>{post.type.includes('Video') ? <Play size={28} /> : null}<span>{post.type}</span></div><div><small>{post.category} · {post.date}</small><h2>{post.title}</h2><p>{post.excerpt}</p><span className="read-time">{post.read}</span></div></article>)}</section>
      <div className="database-section additions-wrap"><PublishedAdditions type="post" /></div>
      <section className="signal-section"><div><span className="kicker">Lab Signals</span><h2>Follow the research as it develops.</h2><p>Occasional updates on publications, experiments, learning cohorts and open research opportunities.</p></div><NewsletterForm /></section>
    </PageShell>
  );
}
