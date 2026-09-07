import {
  ArrowRight,
  ArrowUpRight,
  Atom,
  BrainCircuit,
  CircuitBoard,
  Cpu,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { NewsletterForm } from '@/components/forms';
import { AnimatedStat, DualLabHero, ProgressMeter, Reveal } from '@/components/home-experience';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { courses, insights, projects, publications } from '@/lib/content';

const labCards = [
  {
    href: '/labs/power-systems',
    title: 'AI in Power Systems Lab',
    description: 'Building intelligent, reliable and future-ready energy systems through advanced AI research.',
    tags: ['Renewable prediction', 'Load & EV demand', 'Smart grids', 'Reinforcement learning'],
    className: 'power',
    icon: Zap,
  },
  {
    href: '/labs/quantum-cyber',
    title: 'Quantum Cyber Intelligence Lab',
    description: 'Exploring quantum intelligence, machine learning and cybersecurity through rigorous experiments.',
    tags: ['Quantum ML', 'Quantum LSTM', 'Cryptography', 'Threat detection'],
    className: 'quantum',
    icon: Atom,
  },
] as const;

const consulting = [
  { title: 'AI & Machine Learning', icon: BrainCircuit, items: ['Machine-learning systems', 'Deep-learning models', 'Forecasting workflows'] },
  { title: 'Energy & Power Systems', icon: Zap, items: ['Renewable forecasting', 'Microgrid intelligence', 'Decision-aware optimization'] },
  { title: 'Quantum Intelligence', icon: Cpu, items: ['Hybrid quantum models', 'QNN architecture review', 'Experiment design'] },
  { title: 'Cyber Intelligence', icon: ShieldCheck, items: ['Threat analysis', 'Secure energy data', 'Anomaly detection'] },
] as const;

export default function Home() {
  return (
    <main className="reference-home">
      <SiteHeader />
      <DualLabHero />

      <section className="reference-section mission-section" id="mission">
        <div className="mission-grid">
          <Reveal className="mission-portrait">
            <div className="portrait-frame">
              <span aria-hidden="true" />
              <img src="/omer-faruque-portrait.jpg" alt="Md. Omer Faruque" />
              <div><strong>Md. Omer Faruque</strong><small>Founder · Researcher · Mentor</small></div>
            </div>
          </Reveal>
          <Reveal className="mission-copy" delay={100}>
            <div className="reference-label"><span /> One ecosystem · Two laboratories</div>
            <h2>Advancing intelligent energy systems and quantum-secure intelligence—through research, education and mentorship.</h2>
            <p>Research at the intersection of artificial intelligence, power systems, quantum machine learning and cybersecurity. Two virtual laboratories connect publication-grade inquiry with practical education and supervised research.</p>
            <div className="reference-tags">
              {['AI researcher', 'Power systems', 'Quantum ML', 'Research mentor', 'Educator', 'Consultant'].map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <div className="mission-links"><a href="/about">Meet the researcher <ArrowUpRight size={15} /></a><a href="/research">Explore the research <ArrowUpRight size={15} /></a></div>
          </Reveal>
        </div>
      </section>

      <section className="reference-section stats-section" aria-label="Research record">
        <Reveal>
          <div className="reference-stats">
            <AnimatedStat value={360} suffix="+" label="Citations" />
            <AnimatedStat value={7} label="H-index" />
            <AnimatedStat value={6} label="i10-index" />
            <AnimatedStat value={13} label="Publications" />
            <AnimatedStat value={5.25} decimals={2} label="Average impact factor" />
          </div>
        </Reveal>
      </section>

      <section className="reference-section" id="labs">
        <div className="reference-heading">
          <div><div className="reference-label"><span /> The laboratories</div><h2>Two interconnected research worlds</h2><p>Independent ecosystems with their own research areas, projects, publications and learning paths—united under one research brand.</p></div>
        </div>
        <div className="reference-lab-grid">
          {labCards.map((lab, index) => {
            const Icon = lab.icon;
            return (
              <Reveal delay={index * 100} key={lab.href}>
                <a className={`reference-lab-card ${lab.className}`} href={lab.href}>
                  <div className="lab-card-icon"><Icon size={20} /></div>
                  <h3>{lab.title}</h3><p>{lab.description}</p>
                  <div className="reference-tags">{lab.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <div className="card-arrow">Enter the laboratory <ArrowRight size={16} /></div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="reference-section">
        <div className="reference-heading">
          <div><div className="reference-label"><span /> Publication highlights</div><h2>Featured research</h2><p>Peer-reviewed work spanning forecasting, optimization and secure energy systems.</p></div>
          <a href="/research">View all publications <ArrowUpRight size={15} /></a>
        </div>
        <div className="reference-card-grid publication-cards">
          {publications.filter((item) => item.featured).slice(0, 3).map((item, index) => (
            <Reveal delay={index * 90} key={item.doi}>
              <article className="reference-card publication-highlight">
                <div><span>{item.area} · {item.year}</span><span>{item.quartile} {item.metric ? `· ${item.metric}` : ''}</span></div>
                <h3>{item.title}</h3><p>{item.authors}</p><em>{item.venue}</em>
                <a href={item.doi} target="_blank" rel="noreferrer">Open DOI <ArrowUpRight size={14} /></a>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="reference-section">
        <div className="reference-heading">
          <div><div className="reference-label"><span /> Running projects</div><h2>Research in motion</h2></div>
          <a href="/labs/power-systems">Explore all projects <ArrowUpRight size={15} /></a>
        </div>
        <div className="reference-card-grid project-cards">
          {projects.slice(0, 3).map((project, index) => (
            <Reveal delay={index * 90} key={project.title}>
              <article className="reference-card project-highlight">
                <div className="project-top"><span>{project.lab}</span><strong>{project.status}</strong></div>
                <h3>{project.title}</h3><p>{project.summary}</p>
                <div className="reference-tags">{project.methods.map((method) => <span key={method}>{method}</span>)}</div>
                <ProgressMeter value={[74, 58, 66][index]} />
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="reference-section">
        <div className="reference-heading">
          <div><div className="reference-label"><span /> Course platform</div><h2>Learn with the labs</h2><p>Academic courses from research foundations to quantum neural networks, taught through real experiments.</p></div>
          <a href="/courses">Browse all courses <ArrowUpRight size={15} /></a>
        </div>
        <div className="reference-card-grid course-cards">
          {courses.slice(0, 3).map((course, index) => (
            <Reveal delay={index * 90} key={course.slug}>
              <a className="reference-card reference-course-card" href={`/courses/${course.slug}`}>
                <div className={`course-art ${course.category.startsWith('Quantum') ? 'quantum' : 'power'}`}><CircuitBoard size={34} /><span>0{index + 1}</span></div>
                <div className="course-card-body"><small>{course.level} · {course.duration}</small><h3>{course.title}</h3><p>{course.description}</p><footer><strong>{course.price}</strong><span>View course <ArrowUpRight size={14} /></span></footer></div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="reference-section">
        <Reveal>
          <div className="journey-panel">
            <div><div className="reference-label"><span /> Research with us</div><h2>Start your research journey</h2><p>Work directly with the lab—from topic selection and methodology to manuscript preparation and journal submission.</p><a href="/research-with-us">Start your research journey <ArrowUpRight size={16} /></a></div>
            <div className="journey-tags">{['Topic selection', 'Problem formulation', 'Literature review', 'Methodology design', 'Model development', 'Paper writing'].map((tag) => <span key={tag}>{tag}</span>)}</div>
          </div>
        </Reveal>
      </section>

      <section className="reference-section">
        <div className="reference-heading">
          <div><div className="reference-label"><span /> Consulting</div><h2>Research & AI consulting</h2><p>Research-grade intelligence for companies, organizations and technical teams.</p></div>
          <a href="/consulting">Discuss your project <ArrowUpRight size={15} /></a>
        </div>
        <div className="consulting-grid">
          {consulting.map((service, index) => {
            const Icon = service.icon;
            return <Reveal delay={index * 75} key={service.title}><a href="/consulting" className="consulting-card"><span>0{index + 1}</span><Icon size={20} /><h3>{service.title}</h3><ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul><ArrowRight className="consulting-arrow" size={17} /></a></Reveal>;
          })}
        </div>
      </section>

      <section className="reference-section">
        <div className="reference-heading">
          <div><div className="reference-label"><span /> Research notes</div><h2>Ideas, tutorials and research thinking</h2></div>
          <a href="/insights">Read all notes <ArrowUpRight size={15} /></a>
        </div>
        <div className="reference-card-grid insight-cards">
          {insights.map((post, index) => (
            <Reveal delay={index * 90} key={post.slug}>
              <a className="reference-card reference-insight" href={`/insights#${post.slug}`}>
                <div className={`insight-visual visual-${index + 1}`}><span>{post.type}</span></div>
                <div><small>{post.category} · {post.read}</small><h3>{post.title}</h3><p>{post.excerpt}</p><time>{post.date}</time></div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="reference-section">
        <Reveal>
          <div className="reference-newsletter">
            <div className="reference-label"><span /> Lab signals</div>
            <h2>Stay connected with our latest research and ideas</h2>
            <p>New publications, project announcements, course launches and research opportunities—in one considered dispatch.</p>
            <NewsletterForm />
          </div>
        </Reveal>
      </section>

      <section className="reference-section contact-strip">
        <Reveal>
          <div><div><h2>Have a research idea or project in mind?</h2><p>Collaboration, consulting, courses or general inquiries—the labs are open.</p></div><a href="/contact">Get in touch <ArrowUpRight size={16} /></a></div>
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}
