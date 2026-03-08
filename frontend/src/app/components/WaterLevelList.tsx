import React from 'react';
import { waterLevels, WaterLevel } from '../data/mockData';
import { AlertTriangle, CheckCircle, Info, TrendingUp, TrendingDown } from 'lucide-react';
import { clsx } from 'clsx';

export function WaterLevelList() {
  const getStatusColor = (status: WaterLevel['status']) => {
    switch (status) {
      case 'Normal':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      case 'Alert':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'Warning':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300';
      case 'Critical':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300';
    }
  };

  const getStatusIcon = (status: WaterLevel['status']) => {
    switch (status) {
      case 'Normal':
        return CheckCircle;
      case 'Alert':
        return Info;
      case 'Warning':
        return AlertTriangle;
      case 'Critical':
        return AlertTriangle;
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:bg-zinc-950 dark:border-zinc-800">
      <div className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Water Level Status</h3>
        <p className="text-xs text-zinc-500">Real-time monitoring across 5 stations</p>
      </div>
      <div className="flex-1 overflow-y-auto p-0">
        <table className="w-full text-left text-sm">
          <thead className="sticky top-0 bg-zinc-50 text-xs font-medium uppercase text-zinc-500 dark:bg-zinc-900/50">
            <tr>
              <th className="px-6 py-3">Station</th>
              <th className="px-6 py-3">Level</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {waterLevels.map((level) => {
              const Icon = getStatusIcon(level.status);
              return (
                <tr key={level.id} className="group transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-zinc-900 dark:text-zinc-100">{level.name}</p>
                    <p className="text-xs text-zinc-500">ID: {level.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-lg font-bold text-zinc-900 dark:text-zinc-50">{level.level}m</span>
                      <span className="text-xs text-zinc-500">({level.percentage}%)</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full max-w-[100px] overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <div
                        className={clsx(
                          "h-full rounded-full transition-all",
                          level.status === 'Critical' ? 'bg-red-500' :
                          level.status === 'Warning' ? 'bg-orange-500' :
                          level.status === 'Alert' ? 'bg-yellow-500' : 'bg-green-500'
                        )}
                        style={{ width: `${level.percentage}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={clsx("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium", getStatusColor(level.status))}>
                      <Icon className="h-3.5 w-3.5" />
                      {level.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-xs text-zinc-500">
                    {level.lastUpdate}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
