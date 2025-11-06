import React from 'react';
import { 
    DashboardIcon, 
    DocumentTextIcon, 
    UsersIcon, 
    ChartBarIcon, 
    CalendarIcon,
    TrophyIcon,
    RocketIcon,
    BookOpenIcon,
    CogIcon,
    LogoutIcon,
} from '../Icons';
import { AdminView } from './AdminDashboard';

interface SidebarProps {
  currentView: AdminView;
  setView: (view: AdminView) => void;
  onLogout: () => void;
}

const mainNav = [
  { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
];

const managementNav = [
  { id: 'applications', label: 'Applications', icon: DocumentTextIcon },
  { id: 'meetups', label: 'Meetups', icon: CalendarIcon },
  { id: 'hackathons', label: 'Hackathons', icon: TrophyIcon },
  { id: 'build-projects', label: 'Build Projects', icon: RocketIcon },
];

const communityNav = [
  { id: 'member-management', label: 'Members', icon: UsersIcon },
];

const dataNav = [
  { id: 'metrics', label: 'Metrics', icon: ChartBarIcon },
];


const NavItem: React.FC<{
    item: { id: string, label: string, icon: React.FC<any> },
    currentView: AdminView,
    setView: (view: AdminView) => void
}> = ({ item, currentView, setView }) => (
    <button
        onClick={() => setView(item.id as AdminView)}
        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
            currentView === item.id
            ? 'bg-neutral-200 text-neutral-900 font-semibold'
            : 'text-neutral-600 hover:bg-neutral-200/50 hover:text-neutral-800'
        }`}
    >
        <item.icon className="w-5 h-5 mr-3" />
        {item.label}
    </button>
);


const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, onLogout }) => {
  return (
    <div className="w-60 bg-neutral-100 border-r border-neutral-200 text-neutral-800 flex flex-col flex-shrink-0">
      <div className="h-20 flex items-center px-4">
         <h1 className="text-xl font-bold text-neutral-800 tracking-tighter">Bount-X</h1>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-4">
        <div className="space-y-1">
            {mainNav.map(item => <NavItem key={item.id} item={item} currentView={currentView} setView={setView} />)}
        </div>
        <div>
            <h2 className="px-3 mb-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Management</h2>
            <div className="space-y-1">
                {managementNav.map(item => <NavItem key={item.id} item={item} currentView={currentView} setView={setView} />)}
            </div>
        </div>
        <div>
            <h2 className="px-3 mb-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Community</h2>
            <div className="space-y-1">
                {communityNav.map(item => <NavItem key={item.id} item={item} currentView={currentView} setView={setView} />)}
            </div>
        </div>
        <div>
            <h2 className="px-3 mb-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Data</h2>
            <div className="space-y-1">
                {dataNav.map(item => <NavItem key={item.id} item={item} currentView={currentView} setView={setView} />)}
            </div>
        </div>
      </nav>

      <div className="p-4 border-t border-neutral-200 space-y-1">
          <a href="#/admin" className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-neutral-600 hover:bg-neutral-200/50 hover:text-neutral-800">
              <CogIcon className="w-5 h-5 mr-3" />
              Settings
          </a>
           <a href="#/admin" className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-neutral-600 hover:bg-neutral-200/50 hover:text-neutral-800">
              <BookOpenIcon className="w-5 h-5 mr-3" />
              Knowledge Base
          </a>
          <button
            onClick={onLogout}
            className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-neutral-600 hover:bg-neutral-200/50 hover:text-neutral-800"
          >
            <LogoutIcon className="w-5 h-5 mr-3" />
            Logout
          </button>
      </div>
    </div>
  );
};

export default Sidebar;