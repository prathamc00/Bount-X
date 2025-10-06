import React, { useState, useEffect, useCallback } from 'react';
import { BuildProject } from '../types';
import { buildProjects } from '../data/mockData';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

interface BuildToHackSectionProps {
  onApplyClick: () => void;
}

const BuildProjectCard: React.FC<{ project: BuildProject; isActive: boolean }> = ({ project, isActive }) => {
  return (
    <div className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${isActive ? 'opacity-100' : 'opacity-0'}`}>
      <img src={project.imageUrl} alt={project.name} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-8 text-white">
        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-2 ${
          project.status === 'Launched' ? 'bg-green-500/20 text-green-300' : 
          project.status === 'Funded' ? 'bg-yellow-500/20 text-yellow-300' : 
          'bg-blue-500/20 text-blue-300'
        }`}>
          {project.status}
        </span>
        <h3 className="text-3xl font-bold">{project.name}</h3>
        <p className="text-slate-300">by {project.creator}</p>
        <p className="mt-2 max-w-lg text-slate-300">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.techStack.map(tech => <span key={tech} className="text-xs font-mono bg-slate-700 text-slate-200 px-2 py-1 rounded">{tech}</span>)}
        </div>
      </div>
    </div>
  );
};


const BuildToHackSection: React.FC<BuildToHackSectionProps> = ({ onApplyClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

  const nextSlide = useCallback(() => {
    if (buildProjects.length === 0) return;
    setCurrentIndex(prevIndex => (prevIndex + 1) % buildProjects.length);
  }, []);
  
  const prevSlide = () => {
    if (buildProjects.length === 0) return;
    setCurrentIndex(prevIndex => (prevIndex - 1 + buildProjects.length) % buildProjects.length);
  };

  useEffect(() => {
    if (buildProjects.length > 1) {
      const slideInterval = setInterval(nextSlide, 5000);
      return () => clearInterval(slideInterval);
    }
  }, [nextSlide]);

  return (
    <section id="build-to-hack" className="py-20 sm:py-28 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-12 ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Build to Hack Program</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">From idea to impact. Leverage community support, resources, and accountability to build your own product.</p>
        </div>
        
        {buildProjects.length > 0 ? (
          <div className={`relative h-[600px] w-full max-w-5xl mx-auto rounded-lg overflow-hidden border border-slate-700 glow-shadow ${isVisible ? 'fade-in visible' : 'fade-in'}`} style={{ transitionDelay: '200ms' }}>
            {buildProjects.map((project, index) => (
              <BuildProjectCard key={project.id} project={project} isActive={index === currentIndex} />
            ))}
            
            {buildProjects.length > 1 && (
              <>
                <button onClick={prevSlide} className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors z-10">
                  <ChevronLeftIcon className="w-6 h-6" />
                </button>
                <button onClick={nextSlide} className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors z-10">
                  <ChevronRightIcon className="w-6 h-6" />
                </button>
              </>
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
              {buildProjects.map((_, index) => (
                <button key={index} onClick={() => setCurrentIndex(index)} className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-violet-400' : 'bg-slate-600'} transition-colors`}></button>
              ))}
            </div>
          </div>
        ) : (
          <div className={`relative h-[400px] w-full max-w-5xl mx-auto rounded-lg border border-slate-700 flex flex-col items-center justify-center text-center p-8 ${isVisible ? 'fade-in visible' : 'fade-in'}`} style={{ transitionDelay: '200ms' }}>
            <h3 className="text-2xl font-bold text-white">No Projects to Showcase Yet</h3>
            <p className="mt-2 max-w-md text-slate-400">Our members are busy building the future. The first cohort of projects from the 'Build to Hack' program will be featured here soon.</p>
          </div>
        )}

         <div className="text-center mt-12">
            <button onClick={onApplyClick} className="group relative inline-flex items-center justify-center px-8 py-3 text-base font-bold text-white bg-transparent border-2 border-slate-600 rounded-md overflow-hidden transition-all duration-300 hover:border-violet-400 hover:shadow-[0_0_25px_rgba(192,132,252,0.5)]">
                <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-slate-700 group-hover:w-full group-hover:h-full"></span>
                <span className="relative">Apply to Program</span>
            </button>
        </div>
      </div>
    </section>
  );
};

export default BuildToHackSection;
