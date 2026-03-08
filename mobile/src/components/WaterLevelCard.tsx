import { ReactNode } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { MonitoredWater } from "../types";
import { MobileCard } from "./MobileCard";
import { StatusBadge } from "./StatusBadge";
import { colors } from "../styles/theme";

type WaterLevelCardProps = Pick<
  MonitoredWater,
  "locationName" | "currentLevel" | "maxLevel" | "status" | "imageSource"
> & {
  expandedContent?: ReactNode;
};

export function WaterLevelCard({
  locationName,
  currentLevel,
  maxLevel,
  status,
  imageSource,
  expandedContent,
}: WaterLevelCardProps) {
  const percentage = Math.max(0, Math.min((currentLevel / maxLevel) * 100, 100));
  const fillColor =
    status === "Danger" ? colors.danger : status === "Warning" ? colors.warning : colors.safe;

  return (
    <MobileCard>
      <Image source={imageSource} style={styles.cover} />
      <View style={styles.header}>
        <Text style={styles.title}>{locationName}</Text>
        <StatusBadge status={status} />
      </View>
      <Text style={styles.levelText}>{currentLevel}m</Text>
      <Text style={styles.maxText}>Max Level: {maxLevel}m</Text>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${percentage}%`, backgroundColor: fillColor }]} />
      </View>
      <Text style={styles.percentText}>{percentage.toFixed(0)}% of max capacity</Text>
      {expandedContent ? <View style={styles.expandedWrap}>{expandedContent}</View> : null}
    </MobileCard>
  );
}

const styles = StyleSheet.create({
  cover: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  title: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    fontWeight: "700",
  },
  levelText: {
    color: colors.text,
    fontSize: 26,
    fontWeight: "800",
  },
  maxText: {
    color: colors.textMuted,
    marginTop: 2,
  },
  progressTrack: {
    marginTop: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: "#e2e8f0",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
  },
  percentText: {
    marginTop: 8,
    color: colors.textMuted,
    fontSize: 12,
  },
  expandedWrap: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
