'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { ArrowRight, Atom, Zap } from 'lucide-react';

export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: '0px 0px -60px', threshold: 0.08 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`reveal-block${visible ? ' is-visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export function AnimatedStat({ value, label, suffix = '', decimals = 0 }: { value: number; label: string; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let animation = 0;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setDisplay(value);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const start = performance.now();
      const tick = (time: number) => {
        const progress = Math.min((time - start) / 1400, 1);
        setDisplay(value * (1 - Math.pow(1 - progress, 3)));
        if (progress < 1) animation = window.requestAnimationFrame(tick);
      };
      animation = window.requestAnimationFrame(tick);
      observer.disconnect();
    }, { rootMargin: '0px 0px -40px' });
    observer.observe(node);
    return () => {
      observer.disconnect();
      if (animation) window.cancelAnimationFrame(animation);
    };
  }, [value]);

  return (
    <div className="reference-stat" ref={ref}>
      <strong>{display.toFixed(decimals)}{suffix}</strong>
      <span>{label}</span>
    </div>
  );
}

export function ProgressMeter({ value }: { value: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.35 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="project-progress" ref={ref}>
      <div><span>Progress</span><span>{value}%</span></div>
      <div className="progress-track"><i style={{ width: visible ? `${value}%` : 0 }} /></div>
    </div>
  );
}

const labPanels = [
  {
    href: '/labs/power-systems',
    image: '/power-lab-hero.jpg',
    eyebrow: 'Lab 01',
    title: 'AI in Power Systems Lab',
    description: 'Artificial intelligence for renewable forecasting, smart-grid optimization and reliable power-system operation.',
    tags: ['Renewable energy', 'Smart grids', 'AI forecasting', 'Deep learning'],
    accent: 'power',
    icon: Zap,
  },
  {
    href: '/labs/quantum-cyber',
    image: '/quantum-lab-hero.jpg',
    eyebrow: 'Lab 02',
    title: 'Quantum Cyber Intelligence Lab',
    description: 'Quantum machine learning, post-quantum security and intelligent threat detection for critical systems.',
    tags: ['Quantum computing', 'Quantum ML', 'Cybersecurity', 'QNNs'],
    accent: 'quantum',
    icon: Atom,
  },
] as const;

export function DualLabHero() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="reference-hero" id="top" aria-label="Research laboratories">
      {labPanels.map((lab, index) => {
        const Icon = lab.icon;
        return (
          <a
            className={`reference-hero-panel ${lab.accent}${hovered !== null && hovered !== index ? ' is-dimmed' : ''}`}
            href={lab.href}
            key={lab.href}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(index)}
            onBlur={() => setHovered(null)}
          >
            <img src={lab.image} alt="" aria-hidden="true" />
            <span className="hero-image-shade" />
            <div className="reference-hero-copy">
              <span className="reference-hero-label"><Icon size={14} /> {lab.eyebrow}</span>
              <h1>{lab.title}</h1>
              <p>{lab.description}</p>
              <div className="hero-tags">{lab.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <span className="hero-explore">Explore {index === 0 ? 'AI in Power Systems' : 'Quantum Cyber Intelligence'} <ArrowRight size={16} /></span>
            </div>
          </a>
        );
      })}
      <div className="hero-founder" aria-hidden="true">
        <div><img src="/omer-faruque-portrait.jpg" alt="" /></div>
        <strong>Md. Omer Faruque</strong>
        <span>Founder & supervisor</span>
      </div>
      <p className="hero-manifesto">Research · Intelligence · Energy · Quantum</p>
    </section>
  );
}
