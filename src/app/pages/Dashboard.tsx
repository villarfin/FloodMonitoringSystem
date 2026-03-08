import { useRef, useState } from "react";
import { Link } from "react-router";
import { WaterLevelCard } from "../components/WaterLevelCard";
import { AlertCard } from "../components/AlertCard";
import { StatsCard } from "../components/StatsCard";
import { WaterLevelList } from "../components/WaterLevelList";
import { TrendChart } from "../components/TrendChart";
import { WeatherPanel } from "../components/WeatherPanel";
import { Button } from "../components/ui/button";
import { ActiveAlert, activeAlerts as seedAlerts } from "../data/activeAlerts";
import { monitoredWaters } from "../data/monitoredWaters";

export function Dashboard() {
  const [showAlerts, setShowAlerts] = useState(true);
  const [weatherAlerts, setWeatherAlerts] = useState<ActiveAlert[]>([]);
  const alertsSectionRef = useRef<HTMLElement | null>(null);
  const featuredWaters = monitoredWaters.slice(0, 3);
  const safeCount = monitoredWaters.filter((item) => item.status === "Safe").length;
  const alertCount = monitoredWaters.filter((item) => item.status !== "Safe").length;

  const stats = [
    {
      id: "total-locations",
      label: "Total Locations",
      value: String(monitoredWaters.length),
      icon: <img src="/location.png" alt="Location" className="w-10 h-10 object-contain" />,
    },
    { id: "active-alerts", label: "Active Alerts", value: String(alertCount), icon: <span className="text-2xl">⚠️</span> },
    { id: "safe-areas", label: "Safe Areas", value: String(safeCount), icon: <span className="text-2xl">✅</span> },
  ];

  const nonWeatherAlerts = seedAlerts.filter((alert) => alert.id !== "a2");
  const alerts = [...nonWeatherAlerts, ...weatherAlerts];

  return (
    <>
      <section className="app__section">
        <h2 className="app__section-title">Overview Statistics</h2>
        <div className="flex flex-col lg:flex-row gap-4">
          {stats.map((stat) => (
            <div key={stat.id} className="flex-1">
              <StatsCard key={stat.id} label={stat.label} value={stat.value} icon={stat.icon} />
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Water Level List takes up 1 column */}
        <div className="lg:col-span-1 h-[400px]">
          <WaterLevelList />
        </div>
      </section>

      <section className="app__section">
        <WeatherPanel
          onWeatherAlertsChange={setWeatherAlerts}
          onOpenAlerts={() => {
            setShowAlerts(true);
            requestAnimationFrame(() => {
              alertsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            });
          }}
        />
      </section>

      <section className="app__section" ref={alertsSectionRef}>
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
