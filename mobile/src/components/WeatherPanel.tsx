import { useEffect, useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { MobileCard } from "./MobileCard";
import { ActiveAlert } from "../data/activeAlerts";
import { useMobileWeather } from "../hooks/useMobileWeather";
import { deriveMobileWeatherAlerts, getMobileWeatherLabel } from "../utils/weatherAlerts";
import { colors } from "../styles/theme";
import { useState } from "react";

interface WeatherPanelProps {
  onWeatherAlertsChange: (alerts: ActiveAlert[]) => void;
  onOpenAlerts: () => void;
}

export function WeatherPanel({ onWeatherAlertsChange, onOpenAlerts }: WeatherPanelProps) {
  const { status, error, payload, locationName, loadWeather } = useMobileWeather();
  const [metric, setMetric] = useState<"temperature" | "precipitation" | "wind">("temperature");
  const weatherLinkedAlerts = useMemo(() => (payload ? deriveMobileWeatherAlerts(payload) : []), [payload]);

  useEffect(() => {
    onWeatherAlertsChange(weatherLinkedAlerts);
  }, [onWeatherAlertsChange, weatherLinkedAlerts]);

  const chartSeries = payload
    ? payload.hourly.map((point) => (metric === "temperature" ? point.temperature : metric === "precipitation" ? point.precipitation : point.wind))
    : [];

  return (
    <MobileCard>
      <View style={styles.panel}>
      <Text style={styles.label}>Results for</Text>
      <Text style={styles.location}>{locationName}</Text>
      <View style={styles.row}>
        <Text style={styles.temp}>{Math.round(payload?.temperature ?? 0)}C</Text>
        <View>
          <Text style={styles.metric}>Precipitation: {Math.round(payload?.hourlyPrecipPeak ?? 0)}%</Text>
          <Text style={styles.metric}>Humidity: {Math.round(payload?.humidity ?? 0)}%</Text>
          <Text style={styles.metric}>Wind: {Math.round(payload?.windSpeed ?? 0)} km/h</Text>
        </View>
      </View>
      <Text style={styles.weatherText}>Weather: {getMobileWeatherLabel(payload?.weatherCode ?? 0)}</Text>
      {status === "error" ? <Text style={styles.errorText}>{error}</Text> : null}
      <View style={styles.actions}>
        <Pressable onPress={loadWeather}><Text style={styles.action}>Refresh</Text></Pressable>
      </View>

      <View style={styles.tabs}>
        {(["temperature", "precipitation", "wind"] as const).map((item) => {
          const isActive = metric === item;
          return (
            <Pressable key={item} onPress={() => setMetric(item)} style={[styles.tab, isActive && styles.tabActive]}>
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{item[0].toUpperCase() + item.slice(1)}</Text>
            </Pressable>
          );
        })}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chartWrap}>
        {chartSeries.map((value, index) => (
          <View key={`${payload?.hourly[index]?.time}-${metric}`} style={styles.chartItem}>
            <Text style={styles.chartValue}>{Math.round(value)}</Text>
            <Text style={styles.chartTime}>{new Date(payload?.hourly[index]?.time ?? "").toLocaleTimeString([], { hour: "numeric" })}</Text>
          </View>
        ))}
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dailyWrap}>
        {(payload?.daily ?? []).map((day) => (
          <View key={day.date} style={styles.dailyItem}>
            <Text style={styles.dailyDay}>{new Date(day.date).toLocaleDateString([], { weekday: "short" })}</Text>
            <Text style={styles.dailyTemp}>{Math.round(day.max)}C {Math.round(day.min)}C</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.linkedRow}>
        <Text style={styles.linkedTitle}>Weather-linked Active Alerts</Text>
        <Pressable onPress={onOpenAlerts}>
          <Text style={styles.link}>Show Alerts</Text>
        </Pressable>
      </View>
      <Text style={styles.linkedCount}>
        {weatherLinkedAlerts.length} alert(s) connected to current weather conditions
      </Text>
      </View>
    </MobileCard>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2e3e57",
    padding: 12,
    backgroundColor: "#101927",
  },
  label: {
    color: "#b7c7df",
    fontSize: 12,
  },
  location: {
    color: "#f8fbff",
    fontSize: 18,
    fontWeight: "800",
    marginTop: 2,
  },
  row: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  temp: {
    fontSize: 38,
    fontWeight: "800",
    color: "#f8fbff",
  },
  metric: {
    color: "#c2d4f0",
    lineHeight: 20,
  },
  weatherText: {
    marginTop: 10,
    color: "#f8fbff",
    fontWeight: "700",
  },
  actions: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  action: {
    color: "#d6e5fd",
    fontWeight: "700",
  },
  tabs: {
    marginTop: 10,
    flexDirection: "row",
    gap: 8,
  },
  tab: {
    paddingBottom: 4,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabActive: {
    borderBottomColor: "#facc15",
  },
  tabText: {
    color: "#b4c8e5",
    fontWeight: "600",
  },
  tabTextActive: {
    color: "#f8fbff",
  },
  chartWrap: {
    marginTop: 10,
  },
  chartItem: {
    width: 44,
    alignItems: "center",
    marginRight: 10,
  },
  chartValue: {
    color: "#d7e3f7",
    fontWeight: "700",
  },
  chartTime: {
    color: "#8fa4c4",
    fontSize: 11,
  },
  dailyWrap: {
    marginTop: 10,
  },
  dailyItem: {
    borderWidth: 1,
    borderColor: "#324560",
    borderRadius: 10,
    backgroundColor: "#132134",
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginRight: 8,
    minWidth: 88,
    alignItems: "center",
  },
  dailyDay: {
    color: "#d8e5f8",
    fontWeight: "700",
  },
  dailyTemp: {
    color: "#c2d4f0",
    fontSize: 12,
    marginTop: 3,
  },
  linkedRow: {
    marginTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  linkedTitle: {
    color: "#f0f6ff",
    fontWeight: "700",
  },
  linkedCount: {
    color: "#b8cae5",
    marginTop: 4,
  },
  link: {
    color: "#93c5fd",
    fontWeight: "700",
  },
  errorText: {
    color: "#fca5a5",
    marginTop: 6,
  },
});
