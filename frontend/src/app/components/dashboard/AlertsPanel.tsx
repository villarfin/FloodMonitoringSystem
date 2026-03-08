import React from 'react';
import { Card } from './Card';
import { AlertTriangle, Info, Bell, MapPin } from 'lucide-react';

const alerts = [
  {
    id: 1,
    location: "Barangay San Jose",
    level: "Critical",
    message: "Water level exceeded 18m. Evacuation required.",
    time: "10 mins ago",
    status: "Active",
    type: "critical"
  },
  {
    id: 2,
    location: "Tumana Bridge",
    level: "Warning",
    message: "Water level rising rapidly. Prepare for evacuation.",
    time: "25 mins ago",
    status: "Monitoring",
    type: "warning"
  },
  {
    id: 3,
    location: "Sto. Nino Creek",
    level: "Alert",
    message: "Moderate rainfall detected upstream.",
    time: "1 hour ago",
    status: "Resolved",
    type: "info"
  }
];

export function AlertsPanel() {
  return (
    <Card 
      title="Active Alerts" 
      subtitle="Real-time emergency notifications"
      className="bg-white border-red-100"
    >
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div 
            key={alert.id} 
            className={`p-4 rounded-lg border-l-4 shadow-sm flex items-start gap-4 transition-all hover:translate-x-1 ${
              alert.type === 'critical' ? 'bg-red-50 border-red-500' :
              alert.type === 'warning' ? 'bg-orange-50 border-orange-500' :
              'bg-blue-50 border-blue-500'
            }`}
          >
            <div className={`p-2 rounded-full ${
              alert.type === 'critical' ? 'bg-red-100 text-red-600' :
              alert.type === 'warning' ? 'bg-orange-100 text-orange-600' :
              'bg-blue-100 text-blue-600'
            }`}>
              {alert.type === 'critical' ? <AlertTriangle className="w-5 h-5" /> :
               alert.type === 'warning' ? <Bell className="w-5 h-5" /> :
               <Info className="w-5 h-5" />}
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className={`font-bold ${
                  alert.type === 'critical' ? 'text-red-900' :
                  alert.type === 'warning' ? 'text-orange-900' :
                  'text-blue-900'
                }`}>
                  {alert.level} Level - {alert.location}
                </h4>
                <span className="text-xs font-medium text-gray-500">{alert.time}</span>
              </div>
              <p className="text-sm text-gray-700 mt-1">{alert.message}</p>
              <div className="flex items-center gap-4 mt-3 text-xs font-medium text-gray-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {alert.location}
                </span>
                <span className={`px-2 py-0.5 rounded-full ${
                  alert.status === 'Active' ? 'bg-red-200 text-red-800' : 
                  'bg-gray-200 text-gray-800'
                }`}>
                  {alert.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
