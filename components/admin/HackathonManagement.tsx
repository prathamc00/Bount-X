import React, { useState } from 'react';
import { upcomingHackathon as mockUpcoming, pastHackathonProjects as mockPast } from '../../data/mockData';
import { UpcomingHackathon, HackathonProject } from '../../types';
import { PencilIcon, TrashIcon } from '../Icons';

const HackathonManagement: React.FC = () => {
  const [upcoming, setUpcoming] = useState<UpcomingHackathon | null>(mockUpcoming);
  const [pastProjects, setPastProjects] = useState<HackathonProject[]>(mockPast);

  return (
    <div className="animate-fade-in-up space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">Hackathon Management</h1>
        <p className="text-neutral-500 mt-1">Manage upcoming hackathons and past winners.</p>
      </div>

      {/* Upcoming Hackathon */}
      <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-neutral-800">Upcoming Hackathon</h2>
          <button className="flex items-center space-x-2 text-sm font-semibold text-blue-600 hover:text-blue-800">
            <PencilIcon className="w-4 h-4" />
            <span>Edit Details</span>
          </button>
        </div>
        {upcoming ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div><strong className="text-neutral-500">Title:</strong> <span className="text-neutral-700">{upcoming.title}</span></div>
            <div><strong className="text-neutral-500">Theme:</strong> <span className="text-neutral-700">{upcoming.theme}</span></div>
            <div><strong className="text-neutral-500">Start Date:</strong> <span className="text-neutral-700">{new Date(upcoming.startDate).toLocaleString()}</span></div>
            <div><strong className="text-neutral-500">End Date:</strong> <span className="text-neutral-700">{new Date(upcoming.endDate).toLocaleString()}</span></div>
            <div className="md:col-span-2"><strong className="text-neutral-500">Prizes:</strong> <span className="text-neutral-700">{upcoming.prizes.join(', ')}</span></div>
          </div>
        ) : <p className="text-neutral-500 text-sm">No upcoming hackathon scheduled.</p>}
      </div>
      
      {/* Past Winners */}
      <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-neutral-800">Past Winners</h2>
           <button className="px-4 py-2 font-medium text-white bg-neutral-800 hover:bg-neutral-700 transition-colors duration-300 ease-in-out rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 text-sm">
              Add Winner
          </button>
        </div>
         <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-neutral-200">
              <tr>
                <th className="p-3 font-semibold text-neutral-600">Project Name</th>
                <th className="p-3 font-semibold text-neutral-600">Team</th>
                <th className="p-3 font-semibold text-neutral-600">Prize</th>
                <th className="p-3 font-semibold text-neutral-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pastProjects.length > 0 ? (
                pastProjects.map(proj => (
                  <tr key={proj.id} className="border-b border-neutral-200 last:border-b-0 hover:bg-neutral-50">
                    <td className="p-3 text-neutral-800 font-medium">{proj.name}</td>
                    <td className="p-3 text-neutral-500">{proj.team.join(', ')}</td>
                    <td className="p-3 text-blue-600 font-bold">{proj.prize}</td>
                    <td className="p-3">
                      <div className="flex space-x-3">
                         <button className="text-neutral-500 hover:text-blue-600 transition-colors"><PencilIcon className="w-4 h-4" /></button>
                        <button className="text-neutral-500 hover:text-red-600 transition-colors"><TrashIcon className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center p-6 text-neutral-500">
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