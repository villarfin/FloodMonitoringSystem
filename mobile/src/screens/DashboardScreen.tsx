import { useEffect, useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AlertCard } from "../components/AlertCard";
import { ScreenLayout } from "../components/ScreenLayout";
import { StatsCard } from "../components/StatsCard";
import { WaterLevelCard } from "../components/WaterLevelCard";
import { WeatherPanel } from "../components/WeatherPanel";
import { ActiveAlert, activeAlerts as staticAlerts } from "../data/activeAlerts";
import { monitoredWaters as staticWaters } from "../data/monitoredWaters";
import { api } from "../utils/api";
import { RootStackParamList } from "../types";
import { styles } from "../styles/pages/DashboardScreen.styles";

export function DashboardScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [showAlerts, setShowAlerts] = useState(true);
  const [weatherAlerts, setWeatherAlerts] = useState<ActiveAlert[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  const stats = useMemo(
    () => [
      { id: "total-locations", label: "Total Locations", value: String(monitoredData.length), icon: "📍" },
      { id: "active-alerts", label: "Active Alerts", value: String(alertCount), icon: "⚠️" },
      { id: "safe-areas", label: "Safe Areas", value: String(safeCount), icon: "✅" },
    ],
    [monitoredData, alertCount, safeCount],
  );

  const allAlerts = [...alerts, ...weatherAlerts];

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
        <WaterLevelCard 
          key={loc.id} 
          locationName={loc.name || loc.locationName} 
          currentLevel={loc.currentLevel || loc.current_level || 0} 
          maxLevel={loc.maxLevel || loc.max_level || 10} 
          status={loc.status || "Safe"} 
          imageSource={loc.imageSource || require("../../assets/waters/cagayan-de-oro-river.jpg")}
        />
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
        ? allAlerts.map((alert, idx) => (
            <AlertCard 
              key={alert.id || idx} 
              title={alert.title || alert.level} 
              message={alert.message || alert.description} 
              type={alert.type || alert.level?.toLowerCase()} 
            />
          ))
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
