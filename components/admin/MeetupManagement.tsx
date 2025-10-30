import React, { useState } from 'react';
import { meetupEvents as mockMeetups } from '../../data/mockData';
import { MeetupEvent } from '../../types';
import { PencilIcon, TrashIcon } from '../Icons';

const MeetupManagement: React.FC = () => {
  const [meetups, setMeetups] = useState<MeetupEvent[]>(mockMeetups);

  return (
    <div className="animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">Meetup Management</h1>
          <p className="text-neutral-500 mt-1">Manage community meetup events.</p>
        </div>
        <button className="px-4 py-2 font-medium text-white bg-neutral-800 hover:bg-neutral-700 transition-colors duration-300 ease-in-out rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 text-sm">
          Add Meetup
        </button>
      </div>

      <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-neutral-200">
              <tr>
                <th className="p-3 font-semibold text-neutral-600">Title</th>
                <th className="p-3 font-semibold text-neutral-600">Date</th>
                <th className="p-3 font-semibold text-neutral-600">Location</th>
                <th className="p-3 font-semibold text-neutral-600">Topic</th>
                <th className="p-3 font-semibold text-neutral-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {meetups.length > 0 ? (
                meetups.map(meetup => (
                  <tr key={meetup.id} className="border-b border-neutral-200 last:border-b-0 hover:bg-neutral-50">
                    <td className="p-3 text-neutral-800 font-medium">{meetup.title}</td>
                    <td className="p-3 text-neutral-500">{new Date(meetup.date).toLocaleDateString()}</td>
                    <td className="p-3 text-neutral-500">{meetup.location}</td>
                    <td className="p-3"><span className="text-xs font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">{meetup.topic}</span></td>
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
                  <td colSpan={5} className="text-center p-6 text-neutral-500">
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