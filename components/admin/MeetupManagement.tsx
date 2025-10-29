import React, { useState } from 'react';
import { meetupEvents as mockMeetups } from '../../data/mockData';
import { MeetupEvent } from '../../types';
import { PencilIcon, TrashIcon } from '../Icons';

const MeetupManagement: React.FC = () => {
  const [meetups, setMeetups] = useState<MeetupEvent[]>(mockMeetups);

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold font-mono text-slate-900 dark:text-white tracking-tight">Meetups</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage community meetup events.</p>
        </div>
        <button className="px-5 py-2.5 font-medium text-white transition-all duration-300 ease-in-out rounded-md btn-gradient focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fuchsia-500 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-900">
          <span className="relative z-10 text-sm font-semibold">Add Meetup</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Title</th>
                <th className="p-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Date</th>
                <th className="p-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Location</th>
                <th className="p-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Topic</th>
                <th className="p-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {meetups.map(meetup => (
                <tr key={meetup.id} className="border-b border-slate-200 dark:border-slate-800 last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 text-slate-800 dark:text-slate-200 font-medium">{meetup.title}</td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">{new Date(meetup.date).toLocaleDateString()}</td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">{meetup.location}</td>
                  <td className="p-3"><span className="text-xs font-mono bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 px-2 py-1 rounded">{meetup.topic}</span></td>
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

export default MeetupManagement;
