import { View, Text, StyleSheet } from "react-native";

export function WaterLevelCard({ locationName, currentLevel, maxLevel, status }) {
  const percentage = Math.max(0, Math.min((currentLevel / maxLevel) * 100, 100));
  const normalizedStatus = status.toLowerCase();

  const statusColors = {
    safe: { badge: "#16a34a", fill: "#22c55e", bg: "#f0fdf4", border: "#bbf7d0" },
    warning: { badge: "#d97706", fill: "#f59e0b", bg: "#fffbeb", border: "#fde68a" },
    danger: { badge: "#dc2626", fill: "#ef4444", bg: "#fef2f2", border: "#fecaca" },
  };

  const colors = statusColors[normalizedStatus] || statusColors.safe;

  return (
    <View style={[styles.card, { backgroundColor: colors.bg, borderColor: colors.border }]}>
      <View style={styles.headerRow}>
        <Text style={styles.locationName}>{locationName}</Text>
        <View style={[styles.badge, { backgroundColor: colors.badge }]}>
          <Text style={styles.badgeText}>{status}</Text>
        </View>
      </View>
      <View style={styles.body}>
        <Text style={[styles.level, { color: colors.badge }]}>{currentLevel}m</Text>
        <Text style={styles.maxLevel}>Max: {maxLevel}m</Text>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${percentage}%`, backgroundColor: colors.fill }]} />
        </View>
        <Text style={styles.percent}>{percentage.toFixed(0)}% of max capacity</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1.5,
    padding: 16,
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  locationName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1e293b",
    flex: 1,
    marginRight: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  body: {
    gap: 4,
  },
  level: {
    fontSize: 28,
    fontWeight: "800",
  },
  maxLevel: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 6,
  },
  progressTrack: {
    height: 8,
    backgroundColor: "#e2e8f0",
    borderRadius: 4,
    overflow: "hidden",
    marginVertical: 4,
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  percent: {
    fontSize: 11,
    color: "#64748b",
  },
});
