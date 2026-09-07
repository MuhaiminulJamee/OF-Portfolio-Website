'use client';

import { useMemo, useState } from 'react';
import { ArrowUpRight, Search } from 'lucide-react';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { publications } from '@/lib/content';

export function PublicationBrowser() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('All');
  const [year, setYear] = useState('All');
  const [area, setArea] = useState('All');
  const [authorship, setAuthorship] = useState('All');
  const areas = [...new Set(publications.map((item) => item.area))].sort();
  const years = [...new Set(publications.map((item) => item.year))].sort((a, b) => b - a);

  const filtered = useMemo(() => publications.filter((item) => {
    const text = `${item.title} ${item.authors} ${item.venue} ${item.area}`.toLowerCase();
    const isFirst = item.authors.startsWith('M. O. Faruque');
    return text.includes(query.toLowerCase())
      && (type === 'All' || item.type === type)
      && (year === 'All' || item.year === Number(year))
      && (area === 'All' || item.area === area)
      && (authorship === 'All' || (authorship === 'First author' ? isFirst : !isFirst));
  }), [query, type, year, area, authorship]);

  return (
    <div className="publication-browser">
      <div className="filter-bar">
        <label className="search-field"><span>Search</span><div><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Title, author, journal or topic" /></div></label>
        <label><span>Type</span><NativeSelect value={type} onChange={(event) => setType(event.target.value)}><NativeSelectOption>All</NativeSelectOption><NativeSelectOption>Journal</NativeSelectOption><NativeSelectOption>Conference</NativeSelectOption></NativeSelect></label>
        <label><span>Year</span><NativeSelect value={year} onChange={(event) => setYear(event.target.value)}><NativeSelectOption>All</NativeSelectOption>{years.map((value) => <NativeSelectOption key={value}>{value}</NativeSelectOption>)}</NativeSelect></label>
        <label><span>Research area</span><NativeSelect value={area} onChange={(event) => setArea(event.target.value)}><NativeSelectOption>All</NativeSelectOption>{areas.map((value) => <NativeSelectOption key={value}>{value}</NativeSelectOption>)}</NativeSelect></label>
        <label><span>Authorship</span><NativeSelect value={authorship} onChange={(event) => setAuthorship(event.target.value)}><NativeSelectOption>All</NativeSelectOption><NativeSelectOption>First author</NativeSelectOption><NativeSelectOption>Co-author</NativeSelectOption></NativeSelect></label>
      </div>
      <div className="result-count"><span>{String(filtered.length).padStart(2, '0')}</span> publications</div>
      <div className="publication-results">
        {filtered.map((item, index) => (
          <article key={item.doi}>
            <div className="pub-index">{String(index + 1).padStart(2, '0')}</div>
            <div><span>{item.type} · {item.area}</span><h2>{item.title}</h2><p>{item.authors}</p><small>{item.venue}</small></div>
            <div className="publication-side"><strong>{item.year}</strong><div>{item.metric ? <span>{item.metric}</span> : null}{item.quartile ? <span>{item.quartile}</span> : null}</div><a href={item.doi} target="_blank" rel="noreferrer">DOI <ArrowUpRight size={16} /></a></div>
          </article>
        ))}
        {filtered.length === 0 ? <div className="empty-result"><h2>No publications match these filters.</h2><button type="button" onClick={() => { setQuery(''); setType('All'); setYear('All'); setArea('All'); setAuthorship('All'); }}>Clear filters</button></div> : null}
      </div>
    </div>
  );
}
