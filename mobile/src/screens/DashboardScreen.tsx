import { useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AlertCard } from "../components/AlertCard";
import { ScreenLayout } from "../components/ScreenLayout";
import { StatsCard } from "../components/StatsCard";
import { WaterLevelCard } from "../components/WaterLevelCard";
import { WeatherPanel } from "../components/WeatherPanel";
import { ActiveAlert, activeAlerts as seedAlerts } from "../data/activeAlerts";
import { monitoredWaters } from "../data/monitoredWaters";
import { RootStackParamList } from "../types";
import { styles } from "../styles/pages/DashboardScreen.styles";

export function DashboardScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [showAlerts, setShowAlerts] = useState(true);
  const [weatherAlerts, setWeatherAlerts] = useState<ActiveAlert[]>([]);

  const featuredWaters = monitoredWaters.slice(0, 3);
  const safeCount = monitoredWaters.filter((item) => item.status === "Safe").length;
  const alertCount = monitoredWaters.filter((item) => item.status !== "Safe").length;

  const stats = useMemo(
    () => [
      { id: "total-locations", label: "Total Locations", value: String(monitoredWaters.length), icon: "📍" },
      { id: "active-alerts", label: "Active Alerts", value: String(alertCount), icon: "⚠️" },
      { id: "safe-areas", label: "Safe Areas", value: String(safeCount), icon: "✅" },
    ],
    [alertCount, safeCount],
  );

  const nonWeatherAlerts = seedAlerts.filter((alert) => alert.id !== "a2");
  const alerts = [...nonWeatherAlerts, ...weatherAlerts];

  return (
    <ScreenLayout title="Dashboard" subtitle="Real-time water level monitoring and alerts">
      <Text style={styles.sectionTitle}>Overview Statistics</Text>
      {stats.map((stat) => (
        <StatsCard key={stat.id} label={stat.label} value={stat.value} icon={stat.icon} />
      ))}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Water Levels by Location</Text>
        <Pressable onPress={() => navigation.navigate("Monitoring")}>
          <Text style={styles.link}>View All Monitored Waters</Text>
        </Pressable>
      </View>
      {featuredWaters.map((loc) => (
        <WaterLevelCard key={loc.id} {...loc} />
      ))}

      <Text style={styles.sectionTitle}>Weather</Text>
      <WeatherPanel onWeatherAlertsChange={setWeatherAlerts} onOpenAlerts={() => setShowAlerts(true)} />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Active Alerts</Text>
        <Pressable onPress={() => setShowAlerts((v) => !v)}>
          <Text style={styles.link}>{showAlerts ? "Hide Alerts" : "Show Alerts"}</Text>
        </Pressable>
      </View>
      {showAlerts
        ? alerts.map((alert) => <AlertCard key={alert.id} {...alert} />)
        : <Text style={styles.helpText}>Alerts are hidden.</Text>}

      <Text style={styles.sectionTitle}>How to Use</Text>
      <View style={styles.helpWrap}>
        <Text style={styles.helpText}>• Check water levels at different locations</Text>
        <Text style={styles.helpText}>• Monitor active alerts for dangerous situations</Text>
        <Text style={styles.helpText}>• Green = Safe, Yellow = Warning, Red = Danger</Text>
        <Text style={styles.helpText}>• Use Hide/Show Alerts to toggle alert visibility</Text>
      </View>
    </ScreenLayout>
  );
}
