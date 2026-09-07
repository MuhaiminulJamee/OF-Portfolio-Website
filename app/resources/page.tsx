import type { Metadata } from 'next';
import { PageHero, PageShell } from '@/components/page-parts';
import { ResourceBrowser } from '@/components/resource-browser';
import { PublishedAdditions } from '@/components/published-additions';

export const metadata: Metadata = { title: 'Research Code & Resources', description: 'Research code, notebooks, templates, datasets and technical resources across AI, power systems, quantum computing and cybersecurity.' };
export default function ResourcesPage() {
  return <PageShell><PageHero eyebrow="Open-source & learning hub" title="Tools for serious, reproducible inquiry." description="Code, notebooks, experimental blueprints, paper-analysis tools and reference material—organized around the work researchers actually need to do." /><section className="database-section"><ResourceBrowser /><PublishedAdditions type="resource" /></section></PageShell>;
}
