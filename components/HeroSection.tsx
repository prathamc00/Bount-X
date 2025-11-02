import React from 'react';
import ZetpeakLogo from './ZetpeakLogo';

interface HeroSectionProps {
  onApplyClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onApplyClick }) => {

  return (
    <section id="home" className="relative h-screen flex items-center overflow-hidden">
      {/* The canvas background was removed to allow the global starfield from App.tsx to show through, creating a continuous background effect. */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-sm font-medium border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 rounded-full animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <ZetpeakLogo className="w-5 h-5" />
              <span className="text-slate-600 dark:text-slate-300">Backed by</span>
              <span className="font-bold text-fuchsia-600 dark:text-fuchsia-400">Zetpeak</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white tracking-tight animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <span className="inline-block animate-subtle-glitch">
                The Real Home for Hackers:
              </span>
              <br />
              <span className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-fuchsia-500 to-blue-500 bg-clip-text text-transparent animate-subtle-glitch">
                Built by Bangalore Teens.
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-700 dark:text-slate-300 max-w-xl animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              We're not waiting for permission. We are the Teen Hackers, Developers, and Designers building the future of open-source, right here in the city.
            </p>
            <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <div className="relative inline-block group">
                <button
                  onClick={onApplyClick}
                  className="px-8 py-3 font-semibold text-white dark:text-slate-950 bg-slate-900 dark:bg-white rounded-full shadow-lg hover:bg-slate-700 dark:hover:bg-slate-200 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 dark:focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950"
                >
                  Join as Member
                </button>
                <div 
                  role="tooltip" 
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-1.5 text-xs font-semibold text-white bg-slate-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                >
                  Begin your application now!
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
