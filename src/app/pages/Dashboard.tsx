import { useState } from "react";
import { Link } from "react-router";
import { WaterLevelCard } from "../components/WaterLevelCard";
import { AlertCard } from "../components/AlertCard";
import { StatsCard } from "../components/StatsCard";
import { Button } from "../components/ui/button";
import { monitoredWaters } from "../data/monitoredWaters";
import "./Dashboard.css";

export function Dashboard() {
  const [showAlerts, setShowAlerts] = useState(true);
  const featuredWaters = monitoredWaters.slice(0, 3);
  const safeCount = monitoredWaters.filter((item) => item.status === "Safe").length;
  const alertCount = monitoredWaters.filter((item) => item.status !== "Safe").length;

  const stats = [
    {
      id: "total-locations",
      label: "Total Locations",
      value: String(monitoredWaters.length),
      icon: <img src="/location.png" alt="Location" className="app__location-icon" />,
    },
    { id: "active-alerts", label: "Active Alerts", value: String(alertCount), icon: "\u26A0\uFE0F" },
    { id: "safe-areas", label: "Safe Areas", value: String(safeCount), icon: "\u2705" },
  ];

  const alerts = [
    { id: "a1", title: "High Water Level", message: "Central Dam water level is approaching maximum capacity.", type: "danger" },
    { id: "a2", title: "Heavy Rainfall Expected", message: "Weather forecast shows heavy rain in the next 6 hours.", type: "warning" },
    { id: "a3", title: "Tsunami Alert", message: "Tsunami warning issued for coastal areas.", type: "danger" },
  ];

  return (
    <>
      <section className="app__section">
        <h2 className="app__section-title">Overview Statistics</h2>
        <div className="app__stats-grid">
          {stats.map((stat) => (
            <StatsCard key={stat.id} label={stat.label} value={stat.value} icon={stat.icon} />
          ))}
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
      </section>

      <section className="app__section">
        <div className="app__alerts-header">
          <h2 className="app__section-title app__section-title--no-margin">Active Alerts</h2>
          <Button type="button" onClick={() => setShowAlerts((v) => !v)} variant="outline">
            {showAlerts ? "Hide Alerts" : "Show Alerts"}
          </Button>
        </div>
        {showAlerts && (
          <div className="app__alerts-grid">
            {alerts.map((alert) => (
              <AlertCard key={alert.id} {...alert} />
            ))}
          </div>
        )}
      </section>

      <section className="app__help">
        <h3 className="app__help-title">How to Use</h3>
        <ul className="app__help-list">
          <li>Check water levels at different locations</li>
          <li>Monitor active alerts for dangerous situations</li>
          <li>Green = Safe, Yellow = Warning, Red = Danger</li>
          <li>Click "Hide/Show Alerts" to toggle alerts</li>
        </ul>
      </section>
    </>
  );
}
