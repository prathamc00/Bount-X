import React, { useState } from 'react';
import { meetupEvents as mockMeetups } from '../../data/mockData';
import { MeetupEvent } from '../../types';
import { PencilIcon, TrashIcon } from '../Icons';

const MeetupManagement: React.FC = () => {
  const [meetups, setMeetups] = useState<MeetupEvent[]>(mockMeetups);

  return (
    <div className="animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Meetups</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage community meetup events.</p>
        </div>
        <button className="px-5 py-2.5 font-medium text-white transition-all duration-300 ease-in-out rounded-lg btn-gradient focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500">
          <span className="relative z-10 text-sm font-semibold">Add Meetup</span>
        </button>
      </div>

      <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-6 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3 text-sm font-semibold text-slate-500 dark:text-slate-400">Title</th>
                <th className="p-3 text-sm font-semibold text-slate-500 dark:text-slate-400">Date</th>
                <th className="p-3 text-sm font-semibold text-slate-500 dark:text-slate-400">Location</th>
                <th className="p-3 text-sm font-semibold text-slate-500 dark:text-slate-400">Topic</th>
                <th className="p-3 text-sm font-semibold text-slate-500 dark:text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {meetups.length > 0 ? (
                meetups.map(meetup => (
                  <tr key={meetup.id} className="border-b border-slate-200 dark:border-slate-800 last:border-b-0 hover:bg-slate-200/50 dark:hover:bg-slate-800/50">
                    <td className="p-3 text-slate-800 dark:text-white font-medium">{meetup.title}</td>
                    <td className="p-3 text-slate-500 dark:text-slate-400">{new Date(meetup.date).toLocaleDateString()}</td>
                    <td className="p-3 text-slate-500 dark:text-slate-400">{meetup.location}</td>
                    <td className="p-3"><span className="text-xs font-mono bg-fuchsia-500/20 text-fuchsia-600 dark:bg-fuchsia-600/30 dark:text-fuchsia-300 px-2 py-1 rounded">{meetup.topic}</span></td>
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
                  <td colSpan={5} className="text-center p-6 text-slate-500 dark:text-slate-400">
                    No meetups scheduled.
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

export default MeetupManagement;