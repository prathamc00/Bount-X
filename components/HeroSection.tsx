import React from 'react';

interface HeroSectionProps {
  onApplyClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onApplyClick }) => {
  return (
    <section id="home" className="relative h-screen flex items-center overflow-hidden hero-bg bg-slate-950">
      {/* Concentric circles background effect */}
      <div className="absolute top-1/2 right-0 w-[120vw] h-[120vw] sm:w-[90vw] sm:h-[90vw] lg:w-[60vw] lg:h-[60vw] transform-gpu -translate-y-1/2 translate-x-1/2 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 rounded-full bg-fuchsia-900/20" />
        <div className="absolute inset-[10%] rounded-full bg-fuchsia-800/20" />
        <div className="absolute inset-[20%] rounded-full bg-fuchsia-700/20" />
        <div className="absolute inset-[30%] rounded-full bg-fuchsia-600/20" />
        <div className="absolute inset-[40%] rounded-full bg-slate-950" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl text-left">
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Forge & Build<br />
              The Digital Frontier.
            </h1>
            <p className="mt-6 text-lg text-slate-300 max-w-lg animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              Bount-X is a high-velocity network for Hackers, Designers, and Developers united to build the future.
            </p>
            <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                <button
                  onClick={onApplyClick}
                  className="px-8 py-3 font-semibold text-slate-950 bg-white rounded-full shadow-lg hover:bg-slate-200 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  Join as Member
                </button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;