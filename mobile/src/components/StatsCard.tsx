import { StyleSheet, Text, View } from "react-native";
import { MobileCard } from "./MobileCard";
import { colors } from "../styles/theme";

interface StatsCardProps {
  label: string;
  value: string;
  icon: string;
}

export function StatsCard({ label, value, icon }: StatsCardProps) {
  return (
    <MobileCard>
      <View style={styles.row}>
        <View>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
        <Text style={styles.icon}>{icon}</Text>
      </View>
    </MobileCard>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    color: colors.textMuted,
    fontSize: 12,
  },
  value: {
    color: colors.text,
    fontSize: 26,
    fontWeight: "800",
    marginTop: 2,
  },
  icon: {
    fontSize: 26,
  },
});

