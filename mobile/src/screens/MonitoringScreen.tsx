import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ScreenLayout } from "../components/ScreenLayout";
import { WaterLevelCard } from "../components/WaterLevelCard";
import { monitoredWaters } from "../data/monitoredWaters";
import { colors } from "../styles/theme";

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

const styles = StyleSheet.create({
  wrap: {
    borderRadius: 14,
    marginBottom: 10,
  },
  wrapActive: {
    backgroundColor: "#f0f7ff",
  },
  detailText: {
    color: colors.textMuted,
    marginBottom: 4,
  },
  detailNotes: {
    marginTop: 6,
    color: colors.text,
  },
  bold: {
    color: colors.text,
    fontWeight: "700",
  },
});
