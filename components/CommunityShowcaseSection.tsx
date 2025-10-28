import React, { useState } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { ArrowRightIcon } from './Icons';

const CommunityShowcaseSection: React.FC = () => {
    const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });
    const [showOptions, setShowOptions] = useState(false);

    const navOptions = [
      { label: 'Meetups', href: '#meetups' },
      { label: 'Hackathons', href: '#hackathons' },
      { label: 'Build to Hack', href: '#build-to-hack' },
    ];

    return (
        <section ref={ref} className="relative py-20 sm:py-28 overflow-hidden bg-slate-950">
            {/* Starfield Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[3000px] opacity-30 stars-sm animate-move-stars-slow" />
                <div className="absolute top-0 left-0 w-full h-[3000px] opacity-50 stars-md animate-move-stars-medium" />
                <div className="absolute top-0 left-0 w-full h-[3000px] opacity-70 stars-lg animate-move-stars-fast" />
            </div>

            <div className="absolute inset-0 z-0 flex items-center justify-center">
                <div className="absolute w-[1000px] h-[1000px] bg-[radial-gradient(circle_at_center,_rgba(217,70,239,0.15),_rgba(217,70,239,0)_60%)]"></div>
            </div>

            <div className={`container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-700 ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
                <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center min-h-[300px]">
                    
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-bold font-mono text-white tracking-tight animate-subtle-glitch">
                            A Network of{' '}
                            <div className="relative inline-block">
                                <button 
                                    onClick={() => setShowOptions(!showOptions)} 
                                    className="text-fuchsia-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 rounded-md px-1"
                                    aria-expanded={showOptions}
                                    aria-controls="innovators-options"
                                >
                                    Innovators
                                </button>
                                {showOptions && (
                                    <div 
                                        id="innovators-options"
                                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 bg-slate-900 border border-slate-700 rounded-lg shadow-lg p-2 z-20 animate-fade-in-up"
                                        style={{ animationDuration: '0.3s' }}
                                    >
                                        <ul className="space-y-1">
                                            {navOptions.map(option => (
                                                <li key={option.label}>
                                                    <a 
                                                        href={option.href}
                                                        onClick={() => setShowOptions(false)}
                                                        className="flex justify-between items-center w-full px-4 py-2 text-left text-slate-300 hover:bg-slate-800 hover:text-fuchsia-400 rounded-md transition-colors"
                                                    >
                                                        <span>{option.label}</span>
                                                        <ArrowRightIcon className="w-4 h-4" />
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </h2>
                        <p className="mt-4 max-w-xl mx-auto text-lg text-slate-400">
                           United by a passion for technology, our members are the architects of tomorrow.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CommunityShowcaseSection;