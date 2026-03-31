import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { ScreenLayout } from "../components/ScreenLayout";
import { WaterLevelCard } from "../components/WaterLevelCard";
import { monitoredWaters as staticWaters } from "../data/monitoredWaters";
import { api } from "../utils/api";
import { styles } from "../styles/pages/MonitoringScreen.styles";

export function MonitoringScreen() {
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

  return (
    <ScreenLayout title="Monitoring" subtitle="To view more details tap the monitored water.">
      {monitoredData.map((location) => {
        const isActive = selectedId === location.id;
        return (
          <Pressable
            key={location.id}
            onPress={() => setSelectedId((current) => (current === location.id ? "" : location.id))}
            style={[styles.wrap, isActive && styles.wrapActive]}
          >
            <WaterLevelCard
              locationName={location.name || location.locationName} 
              currentLevel={location.currentLevel || location.current_level || 0} 
              maxLevel={location.maxLevel || location.max_level || 10} 
              status={location.status || "Safe"} 
              imageSource={location.imageSource || require("../../assets/waters/cagayan-de-oro-river.jpg")}
              expandedContent={
                isActive ? (
                  <View>
                    <Text style={styles.detailText}><Text style={styles.bold}>Type:</Text> {location.location_type || location.locationType || "N/A"}</Text>
                    <Text style={styles.detailText}><Text style={styles.bold}>Trend:</Text> {location.trend || "Stable"}</Text>
                    <Text style={styles.detailText}><Text style={styles.bold}>Barangay:</Text> {location.barangay || "N/A"}</Text>
                    <Text style={styles.detailText}><Text style={styles.bold}>Municipality:</Text> {location.municipality || "N/A"}</Text>
                    <Text style={styles.detailText}><Text style={styles.bold}>Sensor ID:</Text> {location.sensor_id || location.sensorId || "N/A"}</Text>
                    <Text style={styles.detailText}><Text style={styles.bold}>Last Updated:</Text> {location.last_updated || location.lastUpdated || "N/A"}</Text>
                    <Text style={styles.detailNotes}>{location.notes || ""}</Text>
                  </View>
                ) : undefined
              }
            />
          </Pressable>
        );
      })}
    </ScreenLayout>
  );
}
