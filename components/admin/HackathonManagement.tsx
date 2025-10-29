import React, { useState } from 'react';
import { upcomingHackathon as mockUpcoming, pastHackathonProjects as mockPast } from '../../data/mockData';
import { UpcomingHackathon, HackathonProject } from '../../types';
import { PencilIcon, TrashIcon } from '../Icons';

const HackathonManagement: React.FC = () => {
  const [upcoming, setUpcoming] = useState<UpcomingHackathon | null>(mockUpcoming);
  const [pastProjects, setPastProjects] = useState<HackathonProject[]>(mockPast);

  return (
    <div className="animate-fade-in-up">
      <h1 className="text-4xl font-bold font-mono text-slate-900 dark:text-white tracking-tight">Hackathons</h1>
      <p className="text-slate-600 dark:text-slate-400 mt-1 mb-8">Manage upcoming hackathons and past winners.</p>

      {/* Upcoming Hackathon */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Upcoming Hackathon</h2>
          <button className="flex items-center space-x-2 text-sm font-semibold text-fuchsia-600 dark:text-fuchsia-400 hover:text-fuchsia-500">
            <PencilIcon className="w-4 h-4" />
            <span>Edit Details</span>
          </button>
        </div>
        {upcoming ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div><strong className="text-slate-600 dark:text-slate-300">Title:</strong> <span className="text-slate-800 dark:text-slate-200">{upcoming.title}</span></div>
            <div><strong className="text-slate-600 dark:text-slate-300">Theme:</strong> <span className="text-slate-800 dark:text-slate-200">{upcoming.theme}</span></div>
            <div><strong className="text-slate-600 dark:text-slate-300">Start Date:</strong> <span className="text-slate-800 dark:text-slate-200">{new Date(upcoming.startDate).toLocaleString()}</span></div>
            <div><strong className="text-slate-600 dark:text-slate-300">End Date:</strong> <span className="text-slate-800 dark:text-slate-200">{new Date(upcoming.endDate).toLocaleString()}</span></div>
            <div className="md:col-span-2"><strong className="text-slate-600 dark:text-slate-300">Prizes:</strong> <span className="text-slate-800 dark:text-slate-200">{upcoming.prizes.join(', ')}</span></div>
          </div>
        ) : <p className="text-slate-500">No upcoming hackathon scheduled.</p>}
      </div>
      
      {/* Past Winners */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Past Winners</h2>
          <button className="px-5 py-2.5 font-medium text-white transition-all duration-300 ease-in-out rounded-md btn-gradient focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fuchsia-500 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-900">
            <span className="relative z-10 text-sm font-semibold">Add Winner</span>
          </button>
        </div>
         <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Project Name</th>
                <th className="p-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Team</th>
                <th className="p-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Prize</th>
                <th className="p-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pastProjects.map(proj => (
                <tr key={proj.id} className="border-b border-slate-200 dark:border-slate-800 last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 text-slate-800 dark:text-slate-200 font-medium">{proj.name}</td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">{proj.team.join(', ')}</td>
                  <td className="p-3 text-fuchsia-600 dark:text-fuchsia-400 font-bold">{proj.prize}</td>
                  <td className="p-3">
                    <div className="flex space-x-3">
                      <button className="text-slate-500 hover:text-fuchsia-600 transition-colors"><PencilIcon className="w-5 h-5" /></button>
                      <button className="text-slate-500 hover:text-red-500 transition-colors"><TrashIcon className="w-5 h-5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HackathonManagement;
