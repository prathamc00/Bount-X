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

  // FIX: Define renderView function to switch between admin components
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
    <div className={`flex h-screen bg-slate-100 dark:bg-slate-950 font-sans text-slate-700 dark:text-slate-300 relative overflow-hidden`}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,rgba(192,38,211,0.15)_0%,rgba(248,250,252,0)_60%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(192,38,211,0.2)_0%,rgba(8,13,36,0)_60%)] z-0 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[100%] h-[100%] bg-[radial-gradient(ellipse_at_bottom_right,rgba(37,99,235,0.15)_0%,rgba(248,250,252,0)_60%)] dark:bg-[radial-gradient(ellipse_at_bottom_right,rgba(37,99,235,0.2)_0%,rgba(8,13,36,0)_60%)] z-0 pointer-events-none"></div>
      
      <Sidebar currentView={view} setView={setView} />
      <main className="flex-1 flex flex-col overflow-hidden z-10">
        <div className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="container mx-auto px-6 py-8">
            <Suspense fallback={<div className="text-center p-10">Loading Dashboard...</div>}>
              {renderView()}
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;