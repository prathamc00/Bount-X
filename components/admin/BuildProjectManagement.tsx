import React, { useState } from 'react';
import { buildProjects as mockProjects } from '../../data/mockData';
import { BuildProject } from '../../types';
import { PencilIcon, TrashIcon } from '../Icons';

const BuildProjectManagement: React.FC = () => {
  const [projects, setProjects] = useState<BuildProject[]>(mockProjects);

  return (
    <div className="animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">Build to Hack Projects</h1>
          <p className="text-neutral-500 mt-1">Manage projects featured in the Build to Hack program.</p>
        </div>
        <button className="px-4 py-2 font-medium text-white bg-neutral-800 hover:bg-neutral-700 transition-colors duration-300 ease-in-out rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 text-sm">
            Add Project
        </button>
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div key={project.id} className="bg-white border border-neutral-200 rounded-lg overflow-hidden flex flex-col shadow-sm">
              <img src={project.imageUrl} alt={project.name} className="w-full h-40 object-cover" />
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-md text-neutral-800">{project.name}</h3>
                    <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${
                        project.status === 'Launched' ? 'bg-green-100 text-green-800' : 
                        project.status === 'Funded' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {project.status}
                      </span>
                </div>
                <p className="text-sm text-neutral-500 mb-2">by {project.creator}</p>
                <p className="text-sm text-neutral-600 flex-grow">{project.description}</p>
                <div className="mt-4 pt-4 border-t border-neutral-200 flex justify-between items-center">
                  <p className="text-xs text-neutral-500">Tech Stack: {project.techStack.length}</p>
                  <div className="flex space-x-3">
                    <button className="text-neutral-500 hover:text-blue-600 transition-colors"><PencilIcon className="w-4 h-4" /></button>
                    <button className="text-neutral-500 hover:text-red-600 transition-colors"><TrashIcon className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-10 bg-white border border-neutral-200 rounded-lg">
          <p className="text-neutral-500">No 'Build to Hack' projects have been added yet.</p>
        </div>
      )}
    </div>
  );
};

export default BuildProjectManagement;