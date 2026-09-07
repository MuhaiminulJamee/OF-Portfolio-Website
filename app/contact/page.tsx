import type { Metadata } from 'next';
import { InquiryForm } from '@/components/forms';
import { PageHero, PageShell } from '@/components/page-parts';

export const metadata: Metadata = { title: 'Contact', description: 'Contact ResearchBuddy AI about research collaboration, consulting, courses or general inquiries.' };
export default function ContactPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Contact" title="Choose the conversation that fits the work." description="Research mentorship, collaboration, consulting and courses each follow a distinct path. Select the inquiry type below so the right context reaches the lab." />
      <section className="contact-options"><a href="/research-with-us"><span>01</span><h2>Research collaboration</h2><p>For students, researchers and potential collaborators.</p></a><a href="/consulting"><span>02</span><h2>Consulting</h2><p>For companies, laboratories and technical organizations.</p></a><a href="/courses"><span>03</span><h2>Courses & learning</h2><p>For upcoming cohorts and tailored learning programs.</p></a><article><span>04</span><h2>General inquiry</h2><p>For speaking, academic review and other questions.</p></article></section>
      <section className="application-section"><div><span className="kicker">Write to the lab</span><h2>Start with enough context.</h2><p>You can also reach Md. Omer Faruque directly at omerfaruque1501111@gmail.com or +880 1303-975653.</p></div><InquiryForm /></section>
    </PageShell>
  );
}
