import React, { useState, Suspense, lazy } from 'react';
import Sidebar from './Sidebar';
import { useTheme } from '../../context/ThemeContext';
import { UsersIcon } from '../Icons';

const DashboardHome = lazy(() => import('./DashboardHome'));
const ApplicationManagement = lazy(() => import('./ApplicationManagement'));
const MeetupManagement = lazy(() => import('./MeetupManagement'));
const HackathonManagement = lazy(() => import('./HackathonManagement'));
const BuildProjectManagement = lazy(() => import('./BuildProjectManagement'));
const MetricsManagement = lazy(() => import('./MetricsManagement'));

export type AdminView = 
  'dashboard' | 
  'applications' | 
  'meetups' | 
  'hackathons' | 
  'build-projects' | 
  'member-management' |
  'metrics';

const MemberManagement = () => (
    <div className="animate-fade-in-up">
        <h1 className="text-2xl font-semibold text-neutral-900">Member Management</h1>
        <p className="text-neutral-500 mt-1">Manage community members and view profiles.</p>
        <div className="mt-6 bg-white border border-neutral-200 rounded-lg p-10 shadow-sm text-center text-neutral-500">
            <UsersIcon className="w-12 h-12 mx-auto text-neutral-300" />
            <p className="mt-4 font-semibold">Member management is not yet available.</p>
            <p className="text-sm">This section will allow you to view member details, roles, and activities.</p>
        </div>
    </div>
);


const AdminDashboard: React.FC = () => {
  const [view, setView] = useState<AdminView>('dashboard');

  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return <DashboardHome />;
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
      case 'member-management':
         return <MemberManagement />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className={`flex h-screen bg-neutral-50 font-sans text-neutral-800`}>
      <Sidebar currentView={view} setView={setView} />
      <main className="flex-1 flex flex-col overflow-hidden z-10">
        <div className="flex-1 overflow-x-hidden overflow-y-auto">
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