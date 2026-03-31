import { useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { WaterLevelCard } from "../components/WaterLevelCard";
import { monitoredWaters as staticWaters } from "../data/monitoredWaters";
import { api } from "../utils/api";
import "../styles/pages/Monitoring.css";

export function Monitoring() {
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const data = await api.getLocations();
        setLocations(data);
        if (data.length > 0) setSelectedId(data[0].id);
      } catch (err) {
        console.error("Failed to fetch monitoring data:", err);
        setLocations(staticWaters);
        if (staticWaters.length > 0) setSelectedId(staticWaters[0].id);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const monitoredData = locations.length > 0 ? locations : staticWaters;

  const selectedWater = useMemo(
    () => monitoredData.find((location) => location.id === selectedId) ?? null,
    [selectedId, monitoredData],
  );

  useEffect(() => {
    if (!selectedWater) return undefined;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedId("");
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selectedWater]);

  const chartData = useMemo(() => {
    if (!selectedWater || !selectedWater.readings) return [];

    return selectedWater.readings.map((reading: any) => ({
      level: reading.level,
      timeLabel: new Intl.DateTimeFormat("en-PH", {
        hour: "numeric",
        minute: "2-digit",
      }).format(new Date(reading.timestamp)),
      fullLabel: new Intl.DateTimeFormat("en-PH", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }).format(new Date(reading.timestamp)),
    }));
  }, [selectedWater]);

  const highestReading = useMemo(() => {
    if (!selectedWater || !selectedWater.readings || selectedWater.readings.length === 0) return null;

    return selectedWater.readings.reduce((highest: any, reading: any) =>
      reading.level > highest.level ? reading : highest,
    );
  }, [selectedWater]);

  const averageLevel = useMemo(() => {
    if (!selectedWater || !selectedWater.readings || selectedWater.readings.length === 0) return 0;

    const total = selectedWater.readings.reduce((sum: number, reading: any) => sum + reading.level, 0);
    return total / selectedWater.readings.length;
  }, [selectedWater]);

  return (
    <section className="app__section">
      <h2 className="app__section-title">Monitoring View</h2>
      <p className="app__page-text">
        Select a monitored water location to open its full-screen IoT detail panel.
      </p>

      <ul className="app__water-grid app__water-grid--monitoring">
        {monitoredData.map((location) => (
          <li key={location.id}>
            <button
              className="app__monitor-card-button"
              onClick={() => setSelectedId(location.id)}
              type="button"
            >
              <WaterLevelCard 
                locationName={location.name || location.locationName} 
                currentLevel={location.currentLevel || location.current_level || 0} 
                maxLevel={location.maxLevel || location.max_level || 10} 
                status={location.status || "Safe"} 
              />
              <div className="app__monitor-card-meta">
                <span>{location.sensorId || location.sensor_id || "N/A"}</span>
                <span>{location.trend || "Stable"} trend</span>
              </div>
              <p className="app__monitor-card-hint">Open full-screen monitoring details</p>
            </button>
          </li>
        ))}
      </ul>

      {selectedWater ? (
        <div
          className="app__monitor-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="monitoring-modal-title"
        >
          <button
            className="app__monitor-modal-backdrop"
            type="button"
            aria-label="Close monitoring details"
            onClick={() => setSelectedId("")}
          />
          <section className="app__monitor-modal-panel">
            <header className="app__monitor-modal-header">
              <div>
                <p className="app__monitor-modal-eyebrow">Live IoT water station</p>
                <h3 id="monitoring-modal-title" className="app__monitor-modal-title">
                  {selectedWater.name || selectedWater.locationName}
                </h3>
                <p className="app__page-text">
                  {selectedWater.barangay || "N/A"}, {selectedWater.municipality || "N/A"}
                </p>
              </div>
              <button
                className="app__monitor-modal-close"
                type="button"
                onClick={() => setSelectedId("")}
              >
                Close
              </button>
            </header>

            <div className="app__monitor-modal-grid">
              <section className="app__monitor-modal-hero">
                <figure className="app__monitor-modal-photo-wrap">
                  <img
                    src={selectedWater.imageUrl || selectedWater.image_url || "/location.png"}
                    alt={selectedWater.name || selectedWater.locationName}
                    className="app__monitor-modal-photo"
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.src = "/location.png";
                    }}
                  />
                </figure>

                <div className="app__monitor-stat-grid">
                  <article className="app__monitor-stat-card">
                    <span className="app__monitor-stat-label">Current Level</span>
                    <strong>{(selectedWater.currentLevel || selectedWater.current_level || 0).toFixed(1)} m</strong>
                  </article>
                  <article className="app__monitor-stat-card">
                    <span className="app__monitor-stat-label">Highest in 24h</span>
                    <strong>{highestReading ? highestReading.level.toFixed(1) : "N/A"} m</strong>
                  </article>
                  <article className="app__monitor-stat-card">
                    <span className="app__monitor-stat-label">24h Average</span>
                    <strong>{averageLevel.toFixed(1)} m</strong>
                  </article>
                  <article className="app__monitor-stat-card">
                    <span className="app__monitor-stat-label">Sensor ID</span>
                    <strong>{selectedWater.sensorId || selectedWater.sensor_id || "N/A"}</strong>
                  </article>
                </div>

                <div className="app__monitor-info-grid">
                  <p><strong>Type:</strong> {selectedWater.location_type || selectedWater.locationType || "N/A"}</p>
                  <p><strong>Status:</strong> {selectedWater.status || "Safe"}</p>
                  <p><strong>Trend:</strong> {selectedWater.trend || "Stable"}</p>
                  <p><strong>Last Updated:</strong> {selectedWater.last_updated || selectedWater.lastUpdated || "N/A"}</p>
                  <p><strong>Design Max:</strong> {(selectedWater.maxLevel || selectedWater.max_level || 10).toFixed(1)} m</p>
                  <p>
                    <strong>Peak Timestamp:</strong>{" "}
                    {highestReading
                      ? new Intl.DateTimeFormat("en-PH", {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        }).format(new Date(highestReading.timestamp))
                      : "N/A"}
                  </p>
                </div>

                <p className="app__monitor-notes">{selectedWater.notes || ""}</p>
              </section>

              <section className="app__monitor-chart-card">
                <div className="app__monitor-chart-header">
                  <div>
                    <h4>24-hour IoT level history</h4>
                  </div>
                </div>

                <div className="app__monitor-chart-wrap">
                  {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData} margin={{ top: 16, right: 10, left: -18, bottom: 0 }}>
                        <defs>
                          <linearGradient id="monitoringLevelFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0f766e" stopOpacity={0.35} />
                            <stop offset="95%" stopColor="#0f766e" stopOpacity={0.04} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid stroke="#dbeafe" strokeDasharray="3 3" />
                        <XAxis dataKey="timeLabel" tick={{ fontSize: 12, fill: "#475569" }} />
                        <YAxis
                          tick={{ fontSize: 12, fill: "#475569" }}
                          unit="m"
                          domain={[0, Math.ceil((selectedWater.maxLevel || selectedWater.max_level || 10) + 1)]}
                        />
                        <Tooltip
                          formatter={(value: number) => [`${value.toFixed(1)} m`, "Water level"]}
                          labelFormatter={(label, payload) =>
                            payload?.[0]?.payload?.fullLabel ?? label
                          }
                        />
                        <ReferenceLine
                          y={selectedWater.maxLevel || selectedWater.max_level || 10}
                          stroke="#dc2626"
                          strokeDasharray="6 6"
                          label={{ value: "Max threshold", fill: "#b91c1c", fontSize: 12 }}
                        />
                        <Area
                          type="monotone"
                          dataKey="level"
                          stroke="#0f766e"
                          strokeWidth={3}
                          fill="url(#monitoringLevelFill)"
                          activeDot={{ r: 6 }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#94a3b8' }}>
                      No level history data available yet.
                    </div>
                  )}
                </div>

                <div className="app__monitor-chart-footer">
                  <p>
                    <strong>Current:</strong> {(selectedWater.currentLevel || selectedWater.current_level || 0).toFixed(1)} m
                  </p>
                  <p>
                    <strong>Peak:</strong> {highestReading ? `${highestReading.level.toFixed(1)} m in the last 24 hours` : "N/A"}
                  </p>
                </div>
              </section>
            </div>
          </section>
        </div>
      ) : null}
    </section>
  );
}
