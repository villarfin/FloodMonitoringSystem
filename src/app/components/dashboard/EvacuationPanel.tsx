import { ArrowUpRight, ShieldCheck, MapPin, PhoneCall, Bus } from "lucide-react";

const centers = [
  { id: 1, name: "City High School", capacity: "85%", status: "Open", distance: "1.2 km" },
  { id: 2, name: "Community Center", capacity: "40%", status: "Open", distance: "2.5 km" },
];

export function EvacuationPanel() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-500" />
          Evacuation & Safety
        </h3>
        <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2 py-1 rounded-full border border-emerald-100">
          Status: Active
        </span>
      </div>
      
      <div className="p-4 space-y-4">
        {/* Safe Routes */}
        <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3">
          <h4 className="font-semibold text-emerald-800 mb-2 flex items-center gap-2 text-sm">
            <Bus className="w-4 h-4" /> Recommended Safe Route
          </h4>
          <p className="text-sm text-emerald-700 leading-relaxed">
            Take Route 5 via Highland Avenue. Avoid Lowland Bridge due to rising water.
          </p>
          <button className="mt-2 w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded shadow-sm transition-colors flex items-center justify-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> Start Navigation
          </button>
        </div>

        {/* Evacuation Centers */}
        <div>
          <h4 className="font-semibold text-slate-700 text-sm mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-slate-400" /> Open Evacuation Centers
          </h4>
          <div className="space-y-2">
            {centers.map((center) => (
              <div key={center.id} className="flex items-center justify-between bg-slate-50 border border-slate-100 p-3 rounded-lg hover:border-slate-300 transition-colors cursor-pointer group">
                <div>
                  <div className="font-medium text-slate-800 text-sm">{center.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5">Distance: {center.distance}</div>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase mb-1 ${
                    parseInt(center.capacity) > 80 ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {center.capacity} Full
                  </span>
                  <div className="text-[10px] text-slate-400 group-hover:text-blue-500 flex items-center justify-end gap-1">
                    Directions <ArrowUpRight className="w-2.5 h-2.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Emergency Contacts */}
        <div className="pt-2 border-t border-slate-100">
          <button className="w-full py-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2">
            <PhoneCall className="w-4 h-4" />
            Emergency Hotline: 911
          </button>
        </div>
      </div>
    </div>
  );
}
