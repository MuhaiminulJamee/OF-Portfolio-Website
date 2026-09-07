'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';

const nav = [
  ['Labs', '/#labs'],
  ['Research', '/research'],
  ['Courses', '/courses'],
  ['Resources', '/resources'],
  ['Insights', '/insights'],
  ['Consulting', '/consulting'],
  ['About', '/about'],
];

export function SiteHeader() {
  const [light, setLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem('rb-theme');
    if (saved === 'light') setLight(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('light', light);
    window.localStorage.setItem('rb-theme', light ? 'light' : 'dark');
  }, [light]);

  return (
    <>
      <header className="site-header">
        <a className="brand" href="/" aria-label="ResearchBuddy AI home">
          <span className="brand-mark">RB</span>
          <span>
            <strong>ResearchBuddy AI</strong>
            <small>Independent research ecosystem</small>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
        </nav>
        <div className="header-actions">
          <button className="icon-button" type="button" aria-label={light ? 'Use dark theme' : 'Use light theme'} onClick={() => setLight((value) => !value)}>
            {light ? <Moon size={17} /> : <Sun size={17} />}
          </button>
          <a className="header-cta" href="/contact">Work with us <ArrowUpRight size={15} /></a>
          <button className="menu-button" type="button" aria-label="Open navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}><Menu size={20} /></button>
        </div>
      </header>
      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation">
          <button type="button" aria-label="Close navigation" onClick={() => setMenuOpen(false)}><X size={22} /></button>
          <nav>
            {nav.map(([label, href], index) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span>{label}</a>
            ))}
            <a href="/contact" onClick={() => setMenuOpen(false)}><span>08</span>Contact</a>
          </nav>
        </div>
      )}
    </>
  );
}
