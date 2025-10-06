import React from 'react';
import { ArrowRightIcon } from './Icons';

interface HeroSectionProps {
  onApplyClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onApplyClick }) => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/50 z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-transparent to-slate-900 z-10"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-4 tracking-tighter animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          Architects of the<br />
          <span className="text-violet-400">Next Digital Frontier</span>.
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-300 mb-8 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          Bount-X is an exclusive collective for top hackers, designers, and developers, united to build the future.
        </p>
        <div className="animate-fade-in-up" style={{ animationDelay: '600ms' }}>
          <button
            onClick={onApplyClick}
            className="btn-primary group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-slate-800 border-2 border-violet-400 rounded-md overflow-hidden transition-all duration-300 hover:shadow-[0_0_25px_rgba(192,132,252,0.5)]"
          >
            <span className="btn-shine absolute top-0 left-0 w-full h-full"></span>
            <span className="relative flex items-center">
              Join as a Member
              <ArrowRightIcon className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;