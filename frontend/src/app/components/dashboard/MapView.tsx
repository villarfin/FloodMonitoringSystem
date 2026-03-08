import { MapPin, ZoomIn, ZoomOut, Maximize } from "lucide-react";
import { useState } from "react";

const stations = [
  { id: 1, name: "North Dam", x: 20, y: 30, status: "Normal", level: 3.2 },
  { id: 2, name: "East River Junction", x: 65, y: 45, status: "Warning", level: 7.4 },
  { id: 3, name: "Coastal Outlet", x: 80, y: 80, status: "Alert", level: 5.1 },
  { id: 4, name: "South Bridge", x: 40, y: 70, status: "Normal", level: 2.8 },
  { id: 5, name: "West Valley", x: 15, y: 60, status: "Critical", level: 9.1 },
];

export function MapView() {
  const [selectedStation, setSelectedStation] = useState<number | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Normal": return "bg-emerald-500 ring-emerald-200";
      case "Alert": return "bg-amber-400 ring-amber-200";
      case "Warning": return "bg-orange-500 ring-orange-200";
      case "Critical": return "bg-red-600 ring-red-200";
      default: return "bg-slate-500 ring-slate-200";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-[400px] flex flex-col relative">
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white z-10">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-indigo-500" />
          Interactive Monitoring Map
        </h3>
        <div className="flex gap-2">
          <button className="p-1.5 hover:bg-slate-100 rounded text-slate-500 transition-colors">
            <ZoomIn className="w-4 h-4" />
          </button>
          <button className="p-1.5 hover:bg-slate-100 rounded text-slate-500 transition-colors">
            <ZoomOut className="w-4 h-4" />
          </button>
          <button className="p-1.5 hover:bg-slate-100 rounded text-slate-500 transition-colors">
            <Maximize className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 relative bg-slate-100 overflow-hidden cursor-move">
        {/* Placeholder Map Background - Using a subtle grid pattern to simulate a map */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:40px_40px] opacity-40"></div>
        
        {/* Simplified SVG Map Shape */}
        <svg className="absolute inset-0 w-full h-full text-slate-200 pointer-events-none" fill="currentColor">
           <path d="M0,100 Q300,400 600,200 T1200,300 L1200,800 L0,800 Z" className="text-blue-50/50" />
           <path d="M-100,500 Q400,600 800,400 T1400,300" stroke="#93c5fd" strokeWidth="8" fill="none" strokeLinecap="round" className="opacity-40" />
           <path d="M200,800 C400,700 300,200 600,100" stroke="#cbd5e1" strokeWidth="4" fill="none" strokeDasharray="10 5" />
        </svg>

        {stations.map((station) => (
          <div
            key={station.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{ left: `${station.x}%`, top: `${station.y}%` }}
            onClick={() => setSelectedStation(selectedStation === station.id ? null : station.id)}
          >
            {/* Ping animation for alerts/warnings */}
            {(station.status === "Warning" || station.status === "Critical") && (
              <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${getStatusColor(station.status).split(' ')[0]}`}></span>
            )}
            
            <div className={`relative flex items-center justify-center w-4 h-4 sm:w-6 sm:h-6 rounded-full border-2 border-white ring-4 transition-all duration-300 ${getStatusColor(station.status)} shadow-lg hover:scale-110`}>
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>

            {/* Tooltip */}
            <div 
              className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-white px-3 py-2 rounded-lg shadow-xl text-xs whitespace-nowrap z-20 transition-all duration-200 pointer-events-none border border-slate-100
                ${selectedStation === station.id || 'group-hover:opacity-100 opacity-0 translate-y-2 group-hover:translate-y-0'}
              `}
            >
              <div className="font-bold text-slate-800">{station.name}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className={`w-2 h-2 rounded-full ${getStatusColor(station.status).split(' ')[0]}`}></span>
                <span className="text-slate-500 font-medium">{station.status}</span>
                <span className="text-slate-400">|</span>
                <span className="font-mono font-semibold">{station.level}m</span>
              </div>
              {/* Arrow */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-white"></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-sm border border-slate-200 text-xs space-y-1 z-10">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500"></span> Normal
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-400"></span> Alert
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-orange-500"></span> Warning
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-600"></span> Critical
        </div>
      </div>
    </div>
  );
}
