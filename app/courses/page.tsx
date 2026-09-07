import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { PageHero, PageShell } from '@/components/page-parts';
import { courses } from '@/lib/content';
import { PublishedAdditions } from '@/components/published-additions';

export const metadata: Metadata = { title: 'Research Courses', description: 'Live, research-led courses in power systems AI, energy forecasting, quantum machine learning and cybersecurity.' };

export default function CoursesPage() {
  const groups = [...new Set(courses.map((course) => course.category))];
  return (
    <PageShell>
      <PageHero eyebrow="Course platform" title="Learn the method. Build the experiment. Defend the result." description="Premium live courses for researchers who want to understand the mathematics, build the code, read the literature and produce credible independent work." aside={<a className="text-link" href="/research-with-us">Need full research mentorship? <ArrowUpRight size={16} /></a>} />
      {groups.map((group) => (
        <section className="catalog-section" key={group}>
          <div className="catalog-label"><span>{group}</span><p>{courses.filter((course) => course.category === group).length} focused courses</p></div>
          <div className="course-grid three-grid">
            {courses.filter((course) => course.category === group).map((course, index) => (
              <a className="course-card" href={`/courses/${course.slug}`} key={course.slug}><div><span>0{index + 1}</span><small>{course.level}</small></div><h3>{course.title}</h3><p>{course.description}</p><footer><span>{course.duration}</span><strong>{course.price}</strong></footer></a>
            ))}
          </div>
        </section>
      ))}
      <div className="database-section additions-wrap"><PublishedAdditions type="course" /></div>
    </PageShell>
  );
}
