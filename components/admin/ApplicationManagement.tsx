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
      <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Application Management</h1>
          <p className="text-slate-400 mt-1">Review and manage member applications.</p>
      </div>
      
      <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700/80 rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full sm:w-auto bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-white placeholder:text-slate-400"
          />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as ApplicationStatus | 'all')}
            className="w-full sm:w-auto bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
          >
            <option value="all">All Statuses</option>
            <option value={ApplicationStatus.PENDING}>Pending</option>
            <option value={ApplicationStatus.APPROVED}>Approved</option>
            <option value={ApplicationStatus.REJECTED}>Rejected</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-slate-700">
              <tr>
                <th className="p-3 text-sm font-semibold text-slate-400">Applicant</th>
                <th className="p-3 text-sm font-semibold text-slate-400">Skill</th>
                <th className="p-3 text-sm font-semibold text-slate-400">Submitted</th>
                <th className="p-3 text-sm font-semibold text-slate-400">Status</th>
                <th className="p-3 text-sm font-semibold text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map(app => (
                <tr key={app.id} className="border-b border-slate-800 last:border-b-0 hover:bg-slate-800/50">
                  <td className="p-3 text-white font-medium">
                    <div>{app.name}</div>
                    <div className="text-xs text-slate-400">{app.email}</div>
                  </td>
                  <td className="p-3 text-slate-300">
                    <div className="flex items-center space-x-2">
                      <SkillIcon skill={app.skill} />
                      <span>{app.skill}</span>
                    </div>
                  </td>
                   <td className="p-3 text-slate-400">{new Date(app.submittedAt).toLocaleDateString()}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      app.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-300' :
                      app.status === 'Approved' ? 'bg-green-500/20 text-green-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                       <button onClick={() => handleStatusChange(app.id, ApplicationStatus.APPROVED)} className="px-2 py-1 text-xs font-semibold text-green-300 bg-green-500/20 rounded-md hover:bg-green-500/30 disabled:opacity-50" disabled={app.status === 'Approved'}>Approve</button>
                       <button onClick={() => handleStatusChange(app.id, ApplicationStatus.REJECTED)} className="px-2 py-1 text-xs font-semibold text-red-300 bg-red-500/20 rounded-md hover:bg-red-500/30 disabled:opacity-50" disabled={app.status === 'Rejected'}>Reject</button>
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