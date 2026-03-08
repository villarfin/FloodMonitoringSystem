import { StyleSheet, Text, View } from "react-native";
import { MobileCard } from "./MobileCard";
import { colors } from "../styles/theme";

interface AlertCardProps {
  title: string;
  message: string;
  type: "warning" | "danger" | "info";
}

export function AlertCard({ title, message, type }: AlertCardProps) {
  const tint = type === "danger" ? colors.danger : type === "warning" ? colors.warning : colors.brand;

  return (
    <View style={[styles.wrap, { borderLeftColor: tint }]}>
      <MobileCard>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </MobileCard>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderLeftWidth: 4,
    borderRadius: 14,
    marginBottom: 10,
  },
  title: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4,
  },
  message: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
  },
});

