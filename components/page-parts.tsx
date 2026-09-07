import { ReactNode } from 'react';
import { ArrowDownRight, ArrowUpRight, Atom, Zap } from 'lucide-react';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { courses, labAreas, projects, publications, resources } from '@/lib/content';
import { PublishedAdditions } from '@/components/published-additions';

export function PageHero({ eyebrow, title, description, aside }: { eyebrow: string; title: string; description: string; aside?: ReactNode }) {
  return (
    <section className="page-hero">
      <div><span className="kicker">{eyebrow}</span><h1>{title}</h1></div>
      <div className="page-hero-aside"><p>{description}</p>{aside}</div>
    </section>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return <main><SiteHeader />{children}<SiteFooter /></main>;
}

export function LabPage({ kind }: { kind: 'power' | 'quantum' }) {
  const power = kind === 'power';
  const title = power ? 'AI in Power Systems Lab' : 'Quantum Cyber Intelligence Lab';
  const description = power
    ? 'Building intelligent, reliable and future-ready energy systems through forecasting, optimization and decision-aware AI.'
    : 'Exploring the intersection of quantum intelligence, machine learning and cybersecurity through rigorous, reproducible research.';
  const labName = power ? 'Power Systems' : 'Quantum Cyber';
  const relatedProjects = projects.filter((item) => item.lab === labName);
  const relatedPublications = publications.filter((item) => power ? !item.area.toLowerCase().includes('cyber') : item.area.toLowerCase().includes('cyber'));
  const relatedCourses = courses.filter((item) => power ? item.category.startsWith('AI') : item.category.startsWith('Quantum'));

  return (
    <PageShell>
      <section className={`lab-hero ${power ? 'lab-power' : 'lab-quantum'}`}>
        <div className="world-grid" aria-hidden="true" />
        <div className="lab-hero-icon">{power ? <Zap size={28} /> : <Atom size={28} />}</div>
        <span className="kicker">{power ? 'Energy intelligence' : 'Quantum intelligence'}</span>
        <h1>{title}</h1><p>{description}</p>
        <div className="lab-actions"><a href="#areas">Explore research</a><a href="#courses">View courses</a><a href="/research-with-us">Join research</a></div>
      </section>

      <section className="lab-content" id="areas">
        <div className="section-heading compact-heading"><span className="kicker">Research agenda</span><h2>Areas of inquiry</h2></div>
        <div className="area-grid">
          {labAreas[kind].map(([name, detail], index) => <article key={name}><span>0{index + 1}</span><h3>{name}</h3><p>{detail}</p></article>)}
        </div>
      </section>

      <section className="lab-content alt-surface">
        <div className="section-heading compact-heading"><span className="kicker">In progress</span><h2>Running projects</h2></div>
        <div className="project-list">
          {relatedProjects.map((project) => <article key={project.title}><span className="status">{project.status}</span><div><small>{project.lab}</small><h3>{project.title}</h3><p>{project.summary}</p></div><div className="tag-stack">{project.methods.map((method) => <span key={method}>{method}</span>)}</div><ArrowUpRight size={20} /></article>)}
        </div>
      </section>

      <section className="lab-content lab-split">
        <div><span className="kicker">Research output</span><h2>Related publications</h2><p>Peer-reviewed work connecting robust methods to consequential energy and security problems.</p><a className="text-link" href="/research">Open publication database <ArrowUpRight size={16} /></a></div>
        <div className="mini-pubs">
          {(relatedPublications.length ? relatedPublications : publications.filter((item) => item.featured)).slice(0, 3).map((item) => <a href={item.doi} target="_blank" rel="noreferrer" key={item.doi}><span>{item.year} · {item.venue.split('·')[0]}</span><h3>{item.title}</h3><ArrowUpRight size={17} /></a>)}
        </div>
      </section>

      <section className="lab-content alt-surface" id="courses">
        <div className="section-heading compact-heading"><span className="kicker">Learn in the lab</span><h2>Courses & guided practice</h2></div>
        <div className="course-grid three-grid">
          {relatedCourses.map((course, index) => <a className="course-card" href={`/courses/${course.slug}`} key={course.slug}><div><span>0{index + 1}</span><small>{course.level}</small></div><h3>{course.title}</h3><p>{course.description}</p><footer><span>{course.duration}</span><strong>{course.price}</strong></footer></a>)}
        </div>
      </section>

      <section className="lab-content lab-split">
        <div><span className="kicker">Tools for inquiry</span><h2>Code & experiments</h2><p>Start from a clear experimental structure, then build toward a defensible contribution.</p><a className="text-link" href="/resources">Explore all resources <ArrowUpRight size={16} /></a></div>
        <div className="mini-pubs">
          {resources.filter((item) => power ? item.category !== 'Quantum Computing' : ['Quantum Computing', 'Cybersecurity', 'Research Methods'].includes(item.category)).slice(0, 3).map((item) => <a href="/resources" key={item.title}><span>{item.kind} · {item.tech}</span><h3>{item.title}</h3><ArrowDownRight size={17} /></a>)}
        </div>
      </section>
      <div className="lab-content additions-wrap"><PublishedAdditions type="project" /></div>
    </PageShell>
  );
}
