import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';

interface Metric {
  id: number;
  key_name: string;
  value: number;
  description: string;
  updated_at: string;
}

const MetricsManagement: React.FC = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingMetric, setEditingMetric] = useState<Metric | null>(null);
  const [newValue, setNewValue] = useState('');

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getMetrics();
      setMetrics(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load metrics');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateMetric = async (id: number, value: number) => {
    try {
      await apiService.updateMetric(id, value);
      setEditingMetric(null);
      setNewValue('');
      loadMetrics();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update metric');
    }
  };

  const startEditing = (metric: Metric) => {
    setEditingMetric(metric);
    setNewValue(metric.value.toString());
  };

  const cancelEditing = () => {
    setEditingMetric(null);
    setNewValue('');
  };

  const getMetricDisplayName = (keyName: string) => {
    const displayNames: { [key: string]: string } = {
      'newMembers': 'New Members (30d)',
      'applicationsPending': 'Applications Pending',
      'upcomingEvents': 'Upcoming Events',
      'activeProjects': 'Active Projects'
    };
    return displayNames[keyName] || keyName;
  };

  const getMetricIcon = (keyName: string) => {
    switch (keyName) {
      case 'newMembers':
        return '👥';
      case 'applicationsPending':
        return '📝';
      case 'upcomingEvents':
        return '📅';
      case 'activeProjects':
        return '🚀';
      default:
        return '📊';
    }
  };

  if (loading) {
    return (
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-semibold text-neutral-900">Metrics Management</h1>
        <div className="mt-6 bg-white border border-neutral-200 rounded-lg p-10 shadow-sm text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading metrics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-neutral-900">Metrics Management</h1>
        <p className="text-neutral-500 mt-1">Manage key performance indicators and metrics.</p>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
          <button 
            onClick={loadMetrics}
            className="ml-2 text-red-800 underline hover:no-underline"
          >
            Retry
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map(metric => (
          <div key={metric.id} className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl">{getMetricIcon(metric.key_name)}</div>
              <button
                onClick={() => startEditing(metric)}
                className="px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200"
              >
                Edit
              </button>
            </div>
            <h3 className="text-sm font-medium text-neutral-600 mb-2">
              {getMetricDisplayName(metric.key_name)}
            </h3>
            <div className="text-3xl font-bold text-neutral-900 mb-2">
              {metric.value.toLocaleString()}
            </div>
            <p className="text-xs text-neutral-500">
              Last updated: {new Date(metric.updated_at).toLocaleDateString()}
            </p>
            {metric.description && (
              <p className="text-xs text-neutral-600 mt-2">{metric.description}</p>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white border border-neutral-200 rounded-lg shadow-sm">
        <div className="p-6 border-b border-neutral-200">
          <h2 className="text-lg font-semibold text-neutral-900">Detailed Metrics</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-neutral-200">
              <tr>
                <th className="p-4 font-semibold text-neutral-600">Metric</th>
                <th className="p-4 font-semibold text-neutral-600">Current Value</th>
                <th className="p-4 font-semibold text-neutral-600">Description</th>
                <th className="p-4 font-semibold text-neutral-600">Last Updated</th>
                <th className="p-4 font-semibold text-neutral-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map(metric => (
                <tr key={metric.id} className="border-b border-neutral-200 last:border-b-0 hover:bg-neutral-50">
                  <td className="p-4">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">{getMetricIcon(metric.key_name)}</span>
                      <span className="font-medium text-neutral-800">
                        {getMetricDisplayName(metric.key_name)}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-2xl font-bold text-neutral-900">
                      {metric.value.toLocaleString()}
                    </span>
                  </td>
                  <td className="p-4 text-neutral-600">
                    {metric.description || 'No description'}
                  </td>
                  <td className="p-4 text-neutral-500">
                    {new Date(metric.updated_at).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => startEditing(metric)}
                      className="px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200"
                    >
                      Update Value
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingMetric && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              Update {getMetricDisplayName(editingMetric.key_name)}
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Current Value: {editingMetric.value}
              </label>
              <input
                type="number"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new value"
                min="0"
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => handleUpdateMetric(editingMetric.id, parseInt(newValue) || 0)}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                disabled={!newValue || isNaN(parseInt(newValue))}
              >
                Update
              </button>
              <button
                onClick={cancelEditing}
                className="flex-1 bg-neutral-200 text-neutral-800 py-2 px-4 rounded-md hover:bg-neutral-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MetricsManagement;