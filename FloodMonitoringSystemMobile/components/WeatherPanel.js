import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useWeather } from "../hooks/useWeather";

function getWeatherLabel(code) {
  if (code === 0) return "Clear";
  if (code >= 1 && code <= 3) return "Cloudy";
  if (code === 45 || code === 48) return "Fog";
  if (code >= 51 && code <= 57) return "Drizzle";
  if (code >= 61 && code <= 67) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Showers";
  if (code >= 95) return "Thunderstorm";
  return "Variable";
}

function getWeatherIcon(code) {
  if (code === 0) return "Sun";
  if (code >= 1 && code <= 3) return "Cloud";
  if (code === 45 || code === 48) return "Fog";
  if (code >= 51 && code <= 67) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Showers";
  if (code >= 95) return "Storm";
  return "Sky";
}

function formatHour(value) {
  const date = new Date(value);
  return date.toLocaleTimeString([], { hour: "numeric" });
}

function formatDay(value) {
  const date = new Date(value);
  return date.toLocaleDateString([], { weekday: "short" });
}

export function WeatherPanel() {
  const { status, errorMessage, locationName, payload, loadWeather, usePreciseLocation } = useWeather();
  const [metric, setMetric] = useState("temperature");

  const chartSeries = useMemo(() => {
    if (!payload) return [];
    return payload.hourly.map((point) => {
      if (metric === "temperature") return point.temperature;
      if (metric === "precipitation") return point.precipitation;
      return point.wind;
    });
  }, [metric, payload]);

  const maxValue = Math.max(...chartSeries, 1);
  const metricUnit = metric === "temperature" ? "C" : metric === "precipitation" ? "%" : "km/h";

  return (
    <View style={styles.panel}>
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <Text style={styles.resultLabel}>Results for</Text>
          <Text style={styles.title}>{locationName}</Text>
        </View>
        <View style={styles.headerActions}>
          <Pressable style={styles.action} onPress={usePreciseLocation}>
            <Text style={styles.actionText}>Use precise location</Text>
          </Pressable>
          <Pressable style={styles.action} onPress={loadWeather}>
            <Text style={styles.actionText}>Refresh</Text>
          </Pressable>
        </View>
      </View>

      {status === "loading" && <Text style={styles.state}>Loading weather data...</Text>}
      {status === "error" && <Text style={[styles.state, styles.error]}>{errorMessage}</Text>}

      {payload ? (
        <>
          <View style={styles.top}>
            <View style={styles.currentCard}>
              <Text style={styles.currentIcon}>{getWeatherIcon(payload.current.weatherCode)}</Text>
              <Text style={styles.temperature}>{Math.round(payload.current.temperature)}C</Text>
              <Text style={styles.quickStat}>Precipitation: {Math.round(payload.current.precipitation)}%</Text>
              <Text style={styles.quickStat}>Humidity: {Math.round(payload.current.humidity)}%</Text>
              <Text style={styles.quickStat}>Wind: {Math.round(payload.current.windSpeed)} km/h</Text>
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Weather</Text>
              <Text style={styles.summaryTime}>
                {new Date(payload.current.observedAt).toLocaleString([], {
                  weekday: "long",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </Text>
              <Text style={styles.summaryCondition}>
                {getWeatherLabel(payload.current.weatherCode)}
              </Text>
            </View>
          </View>

          <View style={styles.tabs}>
            {[
              ["temperature", "Temperature"],
              ["precipitation", "Precipitation"],
              ["wind", "Wind"],
            ].map(([value, label]) => (
              <Pressable
                key={value}
                style={[styles.tab, metric === value && styles.tabActive]}
                onPress={() => setMetric(value)}
              >
                <Text style={[styles.tabText, metric === value && styles.tabTextActive]}>{label}</Text>
              </Pressable>
            ))}
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chartList}>
            {chartSeries.map((value, index) => (
              <View key={`${payload.hourly[index]?.time}-${metric}`} style={styles.chartItem}>
                <View style={styles.chartTrack}>
                  <View style={[styles.chartBar, { height: `${Math.max((value / maxValue) * 100, 6)}%` }]} />
                </View>
                <Text style={styles.chartValue}>{Math.round(value)}</Text>
                <Text style={styles.chartUnit}>{metricUnit}</Text>
                <Text style={styles.chartTime}>{formatHour(payload.hourly[index].time)}</Text>
              </View>
            ))}
          </ScrollView>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dailyList}>
            {payload.daily.map((day) => (
              <View key={day.date} style={styles.dailyCard}>
                <Text style={styles.dailyDay}>{formatDay(day.date)}</Text>
                <Text style={styles.dailyIcon}>{getWeatherIcon(day.weatherCode)}</Text>
                <Text style={styles.dailyTemp}>
                  {Math.round(day.max)}C / {Math.round(day.min)}C
                </Text>
              </View>
            ))}
          </ScrollView>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: "#0f172a",
    borderRadius: 24,
    padding: 18,
  },
  header: {
    marginBottom: 16,
  },
  headerCopy: {
    marginBottom: 12,
  },
  resultLabel: {
    color: "#93c5fd",
    fontSize: 12,
    marginBottom: 4,
  },
  title: {
    color: "#f8fafc",
    fontSize: 20,
    fontWeight: "800",
  },
  headerActions: {
    flexDirection: "row",
    gap: 10,
  },
  action: {
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#111827",
  },
  actionText: {
    color: "#e2e8f0",
    fontSize: 12,
    fontWeight: "700",
  },
  state: {
    color: "#e2e8f0",
    fontSize: 13,
    marginBottom: 12,
  },
  error: {
    color: "#fca5a5",
  },
  top: {
    gap: 12,
    marginBottom: 16,
  },
  currentCard: {
    backgroundColor: "#172554",
    borderRadius: 18,
    padding: 16,
  },
  currentIcon: {
    color: "#bfdbfe",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },
  temperature: {
    color: "#ffffff",
    fontSize: 34,
    fontWeight: "800",
    marginBottom: 10,
  },
  quickStat: {
    color: "#cbd5e1",
    fontSize: 13,
    marginBottom: 4,
  },
  summaryCard: {
    backgroundColor: "#111827",
    borderRadius: 18,
    padding: 16,
  },
  summaryTitle: {
    color: "#93c5fd",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 6,
  },
  summaryTime: {
    color: "#f8fafc",
    fontSize: 13,
    marginBottom: 8,
  },
  summaryCondition: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "800",
  },
  tabs: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 16,
  },
  tab: {
    borderRadius: 999,
    backgroundColor: "#1e293b",
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  tabActive: {
    backgroundColor: "#38bdf8",
  },
  tabText: {
    color: "#cbd5e1",
    fontSize: 12,
    fontWeight: "700",
  },
  tabTextActive: {
    color: "#082f49",
  },
  chartList: {
    gap: 12,
    paddingBottom: 6,
    marginBottom: 16,
  },
  chartItem: {
    width: 56,
    alignItems: "center",
  },
  chartTrack: {
    width: 26,
    height: 120,
    borderRadius: 999,
    backgroundColor: "#1e293b",
    justifyContent: "flex-end",
    padding: 3,
    marginBottom: 8,
  },
  chartBar: {
    width: "100%",
    borderRadius: 999,
    backgroundColor: "#38bdf8",
  },
  chartValue: {
    color: "#f8fafc",
    fontSize: 14,
    fontWeight: "700",
  },
  chartUnit: {
    color: "#94a3b8",
    fontSize: 11,
    marginBottom: 4,
  },
  chartTime: {
    color: "#cbd5e1",
    fontSize: 11,
  },
  dailyList: {
    gap: 10,
  },
  dailyCard: {
    width: 98,
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 12,
  },
  dailyDay: {
    color: "#93c5fd",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 6,
  },
  dailyIcon: {
    color: "#f8fafc",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
  },
  dailyTemp: {
    color: "#e2e8f0",
    fontSize: 12,
  },
});
