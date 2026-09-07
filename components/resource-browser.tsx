'use client';

import { useMemo, useState } from 'react';
import { ArrowDownToLine, ArrowUpRight, Search } from 'lucide-react';
import { resources } from '@/lib/content';

const filters = ['All', 'Python', 'Machine Learning', 'Deep Learning', 'Power Systems', 'Quantum Computing', 'Cybersecurity', 'Research Methods'];

export function ResourceBrowser() {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const items = useMemo(() => resources.filter((item) => {
    const haystack = `${item.title} ${item.category} ${item.tech} ${item.description}`.toLowerCase();
    const matchesFilter = filter === 'All' || haystack.includes(filter.toLowerCase()) || (filter === 'Machine Learning' && haystack.includes('scikit'));
    return matchesFilter && haystack.includes(query.toLowerCase());
  }), [filter, query]);

  return (
    <div className="resource-browser">
      <div className="resource-controls">
        <div className="filter-pills" aria-label="Resource filters">{filters.map((item) => <button type="button" aria-pressed={filter === item} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div>
        <label className="resource-search"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search resources" /></label>
      </div>
      <div className="resource-catalog">
        {items.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, '0')} / {item.kind}</span><div><small>{item.category}</small><h2>{item.title}</h2><p>{item.description}</p><em>{item.tech}</em></div><a href="/contact">Request file <ArrowDownToLine size={16} /></a></article>)}
      </div>
      <div className="source-documents">
        <div><span className="kicker">Source documents</span><h2>Lab documents</h2><p>The original CV and research-guideline documents supplied for this website remain available here.</p></div>
        <a href="https://drive.google.com/file/d/1bblj6mne7hTDMwwGFjy3lwtK7Q-ezVsB/view" target="_blank" rel="noreferrer">Research guidelines <ArrowUpRight size={17} /></a>
        <a href="https://drive.google.com/file/d/1Sl3V8dpNnozAG4whzRDWzbhrW_N5uhZK/view" target="_blank" rel="noreferrer">Curriculum vitae <ArrowUpRight size={17} /></a>
      </div>
    </div>
  );
}
