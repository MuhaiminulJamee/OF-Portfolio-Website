import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Check, Play } from 'lucide-react';
import { EnrollmentForm } from '@/components/forms';
import { PageShell } from '@/components/page-parts';
import { courses } from '@/lib/content';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = courses.find((item) => item.slug === slug);
  return course ? { title: course.title, description: course.description } : { title: 'Course' };
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = courses.find((item) => item.slug === slug);
  if (!course) notFound();
  const quantum = course.category.startsWith('Quantum');
  const outcomes = quantum
    ? ['Explain quantum-learning primitives without hiding the mathematics', 'Build reproducible hybrid circuits and baselines', 'Evaluate trainability, noise and resource trade-offs', 'Frame a defensible quantum-ML research question']
    : ['Prepare and validate energy time-series data', 'Build strong classical and deep-learning baselines', 'Evaluate forecasts against operational requirements', 'Document a reproducible research experiment'];
  const modules = ['Research framing & foundations', 'Data, tools & reproducibility', 'Core models and mathematical reasoning', 'Guided implementation', 'Paper analysis & critical comparison', 'Independent mini-project'];
  return (
    <PageShell>
      <section className={`course-hero ${quantum ? 'course-quantum' : 'course-power'}`}>
        <div><span className="kicker">{course.category}</span><h1>{course.title}</h1><p>{course.description}</p><a href="#enroll">Request enrollment</a></div>
        <aside><dl><div><dt>Instructor</dt><dd>Md. Omer Faruque</dd></div><div><dt>Level</dt><dd>{course.level}</dd></div><div><dt>Duration</dt><dd>{course.duration}</dd></div><div><dt>Format</dt><dd>Live + recorded support</dd></div></dl><strong>{course.price}</strong><span>Enrollment fee</span></aside>
      </section>
      <section className="video-section"><div className="video-stage"><Play size={34} /><span>Course introduction</span><p>Introduction video ready for YouTube, Vimeo or direct upload from the admin workspace.</p></div><div><span className="kicker">Meet the course</span><h2>Start with the research question.</h2><p>Every course begins with a concise introduction from the instructor: the problem space, the expected commitment and what a strong final outcome looks like.</p></div></section>
      <section className="course-detail-grid"><div><span className="kicker">What you will learn</span><h2>From concept to defensible experiment.</h2></div><div className="outcome-list">{outcomes.map((outcome) => <span key={outcome}><Check size={16} />{outcome}</span>)}</div></section>
      <section className="curriculum-section"><div className="section-heading compact-heading"><span className="kicker">Curriculum</span><h2>Six research modules</h2></div><div className="curriculum-list">{modules.map((module, index) => <article key={module}><span>0{index + 1}</span><h3>{module}</h3><p>{index < 3 ? 'Live instruction, guided reading and focused exercises.' : 'Hands-on implementation, critique and documented research practice.'}</p></article>)}</div></section>
      <section className="course-information"><article><span>Prerequisites</span><h3>Curiosity before credentials</h3><p>No prior research publication is required. Foundation courses begin with Python and mathematical essentials; advanced courses expect basic machine-learning familiarity.</p></article><article><span>For whom</span><h3>Cross-domain researchers</h3><p>EEE, CSE, ECE, ETE, ME and related students or professionals prepared to commit 10–12 hours per week.</p></article><article><span>Resources</span><h3>A complete working stack</h3><p>Google Colab, Jupyter, PyTorch, TensorFlow, Qiskit or PennyLane, research papers and LaTeX/Overleaf workflows.</p></article></section>
      <section className="enroll-section" id="enroll"><div><span className="kicker">Enrollment</span><h2>Request your place.</h2><p>Submit your details. The lab will confirm schedule, cohort fit and payment instructions directly—no automatic charge is made here.</p></div><EnrollmentForm courseSlug={course.slug} /></section>
    </PageShell>
  );
}
