import React from 'react';
import { systemStatus } from '../data/mockData';
import { Wifi, Battery, Activity, Server, Clock } from 'lucide-react';

export function SystemStatus() {
  return (
    <div className="h-full rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:bg-zinc-950 dark:border-zinc-800">
      <h3 className="mb-6 font-semibold text-zinc-900 dark:text-zinc-50">System Health</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 rounded-lg bg-green-50 p-4 border border-green-100 dark:bg-green-900/10 dark:border-green-900/20">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-green-100 p-2 text-green-600 dark:bg-green-900/30 dark:text-green-400">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-900 dark:text-green-100">All Systems Operational</p>
              <p className="text-xs text-green-700 dark:text-green-300">Last check: Just now</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-4 dark:bg-zinc-900/50 dark:border-zinc-800">
          <div className="flex items-center gap-2 text-zinc-500 mb-2">
            <Wifi className="h-4 w-4" />
            <span className="text-xs font-medium">Network</span>
          </div>
          <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{systemStatus.networkStrength}</p>
        </div>

        <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-4 dark:bg-zinc-900/50 dark:border-zinc-800">
          <div className="flex items-center gap-2 text-zinc-500 mb-2">
            <Battery className="h-4 w-4" />
            <span className="text-xs font-medium">Battery</span>
          </div>
          <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{systemStatus.batteryLevel}</p>
        </div>

        <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-4 dark:bg-zinc-900/50 dark:border-zinc-800">
          <div className="flex items-center gap-2 text-zinc-500 mb-2">
            <Server className="h-4 w-4" />
            <span className="text-xs font-medium">Sensors</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{systemStatus.sensorsOnline}</span>
            <span className="text-xs text-zinc-500">/ {systemStatus.sensorsTotal}</span>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-4 dark:bg-zinc-900/50 dark:border-zinc-800">
          <div className="flex items-center gap-2 text-zinc-500 mb-2">
            <Clock className="h-4 w-4" />
            <span className="text-xs font-medium">Last Sync</span>
          </div>
          <p className="text-xs font-bold text-zinc-900 dark:text-zinc-50 truncate" title={systemStatus.lastSync}>
            {systemStatus.lastSync.split(' ')[1]}
          </p>
        </div>
      </div>
    </div>
  );
}
