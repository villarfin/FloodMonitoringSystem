import React from 'react';
import { LayoutDashboard, Map, BarChart3, BellRing, Settings, LifeBuoy, Users, Activity } from 'lucide-react';
import { NavLink } from 'react-router';
import { clsx } from 'clsx';

export function Sidebar() {
  const links = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Map View', href: '/map', icon: Map },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Alerts', href: '/alerts', icon: BellRing },
    { name: 'Stations', href: '/stations', icon: Activity },
    { name: 'Users', href: '/users', icon: Users },
  ];

  const bottomLinks = [
    { name: 'Support', href: '/support', icon: LifeBuoy },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 lg:flex">
      <div className="flex h-16 items-center border-b border-slate-200 px-6 dark:border-slate-800">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Flood Monitor</h2>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto py-4">
        <nav className="flex-1 space-y-1 px-4">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
                )
              }
            >
              <link.icon className="h-5 w-5 flex-shrink-0" />
              {link.name}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto border-t border-slate-200 px-4 pt-4 dark:border-slate-800">
          <nav className="space-y-1">
            {bottomLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
                  )
                }
              >
                <link.icon className="h-5 w-5 flex-shrink-0" />
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}
