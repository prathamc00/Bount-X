
import React from 'react';
import { pastHackathonProjects, upcomingHackathon } from '../data/mockData';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const HackathonsSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <section id="hackathons" className="py-20 sm:py-28 bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-12 ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
          <h2 className="text-4xl md:text-5xl font-bold font-mono text-white tracking-tight">
            <span className="text-fuchsia-400">&gt;</span> Regular Hackathons
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">Where code meets chaos. Test your skills, forge alliances, and build the impossible under pressure.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Upcoming Hackathon */}
          {upcomingHackathon ? (
            <div id={upcomingHackathon.id} className={`lg:col-span-2 bordered-card border-fuchsia-500/50 rounded-xl p-6 flex flex-col glow-shadow ${isVisible ? 'fade-in visible' : 'fade-in'}`} style={{ transitionDelay: '200ms' }}>
              <h3 className="text-2xl font-bold text-fuchsia-400 mb-2">{upcomingHackathon.title}</h3>
              <p className="text-sm font-semibold text-white bg-fuchsia-500/20 px-3 py-1 rounded-full self-start mb-4">{upcomingHackathon.theme}</p>
              <div className="text-slate-300 space-y-3 mb-6 flex-grow">
                <p><span className="font-bold">Timeline:</span> {formatDate(upcomingHackathon.startDate)} - {formatDate(upcomingHackathon.endDate)}</p>
                <div>
                  <p className="font-bold mb-1">Prizes:</p>
                  <ul className="list-disc list-inside text-sm pl-2 space-y-1">
                    {upcomingHackathon.prizes.map((prize, i) => <li key={i}>{prize}</li>)}
                  </ul>
                </div>
              </div>
              <a href={upcomingHackathon.registrationUrl} className="group relative w-full inline-flex items-center justify-center px-6 py-3 text-lg font-bold text-white btn-gradient rounded-md overflow-hidden transition-all duration-300 hover:shadow-[0_0_25px_rgba(217,70,239,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fuchsia-400 focus-visible:ring-offset-slate-800">
                Compete Now
              </a>
            </div>
          ) : (
            <div className={`lg:col-span-2 bordered-card rounded-xl p-6 flex flex-col items-center justify-center text-center glow-shadow ${isVisible ? 'fade-in visible' : 'fade-in'}`} style={{ transitionDelay: '200ms' }}>
              <h3 className="text-2xl font-bold text-white">No Upcoming Hackathons</h3>
              <p className="mt-2 text-slate-400">Details for the next event will be announced soon. Stay tuned!</p>
            </div>
          )}

          {/* Past Winners */}
          {pastHackathonProjects.length > 0 && (
            <div className={`lg:col-span-3 space-y-4 ${isVisible ? 'fade-in visible' : 'fade-in'}`} style={{ transitionDelay: '400ms' }}>
              <h3 className="text-2xl font-bold font-mono text-white mb-2">Past Winners // Archive_</h3>
              {pastHackathonProjects.slice(0, 3).map((project) => (
                <div key={project.id} id={project.id} className="bordered-card rounded-lg p-4 group transition-colors duration-300">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-white text-lg">{project.name}</h4>
                      <p className="text-xs text-slate-400">{project.team.join(', ')}</p>
                    </div>
                    {project.prize && <span className="text-xs font-bold text-fuchsia-400 border border-fuchsia-400/50 px-2 py-0.5 rounded-sm">{project.prize}</span>}
                  </div>
                  <p className="text-sm text-slate-300 mt-2">{project.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HackathonsSection;
