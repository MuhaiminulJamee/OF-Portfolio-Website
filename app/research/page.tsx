import type { Metadata } from 'next';
import { PublicationBrowser } from '@/components/publication-browser';
import { PageHero, PageShell } from '@/components/page-parts';
import { PublishedAdditions } from '@/components/published-additions';

export const metadata: Metadata = { title: 'Research & Publications', description: 'Explore the full publication record of Md. Omer Faruque across energy forecasting, intelligent grids and cybersecurity.' };

export default function ResearchPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Publication database" title="Research that connects prediction, constraints and real systems." description="Thirteen journal and conference publications spanning renewable-energy forecasting, microgrid intelligence, secure energy transactions and smart-city systems." aside={<div className="hero-mini-metrics"><span><strong>10</strong>Journal papers</span><span><strong>03</strong>Conference papers</span><span><strong>360+</strong>Citations</span></div>} />
      <section className="database-section"><PublicationBrowser /><PublishedAdditions type="publication" /></section>
    </PageShell>
  );
}
