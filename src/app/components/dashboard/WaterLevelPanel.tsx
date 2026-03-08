import { ArrowDown, ArrowUp, Droplets, Clock } from "lucide-react";

export function WaterLevelPanel() {
  const currentLevel = 7.4; // meters
  const classification = "Warning"; // Normal, Alert, Warning, Critical
  const change = "+0.5m"; // 1h change
  const trend = "rising"; // rising, falling, stable
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Normal": return "bg-emerald-500 text-white";
      case "Alert": return "bg-amber-400 text-slate-900";
      case "Warning": return "bg-orange-500 text-white";
      case "Critical": return "bg-red-600 text-white";
      default: return "bg-slate-500 text-white";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "Normal": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Alert": return "bg-amber-50 text-amber-700 border-amber-200";
      case "Warning": return "bg-orange-50 text-orange-700 border-orange-200";
      case "Critical": return "bg-red-50 text-red-700 border-red-200";
      default: return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
          <Droplets className="w-5 h-5 text-blue-500" />
          Water Level Status
        </h3>
        <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-full border border-slate-100">
          Station: Main River
        </span>
      </div>
      
      <div className="p-6 flex flex-col items-center">
        <div className="relative w-48 h-48 rounded-full border-8 border-slate-50 flex items-center justify-center bg-blue-50/50 shadow-inner mb-6">
           <div className="absolute inset-0 rounded-full border-8 border-t-blue-500 border-r-blue-400 border-b-transparent border-l-transparent rotate-45"></div>
           <div className="text-center z-10">
             <span className="block text-5xl font-bold text-slate-900 tracking-tighter">
               {currentLevel}
               <span className="text-lg text-slate-400 font-normal ml-1">m</span>
             </span>
             <span className="text-sm font-medium text-slate-500 mt-1 block">Current Level</span>
           </div>
           
           {/* Animated Wave Background (Simplified) */}
           <div className="absolute bottom-0 w-full h-1/3 bg-blue-100/50 rounded-b-full overflow-hidden">
             <div className="w-[200%] h-full animate-[wave_3s_linear_infinite] bg-blue-200/40 translate-x-0"></div>
           </div>
        </div>

        <div className={`w-full py-3 px-4 rounded-lg flex items-center justify-between border ${getStatusBg(classification)} mb-4`}>
          <span className="font-medium">Status</span>
          <span className={`px-3 py-1 rounded-full text-sm font-bold shadow-sm ${getStatusColor(classification)}`}>
            {classification.toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full">
           <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-center">
             <span className="text-xs text-slate-500 uppercase font-semibold">1h Change</span>
             <div className={`flex items-center justify-center gap-1 font-bold text-lg ${trend === 'rising' ? 'text-red-500' : 'text-emerald-500'}`}>
               {trend === 'rising' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
               {change}
             </div>
           </div>
           
           <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-center">
             <span className="text-xs text-slate-500 uppercase font-semibold">Last Update</span>
             <div className="flex items-center justify-center gap-1 font-bold text-lg text-slate-700">
               <Clock className="w-4 h-4 text-slate-400" />
               <span className="text-sm">Just now</span>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
