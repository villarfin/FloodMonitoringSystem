import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ??
  "http://127.0.0.1:8000/api";

type Status = "Normal" | "Warning" | "Danger" | string;

interface HealthStatus {
  status: string;
  stationCount: number;
  alertCount: number;
  iotReadingCount: number;
  latestIotAt: string | null;
  latestIotLocation: string | null;
  iotStale: boolean;
  thresholds: {
    unit?: string;
    maxLevel?: number;
    safeBelow?: number;
    warningFrom?: number;
    dangerFrom?: number;
  };
}

interface IoTReading {
  id: number;
  locationName: string;
  currentLevel: string;
  status: Status;
  trend: string;
  timestamp: string | null;
}

interface WaterStation {
  id: number | string;
  locationName: string;
  currentLevel: string;
  maxLevel: string;
  status: Status;
  trend: string;
  lastUpdated: string | null;
}

function statusColor(status: Status) {
  const normalized = status.toLowerCase();
  if (normalized === "danger") return "#dc2626";
  if (normalized === "warning") return "#d97706";
  return "#16a34a";
}

function formatDate(value: string | null) {
  if (!value) return "No data yet";
  return new Intl.DateTimeFormat("en-PH", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(value));
}

function levelPercent(currentLevel: string, maxLevel: string) {
  const current = Number(currentLevel);
  const max = Number(maxLevel);
  if (!Number.isFinite(current) || !Number.isFinite(max) || max <= 0) return 0;
  return Math.max(0, Math.min(100, (current / max) * 100));
}

async function getJson<T>(path: string): Promise<T> {
  const separator = path.includes("?") ? "&" : "?";
  const response = await fetch(`${API_BASE_URL}${path}${separator}_=${Date.now()}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return response.json();
}

export default function App() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [latest, setLatest] = useState<IoTReading | null>(null);
  const [stations, setStations] = useState<WaterStation[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastPolled, setLastPolled] = useState<Date | null>(null);

  const loadData = useCallback(async () => {
    try {
      const [healthData, latestData, stationData] = await Promise.all([
        getJson<HealthStatus>("/health/"),
        getJson<IoTReading | null>("/iot/latest/"),
        getJson<WaterStation[]>("/water-levels/"),
      ]);
      setHealth(healthData);
      setLatest(latestData);
      setStations(stationData);
      setLastPolled(new Date());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to reach API");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadData();
    const interval = setInterval(() => {
      void loadData();
    }, 2500);
    return () => clearInterval(interval);
  }, [loadData]);

  const thresholds = useMemo(() => {
    const unit = health?.thresholds.unit ?? "cm";
    const maxLevel = health?.thresholds.maxLevel ?? 14;
    const safeBelow = health?.thresholds.safeBelow ?? 6;
    const dangerFrom = health?.thresholds.dangerFrom ?? 10;
    return { unit, maxLevel, safeBelow, dangerFrom };
  }, [health]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Flood Monitoring</Text>
        <Text style={styles.subtitle}>Live Arduino IoT feed</Text>
      </View>

      <FlatList
        data={stations}
        keyExtractor={(item) => String(item.id)}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              void loadData();
            }}
          />
        }
        ListHeaderComponent={
          <View style={styles.content}>
            {loading ? <ActivityIndicator color="#0f766e" /> : null}
            {error ? <Text style={styles.error}>API error: {error}</Text> : null}

            <View style={styles.card}>
              <View style={styles.rowBetween}>
                <Text style={styles.cardLabel}>System</Text>
                <Text style={[styles.pill, health?.iotStale ? styles.pillWarn : styles.pillOk]}>
                  {health?.iotStale ? "Stale" : "Live"}
                </Text>
              </View>
              <Text style={styles.meta}>
                API: {API_BASE_URL}
              </Text>
              <Text style={styles.meta}>
                Last checked: {lastPolled ? lastPolled.toLocaleTimeString() : "Waiting"}
              </Text>
              <Text style={styles.meta}>
                Prototype zones: Safe &lt; {thresholds.safeBelow}{thresholds.unit}, Warning {thresholds.safeBelow}-{thresholds.dangerFrom - 0.01}{thresholds.unit}, Danger &gt;= {thresholds.dangerFrom}{thresholds.unit}
              </Text>
            </View>

            <View style={[styles.card, styles.liveCard]}>
              <View style={styles.rowBetween}>
                <Text style={styles.cardLabel}>Latest IoT Reading</Text>
                <Text style={styles.liveDot}>LIVE</Text>
              </View>
              {latest ? (
                <>
                  <Text style={styles.location}>{latest.locationName}</Text>
                  <Text style={[styles.level, { color: statusColor(latest.status) }]}>
                    {Number(latest.currentLevel).toFixed(1)} {thresholds.unit}
                  </Text>
                  <Text style={styles.meta}>{latest.status} · {latest.trend}</Text>
                  <Text style={styles.meta}>Sensor: {formatDate(latest.timestamp)}</Text>
                </>
              ) : (
                <Text style={styles.meta}>Waiting for Arduino data...</Text>
              )}
            </View>

            <Text style={styles.sectionTitle}>Monitoring Stations</Text>
          </View>
        }
        renderItem={({ item }) => {
          const percent = levelPercent(item.currentLevel, item.maxLevel);
          const color = statusColor(item.status);
          return (
            <View style={styles.stationCard}>
              <View style={styles.rowBetween}>
                <Text style={styles.stationName}>{item.locationName}</Text>
                <Text style={[styles.statusText, { color }]}>{item.status}</Text>
              </View>
              <Text style={styles.stationLevel}>
                {Number(item.currentLevel).toFixed(1)} / {Number(item.maxLevel).toFixed(1)} {thresholds.unit}
              </Text>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${percent}%`, backgroundColor: color }]} />
              </View>
              <Text style={styles.meta}>
                {item.trend} · Updated {formatDate(item.lastUpdated)}
              </Text>
            </View>
          );
        }}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#eef6f4",
  },
  header: {
    backgroundColor: "#0f766e",
    paddingHorizontal: 20,
    paddingBottom: 22,
    paddingTop: 28,
  },
  title: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "800",
  },
  subtitle: {
    color: "#ccfbf1",
    fontSize: 14,
    marginTop: 4,
  },
  content: {
    gap: 14,
    padding: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#dbeafe",
  },
  liveCard: {
    borderColor: "#99f6e4",
  },
  rowBetween: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  cardLabel: {
    color: "#0f172a",
    fontSize: 14,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  location: {
    color: "#0f172a",
    fontSize: 18,
    fontWeight: "800",
    marginTop: 12,
  },
  level: {
    fontSize: 44,
    fontWeight: "900",
    marginTop: 8,
  },
  meta: {
    color: "#64748b",
    fontSize: 13,
    marginTop: 6,
  },
  pill: {
    borderRadius: 999,
    fontSize: 12,
    fontWeight: "800",
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  pillOk: {
    backgroundColor: "#dcfce7",
    color: "#166534",
  },
  pillWarn: {
    backgroundColor: "#fef3c7",
    color: "#92400e",
  },
  liveDot: {
    backgroundColor: "#dcfce7",
    borderRadius: 999,
    color: "#166534",
    fontSize: 12,
    fontWeight: "900",
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  sectionTitle: {
    color: "#0f172a",
    fontSize: 18,
    fontWeight: "900",
    marginTop: 4,
  },
  stationCard: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginHorizontal: 16,
    marginTop: 12,
    padding: 14,
  },
  stationName: {
    color: "#0f172a",
    flex: 1,
    fontSize: 16,
    fontWeight: "800",
  },
  statusText: {
    fontSize: 13,
    fontWeight: "900",
  },
  stationLevel: {
    color: "#0f172a",
    fontSize: 20,
    fontWeight: "800",
    marginTop: 10,
  },
  progressTrack: {
    backgroundColor: "#e5e7eb",
    borderRadius: 999,
    height: 10,
    marginTop: 10,
    overflow: "hidden",
  },
  progressFill: {
    borderRadius: 999,
    height: "100%",
  },
  error: {
    backgroundColor: "#fee2e2",
    borderRadius: 8,
    color: "#991b1b",
    fontWeight: "700",
    padding: 12,
  },
});
