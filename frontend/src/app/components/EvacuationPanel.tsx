import React from 'react';
import { evacuationCenters } from '../data/mockData';
import { Home, Users, CheckCircle, Navigation } from 'lucide-react';
import { clsx } from 'clsx';

export function EvacuationPanel() {
  return (
    <div className="h-full rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:bg-zinc-950 dark:border-zinc-800">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Evacuation Centers</h3>
        <button className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">
          Find Nearest
        </button>
      </div>
      <div className="space-y-4">
        {evacuationCenters.map((center, idx) => (
          <div key={idx} className="group relative rounded-lg border border-zinc-200 p-4 transition-all hover:border-blue-200 hover:bg-blue-50/50 dark:border-zinc-800 dark:hover:border-blue-900/50 dark:hover:bg-blue-900/10">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="mt-1 rounded-full bg-blue-100 p-2 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <Home className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-medium text-zinc-900 dark:text-zinc-100">{center.name}</h4>
                  <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
                    <span className={clsx(
                      "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium",
                      center.status === 'Open' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400'
                    )}>
                      {center.status}
                    </span>
                    <span>• {center.type}</span>
                  </div>
                </div>
              </div>
              <button className="rounded-full bg-zinc-100 p-2 text-zinc-600 hover:bg-blue-600 hover:text-white dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-blue-600 dark:hover:text-white transition-colors">
                <Navigation className="h-4 w-4" />
              </button>
            </div>
            
            <div className="mt-4">
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-zinc-500">Capacity</span>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">{center.capacity}</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                <div 
                  className={clsx(
                    "h-full rounded-full transition-all duration-500",
                    parseInt(center.capacity) > 80 ? 'bg-red-500' : 'bg-green-500'
                  )}
                  style={{ width: center.capacity }} 
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
