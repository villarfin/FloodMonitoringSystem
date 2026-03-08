import React from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { StatusCard } from '../components/StatusCard';
import { WaterLevelList } from '../components/WaterLevelList';
import { MapWidget } from '../components/MapWidget';
import { TrendChart } from '../components/TrendChart';
import { AlertsFeed } from '../components/AlertsFeed';
import { EvacuationPanel } from '../components/EvacuationPanel';
import { SystemStatus } from '../components/SystemStatus';
import { Droplets, Activity, CloudRain, AlertTriangle } from 'lucide-react';

export function Dashboard() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatusCard
          title="Avg Water Level"
          value="4.2m"
          change="+12%"
          trend="up"
          icon={Droplets}
          color="blue"
        />
        <StatusCard
          title="Active Alerts"
          value="3"
          change="+1"
          trend="up"
          icon={AlertTriangle}
          color="red"
        />
        <StatusCard
          title="Rainfall (24h)"
          value="124mm"
          change="-5%"
          trend="down"
          icon={CloudRain}
          color="blue"
        />
        <StatusCard
          title="System Status"
          value="98%"
          change="Stable"
          trend="neutral"
          icon={Activity}
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Map takes up 2 columns on large screens */}
        <div className="lg:col-span-2">
          <MapWidget />
        </div>
        {/* Water Level List takes up 1 column */}
        <div className="lg:col-span-1 h-[400px]">
          <WaterLevelList />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TrendChart />
        </div>
        <div className="lg:col-span-1">
          <AlertsFeed />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <EvacuationPanel />
        <SystemStatus />
      </div>
    </DashboardLayout>
  );
}
