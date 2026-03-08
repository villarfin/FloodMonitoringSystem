import { useEffect, useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MobileCard } from "./MobileCard";
import { ActiveAlert } from "../data/activeAlerts";
import { useMobileWeather } from "../hooks/useMobileWeather";
import { deriveMobileWeatherAlerts, getMobileWeatherLabel } from "../utils/weatherAlerts";
import { colors } from "../styles/theme";

interface WeatherPanelProps {
  onWeatherAlertsChange: (alerts: ActiveAlert[]) => void;
  onOpenAlerts: () => void;
}

export function WeatherPanel({ onWeatherAlertsChange, onOpenAlerts }: WeatherPanelProps) {
  const { status, error, payload, locationName, loadWeather } = useMobileWeather();
  const weatherLinkedAlerts = useMemo(() => (payload ? deriveMobileWeatherAlerts(payload) : []), [payload]);

  useEffect(() => {
    onWeatherAlertsChange(weatherLinkedAlerts);
  }, [onWeatherAlertsChange, weatherLinkedAlerts]);

  return (
    <MobileCard>
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
      <Pressable onPress={loadWeather}>
        <Text style={styles.link}>Refresh</Text>
      </Pressable>

      <View style={styles.linkedRow}>
        <Text style={styles.linkedTitle}>Weather-linked Active Alerts</Text>
        <Pressable onPress={onOpenAlerts}>
          <Text style={styles.link}>Show Alerts</Text>
        </Pressable>
      </View>
      <Text style={styles.linkedCount}>
        {weatherLinkedAlerts.length} alert(s) connected to current weather conditions
      </Text>
    </MobileCard>
  );
}

const styles = StyleSheet.create({
  label: {
    color: colors.textMuted,
    fontSize: 12,
  },
  location: {
    color: colors.text,
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
    color: colors.text,
  },
  metric: {
    color: colors.textMuted,
    lineHeight: 20,
  },
  weatherText: {
    marginTop: 10,
    color: colors.text,
    fontWeight: "700",
  },
  linkedRow: {
    marginTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  linkedTitle: {
    color: colors.text,
    fontWeight: "700",
  },
  linkedCount: {
    color: colors.textMuted,
    marginTop: 4,
  },
  link: {
    color: colors.brand,
    fontWeight: "700",
  },
  errorText: {
    color: colors.danger,
    marginTop: 6,
  },
});
