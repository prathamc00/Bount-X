import React, { useEffect, useRef } from 'react';

// Make Typed.js available from the global scope
declare const Typed: any;

interface HeroSectionProps {
  onApplyClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onApplyClick }) => {
  const typedEl = useRef(null);

  useEffect(() => {
    if (typeof Typed === 'undefined' || !typedEl.current) {
      return;
    }

    const typed = new Typed(typedEl.current, {
      strings: [
        'Bount-X is a high-velocity network for <strong>Hackers</strong>...',
        'Bount-X is a high-velocity network for <strong>Designers</strong>...',
        'Bount-X is a high-velocity network for <strong>Developers</strong> united to build the future.'
      ],
      typeSpeed: 40,
      backSpeed: 20,
      backDelay: 1200,
      startDelay: 600,
      smartBackspace: true,
      loop: false,
      showCursor: true,
      cursorChar: '_',
    });

    return () => {
      typed.destroy();
    };
  }, []);


  return (
    <section id="home" className="relative h-screen flex items-center overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl text-left">
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white tracking-tight animate-fade-in-up animate-subtle-glitch" style={{ animationDelay: '200ms' }}>
              Forge & Build<br />
              The Digital Frontier.
            </h1>
            <p className="mt-6 text-lg text-slate-700 dark:text-slate-300 max-w-lg hero-text-animation min-h-[6rem] sm:min-h-[4rem]">
              <span ref={typedEl}></span>
            </p>
            <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
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