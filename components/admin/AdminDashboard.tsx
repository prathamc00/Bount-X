import React, { useState, Suspense, lazy } from 'react';
import Sidebar from './Sidebar';
import { useTheme } from '../../context/ThemeContext';

const DashboardHome = lazy(() => import('./DashboardHome'));
const ApplicationManagement = lazy(() => import('./ApplicationManagement'));
const MeetupManagement = lazy(() => import('./MeetupManagement'));
const HackathonManagement = lazy(() => import('./HackathonManagement'));
const BuildProjectManagement = lazy(() => import('./BuildProjectManagement'));
const MetricsManagement = lazy(() => import('./MetricsManagement'));

export type AdminView = 'dashboard' | 'applications' | 'meetups' | 'hackathons' | 'build-projects' | 'metrics';

const AdminDashboard: React.FC = () => {
  const [view, setView] = useState<AdminView>('dashboard');
  const { theme } = useTheme();

  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return <DashboardHome setView={setView} />;
      case 'applications':
        return <ApplicationManagement />;
      case 'meetups':
        return <MeetupManagement />;
      case 'hackathons':
        return <HackathonManagement />;
      case 'build-projects':
        return <BuildProjectManagement />;
      case 'metrics':
        return <MetricsManagement />;
      default:
        return <DashboardHome setView={setView} />;
    }
  };

  return (
    <div className={`flex h-screen bg-slate-100 dark:bg-slate-950 font-sans ${theme}`}>
      <Sidebar currentView={view} setView={setView} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100 dark:bg-slate-950">
          <div className="container mx-auto px-6 py-8">
            <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
              {renderView()}
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
