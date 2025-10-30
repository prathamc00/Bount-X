import React, { useState } from 'react';
import { communityMetrics as mockMetrics } from '../../data/mockData';
import { CommunityMetric } from '../../types';
import { PencilIcon } from '../Icons';

const MetricsManagement: React.FC = () => {
  const [metrics, setMetrics] = useState<CommunityMetric[]>(mockMetrics);

  return (
    <div className="animate-fade-in-up">
      <div className="mb-6">
          <h1 className="text-2xl font-semibold text-neutral-900">Community Metrics</h1>
          <p className="text-neutral-500 mt-1">Manage the stats displayed on the main site.</p>
      </div>
      
      <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm">
        {metrics.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map(metric => (
              <div key={metric.id} className="bg-neutral-50 border border-neutral-200 rounded-xl p-4">
                <p className="text-sm font-medium text-neutral-600">{metric.label}</p>
                <p className="text-4xl font-bold text-blue-600 my-2">
                  {metric.value.toLocaleString()}
                  {metric.unit}
                </p>
                <button className="flex items-center space-x-1 text-xs font-semibold text-neutral-500 hover:text-blue-600 transition-colors">
                  <PencilIcon className="w-3 h-3" />
                  <span>Edit</span>
                </button>
              </div>
            ))}
          </div>
        ) : (
           <div className="text-center p-6">
            <p className="text-neutral-500">No community metrics have been configured.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricsManagement;