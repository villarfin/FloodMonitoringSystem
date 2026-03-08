import React from 'react';
import { Home, BarChart2, Map, Users, Settings, Activity, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { clsx } from 'clsx';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const location = useLocation();

  const links = [
    { name: 'Dashboard', icon: Home, path: '/' },
    { name: 'Map View', icon: Map, path: '/map' },
    { name: 'Reports', icon: BarChart2, path: '/reports' },
    { name: 'Alerts', icon: AlertTriangle, path: '/alerts' },
    { name: 'Evacuation', icon: ShieldCheck, path: '/evacuation' },
    { name: 'System Health', icon: Activity, path: '/system' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 transform border-r bg-white transition-transform duration-200 ease-in-out dark:bg-zinc-950 dark:border-zinc-800 md:sticky md:top-16 md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={clsx(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                      : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800/50"
                  )}
                >
                  <link.icon className="h-5 w-5" />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto border-t border-zinc-200 px-4 py-4 dark:border-zinc-800">
            <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
              <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100">System Status</h4>
              <p className="mt-1 text-xs text-blue-700 dark:text-blue-300">All systems operational</p>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-blue-200 dark:bg-blue-800">
                <div className="h-full w-full bg-green-500" />
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
