import React from 'react';
import { MeetupEvent } from '../types';
import { meetupEvents } from '../data/mockData';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const MeetupCard: React.FC<{ event: MeetupEvent, index: number }> = ({ event, index }) => {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  return (
    <div
      ref={ref}
      className={`bg-slate-800/50 border border-slate-700 rounded-lg p-6 flex flex-col transition-all duration-300 glow-shadow ${isVisible ? 'fade-in visible' : 'fade-in'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-white">{event.title}</h3>
          <span className="text-xs font-mono bg-violet-400/10 text-violet-400 px-2 py-1 rounded">{event.topic}</span>
        </div>
        <div className="text-sm text-slate-400 space-y-2 mb-4">
          <p><span className="font-semibold text-slate-300">Date:</span> {formatDate(event.date)}</p>
          <p><span className="font-semibold text-slate-300">Location:</span> {event.location}</p>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {event.tags.map(tag => (
            <span key={tag} className="text-xs font-medium bg-slate-700 text-slate-300 px-2 py-1 rounded-full">{tag}</span>
          ))}
        </div>
      </div>
      <a href={event.rsvpUrl} target="_blank" rel="noopener noreferrer" className="mt-auto block w-full text-center px-4 py-2 bg-slate-700 text-white font-semibold rounded-md hover:bg-violet-500 hover:text-slate-900 transition-colors duration-300">
        RSVP / Details
      </a>
    </div>
  );
};

const MeetupsSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="meetups" className="py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-12 ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Offline Meetups</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">Forge authentic connections. Discuss disruptive ideas. Build the future, together.</p>
        </div>
        
        {meetupEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {meetupEvents.map((event, index) => (
              <MeetupCard key={event.id} event={event} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center bg-slate-800/50 border border-slate-700 rounded-lg p-12">
            <h3 className="text-2xl font-bold text-white">No Upcoming Meetups</h3>
            <p className="mt-2 text-slate-400">New events are being planned. Check back soon for updates.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MeetupsSection;