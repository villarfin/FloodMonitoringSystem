import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { ScreenLayout } from "../components/ScreenLayout";
import { WaterLevelCard } from "../components/WaterLevelCard";
import { monitoredWaters } from "../data/monitoredWaters";
import { styles } from "../styles/pages/MonitoringScreen.styles";

export function MonitoringScreen() {
  const [selectedId, setSelectedId] = useState(monitoredWaters[0]?.id ?? "");

  return (
    <ScreenLayout title="Monitoring" subtitle="To view more details tap the monitored water.">
      {monitoredWaters.map((location) => {
        const isActive = selectedId === location.id;
        return (
          <Pressable
            key={location.id}
            onPress={() => setSelectedId((current) => (current === location.id ? "" : location.id))}
            style={[styles.wrap, isActive && styles.wrapActive]}
          >
            <WaterLevelCard
              {...location}
              expandedContent={
                isActive ? (
                  <View>
                    <Text style={styles.detailText}><Text style={styles.bold}>Type:</Text> {location.locationType}</Text>
                    <Text style={styles.detailText}><Text style={styles.bold}>Trend:</Text> {location.trend}</Text>
                    <Text style={styles.detailText}><Text style={styles.bold}>Barangay:</Text> {location.barangay}</Text>
                    <Text style={styles.detailText}><Text style={styles.bold}>Municipality:</Text> {location.municipality}</Text>
                    <Text style={styles.detailText}><Text style={styles.bold}>Sensor ID:</Text> {location.sensorId}</Text>
                    <Text style={styles.detailText}><Text style={styles.bold}>Last Updated:</Text> {location.lastUpdated}</Text>
                    <Text style={styles.detailNotes}>{location.notes}</Text>
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
