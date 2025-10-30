import React from 'react';
import { UsersIcon, CalendarIcon, RocketIcon, ChartBarIcon, SearchIcon, BellIcon, CogIcon } from '../Icons';
import { AdminView } from './AdminDashboard';
import CircularProgress from './charts/CircularProgress';
import DonutChart from './charts/DonutChart';

interface DashboardHomeProps {
  setView: (view: AdminView) => void;
}

const QuickActionCard: React.FC<{ icon: React.FC<any>, title: string, onClick: () => void }> = ({ icon: Icon, title, onClick }) => (
  <button 
    onClick={onClick} 
    className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-4 flex flex-col items-center justify-center text-center hover:bg-slate-200/70 dark:hover:bg-slate-800/70 hover:border-fuchsia-500/50 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500"
  >
    <Icon className="w-8 h-8 text-fuchsia-500 dark:text-fuchsia-400 mb-3" />
    <span className="font-semibold text-sm text-slate-800 dark:text-white">{title}</span>
  </button>
);


const DashboardHome: React.FC<DashboardHomeProps> = ({ setView }) => {
    const processesData = [
        { name: 'Approved', value: 45, color: '#3b82f6' }, // blue-500
        { name: 'Pending', value: 35, color: '#a855f7' }, // purple-500
        { name: 'Rejected', value: 20, color: '#d946ef' }, // fuchsia-500
    ];

    const tasks: { id: number, user: string, task: string, priority: string, date: string }[] = [];

  return (
    <div className="animate-fade-in-up space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-fuchsia-500 to-blue-500 bg-clip-text text-transparent">Hello, Admin</h1>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative flex-grow">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                    <input type="search" placeholder="Search..." className="w-full pl-10 pr-4 py-2 bg-white/50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:outline-none text-slate-800 dark:text-white" />
                </div>
                <button className="p-2.5 bg-white/50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-200/70 dark:hover:bg-slate-800/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500">
                    <BellIcon className="w-5 h-5" />
                </button>
                 <button className="p-2.5 bg-white/50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-200/70 dark:hover:bg-slate-800/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500">
                    <CogIcon className="w-5 h-5" />
                </button>
            </div>
        </header>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <QuickActionCard icon={UsersIcon} title="Manage Applications" onClick={() => setView('applications')} />
            <QuickActionCard icon={CalendarIcon} title="Manage Meetups" onClick={() => setView('meetups')} />
            <QuickActionCard icon={RocketIcon} title="Manage Projects" onClick={() => setView('build-projects')} />
            <QuickActionCard icon={ChartBarIcon} title="Manage Metrics" onClick={() => setView('metrics')} />
        </div>
      
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Processes Card */}
                <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-6 shadow-lg">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Processes</h3>
                    <div className="flex items-center justify-around">
                        <DonutChart data={processesData} />
                        <div className="space-y-2 text-sm">
                            {processesData.map(item => (
                                <div key={item.name} className="flex items-center">
                                    <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
                                    <span className="text-slate-500 dark:text-slate-400">{item.name}</span>
                                    <span className="ml-auto font-semibold text-slate-800 dark:text-white">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Task Completion Card */}
                <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center">
                    <h3 className="font-semibold text-slate-900 dark:text-white self-start mb-2">Task completion</h3>
                    <div className="my-auto">
                        <CircularProgress percentage={95} />
                    </div>
                </div>
            </div>

            {/* Tasks Table */}
            <div className="lg:col-span-1 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-6 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-slate-900 dark:text-white">Tasks</h3>
                </div>
                <div className="space-y-3">
                    {tasks.length > 0 ? (
                        tasks.map(task => (
                            <div key={task.id} className="bg-slate-200/40 dark:bg-slate-800/40 p-3 rounded-lg">
                                <div className="flex justify-between items-start">
                                    <p className="text-sm text-slate-800 dark:text-white font-medium">{task.task}</p>
                                     <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                                        task.priority === 'High' ? 'bg-red-500/20 text-red-500 dark:text-red-300' :
                                        task.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-500 dark:text-yellow-300' :
                                        'bg-green-500/20 text-green-500 dark:text-green-300'
                                    }`}>
                                        {task.priority}
                                    </span>
                                </div>
                                 <div className="flex items-center justify-between mt-2 text-xs text-slate-500 dark:text-slate-400">
                                    <span>{task.user}</span>
                                    <span>{task.date}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8">
                          <p className="text-slate-500 dark:text-slate-400 text-sm">No tasks assigned.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default DashboardHome;