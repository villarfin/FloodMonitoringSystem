import React, { useState } from 'react';
import { waterLevels } from '../data/mockData';
import { clsx } from 'clsx';
import { MapPin, Info } from 'lucide-react';

export function MapWidget() {
  const [activeMarker, setActiveMarker] = useState<string | null>(null);

  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
      {/* Background Map Image */}
      <img
        src="https://images.unsplash.com/photo-1769184615939-00913575f62a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3BvZ3JhcGhpYyUyMHJpdmVyJTIwbWFwfGVufDF8fHx8MTc3MjI5MjY2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        alt="Map"
        className="h-full w-full object-cover opacity-80 mix-blend-multiply dark:opacity-60"
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

      {/* Markers */}
      {waterLevels.map((level) => (
        <div
          key={level.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
          style={{ top: `${level.lat}%`, left: `${level.lng}%` }}
          onClick={() => setActiveMarker(activeMarker === level.id ? null : level.id)}
        >
          <div className="relative">
            <span className={clsx(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
              level.status === 'Critical' ? 'bg-red-400' :
              level.status === 'Warning' ? 'bg-orange-400' :
              level.status === 'Alert' ? 'bg-yellow-400' : 'bg-green-400'
            )}></span>
            <div className={clsx(
              "relative inline-flex items-center justify-center rounded-full border-2 border-white p-2 shadow-md transition-transform hover:scale-110",
              level.status === 'Critical' ? 'bg-red-500' :
              level.status === 'Warning' ? 'bg-orange-500' :
              level.status === 'Alert' ? 'bg-yellow-500' : 'bg-green-500'
            )}>
              <MapPin className="h-4 w-4 text-white" />
            </div>

            {/* Tooltip */}
            {activeMarker === level.id && (
              <div className="absolute bottom-full left-1/2 mb-2 w-48 -translate-x-1/2 rounded-lg bg-white p-3 shadow-xl z-10 dark:bg-zinc-800 animate-in fade-in zoom-in duration-200">
                <div className="mb-1 flex items-center justify-between">
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">{level.name}</h4>
                  <span className={clsx(
                    "h-2 w-2 rounded-full",
                    level.status === 'Critical' ? 'bg-red-500' : 'bg-green-500'
                  )} />
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                  <p>Level: {level.level}m ({level.percentage}%)</p>
                  <p>Status: {level.status}</p>
                  <p className="mt-1 text-[10px] text-zinc-400">Updated {level.lastUpdate}</p>
                </div>
                <div className="absolute bottom-[-6px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-white dark:bg-zinc-800 border-b border-r border-zinc-200 dark:border-zinc-800"></div>
              </div>
            )}
          </div>
        </div>
      ))}

      <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-lg shadow-sm text-xs backdrop-blur-sm dark:bg-zinc-900/90">
        <h4 className="font-bold mb-1 px-1">Risk Levels</h4>
        <div className="flex items-center gap-2 p-1"><div className="w-2 h-2 rounded-full bg-green-500" /> Normal</div>
        <div className="flex items-center gap-2 p-1"><div className="w-2 h-2 rounded-full bg-yellow-500" /> Alert</div>
        <div className="flex items-center gap-2 p-1"><div className="w-2 h-2 rounded-full bg-orange-500" /> Warning</div>
        <div className="flex items-center gap-2 p-1"><div className="w-2 h-2 rounded-full bg-red-500" /> Critical</div>
      </div>
    </div>
  );
}
