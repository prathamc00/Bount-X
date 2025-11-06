import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';

interface Meetup {
  id: number;
  title: string;
  description: string;
  starts_at: string;
  venue: string;
  topic: string;
  rsvp_url: string;
  tags: string[];
}

const MeetupManagement: React.FC = () => {
  const [meetups, setMeetups] = useState<Meetup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingMeetup, setEditingMeetup] = useState<Meetup | null>(null);

  useEffect(() => {
    loadMeetups();
  }, []);

  const loadMeetups = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getAdminMeetups();
      setMeetups(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load meetups');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: any) => {
    try {
      if (editingMeetup) {
        await apiService.updateMeetup(editingMeetup.id, formData);
      } else {
        await apiService.createMeetup(formData);
      }
      setShowForm(false);
      setEditingMeetup(null);
      loadMeetups();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save meetup');
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this meetup?')) {
      try {
        await apiService.deleteMeetup(id);
        loadMeetups();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete meetup');
      }
    }
  };

  if (loading) {
    return (
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-semibold text-neutral-900">Meetup Management</h1>
        <div className="mt-6 bg-white border border-neutral-200 rounded-lg p-10 shadow-sm text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading meetups...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">Meetup Management</h1>
          <p className="text-neutral-500 mt-1">Manage community meetups and events.</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Meetup
        </button>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
          <button 
            onClick={loadMeetups}
            className="ml-2 text-red-800 underline hover:no-underline"
          >
            Retry
          </button>
        </div>
      )}

      <div className="bg-white border border-neutral-200 rounded-lg shadow-sm">
        {meetups.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-neutral-200">
                <tr>
                  <th className="p-4 font-semibold text-neutral-600">Title</th>
                  <th className="p-4 font-semibold text-neutral-600">Date</th>
                  <th className="p-4 font-semibold text-neutral-600">Venue</th>
                  <th className="p-4 font-semibold text-neutral-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {meetups.map(meetup => (
                  <tr key={meetup.id} className="border-b border-neutral-200 last:border-b-0 hover:bg-neutral-50">
                    <td className="p-4">
                      <div className="font-medium text-neutral-800">{meetup.title}</div>
                      <div className="text-xs text-neutral-500">{meetup.topic}</div>
                    </td>
                    <td className="p-4 text-neutral-600">
                      {new Date(meetup.starts_at).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-neutral-600">{meetup.venue}</td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setEditingMeetup(meetup);
                            setShowForm(true);
                          }}
                          className="px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(meetup.id)}
                          className="px-2 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-md hover:bg-red-200"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-10 text-center text-neutral-500">
            <p className="font-semibold">No meetups found</p>
            <p className="text-sm">Create your first meetup to get started.</p>
          </div>
        )}
      </div>

      {showForm && (
        <MeetupForm
          meetup={editingMeetup}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingMeetup(null);
          }}
        />
      )}
    </div>
  );
};

const MeetupForm: React.FC<{
  meetup: Meetup | null;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}> = ({ meetup, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: meetup?.title || '',
    description: meetup?.description || '',
    starts_at: meetup?.starts_at || '',
    venue: meetup?.venue || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {meetup ? 'Edit Meetup' : 'Add New Meetup'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Date & Time
            </label>
            <input
              type="datetime-local"
              required
              value={formData.starts_at}
              onChange={(e) => setFormData({ ...formData, starts_at: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Venue
            </label>
            <input
              type="text"
              value={formData.venue}
              onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              {meetup ? 'Update' : 'Create'}
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

export default MeetupManagement;