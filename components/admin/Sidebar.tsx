import React from 'react';
import { HomeIcon, UsersIcon, CalendarIcon, TrophyIcon, RocketIcon, ChartBarIcon, LogoutIcon } from '../Icons';
import { AdminView } from './AdminDashboard';

interface SidebarProps {
  currentView: AdminView;
  setView: (view: AdminView) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
  { id: 'applications', label: 'Applications', icon: UsersIcon },
  { id: 'meetups', label: 'Meetups', icon: CalendarIcon },
  { id: 'hackathons', label: 'Hackathons', icon: TrophyIcon },
  { id: 'build-projects', label: 'Build Projects', icon: RocketIcon },
  { id: 'metrics', label: 'Metrics', icon: ChartBarIcon },
] as const;


const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  return (
    <div className="w-64 bg-slate-900 text-slate-300 flex flex-col flex-shrink-0">
      <div className="h-20 flex items-center px-6">
        <a href="#" className="flex-shrink-0">
          <h1 className="text-2xl font-bold font-mono text-white tracking-tighter">Bount-X</h1>
          <span className="text-xs font-mono text-fuchsia-400">ADMIN_PANEL</span>
        </a>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-2">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center px-4 py-2.5 text-sm font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
              currentView === item.id
                ? 'bg-fuchsia-500/10 text-fuchsia-400'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-800">
         <a
            href="#"
            className="w-full flex items-center px-4 py-2.5 text-sm font-semibold rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            <LogoutIcon className="w-5 h-5 mr-3" />
            Return to Site
          </a>
      </div>
    </div>
  );
};

export default Sidebar;
