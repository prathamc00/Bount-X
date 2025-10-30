import React from 'react';
import { HomeIcon, UsersIcon, CalendarIcon, RocketIcon, ChartBarIcon, LogoutIcon, SunIcon, MoonIcon } from '../Icons';
import LogoIcon from '../LogoIcon';
import { AdminView } from './AdminDashboard';
import { useTheme } from '../../context/ThemeContext';

interface SidebarProps {
  currentView: AdminView;
  setView: (view: AdminView) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
  { id: 'applications', label: 'Applications', icon: UsersIcon },
  { id: 'meetups', label: 'Meetups', icon: CalendarIcon },
  { id: 'hackathons', label: 'Hackathons', icon: CalendarIcon }, // Re-using icon
  { id: 'build-projects', label: 'Projects', icon: RocketIcon },
  { id: 'metrics', label: 'Metrics', icon: ChartBarIcon },
] as const;


const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="w-64 bg-white/50 dark:bg-slate-900/30 backdrop-blur-xl border-r border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 flex flex-col flex-shrink-0">
      <div className="h-20 flex items-center px-6">
        <a href="#" className="flex items-center gap-3">
           <LogoIcon className="w-9 h-9 animate-logo-spin" />
          <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tighter">Bount-X</h1>
        </a>
      </div>

      <div className="px-4 border-t border-slate-200 dark:border-slate-700/50 pt-4">
        <div className="flex items-center justify-center px-2 py-4 rounded-lg bg-slate-200/50 dark:bg-slate-800/30">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">Administrator</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1.5">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setView(item.id as AdminView)}
            className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 ${
              currentView === item.id
                ? 'bg-fuchsia-500/10 text-fuchsia-600 dark:bg-fuchsia-600/30 dark:text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-200 dark:border-slate-700/50">
         <div className="flex justify-between items-center bg-slate-200/50 dark:bg-slate-800/30 p-2 rounded-lg">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Theme</span>
            <div className="flex border border-slate-300 dark:border-slate-700 rounded-lg">
                <button onClick={() => theme === 'dark' && toggleTheme()} className={`p-1.5 rounded-l-md transition-colors ${theme === 'light' ? 'bg-slate-300 dark:bg-slate-700 text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                    <SunIcon className="w-4 h-4" />
                </button>
                <button onClick={() => theme === 'light' && toggleTheme()} className={`p-1.5 rounded-r-md transition-colors ${theme === 'dark' ? 'bg-slate-300 dark:bg-slate-700 text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                    <MoonIcon className="w-4 h-4" />
                </button>
            </div>
         </div>
         <a
            href="#"
            className="w-full flex items-center mt-4 px-3 py-2.5 text-sm font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900"
          >
            <LogoutIcon className="w-5 h-5 mr-3" />
            Return to Site
          </a>
      </div>
    </div>
  );
};

export default Sidebar;