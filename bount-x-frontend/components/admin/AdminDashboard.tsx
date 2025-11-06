import React, { useState, Suspense, lazy, useEffect } from 'react';
import Sidebar from './Sidebar';
import { UsersIcon } from '../Icons';
import AdminLogin from './AdminLogin';
import { apiService } from '../../services/api';

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('bountx_admin_token');
    if (token) {
      // Verify token by making a test API call
      apiService.getKPIs()
        .then(() => {
          setIsAuthenticated(true);
        })
        .catch(() => {
          // Token is invalid, remove it
          localStorage.removeItem('bountx_admin_token');
          setIsAuthenticated(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    apiService.adminLogout();
    setIsAuthenticated(false);
    setView('dashboard');
  };

  if (isLoading) {
    return (
      <div className="flex h-screen bg-neutral-50 items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

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
      <Sidebar currentView={view} setView={setView} onLogout={handleLogout} />
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