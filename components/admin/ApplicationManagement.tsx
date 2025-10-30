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
    return <Icon className="w-5 h-5 text-neutral-600" />;
  };

  return (
    <div className="animate-fade-in-up">
      <div className="mb-6">
          <h1 className="text-2xl font-semibold text-neutral-900">Application Management</h1>
          <p className="text-neutral-500 mt-1">Review and manage member applications.</p>
      </div>
      
      <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full sm:w-auto bg-white border border-neutral-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-neutral-800 placeholder:text-neutral-400 text-sm"
          />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as ApplicationStatus | 'all')}
            className="w-full sm:w-auto bg-white border border-neutral-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-neutral-800 text-sm"
          >
            <option value="all">All Statuses</option>
            <option value={ApplicationStatus.PENDING}>Pending</option>
            <option value={ApplicationStatus.APPROVED}>Approved</option>
            <option value={ApplicationStatus.REJECTED}>Rejected</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-neutral-200">
              <tr>
                <th className="p-3 font-semibold text-neutral-600">Applicant</th>
                <th className="p-3 font-semibold text-neutral-600">Skill</th>
                <th className="p-3 font-semibold text-neutral-600">Submitted</th>
                <th className="p-3 font-semibold text-neutral-600">Status</th>
                <th className="p-3 font-semibold text-neutral-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.length > 0 ? (
                filteredApplications.map(app => (
                  <tr key={app.id} className="border-b border-neutral-200 last:border-b-0 hover:bg-neutral-50">
                    <td className="p-3 text-neutral-800 font-medium">
                      <div>{app.name}</div>
                      <div className="text-xs text-neutral-500">{app.email}</div>
                    </td>
                    <td className="p-3 text-neutral-600">
                      <div className="flex items-center space-x-2">
                        <SkillIcon skill={app.skill} />
                        <span>{app.skill}</span>
                      </div>
                    </td>
                    <td className="p-3 text-neutral-500">{new Date(app.submittedAt).toLocaleDateString()}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        app.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        app.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <button onClick={() => handleStatusChange(app.id, ApplicationStatus.APPROVED)} className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-md hover:bg-green-200 disabled:opacity-50" disabled={app.status === 'Approved'}>Approve</button>
                        <button onClick={() => handleStatusChange(app.id, ApplicationStatus.REJECTED)} className="px-2 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-md hover:bg-red-200 disabled:opacity-50" disabled={app.status === 'Rejected'}>Reject</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center p-6 text-neutral-500">
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApplicationManagement;