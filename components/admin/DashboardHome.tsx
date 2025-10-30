import React, { useState } from 'react';
import { UsersIcon, CalendarIcon, RocketIcon, ChartBarIcon, SearchIcon, BellIcon, CogIcon } from '../Icons';
import { AdminView } from './AdminDashboard';
import CircularProgress from './charts/CircularProgress';
import DonutChart from './charts/DonutChart';

interface DashboardHomeProps {
  setView: (view: AdminView) => void;
}


const DashboardHome: React.FC<DashboardHomeProps> = ({ setView }) => {
    const [activeTaskTab, setActiveTaskTab] = useState('Active');
    
    const processesData = [
        { name: 'Approved', value: 70, color: '#3b82f6' },
        { name: 'New', value: 15, color: '#a855f7' },
        { name: 'Pending', value: 15, color: '#ef4444' },
    ];
    
    const tasks = [
        { id: 1, assignee: 'Elias Melssen', avatar: 'https://i.pravatar.cc/32?u=a042581f4e29026704d', task: 'Review new applications', due: '10 Aug 2024, 9:15 AM', status: 'Active' },
        { id: 2, assignee: 'Mark Smith', avatar: 'https://i.pravatar.cc/32?u=a042581f4e29026705d', task: 'Finalize hackathon prizes', due: '11 Aug 2024, 10:00 AM', status: 'Active' },
        { id: 3, assignee: 'Jane Doe', avatar: 'https://i.pravatar.cc/32?u=a042581f4e29026706d', task: 'Publish meetup schedule', due: '9 Aug 2024, 5:00 PM', status: 'Completed' },
        { id: 4, assignee: 'Admin', avatar: 'https://i.pravatar.cc/32?u=a042581f4e29026707d', task: 'Update community metrics', due: '12 Aug 2024, 11:00 AM', status: 'Pending' }
    ];

  return (
    <div className="animate-fade-in-up space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-3xl font-bold text-white">Hello, Admin</h1>
                <p className="text-slate-400">How can we help you today?</p>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative flex-grow">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                    <input type="search" placeholder="Search..." className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white" />
                </div>
                <button className="p-2.5 bg-slate-900/50 border border-slate-700 rounded-lg hover:bg-slate-800/70">
                    <BellIcon className="w-5 h-5" />
                </button>
                 <button className="p-2.5 bg-slate-900/50 border border-slate-700 rounded-lg hover:bg-slate-800/70">
                    <CogIcon className="w-5 h-5" />
                </button>
            </div>
        </header>
      
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Welcome Card */}
            <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur-md border border-slate-700/80 rounded-2xl p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-white">Mark Smith</h2>
                <p className="text-slate-400">Oversees and coordinates all project prototypes.</p>
                <div className="my-4 border-t border-slate-700"></div>
                <p className="text-slate-300">Weekly, review and refinement of project prototypes. Pay special attention to system performance.</p>
                <div className="flex justify-between items-center mt-6">
                    <div className="flex -space-x-2">
                        <img className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-800" src="https://i.pravatar.cc/32?u=a042581f4e29026704d" alt="member" />
                        <img className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-800" src="https://i.pravatar.cc/32?u=a042581f4e29026705d" alt="member" />
                        <img className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-800" src="https://i.pravatar.cc/32?u=a042581f4e29026706d" alt="member" />
                    </div>
                    <button className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Tap to see more
                    </button>
                </div>
            </div>

            {/* Task Completion Card */}
            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700/80 rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center">
                <h3 className="font-semibold text-white self-start">Task completion</h3>
                <p className="text-sm text-slate-400 self-start">From all projects</p>
                <div className="my-4">
                    <CircularProgress percentage={95} />
                </div>
                <div className="flex gap-4 text-sm">
                    <div className="text-center">
                        <p className="text-slate-400">Done</p>
                        <p className="font-semibold text-white">124</p>
                    </div>
                    <div className="text-center">
                        <p className="text-slate-400">In progress</p>
                        <p className="font-semibold text-white">12</p>
                    </div>
                </div>
            </div>

            {/* Processes Card */}
            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700/80 rounded-2xl p-6 shadow-lg">
                <h3 className="font-semibold text-white mb-4">Processes</h3>
                <div className="flex items-center justify-around">
                    <DonutChart data={processesData} />
                    <div className="space-y-2 text-sm">
                        {processesData.map(item => (
                            <div key={item.name} className="flex items-center">
                                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
                                <span className="text-slate-400">{item.name}</span>
                                <span className="ml-auto font-semibold text-white">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tasks Table */}
            <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur-md border border-slate-700/80 rounded-2xl p-6 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-white">Tasks</h3>
                    <div className="flex text-sm border border-slate-700 rounded-lg p-0.5">
                        {['All', 'Active', 'Completed'].map(tab => (
                            <button 
                                key={tab}
                                onClick={() => setActiveTaskTab(tab)}
                                className={`px-3 py-1 rounded-md transition-colors ${activeTaskTab === tab ? 'bg-slate-700 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
                 <div className="space-y-2">
                    {tasks.filter(t => activeTaskTab === 'All' || t.status === activeTaskTab).map(task => (
                        <div key={task.id} className="grid grid-cols-3 gap-4 items-center p-2 rounded-lg hover:bg-slate-800/50">
                            <div className="flex items-center col-span-1">
                                <img src={task.avatar} alt={task.assignee} className="w-8 h-8 rounded-full mr-3" />
                                <div>
                                    <p className="font-medium text-white text-sm">{task.assignee}</p>
                                    <p className="text-xs text-slate-400">Assignee</p>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <p className="text-white text-sm">{task.task}</p>
                            </div>
                            <div className="text-right col-span-1">
                                <p className="text-slate-400 text-sm">{task.due}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default DashboardHome;