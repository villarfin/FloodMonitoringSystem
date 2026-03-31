import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { WaterLevelCard } from "../components/WaterLevelCard";
import { AlertCard } from "../components/AlertCard";
import { StatsCard } from "../components/StatsCard";
import { WeatherPanel } from "../components/WeatherPanel";
import { Button } from "../components/ui/button";
import { ActiveAlert, activeAlerts as staticAlerts } from "../data/activeAlerts";
import { monitoredWaters as staticWaters } from "../data/monitoredWaters";
import { api } from "../utils/api";
import "../styles/pages/Dashboard.css";

export function Dashboard() {
  const [locations, setLocations] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAlerts, setShowAlerts] = useState(true);
  const [weatherAlerts, setWeatherAlerts] = useState<ActiveAlert[]>([]);
  const alertsSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [locData, alertData] = await Promise.all([
          api.getLocations(),
          api.getAlerts()
        ]);
        setLocations(locData);
        setAlerts(alertData);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setLocations(staticWaters);
        setAlerts(staticAlerts);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const monitoredData = locations.length > 0 ? locations : staticWaters;
  const featuredWaters = monitoredData.slice(0, 3);
  const safeCount = monitoredData.filter((item) => item.status === "Safe" || item.level === "Safe").length;
  const alertCount = monitoredData.filter((item) => item.status !== "Safe" && item.level !== "Safe").length;

  const stats = [
    {
      id: "total-locations",
      label: "Total Locations",
      value: String(monitoredData.length),
      icon: <img src="/location.png" alt="Location" className="app__location-icon" />,
    },
    { id: "active-alerts", label: "Active Alerts", value: String(alertCount), icon: "\u26A0\uFE0F" },
    { id: "safe-areas", label: "Safe Areas", value: String(safeCount), icon: "\u2705" },
  ];

  const allAlerts = [...alerts, ...weatherAlerts];

  return (
    <>
      <section className="app__section">
        <h2 className="app__section-title">Overview Statistics</h2>
        <ul className="app__stats-grid">
          {stats.map((stat) => (
            <li key={stat.id}>
              <StatsCard label={stat.label} value={stat.value} icon={stat.icon} />
            </li>
          ))}
        </ul>
      </section>

      <section className="app__section">
        <div className="app__alerts-header">
          <h2 className="app__section-title app__section-title--no-margin">Water Levels by Location</h2>
          <Link to="/monitoring" className="app__page-link">
            View All Monitored Waters
          </Link>
        </div>
        <ul className="app__water-grid">
          {featuredWaters.map((loc) => (
            <li key={loc.id}>
              <WaterLevelCard 
                locationName={loc.name || loc.locationName} 
                currentLevel={loc.currentLevel || loc.current_level || 0} 
                maxLevel={loc.maxLevel || loc.max_level || 10} 
                status={loc.status || "Safe"} 
              />
            </li>
          ))}
        </ul>
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
          <ul className="app__alerts-grid">
            {allAlerts.map((alert, idx) => (
              <li key={alert.id || idx}>
                <AlertCard 
                  title={alert.title || alert.level} 
                  message={alert.message || alert.description} 
                  type={alert.type || alert.level?.toLowerCase()} 
                />
              </li>
            ))}
          </ul>
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
