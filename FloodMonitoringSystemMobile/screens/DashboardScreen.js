import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { AlertCard } from "../components/AlertCard";
import { StatsCard } from "../components/StatsCard";
import { WaterLevelCard } from "../components/WaterLevelCard";
import { WeatherPanel } from "../components/WeatherPanel";
import { monitoredWaters } from "../data/monitoredWaters";

const locationIcon = require("../assets/location.png");

const alerts = [
  { id: "a1", title: "High Water Level", message: "Central Dam water level is approaching maximum capacity.", type: "danger" },
  { id: "a2", title: "Heavy Rainfall Expected", message: "Weather forecast shows heavy rain in the next 6 hours.", type: "warning" },
  { id: "a3", title: "Tsunami Alert", message: "Tsunami warning issued for coastal areas.", type: "danger" },
];

export function DashboardScreen({ onNavigate }) {
  const featuredWaters = monitoredWaters.slice(0, 3);
  const safeCount = monitoredWaters.filter((item) => item.status === "Safe").length;
  const alertCount = monitoredWaters.filter((item) => item.status !== "Safe").length;

  const stats = [
    {
      id: "total-locations",
      label: "Total Locations",
      value: String(monitoredWaters.length),
      icon: <Image source={locationIcon} style={styles.locationIcon} />,
    },
    { id: "active-alerts", label: "Active Alerts", value: String(alertCount), icon: <Text style={styles.textIcon}>!</Text> },
    { id: "safe-areas", label: "Safe Areas", value: String(safeCount), icon: <Text style={styles.textIcon}>OK</Text> },
  ];

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Overview Statistics</Text>
        {stats.map((stat) => (
          <View key={stat.id} style={styles.blockSpacing}>
            <StatsCard label={stat.label} value={stat.value} icon={stat.icon} />
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Water Levels by Location</Text>
          <Pressable onPress={() => onNavigate("monitoring")}>
            <Text style={styles.pageLink}>View All Monitored Waters</Text>
          </Pressable>
        </View>
        {featuredWaters.map((location) => (
          <WaterLevelCard key={location.id} {...location} />
        ))}
      </View>

      <View style={styles.section}>
        <WeatherPanel />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Active Alerts</Text>
        {alerts.map((alert) => (
          <AlertCard key={alert.id} {...alert} />
        ))}
      </View>

      <View style={styles.helpCard}>
        <Text style={styles.helpTitle}>How to Use</Text>
        <Text style={styles.helpItem}>Check water levels at different locations</Text>
        <Text style={styles.helpItem}>Monitor active alerts for dangerous situations</Text>
        <Text style={styles.helpItem}>Green = Safe, Yellow = Warning, Red = Danger</Text>
        <Text style={styles.helpItem}>Click Hide/Show Alerts to toggle alerts</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  content: {
    paddingBottom: 24,
  },
  section: {
    marginBottom: 18,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    color: "#0f172a",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 10,
  },
  pageLink: {
    color: "#0284c7",
    fontSize: 13,
    fontWeight: "700",
  },
  blockSpacing: {
    marginBottom: 10,
  },
  helpCard: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },
  helpTitle: {
    color: "#0f172a",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 12,
  },
  helpItem: {
    color: "#475569",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  locationIcon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },
  textIcon: {
    color: "#0f172a",
    fontSize: 18,
    fontWeight: "800",
  },
});
