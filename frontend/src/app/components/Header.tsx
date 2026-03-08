import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center gap-4 border-b bg-white px-6 shadow-sm dark:bg-zinc-950 dark:border-zinc-800">
      <button 
        onClick={onMenuClick} 
        className="md:hidden p-2 hover:bg-zinc-100 rounded-md dark:hover:bg-zinc-800"
      >
        <Menu className="h-5 w-5 text-zinc-500" />
      </button>

      <div className="flex items-center gap-2 font-semibold text-lg md:text-xl text-blue-600 dark:text-blue-400">
        <span className="hidden md:inline">FloodWatch</span>
        <span className="md:hidden">FW</span>
      </div>

      <div className="flex-1 flex justify-center max-w-lg mx-auto">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
          <input
            type="search"
            placeholder="Search stations, areas..."
            className="w-full rounded-full bg-zinc-100 pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900 dark:text-white"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <button className="relative p-2 hover:bg-zinc-100 rounded-full dark:hover:bg-zinc-800">
          <Bell className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-zinc-950"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-zinc-200 dark:border-zinc-800">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Alex Morgan</p>
            <p className="text-xs text-zinc-500">System Admin</p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1701463387028-3947648f1337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB1c2VyJTIwcHJvZmlsZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MjI2NDI2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="User"
            className="h-9 w-9 rounded-full object-cover border border-zinc-200 dark:border-zinc-700"
          />
        </div>
      </div>
    </header>
  );
}
