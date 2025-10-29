import React, { useState, useMemo } from 'react';
import { applications as mockApplications } from '../../data/mockData';
import { Application, ApplicationStatus, Skill, ExperienceLevel } from '../../types';
import { HackerIcon, DesignIcon, CodeIcon } from '../Icons';

const ApplicationManagement: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'all'>('all');

  const filteredApplications = useMemo(() => {
    return applications
      .filter(app => statusFilter === 'all' || app.status === statusFilter)
      .filter(app =>
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [applications, searchTerm, statusFilter]);

  const handleStatusChange = (id: string, newStatus: ApplicationStatus) => {
    setApplications(apps => apps.map(app => app.id === id ? { ...app, status: newStatus } : app));
  };
  
  const SkillIcon = ({ skill }: { skill: Skill | '' }) => {
    const Icon = {
      Hacker: HackerIcon,
      Designer: DesignIcon,
      Developer: CodeIcon,
    }[skill || 'Developer'];
    return <Icon className="w-5 h-5" />;
  };

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-4xl font-bold font-mono text-slate-900 dark:text-white tracking-tight">Applications</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Review and manage member applications.</p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full sm:w-auto bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none transition-colors"
          />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as ApplicationStatus | 'all')}
            className="w-full sm:w-auto bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none transition-colors"
          >
            <option value="all">All Statuses</option>
            <option value={ApplicationStatus.PENDING}>Pending</option>
            <option value={ApplicationStatus.APPROVED}>Approved</option>
            <option value={ApplicationStatus.REJECTED}>Rejected</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Applicant</th>
                <th className="p-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Skill</th>
                <th className="p-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Submitted</th>
                <th className="p-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Status</th>
                <th className="p-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map(app => (
                <tr key={app.id} className="border-b border-slate-200 dark:border-slate-800 last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 text-slate-800 dark:text-slate-200 font-medium">
                    <div>{app.name}</div>
                    <div className="text-xs text-slate-500">{app.email}</div>
                  </td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">
                    <div className="flex items-center space-x-2">
                      <SkillIcon skill={app.skill} />
                      <span>{app.skill}</span>
                    </div>
                  </td>
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
                  <td className="p-3">
                    <div className="flex space-x-2">
                       <button onClick={() => handleStatusChange(app.id, ApplicationStatus.APPROVED)} className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-500/20 rounded-md hover:bg-green-500/30 disabled:opacity-50" disabled={app.status === 'Approved'}>Approve</button>
                       <button onClick={() => handleStatusChange(app.id, ApplicationStatus.REJECTED)} className="px-2 py-1 text-xs font-semibold text-red-700 bg-red-500/20 rounded-md hover:bg-red-500/30 disabled:opacity-50" disabled={app.status === 'Rejected'}>Reject</button>
                    </div>
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

export default ApplicationManagement;
