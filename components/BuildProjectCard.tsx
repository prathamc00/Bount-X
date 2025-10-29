import React, { useState, useEffect, memo } from 'react';
import { BuildProject, ProjectStatus } from '../types';

interface BuildProjectCardProps {
  project: BuildProject;
  isActive: boolean;
}

const BuildProjectCard: React.FC<BuildProjectCardProps> = memo(({ project, isActive }) => {
  const [hasBeenVisible, setHasBeenVisible] = useState(isActive);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (isActive && !hasBeenVisible) {
      setHasBeenVisible(true);
    }
  }, [isActive, hasBeenVisible]);

  return (
    <div className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${isActive ? 'opacity-100' : 'opacity-0'}`}>
      {hasBeenVisible && (
        <>
          {!isImageLoaded && <div className="absolute inset-0 w-full h-full bg-slate-200 dark:bg-slate-800 animate-pulse" />}
          <img 
            src={project.imageUrl} 
            alt={project.name} 
            width="1024"
            height="768"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`} 
            loading="lazy" 
            decoding="async"
            onLoad={() => setIsImageLoaded(true)}
          />
        </>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent dark:from-slate-950 dark:via-slate-950/70 dark:to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-8 text-slate-900 dark:text-white">
        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-2 ${
          project.status === ProjectStatus.LAUNCHED ? 'bg-green-500/20 text-green-700 dark:text-green-300' : 
          project.status === ProjectStatus.FUNDED ? 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300' : 
          'bg-blue-500/20 text-blue-700 dark:text-blue-300'
        }`}>
          {project.status}
        </span>
        <h3 className="text-3xl font-bold">{project.name}</h3>
        <p className="text-slate-800 dark:text-slate-300">by {project.creator}</p>
        <p className="mt-2 max-w-lg text-slate-700 dark:text-slate-300">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.techStack.map(tech => <span key={tech} className="text-xs font-mono bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 px-2 py-1 rounded">{tech}</span>)}
        </div>
      </div>
    </div>
  );
});

export default BuildProjectCard;