import {
  ArrowDownRight,
  ArrowUpRight,
  Atom,
  CircuitBoard,
  Network,
  Zap,
} from 'lucide-react';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { NewsletterForm } from '@/components/forms';
import { courses, insights, projects, publications, resources } from '@/lib/content';

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="hero" id="top">
        <div className="hero-intro">
          <p className="eyebrow"><span /> Two laboratories. One research continuum.</p>
          <h1>Intelligence for the systems<br />the future depends on.</h1>
          <p>
            Research, education and applied consulting led by <strong>Md. Omer Faruque</strong>
            {' '}across intelligent energy and quantum-secure computation.
          </p>
        </div>

        <div className="lab-worlds" id="labs">
          <a className="lab-world power-world" href="/labs/power-systems">
            <div className="world-grid" aria-hidden="true" />
            <div className="signal power-signal" aria-hidden="true">
              <span /><span /><span /><span /><span />
            </div>
            <div className="world-number">01 / ENERGY INTELLIGENCE</div>
            <div className="world-content">
              <div className="world-icon"><Zap size={20} /></div>
              <h2>AI in<br />Power Systems</h2>
              <p>
                Forecasting, optimization and decision-aware learning for reliable renewable-energy systems.
              </p>
              <span className="world-link">Enter the lab <ArrowDownRight size={18} /></span>
            </div>
          </a>

          <a className="lab-world quantum-world" href="/labs/quantum-cyber">
            <div className="world-grid" aria-hidden="true" />
            <div className="quantum-orbit" aria-hidden="true">
              <span /><span /><span />
              <i />
            </div>
            <div className="world-number">02 / QUANTUM INTELLIGENCE</div>
            <div className="world-content">
              <div className="world-icon"><Atom size={20} /></div>
              <h2>Quantum Cyber<br />Intelligence</h2>
              <p>
                Quantum machine learning, secure intelligence and new architectures for trusted computation.
              </p>
              <span className="world-link">Enter the lab <ArrowDownRight size={18} /></span>
            </div>
          </a>
        </div>

        <div className="hero-footer">
          <span>Research.</span><span>Intelligence.</span><span>Energy.</span><span>Quantum.</span>
        </div>
      </section>

      <section className="research-ledger" id="research">
        <div className="section-label">
          <span>Research record</span>
          <p>Evidence before spectacle.</p>
        </div>
        <div className="metrics" aria-label="Research statistics">
          {[
            ['360+', 'Citations'],
            ['07', 'H-index'],
            ['06', 'i10-index'],
            ['13', 'Publications'],
            ['5.25', 'Average impact factor'],
          ].map(([value, label]) => (
            <div className="metric" key={label}>
              <strong>{value}</strong><span>{label}</span>
            </div>
          ))}
        </div>
        <div className="profile-bridge" id="about">
          <figure>
            <img src="/omer-faruque-portrait.jpg" alt="Md. Omer Faruque" />
            <figcaption>Md. Omer Faruque · Researcher, mentor & educator</figcaption>
          </figure>
          <div className="profile-copy">
            <span className="kicker">Principal researcher</span>
            <h2>Rigorous research,<br />translated into real capability.</h2>
            <p>
              Md. Omer Faruque works at the intersection of renewable-energy forecasting,
              optimization-embedded deep learning, power-systems cybersecurity and quantum
              machine learning. His work connects publication-grade inquiry with teaching,
              mentorship and deployable technical systems.
            </p>
            <div className="interest-row">
              <span><Network size={15} /> Decision-aware forecasting</span>
              <span><CircuitBoard size={15} /> Quantum LSTM architecture</span>
            </div>
            <a className="text-link" href="/about">View research profile <ArrowUpRight size={16} /></a>
          </div>
        </div>
      </section>

      <section className="editorial-section">
        <div className="section-heading">
          <span className="kicker">Selected publications</span>
          <h2>Work that moves from<br />prediction to decision.</h2>
          <a className="text-link" href="/research">View all 13 publications <ArrowUpRight size={16} /></a>
        </div>
        <div className="publication-grid">
          {publications.filter((item) => item.featured).slice(0, 3).map((item, index) => (
            <article className="publication-card" key={item.doi}>
              <div className="pub-index">0{index + 1}</div>
              <div><span>{item.area} · {item.year}</span><h3>{item.title}</h3><p>{item.venue}</p></div>
              <div className="pub-meta"><span>{item.metric}</span><span>{item.quartile}</span><a href={item.doi} target="_blank" rel="noreferrer" aria-label={`Open DOI for ${item.title}`}><ArrowUpRight size={18} /></a></div>
            </article>
          ))}
        </div>
      </section>

      <section className="project-section">
        <div className="section-heading compact-heading">
          <span className="kicker">Running work</span>
          <h2>Active research projects</h2>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <article key={project.title}>
              <span className={`status ${project.status.toLowerCase().replace(' ', '-')}`}>{project.status}</span>
              <div><small>{project.lab}</small><h3>{project.title}</h3><p>{project.summary}</p></div>
              <div className="tag-stack">{project.methods.map((method) => <span key={method}>{method}</span>)}</div>
              <ArrowUpRight size={20} />
            </article>
          ))}
        </div>
      </section>

      <section className="course-section" id="courses">
        <div className="section-heading">
          <span className="kicker">Research learning</span>
          <h2>Courses built around<br />real research practice.</h2>
          <p>Live, interactive learning that connects theory, code, paper analysis and independent investigation.</p>
        </div>
        <div className="course-grid">
          {courses.slice(0, 4).map((course, index) => (
            <a className="course-card" href={`/courses/${course.slug}`} key={course.slug}>
              <div><span>0{index + 1}</span><small>{course.category}</small></div>
              <h3>{course.title}</h3><p>{course.description}</p>
              <footer><span>{course.level} · {course.duration}</span><strong>{course.price}</strong></footer>
            </a>
          ))}
        </div>
        <a className="text-link section-link" href="/courses">Explore all courses <ArrowUpRight size={16} /></a>
      </section>

      <section className="two-paths">
        <a href="/research-with-us" className="path-card research-path">
          <span className="kicker">For students & researchers</span>
          <h2>Research with us</h2>
          <p>A structured six-month pathway from foundational concepts to an independent, publication-quality research draft.</p>
          <span className="world-link">Start your research journey <ArrowDownRight size={18} /></span>
        </a>
        <a href="/consulting" className="path-card consulting-path" id="consulting">
          <span className="kicker">For teams & organizations</span>
          <h2>Research & AI consulting</h2>
          <p>Focused technical work across forecasting, optimization, energy intelligence, quantum AI and cybersecurity.</p>
          <span className="world-link">Discuss your project <ArrowDownRight size={18} /></span>
        </a>
      </section>

      <section className="resource-section" id="resources">
        <div className="section-heading compact-heading"><span className="kicker">Open practice</span><h2>Research code & resources</h2></div>
        <div className="resource-list">
          {resources.slice(0, 4).map((resource) => (
            <a href="/resources" key={resource.title}><span>{resource.kind}</span><h3>{resource.title}</h3><p>{resource.description}</p><small>{resource.tech}</small><ArrowUpRight size={18} /></a>
          ))}
        </div>
      </section>

      <section className="insight-section" id="insights">
        <div className="section-heading compact-heading"><span className="kicker">Intelligence journal</span><h2>Research notes & briefings</h2></div>
        <div className="insight-grid">
          {insights.map((post, index) => (
            <a href={`/insights#${post.slug}`} key={post.slug}><div className={`insight-visual visual-${index + 1}`}><span>{post.type}</span></div><small>{post.category} · {post.date}</small><h3>{post.title}</h3><p>{post.excerpt}</p><span className="read-time">{post.read}</span></a>
          ))}
        </div>
      </section>

      <section className="signal-section" id="contact">
        <div><span className="kicker">Lab Signals</span><h2>Stay connected to the work.</h2><p>New publications, research opportunities, project notes and course announcements—sent with restraint.</p></div>
        <NewsletterForm />
      </section>

      <SiteFooter />
    </main>
  );
}
