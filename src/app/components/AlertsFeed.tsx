import React from 'react';
import { alerts } from '../data/mockData';
import { AlertTriangle, Clock, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';

export function AlertsFeed() {
  return (
    <div className="h-full rounded-xl border border-zinc-200 bg-white shadow-sm dark:bg-zinc-950 dark:border-zinc-800">
      <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Active Alerts</h3>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-xs font-medium text-red-600 dark:bg-red-900/30 dark:text-red-400">
          {alerts.length}
        </span>
      </div>
      <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
        {alerts.map((alert) => (
          <div key={alert.id} className="flex gap-4 p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
            <div className={clsx(
              "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full",
              alert.status === 'Critical' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
              alert.status === 'Warning' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' :
              'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
            )}>
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-zinc-900 dark:text-zinc-100">{alert.area}</h4>
                <span className="text-xs text-zinc-500">{alert.time}</span>
              </div>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Status: <span className="font-medium text-zinc-900 dark:text-zinc-50">{alert.status}</span>
              </p>
              <p className="mt-1 text-xs text-zinc-500">Response: {alert.response}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="flex w-full items-center justify-center gap-2 border-t border-zinc-200 p-3 text-sm font-medium text-blue-600 hover:bg-zinc-50 dark:border-zinc-800 dark:text-blue-400 dark:hover:bg-zinc-900/50">
        View All Alerts
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}
