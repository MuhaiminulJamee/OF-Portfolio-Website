import type { Metadata } from 'next';
import { ArrowDownRight } from 'lucide-react';
import { InquiryForm } from '@/components/forms';
import { PageHero, PageShell } from '@/components/page-parts';

export const metadata: Metadata = { title: 'Research & AI Consulting', description: 'Technical consulting across machine learning, renewable-energy forecasting, quantum intelligence and cybersecurity.' };

const serviceGroups = [
  ['AI & machine learning', ['Forecasting systems', 'Deep learning', 'Optimization', 'Reinforcement learning'], 'Research-grade model development, evaluation and technical review for data-rich systems.'],
  ['Energy & power systems', ['Wind & solar forecasting', 'Load forecasting', 'Microgrid intelligence', 'Energy data analytics'], 'Decision-ready intelligence for renewable integration, planning and operational uncertainty.'],
  ['Quantum intelligence', ['Quantum machine learning', 'Quantum neural networks', 'Hybrid quantum-classical studies'], 'Feasibility, experimental design and architectural evaluation for quantum-AI initiatives.'],
  ['Cyber intelligence', ['Power-system cybersecurity', 'Secure energy data', 'AI-based threat analysis'], 'Threat-aware research and analytical systems for critical energy information flows.'],
];

export default function ConsultingPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Research & AI consulting" title="Technical clarity for consequential systems." description="Focused collaboration for organizations navigating forecasting, intelligent energy, advanced machine learning, quantum research and cyber resilience." aside={<a className="primary-link" href="#inquiry">Discuss your project</a>} />
      <section className="service-list">{serviceGroups.map(([title, items, description], index) => <article key={String(title)}><span>0{index + 1}</span><div><h2>{title}</h2><p>{description}</p></div><ul>{(items as string[]).map((item) => <li key={item}>{item}</li>)}</ul><ArrowDownRight size={20} /></article>)}</section>
      <section className="process-section"><div className="section-heading compact-heading"><span className="kicker">Engagement model</span><h2>A clear four-part process</h2></div><div className="process-grid">{[['01', 'Frame', 'Clarify the operating question, constraints, evidence and decision.'], ['02', 'Diagnose', 'Audit data, methods, risks and the strongest technical route.'], ['03', 'Build', 'Develop the analysis, model or research artifact with visible checkpoints.'], ['04', 'Transfer', 'Deliver results, documentation and the capability to carry the work forward.']].map(([n, t, d]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div></section>
      <section className="application-section" id="inquiry"><div><span className="kicker">Project inquiry</span><h2>Bring the system, the constraint and the decision.</h2><p>Describe the problem, current data or technology, and what a successful engagement should make possible.</p></div><InquiryForm initialType="consulting" /></section>
    </PageShell>
  );
}
