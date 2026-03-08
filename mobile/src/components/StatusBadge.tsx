import { StyleSheet, Text, View } from "react-native";
import { WaterStatus } from "../types";
import { colors } from "../styles/theme";

interface StatusBadgeProps {
  status: WaterStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const color =
    status === "Danger" ? colors.danger : status === "Warning" ? colors.warning : colors.safe;

  return (
    <View style={[styles.badge, { borderColor: color, backgroundColor: `${color}18` }]}>
      <Text style={[styles.label, { color }]}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  label: {
    fontWeight: "700",
    fontSize: 12,
  },
});

