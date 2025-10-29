import React, { useState, useEffect, useCallback } from 'react';
import { buildProjects } from '../data/mockData';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import BuildProjectCard from './BuildProjectCard';

interface BuildToHackSectionProps {
  onApplyClick: () => void;
}

const BuildToHackSection: React.FC<BuildToHackSectionProps> = ({ onApplyClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });
  const [liveRegionText, setLiveRegionText] = useState('');

  const changeSlide = useCallback((newIndex: number) => {
    if (buildProjects.length === 0) return;
    setCurrentIndex(newIndex);
    const newProject = buildProjects[newIndex];
    if (newProject) {
        setLiveRegionText(`Showing project ${newIndex + 1}: ${newProject.name}`);
    }
  }, []);

  const nextSlide = useCallback(() => {
    if (buildProjects.length === 0) return;
    const newIndex = (currentIndex + 1) % buildProjects.length;
    changeSlide(newIndex);
  }, [currentIndex, changeSlide]);
  
  const prevSlide = () => {
    if (buildProjects.length === 0) return;
    const newIndex = (currentIndex - 1 + buildProjects.length) % buildProjects.length;
    changeSlide(newIndex);
  };

  return (
    <section id="build-to-hack" className="py-20 sm:py-28 relative scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-12 ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
          <h2 className="text-4xl md:text-5xl font-bold font-mono text-slate-900 dark:text-white tracking-tight">Build to Hack Program</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">From idea to impact. Leverage community support, resources, and accountability to build your own product.</p>
        </div>
        
        {buildProjects.length > 0 ? (
          <div 
            className={`relative h-[600px] w-full max-w-5xl mx-auto rounded-xl overflow-hidden bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 shadow-lg dark:shadow-2xl transition-shadow dark:hover:shadow-[0_0_25px_rgba(217,70,239,0.1)] ${isVisible ? 'fade-in visible' : 'fade-in'}`} 
            style={{ transitionDelay: '200ms' }}
            aria-roledescription="carousel"
            >
            {buildProjects.map((project, index) => (
              <div
                key={project.id}
                role="group"
                aria-label={`Project ${index + 1} of ${buildProjects.length}`}
                className="w-full h-full"
              >
                <BuildProjectCard project={project} isActive={index === currentIndex} />
              </div>
            ))}
            
            {buildProjects.length > 1 && (
              <>
                <button onClick={prevSlide} className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fuchsia-500 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950" aria-label="Previous project">
                  <ChevronLeftIcon className="w-6 h-6" />
                </button>
                <button onClick={nextSlide} className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fuchsia-500 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950" aria-label="Next project">
                  <ChevronRightIcon className="w-6 h-6" />
                </button>
              </>
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
              {buildProjects.map((project, index) => (
                <button key={index} onClick={() => changeSlide(index)} className={`w-2.5 h-2.5 rounded-full ${index === currentIndex ? 'bg-fuchsia-500' : 'bg-slate-400 dark:bg-slate-600 hover:bg-slate-500'} transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fuchsia-500 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950`} aria-label={`Go to project ${index + 1}: ${project.name}`}></button>
              ))}
            </div>
            <div className="sr-only" aria-live="polite" aria-atomic="true">
                {liveRegionText}
            </div>
          </div>
        ) : (
          <div className={`relative h-[400px] w-full max-w-5xl mx-auto rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-center p-8 ${isVisible ? 'fade-in visible' : 'fade-in'}`} style={{ transitionDelay: '200ms' }}>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">No Projects to Showcase Yet</h3>
            <p className="mt-2 max-w-md text-slate-600 dark:text-slate-400">Our members are busy building the future. The first cohort of projects from the 'Build to Hack' program will be featured here soon.</p>
          </div>
        )}

         <div className="text-center mt-12">
            <button onClick={onApplyClick} className="group relative inline-flex items-center justify-center px-8 py-3 text-base font-bold text-fuchsia-600 dark:text-fuchsia-400 bg-transparent border-2 border-slate-400 dark:border-slate-600 rounded-md overflow-hidden transition-all duration-300 hover:border-fuchsia-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fuchsia-500 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950">
                <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-fuchsia-500/20 group-hover:w-full group-hover:h-full"></span>
                <span className="relative">Apply to Program</span>
            </button>
        </div>
      </div>
    </section>
  );
};

export default BuildToHackSection;