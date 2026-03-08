import { useEffect, useMemo } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { MobileCard } from "./MobileCard";
import { ActiveAlert } from "../data/activeAlerts";
import { useMobileWeather } from "../hooks/useMobileWeather";
import { deriveMobileWeatherAlerts, getMobileWeatherLabel } from "../utils/weatherAlerts";
import { useState } from "react";
import { styles } from "../styles/components/WeatherPanel.styles";

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
