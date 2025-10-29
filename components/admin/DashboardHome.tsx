import React from 'react';
import { applications, meetupEvents, buildProjects, communityMetrics } from '../../data/mockData';
import { UsersIcon, CalendarIcon, RocketIcon, ChartBarIcon } from '../Icons';
import { AdminView } from './AdminDashboard';

interface DashboardHomeProps {
  setView: (view: AdminView) => void;
}

const StatCard: React.FC<{
  icon: React.ElementType;
  title: string;
  value: string | number;
  onClick: () => void;
}> = ({ icon: Icon, title, value, onClick }) => (
  <button
    onClick={onClick}
    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 text-left flex items-center space-x-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-fuchsia-500/30 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500"
  >
    <div className="bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 p-3 rounded-lg">
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{title}</p>
      <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
    </div>
  </button>
);


const DashboardHome: React.FC<DashboardHomeProps> = ({ setView }) => {
    const pendingApplications = applications.filter(a => a.status === 'Pending').length;
    const totalMeetups = meetupEvents.length;
    const totalProjects = buildProjects.length;
    const totalMetrics = communityMetrics.length;

  return (
    <div className="animate-fade-in-up">
      <h1 className="text-4xl font-bold font-mono text-slate-900 dark:text-white tracking-tight">Admin Dashboard</h1>
      <p className="text-slate-600 dark:text-slate-400 mt-2">Welcome back, Admin. Here's a snapshot of the Bount-X community.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <StatCard icon={UsersIcon} title="Pending Applications" value={pendingApplications} onClick={() => setView('applications')} />
        <StatCard icon={CalendarIcon} title="Total Meetups" value={totalMeetups} onClick={() => setView('meetups')} />
        <StatCard icon={RocketIcon} title="Build Projects" value={totalProjects} onClick={() => setView('build-projects')} />
        <StatCard icon={ChartBarIcon} title="Community Metrics" value={totalMetrics} onClick={() => setView('metrics')} />
      </div>

      <div className="mt-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Activity</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Latest applications submitted to the community.</p>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="border-b border-slate-200 dark:border-slate-700">
                    <tr>
                        <th className="p-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Name</th>
                        <th className="p-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Skill</th>
                        <th className="p-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Date</th>
                        <th className="p-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.slice(0, 5).map(app => (
                        <tr key={app.id} className="border-b border-slate-200 dark:border-slate-800 last:border-b-0">
                            <td className="p-3 text-slate-800 dark:text-slate-200 font-medium">{app.name}</td>
                            <td className="p-3 text-slate-600 dark:text-slate-400">{app.skill}</td>
                            <td className="p-3 text-slate-600 dark:text-slate-400">{new Date(app.submittedAt).toLocaleDateString()}</td>
                            <td className="p-3">
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                    app.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300' :
                                    app.status === 'Approved' ? 'bg-green-500/20 text-green-700 dark:text-green-300' :
                                    'bg-red-500/20 text-red-700 dark:text-red-300'
                                }`}>
                                    {app.status}
                                </span>
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

export default DashboardHome;
