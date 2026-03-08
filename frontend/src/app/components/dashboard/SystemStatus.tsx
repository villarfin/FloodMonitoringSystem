import { Activity, Wifi, Cpu, Battery, Server, CheckCircle2, XCircle } from "lucide-react";

export function SystemStatus() {
  const sensors = [
    { id: 1, name: "Main River", status: "Online", ping: "24ms" },
    { id: 2, name: "North Dam", status: "Online", ping: "32ms" },
    { id: 3, name: "Coastal Outlet", status: "Offline", ping: "-" },
    { id: 4, name: "West Valley", status: "Online", ping: "18ms" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
          <Activity className="w-5 h-5 text-purple-500" />
          System Health
        </h3>
        <span className="bg-purple-50 text-purple-700 text-xs font-bold px-2 py-1 rounded-full border border-purple-100 flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
          98% Uptime
        </span>
      </div>
      
      <div className="p-4 space-y-4">
        {/* Overall Status Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 flex flex-col items-center justify-center gap-1">
            <Wifi className="w-5 h-5 text-emerald-500" />
            <span className="text-xs font-semibold text-slate-600">Connectivity</span>
            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-100 px-1.5 py-0.5 rounded">
              Strong
            </span>
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 flex flex-col items-center justify-center gap-1">
            <Battery className="w-5 h-5 text-emerald-500" />
            <span className="text-xs font-semibold text-slate-600">Power</span>
            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-100 px-1.5 py-0.5 rounded">
              100%
            </span>
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 flex flex-col items-center justify-center gap-1">
            <Cpu className="w-5 h-5 text-emerald-500" />
            <span className="text-xs font-semibold text-slate-600">CPU Load</span>
            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-100 px-1.5 py-0.5 rounded">
              12%
            </span>
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 flex flex-col items-center justify-center gap-1">
            <Server className="w-5 h-5 text-emerald-500" />
            <span className="text-xs font-semibold text-slate-600">Database</span>
            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-100 px-1.5 py-0.5 rounded">
              Synced
            </span>
          </div>
        </div>
        
        {/* Sensor List */}
        <div>
          <h4 className="font-semibold text-slate-700 text-sm mb-3 flex items-center justify-between">
            Sensor Network
            <span className="text-xs font-normal text-slate-400">Last check: 1m ago</span>
          </h4>
          <div className="space-y-2">
            {sensors.map((sensor) => (
              <div key={sensor.id} className="flex items-center justify-between text-sm py-1 border-b border-slate-50 last:border-0">
                <span className="text-slate-600 font-medium">{sensor.name}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${sensor.status === 'Online' ? 'text-emerald-600' : 'text-red-500 font-bold'}`}>
                    {sensor.status === 'Online' ? sensor.ping : 'OFFLINE'}
                  </span>
                  {sensor.status === 'Online' ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
