import React, { useState } from 'react';
import { upcomingHackathon as mockUpcoming, pastHackathonProjects as mockPast } from '../../data/mockData';
import { UpcomingHackathon, HackathonProject } from '../../types';
import { PencilIcon, TrashIcon } from '../Icons';

const HackathonManagement: React.FC = () => {
  const [upcoming, setUpcoming] = useState<UpcomingHackathon | null>(mockUpcoming);
  const [pastProjects, setPastProjects] = useState<HackathonProject[]>(mockPast);

  return (
    <div className="animate-fade-in-up">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Hackathons</h1>
      <p className="text-slate-500 dark:text-slate-400 mt-1 mb-8">Manage upcoming hackathons and past winners.</p>

      {/* Upcoming Hackathon */}
      <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-6 mb-8 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Upcoming Hackathon</h2>
          <button className="flex items-center space-x-2 text-sm font-semibold text-fuchsia-500 dark:text-fuchsia-400 hover:text-fuchsia-600 dark:hover:text-fuchsia-300">
            <PencilIcon className="w-4 h-4" />
            <span>Edit Details</span>
          </button>
        </div>
        {upcoming ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div><strong className="text-slate-500 dark:text-slate-400">Title:</strong> <span className="text-slate-700 dark:text-slate-200">{upcoming.title}</span></div>
            <div><strong className="text-slate-500 dark:text-slate-400">Theme:</strong> <span className="text-slate-700 dark:text-slate-200">{upcoming.theme}</span></div>
            <div><strong className="text-slate-500 dark:text-slate-400">Start Date:</strong> <span className="text-slate-700 dark:text-slate-200">{new Date(upcoming.startDate).toLocaleString()}</span></div>
            <div><strong className="text-slate-500 dark:text-slate-400">End Date:</strong> <span className="text-slate-700 dark:text-slate-200">{new Date(upcoming.endDate).toLocaleString()}</span></div>
            <div className="md:col-span-2"><strong className="text-slate-500 dark:text-slate-400">Prizes:</strong> <span className="text-slate-700 dark:text-slate-200">{upcoming.prizes.join(', ')}</span></div>
          </div>
        ) : <p className="text-slate-500 dark:text-slate-400">No upcoming hackathon scheduled.</p>}
      </div>
      
      {/* Past Winners */}
      <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Past Winners</h2>
          <button className="px-5 py-2.5 font-medium text-white transition-all duration-300 ease-in-out rounded-lg btn-gradient focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500">
            <span className="relative z-10 text-sm font-semibold">Add Winner</span>
          </button>
        </div>
         <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3 text-sm font-semibold text-slate-500 dark:text-slate-400">Project Name</th>
                <th className="p-3 text-sm font-semibold text-slate-500 dark:text-slate-400">Team</th>
                <th className="p-3 text-sm font-semibold text-slate-500 dark:text-slate-400">Prize</th>
                <th className="p-3 text-sm font-semibold text-slate-500 dark:text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pastProjects.length > 0 ? (
                pastProjects.map(proj => (
                  <tr key={proj.id} className="border-b border-slate-200 dark:border-slate-800 last:border-b-0 hover:bg-slate-200/50 dark:hover:bg-slate-800/50">
                    <td className="p-3 text-slate-800 dark:text-white font-medium">{proj.name}</td>
                    <td className="p-3 text-slate-500 dark:text-slate-400">{proj.team.join(', ')}</td>
                    <td className="p-3 text-fuchsia-500 dark:text-fuchsia-400 font-bold">{proj.prize}</td>
                    <td className="p-3">
                      <div className="flex space-x-3">
                        <button className="text-slate-500 dark:text-slate-400 hover:text-fuchsia-500 dark:hover:text-fuchsia-400 transition-colors"><PencilIcon className="w-5 h-5" /></button>
                        <button className="text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"><TrashIcon className="w-5 h-5" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center p-6 text-slate-500 dark:text-slate-400">
                    No past winners to display.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HackathonManagement;