import { AlertTriangle, MapPin, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router";

const alerts = [
  {
    id: 1,
    level: "Critical",
    area: "West Valley",
    message: "Water level exceeded 9.0m. Immediate evacuation required.",
    time: "10 mins ago",
    status: "Active",
  },
  {
    id: 2,
    level: "Warning",
    area: "East River Junction",
    message: "Rising water levels detected. Prepare for possible evacuation.",
    time: "45 mins ago",
    status: "Active",
  },
  {
    id: 3,
    level: "Alert",
    area: "Coastal Outlet",
    message: "High tide warning in effect. Monitor local news.",
    time: "2 hours ago",
    status: "Monitoring",
  },
];

export function AlertsList() {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Critical": return "bg-red-50 text-red-700 border-red-200";
      case "Warning": return "bg-orange-50 text-orange-700 border-orange-200";
      case "Alert": return "bg-amber-50 text-amber-700 border-amber-200";
      default: return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getIconColor = (level: string) => {
    switch (level) {
      case "Critical": return "text-red-600";
      case "Warning": return "text-orange-500";
      case "Alert": return "text-amber-500";
      default: return "text-slate-500";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          Active Alerts
        </h3>
        <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full animate-pulse">
          {alerts.length} Active
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {alerts.map((alert) => (
          <div 
            key={alert.id} 
            className={`p-4 rounded-lg border flex flex-col gap-2 transition-all hover:shadow-md ${getLevelColor(alert.level)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2 font-bold">
                <AlertTriangle className={`w-4 h-4 ${getIconColor(alert.level)}`} />
                <span>{alert.level} Alert</span>
              </div>
              <span className="text-xs font-medium opacity-80 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {alert.time}
              </span>
            </div>
            
            <p className="text-sm font-medium leading-relaxed">
              {alert.message}
            </p>
            
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-black/5">
              <div className="flex items-center gap-1 text-xs font-semibold opacity-75">
                <MapPin className="w-3 h-3" />
                {alert.area}
              </div>
              <Link 
                to={`/alerts/${alert.id}`} 
                className="text-xs font-bold hover:underline flex items-center gap-1"
              >
                View Details <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-3 border-t border-slate-100 bg-slate-50 text-center">
        <button className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
          View All Alerts
        </button>
      </div>
    </div>
  );
}
