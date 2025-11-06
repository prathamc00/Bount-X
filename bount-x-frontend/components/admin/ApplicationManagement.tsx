import React, { useState, useMemo, useEffect } from 'react';
import { Application, ApplicationStatus, Skill, ExperienceLevel } from '../../types';
import { HackerIcon, DesignIcon, CodeIcon } from '../Icons';
import { apiService } from '../../services/api';

const ApplicationManagement: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'all'>('all');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  useEffect(() => {
    loadApplications();
  }, [statusFilter, searchTerm]);

  const loadApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      const filters: any = {};
      if (statusFilter !== 'all') filters.status = statusFilter;
      if (searchTerm) filters.q = searchTerm;
      
      const data = await apiService.getApplications(filters);
      setApplications(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const filteredApplications = useMemo(() => {
    return applications
      .filter(app => statusFilter === 'all' || app.status === statusFilter)
      .filter(app =>
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [applications, searchTerm, statusFilter]);

  const handleStatusChange = async (id: string, newStatus: ApplicationStatus) => {
    try {
      await apiService.updateApplicationStatus(parseInt(id), newStatus);
      // Update local state
      setApplications(apps => apps.map(app => app.id === id ? { ...app, status: newStatus } : app));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update application status');
    }
  };
  
  const SkillIcon = ({ skill }: { skill: Skill | '' }) => {
    const Icon = {
      Hacker: HackerIcon,
      Designer: DesignIcon,
      Developer: CodeIcon,
    }[skill || 'Developer'];
    return <Icon className="w-5 h-5 text-neutral-600" />;
  };

  if (loading) {
    return (
      <div className="animate-fade-in-up">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-neutral-900">Application Management</h1>
          <p className="text-neutral-500 mt-1">Review and manage member applications.</p>
        </div>
        <div className="bg-white border border-neutral-200 rounded-lg p-10 shadow-sm text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up">
      <div className="mb-6">
          <h1 className="text-2xl font-semibold text-neutral-900">Application Management</h1>
          <p className="text-neutral-500 mt-1">Review and manage member applications.</p>
      </div>
      
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
          <button 
            onClick={loadApplications}
            className="ml-2 text-red-800 underline hover:no-underline"
          >
            Retry
          </button>
        </div>
      )}
      
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
                      <button
                        onClick={() => setSelectedApplication(app)}
                        className="text-left hover:text-blue-600 transition-colors cursor-pointer group"
                      >
                        <div className="font-medium group-hover:underline">{app.name}</div>
                        <div className="text-xs text-neutral-500">{app.email}</div>
                      </button>
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

      {/* Application Details Modal */}
      {selectedApplication && (
        <ApplicationDetailsModal
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
          onStatusUpdate={handleStatusChange}
        />
      )}
    </div>
  );
};

// Application Details Modal Component
const ApplicationDetailsModal: React.FC<{
  application: Application;
  onClose: () => void;
  onStatusUpdate: (id: string, status: ApplicationStatus) => void;
}> = ({ application, onClose, onStatusUpdate }) => {
  const SkillIcon = {
    Hacker: HackerIcon,
    Designer: DesignIcon,
    Developer: CodeIcon,
  }[application.skill || 'Developer'];

  const handleStatusUpdate = (newStatus: ApplicationStatus) => {
    onStatusUpdate(application.id, newStatus);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-neutral-200">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-semibold text-neutral-900">Application Details</h2>
              <p className="text-neutral-500 mt-1">Review complete application information</p>
            </div>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
              application.status === ApplicationStatus.PENDING ? 'bg-yellow-100 text-yellow-800' :
              application.status === ApplicationStatus.APPROVED ? 'bg-green-100 text-green-800' :
              'bg-red-100 text-red-800'
            }`}>
              {application.status}
            </span>
            <span className="text-sm text-neutral-500">
              Submitted: {new Date(application.submittedAt).toLocaleDateString()}
            </span>
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Personal Information</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-neutral-600">Full Name</label>
                  <p className="text-neutral-900 font-medium">{application.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-600">Email Address</label>
                  <p className="text-neutral-900">{application.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-600">Phone Number</label>
                  <p className="text-neutral-900">{application.phone}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Skills & Experience</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-neutral-600">Primary Skill</label>
                  <div className="flex items-center mt-1">
                    <SkillIcon className="w-5 h-5 text-neutral-600 mr-2" />
                    <span className="text-neutral-900 font-medium">{application.skill}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-600">Experience Level</label>
                  <p className="text-neutral-900 font-medium">{application.experience}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-600">Portfolio/GitHub</label>
                  <a 
                    href={application.portfolioUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline break-all"
                  >
                    {application.portfolioUrl}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Motivation */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Why they want to join BounT-X</h3>
            <div className="bg-neutral-50 rounded-lg p-4">
              <p className="text-neutral-700 leading-relaxed">{application.reason}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-neutral-200 bg-neutral-50">
          <div className="flex justify-between items-center">
            <button
              onClick={onClose}
              className="px-4 py-2 text-neutral-600 hover:text-neutral-800 transition-colors"
            >
              Close
            </button>
            <div className="flex space-x-3">
              {application.status !== ApplicationStatus.REJECTED && (
                <button
                  onClick={() => handleStatusUpdate(ApplicationStatus.REJECTED)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Reject
                </button>
              )}
              {application.status !== ApplicationStatus.APPROVED && (
                <button
                  onClick={() => handleStatusUpdate(ApplicationStatus.APPROVED)}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Approve
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationManagement;