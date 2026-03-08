import { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { WaterLevelCard } from "../components/WaterLevelCard";
import { monitoredWaters } from "../data/monitoredWaters";

const fallbackLocation = require("../assets/location.png");

export function MonitoringScreen() {
  const [selectedId, setSelectedId] = useState(monitoredWaters[0]?.id ?? "");

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Monitoring View</Text>
      <Text style={styles.pageText}>To view more details click the monitored water.</Text>

      {monitoredWaters.map((location) => {
        const isActive = selectedId === location.id;
        return (
          <Pressable
            key={location.id}
            style={[styles.cardButton, isActive && styles.cardButtonActive]}
            onPress={() => setSelectedId((current) => (current === location.id ? "" : location.id))}
          >
            <WaterLevelCard {...location} />
            {isActive ? (
              <View style={styles.detailBlock}>
                <View style={styles.photoWrap}>
                  <Image source={location.image || fallbackLocation} style={styles.photo} resizeMode="cover" />
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailText}>
                    <Text style={styles.detailStrong}>Type:</Text> {location.locationType}
                  </Text>
                  <Text style={styles.detailText}>
                    <Text style={styles.detailStrong}>Trend:</Text> {location.trend}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailText}>
                    <Text style={styles.detailStrong}>Barangay:</Text> {location.barangay}
                  </Text>
                  <Text style={styles.detailText}>
                    <Text style={styles.detailStrong}>Municipality:</Text> {location.municipality}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailText}>
                    <Text style={styles.detailStrong}>Sensor ID:</Text> {location.sensorId}
                  </Text>
                  <Text style={styles.detailText}>
                    <Text style={styles.detailStrong}>Last Updated:</Text> {location.lastUpdated}
                  </Text>
                </View>
                <Text style={styles.pageText}>{location.notes}</Text>
              </View>
            ) : null}
          </Pressable>
        );
      })}
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
  title: {
    color: "#0f172a",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 6,
  },
  pageText: {
    color: "#475569",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  cardButton: {
    marginBottom: 12,
  },
  cardButtonActive: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#7dd3fc",
    padding: 10,
  },
  detailBlock: {
    marginTop: 4,
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  photoWrap: {
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 12,
  },
  photo: {
    width: "100%",
    height: 180,
  },
  detailRow: {
    marginBottom: 8,
  },
  detailText: {
    color: "#334155",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  detailStrong: {
    fontWeight: "800",
    color: "#0f172a",
  },
});
