import React, { useState, useRef, useCallback, memo } from 'react';
import { MeetupEvent } from '../types';
import { meetupEvents } from '../data/mockData';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const MeetupCard: React.FC<{ event: MeetupEvent, index: number }> = memo(({ event, index }) => {
  const [cardRef, isVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const innerCardRef = useRef<HTMLDivElement>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!innerCardRef.current) return;
    const rect = innerCardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const rotateY = 10 * ((mouseX - width / 2) / (width / 2));
    const rotateX = -10 * ((mouseY - height / 2) / (height / 2));
    setRotate({ x: rotateY, y: rotateX });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setRotate({ x: 0, y: 0 });
  }, []);

  return (
    <div
      id={event.id}
      ref={cardRef}
      className={`transition-all duration-300 ${isVisible ? 'fade-in visible' : 'fade-in'}`}
      style={{ transitionDelay: `${index * 100}ms`, perspective: '1000px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={innerCardRef}
        className="bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 hover:border-fuchsia-500 rounded-xl p-6 flex flex-col h-full transition-colors"
        style={{ transform: `rotateX(${rotate.y}deg) rotateY(${rotate.x}deg) scale(1.02)`, transition: 'transform 0.2s' }}
      >
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{event.title}</h3>
            <span className="text-xs font-mono bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 px-2 py-1 rounded whitespace-nowrap">{event.topic}</span>
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400 space-y-2 mb-4">
            <p><span className="font-semibold text-slate-700 dark:text-slate-300">Date:</span> {formatDate(event.date)}</p>
            <p><span className="font-semibold text-slate-700 dark:text-slate-300">Location:</span> {event.location}</p>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {event.tags.map(tag => (
              <span key={tag} className="text-xs font-medium bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-full">{tag}</span>
            ))}
          </div>
        </div>
        <a href={event.rsvpUrl} target="_blank" rel="noopener noreferrer" className="mt-auto block w-full text-center px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-semibold rounded-md hover:bg-fuchsia-600 hover:text-white transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fuchsia-500 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-800">
          RSVP / Details
        </a>
      </div>
    </div>
  );
});

const MeetupsSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="meetups" className="py-20 sm:py-28 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-12 ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
          <h2 className="text-4xl md:text-5xl font-bold font-mono text-slate-900 dark:text-white tracking-tight">Offline Meetups</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">Forge authentic connections. Discuss disruptive ideas. Build the future, together.</p>
        </div>
        
        {meetupEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {meetupEvents.map((event, index) => (
              <MeetupCard key={event.id} event={event} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl p-12">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">No Upcoming Meetups</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">New events are being planned. Check back soon for updates.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MeetupsSection;