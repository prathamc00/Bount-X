import React, { useState } from 'react';
import { communityMetrics as mockMetrics } from '../../data/mockData';
import { CommunityMetric } from '../../types';
import { PencilIcon } from '../Icons';

const MetricsManagement: React.FC = () => {
  const [metrics, setMetrics] = useState<CommunityMetric[]>(mockMetrics);

  return (
    <div className="animate-fade-in-up">
      <div className="mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Community Metrics</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage the stats displayed on the main site.</p>
        </div>
      </div>
      
      <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-6 shadow-lg">
        {metrics.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map(metric => (
              <div key={metric.id} className="bg-slate-200/50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-xl p-4">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{metric.label}</p>
                <p className="text-4xl font-bold text-fuchsia-600 dark:text-fuchsia-400 my-2">
                  {metric.value.toLocaleString()}
                  {metric.unit}
                </p>
                <button className="flex items-center space-x-1 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-fuchsia-500 dark:hover:text-fuchsia-400 transition-colors">
                  <PencilIcon className="w-3 h-3" />
                  <span>Edit</span>
                </button>
              </div>
            ))}
          </div>
        ) : (
           <div className="text-center p-6">
            <p className="text-slate-500 dark:text-slate-400">No community metrics have been configured.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricsManagement;