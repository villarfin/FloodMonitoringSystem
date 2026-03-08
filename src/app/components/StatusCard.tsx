import React, { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';

interface StatusCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  color?: 'blue' | 'red' | 'green' | 'yellow';
}

export function StatusCard({ title, value, change, trend, icon: Icon, color = 'blue' }: StatusCardProps) {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    red: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
    green: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
    yellow: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:bg-zinc-950 dark:border-zinc-800 transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">{value}</p>
        </div>
        <div className={clsx("rounded-lg p-3", colorMap[color])}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      {change && (
        <div className="mt-4 flex items-center text-sm">
          <span
            className={clsx(
              "font-medium",
              trend === 'up' ? "text-red-600" : trend === 'down' ? "text-green-600" : "text-zinc-500"
            )}
          >
            {change}
          </span>
          <span className="ml-2 text-zinc-500">from last hour</span>
        </div>
      )}
    </div>
  );
}
