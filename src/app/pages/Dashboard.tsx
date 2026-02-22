import { useState } from "react";
import { Link } from "react-router-dom";
import { WaterLevelCard } from "../components/WaterLevelCard";
import { StatsCard } from "../components/StatsCard";
import { AlertCard } from "../components/AlertCard";
import { Button } from "../components/ui/button";

// Dashboard page now mirrors the original App screen exactly
export function Dashboard() {
  const [showAlerts, setShowAlerts] = useState(true);

  const stats = [
    {
      label: "Total Locations",
      value: "3",
      icon: <img src="/location.png" alt="Location" className="app__location-icon" />,
    },
    { label: "Active Alerts", value: "2", icon: "\u26A0\uFE0F" },
    { label: "Safe Areas", value: "1", icon: "\u2705" },
  ];

  const waterLevels = [
    { locationName: "Cagayan De Oro River", currentLevel: 8.0, maxLevel: 10.0, status: "Danger" },
    { locationName: "Bigaan River", currentLevel: 4.1, maxLevel: 8.0, status: "Safe" },
    { locationName: "Bitan-ag Creek", currentLevel: 7.0, maxLevel: 10.0, status: "Warning" },
  ];

  const alerts = [
    { title: "High Water Level", message: "Central Dam water level is approaching maximum capacity.", type: "danger" },
    { title: "Heavy Rainfall Expected", message: "Weather forecast shows heavy rain in the next 6 hours.", type: "warning" },
    { title: "Tsunami Alert", message: "Tsunami warning issued for coastal areas.", type: "danger" },
  ];

  const toggleAlerts = () => setShowAlerts((v) => !v);

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Flood Monitoring System</h1>
        <p className="app__subtitle">Real-time water level monitoring and alerts</p>
      </header>

      <main className="app__main">
        <section className="app__section">
          <h2 className="app__section-title">Overview Statistics</h2>
          <div className="app__stats-grid">
            {stats.map((stat, i) => (
              <StatsCard key={i} label={stat.label} value={stat.value} icon={stat.icon} />
            ))}
          </div>
        </section>

        <section className="app__section">
          <h2 className="app__section-title">Water Levels by Location</h2>
          <div className="app__water-grid">
            {waterLevels.map((loc, i) => (
              <WaterLevelCard key={i} {...loc} />
            ))}
          </div>
        </section>

        <section className="app__section">
          <div className="app__alerts-header">
            <h2 className="app__section-title app__section-title--no-margin">Active Alerts</h2>
            <Button onClick={toggleAlerts} variant="outline">
              {showAlerts ? "Hide Alerts" : "Show Alerts"}
            </Button>
          </div>
          {showAlerts && (
            <div className="app__alerts-grid">
              {alerts.map((alert, i) => (
                <AlertCard key={i} {...alert} />
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
      </main>

      <footer className="app__footer">
        Flood Monitoring System - Laboratory Activity #3
      </footer>

      {/* logout link placed outside main area for convenience */}
      <div className="app__logout">
        <Link to="/login">
          <Button variant="outline">Log Out</Button>
        </Link>
      </div>
    </div>
  );
}
