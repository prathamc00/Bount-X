import React, { useState } from 'react';
import { buildProjects as mockProjects } from '../../data/mockData';
import { BuildProject } from '../../types';
import { PencilIcon, TrashIcon } from '../Icons';

const BuildProjectManagement: React.FC = () => {
  const [projects, setProjects] = useState<BuildProject[]>(mockProjects);

  return (
    <div className="animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Build to Hack Projects</h1>
          <p className="text-slate-400 mt-1">Manage projects featured in the Build to Hack program.</p>
        </div>
        <button className="px-5 py-2.5 font-medium text-white transition-all duration-300 ease-in-out rounded-lg bg-blue-600 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
          <span className="relative z-10 text-sm font-semibold">Add Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <div key={project.id} className="bg-slate-900/50 backdrop-blur-md border border-slate-700/80 rounded-2xl overflow-hidden flex flex-col shadow-lg">
            <img src={project.imageUrl} alt={project.name} className="w-full h-48 object-cover" />
            <div className="p-4 flex flex-col flex-grow">
              <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg text-white">{project.name}</h3>
                   <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${
                      project.status === 'Launched' ? 'bg-green-500/20 text-green-300' : 
                      project.status === 'Funded' ? 'bg-yellow-500/20 text-yellow-300' : 
                      'bg-blue-500/20 text-blue-300'
                    }`}>
                      {project.status}
                    </span>
              </div>
              <p className="text-sm text-slate-400 mb-2">by {project.creator}</p>
              <p className="text-sm text-slate-300 flex-grow">{project.description}</p>
              <div className="mt-4 pt-4 border-t border-slate-700 flex justify-between items-center">
                <p className="text-xs text-slate-400">Tech Stack: {project.techStack.length}</p>
                <div className="flex space-x-3">
                  <button className="text-slate-400 hover:text-blue-400 transition-colors"><PencilIcon className="w-5 h-5" /></button>
                  <button className="text-slate-400 hover:text-red-400 transition-colors"><TrashIcon className="w-5 h-5" /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuildProjectManagement;