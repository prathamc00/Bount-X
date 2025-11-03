import React from 'react';

interface HeroSectionProps {
  onApplyClick: () => void;
}

const ZetpeakBackedLogo: React.FC = () => {
    return (
        <div 
            className="inline-block p-px rounded-xl bg-gradient-to-b from-white/30 via-white/10 to-fuchsia-400/20 shadow-lg mb-4 animate-fade-in-up"
            style={{ animationDelay: '100ms' }}
        >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-[11px] bg-neutral-950/70 backdrop-blur-md">
                <span className="text-sm font-medium text-neutral-200">Backed By</span>
                <div className="flex items-center gap-2">
                    <div className="w-[22px] h-[22px] bg-black/30 rounded-md flex items-center justify-center ring-1 ring-inset ring-white/10">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 4H13L3 12H13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <span className="font-bold text-base text-white">Zetpeak</span>
                </div>
            </div>
        </div>
    );
};

const HeroSection: React.FC<HeroSectionProps> = ({ onApplyClick }) => {

  return (
    <section id="home" className="relative h-screen flex items-center overflow-hidden">
      {/* The canvas background was removed to allow the global starfield from App.tsx to show through, creating a continuous background effect. */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl text-left">
            <ZetpeakBackedLogo />
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white tracking-tight animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <span className="inline-block animate-subtle-glitch">
                The Real Home for Hackers:
                <br />
                <span className="bg-gradient-to-r from-fuchsia-500 to-blue-500 bg-clip-text text-transparent">Built by Bangalore Teens.</span>
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