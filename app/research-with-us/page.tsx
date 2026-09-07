import type { Metadata } from 'next';
import { Check, FileSearch, FlaskConical, GraduationCap, Microscope } from 'lucide-react';
import { InquiryForm } from '@/components/forms';
import { PageHero, PageShell } from '@/components/page-parts';
import { researchPath } from '@/lib/content';

export const metadata: Metadata = { title: 'Research With Us', description: 'A structured six-month research mentorship pathway across AI in power systems and quantum cyber intelligence.' };

export default function ResearchWithUsPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Research mentorship" title="Become an independent researcher, one rigorous step at a time." description="The lab starts with foundations—not an assigned paper. Over six months, students learn the concepts, methods, literature-analysis habits and implementation discipline needed to identify and pursue a real research gap." aside={<a className="primary-link" href="#apply">Start your research journey</a>} />
      <section className="principles-section"><article><GraduationCap /><h2>Foundation</h2><p>AI concepts, mathematics and coding before model complexity.</p></article><article><FlaskConical /><h2>Methods</h2><p>Machine and deep-learning models understood from logic to implementation.</p></article><article><FileSearch /><h2>Paper analysis</h2><p>Read, reproduce, compare and question existing work.</p></article><article><Microscope /><h2>Independent research</h2><p>Turn an unresolved limitation into an original, testable contribution.</p></article></section>
      <section className="pathway-section"><div className="section-heading"><span className="kicker">The six-month pathway</span><h2>A curriculum with a research outcome.</h2><p>Weekly live classes, regular assignments, mini-projects, targeted feedback and one-to-one supervision as individual paper work begins.</p></div><div className="pathway-list">{researchPath.map(([time, name, detail]) => <article key={time}><span>{time}</span><h3>{name}</h3><p>{detail}</p></article>)}</div></section>
      <section className="eligibility-section"><div><span className="kicker">Who can join</span><h2>Cross-domain by design.</h2><p>EEE, CSE, ECE, ETE, ME and related disciplines are welcome. Prior coding or research experience is not required; curiosity, consistency and a 10–12 hour weekly commitment are.</p></div><div className="check-list">{['Live, interactive foundation classes', 'Monthly assignments and a mini-project', 'One-to-one paper and project supervision', 'Python, Colab, PyTorch, TensorFlow, Qiskit and Overleaf', 'Final independent project and publication-quality draft', 'Long-term laboratory and alumni community'].map((item) => <span key={item}><Check size={16} />{item}</span>)}</div></section>
      <section className="gap-section"><div><span className="kicker">Research gap</span><h2>From what is known<br />to what is missing.</h2></div><ol><li><span>01</span><div><h3>Review the literature</h3><p>Understand what has already been tested, on which data and under what assumptions.</p></div></li><li><span>02</span><div><h3>Locate the unresolved limitation</h3><p>Find the unanswered question, missing constraint or weak connection to real operation.</p></div></li><li><span>03</span><div><h3>Form a new contribution</h3><p>Translate that gap into a clear idea, method, experiment and evidence plan.</p></div></li></ol></section>
      <section className="faq-section"><div className="section-heading compact-heading"><span className="kicker">Common questions</span><h2>Before you apply</h2></div><div className="faq-grid">{[
        ['Do I need a coding background?', 'No. The pathway begins with Python, linear algebra, calculus and core AI ideas.'],
        ['Are classes live?', 'Yes. Classes are live and interactive; recordings and study materials support missed sessions.'],
        ['How is authorship decided?', 'Author order follows international academic standards and reflects each member’s intellectual and practical contribution.'],
        ['How long can a paper take?', 'A strong first draft may be possible in three to six months with consistent work; peer review and publication timelines vary.'],
        ['Is one-to-one supervision included?', 'Yes. Individual sessions begin after the foundation phase when a defined project is assigned.'],
        ['Do I need a high-end computer?', 'No. Cloud tools such as Google Colab and Kaggle support most learning and experimentation needs.'],
      ].map(([q, a]) => <article key={q}><h3>{q}</h3><p>{a}</p></article>)}</div></section>
      <section className="application-section" id="apply"><div><span className="kicker">Application</span><h2>Start your research journey.</h2><p>Tell us where you are now, what you want to investigate and how much research experience you already have.</p></div><InquiryForm initialType="research" /></section>
    </PageShell>
  );
}
