import React, { useEffect, useRef } from 'react';

// Make Typed.js available from the global scope
declare const Typed: any;

interface HeroSectionProps {
  onApplyClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onApplyClick }) => {
  const typedEl = useRef(null);
  const circlesRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (circlesRef.current) {
        // Base transform is translateX(50%) translateY(-50%)
        // We add scroll-based translateY and rotate to create a parallax effect
        circlesRef.current.style.transform = `translateX(50%) translateY(calc(-50% + ${scrollY * 0.2}px)) rotate(${scrollY * 0.05}deg)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <section id="home" className="relative h-screen flex items-center overflow-hidden hero-bg">
      {/* Concentric circles background effect */}
      <div ref={circlesRef} className="absolute top-1/2 right-0 w-[120vw] h-[120vw] sm:w-[90vw] sm:h-[90vw] lg:w-[60vw] lg:h-[60vw] transform-gpu pointer-events-none" style={{ transform: 'translateX(50%) translateY(-50%)' }} aria-hidden="true">
        <div className="absolute inset-0 rounded-full bg-fuchsia-200/20 dark:bg-fuchsia-900/20" />
        <div className="absolute inset-[10%] rounded-full bg-fuchsia-300/20 dark:bg-fuchsia-800/20" />
        <div className="absolute inset-[20%] rounded-full bg-fuchsia-400/20 dark:bg-fuchsia-700/20" />
        <div className="absolute inset-[30%] rounded-full bg-fuchsia-500/20 dark:bg-fuchsia-600/20" />
        <div className="absolute inset-[40%] rounded-full bg-slate-50 dark:bg-slate-950" />
      </div>

      {/* Wavy background animation */}
      <div className="absolute bottom-0 left-0 right-0 w-full h-1/2 pointer-events-none overflow-hidden" aria-hidden="true">
        <svg className="absolute bottom-0 left-0 w-[200%] h-auto text-fuchsia-500 opacity-20 dark:opacity-20 animate-wave-1" style={{ animationDelay: '-2s' }} xmlns="http://www.w.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="currentColor" fillOpacity="1" d="M0,192L48,176C96,160,192,128,288,133.3C384,139,480,181,576,186.7C672,192,768,160,864,138.7C960,117,1056,107,1152,117.3C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
        <svg className="absolute bottom-0 left-0 w-[200%] h-auto text-blue-500 opacity-20 dark:opacity-20 animate-wave-2" style={{ animationDelay: '-4s' }} xmlns="http://www.w.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="currentColor" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,176C384,192,480,192,576,170.7C672,149,768,107,864,112C960,117,1056,171,1152,181.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
        <svg className="absolute bottom-0 left-0 w-[200%] h-auto text-fuchsia-500 opacity-10 dark:opacity-10 animate-wave-3" style={{ animationDelay: '-6s' }} xmlns="http://www.w.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="currentColor" fillOpacity="1" d="M0,256L48,256C96,256,192,256,288,229.3C384,203,480,149,576,149.3C672,149,768,203,864,218.7C960,235,1056,213,1152,186.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
      
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