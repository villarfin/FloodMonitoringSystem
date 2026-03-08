import { Pressable, StyleSheet, Text, View } from "react-native";
import { MobileCard } from "./MobileCard";
import { colors } from "../styles/theme";

interface WeatherAlert {
  id: string;
  title: string;
  type: "warning" | "danger" | "info";
}

interface WeatherPanelProps {
  alerts: WeatherAlert[];
  onOpenAlerts: () => void;
}

export function WeatherPanel({ alerts, onOpenAlerts }: WeatherPanelProps) {
  const weatherLinkedAlerts = alerts.filter((item) => item.type === "warning" || item.type === "danger");

  return (
    <MobileCard>
      <Text style={styles.label}>Results for</Text>
      <Text style={styles.location}>Current Location</Text>
      <View style={styles.row}>
        <Text style={styles.temp}>27C</Text>
        <View>
          <Text style={styles.metric}>Precipitation: 0%</Text>
          <Text style={styles.metric}>Humidity: 91%</Text>
          <Text style={styles.metric}>Wind: 2 km/h</Text>
        </View>
      </View>
      <Text style={styles.weatherText}>Weather: Cloudy</Text>

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
});

