
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { SearchResult } from '../types';
import { meetupEvents, pastHackathonProjects, upcomingHackathon, buildProjects } from '../data/mockData';
import { SearchIcon, XIcon } from './Icons';

interface SearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const allSearchableItems: SearchResult[] = [
  ...meetupEvents.map(item => ({
    id: item.id,
    title: item.title,
    category: 'Meetup' as const,
    url: `#${item.id}`,
    context: item.tags.join(', '),
  })),
  ...pastHackathonProjects.map(item => ({
    id: item.id,
    title: item.name,
    category: 'Hackathon' as const,
    url: `#${item.id}`,
    context: item.description,
  })),
  ...(upcomingHackathon ? [{
    id: upcomingHackathon.id,
    title: upcomingHackathon.title,
    category: 'Hackathon' as const,
    url: `#${upcomingHackathon.id}`,
    context: upcomingHackathon.theme,
  }] : []),
  ...buildProjects.map(item => ({
    id: item.id,
    title: item.name,
    category: 'Project' as const,
    url: '#build-to-hack', // Section link as carousel state is local
    context: item.description,
  })),
];

const Search: React.FC<SearchProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
      setQuery(''); // Reset query on close
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length > 1) {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = allSearchableItems.filter(item =>
        item.title.toLowerCase().includes(lowerCaseQuery) ||
        item.context.toLowerCase().includes(lowerCaseQuery)
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  const groupedResults = useMemo(() => {
    return results.reduce((acc, result) => {
      (acc[result.category] = acc[result.category] || []).push(result);
      return acc;
    }, {} as Record<string, SearchResult[]>);
  }, [results]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);
  
  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={i} className="text-fuchsia-400 bg-fuchsia-500/10 rounded-sm px-0.5">{part}</span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex justify-center p-4 animate-fade-in-up duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-heading"
    >
      <div
        ref={modalRef}
        className="w-full max-w-2xl bg-slate-900 rounded-xl bordered-card flex flex-col max-h-[80vh] h-full"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b border-slate-800 flex items-center">
          <label htmlFor="search-input" className="sr-only">Search</label>
          <SearchIcon className="w-5 h-5 text-slate-400 mr-3"/>
          <input
            id="search-input"
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search meetups, hackathons, projects..."
            className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none"
            autoComplete="off"
          />
          <button onClick={onClose} className="text-slate-400 hover:text-fuchsia-400 transition-colors ml-3 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400">
            <span className="sr-only">Close search</span>
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="overflow-y-auto flex-grow p-4">
          {query.trim().length > 1 ? (
            results.length > 0 ? (
              <div className="space-y-6">
                {Object.entries(groupedResults).map(([category, items]) => (
                  <div key={category}>
                    <h2 id={`${category}-heading`} className="text-xs font-bold font-mono text-fuchsia-400 uppercase tracking-wider mb-2">{category}</h2>
                    <ul className="space-y-2" aria-labelledby={`${category}-heading`}>
                      {items.map(item => (
                        <li key={item.id}>
                          <a href={item.url} onClick={onClose} className="block p-3 rounded-lg hover:bg-slate-800/50 focus:bg-slate-800/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 transition-colors">
                            <h3 className="font-semibold text-white">{highlightMatch(item.title, query)}</h3>
                            <p className="text-sm text-slate-400 truncate">{highlightMatch(item.context, query)}</p>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-white font-semibold">No results found for "{query}"</p>
                <p className="text-slate-400 text-sm mt-1">Try searching for something else.</p>
              </div>
            )
          ) : (
            <div className="text-center py-10">
              <p className="text-slate-400">Start typing to search the Bount-X network.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
