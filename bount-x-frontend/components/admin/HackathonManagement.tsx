import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';

const HackathonManagement: React.FC = () => {
  const [upcomingHackathon, setUpcomingHackathon] = useState<any>(null);
  const [pastWinners, setPastWinners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showUpcomingForm, setShowUpcomingForm] = useState(false);
  const [showWinnerForm, setShowWinnerForm] = useState(false);

  useEffect(() => {
    loadHackathonData();
  }, []);

  const loadHackathonData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [upcoming, winners] = await Promise.all([
        apiService.getAdminHackathons(),
        apiService.getAdminPastWinners()
      ]);
      
      setUpcomingHackathon(upcoming && Object.keys(upcoming).length > 0 ? upcoming : null);
      setPastWinners(Array.isArray(winners) ? winners : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load hackathon data');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUpcoming = async (formData: any) => {
    try {
      await apiService.updateUpcomingHackathon(formData);
      setShowUpcomingForm(false);
      loadHackathonData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update hackathon');
    }
  };

  const handleAddWinner = async (formData: any) => {
    try {
      await apiService.addHackathonWinner(formData);
      setShowWinnerForm(false);
      loadHackathonData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add winner');
    }
  };

  const handleDeleteWinner = async (id: number) => {
    if (confirm('Are you sure you want to delete this winner?')) {
      try {
        await apiService.deleteHackathonWinner(id);
        loadHackathonData();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete winner');
      }
    }
  };

  if (loading) {
    return (
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-semibold text-neutral-900">Hackathon Management</h1>
        <div className="mt-6 bg-white border border-neutral-200 rounded-lg p-10 shadow-sm text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading hackathon data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">Hackathon Management</h1>
        <p className="text-neutral-500 mt-1">Manage hackathon events and winners.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
          <button 
            onClick={loadHackathonData}
            className="ml-2 text-red-800 underline hover:no-underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Upcoming Hackathon Section */}
      <div className="bg-white border border-neutral-200 rounded-lg shadow-sm">
        <div className="p-6 border-b border-neutral-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-neutral-900">Upcoming Hackathon</h2>
          <button
            onClick={() => setShowUpcomingForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {upcomingHackathon ? 'Edit' : 'Add'} Hackathon
          </button>
        </div>
        <div className="p-6">
          {upcomingHackathon ? (
            <div>
              <h3 className="font-semibold text-neutral-800">{upcomingHackathon.title}</h3>
              <p className="text-neutral-600 mt-1">{upcomingHackathon.theme}</p>
              <p className="text-sm text-neutral-500 mt-2">
                {upcomingHackathon.start_date} - {upcomingHackathon.end_date}
              </p>
            </div>
          ) : (
            <p className="text-neutral-500">No upcoming hackathon scheduled.</p>
          )}
        </div>
      </div>

      {/* Past Winners Section */}
      <div className="bg-white border border-neutral-200 rounded-lg shadow-sm">
        <div className="p-6 border-b border-neutral-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-neutral-900">Past Winners</h2>
          <button
            onClick={() => setShowWinnerForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Add Winner
          </button>
        </div>
        <div className="p-6">
          {pastWinners.length > 0 ? (
            <div className="space-y-4">
              {pastWinners.map(winner => (
                <div key={winner.id} className="flex justify-between items-start p-4 border border-neutral-200 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-neutral-800">{winner.name}</h3>
                    <p className="text-neutral-600">{winner.description}</p>
                    <p className="text-sm text-neutral-500 mt-1">
                      Year: {winner.year} | Prize: {winner.prize}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteWinner(winner.id)}
                    className="px-2 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-md hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-neutral-500">No past winners recorded.</p>
          )}
        </div>
      </div>

      {/* Forms */}
      {showUpcomingForm && (
        <HackathonForm
          hackathon={upcomingHackathon}
          onSubmit={handleUpdateUpcoming}
          onCancel={() => setShowUpcomingForm(false)}
        />
      )}

      {showWinnerForm && (
        <WinnerForm
          onSubmit={handleAddWinner}
          onCancel={() => setShowWinnerForm(false)}
        />
      )}
    </div>
  );
};

const HackathonForm: React.FC<{
  hackathon: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}> = ({ hackathon, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: hackathon?.title || '',
    theme: hackathon?.theme || '',
    start_date: hackathon?.start_date || '',
    end_date: hackathon?.end_date || '',
    registration_url: hackathon?.registration_url || '',
    prizes: hackathon?.prizes?.join(', ') || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      prizes: formData.prizes.split(',').map(p => p.trim()).filter(p => p)
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">
          {hackathon ? 'Edit Hackathon' : 'Add Hackathon'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Theme</label>
            <input
              type="text"
              value={formData.theme}
              onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Start Date</label>
            <input
              type="date"
              required
              value={formData.start_date}
              onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">End Date</label>
            <input
              type="date"
              required
              value={formData.end_date}
              onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Registration URL</label>
            <input
              type="url"
              value={formData.registration_url}
              onChange={(e) => setFormData({ ...formData, registration_url: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Prizes (comma-separated)</label>
            <input
              type="text"
              value={formData.prizes}
              onChange={(e) => setFormData({ ...formData, prizes: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="$1000, $500, $250"
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-neutral-200 text-neutral-800 py-2 px-4 rounded-md hover:bg-neutral-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const WinnerForm: React.FC<{
  onSubmit: (data: any) => void;
  onCancel: () => void;
}> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    github_url: '',
    prize: '',
    year: new Date().getFullYear(),
    team: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      team: formData.team.split(',').map(t => t.trim()).filter(t => t)
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Winner</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Project Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Team Members (comma-separated)</label>
            <input
              type="text"
              value={formData.team}
              onChange={(e) => setFormData({ ...formData, team: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe, Jane Smith"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">GitHub URL</label>
            <input
              type="url"
              value={formData.github_url}
              onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Prize</label>
            <input
              type="text"
              value={formData.prize}
              onChange={(e) => setFormData({ ...formData, prize: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="1st Place, $1000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Year</label>
            <input
              type="number"
              required
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
            >
              Add Winner
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-neutral-200 text-neutral-800 py-2 px-4 rounded-md hover:bg-neutral-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HackathonManagement;